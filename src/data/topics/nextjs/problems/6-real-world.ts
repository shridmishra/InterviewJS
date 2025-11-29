import { Problem, Difficulty } from '@/types';

export const nextjsRealWorld: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'nextjs-server-action',
    title: 'Server Actions',
    description: 'Create a Server Action `createPost` that takes `formData`, extracts "title", and logs it. Use "use server" directive.',
    difficulty: Difficulty.Medium,
    category: 'Real World',
    group: 'Step 6: Real World Scenarios',
    docsUrl: 'https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations',
    starterCode: `export default function Form() {
  // Define action here

  return <form action={createPost}>...</form>
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('"use server"') && userCode.includes('formData.get');
      return [{
        input: 'Code Check',
        expected: 'Server Action defined',
        actual: passed ? 'Correctly implemented' : 'Missing "use server" or formData logic',
        passed
      }];
    },
  },
  {
    id: 'nextjs-middleware',
    title: 'Middleware Redirect',
    description: 'Create a middleware function that checks for a "token" cookie. If missing, redirect to "/login".',
    difficulty: Difficulty.Medium,
    category: 'Real World',
    group: 'Step 6: Real World Scenarios',
    docsUrl: 'https://nextjs.org/docs/app/building-your-application/routing/middleware',
    starterCode: `import { NextResponse } from 'next/server';

export function middleware(request) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('request.cookies.get') && userCode.includes('NextResponse.redirect');
      return [{
        input: 'Code Check',
        expected: 'Middleware redirect logic',
        actual: passed ? 'Correctly implemented' : 'Missing cookie check or redirect',
        passed
      }];
    },
  },
  {
    id: 'nextjs-route-handlers',
    title: 'Route Handlers',
    description: 'Create a Route Handler `app/items/route.ts` that handles a POST request and returns the created item.',
    difficulty: Difficulty.Medium,
    category: 'Real World',
    group: 'Step 6: Real World Scenarios',
    docsUrl: 'https://nextjs.org/docs/app/building-your-application/routing/route-handlers',
    starterCode: `import { NextResponse } from 'next/server';

export async function POST(request) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('request.json()') && userCode.includes('NextResponse.json');
      return [{
        input: 'Code Check',
        expected: 'POST handler reading JSON',
        actual: passed ? 'Correctly implemented' : 'Missing request.json or response',
        passed
      }];
    },
  },
  {
    id: 'nextjs-parallel-routes',
    title: 'Parallel Routes',
    description: 'Define the folder structure for a parallel route `@analytics` inside `app/dashboard`.',
    difficulty: Difficulty.Hard,
    category: 'Real World',
    group: 'Step 6: Real World Scenarios',
    docsUrl: 'https://nextjs.org/docs/app/building-your-application/routing/parallel-routes',
    starterCode: `// Write the folder path in a comment
// e.g., app/dashboard/...`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('app/dashboard/@analytics/page.tsx') || userCode.includes('app/dashboard/@analytics/page.js');
      return [{
        input: 'Code Check',
        expected: 'Correct folder path',
        actual: passed ? 'Correctly implemented' : 'Missing correct path',
        passed
      }];
    },
  },
  {
    id: 'nextjs-intercepting-routes',
    title: 'Intercepting Routes',
    description: 'Define the folder structure to intercept the `/photo/[id]` route from within `/feed` using the `(..)` convention.',
    difficulty: Difficulty.Hard,
    category: 'Real World',
    group: 'Step 6: Real World Scenarios',
    docsUrl: 'https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes',
    starterCode: `// Write the folder path in a comment
// e.g., app/feed/...`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('app/feed/(..)photo/[id]/page.tsx') || userCode.includes('app/feed/(..)photo/[id]/page.js');
      return [{
        input: 'Code Check',
        expected: 'Correct intercepting path',
        actual: passed ? 'Correctly implemented' : 'Missing correct path',
        passed
      }];
    },
  }
];
