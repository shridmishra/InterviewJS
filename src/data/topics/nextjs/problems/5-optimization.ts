import { Problem, Difficulty } from '@/types';

export const nextjsOptimization: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'nextjs-image-component',
    title: 'Image Optimization',
    description: 'Use the `Image` component from `next/image` to display an image with src "/profile.jpg", width 500, and height 500.',
    difficulty: Difficulty.Medium,
    category: 'Optimization',
    group: 'Step 5: Optimization',
    docsUrl: 'https://nextjs.org/docs/app/building-your-application/optimizing/images',
    starterCode: `import Image from 'next/image';

export default function Profile() {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('<Image') && userCode.includes('width={500}') && userCode.includes('height={500}');
      return [{
        input: 'Code Check',
        expected: 'Image component with dimensions',
        actual: passed ? 'Correctly implemented' : 'Missing Image or props',
        passed
      }];
    },
  },
  {
    id: 'nextjs-metadata',
    title: 'Static Metadata',
    description: 'Define static metadata for a page by exporting a `metadata` object with a `title` of "My Page" and `description` of "This is my page".',
    difficulty: Difficulty.Easy,
    category: 'Optimization',
    group: 'Step 5: Optimization',
    docsUrl: 'https://nextjs.org/docs/app/building-your-application/optimizing/metadata',
    starterCode: `import { Metadata } from 'next';

// Your code here

export default function Page() {
  return <h1>My Page</h1>;
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('export const metadata') && userCode.includes('My Page');
      return [{
        input: 'Code Check',
        expected: 'Metadata exported',
        actual: passed ? 'Correctly implemented' : 'Missing metadata export',
        passed
      }];
    },
  },
  {
    id: 'nextjs-font',
    title: 'Font Optimization',
    description: 'Load the "Inter" font using `next/font/google` and apply its class name to the `<body>` tag.',
    difficulty: Difficulty.Easy,
    category: 'Optimization',
    group: 'Step 5: Optimization',
    docsUrl: 'https://nextjs.org/docs/app/building-your-application/optimizing/fonts',
    starterCode: `import { Inter } from 'next/font/google';

// Configure font here

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={/* Add class here */}>{children}</body>
    </html>
  );
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('subsets:') && userCode.includes('.className');
      return [{
        input: 'Code Check',
        expected: 'Font configured and applied',
        actual: passed ? 'Correctly implemented' : 'Missing configuration or className',
        passed
      }];
    },
  },
  {
    id: 'nextjs-lazy-loading',
    title: 'Lazy Loading',
    description: 'Use `next/dynamic` to lazily load a component named `HeavyComponent`.',
    difficulty: Difficulty.Medium,
    category: 'Optimization',
    group: 'Step 5: Optimization',
    docsUrl: 'https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading',
    starterCode: `import dynamic from 'next/dynamic';

// Lazy load here

export default function Page() {
  return <HeavyComponent />;
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes("dynamic(() => import('");
      return [{
        input: 'Code Check',
        expected: 'Dynamic import used',
        actual: passed ? 'Correctly implemented' : 'Missing dynamic import',
        passed
      }];
    },
  },
  {
    id: 'nextjs-script',
    title: 'Script Optimization',
    description: 'Use `next/script` to load a third-party script from "https://example.com/script.js" with `strategy="lazyOnload"`.',
    difficulty: Difficulty.Easy,
    category: 'Optimization',
    group: 'Step 5: Optimization',
    docsUrl: 'https://nextjs.org/docs/app/building-your-application/optimizing/scripts',
    starterCode: `import Script from 'next/script';

export default function Page() {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('<Script') && userCode.includes('src="') && userCode.includes('lazyOnload');
      return [{
        input: 'Code Check',
        expected: 'Script with lazyOnload',
        actual: passed ? 'Correctly implemented' : 'Missing Script or strategy',
        passed
      }];
    },
  }
];
