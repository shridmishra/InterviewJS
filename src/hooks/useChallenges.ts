import { useState, useEffect, useCallback } from 'react';
import { Problem, ProblemStatus } from '../types';
import { problemsData as staticProblems } from '../data/assignments';
import { useAuth } from '../context/AuthContext';

interface UserProblemMetadata {
  id: string;
  status: ProblemStatus;
  isStarred: boolean;
  notes: string;
}

export const useChallenges = () => {
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

  const problemsForList: Problem[] = staticProblems.map(staticP => {
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
