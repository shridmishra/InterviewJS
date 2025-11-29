import { Problem, Difficulty } from '@/types';

export const prismaBasics: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'prisma-model',
    title: 'Define a Model',
    description: 'Define a Prisma model `User` with an `id` (Int, @id, default autoincrement) and `email` (String, unique).',
    difficulty: Difficulty.Easy,
    category: 'Prisma',
    group: 'Step 1: Basics',
    docsUrl: 'https://www.prisma.io/docs/concepts/components/prisma-schema/data-model',
    starterCode: `model User {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('model User') && userCode.includes('@id') && userCode.includes('@unique');
      return [{
        input: 'Code Check',
        expected: 'User model with id and unique email',
        actual: passed ? 'Model correct' : 'Model incorrect',
        passed
      }];
    },
  },
  {
    id: 'prisma-generate',
    title: 'Generate Client',
    description: 'What command do you run to generate the Prisma Client after modifying the schema?',
    difficulty: Difficulty.Easy,
    category: 'Basics',
    group: 'Step 1: Basics',
    docsUrl: 'https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/generating-prisma-client',
    starterCode: `// Write the command inside a comment
// e.g., // command here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('npx prisma generate') || userCode.includes('yarn prisma generate');
      return [{
        input: 'Code Check',
        expected: 'prisma generate command',
        actual: passed ? 'Correctly implemented' : 'Missing command',
        passed
      }];
    },
  },
  {
    id: 'prisma-migrate',
    title: 'Create Migration',
    description: 'What command do you run to create a new migration and apply it to the database?',
    difficulty: Difficulty.Easy,
    category: 'Basics',
    group: 'Step 1: Basics',
    docsUrl: 'https://www.prisma.io/docs/orm/prisma-migrate/getting-started',
    starterCode: `// Write the command inside a comment`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('prisma migrate dev');
      return [{
        input: 'Code Check',
        expected: 'prisma migrate dev command',
        actual: passed ? 'Correctly implemented' : 'Missing command',
        passed
      }];
    },
  },
  {
    id: 'prisma-studio',
    title: 'Prisma Studio',
    description: 'What command opens Prisma Studio to view and edit data in the browser?',
    difficulty: Difficulty.Easy,
    category: 'Basics',
    group: 'Step 1: Basics',
    docsUrl: 'https://www.prisma.io/docs/orm/tools/prisma-studio',
    starterCode: `// Write the command inside a comment`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('prisma studio');
      return [{
        input: 'Code Check',
        expected: 'prisma studio command',
        actual: passed ? 'Correctly implemented' : 'Missing command',
        passed
      }];
    },
  }
];
