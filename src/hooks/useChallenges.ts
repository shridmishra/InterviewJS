import { useState, useEffect, useCallback } from 'react';
import { Problem, ProblemStatus } from '../types';
// JavaScript problems
import { learnTheBasics } from '../data/topics/javascript/problems/1-basics-1';
import { arrayManipulation } from '../data/topics/javascript/problems/2-basics-2';
import { step3Basics3 } from '../data/topics/javascript/problems/3-basics-3';
import { asynchronousJavaScript } from '../data/topics/javascript/problems/4-asynchronous-javascript';
import { domManipulation } from '../data/topics/javascript/problems/5-dom-manipulation';
import { advancedDomAndEvents } from '../data/topics/javascript/problems/6-advanced-dom-and-events';
import { javascriptAlgorithms } from '../data/topics/javascript/problems/7-algorithms';

// TypeScript problems
import { typescriptBasics } from '../data/topics/typescript/problems/1-basics-typescript';
import { typescriptClassesInterfacesEnums } from '../data/topics/typescript/problems/2-classes-interfaces-enums-typescript';
import { typescriptGenericsUtilityTypes } from '../data/topics/typescript/problems/3-generics-utility-types-typescript';
import { typescriptAdvancedTypesPatterns } from '../data/topics/typescript/problems/4-advanced-types-patterns-typescript';
import { typescriptModulesAsync } from '../data/topics/typescript/problems/5-modules-async-typescript';
import { typescriptRealWorld } from '../data/topics/typescript/problems/6-real-world-typescript';
import { typescriptTypeChallenges } from '../data/topics/typescript/problems/7-type-challenges';

// Other topics
import { reactBasics } from '../data/topics/react/problems/1-basics';
import { reactPropsState } from '../data/topics/react/problems/2-props-state';
import { reactEffectsLifecycle } from '../data/topics/react/problems/3-effects-lifecycle';
import { reactHooksContext } from '../data/topics/react/problems/4-hooks-context';
import { reactAdvanced } from '../data/topics/react/problems/5-advanced-react';
import { reactProject } from '../data/topics/react/problems/6-project';
import { nextjsBasics } from '../data/topics/nextjs/problems/1-basics';
import { mongoBasics } from '../data/topics/mongo/problems/1-basics';
import { mongoCrud } from '../data/topics/mongo/problems/2-crud';
import { mongoSchemaValidation } from '../data/topics/mongo/problems/3-schema-validation';
import { mongoIndexing } from '../data/topics/mongo/problems/4-indexing';
import { mongoAggregation } from '../data/topics/mongo/problems/5-aggregation';
import { mongoAdvancedPatterns } from '../data/topics/mongo/problems/6-advanced-patterns';
import { expressBasics } from '../data/topics/express/problems/1-basics';
import { expressMiddleware } from '../data/topics/express/problems/2-middleware';
import { expressRouting } from '../data/topics/express/problems/3-routing';
import { expressErrorHandling } from '../data/topics/express/problems/4-error-handling';
import { expressDatabase } from '../data/topics/express/problems/5-database-integration';
import { expressSecurity } from '../data/topics/express/problems/6-security-auth';
import { nodeBasics } from '../data/topics/nodejs/problems/1-basics';
import { nodeModulesFs } from '../data/topics/nodejs/problems/2-modules-filesystem';
import { nodeEventsStreams } from '../data/topics/nodejs/problems/3-events-streams';
import { nodeHttpServer } from '../data/topics/nodejs/problems/4-http-server';
import { nodeAdvanced } from '../data/topics/nodejs/problems/5-advanced-nodejs';
import { nodeProject } from '../data/topics/nodejs/problems/6-project';
import { prismaBasics } from '../data/topics/prisma/problems/1-basics';
import { prismaSchemaRelations } from '../data/topics/prisma/problems/2-schema-relations';
import { prismaCrud } from '../data/topics/prisma/problems/3-crud';
import { prismaRelationsFiltering } from '../data/topics/prisma/problems/4-relations-filtering';
import { prismaAdvanced } from '../data/topics/prisma/problems/5-advanced';
import { postgresBasics } from '../data/topics/postgres/problems/1-basics';
import { postgresJoins } from '../data/topics/postgres/problems/2-joins';
import { postgresTransactions } from '../data/topics/postgres/problems/3-transactions';
import { postgresIndexing } from '../data/topics/postgres/problems/4-indexing';
import { postgresAdvancedSql } from '../data/topics/postgres/problems/5-advanced-sql';
import { postgresFunctionsTriggers } from '../data/topics/postgres/problems/6-functions-triggers';
import { htmlBasics } from '../data/topics/html/problems/1-basics';
import { htmlForms } from '../data/topics/html/problems/2-forms';
import { htmlSemantic } from '../data/topics/html/problems/3-semantic';
import { htmlMedia } from '../data/topics/html/problems/4-media';
import { htmlAccessibility } from '../data/topics/html/problems/5-accessibility';
import { htmlSeo } from '../data/topics/html/problems/6-seo-best-practices';
import { cssBasics } from '../data/topics/css/problems/1-basics';
import { cssBoxModel } from '../data/topics/css/problems/2-box-model';
import { cssFlexbox } from '../data/topics/css/problems/3-flexbox';
import { cssGrid } from '../data/topics/css/problems/4-grid';
import { cssResponsive } from '../data/topics/css/problems/5-responsive';
import { cssAnimations } from '../data/topics/css/problems/6-animations';
import { nextjsRouting } from '../data/topics/nextjs/problems/2-routing';
import { nextjsDataFetching } from '../data/topics/nextjs/problems/3-data-fetching';
import { nextjsApiRoutes } from '../data/topics/nextjs/problems/4-api-routes';
import { nextjsOptimization } from '../data/topics/nextjs/problems/5-optimization';
import { nextjsRealWorld } from '../data/topics/nextjs/problems/6-real-world';
import { prismaOptimization } from '../data/topics/prisma/problems/6-optimization';

const staticProblems = [
    ...[
        ...learnTheBasics,
        ...arrayManipulation,
        ...step3Basics3,
        ...asynchronousJavaScript,
        ...domManipulation,
        ...advancedDomAndEvents,
        ...javascriptAlgorithms
    ].map(p => ({ ...p, slug: 'js' })),
    ...[
        ...typescriptBasics,
        ...typescriptClassesInterfacesEnums,
        ...typescriptGenericsUtilityTypes,
        ...typescriptAdvancedTypesPatterns,
        ...typescriptModulesAsync,
        ...typescriptRealWorld,
        ...typescriptTypeChallenges
    ].map(p => ({ ...p, slug: 'ts' })),
    ...[
        ...reactBasics,
        ...reactPropsState,
        ...reactEffectsLifecycle,
        ...reactHooksContext,
        ...reactAdvanced,
        ...reactProject
    ].map(p => ({ ...p, slug: 'react' })),
    ...[
        ...nextjsBasics,
        ...nextjsRouting,
        ...nextjsDataFetching,
        ...nextjsApiRoutes,
        ...nextjsOptimization,
        ...nextjsRealWorld
    ].map(p => ({ ...p, slug: 'nextjs' })),
    ...[
        ...mongoBasics,
        ...mongoCrud,
        ...mongoSchemaValidation,
        ...mongoIndexing,
        ...mongoAggregation,
        ...mongoAdvancedPatterns
    ].map(p => ({ ...p, slug: 'mongo' })),
    ...[
        ...expressBasics,
        ...expressMiddleware,
        ...expressRouting,
        ...expressErrorHandling,
        ...expressDatabase,
        ...expressSecurity
    ].map(p => ({ ...p, slug: 'express' })),
    ...[
        ...nodeBasics,
        ...nodeModulesFs,
        ...nodeEventsStreams,
        ...nodeHttpServer,
        ...nodeAdvanced,
        ...nodeProject
    ].map(p => ({ ...p, slug: 'nodejs' })),
    ...[
        ...prismaBasics,
        ...prismaSchemaRelations,
        ...prismaCrud,
        ...prismaRelationsFiltering,
        ...prismaAdvanced,
        ...prismaOptimization
    ].map(p => ({ ...p, slug: 'prisma' })),
    ...[
        ...postgresBasics,
        ...postgresJoins,
        ...postgresTransactions,
        ...postgresIndexing,
        ...postgresAdvancedSql,
        ...postgresFunctionsTriggers
    ].map(p => ({ ...p, slug: 'postgres' })),
    ...[
        ...htmlBasics,
        ...htmlForms,
        ...htmlSemantic,
        ...htmlMedia,
        ...htmlAccessibility,
        ...htmlSeo
    ].map(p => ({ ...p, slug: 'html' })),
    ...[
        ...cssBasics,
        ...cssBoxModel,
        ...cssFlexbox,
        ...cssGrid,
        ...cssResponsive,
        ...cssAnimations
    ].map(p => ({ ...p, slug: 'css' }))
];
import { useAuth } from '../context/AuthContext';

interface UserProblemMetadata {
  id: string;
  status: ProblemStatus;
  isStarred: boolean;
  notes: string;
}

export const useChallenges = (filter?: string) => {
  const [userProblemMetadata, setUserProblemMetadata] = useState<UserProblemMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  useEffect(() => {
    const fetchProblems = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/problems');
        if (res.ok) {
          const data: Problem[] = await res.json();
          setUserProblemMetadata(data.map(p => ({
            id: p.id,
            status: p.status,
            isStarred: p.isStarred || false,
            notes: p.notes || '',
          })));
        } else {
          setUserProblemMetadata(staticProblems.map(p => ({
            id: p.id,
            status: ProblemStatus.Unsolved,
            isStarred: false,
            notes: '',
          })));
        }
      } catch (_error) {
        console.error(_error);
        setUserProblemMetadata(staticProblems.map(p => ({
          id: p.id,
          status: ProblemStatus.Unsolved,
          isStarred: false,
          notes: '',
        })));
      } finally {
        setIsLoading(false);
      }
    };

    if (!isAuthLoading) {
      fetchProblems();
    }
  }, [isAuthenticated, isAuthLoading]);

  const problemsForList: Problem[] = staticProblems
    .filter((staticP) => {
      if (!filter) return true;
      return staticP.slug === filter;
    })
    .map(staticP => {
      const userMeta = userProblemMetadata.find(userP => userP.id === staticP.id);
      return {
        ...staticP,
        status: userMeta?.status || ProblemStatus.Unsolved,
        isStarred: userMeta?.isStarred || false,
        notes: userMeta?.notes || '',
      };
    });

  const getProblemById = useCallback((id: string): Problem | undefined => {
    const staticProblem = staticProblems.find(p => p.id === id);
    if (!staticProblem) return undefined;
    const userMeta = userProblemMetadata.find(userP => userP.id === id);
    return {
      ...staticProblem,
      status: userMeta?.status || ProblemStatus.Unsolved,
      isStarred: userMeta?.isStarred || false,
      notes: userMeta?.notes || '',
    };
  }, [userProblemMetadata]);

  const handleStatusChange = useCallback(async (id: string, newStatus: ProblemStatus) => {
    if (!isAuthenticated) return;
    try {
      const res = await fetch('/api/user/problem-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problemId: id, status: newStatus }),
      });
      if (res.ok) {
        setUserProblemMetadata((prevMetadata) =>
          prevMetadata.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
        );
      }
    } catch (error) {
      console.error('Failed to update problem status:', error);
    }
  }, [isAuthenticated]);

  const handleToggleStar = useCallback(async (id: string) => {
    if (!isAuthenticated) return;
    const problemToUpdate = userProblemMetadata.find(p => p.id === id);
    if (!problemToUpdate) return;

    try {
      const res = await fetch('/api/user/problem-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problemId: id, isStarred: !problemToUpdate.isStarred }),
      });
      if (res.ok) {
        setUserProblemMetadata((prevMetadata) =>
          prevMetadata.map((p) => (p.id === id ? { ...p, isStarred: !p.isStarred } : p))
        );
      }
    } catch (error) {
      console.error('Failed to toggle star status:', error);
    }
  }, [isAuthenticated, userProblemMetadata]);

  const handleUpdateNotes = useCallback(async (id: string, newNotes: string) => {
    if (!isAuthenticated) return;
    try {
      const res = await fetch('/api/user/problem-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problemId: id, notes: newNotes }),
      });
      if (res.ok) {
        setUserProblemMetadata((prevMetadata) =>
          prevMetadata.map((p) => (p.id === id ? { ...p, notes: newNotes } : p))
        );
      }
    } catch (error) {
      console.error('Failed to update notes:', error);
    }
  }, [isAuthenticated]);

  return {
    problems: problemsForList,
    getProblemById,
    isLoading,
    isAuthLoading,
    handleStatusChange,
    handleToggleStar,
    handleUpdateNotes,
  };
};
