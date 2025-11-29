import { Problem, Difficulty } from '@/types';

export const nodeAdvanced: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'node-worker-threads',
    title: 'Worker Threads',
    description: 'Create a script that checks if it is the main thread. If so, spawn a new Worker. If it is a worker, log "I am a worker".',
    difficulty: Difficulty.Hard,
    category: 'Worker Threads',
    group: 'Step 5: Advanced Node.js',
    docsUrl: 'https://nodejs.org/api/worker_threads.html',
    starterCode: `const { Worker, isMainThread } = require('worker_threads');

if (isMainThread) {
  // Your code here
} else {
  // Worker code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('new Worker(__filename)') && userCode.includes('isMainThread');
      return [{
        input: 'Code Check',
        expected: 'Worker thread logic',
        actual: passed ? 'Correctly implemented' : 'Missing worker creation or check',
        passed
      }];
    },
  },
  {
    id: 'node-child-process',
    title: 'Child Process',
    description: 'Use `exec` from `child_process` to run the command `ls` (or `dir` on Windows) and log the output.',
    difficulty: Difficulty.Hard,
    category: 'Child Processes',
    group: 'Step 5: Advanced Node.js',
    docsUrl: 'https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback',
    starterCode: `const { exec } = require('child_process');

// Your code here
`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('exec(\'ls\'') || userCode.includes('exec(\'dir\'');
      return [{
        input: 'Code Check',
        expected: 'exec used to run command',
        actual: passed ? 'Correctly implemented' : 'Missing exec call',
        passed
      }];
    },
  },
  {
    id: 'node-cluster',
    title: 'Cluster Module',
    description: 'Use the `cluster` module to fork a worker process for each CPU core.',
    difficulty: Difficulty.Hard,
    category: 'Advanced Node.js',
    group: 'Step 5: Advanced Node.js',
    docsUrl: 'https://nodejs.org/docs/latest/api/cluster.html',
    starterCode: `const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Your code here
} else {
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\\n');
  }).listen(8000);
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('cluster.fork') && userCode.includes('numCPUs');
      return [{
        input: 'Code Check',
        expected: 'Forking workers',
        actual: passed ? 'Correctly implemented' : 'Missing forking logic',
        passed
      }];
    },
  },
  {
    id: 'node-crypto-hash',
    title: 'Crypto Hashing',
    description: 'Use the `crypto` module to create a SHA256 hash of the string "secret".',
    difficulty: Difficulty.Medium,
    category: 'Advanced Node.js',
    group: 'Step 5: Advanced Node.js',
    docsUrl: 'https://nodejs.org/docs/latest/api/crypto.html#cryptocreatehashalgorithm-options',
    starterCode: `const crypto = require('crypto');

// Your code here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('createHash') && userCode.includes('sha256') && userCode.includes('digest');
      return [{
        input: 'Code Check',
        expected: 'SHA256 hash creation',
        actual: passed ? 'Correctly implemented' : 'Missing hash logic',
        passed
      }];
    },
  },
  {
    id: 'node-buffer',
    title: 'Buffer Manipulation',
    description: 'Create a Buffer from the string "Hello", convert it to base64, and log the result.',
    difficulty: Difficulty.Easy,
    category: 'Advanced Node.js',
    group: 'Step 5: Advanced Node.js',
    docsUrl: 'https://nodejs.org/docs/latest/api/buffer.html',
    starterCode: `// Your code here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('Buffer.from') && userCode.includes('toString') && userCode.includes('base64');
      return [{
        input: 'Code Check',
        expected: 'Buffer to base64',
        actual: passed ? 'Correctly implemented' : 'Missing buffer logic',
        passed
      }];
    },
  }
];
