/* eslint-disable @typescript-eslint/no-unused-expressions */
// Fix: Use a relative path for the `types` import to resolve the module loading error.
import { Problem, Difficulty, ProblemStatus, TestCase, TestResult } from '../types';

const runTests = (userCode: string, testCases: TestCase[]): TestResult[] => {
  try {
    // This regex is a simple attempt to prevent infinite loops. Not foolproof.
    if (/while\s*\(\s*true\s*\)|for\s*\(\s*;\s*;\s*\)/.test(userCode)) {
        throw new Error("Potential infinite loop detected.");
    }
    const userFn = new Function(`return ${userCode}`)();
    
    if (typeof userFn !== 'function') {
        throw new Error('Provided code is not a function.');
    }

    return testCases.map(tc => {
      let actualOutput: unknown;
      let passed = false;
      try {
        actualOutput = userFn(...tc.input);
        passed = JSON.stringify(actualOutput) === JSON.stringify(tc.expectedOutput);
      } catch (error: unknown) {
        actualOutput = `Error: ${(error instanceof Error) ? error.message : 'Unknown error'}`;
        passed = false;
      }
      
      return {
        input: JSON.stringify(tc.input),
        expected: JSON.stringify(tc.expectedOutput),
        actual: JSON.stringify(actualOutput),
        passed,
      };
    });
  } catch (error: unknown) {
    return testCases.map(tc => ({
        input: JSON.stringify(tc.input),
        expected: JSON.stringify(tc.expectedOutput),
        actual: `Syntax/Runtime Error: ${(error instanceof Error) ? error.message : 'Unknown error'}`,
        passed: false,
    }));
  }
};

export const problemsData: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  // Group 1: Learn the basics
  {
    id: 'sum-two-numbers',
    title: 'Sum Two Numbers',
    description: 'Write a function `sum` that takes two numbers, `a` and `b`, as arguments and returns their sum.',
    difficulty: Difficulty.Easy,
    category: 'Function',
    group: 'Step 1: Learn the basics',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition',
    starterCode: 'function sum(a, b) {\n  // Your code here\n}',
    testCases: [ { input: [1, 2], expectedOutput: 3 }, { input: [10, -5], expectedOutput: 5 }, ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [1, 2], expectedOutput: 3 }, { input: [10, -5], expectedOutput: 5 }, { input: [0, 0], expectedOutput: 0 }, { input: [-1, -1], expectedOutput: -2 }, ]),
  },
  {
    id: 'is-even',
    title: 'Check if Number is Even',
    description: 'Write a function `isEven` that takes a number and returns `true` if it is even, and `false` otherwise.',
    difficulty: Difficulty.Easy,
    category: 'Math',
    group: 'Step 1: Learn the basics',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder',
    starterCode: 'function isEven(n) {\n  // Your code here\n}',
    testCases: [ { input: [2], expectedOutput: true }, { input: [3], expectedOutput: false } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [2], expectedOutput: true }, { input: [3], expectedOutput: false }, { input: [0], expectedOutput: true }, { input: [-4], expectedOutput: true } ]),
  },
  {
    id: 'string-length',
    title: 'String Length',
    description: 'Write a function `stringLength` that returns the length of a given string.',
    difficulty: Difficulty.Easy,
    category: 'String',
    group: 'Step 1: Learn the basics',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length',
    starterCode: 'function stringLength(str) {\n  // Your code here\n}',
    testCases: [ { input: ['hello'], expectedOutput: 5 }, { input: [''], expectedOutput: 0 } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: ['hello'], expectedOutput: 5 }, { input: [''], expectedOutput: 0 }, { input: ['JavaScript'], expectedOutput: 10 } ]),
  },
  {
    id: 'get-object-keys',
    title: 'Get Object Keys',
    description: "Write a function `getKeys` that takes an object and returns an array of its keys.",
    difficulty: Difficulty.Easy,
    category: 'Object',
    group: 'Step 1: Learn the basics',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys',
    starterCode: 'function getKeys(obj) {\n  // Your code here\n}',
    testCases: [ { input: [{a: 1, b: 2}], expectedOutput: ['a', 'b'] }, { input: [{}], expectedOutput: [] }, ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [{ a: 1, b: 2, c: 3 }], expectedOutput: ['a', 'b', 'c'] }, { input: [{ name: 'John', age: 30 }], expectedOutput: ['name', 'age'] }, { input: [{}], expectedOutput: [] }, ]),
  },
  {
    id: 'simple-loop',
    title: 'Simple For Loop',
    description: 'Write a function `countToN` that takes a number `n` and returns an array of numbers from 1 to `n`.',
    difficulty: Difficulty.Easy,
    category: 'Loop',
    group: 'Step 1: Learn the basics',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration#for_statement',
    starterCode: 'function countToN(n) {\n  // Your code here\n}',
    testCases: [ { input: [5], expectedOutput: [1,2,3,4,5] }, { input: [1], expectedOutput: [1] } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [5], expectedOutput: [1,2,3,4,5] }, { input: [1], expectedOutput: [1] }, { input: [0], expectedOutput: [] } ]),
  },


  // Group 2: Array Manipulation
  {
    id: 'find-max-number',
    title: 'Find Max Number in Array',
    description: 'Write a function `findMax` that takes an array of numbers and returns the largest number in the array.',
    difficulty: Difficulty.Easy,
    category: 'Array',
    group: 'Step 2: Array Manipulation',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max',
    starterCode: 'function findMax(numbers) {\n  // Your code here\n}',
    testCases: [ { input: [[1, 2, 3, 4, 5]], expectedOutput: 5 }, { input: [[-1, -5, -2]], expectedOutput: -1 } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[1, 2, 3, 4, 5]], expectedOutput: 5 }, { input: [[-1, -5, -2]], expectedOutput: -1 }, { input: [[100]], expectedOutput: 100 }, { input: [[15, 2, 99, 45, 60]], expectedOutput: 99 } ]),
  },
  {
    id: 'array-sum',
    title: 'Sum of Array Elements',
    description: 'Write a function `arraySum` that takes an array of numbers and returns their sum.',
    difficulty: Difficulty.Easy,
    category: 'Array',
    group: 'Step 2: Array Manipulation',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce',
    starterCode: 'function arraySum(arr) {\n  // Your code here\n}',
    testCases: [ { input: [[1, 2, 3]], expectedOutput: 6 }, { input: [[10, -5, 5]], expectedOutput: 10 } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[1, 2, 3, 4, 5]], expectedOutput: 15 }, { input: [[-1, -2, 3]], expectedOutput: 0 }, { input: [[]], expectedOutput: 0 } ]),
  },
  {
    id: 'filter-positive-numbers',
    title: 'Filter Positive Numbers',
    description: 'Write a function `filterPositive` that takes an array of numbers and returns a new array containing only the positive numbers.',
    difficulty: Difficulty.Easy,
    category: 'Array',
    group: 'Step 2: Array Manipulation',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter',
    starterCode: 'function filterPositive(numbers) {\n  // Your code here\n}',
    testCases: [ { input: [[-1, 1, -2, 2]], expectedOutput: [1, 2] } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[-1, 1, -2, 2, 0]], expectedOutput: [1, 2] }, { input: [[1, 2, 3]], expectedOutput: [1, 2, 3] }, { input: [[-1, -2, -3]], expectedOutput: [] } ]),
  },
  {
    id: 'map-to-squares',
    title: 'Map to Squares',
    description: 'Write a function `mapToSquares` that takes an array of numbers and returns a new array with each number squared.',
    difficulty: Difficulty.Easy,
    category: 'Array',
    group: 'Step 2: Array Manipulation',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map',
    starterCode: 'function mapToSquares(numbers) {\n  // Your code here\n}',
    testCases: [ { input: [[1, 2, 3]], expectedOutput: [1, 4, 9] } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[1, 2, 3, 4]], expectedOutput: [1, 4, 9, 16] }, { input: [[0, -5]], expectedOutput: [0, 25] }, { input: [[]], expectedOutput: [] } ]),
  },
  {
    id: 'reverse-array',
    title: 'Reverse an Array',
    description: 'Write a function `reverseArray` that takes an array and returns a new array with the elements in reverse order. Do not use the built-in `.reverse()` method.',
    difficulty: Difficulty.Medium,
    category: 'Array',
    group: 'Step 2: Array Manipulation',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration',
    starterCode: 'function reverseArray(arr) {\n  // Your code here\n}',
    testCases: [ { input: [[1, 2, 3]], expectedOutput: [3, 2, 1] }, { input: [['a', 'b', 'c']], expectedOutput: ['c', 'b', 'a'] } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[1, 2, 3, 4, 5]], expectedOutput: [5, 4, 3, 2, 1] }, { input: [['h', 'e', 'l', 'l', 'o']], expectedOutput: ['o', 'l', 'l', 'e', 'h'] }, { input: [[true, false]], expectedOutput: [false, true] }, { input: [[]], expectedOutput: [] } ]),
  },
  {
    id: 'remove-duplicates',
    title: 'Remove Duplicates from Array',
    description: 'Write a function `removeDuplicates` that takes an array and returns a new array with duplicates removed.',
    difficulty: Difficulty.Medium,
    category: 'Array',
    group: 'Step 2: Array Manipulation',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set',
    starterCode: 'function removeDuplicates(arr) {\n  // Your code here\n}',
    testCases: [ { input: [[1, 2, 2, 3]], expectedOutput: [1, 2, 3] }, { input: [['a', 'b', 'a']], expectedOutput: ['a', 'b'] } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[1, 1, 2, 3, 3, 3]], expectedOutput: [1, 2, 3] }, { input: [[true, false, true]], expectedOutput: [true, false] }, { input: [[5, 5, 5, 5]], expectedOutput: [5] } ]),
  },

  // Group 3: String Operations
  {
    id: 'reverse-string',
    title: 'Reverse a String',
    description: 'Write a function `reverseString` that takes a string and returns a new string with the characters in reverse order.',
    difficulty: Difficulty.Easy,
    category: 'String',
    group: 'Step 3: String Operations',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split',
    starterCode: 'function reverseString(str) {\n  // Your code here\n}',
    testCases: [ { input: ['hello'], expectedOutput: 'olleh' }, { input: ['world'], expectedOutput: 'dlrow' } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: ['hello'], expectedOutput: 'olleh' }, { input: ['JavaScript'], expectedOutput: 'tpircSavaJ' }, { input: [''], expectedOutput: '' } ]),
  },
  {
    id: 'palindrome-check',
    title: 'Palindrome Check',
    description: 'Write a function `isPalindrome` that takes a string and returns `true` if the string is a palindrome and `false` otherwise. A palindrome is a word that reads the same forwards and backward. Ignore case and non-alphanumeric characters.',
    difficulty: Difficulty.Medium,
    category: 'String',
    group: 'Step 3: String Operations',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split',
    starterCode: 'function isPalindrome(str) {\n  // Your code here\n}',
    testCases: [ { input: ['racecar'], expectedOutput: true }, { input: ['A man, a plan, a canal: Panama'], expectedOutput: true } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: ['racecar'], expectedOutput: true }, { input: ['hello'], expectedOutput: false }, { input: ['level'], expectedOutput: true }, { input: ['A man, a plan, a canal: Panama'], expectedOutput: true }, { input: ['No lemon, no melon'], expectedOutput: true } ]),
  },
  {
    id: 'count-vowels',
    title: 'Count Vowels',
    description: 'Write a function `countVowels` that takes a string and returns the number of vowels (a, e, i, o, u, case-insensitive) in it.',
    difficulty: Difficulty.Medium,
    category: 'String',
    group: 'Step 3: String Operations',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match',
    starterCode: 'function countVowels(str) {\n  // Your code here\n}',
    testCases: [ { input: ['hello'], expectedOutput: 2 }, { input: ['javascript'], expectedOutput: 3 } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: ['hello world'], expectedOutput: 3 }, { input: ['AEIOU'], expectedOutput: 5 }, { input: ['rhythm'], expectedOutput: 0 } ]),
  },
  {
    id: 'capitalize-string',
    title: 'Capitalize String',
    description: 'Write a function `capitalize` that takes a string and returns a new string with the first character capitalized.',
    difficulty: Difficulty.Easy,
    category: 'String',
    group: 'Step 3: String Operations',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase',
    starterCode: 'function capitalize(str) {\n  // Your code here\n}',
    testCases: [ { input: ['hello'], expectedOutput: 'Hello' }, { input: ['world'], expectedOutput: 'World' } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: ['hello'], expectedOutput: 'Hello' }, { input: ['javaScript'], expectedOutput: 'JavaScript' }, { input: [''], expectedOutput: '' } ]),
  },


  // Group 4: Algorithms
  {
    id: 'factorial',
    title: 'Factorial',
    description: 'Write a function `factorial` that takes a non-negative integer `n` and returns its factorial.',
    difficulty: Difficulty.Medium,
    category: 'Algorithm',
    group: 'Step 4: Algorithms',
    docsUrl: 'https://en.wikipedia.org/wiki/Factorial',
    starterCode: 'function factorial(n) {\n  // Your code here\n}',
    testCases: [ { input: [5], expectedOutput: 120 }, { input: [0], expectedOutput: 1 } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [5], expectedOutput: 120 }, { input: [0], expectedOutput: 1 }, { input: [1], expectedOutput: 1 }, { input: [10], expectedOutput: 3628800 } ]),
  },
  {
    id: 'fibonacci-sequence',
    title: 'Fibonacci Sequence',
    description: 'Write a function `fibonacci` that takes a number `n` and returns the nth number in the Fibonacci sequence. The sequence starts with 0 and 1.',
    difficulty: Difficulty.Medium,
    category: 'Algorithm',
    group: 'Step 4: Algorithms',
    docsUrl: 'https://en.wikipedia.org/wiki/Fibonacci_number',
    starterCode: 'function fibonacci(n) {\n  // Your code here\n}',
    testCases: [ { input: [6], expectedOutput: 8 }, { input: [10], expectedOutput: 55 } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [0], expectedOutput: 0 }, { input: [1], expectedOutput: 1 }, { input: [6], expectedOutput: 8 }, { input: [10], expectedOutput: 55 }, { input: [15], expectedOutput: 610 } ]),
  },
  {
    id: 'two-sum',
    title: 'Two Sum',
    description: 'Given an array of integers `nums` and an integer `target`, write a function `twoSum` that returns indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice. The result should be sorted.',
    difficulty: Difficulty.Medium,
    category: 'Array',
    group: 'Step 4: Algorithms',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map',
    starterCode: 'function twoSum(nums, target) {\n  // Your code here\n}',
    testCases: [ { input: [[2, 7, 11, 15], 9], expectedOutput: [0, 1] }, { input: [[3, 2, 4], 6], expectedOutput: [1, 2] } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[2, 7, 11, 15], 9], expectedOutput: [0, 1] }, { input: [[3, 2, 4], 6], expectedOutput: [1, 2] }, { input: [[3, 3], 6], expectedOutput: [0, 1] }, { input: [[-1, -2, -3, -4, -5], -8], expectedOutput: [2, 4] } ]),
  },
  {
    id: 'is-anagram',
    title: 'Check for Anagrams',
    description: 'Write a function `isAnagram` that takes two strings and returns `true` if they are anagrams of each other (contain the same characters in any order), and `false` otherwise.',
    difficulty: Difficulty.Medium,
    category: 'String',
    group: 'Step 4: Algorithms',
    docsUrl: 'https://en.wikipedia.org/wiki/Anagram',
    starterCode: 'function isAnagram(str1, str2) {\n  // Your code here\n}',
    testCases: [ { input: ['listen', 'silent'], expectedOutput: true }, { input: ['hello', 'world'], expectedOutput: false } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: ['listen', 'silent'], expectedOutput: true }, { input: ['hello', 'world'], expectedOutput: false }, { input: ['rail safety', 'fairy tales'], expectedOutput: true }, { input: ['Dormitory', 'dirty room'], expectedOutput: true } ]),
  },
  {
    id: 'bubble-sort',
    title: 'Bubble Sort',
    description: 'Write a function `bubbleSort` that implements the bubble sort algorithm to sort an array of numbers.',
    difficulty: Difficulty.Hard,
    category: 'Algorithm',
    group: 'Step 4: Algorithms',
    docsUrl: 'https://en.wikipedia.org/wiki/Bubble_sort',
    starterCode: 'function bubbleSort(arr) {\n  // Your code here\n}',
    testCases: [ { input: [[5, 3, 8, 2, 1]], expectedOutput: [1, 2, 3, 5, 8] } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[5, 3, 8, 2, 1, 4]], expectedOutput: [1, 2, 3, 4, 5, 8] }, { input: [[-1, -5, 0, 5, 1]], expectedOutput: [-5, -1, 0, 1, 5] }, { input: [[1]], expectedOutput: [1] } ]),
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    description: 'Write a function `binarySearch` that takes a sorted array of numbers and a target value, and returns the index of the target. If the target is not found, return -1.',
    difficulty: Difficulty.Hard,
    category: 'Algorithm',
    group: 'Step 4: Algorithms',
    docsUrl: 'https://en.wikipedia.org/wiki/Binary_search_algorithm',
    starterCode: 'function binarySearch(arr, target) {\n  // Your code here\n}',
    testCases: [ { input: [[1, 2, 3, 4, 5], 3], expectedOutput: 2 }, { input: [[1, 2, 3, 4, 5], 6], expectedOutput: -1 } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[1, 2, 3, 4, 5, 6], 4], expectedOutput: 3 }, { input: [[-5, -1, 0, 3, 8], -1], expectedOutput: 1 }, { input: [[10, 20, 30], 35], expectedOutput: -1 } ]),
  },

  // Group 5: Object & Function Mastery
  {
    id: 'object-merge',
    title: 'Merge Objects',
    description: 'Write a function `mergeObjects` that takes two objects and returns a new object with properties from both. If a key exists in both, the value from the second object should be used.',
    difficulty: Difficulty.Medium,
    category: 'Object',
    group: 'Step 5: Object & Function Mastery',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax',
    starterCode: 'function mergeObjects(obj1, obj2) {\n  // Your code here\n}',
    testCases: [ { input: [{a:1, b:2}, {b:3, c:4}], expectedOutput: {a:1, b:3, c:4} } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [{a:1, b:2}, {b:3, c:4}], expectedOutput: {a:1, b:3, c:4} }, { input: [{name: 'John'}, {age: 30}], expectedOutput: {name: 'John', age: 30} } ]),
  },
  {
    id: 'debounce-function',
    title: 'Debounce Function',
    description: 'Write a higher-order function `debounce` that takes a function `func` and a delay `wait`. It should return a new function that, as long as it continues to be invoked, will not be triggered. The function will be called only once after it stops being called for `wait` milliseconds.',
    difficulty: Difficulty.Hard,
    category: 'Function',
    group: 'Step 5: Object & Function Mastery',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/setTimeout',
    starterCode: 'function debounce(func, wait) {\n  // Your code here\n  // Note: This is a conceptual challenge.\n}',
    testCases: [ { input: [], expectedOutput: "Conceptual: Cannot be auto-tested here." } ],
    solutionCheck: (_userCode: string): TestResult[] => [{ input: 'N/A', expected: 'Conceptual', actual: 'This assignment requires manual verification as it involves timing.', passed: false, }],
  },
  {
    id: 'currying',
    title: 'Currying Function',
    description: 'Write a function `curry` that takes a function `fn` and returns a curried version of it. For example, `curry(sum)(1)(2)` should return `3` if `sum` is a function that adds two numbers.',
    difficulty: Difficulty.Hard,
    category: 'Function',
    group: 'Step 5: Object & Function Mastery',
    docsUrl: 'https://javascript.info/currying-partials',
    starterCode: 'function curry(fn) {\n  // Your code here\n // Conceptual\n}',
    testCases: [ { input: [], expectedOutput: "Conceptual: Cannot be auto-tested here." } ],
    solutionCheck: (_userCode: string): TestResult[] => [{ input: 'N/A', expected: 'Conceptual', actual: 'This assignment requires manual verification.', passed: false, }],
  },
  {
    id: 'deep-clone',
    title: 'Deep Clone Object',
    description: 'Write a function `deepClone` that creates a deep copy of a nested object or array.',
    difficulty: Difficulty.Hard,
    category: 'Object',
    group: 'Step 5: Object & Function Mastery',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse',
    starterCode: 'function deepClone(obj) {\n  // Your code here\n}',
    testCases: [ { input: [{a: 1, b: { c: 2 }}], expectedOutput: {a: 1, b: { c: 2 }} } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [{a: 1, b: { c: 2 }}], expectedOutput: {a: 1, b: { c: 2 }} }, { input: [[1, [2, 3]]], expectedOutput: [1, [2, 3]] } ]),
  },
  
  // Group 6: Asynchronous JavaScript
  {
    id: 'create-promise',
    title: 'Create a Simple Promise',
    description: 'Write a function `simplePromise` that returns a Promise which resolves with the string "Hello, World!" after 100ms.',
    difficulty: Difficulty.Easy,
    category: 'Async',
    group: 'Step 6: Asynchronous JavaScript',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise',
    starterCode: 'function simplePromise() {\n  // Your code here\n // Return new Promise(...)\n}',
    testCases: [],
    solutionCheck: (userCode: string) => {
        try {
            const userFn = new Function(`return ${userCode}`)();
            if (typeof userFn !== 'function') throw new Error("Not a function");
            const p = userFn();
            if (typeof p.then !== 'function') throw new Error("Did not return a promise");
            
            // This is a simplified test for async code.
            return [{ input: 'N/A', expected: 'Promise resolving to "Hello, World!"', actual: 'Assuming code is correct. Manual verification needed for timing.', passed: true }];
        } catch (e: unknown) {
            return [{ input: 'N/A', expected: 'A valid promise function', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }];
        }
    },
  },
  {
    id: 'fetch-data',
    title: 'Fetch API Data',
    description: 'Write an async function `fetchData` that fetches data from `https://api.example.com/data` and returns the JSON response. This is a conceptual problem to test async/await and fetch knowledge.',
    difficulty: Difficulty.Medium,
    category: 'Async',
    group: 'Step 6: Asynchronous JavaScript',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch',
    starterCode: 'async function fetchData() {\n  // Your code here\n // Return mock data for testing: { success: true }\n}',
    testCases: [ { input: [], expectedOutput: { success: true } } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [], expectedOutput: { success: true } } ]),
  },
  {
    id: 'promise-all',
    title: 'Using Promise.all',
    description: 'Write a function `fetchAll` that takes an array of URLs, fetches them all using `Promise.all`, and returns an array of their JSON responses. For this conceptual test, mock the fetch calls.',
    difficulty: Difficulty.Hard,
    category: 'Async',
    group: 'Step 6: Asynchronous JavaScript',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all',
    starterCode: 'async function fetchAll(urls) {\n  // Your code here\n  // For testing, return a mock array like [{data: 1}, {data: 2}]\n}',
    testCases: [ { input: [['url1', 'url2']], expectedOutput: [{data: 1}, {data: 2}] } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [['url1', 'url2']], expectedOutput: [{data: 1}, {data: 2}] } ]),
  },

  // Group 7: DOM Manipulation (Conceptual)
  {
    id: 'dom-change-text',
    title: 'Change Text Content',
    description: 'Write a function `changeText` that takes a DOM element and a string, and changes the element\'s text content to the given string.\n\n**Note:** This is a conceptual challenge. The test will use a mock object to verify your logic.',
    difficulty: Difficulty.Easy,
    category: 'DOM',
    group: 'Step 7: DOM Manipulation (Conceptual)',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent',
    starterCode: 'function changeText(element, newText) {\n  // Your code here\n}',
    testCases: [],
    solutionCheck: (userCode: string) => {
        try {
            const userFn = new Function(`return ${userCode}`)();
            const mockElement = { textContent: '' };
            userFn(mockElement, 'Test Passed');
            if (mockElement.textContent === 'Test Passed') {
                return [{ input: 'mockElement, "Test Passed"', expected: 'textContent to be "Test Passed"', actual: 'textContent was set correctly', passed: true }];
            }
            return [{ input: 'mockElement, "Test Passed"', expected: 'textContent to be "Test Passed"', actual: `textContent is "${mockElement.textContent}"`, passed: false }];
        } catch(e: unknown) {
            return [{ input: 'N/A', expected: 'Function to modify textContent', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }];
        }
    }
  },
  {
    id: 'dom-add-class',
    title: 'Add a CSS Class',
    description: 'Write a function `addClass` that takes a DOM element and a class name, and adds the class to the element\'s class list.\n\n**Note:** This is a conceptual challenge. The test will use a mock object to verify your logic.',
    difficulty: Difficulty.Easy,
    category: 'DOM',
    group: 'Step 7: DOM Manipulation (Conceptual)',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/classList',
    starterCode: 'function addClass(element, className) {\n  // Your code here\n}',
    testCases: [],
    solutionCheck: (userCode: string) => {
        try {
            const userFn = new Function(`return ${userCode}`)();
            const mockElement = { classList: { list: [] as string[], add(c: string) { this.list.push(c) } } };
            userFn(mockElement, 'new-class');
            if (mockElement.classList.list.includes('new-class')) {
                return [{ input: 'mockElement, "new-class"', expected: 'class added', actual: 'class was added correctly', passed: true }];
            }
            return [{ input: 'mockElement, "new-class"', expected: 'class added', actual: `class was not added`, passed: false }];
        } catch(e: unknown) {
            return [{ input: 'N/A', expected: 'Function to add a class', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }];
        }
    }
  },
  {
    id: 'dom-set-attribute',
    title: 'Set an Attribute',
    description: 'Write a function `setAttr` that takes a DOM element, an attribute name, and a value, and sets the attribute on the element.\n\n**Note:** This is a conceptual challenge. The test will use a mock object to verify your logic.',
    difficulty: Difficulty.Medium,
    category: 'DOM',
    group: 'Step 7: DOM Manipulation (Conceptual)',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute',
    starterCode: 'function setAttr(element, attrName, attrValue) {\n  // Your code here\n}',
    testCases: [],
    solutionCheck: (userCode: string) => {
        try {
            const userFn = new Function(`return ${userCode}`)();
            const mockElement = { attributes: {} as Record<string, unknown>, setAttribute(k: string, v: unknown) { this.attributes[k] = v; } };
            userFn(mockElement, 'data-test', 'success');
            if (mockElement.attributes['data-test'] === 'success') {
                return [{ input: 'mockElement, "data-test", "success"', expected: 'attribute set', actual: 'attribute was set correctly', passed: true }];
            }
             return [{ input: 'mockElement, "data-test", "success"', expected: 'attribute set', actual: 'attribute was not set', passed: false }];
        } catch(e: unknown) {
            return [{ input: 'N/A', expected: 'Function to set an attribute', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }];
        }
    }
  },
];

// Add more problems to reach 50+
const extraProblems: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'find-index',
    title: 'Find Index of Element',
    description: 'Write a function `findIndex` that takes an array and an element, and returns the index of the first occurrence of that element, or -1 if not found.',
    difficulty: Difficulty.Easy,
    category: 'Array',
    group: 'Step 2: Array Manipulation',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf',
    starterCode: 'function findIndex(arr, el) {\n  // Your code here\n}',
    testCases: [ { input: [[1, 2, 3, 2], 2], expectedOutput: 1 }, { input: [[1, 2, 3], 4], expectedOutput: -1 } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[1, 2, 3, 2], 2], expectedOutput: 1 }, { input: [[1, 2, 3], 4], expectedOutput: -1 }, { input: [['a', 'b', 'c'], 'c'], expectedOutput: 2 } ]),
  },
  {
    id: 'string-to-uppercase',
    title: 'String to Uppercase',
    description: 'Write a function `toUpperCase` that converts a string to uppercase.',
    difficulty: Difficulty.Easy,
    category: 'String',
    group: 'Step 3: String Operations',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase',
    starterCode: 'function toUpperCase(str) {\n  // Your code here\n}',
    testCases: [ { input: ['hello'], expectedOutput: 'HELLO' } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: ['hello'], expectedOutput: 'HELLO' }, { input: ['JavaScript'], expectedOutput: 'JAVASCRIPT' } ]),
  },
  {
    id: 'check-property',
    title: 'Check Object Property',
    description: 'Write a function `hasProperty` that takes an object and a property name (string) and returns `true` if the object has the property, `false` otherwise.',
    difficulty: Difficulty.Easy,
    category: 'Object',
    group: 'Step 5: Object & Function Mastery',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty',
    starterCode: 'function hasProperty(obj, prop) {\n  // Your code here\n}',
    testCases: [ { input: [{ a: 1 }, 'a'], expectedOutput: true }, { input: [{ a: 1 }, 'b'], expectedOutput: false } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [{ a: 1, b: 2 }, 'b'], expectedOutput: true }, { input: [{}, 'a'], expectedOutput: false } ]),
  },
   {
    id: 'array-of-objects-sort',
    title: 'Sort Array of Objects',
    description: 'Write a function `sortByAge` that takes an array of objects, each with a `name` and `age` property, and sorts them by age in ascending order.',
    difficulty: Difficulty.Medium,
    category: 'Array',
    group: 'Step 2: Array Manipulation',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort',
    starterCode: 'function sortByAge(arr) {\n  // Your code here\n}',
    testCases: [ { input: [[{name: 'John', age: 30}, {name: 'Jane', age: 25}]], expectedOutput: [{name: 'Jane', age: 25}, {name: 'John', age: 30}] } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[{name: 'John', age: 30}, {name: 'Jane', age: 25}, {name: 'Doe', age: 40}]], expectedOutput: [{name: 'Jane', age: 25}, {name: 'John', age: 30}, {name: 'Doe', age: 40}] } ]),
  },
  {
    id: 'truncate-string',
    title: 'Truncate a String',
    description: 'Write a function `truncate` that truncates a string if it is longer than the given maximum string length. The result should end with "..." and its total length should not exceed the max length.',
    difficulty: Difficulty.Medium,
    category: 'String',
    group: 'Step 3: String Operations',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice',
    starterCode: 'function truncate(str, maxLength) {\n  // Your code here\n}',
    testCases: [ { input: ['Hello world', 8], expectedOutput: 'Hello...' } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: ['This is a long string', 10], expectedOutput: 'This is...' }, { input: ['Short', 10], expectedOutput: 'Short' } ]),
  },
  {
    id: 'flatten-array',
    title: 'Flatten a Nested Array',
    description: 'Write a function `flatten` that takes a nested array and returns a single flattened array.',
    difficulty: Difficulty.Hard,
    category: 'Array',
    group: 'Step 2: Array Manipulation',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat',
    starterCode: 'function flatten(arr) {\n  // Your code here\n}',
    testCases: [ { input: [[1, [2, [3, 4]]]], expectedOutput: [1, 2, 3, 4] } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[1, [2, 3], 4]], expectedOutput: [1, 2, 3, 4] }, { input: [[['a'], ['b', ['c']]]], expectedOutput: ['a', 'b', 'c'] } ]),
  },
  {
    id: 'async-timeout',
    title: 'Async with setTimeout',
    description: 'Write an async function `wait` that takes a number of milliseconds and resolves a promise after that delay.',
    difficulty: Difficulty.Easy,
    category: 'Async',
    group: 'Step 6: Asynchronous JavaScript',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/setTimeout',
    starterCode: 'function wait(ms) {\n // Return new Promise(...)\n}',
    testCases: [],
    solutionCheck: (userCode: string) => {
        try {
            const userFn = new Function(`return ${userCode}`)();
            const p = userFn(10);
             if (typeof p.then !== 'function') throw new Error("Did not return a promise");
            return [{ input: '10', expected: 'Promise to resolve after delay', actual: 'Assuming code is correct. Manual verification needed for timing.', passed: true }];
        } catch (e: unknown) {
            return [{ input: '10', expected: 'A valid promise function', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }];
        }
    },
  },
  {
    id: 'get-object-values',
    title: 'Get Object Values',
    description: 'Write a function `getValues` that takes an object and returns an array of its values.',
    difficulty: Difficulty.Easy,
    category: 'Object',
    group: 'Step 1: Learn the basics',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values',
    starterCode: 'function getValues(obj) {\n  // Your code here\n}',
    testCases: [ { input: [{ a: 1, b: 2 }], expectedOutput: [1, 2] } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [{ a: 1, b: 'hello', c: true }], expectedOutput: [1, 'hello', true] }, { input: [{}], expectedOutput: [] } ]),
  },
   {
    id: 'chunk-array',
    title: 'Chunk an Array',
    description: 'Write a function `chunk` that splits an array into groups the length of `size`. If the array can\'t be split evenly, the final chunk will be the remaining elements.',
    difficulty: Difficulty.Hard,
    category: 'Array',
    group: 'Step 2: Array Manipulation',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice',
    starterCode: 'function chunk(arr, size) {\n  // Your code here\n}',
    testCases: [ { input: [['a', 'b', 'c', 'd'], 2], expectedOutput: [['a', 'b'], ['c', 'd']] }, { input: [[1, 2, 3, 4, 5], 2], expectedOutput: [[1, 2], [3, 4], [5]] } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[1, 2, 3, 4, 5, 6], 3], expectedOutput: [[1, 2, 3], [4, 5, 6]] }, { input: [[1, 2, 3], 1], expectedOutput: [[1], [2], [3]] } ]),
  },
    {
    id: 'last-one-for-count',
    title: 'Find First Odd Number',
    description: 'Write a function `findOdd` that takes an array of numbers and returns the first odd number.',
    difficulty: Difficulty.Easy,
    category: 'Array',
    group: 'Step 2: Array Manipulation',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find',
    starterCode: 'function findOdd(numbers) {\n  // Your code here\n}',
    testCases: [ { input: [[2, 4, 5, 6]], expectedOutput: 5 } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[2, 1, 4, 3]], expectedOutput: 1 }, { input: [[2, 4, 6]], expectedOutput: undefined } ]),
  }
];

problemsData.push(...extraProblems);

const newProblems: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
    // Step 1: Learn the basics (3 new)
    {
        id: 'concatenate-strings',
        title: 'Concatenate Strings',
        description: 'Write a function `concat` that takes two strings and returns them joined together.',
        difficulty: Difficulty.Easy, category: 'String', group: 'Step 1: Learn the basics',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/concat',
        starterCode: 'function concat(str1, str2) {\n  // Your code here\n}',
        testCases: [ { input: ['Hello', 'World'], expectedOutput: 'HelloWorld' } ],
        solutionCheck: (userCode: string) => runTests(userCode, [ { input: ['Hello', ' World'], expectedOutput: 'Hello World' }, { input: ['abc', 'def'], expectedOutput: 'abcdef' }, { input: ['', 'test'], expectedOutput: 'test' } ]),
    },
    {
        id: 'is-positive',
        title: 'Check if Positive',
        description: 'Write a function `isPositive` that returns `true` if a number is positive, and `false` otherwise. Consider 0 as not positive.',
        difficulty: Difficulty.Easy, category: 'Math', group: 'Step 1: Learn the basics',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators',
        starterCode: 'function isPositive(n) {\n  // Your code here\n}',
        testCases: [ { input: [5], expectedOutput: true }, { input: [-3], expectedOutput: false } ],
        solutionCheck: (userCode: string) => runTests(userCode, [ { input: [1], expectedOutput: true }, { input: [-1], expectedOutput: false }, { input: [0], expectedOutput: false } ]),
    },
    {
        id: 'get-first-element',
        title: 'Get First Element',
        description: 'Write a function `getFirst` that takes an array and returns its first element. If the array is empty, it should return `undefined`.',
        difficulty: Difficulty.Easy, category: 'Array', group: 'Step 1: Learn the basics',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array',
        starterCode: 'function getFirst(arr) {\n  // Your code here\n}',
        testCases: [ { input: [[1, 2, 3]], expectedOutput: 1 } ],
        solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[1, 2, 3]], expectedOutput: 1 }, { input: [['a', 'b']], expectedOutput: 'a' }, { input: [[]], expectedOutput: undefined } ]),
    },
    // Step 2: Array Manipulation (4 new)
    {
        id: 'group-by-property',
        title: 'Group Array by Property',
        description: 'Write a function `groupBy` that takes an array of objects and a property name. It should return an object where keys are the property values and values are arrays of objects with that property value.',
        difficulty: Difficulty.Hard, category: 'Array', group: 'Step 2: Array Manipulation',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce',
        starterCode: 'function groupBy(arr, prop) {\n  // Your code here\n}',
        testCases: [ { input: [[{type: 'fruit', name: 'apple'}, {type: 'veg', name: 'carrot'}, {type: 'fruit', name: 'banana'}], 'type'], expectedOutput: { fruit: [{type: 'fruit', name: 'apple'}, {type: 'fruit', name: 'banana'}], veg: [{type: 'veg', name: 'carrot'}] } } ],
        solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[{type: 'fruit', name: 'apple'}, {type: 'veg', name: 'carrot'}, {type: 'fruit', name: 'banana'}], 'type'], expectedOutput: { fruit: [{type: 'fruit', name: 'apple'}, {type: 'fruit', name: 'banana'}], veg: [{type: 'veg', name: 'carrot'}] } } ]),
    },
    {
        id: 'array-intersection',
        title: 'Array Intersection',
        description: 'Write a function `intersection` that takes two arrays and returns a new array containing elements that are present in both arrays.',
        difficulty: Difficulty.Medium, category: 'Array', group: 'Step 2: Array Manipulation',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter',
        starterCode: 'function intersection(arr1, arr2) {\n  // Your code here\n}',
        testCases: [ { input: [[1, 2, 3], [2, 3, 4]], expectedOutput: [2, 3] } ],
        solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[1, 2, 3], [2, 3, 4]], expectedOutput: [2, 3] }, { input: [['a', 'b'], ['c', 'd']], expectedOutput: [] } ]),
    },
    {
        id: 'array-difference',
        title: 'Array Difference',
        description: 'Write a function `difference` that takes two arrays and returns a new array with elements from the first array that are not in the second array.',
        difficulty: Difficulty.Medium, category: 'Array', group: 'Step 2: Array Manipulation',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter',
        starterCode: 'function difference(arr1, arr2) {\n  // Your code here\n}',
        testCases: [ { input: [[1, 2, 3], [2, 3, 4]], expectedOutput: [1] } ],
        solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[1, 2, 3, 5], [2, 3, 4]], expectedOutput: [1, 5] }, { input: [[1, 2], [1, 2]], expectedOutput: [] } ]),
    },
    {
        id: 'every-element-check',
        title: 'Check Array Elements',
        description: 'Write a function `allPositive` that takes an array of numbers and returns `true` if every element is positive, and `false` otherwise.',
        difficulty: Difficulty.Medium, category: 'Array', group: 'Step 2: Array Manipulation',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every',
        starterCode: 'function allPositive(numbers) {\n  // Your code here\n}',
        testCases: [ { input: [[1, 2, 3]], expectedOutput: true }, { input: [[1, -2, 3]], expectedOutput: false } ],
        solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[1, 2, 9]], expectedOutput: true }, { input: [[1, 0, 3]], expectedOutput: false } ]),
    },
    // Step 3: String Operations (3 new)
    {
        id: 'count-occurrences',
        title: 'Count Character Occurrences',
        description: 'Write a function `countChars` that takes a string and a character, and returns the number of times that character appears in the string (case-sensitive).',
        difficulty: Difficulty.Medium, category: 'String', group: 'Step 3: String Operations',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split',
        starterCode: 'function countChars(str, char) {\n  // Your code here\n}',
        testCases: [ { input: ['hello', 'l'], expectedOutput: 2 } ],
        solutionCheck: (userCode: string) => runTests(userCode, [ { input: ['banana', 'a'], expectedOutput: 3 }, { input: ['programming', 'm'], expectedOutput: 2 }, { input: ['test', 'z'], expectedOutput: 0 } ]),
    },
    {
        id: 'to-camel-case',
        title: 'Convert to Camel Case',
        description: 'Write a function `toCamelCase` that converts a string from kebab-case or snake_case to camelCase.',
        difficulty: Difficulty.Medium, category: 'String', group: 'Step 3: String Operations',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace',
        starterCode: 'function toCamelCase(str) {\n  // Your code here\n}',
        testCases: [ { input: ['hello-world'], expectedOutput: 'helloWorld' }, { input: ['foo_bar_baz'], expectedOutput: 'fooBarBaz' } ],
        solutionCheck: (userCode: string) => runTests(userCode, [ { input: ['the-stealth-warrior'], expectedOutput: 'theStealthWarrior' }, { input: ['A-B-C'], expectedOutput: 'ABC' } ]),
    },
    {
        id: 'is-all-unique-chars',
        title: 'All Unique Characters',
        description: 'Write a function `hasUniqueChars` that takes a string and returns `true` if all characters are unique, and `false` otherwise.',
        difficulty: Difficulty.Hard, category: 'String', group: 'Step 3: String Operations',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set',
        starterCode: 'function hasUniqueChars(str) {\n  // Your code here\n}',
        testCases: [ { input: ['abcdef'], expectedOutput: true }, { input: ['hello'], expectedOutput: false } ],
        solutionCheck: (userCode: string) => runTests(userCode, [ { input: ['abc'], expectedOutput: true }, { input: ['abca'], expectedOutput: false } ]),
    },
    // Step 4: Algorithms (3 new)
    {
        id: 'find-longest-word',
        title: 'Find Longest Word',
        description: 'Write a function `findLongestWord` that takes a sentence (string) and returns the length of the longest word in it.',
        difficulty: Difficulty.Medium, category: 'Algorithm', group: 'Step 4: Algorithms',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split',
        starterCode: 'function findLongestWord(sentence) {\n  // Your code here\n}',
        testCases: [ { input: ['The quick brown fox jumped over the lazy dog'], expectedOutput: 6 } ],
        solutionCheck: (userCode: string) => runTests(userCode, [ { input: ['Hello world'], expectedOutput: 5 }, { input: ['JavaScript is awesome'], expectedOutput: 10 } ]),
    },
    
      {
        id: 'insertion-sort',
        title: 'Insertion Sort',
        description: 'Write a function `insertionSort` that implements the insertion sort algorithm to sort an array of numbers.',
        difficulty: Difficulty.Hard,
        category: 'Algorithm',
        group: 'Step 4: Algorithms',
        docsUrl: 'https://en.wikipedia.org/wiki/Insertion_sort',
        starterCode: 'function insertionSort(arr) {\n  // Your code here\n}',
        testCases: [ { input: [[5, 3, 8, 2, 1]], expectedOutput: [1, 2, 3, 5, 8] } ],
        solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[5, 3, 8, 2, 1, 4]], expectedOutput: [1, 2, 3, 4, 5, 8] }, { input: [[-1, -5, 0, 5, 1]], expectedOutput: [-5, -1, 0, 1, 5] } ]),
      },
      {
        id: 'roman-to-integer',        title: 'Roman to Integer',
        description: 'Write a function `romanToInt` that converts a Roman numeral (string) to an integer.',
        difficulty: Difficulty.Hard, category: 'Algorithm', group: 'Step 4: Algorithms',
        docsUrl: 'https://en.wikipedia.org/wiki/Roman_numerals',
        starterCode: 'function romanToInt(s) {\n  // Your code here\n}',
        testCases: [ { input: ['III'], expectedOutput: 3 }, { input: ['LVIII'], expectedOutput: 58 }, { input: ['MCMXCIV'], expectedOutput: 1994 } ],
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        solutionCheck: (userCode: string) => runTests(userCode, [ { input: ['IX'], expectedOutput: 9 }, { input: ['IV'], expectedOutput: 4 }, { input: ['MCMXCIV'], expectedOutput: 1994 } ]),
    },
    // Step 5: Object & Function Mastery (3 new)
    {
        id: 'object-from-entries',
        title: 'Object from Entries',
        description: 'Write a function `fromEntries` that takes an array of key-value pairs (e.g., [["a", 1], ["b", 2]]) and returns a new object.',
        difficulty: Difficulty.Easy, category: 'Object', group: 'Step 5: Object & Function Mastery',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries',
        starterCode: 'function fromEntries(entries) {\n  // Your code here\n}',
        testCases: [ { input: [[['a', 1], ['b', 2]]], expectedOutput: {a: 1, b: 2} } ],
        solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[['name', 'John'], ['age', 30]]], expectedOutput: {name: 'John', age: 30} } ]),
    },
    {
        id: 'throttle-function',
        title: 'Throttle Function',
        description: 'Write a higher-order function `throttle` that takes a function `func` and a delay `limit`. It should return a new function that, when invoked, will only be triggered at most once during `limit` milliseconds.',
        difficulty: Difficulty.Hard, category: 'Function', group: 'Step 5: Object & Function Mastery',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/setTimeout',
        starterCode: 'function throttle(func, limit) {\n  // Your code here\n  // Note: This is a conceptual challenge.\n}',
        testCases: [ { input: [], expectedOutput: "Conceptual: Cannot be auto-tested here." } ],
        solutionCheck: (_userCode: string): TestResult[] => [{ input: 'N/A', expected: 'Conceptual', actual: 'This assignment requires manual verification as it involves timing.', passed: false, }],
    },
    {
        id: 'memoize-function',
        title: 'Memoize Function',
        description: 'Write a higher-order function `memoize` that takes a function and returns a memoized version of it. The memoized function should cache the results of previous calls with the same arguments.',
        difficulty: Difficulty.Hard, category: 'Function', group: 'Step 5: Object & Function Mastery',
        docsUrl: 'https://en.wikipedia.org/wiki/Memoization',
        starterCode: 'function memoize(fn) {\n  // Your code here\n // Conceptual\n}',
        testCases: [ { input: [], expectedOutput: "Conceptual: Cannot be auto-tested here." } ],
        solutionCheck: (_userCode: string): TestResult[] => [{ input: 'N/A', expected: 'Conceptual', actual: 'This assignment requires manual verification.', passed: false, }],
    },
    // Step 6: Asynchronous JavaScript (3 new)
    {
        id: 'promise-race',
        title: 'Using Promise.race',
        description: 'Write a function `racePromises` that takes an array of promises and returns the result of the first promise that settles (either resolves or rejects). For this conceptual test, mock the promises.',
        difficulty: Difficulty.Medium, category: 'Async', group: 'Step 6: Asynchronous JavaScript',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race',
        starterCode: 'async function racePromises(promises) {\n  // Your code here\n  // For testing, return "first"\n}',
        testCases: [ { input: [[]], expectedOutput: 'first' } ],
        solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[]], expectedOutput: 'first' } ]),
    },
    {
        id: 'async-await-error-handling',
        title: 'Async/Await Error Handling',
        description: 'Write an async function `fetchWithErrorHandling` that attempts to fetch from a URL. If the fetch fails, it should catch the error and return the string "Error fetching data". Otherwise, return the mock data { success: true }.',
        difficulty: Difficulty.Medium, category: 'Async', group: 'Step 6: Asynchronous JavaScript',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch',
        starterCode: 'async function fetchWithErrorHandling(url) {\n  // Your code here\n  // For testing, return { success: true }\n}',
        testCases: [ { input: ['good_url'], expectedOutput: { success: true } } ],
        solutionCheck: (userCode: string) => runTests(userCode, [ { input: ['good_url'], expectedOutput: { success: true } } ]),
    },
    {
        id: 'promise-chaining',
        title: 'Promise Chaining',
        description: 'Write a function `promiseChain` that returns a promise, which resolves with 1. Then, chain a `.then()` call that takes the result, multiplies it by 2, and returns it. Finally, return the final result.',
        difficulty: Difficulty.Medium, category: 'Async', group: 'Step 6: Asynchronous JavaScript',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#chaining',
        starterCode: 'function promiseChain() {\n  // Your code here\n  // For testing, just return Promise.resolve(2);\n}',
        testCases: [],
        solutionCheck: (userCode: string) => runTests(userCode, [ { input: [], expectedOutput: 2 } ]),
    },
    // Step 7: DOM Manipulation (Conceptual) (7 new)
    {
        id: 'dom-get-by-id',
        title: 'Get Element By ID',
        description: 'Write a function `getById` that takes an ID string and returns the corresponding DOM element.\n\n**Note:** This is conceptual. The test will mock `document.getElementById`.',
        difficulty: Difficulty.Easy, category: 'DOM', group: 'Step 7: DOM Manipulation (Conceptual)',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById',
        starterCode: 'function getById(id) {\n  // Your code here\n}',
        testCases: [],
        solutionCheck: (userCode: string) => {
            try {
                const mockElement = { id: 'test-id' };
                const document = { getElementById: (id: string) => id === 'test-id' ? mockElement : null };
                const userFn = new Function('document', `return ${userCode}`)(document);
                const result = userFn('test-id');
                if (result && result.id === 'test-id') {
                    return [{ input: '"test-id"', expected: 'mock element', actual: 'correct mock element returned', passed: true }];
                }
                return [{ input: '"test-id"', expected: 'mock element', actual: 'incorrect or no element returned', passed: false }];
            } catch(e: unknown) {
                return [{ input: 'N/A', expected: 'Function to get element by ID', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }];
            }
        }
    },
    {
        id: 'dom-remove-class',
        title: 'Remove a CSS Class',
        description: 'Write a function `removeClass` that takes a DOM element and a class name, and removes the class from the element\'s class list.\n\n**Note:** This is a conceptual challenge.',
        difficulty: Difficulty.Easy, category: 'DOM', group: 'Step 7: DOM Manipulation (Conceptual)',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/classList',
        starterCode: 'function removeClass(element, className) {\n  // Your code here\n}',
        testCases: [],
        solutionCheck: (userCode: string) => {
            try {
                const userFn = new Function(`return ${userCode}`)();
                const mockElement = { classList: { list: ['existing', 'to-remove'], remove(c:string) { this.list = this.list.filter(i => i !== c) } } };
                userFn(mockElement, 'to-remove');
                if (!mockElement.classList.list.includes('to-remove')) {
                    return [{ input: 'mockElement, "to-remove"', expected: 'class removed', actual: 'class removed correctly', passed: true }];
                }
                return [{ input: 'mockElement, "to-remove"', expected: 'class removed', actual: 'class not removed', passed: false }];
            } catch(e: unknown) { return [{ input: 'N/A', expected: 'Function to remove a class', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }]; }
        }
    },
    {
        id: 'dom-toggle-class',
        title: 'Toggle a CSS Class',
        description: 'Write a function `toggleClass` that takes a DOM element and a class name, and toggles the class on the element.\n\n**Note:** This is a conceptual challenge.',
        difficulty: Difficulty.Easy, category: 'DOM', group: 'Step 7: DOM Manipulation (Conceptual)',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/classList',
        starterCode: 'function toggleClass(element, className) {\n  // Your code here\n}',
        testCases: [],
        solutionCheck: (userCode: string) => {
            try {
                const userFn = new Function(`return ${userCode}`)();
                const mockElement = { classList: { list: ['on'], toggle(c: string) { this.list.includes(c) ? this.list = this.list.filter(i => i !== c) : this.list.push(c) } } };
                userFn(mockElement, 'on');
                const firstToggle = !mockElement.classList.list.includes('on');
                userFn(mockElement, 'on');
                const secondToggle = mockElement.classList.list.includes('on');
                if (firstToggle && secondToggle) {
                    return [{ input: 'mockElement, "on"', expected: 'class toggled twice', actual: 'class toggled correctly', passed: true }];
                }
                return [{ input: 'mockElement, "on"', expected: 'class toggled', actual: 'toggle failed', passed: false }];
            } catch(e: unknown) { return [{ input: 'N/A', expected: 'Function to toggle class', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }]; }
        }
    },
    {
        id: 'dom-get-attribute',
        title: 'Get an Attribute',
        description: 'Write a function `getAttr` that takes a DOM element and an attribute name, and returns the attribute\'s value.\n\n**Note:** This is a conceptual challenge.',
        difficulty: Difficulty.Easy, category: 'DOM', group: 'Step 7: DOM Manipulation (Conceptual)',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute',
        starterCode: 'function getAttr(element, attrName) {\n  // Your code here\n}',
        testCases: [],
        solutionCheck: (userCode: string) => {
            try {
                const userFn = new Function(`return ${userCode}`)();
                const mockElement = { attributes: {'data-id': '123'} as Record<string, string>, getAttribute(k: string) { return this.attributes[k] } };
                if (userFn(mockElement, 'data-id') === '123') {
                    return [{ input: 'mockElement, "data-id"', expected: '"123"', actual: 'got correct value', passed: true }];
                }
                return [{ input: 'mockElement, "data-id"', expected: '"123"', actual: 'got incorrect value', passed: false }];
            } catch(e: unknown) { return [{ input: 'N/A', expected: 'Function to get attribute', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }]; }
        }
    },
    {
        id: 'dom-update-style',
        title: 'Update Element Style',
        description: 'Write a function `updateStyle` that takes a DOM element and changes its color to red.\n\n**Note:** This is a conceptual challenge.',
        difficulty: Difficulty.Easy, category: 'DOM', group: 'Step 7: DOM Manipulation (Conceptual)',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style',
        starterCode: 'function updateStyle(element) {\n  // Your code here\n}',
        testCases: [],
        solutionCheck: (userCode: string) => {
            try {
                const userFn = new Function(`return ${userCode}`)();
                const mockElement = { style: { color: '' } };
                userFn(mockElement);
                if (mockElement.style.color === 'red') {
                    return [{ input: 'mockElement', expected: 'color set to red', actual: 'style updated correctly', passed: true }];
                }
                return [{ input: 'mockElement', expected: 'color set to red', actual: `color is ${mockElement.style.color}`, passed: false }];
            } catch(e: unknown) { return [{ input: 'N/A', expected: 'Function to update style', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }]; }
        }
    },
    {
        id: 'dom-create-element',
        title: 'Create an Element',
        description: 'Write a function `createDiv` that creates a new `div` element.\n\n**Note:** This is conceptual. The test will mock `document.createElement`.',
        difficulty: Difficulty.Easy, category: 'DOM', group: 'Step 7: DOM Manipulation (Conceptual)',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement',
        starterCode: 'function createDiv() {\n  // Your code here\n}',
        testCases: [],
        solutionCheck: (userCode: string) => {
             try {
                const document = { created: '', createElement: function(tag: string) { this.created = tag; return { tagName: tag.toUpperCase() } } };
                const userFn = new Function('document', `return ${userCode}`)(document);
                const result = userFn();
                if (document.created === 'div' && result.tagName === 'DIV') {
                    return [{ input: 'N/A', expected: 'div element created', actual: 'div created', passed: true }];
                }
                return [{ input: 'N/A', expected: 'div element created', actual: `${document.created} created`, passed: false }];
            } catch(e: unknown) { return [{ input: 'N/A', expected: 'Function to create element', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }]; }
        }
    },
    {
        id: 'dom-append-child',
        title: 'Append a Child',
        description: 'Write a function `addChild` that takes a parent and a child DOM element and appends the child to the parent.\n\n**Note:** This is a conceptual challenge.',
        difficulty: Difficulty.Easy, category: 'DOM', group: 'Step 7: DOM Manipulation (Conceptual)',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild',
        starterCode: 'function addChild(parent, child) {\n  // Your code here\n}',
        testCases: [],
        solutionCheck: (userCode: string) => {
            try {
                const userFn = new Function(`return ${userCode}`)();
                interface MockElement {
                    id?: string;
                    children: MockElement[];
                    appendChild(c: MockElement): void;
                }
                const mockParent = {
                    children: [] as MockElement[],
                    appendChild(c: MockElement) { this.children.push(c) }
                };
                const mockChild = { id: 'child' } as MockElement;
                userFn(mockParent, mockChild);
                if (mockParent.children.length > 0 && mockParent.children[0].id === 'child') {
                    return [{ input: 'parent, child', expected: 'child appended', actual: 'child appended correctly', passed: true }];
                }
                return [{ input: 'parent, child', expected: 'child appended', actual: 'child not appended', passed: false }];
            } catch(e: unknown) { return [{ input: 'N/A', expected: 'Function to append child', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }]; }
        }
    },
    // Step 8: Advanced DOM & Events (Conceptual) (10 new)
    {
        id: 'dom-query-selector',
        title: 'Query Selector',
        description: 'Write a function `select` that takes a CSS selector string and returns the first matching element.\n\n**Note:** This is conceptual. It mocks `document.querySelector`.',
        difficulty: Difficulty.Easy, category: 'DOM', group: 'Step 8: Advanced DOM & Events (Conceptual)',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector',
        starterCode: 'function select(selector) {\n  // Your code here\n}',
        testCases: [],
        solutionCheck: (userCode: string) => {
            try {
                const mockElement = { id: 'test' };
                const document = { querySelector: (s: string) => s === '.test-class' ? mockElement : null };
                const userFn = new Function('document', `return ${userCode}`)(document);
                if (userFn('.test-class').id === 'test') {
                    return [{ input: '".test-class"', expected: 'mock element', actual: 'correct element returned', passed: true }];
                }
                return [{ input: '".test-class"', expected: 'mock element', actual: 'wrong element returned', passed: false }];
            } catch(e: unknown) { return [{ input: 'N/A', expected: 'Function for querySelector', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }]; }
        }
    },
    {
        id: 'dom-query-selector-all',
        title: 'Query Selector All',
        description: 'Write a function `selectAll` that takes a CSS selector string and returns a list of all matching elements.\n\n**Note:** This is conceptual.',
        difficulty: Difficulty.Medium, category: 'DOM', group: 'Step 8: Advanced DOM & Events (Conceptual)',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll',
        starterCode: 'function selectAll(selector) {\n  // Your code here\n}',
        testCases: [],
        solutionCheck: (userCode: string) => {
            try {
                const mockElements = [{id: 1}, {id: 2}];
                const document = { querySelectorAll: (s: string) => s === '.item' ? mockElements : [] };
                const userFn = new Function('document', `return ${userCode}`)(document);
                if (userFn('.item').length === 2) {
                    return [{ input: '".item"', expected: 'array of 2 elements', actual: 'correct array returned', passed: true }];
                }
                return [{ input: '".item"', expected: 'array of 2 elements', actual: 'wrong array returned', passed: false }];
            } catch(e: unknown) { return [{ input: 'N/A', expected: 'Function for querySelectorAll', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }]; }
        }
    },
    {
        id: 'dom-remove-child',
        title: 'Remove a Child',
        description: 'Write a function `removeChildEl` that takes a parent and a child element, and removes the child from the parent.\n\n**Note:** This is a conceptual challenge.',
        difficulty: Difficulty.Medium, category: 'DOM', group: 'Step 8: Advanced DOM & Events (Conceptual)',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild',
        starterCode: 'function removeChildEl(parent, child) {\n  // Your code here\n}',
        testCases: [],
        solutionCheck: (userCode: string) => {
            try {
                const userFn = new Function(`return ${userCode}`)();
                const mockChild = { id: 'child' };
                const mockParent = { children: [mockChild], removeChild(c: unknown) { this.children = this.children.filter(i => i !== c) } };
                userFn(mockParent, mockChild);
                if (mockParent.children.length === 0) {
                    return [{ input: 'parent, child', expected: 'child removed', actual: 'child removed correctly', passed: true }];
                }
                return [{ input: 'parent, child', expected: 'child removed', actual: 'child not removed', passed: false }];
            } catch(e: unknown) { return [{ input: 'N/A', expected: 'Function to remove child', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }]; }
        }
    },
    {
        id: 'dom-create-and-append',
        title: 'Create and Append',
        description: 'Write a function `addListItem` that takes a string of text, creates a new `<li>` element with that text, and appends it to a `<ul>` element provided.\n\n**Note:** Conceptual.',
        difficulty: Difficulty.Medium, category: 'DOM', group: 'Step 8: Advanced DOM & Events (Conceptual)',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild',
        starterCode: 'function addListItem(ulElement, text) {\n  // Your code here\n}',
        testCases: [],
        solutionCheck: (userCode: string) => {
            try {
                const document = { createElement: (tag: string) => ({ tagName: tag.toUpperCase(), textContent: '', children: [] as unknown[], appendChild(c: unknown) { this.children.push(c) }}) };
                const userFn = new Function('document', `return ${userCode}`)(document);
                const mockUl = { children: [] as unknown[], appendChild(c: unknown) { this.children.push(c) } };
                userFn(mockUl, 'New Item');
                if (mockUl.children.length > 0 && (mockUl.children[0] as { tagName: string, textContent: string }).tagName === 'LI' && (mockUl.children[0] as { tagName: string, textContent: string }).textContent === 'New Item') {
                    return [{ input: 'ul, "New Item"', expected: '<li> created and appended', actual: 'success', passed: true }];
                }
                return [{ input: 'ul, "New Item"', expected: '<li> created and appended', actual: 'failed', passed: false }];
            } catch(e: unknown) { return [{ input: 'N/A', expected: 'Function to create/append', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }]; }
        }
    },
    {
        id: 'dom-set-inner-html',
        title: 'Set Inner HTML',
        description: 'Write a function `setHtml` that takes an element and a string of HTML, and sets the element\'s inner HTML.\n\n**Note:** Conceptual.',
        difficulty: Difficulty.Medium, category: 'DOM', group: 'Step 8: Advanced DOM & Events (Conceptual)',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML',
        starterCode: 'function setHtml(element, htmlString) {\n  // Your code here\n}',
        testCases: [],
        solutionCheck: (userCode: string) => {
             try {
                const userFn = new Function(`return ${userCode}`)();
                const mockElement = { innerHTML: '' };
                userFn(mockElement, '<span>Test</span>');
                if (mockElement.innerHTML === '<span>Test</span>') {
                    return [{ input: 'el, "<span>Test</span>"', expected: 'innerHTML set', actual: 'success', passed: true }];
                }
                return [{ input: 'el, "<span>Test</span>"', expected: 'innerHTML set', actual: 'failed', passed: false }];
            } catch(e: unknown) { return [{ input: 'N/A', expected: 'Function to set innerHTML', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }]; }
        }
    },
    {
        id: 'dom-add-event-listener',
        title: 'Add Event Listener',
        description: 'Write a function `onClick` that takes a button element and a callback function, and attaches a "click" event listener to the button.\n\n**Note:** Conceptual.',
        difficulty: Difficulty.Medium, category: 'DOM', group: 'Step 8: Advanced DOM & Events (Conceptual)',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener',
        starterCode: 'function onClick(button, callback) {\n  // Your code here\n}',
        testCases: [],
        solutionCheck: (userCode: string) => {
             try {
                const userFn = new Function(`return ${userCode}`)();
                const mockButton: { event: string; cb: ((...args: unknown[]) => unknown) | null; addEventListener(e: string, cb: (...args: unknown[]) => unknown): void } = { event: '', cb: null, addEventListener(e: string, cb: (...args: unknown[]) => unknown) { this.event = e; this.cb = cb } };
                const myCallback = () => {};
                userFn(mockButton, myCallback);
                if (mockButton.event === 'click' && mockButton.cb === myCallback) {
                    return [{ input: 'button, callback', expected: 'click listener added', actual: 'success', passed: true }];
                }
                return [{ input: 'button, callback', expected: 'click listener added', actual: 'failed', passed: false }];
            } catch(e: unknown) { return [{ input: 'N/A', expected: 'Function to add event', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }]; }
        }
    },
    {
        id: 'dom-remove-event-listener',
        title: 'Remove Event Listener',
        description: 'Write a function `removeOnClick` that takes a button element and the callback function, and removes the "click" event listener.\n\n**Note:** Conceptual.',
        difficulty: Difficulty.Medium, category: 'DOM', group: 'Step 8: Advanced DOM & Events (Conceptual)',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener',
        starterCode: 'function removeOnClick(button, callback) {\n  // Your code here\n}',
        testCases: [],
        solutionCheck: (userCode: string) => {
            try {
                const userFn = new Function(`return ${userCode}`)();
                const mockButton: { event: string; cb: ((...args: unknown[]) => unknown) | null; removeEventListener(e: string, cb: (...args: unknown[]) => unknown): void } = { event: '', cb: null, removeEventListener(e: string, cb: (...args: unknown[]) => unknown) { this.event = e; this.cb = cb } };
                const myCallback = () => {};
                userFn(mockButton, myCallback);
                if (mockButton.event === 'click' && mockButton.cb === myCallback) {
                    return [{ input: 'button, callback', expected: 'click listener removed', actual: 'success', passed: true }];
                }
                return [{ input: 'button, callback', expected: 'click listener removed', actual: 'failed', passed: false }];
            } catch(e: unknown) { return [{ input: 'N/A', expected: 'Function to remove event', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }]; }
        }
    },
    {
        id: 'dom-get-computed-style',
        title: 'Get Computed Style',
        description: 'Write a function `getBgColor` that takes an element and returns its computed background color.\n\n**Note:** Conceptual.',
        difficulty: Difficulty.Medium, category: 'DOM', group: 'Step 8: Advanced DOM & Events (Conceptual)',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle',
        starterCode: 'function getBgColor(element) {\n  // Your code here\n}',
        testCases: [],
        solutionCheck: (userCode: string) => {
            try {
                const window = { getComputedStyle: () => ({ getPropertyValue: (p: string) => p === 'background-color' ? 'rgb(255, 0, 0)' : null })};
                const userFn = new Function('window', `return ${userCode}`)(window);
                if (userFn({}) === 'rgb(255, 0, 0)') {
                    return [{ input: 'element', expected: 'rgb(255, 0, 0)', actual: 'success', passed: true }];
                }
                return [{ input: 'element', expected: 'rgb(255, 0, 0)', actual: 'failed', passed: false }];
            } catch(e: unknown) { return [{ input: 'N/A', expected: 'Function to get style', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }]; }
        }
    },
    {
        id: 'dom-traverse-up',
        title: 'Traverse DOM Up',
        description: 'Write a function `findParent` that takes an element and finds the closest parent with a specific class name.\n\n**Note:** Conceptual.',
        difficulty: Difficulty.Hard, category: 'DOM', group: 'Step 8: Advanced DOM & Events (Conceptual)',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Node/parentElement',
        starterCode: 'function findParent(element, className) {\n  // Your code here\n}',
        testCases: [],
        solutionCheck: (userCode: string) => {
            try {
                const userFn = new Function(`return ${userCode}`)();
                const parent = { className: 'target', parentElement: null };
                const child = { parentElement: parent };
                if (userFn(child, 'target') === parent) {
                    return [{ input: 'child, "target"', expected: 'parent element', actual: 'success', passed: true }];
                }
                return [{ input: 'child, "target"', expected: 'parent element', actual: 'failed', passed: false }];
            } catch(e: unknown) { return [{ input: 'N/A', expected: 'Function to traverse up', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }]; }
        }
    },
    {
        id: 'dom-form-read-value',
        title: 'Read Form Input Value',
        description: 'Write a function `getInputValue` that takes a form input element and returns its current value.\n\n**Note:** Conceptual.',
        difficulty: Difficulty.Hard, category: 'DOM', group: 'Step 8: Advanced DOM & Events (Conceptual)',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input',
        starterCode: 'function getInputValue(inputElement) {\n  // Your code here\n}',
        testCases: [],
        solutionCheck: (userCode: string) => {
             try {
                const userFn = new Function(`return ${userCode}`)();
                const mockInput = { value: 'User Text' };
                if (userFn(mockInput) === 'User Text') {
                    return [{ input: 'input', expected: 'User Text', actual: 'success', passed: true }];
                }
                return [{ input: 'input', expected: 'User Text', actual: 'failed', passed: false }];
            } catch(e: unknown) { return [{ input: 'N/A', expected: 'Function to read value', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }]; }
        }
    },
];

problemsData.push(...newProblems);