import { Problem, Difficulty } from '@/types';

export const nextjsApiRoutes: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'nextjs-route-handler-get',
    title: 'GET Route Handler',
    description: 'Create a Route Handler for `GET` requests in `app/api/hello/route.ts` that returns a JSON response `{ message: "Hello API" }`.',
    difficulty: Difficulty.Medium,
    category: 'API Routes',
    group: 'Step 4: API Routes',
    docsUrl: 'https://nextjs.org/docs/app/building-your-application/routing/route-handlers',
    starterCode: `import { NextResponse } from 'next/server';

export async function GET() {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('NextResponse.json') && userCode.includes('Hello API');
      return [{
        input: 'Code Check',
        expected: 'GET handler returning JSON',
        actual: passed ? 'Correctly implemented' : 'Missing JSON response',
        passed
      }];
    },
  },
  {
    id: 'nextjs-route-handler-post',
    title: 'POST Route Handler',
    description: 'Create a Route Handler for `POST` requests that reads the JSON body and returns it. Use `request.json()`.',
    difficulty: Difficulty.Medium,
    category: 'API Routes',
    group: 'Step 4: API Routes',
    docsUrl: 'https://nextjs.org/docs/app/building-your-application/routing/route-handlers',
    starterCode: `import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('await request.json()') && userCode.includes('NextResponse.json');
      return [{
        input: 'Code Check',
        expected: 'POST handler reading body',
        actual: passed ? 'Correctly implemented' : 'Missing body reading',
        passed
      }];
    },
  },
  {
    id: 'nextjs-api-dynamic',
    title: 'Dynamic API Route',
    description: 'Create a GET handler for a dynamic route `app/api/posts/[id]/route.ts` that accesses the `id` from `params`.',
    difficulty: Difficulty.Medium,
    category: 'API Routes',
    group: 'Step 4: API Routes',
    docsUrl: 'https://nextjs.org/docs/app/building-your-application/routing/route-handlers#dynamic-route-segments',
    starterCode: `import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('params.id');
      return [{
        input: 'Code Check',
        expected: 'Access params.id',
        actual: passed ? 'Correctly implemented' : 'Missing params.id',
        passed
      }];
    },
  },
  {
    id: 'nextjs-api-query',
    title: 'API Query Parameters',
    description: 'Create a GET handler that reads the "search" query parameter from the URL.',
    difficulty: Difficulty.Medium,
    category: 'API Routes',
    group: 'Step 4: API Routes',
    docsUrl: 'https://nextjs.org/docs/app/building-your-application/routing/route-handlers#url-query-parameters',
    starterCode: `import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('searchParams.get');
      return [{
        input: 'Code Check',
        expected: 'Get search param',
        actual: passed ? 'Correctly implemented' : 'Missing searchParams.get',
        passed
      }];
    },
  },
  {
    id: 'nextjs-api-response',
    title: 'JSON Response',
    description: 'Return a JSON response `{ message: "Success" }` with a status code of 201 using `NextResponse.json`.',
    difficulty: Difficulty.Easy,
    category: 'API Routes',
    group: 'Step 4: API Routes',
    docsUrl: 'https://nextjs.org/docs/app/building-your-application/routing/route-handlers',
    starterCode: `import { NextResponse } from 'next/server';

export async function POST() {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('NextResponse.json') && userCode.includes('status: 201');
      return [{
        input: 'Code Check',
        expected: 'JSON response with 201 status',
        actual: passed ? 'Correctly implemented' : 'Missing JSON or status',
        passed
      }];
    },
  }
];
