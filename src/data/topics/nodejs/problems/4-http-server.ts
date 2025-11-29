import { Problem, Difficulty } from '@/types';

export const nodeHttpServer: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'node-http-json',
    title: 'Serve JSON',
    description: 'Create an HTTP server that responds with a JSON object `{ message: "Hello JSON" }` and sets the `Content-Type` header to `application/json`.',
    difficulty: Difficulty.Medium,
    category: 'HTTP',
    group: 'Step 4: HTTP Server',
    docsUrl: 'https://nodejs.org/api/http.html',
    starterCode: `const http = require('http');

const server = http.createServer((req, res) => {
  // Your code here
});`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('setHeader(\'Content-Type\', \'application/json\')') && userCode.includes('JSON.stringify');
      return [{
        input: 'Code Check',
        expected: 'JSON response with correct header',
        actual: passed ? 'Correctly implemented' : 'Missing header or JSON stringify',
        passed
      }];
    },
  },
  {
    id: 'node-http-routing',
    title: 'Basic Routing',
    description: 'Implement a server that responds with "Home" for url "/" and "About" for url "/about". For any other url, respond with "Not Found".',
    difficulty: Difficulty.Medium,
    category: 'HTTP',
    group: 'Step 4: HTTP Server',
    docsUrl: 'https://nodejs.org/api/http.html',
    starterCode: `const http = require('http');

const server = http.createServer((req, res) => {
  // Your code here
});`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('req.url === \'/\'') && userCode.includes('req.url === \'/about\'');
      return [{
        input: 'Code Check',
        expected: 'Routing logic implemented',
        actual: passed ? 'Correctly implemented' : 'Missing routing logic',
        passed
      }];
    },
  },
  {
    id: 'node-http-query',
    title: 'Parse Query Parameters',
    description: 'Create an HTTP server that parses the URL query parameters (e.g., `?name=Alice`) and responds with "Hello Alice".',
    difficulty: Difficulty.Medium,
    category: 'HTTP Server',
    group: 'Step 4: HTTP Server',
    docsUrl: 'https://nodejs.org/docs/latest/api/url.html',
    starterCode: `const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  // Your code here
});`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('url.parse') && userCode.includes('query') && userCode.includes('res.end');
      return [{
        input: 'Code Check',
        expected: 'Query parsing logic',
        actual: passed ? 'Correctly implemented' : 'Missing parsing logic',
        passed
      }];
    },
  },
  {
    id: 'node-http-post',
    title: 'Handle POST Body',
    description: 'Create an HTTP server that listens for POST requests and logs the request body.',
    difficulty: Difficulty.Medium,
    category: 'HTTP Server',
    group: 'Step 4: HTTP Server',
    docsUrl: 'https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/#request-body',
    starterCode: `const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    // Your code here
  }
});`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('.on("data"') && userCode.includes('.on("end"');
      return [{
        input: 'Code Check',
        expected: 'Data and end listeners',
        actual: passed ? 'Correctly implemented' : 'Missing listeners',
        passed
      }];
    },
  },
  {
    id: 'node-http-headers',
    title: 'Set Response Headers',
    description: 'Create an HTTP server that responds with JSON data and sets the `Content-Type` header to `application/json`.',
    difficulty: Difficulty.Easy,
    category: 'HTTP Server',
    group: 'Step 4: HTTP Server',
    docsUrl: 'https://nodejs.org/docs/latest/api/http.html#responsewriteheadstatuscode-statusmessage-headers',
    starterCode: `const http = require('http');

const server = http.createServer((req, res) => {
  // Your code here
});`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('setHeader') || userCode.includes('writeHead') && userCode.includes('application/json');
      return [{
        input: 'Code Check',
        expected: 'JSON content type header',
        actual: passed ? 'Correctly implemented' : 'Missing header',
        passed
      }];
    },
  }
];
