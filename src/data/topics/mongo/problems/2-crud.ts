import { Problem, Difficulty } from '@/types';

export const mongoCrud: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'mongo-insert-one',
    title: 'Insert One Document',
    description: 'Write a function `createUser` that takes a `user` object and inserts it into the `users` collection using `insertOne`.',
    difficulty: Difficulty.Easy,
    category: 'CRUD',
    group: 'Step 2: CRUD Operations',
    docsUrl: 'https://www.mongodb.com/docs/manual/reference/method/db.collection.insertOne/',
    starterCode: `async function createUser(db, user) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('insertOne(user)');
      return [{
        input: 'Code Check',
        expected: 'insertOne used',
        actual: passed ? 'Correctly implemented' : 'Missing insertOne',
        passed
      }];
    },
  },
  {
    id: 'mongo-find-many',
    title: 'Find Documents',
    description: 'Write a function `findActiveUsers` that finds all documents in the `users` collection where `isActive` is true.',
    difficulty: Difficulty.Easy,
    category: 'CRUD',
    group: 'Step 2: CRUD Operations',
    docsUrl: 'https://www.mongodb.com/docs/manual/reference/method/db.collection.find/',
    starterCode: `async function findActiveUsers(db) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('find({ isActive: true })') || userCode.includes("find({'isActive': true})");
      return [{
        input: 'Code Check',
        expected: 'find with query',
        actual: passed ? 'Correctly implemented' : 'Missing find or query',
        passed
      }];
    },
  },
  {
    id: 'mongo-update-one',
    title: 'Update Document',
    description: 'Update the first document where `name` is "Alice" to have `age: 30` using `updateOne`.',
    difficulty: Difficulty.Easy,
    category: 'CRUD',
    group: 'Step 2: CRUD Operations',
    docsUrl: 'https://www.mongodb.com/docs/drivers/node/current/usage-examples/updateOne/',
    starterCode: `const collection = db.collection('users');

// Your code here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('updateOne') && userCode.includes('$set') && userCode.includes('age: 30');
      return [{
        input: 'Code Check',
        expected: 'updateOne with $set',
        actual: passed ? 'Correctly implemented' : 'Missing updateOne or $set',
        passed
      }];
    },
  },
  {
    id: 'mongo-delete-one',
    title: 'Delete Document',
    description: 'Delete the first document where `status` is "inactive" using `deleteOne`.',
    difficulty: Difficulty.Easy,
    category: 'CRUD',
    group: 'Step 2: CRUD Operations',
    docsUrl: 'https://www.mongodb.com/docs/drivers/node/current/usage-examples/deleteOne/',
    starterCode: `const collection = db.collection('users');

// Your code here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('deleteOne') && userCode.includes('status: "inactive"');
      return [{
        input: 'Code Check',
        expected: 'deleteOne used',
        actual: passed ? 'Correctly implemented' : 'Missing deleteOne or filter',
        passed
      }];
    },
  },
  {
    id: 'mongo-find-one',
    title: 'Find One Document',
    description: 'Find a single document where `email` is "alice@example.com" using `findOne`.',
    difficulty: Difficulty.Easy,
    category: 'CRUD',
    group: 'Step 2: CRUD Operations',
    docsUrl: 'https://www.mongodb.com/docs/drivers/node/current/usage-examples/findOne/',
    starterCode: `const collection = db.collection('users');

// Your code here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('findOne') && userCode.includes('email: "alice@example.com"');
      return [{
        input: 'Code Check',
        expected: 'findOne used',
        actual: passed ? 'Correctly implemented' : 'Missing findOne or filter',
        passed
      }];
    },
  }
];
