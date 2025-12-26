# Senior ExpressJS Engineer - Interview Script & Quick Revision Guide

> **Last Updated:** December 11, 2025  
> **Purpose:** Quick revision for ExpressJS interviews with mnemonics

---

## 📚 Table of Contents
1. [Middleware](#middleware)
2. [Routing](#routing)
3. [Error Handling](#error-handling)
4. [Best Practices](#best-practices)
5. [Security](#security)
6. [Performance](#performance)
7. [Common Interview Questions](#common-questions)

---

## 🔧 Middleware in Express

### What is Middleware?

**Mnemonic: "RAEN" - Request, Application, Error, Next**

**Answer Script:**
"**Middleware** are functions that execute during the request-response cycle. They have access to `req`, `res`, and `next()`. Middleware can modify request/response objects, end the cycle, or pass control to the next middleware."

**Middleware Signature:**
```typescript
function middleware(req: Request, res: Response, next: NextFunction) {
  // Do something
  next(); // Pass to next middleware
}
```

---

### Types of Middleware

#### 1. Application-level Middleware
```typescript
const express = require('express');
const app = express();

// Applies to all routes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Applies to specific path
app.use('/api', (req, res, next) => {
  req.startTime = Date.now();
  next();
});
```

#### 2. Router-level Middleware
```typescript
const router = express.Router();

// Applies to all routes in this router
router.use((req, res, next) => {
  console.log('Router middleware');
  next();
});

router.get('/users', getUsers);
router.post('/users', createUser);

app.use('/api', router);
```

#### 3. Error-handling Middleware
**Critical: Must have 4 parameters (err, req, res, next)**
```typescript
// MUST be defined AFTER all other middleware/routes
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  res.status(err.status || 500).json({
    error: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});
```

#### 4. Built-in Middleware
```typescript
// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));
```

#### 5. Third-party Middleware
```typescript
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

app.use(cors()); // Enable CORS
app.use(helmet()); // Security headers
app.use(morgan('combined')); // Logging
```

---

### Middleware Execution Order

**Interview Script:**
"Middleware executes in the order they're defined. This is critical for authentication, logging, and error handling."

```typescript
const express = require('express');
const app = express();

// 1. First - Logging
app.use((req, res, next) => {
  console.log('1. Logging middleware');
  next();
});

// 2. Second - Body parsing
app.use(express.json());

// 3. Third - Authentication
app.use((req, res, next) => {
  console.log('3. Auth middleware');
  // Verify JWT
  next();
});

// 4. Fourth - Routes
app.get('/users', (req, res) => {
  console.log('4. Route handler');
  res.json({ users: [] });
});

// 5. Last - Error handler (MUST be last)
app.use((err, req, res, next) => {
  console.log('5. Error handler');
  res.status(500).json({ error: err.message });
});
```

**Execution flow:**
```
1. Logging middleware
2. Body parsing
3. Auth middleware
4. Route handler
(If error occurs, jumps to step 5)
5. Error handler
```

---

### Common Middleware Patterns

#### 1. Authentication Middleware
```typescript
const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer TOKEN"
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user to request
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Usage
app.get('/profile', authenticate, (req, res) => {
  res.json({ user: req.user });
});
```

#### 2. Role-based Authorization
```typescript
function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    next();
  };
}

// Usage
app.delete('/users/:id', 
  authenticate, 
  authorize('admin'), 
  deleteUser
);
```

#### 3. Request Validation
```typescript
const { body, validationResult } = require('express-validator');

app.post('/users',
  // Validation middleware
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  
  // Check validation result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  
  // Route handler
  createUser
);
```

#### 4. Rate Limiting Middleware
```typescript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});

app.use('/api/', limiter);
```

#### 5. Request Logging
```typescript
function requestLogger(req, res, next) {
  const start = Date.now();
  
  // Listen for response finish
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log({
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: `${duration}ms`
    });
  });
  
  next();
}

app.use(requestLogger);
```

---

## 🛣️ Express Routing

**Answer Script:**
"Express routing defines how the application responds to client requests at specific endpoints (URIs) with specific HTTP methods."

### 1. Basic Routing
```typescript
// GET /users
app.get('/users', (req, res) => {
  res.json({ users: [] });
});

// POST /users
app.post('/users', (req, res) => {
  const user = req.body;
  res.status(201).json({ user });
});

// PUT /users/:id
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ id, updated: true });
});

// DELETE /users/:id
app.delete('/users/:id', (req, res) => {
  res.status(204).send();
});
```

### 2. Route Parameters
```typescript
// URL parameters
app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});

// Query parameters
app.get('/search', (req, res) => {
  const { q, limit, offset } = req.query;
  // GET /search?q=nodejs&limit=10&offset=0
  res.json({ q, limit, offset });
});
```

### 3. Route Handlers (Multiple)
```typescript
// Multiple handlers (middleware chain)
app.get('/users/:id',
  authenticate,           // 1. Check auth
  authorize('admin'),     // 2. Check role
  validateUserId,         // 3. Validate ID
  (req, res) => {         // 4. Handle request
    res.json({ user: {} });
  }
);

// Array of handlers
const handlers = [authenticate, authorize('admin'), getUser];
app.get('/admin/users/:id', handlers);
```

### 4. Express Router (Modular Routes)
```typescript
// routes/users.js
const express = require('express');
const router = express.Router();

// Middleware for this router
router.use(authenticate);

// Routes
router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;

// app.js
const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);

// Results in:
// GET    /api/users
// GET    /api/users/:id
// POST   /api/users
// PUT    /api/users/:id
// DELETE /api/users/:id
```

### 5. Route Chaining
```typescript
app.route('/users')
  .get(getUsers)
  .post(createUser);

app.route('/users/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);
```

---

## ❌ Error Handling in Express

**Mnemonic: "SAFE" - Sync, Async, Forward, Express**

**Answer Script:**
"Express has built-in error handling but requires careful handling of async errors and proper error middleware placement."

### 1. Synchronous Error Handling
```typescript
app.get('/users/:id', (req, res) => {
  const user = database.getUser(req.params.id);
  
  if (!user) {
    // Express catches this automatically
    throw new Error('User not found');
  }
  
  res.json({ user });
});
```

### 2. Asynchronous Error Handling
```typescript
// ❌ Wrong - async errors NOT caught by Express
app.get('/users', async (req, res) => {
  const users = await database.getUsers(); // If this throws, app crashes
  res.json({ users });
});

// ✅ Correct - Manual try-catch
app.get('/users', async (req, res, next) => {
  try {
    const users = await database.getUsers();
    res.json({ users });
  } catch (error) {
    next(error); // Pass to error handler
  }
});

// ✅ Better - Wrapper function
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/users', asyncHandler(async (req, res) => {
  const users = await database.getUsers();
  res.json({ users });
}));
```

### 3. Custom Error Classes
```typescript
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Distinguish from programming errors
    
    Error.captureStackTrace(this, this.constructor);
  }
}

// Usage
app.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await db.users.findUnique({ where: { id: req.params.id } });
  
  if (!user) {
    throw new AppError('User not found', 404);
  }
  
  res.json({ user });
}));
```

### 4. Global Error Handler
```typescript
app.use((err, req, res, next) => {
  // Log error
  console.error({
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method
  });
  
  // Distinguish operational vs programming errors
  if (err.isOperational) {
    // Known error - send to client
    res.status(err.statusCode).json({
      error: err.message
    });
  } else {
    // Programming error - hide details
    res.status(500).json({
      error: 'Internal server error'
    });
  }
});
```

### 5. 404 Handler (Not Found)
```typescript
// MUST be defined AFTER all routes
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path
  });
});

// Or throw error to error handler
app.use((req, res, next) => {
  const error = new AppError('Route not found', 404);
  next(error);
});
```

---

## ✅ Express Best Practices

**Interview Script:**
"Here are production-ready patterns I follow in Express applications."

### 1. Environment-based Configuration
```typescript
require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  dbUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  corsOrigin: process.env.CORS_ORIGIN || '*'
};

// Validate required env vars
if (!config.jwtSecret) {
  throw new Error('JWT_SECRET is required');
}
```

### 2. Security Headers (Helmet)
```typescript
const helmet = require('helmet');

app.use(helmet()); // Sets multiple security headers:
// - X-DNS-Prefetch-Control
// - X-Frame-Options
// - Strict-Transport-Security
// - X-Content-Type-Options
// - X-XSS-Protection
```

### 3. CORS Configuration
```typescript
const cors = require('cors');

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true, // Allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### 4. Request Body Size Limiting
```typescript
app.use(express.json({ limit: '10mb' })); // Prevent DoS
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
```

### 5. Graceful Shutdown
```typescript
const server = app.listen(3000);

process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server...');
  
  server.close(() => {
    console.log('Server closed, closing DB connection...');
    
    db.disconnect()
      .then(() => {
        console.log('DB disconnected, exiting');
        process.exit(0);
      })
      .catch((err) => {
        console.error('Error during shutdown:', err);
        process.exit(1);
      });
  });
});
```

### 6. Health Check Endpoint
```typescript
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});

// With dependency checks
app.get('/health', async (req, res) => {
  try {
    await db.raw('SELECT 1'); // Check DB connection
    
    res.json({
      status: 'healthy',
      database: 'connected',
      uptime: process.uptime()
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message
    });
  }
});
```

---

## 🔒 Security Best Practices

### 1. Helmet.js Security Headers
```typescript
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

### 2. Input Sanitization
```typescript
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

// Prevent NoSQL injection
app.use(mongoSanitize());

// Prevent XSS attacks
app.use(xss());
```

### 3. Rate Limiting
```typescript
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests'
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true,
  message: 'Too many login attempts'
});

app.use('/api/', apiLimiter);
app.use('/auth/', authLimiter);
```

### 4. CSRF Protection
```typescript
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(csrf({ cookie: true }));

app.get('/form', (req, res) => {
  res.render('form', { csrfToken: req.csrfToken() });
});
```

---

## ⚡ Performance Optimization

### 1. Response Compression
```typescript
const compression = require('compression');

app.use(compression({
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  },
  level: 6 // Compression level (0-9)
}));
```

### 2. Caching
```typescript
// Static file caching
app.use(express.static('public', {
  maxAge: '1d',
  etag: true
}));

// API response caching
const apicache = require('apicache');
const cache = apicache.middleware;

app.get('/api/users', cache('5 minutes'), getUsers);
```

### 3. Database Connection Pooling
```typescript
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  database: 'mydb',
  max: 20, // Maximum connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

app.get('/users', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM users');
    res.json(result.rows);
  } finally {
    client.release();
  }
});
```

### 4. Clustering for Multi-core
```typescript
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork(); // Restart
  });
} else {
  // Worker process
  app.listen(3000);
}
```

---

## 📊 Express vs Other Frameworks

**Answer Script:**
"Express is minimal and unopinionated. Here's how it compares:"

| Framework | Philosophy | Use Case | Learning Curve | Performance |
|-----------|------------|----------|----------------|-------------|
| **Express** | Minimal, unopinionated | Most flexible, custom architecture | Easy | Baseline |
| **Fastify** | Fast, schema-based | Performance-critical APIs | Medium | 2-3x faster |
| **NestJS** | Opinionated, Angular-like | Enterprise, TypeScript-first | Steep | Similar |
| **Koa** | Minimal, modern (async/await) | Express alternative, cleaner | Easy | Slightly faster |
| **Hapi** | Configuration-driven | Plugin architecture, large apps | Medium | Similar |

**Senior Decision:**
- **Express:** General-purpose, largest ecosystem, most jobs
- **Fastify:** Need 2-3x better performance, built-in validation
- **NestJS:** Large team, need structure/DI, TypeScript-first
- **Koa:** Prefer async/await, lighter than Express, better error handling

---

## 💬 Common Interview Questions

### 1. What is middleware and how does it work?

**Answer:**
"Middleware are functions with access to `req`, `res`, and `next()`. They execute sequentially during the request-response cycle. Each middleware can modify the request/response, end the cycle with `res.send()`, or call `next()` to pass control. The order matters - logger runs before auth, auth before routes, error handler last."

---

### 2. How do you handle async errors in Express?

**Answer:**
"Express doesn't catch async errors by default. Three solutions:
1. Manual try-catch with `next(error)`
2. Wrapper function that catches promises
3. Express 5+ with native async/await support

I prefer the wrapper pattern for cleaner code and centralized error handling in a global error middleware with 4 parameters."

---

### 3. Difference between app.use() and app.get()?

**Answer:**
"`app.use()` is for middleware - it matches any HTTP method and partial paths (e.g., `/api` matches `/api/users`). `app.get()` is route-specific - only matches GET requests on exact paths. Use `app.use()` for middleware like logging or auth, and `app.get()` for specific route handlers."

---

### 4. How do you implement authentication in Express?

**Answer:**
"I use JWT tokens. On login, generate a token with `jwt.sign()` and send it to the client. Client sends it in the `Authorization: Bearer <token>` header. Create an `authenticate` middleware that verifies the token with `jwt.verify()`, attaches the user to `req.user`, and calls `next()`. Apply this middleware to protected routes."

---

### 5. How do you prevent rate limiting attacks?

**Answer:**
"Use express-rate-limit with Redis for distributed systems. Configure different limits for different endpoints - stricter for auth (5/15min), looser for APIs (100/15min). Include `Retry-After` headers. For DDoS protection, add Cloudflare or AWS WAF in front of the app."

---

### 6. What's the difference between res.send() and res.json()?

**Answer:**
"`res.json()` sets `Content-Type: application/json` and stringifies the object. `res.send()` is generic - it auto-detects content type based on input (string, buffer, object). I always use `res.json()` for API responses for clarity and consistency."

---

### 7. How do you structure a large Express application?

**Answer:**
"I follow MVC with separation of concerns:
```
/src
  /routes       - Express routers
  /controllers  - Request handlers
  /services     - Business logic
  /models       - Database models
  /middleware   - Custom middleware
  /utils        - Helper functions
  /config       - Configuration
```
Each feature gets its own module, routes are mounted in app.js, and I use dependency injection for testing."

---

### 8. How do you implement request validation?

**Answer:**
"I use express-validator for declarative validation. Chain validators in the route definition, check for errors with `validationResult()`, and return 400 with error details. For complex validation, I create custom validators. For TypeScript, I combine with Zod for runtime type checking."

---

### 9. What's the purpose of next() in middleware?

**Answer:**
"`next()` passes control to the next middleware in the stack. Without it, the request hangs. `next(error)` skips to error-handling middleware. `next('route')` skips to the next route. Always call `next()` unless you're ending the response with `res.send()` or similar."

---

### 10. How do you handle file uploads in Express?

**Answer:**
"I use multer for multipart/form-data. Configure storage (memory or disk), file size limits, and file type filtering. Validate file type server-side - never trust client. For production, upload directly to S3 using multer-s3 to avoid filling up server disk and enable CDN delivery."

---

## 🧠 Quick Mnemonics Summary

| Concept | Mnemonic | Meaning |
|---------|----------|---------|
| Middleware | **RAEN** | Request, Application, Error, Next |
| Error Handling | **SAFE** | Sync, Async, Forward, Express |
| Security | **CHRX** | CORS, Helmet, Rate-limit, XSS |
| Middleware Order | **LBAR** | Logging, Body-parse, Auth, Routes |
| Response Methods | **SJR** | Send (generic), Json (API), Redirect (3xx) |

---

## 🎯 Interview Day Checklist

**Key Points to Remember:**
- [ ] Middleware execution order matters (logger → parser → auth → routes → error)
- [ ] Error middleware must have 4 parameters
- [ ] Async errors need try-catch or wrapper
- [ ] Always validate and sanitize input
- [ ] Use helmet for security headers
- [ ] Implement rate limiting for auth endpoints
- [ ] Connection pooling for databases
- [ ] Graceful shutdown handling
- [ ] Health check endpoints for monitoring

**Common Mistakes to Avoid:**
- ❌ Error middleware with 3 parameters (won't work)
- ❌ Async routes without error handling
- ❌ Middleware order wrong (auth before body parser)
- ❌ No rate limiting on auth routes
- ❌ Exposing error stacks in production
- ❌ Not validating user input

---

**Good luck with your interview! 🚀**
