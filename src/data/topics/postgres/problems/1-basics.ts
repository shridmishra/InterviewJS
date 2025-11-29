import { Problem, Difficulty } from '@/types';

export const postgresBasics: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'postgres-select',
    title: 'Select All Users',
    description: 'Write a SQL query to select all columns from the `users` table.',
    difficulty: Difficulty.Easy,
    category: 'PostgreSQL',
    group: 'Step 1: Basics',
    docsUrl: 'https://www.postgresql.org/docs/current/tutorial-select.html',
    starterCode: `-- Your SQL here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.toLowerCase().includes('select * from users');
      return [{
        input: 'Code Check',
        expected: 'SELECT * FROM users',
        actual: passed ? 'Query correct' : 'Query incorrect',
        passed
      }];
    },
  },
  {
    id: 'postgres-insert',
    title: 'Insert Data',
    description: 'Write a SQL query to insert a new user with name "Alice" and email "alice@example.com" into the `users` table.',
    difficulty: Difficulty.Easy,
    category: 'Basics',
    group: 'Step 1: Basics',
    docsUrl: 'https://www.postgresql.org/docs/current/sql-insert.html',
    starterCode: `-- Your SQL here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.toLowerCase().includes('insert into') && userCode.toLowerCase().includes('values');
      return [{
        input: 'Code Check',
        expected: 'INSERT INTO statement',
        actual: passed ? 'Correctly implemented' : 'Missing INSERT INTO or VALUES',
        passed
      }];
    },
  },
  {
    id: 'postgres-update',
    title: 'Update Data',
    description: 'Write a SQL query to update the email of the user with name "Alice" to "alice@newdomain.com".',
    difficulty: Difficulty.Easy,
    category: 'Basics',
    group: 'Step 1: Basics',
    docsUrl: 'https://www.postgresql.org/docs/current/sql-update.html',
    starterCode: `-- Your SQL here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.toLowerCase().includes('update') && userCode.toLowerCase().includes('set') && userCode.toLowerCase().includes('where');
      return [{
        input: 'Code Check',
        expected: 'UPDATE statement with SET and WHERE',
        actual: passed ? 'Correctly implemented' : 'Missing UPDATE, SET, or WHERE',
        passed
      }];
    },
  },
  {
    id: 'postgres-delete',
    title: 'Delete Data',
    description: 'Write a SQL query to delete the user with name "Alice" from the `users` table.',
    difficulty: Difficulty.Easy,
    category: 'Basics',
    group: 'Step 1: Basics',
    docsUrl: 'https://www.postgresql.org/docs/current/sql-delete.html',
    starterCode: `-- Your SQL here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.toLowerCase().includes('delete from') && userCode.toLowerCase().includes('where');
      return [{
        input: 'Code Check',
        expected: 'DELETE FROM statement with WHERE',
        actual: passed ? 'Correctly implemented' : 'Missing DELETE FROM or WHERE',
        passed
      }];
    },
  },
  {
    id: 'postgres-where',
    title: 'Filter Data',
    description: 'Write a SQL query to select all users where `age` is greater than 18.',
    difficulty: Difficulty.Easy,
    category: 'Basics',
    group: 'Step 1: Basics',
    docsUrl: 'https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-WHERE',
    starterCode: `-- Your SQL here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.toLowerCase().includes('select') && userCode.toLowerCase().includes('where') && userCode.includes('> 18');
      return [{
        input: 'Code Check',
        expected: 'SELECT with WHERE > 18',
        actual: passed ? 'Correctly implemented' : 'Missing SELECT, WHERE, or condition',
        passed
      }];
    },
  }
];
