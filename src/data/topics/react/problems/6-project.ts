import { Problem, Difficulty } from '@/types';

export const reactProject: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'react-todo-list',
    title: 'Mini Project: To-Do List',
    description: 'Build a simple To-Do list. It should have an input field, an "Add" button, and a list of tasks. Clicking a task should toggle its completion status (strikethrough).',
    difficulty: Difficulty.Hard,
    category: 'Project',
    group: 'Step 6: Mini Project',
    docsUrl: 'https://react.dev/learn/reacting-to-input-with-state',
    starterCode: `import { useState } from 'react';

export default function TodoApp() {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('useState') && userCode.includes('.map') && userCode.includes('onClick') && userCode.includes('text-decoration');
      return [{
        input: 'Code Check',
        expected: 'Functional To-Do list logic',
        actual: passed ? 'Correctly implemented' : 'Missing state, mapping, or event handling',
        passed
      }];
    },
  },
  {
    id: 'react-counter-app',
    title: 'Mini Project: Counter with History',
    description: 'Build a counter app with Increment (+1), Decrement (-1), and Reset (0) buttons. Also display a history of values (e.g., "0 -> 1 -> 2").',
    difficulty: Difficulty.Medium,
    category: 'Project',
    group: 'Step 6: Mini Project',
    docsUrl: 'https://react.dev/learn/updating-arrays-in-state',
    starterCode: `import { useState } from 'react';

export default function CounterHistory() {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('useState') && userCode.includes('history') || userCode.includes('setHistory');
      return [{
        input: 'Code Check',
        expected: 'Counter with history state',
        actual: passed ? 'Correctly implemented' : 'Missing history state logic',
        passed
      }];
    },
  },
  {
    id: 'react-stopwatch',
    title: 'Mini Project: Stopwatch',
    description: 'Build a stopwatch with "Start", "Stop", and "Reset" buttons. Display the time in seconds.',
    difficulty: Difficulty.Medium,
    category: 'Project',
    group: 'Step 6: Mini Project',
    docsUrl: 'https://react.dev/learn/referencing-values-with-refs',
    starterCode: `import { useState, useRef } from 'react';

export default function Stopwatch() {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('setInterval') && userCode.includes('clearInterval') && userCode.includes('useRef');
      return [{
        input: 'Code Check',
        expected: 'Stopwatch logic with interval',
        actual: passed ? 'Correctly implemented' : 'Missing interval logic',
        passed
      }];
    },
  },
  {
    id: 'react-color-picker',
    title: 'Mini Project: Color Picker',
    description: 'Build a color picker that lets the user select a color from an input type="color" and displays the selected hex code.',
    difficulty: Difficulty.Easy,
    category: 'Project',
    group: 'Step 6: Mini Project',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color',
    starterCode: `import { useState } from 'react';

export default function ColorPicker() {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('type="color"') && userCode.includes('onChange');
      return [{
        input: 'Code Check',
        expected: 'Color input and state',
        actual: passed ? 'Correctly implemented' : 'Missing color input',
        passed
      }];
    },
  },
  {
    id: 'react-search-filter',
    title: 'Mini Project: Search Filter',
    description: 'Given a list of fruits `["Apple", "Banana", "Orange", "Mango"]`, implement a search input that filters the list based on user input.',
    difficulty: Difficulty.Medium,
    category: 'Project',
    group: 'Step 6: Mini Project',
    docsUrl: 'https://react.dev/learn/filtering-arrays-of-objects',
    starterCode: `import { useState } from 'react';

const fruits = ["Apple", "Banana", "Orange", "Mango"];

export default function SearchFilter() {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('.filter') && userCode.includes('toLowerCase') && userCode.includes('includes');
      return [{
        input: 'Code Check',
        expected: 'Filtering logic',
        actual: passed ? 'Correctly implemented' : 'Missing filter logic',
        passed
      }];
    },
  }
];
