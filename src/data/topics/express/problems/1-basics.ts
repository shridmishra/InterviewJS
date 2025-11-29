import { Problem, Difficulty } from '@/types';

export const expressBasics: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'express-route',
    title: 'Create a Route',
    description: 'Create an Express route handler for GET /hello that sends "Hello World".',
    difficulty: Difficulty.Easy,
    category: 'Express',
    group: 'Step 1: Basics',
    docsUrl: 'https://expressjs.com/en/starter/basic-routing.html',
    starterCode: `app.get('/hello', (req, res) => {
  // Your code here
});`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes("res.send('Hello World')") || userCode.includes('res.send("Hello World")');
      return [{
        input: 'Code Check',
        expected: 'Route sending "Hello World"',
        actual: passed ? 'Route correct' : 'Route incorrect',
        passed
      }];
    },
  },
  {
    id: 'express-port',
    title: 'Listen on Port',
    description: 'Make the Express app listen on port 3000 and log "Server running" to the console.',
    difficulty: Difficulty.Easy,
    category: 'Basics',
    group: 'Step 1: Basics',
    docsUrl: 'https://expressjs.com/en/starter/hello-world.html',
    starterCode: `const express = require('express');
const app = express();

// Your code here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('app.listen(3000') && userCode.includes('console.log');
      return [{
        input: 'Code Check',
        expected: 'Listen on 3000 and log',
        actual: passed ? 'Correctly implemented' : 'Missing listen or log',
        passed
      }];
    },
  },
  {
    id: 'express-json',
    title: 'JSON Middleware',
    description: 'Use the built-in middleware `express.json()` to parse JSON request bodies.',
    difficulty: Difficulty.Easy,
    category: 'Basics',
    group: 'Step 1: Basics',
    docsUrl: 'https://expressjs.com/en/api.html#express.json',
    starterCode: `const express = require('express');
const app = express();

// Your code here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('app.use(express.json())');
      return [{
        input: 'Code Check',
        expected: 'app.use(express.json())',
        actual: passed ? 'Correctly implemented' : 'Missing middleware',
        passed
      }];
    },
  },
  {
    id: 'express-static',
    title: 'Static Files',
    description: 'Serve static files from the "public" directory using `express.static`.',
    difficulty: Difficulty.Easy,
    category: 'Basics',
    group: 'Step 1: Basics',
    docsUrl: 'https://expressjs.com/en/starter/static-files.html',
    starterCode: `const express = require('express');
const app = express();

// Your code here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes("express.static('public')") || userCode.includes('express.static("public")');
      return [{
        input: 'Code Check',
        expected: 'Serve public folder',
        actual: passed ? 'Correctly implemented' : 'Missing static middleware',
        passed
      }];
    },
  },
  {
    id: 'express-method',
    title: 'Handle POST',
    description: 'Create a POST route handler for `/submit` that sends back "Received".',
    difficulty: Difficulty.Easy,
    category: 'Basics',
    group: 'Step 1: Basics',
    docsUrl: 'https://expressjs.com/en/guide/routing.html',
    starterCode: `const express = require('express');
const app = express();

// Your code here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('app.post') && userCode.includes('/submit') && userCode.includes('Received');
      return [{
        input: 'Code Check',
        expected: 'POST /submit handler',
        actual: passed ? 'Correctly implemented' : 'Missing handler or response',
        passed
      }];
    },
  }
];
