import { Problem, Difficulty } from '@/types';

export const javascriptAlgorithms: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'js-binary-search',
    title: 'Binary Search',
    description: 'Implement a binary search function `binarySearch(arr, target)` that returns the index of `target` in a sorted array `arr`, or -1 if not found.',
    difficulty: Difficulty.Hard,
    category: 'Algorithms',
    group: 'Step 7: Algorithms',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array',
    videoUrl: 'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    starterCode: `function binarySearch(arr, target) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('while') && userCode.includes('Math.floor');
      return [{
        input: 'Code Check',
        expected: 'Binary search logic',
        actual: passed ? 'Correctly implemented' : 'Missing loop or mid calculation',
        passed
      }];
    },
  },
  {
    id: 'js-debounce',
    title: 'Debounce Function',
    description: 'Implement a `debounce(func, delay)` function that limits how often `func` is executed.',
    difficulty: Difficulty.Medium,
    category: 'Algorithms',
    group: 'Step 7: Algorithms',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/setTimeout',
    videoUrl: 'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    starterCode: `function debounce(func, delay) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('setTimeout') && userCode.includes('clearTimeout') && userCode.includes('apply') || userCode.includes('call');
      return [{
        input: 'Code Check',
        expected: 'Debounce logic',
        actual: passed ? 'Correctly implemented' : 'Missing timer logic',
        passed
      }];
    },
  },
  {
    id: 'js-throttle',
    title: 'Throttle Function',
    description: 'Implement a `throttle(func, limit)` function that ensures `func` is called at most once every `limit` milliseconds.',
    difficulty: Difficulty.Medium,
    category: 'Algorithms',
    group: 'Step 7: Algorithms',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/setTimeout',
    videoUrl: 'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    starterCode: `function throttle(func, limit) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('setTimeout') && userCode.includes('return');
      return [{
        input: 'Code Check',
        expected: 'Throttle logic',
        actual: passed ? 'Correctly implemented' : 'Missing timer logic',
        passed
      }];
    },
  },
  {
    id: 'js-deep-clone',
    title: 'Deep Clone',
    description: 'Implement a function `deepClone(obj)` that creates a deep copy of a given object.',
    difficulty: Difficulty.Medium,
    category: 'Algorithms',
    group: 'Step 7: Algorithms',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse',
    videoUrl: 'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    starterCode: `function deepClone(obj) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = (userCode.includes('JSON.parse') && userCode.includes('JSON.stringify')) || userCode.includes('structuredClone') || userCode.includes('recursive');
      return [{
        input: 'Code Check',
        expected: 'Deep clone logic',
        actual: passed ? 'Correctly implemented' : 'Missing clone logic',
        passed
      }];
    },
  },
  {
    id: 'js-flatten-array',
    title: 'Flatten Array',
    description: 'Implement a function `flatten(arr)` that flattens a nested array of arbitrary depth.',
    difficulty: Difficulty.Medium,
    category: 'Algorithms',
    group: 'Step 7: Algorithms',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat',
    videoUrl: 'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    starterCode: `function flatten(arr) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('.flat(') || userCode.includes('reduce') || userCode.includes('concat');
      return [{
        input: 'Code Check',
        expected: 'Flatten logic',
        actual: passed ? 'Correctly implemented' : 'Missing flatten logic',
        passed
      }];
    },
  }
];
