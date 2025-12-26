# Notification System Architecture - Complete Overview

## Table of Contents
1. [System Overview](#system-overview)
2. [Architecture Components](#architecture-components)
3. [Database Design](#database-design)
4. [Data Flow](#data-flow)
5. [Design Patterns](#design-patterns)
6. [Scalability & Performance](#scalability--performance)
7. [Reliability & Fault Tolerance](#reliability--fault-tolerance)
8. [Monitoring & Observability](#monitoring--observability)

---

## System Overview

This is a **production-ready notification system** designed to handle multiple notification channels (Email, SMS, Push, In-App) at scale. The architecture supports:

- **100M+ notifications per day**
- **Multi-channel delivery** (Email, SMS, Push, In-App)
- **Priority-based processing**
- **99.9% uptime SLA**
- **Sub-second latency** for high-priority notifications
- **At-least-once delivery** guarantee

---

## Architecture Components

### 1. Client Layer

**Purpose**: Entry points for notification requests

- **Web Applications**: Browser-based clients
- **Mobile Apps**: iOS and Android applications
- **Backend Services**: Internal microservices triggering notifications

**Authentication**: OAuth 2.0, JWT tokens

---

### 2. API Gateway Layer

#### Load Balancer
- **Technology**: AWS ALB, NGINX, HAProxy
- **Function**: Distributes traffic across multiple API gateways
- **Health Checks**: Active monitoring of gateway instances
- **SSL Termination**: HTTPS encryption

#### API Gateway
- **Instances**: Multiple for high availability
- **Responsibilities**:
  - Request validation
  - Authentication & Authorization
  - Request/Response transformation
  - API versioning
- **Technology**: Kong, AWS API Gateway, Custom Spring Boot

#### Rate Limiter
- **Algorithm**: Token bucket
- **Storage**: Redis for distributed rate limiting
- **Limits**:
  - Per user: 1000 requests/hour
  - Per API key: 10000 requests/hour
  - Per IP: 100 requests/minute
- **Response**: HTTP 429 (Too Many Requests) when exceeded

---

### 3. Core Services (Microservices)

#### Notification Service (Orchestrator)
**Primary coordinator** for all notification operations

**Responsibilities**:
- Validate incoming notification requests
- Check user preferences
- Fetch and compile templates
- Implement deduplication logic
- Publish messages to appropriate queues
- Track notification lifecycle

**Technology**: Java/Spring Boot, Node.js, Go

**Key Features**:
- Idempotency key validation
- Priority assignment
- Batch request handling
- Webhook registration

#### Template Service
**Manages all notification templates**

**Features**:
- Template CRUD operations
- Variable substitution (e.g., {{user.name}})
- Multi-language support (i18n)
- Template versioning
- A/B testing variants
- Template validation

**Storage**: PostgreSQL for templates, Redis for caching

**Example Template**:
```json
{
  "template_id": "welcome_email_v2",
  "channel": "email",
  "language": "en",
  "subject": "Welcome {{user.first_name}}!",
  "body": "Hi {{user.first_name}}, welcome to our platform...",
  "variables": ["user.first_name", "user.email"]
}
```

#### User Preference Service
**Manages user notification preferences**

**Features**:
- Opt-in/opt-out per channel
- Quiet hours configuration
- Frequency capping (max N notifications per day)
- Category-based preferences
- Device token management (for push)

**Storage**: PostgreSQL with Redis caching

**Example Preference**:
```json
{
  "user_id": "usr_12345",
  "channels": {
    "email": true,
    "sms": false,
    "push": true,
    "in_app": true
  },
  "quiet_hours": {
    "start": "22:00",
    "end": "08:00",
    "timezone": "America/Los_Angeles"
  },
  "frequency_cap": {
    "marketing": 2,
    "transactional": -1
  }
}
```

#### Analytics Service
**Tracks and aggregates notification metrics**

**Metrics Tracked**:
- Sent, delivered, failed, opened, clicked
- Delivery time (latency)
- Provider success rates
- User engagement rates
- Channel performance

**Storage**: Cassandra for time-series data

**Technology**: Kafka Streams, Apache Flink for real-time processing

#### Delivery Status Service
**Tracks notification delivery status**

**Features**:
- Status tracking (pending, sent, delivered, failed, opened, clicked)
- Webhook handling from providers
- Status query API
- Real-time status updates via WebSocket

**Storage**: Cassandra for delivery events

---

### 4. Message Queue Layer

#### Primary Queue (Kafka/RabbitMQ)

**Technology Choice**:
- **Kafka**: For high throughput (1M+ msgs/sec), persistence
- **RabbitMQ**: For complex routing, easier priority queues

**Configuration**:
- Replication factor: 3
- Partitions: 50 (for parallelism)
- Retention: 7 days
- Compression: LZ4

#### Priority Queues

**High Priority** (P0)
- Transactional notifications (OTP, password reset, payment confirmation)
- Target latency: < 1 second
- Dedicated consumer instances

**Medium Priority** (P1)
- User-triggered notifications (likes, comments, mentions)
- Target latency: < 5 seconds
- Shared consumer pool

**Low Priority** (P2)
- Marketing, newsletters, digests
- Target latency: < 1 minute
- Batch processing enabled

#### Dead Letter Queue (DLQ)

**Purpose**: Store messages that failed after max retries

**Features**:
- Automatic publishing after exhausting retries
- Alerts on DLQ threshold (>100 messages)
- Manual replay capability
- Investigation and debugging

**Retention**: 30 days

---

### 5. Channel Workers

Each worker is a **horizontally scalable microservice** consuming from priority queues.

#### Common Features (All Workers)
- **Circuit Breaker**: Fail fast when provider is down
  - Threshold: 50% error rate
  - Timeout: 5 seconds
  - Reset after: 30 seconds
- **Retry Logic**: Exponential backoff
  - Attempt 1: Immediate
  - Attempt 2: +5 seconds
  - Attempt 3: +15 seconds
  - Failed → DLQ
- **Idempotency**: Deduplication using message ID
- **Batch Processing**: Group messages for efficiency
- **Connection Pooling**: Reuse connections to providers

#### Email Worker
- **Providers**: SendGrid, AWS SES, Mailgun (fallback)
- **Batch Size**: 1000 emails per request
- **Features**:
  - HTML/Plain text support
  - Attachments
  - Tracking pixels (open tracking)
  - Link tracking (click tracking)
  - Bounce/complaint handling

#### SMS Worker
- **Providers**: Twilio, AWS SNS, Nexmo (fallback)
- **Features**:
  - International SMS support
  - Delivery receipts
  - Two-way SMS
  - Cost optimization (route selection)
- **Rate Limiting**: Provider-specific (70 msgs/sec for Twilio)

#### Push Notification Worker
- **Providers**:
  - FCM (Firebase Cloud Messaging) for Android
  - APNS (Apple Push Notification Service) for iOS
- **Features**:
  - Badge updates
  - Sound configuration
  - Rich media (images, videos)
  - Custom data payload
  - Silent notifications
- **Token Management**: Refresh expired device tokens

#### In-App Notification Worker
- **Delivery**: WebSocket server for real-time delivery
- **Fallback**: Polling API for offline users
- **Features**:
  - Real-time push
  - Read/unread status
  - Notification center
  - Action buttons

---

### 6. Third-Party Providers

#### Email Providers
- **Primary**: SendGrid
- **Secondary**: AWS SES
- **Tertiary**: Mailgun
- **Failover Logic**: Automatic switch on circuit breaker trip

#### SMS Providers
- **Primary**: Twilio
- **Secondary**: AWS SNS
- **Cost Optimization**: Route based on destination country

#### Push Providers
- **Android**: Firebase Cloud Messaging (FCM)
- **iOS**: Apple Push Notification Service (APNS)
- **Web**: Web Push Protocol

#### WebSocket Server
- **Technology**: Socket.io, ws (Node.js)
- **Scaling**: Redis pub/sub for multi-instance communication
- **Authentication**: JWT token validation

---

### 7. Database Layer

#### PostgreSQL (Relational Database)

**Use Cases**:
- User data and profiles
- Notification templates
- User preferences
- Audit logs
- Configuration data

**Schema Highlights**:
- `users` table with indexes on email, user_id
- `templates` table with versioning
- `user_preferences` with JSON columns
- `audit_logs` for compliance

**Scaling**:
- Read replicas for queries
- Write master for transactions
- Connection pooling (PgBouncer)

#### Redis (Cache & State)

**Use Cases**:
- Template caching (TTL: 1 hour)
- User preference caching (TTL: 30 minutes)
- Rate limiting counters
- Deduplication tracking (message IDs, TTL: 24 hours)
- Distributed locks
- Session storage
- WebSocket session management

**Configuration**:
- Cluster mode with 3 master + 3 replica nodes
- Eviction policy: LRU (Least Recently Used)
- Persistence: RDB snapshots + AOF

#### Cassandra (Time-Series Database)

**Use Cases**:
- Notification delivery history
- Analytics events
- Delivery status tracking
- Audit trail

**Schema**:
```cql
CREATE TABLE notification_events (
  user_id UUID,
  notification_id UUID,
  event_time TIMESTAMP,
  event_type TEXT,
  channel TEXT,
  status TEXT,
  metadata MAP<TEXT, TEXT>,
  PRIMARY KEY (user_id, event_time, notification_id)
) WITH CLUSTERING ORDER BY (event_time DESC);
```

**Benefits**:
- High write throughput (10K+ writes/sec per node)
- Time-based queries optimized
- Horizontal scaling
- No single point of failure

---

## Data Flow

### Notification Sending Flow (End-to-End)

```
1. Client sends POST /v1/notifications
   ↓
2. Load Balancer → API Gateway
   ↓
3. Rate Limiter checks (Redis)
   ↓
4. Notification Service receives request
   ↓
5. Validate request payload
   ↓
6. Check User Preference Service (Is user opted in?)
   ↓
7. Fetch template from Template Service (Redis cache hit?)
   ↓
8. Check deduplication (Redis: message_id exists?)
   ↓
9. Compile notification (template + variables)
   ↓
10. Assign priority (based on type)
   ↓
11. Publish to Message Queue (Kafka topic)
   ↓
12. Message Queue routes to Priority Queue
   ↓
13. Channel Worker consumes message
   ↓
14. Circuit Breaker check (Is provider healthy?)
   ↓
15. Send to Third-Party Provider (SendGrid, Twilio, etc.)
   ↓
16. (If success) Update Delivery Status Service → "sent"
   ↓
17. (If failure) Retry with exponential backoff
   ↓
18. (After max retries) Publish to Dead Letter Queue
   ↓
19. Analytics Service records event
   ↓
20. Provider sends delivery webhook
   ↓
21. Delivery Status Service updates → "delivered"
   ↓
22. User opens notification
   ↓
23. Tracking pixel loads / Link clicked
   ↓
24. Analytics Service records → "opened" / "clicked"
```

**Latency**:
- P0 (High Priority): < 1 second end-to-end
- P1 (Medium Priority): < 5 seconds
- P2 (Low Priority): < 60 seconds

---

## Design Patterns

### 1. Circuit Breaker Pattern

**Purpose**: Prevent cascading failures when external providers fail

**States**:
- **Closed**: Normal operation, requests pass through
- **Open**: Provider failing, requests fail fast
- **Half-Open**: Testing if provider recovered

**Implementation** (Resilience4j, Hystrix):
```java
@CircuitBreaker(name = "emailProvider", fallbackMethod = "fallbackSendEmail")
public void sendEmail(EmailRequest request) {
    // Call SendGrid API
}

public void fallbackSendEmail(EmailRequest request, Exception e) {
    // Try secondary provider (AWS SES)
}
```

### 2. Retry with Exponential Backoff

**Purpose**: Handle transient failures gracefully

**Strategy**:
- Initial retry: Immediate
- Retry 2: Wait 5 seconds
- Retry 3: Wait 15 seconds (5 * 3)
- Max retries: 3
- After max: Send to DLQ

**Benefits**:
- Reduces load during provider degradation
- Increases success rate for transient errors

### 3. Dead Letter Queue (DLQ)

**Purpose**: Isolate and handle permanently failed messages

**Features**:
- Automatic retry after manual investigation
- Alerting when DLQ depth > threshold
- Prevents blocking main queues
- Debugging and root cause analysis

### 4. Priority Queue

**Purpose**: Ensure critical notifications are processed first

**Implementation**:
- Separate queues for each priority
- Dedicated workers for high-priority queue
- Shared worker pool for medium/low priority

### 5. Idempotency

**Purpose**: Prevent duplicate message delivery

**Implementation**:
- Client provides `idempotency_key` (or auto-generated)
- System checks Redis: `exists(idempotency_key)`
- If exists: Return cached response (HTTP 200)
- If new: Process and cache result (TTL: 24 hours)

**Example**:
```bash
POST /v1/notifications
Headers:
  Idempotency-Key: req_abc123def456

# First call: Creates notification, caches result
# Second call: Returns cached result, no duplicate sent
```

### 6. Event-Driven Architecture

**Benefits**:
- Decoupling of services
- Async processing
- Horizontal scalability
- Resilience (queue as buffer)

---

## Scalability & Performance

### Horizontal Scaling

**Every layer can scale independently**:

| Component | Scaling Strategy |
|-----------|------------------|
| API Gateway | Add more instances behind load balancer |
| Notification Service | Stateless, auto-scale based on CPU |
| Workers | Increase consumer instances |
| Kafka | Add more brokers and partitions |
| PostgreSQL | Read replicas for queries |
| Redis | Cluster mode with sharding |
| Cassandra | Add more nodes to cluster |

### Performance Optimizations

1. **Caching**:
   - Templates cached in Redis (99% hit rate)
   - User preferences cached (95% hit rate)
   - Reduced database load by 80%

2. **Connection Pooling**:
   - Database connections reused (HikariCP)
   - HTTP clients with persistent connections
   - Reduced connection overhead

3. **Batch Processing**:
   - Email worker sends 1000 emails per API call
   - Reduces API overhead
   - Provider cost optimization

4. **Async Processing**:
   - Non-blocking I/O (Node.js, Netty)
   - High concurrency with low resource usage

5. **Database Indexing**:
   - Indexes on frequently queried columns
   - Composite indexes for complex queries
   - Query optimization

### Capacity Planning

**For 100M notifications/day**:

| Metric | Value |
|--------|-------|
| Average rate | 1,157 msgs/sec |
| Peak rate (3x) | 3,472 msgs/sec |
| Kafka partitions | 50 |
| Worker instances | 20 (per channel) |
| API Gateway instances | 10 |
| PostgreSQL | 1 master + 3 read replicas |
| Redis | 6-node cluster (3 master + 3 replica) |
| Cassandra | 9-node cluster |

---

## Reliability & Fault Tolerance

### At-Least-Once Delivery

**Guarantee**: Every valid notification is delivered at least once

**Mechanism**:
1. Message persisted in Kafka (replication factor 3)
2. Worker processes message
3. Acknowledgment only after successful delivery
4. On failure: Message redelivered from queue

**Trade-off**: Possible duplicates (handled by idempotency)

### Redundancy

- **Multi-AZ Deployment**: Services across 3 availability zones
- **Database Replication**: PostgreSQL master + replicas
- **Kafka Replication**: 3x replication
- **Redis Cluster**: Master + replicas per shard

### Graceful Degradation

**When external provider fails**:
1. Circuit breaker opens
2. Fallback to secondary provider
3. If all providers down: Queue messages
4. Retry when providers recover
5. Alert on-call engineer

**When database is slow**:
1. Serve from cache (Redis)
2. Increase cache TTL temporarily
3. Queue writes for batch processing
4. Return HTTP 202 (Accepted) instead of 200

### Disaster Recovery

- **Backup Strategy**:
  - PostgreSQL: Daily full backup + WAL archiving
  - Cassandra: Daily snapshots
  - Kafka: Replicated across data centers
  
- **Recovery Time Objective (RTO)**: < 1 hour
- **Recovery Point Objective (RPO)**: < 5 minutes

---

## Monitoring & Observability

### Metrics (Prometheus)

**System Metrics**:
- CPU, memory, disk, network per instance
- Request rate, error rate, latency (RED method)
- Queue depth, consumer lag

**Business Metrics**:
- Notifications sent per channel
- Delivery success rate
- Average delivery time
- Cost per notification

**SLIs (Service Level Indicators)**:
- Availability: 99.9%
- Latency P95: < 5 seconds
- Error rate: < 0.1%

### Logging (ELK Stack)

**Components**:
- **Elasticsearch**: Log storage and search
- **Logstash**: Log aggregation
- **Kibana**: Visualization and dashboards

**Log Levels**:
- ERROR: Provider failures, database errors
- WARN: Retry attempts, slow queries
- INFO: Notification lifecycle events
- DEBUG: Detailed request/response

**Structured Logging** (JSON):
```json
{
  "timestamp": "2024-12-03T12:35:23Z",
  "level": "INFO",
  "service": "notification-service",
  "trace_id": "abc123",
  "user_id": "usr_456",
  "notification_id": "notif_789",
  "message": "Notification sent successfully",
  "channel": "email",
  "latency_ms": 1250
}
```

### Distributed Tracing

**Technology**: Jaeger, Zipkin

**Benefits**:
- Track request across microservices
- Identify bottlenecks
- Measure end-to-end latency

### Alerting

**Critical Alerts** (PagerDuty):
- API error rate > 1%
- DLQ depth > 1000
- Provider circuit breaker open > 5 minutes
- Database connection pool exhausted

**Warning Alerts** (Slack):
- Latency P95 > 10 seconds
- Cache hit rate < 90%
- Disk usage > 80%

### Dashboards (Grafana)

1. **System Overview**: Health of all services
2. **Channel Performance**: Per-channel delivery metrics
3. **Provider Status**: Success rates per provider
4. **Queue Metrics**: Depth, lag, throughput
5. **Business KPIs**: Daily notifications, engagement rates

---

## Security Considerations

### Authentication & Authorization
- **API Keys**: For service-to-service
- **OAuth 2.0**: For user-facing applications
- **JWT Tokens**: Stateless authentication
- **Role-Based Access Control (RBAC)**: Admin, user, service roles

### Data Protection
- **Encryption in Transit**: TLS 1.3 for all API calls
- **Encryption at Rest**: Database encryption (PostgreSQL, Cassandra)
- **PII Handling**: Hash/mask sensitive data in logs
- **GDPR Compliance**: User data deletion API

### Rate Limiting
- Prevents abuse and DDoS
- Token bucket algorithm
- Per user, per API key, per IP

### Input Validation
- Schema validation (JSON Schema)
- SQL injection prevention (parameterized queries)
- XSS prevention (sanitize template variables)

---

## Advanced Features

### 1. Scheduled Notifications
- Cron-based scheduling
- Time zone aware delivery
- Recurring notifications (daily digest)

### 2. Notification Batching/Digest
- Combine multiple notifications
- Send as single email/push
- Reduce notification fatigue

### 3. A/B Testing
- Test template variants
- Measure engagement (open rate, click rate)
- Auto-select winning variant

### 4. Multi-Tenancy
- Isolated data per tenant
- Per-tenant rate limits
- Custom branding per tenant

### 5. Webhook Callbacks
- Notify client of delivery status
- Retry on callback failure
- Signature verification (HMAC)

---

## Trade-Offs & Design Decisions

### 1. Kafka vs RabbitMQ
**Chosen**: Kafka

| Aspect | Kafka | RabbitMQ |
|--------|-------|----------|
| Throughput | Very High (1M+ msgs/sec) | Moderate (10K msgs/sec) |
| Persistence | Excellent (disk-based) | Good (optional) |
| Ordering | Per partition | Per queue |
| Priority Queues | Manual (topics) | Built-in |
| Learning Curve | Steep | Gentle |

**Rationale**: High throughput and persistence outweigh complexity

### 2. PostgreSQL + Cassandra vs Single Database
**Chosen**: Hybrid approach

**Rationale**:
- PostgreSQL: ACID transactions for critical data (users, templates)
- Cassandra: High write throughput for time-series (events, logs)
- Best tool for each use case

### 3. At-Least-Once vs Exactly-Once Delivery
**Chosen**: At-least-once with idempotency

**Rationale**:
- Exactly-once is very complex and expensive
- At-least-once + idempotency achieves same outcome
- Simpler implementation, better performance

### 4. Sync vs Async API
**Chosen**: Async (HTTP 202 Accepted)

**Rationale**:
- Faster response time (< 100ms)
- Better scalability
- Client polling or webhooks for status

---

## Conclusion

This notification system architecture is **production-ready** and demonstrates:

✅ **Scalability**: 100M+ notifications/day  
✅ **Reliability**: 99.9% uptime, at-least-once delivery  
✅ **Performance**: Sub-second latency for critical notifications  
✅ **Fault Tolerance**: Circuit breakers, retries, DLQ  
✅ **Observability**: Comprehensive monitoring and logging  
✅ **Flexibility**: Multi-channel, multi-provider support  

This design is suitable for **senior-level system design interviews** and **real-world production deployment**.
