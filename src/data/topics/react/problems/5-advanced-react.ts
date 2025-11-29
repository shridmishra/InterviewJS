import { Problem, Difficulty } from '@/types';

export const reactAdvanced: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'react-use-ref',
    title: 'Access DOM with useRef',
    description: 'Create a component `TextInput` with a button "Focus Input". When the button is clicked, the input field should automatically receive focus using `useRef`.',
    difficulty: Difficulty.Medium,
    category: 'Refs',
    group: 'Step 5: Advanced React',
    docsUrl: 'https://react.dev/reference/react/useRef',
    starterCode: `import { useRef } from 'react';

function TextInput() {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('useRef') && userCode.includes('.current.focus()');
      return [{
        input: 'Code Check',
        expected: 'useRef used to focus input',
        actual: passed ? 'Correctly implemented' : 'Missing ref or focus call',
        passed
      }];
    },
  },
  {
    id: 'react-memo',
    title: 'Optimize with React.memo',
    description: 'Wrap a component `ExpensiveComponent` with `React.memo` to prevent unnecessary re-renders when props haven\'t changed.',
    difficulty: Difficulty.Medium,
    category: 'Optimization',
    group: 'Step 5: Advanced React',
    docsUrl: 'https://react.dev/reference/react/memo',
    starterCode: `import React from 'react';

const ExpensiveComponent = ({ data }) => {
  // Expensive rendering logic
  return <div>{data}</div>;
};

// Export memoized component
`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('React.memo(ExpensiveComponent)');
      return [{
        input: 'Code Check',
        expected: 'Component wrapped in React.memo',
        actual: passed ? 'Memoized' : 'Not memoized',
        passed
      }];
    },
  },
  {
    id: 'react-use-callback',
    title: 'useCallback',
    description: 'Wrap a function `handleClick` with `useCallback` so it is not recreated on every render unless `count` changes.',
    difficulty: Difficulty.Medium,
    category: 'Advanced React',
    group: 'Step 5: Advanced React',
    docsUrl: 'https://react.dev/reference/react/useCallback',
    starterCode: `import { useCallback } from 'react';

function Parent({ count }) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('useCallback') && userCode.includes('[count]');
      return [{
        input: 'Code Check',
        expected: 'useCallback with dependency',
        actual: passed ? 'Correctly implemented' : 'Missing useCallback or dependency',
        passed
      }];
    },
  },
  {
    id: 'react-use-memo',
    title: 'useMemo',
    description: 'Use `useMemo` to cache the result of an expensive calculation `computeExpensiveValue(a, b)` so it only re-runs when `a` or `b` changes.',
    difficulty: Difficulty.Medium,
    category: 'Advanced React',
    group: 'Step 5: Advanced React',
    docsUrl: 'https://react.dev/reference/react/useMemo',
    starterCode: `import { useMemo } from 'react';

function Calculator({ a, b }) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('useMemo') && userCode.includes('[a, b]');
      return [{
        input: 'Code Check',
        expected: 'useMemo with dependencies',
        actual: passed ? 'Correctly implemented' : 'Missing useMemo or dependencies',
        passed
      }];
    },
  },
  {
    id: 'react-portals',
    title: 'React Portals',
    description: 'Create a component `Modal` that renders its children into a DOM node with id "modal-root" using `createPortal`.',
    difficulty: Difficulty.Medium,
    category: 'Advanced React',
    group: 'Step 5: Advanced React',
    docsUrl: 'https://react.dev/reference/react-dom/createPortal',
    starterCode: `import { createPortal } from 'react-dom';

function Modal({ children }) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('createPortal') && userCode.includes('document.getElementById');
      return [{
        input: 'Code Check',
        expected: 'createPortal usage',
        actual: passed ? 'Correctly implemented' : 'Missing createPortal or DOM selection',
        passed
      }];
    },
  }
];
