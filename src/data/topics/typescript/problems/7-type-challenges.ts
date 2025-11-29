import { Problem, Difficulty } from '@/types';

export const typescriptTypeChallenges: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'ts-pick',
    title: 'Implement Pick<T, K>',
    description: 'Implement your own version of the `Pick` utility type, called `MyPick<T, K>`.',
    difficulty: Difficulty.Medium,
    category: 'Type Challenges',
    group: 'Step 7: Type Challenges',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys',
    starterCode: `type MyPick<T, K extends keyof T> = {
  // Your code here
};`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('[P in K]: T[P]');
      return [{
        input: 'Code Check',
        expected: 'Mapped type implementation',
        actual: passed ? 'Correctly implemented' : 'Missing mapped type logic',
        passed
      }];
    },
  },
  {
    id: 'ts-readonly',
    title: 'Implement Readonly<T>',
    description: 'Implement your own version of the `Readonly` utility type, called `MyReadonly<T>`.',
    difficulty: Difficulty.Easy,
    category: 'Type Challenges',
    group: 'Step 7: Type Challenges',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype',
    starterCode: `type MyReadonly<T> = {
  // Your code here
};`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('readonly [P in keyof T]: T[P]');
      return [{
        input: 'Code Check',
        expected: 'Readonly mapped type',
        actual: passed ? 'Correctly implemented' : 'Missing readonly modifier',
        passed
      }];
    },
  },
  {
    id: 'ts-tuple-to-object',
    title: 'Tuple to Object',
    description: 'Implement a type `TupleToObject<T>` that converts a tuple to an object where keys and values are the same.',
    difficulty: Difficulty.Easy,
    category: 'Type Challenges',
    group: 'Step 7: Type Challenges',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/mapped-types.html',
    starterCode: `type TupleToObject<T extends readonly any[]> = {
  // Your code here
};`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('[P in T[number]]: P');
      return [{
        input: 'Code Check',
        expected: 'Mapped type over tuple values',
        actual: passed ? 'Correctly implemented' : 'Missing mapping logic',
        passed
      }];
    },
  },
  {
    id: 'ts-first-of-array',
    title: 'First of Array',
    description: 'Implement a type `First<T>` that takes an array `T` and returns its first element\'s type.',
    difficulty: Difficulty.Easy,
    category: 'Type Challenges',
    group: 'Step 7: Type Challenges',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/conditional-types.html',
    starterCode: `type First<T extends any[]> = 
  // Your code here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('T extends [] ? never : T[0]') || userCode.includes('T["length"] extends 0 ? never : T[0]');
      return [{
        input: 'Code Check',
        expected: 'Conditional type checking empty array',
        actual: passed ? 'Correctly implemented' : 'Missing conditional logic',
        passed
      }];
    },
  },
  {
    id: 'ts-length-of-tuple',
    title: 'Length of Tuple',
    description: 'Implement a type `Length<T>` that returns the length of a tuple `T`.',
    difficulty: Difficulty.Easy,
    category: 'Type Challenges',
    group: 'Step 7: Type Challenges',
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html',
    starterCode: `type Length<T extends readonly any[]> = 
  // Your code here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('T["length"]');
      return [{
        input: 'Code Check',
        expected: 'Access length property',
        actual: passed ? 'Correctly implemented' : 'Missing T["length"]',
        passed
      }];
    },
  }
];
