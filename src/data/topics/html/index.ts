import { TopicQuestion } from '../types';

export const htmlQuestions: TopicQuestion[] = [
  {
    id: 'html-1',
    topic: 'HTML',
    question: 'What is the DOCTYPE declaration and why is it important?',
    answer: `The \`<!DOCTYPE>\` declaration is not an HTML tag; it is an instruction to the web browser about what version of HTML the page is written in. It ensures that the browser renders the content in "standards mode" rather than "quirks mode".`,
    difficulty: 'Easy'
  },
  {
    id: 'html-2',
    topic: 'HTML',
    question: 'What is the difference between block-level and inline elements?',
    answer: `**Block-level elements** start on a new line and take up the full width available (e.g., \`<div>\`, \`<p>\`, \`<h1>\`). \n**Inline elements** do not start on a new line and only take up as much width as necessary (e.g., \`<span>\`, \`<a>\`, \`<img>\`).`,
    difficulty: 'Easy'
  },
  {
    id: 'html-3',
    topic: 'HTML',
    question: 'What are semantic HTML tags? Give examples.',
    answer: `Semantic HTML tags clearly describe their meaning in a human- and machine-readable way. Examples include \`<header>\`, \`<footer>\`, \`<article>\`, \`<section>\`, and \`<nav>\`. They improve accessibility and SEO.`,
    difficulty: 'Medium'
  },
  {
    id: 'html-4',
    topic: 'HTML',
    question: 'What is the purpose of the "alt" attribute on images?',
    answer: `The \`alt\` attribute provides alternative text for an image if it cannot be displayed. It is crucial for accessibility (screen readers read it) and SEO.`,
    difficulty: 'Easy'
  },
  {
    id: 'html-5',
    topic: 'HTML',
    question: 'Explain the difference between localStorage, sessionStorage, and cookies.',
    answer: `**localStorage**: Stores data with no expiration date. Data persists even after the browser is closed.\n**sessionStorage**: Stores data for one session. Data is lost when the browser tab is closed.\n**cookies**: Stores data that has an expiration date and is sent to the server with every HTTP request.`,
    difficulty: 'Medium'
  }
];
