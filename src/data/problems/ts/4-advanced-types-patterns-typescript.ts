import { Problem, Difficulty } from '../../../types';
import { runTests } from './utils';

export const typescriptAdvancedTypesPatterns: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'ts-function-overloads',
    title: 'Function Overloads',
    description: 'Define function overloads for a function `combine` that can take either two `number`s and return a `number`, or two `string`s and return a `string`.',
    difficulty: Difficulty.Hard,
    category: 'Overloads',
    group: 'Step 4: TypeScript Advanced Types & Patterns',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads',
    starterCode: `function combine(a: number, b: number): number;
function combine(a: string, b: string): string;
function combine(a: any, b: any): any {
  // Your code here
}`,
    testCases: [{ input: [1, 2], expectedOutput: 3 }, { input: ['Hello', 'World'], expectedOutput: 'HelloWorld' }],
    solutionCheck: (userCode: string) => runTests(userCode, [{ input: [10, 20], expectedOutput: 30 }, { input: ['Type', 'Script'], expectedOutput: 'TypeScript' }]),
  },
  {
    id: 'ts-abstract-class',
    title: 'Abstract Class and Implementation',
    description: 'Define an abstract class `Shape` with an abstract method `getArea(): number`. Create a concrete class `Circle` that extends `Shape` and implements `getArea()` to calculate the area of a circle given a `radius`.',
    difficulty: Difficulty.Hard,
    category: 'Classes',
    group: 'Step 4: TypeScript Advanced Types & Patterns',
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
    // Your code here
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
        const passed = Math.abs(result - expected) < 0.001;
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
    category: 'Generics',
    group: 'Step 4: TypeScript Advanced Types & Patterns',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/generics.html',
    starterCode: `function identity<T>(arg: T): T {
  // Your code here
}`,
    testCases: [{ input: [123], expectedOutput: 123 }, { input: ['hello'], expectedOutput: 'hello' }],
    solutionCheck: (userCode: string) => runTests(userCode, [{ input: [456], expectedOutput: 456 }, { input: ['world'], expectedOutput: 'world' }]),
  },
  {
    id: 'ts-generic-array-element',
    title: 'Generic Array Element Getter',
    description: 'Write a generic function `getFirstElement` that takes an array of type `T[]` and returns the first element of type `T`.',
    difficulty: Difficulty.Medium,
    category: 'Generics',
    group: 'Step 4: TypeScript Advanced Types & Patterns',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-functions',
    starterCode: `function getFirstElement<T>(arr: T[]): T | undefined {
  // Your code here
}`,
    testCases: [{ input: [[1, 2, 3]], expectedOutput: 1 }, { input: [['a', 'b']], expectedOutput: 'a' }],
    solutionCheck: (userCode: string) => runTests(userCode, [{ input: [[4, 5, 6]], expectedOutput: 4 }, { input: [['x', 'y']], expectedOutput: 'x' }]),
  },
  {
    id: 'ts-generic-interface',
    title: 'Generic Interface: Box',
    description: 'Define a generic interface `Box<T>` with a property `value` of type `T`. Create a `Box` for a number and a `Box` for a string.',
    difficulty: Difficulty.Hard,
    category: 'Generics',
    group: 'Step 4: TypeScript Advanced Types & Patterns',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-interfaces',
    starterCode: `interface Box<T> {
  // Define property
}
const numberBox: Box<number> = {
  // Initialize object
};
const stringBox: Box<string> = {
  // Initialize object
};`,
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
    category: 'Generics',
    group: 'Step 4: TypeScript Advanced Types & Patterns',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-classes',
    starterCode: `class Stack<T> {
  private elements: T[] = [];
  push(item: T): void {
    // Your code here
  }
  pop(): T | undefined {
    // Your code here
  }
  peek(): T | undefined {
    // Your code here
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
    category: 'Generics',
    group: 'Step 4: TypeScript Advanced Types & Patterns',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints',
    starterCode: `function getLength<T extends { length: number }>(arg: T): number {
  // Your code here
}`,
    testCases: [{ input: ['hello'], expectedOutput: 5 }, { input: [[1, 2, 3]], expectedOutput: 3 }],
    solutionCheck: (userCode: string) => runTests(userCode, [{ input: ['typescript'], expectedOutput: 10 }, { input: [['a', 'b', 'c', 'd']], expectedOutput: 4 }]),
  },
  {
    id: 'ts-intersection-type',
    title: 'Intersection Type',
    description: 'Define two interfaces `Draggable` (with `drag: () => void`) and `Resizable` (with `resize: () => void`). Create a type `UIElement` that is an intersection of both. Then create an object `myUIElement` of type `UIElement`.',
    difficulty: Difficulty.Medium,
    category: 'Intersections',
    group: 'Step 4: TypeScript Advanced Types & Patterns',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types',
    starterCode: `interface Draggable { drag(): void; }
interface Resizable { resize(): void; }
type UIElement = // Define intersection type
const myUIElement: UIElement = {
  // Initialize object
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
    id: 'ts-keyof-type-operator',
    title: 'Keyof Type Operator',
    description: 'Define an interface `User` with `name` (string) and `email` (string). Use `keyof` to create a type `UserKeys` that represents the keys of `User`.',
    difficulty: Difficulty.Hard,
    category: 'Operators',
    group: 'Step 4: TypeScript Advanced Types & Patterns',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/keyof-types.html',
    starterCode: `interface User { name: string; email: string; }
type UserKeys = // Use keyof operator here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      try {
        const proxy = new Function(
          `
          ${userCode}
          let key1: UserKeys = "name";
          let key2: UserKeys = "email";
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
    category: 'Utilities',
    group: 'Step 4: TypeScript Advanced Types & Patterns',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype',
    starterCode: `interface Product { name: string; price: number; }
type PartialProduct = // Use Partial utility type here
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
    category: 'Utilities',
    group: 'Step 4: TypeScript Advanced Types & Patterns',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype',
    starterCode: `interface Point { x: number; y: number; }
type ReadonlyPoint = // Use Readonly utility type here
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
    category: 'Utilities',
    group: 'Step 4: TypeScript Advanced Types & Patterns',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#picktypekeys',
    starterCode: `interface User { id: number; name: string; email: string; }
type UserPreview = // Use Pick utility type here
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
    category: 'Utilities',
    group: 'Step 4: TypeScript Advanced Types & Patterns',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#omittypekeys',
    starterCode: `interface User { id: number; name: string; email: string; }
type UserWithoutId = // Use Omit utility type here
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
    category: 'Utilities',
    group: 'Step 4: TypeScript Advanced Types & Patterns',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type',
    starterCode: `type StringDictionary = // Use Record utility type here
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
    id: 'ts-type-guards-number',
    title: 'Type Guards (Number)',
    description: 'Write a type guard function `isNumber` that checks if an `unknown` value is a `number`.',
    difficulty: Difficulty.Hard,
    category: 'Guards',
    group: 'Step 4: TypeScript Advanced Types & Patterns',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates',
    starterCode: `function isNumber(value: unknown): value is number {
  // Your code here
}`,
    testCases: [{ input: [5], expectedOutput: true }, { input: ['hello'], expectedOutput: false }],
    solutionCheck: (userCode: string) => runTests(userCode, [{ input: [10], expectedOutput: true }, { input: [true], expectedOutput: false }]),
  },
  {
    id: 'ts-indexed-access-types',
    title: 'Indexed Access Types',
    description: 'Given an interface `Car` with `brand` (string) and `model` (string), create a type `CarBrand` that represents the type of the `brand` property using indexed access. Then declare a variable `myCarBrand` of type `CarBrand`.',
    difficulty: Difficulty.Hard,
    category: 'Indexed',
    group: 'Step 4: TypeScript Advanced Types & Patterns',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html',
    starterCode: `interface Car { brand: string; model: string; }
type CarBrand = // Use indexed access type here
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
    category: 'Conditional',
    group: 'Step 4: TypeScript Advanced Types & Patterns',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/conditional-types.html',
    starterCode: `type NonNullable<T> = // Define conditional type here
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
    category: 'Templates',
    group: 'Step 4: TypeScript Advanced Types & Patterns',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html',
    starterCode: `type EventName<T extends string> = // Define template literal type here
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
    category: 'Mapped',
    group: 'Step 4: TypeScript Advanced Types & Patterns',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/mapped-types.html',
    starterCode: `interface User { readonly name: string; readonly age: number; }
type MutableUser = {
  // Define mapped type here
};
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
        return [{ input: 'N/A', expected: '{ name: string; age: number; }', actual: JSON.stringify(result), passed: passed }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'No runtime errors', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    },
  },
  {
    id: "ts-type-guards-string",
    title: "Type Guards (String)",
    description:
      "Create a type guard function to check if a value is a string.",
    difficulty: Difficulty.Medium,
    category: "Type Guards",
    group: "Step 4: TypeScript Advanced Types & Patterns",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates",
    starterCode: `function isString(value: unknown): value is string {
  // Your code here
}`,
    testCases: [
      { input: ["hello"], expectedOutput: true },
      { input: [123], expectedOutput: false },
    ],
    solutionCheck: (userCode: string) =>
      runTests(userCode, [
        { input: ["hello"], expectedOutput: true },
        { input: [123], expectedOutput: false },
        { input: [true], expectedOutput: false },
      ]),
  },
  {
    id: "ts-discriminated-unions",
    title: "Discriminated Unions",
    description:
      "Create a discriminated union type for different shapes and a function to calculate area.",
    difficulty: Difficulty.Hard,
    category: "Union Types",
    group: "Step 4: TypeScript Advanced Types & Patterns",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions",
    starterCode: `type Circle = { kind: "circle"; radius: number };
type Rectangle = { kind: "rectangle"; width: number; height: number };
type Shape = Circle | Rectangle;

function getArea(shape: Shape): number {
  // Your code here
}`,
    testCases: [
      { input: [{ kind: "rectangle", width: 10, height: 5 }], expectedOutput: 50 },
    ],
    solutionCheck: (userCode: string) =>
      runTests(userCode, [
        { input: [{ kind: "rectangle", width: 10, height: 5 }], expectedOutput: 50 },
        { input: [{ kind: "rectangle", width: 4, height: 4 }], expectedOutput: 16 },
      ]),
  },
  {
    id: "ts-mapped-types-readonly",
    title: "Mapped Types (Readonly)",
    description:
      "Create a mapped type that makes all properties of a type readonly.",
    difficulty: Difficulty.Hard,
    category: "Mapped Types",
    group: "Step 4: TypeScript Advanced Types & Patterns",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/2/mapped-types.html",
    starterCode: `type MyReadonly<T> = {
  // Define mapped type here
};

interface User {
  name: string;
  age: number;
}

type ReadonlyUser = MyReadonly<User>;

const user: ReadonlyUser = { name: "Alice", age: 30 };`,
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
            expected: "Readonly user",
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
    id: "ts-conditional-types-infer",
    title: "Conditional Types (Infer)",
    description:
      "Create a conditional type that extracts the return type if it's a function, otherwise returns never.",
    difficulty: Difficulty.Hard,
    category: "Conditional Types",
    group: "Step 4: TypeScript Advanced Types & Patterns",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/2/conditional-types.html",
    starterCode: `type GetReturnType<T> = // Define conditional type here

function getString(): string {
  return "hello";
}

type Result = GetReturnType<typeof getString>;`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      try {
        new Function(userCode);
        return [
          {
            input: "N/A",
            expected: "No compilation errors",
            actual: "Success",
            passed: true,
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
