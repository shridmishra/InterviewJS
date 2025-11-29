import { Problem, Difficulty } from '@/types';

export const prismaRelationsFiltering: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'prisma-include',
    title: 'Include Relations',
    description: 'Write a function `getUserWithPosts` that finds a user by `id` and includes their `posts` in the result.',
    difficulty: Difficulty.Medium,
    category: 'Relations',
    group: 'Step 4: Relations & Filtering',
    docsUrl: 'https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#include-relational-data',
    starterCode: `async function getUserWithPosts(id) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('include: { posts: true }');
      return [{
        input: 'Code Check',
        expected: 'include: { posts: true } used',
        actual: passed ? 'Correctly implemented' : 'Missing include',
        passed
      }];
    },
  },
  {
    id: 'prisma-nested-write',
    title: 'Nested Write',
    description: 'Write a function `createUserWithPost` that creates a new user and a new post for that user in a single transaction using nested writes.',
    difficulty: Difficulty.Medium,
    category: 'Relations',
    group: 'Step 4: Relations & Filtering',
    docsUrl: 'https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#nested-writes',
    starterCode: `async function createUserWithPost(email, postTitle) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('posts: { create:') || userCode.includes('create: { title: postTitle }');
      return [{
        input: 'Code Check',
        expected: 'Nested create used',
        actual: passed ? 'Correctly implemented' : 'Missing nested create',
        passed
      }];
    },
  },
  {
    id: 'prisma-filter-relation',
    title: 'Filter by Relation',
    description: 'Find all users who have at least one post with `published: true`.',
    difficulty: Difficulty.Medium,
    category: 'Relations & Filtering',
    group: 'Step 4: Relations & Filtering',
    docsUrl: 'https://www.prisma.io/docs/orm/prisma-client/queries/filtering-and-sorting#filtering-by-relation',
    starterCode: `const users = await prisma.user.findMany({
  // Your code here
})`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('posts: {') && userCode.includes('some: {') && userCode.includes('published: true');
      return [{
        input: 'Code Check',
        expected: 'Filter users with published posts',
        actual: passed ? 'Correctly implemented' : 'Missing relation filter',
        passed
      }];
    },
  },
  {
    id: 'prisma-select',
    title: 'Select Fields',
    description: 'Find all users and select only their `id` and `name` fields.',
    difficulty: Difficulty.Easy,
    category: 'Relations & Filtering',
    group: 'Step 4: Relations & Filtering',
    docsUrl: 'https://www.prisma.io/docs/orm/prisma-client/queries/select-fields',
    starterCode: `const users = await prisma.user.findMany({
  // Your code here
})`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('select: {') && userCode.includes('id: true') && userCode.includes('name: true');
      return [{
        input: 'Code Check',
        expected: 'Select id and name',
        actual: passed ? 'Correctly implemented' : 'Missing select or fields',
        passed
      }];
    },
  },
  {
    id: 'prisma-pagination',
    title: 'Pagination',
    description: 'Find the second page of users, assuming a page size of 10 (skip 10, take 10).',
    difficulty: Difficulty.Easy,
    category: 'Relations & Filtering',
    group: 'Step 4: Relations & Filtering',
    docsUrl: 'https://www.prisma.io/docs/orm/prisma-client/queries/pagination',
    starterCode: `const users = await prisma.user.findMany({
  // Your code here
})`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('skip: 10') && userCode.includes('take: 10');
      return [{
        input: 'Code Check',
        expected: 'Skip 10, take 10',
        actual: passed ? 'Correctly implemented' : 'Missing skip or take',
        passed
      }];
    },
  }
];
