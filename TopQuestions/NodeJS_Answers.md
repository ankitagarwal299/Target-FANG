# Senior Backend API Engineer - Answer Scripts (Node.js / TypeScript)

## 📋 Table of Contents

1. [Quick Reference](#quick-reference)
2. [Node.js Internals & Runtime](#1-nodejs-internals--runtime)
3. [TypeScript Mastery](#2-typescript-mastery)
4. [API Design & Architecture](#3-api-design--architecture)
5. [Database & Data Consistency](#4-database--data-consistency)
6. [System Design & Scalability](#5-system-design--scalability)
7. [Coding/Practical Challenges](#6-codingpractical-challenges)
8. [Soft Skills / Behavioral](#7-soft-skills--behavioral)
9. [Production Problems & How to Explain Them](#8-production-problems--how-to-explain-them)

---

## Quick Reference

> **📝 Last-Minute Review Cheat Sheet**

### Key Mnemonics

- **Event Loop Phases**: **TPIPCC** (Timers, Pending, Idle, Poll, Check, Close)
- **HTTP Status Codes**: **2=Success, 3=Redirect, 4=Client Error, 5=Server Error**
- **401 vs 403**: **401="Who are you?"** (Authentication), **403="I know you, but no"** (Authorization)
- **ACID**: **Atomicity, Consistency, Isolation, Durability**
- **BASE**: **Basically Available, Soft state, Eventually consistent**

### 30-Second Answers

| Question | Quick Answer |
|----------|-------------|
| Explain Event Loop | 6 phases processing async operations; nextTick runs first (microtask), setImmediate in Check phase |
| Worker Threads vs Cluster | Cluster = multiple processes for I/O scaling; Worker Threads = shared memory for CPU tasks |
| N+1 Problem | 1 query + N queries in loop; Fix: eager loading/DataLoader/JOIN |
| Circuit Breaker | Stop calling failing service after N failures; prevents cascade failures |
| Idempotency | Same request = same result; Use idempotency keys with Redis cache |
| REST vs GraphQL vs gRPC | REST=simple CRUD; GraphQL=flexible queries; gRPC=high-performance microservices |

### Critical Decision Trees

**Database Selection:**
- Transactions + ACID needed? → **PostgreSQL**
- High write throughput? → **Cassandra**
- Key-value cache? → **Redis**
- Flexible schema? → **MongoDB**

**Communication Pattern:**
- User needs immediate response? → **Sync (HTTP/gRPC)**
- Long-running/decoupled task? → **Async (Queue)**

**Authentication Storage:**
- Access Token → **Memory** (React state)
- Refresh Token → **HttpOnly Cookie** (XSS safe)
- ❌ Never LocalStorage (XSS vulnerable)

---

## 1. Node.js Internals & Runtime

### Event Loop Deep Dive

> **📝 MNEMONIC**: "Event Loop **TPIPCC**" - **T**imers, **P**ending, **I**dle, **P**oll, **C**heck, **C**lose

**Answer Script:**
"The Node.js event loop has 6 phases that execute in order:

1. **Timers**: Executes callbacks from `setTimeout()` and `setInterval()`
2. **Pending Callbacks**: Executes I/O callbacks deferred from previous cycle
3. **Idle, Prepare**: Internal use only
4. **Poll**: Retrieves new I/O events, executes I/O callbacks
5. **Check**: Executes `setImmediate()` callbacks
6. **Close Callbacks**: Executes close event callbacks (e.g., `socket.on('close')`)

**Key Differences:**
- `process.nextTick()`: Executes **immediately** after current operation, before event loop continues (microtask queue, highest priority)
- `Promise.then()`: Also microtask queue, executed after `nextTick` callbacks
- `setImmediate()`: Executes in **Check phase** (next iteration)

**Example:**
```javascript
setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('promise'));

// Output: nextTick → promise → timeout/immediate (order varies)
```

**Senior Insight:** Overusing `process.nextTick()` can starve the event loop since it runs before I/O operations."

---

### Single Thread Library

**Answer Script:**
"Node.js is single-threaded for JavaScript execution, but it handles I/O non-blocking through **libuv**, which provides:

1. **Event Loop**: Manages asynchronous operations
2. **Thread Pool**: Default 4 threads (configurable via `UV_THREADPOOL_SIZE`) for:
   - File system operations
   - DNS lookups
   - CPU-intensive crypto operations
   - Compression

**How it works:**
- When you call `fs.readFile()`, Node delegates to libuv
- libuv assigns work to thread pool
- Thread reads file while main thread continues
- When done, callback queued in event loop

**Network I/O** (http, tcp) uses OS-level async mechanisms (epoll on Linux, kqueue on macOS), **not** thread pool.

**Senior Insight:** This is why heavy file operations can bottleneck at 4 concurrent ops unless you increase thread pool size."

---

### Worker Threads vs Clustering

**Answer Script:**
"**Cluster Module:**
- Creates multiple Node processes (forks)
- Each process runs on separate CPU core
- Master process distributes incoming connections via round-robin
- **Use case:** Scale HTTP server throughput across all CPU cores
- **Example:** Production API servers handling high request volume

**Worker Threads:**
- Runs multiple threads within same process
- Shares memory via `SharedArrayBuffer`
- **Use case:** CPU-intensive tasks (image processing, video encoding, complex calculations)
- **Example:** Processing uploaded images without blocking main thread

**Code Example:**
```javascript
// Clustering for HTTP scaling
const cluster = require('cluster');
if (cluster.isMaster) {
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }
} else {
  http.createServer(app).listen(3000);
}

// Worker Threads for CPU tasks
const { Worker } = require('worker_threads');
const worker = new Worker('./heavy-compute.js', { workerData: data });
```

**Senior Decision:** Use Cluster for I/O-bound apps, Worker Threads for CPU-bound tasks."

---

### Memory Management

> **📝 MNEMONIC**: "**Young** objects get **Old** and **Wise**" - Young Gen (Scavenge) → Old Gen (Mark-Sweep-Compact)

**Answer Script:**
"V8 uses **generational garbage collection**:

1. **Young Generation (Scavenge):**
   - New objects allocated here
   - Fast, frequent GC using Cheney's algorithm
   - Survivors promoted to Old Generation

2. **Old Generation (Mark-Sweep-Compact):**
   - Long-lived objects
   - Slower, less frequent GC
   - Mark-Sweep removes unreachable objects, Compact defragments

**Identifying Memory Leaks in Production:**

1. **Monitor heap usage:** `process.memoryUsage().heapUsed`
2. **Take heap snapshots:**
   ```bash
   node --inspect index.js
   # Connect Chrome DevTools → Memory → Take snapshot
   ```
3. **Compare snapshots:** Look for objects growing between snapshots
4. **Common culprits:**
   - Global variables never released
   - Event listeners not removed
   - Closures capturing large objects
   - In-memory caches without TTL

**Senior Approach:**
```javascript
// Use weak references for caches
const cache = new WeakMap(); // Auto garbage collected

// Remove event listeners
server.on('request', handler);
// Later: server.removeListener('request', handler);

// Limit array/object growth
if (cache.size > 10000) cache.clear();
```"

---

### Streams & Backpressure

> **⚠️ GOTCHA**: `pipe()` handles backpressure automatically, but manual `read()` + `write()` requires handling `drain` events!

**Answer Script:**
"**Backpressure** occurs when data producer is faster than consumer, causing memory overflow.

**Example Problem:**
```javascript
// BAD: Can crash with large files
fs.createReadStream('huge.log')
  .pipe(slowNetworkStream);
```

**How Node Handles Backpressure:**
- `stream.write()` returns `false` when internal buffer full
- Producer should pause until `'drain'` event
- `pipe()` automatically handles this

**Manual Backpressure Handling:**
```javascript
const readable = fs.createReadStream('large.csv');
const writable = db.createWriteStream();

readable.on('data', (chunk) => {
  const canContinue = writable.write(chunk);
  if (!canContinue) {
    readable.pause(); // Stop reading
  }
});

writable.on('drain', () => {
  readable.resume(); // Resume when buffer drained
});
```

**Senior Pattern:**
```javascript
// Use pipeline for automatic backpressure + error handling
const { pipeline } = require('stream/promises');
await pipeline(
  fs.createReadStream('input.csv'),
  transformStream,
  databaseWriteStream
);
```

**Real-world scenario:** Processing 10GB log files - without backpressure, entire file loads into memory."

---

## 2. TypeScript Mastery

### interface vs type

> **💡 DECISION**: Use `interface` for objects (extendable), `type` for unions/intersections/mapped types

**Answer Script:**
"**Key Differences:**

1. **Declaration Merging** (interface only):
```typescript
interface User { name: string; }
interface User { age: number; }
// Result: User has both name and age

type User = { name: string; }
type User = { age: number; } // ERROR: Duplicate identifier
```

2. **Extend vs Intersection:**
```typescript
// Interface extends
interface Admin extends User { role: string; }

// Type intersection
type Admin = User & { role: string; };
```

3. **Union Types** (type only):
```typescript
type Status = 'pending' | 'approved' | 'rejected'; // ✓
interface Status = 'pending' | 'approved'; // ✗ Not valid
```

4. **Computed Properties:**
```typescript
type Keys = 'name' | 'age';
type UserRecord = { [K in Keys]: string }; // ✓ Mapped type

interface UserRecord { [K in Keys]: string } // ✗
```

**Senior Recommendation:**
- Use `interface` for object shapes (better error messages, extendable)
- Use `type` for unions, intersections, mapped types, utility types"

---

### Advanced Types

**Answer Script:**
"**Partial<T>** - Makes all properties optional:
```typescript
interface User { name: string; email: string; age: number; }
function updateUser(id: string, updates: Partial<User>) {
  // Can pass { name: 'John' } or { email: 'x@y.com' } or both
}
```

**Pick<T, K>** - Select subset of properties:
```typescript
type UserPreview = Pick<User, 'name' | 'email'>; // Only name, email
```

**Omit<T, K>** - Exclude properties:
```typescript
type UserWithoutAge = Omit<User, 'age'>; // All except age
```

**Record<K, T>** - Create object type with specific keys:
```typescript
type Roles = 'admin' | 'user' | 'guest';
type Permissions = Record<Roles, string[]>;
// { admin: string[], user: string[], guest: string[] }
```

**Real-world Usage:**
```typescript
// API response with partial updates
async function patchUser(id: string, data: Partial<User>) {}

// Database model without timestamps
type UserInput = Omit<UserModel, 'createdAt' | 'updatedAt'>;

// Route handlers map
type RouteHandlers = Record<HttpMethod, RequestHandler>;
```"

---

### Union & Intersection

**Answer Script:**
"**Discriminated Unions** (Tagged Unions) provide type-safe state machines:

```typescript
// API Response modeling
type ApiResponse<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

function handleResponse(response: ApiResponse<User>) {
  switch (response.status) {
    case 'loading':
      // TypeScript knows response.data doesn't exist
      return 'Loading...';
    case 'success':
      // TypeScript knows response.data exists
      return response.data.name;
    case 'error':
      // TypeScript knows response.error exists
      return response.error;
  }
}
```

**Intersection Types:**
```typescript
type Timestamped = { createdAt: Date; updatedAt: Date };
type AuditedUser = User & Timestamped;
// Has all properties from both
```

**Senior Pattern - Payment Events:**
```typescript
type PaymentEvent =
  | { type: 'initiated'; amount: number }
  | { type: 'processing'; transactionId: string }
  | { type: 'completed'; transactionId: string; receipt: string }
  | { type: 'failed'; error: string };

// Exhaustiveness checking
function handlePayment(event: PaymentEvent) {
  switch(event.type) {
    case 'initiated': return processPayment(event.amount);
    case 'processing': return checkStatus(event.transactionId);
    case 'completed': return sendReceipt(event.receipt);
    case 'failed': return handleError(event.error);
    default:
      const _exhaustive: never = event; // Compile error if case missed
  }
}
```"

---

### unknown vs any

**Answer Script:**
"**Why `unknown` over `any`:**

**`any`** - Disables type checking completely (TypeScript becomes JavaScript):
```typescript
let value: any = 'hello';
value.toFixed(); // No error, crashes at runtime
value.missingMethod(); // No error, crashes at runtime
```

**`unknown`** - Type-safe, requires validation before use:
```typescript
let value: unknown = 'hello';
value.toFixed(); // ✗ Compile error

// Must narrow type first
if (typeof value === 'string') {
  value.toUpperCase(); // ✓ Safe
}
```

**Senior Pattern - API Responses:**
```typescript
async function fetchData(url: string): Promise<unknown> {
  const response = await fetch(url);
  return response.json(); // We don't know shape yet
}

// Type guard
function isUser(data: unknown): data is User {
  return (
    typeof data === 'object' &&
    data !== null &&
    'name' in data &&
    'email' in data
  );
}

const data = await fetchData('/api/user');
if (isUser(data)) {
  console.log(data.name); // ✓ Type-safe
}
```

**Rule:** Always prefer `unknown` for external data (API responses, user input, parsed JSON)."

---

### Decorators

**Answer Script:**
"Decorators are functions that modify classes, methods, or properties at **design time**.

**How They Work (NestJS example):**
```typescript
// @Controller is a class decorator
@Controller('users')
export class UsersController {
  // @Get is a method decorator
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `User ${id}`;
  }
}
```

**Under the Hood:**
```typescript
// Decorator is just a function
function Controller(route: string) {
  return function (target: Function) {
    Reflect.defineMetadata('route', route, target);
    // NestJS reads this metadata to setup routes
  };
}

// Transpiled to:
Controller('users')(UsersController);
```

**Custom Decorator Example:**
```typescript
// Logging decorator
function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = async function (...args: any[]) {
    console.log(`Calling ${propertyKey} with`, args);
    const result = await originalMethod.apply(this, args);
    console.log(`Result:`, result);
    return result;
  };
}

class PaymentService {
  @Log
  async processPayment(amount: number) {
    return { transactionId: '123', amount };
  }
}
```

**Senior Insight:** Decorators use `Reflect Metadata` API to store information that frameworks read at runtime."

---

## 3. API Design & Architecture

### REST vs GraphQL vs gRPC

**Answer Script:**
"**REST:**
- **Pros:** Simple, cacheable, widely supported, stateless
- **Cons:** Over/under-fetching, multiple roundtrips, versioning challenges
- **Use case:** Public APIs, CRUD operations

**GraphQL:**
- **Pros:** Client specifies exact data needed, single endpoint, strong typing
- **Cons:** Complex caching, N+1 query problem, overkill for simple APIs
- **Use case:** Mobile apps, dashboards with varying data needs

**gRPC:**
- **Pros:** Binary protocol (smaller/faster), HTTP/2 (multiplexing), strong contracts (Protobuf), streaming
- **Cons:** Not browser-friendly, harder debugging, requires code generation
- **Use case:** Backend-to-backend microservices, high-throughput systems

**When to choose gRPC over REST:**
1. **Performance-critical:** 50-70% smaller payloads than JSON
2. **Streaming:** Real-time notifications, video streaming
3. **Polyglot microservices:** Auto-generated clients for multiple languages
4. **Type safety:** Protobuf contract prevents breaking changes

**Example:**
```protobuf
service PaymentService {
  rpc ProcessPayment(PaymentRequest) returns (PaymentResponse);
  rpc StreamTransactions(Empty) returns (stream Transaction); // Streaming
}
```

**Senior Decision:** Use REST for public APIs, gRPC for internal high-performance services."

---

### Idempotency

**Answer Script:**
"**Why Critical for Payments:**
Network failures can cause duplicate requests. Without idempotency, a user could be charged twice.

**Implementation with Idempotency Keys:**

```typescript
interface PaymentRequest {
  idempotencyKey: string; // UUID from client
  amount: number;
  userId: string;
}

const processedRequests = new Map<string, PaymentResponse>(); // Use Redis in production

async function processPayment(request: PaymentRequest): Promise<PaymentResponse> {
  const { idempotencyKey, amount, userId } = request;
  
  // Check if already processed
  const cached = await redis.get(`idempotency:${idempotencyKey}`);
  if (cached) {
    return JSON.parse(cached); // Return cached result
  }
  
  // Process payment
  const result = await chargeCard(userId, amount);
  
  // Store result for 24 hours
  await redis.setex(
    `idempotency:${idempotencyKey}`,
    86400,
    JSON.stringify(result)
  );
  
  return result;
}
```

**Client Side:**
```typescript
const idempotencyKey = crypto.randomUUID();
await fetch('/api/payments', {
  method: 'POST',
  headers: { 'Idempotency-Key': idempotencyKey },
  body: JSON.stringify({ amount: 100 })
});
```

**Senior Pattern:**
- Store idempotency key + hash of request body
- Return `409 Conflict` if same key with different body
- TTL of 24 hours (configurable based on business needs)"

---

### Authentication & Authorization

**Answer Script:**
"**JWT Implementation:**

**Access Token (short-lived, 15 mins):**
```typescript
const accessToken = jwt.sign(
  { userId: user.id, role: user.role },
  process.env.ACCESS_SECRET,
  { expiresIn: '15m' }
);
```

**Refresh Token (long-lived, 7 days):**
```typescript
const refreshToken = jwt.sign(
  { userId: user.id },
  process.env.REFRESH_SECRET,
  { expiresIn: '7d' }
);

// Store refresh token hash in database
await db.refreshTokens.create({
  userId: user.id,
  tokenHash: bcrypt.hash(refreshToken)
});
```

**Where to Store:**
- **Access Token:** Memory (React state) - lost on refresh
- **Refresh Token:** HttpOnly cookie - cannot be accessed by JavaScript, prevents XSS

**Why NOT LocalStorage:** Vulnerable to XSS attacks (malicious script can steal tokens)

**RBAC vs ABAC:**

**RBAC (Role-Based):**
```typescript
const roles = {
  admin: ['create', 'read', 'update', 'delete'],
  user: ['read'],
  moderator: ['read', 'update']
};

function authorize(userRole: string, action: string) {
  return roles[userRole].includes(action);
}
```

**ABAC (Attribute-Based):**
```typescript
function authorize(user: User, resource: Document, action: string) {
  if (action === 'delete') {
    return user.role === 'admin' || resource.ownerId === user.id;
  }
  if (action === 'read') {
    return resource.visibility === 'public' || resource.teamId === user.teamId;
  }
}
```

**Senior Decision:** RBAC for simple permissions, ABAC for complex multi-tenant systems."

---

### API Versioning

**Answer Script:**
"**Three Approaches:**

**1. URI Path (Recommended for breaking changes):**
```typescript
app.use('/api/v1/users', usersV1Router);
app.use('/api/v2/users', usersV2Router);
```
**Pros:** Clear, cacheable
**Cons:** Code duplication

**2. Query Parameter:**
```typescript
GET /api/users?version=2
```
**Pros:** Same endpoint
**Cons:** Breaks caching, less visible

**3. Custom Header:**
```typescript
GET /api/users
Header: Accept-Version: 2
```
**Pros:** Clean URLs
**Cons:** Harder to test, less discoverable

**Senior Strategy - Deprecation Flow:**
```typescript
// v1 - deprecated
app.get('/api/v1/users', (req, res) => {
  res.setHeader('Deprecation', 'true');
  res.setHeader('Sunset', 'Sat, 31 Dec 2024 23:59:59 GMT');
  res.setHeader('Link', '</api/v2/users>; rel="alternate"');
  // ... rest of logic
});

// v2 - current
app.get('/api/v2/users', usersHandler);
```

**Best Practice:**
- Support N and N-1 versions simultaneously
- Announce deprecation 6 months in advance
- Monitor v1 usage, cut off when <1% traffic"

---

### Rate Limiting

**Answer Script:**
"**Token Bucket Algorithm:**

**Concept:**
- Bucket holds N tokens
- Each request consumes 1 token
- Tokens refill at rate R per second
- Request rejected if bucket empty

**Implementation with Redis:**
```typescript
import { RateLimiterRedis } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  points: 100, // Number of requests
  duration: 60, // Per 60 seconds
  blockDuration: 60 // Block for 60 seconds if exceeded
});

async function rateLimitMiddleware(req, res, next) {
  try {
    await rateLimiter.consume(req.ip); // Or req.userId for authenticated
    next();
  } catch (error) {
    res.status(429).json({
      error: 'Too Many Requests',
      retryAfter: error.msBeforeNext / 1000
    });
  }
}
```

**Distributed Environment Challenges:**
- **Problem:** Each server has independent counter
- **Solution:** Centralized state in Redis

**Leaky Bucket vs Token Bucket:**
- **Leaky Bucket:** Constant outflow rate (smooths bursts)
- **Token Bucket:** Allows bursts up to bucket size (better UX)

**Senior Pattern - Tiered Limits:**
```typescript
const limits = {
  free: { points: 100, duration: 3600 },
  premium: { points: 1000, duration: 3600 },
  enterprise: { points: 10000, duration: 3600 }
};

const limiter = new RateLimiterRedis({
  ...limits[user.tier],
  keyPrefix: `ratelimit:${user.id}`
});
```"

---

## 4. Database & Data Consistency

### The N+1 Problem

> **⚠️ CRITICAL**: This is the #1 cause of production slowdowns! Always check for loops with `await` inside.

**Answer Script:**
"**What is it:**
You make 1 query to fetch N parent records, then N additional queries to fetch related child records (total N+1 queries).

**Example Problem:**
```typescript
// 1 query to get users
const users = await db.users.findMany();

// N queries (one per user)
for (const user of users) {
  const posts = await db.posts.findMany({ where: { userId: user.id } });
  user.posts = posts;
}
// Total: 1 + N queries
```

**Solutions:**

**1. Eager Loading (JOIN):**
```typescript
const users = await db.users.findMany({
  include: { posts: true } // Single JOIN query
});
```

**2. DataLoader (GraphQL/batching):**
```typescript
const DataLoader = require('dataloader');

const postLoader = new DataLoader(async (userIds) => {
  const posts = await db.posts.findMany({
    where: { userId: { in: userIds } }
  });
  
  // Group by userId
  const grouped = groupBy(posts, 'userId');
  return userIds.map(id => grouped[id] || []);
});

// Usage
for (const user of users) {
  user.posts = await postLoader.load(user.id); // Batches all loads into 1 query
}
```

**3. Select Specific Fields:**
```typescript
const users = await db.users.findMany({
  select: { id: true, name: true, posts: { select: { title: true } } }
});
```

**Senior Insight:** Enable query logging in development to catch N+1 issues:
```typescript
// Prisma
const prisma = new PrismaClient({ log: ['query'] });
```"

---

### ACID vs BASE

**Answer Script:**
"**ACID (Relational DBs - PostgreSQL):**
- **Atomicity:**Transactions all-or-nothing
- **Consistency:** Data follows all rules/constraints
- **Isolation:** Concurrent transactions don't interfere
- **Durability:** Committed data persists

**Use when:**
- Financial transactions
- Strong consistency required
- Complex JOINs needed
- Schema well-defined

**BASE (NoSQL - MongoDB, Cassandra):**
- **Basically Available:** System available even during failures
- **Soft state:** State may change without input (eventual consistency)
- **Eventually consistent:** Reads may be stale temporarily

**Use when:**
- High write throughput (logging, analytics)
- Horizontal scaling needed
- Schema evolves frequently
- Geographical distribution

**Senior Decision Matrix:**

| Use Case | Database | Reason |
|----------|----------|--------|
| E-commerce orders | PostgreSQL | ACID for payment consistency |
| User session data | Redis | Fast key-value access |
| Social media posts | MongoDB | Flexible schema, high writes |
| Analytics events | Cassandra | Massive write throughput |
| Time-series metrics | InfluxDB/TimescaleDB | Optimized for time data |

**Real Example:**
```typescript
// PostgreSQL transaction
await db.$transaction(async (tx) => {
  await tx.accounts.update({ where: { id: fromId }, data: { balance: { decrement: 100 } } });
  await tx.accounts.update({ where: { id: toId }, data: { balance: { increment: 100 } } });
  await tx.transactions.create({ data: { fromId, toId, amount: 100 } });
});
// All succeed or all fail
```"

---

### Distributed Transactions

**Answer Script:**
"**Problem:** In microservices, you can't use database transactions across services.

**Example:** Order service, Payment service, Inventory service - all have separate databases.

**Solution: Saga Pattern**

**1. Choreography (Event-driven):**
```typescript
// Order Service
async function createOrder(order) {
  await db.orders.create(order);
  await eventBus.publish('OrderCreated', { orderId: order.id, amount: order.total });
}

// Payment Service listens
eventBus.on('OrderCreated', async (event) => {
  const payment = await processPayment(event.amount);
  if (payment.success) {
    await eventBus.publish('PaymentSucceeded', { orderId: event.orderId });
  } else {
    await eventBus.publish('PaymentFailed', { orderId: event.orderId });
  }
});

// Inventory Service listens
eventBus.on('PaymentSucceeded', async (event) => {
  await reserveInventory(event.orderId);
});

// Order Service compensates on failure
eventBus.on('PaymentFailed', async (event) => {
  await db.orders.update({ where: { id: event.orderId }, data: { status: 'failed' } });
});
```

**2. Orchestration (Coordinator):**
```typescript
class OrderSaga {
  async execute(order) {
    try {
      // Step 1
      const orderId = await orderService.createOrder(order);
      
      // Step 2
      const payment = await paymentService.charge(order.total);
      if (!payment.success) throw new Error('Payment failed');
      
      // Step 3
      await inventoryService.reserve(order.items);
      
      return { success: true, orderId };
    } catch (error) {
      // Compensating transactions (rollback)
      await inventoryService.release(order.items);
      await paymentService.refund(payment.id);
      await orderService.cancelOrder(orderId);
      return { success: false, error };
    }
  }
}
```

**Comparison:**
- **Choreography:** Decentralized, services independent, harder to debug
- **Orchestration:** Centralized logic, easier to understand, single point of failure

**Senior Insight:** Always include idempotency in saga steps (services may retry on failures)."

---

### Indexing Strategies

**Answer Script:**
"**Identifying Slow Queries:**
```sql
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';
-- Look for "Seq Scan" (bad) vs "Index Scan" (good)
```

**B-Tree Index (Default):**
- **Structure:** Balanced tree, sorted data
- **Use case:** Range queries, sorting, equality
- **Example:**
```sql
CREATE INDEX idx_users_email ON users(email);
-- Speeds up: WHERE email = '...', WHERE email > '...', ORDER BY email
```

**Hash Index:**
- **Structure:** Hash table (key → bucket)
- **Use case:** Equality only (exact matches)
- **Limitation:** Cannot do range queries or sorting
- **Example:**
```sql
CREATE INDEX USING HASH idx_sessions_token ON sessions(token);
-- Speeds up: WHERE token = '...' (not WHERE token > '...')
```

**Composite Index:**
```sql
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);
-- Speeds up:
-- WHERE user_id = 1
-- WHERE user_id = 1 AND created_at > '2024-01-01'
-- Does NOT speed up: WHERE created_at > '2024-01-01' (leftmost rule)
```

**Partial Index:**
```sql
CREATE INDEX idx_active_users ON users(email) WHERE is_active = true;
-- Smaller index, faster queries for active users only
```

**Senior Optimization Checklist:**
1. Index foreign keys
2. Index columns in WHERE, JOIN, ORDER BY
3. Avoid indexing high-cardinality columns (e.g., timestamps)
4. Monitor index usage: `SELECT * FROM pg_stat_user_indexes;`
5. Remove unused indexes (they slow down writes)"

---

## 5. System Design & Scalability

### Sync vs Async Communication

**Answer Script:**
"**Synchronous (HTTP/gRPC):**
- **Use when:** User needs immediate response
- **Example:** Login, fetching user profile, search

**Asynchronous (Message Queues - RabbitMQ, Kafka):**
- **Use when:** Long-running tasks, event-driven, decoupling
- **Example:** Sending emails, processing images, analytics

**Decision Matrix:**

| Scenario | Communication | Reason |
|----------|---------------|--------|
| User login | Sync (REST) | Need immediate auth response |
| Send welcome email | Async (Queue) | User doesn't wait for email |
| Payment processing | Sync | Must confirm before showing success |
| Order confirmation email | Async | Can send after response |
| Search autocomplete | Sync | Real-time user expectation |
| Update recommendation model | Async | Batch processing |

**Example Implementation:**
```typescript
// API endpoint
app.post('/orders', async (req, res) => {
  // 1. Create order (sync - user waits)
  const order = await db.orders.create(req.body);
  
  // 2. Publish event for async tasks
  await messageQueue.publish('order.created', {
    orderId: order.id,
    userId: order.userId
  });
  
  // 3. Return immediately
  res.json({ orderId: order.id, status: 'processing' });
});

// Worker listens to queue
messageQueue.consume('order.created', async (message) => {
  await sendConfirmationEmail(message.orderId); // Don't block API response
  await updateInventory(message.orderId);
  await notifyWarehouse(message.orderId);
});
```

**Senior Insight:** Async adds complexity (monitoring, retries, dead letters) but essential for scalability."

---

### Message Queues

**Answer Script:**
"**At-Least-Once Delivery:**
- Message delivered **one or more times** (duplicates possible)
- **Mechanism:** Broker resends if no ACK received
- **Handling:** Make consumers idempotent
```typescript
messageQueue.consume('payments', async (msg) => {
  const payment = JSON.parse(msg.content);
  
  // Idempotent check
  const existing = await db.payments.findUnique({ where: { id: payment.id } });
  if (existing) {
    channel.ack(msg); // Already processed
    return;
  }
  
  await processPayment(payment);
  channel.ack(msg);
});
```

**Exactly-Once Delivery:**
- Message delivered **exactly one time**
- **Mechanism:** Transactional outbox pattern, distributed transactions
- **Challenge:** Very hard in distributed systems (use Kafka with transactions)

**Dead Letter Queue (DLQ):**
Messages that fail processing after N retries go to DLQ for manual inspection.

```typescript
const queueOptions = {
  deadLetterExchange: 'dlx',
  messageTtl: 60000, // 1 minute
  maxLength: 1000
};

channel.assertQueue('payments', queueOptions);
channel.assertQueue('payments.dlq'); // Dead letter queue

channel.consume('payments', async (msg) => {
  try {
    await processPayment(JSON.parse(msg.content));
    channel.ack(msg);
  } catch (error) {
    // Reject and requeue (up to max retries)
    if (msg.fields.redelivered) {
      channel.nack(msg, false, false); // Send to DLQ
      await alertOps(`Payment failed: ${msg.content}`);
    } else {
      channel.nack(msg, false, true); // Requeue
    }
  }
});
```

**Senior Pattern - Monitor DLQ:**
```typescript
setInterval(async () => {
  const dlqSize = await channel.assertQueue('payments.dlq');
  if (dlqSize.messageCount > 10) {
    await alertOps(`DLQ has ${dlqSize.messageCount} messages!`);
  }
}, 60000);
```"

---

### Caching Strategies

**Answer Script:**
"**1. Cache-Aside (Lazy Loading):**
```typescript
async function getUser(id: string) {
  // Check cache first
  const cached = await redis.get(`user:${id}`);
  if (cached) return JSON.parse(cached);
  
  // Cache miss - fetch from DB
  const user = await db.users.findUnique({ where: { id } });
  
  // Update cache
  await redis.setex(`user:${id}`, 3600, JSON.stringify(user));
  
  return user;
}
```
**Pros:** Simple, only cache what's needed
**Cons:** Cache miss penalty, stale after updates

**2. Write-Through:**
```typescript
async function updateUser(id: string, data: Partial<User>) {
  // Update DB and cache together
  const user = await db.users.update({ where: { id }, data });
  await redis.setex(`user:${id}`, 3600, JSON.stringify(user));
  return user;
}
```
**Pros:** Cache always fresh
**Cons:** Write latency, unnecessary caching

**3. Write-Back (Write-Behind):**
- Write to cache immediately, DB asynchronously
- **Risk:** Data loss if cache crashes before DB write

**Thundering Herd Problem:**
Many requests simultaneously hit cache miss for same key → DB overwhelmed.

**Solution - Lock Pattern:**
```typescript
async function getUser(id: string) {
  const cached = await redis.get(`user:${id}`);
  if (cached) return JSON.parse(cached);
  
  // Acquire lock
  const lockKey = `lock:user:${id}`;
  const lock = await redis.set(lockKey, '1', 'EX', 10, 'NX');
  
  if (lock) {
    // This request wins - fetch from DB
    const user = await db.users.findUnique({ where: { id } });
    await redis.setex(`user:${id}`, 3600, JSON.stringify(user));
    await redis.del(lockKey);
    return user;
  } else {
    // Wait and retry (other request is fetching)
    await sleep(100);
    return getUser(id); // Recursive retry
  }
}
```

**Senior Pattern - Cache Warming:**
```typescript
// Pre-populate cache for hot data
async function warmCache() {
  const popularUsers = await db.users.findMany({ where: { followersCount: { gt: 10000 } } });
  for (const user of popularUsers) {
    await redis.setex(`user:${user.id}`, 3600, JSON.stringify(user));
  }
}
```"

---

### Resiliency Patterns

**Answer Script:**
"**Circuit Breaker:**

**Problem:** Service A calls failing Service B repeatedly → cascading failure.

**Solution:** After N failures, "open" circuit and fail fast (don't call Service B).

```typescript
class CircuitBreaker {
  private failures = 0;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  private lastFailTime?: number;
  
  constructor(
    private threshold = 5, // Failures before opening
    private timeout = 60000 // Time before retrying (1 min)
  ) {}
  
  async call<T>(fn: () => Promise<T>): Promise<T> {
    // State 1: OPEN - Fail fast
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailTime! > this.timeout) {
        this.state = 'HALF_OPEN'; // Try one request
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }
    
    try {
      const result = await fn();
      
      // Success - reset
      if (this.state === 'HALF_OPEN') {
        this.state = 'CLOSED';
        this.failures = 0;
      }
      
      return result;
    } catch (error) {
      this.failures++;
      this.lastFailTime = Date.now();
      
      // State 2: Too many failures - OPEN circuit
      if (this.failures >= this.threshold) {
        this.state = 'OPEN';
      }
      
      throw error;
    }
  }
}

// Usage
const paymentServiceBreaker = new CircuitBreaker();

app.post('/process-payment', async (req, res) => {
  try {
    const result = await paymentServiceBreaker.call(() =>
      paymentService.charge(req.body)
    );
    res.json(result);
  } catch (error) {
    res.status(503).json({ error: 'Payment service unavailable' });
  }
});
```

**Retry with Exponential Backoff:**

**Problem:** Simple retries can overwhelm failing service.

```typescript
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) throw error;
      
      // Exponential backoff: 1s, 2s, 4s, 8s...
      const delay = baseDelay * Math.pow(2, attempt);
      
      // Add jitter to prevent synchronized retries
      const jitter = Math.random() * 1000;
      
      await sleep(delay + jitter);
    }
  }
  
  throw new Error('Unreachable');
}

// Usage
const data = await retryWithBackoff(() => fetch('https://api.example.com/data'));
```

**Senior Insight:** Combine both patterns - circuit breaker prevents retries to dead services."

---

## 6. Coding/Practical Challenges

### Challenge 1: Stream Large CSV File

**Answer Script:**
"**Requirement:** Process 1GB CSV without loading entire file into memory.

**Solution:**
```typescript
import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { pipeline } from 'stream/promises';

async function processCsvFile(filePath: string) {
  const fileStream = createReadStream(filePath);
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  
  let batch: any[] = [];
  const BATCH_SIZE = 1000;
  
  for await (const line of rl) {
    const [id, name, email] = line.split(',');
    batch.push({ id, name, email });
    
    // Batch insert for efficiency
    if (batch.length >= BATCH_SIZE) {
      await db.users.createMany({ data: batch });
      batch = [];
    }
  }
  
  // Insert remaining
  if (batch.length > 0) {
    await db.users.createMany({ data: batch });
  }
}

// Alternative: Transform stream
import { Transform } from 'stream';

const parseStream = new Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    const [id, name, email] = chunk.toString().split(',');
    this.push({ id, name, email });
    callback();
  }
});

const writeStream = new Writable({
  objectMode: true,
  async write(record, encoding, callback) {
    await db.users.create({ data: record });
    callback();
  }
});

await pipeline(
  createReadStream('large.csv'),
  parseStream,
  writeStream
);
```

**Key Points:**
- Streams process chunks, not entire file
- Batch inserts reduce DB roundtrips
- pipeline() handles backpressure automatically"

---

### Challenge 2: Retry Function

**Answer Script:**
"**Requirement:** Retry promise N times with delay.

**Solution:**
```typescript
async function retry<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries: number;
    delay: number;
    onRetry?: (attempt: number, error: Error) => void;
  }
): Promise<T> {
  const { maxRetries, delay, onRetry } = options;
  
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt < maxRetries) {
        onRetry?.(attempt, lastError);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError!;
}

// Usage
const data = await retry(
  () => fetch('https://api.example.com/data').then(r => r.json()),
  {
    maxRetries: 3,
    delay: 1000,
    onRetry: (attempt, error) => console.log(`Retry ${attempt}: ${error.message}`)
  }
);
```

**Advanced Version with Exponential Backoff:**
```typescript
async function retryAdvanced<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries: number;
    baseDelay: number;
    exponential?: boolean;
    jitter?: boolean;
  }
): Promise<T> {
  const { maxRetries, baseDelay, exponential = true, jitter = true } = options;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries - 1) throw error;
      
      let delay = exponential ? baseDelay * Math.pow(2, attempt) : baseDelay;
      if (jitter) delay += Math.random() * 1000;
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw new Error('Max retries exceeded');
}
```"

---

### Challenge 3: Refactor to TypeScript

**Answer Script:**
"**Original JavaScript:**
```javascript
function fetchUser(id) {
  return fetch(`/api/users/${id}`)
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.error(err));
}

const users = fetchUser('123');
users.forEach(u => console.log(u.name));
```

**Refactored TypeScript:**
```typescript
// 1. Define types
interface User {
  id: string;
  name: string;
  email: string;
}

class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public response?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// 2. Better error handling
async function fetchUser(id: string): Promise<User> {
  try {
    const response = await fetch(`/api/users/${id}`);
    
    if (!response.ok) {
      throw new ApiError(
        `Failed to fetch user ${id}`,
        response.status,
        await response.text()
      );
    }
    
    const data: unknown = await response.json();
    
    // 3. Type guard
    if (!isUser(data)) {
      throw new ApiError('Invalid user data', 500, data);
    }
    
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`API Error: ${error.message}`, {
        statusCode: error.statusCode,
        response: error.response
      });
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}

// 4. Runtime type validation
function isUser(data: unknown): data is User {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'name' in data &&
    'email' in data &&
    typeof (data as any).id === 'string' &&
    typeof (data as any).name === 'string' &&
    typeof (data as any).email === 'string'
  );
}

// 5. Usage with proper error handling
async function main() {
  try {
    const user = await fetchUser('123');
    console.log(user.name); // Type-safe
  } catch (error) {
    // Handle gracefully
  }
}
```

**Improvements:**
- Strict types (User interface)
- Custom error class with context
- Runtime validation (unknown → User)
- Async/await over promise chains
- Proper error handling"

---

## 7. Soft Skills / Behavioral

### Disagreed with Architectural Decision

**Answer Script:**
"**Situation:**
In my previous role, our team was building a notification system. The lead architect proposed using a monolithic approach with a single PostgreSQL database for all notification types (email, SMS, push).

**My Concern:**
I disagreed because:
1. Different notification channels have different throughput requirements (push > email)
2. Schema changes would affect all channels
3. Scaling would require vertical scaling (expensive)

**My Proposal:**
I proposed a microservices approach:
- Separate services for each channel
- Message queue (RabbitMQ) for async processing
- Each service chooses optimal database (Redis for sessions, Cassandra for high-write push notifications)

**Resolution Process:**
1. **Prepared Data:** I created a capacity estimation document showing expected load:
   - Email: 100K/day
   - Push: 10M/day
   
2. **Proof of Concept:** Built small prototype showing 10x better throughput with separated services

3. **Presented Trade-offs:** Acknowledged microservices complexity (more infrastructure, monitoring)

4. **Compromise:** We agreed on a hybrid:
   - Start with modular monolith (separate modules, single deployment)
   - Design for easy migration to microservices
   - Use message queues internally for decoupling

**Outcome:**
- System handled 20M notifications/day successfully
- Migrated push notifications to separate service after 6 months when volume increased
- Team appreciated the incremental approach

**Key Lesson:** Bring data, not just opinions. Show prototypes. Be open to compromise."

---

### Ensure Code Quality with Junior Developers

**Answer Script:**
"**Multi-layered Approach:**

**1. Automated Linting & Formatting:**
```json
// .eslintrc.json
{
  "extends": ["airbnb-typescript", "plugin:@typescript-eslint/recommended"],
  "rules": {
    "no-console": "error",
    "no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn"
  }
}
```

**2. Pre-commit Hooks:**
```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "npm test"
    }
  },
  "lint-staged": {
    "*.ts": ["eslint --fix", "prettier --write"]
  }
}
```

**3. CI/CD Checks (GitHub Actions):**
```yaml
name: CI
on: [pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
```

**4. Code Review Process:**
- **Checklist:** Share template for PRs
  - [ ] Tests added?
  - [ ] Error handling present?
  - [ ] No console.logs?
  - [ ] Documentation updated?
- **Pair Programming:** Weekly sessions on complex features
- **Constructive Feedback:** Focus on learning, not blame
  - ❌ "This code is bad"
  - ✓ "Consider using async/await instead of callbacks for better readability"

**5. Documentation & Standards:**
- Maintain `CONTRIBUTING.md` with coding standards
- Create internal wiki with common patterns
- Example:
  ```typescript
  // ✅ Good: Descriptive error
  throw new ValidationError('Email must be valid format');
  
  // ❌ Bad: Generic error
  throw new Error('Invalid input');
  ```

**6. Test Coverage Requirements:**
```json
// jest.config.js
{
  "coverageThreshold": {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80
    }
  }
}
```

**7. Mentorship:**
- Weekly 1:1s to review code together
- Share articles/talks on best practices
- Encourage questions in team Slack channel

**Result:** Junior developers learn faster, fewer bugs in production, consistent codebase style."

---

### Production Outage

**Answer Script:**
"**Incident:**
At my previous company, we had a critical outage where our API response times went from 200ms to 15+ seconds, causing timeouts and 500 errors.

**My Role:**
I was on-call and led the incident response.

**Investigation:**
1. **Checked Metrics (Datadog):**
   - DB connections maxed out (100/100 pool)
   - CPU normal
   - Memory normal

2. **Checked Recent Deploys:**
   - New feature deployed 30 mins before incident: "User feed with pagination"

3. **Found the Bug:**
```typescript
// BAD CODE (Deployed)
async function getUserFeed(userId: string, page: number) {
  const user = await db.users.findUnique({ where: { id: userId } });
  
  const friends = await db.friends.findMany({ where: { userId } });
  
  // N+1 QUERY BUG!
  for (const friend of friends) { // 500 friends
    const posts = await db.posts.findMany({
      where: { userId: friend.id },
      take: 10
    });
    feed.push(...posts);
  }
  
  return feed;
}
```

**Root Cause:**
- 1 user with 500 friends triggered 501 database queries
- Connection pool exhausted
- All subsequent requests queued/timed out

**Immediate Fix (5 mins):**
```bash
# Rollback deployment
git revert HEAD
npm run deploy
```

**Proper Fix (Next Day):**
```typescript
async function getUserFeed(userId: string, page: number) {
  const friendIds = await db.friends.findMany({
    where: { userId },
    select: { friendId: true }
  });
  
  // SINGLE QUERY with IN clause
  const posts = await db.posts.findMany({
    where: { userId: { in: friendIds.map(f => f.friendId) } },
    take: 50,
    skip: page * 50,
    orderBy: { createdAt: 'desc' }
  });
  
  return posts;
}
```

**Preventive Measures:**
1. **Added query logging in staging:**
   ```typescript
   const prisma = new PrismaClient({ log: ['query'] });
   ```

2. **Load testing in CI:**
   ```bash
   # Artillery test with 100 concurrent users
   npm run load-test
   ```

3. **Database connection monitoring:**
   ```typescript
   setInterval(() => {
     const poolSize = db.$pool.totalCount;
     const idle = db.$pool.idleCount;
     metrics.gauge('db.pool.active', poolSize - idle);
   }, 10000);
   ```

4. **Code review checklist:** Always check for N+1 queries

**Outcome:**
- Downtime: 8 minutes
- Learned to enable query logging always in non-prod environments
- Implemented automated load tests for all new features

**Key Lesson:** Always test with realistic data volumes. Our staging had 10 users; production had users with 500+ friends."


---

## 8. Production Problems & How to Explain Them

> **💡 Senior Insight**: Production problems make the best interview stories. Use the STAR method (Situation, Task, Action, Result) with specific metrics.

### Problem 1: N+1 Query Problem

**Interview Question**: "Tell me about a time you optimized database performance in production"

**Scenario**:
While working on a social media feed feature, we noticed API response times degrading from 200ms to 5+ seconds as users gained more followers. The `/api/feed` endpoint was timing out for users with 500+ followers.

**How I Detected It**:
- **📊 Datadog APM** showed database time was 95% of response time
- Enabled **query logging** in PostgreSQL: `log_min_duration_statement = 100`
- Discovered 501 SELECT queries for a single API call

**Root Cause**:
```typescript
// ❌ BAD CODE - N+1 Query Pattern
async function getUserFeed(userId: string) {
  // 1 query to get followers
  const followers = await db.followers.findMany({ 
    where: { userId } 
  }); // Returns 500 followers
  
  const feed = [];
  
  // N queries (500 queries!)
  for (const follower of followers) {
    const posts = await db.posts.findMany({
      where: { authorId: follower.followerId },
      take: 10,
      orderBy: { createdAt: 'desc' }
    });
    feed.push(...posts);
  }
  
  return feed.slice(0, 50);
}
// Total: 1 + 500 = 501 queries!
```

**Solution**:
```typescript
// ✅ FIXED - Single Query with JOIN
async function getUserFeed(userId: string) {
  const posts = await db.posts.findMany({
    where: {
      author: {
        followers: {
          some: { userId }
        }
      }
    },
    include: {
      author: {
        select: { id: true, name: true, avatar: true }
      }
    },
    take: 50,
    orderBy: { createdAt: 'desc' }
  });
  
  return posts;
}
// Total: 1 query with JOIN
```

**Alternative Solution - GraphQL DataLoader**:
```typescript
// For GraphQL APIs - batch and cache
const postLoader = new DataLoader(async (userIds: string[]) => {
  const posts = await db.posts.findMany({
    where: { authorId: { in: userIds } },
    take: 10,
    orderBy: { createdAt: 'desc' }
  });
  
  // Group by userId
  const grouped = groupBy(posts, 'authorId');
  return userIds.map(id => grouped[id] || []);
});

// Usage in resolver
const posts = await postLoader.load(follower.id); // Batches all loads
```

**Prevention**:
1. **Enable query logging in development**:
```typescript
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query'] : []
});
```

2. **Set query count alerts**:
```typescript
// Middleware to count queries per request
app.use((req, res, next) => {
  const queryCount = { count: 0 };
  req.queryCount = queryCount;
  
  prisma.$use(async (params, next) => {
    queryCount.count++;
    return next(params);
  });
  
  res.on('finish', () => {
    if (queryCount.count > 10) {
      logger.warn(`High query count: ${queryCount.count} for ${req.path}`);
    }
  });
  
  next();
});
```

3. **Code review checklist**: Always check for loops with await inside

**Impact**:
- Response time: **5000ms → 180ms** (96% improvement)
- Database CPU: **80% → 15%**
- Queries per request: **501 → 1**
- Cost savings: Reduced RDS instance size (saved $800/month)

**Key Takeaways**:
- Always test with production-like data volumes (our staging had 10 followers, prod had 500+)
- N+1 is subtle - it works fine with small datasets
- Tools: DataLoader for GraphQL, eager loading for REST, query batching for any API

---

### Problem 2: Memory Leak in Event Listeners

**Interview Question**: "Have you dealt with memory leaks in production? How did you find and fix them?"

**Scenario**:
Our real-time chat application's memory usage grew from 200MB to 2GB over 48 hours, eventually causing OOM crashes and service restarts every 6 hours.

**How I Detected It**:
- **📊 Monitoring**: Datadog showed linear memory growth
- **Heap snapshots**: Took 3 snapshots (start, 6hrs, 12hrs) via Chrome DevTools
- **Analysis**: Compared snapshots - found 50,000+ `EventEmitter` objects

**Root Cause**:
```typescript
// ❌ BAD CODE - Event listeners never removed
class ChatService {
  private socket: WebSocket;
  
  async handleUserConnection(userId: string) {
    const user = await db.users.findUnique({ where: { id: userId } });
    
    // New listener added on every connection
    this.socket.on('message', (msg) => {
      // Closure captures 'user' object
      this.processMessage(msg, user);
    });
    
    // Connection closes but listener remains in memory!
  }
}

// After 10,000 connections: 10,000 listeners actively listening
```

**Solution**:
```typescript
// ✅ FIXED - Proper cleanup with named functions
class ChatService {
  private socket: WebSocket;
  private messageHandlers = new Map<string, (msg: any) => void>();
  
  async handleUserConnection(userId: string) {
    const user = await db.users.findUnique({ where: { id: userId } });
    
    // Named function for removal
    const messageHandler = (msg: any) => {
      this.processMessage(msg, user);
    };
    
    this.messageHandlers.set(userId, messageHandler);
    this.socket.on('message', messageHandler);
    
    // Cleanup on disconnect
    this.socket.on('close', () => {
      const handler = this.messageHandlers.get(userId);
      if (handler) {
        this.socket.removeListener('message', handler);
        this.messageHandlers.delete(userId);
      }
    });
  }
}
```

**Alternative - WeakMap for Auto Cleanup**:
```typescript
// Use WeakMap - automatically garbage collected
const userCache = new WeakMap();

function processUser(user: User) {
  userCache.set(user, { lastActive: Date.now() });
  // When 'user' object is no longer referenced, entry auto-removed
}
```

**Prevention**:
1. **Memory monitoring**:
```typescript
setInterval(() => {
  const usage = process.memoryUsage();
  metrics.gauge('memory.heapUsed', usage.heapUsed);
  
  if (usage.heapUsed > 1.5 * 1024 * 1024 * 1024) { // 1.5GB
    logger.error('High memory usage detected', usage);
  }
}, 60000);
```

2. **Automated heap snapshots**:
```bash
node --inspect --heap-prof index.js
```

3. **Listener count limits**:
```typescript
EventEmitter.defaultMaxListeners = 10; // Warns if exceeded
```

**Impact**:
- Memory after 48hrs: **2GB → 220MB** (stable)
- Service uptime: **6 hours → 30+ days**
- No more OOM crashes

**Key Takeaways**:
- Always pair event listeners with cleanup logic
- Use WeakMap/WeakSet for caches that should be garbage collected
- Monitor heap growth in production
- Take heap snapshots before/after to find leaks

---

### Problem 3: Connection Pool Exhaustion

**Interview Question**: "Describe a time you debugged a production database issue"

**Scenario**:
During Black Friday traffic spike, our API started returning 500 errors. Requests were queueing up, and new users couldn't check out their shopping carts. Response times went from 150ms to 30+ seconds.

**How I Detected It**:
- **📊 Metrics**: Database connection pool at 100/100 (maxed out)
- **APM tracing**: Requests waiting for available DB connection
- **PostgreSQL**: `SELECT count(*) FROM pg_stat_activity;` showed all connections IDLE in transaction

**Root Cause**:
```typescript
// ❌ BAD CODE - Transaction never committed/rolled back
async function processOrder(orderId: string) {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const order = await client.query(
      'SELECT * FROM orders WHERE id = $1',
      [orderId]
    );
    
    // Business logic...
    await updateInventory(order.items);
    
    // ⚠️ FORGOT TO COMMIT OR ROLLBACK
    // Connection held indefinitely!
    
  } catch (error) {
    // Even catch block doesn't rollback
    logger.error(error);
  }
  
  // Connection never released
}
```

**Solution**:
```typescript
// ✅ FIXED - Always release connection
async function processOrder(orderId: string) {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const result = await client.query(
      'SELECT * FROM orders WHERE id = $1',
      [orderId]
    );
    
    await updateInventory(result.rows[0].items);
    
    await client.query('COMMIT');
    
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release(); // ALWAYS release
  }
}

// Better: Use transaction wrapper
async function processOrder(orderId: string) {
  return await pool.transaction(async (client) => {
    const result = await client.query(
      'SELECT * FROM orders WHERE id = $1',
      [orderId]
    );
    
    await updateInventory(result.rows[0].items);
    
    return result.rows[0];
    // Auto commits on success, rolls back on error, releases connection
  });
}
```

**Prevention**:
1. **Connection pool monitoring**:
```typescript
setInterval(() => {
  const total = pool.totalCount;
  const idle = pool.idleCount;
  const waiting = pool.waitingCount;
  
  metrics.gauge('db.pool.total', total);
  metrics.gauge('db.pool.idle', idle);
  metrics.gauge('db.pool.waiting', waiting);
  
  if (waiting > 10) {
    logger.warn('Connection pool under pressure', { total, idle, waiting });
  }
}, 10000);
```

2. **Proper pool sizing**:
```typescript
const pool = new Pool({
  max: 20, // Max connections
  idleTimeoutMillis: 30000, // Close idle connections after 30s
  connectionTimeoutMillis: 5000, // Fail fast if no connection available
});
```

3. **Statement timeout**:
```sql
-- Kill queries running > 30 seconds
ALTER DATABASE mydb SET statement_timeout = '30s';
```

**Impact**:
- Connection pool usage: **100/100 → avg 15/20**
- Response time: **30s → 180ms**
- Error rate: **45% → 0.1%**
- Successfully handled Black Friday (5x normal traffic)

**Key Takeaways**:
- ALWAYS use `finally` block or auto-releasing wrappers
- Monitor connection pool metrics proactively
- Set statement timeouts to prevent long-running queries
- Load test with production-scale traffic

---

### Problem 4: Race Condition in Async Code

**Interview Question**: "Tell me about a concurrency bug you fixed"

**Scenario**:
Users reported their account balances randomly becoming negative in our payment system. The bug was intermittent and hard to reproduce - it only happened under high load.

**How I Detected It**:
- **🐛 Bug reports**: Negative balances in production DB
- **Timing**: Only occurred during peak hours (high concurrency)
- **Logs**: Multiple concurrent withdrawals processed simultaneously

**Root Cause**:
```typescript
// ❌ BAD CODE - Race condition
async function withdraw(userId: string, amount: number) {
  // Step 1: Read current balance
  const user = await db.users.findUnique({ where: { id: userId } });
  
  // Step 2: Check if sufficient funds
  if (user.balance < amount) {
    throw new Error('Insufficient funds');
  }
  
  // ⚠️ RACE CONDITION HERE
  // Another request can execute between check and update
  
  // Step 3: Update balance
  await db.users.update({
    where: { id: userId },
    data: { balance: user.balance - amount }
  });
}

// Concurrent requests:
// Time  Request A ($50)         Request B ($50)        Balance
// 0     Read balance ($100)     -                      $100
// 1     -                       Read balance ($100)    $100
// 2     Check OK (100 >= 50)    -                      $100
// 3     -                       Check OK (100 >= 50)   $100
// 4     Update balance ($50)    -                      $50
// 5     -                       Update balance ($50)   $0
// Result: Both withdrawals succeed, but should have only allowed one!
```

**Solution 1 - Optimistic Locking**:
```typescript
// ✅ FIXED - Optimistic locking with version
async function withdraw(userId: string, amount: number) {
  const user = await db.users.findUnique({ where: { id: userId } });
  
  if (user.balance < amount) {
    throw new Error('Insufficient funds');
  }
  
  // Atomic update with version check
  const result = await db.users.updateMany({
    where: {
      id: userId,
      version: user.version, // Only update if version matches
      balance: { gte: amount } // Double-check balance
    },
    data: {
      balance: { decrement: amount },
      version: { increment: 1 }
    }
  });
  
  if (result.count === 0) {
    throw new Error('Withdrawal failed - retry'); // Concurrent modification detected
  }
}
```

**Solution 2 - Pessimistic Locking**:
```typescript
// ✅ FIXED - Database-level row lock
async function withdraw(userId: string, amount: number) {
  return await db.$transaction(async (tx) => {
    // SELECT FOR UPDATE locks the row
    const user = await tx.$queryRaw`
      SELECT * FROM users WHERE id = ${userId} FOR UPDATE
    `;
    
    if (user[0].balance < amount) {
      throw new Error('Insufficient funds');
    }
    
    await tx.users.update({
      where: { id: userId },
      data: { balance: { decrement: amount } }
    });
    
    // Lock released when transaction commits
  });
}
```

**Solution 3 - Distributed Lock (Redis)**:
```typescript
// ✅ FIXED - Application-level distributed lock
import Redlock from 'redlock';

const redlock = new Redlock([redisClient]);

async function withdraw(userId: string, amount: number) {
  const lock = await redlock.lock(`lock:user:${userId}`, 5000); // 5s timeout
  
  try {
    const user = await db.users.findUnique({ where: { id: userId } });
    
    if (user.balance < amount) {
      throw new Error('Insufficient funds');
    }
    
    await db.users.update({
      where: { id: userId },
      data: { balance: { decrement: amount } }
    });
    
  } finally {
    await lock.unlock();
  }
}
```

**Prevention**:
1. **Load testing for concurrency bugs**:
```bash
# Apache Bench - 1000 requests, 50 concurrent
ab -n 1000 -c 50 -p data.json http://localhost:3000/api/withdraw
```

2. **Add database constraints**:
```sql
ALTER TABLE users ADD CONSTRAINT balance_positive CHECK (balance >= 0);
```

**Impact**:
- Negative balances: **12 incidents/week → 0**
- Concurrency bugs: **Eliminated**
- Financial accuracy: **100%**

**Key Takeaways**:
- Read-check-modify pattern is always a race condition risk
- Choose locking strategy: Optimistic (low contention), Pessimistic (high contention)
- Use database constraints as last line of defense
- Load test with concurrent requests to catch race conditions

---

### Problem 5: Cache Stampede (Thundering Herd)

**Interview Question**: "How have you optimized caching in a high-traffic system?"

**Scenario**:
Every hour at :00 minutes, our database CPU spiked to 100% for ~30 seconds, causing API timeouts. The pattern was predictable and correlated with our cache TTL expiration.

**How I Detected It**:
- **📊 Datadog**: Database CPU spikes every hour on the hour
- **Redis metrics**: Cache hit rate dropped to 0% at :00 minutes
- **Logs**: 10,000+ simultaneous cache misses

**Root Cause**:
```typescript
// ❌ BAD CODE - All cache entries expire simultaneously
async function getPopularProducts() {
  const cached = await redis.get('popular_products');
  
  if (cached) {
    return JSON.parse(cached);
  }
  
  // Cache miss - ALL requests hit database simultaneously
  const products = await db.products.findMany({
    where: { views: { gt: 10000 } },
    orderBy: { views: 'desc' },
    take: 100
  });
  
  // All cache entries have same TTL (3600s)
  await redis.setex('popular_products', 3600, JSON.stringify(products));
  
  return products;
}

// At 12:00: Cache set for all users
// At 12:59:59: Cache still valid (10K requests/sec served from cache)
// At 13:00:00: Cache expires
// At 13:00:01: ALL 10K requests hit database simultaneously 💥
```

**Solution 1 - Distributed Lock**:
```typescript
// ✅ FIXED - Only one request regenerates cache
async function getPopularProducts() {
  const cached = await redis.get('popular_products');
  
  if (cached) {
    return JSON.parse(cached);
  }
  
  // Try to acquire lock
  const lockKey = 'lock:popular_products';
  const lock = await redis.set(lockKey, '1', 'EX', 10, 'NX');
  
  if (lock) {
    // This request won the lock - regenerate cache
    try {
      const products = await db.products.findMany({
        where: { views: { gt: 10000 } },
        orderBy: { views: 'desc' },
        take: 100
      });
      
      await redis.setex('popular_products', 3600, JSON.stringify(products));
      return products;
      
    } finally {
      await redis.del(lockKey);
    }
  } else {
    // Another request is regenerating - wait and retry
    await sleep(100);
    return getPopularProducts(); // Retry (will hit cache)
  }
}
```

**Solution 2 - Probabilistic Early Expiration**:
```typescript
// ✅ FIXED - Stagger cache refreshes
async function getPopularProducts() {
  const cacheData = await redis.get('popular_products_with_meta');
  
  if (cacheData) {
    const { data, expiresAt } = JSON.parse(cacheData);
    const now = Date.now();
    const timeToExpire = expiresAt - now;
    
    // Probabilistic early refresh
    // Closer to expiration = higher chance of refresh
    const beta = 1; // Tuning parameter
    const shouldRefresh = Math.random() < beta * (1 / timeToExpire);
    
    if (shouldRefresh) {
      // Refresh in background (don't wait)
      refreshCache().catch(console.error);
    }
    
    return data;
  }
  
  // Cache miss - refresh
  return await refreshCache();
}

async function refreshCache() {
  const products = await db.products.findMany({
    where: { views: { gt: 10000 } },
    orderBy: { views: 'desc' },
    take: 100
  });
  
  const ttl = 3600;
  await redis.setex(
    'popular_products_with_meta',
    ttl,
    JSON.stringify({
      data: products,
      expiresAt: Date.now() + (ttl * 1000)
    })
  );
  
  return products;
}
```

**Solution 3 - Cache Warming**:
```typescript
// ✅ PREVENTION - Pre-populate cache before expiration
async function warmCache() {
  const products = await db.products.findMany({
    where: { views: { gt: 10000 } },
    orderBy: { views: 'desc' },
    take: 100
  });
  
  await redis.setex('popular_products', 3600, JSON.stringify(products));
}

// Run every 50 minutes (before 60min expiration)
cron.schedule('*/50 * * * *', warmCache);
```

**Prevention**:
1. **Monitor cache hit rate**:
```typescript
async function getCached(key: string, fetcher: () => Promise<any>) {
  const cached = await redis.get(key);
  
  if (cached) {
    metrics.increment('cache.hit');
    return JSON.parse(cached);
  }
  
  metrics.increment('cache.miss');
  const data = await fetcher();
  await redis.setex(key, 3600, JSON.stringify(data));
  return data;
}
```

2. **Add jitter to TTL**:
```typescript
const baseTTL = 3600;
const jitter = Math.floor(Math.random() * 300); // 0-5 minutes
const ttl = baseTTL + jitter; // Staggers expiration
```

**Impact**:
- Database CPU spikes: **100% → <20%**
- Cache stampede incidents: **24/day → 0**
- API timeout rate: **5% at peak → 0.01%**

**Key Takeaways**:
- Synchronized cache expiration is dangerous at scale
- Use distributed locks or probabilistic early expiration
- Cache warming for predictable high-traffic data
- Always add jitter to TTLs

---

### Problem 6: Event Loop Blocking

**Interview Question**: "How do you handle CPU-intensive tasks in Node.js?"

**Scenario**:
Our image processing API became completely unresponsive when multiple users uploaded large images simultaneously. Even simple health check endpoints timed out.

**How I Detected It**:
- **📊 Monitoring**: Event loop lag metric spiked to 5000ms
- **Symptoms**: ALL endpoints became slow, not just image processing
- **Testing**: Simple `GET /health` took 10+ seconds

**Root Cause**:
```typescript
// ❌ BAD CODE - CPU-intensive task blocking event loop
app.post('/api/process-image', async (req, res) => {
  const imageBuffer = req.file.buffer;
  
  // Synchronous image processing blocks event loop
  const resized = sharp(imageBuffer)
    .resize(800, 600)
    .toBuffer(); // Blocks for 2-5 seconds
  
  // During this time, NO other requests are processed
  // Event loop is stuck
  
  res.send(resized);
});

// With 10 concurrent uploads:
// Total block time: 10 * 3s = 30 seconds where server is frozen
```

**Solution 1 - Worker Threads**:
```typescript
// ✅ FIXED - Offload to worker thread
import { Worker } from 'worker_threads';

app.post('/api/process-image', async (req, res) => {
  const imageBuffer = req.file.buffer;
  
  // Create worker thread
  const worker = new Worker('./image-worker.js', {
    workerData: { imageBuffer }
  });
  
  worker.on('message', (resizedBuffer) => {
    res.send(resizedBuffer);
  });
  
  worker.on('error', (error) => {
    res.status(500).json({ error: error.message });
  });
});

// image-worker.js
const { parentPort, workerData } = require('worker_threads');
const sharp = require('sharp');

sharp(workerData.imageBuffer)
  .resize(800, 600)
  .toBuffer()
  .then(buffer => {
    parentPort.postMessage(buffer);
  });
```

**Solution 2 - Message Queue**:
```typescript
// ✅ FIXED - Async processing with queue
app.post('/api/process-image', async (req, res) => {
  const imageBuffer = req.file.buffer;
  const jobId = uuidv4();
  
  // Store image temporarily
  await redis.set(`image:${jobId}`, imageBuffer, 'EX', 3600);
  
  // Queue processing job
  await queue.publish('image.process', {
    jobId,
    userId: req.user.id
  });
  
  // Return immediately
  res.status(202).json({
    jobId,
    status: 'processing',
    statusUrl: `/api/jobs/${jobId}`
  });
});

// Separate worker process
queue.consume('image.process', async (message) => {
  const { jobId } = message;
  const imageBuffer = await redis.get(`image:${jobId}`);
  
  const resized = await sharp(imageBuffer).resize(800, 600).toBuffer();
  
  await s3.upload(resized);
  await db.jobs.update({
    where: { id: jobId },
    data: { status: 'completed' }
  });
});
```

**Solution 3 - Break into Chunks**:
```typescript
// ✅ FIXED - Process incrementally with setImmediate
async function processLargeArray(items: any[]) {
  const chunkSize = 100;
  const results = [];
  
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    
    // Process chunk
    results.push(...chunk.map(process));
    
    // Yield to event loop every 100 items
    await new Promise(resolve => setImmediate(resolve));
  }
  
  return results;
}
```

**Prevention**:
1. **Monitor event loop lag**:
```typescript
import { performance } from 'perf_hooks';

setInterval(() => {
  const start = performance.now();
  
  setImmediate(() => {
    const lag = performance.now() - start;
    metrics.gauge('event_loop.lag', lag);
    
    if (lag > 100) {
      logger.warn('Event loop lag detected', { lag });
    }
  });
}, 5000);
```

2. **Identify blocking code**:
```bash
node --prof index.js
node --prof-process isolate-*.log
```

**Impact**:
- Event loop lag: **5000ms → <10ms**
- Health check response: **10s → 5ms**
- Concurrent upload capacity: **5 → 100+**
- Server remained responsive under load

**Key Takeaways**:
- Node.js is single-threaded - CPU tasks block everything
- Use Worker Threads for CPU-intensive synchronous work
- Use message queues for long-running async work
- Monitor event loop lag proactively

---

### Problem 7: Slow Query Optimization

**Interview Question**: "Walk me through how you optimize a slow database query"

**Scenario**:
Our admin dashboard took 45 seconds to load the user analytics page. The page showed user activity across multiple tables with filters and sorting.

**How I Detected It**:
- **📊 APM tracing**: 95% of time spent in one database query
- **PostgreSQL slow query log**: Query flagged as slow
- **EXPLAIN ANALYZE**: Showed sequential scan on 10M row table

**Root Cause**:
```typescript
// ❌ BAD CODE - Missing index causing full table scan
const users = await db.$queryRaw`
  SELECT 
    u.id,
    u.email,
    u.created_at,
    COUNT(o.id) as order_count,
    SUM(o.total) as total_spent
  FROM users u
  LEFT JOIN orders o ON o.user_id = u.id
  WHERE u.created_at >= ${startDate}
    AND u.country = ${country}
  GROUP BY u.id
  ORDER BY total_spent DESC
  LIMIT 100
`;

// EXPLAIN ANALYZE output:
// Seq Scan on users (cost=0..250000 rows=10000000)
//   Filter: (created_at >= '2024-01-01' AND country = 'US')
// Planning time: 0.5ms
// Execution time: 45000ms
```

**Solution**:
```typescript
// Step 1: Add indexes
await db.$executeRaw`
  CREATE INDEX idx_users_created_country ON users(created_at, country);
  CREATE INDEX idx_orders_user_id ON orders(user_id);
`;

// Step 2: Optimize query
const users = await db.$queryRaw`
  SELECT 
    u.id,
    u.email,
    u.created_at,
    COALESCE(o.order_count, 0) as order_count,
    COALESCE(o.total_spent, 0) as total_spent
  FROM users u
  LEFT JOIN (
    SELECT 
      user_id,
      COUNT(*) as order_count,
      SUM(total) as total_spent
    FROM orders
    WHERE created_at >= ${startDate}
    GROUP BY user_id
  ) o ON o.user_id = u.id
  WHERE u.created_at >= ${startDate}
    AND u.country = ${country}
  ORDER BY total_spent DESC
  LIMIT 100
`;

// NEW EXPLAIN ANALYZE output:
// Index Scan using idx_users_created_country (cost=0..850 rows=100)
//   Index Cond: (created_at >= '2024-01-01' AND country = 'US')
// Planning time: 1.2ms
// Execution time: 120ms
```

**Step-by-Step Optimization Process**:

1. **Identify slow query**:
```sql
-- Enable slow query logging
ALTER DATABASE mydb SET log_min_duration_statement = '1000'; -- 1 second
```

2. **Analyze execution plan**:
```sql
EXPLAIN ANALYZE <your query>;
```

3. **Look for red flags**:
- `Seq Scan` (sequential scan) - BAD
- `Index Scan` - GOOD
- High `cost` values
- Large `rows` estimates

4. **Add indexes strategically**:
```sql
-- Index for WHERE clause
CREATE INDEX idx_users_country_created ON users(country, created_at);

-- Partial index for common filter
CREATE INDEX idx_active_users ON users(created_at) WHERE is_active = true;

-- Covering index (includes SELECT columns)
CREATE INDEX idx_users_cover ON users(country, created_at) INCLUDE (email);
```

5. **Monitor index usage**:
```sql
-- Check if indexes are being used
SELECT 
  schemaname,
  tablename,
  indexname,
  idx_scan,
  idx_tup_read,
  idx_tup_fetch
FROM pg_stat_user_indexes
WHERE idx_scan = 0
ORDER BY schemaname, tablename;
```

**Prevention**:
1. **Query analysis in CI/CD**:
```typescript
// Run EXPLAIN in tests
test('user analytics query should use index', async () => {
  const plan = await db.$queryRaw`EXPLAIN ${query}`;
  
  const usesSeqScan = plan.some(row => 
    row['QUERY PLAN'].includes('Seq Scan on users')
  );
  
  expect(usesSeqScan).toBe(false);
});
```

2. **Auto-explain slow queries**:
```sql
-- PostgreSQL auto-explain
LOAD 'auto_explain';
SET auto_explain.log_min_duration = '1000';
SET auto_explain.log_analyze = true;
```

**Impact**:
- Query time: **45s → 120ms** (99.7% improvement)
- Dashboard load time: **48s → 300ms**
- Database CPU: **60% → 8%**
- User satisfaction: Complaints dropped to zero

**Key Takeaways**:
- EXPLAIN ANALYZE is your best friend
- Index columns used in WHERE, JOIN, ORDER BY
- Beware of over-indexing (slows writes)
- Monitor index usage and remove unused ones
- Test queries with production data volumes

---

### Problem 8: API Rate Limit Overflow

**Interview Question**: "How do you handle third-party API rate limits?"

**Scenario**:
Our notification service sent SMS via Twilio (rate limit: 100 req/sec). During flash sales, we generated 500+ notifications/sec, causing 429 errors and failed notifications.

**How I Detected It**:
- **📊 Error logs**: 429 (Too Many Requests) from Twilio
- **Monitoring**: 70% of SMS requests failing during peak
- **Business impact**: Users not receiving order confirmations

**Root Cause**:
```typescript
// ❌ BAD CODE - No rate limiting
async function sendOrderConfirmation(order: Order) {
  // During flash sale: 500 concurrent calls
  const sms = await twilioClient.messages.create({
    to: order.phone,
    from: process.env.TWILIO_PHONE,
    body: `Order ${order.id} confirmed!`
  });
  
  // Twilio rate limit: 100/sec
  // Result: 400 requests fail with 429 errors
}
```

**Solution 1 - Request Queue with Rate Limiter**:
```typescript
// ✅ FIXED - Queue with rate limiting
import Bottleneck from 'bottleneck';

const twilioLimiter = new Bottleneck({
  reservoir: 100, // 100 requests
  reservoirRefreshAmount: 100,
  reservoirRefreshInterval: 1000, // per second
  maxConcurrent: 10, // Max concurrent requests
  minTime: 10 // Min 10ms between requests
});

async function sendOrderConfirmation(order: Order) {
  // Queue the request - automatically limited
  return twilioLimiter.schedule(async () => {
    const sms = await twilioClient.messages.create({
      to: order.phone,
      from: process.env.TWILIO_PHONE,
      body: `Order ${order.id} confirmed!`
    });
    
    return sms;
  });
}

// Requests above 100/sec are queued, not rejected
```

**Solution 2 - Exponential Backoff Retry**:
```typescript
// ✅ FIXED - Retry with backoff on 429
async function sendSMSWithRetry(
  phone: string,
  message: string,
  maxRetries = 3
) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const sms = await twilioClient.messages.create({
        to: phone,
        from: process.env.TWILIO_PHONE,
        body: message
      });
      
      return sms;
      
    } catch (error) {
      if (error.status === 429 && attempt < maxRetries) {
        // Exponential backoff: 1s, 2s, 4s
        const delay = Math.pow(2, attempt) * 1000;
        
        // Use Retry-After header if provided
        const retryAfter = error.headers?.['retry-after'];
        const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : delay;
        
        await sleep(waitTime);
        continue;
      }
      
      throw error;
    }
  }
}
```

**Solution 3 - Circuit Breaker**:
```typescript
// ✅ FIXED - Circuit breaker to prevent cascading failures
import CircuitBreaker from 'opossum';

const twilioBreaker = new CircuitBreaker(
  async (phone: string, message: string) => {
    return twilioClient.messages.create({
      to: phone,
      from: process.env.TWILIO_PHONE,
      body: message
    });
  },
  {
    timeout: 10000, // 10s timeout
    errorThresholdPercentage: 50, // Open if 50% fail
    resetTimeout: 30000, // Try again after 30s
    rollingCountTimeout: 60000 // 1 minute window
  }
);

twilioBreaker.on('open', () => {
  logger.error('Twilio circuit breaker OPEN - failing fast');
  // Alert ops team
});

async function sendOrderConfirmation(order: Order) {
  try {
    return await twilioBreaker.fire(order.phone, `Order ${order.id} confirmed!`);
  } catch (error) {
    // Fallback: Queue for retry later
    await smsQueue.publish('sms.retry', { order });
    logger.warn('SMS queued for retry', { orderId: order.id });
  }
}
```

**Solution 4 - Multi-Provider Fallback**:
```typescript
// ✅ ADVANCED - Multiple SMS providers
const providers = [
  { name: 'twilio', limit: 100, client: twilioClient },
  { name: 'sendgrid', limit: 50, client: sendgridClient },
  { name: 'sns', limit: 10, client: snsClient }
];

async function sendSMSWithFallback(phone: string, message: string) {
  for (const provider of providers) {
    try {
      const limiter = limiters.get(provider.name);
      
      return await limiter.schedule(async () => {
        return provider.client.send(phone, message);
      });
      
    } catch (error) {
      logger.warn(`${provider.name} failed, trying next provider`, error);
      continue;
    }
  }
  
  throw new Error('All SMS providers failed');
}
```

**Prevention**:
1. **Monitor rate limit usage**:
```typescript
twilioLimiter.on('failed', (error, jobInfo) => {
  if (error.status === 429) {
    metrics.increment('twilio.rate_limited');
  }
});

twilioLimiter.on('queued', () => {
  metrics.gauge('twilio.queue_size', twilioLimiter.counts().QUEUED);
});
```

2. **Load testing**:
```bash
# Artillery config for rate limit testing
artillery quick --count 1000 --rate 200 http://localhost:3000/api/send-sms
```

**Impact**:
- SMS delivery rate: **30% → 99.5%**
- 429 errors: **400/sec → 0**
- Peak throughput: **500 req/sec → 100 req/sec (queued)**
- User notifications: No missed confirmations

**Key Takeaways**:
- Always respect third-party rate limits
- Use request queues (Bottleneck, Bull)
- Implement circuit breakers for resilience
- Have fallback providers for critical services
- Monitor queue depth and alert on backlog

---

### Tree-shaking (Dead Code Elimination)

**Answer Script:**
"**Tree-shaking** is a technique to eliminate unused code from your final bundle. It relies on ES6 module syntax (`import`/`export`) which is **statically analyzable** - bundlers can determine at build time what's used and what's not.

**How It Works:**
```javascript
// math.js - Library
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }
export function multiply(a, b) { return a * b; }

// app.js - Your code
import { add } from './math.js'; // Only import what you need

console.log(add(2, 3));

// After tree-shaking, bundler only includes 'add', removes 'subtract' and 'multiply'
```

**Why It Matters:**
- **Smaller bundle size** → Faster page loads
- **Better performance** → Less JavaScript to parse/execute
- **Production optimization** → Can reduce bundle by 30-50%

**Requirements for Tree-shaking:**

1. **Use ES6 modules (not CommonJS):**
```javascript
// ✅ Tree-shakeable (ES6)
import { debounce } from 'lodash-es';

// ❌ NOT tree-shakeable (CommonJS)
const _ = require('lodash'); // Imports entire library
```

2. **`sideEffects` in package.json:**
```json
{
  "name": "my-library",
  "sideEffects": false  // Tells bundler: all files are pure, safe to tree-shake
}

// Or specify files with side effects:
{
  "sideEffects": ["*.css", "*.scss", "polyfills.js"]
}
```

**Side Effects Explained:**
Code with side effects modifies global state or has observable behavior beyond return value:
```javascript
// Side effect - modifies global
window.myGlobal = 'value';

// Side effect - registers event
document.addEventListener('click', handler);

// Pure (no side effects) - safe to tree-shake
export function add(a, b) { return a + b; }
```

**Webpack Configuration:**
```javascript
// webpack.config.js
module.exports = {
  mode: 'production', // Enables tree-shaking
  optimization: {
    usedExports: true, // Mark unused exports
    minimize: true,    // Remove dead code
  }
};
```

**Verifying Tree-shaking:**
```bash
# Build and analyze bundle
npx webpack --mode production
npx webpack-bundle-analyzer dist/bundle.js

# Check what's included
grep -r 'subtract' dist/bundle.js  # Should not find it if unused
```

**Common Pitfalls:**

1. **Babel transpilation breaks tree-shaking:**
```json
// .babelrc - WRONG (converts ES6 to CommonJS)
{
  "presets": [
    ["@babel/preset-env", {
      "modules": "commonjs"  // ❌ Breaks tree-shaking
    }]
  ]
}

// .babelrc - CORRECT
{
  "presets": [
    ["@babel/preset-env", {
      "modules": false  // ✅ Keeps ES6 modules
    }]
  ]
}
```

2. **Default imports include everything:**
```javascript
// ❌ Imports entire library (even with tree-shaking)
import _ from 'lodash';

// ✅ Only imports debounce
import { debounce } from 'lodash-es';
```

3. **Dynamic imports prevent tree-shaking:**
```javascript
// ❌ Cannot analyze statically
const moduleName = Math.random() > 0.5 ? 'moduleA' : 'moduleB';
import(moduleName);

// ✅ Static import
import { feature } from './module.js';
```

**Real-World Impact Example:**
```javascript
// Before tree-shaking
import * as _ from 'lodash';  // ~70KB minified

// After tree-shaking
import { debounce, throttle } from 'lodash-es';  // ~5KB minified

// Result: 93% smaller bundle!
```

**Senior Insight:**
In a production app I optimized, switching from `lodash` to `lodash-es` with tree-shaking reduced our vendor bundle from **280KB to 145KB** - a **48% reduction**. This improved our Time to Interactive by 0.8 seconds.

**Monitoring Tree-shaking Effectiveness:**
```bash
# Compare bundle sizes
npm run build
ls -lh dist/

# Use source-map-explorer
npm install -g source-map-explorer
source-map-explorer dist/main.*.js
```

**Best Practices:**
1. Always use ES6 imports in application code
2. Choose libraries that support tree-shaking (check for `module` field in package.json)
3. Set `sideEffects: false` in your library's package.json if pure
4. Avoid `import *` - import only what you need
5. Run bundle analysis regularly to catch regressions"

---

### HTTP Status Codes (Common Ones)

**Mnemonic: "SUCCESS-REDIRECT-CLIENT-SERVER" (2xx, 3xx, 4xx, 5xx)**

**Answer Script:**
"HTTP status codes indicate the result of a request. As a senior engineer, I categorize them by responsibility for debugging."

#### **2xx - Success**

**200 OK**
- **Meaning:** Request succeeded
- **Use case:** GET, PUT, PATCH successful
```typescript
res.status(200).json({ data: user });
```

**201 Created**
- **Meaning:** Resource created
- **Use case:** POST created new resource
```typescript
res.status(201).json({ id: newUser.id, message: 'User created' });
```

**204 No Content**
- **Meaning:** Success, no response body needed
- **Use case:** DELETE successful, or PUT with no response
```typescript
res.status(204).send(); // Empty response
```

**202 Accepted**
- **Meaning:** Request accepted for processing (async)
- **Use case:** Long-running tasks queued
```typescript
// Job queued, processing async
res.status(202).json({ jobId: '123', status: 'processing' });
```

---

#### **3xx - Redirection**

**301 Moved Permanently**
- **Meaning:** Resource permanently moved to new URL
- **Use case:** URL restructuring, SEO
```typescript
res.status(301).redirect('https://newdomain.com/resource');
```

**302 Found (Temporary Redirect)**
- **Meaning:** Resource temporarily at different URL
- **Use case:** Temporary maintenance, A/B testing
```typescript
res.status(302).redirect('/temporary-page');
```

**304 Not Modified**
- **Meaning:** Cached version is still valid
- **Use case:** Conditional GET with ETag/Last-Modified
```typescript
if (req.headers['if-none-match'] === currentETag) {
  res.status(304).end();
} else {
  res.status(200).set('ETag', currentETag).json(data);
}
```

---

#### **4xx - Client Errors (User's Fault)**

**400 Bad Request**
- **Meaning:** Invalid syntax or validation failure
- **Use case:** Malformed JSON, missing required fields
```typescript
res.status(400).json({ 
  error: 'Validation failed',
  details: { email: 'Invalid email format' }
});
```

**401 Unauthorized**
- **Meaning:** Authentication required or failed
- **Use case:** No token, invalid credentials
```typescript
res.status(401).json({ error: 'Invalid token' });
```

**403 Forbidden**
- **Meaning:** Authenticated but not authorized
- **Use case:** User lacks permissions (RBAC)
```typescript
// User logged in but not admin
res.status(403).json({ error: 'Admin access required' });
```

**Mnemonic for 401 vs 403: "Authentication vs Authorization"**
- **401:** "**Who** are you?" - Identity unknown
- **403:** "I know **who** you are, but you can't do **what** you want" - Permission denied

**404 Not Found**
- **Meaning:** Resource doesn't exist
- **Use case:** Invalid ID, deleted resource
```typescript
const user = await db.users.findUnique({ where: { id } });
if (!user) {
  return res.status(404).json({ error: 'User not found' });
}
```

**409 Conflict**
- **Meaning:** Request conflicts with current state
- **Use case:** Duplicate email, versioning conflict
```typescript
const existing = await db.users.findUnique({ where: { email } });
if (existing) {
  return res.status(409).json({ error: 'Email already registered' });
}
```

**422 Unprocessable Entity**
- **Meaning:** Syntax correct, but semantically invalid
- **Use case:** Business logic validation failure
```typescript
// JSON valid but age can't be negative
if (age < 0) {
  return res.status(422).json({ error: 'Age must be positive' });
}
```

**Difference - 400 vs 422:**
- **400:** Malformed request (can't parse JSON)
- **422:** Valid request, but business rules violated

**429 Too Many Requests**
- **Meaning:** Rate limit exceeded
- **Use case:** DDoS protection, API throttling
```typescript
res.status(429).json({
  error: 'Rate limit exceeded',
  retryAfter: 60 // seconds
});
```

---

#### **5xx - Server Errors (Our Fault)**

**500 Internal Server Error**
- **Meaning:** Unexpected server error
- **Use case:** Unhandled exceptions, bugs
```typescript
try {
  const result = await processPayment(data);
  res.json(result);
} catch (error) {
  logger.error('Payment processing failed', error);
  res.status(500).json({ error: 'Internal server error' });
  // Never send error.message to client (security risk)
}
```

**502 Bad Gateway**
- **Meaning:** Invalid response from upstream server
- **Use case:** Reverse proxy received bad response
```typescript
// Nginx → Node.js (Node crashed)
// Nginx returns 502
```

**503 Service Unavailable**
- **Meaning:** Server temporarily unavailable
- **Use case:** Maintenance, overloaded, dependencies down
```typescript
if (isMaintenanceMode) {
  res.status(503).json({ 
    error: 'Service under maintenance',
    retryAfter: '2024-12-15T10:00:00Z'
  });
}
```

**504 Gateway Timeout**
- **Meaning:** Upstream server didn't respond in time
- **Use case:** Timeout waiting for database/API
```typescript
// Request to payment gateway took > 30s
// Load balancer returns 504
```

---

#### **Status Code Selection Flowchart**

**Interview Script:**
"Here's how I decide which status code to use:

1. **Did the request succeed?**
   - Created resource? → **201**
   - No response needed? → **204**
   - Otherwise → **200**

2. **Is it a client error?**
   - Missing/invalid auth? → **401**
   - Valid auth, no permission? → **403**
   - Resource not found? → **404**
   - Duplicate/conflict? → **409**
   - Validation failed? → **400** (syntax) or **422** (semantics)
   - Rate limited? → **429**

3. **Is it a server error?**
   - Our code crashed? → **500**
   - Dependency down? → **503**
   - Dependency timeout? → **504**
   - Proxy error? → **502**"

---

#### **Advanced Patterns**

**1. Comprehensive Error Response:**
```typescript
interface ErrorResponse {
  error: string;           // User-friendly message
  code: string;            // Machine-readable error code
  details?: any;           // Validation errors
  requestId?: string;      // For support tracking
  timestamp: string;
}

res.status(400).json({
  error: 'Validation failed',
  code: 'VALIDATION_ERROR',
  details: {
    email: 'Email already registered',
    password: 'Must be at least 8 characters'
  },
  requestId: req.id,
  timestamp: new Date().toISOString()
});
```

**2. Idempotency with 200 vs 201:**
```typescript
app.post('/users', async (req, res) => {
  const existing = await db.users.findUnique({ where: { email: req.body.email } });
  
  if (existing) {
    // Idempotent: already exists
    return res.status(200).json({ id: existing.id, created: false });
  }
  
  const user = await db.users.create({ data: req.body });
  res.status(201).json({ id: user.id, created: true });
});
```

**3. Conditional Requests:**
```typescript
app.get('/users/:id', async (req, res) => {
  const user = await db.users.findUnique({ where: { id: req.params.id } });
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  const etag = generateETag(user);
  
  // Client sent If-None-Match header
  if (req.headers['if-none-match'] === etag) {
    return res.status(304).end(); // Not modified
  }
  
  res.set('ETag', etag).status(200).json(user);
});
```

**4. Retry-After Header:**
```typescript
// Rate limiting
res.set('Retry-After', '60').status(429).json({ error: 'Too many requests' });

// Maintenance
res.set('Retry-After', 'Wed, 15 Dec 2024 10:00:00 GMT').status(503).json({ 
  error: 'Maintenance' 
});
```

---

#### **Quick Reference Table**

| Code | Name | Use Case | Mnemonic |
|------|------|----------|----------|
| 200 | OK | GET success | **"All good"** |
| 201 | Created | POST success | **"Baby born"** |
| 204 | No Content | DELETE success | **"Silent success"** |
| 301 | Moved Permanently | URL changed forever | **"Moved house"** |
| 304 | Not Modified | Cache valid | **"Same old same"** |
| 400 | Bad Request | Invalid input | **"You messed up"** |
| 401 | Unauthorized | No/bad auth | **"Who are you?"** |
| 403 | Forbidden | No permission | **"I know you, but no"** |
| 404 | Not Found | Resource missing | **"Where is it?"** |
| 409 | Conflict | Duplicate/version | **"Already exists"** |
| 422 | Unprocessable | Business rule fail | **"Makes no sense"** |
| 429 | Too Many | Rate limited | **"Slow down!"** |
| 500 | Internal Error | Our bug | **"We messed up"** |
| 502 | Bad Gateway | Proxy error | **"Middleman failed"** |
| 503 | Unavailable | Maintenance | **"Come back later"** |
| 504 | Timeout | Upstream slow | **"Waited too long"** |

**Senior Insight:**
"In production, I always log 5xx errors with full context (stack trace, request payload, user ID) to Sentry, but 4xx errors only as metrics (count by type) since they're client errors. This prevents alert fatigue while catching real issues."

---

## Summary for Interview Success

**Preparation Strategy:**

1. **Know Your Resume:** Be ready to deep dive into any technology mentioned
2. **Practice Out Loud:** Don't just read - explain these concepts to someone
3. **Draw Diagrams:** For system design questions, always draw architecture
4. **Ask Clarifying Questions:** Shows senior thinking
   - "What's the expected scale?"
   - "Are there any compliance requirements?"
   - "What's more important: consistency or availability?"

5. **Show Trade-offs:** Never say "X is always better than Y"
   - "REST is simpler for public APIs, but gRPC is better for internal high-throughput services"

6. **Admit Unknowns:** "I haven't worked with Kafka directly, but I've used RabbitMQ extensively. The concepts are similar - both are message brokers, but Kafka is optimized for event streaming..."

**Red Flags to Avoid:**
- ❌ "I don't know" (without showing learning process)
- ❌ Over-engineering simple problems
- ❌ Not considering operational aspects (monitoring, debugging)
- ❌ Ignoring error handling in code samples

**Green Flags to Show:**
- ✅ Thinking about production scenarios (monitoring, scaling, failures)
- ✅ Mentioning observability (logs, metrics, traces)
- ✅ Discussing team collaboration and code reviews
- ✅ Being specific with numbers ("We handled 10K req/sec with this architecture")

Good luck! 🚀
