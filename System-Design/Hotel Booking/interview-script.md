# Hotel Booking System - Interview Script
**Based on Debstuti Das & InterviewWithBunny approaches**


[text](https://www.youtube.com/watch?v=mH2Ye3_vErw&t=2051s)
[text](https://www.youtube.com/watch?v=lA24q8x2cT4)
---

## 5-Step Interview Framework (45 min)

### Step 1: Requirements Gathering (5 min)

**"Let me clarify the functional and non-functional requirements..."**

#### Functional Requirements
✅ Search hotels by location, dates, guests  
✅ View hotel/room details  
✅ Book a room  
✅ Payment integration  
✅ Admin: Manage inventory (add/remove rooms)  

#### Non-Functional Requirements
✅ **High Availability** for search (99.9% uptime)  
✅ **Strong Consistency** for bookings (NO double booking)  
✅ **Low Latency** for proximity search (< 200ms)  
✅ **Scalability**: Handle millions of hotels, thousands of concurrent bookings  

#### Scale Estimation
- **Hotels**: 1M properties  
- **Rooms**: 50M total rooms  
- **DAU**: 10M users  
- **Bookings**: 100K/day  
- **Peak**: 1K bookings/second  

---

### Step 2: Core Entities & APIs (5 min)

#### Core Entities

```
Hotel
├─ hotelId
├─ name
├─ location (lat, lon)
├─ address
└─ amenities

Room
├─ roomId
├─ hotelId
├─ roomType (Deluxe, Standard)
├─ capacity
└─ basePrice

Inventory
├─ roomId
├─ date
└─ availableCount

Booking
├─ bookingId
├─ userId
├─ roomId
├─ checkIn, checkOut
├─ status (PENDING, CONFIRMED, CANCELLED)
└─ totalPrice

User
├─ userId
├─ name
├─ email
└─ phone

Payment
├─ paymentId
├─ bookingId
├─ amount
└─ status
```

#### Key APIs

**1. Search Hotels**
```
GET /api/v1/hotels/search?lat=37.77&lon=-122.41&radius=5km
                         &checkIn=2026-03-01&checkOut=2026-03-05
                         &guests=2&priceMax=300
```

**2. Get Hotel Details**
```
GET /api/v1/hotels/{hotelId}
```

**3. Create Booking**
```
POST /api/v1/bookings
{
  "roomId": "123",
  "checkIn": "2026-03-01",
  "checkOut": "2026-03-05",
  "userId": "456"
}
```

**4. Confirm Payment**
```
POST /api/v1/payments
{
  "bookingId": "789",
  "paymentMethod": {...}
}
```

---

### Step 3: High-Level Design (15 min)

#### Architecture Diagram

```
┌─────────┐
│ Client  │
└────┬────┘
     │
┌────▼─────────┐
│ Load Balancer│
└────┬─────────┘
     │
┌────▼──────────────────────────────┐
│      API Gateway (Rate Limiting)  │
└────┬──────────────────────┬───────┘
     │                      │
┌────▼─────────┐    ┌───────▼────────┐
│Search Service│    │Booking Service │
│(Read-Heavy)  │    │(Write-Heavy)   │
└────┬─────────┘    └───────┬────────┘
     │                      │
┌────▼─────────┐    ┌───────▼────────┐
│Elasticsearch │    │  PostgreSQL    │
│+ Geohash     │    │(Transactions)  │
└──────────────┘    └───────┬────────┘
                            │
                    ┌───────▼──────────┐
                    │  Redis Cache     │
                    │(Hotel metadata,  │
                    │ Room prices)     │
                    └──────────────────┘
                            │
                    ┌───────▼──────────┐
                    │     Kafka        │
                    │(Async Messages)  │
                    └───────┬──────────┘
                            │
        ┌───────────────────┼──────────────────┐
        │                   │                  │
  ┌─────▼──────┐   ┌────────▼────────┐  ┌─────▼──────┐
  │ Payment    │   │ Notification    │  │ Analytics  │
  │ Service    │   │ Service         │  │ Service    │
  └────────────┘   └─────────────────┘  └────────────┘
```

#### Component Explanation

**1. Search Service** (Read-Heavy)
- **Purpose**: Fast hotel discovery
- **Tech**: Elasticsearch with `geo_point` type
- **Proximity**: Uses **Geohash** or **QuadTree** for nearby hotels
- **Caching**: Redis 5-min TTL for search results
- **Consistency**: Eventual (slight delay showing booked rooms is OK)

**2. Booking Service** (Write-Heavy)
- **Purpose**: Handle reservations
- **Tech**: PostgreSQL with row-level locking
- **Consistency**: Strong (ACID transactions)
- **Flow**: Check Availability → Reserve → Payment → Confirm

**3. Inventory Management**
- **Database**: PostgreSQL
- **Schema**: `(roomId, date, availableCount)`
- **Locking**: `SELECT ... FOR UPDATE` prevents double booking

**4. Payment Service**
- **Async**: Kafka triggers payment processing
- **Integration**: Stripe/PayPal
- **Timeout**: 10-min reservation hold

**5. Notification Service**
- **Async**: Kafka for email/SMS
- **Events**: Booking confirmed, payment failed, check-in reminder

---

### Step 4: Deep Dive - Critical Challenges (15 min)

#### Challenge 1: Proximity Search

**Problem**: Find hotels within 5km of user's location

**Solution**: Geohash Indexing

**How Geohash Works**:
1. Divide Earth into grid (precision levels 1-12)
2. Each cell gets alphanumeric code (e.g., "9q8yyz")
3. Nearby locations share prefix ("9q8y" → San Francisco area)

**Query Flow**:
```
User: "Hotels near me (37.77, -122.41), 5km radius"
  ↓
1. Calculate geohash: "9q8yy"
2. Find hotels with matching prefix in Elasticsearch
3. Filter by exact distance (Haversine formula)
4. Apply date/price filters
5. Return sorted results
```

**Alternatives**:
- **QuadTree**: Divide space into 4 quadrants recursively
- **R-Tree**: Spatial indexing (PostGIS in PostgreSQL)

---

#### Challenge 2: Preventing Double Booking

**Problem**: Two users booking the last room simultaneously

**Solution**: Database Transaction with Row-Level Locking

**Algorithm**:

```python
BEGIN TRANSACTION;

# Step 1: Lock the inventory row
SELECT availableCount 
FROM Inventory 
WHERE roomId = 'R123' AND date IN ('2026-03-01', '2026-03-02')
FOR UPDATE;  # Row-level lock

# Step 2: Check availability on ALL dates
if any date has availableCount < 1:
    ROLLBACK;
    return "Room not available";

# Step 3: Decrement inventory atomically
UPDATE Inventory
SET availableCount = availableCount - 1
WHERE roomId = 'R123' AND date IN ('2026-03-01', '2026-03-02');

# Step 4: Create booking record
INSERT INTO Bookings (userId, roomId, checkIn, checkOut, status)
VALUES ('U456', 'R123', '2026-03-01', '2026-03-03', 'PENDING');

COMMIT;
```

**Guarantees**:
- `FOR UPDATE` serializes concurrent requests
- Transaction ensures atomicity (all dates locked or none)
- If conflict → rollback, user gets "unavailable" message

**Reservation Timeout**:
- Booking stays `PENDING` for 10 minutes
- Background job releases inventory if payment not received
- Status: `PENDING → CONFIRMED (payment success) or CANCELLED (timeout)`

---

#### Challenge 3: High Availability for Search

**Problem**: Search must work even during DB outage

**Solution**: Separate Search Index (Elasticsearch)

**Data Flow**:

```
PostgreSQL (Source of Truth)
      ↓ (CDC - Change Data Capture)
   Kafka Topic
      ↓ (Consumers)
Elasticsearch (Search Index)
```

**Sync Strategy**:
- Write to PostgreSQL → triggers Kafka event
- Elasticsearch consumer updates search index (async)
- Eventual consistency acceptable for search (5-sec lag OK)

**Fallback**:
- If Elasticsearch down → serve cached results
- Show banner: "Search results may be slightly outdated"

---

### Step 5: Scalability & Optimization (5 min)

#### Database Sharding

**Shard by HotelID**: `hash(hotelId) % num_shards`

**Benefits**:
- All rooms for a hotel on same shard
- Booking transactions don't need cross-shard coordination

**Trade-off**: Cross-hotel search requires scatter-gather (mitigated by Elasticsearch)

---

#### Caching Strategy

**Redis Multi-Layer**:

**L1: Hotel Metadata** (1 hour TTL)
```
Key: hotel:{hotelId}
Value: {name, location, amenities, photos}
```

**L2: Room Prices** (10 min TTL)
```
Key: room:{roomId}:price
Value: basePrice
```

**L3: Search Results** (5 min TTL)
```
Key: search:{lat}:{lon}:{dates}
Value: [hotelId1, hotelId2, ...]
```

**Invalidation**: On booking → clear `search:*` for that location

---

#### Rate Limiting

**Why**: Prevent bots from holding all inventory

**Strategy**:
- 100 searches/min per IP
- 5 bookings/hour per user
- CAPTCHA after 3 failed bookings

**Implementation**: Redis with sliding window counter

---

## Quick Reference: Interview Talking Points

### Opening Statement
*"I'll design a hotel booking system with separate search and booking services. Search will be read-heavy using Elasticsearch for proximity queries, while booking will be write-heavy using PostgreSQL with strong consistency to prevent double bookings."*

### Proximity Search
*"For nearby hotels, I'll use Geohash indexing in Elasticsearch. User's coordinates get converted to a geohash, and we find hotels with matching prefixes, then filter by exact distance."*

### Double Booking Prevention
*"I'll use database transactions with row-level locking. When booking, we SELECT ... FOR UPDATE on inventory rows, check availability across ALL dates, then atomically decrement the count. Transaction ensures no other request can modify those rows simultaneously."*

### Scalability
*"We'll shard PostgreSQL by hotelId for horizontal scaling, cache hotel metadata in Redis for performance, and use Elasticsearch as a separate search layer that can scale independently from the booking database."*

### Trade-offs
*"Search has eventual consistency—a just-booked room might briefly show as available. This is acceptable because booking service verifies availability again. The alternative would be querying the database for every search, which doesn't scale."*

---

## Time Checkpoints

✓ **5 min**: Requirements done  
✓ **10 min**: Entities & APIs complete  
✓ **25 min**: HLD finished  
✓ **40 min**: Deep dives wrapped  
✓ **45 min**: Scalability + Q&A done  

---

## Common Follow-Up Questions

**Q: How do you handle cancellations?**  
*"Update booking status to CANCELLED, increment inventory count, process refund via payment service, send notification via Kafka."*

**Q: What if payment gateway times out?**  
*"Keep booking in PENDING state, allow retry for 10 minutes. If still failing, release inventory and mark CANCELLED."*

**Q: How to handle peak traffic (Black Friday)?**  
*"Auto-scaling for API servers, read replicas for database, increase Redis cache, use queue (Kafka) to buffer booking requests if needed."*

**Q: How to prevent bots from reserving all rooms?**  
*"Rate limiting per IP/user, CAPTCHA, require login for booking, monitor patterns (100 bookings from same IP = suspicious)."*

**Q: Multi-region support?**  
*"Geographically distribute Elasticsearch clusters, replicate PostgreSQL across regions, use CDN for static content, route users to nearest data center."*

---

## Closing Statement

*"To summarize: We've designed a scalable hotel booking system with microservices separating search and booking concerns. Search uses Elasticsearch with Geohash for fast proximity queries, while booking uses PostgreSQL with row-level locking for strong consistency. The system handles double-booking via transactions, scales via database sharding and caching, and uses async messaging (Kafka) for payments and notifications. This architecture balances performance for reads with correctness for writes."*
