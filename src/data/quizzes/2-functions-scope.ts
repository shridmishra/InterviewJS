import { QuizQuestion } from './types';

export const functionsAndScopeQuiz: QuizQuestion[] = [
  {
    question: "What does 'this' keyword refer to in an arrow function?",
    options: ["The calling object", "The global window object", "Lexical this", "It is always undefined"],
    correctAnswerIndex: 2,
    difficulty: 'Medium',
    explanation: "Arrow functions do not have their own `this` context. They inherit `this` from the parent scope at the time they are defined (lexical scoping)."
  },
  {
    question: "What is a closure in JavaScript?",
    options: ["Function capturing outer scope.", "A way to lock variables from change.", "A special type of loop.", "A built-in object for dates."],
    correctAnswerIndex: 0,
    difficulty: 'Hard',
    explanation: "A closure gives you access to an outer function's scope from an inner function. This is a fundamental and powerful concept in JavaScript."
  },
  {
    question: "What is hoisting in JavaScript?",
    options: ["Declarations are hoisted.", "Optimization by the engine.", "A way to import modules.", "A pattern for object creation."],
    correctAnswerIndex: 0,
    difficulty: 'Medium',
    explanation: "Hoisting means that `var` variable and function declarations are processed before any code is executed, but assignments are not. `let` and `const` are hoisted but not initialized, creating a 'temporal dead zone'."
  },
  {
    question: "What does the `bind()` method do?",
    options: ["Calls a function immediately with this.", "Returns a function bound to this.", "Attaches a function to an event.", "Connects two objects."],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: "`bind()` creates a new function with a permanently bound `this` value. It's useful for passing methods as callbacks."
  },
  {
    question: "What is the purpose of a constructor function?",
    options: ["Construct HTML elements.", "Create and initialize objects.", "Connect to a database.", "Handle user input."],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: "A constructor function is a blueprint for creating objects. The `new` keyword is used to create new instances from a constructor."
  },
  {
    question: "What is a higher-order function?",
    options: ["A more complex function.", "Takes or returns functions.", "Declared at the top of scope.", "Returns an object."],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: "Functions like `map`, `filter`, and `reduce` are higher-order functions because they take a function as an argument."
  },
  {
    question: "What is a pure function?",
    options: ["Uses only primitives.", "No side effects; same input → same output.", "Written in vanilla JavaScript.", "Has no arguments."],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: "Pure functions are predictable. Given the same input, they always return the same output and don't modify any external state. This makes them easier to test and reason about."
  },
  {
    question: "What is the `arguments` object in a function?",
    options: ["An array of all arguments.", "Array-like object of arguments.", "A special keyword for parameters.", "Deprecated and removed from JS."],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: "`arguments` is an array-like object, not a true array. It doesn't have methods like `map` or `forEach`. It is not available in arrow functions."
  },
  {
    question: "Arrow functions can be used as constructor functions.",
    options: [
      "This statement is true.",
      "This statement is false."
    ],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: "Arrow functions cannot be used as constructors and will throw an error when used with `new`. They also don't have a `prototype` property."
  },
  {
    question: "What is the `this` value in a function called in strict mode?",
    options: ["The global object (window)", "The object that called the function", "undefined", "null"],
    correctAnswerIndex: 2,
    difficulty: 'Medium',
    explanation: "In strict mode, if `this` is not set by the call, it remains `undefined`. In non-strict mode, it would default to the global object (window)."
  },
  {
    question: "What does the `...` rest parameter do in a function signature?",
    options: ["Collects remaining args into an array.", "Spreads arguments into variables.", "Indicates recursion.", "A syntax error."],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "The rest parameter syntax `...` collects all remaining arguments passed to a function into a single array."
  },
  {
    question: "Which of the following is a correct way to define a default parameter for a function?",
    options: ["`function foo(a=1) {}`", "`function foo(a || 1) {}`", "`function foo(a ? a : 1) {}`", "`function foo(a: 1) {}`"],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "ES6 introduced default function parameters, allowing you to initialize formal parameters with default values if no value or `undefined` is passed."
  },
  {
    question: "What is the value of `this` in a method of an object?",
    options: ["The global object", "The object itself", "undefined", "The function's prototype"],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: "When a function is called as a method of an object, its `this` is set to the object the method is called on (the object before the dot)."
  },
  {
    question: "What does the `new` keyword do?",
    options: ["Creates a new scope.", "Creates an instance from a constructor/class.", "Declares a new variable.", "Initializes a new Promise."],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: "The `new` keyword creates a blank, plain JavaScript object, sets its `[[Prototype]]`, binds `this` to the new object, and returns it."
  },
  {
    question: "What is the output of `(function(){ return typeof arguments; })();`?",
    options: ["'array'", "'object'", "'arguments'", "'undefined'"],
    correctAnswerIndex: 1,
    difficulty: 'Hard',
    explanation: "Even though `arguments` is array-like, it is not a true array. Its `typeof` is 'object'."
  },
  {
    question: "What does 'use strict' directive do?",
    options: ["Enforces strict parsing and errors.", "Allows newer JavaScript features.", "Makes the code run faster.", "Prevents use of external libraries."],
    correctAnswerIndex: 0,
    difficulty: 'Medium',
    explanation: "'use strict' enables Strict Mode, which changes previously accepted 'bad syntax' into real errors and makes JavaScript more secure."
  },
];
