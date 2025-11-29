import { Problem, Difficulty } from '@/types';

export const prismaAdvanced: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'prisma-transaction',
    title: 'Interactive Transaction',
    description: 'Write a function `transferFunds` that takes `fromId`, `toId`, and `amount`. Use `prisma.$transaction` to decrement the balance of one user and increment the other.',
    difficulty: Difficulty.Hard,
    category: 'Advanced',
    group: 'Step 5: Advanced Prisma',
    docsUrl: 'https://www.prisma.io/docs/concepts/components/prisma-client/transactions#interactive-transactions',
    starterCode: `async function transferFunds(fromId, toId, amount) {
  return await prisma.$transaction(async (tx) => {
    // Your code here
  });
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('tx.user.update') && userCode.includes('decrement') && userCode.includes('increment');
      return [{
        input: 'Code Check',
        expected: 'Transaction with updates',
        actual: passed ? 'Correctly implemented' : 'Missing updates or logic',
        passed
      }];
    },
  },
  {
    id: 'prisma-raw-sql',
    title: 'Raw SQL',
    description: 'Use `prisma.$queryRaw` to select all users where `email` contains "example.com".',
    difficulty: Difficulty.Medium,
    category: 'Advanced',
    group: 'Step 5: Advanced Prisma',
    docsUrl: 'https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access',
    starterCode: `async function getUsersRaw() {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('prisma.$queryRaw') && userCode.includes('SELECT') && userCode.includes('FROM');
      return [{
        input: 'Code Check',
        expected: 'Raw SQL query used',
        actual: passed ? 'Correctly implemented' : 'Missing raw query',
        passed
      }];
    },
  },
  {
    id: 'prisma-middleware',
    title: 'Client Middleware',
    description: 'Add a middleware to the Prisma Client that logs the duration of each query.',
    difficulty: Difficulty.Medium,
    category: 'Advanced',
    group: 'Step 5: Advanced Features',
    docsUrl: 'https://www.prisma.io/docs/orm/prisma-client/client-extensions/middleware',
    starterCode: `prisma.$use(async (params, next) => {
  // Your code here
})`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('Date.now()') && userCode.includes('await next(params)');
      return [{
        input: 'Code Check',
        expected: 'Middleware logging duration',
        actual: passed ? 'Correctly implemented' : 'Missing timing logic',
        passed
      }];
    },
  },
  {
    id: 'prisma-extensions',
    title: 'Client Extensions',
    description: 'Extend the Prisma Client to add a custom method `findByEmail` to the `user` model.',
    difficulty: Difficulty.Hard,
    category: 'Advanced',
    group: 'Step 5: Advanced Features',
    docsUrl: 'https://www.prisma.io/docs/orm/prisma-client/client-extensions',
    starterCode: `const xprisma = prisma.$extends({
  model: {
    user: {
      // Your code here
    }
  }
})`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('findByEmail') && userCode.includes('findUnique');
      return [{
        input: 'Code Check',
        expected: 'Extension with findByEmail',
        actual: passed ? 'Correctly implemented' : 'Missing extension method',
        passed
      }];
    },
  },
  {
    id: 'prisma-metrics',
    title: 'Client Metrics',
    description: 'Retrieve the Prisma Client metrics in JSON format.',
    difficulty: Difficulty.Medium,
    category: 'Advanced',
    group: 'Step 5: Advanced Features',
    docsUrl: 'https://www.prisma.io/docs/orm/prisma-client/observability-and-logging/metrics',
    starterCode: `// Your code here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('prisma.$metrics.json()');
      return [{
        input: 'Code Check',
        expected: 'prisma.$metrics.json()',
        actual: passed ? 'Correctly implemented' : 'Missing metrics call',
        passed
      }];
    },
  }
];
