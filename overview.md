# InterviewJS - Complete Project Overview

> **Comprehensive technical documentation for interview preparation**

---

## Table of Contents

1. [What is InterviewJS?](#what-is-interviewjs)
2. [Why I Built This](#why-i-built-this)
3. [Tech Stack & Reasoning](#tech-stack--reasoning)
4. [Architecture Deep Dive](#architecture-deep-dive)
5. [Project Structure](#project-structure)
6. [Key Features Implementation](#key-features-implementation)
7. [Data Flow & State Management](#data-flow--state-management)
8. [Authentication System](#authentication-system)
9. [Database Design](#database-design)
10. [API Routes](#api-routes)
11. [Component Architecture](#component-architecture)
12. [Design Decisions & Trade-offs](#design-decisions--trade-offs)
13. [Common Interview Questions](#common-interview-questions)

---

## What is InterviewJS?

InterviewJS is a **full-stack web application** designed to help developers master JavaScript, TypeScript, and related web technologies through interactive coding challenges and quizzes.

### Core Concept

- **70+ curated coding problems** across 11 different technologies
- **Real-time code execution** with Monaco Editor (VS Code's editor)
- **Progress tracking** persisted to MongoDB
- **Gamified learning** with solved/attempted/unsolved status tracking
- **Quiz system** for theoretical knowledge testing

### Technologies Covered

| Frontend | Backend | Database |
|----------|---------|----------|
| JavaScript | Node.js | MongoDB |
| TypeScript | Express | PostgreSQL (theory) |
| React | Next.js | Prisma (ORM) |
| HTML/CSS | - | - |

---

## Why I Built This

### Problem Statement

1. **Scattered learning resources** - Interview prep content is fragmented across multiple platforms
2. **No personalized tracking** - Hard to track what you've practiced
3. **Theoretical vs Practical gap** - Most resources are theory-heavy, lacking hands-on coding

### Solution

InterviewJS combines:
- **Interactive code challenges** with instant feedback
- **Theory-based quizzes** for conceptual understanding
- **Personal progress dashboard** showing strengths and weak areas
- **All-in-one platform** covering full-stack JavaScript ecosystem

### Target Users

- Frontend developers preparing for interviews
- Full-stack JavaScript/TypeScript developers
- Self-learners wanting structured practice

---

## Tech Stack & Reasoning

### Frontend

| Technology | Version | Why I Chose It |
|------------|---------|----------------|
| **Next.js** | 16.1.1 | App Router, Server Components, API Routes, SEO optimization, built-in routing |
| **React** | 19.2.3 | Latest features, concurrent rendering, improved performance |
| **TypeScript** | 5.9.3 | Type safety, better DX, catch errors at compile time |
| **Tailwind CSS** | 4.1.18 | Rapid UI development, utility-first, tree-shakable |
| **Framer Motion** | 12.23.27 | Smooth animations, gesture support, production-ready |

### Backend & Database

| Technology | Version | Why I Chose It |
|------------|---------|----------------|
| **MongoDB** | via Mongoose 9.1.1 | Flexible schema for varied problem structures, JSON-like documents |
| **NextAuth.js** | 4.24.13 | Seamless Next.js integration, multiple auth providers, session management |
| **bcryptjs** | 3.0.3 | Secure password hashing for email/password auth |

### UI Components

| Technology | Why I Chose It |
|------------|----------------|
| **shadcn/ui** | Accessible, customizable, copy-paste components |
| **Radix UI** | Headless primitives for complex UI patterns |
| **Monaco Editor** | Same editor as VS Code, excellent DX |
| **Lucide React** | Consistent, customizable icons |

---

## Architecture Deep Dive

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Pages      │  │  Components  │  │    Hooks     │      │
│  │  (App Router)│  │   (React)    │  │ (useChallenges)│    │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                     API ROUTES                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │  /auth   │  │/problems │  │  /quiz   │  │  /user   │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATABASE                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                     MongoDB                           │  │
│  │   ┌─────────┐  ┌─────────────────┐  ┌─────────────┐  │  │
│  │   │  User   │  │ UserProblemData │  │UserAnswered │  │  │
│  │   │         │  │                 │  │  Question   │  │  │
│  │   └─────────┘  └─────────────────┘  └─────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow Pattern

```
Static Problems (TypeScript files)
           │
           ▼
    useChallenges Hook ◄──── User Metadata (MongoDB)
           │
           ▼
    Merged Problem List
           │
           ▼
    React Components
```

**Key Insight**: Problems are defined statically in TypeScript files (source of truth) and **overlaid** with user-specific metadata (status, notes, stars) from MongoDB.

---

## Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── api/                  # API Routes
│   │   ├── auth/            # NextAuth endpoints
│   │   │   ├── [...nextauth]/ # Dynamic auth handler
│   │   │   ├── register/    # User registration
│   │   │   └── user/        # User operations
│   │   ├── problems/        # Problem data API
│   │   ├── quiz/            # Quiz submission API
│   │   └── user/            # User profile & problem data
│   ├── practice/            # Practice pages
│   │   ├── [slug]/          # Dynamic topic pages
│   │   ├── js/              # JavaScript specific
│   │   └── ts/              # TypeScript specific
│   ├── profile/             # User profile page
│   ├── quiz/                # Quiz page
│   └── topics/              # Topics listing
│
├── components/              # React Components
│   ├── common/              # Shared components (Header, Footer)
│   ├── editor/              # Monaco Editor wrapper
│   ├── landing/             # Landing page sections
│   ├── modals/              # Modal components
│   ├── problems/            # Problem list/detail views
│   ├── profile/             # Profile page components
│   ├── progress/            # Progress tracking UI
│   ├── quiz/                # Quiz components
│   └── ui/                  # shadcn/ui components
│
├── context/                 # React Context
│   └── AuthContext.tsx      # Authentication state
│
├── data/                    # Static Data
│   ├── topics/              # Problem definitions (11 topics)
│   │   ├── javascript/      # JS problems (8 modules)
│   │   ├── typescript/      # TS problems (7 modules)
│   │   ├── react/           # React problems (7 modules)
│   │   ├── nextjs/          # Next.js problems
│   │   ├── nodejs/          # Node.js problems
│   │   ├── express/         # Express problems
│   │   ├── mongo/           # MongoDB problems
│   │   ├── prisma/          # Prisma problems
│   │   ├── postgres/        # PostgreSQL problems
│   │   ├── html/            # HTML problems
│   │   └── css/             # CSS problems
│   └── quizzes/             # Quiz questions
│
├── hooks/                   # Custom React Hooks
│   └── useChallenges.ts     # Main data/state hook
│
├── lib/                     # Utilities
│   ├── auth/                # Auth utilities
│   ├── db/                  # Database connection
│   └── utils/               # General utilities
│
├── models/                  # Mongoose Models
│   ├── User.ts              # User schema
│   ├── UserProblemData.ts   # Problem progress
│   └── UserAnsweredQuestion.ts # Quiz answers
│
├── styles/                  # Global styles
│   └── globals.css
│
└── types/                   # TypeScript types
    └── index.ts             # Shared type definitions
```

---

## Key Features Implementation

### 1. Monaco Code Editor

**Location**: `src/components/editor/`

```typescript
// Key features:
- Real-time code editing with syntax highlighting
- Language-aware (JS, TS, SQL based on topic)
- Custom toolbar (run, reset, copy)
- Console output panel
- Offline support
- Confetti animation on correct solution
```

**Why Monaco?**
- Same engine as VS Code
- Rich IntelliSense support
- Battle-tested in production

### 2. Problem System

**Problem Definition** (`src/data/topics/javascript/problems/1-basics-1.ts`):

```typescript
export const learnTheBasics: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'unique-problem-id',           // Unique identifier
    title: 'Problem Title',
    difficulty: Difficulty.Easy,        // Easy | Medium | Hard
    category: 'Basics',                 // Grouping category
    group: 'Step 1: Learn the Basics', // UI section header
    docsUrl: 'https://...',            // Reference documentation
    description: '...',                 // Markdown description
    starterCode: '...',                 // Initial code template
    testCases: [...],                   // Test inputs/outputs
    solutionCheck: (userCode) => [...], // Validation function
  }
];
```

**Key Design Decision**: Problems are **statically defined** in TypeScript files, not stored in the database. This approach:
- ✅ Type-safe problem definitions
- ✅ No database migration needed for new problems
- ✅ Version controlled with Git
- ✅ Fast access (no network request)

### 3. Progress Tracking

**The `useChallenges` Hook** (`src/hooks/useChallenges.ts`):

```typescript
export const useChallenges = (filter?: string) => {
  // 1. Load static problems from TypeScript files
  // 2. Fetch user metadata from API
  // 3. Merge static + user data
  // 4. Provide CRUD operations for user data
  
  return {
    problems,           // Merged problem list
    getProblemById,     // Get single problem
    isLoading,          // Loading state
    handleStatusChange, // Update solved/attempted status
    handleToggleStar,   // Star/unstar problem
    handleUpdateNotes,  // Add personal notes
  };
};
```

### 4. Topic Modal (Interview Questions)

**Location**: `src/components/modals/TopicModal.tsx`

Features:
- Fullscreen mode (native Fullscreen API)
- Swipe gesture navigation (touch + trackpad)
- Keyboard navigation (arrow keys)
- Markdown rendering for answers
- Show/hide answer toggle

### 5. Quiz System

**Flow**:
1. User takes quiz → answers stored in `UserAnsweredQuestion`
2. Score calculated and displayed
3. Detailed explanations shown for each question
4. Progress tracked over time

---

## Data Flow & State Management

### State Management Strategy

| State Type | Solution | Why |
|------------|----------|-----|
| **Auth State** | React Context + NextAuth | Global access, session-based |
| **User Problem Data** | React State + API | Server-side persistence |
| **UI State** | Component-local state | Simple, no prop drilling needed |
| **Theme** | next-themes | Built-in dark/light mode |

### No Redux? Why?

- **Next.js App Router** reduces need for global state
- **React Context** sufficient for auth state
- **Server Components** render with data directly
- **SWR pattern** in useChallenges provides caching

### Data Fetching Pattern

```typescript
// useChallenges hook pattern
useEffect(() => {
  const fetchProblems = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/problems');
      if (res.ok) {
        const data = await res.json();
        setUserProblemMetadata(data);
      } else {
        // Fallback to static defaults
        setUserProblemMetadata(staticDefaults);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!isAuthLoading) {
    fetchProblems();
  }
}, [isAuthenticated, isAuthLoading]);
```

---

## Authentication System

### Multi-Provider Setup

```
┌─────────────────────────────────────────┐
│              NextAuth.js                 │
│  ┌─────────────┐    ┌─────────────────┐ │
│  │   Google    │    │ Credentials     │ │
│  │   OAuth     │    │ (Email/Pass)    │ │
│  └─────────────┘    └─────────────────┘ │
│              │                │          │
│              └──────┬─────────┘          │
│                     ▼                    │
│            ┌───────────────┐             │
│            │ MongoDB User  │             │
│            │   Collection  │             │
│            └───────────────┘             │
└─────────────────────────────────────────┘
```

### AuthContext Implementation

```typescript
// src/context/AuthContext.tsx
export const AuthProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const value = {
    user: session?.user ?? null,
    isAuthenticated: !!session,
    login: (provider) => signIn(provider),
    logout: async () => {
      await signOut();
      router.push('/');
    },
    isLoading: status === 'loading',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

### Protected Routes Pattern

```typescript
// API route protection
export async function authMiddleware() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return null;
  }
  await connectDB();
  return await User.findOne({ email: session.user.email });
}

// In API route
export async function GET() {
  const user = await authMiddleware();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // Continue with authorized logic...
}
```

---

## Database Design

### MongoDB Collections

#### 1. User Collection

```typescript
interface IUser {
  username: string;        // Required, unique
  email: string;           // Required, unique, lowercase
  password?: string;       // Optional (not for OAuth users)
  authProvider?: string;   // 'google', 'credentials', etc.
  image?: string;          // Profile picture URL
  createdAt: Date;         // Auto-generated
}
```

#### 2. UserProblemData Collection

```typescript
interface IUserProblemData {
  userId: ObjectId;        // Reference to User
  problemId: string;       // References static problem ID
  status: ProblemStatus;   // 'Unsolved' | 'Solved' | 'Attempted'
  isStarred: boolean;      // Favorited by user
  notes: string;           // Personal notes
  lastSubmittedAt?: Date;  // Last submission time
  submissionHistory: {     // Historical submissions
    timestamp: Date;
    status: string;
  }[];
}

// Compound unique index
UserProblemDataSchema.index({ userId: 1, problemId: 1 }, { unique: true });
```

#### 3. UserAnsweredQuestion Collection

```typescript
interface IUserAnsweredQuestion {
  userId: ObjectId;
  questionId: string;      // References quiz question
  selectedAnswer: string;  // User's answer
  isCorrect: boolean;
  answeredAt: Date;
}
```

### Why MongoDB?

1. **Flexible Schema**: Problems have varied structures (different test cases, solution checks)
2. **JSON-like Documents**: Natural fit for JavaScript ecosystem
3. **Easy Integration**: Mongoose provides excellent TypeScript support
4. **Scalability**: Horizontal scaling for future growth

### Indexing Strategy

```typescript
// Ensures fast lookups and prevents duplicate entries
UserProblemDataSchema.index({ userId: 1, problemId: 1 }, { unique: true });
```

---

## API Routes

### Route Structure

```
/api
├── auth/
│   ├── [...nextauth]/route.ts  # NextAuth dynamic handler
│   ├── register/route.ts       # User registration
│   └── user/route.ts           # Current user info
├── problems/
│   ├── route.ts                # GET all problems (with user metadata)
│   └── [id]/route.ts           # GET single problem
├── quiz/
│   └── submit/route.ts         # POST quiz answers
└── user/
    ├── problem-data/route.ts   # POST update problem status
    └── profile/route.ts        # GET/PUT user profile
```

### Example API Route

```typescript
// src/app/api/user/problem-data/route.ts
export async function POST(request: Request) {
  const user = await authMiddleware();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { problemId, status, isStarred, notes } = body;

  // Upsert pattern - update if exists, create if not
  const updatedData = await UserProblemData.findOneAndUpdate(
    { userId: user._id, problemId },
    { 
      $set: { 
        ...(status && { status }),
        ...(isStarred !== undefined && { isStarred }),
        ...(notes !== undefined && { notes }),
        lastSubmittedAt: new Date(),
      },
      $push: { 
        submissionHistory: { 
          timestamp: new Date(), 
          status: status || 'update' 
        } 
      }
    },
    { upsert: true, new: true }
  );

  return NextResponse.json(updatedData);
}
```

---

## Component Architecture

### Component Hierarchy

```
App Layout
├── Header (common)
│   ├── Logo
│   ├── Navigation
│   ├── ThemeToggle
│   └── UserMenu
├── Main Content
│   ├── Landing Page
│   │   ├── Hero Section
│   │   ├── Features Section
│   │   └── CTA Section
│   ├── Practice Page
│   │   ├── TopicSelector
│   │   ├── ProblemList
│   │   │   └── ProblemCard (multiple)
│   │   └── ProblemDetail (modal/page)
│   │       ├── Description Panel
│   │       ├── CodeEditor
│   │       └── TestResults
│   ├── Quiz Page
│   │   ├── QuizQuestion
│   │   └── QuizResults
│   └── Profile Page
│       ├── UserStats
│       ├── ActivityGraph
│       └── SubmissionHistory
└── Footer (common)
```

### UI Component Library

Using **shadcn/ui** components stored in `src/components/ui/`:

| Component | Usage |
|-----------|-------|
| `Button` | All interactive buttons |
| `Card` | Problem cards, feature cards |
| `Dialog` | Modals, confirmations |
| `Tabs` | Topic switching |
| `Progress` | Progress bars |
| `Select` | Difficulty filter |
| `ScrollArea` | Scrollable containers |
| `Tooltip` | Helpful hints |

---

## Design Decisions & Trade-offs

### 1. Static Problems vs Database Storage

**Decision**: Store problems in TypeScript files, not MongoDB

| Pros | Cons |
|------|------|
| ✅ Type-safe definitions | ❌ Cannot add problems via UI |
| ✅ Version control with Git | ❌ Requires deploy for new problems |
| ✅ No database migration | ❌ No A/B testing on problems |
| ✅ Instant loading | |
| ✅ Works offline | |

### 2. MongoDB vs PostgreSQL

**Decision**: MongoDB with Mongoose

| MongoDB | PostgreSQL |
|---------|------------|
| ✅ Flexible schema | ✅ Strong relations |
| ✅ JSON documents | ✅ ACID transactions |
| ✅ Easy to start | ❌ Schema migrations |
| ✅ Great for prototyping | ❌ More setup overhead |

**Why MongoDB wins here**: Problem structures vary (different test cases, solution validators). Document model fits better than rigid tables.

### 3. Next.js App Router vs Pages Router

**Decision**: App Router (Next.js 15+)

| App Router | Pages Router |
|------------|--------------|
| ✅ Server Components | ❌ All client-side by default |
| ✅ Simpler data fetching | ❌ getServerSideProps/getStaticProps |
| ✅ Nested layouts | ❌ Flat structure |
| ✅ Future of Next.js | ❌ Legacy approach |

### 4. Authentication Strategy

**Decision**: NextAuth with multiple providers

| Approach | Why |
|----------|-----|
| Google OAuth | Most users prefer social login |
| Email/Password | Fallback for users without Google |
| JWT Sessions | Stateless, scalable |

---

## Common Questions

### Architecture & Design

**Q: Why store problems in TypeScript files instead of database?**

> 1. **Type Safety**: Problem definitions are type-checked at compile time
> 2. **Version Control**: Changes tracked in Git with PR reviews
> 3. **No Migration**: Adding problems doesn't require DB schema changes
> 4. **Performance**: No network request to load problem definitions
> 5. **Trade-off**: Can't add problems via UI (acceptable for this use case)

### Implementation Details

**Q: How does the code execution work?**

> Code is executed **client-side** in a sandboxed environment:
> 1. User writes code in Monaco Editor
> 2. Click "Run" triggers `solutionCheck()` function
> 3. Function evaluates user code against test cases
> 4. Results displayed with pass/fail status

**Q: Explain your authentication flow**

> 1. User clicks "Sign in with Google" or submits credentials
> 2. NextAuth handles OAuth flow / credential validation
> 3. On success, session created with JWT
> 4. `AuthContext` wraps app, exposing `useAuth()` hook
> 5. Protected routes check `isAuthenticated` before rendering

**Q: How do you persist user progress?**

> **Overlay Pattern**:
> 1. Static problems loaded from TypeScript files
> 2. User metadata fetched from MongoDB (`UserProblemData`)
> 3. `useChallenges` hook merges both datasets
> 4. User actions (solve, star, note) → POST to API
> 5. MongoDB upserts with compound index `(userId, problemId)`

### Performance & Optimization

**Q: How do you optimize initial load performance?**

> 1. **Server Components**: Default in App Router, reduces JS bundle
> 2. **Code Splitting**: Dynamic imports for editor (`next/dynamic`)
> 3. **Image Optimization**: Next.js `<Image>` with lazy loading
> 4. **Tailwind Tree-shaking**: Unused CSS removed in production

**Q: How would you scale this application?**

> 1. **Database**: MongoDB can shard horizontally
> 2. **Caching**: Add Redis for session/API caching
> 3. **CDN**: Static assets on Vercel Edge/Cloudflare
> 4. **API Rate Limiting**: Protect endpoints from abuse
> 5. **Read Replicas**: If read-heavy, add MongoDB replicas

### TypeScript & Code Quality

**Q: How do you ensure type safety?**

> 1. **Strict TypeScript config**: `strict: true`
> 2. **Shared Types**: Central `types/index.ts`
> 3. **Zod Validation**: Runtime validation for API inputs
> 4. **Mongoose TypeScript**: Typed model interfaces

**Q: Walk me through the Problem type**

```typescript
interface Problem {
  id: string;              // Unique identifier
  title: string;           // Display name
  description: string;     // Markdown description
  difficulty: Difficulty;  // Enum: Easy | Medium | Hard
  category: string;        // Grouping (e.g., "Basics")
  group: string;           // UI section header
  docsUrl: string;         // Reference link
  starterCode: string;     // Initial code template
  testCases: TestCase[];   // Input/output pairs
  solutionCheck: Function; // Validation logic
  // User-specific fields (from DB overlay):
  status: ProblemStatus;   // Unsolved | Solved | Attempted
  isStarred?: boolean;     // User favorited
  notes?: string;          // User notes
  slug?: string;           // Topic identifier (js, ts, etc.)
}
```

---

## Quick Reference Card

### Run Locally

```bash
git clone https://github.com/shridmishra/interviewjs.git
cd interviewjs
npm install
# Create .env.local with MONGO_URI, NEXTAUTH_SECRET
npm run dev
```

### Key Files to Know

| File | Purpose |
|------|---------|
| `src/hooks/useChallenges.ts` | Core data hook |
| `src/context/AuthContext.tsx` | Auth state |
| `src/app/api/auth/[...nextauth]/route.ts` | Auth config |
| `src/models/*.ts` | Database schemas |
| `src/data/topics/*/problems/*.ts` | Problem definitions |
| `src/components/editor/` | Code editor |

### Environment Variables

```env
MONGO_URI=mongodb://...        # MongoDB connection
NEXTAUTH_SECRET=xxx            # JWT signing secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=xxx           # OAuth (optional)
GOOGLE_CLIENT_SECRET=xxx       # OAuth (optional)
```

---

> **Last Updated**: January 2026  
> **Author**: Shrid Mishra  
> **Project**: InterviewJS
