import { Problem, Difficulty } from '@/types';

export const htmlMedia: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'html-audio',
    title: 'Audio Player',
    description: 'Create an audio player using `<audio>` tag with `controls` attribute and a source "music.mp3".',
    difficulty: Difficulty.Easy,
    category: 'Media',
    group: 'Step 4: Media',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio',
    starterCode: `<!-- Your HTML here -->`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('<audio') && userCode.includes('controls') && userCode.includes('src="music.mp3"');
      return [{
        input: 'Code Check',
        expected: 'Audio tag with controls',
        actual: passed ? 'Correctly implemented' : 'Missing audio tag or attributes',
        passed
      }];
    },
  },
  {
    id: 'html-video',
    title: 'Video Player',
    description: 'Create a video player using `<video>` tag with `controls`, `width="320"`, and source "movie.mp4".',
    difficulty: Difficulty.Easy,
    category: 'Media',
    group: 'Step 4: Media',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video',
    starterCode: `<!-- Your HTML here -->`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('<video') && userCode.includes('width="320"') && userCode.includes('src="movie.mp4"');
      return [{
        input: 'Code Check',
        expected: 'Video tag with attributes',
        actual: passed ? 'Correctly implemented' : 'Missing video tag or attributes',
        passed
      }];
    },
  },
  {
    id: 'html-iframe',
    title: 'Iframe',
    description: 'Embed "https://example.com" using an `<iframe>` with width 500 and height 300.',
    difficulty: Difficulty.Easy,
    category: 'Media',
    group: 'Step 4: Media',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe',
    starterCode: `<!-- Your code here -->`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('<iframe') && userCode.includes('src="https://example.com"') && userCode.includes('width="500"');
      return [{
        input: 'Code Check',
        expected: 'Iframe with src and dimensions',
        actual: passed ? 'Correctly implemented' : 'Missing iframe or attributes',
        passed
      }];
    },
  },
  {
    id: 'html-picture',
    title: 'Picture Element',
    description: 'Use the `<picture>` element to provide different image sources based on media queries.',
    difficulty: Difficulty.Medium,
    category: 'Media',
    group: 'Step 4: Media',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture',
    starterCode: `<!-- Your code here -->`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('<picture>') && userCode.includes('<source') && userCode.includes('<img');
      return [{
        input: 'Code Check',
        expected: 'Picture with source and img',
        actual: passed ? 'Correctly implemented' : 'Missing picture structure',
        passed
      }];
    },
  },
  {
    id: 'html-svg',
    title: 'SVG Embedding',
    description: 'Embed a simple SVG circle directly into the HTML.',
    difficulty: Difficulty.Medium,
    category: 'Media',
    group: 'Step 4: Media',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg',
    starterCode: `<!-- Your code here -->`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('<svg') && userCode.includes('<circle') && userCode.includes('</svg>');
      return [{
        input: 'Code Check',
        expected: 'SVG with circle',
        actual: passed ? 'Correctly implemented' : 'Missing svg or circle',
        passed
      }];
    },
  }
];
