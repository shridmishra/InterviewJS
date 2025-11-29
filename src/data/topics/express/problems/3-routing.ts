import { Problem, Difficulty } from '@/types';

export const expressRouting: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'express-route-params',
    title: 'Route Parameters',
    description: 'Create a route handler for `GET /users/:id` that responds with the user ID from the route parameters.',
    difficulty: Difficulty.Easy,
    category: 'Routing',
    group: 'Step 3: Routing',
    docsUrl: 'https://expressjs.com/en/guide/routing.html#route-parameters',
    starterCode: `app.get('/users/:id', (req, res) => {
  // Your code here
});`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('req.params.id');
      return [{
        input: 'Code Check',
        expected: 'Accessing req.params.id',
        actual: passed ? 'Correctly implemented' : 'Missing params access',
        passed
      }];
    },
  },
  {
    id: 'express-router',
    title: 'Express Router',
    description: 'Create a new Router instance, define a route `GET /` on it that sends "Birds home page", and export the router.',
    difficulty: Difficulty.Medium,
    category: 'Routing',
    group: 'Step 3: Routing',
    docsUrl: 'https://expressjs.com/en/guide/routing.html#express-router',
    starterCode: `const express = require('express');
const router = express.Router();

// Your code here

module.exports = router;`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('router.get(\'/\'') && userCode.includes('Birds home page');
      return [{
        input: 'Code Check',
        expected: 'Router defined and route added',
        actual: passed ? 'Correctly implemented' : 'Missing router or route',
        passed
      }];
    },
  },
  {
    id: 'express-route-query',
    title: 'Query Parameters',
    description: 'Create a route `/search` that accesses the `q` query parameter (`req.query.q`) and sends it back.',
    difficulty: Difficulty.Easy,
    category: 'Routing',
    group: 'Step 3: Routing',
    docsUrl: 'https://expressjs.com/en/guide/routing.html',
    starterCode: `const express = require('express');
const app = express();

// Your code here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('req.query.q');
      return [{
        input: 'Code Check',
        expected: 'Access req.query.q',
        actual: passed ? 'Correctly implemented' : 'Missing req.query.q',
        passed
      }];
    },
  },
  {
    id: 'express-route-regex',
    title: 'Regex Routes',
    description: 'Create a route that matches any path ending in "fly" (e.g., /butterfly, /dragonfly) using a regular expression.',
    difficulty: Difficulty.Medium,
    category: 'Routing',
    group: 'Step 3: Routing',
    docsUrl: 'https://expressjs.com/en/guide/routing.html',
    starterCode: `const express = require('express');
const app = express();

// Your code here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('/.*fly$/') || userCode.includes('/fly$/');
      return [{
        input: 'Code Check',
        expected: 'Regex route matching *fly',
        actual: passed ? 'Correctly implemented' : 'Missing regex',
        passed
      }];
    },
  },
  {
    id: 'express-route-chaining',
    title: 'Route Chaining',
    description: 'Use `app.route("/book")` to chain a GET and a POST handler for the same path.',
    difficulty: Difficulty.Medium,
    category: 'Routing',
    group: 'Step 3: Routing',
    docsUrl: 'https://expressjs.com/en/guide/routing.html#app-route',
    starterCode: `const express = require('express');
const app = express();

// Your code here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('app.route') && userCode.includes('.get') && userCode.includes('.post');
      return [{
        input: 'Code Check',
        expected: 'app.route chained with get and post',
        actual: passed ? 'Correctly implemented' : 'Missing chaining',
        passed
      }];
    },
  }
];
