# Database Schemas

This document details the database schemas for the Notification System across PostgreSQL, Redis, and Cassandra.

---

## PostgreSQL Schemas

PostgreSQL is used for transactional data requiring ACID properties.

### 1. Users Table

```sql
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    timezone VARCHAR(50) DEFAULT 'UTC',
    language VARCHAR(10) DEFAULT 'en',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);
```

### 2. User Preferences Table

```sql
CREATE TABLE user_preferences (
    preference_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    channel_email_enabled BOOLEAN DEFAULT true,
    channel_sms_enabled BOOLEAN DEFAULT true,
    channel_push_enabled BOOLEAN DEFAULT true,
    channel_inapp_enabled BOOLEAN DEFAULT true,
    quiet_hours_enabled BOOLEAN DEFAULT false,
    quiet_hours_start TIME,
    quiet_hours_end TIME,
    quiet_hours_timezone VARCHAR(50),
    frequency_caps JSONB DEFAULT '{}',
    category_preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)
);

CREATE INDEX idx_user_preferences_user_id ON user_preferences(user_id);
```

**Example `frequency_caps` JSONB**:
```json
{
  "marketing": {"max_per_day": 2, "max_per_week": 10},
  "transactional": {"max_per_day": -1}
}
```

**Example `category_preferences` JSONB**:
```json
{
  "promotional": false,
  "transactional": true,
  "social": true,
  "system": true
}
```

### 3. Devices Table (Push Notifications)

```sql
CREATE TABLE devices (
    device_id VARCHAR(255) PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    platform VARCHAR(20) NOT NULL, -- 'ios', 'android', 'web'
    device_token TEXT NOT NULL,
    app_version VARCHAR(50),
    os_version VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_seen_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_devices_user_id ON devices(user_id);
CREATE INDEX idx_devices_platform ON devices(platform);
```

### 4. Templates Table

```sql
CREATE TABLE templates (
    template_id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    channel VARCHAR(20) NOT NULL, -- 'email', 'sms', 'push', 'in_app'
    language VARCHAR(10) DEFAULT 'en',
    subject TEXT,
    body TEXT NOT NULL,
    variables TEXT[], -- Array of variable names
    version INTEGER DEFAULT 1,
    status VARCHAR(20) DEFAULT 'active', -- 'active', 'draft', 'archived'
    metadata JSONB DEFAULT '{}',
    created_by VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_templates_channel ON templates(channel);
CREATE INDEX idx_templates_status ON templates(status);
CREATE INDEX idx_templates_language ON templates(language);
```

### 5. Audit Logs Table

```sql
CREATE TABLE audit_logs (
    log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type VARCHAR(50) NOT NULL, -- 'notification', 'user', 'template'
    entity_id VARCHAR(255) NOT NULL,
    action VARCHAR(50) NOT NULL, -- 'created', 'updated', 'deleted'
    user_id UUID,
    changes JSONB,
    ip_address INET,
    user_agent TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp DESC);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
```

---

## Redis Data Structures

Redis is used for caching, rate limiting, and deduplication.

### 1. Template Cache

**Key Pattern**: `template:{template_id}`  
**Type**: String (JSON)  
**TTL**: 3600 seconds (1 hour)

**Example**:
```
Key: template:welcome_email_v2
Value: {"template_id": "welcome_email_v2", "subject": "Welcome!", ...}
TTL: 3600
```

### 2. User Preferences Cache

**Key Pattern**: `user_pref:{user_id}`  
**Type**: String (JSON)  
**TTL**: 1800 seconds (30 minutes)

**Example**:
```
Key: user_pref:usr_12345
Value: {"channels": {"email": true, "sms": false}, ...}
TTL: 1800
```

### 3. Rate Limiting (Token Bucket)

**Key Pattern**: `ratelimit:{identifier}:{window}`  
**Type**: String (counter)  
**TTL**: Window duration

**Example**:
```
Key: ratelimit:user_123:hour
Value: 45 (requests made)
TTL: 3600
```

**Implementation**:
```python
def check_rate_limit(user_id, limit, window):
    key = f"ratelimit:{user_id}:{window}"
    current = redis.get(key)
    
    if current is None:
        redis.setex(key, window, 1)
        return True
    
    if int(current) >= limit:
        return False
    
    redis.incr(key)
    return True
```

### 4. Deduplication (Idempotency)

**Key Pattern**: `idempotency:{idempotency_key}`  
**Type**: String (JSON response)  
**TTL**: 86400 seconds (24 hours)

**Example**:
```
Key: idempotency:req_abc123
Value: {"notification_ids": ["notif_xyz"], "status": "accepted"}
TTL: 86400
```

### 5. Distributed Locks

**Key Pattern**: `lock:{resource_name}`  
**Type**: String  
**TTL**: Lock duration

**Example**:
```
Key: lock:process_batch_123
Value: worker_instance_5
TTL: 30
```

### 6. WebSocket Sessions

**Key Pattern**: `ws_session:{user_id}`  
**Type**: Set (connected socket IDs)  
**TTL**: None (removed on disconnect)

**Example**:
```
Key: ws_session:user_123
Value: ["socket_abc", "socket_def"] (Set members)
```

### 7. Message Deduplication

**Key Pattern**: `msg_processed:{message_id}`  
**Type**: String (boolean flag)  
**TTL**: 86400 seconds (24 hours)

**Example**:
```
Key: msg_processed:msg_abc123
Value: "1"
TTL: 86400
```

---

## Cassandra Schemas

Cassandra is used for time-series data with high write throughput.

### 1. Notification Events Table

```cql
CREATE TABLE notification_events (
    user_id UUID,
    event_time TIMESTAMP,
    notification_id UUID,
    event_type TEXT,
    channel TEXT,
    template_id TEXT,
    status TEXT,
    provider TEXT,
    error_message TEXT,
    metadata MAP<TEXT, TEXT>,
    PRIMARY KEY (user_id, event_time, notification_id)
) WITH CLUSTERING ORDER BY (event_time DESC, notification_id ASC)
  AND compaction = {'class': 'TimeWindowCompactionStrategy'}
  AND default_time_to_live = 7776000; -- 90 days
```

**Event Types**:
- `created` - Notification created
- `queued` - Added to message queue
- `sent` - Sent to provider
- `delivered` - Confirmed by provider
- `failed` - Delivery failed
- `opened` - User opened
- `clicked` - User clicked link

**Query Examples**:
```cql
-- Get all events for a user
SELECT * FROM notification_events 
WHERE user_id = 550e8400-e29b-41d4-a716-446655440000
LIMIT 100;

-- Get events in time range
SELECT * FROM notification_events 
WHERE user_id = 550e8400-e29b-41d4-a716-446655440000
  AND event_time >= '2024-12-01 00:00:00'
  AND event_time <= '2024-12-03 23:59:59';
```

### 2. Notification History by ID

```cql
CREATE TABLE notification_by_id (
    notification_id UUID PRIMARY KEY,
    user_id UUID,
    channel TEXT,
    template_id TEXT,
    priority TEXT,
    status TEXT,
    variables MAP<TEXT, TEXT>,
    metadata MAP<TEXT, TEXT>,
    created_at TIMESTAMP,
    sent_at TIMESTAMP,
    delivered_at TIMESTAMP,
    opened_at TIMESTAMP,
    clicked_at TIMESTAMP,
    provider TEXT,
    provider_message_id TEXT,
    error_message TEXT
) WITH default_time_to_live = 7776000; -- 90 days
```

**Query Examples**:
```cql
-- Get notification by ID
SELECT * FROM notification_by_id 
WHERE notification_id = 550e8400-e29b-41d4-a716-446655440000;
```

### 3. Analytics by Day

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
) WITH CLUSTERING ORDER BY (channel ASC, template_id ASC);
```

**Update Example**:
```cql
-- Increment counters
UPDATE analytics_daily 
SET total_sent = total_sent + 1,
    total_delivered = total_delivered + 1
WHERE date = '2024-12-03'
  AND channel = 'email'
  AND template_id = 'welcome_email_v2';
```

**Query Examples**:
```cql
-- Get analytics for a date
SELECT * FROM analytics_daily 
WHERE date = '2024-12-03';

-- Get analytics for a channel
SELECT * FROM analytics_daily 
WHERE date = '2024-12-03' 
  AND channel = 'email';
```

### 4. Provider Performance Metrics

```cql
CREATE TABLE provider_metrics (
    provider TEXT,
    hour TIMESTAMP,
    channel TEXT,
    requests COUNTER,
    successes COUNTER,
    failures COUNTER,
    total_latency_ms COUNTER,
    PRIMARY KEY (provider, hour, channel)
) WITH CLUSTERING ORDER BY (hour DESC, channel ASC)
  AND default_time_to_live = 2592000; -- 30 days
```

**Query Examples**:
```cql
-- Get hourly metrics for a provider
SELECT * FROM provider_metrics 
WHERE provider = 'sendgrid'
  AND hour >= '2024-12-03 00:00:00'
  AND hour <= '2024-12-03 23:00:00';
```

---

## Data Relationships

```
users (1) ─────< (N) user_preferences
  │
  └───< (N) devices
  │
  └───< (N) notification_events (Cassandra)

templates (1) ─────< (N) notification_events (Cassandra)
```

---

## Indexes Summary

### PostgreSQL Indexes

| Table | Index | Purpose |
|-------|-------|---------|
| users | email | Unique user lookup |
| users | created_at | Time-based queries |
| user_preferences | user_id | Fast preference lookup |
| devices | user_id | User's devices |
| devices | platform | Platform filtering |
| templates | channel | Channel filtering |
| templates | status | Active templates |
| audit_logs | entity_type, entity_id | Entity audit trail |
| audit_logs | timestamp | Recent logs |

### Cassandra Partition Keys

| Table | Partition Key | Purpose |
|-------|---------------|---------|
| notification_events | user_id | User's notification history |
| notification_by_id | notification_id | Direct lookup |
| analytics_daily | date | Daily aggregates |
| provider_metrics | provider | Provider performance |

---

## Data Retention

| Database | Table | Retention | Strategy |
|----------|-------|-----------|----------|
| PostgreSQL | users | Indefinite | Soft delete (deleted_at) |
| PostgreSQL | templates | Indefinite | Archive (status = 'archived') |
| PostgreSQL | audit_logs | 1 year | Partition by month, drop old |
| Redis | All | 1-24 hours | TTL-based eviction |
| Cassandra | notification_events | 90 days | TTL-based expiration |
| Cassandra | notification_by_id | 90 days | TTL-based expiration |
| Cassandra | analytics_daily | Indefinite | Keep aggregates |
| Cassandra | provider_metrics | 30 days | TTL-based expiration |

---

## Scaling Strategies

### PostgreSQL
- **Read Replicas**: 3+ replicas for read-heavy queries
- **Connection Pooling**: PgBouncer (max 100 connections per instance)
- **Partitioning**: Partition audit_logs by month
- **Vacuum**: Regular VACUUM ANALYZE for performance

### Redis
- **Cluster Mode**: 6-node cluster (3 master + 3 replica)
- **Sharding**: Hash-based sharding by key
- **Persistence**: RDB snapshots (hourly) + AOF
- **Eviction**: LRU eviction when memory full

### Cassandra
- **Replication Factor**: 3 (across 3 data centers)
- **Consistency Level**: LOCAL_QUORUM for reads/writes
- **Compaction**: TimeWindowCompactionStrategy for time-series
- **Nodes**: Start with 9 nodes (3 per DC), scale horizontally

---

## Backup & Recovery

### PostgreSQL
- **Full Backup**: Daily at 2 AM UTC (pg_dump)
- **WAL Archiving**: Continuous (5-minute RPO)
- **Restore Time**: ~30 minutes for full restore

### Redis
- **Snapshots**: Hourly RDB dumps
- **AOF**: Append-only file for durability
- **Restore Time**: ~5 minutes

### Cassandra
- **Snapshots**: Daily snapshots per node
- **Incremental Backups**: Enabled
- **Restore Time**: ~2 hours for full cluster

---

## Example Queries

### Get User's Recent Notifications (Cassandra)
```cql
SELECT * FROM notification_events
WHERE user_id = 550e8400-e29b-41d4-a716-446655440000
  AND event_time >= '2024-12-01 00:00:00'
LIMIT 50;
```

### Get Delivery Stats for Today (Cassandra)
```cql
SELECT channel, 
       SUM(total_sent) AS sent,
       SUM(total_delivered) AS delivered
FROM analytics_daily
WHERE date = '2024-12-03'
GROUP BY channel;
```

### Check User Preferences with Cache (Redis + PostgreSQL)
```python
# Try Redis first
cached = redis.get(f"user_pref:{user_id}")
if cached:
    return json.loads(cached)

# Fallback to PostgreSQL
prefs = db.query("SELECT * FROM user_preferences WHERE user_id = %s", user_id)

# Cache for future
redis.setex(f"user_pref:{user_id}", 1800, json.dumps(prefs))
return prefs
```
