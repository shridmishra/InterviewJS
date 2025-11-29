import { Problem, Difficulty } from '@/types';

export const mongoAggregation: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'mongo-aggregate-match-group',
    title: 'Match and Group',
    description: 'Write an aggregation pipeline that matches users with `status: "active"` and then groups them by `role`, calculating the count of users in each role.',
    difficulty: Difficulty.Hard,
    category: 'Aggregation',
    group: 'Step 5: Aggregation',
    docsUrl: 'https://www.mongodb.com/docs/manual/aggregation/',
    starterCode: `const pipeline = [
  // Your code here
];`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('$match') && userCode.includes('status: "active"') && userCode.includes('$group') && userCode.includes('$sum: 1');
      return [{
        input: 'Code Check',
        expected: 'Pipeline with $match and $group',
        actual: passed ? 'Correctly implemented' : 'Missing stages or logic',
        passed
      }];
    },
  },
  {
    id: 'mongo-lookup',
    title: 'Lookup (Join)',
    description: 'Write an aggregation stage using `$lookup` to join the `orders` collection with the `users` collection on `userId`.',
    difficulty: Difficulty.Hard,
    category: 'Aggregation',
    group: 'Step 5: Aggregation',
    docsUrl: 'https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/',
    starterCode: `const lookupStage = {
  $lookup: {
    // Your code here
  }
};`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('from: "users"') && userCode.includes('localField: "userId"') && userCode.includes('foreignField: "_id"');
      return [{
        input: 'Code Check',
        expected: '$lookup stage defined',
        actual: passed ? 'Correctly implemented' : 'Missing lookup fields',
        passed
      }];
    },
  },
  {
    id: 'mongo-agg-sort',
    title: 'Sort Stage',
    description: 'Add a `$sort` stage to order documents by `age` in descending order.',
    difficulty: Difficulty.Easy,
    category: 'Aggregation',
    group: 'Step 5: Aggregation',
    docsUrl: 'https://www.mongodb.com/docs/manual/reference/operator/aggregation/sort/',
    starterCode: `db.collection('users').aggregate([
  // Your code here
])`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('$sort') && userCode.includes('age: -1');
      return [{
        input: 'Code Check',
        expected: '$sort by age descending',
        actual: passed ? 'Correctly implemented' : 'Missing $sort or order',
        passed
      }];
    },
  },
  {
    id: 'mongo-agg-project',
    title: 'Project Stage',
    description: 'Add a `$project` stage to include only the `name` field and exclude the `_id` field.',
    difficulty: Difficulty.Medium,
    category: 'Aggregation',
    group: 'Step 5: Aggregation',
    docsUrl: 'https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/',
    starterCode: `db.collection('users').aggregate([
  // Your code here
])`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('$project') && userCode.includes('name: 1') && userCode.includes('_id: 0');
      return [{
        input: 'Code Check',
        expected: '$project with name and without _id',
        actual: passed ? 'Correctly implemented' : 'Missing $project or fields',
        passed
      }];
    },
  },
  {
    id: 'mongo-agg-limit',
    title: 'Limit Stage',
    description: 'Add a `$limit` stage to return only the top 5 documents.',
    difficulty: Difficulty.Easy,
    category: 'Aggregation',
    group: 'Step 5: Aggregation',
    docsUrl: 'https://www.mongodb.com/docs/manual/reference/operator/aggregation/limit/',
    starterCode: `db.collection('users').aggregate([
  // Your code here
])`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('$limit') && userCode.includes('5');
      return [{
        input: 'Code Check',
        expected: '$limit to 5',
        actual: passed ? 'Correctly implemented' : 'Missing $limit or value',
        passed
      }];
    },
  }
];
