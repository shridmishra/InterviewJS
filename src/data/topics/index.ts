export * from './types';

import { TopicQuestion } from './types';
import { jsQuestions } from './javascript';
import { tsQuestions } from './typescript';
import { reactQuestions } from './react';
import { nextjsQuestions } from './nextjs';
import { mongoQuestions } from './mongo';
import { expressQuestions } from './express';
import { backendQuestions } from './nodejs';
import { prismaQuestions } from './prisma';
import { postgresQuestions } from './postgres';
import { htmlQuestions } from './html';
import { cssQuestions } from './css';

// Combine all questions
const allQuestions: TopicQuestion[] = [
  ...jsQuestions,
  ...tsQuestions,
  ...reactQuestions,
  ...nextjsQuestions,
  ...mongoQuestions,
  ...expressQuestions,
  ...backendQuestions,
  ...prismaQuestions,
  ...postgresQuestions,
  ...htmlQuestions,
  ...cssQuestions
];

/**
 * Get random topic questions from all topics
 * @param count Number of questions to return
 * @returns Array of random topic questions
 */
export function getRandomTopicQuestions(count: number): TopicQuestion[] {
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export {
  jsQuestions,
  tsQuestions,
  reactQuestions,
  nextjsQuestions,
  mongoQuestions,
  expressQuestions,
  backendQuestions,
  prismaQuestions,
  postgresQuestions,
  htmlQuestions,
  cssQuestions
};
