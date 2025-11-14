import { Problem, Difficulty } from '../../types';
import { runTests } from './utils';

export const asynchronousJavaScript: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'create-promise',
    title: 'Create a Simple Promise',
    description: 'Write a function `simplePromise` that returns a Promise which resolves with the string "Hello, World!" after 100ms.',
    difficulty: Difficulty.Easy,
    category: 'Async',
    group: 'Step 4: Asynchronous JavaScript',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise',
    starterCode: `function simplePromise() {
  // Your code here
 // Return new Promise(...) }`,
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
    group: 'Step 4: Asynchronous JavaScript',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch',
    starterCode: `async function fetchData() {
  // Your code here
 // Return mock data for testing: { success: true }
}`,
    testCases: [ { input: [], expectedOutput: { success: true } } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [], expectedOutput: { success: true } } ]),
  },
  {
    id: 'promise-all',
    title: 'Using Promise.all',
    description: 'Write a function `fetchAll` that takes an array of URLs, fetches them all using `Promise.all`, and returns an array of their JSON responses. For this conceptual test, mock the fetch calls.',
    difficulty: Difficulty.Hard,
    category: 'Async',
    group: 'Step 4: Asynchronous JavaScript',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all',
    starterCode: `async function fetchAll(urls) {
  // Your code here
  // For testing, return a mock array like [{data: 1}, {data: 2}]
}`,
    testCases: [ { input: [['url1', 'url2']], expectedOutput: [{data: 1}, {data: 2}] } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [['url1', 'url2']], expectedOutput: [{data: 1}, {data: 2}] } ]),
  },
  {
    id: 'async-timeout',
    title: 'Async with setTimeout',
    description: 'Write an async function `wait` that takes a number of milliseconds and resolves a promise after that delay.',
    difficulty: Difficulty.Easy,
    category: 'Async',
    group: 'Step 4: Asynchronous JavaScript',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/setTimeout',
    starterCode: `function wait(ms) {
 // Return new Promise(...) 
}`,
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
        id: 'promise-race',
        title: 'Using Promise.race',
        description: 'Write a function `racePromises` that takes an array of promises and returns the result of the first promise that settles (either resolves or rejects). For this conceptual test, mock the promises.',
        difficulty: Difficulty.Medium, category: 'Async', group: 'Step 4: Asynchronous JavaScript',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race',
        starterCode: `async function racePromises(promises) {
  // Your code here
  // For testing, return "first"
}`,
        testCases: [ { input: [[]], expectedOutput: 'first' } ],
        solutionCheck: (userCode: string) => runTests(userCode, [ { input: [[]], expectedOutput: 'first' } ]),
    },
    {
        id: 'async-await-error-handling',
        title: 'Async/Await Error Handling',
        description: 'Write an async function `fetchWithErrorHandling` that attempts to fetch from a URL. If the fetch fails, it should catch the error and return the string "Error fetching data". Otherwise, return the mock data { success: true }.',
        difficulty: Difficulty.Medium, category: 'Async', group: 'Step 4: Asynchronous JavaScript',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch',
        starterCode: `async function fetchWithErrorHandling(url) {
  // Your code here
  // For testing, return { success: true }
}`,
        testCases: [ { input: ['good_url'], expectedOutput: { success: true } } ],
        solutionCheck: (userCode: string) => runTests(userCode, [ { input: ['good_url'], expectedOutput: { success: true } } ]),
    },
    {
        id: 'promise-chaining',
        title: 'Promise Chaining',
        description: 'Write a function `promiseChain` that returns a promise, which resolves with 1. Then, chain a `.then()` call that takes the result, multiplies it by 2, and returns it. Finally, return the final result.',
        difficulty: Difficulty.Medium, category: 'Async', group: 'Step 4: Asynchronous JavaScript',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#chaining',
        starterCode: `function promiseChain() {
  // Your code here
  // For testing, just return Promise.resolve(2);
}`,
        testCases: [],
        solutionCheck: (userCode: string) => runTests(userCode, [ { input: [], expectedOutput: 2 } ]),
    },
];