import { Problem, Difficulty } from '@/types';

export const prismaOptimization: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'prisma-raw-query-optimization',
    title: 'Optimized Raw Query',
    description: 'Write a raw SQL query using `prisma.$queryRaw` to select only the `id` and `email` of users to avoid fetching unnecessary data.',
    difficulty: Difficulty.Medium,
    category: 'Optimization',
    group: 'Step 6: Optimization',
    docsUrl: 'https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access',
    starterCode: `async function getUsersMinimal() {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('SELECT id, email') || userCode.includes('SELECT "id", "email"');
      return [{
        input: 'Code Check',
        expected: 'SELECT specific columns',
        actual: passed ? 'Correctly implemented' : 'Missing specific column selection',
        passed
      }];
    },
  },
  {
    id: 'prisma-connection-pooling',
    title: 'Connection Pooling Concept',
    description: 'In a serverless environment, how should you instantiate the PrismaClient to avoid connection exhaustion? (Write the code pattern).',
    difficulty: Difficulty.Hard,
    category: 'Optimization',
    group: 'Step 6: Optimization',
    docsUrl: 'https://www.prisma.io/docs/guides/performance-and-optimization/connection-management',
    starterCode: `// Global variable pattern
let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('global.prisma') || userCode.includes('globalThis.prisma');
      return [{
        input: 'Code Check',
        expected: 'Global variable usage',
        actual: passed ? 'Correctly implemented' : 'Missing global variable pattern',
        passed
      }];
    },
  },
  {
    id: 'prisma-tracing',
    title: 'Tracing',
    description: 'Enable tracing in the Prisma Client by setting the `previewFeatures` in the schema.',
    difficulty: Difficulty.Medium,
    category: 'Optimization',
    group: 'Step 6: Optimization',
    docsUrl: 'https://www.prisma.io/docs/orm/prisma-client/observability-and-logging/tracing',
    starterCode: `generator client {
  provider = "prisma-client-js"
  // Add previewFeatures here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('previewFeatures') && userCode.includes('"tracing"');
      return [{
        input: 'Code Check',
        expected: 'Tracing enabled',
        actual: passed ? 'Correctly implemented' : 'Missing tracing feature',
        passed
      }];
    },
  },
  {
    id: 'prisma-accelerate',
    title: 'Prisma Accelerate',
    description: 'Configure the Prisma Client to use Prisma Accelerate for caching. Use the `withAccelerate` extension.',
    difficulty: Difficulty.Medium,
    category: 'Optimization',
    group: 'Step 6: Optimization',
    docsUrl: 'https://www.prisma.io/data-platform/accelerate',
    starterCode: `import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(
  // Your code here
)`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('withAccelerate()');
      return [{
        input: 'Code Check',
        expected: 'withAccelerate extension',
        actual: passed ? 'Correctly implemented' : 'Missing extension',
        passed
      }];
    },
  },
  {
    id: 'prisma-pulse',
    title: 'Prisma Pulse',
    description: 'Use Prisma Pulse to stream database changes for the `User` model.',
    difficulty: Difficulty.Hard,
    category: 'Optimization',
    group: 'Step 6: Optimization',
    docsUrl: 'https://www.prisma.io/data-platform/pulse',
    starterCode: `const stream = await prisma.user.stream({
  // Your code here
})`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('stream') || userCode.includes('subscribe');
      return [{
        input: 'Code Check',
        expected: 'Pulse stream usage',
        actual: passed ? 'Correctly implemented' : 'Missing stream',
        passed
      }];
    },
  }
];
