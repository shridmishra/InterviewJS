import { useState, useEffect, useCallback } from 'react';
import { Problem, ProblemStatus } from '../types';
// JavaScript problems
import { learnTheBasics } from '../data/problems/js/1-basics-1';
import { arrayManipulation } from '../data/problems/js/2-basics-2';
import { step3Basics3 } from '../data/problems/js/3-basics-3';
import { asynchronousJavaScript } from '../data/problems/js/4-asynchronous-javascript';
import { domManipulation } from '../data/problems/js/5-dom-manipulation';
import { advancedDomAndEvents } from '../data/problems/js/6-advanced-dom-and-events';

// TypeScript problems
import { typescriptBasics } from '../data/problems/ts/1-basics-typescript';
import { typescriptClassesInterfacesEnums } from '../data/problems/ts/2-classes-interfaces-enums-typescript';
import { typescriptGenericsUtilityTypes } from '../data/problems/ts/3-generics-utility-types-typescript';
import { typescriptAdvancedTypesPatterns } from '../data/problems/ts/4-advanced-types-patterns-typescript';
import { typescriptModulesAsync } from '../data/problems/ts/5-modules-async-typescript';
import { typescriptRealWorld } from '../data/problems/ts/6-real-world-typescript';

const staticProblems = [
    ...learnTheBasics,
    ...arrayManipulation,
    ...step3Basics3,
    ...asynchronousJavaScript,
    ...domManipulation,
    ...advancedDomAndEvents,
    ...typescriptBasics,
    ...typescriptClassesInterfacesEnums,
    ...typescriptGenericsUtilityTypes,
    ...typescriptAdvancedTypesPatterns,
    ...typescriptModulesAsync,
    ...typescriptRealWorld
];
import { useAuth } from '../context/AuthContext';

interface UserProblemMetadata {
  id: string;
  status: ProblemStatus;
  isStarred: boolean;
  notes: string;
}

export const useChallenges = (filter?: 'js' | 'ts') => {
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
      const isTypescript = staticP.group?.toLowerCase().includes('typescript') ?? false;
      return filter === 'ts' ? isTypescript : !isTypescript;
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
