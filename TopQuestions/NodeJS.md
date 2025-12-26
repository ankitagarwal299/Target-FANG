# Senior Backend API Engineer Interview Prep (Node.js / TypeScript)

As a Senior Engineer, you are expected to look beyond "how to write code" and focus on "how to write scalable, maintainable, and secure systems."

## 1. Node.js Internals & Runtime
*   **Event Loop Deep Dive**: Explain the specific phases (Timers, Pending Callbacks, Poll, Check, Close). specifically the difference between `process.nextTick()`, `setImmediate()`, and `Promise.then()` (Microtasks vs Macrotasks).
*   **Single Thread Library**: If Node is single-threaded, how does it handle I/O operations (file system, network) non-blocking? Explain the role of `libuv` and the Thread Pool.
*   **Worker Threads vs Clustering**: When would you use the `cluster` module vs `worker_threads`?
    *   *Hint: Cluster for scaling HTTP throughput across cores; Worker Threads for CPU-intensive tasks like image processing.*
*   **Memory Management**: How does V8 garbage collection work? How would you identify, debug, and fix a memory leak in a running production container? (Tools: Heap dumps, Chrome DevTools, `node --inspect`).
*   **Streams & Backpressure**: What is backpressure in streams? How do you handle a fast producer (e.g., file read) and a slow consumer (e.g., network write) to prevent memory crashes?

## 2. TypeScript Mastery
*   **`interface` vs `type`**: What are the semantic differences? (e.g., Declaration merging).
*   **Advanced Types**: How and when to use `Partial<T>`, `Pick<T, K>`, `Omit<T, K>`, and `Record<K, T>`.
*   **Union & Intersection**: How do you model complex data structures using Discriminated Unions (tagged unions) for better type safety?
*   **`unknown` vs `any`**: Why should you almost always use `unknown` instead of `any`? How do you safely use a variable of type `unknown`?
*   **Decorators**: (If using NestJS) How do decorators work under the hood?

## 3. API Design & Architecture
*   **REST vs GraphQL vs gRPC**: Compare them. When would you choose gRPC over REST for backend-to-backend communication?
*   **Idempotency**: Why is idempotency critical for payment APIs? How do you implement it for `POST` requests? (Idempotency keys).
*   **Authentication & Authorization**:
    *   JWT mechanism (Access Token vs Refresh Token flows).
    *   Where do you store tokens? (HttpOnly Map vs LocalStorage).
    *   RBAC (Role-Based Access Control) vs ABAC (Attribute-Based).
*   **Versioning**: How do you version your API without breaking existing clients? (URI path, Query params, Custom Headers).
*   **Rate Limiting**: Algorithms for rate limiting (Token Bucket, Leaky Bucket). How do you implement this in a distributed environment using Redis?

## 4. Database & Data Consistency
*   **The N+1 Problem**: What is it? How does it affect performance in GraphQL or ORMs? How do you solve it? (DataLoaders, Eager loading).
*   **ACID vs BASE**: When do you choose a NoSQL store (MongoDB/Cassandra) over a Relational DB (Postgres)?
*   **Distributed Transactions**: In a microservices architecture, you can't join tables across databases. How do you handle data consistency? (Saga Pattern: Choreography vs Orchestration).
*   **Indexing strategies**: How do you optimize a slow query? Explain B-Tree vs Hash indexes.

## 5. System Design & Scalability (The "Senior" Differentiator)
*   **Sync vs Async Communication**: When should services talk via HTTP (REST/gRPC) vs Message Queues (RabbitMQ/Kafka)?
*   **Message Queues**: Explain "At-least-once" vs "Exactly-once" delivery. How do you handle "Dead Letter Queues" (DLQ)?
*   **Caching Strategies**:
    *   Cache-Aside vs Write-Through vs Write-Back.
    *   The "Thundering Herd" problem and how to prevent it.
*   **Resiliency Patterns**:
    *   **Circuit Breaker**: Why do we need it? How does it prevent cascading failures?
    *   **Retry with Exponential Backoff**: Why simple retries are dangerous.

## 6. Coding/Practical Challenges (Be ready to code these)
*   *Challenge*: "Implement a function that processes a large CSV file (1GB) line-by-line and inserts data into a database, ensuring memory usage stays low." (Tests Streams usage).
*   *Challenge*: "Build a simple `retry` function that accepts a promise functions and retries N times with a delay."
*   *Challenge*: "Refactor this Javascript code to idiomatic TypeScript, adding strict types and error handling."

## 7. Soft Skills / Behavioral
*   "Tell me about a time you disagreed with an architectural decision. How did you resolve it?"
*   "How do you ensure code quality in a team of junior developers?" (Linting, CI/CD checks, Code Reviews).
*   "Describe a production outage you caused or fixed. What was the root cause?"
