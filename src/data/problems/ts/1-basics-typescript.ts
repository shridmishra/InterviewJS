import { Problem, Difficulty } from "../../../types";
import { runTests } from "./utils";

export const typescriptBasics: Omit<
  Problem,
  "status" | "isStarred" | "notes"
>[] = [
  {
    id: "typescript-basic-types",
    title: "TypeScript Basic Types",
    description:
      "Declare a variable `age` of type `number`, a variable `name` of type `string`, and a variable `isStudent` of type `boolean`.",
    difficulty: Difficulty.Easy,
    category: "Primitives",
    group: "Step 1: TypeScript Basics",
    docsUrl: "https://www.typescriptlang.org/docs/handbook/2/basic-types.html",
    starterCode: `// Declare variables here
// let age: ...
// let name: ...
// let isStudent: ...
`,
    solutionCheck: (userCode: string) => {
      try {
        // We can't directly check compile-time types at runtime with eval.
        // This check simulates the assignment and checks runtime types.
        const proxy = new Function(
          `
          ${userCode}
          age = 25;
          name = "Alice";
          isStudent = true;
          return { age, name, isStudent };
        `
        );
        const { age, name, isStudent } = proxy();
        const passed =
          typeof age === "number" &&
          typeof name === "string" &&
          typeof isStudent === "boolean";
        return [
          {
            input: "N/A",
            expected: "age: number, name: string, isStudent: boolean",
            actual: `age: ${typeof age}, name: ${typeof name}, isStudent: ${typeof isStudent}`,
            passed: passed,
          },
        ];
      } catch (e: unknown) {
        return [
          {
            input: "N/A",
            expected: "No runtime errors",
            actual: `Error: ${e instanceof Error ? e.message : String(e)}`,
            passed: false,
          },
        ];
      }
    },
    testCases: [],
  },
  {
    id: "typescript-interfaces",
    title: "TypeScript Interfaces",
    description:
      "Define an interface `User` with properties `id` (number) and `name` (string). Then create an object `myUser` that conforms to this interface.",
    difficulty: Difficulty.Easy,
    category: "Interfaces",
    group: "Step 1: TypeScript Basics",
    docsUrl: "https://www.typescriptlang.org/docs/handbook/2/interfaces.html",
    starterCode: `// Define interface here
interface User {
  // ...
}

// Create an object conforming to the interface
const myUser: User = {
  // ...
};
`,
    solutionCheck: (userCode: string) => {
      try {
        // This is a runtime check for the object structure, assuming the interface was correctly applied.
        const proxy = new Function(
          `
          ${userCode}
          return myUser;
        `
        );
        const user = proxy();
        const passed =
          typeof user.id === "number" && typeof user.name === "string";
        return [
          {
            input: "N/A",
            expected: "Object with id (number) and name (string)",
            actual: `id: ${typeof user.id}, name: ${typeof user.name}`,
            passed: passed,
          },
        ];
      } catch (e: unknown) {
        return [
          {
            input: "N/A",
            expected: "No runtime errors",
            actual: `Error: ${e instanceof Error ? e.message : String(e)}`,
            passed: false,
          },
        ];
      }
    },
    testCases: [],
  },
  {
    id: "typescript-function-types",
    title: "TypeScript Function Types",
    description:
      "Write a function `add` that takes two numbers and returns a number. Use TypeScript types for the parameters and return value.",
    difficulty: Difficulty.Easy,
    category: "Functions",
    group: "Step 1: TypeScript Basics",
    docsUrl: "https://www.typescriptlang.org/docs/handbook/2/functions.html",
    starterCode: `function add(a: number, b: number): number {
  // Your code here
}`,
    testCases: [
      { input: [1, 2], expectedOutput: 3 },
      { input: [10, -5], expectedOutput: 5 },
    ],
    solutionCheck: (userCode: string) =>
      runTests(userCode, [
        { input: [1, 2], expectedOutput: 3 },
        { input: [10, -5], expectedOutput: 5 },
        { input: [0, 0], expectedOutput: 0 },
        { input: [-1, -1], expectedOutput: -2 },
      ]),
  },

  {
    id: "ts-declare-string",
    title: "Declare a String Type",
    description:
      'Declare a variable `greeting` and explicitly assign it the type `string`. Initialize it with "Hello, TypeScript!".',
    difficulty: Difficulty.Easy,
    category: "Primitives",
    group: "Step 1: TypeScript Basics",
    docsUrl:
      "https://www.typescriptlang.org/docs/docs/handbook/2/everyday-types.html#the-primitives-string-number-and-boolean",
    starterCode: `let greeting: string; // Initialize this variable`,
    testCases: [{ input: [], expectedOutput: "Hello, TypeScript!" }],
    solutionCheck: (userCode: string) => {
      try {
        const proxy = new Function(
          `
          ${userCode}
          return greeting;
        `
        );
        const result = proxy();
        return [
          {
            input: "N/A",
            expected: "Hello, TypeScript!",
            actual: result,
            passed: result === "Hello, TypeScript!",
          },
        ];
      } catch (e: unknown) {
        return [
          {
            input: "N/A",
            expected: "No runtime errors",
            actual: `Error: ${e instanceof Error ? e.message : String(e)}`,
            passed: false,
          },
        ];
      }
    },
  },
  {
    id: "ts-declare-number",
    title: "Declare a Number Type",
    description:
      "Declare a variable `age` and explicitly assign it the type `number`. Initialize it with `30`.",
    difficulty: Difficulty.Easy,
    category: "Primitives",
    group: "Step 1: TypeScript Basics",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#the-primitives-string-number-and-boolean",
    starterCode: `let age: number; // Initialize this variable`,
    testCases: [{ input: [], expectedOutput: 30 }],
    solutionCheck: (userCode: string) => {
      try {
        const proxy = new Function(
          `
          ${userCode}
          return age;
        `
        );
        const result = proxy();
        return [
          {
            input: "N/A",
            expected: "30",
            actual: result,
            passed: result === 30,
          },
        ];
      } catch (e: unknown) {
        return [
          {
            input: "N/A",
            expected: "No runtime errors",
            actual: `Error: ${e instanceof Error ? e.message : String(e)}`,
            passed: false,
          },
        ];
      }
    },
  },
  {
    id: "ts-declare-boolean",
    title: "Declare a Boolean Type",
    description:
      "Declare a variable `isActive` and explicitly assign it the type `boolean`. Initialize it with `true`.",
    difficulty: Difficulty.Easy,
    category: "Primitives",
    group: "Step 1: TypeScript Basics",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#the-primitives-string-number-and-boolean",
    starterCode: `let isActive: boolean; // Initialize this variable`,
    testCases: [{ input: [], expectedOutput: true }],
    solutionCheck: (userCode: string) => {
      try {
        const proxy = new Function(
          `
          ${userCode}
          return isActive;
        `
        );
        const result = proxy();
        return [
          {
            input: "N/A",
            expected: String(true),
            actual: result,
            passed: result === true,
          },
        ];
      } catch (e: unknown) {
        return [
          {
            input: "N/A",
            expected: "No runtime errors",
            actual: `Error: ${e instanceof Error ? e.message : String(e)}`,
            passed: false,
          },
        ];
      }
    },
  },
  {
    id: "ts-declare-array",
    title: "Declare an Array Type",
    description:
      "Declare a variable `numbers` and explicitly assign it the type `number[]`. Initialize it with `[1, 2, 3]`.",
    difficulty: Difficulty.Easy,
    category: "Arrays",
    group: "Step 1: TypeScript Basics",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays",
    starterCode: `let numbers: number[]; // Initialize this variable`,
    testCases: [{ input: [], expectedOutput: [1, 2, 3] }],
    solutionCheck: (userCode: string) => {
      try {
        const proxy = new Function(
          `
          ${userCode}
          return numbers;
        `
        );
        const result = proxy();
        return [
          {
            input: "N/A",
            expected: JSON.stringify([1, 2, 3]),
            actual: result,
            passed: JSON.stringify(result) === JSON.stringify([1, 2, 3]),
          },
        ];
      } catch (e: unknown) {
        return [
          {
            input: "N/A",
            expected: "No runtime errors",
            actual: `Error: ${e instanceof Error ? e.message : String(e)}`,
            passed: false,
          },
        ];
      }
    },
  },
  {
    id: "ts-declare-tuple",
    title: "Declare a Tuple Type",
    description:
      'Declare a variable `userInfo` and explicitly assign it the type `[string, number]`. Initialize it with `["Alice", 25]`.',
    difficulty: Difficulty.Medium,
    category: "Tuples",
    group: "Step 1: TypeScript Basics",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#tuple-types",
    starterCode: `let userInfo: [string, number]; // Initialize this variable`,
    testCases: [{ input: [], expectedOutput: ["Alice", 25] }],
    solutionCheck: (userCode: string) => {
      try {
        const proxy = new Function(
          `
          ${userCode}
          return userInfo;
        `
        );
        const result = proxy();
        return [
          {
            input: "N/A",
            expected: JSON.stringify(["Alice", 25]),
            actual: result,
            passed: JSON.stringify(result) === JSON.stringify(["Alice", 25]),
          },
        ];
      } catch (e: unknown) {
        return [
          {
            input: "N/A",
            expected: "No runtime errors",
            actual: `Error: ${e instanceof Error ? e.message : String(e)}`,
            passed: false,
          },
        ];
      }
    },
  },
  {
    id: "ts-interface-person",
    title: "Define a Person Interface and Object",
    description:
      "Define an interface `Person` with properties `name` (string) and `age` (number). Create an object `user` of type `Person`.",
    difficulty: Difficulty.Medium,
    category: "Interfaces",
    group: "Step 1: TypeScript Basics",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces",
    starterCode: `interface Person {
  // Define properties
}
const user: Person = {
  // Initialize object
};`,
    testCases: [{ input: [], expectedOutput: { name: "Bob", age: 30 } }],
    solutionCheck: (userCode: string) => {
      try {
        const proxy = new Function(
          `
          ${userCode}
          return user;
        `
        );
        const result = proxy();
        const passed =
          typeof result.name === "string" && typeof result.age === "number";
        return [
          {
            input: "N/A",
            expected: "{ name: string, age: number }",
            actual: JSON.stringify(result),
            passed: passed,
          },
        ];
      } catch (e: unknown) {
        return [
          {
            input: "N/A",
            expected: "No runtime errors",
            actual: `Error: ${e instanceof Error ? e.message : String(e)}`,
            passed: false,
          },
        ];
      }
    },
  },
  {
    id: "ts-type-alias-point",
    title: "Define a Point Type Alias and Object",
    description:
      "Define a type alias `Point` for an object with properties `x` (number) and `y` (number). Create an object `origin` of type `Point`.",
    difficulty: Difficulty.Medium,
    category: "Aliases",
    group: "Step 1: TypeScript Basics",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases",
    starterCode: `type Point = {
  // Define properties
};
const origin: Point = {
  // Initialize object
};`,
    testCases: [{ input: [], expectedOutput: { x: 0, y: 0 } }],
    solutionCheck: (userCode: string) => {
      try {
        const proxy = new Function(
          `
          ${userCode}
          return origin;
        `
        );
        const result = proxy();
        const passed =
          typeof result.x === "number" && typeof result.y === "number";
        return [
          {
            input: "N/A",
            expected: "{ x: number, y: number }",
            actual: JSON.stringify(result),
            passed: passed,
          },
        ];
      } catch (e: unknown) {
        return [
          {
            input: "N/A",
            expected: "No runtime errors",
            actual: `Error: ${e instanceof Error ? e.message : String(e)}`,
            passed: false,
          },
        ];
      }
    },
  },
  {
    id: "ts-optional-property",
    title: "Optional Interface Property",
    description:
      "Modify the `Person` interface to make the `age` property optional. Create a `Person` object without `age`.",
    difficulty: Difficulty.Medium,
    category: "Interfaces",
    group: "Step 1: TypeScript Basics",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#optional-properties",
    starterCode: `interface Person {
  name: string;
  // Add optional age property
}
const userWithoutAge: Person = {
  // Initialize object
};`,
    testCases: [{ input: [], expectedOutput: { name: "Charlie" } }],
    solutionCheck: (userCode: string) => {
      try {
        const proxy = new Function(
          `
          ${userCode}
          return userWithoutAge;
        `
        );
        const result = proxy();
        const passed =
          typeof result.name === "string" && result.age === undefined;
        return [
          {
            input: "N/A",
            expected: "{ name: string, age?: number }",
            actual: JSON.stringify(result),
            passed: passed,
          },
        ];
      } catch (e: unknown) {
        return [
          {
            input: "N/A",
            expected: "No runtime errors",
            actual: `Error: ${e instanceof Error ? e.message : String(e)}`,
            passed: false,
          },
        ];
      }
    },
  },
  {
    id: "ts-readonly-property",
    title: "Readonly Interface Property",
    description:
      "Define an interface `Config` with a `readonly` property `apiKey` (string). Create a `Config` object.",
    difficulty: Difficulty.Medium,
    category: "Interfaces",
    group: "Step 1: TypeScript Basics",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#readonly-properties",
    starterCode: `interface Config {
  // Add readonly property
}
const appConfig: Config = {
  // Initialize object
};`,
    testCases: [{ input: [], expectedOutput: { apiKey: "mysecretkey" } }],
    solutionCheck: (userCode: string) => {
      try {
        const proxy = new Function(
          `
          ${userCode}
          return appConfig;
        `
        );
        const result = proxy();
        const passed = typeof result.apiKey === "string";
        // Cannot test readonly at runtime with eval, but can check property existence and type
        return [
          {
            input: "N/A",
            expected: "{ readonly apiKey: string }",
            actual: JSON.stringify(result),
            passed: passed,
          },
        ];
      } catch (e: unknown) {
        return [
          {
            input: "N/A",
            expected: "No runtime errors",
            actual: `Error: ${e instanceof Error ? e.message : String(e)}`,
            passed: false,
          },
        ];
      }
    },
  },
  {
    id: "ts-union-type",
    title: "Union Type for ID",
    description:
      "Define a type alias `ID` that can be either `string` or `number`. Declare a variable `userId` of type `ID`.",
    difficulty: Difficulty.Medium,
    category: "Unions",
    group: "Step 1: TypeScript Basics",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types",
    starterCode: `type ID = // Define union type
let userId: ID = // Initialize variable`,
    testCases: [{ input: [], expectedOutput: "abc-123" }],
    solutionCheck: (userCode: string) => {
      try {
        const proxy = new Function(
          `
          ${userCode}
          let testNum: ID = 123;
          let testStr: ID = "def-456";
          return { userId, testNum, testStr };
        `
        );
        const { userId, testNum, testStr } = proxy();
        const passed =
          (typeof userId === "string" || typeof userId === "number") &&
          (typeof testNum === "string" || typeof testNum === "number") &&
          (typeof testStr === "string" || typeof testStr === "number");
        return [
          {
            input: "N/A",
            expected: "ID can be string or number",
            actual: `userId: ${typeof userId}, testNum: ${typeof testNum}, testStr: ${typeof testStr}`,
            passed: passed,
          },
        ];
      } catch (e: unknown) {
        return [
          {
            input: "N/A",
            expected: "No runtime errors",
            actual: `Error: ${e instanceof Error ? e.message : String(e)}`,
            passed: false,
          },
        ];
      }
    },
  },
  {
    id: "ts-function-add",
    title: "Typed Function for Addition",
    description:
      "Write a function `add` that takes two `number` arguments and returns their `number` sum.",
    difficulty: Difficulty.Easy,
    category: "Functions",
    group: "Step 1: TypeScript Basics",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/2/functions.html#functions",
    starterCode: `function add(a: number, b: number): number {
  // Your code here
}`,
    testCases: [{ input: [1, 2], expectedOutput: 3 }],
    solutionCheck: (userCode: string) =>
      runTests(userCode, [{ input: [5, 10], expectedOutput: 15 }]),
  },
  {
    id: "ts-function-void",
    title: "Function with Void Return",
    description:
      "Write a function `logMessage` that takes a `string` argument and logs it to the console. It should have a `void` return type.",
    difficulty: Difficulty.Easy,
    category: "Functions",
    group: "Step 1: TypeScript Basics",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#void",
    starterCode: `function logMessage(message: string): void {
  // Your code here
}`,
    testCases: [{ input: ["Test"], expectedOutput: undefined }], // Expect undefined for void functions
    solutionCheck: (userCode: string) =>
      runTests(userCode, [{ input: ["Hello"], expectedOutput: undefined }]),
  },
  {
    id: "ts-function-optional-param",
    title: "Function with Optional Parameter",
    description:
      'Write a function `greet` that takes a `name` (string) and an optional `greetingMessage` (string). If `greetingMessage` is not provided, it should default to "Hello".',
    difficulty: Difficulty.Medium,
    category: "Functions",
    group: "Step 1: TypeScript Basics",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/2/functions.html#optional-and-default-parameters",
    starterCode: `function greet(name: string, greetingMessage?: string): string {
  // Your code here
}`,
    testCases: [
      { input: ["Alice"], expectedOutput: "Hello, Alice!" },
      { input: ["Bob", "Hi"], expectedOutput: "Hi, Bob!" },
    ],
    solutionCheck: (userCode: string) =>
      runTests(userCode, [
        { input: ["Alice"], expectedOutput: "Hello, Alice!" },
        { input: ["Bob", "Hi"], expectedOutput: "Hi, Bob!" },
      ]),
  },
  {
    id: "ts-function-default-param",
    title: "Function with Default Parameter",
    description:
      "Write a function `multiply` that takes two `number` arguments, `a` and `b`. `b` should have a default value of `1`.",
    difficulty: Difficulty.Medium,
    category: "Functions",
    group: "Step 1: TypeScript Basics",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/2/functions.html#optional-and-default-parameters",
    starterCode: `function multiply(a: number, b: number = 1): number {
  // Your code here
}`,
    testCases: [
      { input: [5], expectedOutput: 5 },
      { input: [5, 2], expectedOutput: 10 },
    ],
    solutionCheck: (userCode: string) =>
      runTests(userCode, [
        { input: [7], expectedOutput: 7 },
        { input: [3, 4], expectedOutput: 12 },
      ]),
  },
];
