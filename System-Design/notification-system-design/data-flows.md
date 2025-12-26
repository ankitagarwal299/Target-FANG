# Data Flows & Scenarios

This document describes detailed data flows for various notification scenarios.

---

## 1. Send Email Notification Flow

### High-Level Flow
```
Client → API Gateway → Notification Service → Message Queue → Email Worker → SendGrid → User
```

### Detailed Step-by-Step Flow

**Step 1: Client Request**
```http
POST https://api.notifications.example.com/v1/notifications
Headers:
  Authorization: Bearer api_key_abc123
  Content-Type: application/json
  Idempotency-Key: req_unique_123

Body:
{
  "user_ids": ["user_456"],
  "template_id": "password_reset_v1",
  "channel": "email",
  "priority": "high",
  "variables": {
    "reset_link": "https://app.com/reset?token=xyz",
    "app_name": "MyApp"
  }
}
```

**Step 2: Load Balancer**
- Receives request
- Health check on API gateway instances
- Routes to healthy API Gateway 1

**Step 3: API Gateway**
- Validates JWT/API key
- Checks authorization (can user send notifications?)
- Forwards to Rate Limiter

**Step 4: Rate Limiter (Redis)**
```redis
GET ratelimit:api_key_abc123:hour
# Returns: 45 (current count)
# Limit: 10000/hour
# Remaining: 9955

INCR ratelimit:api_key_abc123:hour
EXPIRE ratelimit:api_key_abc123:hour 3600
```
✅ Passes rate limit check

**Step 5: Notification Service Receives Request**

5a. **Validate Request**
- Schema validation (required fields present?)
- User IDs exist in database?
- Template exists?

5b. **Check Idempotency** (Redis)
```redis
GET idempotency:req_unique_123
# Returns: null (not processed before)

# Mark as processing
SETEX idempotency:req_unique_123 86400 "processing"
```

5c. **Fetch User Preferences** (Redis Cache)
```redis
GET user_pref:user_456
# Cache miss

# Query PostgreSQL
SELECT * FROM user_preferences WHERE user_id = 'user_456';
# Returns: {email_enabled: true, quiet_hours: {...}}

# Cache result
SETEX user_pref:user_456 1800 "{...preferences...}"
```

✅ User has email enabled  
✅ Not in quiet hours

5d. **Fetch Template** (Redis Cache)
```redis
GET template:password_reset_v1
# Cache hit
# Returns: {"subject": "Reset password for {{app_name}}", "body": "..."}
```

5e. **Compile Notification**
```
Subject: "Reset password for MyApp"
Body: "Click here to reset: https://app.com/reset?token=xyz"
```

5f. **Check Deduplication** (Redis)
```redis
# Generate message_id from hash(user_id + template_id + variables)
message_id = hash("user_456:password_reset_v1:xyz")

GET msg_processed:msg_abc789
# Returns: null (not sent recently)

# Mark as processing
SETEX msg_processed:msg_abc789 86400 "1"
```

5g. **Create Notification Record** (Cassandra)
```cql
INSERT INTO notification_by_id (
  notification_id, user_id, channel, template_id, 
  status, created_at, variables
) VALUES (
  uuid(), 'user_456', 'email', 'password_reset_v1',
  'pending', NOW(), {'reset_link': '...'}
);

-- Returns: notification_id = notif_123
```

5h. **Record Event** (Cassandra)
```cql
INSERT INTO notification_events (
  user_id, event_time, notification_id, 
  event_type, channel, status
) VALUES (
  'user_456', NOW(), notif_123,
  'created', 'email', 'pending'
);
```

5i. **Cache Idempotency Response** (Redis)
```redis
SETEX idempotency:req_unique_123 86400 
  '{"notification_ids": ["notif_123"], "status": "accepted"}'
```

5j. **Publish to Message Queue** (Kafka)
```
Topic: notifications.email.high
Partition: hash(user_456) % 50 = 23
Message: {
  "notification_id": "notif_123",
  "user_id": "user_456",
  "email": "user@example.com",
  "subject": "Reset password for MyApp",
  "body": "Click here...",
  "priority": "high",
  "metadata": {...}
}
```

**Step 6: Return Response to Client**
```http
HTTP/1.1 202 Accepted
Content-Type: application/json

{
  "notification_ids": ["notif_123"],
  "status": "accepted",
  "message": "Notification queued for processing"
}
```

⏱️ **Total Latency**: ~50ms (API processing)

---

**Step 7: Email Worker Consumes Message**

7a. **Consumer Group Reads from Kafka**
```
Consumer Group: email-workers-high
Consumer ID: worker-email-3
Topic: notifications.email.high
Partition: 23
Offset: 12345
```

7b. **Validate Message**
- Notification ID valid?
- Required fields present?

7c. **Check Idempotency** (Redis)
```redis
GET worker_processed:notif_123
# Returns: null (not processed by worker)

SETEX worker_processed:notif_123 3600 "processing"
```

7d. **Circuit Breaker Check**
```
Provider: SendGrid
Circuit State: CLOSED (healthy)
Error Rate: 2% (below 50% threshold)
```
✅ Circuit is closed, proceed

7e. **Send to SendGrid**
```http
POST https://api.sendgrid.com/v3/mail/send
Headers:
  Authorization: Bearer sendgrid_api_key
  Content-Type: application/json

Body:
{
  "personalizations": [{
    "to": [{"email": "user@example.com"}],
    "subject": "Reset password for MyApp"
  }],
  "from": {"email": "noreply@myapp.com"},
  "content": [{
    "type": "text/html",
    "value": "Click here..."
  }],
  "tracking_settings": {
    "open_tracking": {"enable": true},
    "click_tracking": {"enable": true}
  },
  "custom_args": {
    "notification_id": "notif_123"
  }
}
```

**SendGrid Response**:
```http
HTTP/1.1 202 Accepted
X-Message-Id: sg_msg_xyz789

{
  "message": "success"
}
```

✅ **Success**

7f. **Update Status** (Cassandra)
```cql
UPDATE notification_by_id
SET status = 'sent',
    sent_at = NOW(),
    provider = 'sendgrid',
    provider_message_id = 'sg_msg_xyz789'
WHERE notification_id = notif_123;

INSERT INTO notification_events (
  user_id, event_time, notification_id,
  event_type, status, provider
) VALUES (
  'user_456', NOW(), notif_123,
  'sent', 'sent', 'sendgrid'
);
```

7g. **Record Analytics** (Cassandra)
```cql
UPDATE analytics_daily
SET total_sent = total_sent + 1
WHERE date = '2024-12-03'
  AND channel = 'email'
  AND template_id = 'password_reset_v1';
```

7h. **Commit Kafka Offset**
```
Consumer commits offset: 12345
```

7i. **Mark as Processed** (Redis)
```redis
SETEX worker_processed:notif_123 3600 "completed"
```

⏱️ **Worker Processing**: ~200ms

---

**Step 8: SendGrid Delivers Email**

SendGrid processes email and delivers to user's inbox.

⏱️ **Delivery Time**: ~2-5 seconds

---

**Step 9: SendGrid Webhook (Delivery Confirmation)**

```http
POST https://api.myapp.com/webhooks/sendgrid
Headers:
  X-SendGrid-Event-Type: delivered

Body:
{
  "event": "delivered",
  "email": "user@example.com",
  "timestamp": 1701619205,
  "sg_message_id": "sg_msg_xyz789",
  "notification_id": "notif_123"
}
```

9a. **Delivery Status Service Processes Webhook**

9b. **Update Status** (Cassandra)
```cql
UPDATE notification_by_id
SET status = 'delivered',
    delivered_at = NOW()
WHERE notification_id = notif_123;

INSERT INTO notification_events (
  user_id, event_time, notification_id,
  event_type, status
) VALUES (
  'user_456', NOW(), notif_123,
  'delivered', 'delivered'
);
```

9c. **Update Analytics** (Cassandra)
```cql
UPDATE analytics_daily
SET total_delivered = total_delivered + 1
WHERE date = '2024-12-03'
  AND channel = 'email'
  AND template_id = 'password_reset_v1';
```

---

**Step 10: User Opens Email**

10a. **Tracking Pixel Loads**
```http
GET https://tracking.sendgrid.com/open/notif_123.png
```

10b. **SendGrid Webhook (Open Event)**
```http
POST https://api.myapp.com/webhooks/sendgrid
Body: {"event": "open", "notification_id": "notif_123", ...}
```

10c. **Update Status** (Cassandra)
```cql
UPDATE notification_by_id
SET opened_at = NOW()
WHERE notification_id = notif_123;

INSERT INTO notification_events (
  user_id, event_time, notification_id,
  event_type
) VALUES (
  'user_456', NOW(), notif_123, 'opened'
);

UPDATE analytics_daily
SET total_opened = total_opened + 1
WHERE date = '2024-12-03'
  AND channel = 'email'
  AND template_id = 'password_reset_v1';
```

---

### End-to-End Latency Summary

| Phase | Time | Cumulative |
|-------|------|------------|
| API Processing | 50ms | 50ms |
| Queue Wait | 100ms | 150ms |
| Worker Processing | 200ms | 350ms |
| SendGrid API | 100ms | 450ms |
| SendGrid Delivery | 3s | 3.45s |

**Total: ~3.5 seconds** from API call to inbox

---

## 2. Send SMS Notification Flow

Similar to email, with differences:

### Differences from Email Flow

**Step 5c: Check User Preferences**
```sql
SELECT phone, channel_sms_enabled 
FROM user_preferences 
WHERE user_id = 'user_456';

-- Returns: phone = '+1234567890', sms_enabled = true
```

**Step 7e: Send to Twilio**
```http
POST https://api.twilio.com/2010-04-01/Accounts/AC123/Messages.json
Body:
  To=%2B1234567890&
  From=%2B1234567890&
  Body=Your+OTP+is+123456
```

**Twilio Response**:
```json
{
  "sid": "SM123",
  "status": "queued"
}
```

**Step 9: Twilio Webhook (Delivery)**
```http
POST https://api.myapp.com/webhooks/twilio
Body:
  MessageStatus=delivered&
  MessageSid=SM123
```

**Latency**: Faster than email (~1-2 seconds total)

---

## 3. Send Push Notification Flow

### Differences

**Step 5c: Get Device Tokens**
```sql
SELECT device_token, platform
FROM devices
WHERE user_id = 'user_456' AND is_active = true;

-- Returns: [
--   {token: 'apns_token_abc', platform: 'ios'},
--   {token: 'fcm_token_xyz', platform: 'android'}
-- ]
```

**Step 7e: Send to FCM (Android)**
```http
POST https://fcm.googleapis.com/fcm/send
Headers:
  Authorization: key=FCM_SERVER_KEY

Body:
{
  "to": "fcm_token_xyz",
  "notification": {
    "title": "New message",
    "body": "You have 1 new message",
    "icon": "icon.png",
    "sound": "default"
  },
  "data": {
    "notification_id": "notif_123",
    "deep_link": "/messages"
  }
}
```

**Step 7f: Send to APNS (iOS)**
```http
POST https://api.push.apple.com/3/device/apns_token_abc
Headers:
  authorization: bearer <JWT_TOKEN>
  apns-topic: com.myapp.app

Body:
{
  "aps": {
    "alert": {
      "title": "New message",
      "body": "You have 1 new message"
    },
    "badge": 1,
    "sound": "default"
  },
  "notification_id": "notif_123"
}
```

**Latency**: Very fast (~500ms-2s total)

---

## 4. Failure & Retry Flow

### Scenario: SendGrid API Failure

**Step 7e: Send to SendGrid (Attempt 1)**
```http
POST https://api.sendgrid.com/v3/mail/send
```

**SendGrid Response**:
```http
HTTP/1.1 503 Service Unavailable
```

❌ **Failure**

**Step 7e-retry1: Retry Logic (Attempt 2)**

Wait 5 seconds, then retry:

```http
POST https://api.sendgrid.com/v3/mail/send
```

**SendGrid Response**:
```http
HTTP/1.1 503 Service Unavailable
```

❌ **Failure Again**

**Circuit Breaker Update**:
```
Error count: 2
Error rate: 40% (if 2 of last 5 failed)
```

**Step 7e-retry2: Retry Logic (Attempt 3)**

Wait 15 seconds, then retry:

```http
POST https://api.sendgrid.com/v3/mail/send
```

**SendGrid Response**:
```http
HTTP/1.1 503 Service Unavailable
```

❌ **Failure - Max Retries Exhausted**

**Step 7f: Send to Dead Letter Queue**
```
Topic: notifications.dlq
Message: {
  "notification_id": "notif_123",
  "error": "Max retries exhausted",
  "attempts": 3,
  "last_error": "503 Service Unavailable",
  "original_message": {...}
}
```

**Step 7g: Update Status** (Cassandra)
```cql
UPDATE notification_by_id
SET status = 'failed',
    error_message = '503 Service Unavailable after 3 attempts'
WHERE notification_id = notif_123;
```

**Step 7h: Trigger Alert**
```
Alert: DLQ depth > 100
Channel: PagerDuty
Severity: Critical
Message: "SendGrid failures increasing, DLQ at 150 messages"
```

**Step 7i: Circuit Breaker Opens**
```
Error rate: 55% (above 50% threshold)
Circuit State: OPEN
Duration: 30 seconds
```

All subsequent requests to SendGrid fail fast for 30 seconds.

**Step 7j: Fallback to AWS SES**
```
Since circuit is OPEN for SendGrid, use fallback provider:
Provider: AWS SES
Circuit State: CLOSED
```

New notifications go to AWS SES until SendGrid circuit resets.

---

## 5. Idempotency Flow (Duplicate Request)

**Request 1** (Original):
```http
POST /v1/notifications
Idempotency-Key: req_abc123
Body: {...}
```

**Response 1**:
```http
HTTP/1.1 202 Accepted
{
  "notification_ids": ["notif_456"],
  "status": "accepted"
}
```

Notification sent successfully.

---

**Request 2** (Duplicate - same idempotency key):
```http
POST /v1/notifications
Idempotency-Key: req_abc123
Body: {...}
```

**Idempotency Check** (Redis):
```redis
GET idempotency:req_abc123
# Returns: '{"notification_ids": ["notif_456"], "status": "accepted"}'
```

**Response 2** (Cached):
```http
HTTP/1.1 200 OK
X-Idempotency-Replay: true
{
  "notification_ids": ["notif_456"],
  "status": "accepted"
}
```

✅ No duplicate notification sent  
✅ Same response returned  
✅ User-transparent deduplication

---

## 6. Rate Limiting Flow (Exceeded)

**User has sent 999 notifications in the last hour**

**Request 1000**:
```http
POST /v1/notifications
Authorization: Bearer api_key_abc123
```

**Rate Limit Check** (Redis):
```redis
GET ratelimit:api_key_abc123:hour
# Returns: 999

INCR ratelimit:api_key_abc123:hour
# Returns: 1000 (limit is 1000)
```

✅ **Allowed** (exactly at limit)

---

**Request 1001**:
```http
POST /v1/notifications
Authorization: Bearer api_key_abc123
```

**Rate Limit Check** (Redis):
```redis
GET ratelimit:api_key_abc123:hour
# Returns: 1000

# Limit exceeded!
```

❌ **Blocked**

**Response**:
```http
HTTP/1.1 429 Too Many Requests
Retry-After: 2847
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1701622847

{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit of 1000 requests/hour exceeded",
    "retry_after": 2847
  }
}
```

Client should wait 2847 seconds (until next hour window).

---

## 7. Scheduled Notification Flow

**Request with scheduled delivery**:
```http
POST /v1/notifications
Body:
{
  "user_ids": ["user_123"],
  "template_id": "reminder_email",
  "channel": "email",
  "scheduled_at": "2024-12-04T10:00:00Z"
}
```

**Notification Service**:
- Creates notification record with status = `scheduled`
- Does NOT publish to immediate queue
- Publishes to `scheduled_notifications` topic

**Scheduler Service** (Cron job runs every minute):
```sql
SELECT notification_id, user_id, template_id
FROM scheduled_notifications
WHERE scheduled_at <= NOW()
  AND status = 'scheduled'
LIMIT 1000;
```

For each ready notification:
- Publish to appropriate priority queue
- Update status to `pending`

**Worker processes normally** after scheduled time.

---

## Latency Summary by Channel

| Channel | API → Queue | Queue → Worker | Worker → Provider | Provider → Delivery | **Total** |
|---------|-------------|----------------|-------------------|---------------------|-----------|
| **Email** | 50ms | 100ms | 200ms | 3s | **~3.5s** |
| **SMS** | 50ms | 100ms | 150ms | 1s | **~1.3s** |
| **Push** | 50ms | 50ms | 100ms | 500ms | **~700ms** |
| **In-App** | 50ms | 10ms | 50ms | Instant | **~110ms** |

---

## Error Scenarios

| Scenario | Action | Outcome |
|----------|--------|---------|
| User opted out | Check preferences | Skip, mark as `skipped` |
| Invalid email | Validation fails | HTTP 400 error |
| Rate limit hit | Rate limiter blocks | HTTP 429 error |
| Template not found | Template fetch fails | HTTP 400 error |
| Provider timeout | Retry with backoff | 3 attempts → DLQ |
| Circuit open | Fail fast | Use fallback provider |
| Database down | Serve from cache | Graceful degradation |
| Queue full | Backpressure | HTTP 503 (retry later) |

---

This comprehensive flow documentation covers normal operations, error handling, and edge cases for the notification system.
