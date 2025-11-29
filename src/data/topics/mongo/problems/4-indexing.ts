import { Problem, Difficulty } from '@/types';

export const mongoIndexing: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'mongo-create-index',
    title: 'Create Index',
    description: 'Write a function `createEmailIndex` that creates a unique index on the `email` field of the `users` collection.',
    difficulty: Difficulty.Medium,
    category: 'Indexing',
    group: 'Step 4: Indexing',
    docsUrl: 'https://www.mongodb.com/docs/manual/reference/method/db.collection.createIndex/',
    starterCode: `async function createEmailIndex(db) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('createIndex({ email: 1 }, { unique: true })');
      return [{
        input: 'Code Check',
        expected: 'Unique index on email',
        actual: passed ? 'Correctly implemented' : 'Missing createIndex or unique option',
        passed
      }];
    },
  },
  {
    id: 'mongo-compound-index',
    title: 'Compound Index',
    description: 'Create a compound index on `lastName` (ascending) and `firstName` (ascending) for the `users` collection.',
    difficulty: Difficulty.Medium,
    category: 'Indexing',
    group: 'Step 4: Indexing',
    docsUrl: 'https://www.mongodb.com/docs/manual/core/index-compound/',
    starterCode: `async function createNameIndex(db) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('createIndex({ lastName: 1, firstName: 1 })');
      return [{
        input: 'Code Check',
        expected: 'Compound index created',
        actual: passed ? 'Correctly implemented' : 'Missing compound index definition',
        passed
      }];
    },
  },
  {
    id: 'mongo-unique-index',
    title: 'Unique Index',
    description: 'Create a unique index on the `email` field to prevent duplicate emails.',
    difficulty: Difficulty.Easy,
    category: 'Indexing',
    group: 'Step 4: Indexing',
    docsUrl: 'https://www.mongodb.com/docs/manual/core/index-unique/',
    starterCode: `db.collection('users').createIndex(
  // Your code here
);`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('unique: true') && userCode.includes('email: 1');
      return [{
        input: 'Code Check',
        expected: 'Unique index on email',
        actual: passed ? 'Correctly implemented' : 'Missing unique or email',
        passed
      }];
    },
  },
  {
    id: 'mongo-text-index',
    title: 'Text Index',
    description: 'Create a text index on the `description` field to enable text search.',
    difficulty: Difficulty.Medium,
    category: 'Indexing',
    group: 'Step 4: Indexing',
    docsUrl: 'https://www.mongodb.com/docs/manual/core/index-text/',
    starterCode: `db.collection('products').createIndex(
  // Your code here
);`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('description: "text"') || userCode.includes("description: 'text'");
      return [{
        input: 'Code Check',
        expected: 'Text index on description',
        actual: passed ? 'Correctly implemented' : 'Missing text index',
        passed
      }];
    },
  },
  {
    id: 'mongo-list-indexes',
    title: 'List Indexes',
    description: 'List all indexes on the `users` collection.',
    difficulty: Difficulty.Easy,
    category: 'Indexing',
    group: 'Step 4: Indexing',
    docsUrl: 'https://www.mongodb.com/docs/manual/reference/method/db.collection.getIndexes/',
    starterCode: `// Your code here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('.indexes()') || userCode.includes('.listIndexes()');
      return [{
        input: 'Code Check',
        expected: 'List indexes method',
        actual: passed ? 'Correctly implemented' : 'Missing list method',
        passed
      }];
    },
  }
];
