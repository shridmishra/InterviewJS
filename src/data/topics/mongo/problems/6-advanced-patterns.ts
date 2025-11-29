import { Problem, Difficulty } from '@/types';

export const mongoAdvancedPatterns: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'mongo-bucket-pattern',
    title: 'Bucket Pattern',
    description: 'Design a schema structure for storing IoT sensor data using the Bucket Pattern to group measurements by hour.',
    difficulty: Difficulty.Hard,
    category: 'Patterns',
    group: 'Step 6: Advanced Patterns',
    docsUrl: 'https://www.mongodb.com/blog/post/building-with-patterns-the-bucket-pattern',
    starterCode: `const sensorDataSchema = {
  sensorId: 1,
  date: "2023-10-27",
  // Add bucket field here
};`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('measurements: [') || userCode.includes('samples: [');
      return [{
        input: 'Code Check',
        expected: 'Array field for measurements',
        actual: passed ? 'Correctly implemented' : 'Missing array field',
        passed
      }];
    },
  },
  {
    id: 'mongo-tree-structure',
    title: 'Tree Structure (Parent Ref)',
    description: 'Define a document structure for a category tree where each category references its parent.',
    difficulty: Difficulty.Medium,
    category: 'Patterns',
    group: 'Step 6: Advanced Patterns',
    docsUrl: 'https://www.mongodb.com/docs/manual/tutorial/model-tree-structures-with-parent-references/',
    starterCode: `const category = {
  _id: "Electronics",
  // Add parent reference here
};`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('parent:');
      return [{
        input: 'Code Check',
        expected: 'Parent reference field',
        actual: passed ? 'Correctly implemented' : 'Missing parent field',
        passed
      }];
    },
  },
  {
    id: 'mongo-subset-pattern',
    title: 'Subset Pattern',
    description: 'Implement the Subset Pattern by embedding the top 5 most recent comments in a `post` document.',
    difficulty: Difficulty.Medium,
    category: 'Advanced Patterns',
    group: 'Step 6: Advanced Patterns',
    docsUrl: 'https://www.mongodb.com/docs/manual/tutorial/model-subset-pattern/',
    starterCode: `const post = {
  title: "My Post",
  // Add comments subset here
};`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('comments:') && userCode.includes('[') && userCode.includes(']');
      return [{
        input: 'Code Check',
        expected: 'Embedded comments array',
        actual: passed ? 'Correctly implemented' : 'Missing comments array',
        passed
      }];
    },
  },
  {
    id: 'mongo-computed-pattern',
    title: 'Computed Pattern',
    description: 'Implement the Computed Pattern by adding a `totalSales` field to a `product` document that is updated periodically.',
    difficulty: Difficulty.Medium,
    category: 'Advanced Patterns',
    group: 'Step 6: Advanced Patterns',
    docsUrl: 'https://www.mongodb.com/docs/manual/tutorial/model-computed-pattern/',
    starterCode: `const product = {
  name: "Widget",
  // Add computed field here
};`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('totalSales:');
      return [{
        input: 'Code Check',
        expected: 'totalSales field',
        actual: passed ? 'Correctly implemented' : 'Missing totalSales',
        passed
      }];
    },
  },
  {
    id: 'mongo-schema-versioning',
    title: 'Schema Versioning',
    description: 'Implement Schema Versioning by adding a `schema_version` field to a document.',
    difficulty: Difficulty.Easy,
    category: 'Advanced Patterns',
    group: 'Step 6: Advanced Patterns',
    docsUrl: 'https://www.mongodb.com/docs/manual/tutorial/model-schema-versioning/',
    starterCode: `const user = {
  name: "Alice",
  // Add version field here
};`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('schema_version:') || userCode.includes('v:');
      return [{
        input: 'Code Check',
        expected: 'Schema version field',
        actual: passed ? 'Correctly implemented' : 'Missing version field',
        passed
      }];
    },
  }
];
