import { Problem, Difficulty } from '@/types';

export const cssGrid: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'css-grid-layout',
    title: 'Basic Grid',
    description: 'Create a grid container `.grid` with 3 equal columns using `grid-template-columns`.',
    difficulty: Difficulty.Medium,
    category: 'Grid',
    group: 'Step 4: Grid',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout',
    starterCode: `.grid {
  display: grid;
  /* Your CSS here */
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('grid-template-columns: 1fr 1fr 1fr') || userCode.includes('repeat(3, 1fr)');
      return [{
        input: 'Code Check',
        expected: '3 equal columns defined',
        actual: passed ? 'Correctly implemented' : 'Incorrect column definition',
        passed
      }];
    },
  },
  {
    id: 'css-grid-gap',
    title: 'Grid Gap',
    description: 'Add a `20px` gap between grid items in `.grid`.',
    difficulty: Difficulty.Easy,
    category: 'Grid',
    group: 'Step 4: Grid',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/gap',
    starterCode: `.grid {
  display: grid;
  /* Your CSS here */
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('gap: 20px');
      return [{
        input: 'Code Check',
        expected: 'Gap set to 20px',
        actual: passed ? 'Correctly implemented' : 'Missing gap property',
        passed
      }];
    },
  },
  {
    id: 'css-grid-template-columns',
    title: 'Grid Columns',
    description: 'Create a grid with 3 equal columns using `grid-template-columns`.',
    difficulty: Difficulty.Easy,
    category: 'Grid',
    group: 'Step 4: Grid',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns',
    starterCode: `.container {
  display: grid;
  /* Your code here */
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('grid-template-columns: 1fr 1fr 1fr') || userCode.includes('repeat(3, 1fr)');
      return [{
        input: 'Code Check',
        expected: '3 equal columns',
        actual: passed ? 'Correctly implemented' : 'Missing grid-template-columns',
        passed
      }];
    },
  },
  {
    id: 'css-grid-template-rows',
    title: 'Grid Rows',
    description: 'Define two rows, the first 100px and the second auto-sized.',
    difficulty: Difficulty.Easy,
    category: 'Grid',
    group: 'Step 4: Grid',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows',
    starterCode: `.container {
  display: grid;
  /* Your code here */
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('grid-template-rows: 100px auto');
      return [{
        input: 'Code Check',
        expected: '100px auto rows',
        actual: passed ? 'Correctly implemented' : 'Missing grid-template-rows',
        passed
      }];
    },
  },
  {
    id: 'css-grid-area',
    title: 'Grid Area',
    description: 'Assign the grid area "header" to the `.header` class.',
    difficulty: Difficulty.Easy,
    category: 'Grid',
    group: 'Step 4: Grid',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/grid-area',
    starterCode: `.header {
  /* Your code here */
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('grid-area: header');
      return [{
        input: 'Code Check',
        expected: 'grid-area: header',
        actual: passed ? 'Correctly implemented' : 'Missing grid-area',
        passed
      }];
    },
  }
];
