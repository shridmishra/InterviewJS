import { Problem, Difficulty } from '@/types';

export const mongoBasics: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'mongo-connect',
    title: 'Connect to MongoDB',
    description: 'Write a function `connect` that simulates connecting to MongoDB using mongoose.',
    difficulty: Difficulty.Easy,
    category: 'MongoDB',
    group: 'Step 1: Basics',
    docsUrl: 'https://mongoosejs.com/docs/connections.html',
    starterCode: `async function connect() {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('mongoose.connect');
      return [{
        input: 'Code Check',
        expected: 'Mongoose connection logic',
        actual: passed ? 'Connection logic found' : 'Connection logic missing',
        passed
      }];
    },
  },
  {
    id: 'mongo-client',
    title: 'Create Client',
    description: 'Create a new `MongoClient` instance with the connection string "mongodb://localhost:27017".',
    difficulty: Difficulty.Easy,
    category: 'Basics',
    group: 'Step 1: Basics',
    docsUrl: 'https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/connect/',
    starterCode: `const { MongoClient } = require('mongodb');

// Your code here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('new MongoClient') && userCode.includes('mongodb://localhost:27017');
      return [{
        input: 'Code Check',
        expected: 'MongoClient instantiation',
        actual: passed ? 'Correctly implemented' : 'Missing instantiation or URI',
        passed
      }];
    },
  },
  {
    id: 'mongo-db',
    title: 'Select Database',
    description: 'Given a connected `client`, select the database named "myProject".',
    difficulty: Difficulty.Easy,
    category: 'Basics',
    group: 'Step 1: Basics',
    docsUrl: 'https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/connect/',
    starterCode: `const client = new MongoClient(uri);

async function run() {
  await client.connect();
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('client.db("myProject")') || userCode.includes("client.db('myProject')");
      return [{
        input: 'Code Check',
        expected: 'Select "myProject" database',
        actual: passed ? 'Correctly implemented' : 'Missing database selection',
        passed
      }];
    },
  },
  {
    id: 'mongo-collection',
    title: 'Select Collection',
    description: 'Given a database instance `db`, select the collection named "users".',
    difficulty: Difficulty.Easy,
    category: 'Basics',
    group: 'Step 1: Basics',
    docsUrl: 'https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/connect/',
    starterCode: `const db = client.db("myProject");

// Your code here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('db.collection("users")') || userCode.includes("db.collection('users')");
      return [{
        input: 'Code Check',
        expected: 'Select "users" collection',
        actual: passed ? 'Correctly implemented' : 'Missing collection selection',
        passed
      }];
    },
  },
  {
    id: 'mongo-close',
    title: 'Close Connection',
    description: 'Ensure the client connection is closed in the `finally` block.',
    difficulty: Difficulty.Easy,
    category: 'Basics',
    group: 'Step 1: Basics',
    docsUrl: 'https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/connect/',
    starterCode: `try {
  await client.connect();
} finally {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('client.close()');
      return [{
        input: 'Code Check',
        expected: 'client.close() called',
        actual: passed ? 'Correctly implemented' : 'Missing close call',
        passed
      }];
    },
  }
];
