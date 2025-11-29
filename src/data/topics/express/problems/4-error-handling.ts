import { Problem, Difficulty } from '@/types';

export const expressErrorHandling: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'express-error-handler',
    title: 'Error Handling Middleware',
    description: 'Create an error-handling middleware function with 4 arguments (err, req, res, next) that sends a 500 status code and the error message.',
    difficulty: Difficulty.Medium,
    category: 'Error Handling',
    group: 'Step 4: Error Handling',
    docsUrl: 'https://expressjs.com/en/guide/error-handling.html',
    starterCode: `app.use((err, req, res, next) => {
  // Your code here
});`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('res.status(500)') && userCode.includes('res.send') || userCode.includes('res.json');
      return [{
        input: 'Code Check',
        expected: 'Status 500 and error message sent',
        actual: passed ? 'Correctly implemented' : 'Missing status or send',
        passed
      }];
    },
  },
  {
    id: 'express-404-handler',
    title: '404 Handler',
    description: 'Create a middleware at the end of the stack to handle 404 errors (routes not found) by sending "Sorry can\'t find that!" with a 404 status.',
    difficulty: Difficulty.Easy,
    category: 'Error Handling',
    group: 'Step 4: Error Handling',
    docsUrl: 'https://expressjs.com/en/starter/faq.html#how-do-i-handle-404-responses',
    starterCode: `app.use((req, res, next) => {
  // Your code here
});`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('status(404)') && userCode.includes('Sorry can\'t find that!');
      return [{
        input: 'Code Check',
        expected: '404 status and message',
        actual: passed ? 'Correctly implemented' : 'Missing status or message',
        passed
      }];
    },
  },
  {
    id: 'express-async-errors',
    title: 'Async Error Handling',
    description: 'Create an async route handler that throws an error, and wrap it in a `try/catch` block to pass the error to `next(err)`.',
    difficulty: Difficulty.Medium,
    category: 'Error Handling',
    group: 'Step 4: Error Handling',
    docsUrl: 'https://expressjs.com/en/guide/error-handling.html',
    starterCode: `app.get('/async', async (req, res, next) => {
  // Your code here
});`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('try') && userCode.includes('catch') && userCode.includes('next(');
      return [{
        input: 'Code Check',
        expected: 'try/catch with next(err)',
        actual: passed ? 'Correctly implemented' : 'Missing try/catch or next',
        passed
      }];
    },
  },
  {
    id: 'express-custom-error',
    title: 'Custom Error Class',
    description: 'Create a class `AppError` extending `Error` with a `statusCode` property. Throw an instance of it in a route.',
    difficulty: Difficulty.Medium,
    category: 'Error Handling',
    group: 'Step 4: Error Handling',
    docsUrl: 'https://expressjs.com/en/guide/error-handling.html',
    starterCode: `class AppError extends Error {
  // Your code here
}

app.get('/error', (req, res, next) => {
  // Throw error here
});`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('extends Error') && userCode.includes('this.statusCode') && userCode.includes('next(');
      return [{
        input: 'Code Check',
        expected: 'Custom error class usage',
        actual: passed ? 'Correctly implemented' : 'Missing class or usage',
        passed
      }];
    },
  },
  {
    id: 'express-validation-error',
    title: 'Validation Error',
    description: 'In an error handler, check if `err.name` is "ValidationError" and send a 400 status code.',
    difficulty: Difficulty.Easy,
    category: 'Error Handling',
    group: 'Step 4: Error Handling',
    docsUrl: 'https://expressjs.com/en/guide/error-handling.html',
    starterCode: `app.use((err, req, res, next) => {
  // Your code here
});`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('ValidationError') && userCode.includes('status(400)');
      return [{
        input: 'Code Check',
        expected: 'Check for ValidationError',
        actual: passed ? 'Correctly implemented' : 'Missing check or 400 status',
        passed
      }];
    },
  }
];
