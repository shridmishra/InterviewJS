import { Problem, Difficulty } from "../../../types";
import { runTests } from "./utils";

export const typescriptModulesAsync: Omit<
  Problem,
  "status" | "isStarred" | "notes"
>[] = [
  {
    id: "ts-namespace-basics",
    title: "Namespace Basics",
    description:
      "Create a namespace `Utils` with a function `capitalize` that capitalizes a string.",
    difficulty: Difficulty.Medium,
    category: "Namespaces",
    group: "Step 5: TypeScript Modules & Async",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/namespaces.html",
    starterCode: `namespace Utils {
  export function capitalize(str: string): string {
    // Your code here
  }
}`,
    testCases: [
      { input: ["hello"], expectedOutput: "Hello" },
      { input: ["world"], expectedOutput: "World" },
    ],
    solutionCheck: (userCode: string) => {
      try {
        const func = new Function(`
          ${userCode}
          return Utils.capitalize("hello");
        `);
        const result = func();
        const passed = result === "Hello";
        return [
          {
            input: "hello",
            expected: "Hello",
            actual: result,
            passed: passed,
          },
        ];
      } catch (e: unknown) {
        return [
          {
            input: "N/A",
            expected: "No errors",
            actual: `Error: ${e instanceof Error ? e.message : String(e)}`,
            passed: false,
          },
        ];
      }
    },
  },
  {
    id: "ts-module-augmentation",
    title: "Module Augmentation Concept",
    description:
      "Understand how to extend existing modules by adding new properties to an interface.",
    difficulty: Difficulty.Hard,
    category: "Modules",
    group: "Step 5: TypeScript Modules & Async",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/declaration-merging.html",
    starterCode: `interface User {
  name: string;
}

// Module augmentation
interface User {
  age: number;
}

const user: User = {
  name: "Alice",
  age: 30
};`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      try {
        const func = new Function(`
          ${userCode}
          return user;
        `);
        const result = func();
        const passed = result.name === "Alice" && result.age === 30;
        return [
          {
            input: "N/A",
            expected: "User with name and age",
            actual: JSON.stringify(result),
            passed: passed,
          },
        ];
      } catch (e: unknown) {
        return [
          {
            input: "N/A",
            expected: "No errors",
            actual: `Error: ${e instanceof Error ? e.message : String(e)}`,
            passed: false,
          },
        ];
      }
    },
  },
  {
    id: "ts-triple-slash-directives",
    title: "Understanding Types in Modules",
    description:
      "Work with import/export types and understand module resolution.",
    difficulty: Difficulty.Medium,
    category: "Modules",
    group: "Step 5: TypeScript Modules & Async",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/modules.html",
    starterCode: `type UserId = string;
type UserName = string;

interface UserData {
  id: UserId;
  name: UserName;
}

function createUser(id: UserId, name: UserName): UserData {
  // Your code here
}`,
    testCases: [
      { input: ["123", "Alice"], expectedOutput: { id: "123", name: "Alice" } },
    ],
    solutionCheck: (userCode: string) =>
      runTests(userCode, [
        { input: ["123", "Alice"], expectedOutput: { id: "123", name: "Alice" } },
        { input: ["456", "Bob"], expectedOutput: { id: "456", name: "Bob" } },
      ]),
  },
  {
    id: "ts-promise-type",
    title: "Promise Types",
    description:
      "Create an async function that returns a Promise with proper typing.",
    difficulty: Difficulty.Medium,
    category: "Async",
    group: "Step 5: TypeScript Modules & Async",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#promises",
    starterCode: `async function fetchUser(id: number): Promise<{ id: number; name: string }> {
  // Your code here
}`,
    testCases: [],
    solutionCheck: async (userCode: string) => {
      try {
        const func = new Function(`
          ${userCode}
          return fetchUser(1);
        `);
        const result = await func();
        const passed = result.id === 1 && result.name === "User1";
        return [
          {
            input: "1",
            expected: '{ id: 1, name: "User1" }',
            actual: JSON.stringify(result),
            passed: passed,
          },
        ];
      } catch (e: unknown) {
        return [
          {
            input: "N/A",
            expected: "No errors",
            actual: `Error: ${e instanceof Error ? e.message : String(e)}`,
            passed: false,
          },
        ];
      }
    },
  },
  {
    id: "ts-async-await",
    title: "Async/Await with Type Safety",
    description:
      "Create a function that uses async/await with proper error handling and types.",
    difficulty: Difficulty.Medium,
    category: "Async",
    group: "Step 5: TypeScript Modules & Async",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-7.html#asyncawait",
    starterCode: `async function fetchData(): Promise<string> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve("data"), 100);
  });
}

async function getData(): Promise<string> {
  // Your code here
}`,
    testCases: [],
    solutionCheck: async (userCode: string) => {
      try {
        const func = new Function(`
          ${userCode}
          return getData();
        `);
        const result = await func();
        const passed = result === "data";
        return [
          {
            input: "N/A",
            expected: "data",
            actual: result,
            passed: passed,
          },
        ];
      } catch (e: unknown) {
        return [
          {
            input: "N/A",
            expected: "No errors",
            actual: `Error: ${e instanceof Error ? e.message : String(e)}`,
            passed: false,
          },
        ];
      }
    },
  },
  {
    id: "ts-promise-all",
    title: "Promise.all with Types",
    description:
      "Use Promise.all with proper typing for multiple async operations.",
    difficulty: Difficulty.Hard,
    category: "Async",
    group: "Step 5: TypeScript Modules & Async",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#promises",
    starterCode: `async function fetchNumber(): Promise<number> {
  return 42;
}

async function fetchString(): Promise<string> {
  return "hello";
}

async function fetchBoth(): Promise<[number, string]> {
  // Your code here
}`,
    testCases: [],
    solutionCheck: async (userCode: string) => {
      try {
        const func = new Function(`
          ${userCode}
          return fetchBoth();
        `);
        const result = await func();
        const passed =
          Array.isArray(result) && result[0] === 42 && result[1] === "hello";
        return [
          {
            input: "N/A",
            expected: "[42, 'hello']",
            actual: JSON.stringify(result),
            passed: passed,
          },
        ];
      } catch (e: unknown) {
        return [
          {
            input: "N/A",
            expected: "No errors",
            actual: `Error: ${e instanceof Error ? e.message : String(e)}`,
            passed: false,
          },
        ];
      }
    },
  },
  {
    id: "ts-awaited-type",
    title: "Awaited Utility Type",
    description:
      "Use the Awaited utility type to extract the type from a Promise.",
    difficulty: Difficulty.Hard,
    category: "Async",
    group: "Step 5: TypeScript Modules & Async",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/utility-types.html#awaitedtype",
    starterCode: `async function fetchUser(): Promise<{ id: number; name: string }> {
  return { id: 1, name: "Alice" };
}

type User = Awaited<ReturnType<typeof fetchUser>>;

const user: User = { id: 1, name: "Alice" };`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      try {
        const func = new Function(`
          ${userCode}
          return user;
        `);
        const result = func();
        const passed = result.id === 1 && result.name === "Alice";
        return [
          {
            input: "N/A",
            expected: "User type from promise",
            actual: JSON.stringify(result),
            passed: passed,
          },
        ];
      } catch (e: unknown) {
        return [
          {
            input: "N/A",
            expected: "No errors",
            actual: `Error: ${e instanceof Error ? e.message : String(e)}`,
            passed: false,
          },
        ];
      }
    },
  },
];
