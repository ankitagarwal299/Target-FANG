# Next.js Senior Engineer Interview Script 🚀

## 🧠 Memory Mnemonics

### Core Rendering Patterns: **"SISTER"**
- **S**tatic Site Generation (SSG)
- **I**ncremental Static Regeneration (ISR)
- **S**erver-Side Rendering (SSR)
- **T**ime-based Revalidation
- **E**dge Runtime
- **R**eact Server Components (RSC)

### Data Fetching Hierarchy: **"GLASS"**
- **G**etStaticProps (Build time)
- **L**oader functions (Server)
- **A**PI Routes (Backend)
- **S**erver Components (New default)
- **S**WR/React Query (Client)

### App Router Features: **"RAMP-IT"**
- **R**oute Groups
- **A**PI Routes
- **M**etadata
- **P**arallel Routes
- **I**ntercepting Routes
- **T**emplates & Layouts

---

## 1. Next.js Fundamentals

### Q: What is Next.js and why use it over React?

**Answer Script:**
"Next.js is a React framework that provides production-ready features out of the box. The key advantages are:

**🎯 Mnemonic: "PROPS-F"**
- **P**erformance optimization (automatic code splitting, image optimization)
- **R**endering flexibility (SSR, SSG, ISR)
- **O**ut-of-box features (routing, API routes, middleware)
- **P**roduction-ready (built-in optimizations)
- **S**EO friendly (server rendering)
- **F**ile-based routing (no router config)

**Example:** At my previous role, migrating from CRA to Next.js reduced our FCP by 40% and improved SEO rankings significantly."

---

### Q: Explain the difference between SSG, SSR, and ISR

**Answer Script:**
"These are Next.js rendering strategies:

**🎯 Mnemonic: "When-How-Update"**

**SSG (Static Site Generation)**
- **When:** Build time - pre-renders at `npm run build`
- **How:** Uses `getStaticProps` or Server Components with no dynamic data
- **Update:** Requires rebuild to update content
- **Use case:** Blog posts, marketing pages, documentation

```typescript
// App Router (Next.js 13+)
export default async function BlogPost({ params }: { params: { id: string } }) {
  const post = await fetchPost(params.id);
  return <Article post={post} />;
}

export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }];
}
```

**SSR (Server-Side Rendering)**
- **When:** Request time - renders on each request
- **How:** Fetch dynamic data per request
- **Update:** Always up-to-date (no caching by default)
- **Use case:** User dashboards, personalized content

```typescript
// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const userData = await fetchUserData(); // Runs on each request
  return <DashboardUI data={userData} />;
}
```

**ISR (Incremental Static Regeneration)**
- **When:** Build time + background regeneration
- **How:** Static + revalidation period
- **Update:** Stale-while-revalidate pattern
- **Use case:** E-commerce product pages, news articles

```typescript
// Revalidate every 60 seconds
export const revalidate = 60;

export default async function Product({ params }: { params: { id: string } }) {
  const product = await fetchProduct(params.id);
  return <ProductPage product={product} />;
}
```

**🎯 Decision Matrix Mnemonic: "SCI"**
- **S**tatic content → SSG
- **C**hanging frequently → ISR
- **I**ndividualized per user → SSR"

---

### Q: What are React Server Components (RSC)?

**Answer Script:**
"RSC is a new paradigm in Next.js 13+ App Router that allows components to run exclusively on the server.

**🎯 Mnemonic: "SERVER-BC"**
- **S**erver-only execution (default in App Router)
- **E**liminate client bundle size
- **R**educe waterfalls (parallel data fetching)
- **V**ault access (direct DB queries, secrets)
- **E**nhanced security (sensitive logic server-side)
- **R**educed JavaScript to browser
- **B**etter performance
- **C**lient components via 'use client'

**Key Points:**
1. **Default behavior:** All components in `app/` are Server Components
2. **Client components:** Opt-in with `'use client'` directive
3. **Can't use hooks:** No useState, useEffect in Server Components
4. **Async components:** Can use async/await directly

```typescript
// ✅ Server Component (default)
async function UserProfile({ id }: { id: string }) {
  const user = await db.user.findUnique({ where: { id } }); // Direct DB access
  return <div>{user.name}</div>;
}

// ✅ Client Component (interactive)
'use client';
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

**🎯 Component Choice Mnemonic: "IFS"**
- **I**nteractivity needed → Client
- **F**etching data from server → Server
- **S**tatic content → Server"

---

## 2. App Router (Next.js 13+)

### Q: Explain the App Router vs Pages Router

**Answer Script:**
"Next.js has two routing systems:

**🎯 Mnemonic: "OLD vs NEW"**

**Pages Router (Legacy)**
- **O**ld approach (Next.js 12 and below)
- **L**imited layouts (single _app.js)
- **D**ata fetching via getServerSideProps/getStaticProps

**App Router (Modern)**
- **N**ested layouts and templates
- **E**nhanced features (parallel routes, intercepting routes)
- **W**eb standards (fetch, async components)

**Key Differences:**

| Feature | Pages Router | App Router |
|---------|-------------|------------|
| Location | `pages/` | `app/` |
| Data Fetching | getServerSideProps | Server Components |
| Layouts | Single _app.js | Nested layouts |
| Loading States | Custom | loading.js |
| Error Handling | _error.js | error.js |
| Default | Client Components | Server Components |

**Migration Strategy:**
Both can coexist - App Router takes precedence over Pages Router for matching routes."

---

### Q: What are Route Groups and when to use them?

**Answer Script:**
"Route Groups organize routes without affecting the URL structure.

**🎯 Mnemonic: "LOOP"**
- **L**ayout sharing (group routes with same layout)
- **O**rganization (logical grouping)
- **O**pt-out of layout (separate layout per group)
- **P**arentheses syntax `(groupName)`

**Syntax:** Folders wrapped in parentheses `(folderName)` don't appear in URL

```
app/
  (marketing)/
    layout.tsx       // Marketing layout
    about/page.tsx   // URL: /about
    blog/page.tsx    // URL: /blog
  (shop)/
    layout.tsx       // Shop layout
    products/page.tsx // URL: /products
    cart/page.tsx    // URL: /cart
```

**Use Cases:**
1. **Different layouts** for different sections
2. **Organizational clarity** (dashboard vs public)
3. **Opt-in/out** of layouts for specific routes"

---

### Q: Explain Parallel Routes and Intercepting Routes

**Answer Script:**
"These are advanced App Router features for complex UI patterns.

**PARALLEL ROUTES** 🎯 Mnemonic: "SLOT"
- **S**imultaneous rendering in same layout
- **L**oading states independent
- **O**ptional with default.js
- **T**ab-like interfaces

**Syntax:** Use `@folderName` for slots

```
app/
  @analytics/
    page.tsx
  @team/
    page.tsx
  layout.tsx
  page.tsx
```

```typescript
// layout.tsx
export default function Layout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
}) {
  return (
    <>
      {children}
      {analytics}
      {team}
    </>
  );
}
```

**INTERCEPTING ROUTES** 🎯 Mnemonic: "MODAL"
- **M**odal-like behavior
- **O**verlay routes
- **D**ifferent when navigated vs direct access
- **A**djust URL without full page
- **L**ight-box patterns

**Syntax:** Use `(..)` to intercept

```
app/
  feed/
    page.tsx
    (..)photo/[id]/
      page.tsx        // Intercepts /photo/[id] when navigating from /feed
  photo/
    [id]/
      page.tsx        // Direct access to /photo/[id]
```

**Intercepting Conventions:**
- `(.)` same level
- `(..)` one level up
- `(..)(..)` two levels up
- `(...)` from root app

**Use Case:** Instagram-like photo modal - shows modal when clicking from feed, full page when direct URL."

---

## 3. Data Fetching & Caching

### Q: How does caching work in Next.js 13+ App Router?

**Answer Script:**
"Next.js has multiple caching layers for optimal performance.

**🎯 Mnemonic: "4R-CACHE"**
- **R**equest Memoization
- **R**outer Cache
- **R**evalidation
- **R**esource Cache (Full Route)

**1. Request Memoization (Automatic)**
- Deduplicates identical fetch requests in single render
- Same URL + options = single request

```typescript
// Both calls fetch once during render
async function Header() {
  const user = await fetch('/api/user').then(r => r.json());
  return <div>{user.name}</div>;
}

async function Sidebar() {
  const user = await fetch('/api/user').then(r => r.json()); // Memoized!
  return <nav>{user.role}</nav>;
}
```

**2. Data Cache (Persistent)**
- Caches fetch responses across requests and deployments
- Survives server restarts

```typescript
// Cached indefinitely
fetch('https://api.example.com/data');

// Revalidate every 3600 seconds
fetch('https://api.example.com/data', { next: { revalidate: 3600 } });

// No caching
fetch('https://api.example.com/data', { cache: 'no-store' });
```

**3. Full Route Cache**
- Caches rendered result (RSC Payload + HTML)
- Only for statically rendered routes

**4. Router Cache (Client-side)**
- Stores RSC Payload in browser
- Duration: 30s (dynamic), 5min (static)

**🎯 Opt-out Mnemonic: "FUND"**
- **F**etch with `cache: 'no-store'`
- **U**se cookies() or headers()
- **N**o cache: `export const dynamic = 'force-dynamic'`
- **D**isable: `export const revalidate = 0`"

---

### Q: What are Server Actions and how do they work?

**Answer Script:**
"Server Actions are asynchronous server functions called from Client or Server Components.

**🎯 Mnemonic: "FORMS"**
- **F**orm submissions (progressive enhancement)
- **O**n-demand mutations
- **R**evalidation (revalidatePath, revalidateTag)
- **M**utating data securely
- **S**erver-only code

**Defining Server Actions:**

```typescript
// Option 1: In Server Component
export default function Page() {
  async function createUser(formData: FormData) {
    'use server';
    const name = formData.get('name');
    await db.user.create({ data: { name } });
    revalidatePath('/users');
  }

  return (
    <form action={createUser}>
      <input name="name" />
      <button type="submit">Create</button>
    </form>
  );
}

// Option 2: Separate file (actions.ts)
'use server';
export async function createUser(formData: FormData) {
  const name = formData.get('name');
  await db.user.create({ data: { name } });
  revalidatePath('/users');
}
```

**From Client Component:**

```typescript
'use client';
import { createUser } from './actions';
import { useFormStatus, useFormState } from 'react-dom';

export function UserForm() {
  const [state, formAction] = useFormState(createUser, null);
  
  return <form action={formAction}>...</form>;
}
```

**Key Benefits:**
1. **Progressive enhancement** - works without JavaScript
2. **Type safety** - TypeScript support
3. **Automatic revalidation** - UI updates automatically
4. **Security** - server-only code, no exposure

**🎯 Revalidation Mnemonic: "PT"**
- **P**ath: `revalidatePath('/users')` - revalidate specific path
- **T**ag: `revalidateTag('users')` - revalidate tagged fetches"

---

## 4. Performance Optimization

### Q: How do you optimize images in Next.js?

**Answer Script:**
"Next.js provides built-in Image component for automatic optimization.

**🎯 Mnemonic: "SLOPPY"**
- **S**izes optimization (responsive)
- **L**azy loading (viewport-based)
- **O**ptimized formats (WebP, AVIF)
- **P**riority loading (LCP images)
- **P**laceholder (blur, empty)
- **Y**ield on demand (not at build time)

```typescript
import Image from 'next/image';

// ✅ Best practices
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={800}
  height={600}
  priority              // For LCP images
  placeholder="blur"    // Blur-up effect
  blurDataURL="data:..." // Or use static import
  sizes="(max-width: 768px) 100vw, 50vw" // Responsive
/>

// Remote images
<Image
  src="https://example.com/photo.jpg"
  alt="Photo"
  width={800}
  height={600}
  // Add domain to next.config.js
/>
```

**next.config.js:**

```javascript
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96],
  },
};
```

**🎯 Priority Decision: "ATF"**
- **A**bove the fold → `priority={true}`
- **T**humbnails → lazy load (default)
- **F**olded content → lazy load (default)"

---

### Q: Explain code splitting strategies in Next.js

**Answer Script:**
"Next.js provides automatic and manual code splitting for optimal bundle sizes.

**🎯 Mnemonic: "RADD"**
- **R**oute-based (automatic)
- **A**uto imports (automatic)
- **D**ynamic imports (manual)
- **D**ynamic components with next/dynamic

**1. Automatic Route Splitting:**
Every page is automatically split into its own bundle.

**2. Dynamic Imports:**

```typescript
import dynamic from 'next/dynamic';

// Component splitting
const DynamicChart = dynamic(() => import('@/components/Chart'), {
  loading: () => <Skeleton />,
  ssr: false, // Disable SSR for this component
});

// Named exports
const DynamicComponent = dynamic(
  () => import('@/components/Heavy').then((mod) => mod.HeavyComponent)
);

// With suspense
const LazyComponent = dynamic(() => import('@/components/Lazy'), {
  suspense: true,
});
```

**3. Library Splitting:**

```typescript
// Before: 50KB library always loaded
import { heavyFunction } from 'heavy-library';

// After: Load only when needed
const handleClick = async () => {
  const { heavyFunction } = await import('heavy-library');
  heavyFunction();
};
```

**🎯 When to Split Mnemonic: "LIRE"**
- **L**arge libraries (charts, editors)
- **I**nteractive only (modals, dialogs)
- **R**arely used (admin panels)
- **E**xternal dependencies (heavy npm packages)"

---

## 5. Routing & Navigation

### Q: How does the Next.js router work and how to optimize navigation?

**Answer Script:**
"Next.js routing is file-system based with client-side navigation.

**🎯 App Router File Conventions: "LEPT"**
- **L**ayout.js (shared UI)
- **E**rror.js (error boundaries)
- **P**age.js (route UI)
- **T**emplate.js (re-mount on navigation)

**Navigation Methods:**

```typescript
// 1. Link Component (preferred)
import Link from 'next/link';

<Link href="/dashboard" prefetch={true}>
  Dashboard
</Link>

// 2. useRouter hook (programmatic)
'use client';
import { useRouter } from 'next/navigation';

function MyComponent() {
  const router = useRouter();
  
  router.push('/dashboard');     // Navigate
  router.replace('/login');      // Replace history
  router.refresh();              // Refresh current route
  router.prefetch('/dashboard'); // Preload
  router.back();                 // Go back
}

// 3. redirect function (Server Components)
import { redirect } from 'next/navigation';

async function getUser() {
  const session = await auth();
  if (!session) redirect('/login');
  return session.user;
}
```

**🎯 Prefetching Behavior: "VIPs"**
- **V**iewport-based (Links in viewport prefetch)
- **I**dle time (during browser idle)
- **P**roduction only (disabled in dev)
- **s**tatic routes (full), dynamic routes (partial)

**Optimization Strategies:**

```typescript
// Disable prefetch for rare routes
<Link href="/admin" prefetch={false}>Admin</Link>

// Loading states
// app/dashboard/loading.tsx
export default function Loading() {
  return <Skeleton />;
}

// Streaming with Suspense
<Suspense fallback={<Spinner />}>
  <SlowComponent />
</Suspense>
```

**🎯 Layout vs Template: "TRUMP"**
- **T**emplate → Re-mounts on navigation
- **R**e-creates state
- **U**se for animations/effects
- **M**aintain → Layout (preserves state)
- **P**ersistent → Layout"

---

## 6. Middleware & Edge

### Q: What is Next.js Middleware and when to use it?

**Answer Script:**
"Middleware runs before a request is completed, enabling logic at the Edge.

**🎯 Mnemonic: "RARE"**
- **R**edirects (A/B testing, auth)
- **A**uthentication checks
- **R**ewrite requests
- **E**dge runtime (globally distributed)

```typescript
// middleware.ts (root level)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Authentication
  const token = request.cookies.get('token');
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 2. Geolocation-based redirects
  const country = request.geo?.country;
  if (country === 'US') {
    return NextResponse.rewrite(new URL('/en-us/products', request.url));
  }

  // 3. A/B Testing
  const bucket = Math.random() < 0.5 ? 'a' : 'b';
  const response = NextResponse.next();
  response.cookies.set('bucket', bucket);
  
  // 4. Custom headers
  response.headers.set('x-custom-header', 'value');
  
  return response;
}

// Configure matcher
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
```

**🎯 Use Cases Mnemonic: "CABIN"**
- **C**ookies manipulation
- **A**uthentication/Authorization
- **B**ot detection
- **I**18n redirects
- **N**etwork-based routing

**Limitations:**
- No Node.js APIs (Edge runtime)
- Response size limits
- Execution time limits (varies by plan)

**🎯 Middleware vs Server Component: "EB vs SC"**
- **E**dge (geo, latency) → Middleware
- **B**efore render → Middleware
- **S**erver APIs (DB, Node) → Server Component
- **C**omplex logic → Server Component"

---

## 7. API Routes & Backend

### Q: How do you structure API routes in App Router?

**Answer Script:**
"App Router uses Route Handlers in `route.ts` files.

**🎯 HTTP Methods Mnemonic: "GPP-DP"**
- **G**ET
- **P**OST
- **P**UT/PATCH
- **D**ELETE
- **P**ermissions (middleware)

```typescript
// app/api/users/route.ts
import { NextResponse, NextRequest } from 'next/server';

// GET /api/users
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page') || '1';
  
  const users = await db.user.findMany({
    skip: (Number(page) - 1) * 10,
    take: 10,
  });
  
  return NextResponse.json(users);
}

// POST /api/users
export async function POST(request: NextRequest) {
  const body = await request.json();
  
  const user = await db.user.create({
    data: body,
  });
  
  return NextResponse.json(user, { status: 201 });
}

// app/api/users/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await db.user.findUnique({
    where: { id: params.id },
  });
  
  if (!user) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  
  return NextResponse.json(user);
}
```

**🎯 Best Practices: "SVELTE"**
- **S**eparate business logic (services layer)
- **V**alidate inputs (Zod, Yup)
- **E**rror handling (try-catch, custom errors)
- **L**ogging (structured logging)
- **T**ype safety (TypeScript)
- **E**nvironment variables (secrets)

**Error Handling:**

```typescript
import { z } from 'zod';

const UserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = UserSchema.parse(body);
    
    const user = await db.user.create({ data: validated });
    return NextResponse.json(user, { status: 201 });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

**🎯 Route Handler vs Server Action: "RACE"**
- **R**EST API → Route Handler
- **A**PI for external → Route Handler
- **C**omponent mutations → Server Action
- **E**xternal clients → Route Handler"

---

## 8. Database & ORM Integration

### Q: How do you integrate databases with Next.js?

**Answer Script:**
"Next.js supports various databases through ORMs and direct connections.

**🎯 Popular Stack Mnemonic: "PPD"**
- **P**risma (ORM)
- **P**ostgreSQL/MySQL (Relational)
- **D**rizzle/MongoDB (Alternative)

**Prisma Setup:**

```typescript
// lib/prisma.ts (Singleton pattern)
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

**Server Component Usage:**

```typescript
import { prisma } from '@/lib/prisma';

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    include: { posts: true },
    where: { active: true },
  });
  
  return <UserList users={users} />;
}
```

**Server Action Usage:**

```typescript
'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createUser(formData: FormData) {
  const user = await prisma.user.create({
    data: {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
    },
  });
  
  revalidatePath('/users');
  return user;
}
```

**🎯 Database Best Practices: "CRISP"**
- **C**onnection pooling (prevent exhaustion)
- **R**euse client instance (singleton)
- **I**ndexing (optimize queries)
- **S**ecurity (parameterized queries, env vars)
- **P**erformance (select only needed fields)

**Edge Considerations:**

```typescript
// For Edge runtime, use HTTP-based DB clients
import { createClient } from '@vercel/postgres';

export const runtime = 'edge';

export async function GET() {
  const client = createClient();
  const { rows } = await client.sql`SELECT * FROM users`;
  return NextResponse.json(rows);
}
```"

---

## 9. Authentication & Security

### Q: How do you implement authentication in Next.js?

**Answer Script:**
"Next.js supports multiple auth strategies using middleware, Server Actions, and third-party libraries.

**🎯 Auth Methods Mnemonic: "JOSE"**
- **J**WT tokens
- **O**Auth (NextAuth.js)
- **S**ession-based
- **E**dge middleware checks

**NextAuth.js (Auth.js) Setup:**

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await verifyCredentials(credentials);
        return user || null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
});

export { handler as GET, handler as POST };
```

**Middleware Protection:**

```typescript
// middleware.ts
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      // Admin routes require admin role
      if (req.nextUrl.pathname.startsWith('/admin')) {
        return token?.role === 'admin';
      }
      return !!token;
    },
  },
});

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
```

**Server Component Auth:**

```typescript
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
  const session = await getServerSession();
  
  if (!session) {
    redirect('/login');
  }
  
  return <Dashboard user={session.user} />;
}
```

**Client Component Auth:**

```typescript
'use client';
import { useSession, signIn, signOut } from 'next-auth/react';

export function UserButton() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') return <Skeleton />;
  
  if (!session) {
    return <button onClick={() => signIn()}>Sign In</button>;
  }
  
  return (
    <div>
      <p>{session.user.name}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
```

**🎯 Security Checklist: "CHOPS"**
- **C**SRF protection (built-in)
- **H**TTP-only cookies
- **O**Auth providers (trusted)
- **P**assword hashing (bcrypt)
- **S**ecure headers (middleware)"

---

## 10. Testing Strategies

### Q: How do you test Next.js applications?

**Answer Script:**
"Next.js apps require unit, integration, and E2E testing strategies.

**🎯 Testing Pyramid: "JUICE"**
- **J**est (unit tests)
- **U**nit tests (components, utils)
- **I**ntegration (API routes)
- **C**ypress/Playwright (E2E)
- **E**2E coverage (critical paths)

**Jest + React Testing Library:**

```typescript
// components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

**Testing Server Components:**

```typescript
// app/users/page.test.tsx
import { render, screen } from '@testing-library/react';
import UsersPage from './page';

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ id: 1, name: 'John' }]),
  })
) as jest.Mock;

describe('UsersPage', () => {
  it('renders user list', async () => {
    const jsx = await UsersPage(); // Server Component
    render(jsx);
    
    expect(await screen.findByText('John')).toBeInTheDocument();
  });
});
```

**API Route Testing:**

```typescript
// app/api/users/route.test.ts
import { GET } from './route';
import { NextRequest } from 'next/server';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findMany: jest.fn().mockResolvedValue([{ id: 1, name: 'John' }]),
    },
  },
}));

describe('GET /api/users', () => {
  it('returns users', async () => {
    const request = new NextRequest('http://localhost:3000/api/users');
    const response = await GET(request);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data).toHaveLength(1);
    expect(data[0].name).toBe('John');
  });
});
```

**Playwright E2E:**

```typescript
// e2e/login.spec.ts
import { test, expect } from '@playwright/test';

test('user can login', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  
  await expect(page).toHaveURL('/dashboard');
  await expect(page.locator('h1')).toContainText('Dashboard');
});
```

**🎯 Test Coverage Mnemonic: "CRISP"**
- **C**ritical paths (auth, checkout)
- **R**egressions (bug fixes)
- **I**ntegrations (API routes)
- **S**napshots (UI consistency)
- **P**erformance (Lighthouse CI)"

---

## 11. Deployment & Production

### Q: What are best practices for deploying Next.js to production?

**Answer Script:**
"Next.js can be deployed to various platforms with specific optimizations.

**🎯 Deployment Platforms: "VANS"**
- **V**ercel (native, automatic)
- **A**WS (Amplify, ECS, Lambda)
- **N**etlify
- **S**elf-hosted (Docker, Node)

**Production Checklist: 🎯 "COMPILES"**
- **C**aching configured (ISR, CDN)
- **O**utput configuration (standalone, export)
- **M**onitoring (analytics, error tracking)
- **P**erformance optimized (images, fonts)
- **I**nternationalization (i18n)
- **L**ogging (structured)
- **E**nvironment variables (secrets)
- **S**ecurity headers

**next.config.js Production Settings:**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone for Docker
  output: 'standalone',
  
  // Production optimizations
  swcMinify: true,
  compress: true,
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval'",
          },
        ],
      },
    ];
  },
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;
```

**Docker Deployment:**

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

**Environment Variables:**

```bash
# .env.production
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="https://production.com"
```

**🎯 Performance Monitoring: "SLAB"**
- **S**entry (error tracking)
- **L**ighthouse CI (performance scores)
- **A**nalytics (Web Vitals)
- **B**undle analysis (webpack-bundle-analyzer)"

---

## 12. Advanced Patterns

### Q: Explain Streaming and Suspense in Next.js

**Answer Script:**
"Streaming allows progressive UI rendering, improving perceived performance.

**🎯 Streaming Benefits: "FIST"**
- **F**aster First Contentful Paint
- **I**mmediate loading states
- **S**maller Time to Interactive
- **T**ime to First Byte improved

**Implementation:**

```typescript
// app/dashboard/page.tsx
import { Suspense } from 'react';

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Fast component renders immediately */}
      <UserGreeting />
      
      {/* Slow component streams in */}
      <Suspense fallback={<ChartSkeleton />}>
        <AnalyticsChart />
      </Suspense>
      
      <Suspense fallback={<TableSkeleton />}>
        <RecentOrders />
      </Suspense>
    </div>
  );
}

// Slow component
async function AnalyticsChart() {
  const data = await fetchAnalytics(); // 2-3 seconds
  return <Chart data={data} />;
}

async function RecentOrders() {
  const orders = await fetchOrders(); // 1-2 seconds
  return <OrdersTable orders={orders} />;
}
```

**Route-level Loading:**

```typescript
// app/dashboard/loading.tsx
export default function Loading() {
  return <DashboardSkeleton />;
}
```

**🎯 Streaming Strategies: "PCS"**
- **P**arallel data fetching (multiple Suspense)
- **C**ritical first (hero above, details below)
- **S**keleton UI (loading states)

**Progressive Enhancement:**

```typescript
// Immediately show static content, stream dynamic
export default function ProductPage({ params }) {
  return (
    <div>
      {/* Static product info */}
      <ProductHero productId={params.id} />
      
      {/* Stream reviews */}
      <Suspense fallback={<ReviewsSkeleton />}>
        <ProductReviews productId={params.id} />
      </Suspense>
      
      {/* Stream recommendations */}
      <Suspense fallback={<RecommendationsSkeleton />}>
        <Recommendations productId={params.id} />
      </Suspense>
    </div>
  );
}
```"

---

## 13. Common Pitfalls & Gotchas

### Q: What are common mistakes with Next.js App Router?

**Answer Script:**
"**🎯 Top Pitfalls: "CACHE-MISS"**

**C - Client Components Everywhere**
❌ Problem: Adding 'use client' to every file
```typescript
// ❌ Bad
'use client';
export default function Page() {
  return <StaticContent />; // Doesn't need interactivity
}

// ✅ Good - Keep Server Component by default
export default function Page() {
  return (
    <>
      <StaticContent />
      <InteractiveWidget /> {/* Only this needs 'use client' */}
    </>
  );
}
```

**A - Awaiting Non-Promises**
❌ Problem: Forgetting async/await in Server Components
```typescript
// ❌ Bad
export default function Page() {
  const data = fetchData(); // Returns Promise
  return <div>{data.name}</div>; // Error!
}

// ✅ Good
export default async function Page() {
  const data = await fetchData();
  return <div>{data.name}</div>;
}
```

**C - Cache Not Revalidated**
❌ Problem: Data stays stale after mutations
```typescript
// ❌ Bad
'use server';
export async function updateUser(id, data) {
  await db.user.update({ where: { id }, data });
  // Forgot revalidation!
}

// ✅ Good
'use server';
import { revalidatePath } from 'next/cache';

export async function updateUser(id, data) {
  await db.user.update({ where: { id }, data });
  revalidatePath('/users');
  revalidatePath(`/users/${id}`);
}
```

**H - Headers/Cookies in Static Routes**
❌ Problem: Using dynamic functions in static rendering
```typescript
// ❌ Bad - Forces dynamic rendering unexpectedly
export default async function Page() {
  const theme = cookies().get('theme'); // Oops!
  return <div>...</div>;
}

// ✅ Good - Be intentional
export const dynamic = 'force-dynamic'; // Explicit

export default async function Page() {
  const theme = cookies().get('theme');
  return <div>...</div>;
}
```

**E - Environment Variables Client-Side**
❌ Problem: Exposing server secrets to client
```typescript
// ❌ Bad
'use client';
const API_KEY = process.env.SECRET_KEY; // Undefined or exposed!

// ✅ Good - Use NEXT_PUBLIC_ prefix for client
const PUBLIC_KEY = process.env.NEXT_PUBLIC_API_KEY;

// Server-only secrets in Server Components/Actions
```

**M - Metadata Not Exported**
❌ Problem: Missing SEO metadata
```typescript
// ❌ Bad
export default function Page() {
  return <div>...</div>;
}

// ✅ Good
export const metadata = {
  title: 'My Page',
  description: 'Page description',
};

export default function Page() {
  return <div>...</div>;
}
```

**I - Import Order Issues**
❌ Problem: Server/Client boundary violations
```typescript
// ❌ Bad - Client Component importing Server Component
'use client';
import ServerComponent from './ServerComponent'; // Error!

// ✅ Good - Pass as children
'use client';
export function ClientWrapper({ children }) {
  return <div>{children}</div>;
}

// In Server Component
<ClientWrapper>
  <ServerComponent />
</ClientWrapper>
```

**S - Serialization Errors**
❌ Problem: Passing non-serializable props
```typescript
// ❌ Bad
<ClientComponent onComplete={() => console.log('done')} /> // Error!

// ✅ Good - Use Server Actions
'use server';
async function handleComplete() {
  console.log('done');
}

<ClientComponent onComplete={handleComplete} />
```

**S - Suspense Boundaries Missing**
❌ Problem: Slow components block entire page
```typescript
// ❌ Bad
export default async function Page() {
  const slowData = await fetchSlowData(); // Blocks everything
  return <div>...</div>;
}

// ✅ Good
export default function Page() {
  return (
    <Suspense fallback={<Skeleton />}>
      <SlowComponent />
    </Suspense>
  );
}
```"

---

## 14. Quick Reference Cards

### 📋 Rendering Decision Tree

```
Need dynamic data per request?
├─ YES → SSR (force-dynamic or cookies/headers)
└─ NO
   └─ Content changes occasionally?
      ├─ YES → ISR (revalidate: X seconds)
      └─ NO → SSG (default)
```

### 📋 Component Type Decision

```
Component needs:
├─ Interactivity (onClick, useState, useEffect)?
│  └─ YES → Client Component ('use client')
├─ Server-only access (DB, secrets)?
│  └─ YES → Server Component (default)
└─ Static content?
   └─ Server Component (default)
```

### 📋 Data Fetching Cheat Sheet

| Method | When | Where | Caching |
|--------|------|-------|---------|
| Server Component | Fetch at render | Server | Yes (default) |
| Server Action | Mutations | Server | No |
| Route Handler | External API | Server | Configurable |
| use client + useEffect | Client-only | Browser | No (unless SWR) |

### 📋 File Conventions

| File | Purpose | Must Export |
|------|---------|-------------|
| page.tsx | Route UI | default |
| layout.tsx | Shared UI | default |
| loading.tsx | Loading UI | default |
| error.tsx | Error UI | default (Client) |
| not-found.tsx | 404 UI | default |
| route.tsx | API endpoint | GET/POST/etc |
| template.tsx | Re-mountable UI | default |

---

## 15. Final Interview Tips

### 🎯 STAR Method for Behavioral: "STAR"
- **S**ituation (context)
- **T**ask (challenge)
- **A**ction (what you did)
- **R**esult (outcome, metrics)

### 🎯 System Design Approach: "RESHAPES"
- **R**equirements (functional, non-functional)
- **E**stimate capacity (users, requests)
- **S**ketch high-level design
- **H**andle bottlenecks
- **A**PI design
- **P**ersistence (database schema)
- **E**xtensions (monitoring, analytics)
- **S**ecurity considerations

### 🎯 Code Architecture: "SOLID"
- **S**ingle Responsibility
- **O**pen/Closed
- **L**iskov Substitution
- **I**nterface Segregation
- **D**ependency Inversion

### 🎯 Performance Metrics: "RAILS"
- **R**esponse time
- **A**ccessibility
- **I**nteractivity (TTI)
- **L**argest Contentful Paint
- **S**tability (CLS)

---

## 🧠 Master Mnemonic Summary

**NEXT.JS CORE = "SISTER GLASS RAMP"**
- **SISTER** = Rendering patterns
- **GLASS** = Data fetching hierarchy
- **RAMP** = App Router features (-IT)

**OPTIMIZATION = "SLOPPY RADD LIRE"**
- **SLOPPY** = Image optimization
- **RADD** = Code splitting
- **LIRE** = When to split

**PRODUCTION = "COMPILES + VANS"**
- **COMPILES** = Production checklist
- **VANS** = Deployment platforms

**AVOID = "CACHE-MISS"**
- Common pitfalls to avoid

---

## 💡 Interview Day Checklist

✅ Review core rendering patterns (SSG, SSR, ISR, RSC)
✅ Practice explaining Server Components vs Client Components
✅ Know App Router file conventions by heart
✅ Prepare 2-3 Next.js projects to discuss (with metrics)
✅ Review performance optimization techniques
✅ Understand deployment strategies (Vercel, Docker, AWS)
✅ Practice live coding: build a simple app router page
✅ Prepare questions about their Next.js architecture
✅ Know your STAR stories (3 technical, 2 leadership, 1 failure)
✅ Sleep well, arrive early, stay confident! 🚀

---

Good luck with your Senior Next.js Engineer interview! 🎉
Remember: You've got the skills, now show them your expertise with confidence!
