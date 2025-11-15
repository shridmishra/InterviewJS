import { Problem, Difficulty } from '../../types';
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
let age: number;
let name: string;
let isStudent: boolean;
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
        const passed = typeof age === 'number' && typeof name === 'string' && typeof isStudent === 'boolean';
        return [{
          input: 'N/A',
          expected: 'age: number, name: string, isStudent: boolean',
          actual: `age: ${typeof age}, name: ${typeof name}, isStudent: ${typeof isStudent}`,
          passed: passed
        }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'No runtime errors', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    },
    testCases: [],
  },
  {
    id: 'typescript-interfaces',
    title: 'TypeScript Interfaces',
    description: 'Define an interface `User` with properties `id` (number) and `name` (string). Then create an object `myUser` that conforms to this interface.',
    difficulty: Difficulty.Easy,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/interfaces.html',
    starterCode: `// Define interface here
interface User {
  id: number;
  name: string;
}

// Create an object conforming to the interface
const myUser: User = {
  id: 1,
  name: "John Doe"
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
        const passed = typeof user.id === 'number' && typeof user.name === 'string';
        return [{
          input: 'N/A',
          expected: 'Object with id (number) and name (string)',
          actual: `id: ${typeof user.id}, name: ${typeof user.name}`,
          passed: passed
        }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'No runtime errors', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
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
  return a + b;
}`,
    testCases: [ { input: [1, 2], expectedOutput: 3 }, { input: [10, -5], expectedOutput: 5 }, ],
    solutionCheck: (userCode: string) => runTests(userCode, [ { input: [1, 2], expectedOutput: 3 }, { input: [10, -5], expectedOutput: 5 }, { input: [0, 0], expectedOutput: 0 }, { input: [-1, -1], expectedOutput: -2 }, ]),
  },
  {
    id: 'typescript-generics',
    title: 'TypeScript Generics',
    description: 'Write a generic function `identity` that takes an argument of type `T` and returns it.',
    difficulty: Difficulty.Medium,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/generics.html',
    starterCode: `function identity<T>(arg: T): T {
  return arg;
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
    starterCode: `let greeting: string = "Hello, TypeScript!";`,
    testCases: [{ input: [], expectedOutput: 'Hello, TypeScript!' }],
    solutionCheck: (userCode: string) => {
      try {
        const proxy = new Function(
          `
          ${userCode}
          return greeting;
        `
        );
        const result = proxy();
        return [{ input: 'N/A', expected: 'Hello, TypeScript!', actual: result, passed: result === 'Hello, TypeScript!' }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'No runtime errors', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    },
  },
  {
    id: 'ts-declare-number',
    title: 'Declare a Number Type',
    description: 'Declare a variable `age` and explicitly assign it the type `number`. Initialize it with `30`.',
    difficulty: Difficulty.Easy,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#the-primitives-string-number-and-boolean',
    starterCode: `let age: number = 30;`,
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
        return [{ input: 'N/A', expected: '30', actual: result, passed: result === 30 }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'No runtime errors', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    },
  },
  {
    id: 'ts-declare-boolean',
    title: 'Declare a Boolean Type',
    description: 'Declare a variable `isActive` and explicitly assign it the type `boolean`. Initialize it with `true`.',
    difficulty: Difficulty.Easy,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#the-primitives-string-number-and-boolean',
    starterCode: `let isActive: boolean = true;`,
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
        return [{ input: 'N/A', expected: String(true), actual: result, passed: result === true }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'No runtime errors', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    },
  },
  {
    id: 'ts-declare-array',
    title: 'Declare an Array Type',
    description: 'Declare a variable `numbers` and explicitly assign it the type `number[]`. Initialize it with `[1, 2, 3]`.',
    difficulty: Difficulty.Easy,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays',
    starterCode: `let numbers: number[] = [1, 2, 3];`,
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
        return [{ input: 'N/A', expected: JSON.stringify([1, 2, 3]), actual: result, passed: JSON.stringify(result) === JSON.stringify([1, 2, 3]) }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'No runtime errors', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    },
  },
  {
    id: 'ts-declare-tuple',
    title: 'Declare a Tuple Type',
    description: 'Declare a variable `userInfo` and explicitly assign it the type `[string, number]`. Initialize it with `["Alice", 25]`.',
    difficulty: Difficulty.Medium,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#tuple-types',
    starterCode: `let userInfo: [string, number] = ["Alice", 25];`,
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
        return [{ input: 'N/A', expected: JSON.stringify(["Alice", 25]), actual: result, passed: JSON.stringify(result) === JSON.stringify(["Alice", 25]) }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'No runtime errors', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    },
  },
  {
    id: 'ts-interface-person',
    title: 'Define a Person Interface and Object',
    description: 'Define an interface `Person` with properties `name` (string) and `age` (number). Create an object `user` of type `Person`.',
    difficulty: Difficulty.Medium,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces',
    starterCode: `interface Person {
  name: string;
  age: number;
}
const user: Person = { name: "Bob", age: 30 };`,
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
        const passed = typeof result.name === 'string' && typeof result.age === 'number';
        return [{ input: 'N/A', expected: '{ name: string, age: number }', actual: JSON.stringify(result), passed: passed }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'No runtime errors', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    },
  },
  {
    id: 'ts-type-alias-point',
    title: 'Define a Point Type Alias and Object',
    description: 'Define a type alias `Point` for an object with properties `x` (number) and `y` (number). Create an object `origin` of type `Point`.',
    difficulty: Difficulty.Medium,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases',
    starterCode: `type Point = { x: number; y: number; };
const origin: Point = { x: 0, y: 0 };`,
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
        const passed = typeof result.x === 'number' && typeof result.y === 'number';
        return [{ input: 'N/A', expected: '{ x: number, y: number }', actual: JSON.stringify(result), passed: passed }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'No runtime errors', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    },
  },
  {
    id: 'ts-optional-property',
    title: 'Optional Interface Property',
    description: 'Modify the `Person` interface to make the `age` property optional. Create a `Person` object without `age`.',
    difficulty: Difficulty.Medium,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#optional-properties',
    starterCode: `interface Person { name: string; age?: number; }
const userWithoutAge: Person = { name: "Charlie" };`,
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
        const passed = typeof result.name === 'string' && result.age === undefined;
        return [{ input: 'N/A', expected: '{ name: string, age?: number }', actual: JSON.stringify(result), passed: passed }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'No runtime errors', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    },
  },
  {
    id: 'ts-readonly-property',
    title: 'Readonly Interface Property',
    description: 'Define an interface `Config` with a `readonly` property `apiKey` (string). Create a `Config` object.',
    difficulty: Difficulty.Medium,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#readonly-properties',
    starterCode: `interface Config { readonly apiKey: string; }
const appConfig: Config = { apiKey: "mysecretkey" };`,
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
        const passed = typeof result.apiKey === 'string';
        // Cannot test readonly at runtime with eval, but can check property existence and type
        return [{ input: 'N/A', expected: '{ readonly apiKey: string }', actual: JSON.stringify(result), passed: passed }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'No runtime errors', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    },
  },
  {
    id: 'ts-union-type',
    title: 'Union Type for ID',
    description: 'Define a type alias `ID` that can be either `string` or `number`. Declare a variable `userId` of type `ID`.',
    difficulty: Difficulty.Medium,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types',
    starterCode: `type ID = string | number;
let userId: ID = "abc-123";`,
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
        const passed = (typeof userId === 'string' || typeof userId === 'number') &&
                       (typeof testNum === 'string' || typeof testNum === 'number') &&
                       (typeof testStr === 'string' || typeof testStr === 'number');
        return [{ input: 'N/A', expected: 'ID can be string or number', actual: `userId: ${typeof userId}, testNum: ${typeof testNum}, testStr: ${typeof testStr}`, passed: passed }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'No runtime errors', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    },
  },
  {
    id: 'ts-function-add',
    title: 'Typed Function for Addition',
    description: 'Write a function `add` that takes two `number` arguments and returns their `number` sum.',
    difficulty: Difficulty.Easy,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/functions.html#functions',
    starterCode: `function add(a: number, b: number): number { return a + b; }`,
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
    starterCode: `function logMessage(message: string): void { console.log(message); }`,
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
    starterCode: `function greet(name: string, greetingMessage?: string): string {
  const finalGreeting = greetingMessage || "Hello";
  return finalGreeting + ", " + name + "!";
}`,
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
    starterCode: `function multiply(a: number, b: number = 1): number { return a * b; }`,
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
    starterCode: `function combine(a: number, b: number): number;
function combine(a: string, b: string): string;
function combine(a: any, b: any): any {
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b;
  }
  if (typeof a === 'string' && typeof b === 'string') {
    return a + b;
  }
  throw new Error("Invalid arguments");
}`,
    testCases: [{ input: [1, 2], expectedOutput: 3 }, { input: ['Hello', 'World'], expectedOutput: 'HelloWorld' }],
    solutionCheck: (userCode: string) => runTests(userCode, [{ input: [10, 20], expectedOutput: 30 }, { input: ['Type', 'Script'], expectedOutput: 'TypeScript' }]),
  },
  {
    id: 'ts-class-greeter',
    title: 'Basic Class: Greeter',
    description: 'Define a class `Greeter` with a `greeting` property (string) and a `greet` method that returns the greeting.',
    difficulty: Difficulty.Medium,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/classes.html',
    starterCode: `class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet(): string {
    return this.greeting;
  }
}`,
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
        return [{ input: 'N/A', expected: 'Class to greet', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
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
    starterCode: `class Car {
  make: string;
  model: string;
  constructor(make: string, model: string) {
    this.make = make;
    this.model = model;
  }
}`,
    testCases: [{ input: ['Toyota', 'Camry'], expectedOutput: { make: 'Toyota', model: 'Camry' } }],
    solutionCheck: (userCode: string) => {
      try {
        const userClass = new Function(`return ${userCode}`)();
        const instance = new userClass('Honda', 'Civic');
        const expectedOutput = { make: 'Honda', model: 'Civic' };
        const actualOutput = { make: instance.make, model: instance.model };
        return [{
          input: JSON.stringify(['Honda', 'Civic']),
          expected: JSON.stringify(expectedOutput),
          actual: JSON.stringify(actualOutput),
          passed: JSON.stringify(actualOutput) === JSON.stringify(expectedOutput)
        }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'Class with constructor', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
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
    starterCode: `enum Direction { Up, Down, Left, Right }`,
    testCases: [{ input: [], expectedOutput: { Up: 0, Down: 1, Left: 2, Right: 3 } }],
    solutionCheck: (userCode: string) => {
      try {
        const userEnum = new Function(`return ${userCode}`)();
        const expectedOutput = { Up: 0, Down: 1, Left: 2, Right: 3 };
        const passed = userEnum.Up === 0 && userEnum.Down === 1 && userEnum.Left === 2 && userEnum.Right === 3;
        return [{
          input: 'N/A',
          expected: JSON.stringify(expectedOutput),
          actual: JSON.stringify(userEnum),
          passed: passed
        }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'Numeric Enum', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
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
    starterCode: `enum Status { Success = "SUCCESS", Failure = "FAILURE" }`,
    testCases: [{ input: [], expectedOutput: { Success: 'SUCCESS', Failure: 'FAILURE' } }],
    solutionCheck: (userCode: string) => {
      try {
        const userEnum = new Function(`return ${userCode}`)();
        const expectedOutput = { Success: 'SUCCESS', Failure: 'FAILURE' };
        const passed = userEnum.Success === 'SUCCESS' && userEnum.Failure === 'FAILURE';
        return [{
          input: 'N/A',
          expected: JSON.stringify(expectedOutput),
          actual: JSON.stringify(userEnum),
          passed: passed
        }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'String Enum', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    },
  },
  {
    id: 'ts-abstract-class',
    title: 'Abstract Class and Implementation',
    description: 'Define an abstract class `Shape` with an abstract method `getArea(): number`. Create a concrete class `Circle` that extends `Shape` and implements `getArea()` to calculate the area of a circle given a `radius`.',
    difficulty: Difficulty.Hard,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/classes.html#abstract-classes',
    starterCode: `abstract class Shape {
  abstract getArea(): number;
}
class Circle extends Shape {
  radius: number;
  constructor(radius: number) {
    super();
    this.radius = radius;
  }
  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}`,
    testCases: [{ input: [5], expectedOutput: Math.PI * 25 }],
    solutionCheck: (userCode: string) => {
      try {
        const proxy = new Function(
          `
          ${userCode}
          const circle = new Circle(5);
          return circle.getArea();
        `
        );
        const result = proxy();
        const expected = Math.PI * 25;
        const passed = Math.abs(result - expected) < 0.001; // Account for floating point precision
        return [{ input: 'radius: 5', expected: String(expected), actual: result, passed: passed }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'No runtime errors and correct area', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    },
  },
  {
    id: 'ts-generic-identity',
    title: 'Generic Identity Function',
    description: 'Write a generic function `identity` that takes an argument of type `T` and returns it.',
    difficulty: Difficulty.Medium,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/generics.html',
    starterCode: `function identity<T>(arg: T): T { return arg; }`,
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
    starterCode: `function getFirstElement<T>(arr: T[]): T | undefined { return arr[0]; }`,
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
    starterCode: `interface Box<T> { value: T; }
const numberBox: Box<number> = { value: 10 };
const stringBox: Box<string> = { value: "text" };`,
    testCases: [{ input: [], expectedOutput: { numberBox: { value: 10 }, stringBox: { value: "text" } } }],
    solutionCheck: (userCode: string) => {
      try {
        const proxy = new Function(
          `
          ${userCode}
          return { numberBox, stringBox };
        `
        );
        const { numberBox, stringBox } = proxy();
        const passed = typeof numberBox.value === 'number' && typeof stringBox.value === 'string';
        return [{ input: 'N/A', expected: 'numberBox.value: number, stringBox.value: string', actual: `numberBox.value: ${typeof numberBox.value}, stringBox.value: ${typeof stringBox.value}`, passed: passed }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'No runtime errors', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
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
    starterCode: `class Stack<T> {
  private elements: T[] = [];
  push(item: T): void {
    this.elements.push(item);
  }
  pop(): T | undefined {
    return this.elements.pop();
  }
  peek(): T | undefined {
    return this.elements[this.elements.length - 1];
  }
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      try {
        const userClass = new Function(`return ${userCode}`)();
        const stack = new userClass();
        stack.push(1);
        stack.push(2);
        const peeked = stack.peek();
        const popped = stack.pop();
        const passed = peeked === 2 && popped === 2 && stack.peek() === 1;
        return [{
          input: 'Stack operations',
          expected: 'peek: 2, pop: 2, peek: 1',
          actual: `peek: ${peeked}, pop: ${popped}, peek: ${stack.peek()}`,
          passed: passed
        }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'No runtime errors and correct stack behavior', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    },
  },
  {
    id: 'ts-generic-constraints',
    title: 'Generic Constraints',
    description: 'Write a generic function `getLength` that takes an argument `arg` which must have a `length` property (e.g., string or array) and returns its length.',
    difficulty: Difficulty.Hard,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints',
    starterCode: `function getLength<T extends { length: number }>(arg: T): number { return arg.length; }`,
    testCases: [{ input: ['hello'], expectedOutput: 5 }, { input: [[1, 2, 3]], expectedOutput: 3 }],
    solutionCheck: (userCode: string) => runTests(userCode, [{ input: ['typescript'], expectedOutput: 10 }, { input: [['a', 'b', 'c', 'd']], expectedOutput: 4 }]),
  },
  {
    id: 'ts-intersection-type',
    title: 'Intersection Type',
    description: 'Define two interfaces `Draggable` (with `drag: () => void`) and `Resizable` (with `resize: () => void`). Create a type `UIElement` that is an intersection of both. Then create an object `myUIElement` of type `UIElement`.',
    difficulty: Difficulty.Medium,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types',
    starterCode: `interface Draggable { drag(): void; }
interface Resizable { resize(): void; }
type UIElement = Draggable & Resizable;
const myUIElement: UIElement = {
  drag: () => console.log("Dragging"),
  resize: () => console.log("Resizing")
};`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      try {
        const proxy = new Function(
          `
          ${userCode}
          return myUIElement;
        `
        );
        const element = proxy();
        const passed = typeof element.drag === 'function' && typeof element.resize === 'function';
        return [{ input: 'N/A', expected: 'Object with drag() and resize() methods', actual: `drag: ${typeof element.drag}, resize: ${typeof element.resize}`, passed: passed }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'No runtime errors', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    },
  },
  {
    id: 'ts-literal-types',
    title: 'Literal Types',
    description: 'Define a type alias `TrafficLight` that can only be "red", "yellow", or "green". Declare a variable `currentLight` of type `TrafficLight`.',
    difficulty: Difficulty.Medium,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types',
    starterCode: `type TrafficLight = "red" | "yellow" | "green";
let currentLight: TrafficLight = "red";`,
    testCases: [{ input: [], expectedOutput: 'red' }],
    solutionCheck: (userCode: string) => {
      try {
        const proxy = new Function(
          `
          ${userCode}
          return currentLight;
        `
        );
        const result = proxy();
        const passed = result === 'red' || result === 'yellow' || result === 'green';
        return [{ input: 'N/A', expected: '"red", "yellow", or "green"', actual: result, passed: passed }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'No runtime errors', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    },
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
    solutionCheck: (userCode: string) => {
      try {
        const proxy = new Function(
          `
          ${userCode}
          return strLength;
        `
        );
        const result = proxy();
        return [{ input: 'N/A', expected: String(16), actual: result, passed: result === 16 }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'No runtime errors', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    },
  },
  {
    id: 'ts-non-null-assertion',
    title: 'Non-null Assertion Operator',
    description: 'Given a variable `myElement` that could be `HTMLElement | null`, use the non-null assertion operator to safely access its `id` property. Assume `myElement` is not null for this exercise.',
    difficulty: Difficulty.Medium,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#non-null-assertion-operator-postfix-',
    starterCode: `const myElement: { id: string } | null = { id: "my-div" };
const elementId: string = myElement!.id;`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      try {
        const proxy = new Function(
          `
          ${userCode}
          return elementId;
        `
        );
        const result = proxy();
        return [{ input: 'N/A', expected: 'my-div', actual: result, passed: result === 'my-div' }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'No runtime errors', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    },
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
type UserKeys = keyof User;`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      try {
        // Cannot directly check type equality at runtime with eval.
        // This checks if the code would compile by attempting to assign valid/invalid keys.
        const proxy = new Function(
          `
          ${userCode}
          let key1: UserKeys = "name";
          let key2: UserKeys = "email";
          // let key3: UserKeys = "address"; // This should cause a compile-time error
          return { key1, key2 };
        `
        );
        const { key1, key2 } = proxy();
        const passed = key1 === 'name' && key2 === 'email';
        return [{ input: 'N/A', expected: 'UserKeys to be "name" | "email"', actual: `key1: "${key1}", key2: "${key2}"`, passed: passed }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'No runtime errors (implies correct type definition)', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    },
  },
  {
    id: 'ts-utility-partial',
    title: 'Utility Type: Partial',
    description: 'Given an interface `Product` with `name` (string) and `price` (number), create a type `PartialProduct` using `Partial<Product>`. Then create an object `partialProduct` of type `PartialProduct`.',
    difficulty: Difficulty.Medium,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype',
    starterCode: `interface Product { name: string; price: number; }
type PartialProduct = Partial<Product>;
const partialProduct: PartialProduct = { name: "Laptop" };`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      try {
        const proxy = new Function(
          `
          ${userCode}
          return partialProduct;
        `
        );
        const result = proxy();
        const passed = typeof result.name === 'string' && result.price === undefined;
        return [{ input: 'N/A', expected: '{ name?: string; price?: number; }', actual: JSON.stringify(result), passed: passed }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'No runtime errors', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    },
  },
  {
    id: 'ts-utility-readonly',
    title: 'Utility Type: Readonly',
    description: 'Given an interface `Point` with `x` (number) and `y` (number), create a type `ReadonlyPoint` using `Readonly<Point>`. Then create an object `readonlyPoint` of type `ReadonlyPoint`.',
    difficulty: Difficulty.Medium,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype',
    starterCode: `interface Point { x: number; y: number; }
type ReadonlyPoint = Readonly<Point>;
const readonlyPoint: ReadonlyPoint = { x: 10, y: 20 };`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      try {
        const proxy = new Function(
          `
          ${userCode}
          return readonlyPoint;
        `
        );
        const result = proxy();
        const passed = typeof result.x === 'number' && typeof result.y === 'number';
        // Cannot test readonly at runtime with eval
        return [{ input: 'N/A', expected: '{ readonly x: number; readonly y: number; }', actual: JSON.stringify(result), passed: passed }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'No runtime errors', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    },
  },
  {
    id: 'ts-utility-pick',
    title: 'Utility Type: Pick',
    description: 'Given an interface `User` with `id` (number), `name` (string), and `email` (string), create a type `UserPreview` using `Pick<User, "name" | "email">`. Then create an object `userPreview` of type `UserPreview`.',
    difficulty: Difficulty.Hard,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#picktypekeys',
    starterCode: `interface User { id: number; name: string; email: string; }
type UserPreview = Pick<User, "name" | "email">
const userPreview: UserPreview = { name: "Alice", email: "alice@example.com" };`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      try {
        const proxy = new Function(
          `
          ${userCode}
          return userPreview;
        `
        );
        const result = proxy();
        const passed = typeof result.name === 'string' && typeof result.email === 'string' && result.id === undefined;
        return [{ input: 'N/A', expected: '{ name: string; email: string; }', actual: JSON.stringify(result), passed: passed }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'No runtime errors', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    },
  },
  {
    id: 'ts-utility-omit',
    title: 'Utility Type: Omit',
    description: 'Given an interface `User` with `id` (number), `name` (string), and `email` (string), create a type `UserWithoutId` using `Omit<User, "id">`. Then create an object `userWithoutId` of type `UserWithoutId`.',
    difficulty: Difficulty.Hard,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#omittypekeys',
    starterCode: `interface User { id: number; name: string; email: string; }
type UserWithoutId = Omit<User, "id">
const userWithoutId: UserWithoutId = { name: "Bob", email: "bob@example.com" };`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      try {
        const proxy = new Function(
          `
          ${userCode}
          return userWithoutId;
        `
        );
        const result = proxy();
        const passed = typeof result.name === 'string' && typeof result.email === 'string' && result.id === undefined;
        return [{ input: 'N/A', expected: '{ name: string; email: string; }', actual: JSON.stringify(result), passed: passed }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'No runtime errors', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    }
  },
  {
    id: 'ts-utility-record',
    title: 'Utility Type: Record',
    description: 'Create a type `StringDictionary` using `Record<string, string>` to represent an object with string keys and string values. Then create an object `myDictionary` of type `StringDictionary`.',
    difficulty: Difficulty.Hard,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type',
    starterCode: `type StringDictionary = Record<string, string>;
const myDictionary: StringDictionary = {
  hello: "world",
  foo: "bar"
};`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      try {
        const proxy = new Function(
          `
          ${userCode}
          return myDictionary;
        `
        );
        const result = proxy();
        const passed = typeof result.hello === 'string' && typeof result.foo === 'string';
        return [{ input: 'N/A', expected: '{ [key: string]: string }', actual: JSON.stringify(result), passed: passed }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'No runtime errors', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    }
  },
  {
    id: 'ts-type-guards',
    title: 'Type Guards',
    description: 'Write a type guard function `isNumber` that checks if an `unknown` value is a `number`.',
    difficulty: Difficulty.Hard,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates',
    starterCode: `function isNumber(value: unknown): value is number { return typeof value === 'number'; }`,
    testCases: [{ input: [5], expectedOutput: true }, { input: ['hello'], expectedOutput: false }],
    solutionCheck: (userCode: string) => runTests(userCode, [{ input: [10], expectedOutput: true }, { input: [true], expectedOutput: false }]),
  },
  {
    id: 'ts-indexed-access-types',
    title: 'Indexed Access Types',
    description: 'Given an interface `Car` with `brand` (string) and `model` (string), create a type `CarBrand` that represents the type of the `brand` property using indexed access. Then declare a variable `myCarBrand` of type `CarBrand`.',
    difficulty: Difficulty.Hard,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html',
    starterCode: `interface Car { brand: string; model: string; }
type CarBrand = Car["brand"];
const myCarBrand: CarBrand = "Toyota";`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      try {
        const proxy = new Function(
          `
          ${userCode}
          return myCarBrand;
        `
        );
        const result = proxy();
        const passed = typeof result === 'string';
        return [{ input: 'N/A', expected: 'string', actual: typeof result, passed: passed }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'No runtime errors', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    },
  },
  {
    id: 'ts-conditional-types',
    title: 'Conditional Types',
    description: 'Create a conditional type `NonNullable<T>` that removes `null` and `undefined` from `T`. Then test it with a union type.',
    difficulty: Difficulty.Hard,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/conditional-types.html',
    starterCode: `type NonNullable<T> = T extends null | undefined ? never : T;
type TestType = NonNullable<string | null | undefined | number>;
const testVar: TestType = 5; // Should only allow string or number`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      try {
        const proxy = new Function(
          `
          ${userCode}
          return testVar;
        `
        );
        const result = proxy();
        const passed = typeof result === 'string' || typeof result === 'number';
        return [{ input: 'N/A', expected: 'string | number', actual: typeof result, passed: passed }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'No runtime errors', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    },
  },
  {
    id: 'ts-template-literal-types',
    title: 'Template Literal Types',
    description: 'Create a template literal type `EventName<T extends string>` that prepends "on" to a given string literal type `T` (e.g., "onClick", "onHover"). Then declare a variable `clickEvent` of type `EventName<"Click">`.',
    difficulty: Difficulty.Hard,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html',
    starterCode: `type EventName<T extends string> = \`on\${T}\`;
type ClickEvent = EventName<"Click">
const clickEvent: ClickEvent = "onClick";`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      try {
        const proxy = new Function(
          `
          ${userCode}
          return clickEvent;
        `
        );
        const result = proxy();
        const passed = result === 'onClick';
        return [{ input: 'N/A', expected: '"onClick"', actual: result, passed: passed }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'No runtime errors', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    },
  },
  {
    id: 'ts-mapped-types',
    title: 'Mapped Types',
    description: 'Given an interface `User` with `name` (string) and `age` (number), create a mapped type `MutableUser` that makes all properties of `User` mutable (removes `readonly`). Then create an object `mutableUser` of type `MutableUser`.',
    difficulty: Difficulty.Hard,
    category: 'TypeScript',
    group: 'Step 7: TypeScript Fundamentals',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/mapped-types.html',
    starterCode: `interface User { readonly name: string; readonly age: number; }
type MutableUser = { -readonly [P in keyof User]: User[P] };
const mutableUser: MutableUser = { name: "John", age: 30 };`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      try {
        const proxy = new Function(
          `
          ${userCode}
          return mutableUser;
        `
        );
        const result = proxy();
        const passed = typeof result.name === 'string' && typeof result.age === 'number';
        // Cannot directly test mutability at runtime with eval, but can check property existence and type
        return [{ input: 'N/A', expected: '{ name: string; age: number; }', actual: JSON.stringify(result), passed: passed }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'No runtime errors', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    },
  },
];