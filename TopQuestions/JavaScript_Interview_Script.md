# Senior JavaScript Engineer - Interview Script & Quick Revision Guide

> **Last Updated:** December 11, 2025  
> **Purpose:** Quick revision for JavaScript interviews with mnemonics

---

## 📚 Table of Contents
1. [Promises & Async Patterns](#promises-async)
2. [Closures & Scope](#closures-scope)
3. [Event Loop](#event-loop)
4. [Prototypes & Inheritance](#prototypes)
5. [ES6+ Features](#es6-features)
6. [Common Patterns](#common-patterns)
7. [Interview Questions](#interview-questions)

---

## 🎯 Promises & Async Patterns

### Promise Methods Comparison

**Mnemonic: "RAARS-T" - Resolve, All, AllSettled, Race, Any, Sett, Then**

**Answer Script:**
"Promises provide different concurrency patterns. Each method solves specific use cases."

#### **Complete Comparison Table**

| Method | What it does | When it settles | Return value | Reject behavior | Typical use case | Mnemonic |
|--------|--------------|-----------------|--------------|-----------------|------------------|----------|
| `Promise.resolve(value)` | Creates a promise that resolves with value | Immediately (microtask) | A resolved promise | N/A | Lift a value into a promise | **"Make it a promise now."** |
| `Promise.reject(reason)` | Creates a promise that rejects with reason | Immediately (microtask) | A rejected promise | Rejects immediately | Simulate/propagate errors | **"Throw, but async."** |
| `Promise.all(iterable)` | Waits for all to resolve | When all resolve | Array of resolved values | Rejects fast on first rejection | Run tasks in parallel and need all results | **"All or nothing."** |
| `Promise.allSettled(iterable)` | Waits for all to settle | When all settle (resolve or reject) | Array of `{status, value/reason}` | Never rejects | Gather outcomes without failing | **"See all results."** |
| `Promise.race(iterable)` | Follows the first to settle | When first settles | That first value/reason | Rejects if first rejects | Timeouts / first responder wins | **"Fastest wins."** |
| `Promise.any(iterable)` | Resolves with first success | When first resolves, or when all reject | First resolved value | Rejects only if all reject (AggregateError) | Try multiple fallbacks | **"Any success will do."** |
| `.then(onFulfilled, onRejected)` | Chain success/error handlers | After current promise settles | A new promise with handler result | Rejection goes to onRejected or down the chain | Transform values / continue workflow | **"Then do this."** |

---

### Detailed Examples

#### 1. Promise.all() - "All or nothing"
```javascript
// Use case: Fetch multiple resources in parallel
const [users, posts, comments] = await Promise.all([
  fetch('/api/users'),
  fetch('/api/posts'),
  fetch('/api/comments')
]);

// If ANY promise rejects, entire Promise.all rejects
try {
  await Promise.all([
    Promise.resolve(1),
    Promise.reject('Error'), // This causes rejection
    Promise.resolve(3)
  ]);
} catch (error) {
  console.log(error); // "Error" - stops at first rejection
}

// Real-world: Parallel database queries
const results = await Promise.all([
  db.users.count(),
  db.posts.count(),
  db.comments.count()
]);
```

**When to use:** Need all results, any failure should stop everything.

---

#### 2. Promise.allSettled() - "See all results"
```javascript
// Use case: Try multiple operations, want all outcomes
const results = await Promise.allSettled([
  fetch('/api/users'),     // May succeed
  fetch('/api/posts'),     // May fail
  fetch('/api/comments')   // May succeed
]);

results.forEach((result) => {
  if (result.status === 'fulfilled') {
    console.log('Success:', result.value);
  } else {
    console.log('Failed:', result.reason);
  }
});

// Output:
// [
//   { status: 'fulfilled', value: userData },
//   { status: 'rejected', reason: Error },
//   { status: 'fulfilled', value: commentsData }
// ]

// Real-world: Send notifications to multiple services
const notifications = await Promise.allSettled([
  sendEmail(user),
  sendSMS(user),
  sendPushNotification(user)
]);

// Log which notifications succeeded/failed
notifications.forEach((result, index) => {
  const service = ['email', 'sms', 'push'][index];
  if (result.status === 'rejected') {
    logger.error(`${service} failed:`, result.reason);
  }
});
```

**When to use:** Want all outcomes even if some fail.

---

#### 3. Promise.race() - "Fastest wins"
```javascript
// Use case: Timeout implementation
async function fetchWithTimeout(url, timeout = 5000) {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), timeout)
    )
  ]);
}

try {
  const data = await fetchWithTimeout('/api/slow-endpoint', 3000);
} catch (error) {
  console.log('Request timed out or failed');
}

// Real-world: Try multiple servers, use fastest
const data = await Promise.race([
  fetch('https://server1.com/api/data'),
  fetch('https://server2.com/api/data'),
  fetch('https://server3.com/api/data')
]);
// Whichever responds first wins
```

**When to use:** Timeouts, first successful response, racing against time.

---

#### 4. Promise.any() - "Any success will do"
```javascript
// Use case: Multiple fallback sources
const data = await Promise.any([
  fetch('https://primary-api.com/data'),     // Primary
  fetch('https://backup-api.com/data'),      // Backup
  fetch('https://fallback-api.com/data')     // Fallback
]);
// Uses first successful response

// If all fail, throws AggregateError
try {
  await Promise.any([
    Promise.reject('Error 1'),
    Promise.reject('Error 2'),
    Promise.reject('Error 3')
  ]);
} catch (error) {
  console.log(error instanceof AggregateError); // true
  console.log(error.errors); // ['Error 1', 'Error 2', 'Error 3']
}

// Real-world: CDN fallback
async function loadScript(scriptName) {
  return Promise.any([
    loadFromCDN(`https://cdn1.com/${scriptName}`),
    loadFromCDN(`https://cdn2.com/${scriptName}`),
    loadFromLocalCache(scriptName)
  ]);
}
```

**When to use:** Multiple fallback options, need only one to succeed.

---

### Visual Decision Tree

**Interview Script:**
"Here's how I choose which Promise method to use:

1. **Need all results to succeed?**
   - Yes → `Promise.all()` (fails fast)
   - No, want all outcomes → `Promise.allSettled()`

2. **Need only first result?**
   - First to settle (success OR failure) → `Promise.race()`
   - First to succeed (ignore failures) → `Promise.any()`

3. **Want to chain transformations?**
   - `.then()`, `.catch()`, `.finally()`"

---

### Common Patterns

#### Pattern 1: Parallel + Sequential
```javascript
// Fetch users in parallel, then fetch posts for each sequentially
const users = await Promise.all([
  fetchUser(1),
  fetchUser(2),
  fetchUser(3)
]);

for (const user of users) {
  const posts = await fetchUserPosts(user.id); // Sequential
  user.posts = posts;
}
```

#### Pattern 2: Retry with Fallbacks
```javascript
async function fetchWithRetry(url, retries = 3) {
  const attempts = Array(retries).fill(null).map(() => 
    fetch(url).catch(err => err)
  );
  
  // Try all attempts, use first success
  return Promise.any(attempts);
}
```

#### Pattern 3: Controlled Concurrency
```javascript
// Limit concurrent promises to 3
async function concurrentLimit(tasks, limit = 3) {
  const results = [];
  
  for (let i = 0; i < tasks.length; i += limit) {
    const chunk = tasks.slice(i, i + limit);
    const chunkResults = await Promise.all(chunk.map(task => task()));
    results.push(...chunkResults);
  }
  
  return results;
}

// Usage: Process 100 items, 5 at a time
await concurrentLimit(
  items.map(item => () => processItem(item)),
  5
);
```

---

## 🔒 Closures & Scope

**Mnemonic: "BILGE" - Block, If, Lexical, Global, Execution**

### What is a Closure?

**Answer Script:**
"A closure is a function that has access to variables in its outer (enclosing) lexical scope, even after the outer function has returned. Closures are created every time a function is created."

```javascript
function outer() {
  const name = 'John';
  
  function inner() {
    console.log(name); // Accesses outer variable
  }
  
  return inner;
}

const fn = outer(); // outer() returns, but...
fn(); // 'John' - inner() still has access to name!
```

### Practical Use Cases

#### 1. Data Privacy (Encapsulation)
```javascript
function createCounter() {
  let count = 0; // Private variable
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
console.log(counter.count); // undefined - can't access directly
console.log(counter.getCount()); // 2 - only through method
```

#### 2. Function Factories
```javascript
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

#### 3. Event Handlers with Data
```javascript
function attachClickHandlers() {
  const buttons = document.querySelectorAll('button');
  
  buttons.forEach((button, index) => {
    button.addEventListener('click', function() {
      console.log(`Button ${index} clicked`); // Closure over index
    });
  });
}
```

#### 4. Currying
```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...nextArgs) {
      return curried.apply(this, [...args, ...nextArgs]);
    };
  };
}

const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6
```

### Common Closure Interview Questions

#### Q1: Classic Loop Problem
```javascript
// ❌ Problem
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Prints: 3, 3, 3 (not 0, 1, 2)

// ✅ Solution 1: IIFE
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => console.log(j), 100);
  })(i);
}

// ✅ Solution 2: let (block scope)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Prints: 0, 1, 2
```

---

## ⏱️ Event Loop & Async JavaScript

**Mnemonic: "CMTM" - Call stack, Microtask queue, Task queue (Macrotask), Message queue**

### Event Loop Execution Order

**Answer Script:**
"The event loop has a specific execution order: Call Stack → Microtasks (promises, queueMicrotask) → Macrotasks (setTimeout, setInterval, I/O)."

```javascript
console.log('1. Synchronous');

setTimeout(() => console.log('2. Timeout (macrotask)'), 0);

Promise.resolve().then(() => console.log('3. Promise (microtask)'));

queueMicrotask(() => console.log('4. queueMicrotask'));

console.log('5. Synchronous');

// Output order:
// 1. Synchronous
// 5. Synchronous
// 3. Promise (microtask)
// 4. queueMicrotask
// 2. Timeout (macrotask)
```

### Visualization

```
┌───────────────────────────┐
│  Call Stack (Sync code)   │ ← Execute first
└───────────────────────────┘
             ↓
┌───────────────────────────┐
│  Microtask Queue          │ ← Then all microtasks
│  - Promise.then()         │
│  - queueMicrotask()       │
│  - async/await            │
└───────────────────────────┘
             ↓
┌───────────────────────────┐
│  Macrotask Queue          │ ← Then one macrotask
│  - setTimeout()           │
│  - setInterval()          │
│  - setImmediate()         │
│  - I/O operations         │
└───────────────────────────┘
             ↓
         (Repeat)
```

### Complex Example

```javascript
console.log('Start');

setTimeout(() => {
  console.log('Timeout 1');
  Promise.resolve().then(() => console.log('Promise in Timeout 1'));
}, 0);

Promise.resolve()
  .then(() => {
    console.log('Promise 1');
    setTimeout(() => console.log('Timeout in Promise 1'), 0);
  })
  .then(() => console.log('Promise 2'));

setTimeout(() => console.log('Timeout 2'), 0);

console.log('End');

// Output:
// Start
// End
// Promise 1
// Promise 2
// Timeout 1
// Promise in Timeout 1
// Timeout in Promise 1
// Timeout 2
```

---

## 🧬 Prototypes & Inheritance

**Mnemonic: "PCPI" - Prototype, Constructor, Proto, Inheritance**

### Prototype Chain

**Answer Script:**
"Every JavaScript object has an internal `[[Prototype]]` property that references another object. This forms a chain. When you access a property, JavaScript looks up the chain until it finds it or reaches `null`."

```javascript
const animal = {
  eats: true,
  walk() {
    console.log('Animal walks');
  }
};

const rabbit = {
  jumps: true
};

rabbit.__proto__ = animal; // Set prototype

console.log(rabbit.eats); // true (inherited from animal)
console.log(rabbit.jumps); // true (own property)
rabbit.walk(); // 'Animal walks' (inherited method)
```

### Constructor Functions

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  return `Hello, I'm ${this.name}`;
};

const john = new Person('John');
console.log(john.greet()); // 'Hello, I'm John'
console.log(john.__proto__ === Person.prototype); // true
```

### ES6 Classes (Syntactic Sugar)

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
  
  greet() {
    return `Hello, I'm ${this.name}`;
  }
}

class Developer extends Person {
  constructor(name, language) {
    super(name);
    this.language = language;
  }
  
  code() {
    return `${this.name} codes in ${this.language}`;
  }
}

const dev = new Developer('Alice', 'JavaScript');
console.log(dev.greet()); // 'Hello, I'm Alice'
console.log(dev.code()); // 'Alice codes in JavaScript'
```

---

## 🚀 ES6+ Features

### 1. Destructuring

```javascript
// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];

// Object destructuring
const { name, age, ...others } = { name: 'John', age: 30, city: 'NYC' };

// Nested destructuring
const user = {
  profile: {
    name: 'Alice',
    address: { city: 'Boston' }
  }
};
const { profile: { name, address: { city } } } = user;

// Default values
const { missing = 'default' } = {};
```

### 2. Spread & Rest Operators

```javascript
// Spread (expand)
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]

const obj1 = { a: 1 };
const obj2 = { ...obj1, b: 2 }; // { a: 1, b: 2 }

// Rest (collect)
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4); // 10
```

### 3. Template Literals

```javascript
const name = 'Alice';
const age = 30;

const message = `Hello, ${name}!
You are ${age} years old.
Next year you'll be ${age + 1}.`;

// Tagged template literals
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return `${result}${str}<mark>${values[i] || ''}</mark>`;
  }, '');
}

const result = highlight`Name: ${name}, Age: ${age}`;
```

### 4. Arrow Functions

```javascript
// Regular function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// Key differences:
// 1. No 'this' binding (lexical this)
const obj = {
  value: 42,
  regular: function() {
    setTimeout(function() {
      console.log(this.value); // undefined
    }, 100);
  },
  arrow: function() {
    setTimeout(() => {
      console.log(this.value); // 42
    }, 100);
  }
};

// 2. No 'arguments' object
const sum = (...args) => args.reduce((a, b) => a + b);

// 3. Cannot be used as constructor
const Fn = () => {};
new Fn(); // TypeError
```

### 5. Optional Chaining & Nullish Coalescing

```javascript
// Optional chaining (?.)
const user = {
  profile: {
    name: 'Alice'
  }
};

console.log(user?.profile?.name); // 'Alice'
console.log(user?.address?.city); // undefined (no error)
console.log(user.someMethod?.()); // undefined (safe method call)

// Nullish coalescing (??)
const value = null;
console.log(value ?? 'default'); // 'default'
console.log(value || 'default'); // 'default'

const zero = 0;
console.log(zero ?? 'default'); // 0 (only null/undefined trigger ??)
console.log(zero || 'default'); // 'default' (0 is falsy)
```

---

## 🎨 Common JavaScript Patterns

### 1. Module Pattern (Encapsulation)

```javascript
const Calculator = (function() {
  // Private
  let result = 0;
  
  function log(msg) {
    console.log(`Calculator: ${msg}`);
  }
  
  // Public API
  return {
    add(n) {
      result += n;
      log(`Added ${n}, result: ${result}`);
      return this; // Chaining
    },
    subtract(n) {
      result -= n;
      log(`Subtracted ${n}, result: ${result}`);
      return this;
    },
    getResult() {
      return result;
    }
  };
})();

Calculator.add(5).subtract(2).add(10);
console.log(Calculator.getResult()); // 13
```

### 2. Observer Pattern (Pub/Sub)

```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
  
  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }
}

const emitter = new EventEmitter();
emitter.on('userLogin', (user) => console.log(`${user} logged in`));
emitter.emit('userLogin', 'Alice'); // 'Alice logged in'
```

### 3. Singleton Pattern

```javascript
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    this.connection = 'Connected';
    Database.instance = this;
  }
  
  query(sql) {
    return `Executing: ${sql}`;
  }
}

const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2); // true (same instance)
```

### 4. Memoization (Caching)

```javascript
function memoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      console.log('From cache');
      return cache.get(key);
    }
    
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const slowFibonacci = (n) => {
  if (n <= 1) return n;
  return slowFibonacci(n - 1) + slowFibonacci(n - 2);
};

const fastFibonacci = memoize(slowFibonacci);
console.log(fastFibonacci(40)); // Slow first time
console.log(fastFibonacci(40)); // Instant (from cache)
```

### 5. Debounce & Throttle

```javascript
// --- Debounce Implementation ---
// <input type="text" name="search" id="search"></input>

let count = 0;

// function sayHello(name) {
//   console.log(`Hello, ${name}! Count: ${++count}`);
// }

function sayHello(e) {
  console.log(`Hello, ${e.target.value}! Count: ${++count}`);
}

function debounce(callback, delay) {
  let timeoutId = null;

  return function debouncedFn(...args) {
    // preserve `this` for methods called via obj.method()
    const context = this;

    // cancel any pending execution
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    // schedule a new execution
    timeoutId = setTimeout(() => {
      // run with original `this` and args
      callback.apply(context, args);
      // optional: set to null so you can detect "no pending"
      timeoutId = null;
    }, delay);
  };
}

const debounced = debounce(sayHello, 1000);

const search = document.getElementById('search');
if (search) {
  search.addEventListener('input', debounce(sayHello, 1000));
}

// --- Throttle Implementation ---
// <button id="btn">Click me fast!</button>

const btn = document.getElementById('btn');

function onClick() {
  console.log('Handled at', new Date().toLocaleTimeString());
}

function throttle(callback, wait) {
  let shouldthrottle = false;

  return function fn(...args) {
    if (shouldthrottle) {
      return;
    }

    shouldthrottle = true;

    callback.apply(this, args);

    setTimeout(function () {
      shouldthrottle = false;
    }, wait);
  }
}

const throttledClick = throttle(onClick, 10000);

if (btn) {
  btn.addEventListener('click', throttledClick);
}
```

---

## 💬 Common Interview Questions

### 1. What is the difference between == and ===?

**Answer:**
"`==` performs type coercion before comparison, `===` checks both value and type without coercion. Always use `===` to avoid unexpected behavior."

```javascript
console.log(5 == '5');   // true (coerces string to number)
console.log(5 === '5');  // false (different types)
console.log(0 == false); // true (both coerce to 0)
console.log(0 === false); // false (number vs boolean)
```

---

### 2. Explain 'this' keyword

**Answer:**
"`this` refers to the execution context. It depends on how the function is called:
- Global: `window` (browser) or `global` (Node)
- Object method: the object
- Constructor: new instance
- Arrow function: lexical `this` (from outer scope)
- Explicit: `call()`, `apply()`, `bind()`"

```javascript
const obj = {
  value: 42,
  regular: function() { return this.value; },
  arrow: () => this.value
};

console.log(obj.regular()); // 42
console.log(obj.arrow());   // undefined (this = global)
```

---

### 3. What is hoisting?

**Answer:**
"Hoisting moves variable and function declarations to the top of their scope during compilation. `var` is hoisted with `undefined`, `let`/`const` are hoisted but in the Temporal Dead Zone until initialized. Function declarations are fully hoisted."

```javascript
console.log(x); // undefined (var hoisted)
var x = 5;

console.log(y); // ReferenceError (TDZ)
let y = 10;

sayHi(); // 'Hi' (function declaration hoisted)
function sayHi() { console.log('Hi'); }
```

---

### 4. What is the difference between var, let, and const?

**Answer:**

| Feature | var | let | const |
|---------|-----|-----|-------|
| Scope | Function | Block | Block |
| Hoisting | Yes (undefined) | Yes (TDZ) | Yes (TDZ) |
| Redeclaration | Allowed | Not allowed | Not allowed |
| Reassignment | Allowed | Allowed | Not allowed |
| Global object property | Yes | No | No |

---

### 5. Explain event delegation

**Answer:**
"Event delegation uses event bubbling to handle events at a parent level instead of adding listeners to each child. Benefits: fewer event listeners, handles dynamically added elements."

```javascript
// ❌ Bad - many listeners
document.querySelectorAll('li').forEach(li => {
  li.addEventListener('click', handleClick);
});

// ✅ Good - one listener
document.querySelector('ul').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    handleClick(e);
  }
});
```

---

## 🧠 Quick Mnemonics Summary

| Concept | Mnemonic | Meaning |
|---------|----------|---------|
| Promise Methods | **RAARS-T** | Resolve, All, AllSettled, Race, Any, Set, Then |
| Event Loop | **CMTM** | Call stack, Microtask, Task (Macrotask), Message |
| Scope | **BILGE** | Block, If, Lexical, Global, Execution |
| Prototype Chain | **PCPI** | Prototype, Constructor, Proto, Inheritance |
| This Binding | **OGCAE** | Object, Global, Constructor, Arrow, Explicit |

---

**Good luck with your interview! 🚀**
