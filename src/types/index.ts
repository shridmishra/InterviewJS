export enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

export enum ProblemStatus {
  Unsolved = 'Unsolved',
  Solved = 'Solved',
  Attempted = 'Attempted',
}

export interface TestCase {
  input: unknown[];
  expectedOutput: unknown;
}

export interface TestResult {
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  category: string;
  group: string;
  docsUrl: string;
  starterCode: string;
  testCases: TestCase[];
  solutionCheck: (userCode: string) => TestResult[];
  status: ProblemStatus;
  isStarred?: boolean;
  notes?: string;
}