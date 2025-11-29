import { Problem, Difficulty } from '@/types';

export const nodeBasics: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'node-server',
    title: 'Create HTTP Server',
    description: 'Create a simple HTTP server using the `http` module.',
    difficulty: Difficulty.Easy,
    category: 'Node.js',
    group: 'Step 1: Basics',
    docsUrl: 'https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener',
    starterCode: `const http = require('http');
const server = http.createServer((req, res) => {
  // Your code here
});`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('http.createServer');
      return [{
        input: 'Code Check',
        expected: 'Server creation logic',
        actual: passed ? 'Server created' : 'Server missing',
        passed
      }];
    },
  },
  {
    id: 'node-globals',
    title: 'Node Globals',
    description: 'Log the current directory name using `__dirname` and the current file name using `__filename`.',
    difficulty: Difficulty.Easy,
    category: 'Basics',
    group: 'Step 1: Basics',
    docsUrl: 'https://nodejs.org/docs/latest/api/globals.html',
    starterCode: `// Your code here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('console.log') && userCode.includes('__dirname') && userCode.includes('__filename');
      return [{
        input: 'Code Check',
        expected: 'Log __dirname and __filename',
        actual: passed ? 'Correctly implemented' : 'Missing logs',
        passed
      }];
    },
  },
  {
    id: 'node-process-env',
    title: 'Environment Variables',
    description: 'Log the value of the `NODE_ENV` environment variable. If it is not set, log "development".',
    difficulty: Difficulty.Easy,
    category: 'Basics',
    group: 'Step 1: Basics',
    docsUrl: 'https://nodejs.org/docs/latest/api/process.html#process_process_env',
    starterCode: `// Your code here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('process.env.NODE_ENV') && (userCode.includes('||') || userCode.includes('??'));
      return [{
        input: 'Code Check',
        expected: 'Log NODE_ENV with fallback',
        actual: passed ? 'Correctly implemented' : 'Missing logic',
        passed
      }];
    },
  },
  {
    id: 'node-os-module',
    title: 'OS Module',
    description: 'Use the `os` module to log the operating system platform (`os.platform()`) and free memory (`os.freemem()`).',
    difficulty: Difficulty.Easy,
    category: 'Basics',
    group: 'Step 1: Basics',
    docsUrl: 'https://nodejs.org/docs/latest/api/os.html',
    starterCode: `const os = require('os');

// Your code here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('os.platform()') && userCode.includes('os.freemem()');
      return [{
        input: 'Code Check',
        expected: 'Log platform and free memory',
        actual: passed ? 'Correctly implemented' : 'Missing os calls',
        passed
      }];
    },
  },
  {
    id: 'node-path-module',
    title: 'Path Module',
    description: 'Use the `path` module to join the current directory (`__dirname`) with a filename "data.txt". Log the result.',
    difficulty: Difficulty.Easy,
    category: 'Basics',
    group: 'Step 1: Basics',
    docsUrl: 'https://nodejs.org/docs/latest/api/path.html',
    starterCode: `const path = require('path');

// Your code here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('path.join') && userCode.includes('__dirname') && userCode.includes('"data.txt"');
      return [{
        input: 'Code Check',
        expected: 'path.join used',
        actual: passed ? 'Correctly implemented' : 'Missing path.join or arguments',
        passed
      }];
    },
  }
];
