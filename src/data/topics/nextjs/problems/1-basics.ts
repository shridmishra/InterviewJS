import { Problem, Difficulty } from '@/types';

export const nextjsBasics: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'nextjs-page',
    title: 'Create a Page',
    description: 'Create a default export function named `Page` that returns a `<h1>` with "Hello Next.js".',
    difficulty: Difficulty.Easy,
    category: 'Next.js',
    group: 'Step 1: Basics',
    docsUrl: 'https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts',
    starterCode: `export default function Page() {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('export default function Page') && userCode.includes('Hello Next.js');
      return [{
        input: 'Code Check',
        expected: 'Page component with "Hello Next.js"',
        actual: passed ? 'Page created' : 'Page missing or incorrect',
        passed
      }];
    },
  },
  {
    id: 'nextjs-layout',
    title: 'Root Layout',
    description: 'Create a `RootLayout` component that wraps its children in `<html>` and `<body>` tags.',
    difficulty: Difficulty.Easy,
    category: 'Basics',
    group: 'Step 1: Basics',
    docsUrl: 'https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required',
    starterCode: `export default function RootLayout({ children }) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('<html') && userCode.includes('<body') && userCode.includes('{children}');
      return [{
        input: 'Code Check',
        expected: 'Root layout structure',
        actual: passed ? 'Correctly implemented' : 'Missing html, body, or children',
        passed
      }];
    },
  },
  {
    id: 'nextjs-link',
    title: 'Navigation with Link',
    description: 'Use the `<Link>` component to create a navigation link to "/about".',
    difficulty: Difficulty.Easy,
    category: 'Basics',
    group: 'Step 1: Basics',
    docsUrl: 'https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating',
    starterCode: `import Link from 'next/link';

export default function Navbar() {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('<Link') && userCode.includes('href="/about"');
      return [{
        input: 'Code Check',
        expected: 'Link to /about',
        actual: passed ? 'Correctly implemented' : 'Missing Link or href',
        passed
      }];
    },
  },
  {
    id: 'nextjs-image',
    title: 'Image Component',
    description: 'Use the `<Image>` component to display an image with src="/logo.png", width={50}, and height={50}.',
    difficulty: Difficulty.Easy,
    category: 'Basics',
    group: 'Step 1: Basics',
    docsUrl: 'https://nextjs.org/docs/app/building-your-application/optimizing/images',
    starterCode: `import Image from 'next/image';

export default function Logo() {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('<Image') && userCode.includes('width={50}') && userCode.includes('height={50}');
      return [{
        input: 'Code Check',
        expected: 'Image with dimensions',
        actual: passed ? 'Correctly implemented' : 'Missing Image or props',
        passed
      }];
    },
  },
  {
    id: 'nextjs-metadata',
    title: 'Page Metadata',
    description: 'Export a `metadata` object with a `title` of "My App" and `description` of "Welcome".',
    difficulty: Difficulty.Easy,
    category: 'Basics',
    group: 'Step 1: Basics',
    docsUrl: 'https://nextjs.org/docs/app/building-your-application/optimizing/metadata',
    starterCode: `// Export metadata here

export default function Page() {
  return <h1>Hello</h1>;
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('export const metadata') && userCode.includes('title:') && userCode.includes('description:');
      return [{
        input: 'Code Check',
        expected: 'Metadata export',
        actual: passed ? 'Correctly implemented' : 'Missing metadata export',
        passed
      }];
    },
  }
];
