import { Problem, Difficulty } from '@/types';

export const cssFlexbox: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'css-flex-center',
    title: 'Flex Center',
    description: 'Use Flexbox to center items both horizontally and vertically inside a container `.container`.',
    difficulty: Difficulty.Medium,
    category: 'Flexbox',
    group: 'Step 3: Flexbox',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox',
    starterCode: `.container {
  /* Your CSS here */
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('display: flex') && userCode.includes('justify-content: center') && userCode.includes('align-items: center');
      return [{
        input: 'Code Check',
        expected: 'Flexbox centering properties',
        actual: passed ? 'Correctly implemented' : 'Missing properties',
        passed
      }];
    },
  },
  {
    id: 'css-flex-column',
    title: 'Flex Direction',
    description: 'Set the flex direction of `.container` to `column` so items stack vertically.',
    difficulty: Difficulty.Easy,
    category: 'Flexbox',
    group: 'Step 3: Flexbox',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction',
    starterCode: `.container {
  display: flex;
  /* Your CSS here */
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('flex-direction: column');
      return [{
        input: 'Code Check',
        expected: 'flex-direction set to column',
        actual: passed ? 'Correctly implemented' : 'Missing property',
        passed
      }];
    },
  },
  {
    id: 'css-justify-content',
    title: 'Justify Content',
    description: 'Distribute space between items using `justify-content: space-between`.',
    difficulty: Difficulty.Easy,
    category: 'Flexbox',
    group: 'Step 3: Flexbox',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content',
    starterCode: `.container {
  display: flex;
  /* Your code here */
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('justify-content: space-between');
      return [{
        input: 'Code Check',
        expected: 'justify-content: space-between',
        actual: passed ? 'Correctly implemented' : 'Missing justify-content',
        passed
      }];
    },
  },
  {
    id: 'css-align-items',
    title: 'Align Items',
    description: 'Align items to the start of the cross axis using `align-items: flex-start`.',
    difficulty: Difficulty.Easy,
    category: 'Flexbox',
    group: 'Step 3: Flexbox',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/align-items',
    starterCode: `.container {
  display: flex;
  /* Your code here */
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('align-items: flex-start');
      return [{
        input: 'Code Check',
        expected: 'align-items: flex-start',
        actual: passed ? 'Correctly implemented' : 'Missing align-items',
        passed
      }];
    },
  },
  {
    id: 'css-flex-wrap',
    title: 'Flex Wrap',
    description: 'Allow flex items to wrap onto multiple lines using `flex-wrap`.',
    difficulty: Difficulty.Easy,
    category: 'Flexbox',
    group: 'Step 3: Flexbox',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap',
    starterCode: `.container {
  display: flex;
  /* Your code here */
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('flex-wrap: wrap');
      return [{
        input: 'Code Check',
        expected: 'flex-wrap: wrap',
        actual: passed ? 'Correctly implemented' : 'Missing flex-wrap',
        passed
      }];
    },
  }
];
