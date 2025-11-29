import { Problem, Difficulty } from '@/types';

export const nodeProject: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'node-cli-file-manager',
    title: 'Mini Project: CLI File Manager',
    description: 'Create a script that takes a command (list, read, delete) and a filename from `process.argv`. Implement the logic to list files in the current directory, read a specific file, or delete a file.',
    difficulty: Difficulty.Hard,
    category: 'Project',
    group: 'Step 6: Mini Project',
    docsUrl: 'https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/',
    starterCode: `const fs = require('fs');
const command = process.argv[2];
const filename = process.argv[3];

// Your code here
`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('process.argv') && (userCode.includes('fs.readdir') || userCode.includes('fs.readFile') || userCode.includes('fs.unlink'));
      return [{
        input: 'Code Check',
        expected: 'CLI logic handling commands',
        actual: passed ? 'Correctly implemented' : 'Missing logic for commands',
        passed
      }];
    },
  },
  {
    id: 'node-log-analyzer',
    title: 'Mini Project: Log Analyzer',
    description: 'Create a script that reads a "server.log" file (assume it exists), counts the number of "ERROR" occurrences, and writes the count to "error_report.txt".',
    difficulty: Difficulty.Medium,
    category: 'Project',
    group: 'Step 6: Mini Project',
    docsUrl: 'https://nodejs.org/api/fs.html#fsreadfilesyncpath-options',
    starterCode: `const fs = require('fs');

// Your code here
`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('readFile') && userCode.includes('writeFile') && userCode.includes('split') || userCode.includes('match');
      return [{
        input: 'Code Check',
        expected: 'Read log and write report',
        actual: passed ? 'Correctly implemented' : 'Missing file operations',
        passed
      }];
    },
  },
  {
    id: 'node-static-server',
    title: 'Mini Project: Static File Server',
    description: 'Create a simple HTTP server that serves static files (e.g., index.html) from the current directory based on the request URL.',
    difficulty: Difficulty.Medium,
    category: 'Project',
    group: 'Step 6: Mini Project',
    docsUrl: 'https://nodejs.org/en/knowledge/HTTP/servers/how-to-serve-static-files/',
    starterCode: `const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
  // Your code here
}).listen(8080);`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('fs.readFile') && userCode.includes('req.url');
      return [{
        input: 'Code Check',
        expected: 'Static file serving logic',
        actual: passed ? 'Correctly implemented' : 'Missing file reading logic',
        passed
      }];
    },
  },
  {
    id: 'node-api-proxy',
    title: 'Mini Project: API Proxy',
    description: 'Create a server that forwards requests to another API (e.g., `https://jsonplaceholder.typicode.com`) and returns the response to the client.',
    difficulty: Difficulty.Hard,
    category: 'Project',
    group: 'Step 6: Mini Project',
    docsUrl: 'https://nodejs.org/docs/latest/api/http.html#httprequestoptions-callback',
    starterCode: `const http = require('http');
const https = require('https');

http.createServer((req, res) => {
  // Your code here
}).listen(8080);`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('https.request') || userCode.includes('https.get') && userCode.includes('pipe');
      return [{
        input: 'Code Check',
        expected: 'Proxy logic',
        actual: passed ? 'Correctly implemented' : 'Missing request forwarding',
        passed
      }];
    },
  },
  {
    id: 'node-markdown-parser',
    title: 'Mini Project: Markdown Parser',
    description: 'Create a script that reads a Markdown file and converts basic syntax (headers `#`, bold `**`) to HTML.',
    difficulty: Difficulty.Medium,
    category: 'Project',
    group: 'Step 6: Mini Project',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions',
    starterCode: `const fs = require('fs');

const markdown = fs.readFileSync('README.md', 'utf8');
// Your code here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('.replace') && userCode.includes('/#') || userCode.includes('/\\*\\*/');
      return [{
        input: 'Code Check',
        expected: 'Regex replacement',
        actual: passed ? 'Correctly implemented' : 'Missing regex logic',
        passed
      }];
    },
  }
];
