import { Problem, Difficulty } from '@/types';

export const expressMiddleware: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'express-logger-middleware',
    title: 'Logger Middleware',
    description: 'Create a middleware function `logger` that logs the request method and URL to the console, then calls `next()`.',
    difficulty: Difficulty.Easy,
    category: 'Middleware',
    group: 'Step 2: Middleware',
    docsUrl: 'https://expressjs.com/en/guide/writing-middleware.html',
    starterCode: `const logger = (req, res, next) => {
  // Your code here
};`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('console.log') && userCode.includes('req.method') && userCode.includes('next()');
      return [{
        input: 'Code Check',
        expected: 'Middleware logging and calling next',
        actual: passed ? 'Correctly implemented' : 'Missing log or next',
        passed
      }];
    },
  },
  {
    id: 'express-static-files',
    title: 'Serve Static Files',
    description: 'Use `express.static` built-in middleware to serve static files from the "public" directory.',
    difficulty: Difficulty.Easy,
    category: 'Middleware',
    group: 'Step 2: Middleware',
    docsUrl: 'https://expressjs.com/en/starter/static-files.html',
    starterCode: `const express = require('express');
const app = express();

// Your code here
`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('express.static(\'public\')');
      return [{
        input: 'Code Check',
        expected: 'express.static used',
        actual: passed ? 'Correctly implemented' : 'Missing express.static',
        passed
      }];
    },
  },
  {
    id: 'express-auth-middleware',
    title: 'Auth Middleware',
    description: 'Create a middleware function `checkAuth` that checks if `req.query.token` is "secret". If so, call `next()`, otherwise send 403.',
    difficulty: Difficulty.Medium,
    category: 'Middleware',
    group: 'Step 2: Middleware',
    docsUrl: 'https://expressjs.com/en/guide/writing-middleware.html',
    starterCode: `const checkAuth = (req, res, next) => {
  // Your code here
};`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('req.query.token') && userCode.includes('next()') && userCode.includes('403');
      return [{
        input: 'Code Check',
        expected: 'Auth check logic',
        actual: passed ? 'Correctly implemented' : 'Missing check, next, or 403',
        passed
      }];
    },
  },
  {
    id: 'express-error-middleware',
    title: 'Error Middleware',
    description: 'Create an error-handling middleware function (with 4 arguments) that logs the error and sends a 500 status.',
    difficulty: Difficulty.Medium,
    category: 'Middleware',
    group: 'Step 2: Middleware',
    docsUrl: 'https://expressjs.com/en/guide/error-handling.html',
    starterCode: `const errorHandler = (err, req, res, next) => {
  // Your code here
};`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('(err, req, res, next)') && userCode.includes('status(500)');
      return [{
        input: 'Code Check',
        expected: 'Error handler signature and 500',
        actual: passed ? 'Correctly implemented' : 'Missing signature or status',
        passed
      }];
    },
  },
  {
    id: 'express-third-party',
    title: 'Third-Party Middleware',
    description: 'Use the `cors` middleware to enable Cross-Origin Resource Sharing for all routes.',
    difficulty: Difficulty.Easy,
    category: 'Middleware',
    group: 'Step 2: Middleware',
    docsUrl: 'https://expressjs.com/en/resources/middleware/cors.html',
    starterCode: `const express = require('express');
const cors = require('cors');
const app = express();

// Your code here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('app.use(cors())');
      return [{
        input: 'Code Check',
        expected: 'app.use(cors())',
        actual: passed ? 'Correctly implemented' : 'Missing middleware usage',
        passed
      }];
    },
  }
];
