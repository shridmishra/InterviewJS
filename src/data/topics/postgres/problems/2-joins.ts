import { Problem, Difficulty } from '@/types';

export const postgresJoins: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'postgres-inner-join',
    title: 'Inner Join',
    description: 'Write a SQL query to select `users.name` and `orders.amount` by joining `users` and `orders` tables on `users.id = orders.user_id`.',
    difficulty: Difficulty.Medium,
    category: 'Joins',
    group: 'Step 2: Joins',
    docsUrl: 'https://www.postgresql.org/docs/current/tutorial-join.html',
    starterCode: `-- Your SQL here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.toLowerCase().includes('inner join') && userCode.toLowerCase().includes('on users.id = orders.user_id');
      return [{
        input: 'Code Check',
        expected: 'INNER JOIN used',
        actual: passed ? 'Correctly implemented' : 'Missing INNER JOIN or ON clause',
        passed
      }];
    },
  },
  {
    id: 'postgres-left-join',
    title: 'Left Join',
    description: 'Write a SQL query to select all users and their orders (if any) using a LEFT JOIN.',
    difficulty: Difficulty.Medium,
    category: 'Joins',
    group: 'Step 2: Joins',
    docsUrl: 'https://www.postgresql.org/docs/current/tutorial-join.html',
    starterCode: `-- Your SQL here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.toLowerCase().includes('left join');
      return [{
        input: 'Code Check',
        expected: 'LEFT JOIN used',
        actual: passed ? 'Correctly implemented' : 'Missing LEFT JOIN',
        passed
      }];
    },
  },
  {
    id: 'postgres-right-join',
    title: 'Right Join',
    description: 'Write a query to perform a RIGHT JOIN between `users` and `orders` on `user_id`.',
    difficulty: Difficulty.Medium,
    category: 'Joins',
    group: 'Step 2: Joins',
    docsUrl: 'https://www.postgresql.org/docs/current/tutorial-join.html',
    starterCode: `-- Your SQL here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.toLowerCase().includes('right join') && userCode.toLowerCase().includes('on');
      return [{
        input: 'Code Check',
        expected: 'RIGHT JOIN usage',
        actual: passed ? 'Correctly implemented' : 'Missing RIGHT JOIN or ON',
        passed
      }];
    },
  },
  {
    id: 'postgres-full-join',
    title: 'Full Outer Join',
    description: 'Write a query to perform a FULL OUTER JOIN between `users` and `orders` on `user_id`.',
    difficulty: Difficulty.Medium,
    category: 'Joins',
    group: 'Step 2: Joins',
    docsUrl: 'https://www.postgresql.org/docs/current/tutorial-join.html',
    starterCode: `-- Your SQL here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.toLowerCase().includes('full outer join') || userCode.toLowerCase().includes('full join');
      return [{
        input: 'Code Check',
        expected: 'FULL OUTER JOIN usage',
        actual: passed ? 'Correctly implemented' : 'Missing FULL JOIN',
        passed
      }];
    },
  },
  {
    id: 'postgres-cross-join',
    title: 'Cross Join',
    description: 'Write a query to perform a CROSS JOIN between `colors` and `sizes`.',
    difficulty: Difficulty.Easy,
    category: 'Joins',
    group: 'Step 2: Joins',
    docsUrl: 'https://www.postgresql.org/docs/current/tutorial-join.html',
    starterCode: `-- Your SQL here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.toLowerCase().includes('cross join');
      return [{
        input: 'Code Check',
        expected: 'CROSS JOIN usage',
        actual: passed ? 'Correctly implemented' : 'Missing CROSS JOIN',
        passed
      }];
    },
  }
];
