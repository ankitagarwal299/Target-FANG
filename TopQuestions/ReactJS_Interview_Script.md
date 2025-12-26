# Senior ReactJS Engineer - Interview Script & Quick Revision Guide

> **Last Updated:** December 10, 2025  
> **Purpose:** Quick revision for Senior ReactJS Engineer interviews with mnemonics

---

## 📚 Table of Contents
1. [Core React Concepts](#core-react-concepts)
2. [React Hooks](#react-hooks)
3. [Performance Optimization](#performance-optimization)
4. [State Management](#state-management)
5. [Advanced Patterns](#advanced-patterns)
6. [React Ecosystem](#react-ecosystem)
7. [Testing](#testing)
8. [System Design with React](#system-design)
9. [Common Interview Questions](#common-questions)

---

## 🎯 Core React Concepts

### Virtual DOM & Reconciliation
**Mnemonic: "VCR Player" - Virtual, Compare, Render, Paint**

**Interview Script:**
*"React uses a Virtual DOM to optimize rendering. When state changes, React creates a new virtual DOM tree, **compares** it with the previous one using a **diffing algorithm**, identifies the minimal changes needed, and updates only those parts in the real DOM. This is called **reconciliation**."*

**Key Points to Mention:**
- **Fiber Architecture** (React 16+): The reconciliation engine that enables advanced features
- **Keys importance**: Help React identify which items changed
- **Reconciliation is O(n)** instead of O(n³) due to heuristics

---

### React Fiber vs Concurrent Rendering

> **⚠️ CRITICAL DISTINCTION**: Fiber = architecture, Concurrent Rendering = feature built on Fiber

**Interview Script:**
*"This is a common point of confusion. Let me clarify:*

**React Fiber (React 16, September 2017):**
- **What**: Complete rewrite of React's reconciliation **architecture/engine**
- **Why**: The old stack reconciler was synchronous and couldn't be interrupted
- **Think of it as**: The **foundation/infrastructure** that enables new capabilities

**Concurrent Rendering (React 18, March 2022):**
- **What**: A **feature/mode** that uses Fiber's capabilities
- **Why**: Keep UI responsive during heavy updates
- **Think of it as**: The **feature** built on top of Fiber foundation

**Analogy:** 
- Fiber = Car with a turbo engine (capability exists)
- Concurrent Mode = Actually using turbo mode (using the capability)

---

#### Before React Fiber (React 15 and earlier)

**The Old Stack Reconciler:**

```javascript
// React 15 - Synchronous, uninterruptible rendering
function reconcile() {
  // Once started, this runs to completion - BLOCKS everything
  for (let i = 0; i < 10000; i++) {
    updateComponent(components[i]); // Can't be paused
  }
  // User input frozen during this time!
}
```

**Problems:**
- **Synchronous**: Rendering runs to completion in one go
- **Blocking**: UI freezes during large updates
- **No Prioritization**: Can't interrupt low-priority work for urgent updates
- **Poor UX**: Typing, animations janky during heavy rendering

**Example Scenario:**
```javascript
// User typing in search box + large list rendering
// React 15: Input feels laggy because list rendering blocks typing
// React 18 with Concurrent: Typing stays smooth, list renders gradually
```

---

#### React Fiber Architecture (React 16+)

**What Changed:**

1. **Incremental Rendering**: Work split into chunks
2. **Interruptible**: Can pause/resume work
3. **Prioritization**: Urgent work (user input) interrupts low-priority work
4. **Time Slicing**: Work yielded to browser for animations/input

**How Fiber Works (Internal):**

```typescript
// Simplified Fiber node structure
type Fiber = {
  type: any,              // Component type
  stateNode: any,         // DOM node or component instance
  child: Fiber | null,    // First child
  sibling: Fiber | null,  // Next sibling
  return: Fiber | null,   // Parent
  alternate: Fiber | null, // Previous version (double buffering)
  effectTag: number,      // What changed (update, delete, etc.)
  expirationTime: number, // Priority/deadline
};
```

**Key Capabilities Fiber Enables:**

> **📝 MNEMONIC**: "Fiber's **CHIPS**" 
> - **C**hunking of work
> - **H**igher priority updates
> - **I**nterruptible rendering
> - **P**rioritization
> - **S**uspense support

**But:** React 16 shipped Fiber but **didn't enable** concurrent mode by default!

---

#### Concurrent Rendering (React 18)

**What It Actually Is:**

Concurrent rendering **uses** Fiber's architecture to render multiple versions of UI **concurrently**.

```javascript
// React 18 - Concurrent Features
import { useTransition, useDeferredValue } from 'react';

function SearchResults() {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  
  const handleChange = (e) => {
    // Urgent: Update input immediately
    setQuery(e.target.value);
    
    // Non-urgent: Mark results update as low priority
    startTransition(() => {
      setSearchResults(e.target.value); // Can be interrupted
    });
  };
  
  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending && <Spinner />}
      <Results data={searchResults} />
    </>
  );
}
```

**Concurrent Features in React 18:**

1. **useTransition**: Mark updates as non-urgent
```javascript
const [isPending, startTransition] = useTransition();
startTransition(() => setLargeList(newData)); // Interruptible
```

2. **useDeferredValue**: Defer expensive re-renders
```javascript
const deferredQuery = useDeferredValue(searchQuery);
// Use deferredQuery for heavy rendering
```

3. **Automatic Batching**: Batch updates everywhere (not just events)
```javascript
// React 17: Only batched in event handlers
// React 18: Also batched in setTimeout, promises, native events
fetchData().then(() => {
  setData(result);   // \
  setLoading(false); // } Batched into 1 render
});
```

4. **Suspense for Data Fetching**: (Previously only code-splitting)
```javascript
<Suspense fallback={<Loading />}>
  <DataComponent /> {/* Can suspend while fetching */}
</Suspense>
```

---

#### Timeline Summary

**React 15 and earlier (2013-2016):**
- Stack reconciler (synchronous, blocking)
- No interruption, no prioritization
- Simple but limited

**React 16 (September 2017):**
- ✅ **Fiber architecture** introduced
- ✅ Enabled features: Error Boundaries, Fragments, Portals
- ⚠️ Concurrent Mode existed as **experimental only**
- Most apps still rendered synchronously

**React 17 (October 2020):**
- No new features
- "Stepping stone" release
- Concurrent Mode still experimental

**React 18 (March 2022):**
- ✅ **Concurrent Rendering** officially released
- ✅ Opt-in via `createRoot()` (vs `render()`)
- New hooks: `useTransition`, `useDeferredValue`, `useId`
- Automatic batching everywhere
- Suspense for data fetching (still evolving)

---

#### Interview Key Points

**Question: "What's the difference between Fiber and Concurrent Rendering?"**

**Answer:**
*"Fiber is the **architecture** introduced in React 16 that rewrote how React reconciles the virtual DOM. It replaced the old stack reconciler with a new system that can pause and resume work.*

*Concurrent Rendering is a **feature** that became official in React 18, which uses Fiber's capabilities to keep the UI responsive during heavy updates by prioritizing urgent work like user input over less urgent work like rendering large lists.*

*The analogy I use: Fiber built the highway infrastructure, Concurrent Rendering is the express lane feature that uses it.*

*Before Fiber in React 15, React used a synchronous stack reconciler that would block the UI during large updates, causing jank. Fiber solved this by making rendering interruptible and prioritizable."*

**Question: "Why did React 16 have Fiber but not Concurrent Mode?"**

**Answer:**
*"Fiber was a massive internal rewrite—the team wanted to ship it incrementally for stability. React 16 gave us the foundation, but kept the default rendering behavior synchronous to ensure backwards compatibility. Concurrent features were experimental for years while the team refined the API and behavior. React 18 finally made concurrent rendering opt-in and production-ready."*

---

### Component Lifecycle (Class Components)
**Mnemonic: "MUD-RUU-WCU" (Mounting, Updating, Destroying)**

**Mounting:**
1. constructor
2. getDerivedStateFromProps
3. render
4. componentDidMount

**Updating:**
1. getDerivedStateFromProps
2. shouldComponentUpdate
3. render
4. getSnapshotBeforeUpdate
5. componentDidUpdate

**Unmounting:**
1. componentWillUnmount

**Interview Script:**
*"While we primarily use hooks now, understanding the lifecycle helps explain when effects run. The lifecycle has three phases: mounting, updating, and unmounting. For a senior role, I'd architect new components with functional components and hooks, but maintain legacy class components when needed."*

---

### JSX & How It Works
**Mnemonic: "JSX → BABEL → React.createElement()"**

**Interview Script:**
*"JSX isn't valid JavaScript; it's syntactic sugar. Babel transpiles JSX into `React.createElement()` calls. For example:"*

```javascript
// JSX
<div className="container">Hello</div>

// Transpiles to
React.createElement('div', { className: 'container' }, 'Hello')

// Which creates
{
  type: 'div',
  props: { className: 'container', children: 'Hello' },
  key: null,
  ref: null
}
```

---

## 🪝 React Hooks

### Essential Hooks - "CURE" (Core, Utility, Ref, Effect)

#### 1. useState
**Mnemonic: "State Setter Always Returns New Array [value, setter]"**

**Interview Script:**
*"useState manages local component state. It returns an array with the current state and a setter function. Important: state updates are **batched** in React 18+ for performance, and the setter can take a function for updates based on previous state."*

```javascript
// ❌ Wrong - stale closure
const [count, setCount] = useState(0);
const increment = () => setCount(count + 1); // might use stale count

// ✅ Correct - functional update
const increment = () => setCount(prev => prev + 1);
```

**Senior-Level Points:**
- State updates are **asynchronous** and **batched**
- Use **functional updates** when new state depends on old
- React 18: **Automatic batching** even in setTimeout, promises

---

#### 2. useEffect
**Mnemonic: "DEPS" - Dependencies, Execute, Persist, Side-effects**

**Interview Script:**
*"useEffect handles side effects like data fetching, subscriptions, DOM manipulation. It runs **after render** and **after paint**. The dependency array controls when it re-runs."*

```javascript
// Mounting only
useEffect(() => {
  // Runs once
}, []);

// On dependency change
useEffect(() => {
  // Runs when userId changes
}, [userId]);

// With cleanup
useEffect(() => {
  const subscription = subscribe();
  return () => subscription.unsubscribe(); // Cleanup
}, []);
```

**Critical Distinctions:**
- `useEffect`: Runs **after paint** (async)
- `useLayoutEffect`: Runs **before paint** (sync) - use for DOM measurements
- `useInsertionEffect`: Runs **before all DOM mutations** (CSS-in-JS libraries)

**Mnemonic: "PAM"** - Paint (useEffect), Await paint (useLayoutEffect), Mutation before (useInsertionEffect)

---

#### 3. useCallback & useMemo
**Mnemonic: "Functions Call, Values Memo"**

**Interview Script:**
*"Both optimize performance by memoization. `useCallback` caches **functions**, `useMemo` caches **computed values**. Use them to prevent unnecessary re-renders when passing callbacks to optimized child components."*

```javascript
// useCallback - memoize function
const handleClick = useCallback(() => {
  doSomething(a, b);
}, [a, b]); // Only recreated if a or b changes

// useMemo - memoize value
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
```

**When to Use:**
- Child component is wrapped in `React.memo()`
- Function is a dependency in another hook
- Computing expensive values
- Referential equality matters (e.g., in dependency arrays)

**⚠️ Warning:** Don't overuse! They add overhead. Measure before optimizing.

---

#### 4. useRef
**Mnemonic: "REF = Retain, Escape, Focus"**

**Interview Script:**
*"useRef has two main uses: **DOM access** and **storing mutable values** that persist across renders without causing re-renders."*

```javascript
// 1. DOM access
const inputRef = useRef(null);
useEffect(() => {
  inputRef.current.focus();
}, []);

// 2. Mutable value (doesn't trigger re-render)
const countRef = useRef(0);
countRef.current += 1; // No re-render

// 3. Store previous value
const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
```

---

#### 5. useContext
**Mnemonic: "Provider → Consumer → No Props Drilling"**

**Interview Script:**
*"useContext solves prop drilling by providing global state. It's ideal for theme, auth, i18n. For complex state, combine with useReducer."*

```javascript
// Create context
const ThemeContext = createContext('light');

// Provider
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>

// Consumer
const theme = useContext(ThemeContext);
```

**Senior Insight:** Context triggers re-renders in all consumers. For performance-critical apps, consider:
- Splitting contexts by update frequency
- Using `useMemo` on context values
- Or use state management libraries (Zustand, Jotai)

---

#### 6. useReducer
**Mnemonic: "RASE" - Reducer, Action, State, Execute**

**Interview Script:**
*"useReducer is useState's more powerful sibling. Better for complex state logic with multiple sub-values or when next state depends on previous."*

```javascript
const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const [state, dispatch] = useReducer(reducer, { count: 0 });
dispatch({ type: 'INCREMENT' });
```

**When to Use:**
- Complex state logic
- Multiple sub-values
- Next state depends on previous
- Easier to test (pure function)

---

### Advanced Hooks

#### useTransition & useDeferredValue (React 18)
**Mnemonic: "UI stays Fast, Updates wait Last"**

**Interview Script:**
*"React 18 introduced concurrent features. `useTransition` marks updates as non-urgent, keeping UI responsive. `useDeferredValue` defers expensive re-renders."*

```javascript
// useTransition
const [isPending, startTransition] = useTransition();
startTransition(() => {
  setSearchQuery(input); // Non-urgent
});

// useDeferredValue
const deferredQuery = useDeferredValue(searchQuery);
// Use deferredQuery for expensive rendering
```

---


#### useId (React 18)
**Interview Script:**
*"Generates unique IDs for accessibility and SSR without hydration mismatches."*

```javascript
const id = useId();
<label htmlFor={id}>Name</label>
<input id={id} />
```

---

#### useImperativeHandle
**Mnemonic: "Parent Controls Child"**

**Interview Script:**
*"useImperativeHandle lets a parent component invoke methods on a child, like `focus()` or `scrollIntoView()`. It's rarely used but essential for reusable libraries."*

```javascript
/* Child Component */
const Input = forwardRef((props, ref) => {
  const inputRef = useRef();
  
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    shake: () => {
      // Custom animation logic
    }
  }));

  return <input ref={inputRef} />;
});

/* Parent Component */
const formRef = useRef();
// Can call formRef.current.focus() or formRef.current.shake()
```

---

### Custom Hooks
**Mnemonic: "Reusable Logic, Prefix 'use'"**

**Interview Script:**
*"Custom hooks extract reusable logic. They must start with 'use' and can call other hooks."*

```javascript
// useFetch - data fetching hook
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (!cancelled) {
          setData(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, error };
}
```

**Popular Custom Hooks:**
- `useDebounce` - Debounce values
- `useLocalStorage` - Sync state with localStorage
- `useMediaQuery` - Responsive design
- `useIntersectionObserver` - Lazy loading
- `useOnClickOutside` - Modal/dropdown closing

---

## ⚡ Performance Optimization

### Mnemonic: "CLUMPS" (Code-split, Lazy, Usememo, Memo, Profiler, Suspense)

### 1. React.memo
**Interview Script:**
*"React.memo is a HOC that prevents re-renders if props haven't changed. It does a shallow comparison by default."*

```javascript
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* expensive rendering */}</div>;
});

// Custom comparison
const areEqual = (prevProps, nextProps) => {
  return prevProps.id === nextProps.id;
};
const MemoizedComponent = React.memo(Component, areEqual);
```

---

### 2. Code Splitting & Lazy Loading
**Interview Script:**
*"Code splitting reduces bundle size by loading components on-demand. Use `React.lazy()` with `Suspense`."*

```javascript
const LazyComponent = React.lazy(() => import('./Component'));

<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>
```

**Route-based splitting:**
```javascript
const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));
```

---

### 3. Virtualization
**Interview Script:**
*"For long lists, render only visible items. Use `react-window` or `react-virtualized`."*

```javascript
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={10000}
  itemSize={35}
  width="100%"
>
  {({ index, style }) => <div style={style}>Row {index}</div>}
</FixedSizeList>
```

---

### 4. Debouncing & Throttling
**Mnemonic: "Debounce Delays, Throttle Throttles"**

```javascript
// Debounce - wait for pause
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
};

// Throttle - limit execution rate
const useThrottle = (callback, delay) => {
  const lastRan = useRef(Date.now());
  
  return useCallback((...args) => {
    if (Date.now() - lastRan.current >= delay) {
      callback(...args);
      lastRan.current = Date.now();
    }
  }, [callback, delay]);
};
```

---

### 5. Key Optimization Principles
**Interview Script Points:**

1. **Avoid Inline Functions & Objects in Render**
   **Mnemonic: "New Ref = New Render"**

   **Interview Script:**
   *"Defining functions or objects directly in the render method creates a **new reference** on every single render. This is critical because it defeats optimizations like `React.memo` or `PureComponent`. Even if the data hasn't changed, the child component sees a 'new' prop (referential inequality) and is forced to re-render."*

   **Deep Dive Explanation:**
   - **Inline Functions:** `<Child onClick={() => doSomething()} />` creates a new function instance every time the parent renders.
   - **Inline Objects:** `<Child options={{ id: 1 }} />` creates a new object in memory every time.
   - **The Impact:** If `Child` is memoized, that optimization is completely bypassed because `{ id: 1 } !== { id: 1 }` in JavaScript.

   **Code Example:**
   ```javascript
   // ❌ Bad Pattern: Breaks React.memo optimizations
   const Parent = () => {
      // 1. New object reference created every render
      const config = { theme: 'dark' }; 
      
      // 2. New function reference created every render
      const handleClick = () => console.log('Clicked'); 

      // Child re-renders EVERY time, even if other props didn't change!
      return <ExpensiveChild config={config} onClick={handleClick} />;
   };

   // ✅ Good Pattern: Stable References
   const Parent = () => {
      // 1. Memoized object - reference stays the same
      const config = useMemo(() => ({ theme: 'dark' }), []);
      
      // 2. Memoized function - reference stays the same
      const handleClick = useCallback(() => console.log('Clicked'), []);

      return <ExpensiveChild config={config} onClick={handleClick} />;
   };
   ```

   **Senior Nuance:**
   *"However, don't over-optimize. For native elements like `<button onClick={() => ...}>`, inline functions are fine because diffing a button is cheap. Only prioritize this for heavy components, lists, or context values."*

2. **Move state down:**
```javascript
// Keep state as close to where it's used as possible
```

3. **Use production build:**
```javascript
// Development build is 3-5x slower
npm run build
```

4. **Profiler API:**
```javascript
<Profiler id="App" onRender={callback}>
  <App />
</Profiler>
```

---

---

## 🕵️ Memory Leaks & Traps

### Mnemonic: "ET-AL" (Effects, Timers, API, Listeners)

### Q1: "useEffect is the devil!" (The Hook Trap)
**Interview Script:**
*"It's not the devil, but it's the #1 source of leaks. If you don't return a **cleanup function**, subscriptions/listeners persist forever. Every time the component unmounts or re-renders, a NEW listener is added without removing the old one."*

### Q2: API Calls on Unmounted Components
**The Problem:** Data returns *after* component unmounts → React warns: "Can't perform state update on unmounted component".
**The Fix (AbortController):**

```javascript
useEffect(() => {
  const controller = new AbortController();

  fetch(url, { signal: controller.signal })
    .then(data => setData(data))
    .catch(err => {
      if (err.name === 'AbortError') console.log('Fetch aborted');
    });

  return () => controller.abort(); // Cancel on unmount
}, [url]);
```

### Q3: Event Listeners Not Removed
**The Trap:** `window.addEventListener` in `useEffect` without `removeEventListener`.
**The Fix:**
```javascript
useEffect(() => {
  const handler = () => console.log(window.innerWidth);
  window.addEventListener('resize', handler);
  
  // 🚨 CRITICAL: Must match the function reference exactly!
  return () => window.removeEventListener('resize', handler);
}, []);
```

### Q4: setInterval / setTimeout Timers
**The Trap:** Starting a timer that tries to `setState` after component is gone.
**The Fix:** `clearInterval` in the return statement.

### Q5: Important Question! "How do you find leaks?"
**Answer:**
1.  **Chrome DevTools Performance Tab:** Look for JS Heap rising continuously.
2.  **Memory Tab:** Take Heap Snapshots and compare "Detached DOM nodes".
3.  **Strict Mode:** React Double-invokes effects in dev to expose cleanup bugs.

---

## 🏪 State Management

### Mnemonic: "CRAZY" (Context, Redux, Apollo, Zustand, You-don't-need-library)

### 1. When to Use What?

**Interview Script:**
*"State management choice depends on complexity and team familiarity."*

| Complexity | Solution |
|------------|----------|
| Local state, simple | `useState`, `useReducer` |
| Prop drilling (< 3 levels) | Props / Composition |
| Theme, Auth, i18n | Context API |
| Complex, predictable | Redux Toolkit |
| Server state | React Query / SWR |
| Lightweight global | Zustand / Jotai |
| GraphQL | Apollo Client |

---

### 2. Redux Toolkit (Modern Redux)
**Mnemonic: "RADS" - Reducer, Actions, Dispatch, Selectors**

**Interview Script:**
*"Redux Toolkit is the modern, opinionated Redux. It includes `createSlice`, `configureStore`, and RTK Query for data fetching."*

```javascript
// Slice
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => { state.value += 1; }, // Immer inside
    decrement: state => { state.value -= 1; },
  },
});

// Store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// Component
const count = useSelector(state => state.counter.value);
const dispatch = useDispatch();
dispatch(counterSlice.actions.increment());
```

**Async with createAsyncThunk:**
```javascript
const fetchUser = createAsyncThunk('user/fetch', async (userId) => {
  const response = await fetch(`/api/user/${userId}`);
  return response.json();
});

// In slice
extraReducers: (builder) => {
  builder
    .addCase(fetchUser.pending, (state) => { state.loading = true; })
    .addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    })
    .addCase(fetchUser.rejected, (state, action) => {
      state.error = action.error.message;
    });
}
```

---

### 3. React Query / TanStack Query
**Mnemonic: "FSIR" - Fetch, Sync, Invalidate, Refetch**

**Interview Script:**
*"React Query manages server state with caching, background updates, and automatic refetching. It eliminates boilerplate for data fetching."*

```javascript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fetch
const { data, isLoading, error } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  staleTime: 5000, // Consider fresh for 5s
});

// Mutate
const queryClient = useQueryClient();
const mutation = useMutation({
  mutationFn: updateUser,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['user'] });
  },
});
```

**When to Use:**
- API data fetching
- Caching
- Background updates
- Optimistic updates
- Polling

---

### 4. Zustand (Lightweight State)
**Interview Script:**
*"Zustand is minimal, doesn't require providers, and works with React 18 concurrent features."*

```javascript
import create from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

// Usage
const count = useStore((state) => state.count);
const increment = useStore((state) => state.increment);
```

---

## 🎨 Advanced Patterns

### 1. Compound Components
**Mnemonic: "Share Context, Flexible Children"**

**Interview Script:**
*"Compound components share implicit state through Context, offering flexible, semantic APIs."*

```javascript
const TabsContext = createContext();

function Tabs({ children, defaultValue }) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }) {
  return <div className="tab-list">{children}</div>;
}

function Tab({ value, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  return (
    <button
      className={activeTab === value ? 'active' : ''}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
}

function TabPanel({ value, children }) {
  const { activeTab } = useContext(TabsContext);
  return activeTab === value ? <div>{children}</div> : null;
}

// Usage
<Tabs defaultValue="tab1">
  <TabList>
    <Tab value="tab1">Tab 1</Tab>
    <Tab value="tab2">Tab 2</Tab>
  </TabList>
  <TabPanel value="tab1">Content 1</TabPanel>
  <TabPanel value="tab2">Content 2</TabPanel>
</Tabs>
```

---

### 2. Render Props
**Interview Script:**
*"Render props pass a function as a child to share logic. Modern hooks often replace this pattern."*

```javascript
<DataProvider render={(data) => <DisplayData data={data} />} />
```

---

### 3. Higher-Order Components (HOC)
**Mnemonic: "Wrap Component, Add Props"**

```javascript
function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { user } = useAuth();
    
    if (!user) {
      return <Redirect to="/login" />;
    }
    
    return <Component {...props} user={user} />;
  };
}

const ProtectedPage = withAuth(Dashboard);
```

---

### 4. Controlled vs Uncontrolled Components
**Mnemonic: "Controlled = React State, Uncontrolled = DOM State"**

```javascript
// Controlled (React manages)
const [value, setValue] = useState('');
<input value={value} onChange={(e) => setValue(e.target.value)} />

// Uncontrolled (DOM manages)
const inputRef = useRef();
<input ref={inputRef} defaultValue="hello" />
// Access via: inputRef.current.value
```

**When to Use Uncontrolled:**
- Forms with native validation
- File inputs
- Legacy code integration

---

### 5. Error Boundaries
**Mnemonic: "Catch Render Errors, Show Fallback"**

**Interview Script:**
*"Error boundaries catch JavaScript errors in component tree and show fallback UI. They only work in **class components** for now."*

```javascript
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

**⚠️ Error boundaries DON'T catch:**
- Event handlers (use try-catch)
- Async code
- SSR
- Errors in the error boundary itself

---

## 🛠️ React Ecosystem

### 1. React Router
**Mnemonic: "BRL" - BrowserRouter, Routes, Link**

```javascript
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/users/:id" element={<User />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>

// In component
const { id } = useParams();
const navigate = useNavigate();
navigate('/home');
```

**Nested Routes:**
```javascript
<Route path="/dashboard" element={<Dashboard />}>
  <Route path="settings" element={<Settings />} />
  <Route path="profile" element={<Profile />} />
</Route>
```

---

### 2. Next.js (React Framework)
**Interview Script:**
*"Next.js provides SSR, SSG, API routes, and file-based routing. It's production-ready with built-in optimization."*

**Key Features:**
- **SSR:** `getServerSideProps`
- **SSG:** `getStaticProps`
- **ISR:** Incremental Static Regeneration
- **API Routes:** `pages/api/`
- **Image Optimization:** `next/image`
- **App Router** (Next.js 13+): Server Components

---

### 3. Styling Solutions
**Mnemonic: "STEM" - Styled, Tailwind, Emotion, Modules**

1. **CSS Modules:** Scoped by default
2. **Styled Components:** CSS-in-JS
3. **Tailwind CSS:** Utility-first
4. **Emotion:** CSS-in-JS with better performance

---

## 🧪 Testing

### Mnemonic: "JET" - Jest, Enzyme (deprecated), Testing Library

### React Testing Library
**Philosophy: "Test behavior, not implementation"**

```javascript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('renders and handles click', async () => {
  render(<Counter />);
  
  // Query
  const button = screen.getByRole('button', { name: /increment/i });
  const count = screen.getByText(/count: 0/i);
  
  // Interact
  await userEvent.click(button);
  
  // Assert
  expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
});

// Async
test('loads data', async () => {
  render(<UserProfile userId={1} />);
  
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  
  await waitFor(() => {
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
  });
});
```

**Query Priority:**
1. `getByRole` (best for accessibility)
2. `getByLabelText` (forms)
3. `getByPlaceholderText`
4. `getByText`
5. `getByTestId` (last resort)

---

## 🏗️ System Design with React

### Scalable React Architecture
**Mnemonic: "CLEAR" - Component, Layer, Entity, API, Routing**

```
/src
  /components       # Reusable UI components
    /ui             # Button, Input, Modal
    /composite      # SearchBar, UserCard
  /features         # Feature-based modules
    /auth
      /components
      /hooks
      /api
      /utils
    /dashboard
  /hooks            # Shared custom hooks
  /services         # API clients
  /stores           # State management
  /utils            # Helper functions
  /types            # TypeScript types
  /constants        # Constants
```

---

### Micro-Frontends
**Interview Script:**
*"For large teams, micro-frontends allow independent deployment. Use Module Federation (Webpack 5) or Single-SPA."*

---

## 💬 Common Interview Questions

### 1. What's new in React 18?
**Mnemonic: "CAT SUB" - Concurrent, Automatic batching, Transitions, Suspense, useId, Batching**

- **Concurrent rendering**
- **Automatic batching** (even in promises, setTimeout)
- **Transitions** (useTransition, useDeferredValue)
- **Suspense for data fetching**
- **useId** hook
- **Server Components** (alpha)

---

### 2. Class vs Functional Components?
**Interview Script:**
*"Functional components with hooks are now the standard. They're more concise, easier to test, and support concurrent features. Classes still exist for error boundaries and legacy code."*

---

### 3. How to prevent unnecessary re-renders?
**Mnemonic: "MCUD"**
- **M**emo (React.memo)
- **C**allback (useCallback)
- **U**seMemo
- **D**on't create objects/functions in render

---

### 4. How does React Fiber work?
**Interview Script:**
*"Fiber is React's reconciliation algorithm. It breaks rendering into chunks, allowing React to pause work and prioritize urgent updates. This enables concurrent rendering and keeps UI responsive."*

---

### 5. Server Components vs Client Components?
**Interview Script:**
*"Server Components render on the server, reducing bundle size and allowing direct database access. Client Components have interactivity and use hooks. In Next.js 13+, components are server by default, use 'use client' for client components."*

---

### 6. How to handle authentication?
**Interview Script:**
*"Store JWT in httpOnly cookies for security. Use Context for auth state. Protect routes with HOCs or route guards. For token refresh, use interceptors."*

```javascript
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  
  const login = async (credentials) => {
    const user = await authService.login(credentials);
    setUser(user);
  };
  
  const logout = () => {
    authService.logout();
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

---

### 7. Optimizing bundle size?
**Interview Script:**
- **Code splitting** (lazy loading)
- **Tree shaking** (ES modules)
- **Analyze bundle** (webpack-bundle-analyzer)
- **Use production build**
- **Lazy load images**
- **Remove unused dependencies**

---

### 8. How to handle 10,000 items in a list?
**Interview Script:**
*"Use virtualization with react-window. Also consider pagination or infinite scroll. Virtualization renders only visible items, drastically improving performance."*

---

### 9. Explain useEffect cleanup?
**Interview Script:**
*"Cleanup function runs before the effect runs again and when component unmounts. Essential for cleaning up subscriptions, timers, event listeners to prevent memory leaks."*

```javascript
useEffect(() => {
  const timer = setTimeout(() => {}, 1000);
  return () => clearTimeout(timer); // Cleanup
}, []);
```

---

### 10. Controlled vs Uncontrolled forms?
**Interview Script:**
*"Controlled forms have React manage state, providing full control and validation. Uncontrolled use refs and DOM state, better for performance with large forms. I prefer controlled for most cases, uncontrolled for file inputs or legacy integration."*

---

## 🚀 Deep Dive Questions (Senior Level)

### 11. What is React Fiber vs. Old Reconciliation?
**Script:**
*"Old React (Stack Reconciler) worked like a recursive function call—once it started rendering, it couldn't stop. The UI would freeze for large updates. **Fiber** changed this by using a linked-list implementation that can **pause, abort, or prioritize** work. It processes 'units of work' and yields back to the main thread (Time Slicing), keeping the UI responsive."*

### 12. "When exactly does a component re-render?"
**Mnemonic: "SPF-C" (State, Props, Father/Parent, Context)**
**Script:**
*"A component re-renders ONLY when:*
1.  **State changes** (`useState`/`useReducer`)
2.  **Props change** (Parent passes new data)
3.  **Parent re-renders** (Unless child is `React.memo`'d)
4.  **Context changes** (All consumers update)
*Note: `useRef` changes do NOT trigger renders!"*

### 13. React Batching: 17 vs 18?
**Script:**
*"React 17 only batched state updates inside **event handlers**. Updates inside `setTimeout` or `Promises` triggered separate re-renders. React 18 introduces **Automatic Batching**—it groups ALL state updates within a single event loop tick into one re-render, regardless of where they happen."*

### 14. useMemo/useCallback: When NOT to use?
**Script:**
*"Don't just wrap everything! Creating the memoization object itself has a cost. Do NOT use if:*
1.  **Calculation is cheap:** (e.g., `a + b`, string formatting).
2.  **Referential equality doesn't matter:** The function isn't passed to a memoized child or dependency array.
3.  **Premature Optimization:** You haven't profiled it yet."*

### 15. Real use cases for Suspense (Beyond Loading)?
**Script:**
*"Besides code-splitting, Suspense is now used for **Data Fetching** (with frameworks like Relay/Next.js/TanStack). It eliminates 'Waterfall' requests by allowing components to initiate fetches *before* rendering is unblocked, and handles loading states declaratively."*

### 16. useRef vs useState
**Script:**
*"Both store data. `useState` triggers a re-render when updated (UI State). `useRef` does NOT trigger a re-render (Mutable containers, DOM elements, timers). If changing the value shouldn't visually change the screen immediately, use `useRef`."*

### 17. Hydration & SSR Mismatches
**Script:**
*"Hydration is React 'attaching' event listeners to the static HTML served by the server. If the server HTML differs from what React renders on the client (e.g., `Date.now()` or `window.innerWidth`), React throws a **Hydration Mismatch Warning**. This hurts performance because React has to throw away the server HTML and re-render from scratch."*
**Fix:** Use `useEffect` for browser-specific data or `useId` for stable IDs.

### 18. useImperativeHandle (Recap)
**Script:**
*"Allows a parent to call a function on a child component instance. Used for controlling focus, scrolling, or triggering animations imperatively from a parent."*

### 19. Optimizing Large Lists
**Script:**
*"Virtualization (React Window/Virtuoso) is the key. It only renders the items currently in the viewport. For 10,000 items, instead of 10,000 DOM nodes, you only have ~10-20. This reduces memory usage and keeps the frame rate high."*

---

## 🧠 Quick Mnemonics Cheat Sheet

| Concept | Mnemonic | Meaning |
|---------|----------|---------|
| Virtual DOM | **VCR Player** | Virtual, Compare, Render, Paint |
| Fiber | **CHIPS** | Concurrent, Higher priority, Interruptible, Prioritization, Suspense |
| Lifecycle | **MUD-RUU-WCU** | Mounting, Updating, Destroying phases |
| Essential Hooks | **CURE** | Context, Utility, Ref, Effect |
| useEffect | **DEPS** | Dependencies, Execute, Persist, Side-effects |
| Performance | **CLUMPS** | Code-split, Lazy, Usememo, Memo, Profiler, Suspense |
| State Management | **CRAZY** | Context, Redux, Apollo, Zustand, You-don't-need |
| Redux | **RADS** | Reducer, Actions, Dispatch, Selectors |
| React Query | **FSIR** | Fetch, Sync, Invalidate, Refetch |
| React 18 | **CAT SUB** | Concurrent, Automatic batching, Transitions, Suspense, useId, Batching |
| Re-render Prevention | **MCUD** | Memo, Callback, UseMemo, Don't inline |
| Architecture | **CLEAR** | Component, Layer, Entity, API, Routing |
| Testing Queries | **RLT** | Role, Label, Text (priority order) |

---

## 🎯 Interview Day Checklist

**30 Minutes Before:**
- [ ] Review mnemonics cheat sheet
- [ ] Recall "VCR Player" for Virtual DOM
- [ ] Remember "CHIPS" for Fiber
- [ ] Know "CLUMPS" for performance
- [ ] Refresh "CRAZY" for state management

**During Interview:**
- [ ] Clarify requirements before coding
- [ ] Think out loud
- [ ] Mention trade-offs
- [ ] Discuss testing approach
- [ ] Ask about team's stack
- [ ] Show TypeScript knowledge if applicable

**Senior-Level Behaviors:**
- [ ] Discuss scalability
- [ ] Mention CI/CD integration
- [ ] Talk about team collaboration
- [ ] Consider accessibility
- [ ] Think about monitoring/observability

---

## 🚀 Final Tips

1. **Don't just know WHAT, know WHY:**
   - Why Virtual DOM? → Performance
   - Why Hooks? → Reusability, composition
   - Why memoization? → Prevent unnecessary renders

2. **Show architectural thinking:**
   - Folder structure
   - Code splitting strategy
   - State management choice justification

3. **Demonstrate production experience:**
   - Error handling
   - Loading states
   - Edge cases
   - Accessibility (a11y)
   - SEO (for SSR/SSG)

4. **Know the trade-offs:**
   - SSR vs CSR vs SSG
   - Context vs Redux
   - Class vs Functional
   - Controlled vs Uncontrolled

---

**Good luck with your interview! 🎉 Remember: Confidence comes from preparation. You've got this!** 💪
