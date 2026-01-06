import { TopicQuestion } from '../types';

export const nextjsQuestions: TopicQuestion[] = [
  {
    id: 'nextjs-1',
    topic: 'Next.js',
    question: 'What is Next.js and why would you use it over plain React?',
    answer: `Next.js is a **React framework** that adds production-ready features out of the box.

**Why choose Next.js over plain React:**

| Feature | Plain React | Next.js |
|---------|-------------|---------|
| **Rendering** | Client-only | SSR, SSG, ISR |
| **Routing** | Need React Router | Built-in file-based |
| **SEO** | Poor | Excellent |
| **Code Splitting** | Manual | Automatic |
| **API Routes** | Need separate server | Built-in |

**Key benefits:**
- Better **performance** (pre-rendering)
- Improved **SEO** (server-rendered HTML)
- File-based **routing**
- Zero config, works out of the box`,
    difficulty: 'Easy'
  },
  {
    id: 'nextjs-2',
    topic: 'Next.js',
    question: 'Explain the difference between getStaticProps and getServerSideProps.',
    answer: `Both fetch data for pages, but at different times:

| Feature | \`getStaticProps\` | \`getServerSideProps\` |
|---------|------------------|----------------------|
| **When runs** | Build time | Every request |
| **Output** | Static HTML | Fresh HTML |
| **Speed** | Very fast (CDN) | Slower (server) |
| **Use case** | Blog, docs | Dashboard, user data |

\`\`\`typescript
// Build time (SSG)
export async function getStaticProps() {
  const posts = await fetchPosts();
  return { props: { posts } };
}

// Request time (SSR)
export async function getServerSideProps(context) {
  const user = await fetchUser(context.req.cookies.token);
  return { props: { user } };
}
\`\`\`

**Rule of thumb:** Use \`getStaticProps\` unless data must be fresh per request.`,
    difficulty: 'Medium'
  },
  {
    id: 'nextjs-3',
    topic: 'Next.js',
    question: 'What is Static Site Generation (SSG) in Next.js?',
    answer: `SSG pre-renders pages to **static HTML at build time**.

**How it works:**
1.  During \`next build\`, pages are generated
2.  HTML is deployed to CDN
3.  Users get instant page loads

\`\`\`typescript
// pages/blog/[slug].tsx
export async function getStaticPaths() {
  const posts = await getAllPosts();
  return {
    paths: posts.map(p => ({ params: { slug: p.slug } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const post = await getPost(params.slug);
  return { props: { post } };
}
\`\`\`

**Best for:**
- Marketing pages
- Blog posts
- Documentation
- E-commerce product pages`,
    difficulty: 'Easy'
  },
  {
    id: 'nextjs-4',
    topic: 'Next.js',
    question: 'What is Incremental Static Regeneration (ISR)?',
    answer: `ISR lets you **update static pages after deployment** without rebuilding the entire site.

**How it works:**
\`\`\`typescript
export async function getStaticProps() {
  const data = await fetchData();
  return {
    props: { data },
    revalidate: 60 // Regenerate every 60 seconds
  };
}
\`\`\`

**Timeline:**
1.  Page built at deploy time
2.  User requests page → Serves cached version
3. After 60s, next request triggers background regeneration
4.  New version replaces old cache

**Benefits:**
- Static performance + fresh data
- Scales to millions of pages
- Lower server costs than SSR`,
    difficulty: 'Hard'
  },
  {
    id: 'nextjs-5',
    topic: 'Next.js',
    question: 'How does routing work in Next.js?',
    answer: `Next.js uses **file-system based routing**:

\`\`\`
 pages (or app)
├── index.tsx        → /
├── about.tsx        → /about
├── blog/
│   ├── index.tsx    → /blog
│   └── [slug].tsx   → /blog/:slug
└── [...path].tsx    → Catch-all route
\`\`\`

**Dynamic routes:**
\`\`\`typescript
// pages/blog/[slug].tsx
import { useRouter } from 'next/router';

export default function Post() {
  const { slug } = useRouter().query;
  return <h1>Post: {slug}</h1>;
}
\`\`\`

**App Router (Next.js 13+):**
\`\`\`
 app
├── page.tsx           → /
├── about/page.tsx     → /about
└── blog/[slug]/page.tsx → /blog/:slug
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'nextjs-6',
    topic: 'Next.js',
    question: 'What are API Routes in Next.js?',
    answer: `API Routes let you build **serverless API endpoints** within your Next.js app.

\`\`\`typescript
// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const users = await db.users.findMany();
    res.status(200).json(users);
  } else if (req.method === 'POST') {
    const user = await db.users.create({ data: req.body });
    res.status(201).json(user);
  }
}
\`\`\`

**Key features:**
- File-based routing (\`/api/*\`)
- Server-side only (secrets are safe)
- Serverless deployment
- No separate backend needed

**Use cases:** Authentication, form submissions, database queries`,
    difficulty: 'Medium'
  },
  {
    id: 'nextjs-7',
    topic: 'Next.js',
    question: 'Explain the purpose of the "Link" component.',
    answer: `The \`Link\` component enables client-side transitions between routes. It prefetches the linked page in the background, making navigation near-instant.`,
    difficulty: 'Easy'
  },
  {
    id: 'nextjs-8',
    topic: 'Next.js',
    question: 'What is the "Image" component in Next.js and what are its benefits?',
    answer: `The \`Image\` component extends the standard HTML \`<img>\` tag with automatic image optimization. It handles resizing, lazy loading, and serving images in modern formats like WebP to improve performance and Core Web Vitals.`,
    difficulty: 'Medium'
  },
  {
    id: 'nextjs-9',
    topic: 'Next.js',
    question: 'How do you handle dynamic routes in Next.js?',
    answer: `Create a file with square brackets in the filename, e.g., \`[id].js\`. You can access the dynamic parameter via the \`useRouter\` hook (client-side) or the \`params\` object in \`getStaticProps\`/\`getServerSideProps\`.`,
    difficulty: 'Medium'
  },
  {
    id: 'nextjs-10',
    topic: 'Next.js',
    question: 'What is the purpose of "_app.js" (or layout.tsx in App Router)?',
    answer: `It wraps all pages in your application. You use it to keep state when navigating between pages, add global styles, or inject additional data into pages.`,
    difficulty: 'Medium'
  },
  {
    id: 'nextjs-11',
    topic: 'Next.js',
    question: 'What is the purpose of "_document.js"?',
    answer: `\`_document.js\` allows you to customize the \`<html>\` and \`<body>\` tags. It is only rendered on the server, so event handlers like onClick won't work there.`,
    difficulty: 'Medium'
  },
  {
    id: 'nextjs-12',
    topic: 'Next.js',
    question: 'How does Next.js handle environment variables?',
    answer: `Next.js has built-in support for \`.env\` files. Variables prefixed with \`NEXT_PUBLIC_\` are exposed to the browser. Others are only available on the server.`,
    difficulty: 'Easy'
  },
  {
    id: 'nextjs-13',
    topic: 'Next.js',
    question: 'What is the difference between the Pages Router and the App Router?',
    answer: `The Pages Router is the original file-system router. The App Router (introduced in Next.js 13) uses React Server Components, supports nested layouts, and offers better performance and data fetching patterns.`,
    difficulty: 'Hard'
  },
  {
    id: 'nextjs-14',
    topic: 'Next.js',
    question: 'What are React Server Components (RSC) in Next.js?',
    answer: `RSCs allow you to render components on the server and send only the HTML to the client, reducing the JavaScript bundle size. They can directly access the database or filesystem.`,
    difficulty: 'Hard'
  },
  {
    id: 'nextjs-15',
    topic: 'Next.js',
    question: 'How do you fetch data in the App Router?',
    answer: `In the App Router, you can fetch data directly inside Server Components using \`async/await\`. You can also use \`fetch\` with caching options to control static/dynamic behavior.`,
    difficulty: 'Medium'
  },
  {
    id: 'nextjs-16',
    topic: 'Next.js',
    question: 'What is Middleware in Next.js?',
    answer: `Next.js Middleware allows you to run code before a request is completed. You can modify the response, rewrite, redirect, modify headers, or check authentication.`,
    difficulty: 'Hard'
  },
  {
    id: 'nextjs-17',
    topic: 'Next.js',
    question: 'How do you optimize fonts in Next.js?',
    answer: `Use \`next/font\` to automatically optimize and load fonts. It downloads Google Fonts at build time and hosts them locally, preventing layout shift (CLS).`,
    difficulty: 'Easy'
  },
  {
    id: 'nextjs-18',
    topic: 'Next.js',
    question: 'What is "getStaticPaths"?',
    answer: `When using dynamic routes with \`getStaticProps\`, \`getStaticPaths\` defines which paths should be pre-rendered at build time.`,
    difficulty: 'Medium'
  },
  {
    id: 'nextjs-19',
    topic: 'Next.js',
    question: 'How do you handle 404 pages in Next.js?',
    answer: `Create a \`404.js\` (or \`not-found.tsx\` in App Router) file in your pages/app directory to customize the 404 error page.`,
    difficulty: 'Easy'
  },
  {
    id: 'nextjs-20',
    topic: 'Next.js',
    question: 'What is Fast Refresh?',
    answer: `Fast Refresh is a Next.js feature that gives you instantaneous feedback on edits made to your React components, preserving component state.`,
    difficulty: 'Easy'
  },
  {
    id: 'nextjs-21',
    topic: 'Next.js',
    question: 'How do you deploy a Next.js application?',
    answer: `The easiest way is using Vercel (creators of Next.js). You can also build it as a Node.js app (\`next build && next start\`) or export it as a static site (\`next export\`) to deploy on any static host.`,
    difficulty: 'Medium'
  },
  {
    id: 'nextjs-22',
    topic: 'Next.js',
    question: 'What is the "Head" component used for?',
    answer: `The \`Head\` component allows you to append elements to the \`<head>\` of the page, such as title, meta tags, and external stylesheets.`,
    difficulty: 'Easy'
  },
  {
    id: 'nextjs-23',
    topic: 'Next.js',
    question: 'Can you use CSS Modules in Next.js?',
    answer: `Yes, Next.js supports CSS Modules out of the box for files named \`[name].module.css\`. This scopes CSS locally to the component.`,
    difficulty: 'Easy'
  },
  {
    id: 'nextjs-24',
    topic: 'Next.js',
    question: 'What is the "fallback" key in getStaticPaths?',
    answer: `It determines behavior for paths not returned by getStaticPaths. 'false' returns 404. 'true' serves a fallback version while generating the page. 'blocking' waits for generation (SSR-like) before serving.`,
    difficulty: 'Hard'
  },
  {
    id: 'nextjs-25',
    topic: 'Next.js',
    question: 'How do you enable TypeScript in a Next.js project?',
    answer: `Create a \`tsconfig.json\` file and run \`npm run dev\`. Next.js will automatically configure TypeScript and install necessary packages.`,
    difficulty: 'Easy'
  },
  {
    id: 'nextjs-26',
    topic: 'Next.js',
    question: 'What are Server Actions in Next.js?',
    answer: `Server Actions are async functions that run on the server, enabling data mutations without API routes.

\`\`\`typescript
// app/actions.ts
'use server'

export async function createPost(formData: FormData) {
  const title = formData.get('title');
  await db.post.create({ data: { title } });
  revalidatePath('/posts');
}

// Component
<form action={createPost}>
  <input name="title" />
  <button type="submit">Create</button>
</form>
\`\`\`

**Benefits:**
- No API routes for mutations
- Progressive enhancement (works without JS)
- Automatic form handling
- Built-in security (closure over server data)`,
    difficulty: 'Hard'
  },
  {
    id: 'nextjs-27',
    topic: 'Next.js',
    question: 'Explain the caching strategies in Next.js App Router.',
    answer: `**Request Memoization:** Deduplicates fetch calls in the same render pass.

**Data Cache:** Stores fetch results across requests and deployments.
\`\`\`typescript
fetch(url, { cache: 'force-cache' }) // Default
fetch(url, { cache: 'no-store' })    // No caching
fetch(url, { next: { revalidate: 60 } }) // Time-based
\`\`\`

**Full Route Cache:** Pre-rendered static routes at build time.

**Router Cache:** Client-side cache for visited routes.

**Revalidation:**
\`\`\`typescript
// Time-based
export const revalidate = 60;

// On-demand
revalidatePath('/posts');
revalidateTag('posts');
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'nextjs-28',
    topic: 'Next.js',
    question: 'What are Parallel Routes in Next.js?',
    answer: `Parallel Routes allow rendering multiple pages in the same layout simultaneously using slots.

**File structure:**
\`\`\`
app/
  layout.tsx
  @team/page.tsx
  @analytics/page.tsx
  page.tsx
\`\`\`

**Layout:**
\`\`\`typescript
export default function Layout({
  children,
  team,
  analytics
}: {
  children: React.ReactNode;
  team: React.ReactNode;
  analytics: React.ReactNode;
}) {
  return (
    <>
      {children}
      {team}
      {analytics}
    </>
  );
}
\`\`\`

**Use cases:**
- Dashboards with multiple widgets
- Modals with independent routing
- Split views`,
    difficulty: 'Hard'
  },
  {
    id: 'nextjs-29',
    topic: 'Next.js',
    question: 'What are Intercepting Routes?',
    answer: `Intercepting Routes allow you to load a route within the current layout while showing a different URL.

**Convention:**
- \`(.)\` matches same level
- \`(..)\` matches one level above
- \`(..)(..)\` matches two levels above
- \`(...)\` matches from root

**Example - Photo Modal:**
\`\`\`
app/
  feed/
    page.tsx  (shows feed)
    @modal/
      (..)photo/[id]/page.tsx  (modal view)
  photo/
    [id]/page.tsx  (full page view)
\`\`\`

Clicking a photo shows it in a modal (intercepted), but direct URL shows full page.`,
    difficulty: 'Hard'
  },
  {
    id: 'nextjs-30',
    topic: 'Next.js',
    question: 'How does Streaming work in Next.js?',
    answer: `Streaming allows progressive rendering - sending parts of the page as they're ready.

**With loading.tsx:**
\`\`\`typescript
// app/dashboard/loading.tsx
export default function Loading() {
  return <DashboardSkeleton />;
}

// app/dashboard/page.tsx
export default async function Dashboard() {
  const data = await slowFetch();
  return <Dashboard data={data} />;
}
\`\`\`

**With Suspense:**
\`\`\`typescript
<Suspense fallback={<Loading />}>
  <SlowComponent />
</Suspense>
\`\`\`

**Benefits:**
- Faster TTFB (Time To First Byte)
- Progressive loading
- Non-blocking data fetching`,
    difficulty: 'Medium'
  },
  {
    id: 'nextjs-31',
    topic: 'Next.js',
    question: 'What is the difference between "use client" and "use server"?',
    answer: `**'use client':** Marks a Client Component boundary.
\`\`\`typescript
'use client'
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
\`\`\`

**'use server':** Marks Server Actions.
\`\`\`typescript
'use server'

export async function submitForm(data: FormData) {
  await db.insert(data);
}
\`\`\`

**Key Differences:**
| Client Component | Server Component |
|-----------------|------------------|
| Has 'use client' | Default (no directive) |
| Can use hooks/browser APIs | Cannot |
| Can have event handlers | Cannot |
| Adds to JS bundle | Zero bundle impact |`,
    difficulty: 'Medium'
  },
  {
    id: 'nextjs-32',
    topic: 'Next.js',
    question: 'How do you handle errors in the App Router?',
    answer: `**error.tsx - Error Boundaries:**
\`\`\`typescript
'use client'
export default function Error({
  error,
  reset
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
\`\`\`

**global-error.tsx - Root errors:**
\`\`\`typescript
'use client'
export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={reset}>Try again</button>
      </body>
    </html>
  );
}
\`\`\`

**not-found.tsx - 404 pages:**
\`\`\`typescript
import { notFound } from 'next/navigation';

if (!post) notFound();
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'nextjs-33',
    topic: 'Next.js',
    question: 'What is Route Groups in Next.js?',
    answer: `Route Groups organize routes without affecting the URL structure using parentheses.

**File structure:**
\`\`\`
app/
  (marketing)/
    about/page.tsx     → /about
    blog/page.tsx      → /blog
    layout.tsx         → Marketing layout
  (shop)/
    products/page.tsx  → /products
    cart/page.tsx      → /cart
    layout.tsx         → Shop layout
\`\`\`

**Use cases:**
- Organize routes by feature/team
- Different layouts for different sections
- Opt-in to specific layouts
- Multiple root layouts`,
    difficulty: 'Medium'
  },
  {
    id: 'nextjs-34',
    topic: 'Next.js',
    question: 'How do you implement authentication in Next.js?',
    answer: `**Using NextAuth.js (Auth.js):**
\`\`\`typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
\`\`\`

**Protecting routes with Middleware:**
\`\`\`typescript
// middleware.ts
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard/:path*'],
};
\`\`\`

**Server Component:**
\`\`\`typescript
import { getServerSession } from 'next-auth';

const session = await getServerSession(authOptions);
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'nextjs-35',
    topic: 'Next.js',
    question: 'What is the generateStaticParams function?',
    answer: `\`generateStaticParams\` replaces \`getStaticPaths\` in the App Router for static generation of dynamic routes.

\`\`\`typescript
// app/posts/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  return <Article post={post} />;
}
\`\`\`

**With multiple dynamic segments:**
\`\`\`typescript
// app/[category]/[product]/page.tsx
export async function generateStaticParams() {
  return [
    { category: 'electronics', product: 'phone' },
    { category: 'electronics', product: 'laptop' },
  ];
}
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'nextjs-36',
    topic: 'Next.js',
    question: 'What is generateMetadata and how do you use it?',
    answer: `\`generateMetadata\` dynamically generates page metadata for SEO.

\`\`\`typescript
import type { Metadata } from 'next';

// Static metadata
export const metadata: Metadata = {
  title: 'My App',
  description: 'Welcome to my app',
};

// Dynamic metadata
export async function generateMetadata({ 
  params 
}: { 
  params: { id: string } 
}): Promise<Metadata> {
  const product = await getProduct(params.id);
  
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [product.image],
    },
  };
}
\`\`\`

**Template pattern:**
\`\`\`typescript
// app/layout.tsx
export const metadata = {
  title: {
    template: '%s | My Site',
    default: 'My Site',
  },
};

// app/about/page.tsx
export const metadata = { title: 'About' };
// Results in: "About | My Site"
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'nextjs-37',
    topic: 'Next.js',
    question: 'How do you handle redirects and rewrites in Next.js?',
    answer: `**In next.config.js:**
\`\`\`javascript
module.exports = {
  async redirects() {
    return [
      {
        source: '/old-blog/:slug',
        destination: '/blog/:slug',
        permanent: true, // 308
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ];
  },
};
\`\`\`

**In Middleware:**
\`\`\`typescript
import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  if (someCondition) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.rewrite(new URL('/proxy', request.url));
}
\`\`\`

**In Server Components:**
\`\`\`typescript
import { redirect } from 'next/navigation';

if (!user) redirect('/login');
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'nextjs-38',
    topic: 'Next.js',
    question: 'What is the useSearchParams hook?',
    answer: `\`useSearchParams\` reads the current URL's query string in Client Components.

\`\`\`typescript
'use client'
import { useSearchParams } from 'next/navigation';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const page = searchParams.get('page') || '1';
  
  return <Results query={query} page={page} />;
}
\`\`\`

**Updating search params:**
\`\`\`typescript
import { useRouter, useSearchParams } from 'next/navigation';

function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    router.push(\`?\${params.toString()}\`);
  };
  
  return <button onClick={() => updateFilter('sort', 'price')}>Sort</button>;
}
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'nextjs-39',
    topic: 'Next.js',
    question: 'What is the useRouter hook vs router from next/navigation?',
    answer: `**Pages Router (next/router):**
\`\`\`typescript
import { useRouter } from 'next/router';

const router = useRouter();
router.push('/about');
router.query.id;  // Access query params
router.pathname;  // Current path
router.asPath;    // Full path with query
\`\`\`

**App Router (next/navigation):**
\`\`\`typescript
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const router = useRouter();
router.push('/about');
router.replace('/about');
router.back();
router.forward();
router.refresh();  // Refresh current route

const pathname = usePathname();  // Separate hook
const searchParams = useSearchParams();  // Separate hook
\`\`\`

**Key difference:** App Router splits functionality into separate hooks for better performance.`,
    difficulty: 'Medium'
  },
  {
    id: 'nextjs-40',
    topic: 'Next.js',
    question: 'How do you handle cookies and headers in Next.js?',
    answer: `**In Server Components/Actions:**
\`\`\`typescript
import { cookies, headers } from 'next/headers';

export default async function Page() {
  // Read cookies
  const cookieStore = cookies();
  const theme = cookieStore.get('theme');
  
  // Read headers
  const headersList = headers();
  const userAgent = headersList.get('user-agent');
  
  return <div>Theme: {theme?.value}</div>;
}
\`\`\`

**Setting cookies in Server Actions:**
\`\`\`typescript
'use server'
import { cookies } from 'next/headers';

export async function setTheme(theme: string) {
  cookies().set('theme', theme, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
}
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'nextjs-41',
    topic: 'Next.js',
    question: 'What is the difference between static and dynamic rendering?',
    answer: `**Static Rendering (Default):**
- Routes rendered at build time
- HTML reused for each request
- Cached on CDN

**Dynamic Rendering:**
Triggered by:
\`\`\`typescript
// 1. Using dynamic functions
cookies(), headers(), searchParams

// 2. Opting out of caching
fetch(url, { cache: 'no-store' })

// 3. Route segment config
export const dynamic = 'force-dynamic';

// 4. Uncached data requests
\`\`\`

**Force static:**
\`\`\`typescript
export const dynamic = 'force-static';
export const revalidate = 3600; // ISR
\`\`\`

**Best practice:** Let Next.js auto-detect, but explicitly set when needed.`,
    difficulty: 'Medium'
  },
  {
    id: 'nextjs-42',
    topic: 'Next.js',
    question: 'What are the route segment config options?',
    answer: `Route segment config lets you configure route behavior.

\`\`\`typescript
// Per-page configuration
export const dynamic = 'auto' | 'force-dynamic' | 'error' | 'force-static';
export const dynamicParams = true | false;
export const revalidate = false | 0 | number;
export const fetchCache = 'auto' | 'default-cache' | 'only-cache' | 'force-cache' | 'force-no-store' | 'default-no-store' | 'only-no-store';
export const runtime = 'nodejs' | 'edge';
export const preferredRegion = 'auto' | 'global' | 'home' | string | string[];
\`\`\`

**Example:**
\`\`\`typescript
// app/api/data/route.ts
export const runtime = 'edge';
export const revalidate = 60;

export async function GET() {
  const data = await fetch('...');
  return Response.json(data);
}
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'nextjs-43',
    topic: 'Next.js',
    question: 'How do you implement internationalization (i18n) in Next.js?',
    answer: `**App Router approach:**
\`\`\`
app/
  [lang]/
    page.tsx
    layout.tsx
    dictionaries.ts
\`\`\`

\`\`\`typescript
// app/[lang]/dictionaries.ts
const dictionaries = {
  en: () => import('./dictionaries/en.json').then(m => m.default),
  de: () => import('./dictionaries/de.json').then(m => m.default),
};

export const getDictionary = async (lang: string) => dictionaries[lang]();

// app/[lang]/page.tsx
export default async function Page({ params: { lang } }) {
  const dict = await getDictionary(lang);
  return <h1>{dict.welcome}</h1>;
}
\`\`\`

**Middleware for locale detection:**
\`\`\`typescript
import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'de'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = getLocale(request);
  request.nextUrl.pathname = \`/\${locale}\${pathname}\`;
  return NextResponse.redirect(request.nextUrl);
}
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'nextjs-44',
    topic: 'Next.js',
    question: 'What is Turbopack in Next.js?',
    answer: `Turbopack is a Rust-based bundler that's the successor to Webpack in Next.js.

**Enable Turbopack:**
\`\`\`bash
next dev --turbo
\`\`\`

**Benefits:**
- Up to 700x faster than Webpack
- Native incremental computation
- Written in Rust for performance
- Lazy compilation (only builds what's needed)

**Current Status (Next.js 14+):**
- Development mode
- Production builds (coming)

**Comparison:**
| Feature | Webpack | Turbopack |
|---------|---------|-----------|
| Cold start | Slow | Fast |
| HMR | ~500ms | ~10ms |
| Language | JavaScript | Rust |`,
    difficulty: 'Medium'
  },
  {
    id: 'nextjs-45',
    topic: 'Next.js',
    question: 'How do you implement API rate limiting in Next.js?',
    answer: `**Using Middleware with Upstash:**
\`\`\`typescript
// middleware.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 requests per 10 seconds
});

export async function middleware(request: Request) {
  const ip = request.headers.get('x-forwarded-for');
  const { success, limit, reset, remaining } = await ratelimit.limit(ip!);

  if (!success) {
    return new Response('Rate limit exceeded', {
      status: 429,
      headers: {
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': reset.toString(),
      },
    });
  }
}

export const config = {
  matcher: '/api/:path*',
};
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'nextjs-46',
    topic: 'Next.js',
    question: 'What is the Script component and how do you use it?',
    answer: `The Script component optimizes loading of third-party scripts.

\`\`\`typescript
import Script from 'next/script';

export default function Layout() {
  return (
    <>
      {/* Load before page interactive */}
      <Script src="/analytics.js" strategy="beforeInteractive" />
      
      {/* Load after page hydration (default) */}
      <Script src="/widget.js" strategy="afterInteractive" />
      
      {/* Load during browser idle time */}
      <Script src="/non-critical.js" strategy="lazyOnload" />
      
      {/* Inline script with worker */}
      <Script id="gtag" strategy="worker">
        {\`window.dataLayer = window.dataLayer || [];\`}
      </Script>
      
      {/* With callbacks */}
      <Script 
        src="/script.js"
        onLoad={() => console.log('Loaded')}
        onError={(e) => console.error('Error:', e)}
      />
    </>
  );
}
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'nextjs-47',
    topic: 'Next.js',
    question: 'How do you handle file uploads in Next.js?',
    answer: `**Using Server Actions:**
\`\`\`typescript
// app/actions.ts
'use server'
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function uploadFile(formData: FormData) {
  const file = formData.get('file') as File;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  const path = join(process.cwd(), 'public/uploads', file.name);
  await writeFile(path, buffer);
  
  return { success: true, path: \`/uploads/\${file.name}\` };
}

// Component
'use client'
export default function UploadForm() {
  async function handleSubmit(formData: FormData) {
    const result = await uploadFile(formData);
    console.log(result);
  }
  
  return (
    <form action={handleSubmit}>
      <input type="file" name="file" />
      <button type="submit">Upload</button>
    </form>
  );
}
\`\`\`

**Note:** For production, use cloud storage (S3, Cloudinary, etc.)`,
    difficulty: 'Medium'
  },
  {
    id: 'nextjs-48',
    topic: 'Next.js',
    question: 'What is the useFormStatus hook?',
    answer: `\`useFormStatus\` provides the pending state of a parent form.

\`\`\`typescript
'use client'
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending, data, method, action } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}

// Usage
export default function Form() {
  return (
    <form action={serverAction}>
      <input name="email" />
      <SubmitButton /> {/* Must be inside form */}
    </form>
  );
}
\`\`\`

**Key points:**
- Must be used in a child component of the form
- Returns pending state during Server Action execution
- Works with both Server Actions and regular form submissions`,
    difficulty: 'Medium'
  },
  {
    id: 'nextjs-49',
    topic: 'Next.js',
    question: 'What is the useFormState hook?',
    answer: `\`useFormState\` manages form state with Server Actions, handling errors and return values.

\`\`\`typescript
'use server'
export async function createUser(prevState: any, formData: FormData) {
  const email = formData.get('email');
  
  if (!email) {
    return { error: 'Email is required' };
  }
  
  try {
    await db.user.create({ data: { email } });
    return { success: true };
  } catch (e) {
    return { error: 'Failed to create user' };
  }
}

// Component
'use client'
import { useFormState } from 'react-dom';

export default function Form() {
  const [state, formAction] = useFormState(createUser, { error: null });
  
  return (
    <form action={formAction}>
      <input name="email" />
      {state.error && <p className="error">{state.error}</p>}
      <button type="submit">Create User</button>
    </form>
  );
}
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'nextjs-50',
    topic: 'Next.js',
    question: 'How do you implement SEO best practices in Next.js?',
    answer: `**1. Metadata API:**
\`\`\`typescript
export const metadata = {
  title: 'Page Title',
  description: 'Page description',
  openGraph: {
    title: 'OG Title',
    description: 'OG Description',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};
\`\`\`

**2. Sitemap:**
\`\`\`typescript
// app/sitemap.ts
export default async function sitemap() {
  const posts = await getPosts();
  return [
    { url: 'https://example.com', lastModified: new Date() },
    ...posts.map(post => ({
      url: \`https://example.com/posts/\${post.slug}\`,
      lastModified: post.updatedAt,
    })),
  ];
}
\`\`\`

**3. Robots.txt:**
\`\`\`typescript
// app/robots.ts
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://example.com/sitemap.xml',
  };
}
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'nextjs-51',
    topic: 'Next.js',
    question: 'What are Loading UI and Streaming in Next.js?',
    answer: `**loading.tsx - Instant Loading States:**
\`\`\`typescript
// app/dashboard/loading.tsx
export default function Loading() {
  return <DashboardSkeleton />;
}
\`\`\`

**How it works:**
1. Next.js wraps page in Suspense with loading.tsx as fallback
2. Streams the shell immediately
3. Swaps in the content when ready

**Combining with Suspense for granular control:**
\`\`\`typescript
// app/dashboard/page.tsx
export default function Dashboard() {
  return (
    <>
      <Header />  {/* Shows immediately */}
      
      <Suspense fallback={<StatsSkeleton />}>
        <Stats />  {/* Streams when ready */}
      </Suspense>
      
      <Suspense fallback={<ChartSkeleton />}>
        <Chart />  {/* Streams independently */}
      </Suspense>
    </>
  );
}
\`\`\`

This enables progressive page loading - users see content as it becomes available.`,
    difficulty: 'Medium'
  },
  {
    id: 'nextjs-52',
    topic: 'Next.js',
    question: 'What is PPR (Partial Prerendering) in Next.js?',
    answer: `Partial Prerendering combines static and dynamic content in a single route.

**How it works:**
1. Static shell is prerendered at build time
2. Dynamic holes are streamed at request time
3. No route-level static/dynamic choice needed

\`\`\`typescript
// next.config.js
module.exports = {
  experimental: {
    ppr: true,
  },
};

// app/page.tsx
export default function Page() {
  return (
    <main>
      <StaticHeader />  {/* Prerendered */}
      <StaticNav />     {/* Prerendered */}
      
      <Suspense fallback={<Loading />}>
        <DynamicContent /> {/* Streamed */}
      </Suspense>
      
      <StaticFooter />  {/* Prerendered */}
    </main>
  );
}
\`\`\`

**Benefits:**
- Best of static (fast TTFB) and dynamic (personalization)
- Automatic detection of dynamic boundaries
- Single deployment for both`,
    difficulty: 'Hard'
  },
  {
    id: 'nextjs-53',
    topic: 'Next.js',
    question: 'How do you test Next.js applications?',
    answer: `**Unit Tests with Jest:**
\`\`\`typescript
// __tests__/component.test.tsx
import { render, screen } from '@testing-library/react';
import Button from '@/components/Button';

test('renders button', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button')).toHaveTextContent('Click me');
});
\`\`\`

**E2E Tests with Playwright:**
\`\`\`typescript
// e2e/home.spec.ts
import { test, expect } from '@playwright/test';

test('homepage has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/My App/);
});

test('navigation works', async ({ page }) => {
  await page.goto('/');
  await page.click('text=About');
  await expect(page).toHaveURL('/about');
});
\`\`\`

**Testing Server Actions:**
\`\`\`typescript
// Mock the database
jest.mock('@/lib/db');

test('createUser action', async () => {
  const formData = new FormData();
  formData.set('email', 'test@test.com');
  
  const result = await createUser(formData);
  expect(result.success).toBe(true);
});
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'nextjs-54',
    topic: 'Next.js',
    question: 'What is the Edge Runtime in Next.js?',
    answer: `Edge Runtime runs code on CDN edge servers for low latency.

\`\`\`typescript
// Enable for API routes
export const runtime = 'edge';

export async function GET(request: Request) {
  return new Response('Hello from the edge!');
}

// Enable for pages
export const runtime = 'edge';

export default function Page() {
  return <div>Edge rendered page</div>;
}
\`\`\`

**Limitations vs Node.js runtime:**
- No file system access
- Limited Node.js APIs
- Max 25 seconds execution time
- Smaller package size limits

**When to use:**
- Low latency requirements
- Geographically distributed users
- Simple computations
- Authentication/authorization checks

**When to avoid:**
- Database connections (use serverless DB)
- File operations
- Heavy computation`,
    difficulty: 'Hard'
  },
  {
    id: 'nextjs-55',
    topic: 'Next.js',
    question: 'How do you handle environment variables in Next.js App Router?',
    answer: `**Server-only variables:**
\`\`\`bash
# .env.local
DATABASE_URL=postgres://...
API_SECRET=secret123
\`\`\`

\`\`\`typescript
// Server Component or Server Action
const db = process.env.DATABASE_URL;  // Works
\`\`\`

**Client-exposed variables:**
\`\`\`bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
\`\`\`

\`\`\`typescript
// Any component
const apiUrl = process.env.NEXT_PUBLIC_API_URL;  // Works
\`\`\`

**Environment priority:**
1. process.env
2. .env.local (not in production on Vercel)
3. .env.development / .env.production
4. .env

**Type safety:**
\`\`\`typescript
// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    NEXT_PUBLIC_API_URL: string;
  }
}
\`\`\``,
    difficulty: 'Easy'
  }
];
