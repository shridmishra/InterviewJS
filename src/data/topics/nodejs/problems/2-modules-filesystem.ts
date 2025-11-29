import { Problem, Difficulty } from '@/types';

export const nodeModulesFs: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'node-fs-read',
    title: 'Read File',
    description: 'Use the `fs` module to read the contents of a file named "input.txt" asynchronously and log the content to the console.',
    difficulty: Difficulty.Easy,
    category: 'File System',
    group: 'Step 2: Modules & File System',
    docsUrl: 'https://nodejs.org/api/fs.html#fsreadfilepath-options-callback',
    starterCode: `const fs = require('fs');

// Your code here
`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('fs.readFile') && userCode.includes('input.txt');
      return [{
        input: 'Code Check',
        expected: 'fs.readFile used on input.txt',
        actual: passed ? 'Correctly implemented' : 'Missing fs.readFile or filename',
        passed
      }];
    },
  },
  {
    id: 'node-fs-write',
    title: 'Write File',
    description: 'Use the `fs` module to write the string "Hello Node" to a file named "output.txt".',
    difficulty: Difficulty.Easy,
    category: 'File System',
    group: 'Step 2: Modules & File System',
    docsUrl: 'https://nodejs.org/api/fs.html#fswritefilefile-data-options-callback',
    starterCode: `const fs = require('fs');

// Your code here
`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('fs.writeFile') && userCode.includes('output.txt') && userCode.includes('Hello Node');
      return [{
        input: 'Code Check',
        expected: 'fs.writeFile used with correct arguments',
        actual: passed ? 'Correctly implemented' : 'Missing function call or arguments',
        passed
      }];
    },
  },
  {
    id: 'node-fs-append',
    title: 'Append to File',
    description: 'Use `fs.appendFile` to add the text " - Updated" to "log.txt".',
    difficulty: Difficulty.Easy,
    category: 'Modules & File System',
    group: 'Step 2: Modules & File System',
    docsUrl: 'https://nodejs.org/docs/latest/api/fs.html#fsappendfilepath-data-options-callback',
    starterCode: `const fs = require('fs');

// Your code here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('fs.appendFile') && userCode.includes('" - Updated"');
      return [{
        input: 'Code Check',
        expected: 'fs.appendFile used',
        actual: passed ? 'Correctly implemented' : 'Missing appendFile or text',
        passed
      }];
    },
  },
  {
    id: 'node-fs-unlink',
    title: 'Delete File',
    description: 'Use `fs.unlink` to delete a file named "temp.txt".',
    difficulty: Difficulty.Easy,
    category: 'Modules & File System',
    group: 'Step 2: Modules & File System',
    docsUrl: 'https://nodejs.org/docs/latest/api/fs.html#fsunlinkpath-callback',
    starterCode: `const fs = require('fs');

// Your code here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('fs.unlink');
      return [{
        input: 'Code Check',
        expected: 'fs.unlink used',
        actual: passed ? 'Correctly implemented' : 'Missing unlink',
        passed
      }];
    },
  },
  {
    id: 'node-module-export',
    title: 'Module Exports',
    description: 'Create a function `add(a, b)` and export it using `module.exports`.',
    difficulty: Difficulty.Easy,
    category: 'Modules & File System',
    group: 'Step 2: Modules & File System',
    docsUrl: 'https://nodejs.org/docs/latest/api/modules.html#moduleexports',
    starterCode: `function add(a, b) {
  return a + b;
}

// Your code here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('module.exports') && (userCode.includes('= add') || userCode.includes('{ add }'));
      return [{
        input: 'Code Check',
        expected: 'Function exported',
        actual: passed ? 'Correctly implemented' : 'Missing export',
        passed
      }];
    },
  }
];
