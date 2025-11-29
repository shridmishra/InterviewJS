import { Problem, Difficulty } from '@/types';

export const expressDatabase: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'express-async-handler',
    title: 'Async Route Handler',
    description: 'Create an async route handler for `GET /data` that awaits a `getData()` function and sends the result. Wrap it in a try-catch block to pass errors to `next`.',
    difficulty: Difficulty.Medium,
    category: 'Database Integration',
    group: 'Step 5: Database Integration',
    docsUrl: 'https://expressjs.com/en/guide/error-handling.html',
    starterCode: `app.get('/data', async (req, res, next) => {
  // Your code here
});`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('try') && userCode.includes('catch') && userCode.includes('next(err)');
      return [{
        input: 'Code Check',
        expected: 'Try-catch block passing error to next',
        actual: passed ? 'Correctly implemented' : 'Missing try-catch or next(err)',
        passed
      }];
    },
  },
  {
    id: 'express-post-body',
    title: 'Parse JSON Body',
    description: 'Configure the application to parse JSON request bodies using `express.json()` middleware.',
    difficulty: Difficulty.Easy,
    category: 'Database Integration',
    group: 'Step 5: Database Integration',
    docsUrl: 'https://expressjs.com/en/api.html#express.json',
    starterCode: `const express = require('express');
const app = express();

// Your code here
`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('app.use(express.json())');
      return [{
        input: 'Code Check',
        expected: 'express.json() middleware used',
        actual: passed ? 'Correctly implemented' : 'Missing middleware',
        passed
      }];
    },
  },
  {
    id: 'express-db-connect',
    title: 'Database Connection',
    description: 'Create a function `connectDB` that simulates a database connection and logs "Connected". Call it when the server starts.',
    difficulty: Difficulty.Easy,
    category: 'Database Integration',
    group: 'Step 5: Database Integration',
    docsUrl: 'https://expressjs.com/en/guide/database-integration.html',
    starterCode: `const express = require('express');
const app = express();

// Your code here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('connectDB') && userCode.includes('Connected') && userCode.includes('listen');
      return [{
        input: 'Code Check',
        expected: 'Connect function called on start',
        actual: passed ? 'Correctly implemented' : 'Missing connection logic',
        passed
      }];
    },
  },
  {
    id: 'express-crud-create',
    title: 'Create Item',
    description: 'Create a POST route `/items` that pushes `req.body` into a `db` array and sends the created item.',
    difficulty: Difficulty.Easy,
    category: 'Database Integration',
    group: 'Step 5: Database Integration',
    docsUrl: 'https://expressjs.com/en/guide/routing.html',
    starterCode: `const db = [];
const express = require('express');
const app = express();
app.use(express.json());

// Your code here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('db.push') && userCode.includes('res.send') || userCode.includes('res.json');
      return [{
        input: 'Code Check',
        expected: 'Push to db and respond',
        actual: passed ? 'Correctly implemented' : 'Missing push or response',
        passed
      }];
    },
  },
  {
    id: 'express-crud-read',
    title: 'Read Items',
    description: 'Create a GET route `/items` that sends the `db` array as JSON.',
    difficulty: Difficulty.Easy,
    category: 'Database Integration',
    group: 'Step 5: Database Integration',
    docsUrl: 'https://expressjs.com/en/guide/routing.html',
    starterCode: `const db = [{ id: 1, name: 'Item 1' }];
const express = require('express');
const app = express();

// Your code here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('res.json(db)') || userCode.includes('res.send(db)');
      return [{
        input: 'Code Check',
        expected: 'Send db array',
        actual: passed ? 'Correctly implemented' : 'Missing response',
        passed
      }];
    },
  }
];
