export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  explanation: string;
}

export const quizData: QuizQuestion[] = [
  {
    question: "What does 'typeof' operator in JavaScript return for 'null'?",
    options: ["'object'", "'null'", "'undefined'", "'string'"],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "This is a well-known quirk in JavaScript. Due to historical reasons, `typeof null` returns 'object', not 'null'."
  },
  {
    question: "Which of the following is NOT a primitive data type in JavaScript?",
    options: ["Number", "String", "Boolean", "Object"],
    correctAnswerIndex: 3,
    difficulty: 'Easy',
    explanation: "Primitives in JavaScript are Number, String, Boolean, null, undefined, Symbol, and BigInt. Object is a complex data type."
  },
  {
    question: "What is the result of '2' + 2 in JavaScript?",
    options: ["'22'", "4", "TypeError", "NaN"],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "The `+` operator performs string concatenation when one of the operands is a string. The number 2 is coerced into a string '2'."
  },
  {
    question: "What does the '===' operator check for?",
    options: ["Value equality only", "Type equality only", "Both value and type equality", "Reference equality"],
    correctAnswerIndex: 2,
    difficulty: 'Easy',
    explanation: "The strict equality operator `===` checks for both value and type equality without performing any type coercion."
  },
  {
    question: "How do you declare a variable that cannot be reassigned?",
    options: ["let", "var", "const", "static"],
    correctAnswerIndex: 2,
    difficulty: 'Easy',
    explanation: "`const` declares a block-scoped variable whose value cannot be changed through reassignment and it can't be redeclared."
  },
  {
    question: "What does 'this' keyword refer to in an arrow function?",
    options: ["The object that called the function", "The global window object", "The lexical scope's 'this'", "It is always undefined"],
    correctAnswerIndex: 2,
    difficulty: 'Medium',
    explanation: "Arrow functions do not have their own `this` context. They inherit `this` from the parent scope at the time they are defined (lexical scoping)."
  },
  {
    question: "Which method is used to add a new element to the end of an array?",
    options: ["array.push()", "array.pop()", "array.shift()", "array.unshift()"],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "`push()` adds one or more elements to the end of an array and returns the new length of the array."
  },
  {
    question: "What is a closure in JavaScript?",
    options: ["A function having access to the parent scope, even after the parent function has closed.", "A way to lock variables from being changed.", "A special type of loop.", "A built-in object for handling dates."],
    correctAnswerIndex: 0,
    difficulty: 'Hard',
    explanation: "A closure gives you access to an outer function’s scope from an inner function. This is a fundamental and powerful concept in JavaScript."
  },
  {
    question: "What will `console.log(0.1 + 0.2 === 0.3)` output?",
    options: ["true", "false", "undefined", "TypeError"],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: "Due to floating-point precision issues in binary, 0.1 + 0.2 results in a number like 0.30000000000000004, which is not strictly equal to 0.3."
  },
  {
    question: "How do you create a promise in JavaScript?",
    options: ["new Promise(function(resolve, reject){...})", "Promise.create(function(){...})", "makePromise(function(){...})", "Promise(function(resolve, reject){...})"],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "The `Promise` constructor takes a function (an 'executor') with two parameters, `resolve` and `reject`, to create a new promise."
  },
  {
    question: "What is the purpose of the 'async' keyword before a function?",
    options: ["It makes the function run on a separate thread.", "It automatically catches all errors.", "It makes the function return a Promise.", "It pauses the execution of all other code."],
    correctAnswerIndex: 2,
    difficulty: 'Medium',
    explanation: "An `async` function implicitly returns a promise. If the function returns a value, the promise will be resolved with that value."
  },
  {
    question: "Which method can be used to iterate over all enumerable properties of an object?",
    options: ["for...in loop", "for...of loop", ".forEach()", "Both A and C"],
    correctAnswerIndex: 0,
    difficulty: 'Medium',
    explanation: "The `for...in` statement iterates over all enumerable properties of an object, including inherited ones. `for...of` is for iterables like arrays and strings."
  },
  {
    question: "What does `Array.prototype.map()` return?",
    options: ["A new array with the results of calling a provided function on every element.", "The original array, modified in place.", "The first element that passes the test.", "A boolean value."],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "`map()` creates a new array by calling a function for every array element. It does not change the original array."
  },
  {
    question: "How do you handle errors in a promise chain?",
    options: ["Using a .catch() block", "Using a try...catch block inside .then()", "Using a .finally() block", "Both A and B"],
    correctAnswerIndex: 0,
    difficulty: 'Medium',
    explanation: "The `.catch()` method is the primary way to handle promise rejections. It catches any error that occurred in the promise chain before it."
  },
  {
    question: "What is event delegation?",
    options: ["Assigning event handling to a child element.", "A pattern of attaching a single event listener to a parent element to manage events for all of its children.", "A way to create custom events.", "Delaying an event handler's execution."],
    correctAnswerIndex: 1,
    difficulty: 'Hard',
    explanation: "Event delegation is a powerful technique that leverages event bubbling. You listen for events on a parent element instead of on every child, improving performance and simplifying code."
  },
  {
    question: "What is the difference between `let` and `var`?",
    options: ["`let` is function-scoped, `var` is block-scoped.", "`let` is block-scoped, `var` is function-scoped.", "There is no difference.", "`let` can be redeclared, `var` cannot."],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: "`let` and `const` have block scope (they are confined to the block `{}` they are defined in), while `var` has function scope."
  },
  {
    question: "What does the spread operator (...) do for arrays?",
    options: ["It joins multiple arrays into one.", "It expands an iterable into individual elements.", "It creates a shallow copy of an array.", "Both B and C."],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: "The spread syntax `...` allows an iterable such as an array to be expanded in places where zero or more arguments or elements are expected."
  },
  {
    question: "What is JSON?",
    options: ["A JavaScript function.", "A JavaScript object.", "A lightweight data-interchange format.", "A JavaScript styling language."],
    correctAnswerIndex: 2,
    difficulty: 'Easy',
    explanation: "JSON (JavaScript Object Notation) is a text-based format for representing structured data based on JavaScript object syntax. It's commonly used for transmitting data in web applications."
  },
  {
    question: "Which method converts a JSON string to a JavaScript object?",
    options: ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.convert()"],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "`JSON.parse()` is used to parse a JSON string, constructing the JavaScript value or object described by the string."
  },
  {
    question: "What does the 'use strict' directive do?",
    options: ["Enforces stricter parsing and error handling in your code.", "Allows the use of newer JavaScript features.", "Makes the code run faster.", "Prevents the use of external libraries."],
    correctAnswerIndex: 0,
    difficulty: 'Medium',
    explanation: "'use strict' enables Strict Mode, which changes previously accepted 'bad syntax' into real errors and makes JavaScript more secure."
  },
  {
    question: "What is hoisting in JavaScript?",
    options: ["A mechanism where variables and function declarations are moved to the top of their containing scope before code execution.", "The process of optimizing code by the JavaScript engine.", "A way to import modules.", "A design pattern for creating objects."],
    correctAnswerIndex: 0,
    difficulty: 'Medium',
    explanation: "Hoisting means that `var` variable and function declarations are processed before any code is executed, but assignments are not. `let` and `const` are hoisted but not initialized, creating a 'temporal dead zone'."
  },
  {
    question: "What is the output of `typeof NaN`?",
    options: ["'number'", "'NaN'", "'undefined'", "'object'"],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "NaN (Not-a-Number) is technically a numeric type. It represents a value that is not a legal number."
  },
  {
    question: "How do you check if a variable is an array?",
    options: ["typeof arr === 'array'", "arr instanceof Array", "Array.isArray(arr)", "Both B and C"],
    correctAnswerIndex: 3,
    difficulty: 'Easy',
    explanation: "`Array.isArray()` is the most reliable way. `instanceof Array` can fail across different realms (e.g., iframes)."
  },
  {
    question: "What does the `Array.prototype.reduce()` method do?",
    options: ["Executes a reducer function on each element of the array, resulting in a single output value.", "Reduces the number of elements in an array.", "Creates a new array with filtered elements.", "Reverses the array."],
    correctAnswerIndex: 0,
    difficulty: 'Medium',
    explanation: "`reduce()` is a powerful method for 'reducing' an array to a single value, like summing all numbers or transforming it into an object."
  },
  {
    question: "What is the event loop?",
    options: ["A JavaScript feature for creating loops.", "A design pattern for handling events.", "A mechanism that allows Node.js to perform non-blocking I/O operations by offloading operations to the system kernel whenever possible.", "A way to iterate over event listeners."],
    correctAnswerIndex: 2,
    difficulty: 'Hard',
    explanation: "The event loop is what allows JavaScript to use a single thread to handle concurrency. It continuously checks the message queue for tasks and executes them."
  },
  {
    question: "What is the difference between `null` and `undefined`?",
    options: ["They are interchangeable.", "`null` is an assigned value representing no value; `undefined` means a variable has been declared but not assigned a value.", "`undefined` is an object, `null` is a primitive.", "There is no `null` in JavaScript."],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: "`undefined` is the default value of a variable that has not been assigned a value. `null` is an intentional 'nothing' value that you can assign."
  },
  {
    question: "Which of these is a valid way to create an object?",
    options: ["`const obj = {};`", "`const obj = new Object();`", "`const obj = Object.create(null);`", "All of the above"],
    correctAnswerIndex: 3,
    difficulty: 'Easy',
    explanation: "All three are valid ways to create an object. The object literal syntax `{}` is the most common and concise."
  },
  {
    question: "What does the `bind()` method do?",
    options: ["Immediately calls a function with a given 'this' value.", "Creates a new function that, when called, has its 'this' keyword set to the provided value.", "Attaches a function to an event.", "Connects two objects."],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: "`bind()` creates a new function with a permanently bound `this` value. It's useful for passing methods as callbacks."
  },
  {
    question: "What are template literals?",
    options: ["A way to create multi-line strings and embed expressions.", "A special type of comment.", "Functions used as templates.", "A method for creating HTML templates."],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "Template literals (using backticks ``) allow for easier string interpolation with `${expression}` and multi-line strings."
  },
  {
    question: "How do you get the number of properties in an object?",
    options: ["`obj.length`", "`Object.keys(obj).length`", "`obj.size()`", "`Object.count(obj)`"],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: "`Object.keys(obj)` returns an array of an object's own enumerable property names, so you can get the count from its length."
  },
  {
    question: "What is the purpose of a constructor function?",
    options: ["To construct HTML elements.", "To create and initialize objects of a certain type.", "To connect to a database.", "To handle user input."],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: "A constructor function is a blueprint for creating objects. The `new` keyword is used to create new instances from a constructor."
  },
  {
    question: "Which method removes the last element from an array and returns that element?",
    options: ["shift()", "unshift()", "pop()", "push()"],
    correctAnswerIndex: 2,
    difficulty: 'Easy',
    explanation: "`pop()` removes and returns the last element, modifying the original array. `shift()` does the same for the first element."
  },
  {
    question: "What does `Promise.all()` do?",
    options: ["Returns a single Promise that resolves when all of the promises in the iterable argument have resolved.", "Returns the first promise that resolves.", "Checks if all promises are valid.", "Chains promises together sequentially."],
    correctAnswerIndex: 0,
    difficulty: 'Medium',
    explanation: "`Promise.all()` is useful for aggregating the results of multiple promises. It rejects if any of the promises reject."
  },
  {
    question: "What is destructuring assignment?",
    options: ["A way to break down complex data structures.", "A syntax that makes it possible to unpack values from arrays, or properties from objects, into distinct variables.", "A method for destroying objects.", "A memory management technique."],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: "Destructuring provides a concise way to extract data from arrays and objects into variables, making code cleaner and more readable."
  },
  {
    question: "What is the DOM?",
    options: ["Data Object Model", "Document Object Model", "Dynamic Object Model", "Distributed Object Model"],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: "The DOM is a programming interface for web documents. It represents the page so that programs can change the document structure, style, and content."
  },
  {
    question: "How do you select an element by its ID in JavaScript?",
    options: ["`document.querySelector('#id')`", "`document.getElementById('id')`", "`document.getElement('id')`", "Both A and B"],
    correctAnswerIndex: 3,
    difficulty: 'Easy',
    explanation: "`getElementById` is specifically for IDs and is often faster. `querySelector` is more versatile and can use any CSS selector."
  },
  {
    question: "What is the difference between `event.stopPropagation()` and `event.preventDefault()`?",
    options: ["They are the same.", "`stopPropagation` stops the event from bubbling up, `preventDefault` stops the default browser action.", "`preventDefault` stops bubbling, `stopPropagation` stops the default action.", "There is no `stopPropagation` method."],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: "`preventDefault()` stops the browser's default behavior (e.g., a link navigating). `stopPropagation()` prevents parent elements from seeing the event (event bubbling)."
  },
  {
    question: "What is a pure function?",
    options: ["A function that only uses primitive types.", "A function that has no side effects and its return value is the same for the same arguments.", "A function written in vanilla JavaScript.", "A function with no arguments."],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: "Pure functions are predictable. Given the same input, they always return the same output and don't modify any external state. This makes them easier to test and reason about."
  },
  {
    question: "What does the `finally` block in a Promise do?",
    options: ["It executes only when the promise is resolved.", "It executes only when the promise is rejected.", "It executes when the promise is settled, regardless of its outcome.", "It finalizes the promise object for garbage collection."],
    correctAnswerIndex: 2,
    difficulty: 'Medium',
    explanation: "The `.finally()` method is used for code that should run regardless of whether the promise was fulfilled or rejected, such as cleanup operations."
  },
  {
    question: "What is the result of `!!'hello'`?",
    options: ["true", "false", "'hello'", "SyntaxError"],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "The double negation operator `!!` coerces a value to a boolean. Any non-empty string is 'truthy', so `!!'hello'` becomes `true`."
  },
  {
    question: "What is a higher-order function?",
    options: ["A function that is more complex than others.", "A function that operates on other functions, either by taking them as arguments or by returning them.", "A function that is declared at the top of the scope.", "A function that returns an object."],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: "Functions like `map`, `filter`, and `reduce` are higher-order functions because they take a function as an argument."
  },
  {
    question: "What does the `slice()` method do on an array?",
    options: ["It modifies the array in place.", "It returns a shallow copy of a portion of an array into a new array object.", "It adds elements to an array.", "It sorts the array."],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: "`slice()` is non-destructive. It creates a new array containing a portion of the original array, which is left unchanged."
  },
  {
    question: "What is the difference between `slice()` and `splice()`?",
    options: ["`slice()` returns a new array, `splice()` modifies the original array.", "`splice()` returns a new array, `slice()` modifies the original array.", "They are aliases for the same method.", "`slice()` is for strings, `splice()` is for arrays."],
    correctAnswerIndex: 0,
    difficulty: 'Medium',
    explanation: "`slice()` creates a new array without changing the original. `splice()` changes the contents of an array by removing or replacing existing elements and/or adding new elements in place."
  },
  {
    question: "Which of the following is an example of a falsy value?",
    options: ["'0'", "[]", "{}", "0"],
    correctAnswerIndex: 3,
    difficulty: 'Easy',
    explanation: "In JavaScript, there are only a few falsy values: `false`, `0`, `''` (empty string), `null`, `undefined`, and `NaN`. Everything else is truthy, including `'0'`, `[]`, and `{}`."
  },
  {
    question: "What does `Object.freeze()` do?",
    options: ["It prevents new properties from being added to an object, and prevents existing properties from being removed or modified.", "It deletes an object.", "It creates a read-only copy of an object.", "It serializes an object."],
    correctAnswerIndex: 0,
    difficulty: 'Hard',
    explanation: "`Object.freeze()` makes an object immutable. It's a shallow freeze, meaning properties that are objects themselves can still be modified."
  },
  {
    question: "What is the purpose of the `Set` object?",
    options: ["To store a collection of key-value pairs.", "To store a collection of unique values of any type.", "To define a set of rules for an object.", "To manage application state."],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: "A `Set` automatically handles uniqueness. It's useful for tasks like removing duplicate elements from an array."
  },
  {
    question: "How do you write a single-line comment in JavaScript?",
    options: ["// comment", "/* comment */", "<!-- comment -->", "## comment"],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "`//` is used for single-line comments, and `/* ... */` is used for multi-line comments."
  },
  {
    question: "What does `async/await` help with?",
    options: ["Making asynchronous code look and behave more like synchronous code.", "Speeding up code execution.", "Handling CPU-intensive tasks.", "Creating web workers."],
    correctAnswerIndex: 0,
    difficulty: 'Medium',
    explanation: "`async/await` is syntactic sugar built on top of promises, making asynchronous code easier to write and read by avoiding promise chain nesting."
  },
  {
    question: "What is the `this` value in a function called in strict mode?",
    options: ["The global object (window)", "The object that called the function", "undefined", "null"],
    correctAnswerIndex: 2,
    difficulty: 'Medium',
    explanation: "In strict mode, if `this` is not set by the call, it remains `undefined`. In non-strict mode, it would default to the global object (window)."
  },
  {
    question: "What is the purpose of the `Map` object?",
    options: ["To store a collection of unique values.", "To iterate over an array's elements.", "To hold key-value pairs and remember the original insertion order of the keys.", "To perform mathematical operations."],
    correctAnswerIndex: 2,
    difficulty: 'Medium',
    explanation: "`Map` is similar to an object, but it allows keys of any type (not just strings/symbols) and maintains insertion order."
  },
  {
    question: "What is the output of `[] + []` in JavaScript?",
    options: ["[]", "''", "0", "TypeError"],
    correctAnswerIndex: 1,
    difficulty: 'Hard',
    explanation: "When using the `+` operator, JavaScript converts the arrays to strings. `[].toString()` results in `''`, so `'' + ''` is `''`."
  },
  {
    question: "What is the correct way to check if an object has a specific property?",
    options: ["`obj.prop !== undefined`", "`obj.hasOwnProperty('prop')`", "`'prop' in obj`", "All of the above"],
    correctAnswerIndex: 3,
    difficulty: 'Medium',
    explanation: "`hasOwnProperty` checks for own properties, while the `in` operator checks for own and inherited properties. Checking for `undefined` can be unreliable if the property exists but its value is `undefined`."
  },
  {
    question: "What is prototypal inheritance?",
    options: ["A method for creating classes.", "A feature in JavaScript where objects can inherit properties and methods from other objects.", "A way to define private members in an object.", "A library for inheritance."],
    correctAnswerIndex: 1,
    difficulty: 'Hard',
    explanation: "JavaScript objects have a special `[[Prototype]]` property. When trying to access a property on an object, if it's not found, the JavaScript engine looks at the object's prototype, then the prototype's prototype, and so on."
  },
  {
    question: "What does the `...` rest parameter do in a function signature?",
    options: ["It allows a function to accept an indefinite number of arguments as an array.", "It spreads the arguments into individual variables.", "It indicates that the function is recursive.", "It's a syntax error."],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "The rest parameter syntax `...` collects all remaining arguments passed to a function into a single array."
  },
  {
    question: "Which method is used to schedule a function to run after a certain amount of time?",
    options: ["`setInterval()`", "`setTimeout()`", "`requestAnimationFrame()`", "`runAfter()`"],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: "`setTimeout` runs a function once after a specified delay. `setInterval` runs a function repeatedly at a specified interval."
  },
  {
    question: "What is CORS?",
    options: ["A JavaScript framework.", "A styling methodology.", "Cross-Origin Resource Sharing, a mechanism that allows restricted resources on a web page to be requested from another domain.", "A type of JavaScript error."],
    correctAnswerIndex: 2,
    difficulty: 'Medium',
    explanation: "CORS is a browser security feature that restricts cross-origin HTTP requests. Servers can use specific headers to tell browsers which origins are permitted to access their resources."
  },
  {
    question: "Which hook is used to perform side effects in a functional React component?",
    options: ["`useState`", "`useEffect`", "`useContext`", "`useReducer`"],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: "`useEffect` is used for side effects like data fetching, setting up a subscription, or manually changing the DOM in React components."
  },
  {
    question: "How do you prevent a form from submitting in JavaScript?",
    options: ["Return `false` from the submit handler.", "Call `event.preventDefault()` on the submit event.", "Call `event.stopPropagation()` on the submit event.", "Both A and B"],
    correctAnswerIndex: 3,
    difficulty: 'Easy',
    explanation: "Calling `event.preventDefault()` is the modern and standard way. Returning `false` from a handler also works in many cases but `preventDefault` is more explicit."
  },
  {
    question: "What is the output of `typeof []`?",
    options: ["'array'", "'object'", "'list'", "'undefined'"],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: "In JavaScript, arrays are a special type of object, so `typeof` returns 'object'."
  },
  {
    question: "What will `[1, 2, 3].map(parseInt)` return?",
    options: ["[1, 2, 3]", "[1, NaN, NaN]", "[1, 0, 1]", "SyntaxError"],
    correctAnswerIndex: 1,
    difficulty: 'Hard',
    explanation: "`map` passes three arguments: `element`, `index`, and `array`. `parseInt` takes two: `string` and `radix`. The calls become `parseInt('1', 0)`, `parseInt('2', 1)`, and `parseInt('3', 2)`, which result in `1`, `NaN`, and `NaN`."
  },
  {
    question: "What is the result of `'5' - 3`?",
    options: ["2", "'53'", "NaN", "'2'"],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "When the `-` operator is used, JavaScript coerces the string '5' into a number, so the expression becomes a standard mathematical subtraction."
  },
  {
    question: "What is the result of `'5' * 3`?",
    options: ["15", "'555'", "NaN", "'15'"],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "Similar to subtraction, the `*` operator triggers numeric conversion, so JavaScript treats the operation as `5 * 3`."
  },
  {
    question: "What does the `new` keyword do?",
    options: ["Creates a new scope.", "Creates a new instance of an object from a constructor function or class.", "Declares a new variable.", "Initializes a new Promise."],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: "The `new` keyword creates a blank, plain JavaScript object, sets its `[[Prototype]]`, binds `this` to the new object, and returns it."
  },
  {
    question: "What is the purpose of the `localStorage` object?",
    options: ["To store data with no expiration date that is private to a domain.", "To store session-level data.", "To communicate with a local server.", "To manage application memory."],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "`localStorage` allows web applications to store key-value pairs in a web browser with no expiration time. The data persists even after the browser is closed."
  },
  {
    question: "What is the difference between `localStorage` and `sessionStorage`?",
    options: ["`localStorage` is faster.", "`sessionStorage` data is cleared when the page session ends.", "`localStorage` can store more data.", "There is no difference."],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: "`localStorage` persists data until explicitly deleted. `sessionStorage` maintains a separate storage area for each given origin that's available for the duration of the page session (as long as the browser is open)."
  },
  {
    question: "Which function is used to parse a string to an integer?",
    options: ["`parseInt()`", "`Number()`", "`toFloat()`", "`Integer.parse()`"],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "`parseInt()` parses a string argument and returns an integer of the specified radix (the base in mathematical numeral systems)."
  },
  {
    question: "Which of the following is a correct way to define a default parameter for a function?",
    options: ["`function foo(a=1) {}`", "`function foo(a || 1) {}`", "`function foo(a ? a : 1) {}`", "`function foo(a: 1) {}`"],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "ES6 introduced default function parameters, allowing you to initialize formal parameters with default values if no value or `undefined` is passed."
  },
  {
    question: "What does the `Array.prototype.find()` method return?",
    options: ["An array of all values that satisfy the condition.", "The index of the first element that satisfies the condition.", "The value of the first element that satisfies the condition.", "A boolean indicating if any element satisfies the condition."],
    correctAnswerIndex: 2,
    difficulty: 'Easy',
    explanation: "`find()` returns the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, `undefined` is returned."
  },
  {
    question: "How can you create a shallow copy of an object?",
    options: ["`const copy = { ...obj };`", "`const copy = Object.assign({}, obj);`", "`const copy = obj;`", "Both A and B"],
    correctAnswerIndex: 3,
    difficulty: 'Easy',
    explanation: "Both the spread syntax `...` and `Object.assign()` create a shallow copy. Assigning with `=` (`const copy = obj;`) only copies the reference, not the object itself."
  },
  {
    question: "What is the `arguments` object in a function?",
    options: ["An array of all arguments passed to the function.", "An array-like object accessible inside functions that contains the values of the arguments passed.", "A special keyword to access function parameters.", "It has been deprecated and removed from JavaScript."],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: "`arguments` is an array-like object, not a true array. It doesn't have methods like `map` or `forEach`. It is not available in arrow functions."
  },
  {
    question: "Arrow functions can be used as constructor functions.",
    options: ["True", "False"],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: "Arrow functions cannot be used as constructors and will throw an error when used with `new`. They also don't have a `prototype` property."
  },
  {
    question: "What is the result of `1 + '2' + 3`?",
    options: ["6", "'123'", "'33'", "15"],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: "Execution goes left-to-right. `1 + '2'` results in string concatenation ('12'). Then `'12' + 3` is also a concatenation, resulting in '123'."
  },
  {
    question: "What is the result of `1 + 2 + '3'`?",
    options: ["6", "'123'", "'33'", "'6'"],
    correctAnswerIndex: 2,
    difficulty: 'Medium',
    explanation: "Execution goes left-to-right. `1 + 2` is a numeric addition (3). Then `3 + '3'` becomes a string concatenation, resulting in '33'."
  },
  {
    question: "Which method is used to get the character at a specific index in a string?",
    options: ["`charAt()`", "`getChar()`", "`indexOf()`", "`slice()`"],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "The `charAt()` method returns a new string consisting of the single character at the specified index in a string."
  },
  {
    question: "What is 'callback hell'?",
    options: ["An error that occurs when a callback is not defined.", "A situation with many nested callbacks, making the code hard to read and maintain.", "A performance issue caused by too many callbacks.", "A security vulnerability related to callbacks."],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: "Callback hell (or the 'pyramid of doom') refers to the anti-pattern of deeply nested callbacks, which can be difficult to manage. Promises and async/await are used to avoid this."
  },
  {
    question: "What is the `global` object in Node.js equivalent to in the browser?",
    options: ["`document`", "`console`", "`window`", "`this`"],
    correctAnswerIndex: 2,
    difficulty: 'Easy',
    explanation: "In browsers, the global scope is the `window` object. In Node.js, the `global` object serves a similar purpose."
  },
  {
    question: "How do you export a function from a module in Node.js (CommonJS)?",
    options: ["`export default myFunction;`", "`module.exports = myFunction;`", "`exports.myFunction = myFunction;`", "Both B and C"],
    correctAnswerIndex: 3,
    difficulty: 'Medium',
    explanation: "`module.exports` is used to export a single value (like a function or object), while `exports` is a reference to `module.exports` and can be used to export multiple named values."
  },
  {
    question: "What does the `instanceof` operator do?",
    options: ["Checks if an object is an instance of a specific class or constructor function.", "Compares two objects for equality.", "Returns the type of an object.", "Creates a new instance of an object."],
    correctAnswerIndex: 0,
    difficulty: 'Medium',
    explanation: "The `instanceof` operator tests to see if the `prototype` property of a constructor appears anywhere in the prototype chain of an object."
  },
  {
    question: "What is the purpose of `Array.prototype.some()`?",
    options: ["To check if some elements are the same.", "To check if at least one element in the array passes the test implemented by the provided function.", "To sum up some of the elements.", "To get a random subset of the array."],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: "`some()` checks if any array elements pass a test. It returns `true` as soon as it finds one, making it efficient."
  },
  {
    question: "What is the purpose of `Array.prototype.every()`?",
    options: ["To execute a function for every element.", "To check if every element in the array passes the test implemented by the provided function.", "To get every element from an array.", "To iterate over every property of the array object."],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: "`every()` tests whether all elements in the array pass the test implemented by the provided function. It returns a boolean value."
  },
  {
    question: "What is the output of `(function(){ return typeof arguments; })();`?",
    options: ["'array'", "'object'", "'arguments'", "'undefined'"],
    correctAnswerIndex: 1,
    difficulty: 'Hard',
    explanation: "Even though `arguments` is array-like, it is not a true array. Its `typeof` is 'object'."
  },
  {
    question: "How do you create a regular expression in JavaScript?",
    options: ["`/pattern/flags`", "`new RegExp('pattern', 'flags')`", "`'pattern'.toRegex()`", "Both A and B"],
    correctAnswerIndex: 3,
    difficulty: 'Easy',
    explanation: "You can create a regular expression using either the literal syntax (`/abc/i`) or the constructor (`new RegExp('abc', 'i')`)."
  },
  {
    question: "What method is used to test for a match in a string against a regex?",
    options: ["`string.match(regex)`", "`regex.test(string)`", "`string.search(regex)`", "All of the above"],
    correctAnswerIndex: 3,
    difficulty: 'Medium',
    explanation: "`test()` returns true/false, `match()` returns an array of matches, and `search()` returns the index of the match. All can be used to test for a match."
  },
  {
    question: "What is a 'polyfill'?",
    options: ["A browser extension.", "A piece of code that provides the functionality of a newer feature on older browsers that do not support it.", "A tool for debugging JavaScript.", "A code formatting standard."],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: "A polyfill 'fills in' the gap by implementing a modern API that an older browser is missing, allowing developers to use new features more broadly."
  },
  {
    question: "What is 'transpiling'?",
    options: ["Converting code from one programming language to another.", "The process of converting source code written in one version of JavaScript into another version (e.g., ES6 to ES5).", "A method for testing code.", "Minifying JavaScript code."],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: "Transpiling, done by tools like Babel, allows developers to write modern JavaScript (ES6+) and have it converted to an older, more widely-supported version (like ES5) for production."
  },
  {
    question: "What does `...` do when used in an object literal?",
    options: ["Indicates an incomplete object.", "Clones the object.", "Copies the properties from one or more objects into a new object.", "It is a syntax error."],
    correctAnswerIndex: 2,
    difficulty: 'Easy',
    explanation: "The spread syntax for objects is used to easily copy the properties from one object into another, which is very useful for creating new objects based on existing ones."
  },
  {
    question: "What is the main purpose of a 'linter' like ESLint?",
    options: ["To format code according to style rules.", "To find and fix problems in your JavaScript code.", "To bundle your code for production.", "To run tests."],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: "A linter statically analyzes your code to quickly find stylistic errors, potential bugs, and code that doesn't adhere to certain style guidelines."
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
    options: ["`for...in` iterates over property names (keys), `for...of` iterates over property values of an iterable.", "`for...of` is for objects, `for...in` is for arrays.", "They are the same.", "`for...in` is faster."],
    correctAnswerIndex: 0,
    difficulty: 'Medium',
    explanation: "`for...in` is for iterating over object keys. `for...of` is for iterating over the values of iterable objects (like arrays). Don't use `for...in` for arrays."
  },
  {
    question: "What is the value of `this` in a method of an object?",
    options: ["The global object", "The object itself", "undefined", "The function's prototype"],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: "When a function is called as a method of an object, its `this` is set to the object the method is called on (the object before the dot)."
  },
  {
    question: "What will `setTimeout(myFunction, 0)` do?",
    options: ["Execute `myFunction` immediately.", "Execute `myFunction` after the current call stack is clear, at the next available opportunity.", "It will not execute `myFunction`.", "Throw an error."],
    correctAnswerIndex: 1,
    difficulty: 'Hard',
    explanation: "`setTimeout` with a delay of 0ms doesn't execute immediately. It places the callback in the message queue to be run in a future tick of the event loop, after the current synchronous code has finished executing."
  },
  {
    question: "What is `Symbol` in JavaScript?",
    options: ["A special type of string.", "A primitive data type whose instances are unique and immutable.", "A way to create private properties in objects.", "Both B and C are common uses."],
    correctAnswerIndex: 3,
    difficulty: 'Hard',
    explanation: "Symbols are a unique and immutable primitive data type introduced in ES6. They are often used as unique property keys for objects to avoid name collisions."
  },
  {
    question: "How do you create a 'getter' in an object literal?",
    options: ["`get property() { ... }`", "`getter property() { ... }`", "`function get.property() { ... }`", "`property: get() { ... }`"],
    correctAnswerIndex: 0,
    difficulty: 'Medium',
    explanation: "The `get` syntax binds an object property to a function that will be called when that property is looked up."
  },
  {
    question: "What is the `Proxy` object used for?",
    options: ["To create a proxy server.", "To define custom behavior for fundamental operations (e.g., property lookup, assignment).", "To manage network requests.", "To create secure objects."],
    correctAnswerIndex: 1,
    difficulty: 'Hard',
    explanation: "The `Proxy` object allows you to create an object that can be used in place of the original object, but which may redefine fundamental operations like getting, setting, and defining properties."
  },
  {
    question: "What is `WeakMap`?",
    options: ["A map that is not implemented correctly.", "A collection of key/value pairs in which the keys are weakly referenced.", "A map that can only store a small number of items.", "A map that only accepts strings as keys."],
    correctAnswerIndex: 1,
    difficulty: 'Hard',
    explanation: "In a `WeakMap`, the keys are weakly referenced, which means if there are no other references to a key object, it can be garbage collected. This is useful for memory management."
  },
  {
    question: "What is the difference between `==` and `===`?",
    options: ["`==` compares for equality after performing type coercion; `===` compares for strict equality without type coercion.", "`===` is faster than `==`.", "`==` is for primitives, `===` is for objects.", "There is no practical difference."],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "`==` can lead to unexpected results (e.g., `0 == false` is true). It's best practice to always use `===` to avoid bugs from unintended type coercion."
  },
  {
    question: "What is a 'Web Worker'?",
    options: ["A JavaScript library for networking.", "A simple means for web content to run scripts in background threads.", "A security feature of modern browsers.", "A type of DOM element."],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: "Web Workers allow you to run a script on a background thread separate from the main execution thread of a web application. This is useful for long-running tasks that shouldn't block the UI."
  }
];
