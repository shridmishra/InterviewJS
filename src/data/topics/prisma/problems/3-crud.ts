import { Problem, Difficulty } from '@/types';

export const prismaCrud: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'prisma-create',
    title: 'Create Record',
    description: 'Write a function `createUser` that uses `prisma.user.create` to create a new user with the given `email` and `name`.',
    difficulty: Difficulty.Easy,
    category: 'CRUD',
    group: 'Step 3: CRUD Operations',
    docsUrl: 'https://www.prisma.io/docs/concepts/components/prisma-client/crud#create',
    starterCode: `async function createUser(email, name) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('prisma.user.create') && userCode.includes('data:');
      return [{
        input: 'Code Check',
        expected: 'prisma.user.create used',
        actual: passed ? 'Correctly implemented' : 'Missing create call',
        passed
      }];
    },
  },
  {
    id: 'prisma-find-many',
    title: 'Find Many',
    description: 'Write a function `getUsers` that finds all users who have a `role` of "ADMIN".',
    difficulty: Difficulty.Easy,
    category: 'CRUD',
    group: 'Step 3: CRUD Operations',
    docsUrl: 'https://www.prisma.io/docs/concepts/components/prisma-client/crud#read',
    starterCode: `async function getUsers() {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('prisma.user.findMany') && userCode.includes('where: { role: \'ADMIN\' }');
      return [{
        input: 'Code Check',
        expected: 'findMany with where clause',
        actual: passed ? 'Correctly implemented' : 'Missing findMany or where',
        passed
      }];
    },
  },
  {
    id: 'prisma-update',
    title: 'Update Record',
    description: 'Update the user with `id: 1` to have `name: "Alice"`.',
    difficulty: Difficulty.Easy,
    category: 'CRUD',
    group: 'Step 3: CRUD Operations',
    docsUrl: 'https://www.prisma.io/docs/orm/prisma-client/queries/crud#update',
    starterCode: `const user = await prisma.user.update({
  // Your code here
})`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('where: { id: 1 }') && userCode.includes('data: { name: "Alice" }');
      return [{
        input: 'Code Check',
        expected: 'Update user 1 name to Alice',
        actual: passed ? 'Correctly implemented' : 'Missing where or data',
        passed
      }];
    },
  },
  {
    id: 'prisma-delete',
    title: 'Delete Record',
    description: 'Delete the user with `id: 1`.',
    difficulty: Difficulty.Easy,
    category: 'CRUD',
    group: 'Step 3: CRUD Operations',
    docsUrl: 'https://www.prisma.io/docs/orm/prisma-client/queries/crud#delete',
    starterCode: `const user = await prisma.user.delete({
  // Your code here
})`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('where: { id: 1 }');
      return [{
        input: 'Code Check',
        expected: 'Delete user 1',
        actual: passed ? 'Correctly implemented' : 'Missing where clause',
        passed
      }];
    },
  },
  {
    id: 'prisma-upsert',
    title: 'Upsert Record',
    description: 'Upsert a user with `email: "alice@prisma.io"`. If found, update `name` to "Alice". If not, create with `email` and `name`.',
    difficulty: Difficulty.Medium,
    category: 'CRUD',
    group: 'Step 3: CRUD Operations',
    docsUrl: 'https://www.prisma.io/docs/orm/prisma-client/queries/crud#upsert',
    starterCode: `const user = await prisma.user.upsert({
  // Your code here
})`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('where: { email:') && userCode.includes('update:') && userCode.includes('create:');
      return [{
        input: 'Code Check',
        expected: 'Upsert logic',
        actual: passed ? 'Correctly implemented' : 'Missing where, update, or create',
        passed
      }];
    },
  }
];
