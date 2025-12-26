cd # Notification System Interview - What to Say (Point-Based)

## 🎤 Opening (30 seconds)

**"Let me design a notification system that handles multiple channels - email, SMS, push notifications, and in-app. I'll start by clarifying requirements, then discuss architecture, and dive into scalability and reliability patterns."**

---

## 1️⃣ REQUIREMENTS (3-4 minutes)

### Clarify First:
**"Let me ask a few questions to clarify the scope:"**

1. **Scale**: "How many notifications per day? I'll assume 100 million"
2. **Channels**: "Which channels? I'll design for email, SMS, push, and in-app"
3. **Latency**: "What's the acceptable latency? I'll target under 5 seconds"
4. **Reliability**: "Do we need at-least-once or exactly-once delivery? I'll go with at-least-once"

### State Requirements:

**Functional:**
- ✅ Send notifications via email, SMS, push, in-app
- ✅ Support templates with variables like {{user.name}}
- ✅ Handle user preferences - opt-in/opt-out per channel
- ✅ Priority handling - high for OTPs, low for marketing
- ✅ Track delivery status - sent, delivered, opened, clicked

**Non-Functional:**
- ✅ 100M notifications per day
- ✅ 99.9% uptime
- ✅ Under 5 second latency for most notifications
- ✅ At-least-once delivery guarantee

---

## 2️⃣ CAPACITY ESTIMATION (2-3 minutes)

**"Let me do some back-of-the-envelope calculations:"**

### Say Out Loud:

**QPS Calculation:**
- "100 million per day = 100M / 86,400 seconds = about 1,200 requests per second"
- "For peak traffic, I'll multiply by 3x = 3,600 QPS at peak"

**Storage:**
- "Each notification metadata is about 1KB"
- "100M × 1KB = 100 GB per day"
- "For 90-day retention: 100GB × 90 = 9TB"

**Infrastructure:**
- "We'll need about 20 worker instances per channel"
- "Message queue with 50 partitions for parallelism"
- "Multiple database servers with replication"

---

## 3️⃣ HIGH-LEVEL ARCHITECTURE (5-7 minutes)

### Draw and Explain:

**"Here's my high-level architecture:"**

**(Draw boxes while saying this)**

```
[Clients] 
    ↓
[Load Balancer]
    ↓
[API Gateway + Rate Limiter]
    ↓
[Notification Service]
    ↓
[Message Queue - Kafka]
    ↓
[Channel Workers]
    ↓
[Third-Party Providers]
```

### Explain Each Layer:

**1. API Gateway:**
- "Handles authentication, rate limiting, and request validation"
- "Rate limiting uses token bucket algorithm stored in Redis"
- "Limits might be 1000 requests per hour per user"

**2. Notification Service (Orchestrator):**
- "This is the brain - it validates requests, checks user preferences, and publishes to queues"
- "It checks if users opted in for this channel"
- "It fetches templates and compiles them with variables"
- "It implements idempotency to prevent duplicate sends"

**3. Message Queue (Kafka):**
- "I'm using Kafka for high throughput - it handles over 1 million messages per second"
- "Three priority queues: High (OTPs), Medium (social), Low (marketing)"
- "Also a Dead Letter Queue for failed messages after retries"

**4. Channel Workers:**
- "Separate worker pools for email, SMS, push, and in-app"
- "They consume from queues and call third-party APIs"
- "Each worker has circuit breakers and retry logic"

**5. Third-Party Providers:**
- "Email: SendGrid as primary, AWS SES as fallback"
- "SMS: Twilio as primary, AWS SNS as fallback"
- "Push: FCM for Android, APNS for iOS"
- "In-App: WebSocket server for real-time delivery"

### Databases:

**"For databases, I'm using three different stores:"**

**PostgreSQL:**
- "Stores user data, templates, and preferences"
- "Needs ACID properties for critical data"
- "Has read replicas for scaling reads"

**Redis:**
- "Caches templates and user preferences"
- "Stores rate limiting counters"
- "Handles deduplication tracking"
- "Reduces database load by 80%"

**Cassandra:**
- "Stores notification events and delivery history"
- "Great for time-series data with high write throughput"
- "Can handle 10,000+ writes per second per node"

---

## 4️⃣ DATA FLOW (3-5 minutes)

**"Let me walk through what happens when we send an email notification:"**

### Walk Through Step-by-Step:

**Step 1-3: Request Arrives**
- "Client calls POST /notifications with user ID, template, and channel"
- "API Gateway authenticates and checks rate limits in Redis"
- "If rate limit OK, forwards to Notification Service"

**Step 4-7: Notification Service Processing**
- "Service checks idempotency key in Redis - prevents duplicate sends"
- "Fetches user preferences from Redis cache - checks if email is enabled"
- "Fetches email template from Redis cache"
- "Compiles template: replaces {{user.name}} with actual name"

**Step 8-9: Queue and Return**
- "Publishes message to high-priority Kafka queue"
- "Returns HTTP 202 Accepted immediately - async processing"
- "Total API latency: under 100 milliseconds"

**Step 10-13: Worker Processing**
- "Email worker consumes message from Kafka"
- "Checks circuit breaker - is SendGrid healthy?"
- "If healthy, sends email via SendGrid API"
- "Updates status to 'sent' in Cassandra"

**Step 14-15: Delivery Confirmation**
- "SendGrid delivers email and sends webhook back"
- "Our Delivery Status Service updates status to 'delivered'"
- "When user opens, tracking pixel fires - we record 'opened'"

**Total Latency:**
- "End-to-end: about 3-4 seconds from API call to inbox"

---

## 5️⃣ API DESIGN (2-3 minutes)

**"Here are the core APIs:"**

### 1. Send Notification (Primary API)
```
POST /v1/notifications
Headers:
  Authorization: Bearer <api_key>
  Idempotency-Key: <unique_id>

Request:
{
  "user_ids": ["user_123"],
  "template_id": "welcome_email_v2",
  "channel": "email",
  "priority": "high",
  "variables": {
    "first_name": "John",
    "reset_link": "https://..."
  },
  "scheduled_at": "2024-12-04T10:00:00Z" // optional
}

Response: HTTP 202 Accepted
{
  "notification_ids": ["notif_abc123"],
  "status": "accepted"
}
```

### 2. Get Notification Status
```
GET /v1/notifications/{notification_id}

Response:
{
  "notification_id": "notif_abc123",
  "user_id": "user_123",
  "status": "delivered",  // pending|sent|delivered|failed|opened
  "channel": "email",
  "created_at": "2024-12-03T12:00:00Z",
  "delivered_at": "2024-12-03T12:00:05Z"
}
```

### 3. User Preferences
```
GET /v1/users/{user_id}/preferences
PUT /v1/users/{user_id}/preferences

{
  "channels": {
    "email": {"enabled": true},
    "sms": {"enabled": false}
  },
  "quiet_hours": {
    "start": "22:00",
    "end": "08:00"
  }
}
```

### 4. Template Management
```
POST /v1/templates
GET /v1/templates/{template_id}

{
  "template_id": "password_reset_v1",
  "channel": "email",
  "subject": "Reset password for {{app_name}}",
  "body": "Click here: {{reset_link}}",
  "variables": ["app_name", "reset_link"]
}
```

### 5. Analytics
```
GET /v1/analytics?from=2024-12-01&to=2024-12-03&channel=email

Response:
{
  "total_sent": 1250000,
  "total_delivered": 1225000,
  "delivery_rate": 98.0,
  "open_rate": 50.0
}
```

---

## 6️⃣ DATABASE SCHEMAS (3-4 minutes)

**"Let me show the key table structures:"**

### PostgreSQL Tables

**1. Users Table**
```sql
CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    timezone VARCHAR(50) DEFAULT 'UTC',
    created_at TIMESTAMP DEFAULT NOW()
);
INDEX: email, created_at
```

**2. User Preferences Table**
```sql
CREATE TABLE user_preferences (
    user_id UUID PRIMARY KEY,
    channel_email_enabled BOOLEAN DEFAULT true,
    channel_sms_enabled BOOLEAN DEFAULT true,
    channel_push_enabled BOOLEAN DEFAULT true,
    quiet_hours_start TIME,
    quiet_hours_end TIME,
    frequency_caps JSONB,  -- {"marketing": {"max_per_day": 2}}
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
INDEX: user_id
```

**3. Templates Table**
```sql
CREATE TABLE templates (
    template_id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    channel VARCHAR(20) NOT NULL,  -- email|sms|push|in_app
    language VARCHAR(10) DEFAULT 'en',
    subject TEXT,
    body TEXT NOT NULL,
    variables TEXT[],  -- ['user.name', 'reset_link']
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW()
);
INDEX: channel, status, language
```

**4. Devices Table (for Push)**
```sql
CREATE TABLE devices (
    device_id VARCHAR(255) PRIMARY KEY,
    user_id UUID NOT NULL,
    platform VARCHAR(20) NOT NULL,  -- ios|android|web
    device_token TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    registered_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
INDEX: user_id, platform
```

---

### Redis Data Structures

**"Redis is used for caching and real-time data:"**

**1. Template Cache**
```
Key: template:{template_id}
Type: String (JSON)
TTL: 3600 seconds (1 hour)
Example: template:welcome_email_v2 → {JSON template data}
```

**2. User Preferences Cache**
```
Key: user_pref:{user_id}
Type: String (JSON)
TTL: 1800 seconds (30 minutes)
```

**3. Rate Limiting**
```
Key: ratelimit:{user_id}:{window}
Type: String (counter)
TTL: 3600 seconds
Example: ratelimit:user_123:hour → "45"
```

**4. Idempotency**
```
Key: idempotency:{idempotency_key}
Type: String (JSON response)
TTL: 86400 seconds (24 hours)
```

**5. Message Deduplication**
```
Key: msg_processed:{message_id}
Type: String
TTL: 86400 seconds
```

---

### Cassandra Tables

**"Cassandra handles high-write time-series data:"**

**1. Notification Events (main history table)**
```cql
CREATE TABLE notification_events (
    user_id UUID,
    event_time TIMESTAMP,
    notification_id UUID,
    event_type TEXT,  -- created|sent|delivered|failed|opened|clicked
    channel TEXT,
    template_id TEXT,
    status TEXT,
    provider TEXT,
    error_message TEXT,
    PRIMARY KEY (user_id, event_time, notification_id)
) WITH CLUSTERING ORDER BY (event_time DESC);

-- Query: Get user's notification history
SELECT * FROM notification_events 
WHERE user_id = ? AND event_time > ? LIMIT 100;
```

**2. Notification by ID (direct lookup)**
```cql
CREATE TABLE notification_by_id (
    notification_id UUID PRIMARY KEY,
    user_id UUID,
    channel TEXT,
    template_id TEXT,
    status TEXT,
    variables MAP<TEXT, TEXT>,
    created_at TIMESTAMP,
    sent_at TIMESTAMP,
    delivered_at TIMESTAMP,
    opened_at TIMESTAMP,
    provider TEXT,
    error_message TEXT
);

-- Query: Get specific notification details
SELECT * FROM notification_by_id WHERE notification_id = ?;
```

**3. Analytics Daily (aggregated metrics)**
```cql
CREATE TABLE analytics_daily (
    date DATE,
    channel TEXT,
    template_id TEXT,
    total_sent COUNTER,
    total_delivered COUNTER,
    total_failed COUNTER,
    total_opened COUNTER,
    total_clicked COUNTER,
    PRIMARY KEY (date, channel, template_id)
);

-- Update: Increment counters
UPDATE analytics_daily 
SET total_sent = total_sent + 1
WHERE date = '2024-12-03' AND channel = 'email';
```

---

### Common Questions You'll Get Asked:

**Q1: "What happens if workers start failing?"**

**Answer:**
- "We have multiple layers of failure handling to ensure reliability"

**Key points:**

1. **Auto-scaling with health checks**:
   - "Each worker has health check endpoints that report status to orchestrator"
   - "If worker becomes unhealthy (memory issues, thread pool exhausted), it stops receiving traffic"
   - "Kubernetes/ECS auto-restarts failed workers and spins up replacements"

2. **Kafka consumer groups handle failures gracefully**:
   - "Workers are in consumer groups - if one worker dies, Kafka rebalances"
   - "Messages get redistributed to healthy workers automatically"
   - "No messages are lost - Kafka retains them until processed"

3. **Circuit breaker prevents cascading failures**:
   - "If workers can't connect to third-party provider, circuit breaker opens"
   - "We fail fast and route to fallback provider (e.g., SendGrid → AWS SES)"
   - "Prevents workers from getting stuck waiting on a failing service"

4. **Dead Letter Queue (DLQ) for persistent failures**:
   - "After 3 retry attempts with exponential backoff, message goes to DLQ"
   - "DLQ alerts on-call engineers via PagerDuty when depth exceeds threshold"
   - "We can manually replay DLQ messages after fixing the issue"

5. **Graceful degradation**:
   - "If all workers for one channel fail (e.g., email workers), other channels (SMS, push) continue working"
   - "System doesn't go down completely - partial availability is maintained"

---

**Q2: "When does the circuit breaker trigger - if workers fail or if third-party providers fail?"**

**Answer:**
- "Circuit breaker monitors third-party provider failures, not worker failures"

**Key distinction:**

1. **Circuit breaker is for third-party provider reliability**:
   - "It's inside each worker, monitoring calls to external APIs (SendGrid, Twilio, FCM)"
   - "If provider returns 50% error rate or timeouts within a time window (e.g., 10 failures in 30 seconds), circuit opens"
   - "When open, we skip the failing provider and route to fallback immediately"

2. **Worker failures are handled differently**:
   - "Worker failures are handled by Kafka consumer group rebalancing"
   - "If a worker crashes, Kafka reassigns its partitions to healthy workers"
   - "No circuit breaker needed - orchestrator or container runtime restarts failed workers"

**Concrete example:**
```
Scenario: SendGrid API is down
- Worker is healthy and running fine
- But every call to SendGrid times out or returns 503 error
- Circuit breaker detects this pattern
- Circuit opens → worker switches to AWS SES fallback
- After 60 seconds, circuit breaker tries SendGrid again (half-open state)
- If successful, circuit closes; if still failing, stays open
```

**"So circuit breaker = external dependency protection. Worker restarts = internal failure handling."**

---

**Q3: "How do you change notification status to 'Opened' or 'Clicked'? Workers don't know if client opened the notification."**

**Answer:**
- "We use different tracking mechanisms per channel - it's asynchronous and event-driven"

**Key mechanisms:**

1. **Email tracking**:
   - **For 'Opened' status:**
     - "We embed a 1x1 transparent tracking pixel in the email HTML"
     - "Pixel URL: `https://tracking.ourservice.com/pixel?notification_id=abc123`"
     - "When user opens email, email client loads the pixel image"
     - "Our tracking service receives the GET request and updates status to 'opened' in Cassandra"
   
   - **For 'Clicked' status:**
     - "All links in email are rewritten to go through our redirect service"
     - "Original: `https://example.com/reset-password`"
     - "Rewritten: `https://tracking.ourservice.com/click?notification_id=abc123&target=https://example.com/reset-password`"
     - "When user clicks, we record 'clicked' status and redirect to original URL"

2. **Push notification tracking**:
   - "Mobile SDKs (iOS/Android) have callbacks for notification interactions"
   - "When user taps notification, app calls our API: `POST /v1/notifications/{id}/events` with event type 'opened'"
   - "We update status in Cassandra"

3. **SMS tracking**:
   - "For 'delivered' status, Twilio/AWS SNS sends webhook to our callback endpoint"
   - "For 'clicked' (if SMS contains links), we use URL shortener with tracking (similar to email)"

4. **In-app tracking**:
   - "Frontend directly calls: `PUT /v1/notifications/{id}/status` when user views or clicks"
   - "Since we control the client, tracking is straightforward"

**Architecture flow:**
```
[User Opens Email] 
    ↓
[Email Client Loads Tracking Pixel]
    ↓
[GET request to tracking.ourservice.com/pixel?notification_id=abc123]
    ↓
[Tracking Service (lightweight API)]
    ↓
[Updates Cassandra: SET status='opened', opened_at=NOW()]
    ↓
[Increments analytics counter in Redis]
```

**Important notes:**
- "Tracking pixel doesn't work if user has images disabled - we accept ~85-90% tracking accuracy"
- "We respect user privacy - tracking is anonymized, no cross-site tracking"
- "All tracking URLs have expiration (e.g., 30 days) to prevent abuse"

---

**Q: "Why do you have TWO Cassandra tables - notification_events and notification_by_id?"**

**Answer:**
- "This is a core Cassandra data modeling pattern - denormalization for query optimization"
- "In Cassandra, you model tables based on your query patterns, not normalize like SQL"

**Two different query patterns:**

1. **User wants their history**: "Show me MY notifications from last 7 days"
   - Use `notification_events` table
   - Partitioned by `user_id`, clustered by `event_time`
   - Query: `WHERE user_id = ? AND event_time > ?`
   - Very fast because all user's data is co-located on same node

2. **Backend wants specific notification**: "Get status of notification ABC123"
   - Use `notification_by_id` table
   - Partitioned by `notification_id`
   - Query: `WHERE notification_id = ?`
   - Fast direct lookup

**"If I only had notification_events partitioned by user_id, I couldn't efficiently look up by notification_id - I'd need to scan all partitions, which is very slow in Cassandra."**

**"So we duplicate data in both tables - this is normal in Cassandra. Storage is cheap, compute is expensive."**

---

**Q: "Why do you need a devices table for push notifications?"**

**Answer:**
- "Push notifications are different from email and SMS - they need device-specific tokens"

**Key points:**

1. **One user, multiple devices**:
   - "User might have iPhone, iPad, and Android phone"
   - "We need to send push to ALL their devices"
   - "Can't just store one token in users table"

2. **Device tokens are platform-specific**:
   - "FCM token for Android (Firebase Cloud Messaging)"
   - "APNS token for iOS (Apple Push Notification Service)"
   - "We need to know which provider to use for each device"

3. **Tokens expire or become invalid**:
   - "User uninstalls app - token becomes invalid"
   - "User logs out - we should stop sending to that device"
   - "Need `is_active` flag to manage this"

4. **Registration flow**:
   - "When user opens app, app registers with FCM/APNS"
   - "App gets device token and sends to our backend"
   - "We store it in devices table"

**Example:**
```
User John has:
- device_1: iPhone (APNS token abc123) - active
- device_2: iPad (APNS token def456) - active  
- device_3: Old Android (FCM token xyz789) - inactive (logged out)

When we send push to John:
1. Query: SELECT * FROM devices WHERE user_id = 'john' AND is_active = true
2. Get 2 devices (iPhone, iPad)
3. Send to APNS twice with their tokens
4. Don't send to old Android (inactive)
```

---

### What to Say About Schema Design:

**"Key design decisions:"**

1. **PostgreSQL for ACID**: "Users and templates need strong consistency"
2. **Redis for speed**: "Caching reduces DB load by 80%, sub-millisecond lookups"
3. **Cassandra for scale**: "Time-series data, partition by user_id for fast user queries"
4. **Indexes**: "Index on user_id, email for fast lookups; event_time for time-range queries"
5. **Partitioning**: "Cassandra partitions by user_id, Kafka by hash(user_id)"
6. **Denormalization in Cassandra**: "Duplicate data for different query patterns - storage is cheap"

---

## 7️⃣ DEEP DIVE (Pick 2-3 topics, 8-10 minutes)

### A. Circuit Breaker & Retry Logic

**"Let me explain how we handle provider failures:"**

- "Each worker has a circuit breaker pattern"
- "If SendGrid starts failing - say 50% error rate - circuit opens"
- "When circuit is open, we fail fast and try the fallback provider AWS SES"
- "For retries, we use exponential backoff: retry immediately, then 5 seconds, then 15 seconds"
- "After 3 failed attempts, message goes to Dead Letter Queue"
- "We alert on-call engineers when DLQ depth exceeds 100 messages"

### B. Idempotency & Deduplication

**"We prevent duplicate notifications in two ways:"**

**Client-side Idempotency:**
- "Client sends Idempotency-Key header with request"
- "We cache the response in Redis for 24 hours"
- "If same key comes again, we return cached response without sending duplicate"

**Worker-side Deduplication:**
- "We generate message ID from hash of user ID, template, and content"
- "Before processing, worker checks Redis if this message was already processed"
- "This handles accidental queue replays"

### C. Scalability & Sharding

**"Every component scales horizontally:"**

- "API Gateway: Add more instances behind load balancer"
- "Kafka: More partitions = more parallelism. We use 50 partitions"
- "Workers: Auto-scale based on queue depth"
- "PostgreSQL: Read replicas for queries, write master for updates"
- "Redis: Cluster mode with 6 nodes - 3 masters, 3 replicas"
- "Cassandra: Add nodes to cluster, data auto-rebalances"

**Partitioning Strategy:**
- "Kafka partitions by user_id hash - ensures all user's notifications go to same partition"
- "Cassandra partitions by user_id - fast lookups for user's notification history"

---

## 6️⃣ TRADE-OFFS (3-4 minutes)

**"Let me discuss some key design decisions:"**

### 1. Kafka vs RabbitMQ
- **"I chose Kafka because:"**
  - "Handles 1 million+ messages per second - we need 3,600 QPS"
  - "Persistence built-in - messages not lost if worker crashes"
  - "Trade-off: More complex to operate than RabbitMQ"

### 2. At-Least-Once vs Exactly-Once
- **"I chose at-least-once delivery with idempotency because:"**
  - "Exactly-once is very complex and expensive to implement"
  - "At-least-once + idempotency achieves same result"
  - "Trade-off: Possible duplicate sends, but our idempotency handles it"

### 3. PostgreSQL + Cassandra vs Single Database
- **"I use both because:"**
  - "PostgreSQL for ACID transactions - users, templates need consistency"
  - "Cassandra for high write throughput - millions of events per day"
  - "Right tool for right job"
  - "Trade-off: More operational complexity, but better performance"

### 4. Async API (HTTP 202)
- **"API returns 202 Accepted immediately because:"**
  - "Fast response to client - under 100ms"
  - "Actual sending happens async in background"
  - "Trade-off: Client must poll or use webhooks for status"

---

## 7️⃣ MONITORING & ALERTS (2-3 minutes)

**"For observability, we track three things:"**

### Metrics (Prometheus):
- "Request rate, error rate, latency - the RED metrics"
- "Queue depth and consumer lag"
- "Circuit breaker state per provider"
- "Delivery success rates per channel"

### Logging (ELK):
- "Structured JSON logs with trace IDs"
- "Track notification lifecycle - created, sent, delivered, opened"
- "Helps debug specific notification failures"

### Alerts:
- **Critical (PagerDuty):**
  - "Error rate above 1%"
  - "Dead Letter Queue depth above 1,000"
  - "Circuit breaker open for more than 5 minutes"

- **Warning (Slack):**
  - "Latency P95 above 10 seconds"
  - "Cache hit rate below 90%"

---

## 8️⃣ ADVANCED TOPICS (If time remains)

### If Asked About:

**Multi-tenancy:**
- "Add tenant_id to all tables"
- "Separate rate limits per tenant"
- "Isolated data using row-level security"

**Scheduled Notifications:**
- "Store with scheduled_at timestamp"
- "Cron job runs every minute, publishes due notifications to queue"

**A/B Testing:**
- "Store multiple template variants"
- "Randomly assign variant to user"
- "Track open/click rates per variant"
- "Automatically promote winner"

**Security:**
- "TLS for all API calls"
- "Database encryption at rest"
- "Mask PII in logs"
- "HMAC signatures on webhooks"

---

## 🎯 CLOSING (30 seconds)

**"In summary:"**
- ✅ "This architecture handles 100M+ notifications per day"
- ✅ "It's fault-tolerant with circuit breakers, retries, and DLQ"
- ✅ "It's scalable - every component scales horizontally"
- ✅ "It's observable with metrics, logs, and alerts"
- ✅ "It uses the right tool for each job - Kafka for queuing, PostgreSQL for consistency, Cassandra for high writes"

**"What would you like me to dive deeper into?"**

---

## 💡 TIPS FOR DURING INTERVIEW

### DO:
- ✅ Think out loud - explain your reasoning
- ✅ Draw diagrams - visual helps a lot
- ✅ Ask clarifying questions at the start
- ✅ Discuss trade-offs for every decision
- ✅ Mention monitoring and failure scenarios
- ✅ Use real numbers (1,200 QPS, not "many requests")

### DON'T:
- ❌ Jump straight to architecture without requirements
- ❌ Design everything perfectly - acknowledge what you'd improve
- ❌ Ignore the interviewer's hints
- ❌ Get stuck on details - stay high-level first
- ❌ Forget about scalability and reliability

---

## 📝 KEY NUMBERS TO MEMORIZE

- **100M** notifications/day
- **1,200 QPS** average, **3,600 QPS** peak
- **3 retries** max before DLQ
- **50** Kafka partitions
- **20** workers per channel
- **99.9%** uptime
- **<5s** latency target
- **90 days** retention in Cassandra
- **24 hours** idempotency cache

---

**Ready to ace the interview! 🚀**
