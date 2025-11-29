import { Problem, Difficulty } from '@/types';

export const cssAnimations: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'css-transition',
    title: 'Hover Transition',
    description: 'Add a transition to `.button` so that the `background-color` changes smoothly over `0.3s` when hovered.',
    difficulty: Difficulty.Easy,
    category: 'Animations',
    group: 'Step 6: Animations',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/transition',
    starterCode: `.button {
  background-color: blue;
  /* Add transition here */
}

.button:hover {
  background-color: red;
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('transition:') && userCode.includes('0.3s');
      return [{
        input: 'Code Check',
        expected: 'Transition defined',
        actual: passed ? 'Correctly implemented' : 'Missing transition property',
        passed
      }];
    },
  },
  {
    id: 'css-keyframes',
    title: 'Keyframe Animation',
    description: 'Create a `@keyframes` animation named `spin` that rotates an element from 0deg to 360deg, and apply it to `.loader` (infinite loop, 1s duration).',
    difficulty: Difficulty.Medium,
    category: 'Animations',
    group: 'Step 6: Animations',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes',
    starterCode: `/* Define keyframes here */

.loader {
  /* Apply animation here */
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('@keyframes spin') && userCode.includes('rotate(360deg)') && userCode.includes('animation:') && userCode.includes('infinite');
      return [{
        input: 'Code Check',
        expected: 'Keyframes and animation applied',
        actual: passed ? 'Correctly implemented' : 'Missing keyframes or animation property',
        passed
      }];
    },
  },
  {
    id: 'css-transform',
    title: 'Transform',
    description: 'Rotate the `.box` element by 45 degrees.',
    difficulty: Difficulty.Easy,
    category: 'Animations',
    group: 'Step 6: Animations',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/transform',
    starterCode: `.box {
  /* Your code here */
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('transform: rotate(45deg)');
      return [{
        input: 'Code Check',
        expected: 'Rotate 45deg',
        actual: passed ? 'Correctly implemented' : 'Missing transform',
        passed
      }];
    },
  },
  {
    id: 'css-animation-duration',
    title: 'Animation Duration',
    description: 'Set the animation duration of `.spinner` to 2 seconds.',
    difficulty: Difficulty.Easy,
    category: 'Animations',
    group: 'Step 6: Animations',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration',
    starterCode: `.spinner {
  /* Your code here */
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('animation-duration: 2s');
      return [{
        input: 'Code Check',
        expected: 'Duration 2s',
        actual: passed ? 'Correctly implemented' : 'Missing animation-duration',
        passed
      }];
    },
  },
  {
    id: 'css-animation-fill-mode',
    title: 'Animation Fill Mode',
    description: 'Set the animation fill mode of `.fade-in` to `forwards` so it stays at the end state.',
    difficulty: Difficulty.Medium,
    category: 'Animations',
    group: 'Step 6: Animations',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode',
    starterCode: `.fade-in {
  /* Your code here */
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('animation-fill-mode: forwards');
      return [{
        input: 'Code Check',
        expected: 'fill-mode forwards',
        actual: passed ? 'Correctly implemented' : 'Missing animation-fill-mode',
        passed
      }];
    },
  }
];
