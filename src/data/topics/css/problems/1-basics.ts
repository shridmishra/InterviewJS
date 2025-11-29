import { Problem, Difficulty } from '@/types';

export const cssBasics: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'css-color-font',
    title: 'Colors and Fonts',
    description: 'Write CSS to set the `body` background color to `#f0f0f0` and the font family to `Arial`.',
    difficulty: Difficulty.Easy,
    category: 'Basics',
    group: 'Step 1: Basics',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/Getting_started',
    starterCode: `body {
  /* Your CSS here */
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('background-color: #f0f0f0') && userCode.includes('font-family: Arial');
      return [{
        input: 'Code Check',
        expected: 'Background and font set',
        actual: passed ? 'Correctly implemented' : 'Missing properties',
        passed
      }];
    },
  },
  {
    id: 'css-selectors',
    title: 'Class and ID Selectors',
    description: 'Style elements with class `highlight` to have `color: yellow` and the element with id `main-title` to have `text-align: center`.',
    difficulty: Difficulty.Easy,
    category: 'Basics',
    group: 'Step 1: Basics',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors',
    starterCode: `/* Your CSS here */`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('.highlight') && userCode.includes('color: yellow') && userCode.includes('#main-title') && userCode.includes('text-align: center');
      return [{
        input: 'Code Check',
        expected: 'Class and ID selectors used',
        actual: passed ? 'Correctly implemented' : 'Missing selectors or styles',
        passed
      }];
    },
  },
  {
    id: 'css-background',
    title: 'Background Color',
    description: 'Set the background color of the `body` to "lightblue".',
    difficulty: Difficulty.Easy,
    category: 'Basics',
    group: 'Step 1: Basics',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/background-color',
    starterCode: `body {
  /* Your code here */
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('background-color: lightblue') || userCode.includes('background: lightblue');
      return [{
        input: 'Code Check',
        expected: 'Background lightblue',
        actual: passed ? 'Correctly implemented' : 'Missing background property',
        passed
      }];
    },
  },
  {
    id: 'css-text-align',
    title: 'Text Alignment',
    description: 'Center the text inside `.container`.',
    difficulty: Difficulty.Easy,
    category: 'Basics',
    group: 'Step 1: Basics',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/text-align',
    starterCode: `.container {
  /* Your code here */
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('text-align: center');
      return [{
        input: 'Code Check',
        expected: 'text-align: center',
        actual: passed ? 'Correctly implemented' : 'Missing text-align',
        passed
      }];
    },
  },
  {
    id: 'css-border',
    title: 'Border',
    description: 'Add a "1px solid black" border to `.box`.',
    difficulty: Difficulty.Easy,
    category: 'Basics',
    group: 'Step 1: Basics',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/border',
    starterCode: `.box {
  /* Your code here */
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('border: 1px solid black');
      return [{
        input: 'Code Check',
        expected: 'border: 1px solid black',
        actual: passed ? 'Correctly implemented' : 'Missing border property',
        passed
      }];
    },
  }
];
