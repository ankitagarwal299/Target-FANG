# Full Stack Craft Interview Preparation Script
## 60-Minute Deep Dive Interview Guide

---

## 📋 Interview Overview

| Aspect | Details |
|--------|---------|
| **Duration** | 60 minutes (including Q&A at the end) |
| **Format** | Discussion-based, no coding or system design |
| **Focus** | End-to-end understanding of web applications |
| **Your Application** | A web app with login mechanism (recommended) |

---

## 🎯 Four Core Competencies Being Assessed

| Competency | What They're Looking For |
|------------|--------------------------|
| **Technical Adaptability** | Can you scale up/down solutions? Adapt to requirement changes? |
| **Conceptual Thinking** | Breaking down problems, comparing options, big-picture thinking |
| **Technical Proficiency** | Deep knowledge of tools/technologies and how they integrate |
| **Effective Communication** | Clear, concise, relevant explanations |

---

## 🌐 Recommended Application Choice: Modern E-Commerce or Banking App

**Why this choice works:**
- ✅ Complex login with OAuth/MFA
- ✅ Form validations (address, payment)
- ✅ Session management
- ✅ Multiple data stores (SQL + Redis + CDN)
- ✅ Security considerations (PCI compliance, encryption)
- ✅ Load balancing requirements

---

# Part 1: Browser Mechanics Deep Dive

## 1.1 What Happens When You Type a URL and Press Enter?

### Your Script:
> "When a user navigates to our login page, here's the complete journey:

**Step 1: URL Parsing & DNS Resolution**
```
User types: https://app.example.com/login
           ↓
Browser parses URL into: protocol, hostname, path
           ↓
DNS Resolution begins (Browser cache → OS cache → Router → ISP → Root DNS)
           ↓
Returns IP address like: 203.0.113.42
```

**Step 2: TCP/TLS Handshake**
```
TCP 3-Way Handshake:
┌─────────┐                    ┌─────────┐
│ Browser │                    │ Server  │
└────┬────┘                    └────┬────┘
     │──────── SYN ────────────────▶│
     │◀─────── SYN-ACK ─────────────│
     │──────── ACK ────────────────▶│
     
TLS 1.3 Handshake (simplified):
     │──────── ClientHello ────────▶│
     │◀─────── ServerHello, Cert ───│
     │──────── Key Exchange ───────▶│
     │◀─────── Finished ────────────│
```

**Step 3: HTTP Request/Response**
```http
GET /login HTTP/2
Host: app.example.com
Accept: text/html,application/xhtml+xml
Cookie: session_id=abc123
User-Agent: Chrome/120.0
```

**Step 4: Browser Rendering Pipeline**
```
HTML Parsing → DOM Tree
              ↓
CSS Parsing → CSSOM Tree
              ↓
JavaScript Execution (blocks if not async/defer)
              ↓
Render Tree = DOM + CSSOM
              ↓
Layout (calculate positions)
              ↓
Paint (draw pixels)
              ↓
Composite (layer management)
```

### Follow-up Questions & Answers:

**Q: How does DNS caching work?**
> "DNS caching happens at multiple levels with different TTLs:
> - Browser cache (Chrome: up to 1 minute for positive, 1 minute for negative)
> - OS cache (controlled by TTL from DNS response)
> - Router/ISP cache
> - This is critical for performance - reduces latency by 50-200ms per lookup"

**Q: What's the difference between HTTP/1.1, HTTP/2, and HTTP/3?**
> | Feature | HTTP/1.1 | HTTP/2 | HTTP/3 |
> |---------|----------|--------|--------|
> | Connections | Multiple per domain (6 typical) | Single multiplexed | Single over QUIC |
> | Head-of-line blocking | Yes | At TCP level | Eliminated |
> | Header compression | None | HPACK | QPACK |
> | Protocol | TCP | TCP | UDP (QUIC) |

---

## 1.2 Critical Render Path Optimization

### Your Script:
> "For our login page, I'd focus on these optimizations:

```html
<!-- Critical CSS inlined for above-the-fold content -->
<style>
  /* Only login form styles - ~14KB budget */
  .login-form { ... }
</style>

<!-- Non-critical CSS loaded asynchronously -->
<link rel="preload" href="styles.css" as="style" onload="this.rel='stylesheet'">

<!-- JavaScript strategies -->
<script src="critical.js"></script>           <!-- Blocks render -->
<script src="analytics.js" defer></script>    <!-- After DOM parse -->
<script src="lazy-feature.js" async></script> <!-- When available -->
```

**Key Metrics I Monitor:**
| Metric | Target | Why It Matters |
|--------|--------|----------------|
| LCP (Largest Contentful Paint) | < 2.5s | User perceives page as loaded |
| FID (First Input Delay) | < 100ms | Interactivity responsiveness |
| CLS (Cumulative Layout Shift) | < 0.1 | Visual stability |
| TTFB (Time to First Byte) | < 600ms | Server response speed |

---

# Part 2: JavaScript Deep Dive

## 2.1 Event Loop & Asynchronous JavaScript

### Your Script:
> "JavaScript is single-threaded but handles async operations through the event loop:

```
┌────────────────────────────────────────────────────────────────┐
│                         Call Stack                              │
│                    (Synchronous execution)                      │
└────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────┐    ┌──────────────┐    ┌─────────────────────┐
│   Web APIs      │    │ Microtask    │    │   Macrotask Queue   │
│ (setTimeout,    │───▶│ Queue        │───▶│ (setTimeout,        │
│  fetch, DOM)    │    │ (Promises,   │    │  setInterval,       │
│                 │    │  queueMicro) │    │  I/O callbacks)     │
└─────────────────┘    └──────────────┘    └─────────────────────┘
```

**Priority Order:**
1. **Synchronous code** (call stack)
2. **Microtasks** (Promise.then, queueMicrotask, MutationObserver)
3. **Macrotasks** (setTimeout, setInterval, I/O, UI rendering)

**Example that demonstrates this:**
```javascript
console.log('1');                          // Sync
setTimeout(() => console.log('2'), 0);     // Macrotask
Promise.resolve().then(() => console.log('3')); // Microtask
console.log('4');                          // Sync

// Output: 1, 4, 3, 2
```

### Follow-up Questions & Answers:

**Q: How does this affect login form handling?**
> "When a user submits login credentials:
> 1. Click event fires (sync)
> 2. We validate inputs (sync)
> 3. Make fetch request (schedules microtask on response)
> 4. While waiting, UI remains responsive
> 5. On response, Promise resolves → microtask runs → update UI
> 
> The key is that `fetch` is non-blocking, so the user can still interact with the page."

**Q: What's the difference between `setTimeout(fn, 0)` and `Promise.resolve().then(fn)`?**
> "Promise callbacks run before setTimeout because microtasks have priority. This means:
> - Use microtasks (queueMicrotask) for high-priority async work
> - Use setTimeout for breaking up long tasks to allow rendering
> - In React, state batching leverages this priority system"

---

## 2.2 Memory Management & Performance

### Your Script:
> "JavaScript uses automatic garbage collection, but memory leaks are still possible:

**Common Memory Leak Patterns:**
```javascript
// 1. Forgotten event listeners
element.addEventListener('click', handler);
// If element removed but listener not: LEAK

// 2. Closures holding references
function createLeak() {
  const largeData = new Array(1000000);
  return function() {
    console.log(largeData.length); // Keeps largeData in memory
  };
}

// 3. Detached DOM nodes
const nodes = [];
function addNode() {
  const div = document.createElement('div');
  document.body.appendChild(div);
  nodes.push(div);          // Reference held
  document.body.removeChild(div); // DOM detached but not GC'd
}
```

**Prevention Strategies:**
- Use WeakMap/WeakSet for object references
- Implement cleanup in useEffect return (React)
- Use AbortController for fetch requests
- Profile with Chrome DevTools Memory tab"

---

# Part 3: Networking Deep Dive

## 3.1 Low-Level Networking (TCP/IP Stack)

### Your Script:
> "When our login request travels from browser to server:

```
┌─────────────────────────────────────────────────────┐
│ Application Layer (HTTP/2, WebSocket)               │
├─────────────────────────────────────────────────────┤
│ Transport Layer (TCP - reliable, ordered delivery)  │
├─────────────────────────────────────────────────────┤
│ Network Layer (IP - routing, addressing)            │
├─────────────────────────────────────────────────────┤
│ Data Link Layer (Ethernet frames, MAC addresses)    │
├─────────────────────────────────────────────────────┤
│ Physical Layer (electrical signals, fiber optics)   │
└─────────────────────────────────────────────────────┘
```

**TCP Connection Lifecycle for Login:**
```
1. SYN (client → server): "I want to connect, seq=100"
2. SYN-ACK (server → client): "OK, seq=300, ack=101"
3. ACK (client → server): "Confirmed, ack=301"
   
   [Connection Established - RTT complete]
   
4. Data exchange with ACKs
5. FIN handshake to close
```

**Why TCP for Login vs UDP:**
| Consideration | TCP | UDP |
|--------------|-----|-----|
| Reliability | ✅ Guaranteed delivery | ❌ Best effort |
| Order | ✅ Ordered packets | ❌ May arrive out of order |
| Use case | Login credentials | Video streaming, gaming |
| Overhead | Higher (handshakes, ACKs) | Lower |

---

## 3.2 Load Balancing

### Your Script:
> "For our application, I'd architect load balancing as follows:

```
                    ┌─────────────────────┐
                    │   DNS Load Balancer │
                    │   (Route 53)        │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              ↓                ↓                ↓
        ┌─────────┐      ┌─────────┐      ┌─────────┐
        │ Region A│      │ Region B│      │ Region C│
        └────┬────┘      └────┬────┘      └────┬────┘
             │                │                │
        ┌────▼────┐      ┌────▼────┐      ┌────▼────┐
        │   ALB   │      │   ALB   │      │   ALB   │
        └────┬────┘      └────┬────┘      └────┬────┘
             │                │                │
    ┌────────┼────────┐       │       ┌────────┼────────┐
    ↓        ↓        ↓       │       ↓        ↓        ↓
┌──────┐ ┌──────┐ ┌──────┐    │   ┌──────┐ ┌──────┐ ┌──────┐
│App 1 │ │App 2 │ │App 3 │    │   │App 1 │ │App 2 │ │App 3 │
└──────┘ └──────┘ └──────┘    │   └──────┘ └──────┘ └──────┘
```

**Load Balancing Algorithms:**
| Algorithm | When to Use | For Login |
|-----------|-------------|-----------|
| Round Robin | Equal server capacity | ✅ Simple, works |
| Least Connections | Variable request times | ✅ Better for auth |
| IP Hash | Session affinity needed | ⚠️ If no central session store |
| Weighted | Mixed server capacity | ✅ A/B testing new auth |

**Session Persistence Challenge:**
> "Login creates a session - we need persistence approaches:
> 1. **Sticky Sessions** (IP hash) - ties user to one server
>    - Pro: Simple
>    - Con: Uneven load, failover issues
> 2. **Centralized Session Store** (Redis) - stateless servers
>    - Pro: True horizontal scaling
>    - Con: Redis becomes critical path
> 3. **JWT Tokens** - session data in token
>    - Pro: Fully stateless
>    - Con: Can't revoke tokens instantly"

### Follow-up Questions & Answers:

**Q: What happens if a server fails mid-request?**
> "With ALB health checks every 30 seconds:
> - Failed server marked unhealthy after 2-3 failed checks
> - New requests routed to healthy servers
> - For the in-flight request: depends on idempotency
> - For login: retry is safe (idempotent), user re-submits"

**Q: How would you handle a traffic spike during a sale/promotion?**
> "Multiple strategies:
> 1. **Auto-scaling groups** with CPU/request-based triggers
> 2. **Queue-based load leveling** - accept login, process async
> 3. **Rate limiting** - prevent abuse, protect downstream
> 4. **CDN caching** for static assets (login page HTML/CSS/JS)
> 5. **Connection draining** when scaling down"

---

# Part 4: Security Deep Dive

## 4.1 HTTPS & Encryption

### Your Script:
> "Security for login involves multiple layers:

**TLS 1.3 Handshake (What Happens):**
```
Client                                          Server
  │                                               │
  │───── ClientHello (supported ciphers) ───────▶│
  │                                               │
  │◀──── ServerHello + Certificate ──────────────│
  │      (server's public key in cert)           │
  │                                               │
  │───── Key Exchange + Finished ───────────────▶│
  │      (client generates session key)          │
  │                                               │
  │◀──── Finished ───────────────────────────────│
  │                                               │
  │◀═════ Encrypted Communication ═══════════════▶│
```

**Encryption Types Used:**
| Type | Purpose | Example |
|------|---------|---------|
| Asymmetric (RSA/ECDSA) | Key exchange, signatures | TLS handshake |
| Symmetric (AES-256-GCM) | Bulk data encryption | Actual HTTP traffic |
| Hashing (SHA-256) | Integrity verification | Certificate validation |

**Certificate Chain Validation:**
```
Root CA (in browser trust store)
    ↓ Signs
Intermediate CA
    ↓ Signs
Server Certificate (your domain)
```

### Follow-up Questions & Answers:

**Q: What's the difference between encryption at rest vs in transit?**
> "**In Transit** (TLS):
> - Protects data moving between client ↔ server
> - Uses session keys, forward secrecy
> 
> **At Rest** (AES-256):
> - Protects data stored in database/disk
> - Uses customer-managed keys (KMS)
> - For passwords: we never encrypt, we HASH

**Q: What is forward secrecy?**
> "With forward secrecy (using ECDHE), even if the server's private key is compromised later, past sessions remain secure because each session used unique ephemeral keys."

---

## 4.2 Password Security & Authentication

### Your Script:
> "Password handling follows defense-in-depth:

**Password Flow:**
```
User enters password
        ↓
Client-side: Basic validation only (never hash client-side)
        ↓
HTTPS encrypts in transit
        ↓
Server receives password
        ↓
Hash with bcrypt/Argon2 (salt + pepper)
        ↓
Compare hash with stored hash
        ↓
Return session token or JWT
```

**Why bcrypt/Argon2?**
```
┌────────────────────────────────────────────────────────────┐
│ bcrypt:                                                    │
│ $2b$12$salt22charslong.hashresult31chars                   │
│     │   └─ Cost factor (2^12 = 4096 iterations)            │
│     └─ Algorithm version                                   │
└────────────────────────────────────────────────────────────┘

Benefits:
- Intentionally SLOW (~100ms per hash)
- Built-in salt (no rainbow tables)
- Adjustable cost factor for future-proofing
```

**Common Attack Vectors & Mitigations:**
| Attack | Mitigation |
|--------|------------|
| Brute force | Rate limiting, account lockout, CAPTCHA |
| Credential stuffing | Breached password detection, MFA |
| Timing attacks | Constant-time comparison |
| Rainbow tables | Per-password salt |
| SQL injection | Parameterized queries, ORM |
| XSS | CSP headers, input sanitization |
| CSRF | CSRF tokens, SameSite cookies |

### Follow-up Questions & Answers:

**Q: How do you implement rate limiting?**
> "Using a token bucket or sliding window algorithm:
> ```
> Key: user_id:login_attempts
> Value: {count: 3, window_start: timestamp}
> 
> Rules:
> - 5 attempts per 15 minutes
> - Exponential backoff after failures
> - Stored in Redis for distributed environments
> - Include IP-based limiting for DDoS protection
> ```

**Q: How would you implement MFA?**
> "For TOTP (Time-based One-Time Password):
> 1. Generate shared secret (Base32 encoded)
> 2. Store encrypted in user profile
> 3. Generate QR code for authenticator app
> 4. User enters 6-digit code
> 5. Server generates same code using secret + current time window (30s)
> 6. Compare codes (with ±1 window tolerance for clock drift)"

---

# Part 5: Application Routing

## 5.1 Client-Side Routing

### Your Script:
> "In a SPA like our React application:

**React Router Example:**
```javascript
// Client-side routing - no server requests
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/dashboard" element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    } />
  </Routes>
</BrowserRouter>

// History API under the hood
window.history.pushState({}, '', '/dashboard');
// URL changes, no page reload
```

**Navigation Guard (Protected Routes):**
```javascript
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" />;
  
  return children;
}
```

---

## 5.2 Server-Side Routing

### Your Script:
> "On the backend (Node.js/Express example):

```javascript
// API Layer Routing
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authenticate, userRouter);
app.use('/api/v1/admin', authenticate, authorize('admin'), adminRouter);

// Auth Router Details
router.post('/login', validateBody(loginSchema), async (req, res) => {
  const { email, password } = req.body;
  
  // 1. Find user
  const user = await User.findByEmail(email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  
  // 2. Verify password (constant time)
  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });
  
  // 3. Generate tokens
  const accessToken = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '15m' });
  const refreshToken = generateRefreshToken();
  
  // 4. Store refresh token
  await RefreshToken.create({ token: refreshToken, userId: user.id });
  
  // 5. Return tokens
  res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
  res.json({ accessToken, user: sanitizeUser(user) });
});
```

**Request Lifecycle:**
```
Incoming Request
      │
      ↓
┌──────────────┐
│   Logging    │ ──▶ Record request details
└──────────────┘
      │
      ↓
┌──────────────┐
│ Rate Limiter │ ──▶ Check against limits
└──────────────┘
      │
      ↓
┌──────────────┐
│   CORS       │ ──▶ Validate origin
└──────────────┘
      │
      ↓
┌──────────────┐
│  Body Parser │ ──▶ Parse JSON/form data
└──────────────┘
      │
      ↓
┌──────────────┐
│   Router     │ ──▶ Match route handler
└──────────────┘
      │
      ↓
┌──────────────┐
│  Middleware  │ ──▶ Auth, validation
└──────────────┘
      │
      ↓
┌──────────────┐
│   Handler    │ ──▶ Business logic
└──────────────┘
      │
      ↓
┌──────────────┐
│Error Handler │ ──▶ Catch & format errors
└──────────────┘
```

---

# Part 6: Data Stores

## 6.1 Database Selection & Usage

### Your Script:
> "For a login system, we use multiple data stores:

**Data Store Architecture:**
```
┌─────────────────────────────────────────────────────────────────┐
│                         Application                              │
└─────────────────────────────┬───────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ↓                     ↓                     ↓
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│   PostgreSQL  │    │     Redis     │    │  Elasticsearch│
│  (Primary DB) │    │   (Caching)   │    │   (Search)    │
└───────────────┘    └───────────────┘    └───────────────┘
│ - User profiles│    │ - Sessions    │    │ - Audit logs  │
│ - Credentials  │    │ - Rate limits │    │ - User search │
│ - Refresh tkns │    │ - Token cache │    │               │
└───────────────┘    └───────────────┘    └───────────────┘
```

**PostgreSQL Schema for Auth:**
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  mfa_secret VARCHAR(255),
  mfa_enabled BOOLEAN DEFAULT false,
  failed_attempts INTEGER DEFAULT 0,
  locked_until TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sessions table (for refresh tokens)
CREATE TABLE refresh_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token_hash VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  revoked_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_refresh_tokens_user ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_hash ON refresh_tokens(token_hash);
```

**Redis Usage Patterns:**
```
// Session storage
SET session:{session_id} {user_data} EX 3600

// Rate limiting
INCR rate:{user_id}:login
EXPIRE rate:{user_id}:login 900

// Token blacklist (for logout)
SET blacklist:{jti} 1 EX 900
```

### Follow-up Questions & Answers:

**Q: Why PostgreSQL over MongoDB for user data?**
> "For authentication data:
> - **ACID transactions** - critical for login attempts, account lockout
> - **Strong schema** - user data is well-defined
> - **Referential integrity** - sessions linked to users
> - **Mature security features** - row-level security, encryption
> 
> MongoDB would be better for flexible, document-like data (user preferences, activity logs)"

**Q: How do you handle database scaling?**
> "For read-heavy auth systems:
> 1. **Read replicas** - route reads to replicas, writes to primary
> 2. **Connection pooling** - PgBouncer limits connections
> 3. **Query optimization** - proper indexes, EXPLAIN ANALYZE
> 4. **Caching layer** - Redis for hot data (active sessions)
> 5. **Horizontal sharding** - partition by user_id hash if needed"

---

# Part 7: Scaling Scenarios

## 7.1 Adapting to Scale Changes

### Scale Up Scenario Script:
> "If we went from 10K to 10M users overnight:

**Immediate Actions:**
```
1. Auto-scaling: Spin up more application servers
   - Kubernetes HPA based on CPU/request rate
   - AWS ASG with target tracking

2. Database:
   - Read replicas for authentication checks
   - Connection pooling with PgBouncer
   - Consider Aurora Serverless for automatic scaling

3. Caching:
   - Redis Cluster for session storage
   - Cache user data on successful login

4. CDN:
   - Static assets (login page JS/CSS) served from edge
   - Reduces origin load by 80%+

5. Rate Limiting:
   - Tighten limits to protect infrastructure
   - Implement queue-based login for peaks
```

### Scale Down Scenario Script:
> "For a small startup MVP:

**Simplified Architecture:**
```
┌─────────────────────────────────────────┐
│     Vercel/Railway (PaaS)               │
│  ┌─────────────────────────────────┐    │
│  │    Next.js Application          │    │
│  │    (Frontend + API Routes)      │    │
│  └─────────────────────────────────┘    │
│                  │                      │
│     ┌────────────┴────────────┐         │
│     ↓                         ↓         │
│  ┌─────────┐            ┌─────────┐     │
│  │ Supabase│            │  Redis  │     │
│  │  (Auth) │            │ (Cache) │     │
│  └─────────┘            └─────────┘     │
└─────────────────────────────────────────┘

Benefits:
- Managed auth (Supabase handles security)
- Zero DevOps overhead
- Cost-effective for <10K users
- Can migrate to custom solution later
```

---

# Part 8: Sample Interview Flow (First 45 Minutes)

## Recommended Timeline:

| Time | Phase | Your Focus |
|------|-------|------------|
| 0-5 min | Introduction | Describe your chosen app briefly |
| 5-15 min | Browser/Frontend | URL → rendering, JS event loop |
| 15-25 min | Networking | TCP/TLS, load balancing |
| 25-35 min | Security | Auth flow, encryption, attacks |
| 35-45 min | Backend/Data | Routing, databases, scaling |
| 45-55 min | Deep dives | Interviewer's choice |
| 55-60 min | Your questions | Have 2-3 ready |

---

## Your Opening Statement:
> "I'd like to walk through a **modern e-commerce application** I worked on. It features:
> - OAuth 2.0 login with Google/email options
> - Multi-factor authentication
> - Payment processing with PCI compliance considerations
> - Microservices architecture with ~50K daily active users
>
> Should I start with what happens when a user navigates to the login page?"

---

# Part 9: Questions to Ask the Interviewer

Prepare 2-3 thoughtful questions:

1. **Technical Culture:**
   > "How does the team approach technical decisions when there are tradeoffs between shipping speed and technical debt?"

2. **Stack Specific:**
   > "What's been the biggest scalability challenge the team has faced, and how did you solve it?"

3. **Growth:**
   > "What opportunities exist for engineers to contribute to architectural decisions?"

---

# Part 10: Quick Reference Cheat Sheet

## Key Numbers to Remember:
| Metric | Value | Context |
|--------|-------|---------|
| DNS lookup | 20-120ms | Cached vs uncached |
| TCP handshake | 1 RTT | ~20-100ms typical |
| TLS 1.3 handshake | 1 RTT | Down from 2 in TLS 1.2 |
| bcrypt hash time | 100ms | By design (security) |
| Redis GET | <1ms | In-memory |
| PostgreSQL query | 1-10ms | With proper indexes |
| LCP target | <2.5s | Core Web Vital |
| JWT typical expiry | 15 min | Access token |
| Refresh token expiry | 7 days | Sliding window |

## Acronyms:
| Acronym | Meaning |
|---------|---------|
| CORS | Cross-Origin Resource Sharing |
| CSRF | Cross-Site Request Forgery |
| XSS | Cross-Site Scripting |
| TLS | Transport Layer Security |
| JWT | JSON Web Token |
| TOTP | Time-based One-Time Password |
| CDN | Content Delivery Network |
| ALB | Application Load Balancer |
| WAF | Web Application Firewall |
| OIDC | OpenID Connect |

---

# ✅ Final Checklist Before Interview

- [ ] Can explain URL → pixels journey
- [ ] Understand event loop (micro vs macro tasks)
- [ ] Know TCP vs UDP differences
- [ ] Can diagram load balancer setup
- [ ] Understand TLS handshake basics
- [ ] Know password hashing (bcrypt/Argon2)
- [ ] Can explain JWT vs session cookies
- [ ] Understand CORS, CSRF, XSS
- [ ] Know SQL vs NoSQL tradeoffs
- [ ] Can adapt solution to scale up/down
- [ ] Have 2-3 questions for interviewer ready

---

> **Remember**: This is a conversation, not a test. Think out loud, ask for clarification when needed, and show your problem-solving approach!
