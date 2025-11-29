import { Problem, Difficulty } from '@/types';

export const reactBasics: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'react-component',
    title: 'Create a Component',
    description: 'Create a functional component named `Greeting` that returns a `<div>` with the text "Hello, React!".',
    difficulty: Difficulty.Easy,
    category: 'React',
    group: 'Step 1: Basics',
    docsUrl: 'https://react.dev/learn/your-first-component',
    starterCode: `function Greeting() {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('function Greeting') && userCode.includes('return') && userCode.includes('Hello, React!');
      return [{
        input: 'Code Check',
        expected: 'Component with "Hello, React!"',
        actual: passed ? 'Component created' : 'Component missing or incorrect',
        passed
      }];
    },
  },
  {
    id: 'react-jsx-variables',
    title: 'JSX Variables',
    description: 'Create a component `Welcome` that defines a variable `name = "User"` and renders `<h1>Welcome, {name}!</h1>`.',
    difficulty: Difficulty.Easy,
    category: 'React',
    group: 'Step 1: Basics',
    docsUrl: 'https://react.dev/learn/javascript-in-jsx-with-curly-braces',
    starterCode: `function Welcome() {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('name') && userCode.includes('{name}') && userCode.includes('Welcome,');
      return [{
        input: 'Code Check',
        expected: 'Variable rendered in JSX',
        actual: passed ? 'Correctly implemented' : 'Missing variable or JSX usage',
        passed
      }];
    },
  },
  {
    id: 'react-conditional-rendering',
    title: 'Conditional Rendering',
    description: 'Create a component `Status` that takes a boolean prop `isOnline`. If true, render "Online", otherwise "Offline".',
    difficulty: Difficulty.Easy,
    category: 'React',
    group: 'Step 1: Basics',
    docsUrl: 'https://react.dev/learn/conditional-rendering',
    starterCode: `function Status({ isOnline }) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('isOnline ?') || userCode.includes('if (isOnline)');
      return [{
        input: 'Code Check',
        expected: 'Conditional logic',
        actual: passed ? 'Correctly implemented' : 'Missing conditional logic',
        passed
      }];
    },
  },
  {
    id: 'react-lists',
    title: 'Rendering Lists',
    description: 'Create a component `UserList` that takes an array of names `["Alice", "Bob"]` and renders them as `<li>` items inside a `<ul>`.',
    difficulty: Difficulty.Easy,
    category: 'React',
    group: 'Step 1: Basics',
    docsUrl: 'https://react.dev/learn/rendering-lists',
    starterCode: `function UserList() {
  const names = ["Alice", "Bob"];
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('.map') && userCode.includes('<li') && userCode.includes('key=');
      return [{
        input: 'Code Check',
        expected: 'List rendered with map and keys',
        actual: passed ? 'Correctly implemented' : 'Missing map or keys',
        passed
      }];
    },
  }
];
