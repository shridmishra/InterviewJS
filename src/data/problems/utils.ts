
import { TestCase, TestResult } from '../../types';

export const runTests = (userCode: string, testCases: TestCase[]): TestResult[] => {
  try {
    // This regex is a simple attempt to prevent infinite loops. Not foolproof.
    if (/while\s*\(\s*true\s*\)|for\s*\(\s*;\s*;\s*\)/.test(userCode)) {
        throw new Error("Potential infinite loop detected.");
    }
    const userFn = new Function(`return ${userCode}`)();
    
    if (typeof userFn !== 'function') {
        throw new Error('Provided code is not a function.');
    }

    return testCases.map(tc => {
      let actualOutput: unknown;
      let passed = false;
      try {
        if (tc.customTest) {
          passed = tc.customTest(userCode);
          actualOutput = passed ? tc.expectedOutput : 'Custom test failed';
        } else {
          actualOutput = userFn(...tc.input);
          passed = JSON.stringify(actualOutput) === JSON.stringify(tc.expectedOutput);
        }
      } catch (error: unknown) {
        actualOutput = `Error: ${(error instanceof Error) ? error.message : 'Unknown error'}`;
        passed = false;
      }
      
      return {
        input: JSON.stringify(tc.input),
        expected: JSON.stringify(tc.expectedOutput),
        actual: JSON.stringify(actualOutput),
        passed,
      };
    });
  } catch (error: unknown) {
    return testCases.map(tc => ({
        input: JSON.stringify(tc.input),
        expected: JSON.stringify(tc.expectedOutput),
        actual: `Syntax/Runtime Error: ${(error instanceof Error) ? error.message : 'Unknown error'}`,
        passed: false,
    }));
  }
};
