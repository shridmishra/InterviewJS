import { QuizQuestion } from './types';

export const typeScriptQuiz: QuizQuestion[] = [
  {
    question: "What is TypeScript?",
    options: ["A JavaScript runtime", "JS superset with types", "A JavaScript framework", "A database language"],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: "TypeScript is a superset of JavaScript that adds optional static typing and other features. It compiles down to plain JavaScript."
  },
  {
    question: "What does the 'any' type mean in TypeScript?",
    options: ["It's an error", "Any numeric type", "Opt-out to any type", "Used for arrays only"],
    correctAnswerIndex: 2,
    difficulty: 'Easy',
    explanation: "The `any` type is a way to opt-out of type checking. A variable with `any` type can hold values of any type, but it defeats the purpose of using TypeScript."
  },
  {
    question: "How do you define an interface in TypeScript?",
    options: [
      "interface Name { ... }",
      "class Name { ... }",
      "type Name = { ... }",
      "Either interface or type alias."
    ],
    correctAnswerIndex: 3,
    difficulty: 'Easy',
    explanation: "Both `interface` and `type` can be used to define object shapes in TypeScript. They have some differences, but both are valid for defining object types."
  },
  {
    question: "What is the purpose of the 'readonly' modifier?",
    options: ["Read-only after init", "Create private properties", "Optimize performance", "Allow null values"],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "The `readonly` modifier prevents reassignment to a property after it has been initialized. It's useful for immutable data structures."
  },
  {
    question: "What does 'union type' mean in TypeScript?",
    options: ["Type that is one of many", "Type that combines multiple types", "Type for mathematical operations", "Type for database unions"],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "Union types (e.g., `string | number`) allow a value to be one of several types. TypeScript uses the `|` operator to create union types."
  },
  {
    question: "What is the difference between 'interface' and 'type' in TypeScript?",
    options: ["Exactly the same", "Interfaces extend/merge; types do unions/intersections", "Types are deprecated", "Interfaces are only for classes"],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: "Interfaces can be extended and support declaration merging. Type aliases can represent primitives, unions, tuples, and any other types that interfaces cannot."
  },
  {
    question: "What does the 'unknown' type represent?",
    options: ["An error type", "Safer alternative to any", "A type for undefined values", "A deprecated type"],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: "`unknown` is like `any`, but safer. You must perform type checking or type assertion before using a value of type `unknown`."
  },
  {
    question: "What is a tuple in TypeScript?",
    options: ["Fixed-length typed array", "A special kind of object", "A function type", "A generic type"],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "Tuples allow you to express an array with a fixed number of elements whose types are known, but need not be the same. E.g., `[string, number]`."
  },
  {
    question: "What does the '!' operator do in TypeScript (non-null assertion)?",
    options: ["Negates a boolean", "Assert non-null/undefined", "Creates a not-equal comparison", "Throws an error"],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: "The non-null assertion operator `!` tells TypeScript that a value is definitely not null or undefined, even if the type system thinks it might be."
  },
  {
    question: "What is a generic type in TypeScript?",
    options: ["Type that doesn't specify anything", "Type that works with any data", "Reusable across types", "A deprecated feature"],
    correctAnswerIndex: 2,
    difficulty: 'Medium',
    explanation: "Generics allow you to create reusable components that work with a variety of types rather than a single one. They provide a way to make components type-safe."
  },
  {
    question: "What does 'Pick<Type, Keys>' utility type do?",
    options: ["Randomly selects properties", "Pick specific properties", "Remove properties from a type", "Validate property names"],
    correctAnswerIndex: 1,
    difficulty: 'Hard',
    explanation: "`Pick` constructs a type by picking the set of properties `Keys` from `Type`. It's useful for creating types with only a subset of properties."
  },
  {
    question: "What does 'Omit<Type, Keys>' utility type do?",
    options: ["Omit specific properties", "Add properties to a type", "Make properties optional", "Create union types"],
    correctAnswerIndex: 0,
    difficulty: 'Hard',
    explanation: "`Omit` constructs a type by picking all properties from `Type` and then removing `Keys`. It's the opposite of `Pick`."
  },
  {
    question: "What is the 'never' type used for?",
    options: ["For null values", "Type for unreachable values", "For undefined values", "To disable type checking"],
    correctAnswerIndex: 1,
    difficulty: 'Hard',
    explanation: "The `never` type represents values that never occur. It's used for functions that never return (throw errors or infinite loops) or for exhaustive type checking."
  },
  {
    question: "What does 'Partial<Type>' utility type do?",
    options: ["All properties become optional", "Makes all properties required", "Removes half the properties", "Creates a partial class"],
    correctAnswerIndex: 0,
    difficulty: 'Medium',
    explanation: "`Partial<Type>` constructs a type with all properties of `Type` set to optional. This is useful for update functions where you only need to pass some properties."
  },
  {
    question: "What does 'Required<Type>' utility type do?",
    options: ["All properties required", "Makes properties optional", "Validate required fields", "Create required imports"],
    correctAnswerIndex: 0,
    difficulty: 'Medium',
    explanation: "`Required<Type>` constructs a type consisting of all properties of `Type` set to required. It's the opposite of `Partial`."
  },
  {
    question: "What is type assertion in TypeScript?",
    options: ["A way to test types", "Tell compiler the type", "A runtime check", "A debugging tool"],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: "Type assertion is like a type cast in other languages. It tells the compiler 'trust me, I know what I'm doing'. Syntax: `value as Type` or `<Type>value`."
  },
  {
    question: "What does 'enum' do in TypeScript?",
    options: ["Creates enumerable objects", "Named constants", "Loops through values", "Creates numeric types"],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: "Enums allow you to define a set of named constants. TypeScript supports numeric, string, and heterogeneous enums."
  },
  {
    question: "What is the purpose of 'keyof' operator?",
    options: ["Gets the keys of an object", "Union of keys of a type", "Validate object keys", "Delete keys from objects"],
    correctAnswerIndex: 1,
    difficulty: 'Hard',
    explanation: "The `keyof` operator takes an object type and produces a string or numeric literal union of its keys. E.g., `keyof { x: number, y: string }` is `'x' | 'y'`."
  },
  {
    question: "What does 'Record<Keys, Type>' utility type do?",
    options: ["Record type information", "Map keys K to type T", "Validate records", "Create database records"],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: "`Record<K, T>` constructs an object type whose property keys are `K` and whose property values are `T`. Useful for mapping types."
  },
  {
    question: "What is a type guard in TypeScript?",
    options: ["A security feature", "Runtime check that narrows types", "A linting rule", "A compilation step"],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: "Type guards are expressions that perform runtime checks to guarantee the type in some scope. Examples include `typeof`, `instanceof`, and custom type predicates."
  },
  {
    question: "What does 'extends' keyword do in generics?",
    options: ["Extends classes", "Constraint for generic parameter", "Creates inheritance", "Validate types"],
    correctAnswerIndex: 1,
    difficulty: 'Hard',
    explanation: "In generics, `extends` is used to constrain what types can be passed. E.g., `<T extends string>` means T must be a string or a subtype of string."
  },
  {
    question: "What is the 'infer' keyword used for?",
    options: ["Guess types automatically", "Extract type within conditional", "Import types", "Validate inference"],
    correctAnswerIndex: 1,
    difficulty: 'Hard',
    explanation: "`infer` is used within conditional types to extract and store a type. It's commonly used in advanced type manipulations like extracting return types."
  },
  {
    question: "What does 'strictNullChecks' compiler option do?",
    options: ["Remove null values", "Null/undefined must be handled", "Disable null checking", "Convert null to undefined"],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: "With `strictNullChecks` enabled, `null` and `undefined` are distinct types. Values must be explicitly checked before use, preventing many runtime errors."
  },
  {
    question: "What is a mapped type in TypeScript?",
    options: ["A type for Map objects", "Transform properties of a type", "A geographical type", "A deprecated feature"],
    correctAnswerIndex: 1,
    difficulty: 'Hard',
    explanation: "Mapped types allow you to create new types by transforming properties of an existing type. Built-in examples include `Partial`, `Readonly`, and `Pick`."
  },
  {
    question: "What does 'as const' assertion do?",
    options: ["Create constant variables", "Infer readonly literal types", "Validate constants", "Optimize performance"],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: "`as const` makes all properties readonly and infers literal types instead of general types. E.g., `[1, 2]` becomes `readonly [1, 2]` instead of `number[]`."
  },
];
