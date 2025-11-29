import { Problem, Difficulty } from '@/types';

export const reactPropsState: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'react-props',
    title: 'Pass Props',
    description: 'Create a component `Welcome` that accepts a prop `name` and renders `<h1>Hello, {name}!</h1>`.',
    difficulty: Difficulty.Easy,
    category: 'Props',
    group: 'Step 2: Props & State',
    docsUrl: 'https://react.dev/learn/passing-props-to-a-component',
    starterCode: `function Welcome(props) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('props.name') || userCode.includes('{name}');
      return [{
        input: 'Code Check',
        expected: 'Component using props.name',
        actual: passed ? 'Props used' : 'Props not used correctly',
        passed
      }];
    },
  },
  {
    id: 'react-state',
    title: 'Use State',
    description: 'Create a component `Counter` that has a state variable `count` initialized to 0. Render a button that increments `count` when clicked, and display the count in a `<p>` tag.',
    difficulty: Difficulty.Easy,
    category: 'State',
    group: 'Step 2: Props & State',
    docsUrl: 'https://react.dev/reference/react/useState',
    starterCode: `import { useState } from 'react';

function Counter() {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('useState(0)') && userCode.includes('onClick') && userCode.includes('setCount');
      return [{
        input: 'Code Check',
        expected: 'Component using useState and onClick',
        actual: passed ? 'State and event handler used' : 'State or event handler missing',
        passed
      }];
    },
  },
  {
    id: 'react-props-children',
    title: 'Children Prop',
    description: 'Create a `Card` component that renders a `div` with a class "card" and displays whatever content is passed between its opening and closing tags using `children`.',
    difficulty: Difficulty.Easy,
    category: 'Props & State',
    group: 'Step 2: Props & State',
    docsUrl: 'https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children',
    starterCode: `function Card({ children }) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('{children}');
      return [{
        input: 'Code Check',
        expected: 'Render children',
        actual: passed ? 'Correctly implemented' : 'Missing {children}',
        passed
      }];
    },
  },
  {
    id: 'react-state-toggle',
    title: 'Toggle State',
    description: 'Create a component `Toggle` with a button that says "ON" or "OFF". Clicking it should toggle the state.',
    difficulty: Difficulty.Easy,
    category: 'Props & State',
    group: 'Step 2: Props & State',
    docsUrl: 'https://react.dev/learn/state-a-components-memory',
    starterCode: `import { useState } from 'react';

function Toggle() {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('useState') && userCode.includes('!prev') || userCode.includes('!state');
      return [{
        input: 'Code Check',
        expected: 'Toggle logic',
        actual: passed ? 'Correctly implemented' : 'Missing toggle logic',
        passed
      }];
    },
  },
  {
    id: 'react-state-input',
    title: 'Controlled Input',
    description: 'Create a component `TextInput` with an input field. The input value should be controlled by React state.',
    difficulty: Difficulty.Easy,
    category: 'Props & State',
    group: 'Step 2: Props & State',
    docsUrl: 'https://react.dev/learn/sharing-state-between-components#controlled-components',
    starterCode: `import { useState } from 'react';

function TextInput() {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('value={') && userCode.includes('onChange={');
      return [{
        input: 'Code Check',
        expected: 'Controlled input',
        actual: passed ? 'Correctly implemented' : 'Missing value or onChange',
        passed
      }];
    },
  }
];
