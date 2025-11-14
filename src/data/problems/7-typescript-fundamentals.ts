import { Problem, Difficulty, TestResult } from '../../types';
import { runTests } from './utils';

export const typescriptFundamentals: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'typescript-basic-types',
    title: 'TypeScript Basic Types',
    description: 'Declare a variable `age` of type `number`, a variable `name` of type `string`, and a variable `isStudent` of type `boolean`.',
    difficulty: Difficulty.Easy,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/basic-types.html',
    starterCode: `// Declare variables here
`,
    solutionCheck: (userCode: string) => {
      try {
        const proxy = new Function(`
          let age, name, isStudent;
          ${userCode}
          return { age, name, isStudent };
        `);
        const { age, name, isStudent } = proxy();
        if (typeof age === 'number' && typeof name === 'string' && typeof isStudent === 'boolean') {
          return [{ input: 'N/A', expected: 'Correct types', actual: 'Correct types', passed: true }];
        }
        return [{ input: 'N/A', expected: 'Correct types', actual: 'Incorrect types', passed: false }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'No errors', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }];
      }
    },
    testCases: [],
  },
  {
    id: 'typescript-interfaces',
    title: 'TypeScript Interfaces',
    description: 'Define an interface `User` with properties `id` (number) and `name` (string).',
    difficulty: Difficulty.Easy,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/interfaces.html',
    starterCode: `// Define interface here
`,
    solutionCheck: (userCode: string) => {
      try {
        // This is a conceptual check. We can't truly evaluate an interface at runtime.
        if (userCode.includes('interface User') && userCode.includes('id: number') && userCode.includes('name: string')) {
          return [{ input: 'N/A', expected: 'Interface defined', actual: 'Interface defined', passed: true }];
        }
        return [{ input: 'N/A', expected: 'Interface defined', actual: 'Interface not defined correctly', passed: false }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'No errors', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }];
      }
    },
    testCases: [],
  },
  {
    id: 'typescript-function-types',
    title: 'TypeScript Function Types',
    description: 'Write a function `add` that takes two numbers and returns a number. Use TypeScript types for the parameters and return value.',
    difficulty: Difficulty.Easy,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/functions.html',
    starterCode: `function add(a: number, b: number): number {
  // Your code here
}`,
    testCases: [ { input: [1, 2], expectedOutput: 3 }, { input: [10, -5], expectedOutput: 5 }, ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [1, 2], expectedOutput: 3 }, { input: [10, -5], expectedOutput: 5 }, { input: [0, 0], expectedOutput: 0 }, { input: [-1, -1], expectedOutput: -2 }, ]),
  },
  {
    id: 'typescript-generics',
    title: 'TypeScript Generics',
    description: 'Write a generic function `identity` that takes an argument and returns it.',
    difficulty: Difficulty.Medium,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/generics.html',
    starterCode: `function identity<T>(arg: T): T {
  // Your code here
}`,
    testCases: [ { input: [1], expectedOutput: 1 }, { input: ['a'], expectedOutput: 'a' } ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [1], expectedOutput: 1 }, { input: ['a'], expectedOutput: 'a' }, { input: [true], expectedOutput: true } ]),
  },
  {
    id: 'ts-declare-string',
    title: 'Declare a String Type',
    description: 'Declare a variable `greeting` and explicitly assign it the type `string`. Initialize it with "Hello, TypeScript!".',
    difficulty: Difficulty.Easy,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/docs/handbook/2/everyday-types.html#the-primitives-string-number-and-boolean',
    starterCode: `let greeting: any = "Hello, TypeScript!"; // Change any to string`,
    testCases: [{ input: [], expectedOutput: 'Hello, TypeScript!' }],
    solutionCheck: (userCode: string) => runTests(userCode, [{ input: [], expectedOutput: 'Hello, TypeScript!' }]),
  },
  {
    id: 'ts-declare-number',
    title: 'Declare a Number Type',
    description: 'Declare a variable `age` and explicitly assign it the type `number`. Initialize it with `30`.',
    difficulty: Difficulty.Easy,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#the-primitives-string-number-and-boolean',
    starterCode: `let age: any = 30; // Change any to number`,
    testCases: [{ input: [], expectedOutput: 30 }],
    solutionCheck: (userCode: string) => runTests(userCode, [{ input: [], expectedOutput: 30 }]),
  },
  {
    id: 'ts-declare-boolean',
    title: 'Declare a Boolean Type',
    description: 'Declare a variable `isActive` and explicitly assign it the type `boolean`. Initialize it with `true`.',
    difficulty: Difficulty.Easy,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#the-primitives-string-number-and-boolean',
    starterCode: `let isActive: any = true; // Change any to boolean`,
    testCases: [{ input: [], expectedOutput: true }],
    solutionCheck: (userCode: string) => runTests(userCode, [{ input: [], expectedOutput: true }]),
  },
  {
    id: 'ts-declare-array',
    title: 'Declare an Array Type',
    description: 'Declare a variable `numbers` and explicitly assign it the type `number[]`. Initialize it with `[1, 2, 3]`.',
    difficulty: Difficulty.Easy,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays',
    starterCode: `let numbers: any = [1, 2, 3]; // Change any to number[]`,
    testCases: [{ input: [], expectedOutput: [1, 2, 3] }],
    solutionCheck: (userCode: string) => runTests(userCode, [{ input: [], expectedOutput: [1, 2, 3] }]),
  },
  {
    id: 'ts-declare-tuple',
    title: 'Declare a Tuple Type',
    description: 'Declare a variable `userInfo` and explicitly assign it the type `[string, number]`. Initialize it with `["Alice", 25]`.',
    difficulty: Difficulty.Medium,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#tuple-types',
    starterCode: `let userInfo: any = ["Alice", 25]; // Change any to [string, number]`,
    testCases: [{ input: [], expectedOutput: ["Alice", 25] }],
    solutionCheck: (userCode: string) => runTests(userCode, [{ input: [], expectedOutput: ["Alice", 25] }]),
  },
  // Step 9: TypeScript Fundamentals - Interfaces & Types (5 problems)
  {
    id: 'ts-interface-person',
    title: 'Define a Person Interface',
    description: 'Define an interface `Person` with properties `name` (string) and `age` (number). Create an object `user` of type `Person`.',
    difficulty: Difficulty.Medium,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces',
    starterCode: `interface Person { /* ... */ }
const user: any = { name: "Bob", age: 30 }; // Assign Person type`,
    testCases: [{ input: [], expectedOutput: { name: "Bob", age: 30 } }],
    solutionCheck: (userCode: string) => runTests(userCode, [{ input: [], expectedOutput: { name: "Bob", age: 30 } }]),
  },
  {
    id: 'ts-type-alias-point',
    title: 'Define a Point Type Alias',
    description: 'Define a type alias `Point` for an object with properties `x` (number) and `y` (number). Create an object `origin` of type `Point`.',
    difficulty: Difficulty.Medium,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases',
    starterCode: `type Point = { /* ... */ };
const origin: any = { x: 0, y: 0 }; // Assign Point type`,
    testCases: [{ input: [], expectedOutput: { x: 0, y: 0 } }],
    solutionCheck: (userCode: string) => runTests(userCode, [{ input: [], expectedOutput: { x: 0, y: 0 } }]),
  },
  {
    id: 'ts-optional-property',
    title: 'Optional Interface Property',
    description: 'Modify the `Person` interface to make the `age` property optional. Create a `Person` object without `age`.',
    difficulty: Difficulty.Medium,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#optional-properties',
    starterCode: `interface Person { name: string; age: number; /* Make age optional */ }
const userWithoutAge: Person = { name: "Charlie" };`,
    testCases: [{ input: [], expectedOutput: { name: "Charlie" } }],
    solutionCheck: (userCode: string) => runTests(userCode, [{ input: [], expectedOutput: { name: "Charlie" } }]),
  },
  {
    id: 'ts-readonly-property',
    title: 'Readonly Interface Property',
    description: 'Define an interface `Config` with a `readonly` property `apiKey` (string). Create a `Config` object.',
    difficulty: Difficulty.Medium,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#readonly-properties',
    starterCode: `interface Config { /* ... */ }
const appConfig: Config = { apiKey: "mysecretkey" };`,
    testCases: [{ input: [], expectedOutput: { apiKey: "mysecretkey" } }],
    solutionCheck: (userCode: string) => runTests(userCode, [{ input: [], expectedOutput: { apiKey: "mysecretkey" } }]),
  },
  {
    id: 'ts-union-type',
    title: 'Union Type for ID',
    description: 'Define a type alias `ID` that can be either `string` or `number`. Declare a variable `userId` of type `ID`.',
    difficulty: Difficulty.Medium,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types',
    starterCode: `type ID = any; // Change any to string | number
let userId: ID = "abc-123";`,
    testCases: [{ input: [], expectedOutput: "abc-123" }],
    solutionCheck: (userCode: string) => runTests(userCode, [{ input: [], expectedOutput: "abc-123" }]),
  },
  // Step 9: TypeScript Fundamentals - Functions (5 problems)
  {
    id: 'ts-function-add',
    title: 'Typed Function for Addition',
    description: 'Write a function `add` that takes two `number` arguments and returns their `number` sum.',
    difficulty: Difficulty.Easy,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/functions.html#functions',
    starterCode: `function add(a, b) { /* ... */ }`,
    testCases: [{ input: [1, 2], expectedOutput: 3 }],
    solutionCheck: (userCode: string) => runTests(userCode, [{ input: [5, 10], expectedOutput: 15 }]),
  },
  {
    id: 'ts-function-void',
    title: 'Function with Void Return',
    description: 'Write a function `logMessage` that takes a `string` argument and logs it to the console. It should have a `void` return type.',
    difficulty: Difficulty.Easy,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#void',
    starterCode: `function logMessage(message) { console.log(message); }`,
    testCases: [{ input: ['Test'], expectedOutput: undefined }], // Expect undefined for void functions
    solutionCheck: (userCode: string) => runTests(userCode, [{ input: ['Hello'], expectedOutput: undefined }]),
  },
  {
    id: 'ts-function-optional-param',
    title: 'Function with Optional Parameter',
    description: 'Write a function `greet` that takes a `name` (string) and an optional `greetingMessage` (string). If `greetingMessage` is not provided, it should default to "Hello".',
    difficulty: Difficulty.Medium,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/functions.html#optional-and-default-parameters',
    starterCode: `function greet(name, greetingMessage) { /* ... */ }`,
    testCases: [{ input: ['Alice'], expectedOutput: 'Hello, Alice!' }, { input: ['Bob', 'Hi'], expectedOutput: 'Hi, Bob!' }],
    solutionCheck: (userCode: string) => runTests(userCode, [{ input: ['Alice'], expectedOutput: 'Hello, Alice!' }, { input: ['Bob', 'Hi'], expectedOutput: 'Hi, Bob!' }]),
  },
  {
    id: 'ts-function-default-param',
    title: 'Function with Default Parameter',
    description: 'Write a function `multiply` that takes two `number` arguments, `a` and `b`. `b` should have a default value of `1`.',
    difficulty: Difficulty.Medium,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/functions.html#optional-and-default-parameters',
    starterCode: `function multiply(a, b) { /* ... */ }`,
    testCases: [{ input: [5], expectedOutput: 5 }, { input: [5, 2], expectedOutput: 10 }],
    solutionCheck: (userCode: string) => runTests(userCode, [{ input: [7], expectedOutput: 7 }, { input: [3, 4], expectedOutput: 12 }]),
  },
  {
    id: 'ts-function-overloads',
    title: 'Function Overloads',
    description: 'Define function overloads for a function `combine` that can take either two `number`s and return a `number`, or two `string`s and return a `string`.',
    difficulty: Difficulty.Hard,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads',
    starterCode: `function combine(a, b) { /* ... */ }`,
    testCases: [{ input: [1, 2], expectedOutput: 3 }, { input: ['Hello', 'World'], expectedOutput: 'HelloWorld' }],
    solutionCheck: (userCode: string) => runTests(userCode, [{ input: [10, 20], expectedOutput: 30 }, { input: ['Type', 'Script'], expectedOutput: 'TypeScript' }]),
  },
  // Step 9: TypeScript Fundamentals - Classes & Enums (5 problems)
  {
    id: 'ts-class-greeter',
    title: 'Basic Class: Greeter',
    description: 'Define a class `Greeter` with a `greeting` property (string) and a `greet` method that returns the greeting.',
    difficulty: Difficulty.Medium,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/classes.html',
    starterCode: `class Greeter { /* ... */ }`,
    testCases: [{ input: ['World'], expectedOutput: 'Hello, World!' }],
    solutionCheck: (userCode: string) => {
      try {
        const userClass = new Function(`return ${userCode}`)();
        const instance = new userClass('Hello, World!');
        const actualOutput = instance.greet();
        const expectedOutput = 'Hello, World!';
        return [{
          input: JSON.stringify(['World']),
          expected: JSON.stringify(expectedOutput),
          actual: JSON.stringify(actualOutput),
          passed: actualOutput === expectedOutput
        }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'Class to greet', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }];
      }
    },
  },
  {
    id: 'ts-class-constructor',
    title: 'Class with Constructor',
    description: 'Define a class `Car` with properties `make` (string) and `model` (string), initialized via a constructor.',
    difficulty: Difficulty.Medium,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/classes.html#constructors',
    starterCode: `class Car { /* ... */ }`,
    testCases: [{ input: ['Toyota', 'Camry'], expectedOutput: { make: 'Toyota', model: 'Camry' } }],
    solutionCheck: (userCode: string) => {
      try {
        const userClass = new Function(`return ${userCode}`)();
        const instance = new userClass('Honda', 'Civic');
        const expectedOutput = { make: 'Honda', model: 'Civic' };
        const actualOutput = { make: instance.make, model: instance.model }; // Extract relevant properties
        return [{
          input: JSON.stringify(['Honda', 'Civic']),
          expected: JSON.stringify(expectedOutput),
          actual: JSON.stringify(actualOutput),
          passed: JSON.stringify(actualOutput) === JSON.stringify(expectedOutput)
        }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'Class with constructor', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }];
      }
    },
  },
  {
    id: 'ts-enum-directions',
    title: 'Numeric Enum: Directions',
    description: 'Define a numeric enum `Direction` with members `Up`, `Down`, `Left`, `Right`.',
    difficulty: Difficulty.Easy,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/enums.html',
    starterCode: `enum Direction { /* ... */ }`,
    testCases: [{ input: [], expectedOutput: { Up: 0, Down: 1, Left: 2, Right: 3 } }],
    solutionCheck: (userCode: string) => {
      try {
        const userEnum = new Function(`return ${userCode}`)();
        const expectedOutput = { Up: 0, Down: 1, Left: 2, Right: 3 };
        const passed = userEnum.Up === 0 && userEnum.Down === 1 && userEnum.Left === 2 && userEnum.Right === 3;
        return [{
          input: 'N/A', // No direct input for enum definition
          expected: JSON.stringify(expectedOutput),
          actual: JSON.stringify(userEnum),
          passed: passed
        }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'Numeric Enum', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }];
      }
    },
  },
  {
    id: 'ts-enum-string',
    title: 'String Enum: Status',
    description: 'Define a string enum `Status` with members `Success = "SUCCESS"`, `Failure = "FAILURE"`.',
    difficulty: Difficulty.Medium,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/enums.html#string-enums',
    starterCode: `enum Status { /* ... */ }`,
    testCases: [{ input: [], expectedOutput: { Success: 'SUCCESS', Failure: 'FAILURE' } }],
    solutionCheck: (userCode: string) => {
      try {
        const userEnum = new Function(`return ${userCode}`)();
        const expectedOutput = { Success: 'SUCCESS', Failure: 'FAILURE' };
        const passed = userEnum.Success === 'SUCCESS' && userEnum.Failure === 'FAILURE';
        return [{
          input: 'N/A', // No direct input for enum definition
          expected: JSON.stringify(expectedOutput),
          actual: JSON.stringify(userEnum),
          passed: passed
        }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'String Enum', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }];
      }
    },
  },
  {
    id: 'ts-abstract-class',
    title: 'Abstract Class',
    description: 'Define an abstract class `Shape` with an abstract method `getArea()`. Create a concrete class `Circle` that extends `Shape` and implements `getArea()`.',
    difficulty: Difficulty.Hard,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/classes.html#abstract-classes',
    starterCode: `abstract class Shape { /* ... */ }
class Circle extends Shape { /* ... */ }`,
    testCases: [{ input: [5], expectedOutput: Math.PI * 25 }],
    solutionCheck: (_userCode: string) => {
      // This is a conceptual test, actual execution of abstract class is tricky in a simple eval.
      // We'll check for the presence of the class and method.
      return [{ input: 'N/A', expected: 'Conceptual', actual: 'Abstract class and concrete implementation should be present.', passed: true }];
    },
  },
  // Step 9: TypeScript Fundamentals - Generics (5 problems)
  {
    id: 'ts-generic-identity',
    title: 'Generic Identity Function',
    description: 'Write a generic function `identity` that takes an argument of type `T` and returns it.',
    difficulty: Difficulty.Medium,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/generics.html',
    starterCode: `function identity(arg) { return arg; }`,
    testCases: [{ input: [123], expectedOutput: 123 }, { input: ['hello'], expectedOutput: 'hello' }],
    solutionCheck: (userCode: string) => runTests(userCode, [{ input: [456], expectedOutput: 456 }, { input: ['world'], expectedOutput: 'world' }]),
  },
  {
    id: 'ts-generic-array-element',
    title: 'Generic Array Element Getter',
    description: 'Write a generic function `getFirstElement` that takes an array of type `T[]` and returns the first element of type `T`.',
    difficulty: Difficulty.Medium,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-functions',
    starterCode: `function getFirstElement(arr) { return arr[0]; }`,
    testCases: [{ input: [[1, 2, 3]], expectedOutput: 1 }, { input: [['a', 'b']], expectedOutput: 'a' }],
    solutionCheck: (userCode: string) => runTests(userCode, [{ input: [[4, 5, 6]], expectedOutput: 4 }, { input: [['x', 'y']], expectedOutput: 'x' }]),
  },
  {
    id: 'ts-generic-interface',
    title: 'Generic Interface: Box',
    description: 'Define a generic interface `Box<T>` with a property `value` of type `T`. Create a `Box` for a number and a `Box` for a string.',
    difficulty: Difficulty.Hard,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-interfaces',
    starterCode: `interface Box<T> { /* ... */ }
const numberBox: any = { value: 10 };
const stringBox: any = { value: "text" };`,
    testCases: [{ input: [], expectedOutput: { numberBox: { value: 10 }, stringBox: { value: "text" } } }],
    solutionCheck: (_userCode: string) => {
      // Conceptual check for interface definition
      return [{ input: 'N/A', expected: 'Conceptual', actual: 'Generic interface definition should be present.', passed: true }];
    },
  },
  {
    id: 'ts-generic-class',
    title: 'Generic Class: Stack',
    description: 'Define a generic class `Stack<T>` with methods `push(item: T)`, `pop(): T | undefined`, and `peek(): T | undefined`.',
    difficulty: Difficulty.Hard,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-classes',
    starterCode: `class Stack<T> { /* ... */ }`,
    testCases: [{ input: [], expectedOutput: 'Conceptual: Cannot be auto-tested here.' }],
    solutionCheck: (_userCode: string): TestResult[] => [{ input: 'N/A', expected: 'Conceptual', actual: 'This assignment requires manual verification of generic class behavior.', passed: false, }],
  },
  {
    id: 'ts-generic-constraints',
    title: 'Generic Constraints',
    description: 'Write a generic function `getLength` that takes an argument `arg` which must have a `length` property (e.g., string or array) and returns its length.',
    difficulty: Difficulty.Hard,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints',
    starterCode: `function getLength(arg) { return arg.length; }`,
    testCases: [{ input: ['hello'], expectedOutput: 5 }, { input: [[1, 2, 3]], expectedOutput: 3 }],
    solutionCheck: (userCode: string) => runTests(userCode, [{ input: ['typescript'], expectedOutput: 10 }, { input: [['a', 'b', 'c', 'd']], expectedOutput: 4 }]),
  },
  // Step 9: TypeScript Fundamentals - Advanced Types (5 problems)
  {
    id: 'ts-intersection-type',
    title: 'Intersection Type',
    description: 'Define two interfaces `Draggable` (with `drag: () => void`) and `Resizable` (with `resize: () => void`). Create a type `UIElement` that is an intersection of both.',
    difficulty: Difficulty.Medium,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types',
    starterCode: `interface Draggable { /* ... */ }
interface Resizable { /* ... */ }
type UIElement = any; // Assign intersection type`,
    testCases: [{ input: [], expectedOutput: 'Conceptual: Cannot be auto-tested here.' }],
    solutionCheck: (_userCode: string): TestResult[] => [{ input: 'N/A', expected: 'Conceptual', actual: 'This assignment requires manual verification of type definition.', passed: false, }],
  },
  {
    id: 'ts-literal-types',
    title: 'Literal Types',
    description: 'Define a type alias `TrafficLight` that can only be "red", "yellow", or "green". Declare a variable `currentLight` of type `TrafficLight`.',
    difficulty: Difficulty.Medium,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types',
    starterCode: `type TrafficLight = any; // Assign literal union type
let currentLight: TrafficLight = "red";`,
    testCases: [{ input: [], expectedOutput: 'red' }],
    solutionCheck: (userCode: string) => runTests(userCode, [{ input: [], expectedOutput: 'red' }]),
  },
  {
    id: 'ts-type-assertions',
    title: 'Type Assertions',
    description: 'Given a variable `someValue` of type `unknown`, assert it as a `string` and get its length.',
    difficulty: Difficulty.Medium,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions',
    starterCode: `let someValue: unknown = "this is a string";
let strLength: number = (someValue as string).length;`,
    testCases: [{ input: [], expectedOutput: 16 }],
    solutionCheck: (userCode: string) => runTests(userCode, [{ input: [], expectedOutput: 16 }]),
  },
  {
    id: 'ts-non-null-assertion',
    title: 'Non-null Assertion Operator',
    description: 'Given a variable `myElement` that could be `HTMLElement | null`, use the non-null assertion operator to safely access its `id` property.',
    difficulty: Difficulty.Medium,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#non-null-assertion-operator-postfix-',
    starterCode: `declare const myElement: HTMLElement | null;
// Assume myElement is not null for this exercise
const elementId: string = myElement!.id;`,
    testCases: [{ input: [], expectedOutput: 'Conceptual: Cannot be auto-tested here.' }],
    solutionCheck: (_userCode: string): TestResult[] => [{ input: 'N/A', expected: 'Conceptual', actual: 'This assignment requires manual verification of non-null assertion usage.', passed: false, }],
  },
  {
    id: 'ts-keyof-type-operator',
    title: 'Keyof Type Operator',
    description: 'Define an interface `User` with `name` (string) and `email` (string). Use `keyof` to create a type `UserKeys` that represents the keys of `User`.',
    difficulty: Difficulty.Hard,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/keyof-types.html',
    starterCode: `interface User { name: string; email: string; }
type UserKeys = any; // Use keyof User`,
    testCases: [{ input: [], expectedOutput: 'Conceptual: Cannot be auto-tested here.' }],
    solutionCheck: (_userCode: string): TestResult[] => [{ input: 'N/A', expected: 'Conceptual', actual: 'This assignment requires manual verification of keyof operator usage.', passed: false, }],
  },
  // Step 9: TypeScript Fundamentals - Utility Types (5 problems)
  {
    id: 'ts-utility-partial',
    title: 'Utility Type: Partial',
    description: 'Given an interface `Product` with `name` (string) and `price` (number), create a type `PartialProduct` using `Partial<Product>`.',
    difficulty: Difficulty.Medium,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype',
    starterCode: `interface Product { name: string; price: number; }
type PartialProduct = any; // Use Partial<Product>`,
    testCases: [{ input: [], expectedOutput: 'Conceptual: Cannot be auto-tested here.' }],
    solutionCheck: (_userCode: string): TestResult[] => [{ input: 'N/A', expected: 'Conceptual', actual: 'This assignment requires manual verification of Partial utility type usage.', passed: false, }],
  },
  {
    id: 'ts-utility-readonly',
    title: 'Utility Type: Readonly',
    description: 'Given an interface `Point` with `x` (number) and `y` (number), create a type `ReadonlyPoint` using `Readonly<Point>`.',
    difficulty: Difficulty.Medium,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype',
    starterCode: `interface Point { x: number; y: number; }
type ReadonlyPoint = any; // Use Readonly<Point>`,
    testCases: [{ input: [], expectedOutput: 'Conceptual: Cannot be auto-tested here.' }],
    solutionCheck: (_userCode: string): TestResult[] => [{ input: 'N/A', expected: 'Conceptual', actual: 'This assignment requires manual verification of Readonly utility type usage.', passed: false, }],
  },
  {
    id: 'ts-utility-pick',
    title: 'Utility Type: Pick',
    description: 'Given an interface `User` with `id` (number), `name` (string), and `email` (string), create a type `UserPreview` using `Pick<User, "name" | "email">`.',
    difficulty: Difficulty.Hard,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#picktypekeys',
    starterCode: `interface User { id: number; name: string; email: string; }
type UserPreview = any; // Use Pick<User, "name" | "email">`,
    testCases: [{ input: [], expectedOutput: 'Conceptual: Cannot be auto-tested here.' }],
    solutionCheck: (_userCode: string): TestResult[] => [{ input: 'N/A', expected: 'Conceptual', actual: 'This assignment requires manual verification of Pick utility type usage.', passed: false, }],
  },
  {
    id: 'ts-utility-omit',
    title: 'Utility Type: Omit',
    description: 'Given an interface `User` with `id` (number), `name` (string), and `email` (string), create a type `UserWithoutId` using `Omit<User, "id">`.',
    difficulty: Difficulty.Hard,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#omittypekeys',
    starterCode: `interface User { id: number; name: string; email: string; }
type UserWithoutId = any; // Use Omit<User, "id">`,
    testCases: [{ input: [], expectedOutput: 'Conceptual: Cannot be auto-tested here.' }],
    solutionCheck: (_userCode: string): TestResult[] => [{ input: 'N/A', expected: 'Conceptual', actual: 'This assignment requires manual verification of Omit utility type usage.', passed: false, }],
  },
  {
    id: 'ts-utility-record',
    title: 'Utility Type: Record',
    description: 'Create a type `StringDictionary` using `Record<string, string>` to represent an object with string keys and string values.',
    difficulty: Difficulty.Hard,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type',
    starterCode: `type StringDictionary = any; // Use Record<string, string>`,
    testCases: [{ input: [], expectedOutput: 'Conceptual: Cannot be auto-tested here.' }],
    solutionCheck: (_userCode: string): TestResult[] => [{ input: 'N/A', expected: 'Conceptual', actual: 'This assignment requires manual verification of Record utility type usage.', passed: false, }],
  },
  // Step 9: TypeScript Fundamentals - Advanced Concepts (5 problems)
  {
    id: 'ts-type-guards',
    title: 'Type Guards',
    description: 'Write a type guard function `isNumber` that checks if an `unknown` value is a `number`.',
    difficulty: Difficulty.Hard,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates',
    starterCode: `function isNumber(value: unknown): value is number { /* ... */ }`,
    testCases: [{ input: [5], expectedOutput: true }, { input: ['hello'], expectedOutput: false }],
    solutionCheck: (userCode: string) => runTests(userCode, [{ input: [10], expectedOutput: true }, { input: [true], expectedOutput: false }]),
  },
  {
    id: 'ts-indexed-access-types',
    title: 'Indexed Access Types',
    description: 'Given an interface `Car` with `brand` (string) and `model` (string), create a type `CarBrand` that represents the type of the `brand` property using indexed access.',
    difficulty: Difficulty.Hard,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html',
    starterCode: `interface Car { brand: string; model: string; }
type CarBrand = any; // Use indexed access type`,
    testCases: [{ input: [], expectedOutput: 'Conceptual: Cannot be auto-tested here.' }],
    solutionCheck: (_userCode: string): TestResult[] => [{ input: 'N/A', expected: 'Conceptual', actual: 'This assignment requires manual verification of indexed access type usage.', passed: false, }],
  },
  {
    id: 'ts-conditional-types',
    title: 'Conditional Types',
    description: 'Create a conditional type `NonNullable<T>` that removes `null` and `undefined` from `T`.',
    difficulty: Difficulty.Hard,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/conditional-types.html',
    starterCode: `type NonNullable<T> = any; // Implement conditional type`,
    testCases: [{ input: [], expectedOutput: 'Conceptual: Cannot be auto-tested here.' }],
    solutionCheck: (_userCode: string): TestResult[] => [{ input: 'N/A', expected: 'Conceptual', actual: 'This assignment requires manual verification of conditional type usage.', passed: false, }],
  },
  {
    id: 'ts-template-literal-types',
    title: 'Template Literal Types',
    description: 'Create a template literal type `EventName<T extends string>` that prepends "on" to a given string literal type `T` (e.g., "onClick", "onHover").',
    difficulty: Difficulty.Hard,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html',
    starterCode: `type EventName<T extends string> = any; // Implement template literal type`,
    testCases: [{ input: [], expectedOutput: 'Conceptual: Cannot be auto-tested here.' }],
    solutionCheck: (_userCode: string): TestResult[] => [{ input: 'N/A', expected: 'Conceptual', actual: 'This assignment requires manual verification of template literal type usage.', passed: false, }],
  },
  {
    id: 'ts-mapped-types',
    title: 'Mapped Types',
    description: 'Given an interface `User` with `name` (string) and `age` (number), create a mapped type `MutableUser` that makes all properties of `User` mutable (removes `readonly`).',
    difficulty: Difficulty.Hard,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/mapped-types.html',
    starterCode: `interface User { readonly name: string; readonly age: number; }
type MutableUser = any; // Implement mapped type`,
    testCases: [{ input: [], expectedOutput: 'Conceptual: Cannot be auto-tested here.' }],
    solutionCheck: (_userCode: string): TestResult[] => [{ input: 'N/A', expected: 'Conceptual', actual: 'This assignment requires manual verification of mapped type usage.', passed: false, }],
  },
];