import { Problem, Difficulty } from '@/types';

export const nextjsDataFetching: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'nextjs-server-component-fetch',
    title: 'Server Component Fetch',
    description: 'Create an async Server Component `Users` that fetches data from `https://api.example.com/users` and renders a list of user names.',
    difficulty: Difficulty.Medium,
    category: 'Data Fetching',
    group: 'Step 3: Data Fetching',
    docsUrl: 'https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating',
    starterCode: `async function getUsers() {
  // Fetch logic here
}

export default async function Users() {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('fetch(') && userCode.includes('await');
      return [{
        input: 'Code Check',
        expected: 'Async fetch in server component',
        actual: passed ? 'Correctly implemented' : 'Missing fetch or await',
        passed
      }];
    },
  },
  {
    id: 'nextjs-suspense',
    title: 'Streaming with Suspense',
    description: 'Wrap the `SlowComponent` in a React `Suspense` boundary with a fallback of "Loading...".',
    difficulty: Difficulty.Medium,
    category: 'Data Fetching',
    group: 'Step 3: Data Fetching',
    docsUrl: 'https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#streaming-with-suspense',
    starterCode: `import { Suspense } from 'react';
import SlowComponent from './SlowComponent';

export default function Page() {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('<Suspense') && userCode.includes('fallback=');
      return [{
        input: 'Code Check',
        expected: 'Suspense with fallback',
        actual: passed ? 'Correctly implemented' : 'Missing Suspense or fallback',
        passed
      }];
    },
  },
  {
    id: 'nextjs-client-component',
    title: 'Client Component',
    description: 'Create a component `Counter` that uses `useState`. You must mark it as a Client Component.',
    difficulty: Difficulty.Easy,
    category: 'Data Fetching',
    group: 'Step 3: Data Fetching',
    docsUrl: 'https://nextjs.org/docs/app/building-your-application/rendering/client-components',
    starterCode: `// Add the directive here
import { useState } from 'react';

export default function Counter() {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes("'use client'") || userCode.includes('"use client"');
      return [{
        input: 'Code Check',
        expected: '"use client" directive',
        actual: passed ? 'Correctly implemented' : 'Missing directive',
        passed
      }];
    },
  },
  {
    id: 'nextjs-fetch-cache',
    title: 'Fetch Caching',
    description: 'Modify the fetch call to force the request to be cached forever (`force-cache`).',
    difficulty: Difficulty.Easy,
    category: 'Data Fetching',
    group: 'Step 3: Data Fetching',
    docsUrl: 'https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#caching-data',
    starterCode: `async function getData() {
  const res = await fetch('https://api.example.com/data', {
    // Add cache option here
  });
  return res.json();
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes("cache: 'force-cache'");
      return [{
        input: 'Code Check',
        expected: 'cache: force-cache',
        actual: passed ? 'Correctly implemented' : 'Missing cache option',
        passed
      }];
    },
  },
  {
    id: 'nextjs-revalidate',
    title: 'Time-based Revalidation',
    description: 'Modify the fetch call to revalidate data every 60 seconds.',
    difficulty: Difficulty.Easy,
    category: 'Data Fetching',
    group: 'Step 3: Data Fetching',
    docsUrl: 'https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating-data',
    starterCode: `async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: {
      // Add revalidate option here
    }
  });
  return res.json();
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('revalidate: 60');
      return [{
        input: 'Code Check',
        expected: 'revalidate: 60',
        actual: passed ? 'Correctly implemented' : 'Missing revalidate option',
        passed
      }];
    },
  }
];
