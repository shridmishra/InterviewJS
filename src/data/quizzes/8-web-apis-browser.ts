import { QuizQuestion } from './types';

export const webApisAndBrowserQuiz: QuizQuestion[] = [
  {
    question: "What is JSON?",
    options: ["A JavaScript function.", "A JavaScript object.", "A lightweight data format.", "A JavaScript styling language."],
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
    question: "What is CORS?",
    options: ["A JavaScript framework.", "A styling methodology.", "Cross-origin resource sharing.", "A type of JavaScript error."],
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
    question: "What is the purpose of the `localStorage` object?",
    options: ["Persistent per-origin storage.", "Store session-level data.", "Communicate with a local server.", "Manage application memory."],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "`localStorage` allows web applications to store key-value pairs in a web browser with no expiration time. The data persists even after the browser is closed."
  },
  {
    question: "What is the difference between `localStorage` and `sessionStorage`?",
    options: ["`localStorage` is faster.", "`sessionStorage` clears at session end.", "`localStorage` can store more data.", "There is no difference."],
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
    question: "What is the `global` object in Node.js equivalent to in the browser?",
    options: ["`document`", "`console`", "`window`", "`this`"],
    correctAnswerIndex: 2,
    difficulty: 'Easy',
    explanation: "In browsers, the global scope is the `window` object. In Node.js, the `global` object serves a similar purpose."
  },
  {
    question: "How do you export a function from a module in Node.js (CommonJS)?",
    options: [
      "export default myFunction;",
      "module.exports = myFunction;",
      "exports.myFunction = myFunction;",
      "B or C are valid."
    ],
    correctAnswerIndex: 3,
    difficulty: 'Medium',
    explanation: "`module.exports` is used to export a single value (like a function or object), while `exports` is a reference to `module.exports` and can be used to export multiple named values."
  },
  {
    question: "How do you create a regular expression in JavaScript?",
    options: [
      "/pattern/flags",
      "new RegExp('pattern', 'flags')",
      "'pattern'.toRegex()",
      "Literal or constructor forms."
    ],
    correctAnswerIndex: 3,
    difficulty: 'Easy',
    explanation: "You can create a regular expression using either the literal syntax (`/abc/i`) or the constructor (`new RegExp('abc', 'i')`)."
  },
  {
    question: "What method is used to test for a match in a string against a regex?",
    options: ["string.match(regex)", "regex.test(string)", "string.search(regex)", "All of the above."],
    correctAnswerIndex: 3,
    difficulty: 'Medium',
    explanation: "`test()` returns true/false, `match()` returns an array of matches, and `search()` returns the index of the match. All can be used to test for a match."
  },
  {
    question: "What is a 'polyfill'?",
    options: ["A browser extension.", "Backport for unsupported features.", "A tool for debugging JavaScript.", "A code formatting standard."],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: "A polyfill 'fills in' the gap by implementing a modern API that an older browser is missing, allowing developers to use new features more broadly."
  },
  {
    question: "What is 'transpiling'?",
    options: ["Convert between languages.", "Convert JS version to another.", "A method for testing code.", "Minify JavaScript code."],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: "Transpiling, done by tools like Babel, allows developers to write modern JavaScript (ES6+) and have it converted to an older, more widely-supported version (like ES5) for production."
  },
  {
    question: "What is the main purpose of a 'linter' like ESLint?",
    options: ["Format code by style rules.", "Static analysis for problems.", "Bundle code for production.", "Run tests."],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: "A linter statically analyzes your code to quickly find stylistic errors, potential bugs, and code that doesn't adhere to certain style guidelines."
  },
];
