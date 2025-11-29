import { Problem, Difficulty } from '@/types';

export const cssBoxModel: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'css-margin-padding',
    title: 'Margin and Padding',
    description: 'Set the `div` elements to have `20px` padding and `10px` margin.',
    difficulty: Difficulty.Easy,
    category: 'Box Model',
    group: 'Step 2: Box Model',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model',
    starterCode: `div {
  /* Your CSS here */
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('padding: 20px') && userCode.includes('margin: 10px');
      return [{
        input: 'Code Check',
        expected: 'Padding and margin set',
        actual: passed ? 'Correctly implemented' : 'Missing properties',
        passed
      }];
    },
  },
  {
    id: 'css-border-box',
    title: 'Box Sizing',
    description: 'Apply `box-sizing: border-box` to all elements (`*`) to include padding and border in the element\'s total width and height.',
    difficulty: Difficulty.Easy,
    category: 'Box Model',
    group: 'Step 2: Box Model',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing',
    starterCode: `* {
  /* Your CSS here */
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('box-sizing: border-box');
      return [{
        input: 'Code Check',
        expected: 'box-sizing set to border-box',
        actual: passed ? 'Correctly implemented' : 'Missing property',
        passed
      }];
    },
  },
  {
    id: 'css-box-sizing',
    title: 'Box Sizing',
    description: 'Set `box-sizing` to `border-box` for all elements (`*`).',
    difficulty: Difficulty.Medium,
    category: 'Box Model',
    group: 'Step 2: Box Model',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing',
    starterCode: `* {
  /* Your code here */
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('box-sizing: border-box');
      return [{
        input: 'Code Check',
        expected: 'box-sizing: border-box',
        actual: passed ? 'Correctly implemented' : 'Missing box-sizing',
        passed
      }];
    },
  },
  {
    id: 'css-width-height',
    title: 'Width and Height',
    description: 'Set the width to 100% and height to 500px for `.hero`.',
    difficulty: Difficulty.Easy,
    category: 'Box Model',
    group: 'Step 2: Box Model',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/width',
    starterCode: `.hero {
  /* Your code here */
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('width: 100%') && userCode.includes('height: 500px');
      return [{
        input: 'Code Check',
        expected: 'Width 100% and height 500px',
        actual: passed ? 'Correctly implemented' : 'Missing width or height',
        passed
      }];
    },
  },
  {
    id: 'css-border-radius',
    title: 'Border Radius',
    description: 'Make `.avatar` a circle by setting `border-radius` to 50%.',
    difficulty: Difficulty.Easy,
    category: 'Box Model',
    group: 'Step 2: Box Model',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius',
    starterCode: `.avatar {
  /* Your code here */
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('border-radius: 50%');
      return [{
        input: 'Code Check',
        expected: 'border-radius: 50%',
        actual: passed ? 'Correctly implemented' : 'Missing border-radius',
        passed
      }];
    },
  }
];
