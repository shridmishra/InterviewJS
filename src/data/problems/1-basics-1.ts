import { Problem, Difficulty } from '../../types';
import { runTests } from './utils';

export const learnTheBasics: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
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
    id: 'get-object-keys',
    title: 'Get Object Keys',
    description: "Write a function `getKeys` that takes an object and returns an array of its keys.",
    difficulty: Difficulty.Easy,
    category: 'Object',
    group: 'Step 1: Basics I',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys',
    starterCode: `function getKeys(obj) {
  // Your code here
}`,
    testCases: [ { input: [{a: 1, b: 2}], expectedOutput: ['a', 'b'] }, { input: [{}], expectedOutput: [] }, ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [{ a: 1, b: 2, c: 3 }], expectedOutput: ['a', 'b', 'c'] }, { input: [{ name: 'John', age: 30 }], expectedOutput: ['name', 'age'] }, { input: [{}], expectedOutput: [] }, ]),
  },
  {
    id: 'simple-loop',
    title: 'Simple For Loop',
    description: 'Write a function `countToN` that takes a number `n` and returns an array of numbers from 1 to `n`.',
    difficulty: Difficulty.Easy,
    category: 'Loop',
    group: 'Step 1: Basics I',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration#for_statement',
    starterCode: `function countToN(n) {
  // Your code here
}`,
    testCases: [ { input: [5], expectedOutput: [1,2,3,4,5] }, { input: [1], expectedOutput: [1] } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [5], expectedOutput: [1,2,3,4,5] }, { input: [1], expectedOutput: [1] }, { input: [0], expectedOutput: [] } ]),
  },
  {
    id: 'get-object-values',
    title: 'Get Object Values',
    description: 'Write a function `getValues` that takes an object and returns an array of its values.',
    difficulty: Difficulty.Easy,
    category: 'Object',
    group: 'Step 1: Basics I',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values',
    starterCode: `function getValues(obj) {
  // Your code here
}`,
    testCases: [ { input: [{ a: 1, b: 2 }], expectedOutput: [1, 2] } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [{ a: 1, b: 'hello', c: true }], expectedOutput: [1, 'hello', true] }, { input: [{}], expectedOutput: [] } ]),
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
        id: 'get-first-element',
        title: 'Get First Element',
        description: 'Write a function `getFirst` that takes an array and returns its first element. If the array is empty, it should return `undefined`.',
        difficulty: Difficulty.Easy, category: 'Array', group: 'Step 1: Basics I',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array',
        starterCode: `function getFirst(arr) {
  // Your code here
}`,
        testCases: [ { input: [[1, 2, 3]], expectedOutput: 1 } ],
        solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[1, 2, 3]], expectedOutput: 1 }, { input: [['a', 'b']], expectedOutput: 'a' }, { input: [[]], expectedOutput: undefined } ]),
    },
];