import { Problem, Difficulty } from '@/types';

export const htmlForms: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'html-form-input',
    title: 'Form Input',
    description: 'Create a `<form>` containing an `<input>` of type "text" with name "username" and a `<button>` with type "submit".',
    difficulty: Difficulty.Easy,
    category: 'Forms',
    group: 'Step 2: Forms',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Learn/Forms/Your_first_form',
    videoUrl: 'https://www.youtube.com/watch?v=LhWQlBdqaeM&list=PLu71SKxNbfoDBNF5s-WH6aLbthSEIMhMI&index=12',
    starterCode: `<!-- Your HTML here -->`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('<form') && userCode.includes('<input type="text"') && userCode.includes('name="username"');
      return [{
        input: 'Code Check',
        expected: 'Form with input and button',
        actual: passed ? 'Correctly implemented' : 'Missing form elements',
        passed
      }];
    },
  },
  {
    id: 'html-labels',
    title: 'Labels',
    description: 'Create a `<label>` for an input. The label should have text "Email:" and use the `for` attribute to link to an input with id "email".',
    difficulty: Difficulty.Easy,
    category: 'Forms',
    group: 'Step 2: Forms',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label',
    videoUrl: 'https://www.youtube.com/watch?v=LhWQlBdqaeM&list=PLu71SKxNbfoDBNF5s-WH6aLbthSEIMhMI&index=12',
    starterCode: `<!-- Your HTML here -->`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('for="email"') && userCode.includes('id="email"');
      return [{
        input: 'Code Check',
        expected: 'Label linked to input',
        actual: passed ? 'Correctly implemented' : 'Missing for/id attributes',
        passed
      }];
    },
  },
  {
    id: 'html-textarea',
    title: 'Textarea',
    description: 'Create a textarea with name "message" and 5 rows.',
    difficulty: Difficulty.Easy,
    category: 'Forms',
    group: 'Step 2: Forms',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea',
    videoUrl: 'https://www.youtube.com/watch?v=YR2fepUAp5c&list=PLu71SKxNbfoDBNF5s-WH6aLbthSEIMhMI&index=13',
    starterCode: `<!-- Your code here -->`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('<textarea') && userCode.includes('name="message"') && userCode.includes('rows="5"');
      return [{
        input: 'Code Check',
        expected: 'Textarea with name and rows',
        actual: passed ? 'Correctly implemented' : 'Missing textarea or attributes',
        passed
      }];
    },
  },
  {
    id: 'html-select',
    title: 'Select Dropdown',
    description: 'Create a dropdown with name "color" and options "Red" and "Blue".',
    difficulty: Difficulty.Easy,
    category: 'Forms',
    group: 'Step 2: Forms',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select',
    videoUrl: 'https://www.youtube.com/watch?v=YR2fepUAp5c&list=PLu71SKxNbfoDBNF5s-WH6aLbthSEIMhMI&index=13',
    starterCode: `<!-- Your code here -->`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('<select') && userCode.includes('<option') && userCode.includes('Red');
      return [{
        input: 'Code Check',
        expected: 'Select with options',
        actual: passed ? 'Correctly implemented' : 'Missing select or options',
        passed
      }];
    },
  },
  {
    id: 'html-button',
    title: 'Submit Button',
    description: 'Create a button with type "submit" and text "Send".',
    difficulty: Difficulty.Easy,
    category: 'Forms',
    group: 'Step 2: Forms',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button',
    videoUrl: 'https://www.youtube.com/watch?v=LhWQlBdqaeM&list=PLu71SKxNbfoDBNF5s-WH6aLbthSEIMhMI&index=12',
    starterCode: `<!-- Your code here -->`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('<button') && userCode.includes('type="submit"') && userCode.includes('Send');
      return [{
        input: 'Code Check',
        expected: 'Submit button',
        actual: passed ? 'Correctly implemented' : 'Missing button or type',
        passed
      }];
    },
  }
];
