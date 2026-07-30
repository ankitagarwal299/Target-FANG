# TikTok Master Architectural Diagrams

This document is your visual guide for the TikTok system design, ranging from high-level flows to detailed data models.

---

## 1. High-Level System Overview

![TikTok System Architecture](/Users/ankitagarawal/.gemini/antigravity/brain/fd0e2bd1-5093-469d-9b11-05873b7f5014/tiktok_system_architecture_1767042236531.png)

---

## 2. High-Level Data Tier (Polyglot Persistence)

```mermaid
graph TD
    AGW[API Gateway]
    
    subgraph "Application Services"
        US[User Service]
        VS[Video Service]
        SS[Social Service]
        IS[Interaction Service]
    end
    
    subgraph "Data Tier"
        SQL[(Postgres - Profiles)]
        GDB[(Graph DB - Follows)]
        CASS[(Cassandra - Video/Likes)]
        S3[(AWS S3 - Assets)]
        RC[(Redis - Hot Context)]
    end
    
    AGW --> US
    AGW --> VS
    AGW --> SS
    AGW --> IS
    
    US --> SQL
    VS --> S3
    VS --> CASS
    SS --> GDB
    IS --> RC
    IS --> CASS
```

---

## 3. Cassandra Data Model (Separate Tables)

```mermaid
graph TD
    subgraph "Cassandra Cluster"
        subgraph "Likes Keyspace"
            LT[Likes Table<br/>PK: video_id, user_id<br/>Columns: timestamp]
        end
        
        subgraph "Comments Keyspace"
            CT[Comments Table<br/>PK: video_id<br/>Clustering: comment_id<br/>Columns: text, parent_id, user_id]
        end
        
        subgraph "Videos Keyspace"
            VT[Video Metadata<br/>PK: video_id<br/>Columns: creator_id, s3_url, like_count]
        end
    end
    
    Note1[Why Separate?<br/>Different schemas<br/>Different query patterns]
```

---

## 4. Feed Strategy: Hybrid Fan-out

```mermaid
graph TD
    Creator[Creator Posts Video]
    
    Creator --> Check{Follower Count?}
    
    Check -->|Regular User < 100k| FanWrite[Fan-out on Write]
    Check -->|Celebrity > 100k| FanRead[Fan-out on Read]
    
    FanWrite --> Push[Push to ALL follower Redis feeds]
    FanRead --> Store[Store in Creator's Timeline]
    
    User[User Requests Feed]
    User --> FeedService[Feed Service]
    
    FeedService --> ML[ML Engine<br/>Pre-computed Candidates]
    FeedService --> Redis[Redis<br/>Followed Creators Cache]
    FeedService --> Celeb[Celebrity Timeline<br/>On-demand Pull]
    
    ML --> Merge[Merge & Rank]
    Redis --> Merge
    Celeb --> Merge
    
    Merge --> Response[Return Feed]
```

---

## 5. The "Like" Flow (High-Throughput Write Path)

```mermaid
sequenceDiagram
    participant Client
    participant IS as Interaction Service
    participant Redis as Redis (Hot Counter)
    participant Queue as Kafka/SQS
    participant Worker as Worker
    participant DB as Cassandra

    Client->>IS: POST /v1/likes
    IS->>Redis: INCR video:id:likes
    IS->>Queue: Push Like Event
    IS-->>Client: 202 Accepted
    
    Note over Worker: Batch Processing
    Queue->>Worker: Consume
    Worker->>DB: Batch Write to Cassandra
    Worker->>DB: Update video metadata like_count
```

---

## 6. Video Upload & Processing Flow

```mermaid
sequenceDiagram
    participant User
    participant VS as Video Service
    participant S3 as S3 (Raw)
    participant VP as Video Processor
    participant DB as Metadata DB

    User->>VS: Upload Video
    VS->>S3: Store Raw File
    VS->>DB: Status: Uploaded
    VS-->>User: Success (Proc Background)
    
    Note over VP: S3 Event Trigger
    VP->>S3: Read Raw
    VP->>VP: Transcode & Thumbnail
    VP->>S3: Store Processed Assets
    VP->>DB: Status: Ready
```

---

## 7. Social Graph Traversal (Graph DB)

```mermaid
graph LR
    subgraph "Graph Database"
        U1((User A))
        U2((User B))
        U3((User C))
        V1[Video X]
        
        U1 -- FOLLOWS --> U2
        U2 -- FOLLOWS --> U3
        U2 -- POSTED --> V1
    end
    
    Note1[Query Example:<br/>MATCH User A -FOLLOWS-> User B -POSTED-> Video X<br/>Returns videos from people A follows]
```

---

## Key Takeaways for Interview

1. **R-S-G-C**: Your memory anchor for the stack
2. **Separate Cassandra Tables**: Likes and Comments have different schemas
3. **Hybrid Fan-out**: Write for regular users, Read for celebrities
4. **Write-Back Cache**: Redis + Kafka to handle viral spikes
