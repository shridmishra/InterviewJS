import { QuizQuestion } from './types';

export const es6FeaturesQuiz: QuizQuestion[] = [
  {
    question: "What are template literals?",
    options: ["Multi-line strings and interpolation.", "A special type of comment.", "Functions used as templates.", "A method for creating HTML templates."],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "Template literals (using backticks ``) allow for easier string interpolation with `${expression}` and multi-line strings."
  },
  {
    question: "Which method is used to get the character at a specific index in a string?",
    options: ["`charAt()`", "`getChar()`", "`indexOf()`", "`slice()`"],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "The `charAt()` method returns a new string consisting of the single character at the specified index in a string."
  },
  {
    question: "What is the correct syntax for a 'for...of' loop?",
    options: ["`for (let i of array)`", "`for (let i in array)`", "`for (i=0; i<array.length; i++)`", "`array.forEach(i => ...)`"],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "The `for...of` loop is the modern way to iterate over the values of iterable objects like arrays, strings, maps, and sets."
  },
  {
    question: "What is the difference between `for...in` and `for...of`?",
    options: ["for...in: keys; for...of: values.", "for...of is for objects; for...in for arrays.", "They are the same.", "for...in is faster."],
    correctAnswerIndex: 0,
    difficulty: 'Medium',
    explanation: "`for...in` is for iterating over object keys. `for...of` is for iterating over the values of iterable objects (like arrays). Don't use `for...in` for arrays."
  },
  {
    question: "What is destructuring assignment?",
    options: ["Unpack arrays/objects into variables.", "A method to destroy objects.", "A way to structure code.", "A debugging technique."],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "Destructuring allows you to extract data from arrays or objects into distinct variables using a concise syntax like `const { x, y } = obj` or `const [a, b] = array`."
  },
  {
    question: "What does the spread operator (...) do?",
    options: ["Expands an iterable into elements.", "Creates a range of numbers.", "Concatenates strings.", "Spreads code across files."],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "The spread operator `...` expands an iterable (like an array) into individual elements. It's useful for copying arrays, combining arrays, and passing array elements as function arguments."
  },
  {
    question: "What is the purpose of default parameters in ES6?",
    options: ["Default values for parameters.", "Make parameters mandatory.", "Optimize performance.", "Validate parameters."],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "Default parameters allow you to initialize parameters with default values if no value or `undefined` is passed: `function foo(a = 1) { ... }`."
  },
  {
    question: "What are arrow functions?",
    options: ["Short syntax; lexical this.", "Functions that point to values.", "Deprecated function syntax.", "Functions that only return values."],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "Arrow functions (`() => {}`) provide a shorter syntax and don't have their own `this` binding - they inherit `this` from the enclosing scope."
  },
  {
    question: "What does `Object.assign()` do?",
    options: ["Copy properties into target.", "Assign values to variables.", "Create object assignments.", "Validate object properties."],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "`Object.assign(target, ...sources)` copies all enumerable own properties from source objects to the target object and returns the target object."
  },
  {
    question: "What is a Symbol in ES6?",
    options: ["Unique immutable primitive for keys.", "A mathematical symbol.", "A special character.", "A deprecated feature."],
    correctAnswerIndex: 0,
    difficulty: 'Medium',
    explanation: "Symbols are unique identifiers. Each Symbol() call creates a unique symbol, even with the same description. They're often used to add unique property keys to objects."
  },
  {
    question: "What is the purpose of `class` keyword in ES6?",
    options: ["Sugar over constructor/prototype.", "Creates CSS classes.", "Defines object types.", "Groups related functions."],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "The `class` syntax is syntactic sugar over JavaScript's prototype-based inheritance, making it easier to create objects and handle inheritance in a more familiar way."
  },
  {
    question: "What does `let` provide that `var` doesn't?",
    options: ["Block scope", "Function scope", "Global scope", "Module scope"],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "`let` provides block-level scope (confined to the {} block), while `var` has function scope. This helps prevent variable leaking and makes code more predictable."
  },
  {
    question: "What is a generator function?",
    options: ["Pauses/resumes via yield.", "Generates random numbers.", "Creates other functions.", "An automatic function executor."],
    correctAnswerIndex: 0,
    difficulty: 'Hard',
    explanation: "Generator functions (function*) can pause execution using `yield` and resume later. They return an iterator object and are useful for creating custom iterables and async flows."
  },
  {
    question: "What does `Promise` represent in ES6?",
    options: ["Eventual result of async work.", "A guarantee that code will execute.", "A callback function.", "A synchronous operation."],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "A Promise is an object that represents a value that may not be available yet but will be resolved in the future, either successfully (fulfilled) or unsuccessfully (rejected)."
  },
  {
    question: "What is the purpose of `Map` in ES6?",
    options: ["Key-value pairs with any key type.", "A method to transform arrays.", "A geographical map.", "A function mapping tool."],
    correctAnswerIndex: 0,
    difficulty: 'Medium',
    explanation: "Unlike objects, Map allows keys of any type (objects, functions, primitives) and maintains insertion order. It also has better performance for frequent additions/removals."
  },
  {
    question: "What is the purpose of `Set` in ES6?",
    options: ["Collection of unique values.", "A method to set variables.", "A configuration object.", "A validation tool."],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "Set is a collection that only stores unique values. It automatically removes duplicates and provides methods like add(), delete(), and has()."
  },
  {
    question: "What does the rest parameter (...args) do?",
    options: ["Collects remaining args into an array.", "Pauses function execution.", "Spreads arguments.", "Creates optional parameters."],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "The rest parameter syntax allows a function to accept an indefinite number of arguments as an array: `function sum(...numbers) { ... }`."
  },
  {
    question: "What is module import/export in ES6?",
    options: ["Standard module system for code.", "A way to import data from databases.", "A compression technique.", "A debugging feature."],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "ES6 modules use `import` and `export` keywords to share code between files, providing better code organization and enabling tree-shaking for optimization."
  },
];
