import { Problem, Difficulty } from '@/types';

export const htmlAccessibility: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'html-alt-text',
    title: 'Image Alt Text',
    description: 'Add an image "cat.jpg" with descriptive `alt` text "A cute sleeping cat".',
    difficulty: Difficulty.Easy,
    category: 'Accessibility',
    group: 'Step 5: Accessibility',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#accessibility_concerns',
    starterCode: `<!-- Your HTML here -->`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('alt="A cute sleeping cat"');
      return [{
        input: 'Code Check',
        expected: 'Alt text present',
        actual: passed ? 'Correctly implemented' : 'Missing alt text',
        passed
      }];
    },
  },
  {
    id: 'html-aria-label',
    title: 'ARIA Label',
    description: 'Create a `<button>` with an icon (e.g., "X") and add an `aria-label="Close"` attribute to make it accessible.',
    difficulty: Difficulty.Medium,
    category: 'Accessibility',
    group: 'Step 5: Accessibility',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label',
    starterCode: `<!-- Your HTML here -->`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('aria-label="Close"');
      return [{
        input: 'Code Check',
        expected: 'aria-label used',
        actual: passed ? 'Correctly implemented' : 'Missing aria-label',
        passed
      }];
    },
  },
  {
    id: 'html-role',
    title: 'ARIA Role',
    description: 'Add `role="alert"` to a `div` element to indicate it is an alert message.',
    difficulty: Difficulty.Easy,
    category: 'Accessibility',
    group: 'Step 5: Accessibility',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alert_role',
    starterCode: `<!-- Your code here -->`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('<div') && userCode.includes('role="alert"');
      return [{
        input: 'Code Check',
        expected: 'Div with role alert',
        actual: passed ? 'Correctly implemented' : 'Missing div or role',
        passed
      }];
    },
  },
  {
    id: 'html-tabindex',
    title: 'Tabindex',
    description: 'Make a `div` focusable by adding `tabindex="0"`.',
    difficulty: Difficulty.Medium,
    category: 'Accessibility',
    group: 'Step 5: Accessibility',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex',
    starterCode: `<!-- Your code here -->`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('<div') && userCode.includes('tabindex="0"');
      return [{
        input: 'Code Check',
        expected: 'Div with tabindex 0',
        actual: passed ? 'Correctly implemented' : 'Missing div or tabindex',
        passed
      }];
    },
  },
  {
    id: 'html-lang',
    title: 'Language Attribute',
    description: 'Set the language of the document to English using the `lang` attribute on the `<html>` tag.',
    difficulty: Difficulty.Easy,
    category: 'Accessibility',
    group: 'Step 5: Accessibility',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang',
    starterCode: `<!-- Your code here -->`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('<html') && userCode.includes('lang="en"');
      return [{
        input: 'Code Check',
        expected: 'Html tag with lang en',
        actual: passed ? 'Correctly implemented' : 'Missing html or lang',
        passed
      }];
    },
  }
];
