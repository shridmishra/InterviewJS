import { Problem, Difficulty } from '@/types';

export const postgresAdvancedSql: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'postgres-cte',
    title: 'Common Table Expression (CTE)',
    description: 'Write a query using a CTE named `active_users` to select all users with status "active", and then select everything from that CTE.',
    difficulty: Difficulty.Hard,
    category: 'Advanced SQL',
    group: 'Step 5: Advanced SQL',
    docsUrl: 'https://www.postgresql.org/docs/current/queries-with.html',
    starterCode: `-- Your SQL here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.toLowerCase().includes('with active_users as') && userCode.toLowerCase().includes('select * from active_users');
      return [{
        input: 'Code Check',
        expected: 'CTE defined and used',
        actual: passed ? 'Correctly implemented' : 'Missing WITH clause or selection',
        passed
      }];
    },
  },
  {
    id: 'postgres-window-function',
    title: 'Window Function',
    description: 'Write a query to select `name`, `salary`, and the average salary over all employees using a window function `AVG(salary) OVER ()`.',
    difficulty: Difficulty.Hard,
    category: 'Advanced SQL',
    group: 'Step 5: Advanced SQL',
    docsUrl: 'https://www.postgresql.org/docs/current/tutorial-window.html',
    starterCode: `-- Your SQL here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.toLowerCase().includes('avg(salary) over');
      return [{
        input: 'Code Check',
        expected: 'Window function used',
        actual: passed ? 'Correctly implemented' : 'Missing OVER clause',
        passed
      }];
    },
  },
  {
    id: 'postgres-view',
    title: 'Create View',
    description: 'Create a view named `active_users` that selects all users with `status = "active"`.',
    difficulty: Difficulty.Easy,
    category: 'Advanced SQL',
    group: 'Step 5: Advanced SQL',
    docsUrl: 'https://www.postgresql.org/docs/current/sql-createview.html',
    starterCode: `-- Your SQL here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.toLowerCase().includes('create view') && userCode.toLowerCase().includes('as select');
      return [{
        input: 'Code Check',
        expected: 'CREATE VIEW active_users',
        actual: passed ? 'Correctly implemented' : 'Missing CREATE VIEW',
        passed
      }];
    },
  },
  {
    id: 'postgres-materialized-view',
    title: 'Materialized View',
    description: 'Create a materialized view named `monthly_sales` that calculates sales per month.',
    difficulty: Difficulty.Medium,
    category: 'Advanced SQL',
    group: 'Step 5: Advanced SQL',
    docsUrl: 'https://www.postgresql.org/docs/current/sql-creatematerializedview.html',
    starterCode: `-- Your SQL here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.toLowerCase().includes('create materialized view');
      return [{
        input: 'Code Check',
        expected: 'CREATE MATERIALIZED VIEW',
        actual: passed ? 'Correctly implemented' : 'Missing MATERIALIZED VIEW',
        passed
      }];
    },
  },
  {
    id: 'postgres-jsonb',
    title: 'JSONB Query',
    description: 'Select all rows where the JSONB column `data` contains the key-value pair `{"role": "admin"}` using the `@>` operator.',
    difficulty: Difficulty.Medium,
    category: 'Advanced SQL',
    group: 'Step 5: Advanced SQL',
    docsUrl: 'https://www.postgresql.org/docs/current/functions-json.html',
    starterCode: `-- Your SQL here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('@>') && userCode.includes('{"role": "admin"}');
      return [{
        input: 'Code Check',
        expected: 'JSONB containment operator @>',
        actual: passed ? 'Correctly implemented' : 'Missing @> operator',
        passed
      }];
    },
  }
];
