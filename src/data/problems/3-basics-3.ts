import { Problem, Difficulty } from '../../types';
import { runTests } from './utils';

export const step3Basics3: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  // Content from 3-string-operations.ts
  {
    id: 'reverse-string',
    title: 'Reverse a String',
    description: 'Write a function `reverseString` that takes a string and returns a new string with the characters in reverse order.',
    difficulty: Difficulty.Easy,
    category: 'String',
    group: 'Step 3: Basics III',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split',
    starterCode: `function reverseString(str) {
  // Your code here
}`,
    testCases: [ { input: ['hello'], expectedOutput: 'olleh' }, { input: ['world'], expectedOutput: 'dlrow' } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: ['hello'], expectedOutput: 'olleh' }, { input: ['JavaScript'], expectedOutput: 'tpircSavaJ' }, { input: [''], expectedOutput: '' } ]),
  },
  {
    id: 'palindrome-check',
    title: 'Palindrome Check',
    description: 'Write a function `isPalindrome` that takes a string and returns `true` if the string is a palindrome and `false` otherwise. A palindrome is a word that reads the same forwards and backward. Ignore case and non-alphanumeric characters.',
    difficulty: Difficulty.Medium,
    category: 'String',
    group: 'Step 3: Basics III',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split',
    starterCode: `function isPalindrome(str) {
  // Your code here
}`,
    testCases: [ { input: ['racecar'], expectedOutput: true }, { input: ['A man, a plan, a canal: Panama'], expectedOutput: true } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: ['racecar'], expectedOutput: true }, { input: ['hello'], expectedOutput: false }, { input: ['level'], expectedOutput: true }, { input: ['A man, a plan, a canal: Panama'], expectedOutput: true }, { input: ['No lemon, no melon'], expectedOutput: true } ]),
  },
  {
    id: 'count-vowels',
    title: 'Count Vowels',
    description: 'Write a function `countVowels` that takes a string and returns the number of vowels (a, e, i, o, u, case-insensitive) in it.',
    difficulty: Difficulty.Medium,
    category: 'String',
    group: 'Step 3: Basics III',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match',
    starterCode: `function countVowels(str) {
  // Your code here
}`,
    testCases: [ { input: ['hello'], expectedOutput: 2 }, { input: ['javascript'], expectedOutput: 3 } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: ['hello world'], expectedOutput: 3 }, { input: ['AEIOU'], expectedOutput: 5 }, { input: ['rhythm'], expectedOutput: 0 } ]),
  },
  {
    id: 'capitalize-string',
    title: 'Capitalize String',
    description: 'Write a function `capitalize` that takes a string and returns a new string with the first character capitalized.',
    difficulty: Difficulty.Easy,
    category: 'String',
    group: 'Step 3: Basics III',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase',
    starterCode: `function capitalize(str) {
  // Your code here
}`,
    testCases: [ { input: ['hello'], expectedOutput: 'Hello' }, { input: ['world'], expectedOutput: 'World' } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: ['hello'], expectedOutput: 'Hello' }, { input: ['javaScript'], expectedOutput: 'JavaScript' }, { input: [''], expectedOutput: '' } ]),
  },
  {
    id: 'string-to-uppercase',
    title: 'String to Uppercase',
    description: 'Write a function `toUpperCase` that converts a string to uppercase.',
    difficulty: Difficulty.Easy,
    category: 'String',
    group: 'Step 3: Basics III',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase',
    starterCode: `function toUpperCase(str) {
  // Your code here
}`,
    testCases: [ { input: ['hello'], expectedOutput: 'HELLO' } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: ['hello'], expectedOutput: 'HELLO' }, { input: ['JavaScript'], expectedOutput: 'JAVASCRIPT' } ]),
  },
  {
    id: 'truncate-string',
    title: 'Truncate a String',
    description: 'Write a function `truncate` that truncates a string if it is longer than the given maximum string length. The result should end with "..." and its total length should not exceed the max length.',
    difficulty: Difficulty.Medium,
    category: 'String',
    group: 'Step 3: Basics III',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice',
    starterCode: `function truncate(str, maxLength) {
  // Your code here
}`,
    testCases: [ { input: ['Hello world', 8], expectedOutput: 'Hello...' } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: ['This is a long string', 10], expectedOutput: 'This is...' }, { input: ['Short', 10], expectedOutput: 'Short' } ]),
  },
    {
        id: 'count-occurrences',
        title: 'Count Character Occurrences',
        description: 'Write a function `countChars` that takes a string and a character, and returns the number of times that character appears in the string (case-sensitive).',
        difficulty: Difficulty.Medium, category: 'String', group: 'Step 3: Basics III',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split',
        starterCode: `function countChars(str, char) {
  // Your code here
}`,
        testCases: [ { input: ['hello', 'l'], expectedOutput: 2 } ],
        solutionCheck: (userCode: string) => runTests(userCode, [ { input: ['banana', 'a'], expectedOutput: 3 }, { input: ['programming', 'm'], expectedOutput: 2 }, { input: ['test', 'z'], expectedOutput: 0 } ]),
    },
    {
        id: 'to-camel-case',
        title: 'Convert to Camel Case',
        description: 'Write a function `toCamelCase` that converts a string from kebab-case or snake_case to camelCase.',
        difficulty: Difficulty.Medium, category: 'String', group: 'Step 3: Basics III',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace',
        starterCode: `function toCamelCase(str) {
  // Your code here
}`,
        testCases: [ { input: ['hello-world'], expectedOutput: 'helloWorld' }, { input: ['foo_bar_baz'], expectedOutput: 'fooBarBaz' } ],
        solutionCheck: (userCode: string) => runTests(userCode, [ { input: ['the-stealth-warrior'], expectedOutput: 'theStealthWarrior' }, { input: ['A-B-C'], expectedOutput: 'ABC' } ]),
    },
    {
        id: 'is-all-unique-chars',
        title: 'All Unique Characters',
        description: 'Write a function `hasUniqueChars` that takes a string and returns `true` if all characters are unique, and `false` otherwise.',
        difficulty: Difficulty.Hard, category: 'String', group: 'Step 3: Basics III',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set',
        starterCode: `function hasUniqueChars(str) {
  // Your code here
}`,
        testCases: [ { input: ['abcdef'], expectedOutput: true }, { input: ['hello'], expectedOutput: false } ],
        solutionCheck: (userCode: string) => runTests(userCode, [ { input: ['abc'], expectedOutput: true }, { input: ['abca'], expectedOutput: false } ]),
    },
  // Content from 5-object-and-function-mastery.ts
  {
    id: 'object-merge',
    title: 'Merge Objects',
    description: 'Write a function `mergeObjects` that takes two objects and returns a new object with properties from both. If a key exists in both, the value from the second object should be used.',
    difficulty: Difficulty.Medium,
    category: 'Object',
    group: 'Step 3: Basics III',
    docsUrl: 'https://developer.mozilla.org/en/US/docs/Web/JavaScript/Reference/Operators/Spread_syntax',
    starterCode: `function mergeObjects(obj1, obj2) {
  // Your code here
}`,
    testCases: [ { input: [{a:1, b:2}, {b:3, c:4}], expectedOutput: {a:1, b:3, c:4} } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [{a:1, b:2}, {b:3, c:4}], expectedOutput: {a:1, b:3, c:4} }, { input: [{name: 'John'}, {age: 30}], expectedOutput: {name: 'John', age: 30} } ]),
  },
  {
    id: 'debounce-function',
    title: 'Debounce Function',
    description: 'Write a higher-order function `debounce` that takes a function `func` and a delay `wait`. It should return a new function that, as long as it continues to be invoked, will not be triggered. The function will be called only once after it stops being called for `wait` milliseconds.',
    difficulty: Difficulty.Hard,
    category: 'Function',
    group: 'Step 3: Basics III',
    docsUrl: 'https://developer.mozilla.org/en/US/docs/Web/API/setTimeout',
    starterCode: `function debounce(func, wait) {
  // Your code here
  // Note: This is a conceptual challenge.
}`,
    testCases: [ { input: [], expectedOutput: "Conceptual: Cannot be auto-tested here." } ],
            solutionCheck: (_userCode: string) => [{ input: 'N/A', expected: 'Conceptual', actual: 'This assignment requires manual verification as it involves timing.', passed: false, }],  },
  {
    id: 'currying',
    title: 'Currying Function',
    description: 'Write a function `curry` that takes a function `fn` and returns a curried version of it. For example, `curry(sum)(1)(2)` should return `3` if `sum` is a function that adds two numbers.',
    difficulty: Difficulty.Hard,
    category: 'Function',
    group: 'Step 3: Basics III',
    docsUrl: 'https://javascript.info/currying-partials',
    starterCode: `function curry(fn) {
  // Your code here
 // Conceptual
}`,
    testCases: [ { input: [], expectedOutput: "Conceptual: Cannot be auto-tested here." } ],
    solutionCheck: (_userCode: string) => [{ input: 'N/A', expected: 'Conceptual', actual: 'This assignment requires manual verification.', passed: false, }],
  },
  {
    id: 'deep-clone',
    title: 'Deep Clone Object',
    description: 'Write a function `deepClone` that creates a deep copy of a nested object or array.',
    difficulty: Difficulty.Hard,
    category: 'Object',
    group: 'Step 3: Basics III',
    docsUrl: 'https://developer.mozilla.org/en/US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse',
    starterCode: `function deepClone(obj) {
  // Your code here
}`,
    testCases: [ { input: [{a: 1, b: { c: 2 }}], expectedOutput: {a: 1, b: { c: 2 }} } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [{a: 1, b: { c: 2 }}], expectedOutput: {a: 1, b: { c: 2 }} }, { input: [[1, [2, 3]]], expectedOutput: [1, [2, 3]] } ]),
  },
  {
    id: 'check-property',
    title: 'Check Object Property',
    description: 'Write a function `hasProperty` that takes an object and a property name (string) and returns `true` if the object has the property, `false` otherwise.',
    difficulty: Difficulty.Easy,
    category: 'Object',
    group: 'Step 3: Basics III',
    docsUrl: 'https://developer.mozilla.org/en/US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty',
    starterCode: `function hasProperty(obj, prop) {
  // Your code here
}`,
    testCases: [ { input: [{ a: 1 }, 'a'], expectedOutput: true }, { input: [{ a: 1 }, 'b'], expectedOutput: false } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [{ a: 1, b: 2 }, 'b'], expectedOutput: true }, { input: [{}, 'a'], expectedOutput: false } ]),
  },
    {
        id: 'object-from-entries',
        title: 'Object from Entries',
        description: 'Write a function `fromEntries` that takes an array of key-value pairs (e.g., [["a", 1], ["b", 2]]) and returns a new object.',
        difficulty: Difficulty.Easy, category: 'Object', group: 'Step 3: Basics III',
        docsUrl: 'https://developer.mozilla.org/en/US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries',
        starterCode: `function fromEntries(entries) {
  // Your code here
}`,
        testCases: [ { input: [[['a', 1], ['b', 2]]], expectedOutput: {a: 1, b: 2} } ],
        solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[['name', 'John'], ['age', 30]]], expectedOutput: {name: 'John', age: 30} } ]),
    },
    {
        id: 'throttle-function',
        title: 'Throttle Function',
        description: 'Write a higher-order function `throttle` that takes a function `func` and a delay `limit`. It should return a new function that, when invoked, will only be triggered at most once during `limit` milliseconds.',
        difficulty: Difficulty.Hard, category: 'Function', group: 'Step 3: Basics III',
        docsUrl: 'https://developer.mozilla.org/en/US/docs/Web/API/setTimeout',
        starterCode: `function throttle(func, limit) {
  // Your code here
  // Note: This is a conceptual challenge.
}`,
    testCases: [ { input: [], expectedOutput: "Conceptual: Cannot be auto-tested here." } ],
      solutionCheck: (_userCode: string) => [{ input: 'N/A', expected: 'Conceptual', actual: 'This assignment requires manual verification as it involves timing.', passed: false, }],
    },
    {
        id: 'memoize-function',
        title: 'Memoize Function',
        description: 'Write a higher-order function `memoize` that takes a function and returns a memoized version of it. The memoized function should cache the results of previous calls with the same arguments.',
        difficulty: Difficulty.Hard, category: 'Function', group: 'Step 3: Basics III',
        docsUrl: 'https://en.wikipedia.org/wiki/Memoization',
        starterCode: `function memoize(fn) {
  // Your code here
 // Conceptual
}`,
        testCases: [ { input: [], expectedOutput: "Conceptual: Cannot be auto-tested here." } ],
        solutionCheck: (_userCode: string) => [{ input: 'N/A', expected: 'Conceptual', actual: 'This assignment requires manual verification.', passed: false, }],
    },
    {
        id: 'object-deep-freeze',
        title: 'Deep Freeze Object',
        description: 'Write a function `deepFreeze` that takes an object and recursively freezes it, making it and all its nested properties immutable.',
        difficulty: Difficulty.Hard,
        category: 'Object',
        group: 'Step 3: Basics III',
        docsUrl: 'https://developer.mozilla.org/en/US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze',
        starterCode: `function deepFreeze(obj) {
  // Your code here
}`,
        testCases: [],
        solutionCheck: (_userCode: string) => [{ input: 'N/A', expected: 'Conceptual', actual: 'This assignment requires manual verification of object immutability.', passed: false, }],
    },
];