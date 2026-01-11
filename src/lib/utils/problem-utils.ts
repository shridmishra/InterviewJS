import { Problem } from '@/types';

// React problems
import { reactBasics } from '@/data/topics/react/problems/1-basics';
import { reactPropsState } from '@/data/topics/react/problems/2-props-state';
import { reactEffectsLifecycle } from '@/data/topics/react/problems/3-effects-lifecycle';
import { reactHooksContext } from '@/data/topics/react/problems/4-hooks-context';
import { reactAdvanced } from '@/data/topics/react/problems/5-advanced-react';
import { reactProject } from '@/data/topics/react/problems/6-project';
import { reactPatterns } from '@/data/topics/react/problems/7-patterns';

// TypeScript problems
import { typescriptBasics } from '@/data/topics/typescript/problems/1-basics-typescript';
import { typescriptClassesInterfacesEnums } from '@/data/topics/typescript/problems/2-classes-interfaces-enums-typescript';
import { typescriptGenericsUtilityTypes } from '@/data/topics/typescript/problems/3-generics-utility-types-typescript';
import { typescriptAdvancedTypesPatterns } from '@/data/topics/typescript/problems/4-advanced-types-patterns-typescript';
import { typescriptModulesAsync } from '@/data/topics/typescript/problems/5-modules-async-typescript';
import { typescriptRealWorld } from '@/data/topics/typescript/problems/6-real-world-typescript';
import { typescriptTypeChallenges } from '@/data/topics/typescript/problems/7-type-challenges';

// JavaScript problems
import { learnTheBasics } from '@/data/topics/javascript/problems/1-basics-1';
import { arrayManipulation } from '@/data/topics/javascript/problems/2-basics-2';
import { step3Basics3 } from '@/data/topics/javascript/problems/3-basics-3';
import { asynchronousJavaScript } from '@/data/topics/javascript/problems/4-asynchronous-javascript';
import { domManipulation } from '@/data/topics/javascript/problems/5-dom-manipulation';
import { advancedDomAndEvents } from '@/data/topics/javascript/problems/6-advanced-dom-and-events';
import { javascriptAlgorithms } from '@/data/topics/javascript/problems/7-algorithms';
import { miniProjects } from '@/data/topics/javascript/problems/8-mini-projects';

// HTML problems
import { htmlBasics } from '@/data/topics/html/problems/1-basics';
import { htmlForms } from '@/data/topics/html/problems/2-forms';
import { htmlSemantic } from '@/data/topics/html/problems/3-semantic';
import { htmlMedia } from '@/data/topics/html/problems/4-media';
import { htmlAccessibility } from '@/data/topics/html/problems/5-accessibility';
import { htmlSeo } from '@/data/topics/html/problems/6-seo-best-practices';

// CSS problems
import { cssBasics } from '@/data/topics/css/problems/1-basics';
import { cssBoxModel } from '@/data/topics/css/problems/2-box-model';
import { cssFlexbox } from '@/data/topics/css/problems/3-flexbox';
import { cssGrid } from '@/data/topics/css/problems/4-grid';
import { cssResponsive } from '@/data/topics/css/problems/5-responsive';
import { cssAnimations } from '@/data/topics/css/problems/6-animations';

// Next.js problems
import { nextjsBasics } from '@/data/topics/nextjs/problems/1-basics';
import { nextjsRouting } from '@/data/topics/nextjs/problems/2-routing';
import { nextjsDataFetching } from '@/data/topics/nextjs/problems/3-data-fetching';
import { nextjsApiRoutes } from '@/data/topics/nextjs/problems/4-api-routes';
import { nextjsOptimization } from '@/data/topics/nextjs/problems/5-optimization';
import { nextjsRealWorld } from '@/data/topics/nextjs/problems/6-real-world';

// Node.js problems
import { nodeBasics } from '@/data/topics/nodejs/problems/1-basics';
import { nodeModulesFs } from '@/data/topics/nodejs/problems/2-modules-filesystem';
import { nodeEventsStreams } from '@/data/topics/nodejs/problems/3-events-streams';
import { nodeHttpServer } from '@/data/topics/nodejs/problems/4-http-server';
import { nodeAdvanced } from '@/data/topics/nodejs/problems/5-advanced-nodejs';
import { nodeProject } from '@/data/topics/nodejs/problems/6-project';

// Express problems
import { expressBasics } from '@/data/topics/express/problems/1-basics';
import { expressMiddleware } from '@/data/topics/express/problems/2-middleware';
import { expressRouting } from '@/data/topics/express/problems/3-routing';
import { expressErrorHandling } from '@/data/topics/express/problems/4-error-handling';
import { expressDatabase } from '@/data/topics/express/problems/5-database-integration';
import { expressSecurity } from '@/data/topics/express/problems/6-security-auth';

// MongoDB problems
import { mongoBasics } from '@/data/topics/mongo/problems/1-basics';
import { mongoCrud } from '@/data/topics/mongo/problems/2-crud';
import { mongoSchemaValidation } from '@/data/topics/mongo/problems/3-schema-validation';
import { mongoIndexing } from '@/data/topics/mongo/problems/4-indexing';
import { mongoAggregation } from '@/data/topics/mongo/problems/5-aggregation';
import { mongoAdvancedPatterns } from '@/data/topics/mongo/problems/6-advanced-patterns';

// Postgres problems
import { postgresBasics } from '@/data/topics/postgres/problems/1-basics';
import { postgresJoins } from '@/data/topics/postgres/problems/2-joins';
import { postgresTransactions } from '@/data/topics/postgres/problems/3-transactions';
import { postgresIndexing } from '@/data/topics/postgres/problems/4-indexing';
import { postgresAdvancedSql } from '@/data/topics/postgres/problems/5-advanced-sql';
import { postgresFunctionsTriggers } from '@/data/topics/postgres/problems/6-functions-triggers';

// Prisma problems
import { prismaBasics } from '@/data/topics/prisma/problems/1-basics';
import { prismaSchemaRelations } from '@/data/topics/prisma/problems/2-schema-relations';
import { prismaCrud } from '@/data/topics/prisma/problems/3-crud';
import { prismaRelationsFiltering } from '@/data/topics/prisma/problems/4-relations-filtering';
import { prismaAdvanced } from '@/data/topics/prisma/problems/5-advanced';
import { prismaOptimization } from '@/data/topics/prisma/problems/6-optimization';

// Topic mapping for each problem set
const topicMapping = [
  // React
  { modules: [reactBasics, reactPropsState, reactEffectsLifecycle, reactHooksContext, reactAdvanced, reactProject, reactPatterns], topic: 'React', slug: 'react' },
  // TypeScript
  { modules: [typescriptBasics, typescriptClassesInterfacesEnums, typescriptGenericsUtilityTypes, typescriptAdvancedTypesPatterns, typescriptModulesAsync, typescriptRealWorld, typescriptTypeChallenges], topic: 'TypeScript', slug: 'ts' },
  // JavaScript
  { modules: [learnTheBasics, arrayManipulation, step3Basics3, asynchronousJavaScript, domManipulation, advancedDomAndEvents, javascriptAlgorithms, miniProjects], topic: 'JavaScript', slug: 'js' },
  // HTML
  { modules: [htmlBasics, htmlForms, htmlSemantic, htmlMedia, htmlAccessibility, htmlSeo], topic: 'HTML', slug: 'html' },
  // CSS
  { modules: [cssBasics, cssBoxModel, cssFlexbox, cssGrid, cssResponsive, cssAnimations], topic: 'CSS', slug: 'css' },
  // Next.js
  { modules: [nextjsBasics, nextjsRouting, nextjsDataFetching, nextjsApiRoutes, nextjsOptimization, nextjsRealWorld], topic: 'Next.js', slug: 'nextjs' },
  // Node.js
  { modules: [nodeBasics, nodeModulesFs, nodeEventsStreams, nodeHttpServer, nodeAdvanced, nodeProject], topic: 'Node.js', slug: 'nodejs' },
  // Express
  { modules: [expressBasics, expressMiddleware, expressRouting, expressErrorHandling, expressDatabase, expressSecurity], topic: 'Express', slug: 'express' },
  // MongoDB
  { modules: [mongoBasics, mongoCrud, mongoSchemaValidation, mongoIndexing, mongoAggregation, mongoAdvancedPatterns], topic: 'MongoDB', slug: 'mongo' },
  // Postgres
  { modules: [postgresBasics, postgresJoins, postgresTransactions, postgresIndexing, postgresAdvancedSql, postgresFunctionsTriggers], topic: 'PostgreSQL', slug: 'postgres' },
  // Prisma
  { modules: [prismaBasics, prismaSchemaRelations, prismaCrud, prismaRelationsFiltering, prismaAdvanced, prismaOptimization], topic: 'Prisma', slug: 'prisma' },
];

export async function getAllProblems(): Promise<(Omit<Problem, 'status' | 'isStarred' | 'notes'> & { topic: string; slug: string })[]> {
  const problems: (Omit<Problem, 'status' | 'isStarred' | 'notes'> & { topic: string; slug: string })[] = [];

  for (const { modules, topic, slug } of topicMapping) {
    for (const problemModule of modules) {
      if (Array.isArray(problemModule)) {
        problems.push(...problemModule.map(p => ({ ...p, topic, slug })));
      }
    }
  }

  return problems;
}
