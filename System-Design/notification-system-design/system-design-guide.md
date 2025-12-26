# Notification System - System Design Interview Guide

## Interview Structure (45-60 minutes)

1. **Requirements Clarification** (5-10 min)
2. **High-Level Design** (10-15 min)
3. **Detailed Design** (15-20 min)
4. **Scalability & Reliability** (10-15 min)
5. **Trade-offs & Advanced Topics** (5-10 min)

---

## 1. Requirements Clarification

### Functional Requirements

**Ask these questions to clarify scope:**

- **What types of notifications?**
  - Push notifications (mobile)
  - SMS
  - Email
  - In-app notifications
  - Webhooks
  
- **Who are the users?**
  - Scale: 100M users? 1B users?
  - Geographic distribution?
  
- **What triggers notifications?**
  - User actions (likes, comments, follows)
  - System events (payment confirmations, alerts)
  - Scheduled notifications (reminders, newsletters)
  - Real-time vs batch processing?

- **User preferences?**
  - Can users opt-in/opt-out?
  - Notification frequency limits?
  - Quiet hours?
  - Channel preferences?

- **Priority levels?**
  - Critical (security alerts)
  - High (payment confirmations)
  - Medium (social updates)
  - Low (marketing)

### Non-Functional Requirements

- **Scalability**: Handle millions of notifications per second
- **Reliability**: 99.9%+ uptime, no lost notifications
- **Latency**: 
  - Critical: < 1 second
  - High: < 5 seconds
  - Medium/Low: < 30 seconds
- **Availability**: Highly available, fault-tolerant
- **Security**: Encrypted, authenticated, authorized
- **Compliance**: GDPR, CAN-SPAM, data privacy

### Capacity Estimation

**Example calculations (for 100M users):**

- **Daily Active Users (DAU)**: 50M (50% of total)
- **Notifications per user per day**: 10
- **Total daily notifications**: 500M
- **Notifications per second (avg)**: 500M / 86400 ≈ 5,800 QPS
- **Peak load (3x average)**: ~17,500 QPS

**Storage:**
- Notification metadata: ~1KB per notification
- Daily storage: 500M × 1KB = 500GB/day
- Retention (30 days): ~15TB

**Bandwidth:**
- Average: 5,800 × 1KB ≈ 5.8 MB/s
- Peak: ~17.5 MB/s

---

## 2. High-Level Architecture

```
┌─────────────────┐
│  Client Apps    │
│ (Mobile/Web)    │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────────────────────┐
│              API Gateway / Load Balancer            │
└────────┬────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────┐
│         Notification Service (Orchestrator)         │
│  - Validates requests                               │
│  - Checks user preferences                          │
│  - Applies rate limiting                            │
│  - Routes to appropriate channels                   │
└────────┬────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────┐
│              Message Queue (Kafka/SQS)              │
│  - Decouples producers from consumers               │
│  - Handles backpressure                             │
│  - Provides ordering guarantees                     │
└────────┬────────────────────────────────────────────┘
         │
         ├──────────┬──────────┬──────────┬────────────┐
         ▼          ▼          ▼          ▼            ▼
    ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌──────────┐
    │  Push  │ │  SMS   │ │ Email  │ │ In-App │ │ Webhook  │
    │ Worker │ │ Worker │ │ Worker │ │ Worker │ │  Worker  │
    └────┬───┘ └────┬───┘ └────┬───┘ └────┬───┘ └────┬─────┘
         │          │          │          │          │
         ▼          ▼          ▼          ▼          ▼
    ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌──────────┐
    │  APNs  │ │Twilio/ │ │SendGrid│ │  DB    │ │ HTTP     │
    │  FCM   │ │ SNS    │ │  SES   │ │        │ │ Client   │
    └────────┘ └────────┘ └────────┘ └────────┘ └──────────┘

┌─────────────────────────────────────────────────────┐
│              Supporting Services                    │
├─────────────────────────────────────────────────────┤
│  - User Preferences Service                         │
│  - Template Service                                 │
│  - Analytics Service                                │
│  - Rate Limiter                                     │
│  - Retry/Dead Letter Queue Handler                 │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│                  Data Stores                        │
├─────────────────────────────────────────────────────┤
│  - User DB (Postgres/MySQL)                         │
│  - Notification History (Cassandra/DynamoDB)        │
│  - Cache (Redis/Memcached)                          │
│  - Device Token Store (Redis)                       │
└─────────────────────────────────────────────────────┘
```

### Key Components:

1. **API Gateway**: Entry point, authentication, rate limiting
2. **Notification Service**: Core orchestration logic
3. **Message Queue**: Decoupling and buffering
4. **Channel Workers**: Specialized handlers for each notification type
5. **Third-party Providers**: APNs, FCM, Twilio, SendGrid, etc.
6. **Data Stores**: User data, preferences, notification history

---

## 3. Detailed Component Design

### 3.1 Notification Service (Core Orchestrator)

**Responsibilities:**
- Receive notification requests from upstream services
- Validate payload and authentication
- Fetch user preferences from cache/DB
- Apply business logic (rate limiting, quiet hours, deduplication)
- Enrich notification with templates
- Route to appropriate message queue topics

**API Design:**

```json
POST /api/v1/notifications/send
{
  "user_id": "12345",
  "notification_type": "order_confirmation",
  "priority": "high",
  "channels": ["push", "email"],
  "payload": {
    "order_id": "ORD-789",
    "amount": "$99.99",
    "items": ["Product A", "Product B"]
  },
  "metadata": {
    "idempotency_key": "uuid-1234",
    "scheduled_at": "2024-01-01T10:00:00Z"
  }
}
```

**Response:**
```json
{
  "notification_id": "notif-abc123",
  "status": "queued",
  "channels": {
    "push": "queued",
    "email": "queued"
  }
}
```

### 3.2 Message Queue Architecture

**Topic Structure:**
- `notifications.push.high`
- `notifications.push.medium`
- `notifications.push.low`
- `notifications.email.high`
- `notifications.sms.high`
- etc.

**Why Kafka/SQS?**
- **Kafka**: High throughput, ordering guarantees, replay capability
- **SQS**: Managed service, simpler operations, good for AWS ecosystem

**Partitioning Strategy:**
- Partition by `user_id` to maintain ordering per user
- Separate topics by priority for different SLAs

### 3.3 Channel Workers

#### Push Notification Worker

```python
class PushNotificationWorker:
    def process_message(self, message):
        user_id = message['user_id']
        
        # 1. Get device tokens from cache/DB
        device_tokens = self.get_device_tokens(user_id)
        
        # 2. Check user preferences
        if not self.check_push_enabled(user_id):
            return self.skip_notification(message)
        
        # 3. Apply template
        notification = self.apply_template(message)
        
        # 4. Send to FCM/APNs
        for token in device_tokens:
            try:
                if token.platform == 'ios':
                    self.send_apns(token, notification)
                else:
                    self.send_fcm(token, notification)
                    
                # 5. Track delivery
                self.track_sent(message.id, token)
                
            except InvalidTokenError:
                self.remove_device_token(token)
            except Exception as e:
                self.retry_or_dlq(message, e)
```

**Key Considerations:**
- **Token Management**: Invalid tokens should be removed
- **Batching**: Send multiple notifications in batches to providers
- **Retry Logic**: Exponential backoff for transient failures
- **Dead Letter Queue**: For persistent failures

#### Email Worker

- Use SendGrid, AWS SES, or similar
- Template rendering with personalization
- Track opens, clicks, bounces
- Handle unsubscribes
- Batch sending for efficiency

#### SMS Worker

- Use Twilio, AWS SNS, or similar
- Character limit handling
- Cost optimization (SMS is expensive)
- Carrier-specific handling
- Delivery receipts

### 3.4 User Preferences Service

**Schema:**
```sql
CREATE TABLE user_preferences (
    user_id BIGINT PRIMARY KEY,
    push_enabled BOOLEAN DEFAULT true,
    email_enabled BOOLEAN DEFAULT true,
    sms_enabled BOOLEAN DEFAULT false,
    quiet_hours_start TIME,
    quiet_hours_end TIME,
    timezone VARCHAR(50),
    frequency_limit INT DEFAULT 50, -- max per day
    channel_preferences JSONB,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE notification_subscriptions (
    user_id BIGINT,
    notification_type VARCHAR(100),
    channel VARCHAR(20),
    enabled BOOLEAN DEFAULT true,
    PRIMARY KEY (user_id, notification_type, channel)
);
```

**Caching Strategy:**
- Cache user preferences in Redis with TTL of 5-10 minutes
- Invalidate on preference updates
- Fallback to DB on cache miss

### 3.5 Template Service

**Purpose:** Centralized template management for consistency

```json
{
  "template_id": "order_confirmation",
  "channels": {
    "push": {
      "title": "Order Confirmed! 🎉",
      "body": "Your order {{order_id}} for {{amount}} is confirmed.",
      "action": "VIEW_ORDER",
      "deep_link": "app://orders/{{order_id}}"
    },
    "email": {
      "subject": "Order Confirmation - {{order_id}}",
      "html_template": "templates/order_confirmation.html",
      "text_template": "templates/order_confirmation.txt"
    },
    "sms": {
      "body": "Order {{order_id}} confirmed. Total: {{amount}}. Track: {{tracking_url}}"
    }
  }
}
```

**Features:**
- A/B testing support
- Localization (i18n)
- Dynamic content rendering
- Version control

### 3.6 Rate Limiter

**Algorithms:**
- **Token Bucket**: Smooth rate limiting
- **Sliding Window**: More accurate but complex

**Implementation:**
```python
class RateLimiter:
    def check_rate_limit(self, user_id, notification_type):
        key = f"rate_limit:{user_id}:{notification_type}"
        
        # Get user's daily limit
        limit = self.get_user_limit(user_id, notification_type)
        
        # Check current count in Redis
        current = redis.get(key) or 0
        
        if current >= limit:
            return False, "Rate limit exceeded"
        
        # Increment with expiry
        redis.incr(key)
        redis.expire(key, 86400)  # 24 hours
        
        return True, None
```

**Multi-level Rate Limiting:**
- Per user per day
- Per user per notification type
- Global system limits

---

## 4. Data Models

### 4.1 Notification Schema

```sql
-- Main notification table (Cassandra/DynamoDB for scale)
CREATE TABLE notifications (
    notification_id UUID PRIMARY KEY,
    user_id BIGINT,
    notification_type VARCHAR(100),
    priority VARCHAR(20),
    status VARCHAR(20), -- queued, sent, delivered, failed, read
    channels JSONB,
    payload JSONB,
    created_at TIMESTAMP,
    sent_at TIMESTAMP,
    delivered_at TIMESTAMP,
    read_at TIMESTAMP,
    ttl INT -- Time to live in seconds
);

-- Index for user queries
CREATE INDEX idx_user_notifications ON notifications(user_id, created_at DESC);

-- Delivery tracking
CREATE TABLE notification_delivery (
    notification_id UUID,
    channel VARCHAR(20),
    provider VARCHAR(50),
    status VARCHAR(20),
    error_message TEXT,
    attempted_at TIMESTAMP,
    delivered_at TIMESTAMP,
    PRIMARY KEY (notification_id, channel)
);

-- Device tokens
CREATE TABLE device_tokens (
    user_id BIGINT,
    token VARCHAR(500),
    platform VARCHAR(20), -- ios, android, web
    app_version VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP,
    last_used_at TIMESTAMP,
    PRIMARY KEY (user_id, token)
);
```

### 4.2 Database Choices

**User Data & Preferences:**
- **PostgreSQL/MySQL**: ACID compliance, relational integrity
- Moderate scale (millions of users)

**Notification History:**
- **Cassandra**: Write-heavy, time-series data, horizontal scaling
- **DynamoDB**: Managed, auto-scaling, good for AWS
- TTL support for automatic cleanup

**Caching:**
- **Redis**: User preferences, device tokens, rate limiting
- **Memcached**: Simple key-value caching

---

## 5. Scalability & Reliability

### 5.1 Scalability Strategies

**Horizontal Scaling:**
- Stateless notification service → scale with load balancer
- Worker pools → add more workers per channel
- Database sharding → shard by user_id

**Partitioning:**
- Message queue partitions by user_id or priority
- Database sharding by user_id ranges

**Caching:**
- Cache user preferences (Redis)
- Cache templates
- Cache device tokens
- CDN for static assets in emails

**Async Processing:**
- All channel delivery is async via message queues
- Non-blocking I/O in workers

### 5.2 Reliability & Fault Tolerance

**Retry Mechanisms:**
```python
def send_with_retry(notification, max_retries=3):
    for attempt in range(max_retries):
        try:
            return send_notification(notification)
        except TransientError as e:
            if attempt < max_retries - 1:
                sleep(2 ** attempt)  # Exponential backoff
                continue
            else:
                send_to_dlq(notification, e)
```

**Dead Letter Queue (DLQ):**
- Capture failed notifications after max retries
- Manual review and reprocessing
- Alert on DLQ depth

**Idempotency:**
- Use `idempotency_key` in requests
- Store processed keys in Redis with TTL
- Prevent duplicate notifications

**Circuit Breaker:**
- Protect against cascading failures
- If third-party provider is down, fail fast
- Automatic recovery when provider is back

**Monitoring & Alerting:**
- Metrics: QPS, latency, error rate, queue depth
- Alerts: High error rate, DLQ depth, latency spikes
- Dashboards: Real-time system health

### 5.3 High Availability

**Multi-Region Deployment:**
- Active-active or active-passive
- Geo-routing for lower latency
- Data replication across regions

**Database Replication:**
- Master-slave for reads
- Multi-master for writes (with conflict resolution)

**Message Queue:**
- Kafka: Multi-broker, replication factor 3
- SQS: Inherently distributed and replicated

**Load Balancing:**
- Health checks on service instances
- Automatic failover

---

## 6. Advanced Topics (Senior Engineer Focus)

### 6.1 Deduplication

**Problem:** Same notification triggered multiple times

**Solutions:**
1. **Idempotency Keys**: Client-provided unique keys
2. **Content-based Hashing**: Hash (user_id + type + payload)
3. **Time Window**: Dedupe within 5-minute window

```python
def deduplicate(notification):
    key = f"dedup:{notification.user_id}:{notification.type}"
    hash_value = hash(notification.payload)
    
    existing = redis.get(key)
    if existing == hash_value:
        return True  # Duplicate
    
    redis.setex(key, 300, hash_value)  # 5 min TTL
    return False
```

### 6.2 Notification Aggregation

**Problem:** Too many notifications overwhelm users

**Solutions:**
1. **Batching**: "You have 5 new messages" instead of 5 separate
2. **Digest**: Daily/weekly summary emails
3. **Smart Grouping**: Group by type or source

```python
def aggregate_notifications(user_id):
    pending = get_pending_notifications(user_id)
    
    grouped = defaultdict(list)
    for notif in pending:
        grouped[notif.type].append(notif)
    
    for notif_type, notifs in grouped.items():
        if len(notifs) > 3:
            send_aggregated(user_id, notif_type, len(notifs))
        else:
            for notif in notifs:
                send_individual(notif)
```

### 6.3 Priority Queue & SLA Management

**Different SLAs by Priority:**
- Critical: < 1s, dedicated high-throughput queue
- High: < 5s, separate queue with more workers
- Medium/Low: < 30s, shared queue

**Implementation:**
- Separate Kafka topics per priority
- Different worker pool sizes
- Priority-based routing in orchestrator

### 6.4 Analytics & Tracking

**Metrics to Track:**
- Sent, delivered, opened, clicked, converted
- Delivery rate by channel
- User engagement by notification type
- A/B test results

**Implementation:**
- Event streaming to data warehouse (Snowflake, BigQuery)
- Real-time analytics with Kafka Streams or Flink
- Dashboards with Grafana, Tableau

### 6.5 Personalization & ML

**Use Cases:**
- Optimal send time per user (ML model)
- Channel preference prediction
- Content personalization
- Churn prediction (re-engagement campaigns)

**Architecture:**
- Feature store for user features
- ML model serving (TensorFlow Serving, SageMaker)
- A/B testing framework

### 6.6 Security & Privacy

**Security:**
- TLS for all communication
- API authentication (OAuth 2.0, JWT)
- Encryption at rest for sensitive data
- PII handling and masking

**Privacy:**
- GDPR compliance: Right to be forgotten
- User consent management
- Data retention policies
- Audit logs

### 6.7 Cost Optimization

**Strategies:**
- SMS is expensive → prefer push/email when possible
- Batch API calls to third-party providers
- Intelligent retry (don't retry on permanent failures)
- Auto-scaling workers based on queue depth
- Reserved capacity for predictable load

---

## 7. Trade-offs & Discussion Points

### Message Queue: Kafka vs SQS

| Aspect | Kafka | SQS |
|--------|-------|-----|
| Throughput | Very high | High |
| Ordering | Per partition | FIFO queues only |
| Replay | Yes | No |
| Operations | Complex | Managed |
| Cost | Infrastructure | Pay per request |

**Recommendation:** Kafka for high scale, SQS for simpler operations

### Database: SQL vs NoSQL

| Aspect | PostgreSQL | Cassandra/DynamoDB |
|--------|------------|-------------------|
| Use Case | User data, preferences | Notification history |
| Scale | Vertical + sharding | Horizontal |
| Consistency | Strong | Eventual |
| Query Flexibility | High | Limited |

**Recommendation:** Hybrid approach

### Push vs Pull for In-App Notifications

**Push (WebSockets):**
- Real-time delivery
- Complex infrastructure
- Connection management overhead

**Pull (Polling):**
- Simpler implementation
- Higher latency
- More API calls

**Recommendation:** WebSockets for real-time, polling as fallback

---

## 8. Interview Best Practices

### Do's:
✅ **Clarify requirements** before jumping into design  
✅ **Start with high-level** architecture, then drill down  
✅ **Discuss trade-offs** for every decision  
✅ **Consider failure scenarios** and how to handle them  
✅ **Think about scale** from the beginning  
✅ **Ask questions** to show you're thinking critically  
✅ **Use numbers** to justify your design decisions  
✅ **Draw diagrams** to visualize architecture  
✅ **Mention monitoring** and observability  
✅ **Discuss operational concerns** (deployment, rollback)  

### Don'ts:
❌ Don't jump into implementation details too early  
❌ Don't ignore non-functional requirements  
❌ Don't design for infinite scale if not needed  
❌ Don't forget about the user experience  
❌ Don't overlook security and privacy  
❌ Don't be afraid to say "I don't know, but here's how I'd find out"  

---

## 9. Common Interview Questions

**Q: How do you handle notification delivery failures?**
- Retry with exponential backoff
- Dead letter queue for persistent failures
- Circuit breaker for third-party provider outages
- Fallback channels (if push fails, try email)

**Q: How do you prevent notification spam?**
- Rate limiting per user
- Frequency capping
- User preferences and quiet hours
- Aggregation and batching
- Unsubscribe mechanisms

**Q: How do you ensure exactly-once delivery?**
- Idempotency keys
- Deduplication logic
- Transaction logs
- **Note:** In practice, at-least-once is more common; handle duplicates on client side

**Q: How do you handle multi-region deployments?**
- Active-active with geo-routing
- Data replication with conflict resolution
- Regional message queues
- CDN for static content

**Q: How do you measure success?**
- Delivery rate (sent vs delivered)
- Engagement rate (opened, clicked)
- Conversion rate (action taken)
- User satisfaction (opt-out rate)
- System SLAs (latency, uptime)

**Q: How do you handle device token management?**
- Store in Redis for fast lookup
- Invalidate on delivery failure
- Periodic cleanup of inactive tokens
- Support multiple devices per user

**Q: What happens if the message queue is full?**
- Backpressure: Slow down producers
- Priority-based eviction (drop low priority)
- Scale queue infrastructure
- Alert and investigate root cause

---

## 10. Sample Interview Flow

**Minute 0-5: Requirements**
- "Let me clarify the requirements..."
- Ask about scale, channels, use cases
- Define functional and non-functional requirements

**Minute 5-15: High-Level Design**
- Draw architecture diagram
- Explain data flow
- Identify key components
- Discuss technology choices

**Minute 15-35: Deep Dive**
- Pick 2-3 components to detail (interviewer may guide)
- API design
- Database schema
- Scalability strategies
- Failure handling

**Minute 35-50: Advanced Topics**
- Deduplication
- Rate limiting
- Analytics
- Security
- Cost optimization

**Minute 50-60: Q&A and Wrap-up**
- Answer interviewer questions
- Discuss trade-offs
- Mention what you'd do differently with more time

---

## Summary Checklist

Before ending the interview, ensure you've covered:

- [ ] Clarified functional and non-functional requirements
- [ ] Provided capacity estimates with calculations
- [ ] Drew a clear high-level architecture diagram
- [ ] Explained data flow through the system
- [ ] Designed APIs and data models
- [ ] Discussed scalability strategies
- [ ] Addressed reliability and fault tolerance
- [ ] Covered at least 2-3 advanced topics
- [ ] Mentioned monitoring and alerting
- [ ] Discussed trade-offs for key decisions
- [ ] Showed senior-level thinking (operations, cost, security)

---

## Additional Resources

- **System Design Primer**: https://github.com/donnemartin/system-design-primer
- **Designing Data-Intensive Applications** by Martin Kleppmann
- **FCM Documentation**: https://firebase.google.com/docs/cloud-messaging
- **APNs Documentation**: https://developer.apple.com/documentation/usernotifications
- **Kafka Documentation**: https://kafka.apache.org/documentation/

---

Good luck with your interview! Remember to stay calm, think out loud, and engage with the interviewer. They want to see your thought process, not just the final design.
