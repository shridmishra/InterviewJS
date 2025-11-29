import { Problem, Difficulty } from '@/types';

export const reactHooksContext: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'react-use-context',
    title: 'Consume Context',
    description: 'Given a `ThemeContext`, create a component `ThemedButton` that consumes the context and renders a button with the background color from the theme.',
    difficulty: Difficulty.Medium,
    category: 'Context',
    group: 'Step 4: Hooks & Context',
    docsUrl: 'https://react.dev/reference/react/useContext',
    starterCode: `import { useContext } from 'react';
// Assume ThemeContext is imported

function ThemedButton() {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('useContext') && userCode.includes('ThemeContext');
      return [{
        input: 'Code Check',
        expected: 'useContext(ThemeContext)',
        actual: passed ? 'Context consumed' : 'Context not consumed correctly',
        passed
      }];
    },
  },
  {
    id: 'react-custom-hook',
    title: 'Custom Hook: useToggle',
    description: 'Create a custom hook `useToggle` that returns a boolean state and a function to toggle it. The initial state should be false by default.',
    difficulty: Difficulty.Medium,
    category: 'Hooks',
    group: 'Step 4: Hooks & Context',
    docsUrl: 'https://react.dev/learn/reusing-logic-with-custom-hooks',
    starterCode: `import { useState } from 'react';

function useToggle(initialValue = false) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('useState') && userCode.includes('return [');
      return [{
        input: 'Code Check',
        expected: 'Custom hook returning state and toggle function',
        actual: passed ? 'Implemented' : 'Implementation missing',
        passed
      }];
    },
  },
  {
    id: 'react-use-reducer',
    title: 'useReducer Counter',
    description: 'Implement a counter using `useReducer` with actions `{ type: "increment" }` and `{ type: "decrement" }`.',
    difficulty: Difficulty.Medium,
    category: 'Hooks & Context',
    group: 'Step 4: Hooks & Context',
    docsUrl: 'https://react.dev/reference/react/useReducer',
    starterCode: `import { useReducer } from 'react';

function reducer(state, action) {
  // Your code here
}

function Counter() {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('useReducer') && userCode.includes('dispatch') && userCode.includes('increment');
      return [{
        input: 'Code Check',
        expected: 'useReducer implementation',
        actual: passed ? 'Correctly implemented' : 'Missing useReducer or dispatch',
        passed
      }];
    },
  },
  {
    id: 'react-context-provider',
    title: 'Context Provider',
    description: 'Create a Context `ThemeContext` and a Provider component `ThemeProvider` that passes a value `{ theme: "dark" }` to its children.',
    difficulty: Difficulty.Medium,
    category: 'Hooks & Context',
    group: 'Step 4: Hooks & Context',
    docsUrl: 'https://react.dev/learn/passing-data-deeply-with-context',
    starterCode: `import { createContext } from 'react';

const ThemeContext = createContext(null);

function ThemeProvider({ children }) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('ThemeContext.Provider') && userCode.includes('value=');
      return [{
        input: 'Code Check',
        expected: 'Provider with value',
        actual: passed ? 'Correctly implemented' : 'Missing Provider or value',
        passed
      }];
    },
  },
  {
    id: 'react-use-layout-effect',
    title: 'useLayoutEffect',
    description: 'Use `useLayoutEffect` to measure the width of a `div` element referenced by a ref immediately after it renders.',
    difficulty: Difficulty.Medium,
    category: 'Hooks & Context',
    group: 'Step 4: Hooks & Context',
    docsUrl: 'https://react.dev/reference/react/useLayoutEffect',
    starterCode: `import { useLayoutEffect, useRef } from 'react';

function Box() {
  const ref = useRef(null);
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('useLayoutEffect') && userCode.includes('offsetWidth') || userCode.includes('getBoundingClientRect');
      return [{
        input: 'Code Check',
        expected: 'useLayoutEffect measuring width',
        actual: passed ? 'Correctly implemented' : 'Missing useLayoutEffect or measurement',
        passed
      }];
    },
  }
];
