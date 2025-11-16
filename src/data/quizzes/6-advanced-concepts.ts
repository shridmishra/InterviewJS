import { QuizQuestion } from './types';

export const advancedConceptsQuiz: QuizQuestion[] = [
  {
    question: "What is prototypal inheritance?",
    options: ["A method for creating classes.", "Objects inherit from objects.", "A way to define private members in an object.", "A library for inheritance."],
    correctAnswerIndex: 1,
    difficulty: 'Hard',
    explanation: "JavaScript objects have a special `[[Prototype]]` property. When trying to access a property on an object, if it's not found, the JavaScript engine looks at the object's prototype, then the prototype's prototype, and so on."
  },
  {
    question: "What does the `instanceof` operator do?",
    options: ["Checks prototype chain membership.", "Compares two objects for equality.", "Returns the type of an object.", "Creates a new instance of an object."],
    correctAnswerIndex: 0,
    difficulty: 'Medium',
    explanation: "The `instanceof` operator tests to see if the `prototype` property of a constructor appears anywhere in the prototype chain of an object."
  },
  {
    question: "What is `Symbol` in JavaScript?",
    options: [
      "A special type of string used as a key.",
      "A unique and immutable primitive.",
      "A way to simulate private properties.",
      "Both B and C."
    ],
    correctAnswerIndex: 3,
    difficulty: 'Hard',
    explanation: "Symbols are a unique and immutable primitive data type introduced in ES6. They are often used as unique property keys for objects to avoid name collisions."
  },
  {
    question: "What is the `Proxy` object used for?",
    options: ["To create a proxy server.", "Intercept fundamental operations.", "To manage network requests.", "To create secure objects."],
    correctAnswerIndex: 1,
    difficulty: 'Hard',
    explanation: "The `Proxy` object allows you to create an object that can be used in place of the original object, but which may redefine fundamental operations like getting, setting, and defining properties."
  },
  {
    question: "What is `WeakMap`?",
    options: ["A map that is not implemented correctly.", "Map with weakly held object keys.", "A map that can only store a small number of items.", "A map that only accepts strings as keys."],
    correctAnswerIndex: 1,
    difficulty: 'Hard',
    explanation: "In a `WeakMap`, the keys are weakly referenced, which means if there are no other references to a key object, it can be garbage collected. This is useful for memory management."
  },
  {
    question: "What is a 'Web Worker'?",
    options: ["A JavaScript library for networking.", "Runs scripts in a background thread.", "A security feature of modern browsers.", "A type of DOM element."],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: "Web Workers allow you to run a script on a background thread separate from the main execution thread of a web application. This is useful for long-running tasks that shouldn't block the UI."
  },
  {
    question: "What is the difference between `__proto__` and `prototype`?",
    options: ["__proto__: instance link; prototype: on constructors.", "They are the same.", "`prototype` is deprecated.", "`__proto__` is for classes only."],
    correctAnswerIndex: 0,
    difficulty: 'Hard',
    explanation: "`prototype` is a property of constructor functions that becomes the `__proto__` of instances created with `new`. `__proto__` is the actual object that is used in the prototype chain lookup."
  },
  {
    question: "What is memoization?",
    options: ["Cache results by inputs.", "A way to memorize code.", "A debugging technique.", "A memory allocation strategy."],
    correctAnswerIndex: 0,
    difficulty: 'Medium',
    explanation: "Memoization stores the results of expensive function calls and returns the cached result when the same inputs occur again, improving performance for recursive or repeated operations."
  },
  {
    question: "What is the difference between `call()`, `apply()`, and `bind()`?",
    options: ["call/apply invoke; bind returns bound fn.", "They are the same.", "`bind()` is deprecated.", "`call()` is for classes only."],
    correctAnswerIndex: 0,
    difficulty: 'Hard',
    explanation: "`call(thisArg, arg1, arg2, ...)` and `apply(thisArg, [args])` invoke immediately. `bind(thisArg)` returns a new function with bound `this` that can be called later."
  },
  {
    question: "What is the Temporal Dead Zone (TDZ)?",
    options: ["Pre-declaration access throws (TDZ).", "A timezone handling feature.", "A memory leak.", "A deprecated feature."],
    correctAnswerIndex: 0,
    difficulty: 'Hard',
    explanation: "Variables declared with `let` and `const` are hoisted but not initialized. Accessing them before their declaration line results in a ReferenceError. This period is the TDZ."
  },
  {
    question: "What is currying in JavaScript?",
    options: ["f(a,b,c) -> f(a)(b)(c).", "A way to optimize code.", "A debugging technique.", "A loop optimization."],
    correctAnswerIndex: 0,
    difficulty: 'Hard',
    explanation: "Currying converts `f(a, b, c)` into `f(a)(b)(c)`. Each function takes one argument and returns another function until all arguments are provided, then the result is computed."
  },
  {
    question: "What is the purpose of `Object.create()`?",
    options: ["Create object with specified prototype.", "Copy an object.", "Validate object creation.", "Freeze an object."],
    correctAnswerIndex: 0,
    difficulty: 'Medium',
    explanation: "`Object.create(proto)` creates a new object with the specified prototype. This is useful for implementing inheritance without using constructors or classes."
  },
  {
    question: "What is a WeakSet?",
    options: ["Holds objects weakly.", "A set with limited capacity.", "A deprecated collection.", "Stores only weak references."],
    correctAnswerIndex: 0,
    difficulty: 'Hard',
    explanation: "WeakSet is similar to Set but only stores objects (not primitives) and holds them weakly. If no other references to an object exist, it can be garbage collected from the WeakSet."
  },
  {
    question: "What is the difference between shallow copy and deep copy?",
    options: ["Shallow: top-level; Deep: recursive.", "They are the same.", "Shallow is faster.", "Deep copy is deprecated."],
    correctAnswerIndex: 0,
    difficulty: 'Medium',
    explanation: "Shallow copy (`{...obj}` or `Object.assign()`) only copies top-level properties. Nested objects are still referenced. Deep copy recursively copies all levels, creating independent objects."
  },
  {
    question: "What is the `Reflect` API used for?",
    options: ["API for interceptable operations.", "Reflects object properties.", "Creates mirror objects.", "A debugging tool."],
    correctAnswerIndex: 0,
    difficulty: 'Hard',
    explanation: "`Reflect` is a built-in object that provides methods for interceptable operations (like property access, assignment). It's often used with Proxy to properly forward operations."
  },
];
