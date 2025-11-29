import { TopicQuestion } from '../types';

export const cssQuestions: TopicQuestion[] = [
  {
    id: 'css-1',
    topic: 'CSS',
    question: 'What is the Box Model in CSS?',
    answer: `The CSS Box Model describes the rectangular boxes that are generated for elements in the document tree. It consists of: \n1. **Content**: The actual content of the element.\n2. **Padding**: Transparent area around the content.\n3. **Border**: A border that goes around the padding and content.\n4. **Margin**: Transparent area outside the border.`,
    difficulty: 'Easy'
  },
  {
    id: 'css-2',
    topic: 'CSS',
    question: 'What is the difference between "visibility: hidden" and "display: none"?',
    answer: `**visibility: hidden**: The element is hidden but still takes up space in the layout.\n**display: none**: The element is removed from the document flow and takes up no space.`,
    difficulty: 'Easy'
  },
  {
    id: 'css-3',
    topic: 'CSS',
    question: 'Explain CSS specificity.',
    answer: `Specificity determines which CSS rule is applied by the browser. It is calculated based on the selectors used:\n1. Inline styles (highest)\n2. IDs\n3. Classes, attributes, pseudo-classes\n4. Elements and pseudo-elements (lowest)\n!important overrides all specificity.`,
    difficulty: 'Medium'
  },
  {
    id: 'css-4',
    topic: 'CSS',
    question: 'What is Flexbox and when should you use it?',
    answer: `Flexbox (Flexible Box Layout) is a one-dimensional layout method for laying out items in rows or columns. It is best used for distributing space between items in an interface and aligning capabilities.`,
    difficulty: 'Medium'
  },
  {
    id: 'css-5',
    topic: 'CSS',
    question: 'What is CSS Grid and how does it differ from Flexbox?',
    answer: `CSS Grid is a two-dimensional layout system (rows and columns). While Flexbox is great for 1D layouts, Grid is better suited for complex 2D layouts where you need to control both rows and columns simultaneously.`,
    difficulty: 'Medium'
  }
];
