import { Problem, Difficulty } from '@/types';

export const postgresFunctionsTriggers: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'postgres-function',
    title: 'PL/pgSQL Function',
    description: 'Create a function `calculate_total` that takes `price` and `quantity` and returns the product.',
    difficulty: Difficulty.Medium,
    category: 'Functions',
    group: 'Step 6: Functions & Triggers',
    docsUrl: 'https://www.postgresql.org/docs/current/plpgsql-structure.html',
    starterCode: `CREATE FUNCTION calculate_total(price NUMERIC, quantity INT) 
RETURNS NUMERIC AS $$
BEGIN
  -- Your code here
END;
$$ LANGUAGE plpgsql;`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.toLowerCase().includes('return price * quantity');
      return [{
        input: 'Code Check',
        expected: 'Function returning product',
        actual: passed ? 'Correctly implemented' : 'Missing return logic',
        passed
      }];
    },
  },
  {
    id: 'postgres-trigger',
    title: 'Update Timestamp Trigger',
    description: 'Create a trigger `update_mod_time` that calls a function to set `updated_at = NOW()` before update on `users` table.',
    difficulty: Difficulty.Hard,
    category: 'Triggers',
    group: 'Step 6: Functions & Triggers',
    docsUrl: 'https://www.postgresql.org/docs/current/plpgsql-trigger.html',
    starterCode: `CREATE TRIGGER update_mod_time
-- Your code here
ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.toLowerCase().includes('before update') && userCode.toLowerCase().includes('for each row');
      return [{
        input: 'Code Check',
        expected: 'BEFORE UPDATE trigger',
        actual: passed ? 'Correctly implemented' : 'Missing BEFORE UPDATE',
        passed
      }];
    },
  },
  {
    id: 'postgres-procedure',
    title: 'Create Procedure',
    description: 'Create a stored procedure named `transfer_funds` that takes `from_id`, `to_id`, and `amount` as arguments.',
    difficulty: Difficulty.Medium,
    category: 'Functions & Triggers',
    group: 'Step 6: Functions & Triggers',
    docsUrl: 'https://www.postgresql.org/docs/current/sql-createprocedure.html',
    starterCode: `-- Your SQL here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.toLowerCase().includes('create procedure') && userCode.toLowerCase().includes('language plpgsql');
      return [{
        input: 'Code Check',
        expected: 'CREATE PROCEDURE transfer_funds',
        actual: passed ? 'Correctly implemented' : 'Missing CREATE PROCEDURE',
        passed
      }];
    },
  },
  {
    id: 'postgres-trigger-function',
    title: 'Trigger Function',
    description: 'Create a function `log_changes` that returns `TRIGGER` and inserts a record into an audit table.',
    difficulty: Difficulty.Medium,
    category: 'Functions & Triggers',
    group: 'Step 6: Functions & Triggers',
    docsUrl: 'https://www.postgresql.org/docs/current/plpgsql-trigger.html',
    starterCode: `-- Your SQL here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.toLowerCase().includes('returns trigger') && userCode.toLowerCase().includes('new.');
      return [{
        input: 'Code Check',
        expected: 'Function returning TRIGGER',
        actual: passed ? 'Correctly implemented' : 'Missing RETURNS TRIGGER',
        passed
      }];
    },
  },
  {
    id: 'postgres-drop-function',
    title: 'Drop Function',
    description: 'Write a query to drop the function `calculate_total` taking one integer argument.',
    difficulty: Difficulty.Easy,
    category: 'Functions & Triggers',
    group: 'Step 6: Functions & Triggers',
    docsUrl: 'https://www.postgresql.org/docs/current/sql-dropfunction.html',
    starterCode: `-- Your SQL here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.toLowerCase().includes('drop function') && userCode.includes('(integer)');
      return [{
        input: 'Code Check',
        expected: 'DROP FUNCTION with signature',
        actual: passed ? 'Correctly implemented' : 'Missing DROP FUNCTION or signature',
        passed
      }];
    },
  }
];
