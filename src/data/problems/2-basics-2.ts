import { Problem, Difficulty } from '../../types';
import { runTests } from './utils';

export const arrayManipulation: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'get-first-element',
    title: 'Get First Element of an Array',
    description: 'Write a function `getFirst` that takes an array and returns its first element. If the array is empty, it should return `undefined`.',
    difficulty: Difficulty.Easy,
    category: 'Array',
    group: 'Step 2: Basics II',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array',
    starterCode: `function getFirst(arr) {
  // Your code here
}`,
    testCases: [ { input: [[1, 2, 3]], expectedOutput: 1 }, { input: [[]], expectedOutput: undefined } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[1, 2, 3]], expectedOutput: 1 }, { input: [['a', 'b']], expectedOutput: 'a' }, { input: [[]], expectedOutput: undefined } ]),
  },
  {
    id: 'get-object-keys',
    title: 'Get Object Keys',
    description: "Write a function `getKeys` that takes an object and returns an array of its keys.",
    difficulty: Difficulty.Easy,
    category: 'Object',
    group: 'Step 2: Basics II',
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
    group: 'Step 2: Basics II',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration#for_statement',
    starterCode: `function countToN(n) {
  // Your code here
}`,
    testCases: [ { input: [5], expectedOutput: [1,2,3,4,5] }, { input: [1], expectedOutput: [1] } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [5], expectedOutput: [1,2,3,4,5] }, { input: [1], expectedOutput: [1] }, { input: [0], expectedOutput: [] } ]),
  },
  {
    id: 'find-max-number',
    title: 'Find Maximum Number in an Array',
    description: 'Write a function `findMax` that takes an array of numbers and returns the largest number in the array.',
    difficulty: Difficulty.Easy,
    category: 'Array',
    group: 'Step 2: Basics II',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max',
    starterCode: `function findMax(numbers) {
  // Your code here
}`,
    testCases: [ { input: [[1, 2, 3, 4, 5]], expectedOutput: 5 }, { input: [[-1, -5, -2]], expectedOutput: -1 } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[1, 2, 3, 4, 5]], expectedOutput: 5 }, { input: [[-1, -5, -2]], expectedOutput: -1 }, { input: [[100]], expectedOutput: 100 }, { input: [[15, 2, 99, 45, 60]], expectedOutput: 99 } ]),
  },
  {
    id: 'filter-positive-numbers',
    title: 'Filter Positive Numbers',
    description: 'Write a function `filterPositive` that takes an array of numbers and returns a new array containing only the positive numbers.',
    difficulty: Difficulty.Easy,
    category: 'Array',
    group: 'Step 2: Basics II',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter',
    starterCode: `function filterPositive(numbers) {
  // Your code here
}`,
    testCases: [ { input: [[-1, 1, -2, 2]], expectedOutput: [1, 2] } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[-1, 1, -2, 2, 0]], expectedOutput: [1, 2] }, { input: [[1, 2, 3]], expectedOutput: [1, 2, 3] }, { input: [[-1, -2, -3]], expectedOutput: [] } ]),
  },
  {
    id: 'sum-array-elements',
    title: 'Sum of Array Elements',
    description: 'Write a function `sumArray` that takes an array of numbers and returns their sum.',
    difficulty: Difficulty.Easy,
    category: 'Array',
    group: 'Step 2: Basics II',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce',
    starterCode: `function sumArray(arr) {
  // Your code here
}`,
    testCases: [ { input: [[1, 2, 3]], expectedOutput: 6 }, { input: [[10, -5, 2]], expectedOutput: 7 } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[1, 2, 3, 4, 5]], expectedOutput: 15 }, { input: [[-1, -2, -3]], expectedOutput: -6 }, { input: [[]], expectedOutput: 0 } ]),
  },
  {
    id: 'check-property',
    title: 'Check Object Property',
    description: 'Write a function `hasProperty` that takes an object and a property name (string) and returns `true` if the object has the property, `false` otherwise.',
    difficulty: Difficulty.Easy,
    category: 'Object',
    group: 'Step 2: Basics II',
    docsUrl: 'https://developer.mozilla.org/en/US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty',
    starterCode: `function hasProperty(obj, prop) {
  // Your code here
}`,
    testCases: [ { input: [{ a: 1 }, 'a'], expectedOutput: true }, { input: [{ a: 1 }, 'b'], expectedOutput: false } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [{ a: 1, b: 2 }, 'b'], expectedOutput: true }, { input: [{}, 'a'], expectedOutput: false } ]),
  },
  {
    id: 'find-element-index',
    title: 'Find Element Index in Array',
    description: 'Write a function `findIndex` that takes an array and an element, and returns the index of the first occurrence of the element. If the element is not found, return -1.',
    difficulty: Difficulty.Easy,
    category: 'Array',
    group: 'Step 2: Basics II',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf',
    starterCode: `function findIndex(arr, el) {
  // Your code here
}`,
    testCases: [ { input: [[1, 2, 3, 2], 2], expectedOutput: 1 }, { input: [[1, 2, 3], 4], expectedOutput: -1 } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[1, 2, 3, 2], 2], expectedOutput: 1 }, { input: [[1, 2, 3], 4], expectedOutput: -1 }, { input: [['a', 'b', 'c'], 'c'], expectedOutput: 2 } ]),
  },
];
