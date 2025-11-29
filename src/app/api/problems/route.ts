import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserProblemData from '@/models/UserProblemData';
import { authMiddleware } from '@/lib/auth';
import { ProblemStatus } from '@/types';

// JavaScript problems
import { learnTheBasics } from '@/data/topics/javascript/problems/1-basics-1';
import { arrayManipulation } from '@/data/topics/javascript/problems/2-basics-2';
import { step3Basics3 } from '@/data/topics/javascript/problems/3-basics-3';
import { asynchronousJavaScript } from '@/data/topics/javascript/problems/4-asynchronous-javascript';
import { domManipulation } from '@/data/topics/javascript/problems/5-dom-manipulation';
import { advancedDomAndEvents } from '@/data/topics/javascript/problems/6-advanced-dom-and-events';
import { javascriptAlgorithms } from '@/data/topics/javascript/problems/7-algorithms';

// TypeScript problems
import { typescriptBasics } from '@/data/topics/typescript/problems/1-basics-typescript';
import { typescriptClassesInterfacesEnums } from '@/data/topics/typescript/problems/2-classes-interfaces-enums-typescript';
import { typescriptGenericsUtilityTypes } from '@/data/topics/typescript/problems/3-generics-utility-types-typescript';
import { typescriptAdvancedTypesPatterns } from '@/data/topics/typescript/problems/4-advanced-types-patterns-typescript';
import { typescriptModulesAsync } from '@/data/topics/typescript/problems/5-modules-async-typescript';
import { typescriptRealWorld } from '@/data/topics/typescript/problems/6-real-world-typescript';
import { typescriptTypeChallenges } from '@/data/topics/typescript/problems/7-type-challenges';

// React problems
import { reactBasics } from '@/data/topics/react/problems/1-basics';
import { reactPropsState } from '@/data/topics/react/problems/2-props-state';
import { reactEffectsLifecycle } from '@/data/topics/react/problems/3-effects-lifecycle';
import { reactHooksContext } from '@/data/topics/react/problems/4-hooks-context';
import { reactAdvanced } from '@/data/topics/react/problems/5-advanced-react';
import { reactProject } from '@/data/topics/react/problems/6-project';

// Next.js problems
import { nextjsBasics } from '@/data/topics/nextjs/problems/1-basics';
import { nextjsRouting } from '@/data/topics/nextjs/problems/2-routing';
import { nextjsDataFetching } from '@/data/topics/nextjs/problems/3-data-fetching';
import { nextjsApiRoutes } from '@/data/topics/nextjs/problems/4-api-routes';
import { nextjsOptimization } from '@/data/topics/nextjs/problems/5-optimization';
import { nextjsRealWorld } from '@/data/topics/nextjs/problems/6-real-world';

// MongoDB problems
import { mongoBasics } from '@/data/topics/mongo/problems/1-basics';
import { mongoCrud } from '@/data/topics/mongo/problems/2-crud';
import { mongoSchemaValidation } from '@/data/topics/mongo/problems/3-schema-validation';
import { mongoIndexing } from '@/data/topics/mongo/problems/4-indexing';
import { mongoAggregation } from '@/data/topics/mongo/problems/5-aggregation';
import { mongoAdvancedPatterns } from '@/data/topics/mongo/problems/6-advanced-patterns';

// Express problems
import { expressBasics } from '@/data/topics/express/problems/1-basics';
import { expressMiddleware } from '@/data/topics/express/problems/2-middleware';
import { expressRouting } from '@/data/topics/express/problems/3-routing';
import { expressErrorHandling } from '@/data/topics/express/problems/4-error-handling';
import { expressDatabase } from '@/data/topics/express/problems/5-database-integration';
import { expressSecurity } from '@/data/topics/express/problems/6-security-auth';

// Node.js problems
import { nodeBasics } from '@/data/topics/nodejs/problems/1-basics';
import { nodeModulesFs } from '@/data/topics/nodejs/problems/2-modules-filesystem';
import { nodeEventsStreams } from '@/data/topics/nodejs/problems/3-events-streams';
import { nodeHttpServer } from '@/data/topics/nodejs/problems/4-http-server';
import { nodeAdvanced } from '@/data/topics/nodejs/problems/5-advanced-nodejs';
import { nodeProject } from '@/data/topics/nodejs/problems/6-project';

// Prisma problems
import { prismaBasics } from '@/data/topics/prisma/problems/1-basics';
import { prismaSchemaRelations } from '@/data/topics/prisma/problems/2-schema-relations';
import { prismaCrud } from '@/data/topics/prisma/problems/3-crud';
import { prismaRelationsFiltering } from '@/data/topics/prisma/problems/4-relations-filtering';
import { prismaAdvanced } from '@/data/topics/prisma/problems/5-advanced';
import { prismaOptimization } from '@/data/topics/prisma/problems/6-optimization';

// PostgreSQL problems
import { postgresBasics } from '@/data/topics/postgres/problems/1-basics';
import { postgresJoins } from '@/data/topics/postgres/problems/2-joins';
import { postgresTransactions } from '@/data/topics/postgres/problems/3-transactions';
import { postgresIndexing } from '@/data/topics/postgres/problems/4-indexing';
import { postgresAdvancedSql } from '@/data/topics/postgres/problems/5-advanced-sql';
import { postgresFunctionsTriggers } from '@/data/topics/postgres/problems/6-functions-triggers';

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

export async function GET(req: NextRequest) {
  const problemsData = [
    ...learnTheBasics,
    ...arrayManipulation,
    ...step3Basics3,
    ...asynchronousJavaScript,
    ...domManipulation,
    ...advancedDomAndEvents,
    ...javascriptAlgorithms,
    ...typescriptBasics,
    ...typescriptClassesInterfacesEnums,
    ...typescriptGenericsUtilityTypes,
    ...typescriptAdvancedTypesPatterns,
    ...typescriptModulesAsync,
    ...typescriptRealWorld,
    ...typescriptTypeChallenges,
    ...reactBasics,
    ...reactPropsState,
    ...reactEffectsLifecycle,
    ...reactHooksContext,
    ...reactAdvanced,
    ...reactProject,
    ...nextjsBasics,
    ...nextjsRouting,
    ...nextjsDataFetching,
    ...nextjsApiRoutes,
    ...nextjsOptimization,
    ...nextjsRealWorld,
    ...mongoBasics,
    ...mongoCrud,
    ...mongoSchemaValidation,
    ...mongoIndexing,
    ...mongoAggregation,
    ...mongoAdvancedPatterns,
    ...expressBasics,
    ...expressMiddleware,
    ...expressRouting,
    ...expressErrorHandling,
    ...expressDatabase,
    ...expressSecurity,
    ...nodeBasics,
    ...nodeModulesFs,
    ...nodeEventsStreams,
    ...nodeHttpServer,
    ...nodeAdvanced,
    ...nodeProject,
    ...prismaBasics,
    ...prismaSchemaRelations,
    ...prismaCrud,
    ...prismaRelationsFiltering,
    ...prismaAdvanced,
    ...prismaOptimization,
    ...postgresBasics,
    ...postgresJoins,
    ...postgresTransactions,
    ...postgresIndexing,
    ...postgresAdvancedSql,
    ...postgresFunctionsTriggers,
    ...htmlBasics,
    ...htmlForms,
    ...htmlSemantic,
    ...htmlMedia,
    ...htmlAccessibility,
    ...htmlSeo,
    ...cssBasics,
    ...cssBoxModel,
    ...cssFlexbox,
    ...cssGrid,
    ...cssResponsive,
    ...cssAnimations
  ].map(p => ({
    ...p,
    // Ensure slug is set correctly if needed, or rely on what's in the file
    // The files don't have slug, useChallenges adds it.
    // But the API might not need slug, or it might.
    // Let's check if the API response needs slug.
    // The previous code didn't add slug.
  }));

  // Add slugs to match useChallenges logic if the frontend expects it from the API
  // useChallenges fetches from API and then maps user metadata.
  // It seems useChallenges ADDS the slug itself based on the static list.
  // So the API just needs to return the problem IDs and basic info.
  // However, useChallenges uses staticProblems for the list, and only fetches user status from API?
  // No, useChallenges fetches '/api/problems' and sets userProblemMetadata.
  // Wait, line 189: `const data: Problem[] = await res.json();`
  // And then it maps it to metadata.
  // So the API returns the full problem list?
  // But line 197: `setUserProblemMetadata(staticProblems.map...` if fetch fails.
  // And line 222: `problemsForList` is derived from `staticProblems`.
  // So `useChallenges` uses `staticProblems` as the source of truth for problem definitions,
  // and the API is used to fetch *user status*?
  // Let's check the API code again.
  // Line 71: `const userData = await UserProblemData.find({ userId: user.id });`
  // Line 83: `return NextResponse.json(mergedProblems);`
  // `mergedProblems` merges `problemsData` (static definitions) with `userData`.
  // So the API returns the full list of problems WITH status.
  // But `useChallenges` seems to ignore the problem definitions from the API and only use the status/stars/notes?
  // Line 190: `setUserProblemMetadata(data.map(p => ({ id: p.id, status: p.status ... })))`
  // Yes, it only extracts metadata.
  // So `problemsData` in the API just needs to have the IDs correct.
  // But it's better if it matches `staticProblems` in `useChallenges` to be safe.
  // `useChallenges` adds slugs. The API doesn't seem to add slugs in the previous code.
  // So I will just return the problems as is.

  await dbConnect();

  const user = await authMiddleware(req);

  if (!user) {
    const staticProblems = problemsData.map(({ solutionCheck: _solutionCheck, ...p }) => ({
        ...p,
        status: ProblemStatus.Unsolved,
        isStarred: false,
        notes: ''
    }));
    return NextResponse.json(staticProblems);
  }

  try {
    const userData = await UserProblemData.find({ userId: user.id });
    const userDataMap = new Map(userData.map(item => [item.problemId, item]));

    const mergedProblems = problemsData.map(({ solutionCheck: _solutionCheck, ...p }) => {
        const userProgress = userDataMap.get(p.id);
        return {
            ...p,
            status: userProgress ? userProgress.status : ProblemStatus.Unsolved,
            isStarred: userProgress ? userProgress.isStarred : false,
            notes: userProgress ? userProgress.notes : ''
        };
    });
    return NextResponse.json(mergedProblems);
  } catch (_error) {
    console.error(_error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
