import { Problem, Difficulty } from '../../types';
import { runTests } from './utils';

export const arrayManipulation: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
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
    id: 'reverse-an-array',
    title: 'Reverse an Array',
    description: 'Write a function `reverseArray` that takes an array and returns a new array with the elements in reverse order.',
    difficulty: Difficulty.Easy,
    category: 'Array',
    group: 'Step 2: Basics II',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration',
    starterCode: `function reverseArray(arr) {
  // Your code here
}`,
    testCases: [ { input: [[1, 2, 3]], expectedOutput: [3, 2, 1] }, { input: [['a', 'b', 'c']], expectedOutput: ['c', 'b', 'a'] } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[1, 2, 3, 4, 5]], expectedOutput: [5, 4, 3, 2, 1] }, { input: [['h', 'e', 'l', 'l', 'o']], expectedOutput: ['o', 'l', 'l', 'e', 'h'] }, { input: [[true, false]], expectedOutput: [false, true] }, { input: [[]], expectedOutput: [] } ]),
  },
  {
    id: 'remove-duplicates-from-array',
    title: 'Remove Duplicates from Array',
    description: 'Write a function `removeDuplicates` that takes an array and returns a new array with all duplicate elements removed.',
    difficulty: Difficulty.Medium,
    category: 'Array',
    group: 'Step 2: Basics II',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set',
    starterCode: `function removeDuplicates(arr) {
  // Your code here
}`,
    testCases: [ { input: [[1, 2, 2, 3]], expectedOutput: [1, 2, 3] }, { input: [['a', 'b', 'a']], expectedOutput: ['a', 'b'] } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[1, 1, 2, 3, 3, 3]], expectedOutput: [1, 2, 3] }, { input: [[true, false, true]], expectedOutput: [true, false] }, { input: [[5, 5, 5, 5]], expectedOutput: [5] } ]),
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
   {
    id: 'sort-objects-by-property',
    title: 'Sort Objects by Property',
    description: 'Write a function `sortByAge` that takes an array of objects, each with `name` and `age` properties, and sorts them by age in ascending order.',
    difficulty: Difficulty.Medium,
    category: 'Array',
    group: 'Step 2: Basics II',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort',
    starterCode: `function sortByAge(arr) {
  // Your code here
}`,
    testCases: [ { input: [[{name: 'John', age: 30}, {name: 'Jane', age: 25}]], expectedOutput: [{name: 'Jane', age: 25}, {name: 'John', age: 30}] } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[{name: 'John', age: 30}, {name: 'Jane', age: 25}, {name: 'Doe', age: 40}]], expectedOutput: [{name: 'Jane', age: 25}, {name: 'John', age: 30}, {name: 'Doe', age: 40}] } ]),
  },
  {
    id: 'flatten-nested-array',
    title: 'Flatten a Nested Array',
    description: 'Write a function `flatten` that takes a nested array and returns a new flat array.',
    difficulty: Difficulty.Medium,
    category: 'Array',
    group: 'Step 2: Basics II',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat',
    starterCode: `function flatten(arr) {
  // Your code here
}`,
    testCases: [ { input: [[1, [2, [3, 4]]]], expectedOutput: [1, 2, 3, 4] } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[1, [2, 3], 4]], expectedOutput: [1, 2, 3, 4] }, { input: [['a'], ['b', ['c']]], expectedOutput: ['a', 'b', 'c'] } ]),
  },
   {
    id: 'chunk-array',
    title: 'Chunk an Array',
    description: 'Write a function `chunk` that splits an array into chunks of a specified size.',
    difficulty: Difficulty.Medium,
    category: 'Array',
    group: 'Step 2: Basics II',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice',
    starterCode: `function chunk(arr, size) {
  // Your code here
}`,
    testCases: [ { input: [['a', 'b', 'c', 'd'], 2], expectedOutput: [['a', 'b'], ['c', 'd']] }, { input: [[1, 2, 3, 4, 5], 2], expectedOutput: [[1, 2], [3, 4], [5]] } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[1, 2, 3, 4, 5, 6], 3], expectedOutput: [[1, 2, 3], [4, 5, 6]] }, { input: [[1, 2, 3], 1], expectedOutput: [[1], [2], [3]] } ]),
  },
    {
    id: 'find-first-odd-number',
    title: 'Find First Odd Number',
    description: 'Write a function `findOdd` that takes an array of numbers and returns the first odd number found.',
    difficulty: Difficulty.Easy,
    category: 'Array',
    group: 'Step 2: Basics II',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find',
    starterCode: `function findOdd(numbers) {
  // Your code here
}`,
    testCases: [ { input: [[2, 4, 5, 6]], expectedOutput: 5 } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[2, 1, 4, 3]], expectedOutput: 1 }, { input: [[2, 4, 6]], expectedOutput: undefined } ]),
  },
    {
        id: 'group-by-property',
        title: 'Group Objects by Property',
        description: 'Write a function `groupBy` that takes an array of objects and a property name, and returns an object where keys are the property values and values are arrays of objects with that property value.',
        difficulty: Difficulty.Hard,
        category: 'Array',
        group: 'Step 2: Basics II',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce',
        starterCode: `function groupBy(arr, prop) {
  // Your code here
}`,
        testCases: [ { input: [[{type: 'fruit', name: 'apple'}, {type: 'veg', name: 'carrot'}, {type: 'fruit', name: 'banana'}], 'type'], expectedOutput: { fruit: [{type: 'fruit', name: 'apple'}, {type: 'fruit', name: 'banana'}], veg: [{type: 'veg', name: 'carrot'}] } } ],
        solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[{type: 'fruit', name: 'apple'}, {type: 'veg', name: 'carrot'}, {type: 'fruit', name: 'banana'}], 'type'], expectedOutput: { fruit: [{type: 'fruit', name: 'apple'}, {type: 'fruit', name: 'banana'}], veg: [{type: 'veg', name: 'carrot'}] } } ]),
    },
    {
        id: 'array-intersection',
        title: 'Array Intersection',
        description: 'Write a function `intersection` that takes two arrays and returns a new array containing elements that are present in both arrays.',
        difficulty: Difficulty.Medium,
        category: 'Array',
        group: 'Step 2: Basics II',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter',
        starterCode: `function intersection(arr1, arr2) {
  // Your code here
}`,
        testCases: [ { input: [[1, 2, 3], [2, 3, 4]], expectedOutput: [2, 3] } ],
        solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[1, 2, 3], [2, 3, 4]], expectedOutput: [2, 3] }, { input: [['a', 'b'], ['c', 'd']], expectedOutput: [] } ]),
    },
    {
        id: 'array-difference',
        title: 'Array Difference',
        description: 'Write a function `difference` that takes two arrays and returns a new array containing elements that are in the first array but not in the second.',
        difficulty: Difficulty.Medium,
        category: 'Array',
        group: 'Step 2: Basics II',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter',
        starterCode: `function difference(arr1, arr2) {
  // Your code here
}`,
        testCases: [ { input: [[1, 2, 3], [2, 3, 4]], expectedOutput: [1] } ],
        solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[1, 2, 3, 5], [2, 3, 4]], expectedOutput: [1, 5] }, { input: [[1, 2], [1, 2]], expectedOutput: [] } ]),
    },
    {
        id: 'check-for-all-positive',
        title: 'Check for All Positive Numbers',
        description: 'Write a function `allPositive` that takes an array of numbers and returns `true` if all numbers are positive, and `false` otherwise.',
        difficulty: Difficulty.Easy,
        category: 'Array',
        group: 'Step 2: Basics II',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every',
        starterCode: `function allPositive(numbers) {
  // Your code here
}`,
        testCases: [ { input: [[1, 2, 3]], expectedOutput: true }, { input: [[1, -2, 3]], expectedOutput: false } ],
        solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[1, 2, 9]], expectedOutput: true }, { input: [[1, 0, 3]], expectedOutput: false } ]),
    },
    {
        id: 'zip-two-arrays',
        title: 'Zip Two Arrays',
        description: 'Write a function `zip` that takes two arrays and returns a new array of pairs, where each pair contains one element from each of the input arrays.',
        difficulty: Difficulty.Medium,
        category: 'Array',
        group: 'Step 2: Basics II',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array',
        starterCode: `function zip(arr1, arr2) {
  // Your code here
}`,
        testCases: [ { input: [['a', 'b'], [1, 2]], expectedOutput: [['a', 1], ['b', 2]] } ],
        solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[1, 2, 3], [4, 5, 6]], expectedOutput: [[1, 4], [2, 5], [3, 6]] }, { input: [['a'], []], expectedOutput: [] } ]),
    },
];