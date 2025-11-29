import { Problem, Difficulty } from '@/types';

export const expressSecurity: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'express-jwt-middleware',
    title: 'JWT Verification Middleware',
    description: 'Create a middleware that checks the `Authorization` header for a Bearer token. If present, call `next()`, otherwise send 401.',
    difficulty: Difficulty.Medium,
    category: 'Security',
    group: 'Step 6: Security & Auth',
    docsUrl: 'https://expressjs.com/en/guide/writing-middleware.html',
    starterCode: `const authMiddleware = (req, res, next) => {
  // Your code here
};`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('req.headers.authorization') && userCode.includes('status(401)');
      return [{
        input: 'Code Check',
        expected: 'Authorization header check',
        actual: passed ? 'Correctly implemented' : 'Missing header check or 401',
        passed
      }];
    },
  },
  {
    id: 'express-rate-limit',
    title: 'Simple Rate Limiter',
    description: 'Implement a basic rate limiter middleware that allows only 5 requests per IP. (Use a simple object for storage for this exercise).',
    difficulty: Difficulty.Hard,
    category: 'Security',
    group: 'Step 6: Security & Auth',
    docsUrl: 'https://expressjs.com/en/guide/writing-middleware.html',
    starterCode: `const requestCounts = {};

const rateLimiter = (req, res, next) => {
  // Your code here
};`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('req.ip') && userCode.includes('requestCounts') && userCode.includes('status(429)');
      return [{
        input: 'Code Check',
        expected: 'Rate limiting logic',
        actual: passed ? 'Correctly implemented' : 'Missing IP tracking or 429 status',
        passed
      }];
    },
  },
  {
    id: 'express-helmet',
    title: 'Helmet Security',
    description: 'Use the `helmet` middleware to set secure HTTP headers.',
    difficulty: Difficulty.Easy,
    category: 'Security',
    group: 'Step 6: Security & Auth',
    docsUrl: 'https://helmetjs.github.io/',
    starterCode: `const express = require('express');
const helmet = require('helmet');
const app = express();

// Your code here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('app.use(helmet())');
      return [{
        input: 'Code Check',
        expected: 'app.use(helmet())',
        actual: passed ? 'Correctly implemented' : 'Missing helmet usage',
        passed
      }];
    },
  },
  {
    id: 'express-cors',
    title: 'CORS Configuration',
    description: 'Configure `cors` to only allow requests from "https://example.com".',
    difficulty: Difficulty.Medium,
    category: 'Security',
    group: 'Step 6: Security & Auth',
    docsUrl: 'https://expressjs.com/en/resources/middleware/cors.html',
    starterCode: `const express = require('express');
const cors = require('cors');
const app = express();

// Your code here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('origin: "https://example.com"') || userCode.includes("origin: 'https://example.com'");
      return [{
        input: 'Code Check',
        expected: 'CORS origin configured',
        actual: passed ? 'Correctly implemented' : 'Missing origin config',
        passed
      }];
    },
  },
  {
    id: 'express-sanitize',
    title: 'Input Sanitization',
    description: 'Create a middleware that removes any keys starting with "$" from `req.body` to prevent NoSQL injection.',
    difficulty: Difficulty.Hard,
    category: 'Security',
    group: 'Step 6: Security & Auth',
    docsUrl: 'https://expressjs.com/en/advanced/best-practice-security.html',
    starterCode: `const sanitize = (req, res, next) => {
  // Your code here
};`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('startsWith("$")') || userCode.includes("startsWith('$')") && userCode.includes('delete');
      return [{
        input: 'Code Check',
        expected: 'Sanitization logic',
        actual: passed ? 'Correctly implemented' : 'Missing sanitization',
        passed
      }];
    },
  }
];
