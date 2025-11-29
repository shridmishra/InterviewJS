import { Problem, Difficulty } from '@/types';

export const reactEffectsLifecycle: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'react-use-effect-mount',
    title: 'Effect on Mount',
    description: 'Create a component `Logger` that logs "Mounted" to the console when it mounts. Use `useEffect`.',
    difficulty: Difficulty.Easy,
    category: 'Effects',
    group: 'Step 3: Effects & Lifecycle',
    docsUrl: 'https://react.dev/reference/react/useEffect',
    starterCode: `import { useEffect } from 'react';

function Logger() {
  // Your code here
  return <div>Check console</div>;
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('useEffect') && userCode.includes('[]') && userCode.includes('console.log');
      return [{
        input: 'Code Check',
        expected: 'useEffect with empty dependency array',
        actual: passed ? 'Correctly implemented' : 'Missing useEffect or dependency array',
        passed
      }];
    },
  },
  {
    id: 'react-use-effect-update',
    title: 'Effect on Update',
    description: 'Create a component `TitleUpdater` that takes a prop `title` and updates the document title (`document.title`) whenever the `title` prop changes.',
    difficulty: Difficulty.Medium,
    category: 'Effects',
    group: 'Step 3: Effects & Lifecycle',
    docsUrl: 'https://react.dev/reference/react/useEffect',
    starterCode: `import { useEffect } from 'react';

function TitleUpdater({ title }) {
  // Your code here
  return null;
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('useEffect') && userCode.includes('[title]') && userCode.includes('document.title');
      return [{
        input: 'Code Check',
        expected: 'useEffect dependent on title',
        actual: passed ? 'Correctly implemented' : 'Missing dependency or logic',
        passed
      }];
    },
  },
  {
    id: 'react-use-effect-cleanup',
    title: 'Effect Cleanup',
    description: 'Create a component that sets up an interval (e.g., `setInterval`) on mount and clears it on unmount using the cleanup function.',
    difficulty: Difficulty.Medium,
    category: 'Effects & Lifecycle',
    group: 'Step 3: Effects & Lifecycle',
    docsUrl: 'https://react.dev/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed',
    starterCode: `import { useEffect } from 'react';

function Timer() {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('setInterval') && userCode.includes('clearInterval') && userCode.includes('return () =>');
      return [{
        input: 'Code Check',
        expected: 'Cleanup function clearing interval',
        actual: passed ? 'Correctly implemented' : 'Missing cleanup or clear logic',
        passed
      }];
    },
  },
  {
    id: 'react-use-effect-dependency',
    title: 'Effect Dependency',
    description: 'Create a component that takes a prop `userId` and runs an effect only when `userId` changes.',
    difficulty: Difficulty.Easy,
    category: 'Effects & Lifecycle',
    group: 'Step 3: Effects & Lifecycle',
    docsUrl: 'https://react.dev/learn/synchronizing-with-effects#step-2-specify-the-effect-dependencies',
    starterCode: `import { useEffect } from 'react';

function UserProfile({ userId }) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('[userId]');
      return [{
        input: 'Code Check',
        expected: 'userId in dependency array',
        actual: passed ? 'Correctly implemented' : 'Missing dependency',
        passed
      }];
    },
  },
  {
    id: 'react-use-effect-api',
    title: 'Fetch Data on Mount',
    description: 'Create a component that fetches data from `https://api.example.com/data` when the component mounts and stores it in state.',
    difficulty: Difficulty.Medium,
    category: 'Effects & Lifecycle',
    group: 'Step 3: Effects & Lifecycle',
    docsUrl: 'https://react.dev/learn/synchronizing-with-effects#fetching-data',
    starterCode: `import { useState, useEffect } from 'react';

function DataFetcher() {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('fetch') && userCode.includes('[]') && userCode.includes('useEffect');
      return [{
        input: 'Code Check',
        expected: 'Fetch inside useEffect with empty deps',
        actual: passed ? 'Correctly implemented' : 'Missing fetch or empty deps',
        passed
      }];
    },
  }
];
