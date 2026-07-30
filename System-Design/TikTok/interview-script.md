# TikTok System Design - Complete Interview Script

> **How to Use**: Read each phase sequentially. Practice the **"What to Say"** sections out loud. Memorize **R-S-G-C**.

---

## MEMORY ANCHOR: **"R-S-G-C"**
- **R**elational (Postgres): User Profiles/Auth
- **S**3: Video Storage (Blob)
- **G**raph DB (Neptune): Social Follows
- **C**assandra: Likes/Comments (High write-throughput)

---

## Phase 1: Requirements Clarification (2-3 min)

### What to Say:
*"For TikTok, I'll focus on three pillars: **Video Delivery at Scale**, **Ultra-low Latency Feed**, and **High-throughput Engagement**. The social graph is critical."*

### Functional Requirements
1. **Upload** videos (max 3 min)
2. **Personalized Feed** ("For You" page)
3. **Social Graph** (Follow/Unfollow)
4. **Engagement** (Like, Comment, Share)

### Non-Functional Requirements
- **Availability > Consistency** (Eventual consistency for counts OK)
- **Ultra-low latency**: TTFF < 200ms
- **Scale**: 1B users, 100M DAU, 10M video uploads/day

---

## Phase 2: Estimation (1-2 min)

### What to Say:
*"Let me do quick math. 100M DAU, each watches 50 videos/day = 5B video views/day. At 20MB/video for 10M uploads/day, that's 200TB/day in storage."*

- **Storage**: 200TB/day → 73PB/year
- **Bandwidth**: Peak traffic during viral events (Need CDN)
- **Writes**: Likes/Comments = millions per second

---

## Phase 3: Data Modeling (THE CORE - 5-7 min)

### What to Say:
*"I'll use **Polyglot Persistence** because different data has different access patterns."*

### Database Strategy Table

| Data Type | Database | Partition Key | Why? |
|-----------|----------|---------------|------|
| User Profiles | **Postgres** | `user_id` | Strong consistency for auth |
| Social Graph | **Neptune (Graph DB)** | - | Fast traversals (O(log n) vs O(n²)) |
| Video Metadata | **Cassandra** | `video_id` | Horizontal scaling for reads |
| Likes | **Cassandra** | `video_id` | Co-locate all likes for a video |
| Comments | **Cassandra** | `video_id` | Time-ordered clustering |
| Video Files | **S3** | - | Blob storage |

### Key Question: Should Likes and Comments be in SEPARATE Cassandra tables?

**Answer: YES, separate tables (Keyspaces), SAME cluster.**

**Why Separate?**
1. **Different Access Patterns**:
   - Likes: Simple counter (user_id, video_id, timestamp)
   - Comments: Rich text, nested replies, requires sorting
2. **Schema Independence**: Comments need `parent_comment_id`, `text` fields. Likes don't.
3. **Query Optimization**: We query "all comments for a video" frequently, but "all likes for a video" is just a count.

**Example Schemas:**
```cql
// Likes Table
CREATE TABLE likes (
  video_id UUID,
  user_id UUID,
  created_at TIMESTAMP,
  PRIMARY KEY (video_id, user_id)
);

// Comments Table
CREATE TABLE comments (
  video_id UUID,
  comment_id TIMEUUID,
  user_id UUID,
  text TEXT,
  parent_comment_id TIMEUUID,
  created_at TIMESTAMP,
  PRIMARY KEY (video_id, comment_id)
) WITH CLUSTERING ORDER BY (comment_id DESC);
```

### ⚠️ CRITICAL DISTINCTION: Why do we need Graph DB if we're using Redis?

**Common Interview Confusion**: "If we're caching feeds in Redis and doing fan-out, why do we need a Graph DB?"

**Answer**: Redis and Graph DB serve DIFFERENT purposes:

| Purpose | Redis | Graph DB |
|---------|-------|----------|
| **What it stores** | The RESULT (final feed of video IDs) | The RELATIONSHIPS (who follows whom) |
| **Use Case** | Cache pre-computed feeds for fast reads | Query the social graph to COMPUTE the feed |
| **Example Query** | `GET user:123:feed` → `[vid1, vid2, vid3]` | `MATCH (A)-[:FOLLOWS]->(B)-[:POSTED]->(V)` |
| **When needed** | Every time user opens app (Read-heavy) | When computing feed, suggesting friends, analytics |

**Real-World Flow Example:**
1. **User follows someone** → Update Graph DB: `CREATE (UserA)-[:FOLLOWS]->(UserB)`
2. **Feed computation** (hourly job):
   - Query Graph DB: "Get all users that UserA follows" → `[UserB, UserC, UserD]`
   - Query Cassandra: "Get recent videos from UserB, UserC, UserD"
   - ML Engine ranks these videos
   - **Store result in Redis**: `SET user:123:feed [vid5, vid9, vid2]`
3. **User requests feed** → Read from Redis cache (FAST!)

**Why not just use Redis for everything?**
- Redis doesn't efficiently handle **multi-hop queries** like "friends of friends" or "suggested follows based on mutual connections."
- Redis is key-value; Graph DB is optimized for **relationship traversals**.

**What to Say in Interview:**
*"Redis caches the final feed for fast delivery, but the Graph DB is the source of truth for the social graph. When we need to compute who to show videos from, or suggest people to follow, we query Neptune. Redis just stores the end result."*

---

## Phase 4: Feed Strategy - Fan-out on Write vs Read

### What to Say:
*"For the Feed, I'll use a **Hybrid Fan-out** approach."*

### The Problem
- Pure **Fan-out on Write**: When a creator posts, push to ALL followers' feeds immediately.
  - **Good**: Fast reads (pre-computed).
  - **Bad**: Expensive for celebrities (Push to 100M followers = 100M writes).
  
- Pure **Fan-out on Read**: When a user requests feed, pull from all people they follow.
  - **Good**: No write amplification.
  - **Bad**: Slow reads (Join across many users).

### TikTok Solution: **Hybrid**
1. **Fan-out on Write** for regular users (< 100k followers).
2. **Fan-out on Read** for celebrities (> 100k followers).
3. **ML-Generated Feed**: Most of TikTok is NOT people you follow—it's algorithm-driven. So we:
   - Pre-compute top 1000 candidate videos (ML model runs every hour).
   - Store in **Redis** per user.
   - On request, pull from Redis + mix in followed creators.

### What to Say:
*"For TikTok specifically, the feed is mostly ML-driven, so I'd pre-compute candidates and cache them in Redis. For followed creators, I use fan-out on read for celebrities to avoid write storms."*

---

## Phase 5: High-Level Architecture

### What to Say:
*"I'll have these core services: Video Service, Interaction Service, Feed Service, and Social Graph Service."*

### Components
1. **API Gateway** → Routes requests
2. **Video Service** → Uploads to S3, triggers transcoding
3. **Interaction Service** → Handles Likes/Comments
4. **Feed Service** → Fetches from Redis, calls ML Recommendation Engine
5. **Social Graph Service** → Neptune for follows

---

## Phase 6: Deep Dive - The "Like" Flow

### What to Say:
*"When a video goes viral, we can't write every like directly to Cassandra. I'll use a **Write-Back Cache**."*

### Flow
1. User clicks Like → **Interaction Service**
2. **Redis INCR** `video:123:likes` (Atomic counter)
3. **Kafka/SQS** event: `{user_id, video_id, timestamp}`
4. Return **202 Accepted** to user (Fast!)
5. **Background Worker** batch-writes to Cassandra every 5 seconds
6. Periodic sync: Update the "official" like count in Video Metadata DB

### Counter Sharding (Mega-Viral)
- For videos with > 10M likes, shard the counter:
  - `video:123:likes:shard_0`, `video:123:likes:shard_1`, ...
  - On read, SUM all shards.

---

## Phase 7: Conclusion

### What to Say:
*"In summary: **R-S-G-C** for data, Hybrid fan-out for feed, Write-back cache for engagement. We chose Availability over strict Consistency. Next steps: CDN optimization and A/B testing the ML model."*

---

## Senior Pro-Tips
- **Mention Trade-offs**: "We sacrifice strict consistency for availability."
- **Mention Cost**: "S3 Lifecycle policies move old videos to Glacier."
- **Mention Observability**: "I'd track TTFF (p99) and Like ingestion lag."
