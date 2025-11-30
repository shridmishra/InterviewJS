import { Problem, Difficulty } from '@/types';
import { runTests } from './utils';

export const step3Basics3: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'reverse-string',
    title: 'Reverse a String',
    description: 'Write a function `reverseString` that takes a string and returns a new string with the characters in reverse order.',
    difficulty: Difficulty.Easy,
    category: 'String',
    group: 'Step 3: Basics III',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split',
    videoUrl: 'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    starterCode: `function reverseString(str) {
  // Your code here
}`,
    testCases: [ { input: ['hello'], expectedOutput: 'olleh' }, { input: ['world'], expectedOutput: 'dlrow' } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: ['hello'], expectedOutput: 'olleh' }, { input: ['JavaScript'], expectedOutput: 'tpircSavaJ' }, { input: [''], expectedOutput: '' } ]),
  },
  {
    id: 'remove-duplicates-from-array',
    title: 'Remove Duplicates from Array',
    description: 'Write a function `removeDuplicates` that takes an array and returns a new array with all duplicate elements removed.',
    difficulty: Difficulty.Medium,
    category: 'Array',
    group: 'Step 3: Basics III',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set',
    videoUrl: 'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    starterCode: `function removeDuplicates(arr) {
  // Your code here
}`,
    testCases: [ { input: [[1, 2, 2, 3]], expectedOutput: [1, 2, 3] }, { input: [['a', 'b', 'a']], expectedOutput: ['a', 'b'] } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[1, 1, 2, 3, 3, 3]], expectedOutput: [1, 2, 3] }, { input: [[true, false, true]], expectedOutput: [true, false] }, { input: [[5, 5, 5, 5]], expectedOutput: [5] } ]),
  },
  {
    id: 'palindrome-check',
    title: 'Palindrome Check',
    description: 'Write a function `isPalindrome` that takes a string and returns `true` if the string is a palindrome and `false` otherwise. A palindrome is a word that reads the same forwards and backward. Ignore case and non-alphanumeric characters.',
    difficulty: Difficulty.Medium,
    category: 'String',
    group: 'Step 3: Basics III',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split',
    videoUrl: 'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    starterCode: `function isPalindrome(str) {
  // Your code here
}`,
    testCases: [ { input: ['racecar'], expectedOutput: true }, { input: ['A man, a plan, a canal: Panama'], expectedOutput: true } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: ['racecar'], expectedOutput: true }, { input: ['hello'], expectedOutput: false }, { input: ['level'], expectedOutput: true }, { input: ['A man, a plan, a canal: Panama'], expectedOutput: true }, { input: ['No lemon, no melon'], expectedOutput: true } ]),
  },
  {
    id: 'sort-objects-by-property',
    title: 'Sort Objects by Property',
    description: 'Write a function `sortByAge` that takes an array of objects, each with `name` and `age` properties, and sorts them by age in ascending order.',
    difficulty: Difficulty.Medium,
    category: 'Array',
    group: 'Step 3: Basics III',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort',
    videoUrl: 'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    starterCode: `function sortByAge(arr) {
  // Your code here
}`,
    testCases: [ { input: [[{name: 'John', age: 30}, {name: 'Jane', age: 25}]], expectedOutput: [{name: 'Jane', age: 25}, {name: 'John', age: 30}] } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[{name: 'John', age: 30}, {name: 'Jane', age: 25}, {name: 'Doe', age: 40}]], expectedOutput: [{name: 'Jane', age: 25}, {name: 'John', age: 30}, {name: 'Doe', age: 40}] } ]),
  },
  {
    id: 'object-merge',
    title: 'Merge Objects',
    description: 'Write a function `mergeObjects` that takes two objects and returns a new object with properties from both. If a key exists in both, the value from the second object should be used.',
    difficulty: Difficulty.Medium,
    category: 'Object',
    group: 'Step 3: Basics III',
    docsUrl: 'https://developer.mozilla.org/en/US/docs/Web/JavaScript/Reference/Operators/Spread_syntax',
    videoUrl: 'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    starterCode: `function mergeObjects(obj1, obj2) {
  // Your code here
}`,
    testCases: [ { input: [{a:1, b:2}, {b:3, c:4}], expectedOutput: {a:1, b:3, c:4} } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [{a:1, b:2}, {b:3, c:4}], expectedOutput: {a:1, b:3, c:4} }, { input: [{name: 'John'}, {age: 30}], expectedOutput: {name: 'John', age: 30} } ]),
  },
  {
    id: 'higher-order-function-multiplier',
    title: 'Higher-Order Function: Multiplier',
    description: 'Write a higher-order function `createMultiplier` that takes a number `x` and returns a function. The returned function should take a number `y` and return the product of `x` and `y`.',
    difficulty: Difficulty.Medium,
    category: 'Function',
    group: 'Step 3: Basics III',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures',
    videoUrl: 'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    starterCode: `function createMultiplier(x) {
  // Your code here
}`,
    testCases: [
      {
        input: [5],
        expectedOutput: "function",
        customTest: (userCode) => {
          const multiplyBy5 = eval(`(${userCode})(5)`);
          return multiplyBy5(10) === 50;
        }
      }
    ],
    solutionCheck: (userCode) => {
      const multiplyBy5 = eval(`(${userCode})(5)`);
      const multiplyBy10 = eval(`(${userCode})(10)`);
      return [
        { input: JSON.stringify([5]), expected: JSON.stringify(50), actual: multiplyBy5(10), passed: multiplyBy5(10) === 50 },
        { input: JSON.stringify([10]), expected: JSON.stringify(100), actual: multiplyBy10(10), passed: multiplyBy10(10) === 100 },
      ];
    },
  },
  {
    id: 'count-vowels',
    title: 'Count Vowels',
    description: 'Write a function `countVowels` that takes a string and returns the number of vowels (a, e, i, o, u, case-insensitive) in it.',
    difficulty: Difficulty.Medium,
    category: 'String',
    group: 'Step 3: Basics III',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match',
    videoUrl: 'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    starterCode: `function countVowels(str) {
  // Your code here
}`,
    testCases: [ { input: ['hello'], expectedOutput: 2 }, { input: ['javascript'], expectedOutput: 3 } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: ['hello world'], expectedOutput: 3 }, { input: ['AEIOU'], expectedOutput: 5 }, { input: ['rhythm'], expectedOutput: 0 } ]),
  },
  {
    id: 'flatten-nested-array',
    title: 'Flatten a Nested Array',
    description: 'Write a function `flatten` that takes a nested array and returns a new flat array.',
    difficulty: Difficulty.Medium,
    category: 'Array',
    group: 'Step 3: Basics III',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat',
    videoUrl: 'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    starterCode: `function flatten(arr) {
  // Your code here
}`,
    testCases: [ { input: [[1, [2, [3, 4]]]], expectedOutput: [1, 2, 3, 4] } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[1, [2, 3], 4]], expectedOutput: [1, 2, 3, 4] }, { input: [['a'], ['b', ['c']]], expectedOutput: ['a', 'b', 'c'] } ]),
  },
  {
    id: 'map-to-squares',
    title: 'Map Array to Squares',
    description: 'Write a function `mapToSquares` that takes an array of numbers and returns a new array with each number squared.',
    difficulty: Difficulty.Medium,
    category: 'Array',
    group: 'Step 3: Basics III',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map',
    videoUrl: 'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    starterCode: `function mapToSquares(numbers) {
  // Your code here
}`,
    testCases: [ { input: [[1, 2, 3]], expectedOutput: [1, 4, 9] } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[1, 2, 3]], expectedOutput: [1, 4, 9] }, { input: [[-1, -2, 0]], expectedOutput: [1, 4, 0] }, { input: [[]], expectedOutput: [] } ]),
  },
  {
    id: 'capitalize-words',
    title: 'Capitalize Words',
    description: 'Write a function `capitalizeWords` that takes a sentence (string) and returns a new sentence where the first letter of each word is capitalized.',
    difficulty: Difficulty.Medium,
    category: 'String',
    group: 'Step 3: Basics III',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase',
    videoUrl: 'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    starterCode: `function capitalizeWords(sentence) {
  // Your code here
}`,
    testCases: [ { input: ['hello world'], expectedOutput: 'Hello World' } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: ['hello world'], expectedOutput: 'Hello World' }, { input: ['a short sentence'], expectedOutput: 'A Short Sentence' }, { input: ['javascript is fun'], expectedOutput: 'Javascript Is Fun' } ]),
  },
];
