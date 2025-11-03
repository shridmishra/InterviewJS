import React from 'react';
import { TestResult } from '../types';

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.693a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

// Fix: Define component props interface
interface TestResultsDisplayProps {
  results: TestResult[];
}

const TestResultsDisplay: React.FC<TestResultsDisplayProps> = ({ results }) => {
    const passedCount = results.filter(r => r.passed).length;
    const totalCount = results.length;
    const allPassed = passedCount === totalCount;

  return (
    <div>
      <h3 className="text-md font-semibold mb-3 flex items-center gap-2">
        <span className={allPassed ? 'text-green-500' : 'text-yellow-500'}>
            {passedCount} / {totalCount} Tests Passed
        </span>
      </h3>
      <div className="space-y-2">
        {results.map((result, index) => (
          <div key={index} className={`p-2 rounded-md text-xs ${result.passed ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
            <div className="flex items-center gap-2 mb-1">
              {result.passed ? <CheckIcon/> : <XIcon/>}
              <span className="font-semibold text-gray-800 dark:text-gray-200">Test Case #{index + 1}</span>
              <span className={`font-bold ${result.passed ? 'text-green-500' : 'text-red-500'}`}>
                {result.passed ? 'Passed' : 'Failed'}
              </span>
            </div>
            {!result.passed && (
                <div className="text-xs font-mono space-y-1 pl-6 text-gray-600 dark:text-gray-400 border-l border-gray-300 dark:border-gray-700 ml-2 py-1">
                    <p><span className="font-semibold text-gray-700 dark:text-gray-300">Input:</span> {result.input}</p>
                    <p><span className="font-semibold text-red-600 dark:text-red-300">Actual:</span> {result.actual}</p>
                    <p><span className="font-semibold text-green-600 dark:text-green-300">Expected:</span> {result.expected}</p>
                </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestResultsDisplay;