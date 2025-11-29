import { Problem, Difficulty } from '@/types';

export const cssResponsive: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'css-media-query',
    title: 'Media Query',
    description: 'Write a media query that changes the background color of `body` to `lightblue` when the viewport width is `600px` or less.',
    difficulty: Difficulty.Medium,
    category: 'Responsive Design',
    group: 'Step 5: Responsive Design',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries',
    starterCode: `/* Your CSS here */`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('@media') && userCode.includes('max-width: 600px') && userCode.includes('background-color: lightblue');
      return [{
        input: 'Code Check',
        expected: 'Media query for max-width 600px',
        actual: passed ? 'Correctly implemented' : 'Missing media query or styles',
        passed
      }];
    },
  },
  {
    id: 'css-responsive-image',
    title: 'Responsive Image',
    description: 'Make images responsive by setting their `max-width` to `100%` and `height` to `auto`.',
    difficulty: Difficulty.Easy,
    category: 'Responsive Design',
    group: 'Step 5: Responsive Design',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images',
    starterCode: `img {
  /* Your CSS here */
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('max-width: 100%') && userCode.includes('height: auto');
      return [{
        input: 'Code Check',
        expected: 'Responsive image properties',
        actual: passed ? 'Correctly implemented' : 'Missing properties',
        passed
      }];
    },
  },
  {
    id: 'css-viewport',
    title: 'Viewport Meta Tag',
    description: 'Add the standard viewport meta tag for responsive design.',
    difficulty: Difficulty.Easy,
    category: 'Responsive Design',
    group: 'Step 5: Responsive Design',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag',
    starterCode: `<!-- Your code here -->`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('<meta name="viewport"') && userCode.includes('width=device-width') && userCode.includes('initial-scale=1');
      return [{
        input: 'Code Check',
        expected: 'Viewport meta tag',
        actual: passed ? 'Correctly implemented' : 'Missing meta tag or attributes',
        passed
      }];
    },
  },
  {
    id: 'css-rem-units',
    title: 'REM Units',
    description: 'Set the font size of `p` elements to `1.5rem`.',
    difficulty: Difficulty.Easy,
    category: 'Responsive Design',
    group: 'Step 5: Responsive Design',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units',
    starterCode: `p {
  /* Your code here */
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('font-size: 1.5rem');
      return [{
        input: 'Code Check',
        expected: 'font-size: 1.5rem',
        actual: passed ? 'Correctly implemented' : 'Missing font-size',
        passed
      }];
    },
  },
  {
    id: 'css-clamp',
    title: 'Clamp Function',
    description: 'Use `clamp()` to set the width of `.card` to a minimum of 300px, preferred 50%, and maximum 800px.',
    difficulty: Difficulty.Medium,
    category: 'Responsive Design',
    group: 'Step 5: Responsive Design',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/clamp',
    starterCode: `.card {
  /* Your code here */
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('width: clamp(300px, 50%, 800px)');
      return [{
        input: 'Code Check',
        expected: 'width: clamp(300px, 50%, 800px)',
        actual: passed ? 'Correctly implemented' : 'Missing clamp',
        passed
      }];
    },
  }
];
