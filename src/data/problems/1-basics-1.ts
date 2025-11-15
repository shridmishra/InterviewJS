import { Problem, Difficulty } from '../../types';
import { runTests } from './utils';

export const learnTheBasics: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'variable-assignment',
    title: 'Variable Assignment',
    description: 'Write a function `assignVariable` that declares a variable `myVar` and assigns it the value `5`. The function should return `myVar`.',
    difficulty: Difficulty.Easy,
    category: 'Variables',
    group: 'Step 1: Basics I',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#declarations',
    starterCode: `function assignVariable() {
  // Your code here
}`,
    testCases: [ { input: [], expectedOutput: 5 } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [], expectedOutput: 5 } ]),
  },
  {
    id: 'sum-two-numbers',
    title: 'Sum Two Numbers',
    description: 'Write a function `sum` that takes two numbers, `a` and `b`, as arguments and returns their sum.',
    difficulty: Difficulty.Easy,
    category: 'Function',
    group: 'Step 1: Basics I',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition',
    starterCode: `function sum(a, b) {
  // Your code here
}`,
    testCases: [ { input: [1, 2], expectedOutput: 3 }, { input: [10, -5], expectedOutput: 5 }, ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [1, 2], expectedOutput: 3 }, { input: [10, -5], expectedOutput: 5 }, { input: [0, 0], expectedOutput: 0 }, { input: [-1, -1], expectedOutput: -2 }, ]),
  },
  {
    id: 'string-length',
    title: 'String Length',
    description: 'Write a function `stringLength` that returns the length of a given string.',
    difficulty: Difficulty.Easy,
    category: 'String',
    group: 'Step 1: Basics I',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length',
    starterCode: `function stringLength(str) {
  // Your code here
}`,
    testCases: [ { input: ['hello'], expectedOutput: 5 }, { input: [''], expectedOutput: 0 } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: ['hello'], expectedOutput: 5 }, { input: [''], expectedOutput: 0 }, { input: ['JavaScript'], expectedOutput: 10 } ]),
  },
  {
    id: 'is-even',
    title: 'Check if Number is Even',
    description: 'Write a function `isEven` that takes a number and returns `true` if it is even, and `false` otherwise.',
    difficulty: Difficulty.Easy,
    category: 'Math',
    group: 'Step 1: Basics I',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder',
    starterCode: `function isEven(n) {
  // Your code here
}`,
    testCases: [ { input: [2], expectedOutput: true }, { input: [3], expectedOutput: false } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [2], expectedOutput: true }, { input: [3], expectedOutput: false }, { input: [0], expectedOutput: true }, { input: [-4], expectedOutput: true } ]),
  },
  {
    id: 'is-positive',
    title: 'Check if Positive',
    description: 'Write a function `isPositive` that returns `true` if a number is positive, and `false` otherwise. Consider 0 as not positive.',
    difficulty: Difficulty.Easy, category: 'Math', group: 'Step 1: Basics I',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators',
    starterCode: `function isPositive(n) {
  // Your code here
}`,
    testCases: [ { input: [5], expectedOutput: true }, { input: [-3], expectedOutput: false } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [1], expectedOutput: true }, { input: [-1], expectedOutput: false }, { input: [0], expectedOutput: false } ]),
  },
  {
    id: 'concatenate-strings',
    title: 'Concatenate Strings',
    description: 'Write a function `concat` that takes two strings and returns them joined together.',
    difficulty: Difficulty.Easy, category: 'String', group: 'Step 1: Basics I',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/concat',
    starterCode: `function concat(str1, str2) {
  // Your code here
}`,
    testCases: [ { input: ['Hello', 'World'], expectedOutput: 'HelloWorld' } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: ['Hello', ' World'], expectedOutput: 'Hello World' }, { input: ['abc', 'def'], expectedOutput: 'abcdef' }, { input: ['', 'test'], expectedOutput: 'test' } ]),
  },
  {
    id: 'is-adult',
    title: 'Check if Adult',
    description: 'Write a function `isAdult` that takes an age and returns `true` if the age is 18 or over, and `false` otherwise.',
    difficulty: Difficulty.Easy,
    category: 'Control Flow',
    group: 'Step 1: Basics I',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else',
    starterCode: `function isAdult(age) {
  // Your code here
}`,
    testCases: [ { input: [25], expectedOutput: true }, { input: [17], expectedOutput: false } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [18], expectedOutput: true }, { input: [17], expectedOutput: false }, { input: [30], expectedOutput: true } ]),
  },
  {
    id: 'multiply-numbers',
    title: 'Multiply Two Numbers',
    description: 'Write a function `multiply` that takes two numbers and returns their product.',
    difficulty: Difficulty.Easy,
    category: 'Math',
    group: 'Step 1: Basics I',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Multiplication',
    starterCode: `function multiply(a, b) {
  // Your code here
}`,
    testCases: [ { input: [3, 4], expectedOutput: 12 }, { input: [-2, 5], expectedOutput: -10 } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [3, 4], expectedOutput: 12 }, { input: [-2, 5], expectedOutput: -10 }, { input: [0, 100], expectedOutput: 0 } ]),
  },
];
