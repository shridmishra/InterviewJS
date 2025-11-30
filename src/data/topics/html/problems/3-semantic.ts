import { Problem, Difficulty } from '@/types';

export const htmlSemantic: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'html-semantic-layout',
    title: 'Semantic Layout',
    description: 'Create a layout using semantic tags: `<header>`, `<nav>`, `<main>`, `<article>`, and `<footer>`.',
    difficulty: Difficulty.Medium,
    category: 'Semantic HTML',
    group: 'Step 3: Semantic HTML',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html',
    videoUrl: 'https://www.youtube.com/watch?v=DSRMCZwM3YE&list=PLu71SKxNbfoDBNF5s-WH6aLbthSEIMhMI&index=11',
    starterCode: `<!-- Your HTML here -->`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('<header>') && userCode.includes('<nav>') && userCode.includes('<main>') && userCode.includes('<footer>');
      return [{
        input: 'Code Check',
        expected: 'Semantic tags used',
        actual: passed ? 'Correctly implemented' : 'Missing semantic tags',
        passed
      }];
    },
  },
  {
    id: 'html-figure',
    title: 'Figure and Caption',
    description: 'Use `<figure>` and `<figcaption>` to display an image "logo.png" with a caption "Company Logo".',
    difficulty: Difficulty.Easy,
    category: 'Semantic HTML',
    group: 'Step 3: Semantic HTML',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure',
    videoUrl: 'https://www.youtube.com/watch?v=DSRMCZwM3YE&list=PLu71SKxNbfoDBNF5s-WH6aLbthSEIMhMI&index=11',
    starterCode: `<!-- Your HTML here -->`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('<figure>') && userCode.includes('<figcaption>Company Logo</figcaption>') && userCode.includes('<img');
      return [{
        input: 'Code Check',
        expected: 'Figure with caption',
        actual: passed ? 'Correctly implemented' : 'Missing figure or caption',
        passed
      }];
    },
  },
  {
    id: 'html-nav',
    title: 'Navigation',
    description: 'Use the `<nav>` element to wrap a list of links.',
    difficulty: Difficulty.Easy,
    category: 'Semantic HTML',
    group: 'Step 3: Semantic HTML',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav',
    videoUrl: 'https://www.youtube.com/watch?v=DSRMCZwM3YE&list=PLu71SKxNbfoDBNF5s-WH6aLbthSEIMhMI&index=11',
    starterCode: `<!-- Your code here -->`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('<nav>') && userCode.includes('<ul>') && userCode.includes('</nav>');
      return [{
        input: 'Code Check',
        expected: 'Nav element with list',
        actual: passed ? 'Correctly implemented' : 'Missing nav or list',
        passed
      }];
    },
  },
  {
    id: 'html-main',
    title: 'Main Content',
    description: 'Use the `<main>` element to wrap the primary content of the page.',
    difficulty: Difficulty.Easy,
    category: 'Semantic HTML',
    group: 'Step 3: Semantic HTML',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main',
    videoUrl: 'https://www.youtube.com/watch?v=DSRMCZwM3YE&list=PLu71SKxNbfoDBNF5s-WH6aLbthSEIMhMI&index=11',
    starterCode: `<!-- Your code here -->`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('<main>') && userCode.includes('</main>');
      return [{
        input: 'Code Check',
        expected: 'Main element',
        actual: passed ? 'Correctly implemented' : 'Missing main tag',
        passed
      }];
    },
  },
  {
    id: 'html-article',
    title: 'Article Tag',
    description: 'Use the `<article>` element to wrap a blog post content.',
    difficulty: Difficulty.Easy,
    category: 'Semantic HTML',
    group: 'Step 3: Semantic HTML',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article',
    videoUrl: 'https://www.youtube.com/watch?v=DSRMCZwM3YE&list=PLu71SKxNbfoDBNF5s-WH6aLbthSEIMhMI&index=11',
    starterCode: `<!-- Your code here -->`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('<article>') && userCode.includes('</article>');
      return [{
        input: 'Code Check',
        expected: 'Article element',
        actual: passed ? 'Correctly implemented' : 'Missing article tag',
        passed
      }];
    },
  }
];
