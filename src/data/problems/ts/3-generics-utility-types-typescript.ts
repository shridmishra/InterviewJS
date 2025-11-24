import { Problem, Difficulty } from "../../../types";
import { runTests } from "./utils";

export const typescriptGenericsUtilityTypes: Omit<
  Problem,
  "status" | "isStarred" | "notes"
>[] = [
  {
    id: "ts-generic-identity",
    title: "Generic Identity Function",
    description:
      "Create a generic function `identity` that returns the same value that is passed to it, preserving the type.",
    difficulty: Difficulty.Easy,
    category: "Generics",
    group: "Step 3: TypeScript Generics & Utility Types",
    docsUrl: "https://www.typescriptlang.org/docs/handbook/2/generics.html",
    starterCode: `function identity<T>(arg: T): T {
  // Your code here
}`,
    testCases: [
      { input: [5], expectedOutput: 5 },
      { input: ["hello"], expectedOutput: "hello" },
    ],
    solutionCheck: (userCode: string) =>
      runTests(userCode, [
        { input: [5], expectedOutput: 5 },
        { input: ["hello"], expectedOutput: "hello" },
        { input: [true], expectedOutput: true },
      ]),
  },
  {
    id: "ts-generic-array",
    title: "Generic Array Function",
    description:
      "Create a generic function `firstElement` that returns the first element of an array, preserving its type.",
    difficulty: Difficulty.Easy,
    category: "Generics",
    group: "Step 3: TypeScript Generics & Utility Types",
    docsUrl: "https://www.typescriptlang.org/docs/handbook/2/generics.html",
    starterCode: `function firstElement<T>(arr: T[]): T | undefined {
  // Your code here
}`,
    testCases: [
      { input: [[1, 2, 3]], expectedOutput: 1 },
      { input: [["a", "b", "c"]], expectedOutput: "a" },
    ],
    solutionCheck: (userCode: string) =>
      runTests(userCode, [
        { input: [[1, 2, 3]], expectedOutput: 1 },
        { input: [["a", "b", "c"]], expectedOutput: "a" },
        { input: [[]], expectedOutput: undefined },
      ]),
  },
  {
    id: "ts-generic-pair",
    title: "Generic Pair Type",
    description:
      "Create a generic type `Pair<T, U>` and a function that creates pairs.",
    difficulty: Difficulty.Medium,
    category: "Generics",
    group: "Step 3: TypeScript Generics & Utility Types",
    docsUrl: "https://www.typescriptlang.org/docs/handbook/2/generics.html",
    starterCode: `type Pair<T, U> = { first: T; second: U };

function makePair<T, U>(first: T, second: U): Pair<T, U> {
  // Your code here
}`,
    testCases: [
      { input: [1, "hello"], expectedOutput: { first: 1, second: "hello" } },
    ],
    solutionCheck: (userCode: string) =>
      runTests(userCode, [
        { input: [1, "hello"], expectedOutput: { first: 1, second: "hello" } },
        { input: ["a", true], expectedOutput: { first: "a", second: true } },
      ]),
  },
  {
    id: "ts-generic-constraint",
    title: "Generic with Constraint",
    description:
      "Create a generic function `getLength` that works with any type that has a `length` property.",
    difficulty: Difficulty.Medium,
    category: "Generics",
    group: "Step 3: TypeScript Generics & Utility Types",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints",
    starterCode: `function getLength<T extends { length: number }>(arg: T): number {
  // Your code here
}`,
    testCases: [
      { input: ["hello"], expectedOutput: 5 },
      { input: [[1, 2, 3]], expectedOutput: 3 },
    ],
    solutionCheck: (userCode: string) =>
      runTests(userCode, [
        { input: ["hello"], expectedOutput: 5 },
        { input: [[1, 2, 3]], expectedOutput: 3 },
        { input: [[1, 2, 3, 4, 5]], expectedOutput: 5 },
      ]),
  },
  {
    id: "ts-generic-extends-keyof",
    title: "Generic with keyof",
    description:
      "Create a function `getProperty` that safely gets a property from an object using generics and keyof.",
    difficulty: Difficulty.Hard,
    category: "Generics",
    group: "Step 3: TypeScript Generics & Utility Types",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/2/generics.html#using-type-parameters-in-generic-constraints",
    starterCode: `function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  // Your code here
}`,
    testCases: [
      {
        input: [{ name: "Alice", age: 30 }, "name"],
        expectedOutput: "Alice",
      },
    ],
    solutionCheck: (userCode: string) =>
      runTests(userCode, [
        {
          input: [{ name: "Alice", age: 30 }, "name"],
          expectedOutput: "Alice",
        },
        { input: [{ name: "Bob", age: 25 }, "age"], expectedOutput: 25 },
      ]),
  },

  {
    id: "ts-partial-type",
    title: "Partial Type",
    description:
      "Use the `Partial` utility type to make all properties of a `User` type optional.",
    difficulty: Difficulty.Easy,
    category: "Utility Types",
    group: "Step 3: TypeScript Generics & Utility Types",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype",
    starterCode: `interface User {
  name: string;
  age: number;
  email: string;
}

type PartialUser = // Use Partial utility type here

const user: PartialUser = { name: "Alice" };`,
    testCases:  [],
    solutionCheck: (userCode: string) => {
      try {
        const func = new Function(`
          ${userCode}
          return user;
        `);
        const result = func();
        const passed = typeof result === "object" && result.name === "Alice";
        return [
          {
            input: "N/A",
            expected: "Partial user object",
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
    id: "ts-pick-type",
    title: "Pick Type",
    description:
      "Use the `Pick` utility type to create a new type with only `name` and `email` from a `User` type.",
    difficulty: Difficulty.Medium,
    category: "Utility Types",
    group: "Step 3: TypeScript Generics & Utility Types",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys",
    starterCode: `interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

type UserPreview = // Use Pick utility type here

const preview: UserPreview = {
  name: "Bob",
  email: "bob@example.com"
};`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      try {
        const func = new Function(`
          ${userCode}
          return preview;
        `);
        const result = func();
        const passed =
          result.name === "Bob" && result.email === "bob@example.com";
        return [
          {
            input: "N/A",
            expected: "User preview with name and email",
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
    id: "ts-omit-type",
    title: "Omit Type",
    description:
      "Use the `Omit` utility type to create a new type that excludes the `password` field from a `UserData` type.",
    difficulty: Difficulty.Medium,
    category: "Utility Types",
    group: "Step 3: TypeScript Generics & Utility Types",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys",
    starterCode: `interface UserData {
  id: number;
  username: string;
  password: string;
  email: string;
}

type SafeUser = // Use Omit utility type here

const safeUser: SafeUser = {
  id: 1,
  username: "alice",
  email: "alice@example.com"
};`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      try {
        const func = new Function(`
          ${userCode}
          return safeUser;
        `);
        const result = func();
        const passed =
          result.id === 1 &&
          result.username === "alice" &&
          !("password" in result);
        return [
          {
            input: "N/A",
            expected: "User without password",
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
    id: "ts-record-type",
    title: "Record Type",
    description:
      "Use the `Record` utility type to create a type for a dictionary mapping string keys to numbers.",
    difficulty: Difficulty.Medium,
    category: "Utility Types",
    group: "Step 3: TypeScript Generics & Utility Types",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type",
    starterCode: `type Scores = // Use Record utility type here

const studentScores: Scores = {
  alice: 95,
  bob: 87,
  charlie: 92
};`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      try {
        const func = new Function(`
          ${userCode}
          return studentScores;
        `);
        const result = func();
        const passed =
          result.alice === 95 && result.bob === 87;
        return [
          {
            input: "N/A",
            expected: "Student scores record",
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
    id: "ts-returntype",
    title: "ReturnType Utility",
    description:
      "Use the `ReturnType` utility type to extract the return type of a function.",
    difficulty: Difficulty.Hard,
    category: "Utility Types",
    group: "Step 3: TypeScript Generics & Utility Types",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype",
    starterCode: `function getUser() {
  return { name: "Alice", age: 30 };
}

type User = // Use ReturnType utility type here

const user: User = { name: "Bob", age: 25 };`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      try {
        const func = new Function(`
          ${userCode}
          return user;
        `);
        const result = func();
        const passed = result.name === "Bob" && result.age === 25;
        return [
          {
            input: "N/A",
            expected: "User object from return type",
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
