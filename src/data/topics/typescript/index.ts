import { TopicQuestion } from '../types';

export const tsQuestions: TopicQuestion[] = [
  {
    id: 'typescript-1',
    topic: 'TypeScript',
    question: 'What are TypeScript Generics and why are they useful?',
    answer: `Generics allow you to write reusable, type-safe code that works with multiple types while maintaining type information.

**Why Use Generics:**
- Type safety without losing flexibility
- Code reusability
- Better IDE autocomplete
- Avoid type assertions and 'any'

**Basic Example:**
\`\`\`typescript
// Without generics (not type-safe)
function identity(arg: any): any {
  return arg;
}

// With generics (type-safe)
function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(42);     // num is number
const str = identity<string>("hello"); // str is string
const bool = identity(true);           // Type inference works
\`\`\`

**Generic Constraints:**
\`\`\`typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): void {
  console.log(arg.length); // Safe: T must have length
}

logLength("hello");    // OK: string has length
logLength([1, 2, 3]);  // OK: array has length
logLength(123);        // Error: number has no length
\`\`\`

**Real-World Example:**
\`\`\`typescript
// API response wrapper
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: number;
  name: string;
}

const response: ApiResponse<User> = {
  data: { id: 1, name: "John" },
  status: 200,
  message: "Success"
};
// response.data is typed as User
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'typescript-2',
    topic: 'TypeScript',
    question: 'Explain TypeScript Utility Types (Partial, Pick, Omit, etc.)',
    answer: `TypeScript provides built-in utility types for common type transformations.

**1. Partial<T>** - Makes all properties optional:
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; }

function updateUser(id: number, updates: Partial<User>) {
  // Can update any subset of properties
}

updateUser(1, { name: 'John' }); // OK
updateUser(1, { email: 'john@example.com' }); // OK
\`\`\`

**2. Required<T>** - Makes all properties required:
\`\`\`typescript
interface Config {
  host?: string;
  port?: number;
}

type RequiredConfig = Required<Config>;
// { host: string; port: number; }
\`\`\`

**3. Pick<T, K>** - Select specific properties:
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

type UserPreview = Pick<User, 'id' | 'name'>;
// { id: number; name: string; }

type Credentials = Pick<User, 'email' | 'password'>;
// { email: string; password: string; }
\`\`\`

**4. Omit<T, K>** - Remove specific properties:
\`\`\`typescript
type UserWithoutPassword = Omit<User, 'password'>;
// { id: number; name: string; email: string; }

type PublicUser = Omit<User, 'password' | 'email'>;
// { id: number; name: string; }
\`\`\`

**5. Record<K, T>** - Create object type with specific keys:
\`\`\`typescript
type Role = 'admin' | 'user' | 'guest';

type Permissions = Record<Role, string[]>;
// {
//   admin: string[];
//   user: string[];
//   guest: string[];
// }

const permissions: Permissions = {
  admin: ['read', 'write', 'delete'],
  user: ['read', 'write'],
  guest: ['read']
};
\`\`\`

**6. Readonly<T>** - Make all properties readonly:
\`\`\`typescript
interface Config {
  apiUrl: string;
  timeout: number;
}

const config: Readonly<Config> = {
  apiUrl: 'https://api.example.com',
  timeout: 5000
};

config.apiUrl = 'other'; //  Error: cannot assign to readonly property
\`\`\`

**7. ReturnType<T>** - Extract return type of function:
\`\`\`typescript
function getUser() {
  return { id: 1, name: 'John', email: 'john@example.com' };
}

type User = ReturnType<typeof getUser>;
// { id: number; name: string; email: string; }
\`\`\`

**8. Parameters<T>** - Extract parameter types:
\`\`\`typescript
function createUser(name: string, age: number, email: string) {
  // ...
}

type CreateUserParams = Parameters<typeof createUser>;
// [string, number, string]
\`\`\`

**9. Exclude<T, U>** - Remove types from union:
\`\`\`typescript
type Status = 'pending' | 'approved' | 'rejected' | 'cancelled';
type ActiveStatus = Exclude<Status, 'cancelled'>;
// 'pending' | 'approved' | 'rejected'
\`\`\`

**10. Extract<T, U>** - Extract types from union:
\`\`\`typescript
type Status = 'pending' | 'approved' | 'rejected' | 'cancelled';
type FinalStatus = Extract<Status, 'approved' | 'rejected'>;
// 'approved' | 'rejected'
\`\`\`

**Real-World Example:**
\`\`\`typescript
// API response transformation
interface ApiUser {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

// Public response (remove sensitive fields)
type PublicUser = Omit<ApiUser, 'password'>;

// Create user request (no id, timestamps)
type CreateUserRequest = Omit<ApiUser, 'id' | 'createdAt' | 'updatedAt'>;

// Update user request (partial, no id)
type UpdateUserRequest = Partial<Omit<ApiUser, 'id' | 'createdAt' | 'updatedAt'>>;

// User preview (just id and name)
type UserPreview = Pick<ApiUser, 'id' | 'name'>;
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'ts-3',
    topic: 'TypeScript',
    question: 'What are the differences between Interface and Type in TypeScript?',
    answer: `**Interface**:
- Can be merged (declaration merging)
- Better error messages in some cases
- Can only describe shapes of objects

**Type**:
- Can describe any type (primitives, unions, intersections)
- Cannot be merged
- More flexible for complex type manipulations

**Example:**
\`\`\`typescript
interface User {
  name: string;
}
interface User {
  age: number;
}
// User has both name and age

type ID = string | number; // Union type (only possible with type)
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'ts-4',
    topic: 'TypeScript',
    question: 'What are Generics in TypeScript?',
    answer: `Generics allow you to create reusable components that work with a variety of types rather than a single one. They provide a way to capture the type of the argument so that we can use it to denote what is being returned.

**Example:**
\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString");
// Type of output will be 'string'
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'ts-5',
    topic: 'TypeScript',
    question: 'Explain the "any", "unknown", and "never" types.',
    answer: `**any**:
- Disables type checking
- Allows any operation
- Unsafe

**unknown**:
- Safer alternative to any
- Must perform type checking before performing operations
- "I don't know what this is yet"

**never**:
- Represents values that never occur
- Return type of functions that throw errors or infinite loops
- Used in exhaustive type checking`,
    difficulty: 'Medium'
  },
  {
    id: 'ts-6',
    topic: 'TypeScript',
    question: 'What is a Union Type?',
    answer: `A Union Type describes a value that can be one of several types. We use the vertical bar (|) to separate each type.

**Example:**
\`\`\`typescript
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'ts-7',
    topic: 'TypeScript',
    question: 'What is an Intersection Type?',
    answer: `An Intersection Type combines multiple types into one. This allows you to add together existing types to get a single type that has all the features you need.

**Example:**
\`\`\`typescript
interface ErrorHandling {
  success: boolean;
  error?: { message: string };
}

interface ArtworksData {
  artworks: { title: string }[];
}

type ArtworksResponse = ArtworksData & ErrorHandling;
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'ts-8',
    topic: 'TypeScript',
    question: 'What are Enums?',
    answer: `Enums allow a developer to define a set of named constants. Using enums can make it easier to document intent, or create a set of distinct cases. TypeScript provides both numeric and string-based enums.

**Example:**
\`\`\`typescript
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'ts-9',
    topic: 'TypeScript',
    question: 'What is Type Inference?',
    answer: `Type inference is used to provide type information when there is no explicit type annotation. For example, in this code, TypeScript infers that x is a number:

\`\`\`typescript
let x = 3;
// x is inferred as number
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'ts-10',
    topic: 'TypeScript',
    question: 'What are Decorators?',
    answer: `Decorators provide a way to add both annotations and a meta-programming syntax for class declarations and members. They are a stage 2 proposal for JavaScript and are available as an experimental feature in TypeScript.

**Example:**
\`\`\`typescript
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class BugReport {
  type = "report";
  title: string;
  constructor(t: string) {
    this.title = t;
  }
}
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'ts-11',
    topic: 'TypeScript',
    question: 'What is the "readonly" modifier?',
    answer: `The \`readonly\` modifier makes a property immutable. It can only be assigned to in the constructor or at the point of declaration.

**Example:**
\`\`\`typescript
interface Point {
  readonly x: number;
  readonly y: number;
}
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'ts-12',
    topic: 'TypeScript',
    question: 'What are Mapped Types?',
    answer: `Mapped types allow you to create new types based on old ones by transforming properties.

**Example:**
\`\`\`typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'ts-13',
    topic: 'TypeScript',
    question: 'What is "keyof" operator?',
    answer: `The \`keyof\` operator takes an object type and produces a string or numeric literal union of its keys.

**Example:**
\`\`\`typescript
type Point = { x: number; y: number };
type P = keyof Point; // "x" | "y"
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'ts-14',
    topic: 'TypeScript',
    question: 'What are Type Guards?',
    answer: `Type guards are expressions that perform a runtime check that guarantees the type in some scope.

**Example:**
\`\`\`typescript
function isString(test: any): test is string {
  return typeof test === "string";
}
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'ts-15',
    topic: 'TypeScript',
    question: 'What is the difference between "null" and "undefined" in TypeScript?',
    answer: `In TypeScript (and JS), \`undefined\` means a variable has been declared but not defined. \`null\` is an assignment value. It can be assigned to a variable as a representation of no value.

By default \`null\` and \`undefined\` are subtypes of all other types.`,
    difficulty: 'Easy'
  },
  {
    id: 'ts-16',
    topic: 'TypeScript',
    question: 'What is a Tuple?',
    answer: `Tuple types allow you to express an array with a fixed number of elements whose types are known, but need not be the same.

**Example:**
\`\`\`typescript
let x: [string, number];
x = ["hello", 10]; // OK
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'ts-17',
    topic: 'TypeScript',
    question: 'What is "this" in TypeScript?',
    answer: `TypeScript infers 'this' in functions, but you can also explicitly type it as the first parameter of a function (which is erased during compilation).

**Example:**
\`\`\`typescript
function f(this: void) {
  // make sure \`this\` is unusable in this standalone function
}
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'ts-18',
    topic: 'TypeScript',
    question: 'What are Ambient Declarations?',
    answer: `Ambient declarations tell the compiler about the shape of code that exists elsewhere (e.g., in a library included via script tag). They are usually in \`.d.ts\` files and use the \`declare\` keyword.`,
    difficulty: 'Hard'
  },
  {
    id: 'ts-19',
    topic: 'TypeScript',
    question: 'What is Conditional Type?',
    answer: `Conditional types take a form that looks a little like conditional expressions (\`condition ? trueExpression : falseExpression\`) in JavaScript.

**Example:**
\`\`\`typescript
type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'ts-20',
    topic: 'TypeScript',
    question: 'What is Utility Type "Partial<T>"?',
    answer: `Constructs a type with all properties of Type set to optional. This utility will return a type that represents all subsets of a given type.

**Example:**
\`\`\`typescript
interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'ts-21',
    topic: 'TypeScript',
    question: 'What is the "as const" assertion?',
    answer: `\`as const\` creates a readonly literal type, preventing type widening.

\`\`\`typescript
// Without as const - type widens
const colors = ['red', 'green', 'blue'];
// type: string[]

// With as const - literal type
const colors = ['red', 'green', 'blue'] as const;
// type: readonly ['red', 'green', 'blue']

// Object example
const config = {
  endpoint: '/api',
  timeout: 3000
} as const;
// type: { readonly endpoint: '/api'; readonly timeout: 3000; }

// Extract union from const array
const statuses = ['pending', 'approved', 'rejected'] as const;
type Status = typeof statuses[number]; // 'pending' | 'approved' | 'rejected'
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'ts-22',
    topic: 'TypeScript',
    question: 'What is the "satisfies" operator in TypeScript?',
    answer: `The \`satisfies\` operator validates a type while keeping the narrowest inferred type.

\`\`\`typescript
type Colors = 'red' | 'green' | 'blue';
type RGB = [number, number, number];

// Without satisfies - loses specific types
const palette: Record<Colors, string | RGB> = {
  red: [255, 0, 0],
  green: '#00ff00',
  blue: [0, 0, 255]
};
palette.green.toUpperCase(); // Error: RGB has no toUpperCase

// With satisfies - validates AND keeps narrow types
const palette = {
  red: [255, 0, 0],
  green: '#00ff00',
  blue: [0, 0, 255]
} satisfies Record<Colors, string | RGB>;

palette.green.toUpperCase(); // Works! TypeScript knows it's a string
palette.red[0]; // Works! TypeScript knows it's an array
\`\`\`

**Use cases:** Type validation without losing specificity, config objects, constants.`,
    difficulty: 'Medium'
  },
  {
    id: 'ts-23',
    topic: 'TypeScript',
    question: 'Explain Template Literal Types in TypeScript.',
    answer: `Template literal types build on string literal types to create new types.

\`\`\`typescript
type World = 'world';
type Greeting = \`hello \${World}\`; // 'hello world'

// Union combinations
type Color = 'red' | 'blue';
type Size = 'sm' | 'lg';
type Variant = \`\${Color}-\${Size}\`;
// 'red-sm' | 'red-lg' | 'blue-sm' | 'blue-lg'

// Event handlers
type EventName = 'click' | 'focus' | 'blur';
type Handler = \`on\${Capitalize<EventName>}\`;
// 'onClick' | 'onFocus' | 'onBlur'

// CSS units
type Unit = 'px' | 'em' | 'rem' | '%';
type CSSValue = \`\${number}\${Unit}\`;
const margin: CSSValue = '10px'; // Valid
const padding: CSSValue = 'auto'; // Error

// Intrinsic string manipulation
type Upper = Uppercase<'hello'>; // 'HELLO'
type Lower = Lowercase<'HELLO'>; // 'hello'
type Cap = Capitalize<'hello'>; // 'Hello'
type Uncap = Uncapitalize<'Hello'>; // 'hello'
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'ts-24',
    topic: 'TypeScript',
    question: 'What is the "infer" keyword in TypeScript?',
    answer: `\`infer\` extracts a type from within a conditional type.

\`\`\`typescript
// Extract return type of function
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type Fn = () => string;
type Result = ReturnType<Fn>; // string

// Extract array element type
type ElementType<T> = T extends (infer E)[] ? E : never;

type Element = ElementType<string[]>; // string

// Extract promise value
type Awaited<T> = T extends Promise<infer V> ? V : T;

type Value = Awaited<Promise<number>>; // number

// Extract function parameters
type FirstParam<T> = T extends (first: infer F, ...rest: any[]) => any ? F : never;

type Param = FirstParam<(name: string, age: number) => void>; // string

// Nested inference
type UnwrapArray<T> = T extends (infer E)[]
  ? E extends (infer N)[]
    ? N
    : E
  : T;
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'ts-25',
    topic: 'TypeScript',
    question: 'What are Discriminated Unions (Tagged Unions)?',
    answer: `Discriminated unions are a pattern where a common property is used to narrow types.

\`\`\`typescript
interface Circle {
  kind: 'circle';  // Discriminant property
  radius: number;
}

interface Square {
  kind: 'square';  // Discriminant property
  sideLength: number;
}

interface Rectangle {
  kind: 'rectangle';
  width: number;
  height: number;
}

type Shape = Circle | Square | Rectangle;

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'square':
      return shape.sideLength ** 2;
    case 'rectangle':
      return shape.width * shape.height;
    default:
      // Exhaustiveness check
      const _exhaustive: never = shape;
      return _exhaustive;
  }
}

// API response pattern
type ApiResponse<T> =
  | { status: 'success'; data: T; }
  | { status: 'error'; error: string; }
  | { status: 'loading'; };
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'ts-26',
    topic: 'TypeScript',
    question: 'What are Index Signatures in TypeScript?',
    answer: `Index signatures describe object types with dynamic keys.

\`\`\`typescript
// String index signature
interface StringMap {
  [key: string]: string;
}

const map: StringMap = {
  name: 'John',
  city: 'NYC'
};

// Number index signature
interface NumberMap {
  [index: number]: string;
}

const arr: NumberMap = ['a', 'b', 'c'];

// Combined with known properties
interface Dictionary {
  length: number;  // Must be compatible with index return type
  [key: string]: number;
}

// Template literal keys
interface Handlers {
  [key: \`on\${string}\`]: (() => void) | undefined;
}

const handlers: Handlers = {
  onClick: () => console.log('clicked'),
  onHover: () => console.log('hovered')
};

// Record vs index signature
type RecordMap = Record<string, number>;
// Equivalent to: { [key: string]: number }
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'ts-27',
    topic: 'TypeScript',
    question: 'What are Type Assertions and when should you use them?',
    answer: `Type assertions tell the compiler to treat a value as a specific type.

\`\`\`typescript
// Angle bracket syntax (not in JSX)
const value = <string>someValue;

// "as" syntax (works everywhere)
const value = someValue as string;

// Common use cases
// 1. DOM elements
const input = document.getElementById('input') as HTMLInputElement;
input.value = 'Hello';

// 2. JSON parsing
const data = JSON.parse(response) as User;

// 3. Unknown to specific type
function handleEvent(event: unknown) {
  const mouseEvent = event as MouseEvent;
  console.log(mouseEvent.clientX);
}
\`\`\`

**When NOT to use:**
\`\`\`typescript
// Don't use to force incompatible types
const num = 'hello' as number; // Error
const num = 'hello' as unknown as number; // Works but DANGEROUS

// Prefer type guards instead
function processValue(value: unknown) {
  if (typeof value === 'string') {
    console.log(value.toUpperCase()); // Naturally narrowed
  }
}
\`\`\`

**Best practice:** Use assertions sparingly; prefer type guards.`,
    difficulty: 'Medium'
  },
  {
    id: 'ts-28',
    topic: 'TypeScript',
    question: 'What is the "typeof" operator used for in TypeScript?',
    answer: `TypeScript's \`typeof\` extracts the type of a value (different from JavaScript's runtime typeof).

\`\`\`typescript
// Extract type from value
const user = {
  name: 'John',
  age: 30,
  email: 'john@example.com'
};

type User = typeof user;
// { name: string; age: number; email: string; }

// Extract function type
function fetchUser(id: number) {
  return { id, name: 'User' };
}

type FetchUserFn = typeof fetchUser;
// (id: number) => { id: number; name: string; }

type UserResult = ReturnType<typeof fetchUser>;
// { id: number; name: string; }

// Combined with keyof
type UserKeys = keyof typeof user;
// 'name' | 'age' | 'email'

// Const assertions
const statuses = ['pending', 'approved'] as const;
type Status = typeof statuses[number];
// 'pending' | 'approved'
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'ts-29',
    topic: 'TypeScript',
    question: 'What are Declaration Files (.d.ts)?',
    answer: `Declaration files describe the shape of JavaScript code without implementations.

\`\`\`typescript
// types.d.ts
declare module 'my-library' {
  export function greet(name: string): string;
  export interface Config {
    timeout: number;
    retries: number;
  }
}

// Global declarations
declare global {
  interface Window {
    myApp: {
      version: string;
      init(): void;
    };
  }
}

// Ambient variable declarations
declare const API_URL: string;
declare function gtag(event: string, data: object): void;
\`\`\`

**Creating declarations for JS libraries:**
\`\`\`typescript
// utils.d.ts (for utils.js)
export declare function formatDate(date: Date): string;
export declare function parseQuery(query: string): Record<string, string>;
\`\`\`

**Using DefinitelyTyped:**
\`\`\`bash
npm install --save-dev @types/lodash
# Now TypeScript knows lodash types
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'ts-30',
    topic: 'TypeScript',
    question: 'What is Module Augmentation?',
    answer: `Module augmentation adds new declarations to existing modules.

\`\`\`typescript
// Augment an existing module
import express from 'express';

declare module 'express' {
  interface Request {
    user?: {
      id: string;
      name: string;
    };
  }
}

// Now all express Request objects have user property
app.get('/profile', (req, res) => {
  console.log(req.user?.name); // TypeScript knows this exists
});

// Augment global Window
declare global {
  interface Window {
    analytics: {
      track(event: string): void;
    };
  }
}

window.analytics.track('page_view');

// Augment Array prototype
interface Array<T> {
  customMethod(): T[];
}
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'ts-31',
    topic: 'TypeScript',
    question: 'What are Const Enums vs Regular Enums?',
    answer: `**Regular Enum:**
\`\`\`typescript
enum Direction {
  Up,
  Down,
  Left,
  Right
}

// Compiled to:
var Direction;
(function (Direction) {
  Direction[Direction["Up"] = 0] = "Up";
  // ... more code
})(Direction || (Direction = {}));

const dir = Direction.Up; // Direction["Up"]
\`\`\`

**Const Enum:**
\`\`\`typescript
const enum Direction {
  Up,
  Down,
  Left,
  Right
}

// Compiled to NOTHING! Values are inlined:
const dir = 0; // Literally just the number
\`\`\`

**Differences:**
- Regular enums generate runtime code
- Const enums are completely erased (inlined)
- Const enums can't be iterated at runtime
- Const enums are more performant

**Alternative - Union types:**
\`\`\`typescript
// Often preferred over enums
const Direction = {
  Up: 'up',
  Down: 'down',
} as const;

type Direction = typeof Direction[keyof typeof Direction];
// 'up' | 'down'
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'ts-32',
    topic: 'TypeScript',
    question: 'What is the "NonNullable" utility type?',
    answer: `\`NonNullable<T>\` removes \`null\` and \`undefined\` from a type.

\`\`\`typescript
type MaybeString = string | null | undefined;
type DefinitelyString = NonNullable<MaybeString>;
// string

// Implementation
type NonNullable<T> = T extends null | undefined ? never : T;

// Use with optional properties
interface User {
  name: string;
  email?: string | null;
}

type RequiredEmail = NonNullable<User['email']>;
// string

// Practical usage
function processValue<T>(value: T): NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error('Value cannot be null or undefined');
  }
  return value as NonNullable<T>;
}
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'ts-33',
    topic: 'TypeScript',
    question: 'What is Strict Mode in TypeScript?',
    answer: `Strict mode enables a set of type checking options for stricter code.

**tsconfig.json:**
\`\`\`json
{
  "compilerOptions": {
    "strict": true
  }
}
\`\`\`

**Individual options (all enabled by strict):**
\`\`\`json
{
  "strictNullChecks": true,      // null/undefined not assignable to other types
  "strictFunctionTypes": true,   // Stricter function type checking
  "strictBindCallApply": true,   // Stricter bind/call/apply
  "strictPropertyInitialization": true,  // Class properties must be initialized
  "noImplicitAny": true,         // Error on implicit any
  "noImplicitThis": true,        // Error on implicit this type
  "alwaysStrict": true,          // Parse in strict mode, emit "use strict"
  "useUnknownInCatchVariables": true  // catch variables are unknown
}
\`\`\`

**Example differences:**
\`\`\`typescript
// Without strictNullChecks
const name: string = null; // OK

// With strictNullChecks
const name: string = null; // Error!
const name: string | null = null; // Must be explicit
\`\`\`

**Recommendation:** Always use strict mode in new projects.`,
    difficulty: 'Easy'
  },
  {
    id: 'ts-34',
    topic: 'TypeScript',
    question: 'How do you type React component props in TypeScript?',
    answer: `\`\`\`typescript
// Interface approach
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

function Button({ label, onClick, disabled = false }: ButtonProps) {
  return <button onClick={onClick} disabled={disabled}>{label}</button>;
}

// With children
interface CardProps {
  title: string;
  children: React.ReactNode;
}

// React.FC (less common now)
const Card: React.FC<CardProps> = ({ title, children }) => {
  return <div><h2>{title}</h2>{children}</div>;
};

// Props with generics
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map(renderItem)}</ul>;
}

// Extending HTML element props
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function Input({ label, ...rest }: InputProps) {
  return (
    <>
      <label>{label}</label>
      <input {...rest} />
    </>
  );
}
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'ts-35',
    topic: 'TypeScript',
    question: 'How do you type React hooks in TypeScript?',
    answer: `\`\`\`typescript
// useState with type
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);

// useState with complex type
interface FormData {
  name: string;
  email: string;
}
const [form, setForm] = useState<FormData>({ name: '', email: '' });

// useRef
const inputRef = useRef<HTMLInputElement>(null);
const countRef = useRef<number>(0);

// useEffect - no special typing needed
useEffect(() => {
  // cleanup function return
  return () => {};
}, []);

// useReducer
type State = { count: number };
type Action = { type: 'increment' } | { type: 'decrement' } | { type: 'set'; payload: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    case 'set': return { count: action.payload };
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0 });

// Custom hook with generics
function useFetch<T>(url: string): { data: T | null; loading: boolean } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  // ... fetch logic
  return { data, loading };
}
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'ts-36',
    topic: 'TypeScript',
    question: 'What is the difference between "any" and "unknown"?',
    answer: `**any:** Disables type checking completely.
\`\`\`typescript
let value: any = 'hello';
value.foo.bar.baz;    // No error (could crash at runtime)
value.toUpperCase();  // No error
value();              // No error
\`\`\`

**unknown:** Type-safe alternative where you must check before using.
\`\`\`typescript
let value: unknown = 'hello';
value.toUpperCase();  // Error! Object is of type 'unknown'

// Must narrow the type first
if (typeof value === 'string') {
  value.toUpperCase();  // Now works!
}

// Or use type assertion (less safe)
(value as string).toUpperCase();
\`\`\`

**When to use:**
- \`unknown\`: When you truly don't know the type (API responses, user input)
- \`any\`: Almost never (escape hatch for migration, quick prototyping)

**Rule of thumb:**
- If you're accepting any type of input: use \`unknown\`
- If you're avoiding type checking: probably a code smell`,
    difficulty: 'Easy'
  },
  {
    id: 'ts-37',
    topic: 'TypeScript',
    question: 'What is Function Overloading in TypeScript?',
    answer: `Function overloading allows multiple function signatures for different input types.

\`\`\`typescript
// Overload signatures
function greet(person: string): string;
function greet(persons: string[]): string[];

// Implementation signature (not callable directly)
function greet(person: string | string[]): string | string[] {
  if (typeof person === 'string') {
    return \`Hello, \${person}!\`;
  }
  return person.map(p => \`Hello, \${p}!\`);
}

// Usage
const greeting = greet('John');           // string
const greetings = greet(['John', 'Jane']); // string[]

// Method overloading in classes
class Calculator {
  add(a: number, b: number): number;
  add(a: string, b: string): string;
  add(a: any, b: any): any {
    return a + b;
  }
}

const calc = new Calculator();
calc.add(1, 2);      // number
calc.add('a', 'b');  // string
\`\`\`

**Note:** Order matters - put more specific overloads first.`,
    difficulty: 'Medium'
  },
  {
    id: 'ts-38',
    topic: 'TypeScript',
    question: 'What are Branded Types (Nominal Typing)?',
    answer: `Branded types create distinct types even when structurally identical.

\`\`\`typescript
// Problem: Structurally identical types
type UserId = string;
type PostId = string;

function getUser(id: UserId) { }
getUser('post_123'); // No error, but logically wrong!

// Solution: Branded types
type UserId = string & { readonly brand: unique symbol };
type PostId = string & { readonly brand: unique symbol };

function createUserId(id: string): UserId {
  return id as UserId;
}

function createPostId(id: string): PostId {
  return id as PostId;
}

function getUser(id: UserId) { }

const userId = createUserId('user_123');
const postId = createPostId('post_456');

getUser(userId); // OK
getUser(postId); // Error! PostId is not assignable to UserId

// Branded number example
type USD = number & { readonly currency: 'USD' };
type EUR = number & { readonly currency: 'EUR' };

function addUSD(a: USD, b: USD): USD {
  return (a + b) as USD;
}
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'ts-39',
    topic: 'TypeScript',
    question: 'What is the "readonly" array and tuple?',
    answer: `\`readonly\` prevents modification of arrays and tuples.

\`\`\`typescript
// Readonly array
const numbers: readonly number[] = [1, 2, 3];
numbers.push(4);    // Error!
numbers[0] = 10;    // Error!
numbers.length;     // OK (reading is fine)

// ReadonlyArray utility type
const items: ReadonlyArray<string> = ['a', 'b', 'c'];

// Readonly tuple
const point: readonly [number, number] = [10, 20];
point[0] = 5;       // Error!

// As const creates readonly
const colors = ['red', 'green', 'blue'] as const;
// readonly ['red', 'green', 'blue']
colors.push('yellow'); // Error!

// Readonly in function parameters
function process(items: readonly string[]) {
  items.push('new');  // Error! Can't modify
  return items.map(i => i.toUpperCase());  // OK - creates new array
}

// Readonly objects
interface Config {
  readonly apiUrl: string;
  readonly timeout: number;
}

// Or use Readonly utility
type ImmutableConfig = Readonly<Config>;
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'ts-40',
    topic: 'TypeScript',
    question: 'What are Recursive Types in TypeScript?',
    answer: `Recursive types reference themselves in their definition.

\`\`\`typescript
// JSON type
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

// Tree structure
interface TreeNode<T> {
  value: T;
  children?: TreeNode<T>[];
}

const tree: TreeNode<string> = {
  value: 'root',
  children: [
    { value: 'child1' },
    { value: 'child2', children: [{ value: 'grandchild' }] }
  ]
};

// Linked list
type LinkedList<T> = {
  value: T;
  next: LinkedList<T> | null;
};

// File system
type FileSystem = {
  [name: string]: string | FileSystem;
};

const fs: FileSystem = {
  'src': {
    'index.ts': 'content',
    'utils': {
      'helpers.ts': 'content'
    }
  }
};

// Deep Readonly (recursive)
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'ts-41',
    topic: 'TypeScript',
    question: 'What are the differences between "extends" and "implements"?',
    answer: `**extends:** Inheritance from a class or extending an interface.
\`\`\`typescript
// Class extends class
class Animal {
  move() { console.log('Moving'); }
}

class Dog extends Animal {
  bark() { console.log('Woof!'); }
}

// Interface extends interface
interface Person {
  name: string;
}

interface Employee extends Person {
  employeeId: number;
}
\`\`\`

**implements:** A class commits to satisfying an interface.
\`\`\`typescript
interface Printable {
  print(): void;
}

interface Savable {
  save(): Promise<void>;
}

// Class must provide implementations
class Document implements Printable, Savable {
  print() {
    console.log('Printing...');
  }
  
  async save() {
    // Save logic
  }
}
\`\`\`

**Key differences:**
- \`extends\`: Inherits implementation
- \`implements\`: Only inherits the type contract

\`\`\`typescript
// You can implement a class (use its shape as interface)
class Control {
  state: number = 0;
}

class Button implements Control {
  state: number = 0;  // Must provide your own implementation
}
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'ts-42',
    topic: 'TypeScript',
    question: 'What is the "never" type and when is it used?',
    answer: `\`never\` represents values that never occur.

**Use cases:**

**1. Functions that never return:**
\`\`\`typescript
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) { }
}
\`\`\`

**2. Exhaustiveness checking:**
\`\`\`typescript
type Shape = 'circle' | 'square' | 'triangle';

function getArea(shape: Shape): number {
  switch (shape) {
    case 'circle': return Math.PI;
    case 'square': return 4;
    case 'triangle': return 1.5;
    default:
      const exhaustiveCheck: never = shape;
      // If we add a new shape and forget to handle it,
      // TypeScript will error here
      return exhaustiveCheck;
  }
}
\`\`\`

**3. Impossible intersections:**
\`\`\`typescript
type Impossible = string & number; // never
\`\`\`

**4. Filtering in conditional types:**
\`\`\`typescript
type NonNullable<T> = T extends null | undefined ? never : T;
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'ts-43',
    topic: 'TypeScript',
    question: 'What is the "this" type in TypeScript?',
    answer: `The \`this\` type refers to the type of the current class/interface, enabling fluent interfaces.

\`\`\`typescript
class StringBuilder {
  private value: string = '';
  
  append(str: string): this {
    this.value += str;
    return this;
  }
  
  clear(): this {
    this.value = '';
    return this;
  }
  
  toString(): string {
    return this.value;
  }
}

// Fluent chaining
const result = new StringBuilder()
  .append('Hello')
  .append(' ')
  .append('World')
  .toString();

// Works with inheritance
class AdvancedBuilder extends StringBuilder {
  appendLine(str: string): this {
    return this.append(str + '\\n');
  }
}

// Still returns AdvancedBuilder, not StringBuilder
const adv = new AdvancedBuilder()
  .append('Hello')      // Returns AdvancedBuilder
  .appendLine('World'); // Still AdvancedBuilder

// In function parameters
function describe(this: { name: string }) {
  console.log(\`Name: \${this.name}\`);
}
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'ts-44',
    topic: 'TypeScript',
    question: 'How do you handle async/await types in TypeScript?',
    answer: `\`\`\`typescript
// Async function returns Promise
async function fetchUser(id: number): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
}

// Using ReturnType with async functions
type UserResult = Awaited<ReturnType<typeof fetchUser>>;
// User (unwrapped from Promise)

// Promise type handling
type AsyncFn = () => Promise<string>;
type Result = Awaited<ReturnType<AsyncFn>>; // string

// Error handling
async function safeFetch<T>(url: string): Promise<[T, null] | [null, Error]> {
  try {
    const response = await fetch(url);
    const data = await response.json() as T;
    return [data, null];
  } catch (error) {
    return [null, error as Error];
  }
}

const [data, error] = await safeFetch<User>('/api/user');
if (error) {
  console.error(error.message);
} else {
  console.log(data.name);
}

// Promise.all typing
const [users, posts] = await Promise.all([
  fetchUsers(),
  fetchPosts()
]);
// Properly typed as [User[], Post[]]
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'ts-45',
    topic: 'TypeScript',
    question: 'What is the "Object" vs "object" vs "{}" type?',
    answer: `**Object (capital O):**
\`\`\`typescript
// Matches anything that's not null or undefined
let obj: Object;
obj = {};           // OK
obj = [];           // OK
obj = () => {};     // OK
obj = 42;           // OK (number is boxed to Number)
obj = 'hello';      // OK
obj = null;         // Error
\`\`\`

**object (lowercase):**
\`\`\`typescript
// Non-primitive types only
let obj: object;
obj = {};           // OK
obj = [];           // OK
obj = () => {};     // OK
obj = 42;           // Error!
obj = 'hello';      // Error!
\`\`\`

**{} (empty object):**
\`\`\`typescript
// Similar to Object - anything non-nullish
let obj: {};
obj = {};           // OK
obj = 42;           // OK
obj = 'hello';      // OK
obj = null;         // Error

// But you can't access any properties
obj.foo;            // Error: Property 'foo' does not exist
\`\`\`

**Best practices:**
\`\`\`typescript
// For any object, use object
function keys(obj: object): string[] {
  return Object.keys(obj);
}

// For specific shapes, use interface/type
interface User {
  name: string;
}

// For truly unknown, use unknown
function process(value: unknown) { }
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'ts-46',
    topic: 'TypeScript',
    question: 'How do you use "import type" and "export type"?',
    answer: `Type-only imports/exports are erased at compile time and don't create runtime dependencies.

\`\`\`typescript
// types.ts
export interface User {
  id: number;
  name: string;
}

export type ID = string | number;

export function createUser(): User {
  return { id: 1, name: 'John' };
}

// Using type-only imports
import type { User, ID } from './types';
import { createUser } from './types';

// Combined - import types and values
import { createUser, type User } from './types';

// Type-only export
export type { User };
export { createUser };

// Re-exporting types
export type { User as UserType } from './types';
\`\`\`

**Benefits:**
1. Clearer intent - marks what's used only for types
2. Helps bundlers with tree-shaking
3. Prevents accidental runtime imports
4. Required when using \`isolatedModules\`

**tsconfig.json:**
\`\`\`json
{
  "compilerOptions": {
    "verbatimModuleSyntax": true  // Enforces type vs value imports
  }
}
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'ts-47',
    topic: 'TypeScript',
    question: 'What are rest parameters and spread operators in TypeScript?',
    answer: `**Rest parameters (in function definition):**
\`\`\`typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}

sum(1, 2, 3, 4); // 10

// With other parameters
function log(level: string, ...messages: string[]): void {
  console.log(level, ...messages);
}

// Typed rest parameters with tuple
function createTuple<T extends unknown[]>(...args: T): T {
  return args;
}

const tuple = createTuple(1, 'hello', true);
// [number, string, boolean]
\`\`\`

**Spread operator (in function call):**
\`\`\`typescript
const nums = [1, 2, 3] as const;
Math.max(...nums); // OK

// Spread in array types
type First = [string, ...number[]];  // String first, then any number of numbers
type Last = [...string[], number];   // Any strings, then a number

// Spread in function types
type Fn = (...args: [string, number, boolean]) => void;
// Equivalent to (a: string, b: number, c: boolean) => void
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'ts-48',
    topic: 'TypeScript',
    question: 'How do you type event handlers in TypeScript?',
    answer: `\`\`\`typescript
// DOM events
function handleClick(event: MouseEvent): void {
  console.log(event.clientX, event.clientY);
}

function handleInput(event: Event): void {
  const target = event.target as HTMLInputElement;
  console.log(target.value);
}

// React events
function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
  event.preventDefault();
}

function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
  console.log(event.target.value);
}

function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>): void {
  if (event.key === 'Enter') {
    // Submit
  }
}

// Generic event handler type
type EventHandler<E extends React.SyntheticEvent> = (event: E) => void;

// Inline event typing
<button onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
  console.log(e.currentTarget.name);
}}>
  Click
</button>

// Event handler props
interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onHover?: React.MouseEventHandler<HTMLButtonElement>;
}
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'ts-49',
    topic: 'TypeScript',
    question: 'What is the "Awaited" utility type?',
    answer: `\`Awaited<T>\` recursively unwraps Promise types to get the resolved value type.

\`\`\`typescript
type A = Awaited<Promise<string>>;
// string

type B = Awaited<Promise<Promise<number>>>;
// number (recursively unwraps)

type C = Awaited<boolean | Promise<number>>;
// boolean | number

// Useful with ReturnType
async function fetchData() {
  return { id: 1, name: 'John' };
}

type Data = Awaited<ReturnType<typeof fetchData>>;
// { id: number; name: string; }

// Implementation (simplified)
type Awaited<T> = T extends Promise<infer U>
  ? Awaited<U>  // Recursively unwrap
  : T;

// Practical usage
async function processAll<T extends Promise<any>[]>(
  ...promises: T
): Promise<{ [K in keyof T]: Awaited<T[K]> }> {
  return Promise.all(promises) as any;
}

const [user, posts] = await processAll(
  fetchUser(),
  fetchPosts()
);
// Properly typed!
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'ts-50',
    topic: 'TypeScript',
    question: 'What are Variadic Tuple Types?',
    answer: `Variadic tuple types allow generic spreads in tuple types.

\`\`\`typescript
// Basic spread
type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U];

type Result = Concat<[1, 2], [3, 4]>;
// [1, 2, 3, 4]

// Function that concatenates arrays with proper typing
function concat<T extends unknown[], U extends unknown[]>(
  arr1: T,
  arr2: U
): [...T, ...U] {
  return [...arr1, ...arr2];
}

const result = concat([1, 2], ['a', 'b']);
// [number, number, string, string]

// Prepend/append elements
type Prepend<E, T extends unknown[]> = [E, ...T];
type Append<T extends unknown[], E> = [...T, E];

type WithPrefix = Prepend<string, [number, boolean]>;
// [string, number, boolean]

// Partial tuple application
function partial<T extends unknown[], U extends unknown[], R>(
  fn: (...args: [...T, ...U]) => R,
  ...args: T
): (...rest: U) => R {
  return (...rest) => fn(...args, ...rest);
}

function greet(greeting: string, name: string, punctuation: string) {
  return \`\${greeting}, \${name}\${punctuation}\`;
}

const sayHello = partial(greet, 'Hello');
sayHello('World', '!'); // "Hello, World!"
\`\`\``,
    difficulty: 'Hard'
  }
];
