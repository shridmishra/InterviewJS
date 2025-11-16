import { QuizQuestion } from './types';

export const basicsQuiz: QuizQuestion[] = [
  {
    question: "What does 'typeof' operator in JavaScript return for 'null'?",
    options: [
      "It returns 'object'.",
      "It returns 'null'.",
      "It returns 'undefined'.",
      "It returns 'string'."
    ],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "This is a well-known quirk in JavaScript. Due to historical reasons, `typeof null` returns 'object', not 'null'."
  },
  {
    question: "Which of the following is NOT a primitive data type in JavaScript?",
    options: [
      "It is a primitive: Number.",
      "It is a primitive: String.",
      "It is a primitive: Boolean.",
      "It is not a primitive: Object."
    ],
    correctAnswerIndex: 3,
    difficulty: 'Easy',
    explanation: "Primitives in JavaScript are Number, String, Boolean, null, undefined, Symbol, and BigInt. Object is a complex data type."
  },
  {
    question: "What is the result of '2' + 2 in JavaScript?",
    options: [
      "The result is '22'.",
      "The result is 4.",
      "It throws a TypeError.",
      "The result is NaN."
    ],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "The `+` operator performs string concatenation when one of the operands is a string. The number 2 is coerced into a string '2'."
  },
  {
    question: "What does the '===' operator check for?",
    options: [
      "Checks only the value.",
      "Checks only the type.",
      "Checks value and type.",
      "Checks reference identity only."
    ],
    correctAnswerIndex: 2,
    difficulty: 'Easy',
    explanation: "The strict equality operator `===` checks for both value and type equality without performing any type coercion."
  },
  {
    question: "How do you declare a variable that cannot be reassigned?",
    options: [
      "Use the `let` keyword.",
      "Use the `var` keyword.",
      "Use the `const` keyword.",
      "Use the `static` keyword."
    ],
    correctAnswerIndex: 2,
    difficulty: 'Easy',
    explanation: "`const` declares a block-scoped variable whose value cannot be changed through reassignment and it can't be redeclared."
  },
  {
    question: "What is the difference between `let` and `var`?",
    options: [
      "let: function; var: block.",
      "let: block; var: function.",
      "No meaningful difference.",
      "let can be redeclared; var cannot."
    ],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: "`let` and `const` have block scope (they are confined to the block `{}` they are defined in), while `var` has function scope."
  },
  {
    question: "What is the output of `typeof NaN`?",
    options: [
      "It returns 'number'.",
      "It returns 'NaN'.",
      "It returns 'undefined'.",
      "It returns 'object'."
    ],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "NaN (Not-a-Number) is technically a numeric type. It represents a value that is not a legal number."
  },
  {
    question: "What is the difference between `null` and `undefined`?",
    options: [
      "They mean exactly the same thing.",
      "null: assigned none; undefined: unassigned.",
      "undefined is an object; null is primitive.",
      "JavaScript has no null value."
    ],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: "`undefined` is the default value of a variable that has not been assigned a value. `null` is an intentional 'nothing' value that you can assign."
  },
  {
    question: "What is the result of `!!'hello'`?",
    options: [
      "The result is true.",
      "The result is false.",
      "The result is 'hello'.",
      "It is a syntax error."
    ],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "The double negation operator `!!` coerces a value to a boolean. Any non-empty string is 'truthy', so `!!'hello'` becomes `true`."
  },
  {
    question: "Which of the following is an example of a falsy value?",
    options: [
      "The string '0' is falsy.",
      "An empty array [] is falsy.",
      "An empty object {} is falsy.",
      "The number 0 is falsy."
    ],
    correctAnswerIndex: 3,
    difficulty: 'Easy',
    explanation: "In JavaScript, there are only a few falsy values: `false`, `0`, `''` (empty string), `null`, `undefined`, and `NaN`. Everything else is truthy, including `'0'`, `[]`, and `{}`."
  },
  {
    question: "What is the output of `typeof []`?",
    options: [
      "It returns 'array'.",
      "It returns 'object'.",
      "It returns 'list'.",
      "It returns 'undefined'."
    ],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: "In JavaScript, arrays are a special type of object, so `typeof` returns 'object'."
  },
  {
    question: "What is the result of `'5' - 3`?",
    options: [
      "The result is 2.",
      "The result is '53'.",
      "The result is NaN.",
      "The result is '2'."
    ],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "When the `-` operator is used, JavaScript coerces the string '5' into a number, so the expression becomes a standard mathematical subtraction."
  },
  {
    question: "What is the result of `'5' * 3`?",
    options: [
      "The result is 15.",
      "The result is '555'.",
      "The result is NaN.",
      "The result is '15'."
    ],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "Similar to subtraction, the `*` operator triggers numeric conversion, so JavaScript treats the operation as `5 * 3`."
  },
  {
    question: "What is the result of `1 + '2' + 3`?",
    options: [
      "The result is 6.",
      "The result is '123'.",
      "The result is '33'.",
      "The result is 15."
    ],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: "Execution goes left-to-right. `1 + '2'` results in string concatenation ('12'). Then `'12' + 3` is also a concatenation, resulting in '123'."
  },
  {
    question: "What is the result of `1 + 2 + '3'`?",
    options: [
      "The result is 6.",
      "The result is '123'.",
      "The result is '33'.",
      "The result is '6'."
    ],
    correctAnswerIndex: 2,
    difficulty: 'Medium',
    explanation: "Execution goes left-to-right. `1 + 2` is a numeric addition (3). Then `3 + '3'` becomes a string concatenation, resulting in '33'."
  },
  {
    question: "What is the difference between `==` and `===`?",
    options: [
      "== coerces; === strict.",
      "=== is always faster than ==.",
      "== is for primitives; === for objects only.",
      "There is no real difference."
    ],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "`==` can lead to unexpected results (e.g., `0 == false` is true). It's best practice to always use `===` to avoid bugs from unintended type coercion."
  },
  {
    question: "How do you write a single-line comment in JavaScript?",
    options: [
      "Use // for a single-line comment.",
      "Use /* ... */ for a single-line comment.",
      "Use <!-- ... --> for a single-line comment.",
      "Use ## for a single-line comment."
    ],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: "`//` is used for single-line comments, and `/* ... */` is used for multi-line comments."
  },
];
