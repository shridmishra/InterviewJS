import { Problem, Difficulty } from '@/types';

export const nextjsRouting: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'nextjs-dynamic-route',
    title: 'Dynamic Route',
    description: 'Create a page component that receives `params` prop to handle dynamic routing for `/posts/[id]`. The component should render "Post: " followed by the id.',
    difficulty: Difficulty.Easy,
    category: 'Routing',
    group: 'Step 2: Routing',
    docsUrl: 'https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes',
    starterCode: `export default function Post({ params }) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('params.id');
      return [{
        input: 'Code Check',
        expected: 'Component using params.id',
        actual: passed ? 'Correctly implemented' : 'Missing params usage',
        passed
      }];
    },
  },
  {
    id: 'nextjs-link',
    title: 'Navigation with Link',
    description: 'Create a component that uses the `Link` component from `next/link` to navigate to "/about".',
    difficulty: Difficulty.Easy,
    category: 'Routing',
    group: 'Step 2: Routing',
    docsUrl: 'https://nextjs.org/docs/app/api-reference/components/link',
    starterCode: `import Link from 'next/link';

export default function Navigation() {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('<Link') && userCode.includes('href="/about"');
      return [{
        input: 'Code Check',
        expected: 'Link component to /about',
        actual: passed ? 'Correctly implemented' : 'Missing Link or href',
        passed
      }];
    },
  },
  {
    id: 'nextjs-nested-route',
    title: 'Nested Route',
    description: 'Create a nested route structure for `/dashboard/settings`. You need to define the file path.',
    difficulty: Difficulty.Easy,
    category: 'Routing',
    group: 'Step 2: Routing',
    docsUrl: 'https://nextjs.org/docs/app/building-your-application/routing/defining-routes',
    starterCode: `// Define the file path in a comment
// e.g., app/page.tsx

export default function Settings() {
  return <h1>Settings</h1>;
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('app/dashboard/settings/page.tsx') || userCode.includes('app/dashboard/settings/page.js');
      return [{
        input: 'Code Check',
        expected: 'Correct file path',
        actual: passed ? 'Correctly implemented' : 'Missing correct file path',
        passed
      }];
    },
  },
  {
    id: 'nextjs-loading-ui',
    title: 'Loading UI',
    description: 'Create a `Loading` component that will be automatically used by Next.js while a page is loading. The file name is important.',
    difficulty: Difficulty.Easy,
    category: 'Routing',
    group: 'Step 2: Routing',
    docsUrl: 'https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming',
    starterCode: `// Define the component and file name in comment

export default function Loading() {
  return <p>Loading...</p>;
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('loading.tsx') || userCode.includes('loading.js');
      return [{
        input: 'Code Check',
        expected: 'loading.tsx file',
        actual: passed ? 'Correctly implemented' : 'Missing loading.tsx',
        passed
      }];
    },
  },
  {
    id: 'nextjs-error-ui',
    title: 'Error UI',
    description: 'Create an `Error` component that takes `error` and `reset` props to handle runtime errors. The file name is important.',
    difficulty: Difficulty.Medium,
    category: 'Routing',
    group: 'Step 2: Routing',
    docsUrl: 'https://nextjs.org/docs/app/building-your-application/routing/error-handling',
    starterCode: `// Define the component and file name in comment
'use client';

export default function Error({ error, reset }) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = (userCode.includes('error.tsx') || userCode.includes('error.js')) && userCode.includes('reset()');
      return [{
        input: 'Code Check',
        expected: 'error.tsx and reset call',
        actual: passed ? 'Correctly implemented' : 'Missing error.tsx or reset',
        passed
      }];
    },
  }
];
