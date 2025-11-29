import { Problem, Difficulty } from '@/types';

export const htmlBasics: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'html-structure',
    title: 'Basic HTML Structure',
    description: 'Create a basic HTML document structure with `<!DOCTYPE html>`, `<html>`, `<head>`, and `<body>` tags. Inside body, add an `<h1>` with text "Hello World".',
    difficulty: Difficulty.Easy,
    category: 'Structure',
    group: 'Step 1: Basics',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started',
    starterCode: `<!-- Your HTML here -->`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('<!DOCTYPE html>') && userCode.includes('<html>') && userCode.includes('<body>') && userCode.includes('<h1>Hello World</h1>');
      return [{
        input: 'Code Check',
        expected: 'Standard HTML structure',
        actual: passed ? 'Correctly implemented' : 'Missing tags',
        passed
      }];
    },
  },
  {
    id: 'html-headings-paragraphs',
    title: 'Headings and Paragraphs',
    description: 'Create an `<h2>` heading with text "Subheading" and a `<p>` paragraph with text "This is a paragraph.".',
    difficulty: Difficulty.Easy,
    category: 'Text Content',
    group: 'Step 1: Basics',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements',
    starterCode: `<!-- Your HTML here -->`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('<h2>Subheading</h2>') && userCode.includes('<p>This is a paragraph.</p>');
      return [{
        input: 'Code Check',
        expected: 'h2 and p tags',
        actual: passed ? 'Correctly implemented' : 'Missing tags or text',
        passed
      }];
    },
  },
  {
    id: 'html-paragraph',
    title: 'Paragraph Tag',
    description: 'Create a paragraph with the text "Hello World".',
    difficulty: Difficulty.Easy,
    category: 'Basics',
    group: 'Step 1: Basics',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p',
    starterCode: `<!-- Your code here -->`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('<p>') && userCode.includes('Hello World') && userCode.includes('</p>');
      return [{
        input: 'Code Check',
        expected: 'Paragraph with text',
        actual: passed ? 'Correctly implemented' : 'Missing p tag or text',
        passed
      }];
    },
  },
  {
    id: 'html-link',
    title: 'Anchor Tag',
    description: 'Create a link to "https://google.com" with the text "Google".',
    difficulty: Difficulty.Easy,
    category: 'Basics',
    group: 'Step 1: Basics',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a',
    starterCode: `<!-- Your code here -->`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('<a') && userCode.includes('href="https://google.com"') && userCode.includes('Google');
      return [{
        input: 'Code Check',
        expected: 'Link to Google',
        actual: passed ? 'Correctly implemented' : 'Missing anchor or href',
        passed
      }];
    },
  },
  {
    id: 'html-image',
    title: 'Image Tag',
    description: 'Display an image from "logo.png" with alt text "Logo".',
    difficulty: Difficulty.Easy,
    category: 'Basics',
    group: 'Step 1: Basics',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img',
    starterCode: `<!-- Your code here -->`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('<img') && userCode.includes('src="logo.png"') && userCode.includes('alt="Logo"');
      return [{
        input: 'Code Check',
        expected: 'Image with src and alt',
        actual: passed ? 'Correctly implemented' : 'Missing img, src, or alt',
        passed
      }];
    },
  }
];
