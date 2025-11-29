import { Problem, Difficulty } from '@/types';

export const postgresIndexing: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'postgres-create-index',
    title: 'Create Index',
    description: 'Write a SQL statement to create an index named `idx_users_email` on the `email` column of the `users` table.',
    difficulty: Difficulty.Medium,
    category: 'Indexing',
    group: 'Step 4: Indexing',
    docsUrl: 'https://www.postgresql.org/docs/current/sql-createindex.html',
    starterCode: `-- Your SQL here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.toLowerCase().includes('create index') && userCode.toLowerCase().includes('on users');
      return [{
        input: 'Code Check',
        expected: 'CREATE INDEX statement',
        actual: passed ? 'Correctly implemented' : 'Missing CREATE INDEX',
        passed
      }];
    },
  },
  {
    id: 'postgres-unique-index',
    title: 'Unique Index',
    description: 'Write a SQL statement to create a UNIQUE index on the `username` column of the `users` table.',
    difficulty: Difficulty.Medium,
    category: 'Indexing',
    group: 'Step 4: Indexing',
    docsUrl: 'https://www.postgresql.org/docs/current/indexes-unique.html',
    starterCode: `-- Your SQL here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.toLowerCase().includes('create unique index');
      return [{
        input: 'Code Check',
        expected: 'CREATE UNIQUE INDEX statement',
        actual: passed ? 'Correctly implemented' : 'Missing UNIQUE keyword',
        passed
      }];
    },
  },
  {
    id: 'postgres-drop-index',
    title: 'Drop Index',
    description: 'Write a query to drop the index named `idx_users_email`.',
    difficulty: Difficulty.Easy,
    category: 'Indexing',
    group: 'Step 4: Indexing',
    docsUrl: 'https://www.postgresql.org/docs/current/sql-dropindex.html',
    starterCode: `-- Your SQL here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.toLowerCase().includes('drop index') && userCode.includes('idx_users_email');
      return [{
        input: 'Code Check',
        expected: 'DROP INDEX idx_users_email',
        actual: passed ? 'Correctly implemented' : 'Missing DROP INDEX',
        passed
      }];
    },
  },
  {
    id: 'postgres-partial-index',
    title: 'Partial Index',
    description: 'Create an index `idx_active_users` on `users(email)` where `status` is "active".',
    difficulty: Difficulty.Medium,
    category: 'Indexing',
    group: 'Step 4: Indexing',
    docsUrl: 'https://www.postgresql.org/docs/current/indexes-partial.html',
    starterCode: `-- Your SQL here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.toLowerCase().includes('create index') && userCode.toLowerCase().includes('where status');
      return [{
        input: 'Code Check',
        expected: 'Partial index with WHERE',
        actual: passed ? 'Correctly implemented' : 'Missing WHERE clause',
        passed
      }];
    },
  },
  {
    id: 'postgres-explain',
    title: 'Explain Query',
    description: 'Use `EXPLAIN` to analyze the query `SELECT * FROM users WHERE id = 1`.',
    difficulty: Difficulty.Easy,
    category: 'Indexing',
    group: 'Step 4: Indexing',
    docsUrl: 'https://www.postgresql.org/docs/current/sql-explain.html',
    starterCode: `-- Your SQL here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.toLowerCase().includes('explain') && userCode.toLowerCase().includes('select');
      return [{
        input: 'Code Check',
        expected: 'EXPLAIN SELECT ...',
        actual: passed ? 'Correctly implemented' : 'Missing EXPLAIN',
        passed
      }];
    },
  }
];
