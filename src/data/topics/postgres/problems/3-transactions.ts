import { Problem, Difficulty } from '@/types';

export const postgresTransactions: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'postgres-begin-commit',
    title: 'Begin and Commit',
    description: 'Write a SQL block that starts a transaction, inserts a user, and then commits the transaction.',
    difficulty: Difficulty.Medium,
    category: 'Transactions',
    group: 'Step 3: Transactions',
    docsUrl: 'https://www.postgresql.org/docs/current/tutorial-transactions.html',
    starterCode: `-- Your SQL here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.toLowerCase().includes('begin') && userCode.toLowerCase().includes('commit');
      return [{
        input: 'Code Check',
        expected: 'BEGIN and COMMIT used',
        actual: passed ? 'Correctly implemented' : 'Missing BEGIN or COMMIT',
        passed
      }];
    },
  },
  {
    id: 'postgres-rollback',
    title: 'Rollback',
    description: 'Write a SQL block that starts a transaction, attempts an update, and then rolls back the transaction.',
    difficulty: Difficulty.Medium,
    category: 'Transactions',
    group: 'Step 3: Transactions',
    docsUrl: 'https://www.postgresql.org/docs/current/tutorial-transactions.html',
    starterCode: `-- Your SQL here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.toLowerCase().includes('begin') && userCode.toLowerCase().includes('rollback');
      return [{
        input: 'Code Check',
        expected: 'BEGIN and ROLLBACK used',
        actual: passed ? 'Correctly implemented' : 'Missing BEGIN or ROLLBACK',
        passed
      }];
    },
  },
  {
    id: 'postgres-savepoint',
    title: 'Savepoint',
    description: 'Create a savepoint named `my_savepoint` within a transaction.',
    difficulty: Difficulty.Medium,
    category: 'Transactions',
    group: 'Step 3: Transactions',
    docsUrl: 'https://www.postgresql.org/docs/current/sql-savepoint.html',
    starterCode: `-- Your SQL here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.toLowerCase().includes('savepoint my_savepoint');
      return [{
        input: 'Code Check',
        expected: 'SAVEPOINT my_savepoint',
        actual: passed ? 'Correctly implemented' : 'Missing SAVEPOINT',
        passed
      }];
    },
  },
  {
    id: 'postgres-rollback-to',
    title: 'Rollback to Savepoint',
    description: 'Rollback the transaction to the savepoint `my_savepoint`.',
    difficulty: Difficulty.Medium,
    category: 'Transactions',
    group: 'Step 3: Transactions',
    docsUrl: 'https://www.postgresql.org/docs/current/sql-rollback-to.html',
    starterCode: `-- Your SQL here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.toLowerCase().includes('rollback to') && userCode.includes('my_savepoint');
      return [{
        input: 'Code Check',
        expected: 'ROLLBACK TO my_savepoint',
        actual: passed ? 'Correctly implemented' : 'Missing ROLLBACK TO',
        passed
      }];
    },
  }
];
