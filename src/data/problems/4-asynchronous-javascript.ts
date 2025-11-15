import { Problem, Difficulty } from '../../types';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { runTests } from './utils';

export const asynchronousJavaScript: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'create-resolving-promise',
    title: 'Create a Resolving Promise',
    description: 'Write a function `createResolvingPromise` that returns a Promise which resolves immediately with the string "Success!".',
    difficulty: Difficulty.Easy,
    category: 'Async',
    group: 'Step 4: Asynchronous JavaScript',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve',
    starterCode: `function createResolvingPromise() {
  // Your code here
}`,
    testCases: [],
    solutionCheck: async (userCode: string) => {
      try {
        const userFn = new Function(`return ${userCode}`)();
        const result = await userFn();
        return [{ input: 'N/A', expected: 'Success!', actual: result, passed: result === 'Success!' }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'Success!', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    },
  },
  {
    id: 'create-rejecting-promise',
    title: 'Create a Rejecting Promise',
    description: 'Write a function `createRejectingPromise` that returns a Promise which rejects immediately with the string "Failed!".',
    difficulty: Difficulty.Easy,
    category: 'Async',
    group: 'Step 4: Asynchronous JavaScript',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject',
    starterCode: `function createRejectingPromise() {
  // Your code here
}`,
    testCases: [],
    solutionCheck: async (userCode: string) => {
      try {
        const userFn = new Function(`return ${userCode}`)();
        await userFn();
        return [{ input: 'N/A', expected: 'Promise to reject with "Failed!"', actual: 'Promise resolved unexpectedly', passed: false }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'Failed!', actual: String(e), passed: e === 'Failed!' }];
      }
    },
  },
  {
    id: 'async-delay',
    title: 'Async Delay with setTimeout',
    description: 'Write an async function `delay` that takes a number of milliseconds `ms` and returns a Promise that resolves after `ms` milliseconds with the string "Delayed by Xms".',
    difficulty: Difficulty.Medium,
    category: 'Async',
    group: 'Step 4: Asynchronous JavaScript',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/setTimeout',
    starterCode: `async function delay(ms) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: async (userCode: string) => {
      try {
        const userFn = new Function(`return ${userCode}`)();
        const startTime = Date.now();
        const delayTime = 50; // ms
        const result = await userFn(delayTime);
        const endTime = Date.now();
        const duration = endTime - startTime;

        const passed = result === `Delayed by ${delayTime}ms` && duration >= delayTime && duration < delayTime * 2; // Allow some leeway
        return [{
          input: String(delayTime),
          expected: `Delayed by ${delayTime}ms` + ` (after ~${delayTime}ms)`,
          actual: result + ` (after ~${duration}ms)`,
          passed: passed
        }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'No runtime errors', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    },
  },
  {
    id: 'chain-promises',
    title: 'Chain Promises',
    description: 'Write a function `chainPromises` that returns a Promise. This promise should first resolve with 1, then chain another `.then()` to multiply the result by 2, and finally chain another `.then()` to add 3 to the result. The final result should be returned.',
    difficulty: Difficulty.Medium,
    category: 'Async',
    group: 'Step 4: Asynchronous JavaScript',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#chaining',
    starterCode: `function chainPromises() {
  // Your code here
}`,
    testCases: [],
    solutionCheck: async (userCode: string) => {
      try {
        const userFn = new Function(`return ${userCode}`)();
        const result = await userFn();
        return [{ input: 'N/A', expected: String(5), actual: result, passed: result === 5 }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: String(5), actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    },
  },
  {
    id: 'use-async-await',
    title: 'Use Async/Await',
    description: 'Write an async function `getData` that simulates fetching data. It should `await` a Promise that resolves with the string "Data fetched!" after 50ms. The function should return this resolved value.',
    difficulty: Difficulty.Medium,
    category: 'Async',
    group: 'Step 4: Asynchronous JavaScript',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/AsyncFunction',
    starterCode: `async function getData() {
  // Simulate an async operation
  const fetchData = () => new Promise(resolve => setTimeout(() => resolve("Data fetched!"), 50));
  // Your code here
}`,
    testCases: [],
    solutionCheck: async (userCode: string) => {
      try {
        const userFn = new Function(`
          const fetchData = () => new Promise(resolve => setTimeout(() => resolve("Data fetched!"), 50));
          return ${userCode}
        `)();
        const result = await userFn();
        return [{ input: 'N/A', expected: 'Data fetched!', actual: result, passed: result === 'Data fetched!' }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'Data fetched!', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    },
  },
  {
    id: 'promise-all-with-delays',
    title: 'Promise.all with Delays',
    description: 'Write an async function `fetchMultipleData` that takes an array of numbers (delays in ms). For each delay, create a Promise that resolves with the delay value after that many milliseconds. Use `Promise.all` to wait for all promises to resolve and return an array of their resolved values.',
    difficulty: Difficulty.Hard,
    category: 'Async',
    group: 'Step 4: Asynchronous JavaScript',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all',
    starterCode: `async function fetchMultipleData(delays) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: async (userCode: string) => {
      const delays = [20, 40, 10];
      try {
        const userFn = new Function(`return ${userCode}`)();
        const result = await userFn(delays);
        return [{ input: JSON.stringify(delays), expected: JSON.stringify(delays), actual: JSON.stringify(result), passed: JSON.stringify(result) === JSON.stringify(delays) }];
      } catch (e: unknown) {
        return [{ input: JSON.stringify(delays), expected: JSON.stringify(delays), actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    },
  },
  {
    id: 'async-error-handling',
    title: 'Async Error Handling',
    description: 'Write an async function `handleError` that takes a boolean `shouldFail`. If `shouldFail` is true, it should `await` a Promise that rejects with "Operation failed!". Otherwise, it should `await` a Promise that resolves with "Operation successful!". Use `try...catch` to return the error message if the promise rejects, or the success message if it resolves.',
    difficulty: Difficulty.Hard,
    category: 'Async',
    group: 'Step 4: Asynchronous JavaScript',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch',
    starterCode: `async function handleError(shouldFail) {
  const operation = (fail) => new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fail) reject("Operation failed!");
      else resolve("Operation successful!");
    }, 20);
  });
  // Your code here
}`,
    testCases: [],
    solutionCheck: async (userCode: string) => {
      try {
        const userFn = new Function(`
          const operation = (fail) => new Promise((resolve, reject) => {
            setTimeout(() => {
              if (fail) reject("Operation failed!");
              else resolve("Operation successful!");
            }, 20);
          });
          return ${userCode}
        `)();

        const successResult = await userFn(false);
        const failResult = await userFn(true);

        const test1 = { input: String(true), expected: 'Operation failed!', actual: failResult, passed: failResult === 'Operation failed!' };
        const test2 = { input: String(false), expected: 'Operation successful!', actual: successResult, passed: successResult === 'Operation successful!' };

        return [test1, test2];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'Correct error handling', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    },
  },
];