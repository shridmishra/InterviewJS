import { Problem, Difficulty } from '@/types';

export const htmlSeo: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'html-meta-tags',
    title: 'SEO Meta Tags',
    description: 'Add a `<meta>` tag for "description" with content "My amazing website" and a `<meta>` tag for "viewport".',
    difficulty: Difficulty.Easy,
    category: 'SEO',
    group: 'Step 6: Best Practices',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta',
    videoUrl: 'https://www.youtube.com/watch?v=-wMbf3qVNsc&list=PLu71SKxNbfoDBNF5s-WH6aLbthSEIMhMI&index=10',
    starterCode: `<!-- Your HTML here -->`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('name="description"') && userCode.includes('content="My amazing website"') && userCode.includes('name="viewport"');
      return [{
        input: 'Code Check',
        expected: 'Meta tags present',
        actual: passed ? 'Correctly implemented' : 'Missing meta tags',
        passed
      }];
    },
  },
  {
    id: 'html-open-graph',
    title: 'Open Graph Tags',
    description: 'Add Open Graph meta tags for `og:title` ("My Site") and `og:image` ("image.jpg") for social media sharing.',
    difficulty: Difficulty.Medium,
    category: 'SEO',
    group: 'Step 6: Best Practices',
    docsUrl: 'https://ogp.me/',
    videoUrl: 'https://www.youtube.com/watch?v=-wMbf3qVNsc&list=PLu71SKxNbfoDBNF5s-WH6aLbthSEIMhMI&index=10',
    starterCode: `<!-- Your HTML here -->`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('property="og:title"') && userCode.includes('property="og:image"');
      return [{
        input: 'Code Check',
        expected: 'OG tags present',
        actual: passed ? 'Correctly implemented' : 'Missing OG tags',
        passed
      }];
    },
  },
  {
    id: 'html-canonical',
    title: 'Canonical Link',
    description: 'Add a canonical link tag pointing to "https://example.com/page".',
    difficulty: Difficulty.Medium,
    category: 'SEO Best Practices',
    group: 'Step 6: SEO Best Practices',
    docsUrl: 'https://developers.google.com/search/docs/crawling-indexing/canonicalization',
    videoUrl: 'https://www.youtube.com/watch?v=-wMbf3qVNsc&list=PLu71SKxNbfoDBNF5s-WH6aLbthSEIMhMI&index=10',
    starterCode: `<!-- Your code here -->`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('rel="canonical"') && userCode.includes('href="https://example.com/page"');
      return [{
        input: 'Code Check',
        expected: 'Canonical link tag',
        actual: passed ? 'Correctly implemented' : 'Missing canonical link',
        passed
      }];
    },
  },
  {
    id: 'html-robots',
    title: 'Robots Meta Tag',
    description: 'Add a meta tag to prevent search engines from indexing the page (`noindex`).',
    difficulty: Difficulty.Medium,
    category: 'SEO Best Practices',
    group: 'Step 6: SEO Best Practices',
    docsUrl: 'https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag',
    videoUrl: 'https://www.youtube.com/watch?v=-wMbf3qVNsc&list=PLu71SKxNbfoDBNF5s-WH6aLbthSEIMhMI&index=10',
    starterCode: `<!-- Your code here -->`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('name="robots"') && userCode.includes('content="noindex"');
      return [{
        input: 'Code Check',
        expected: 'Robots noindex tag',
        actual: passed ? 'Correctly implemented' : 'Missing robots tag',
        passed
      }];
    },
  },
  {
    id: 'html-sitemap',
    title: 'Sitemap Link',
    description: 'Create a link to the sitemap file "sitemap.xml" with `rel="sitemap"`.',
    difficulty: Difficulty.Easy,
    category: 'SEO Best Practices',
    group: 'Step 6: SEO Best Practices',
    docsUrl: 'https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap',
    videoUrl: 'https://www.youtube.com/watch?v=-wMbf3qVNsc&list=PLu71SKxNbfoDBNF5s-WH6aLbthSEIMhMI&index=10',
    starterCode: `<!-- Your code here -->`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('href="sitemap.xml"') && userCode.includes('rel="sitemap"');
      return [{
        input: 'Code Check',
        expected: 'Link to sitemap',
        actual: passed ? 'Correctly implemented' : 'Missing sitemap link',
        passed
      }];
    },
  }
];
