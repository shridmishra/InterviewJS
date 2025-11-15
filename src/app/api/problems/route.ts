import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserProblemData from '@/models/UserProblemData';
import { authMiddleware } from '@/lib/auth';
import { ProblemStatus } from '@/types';

export async function GET(req: NextRequest) {
  const { learnTheBasics } = await import('@/data/problems/1-basics-1');
  const { arrayManipulation } = await import('@/data/problems/2-basics-2');
  const { step3Basics3 } = await import('@/data/problems/3-basics-3');
  const { asynchronousJavaScript } = await import('@/data/problems/4-asynchronous-javascript');
  const { domManipulation } = await import('@/data/problems/5-dom-manipulation');
  const { advancedDomAndEvents } = await import('@/data/problems/6-advanced-dom-and-events');
  const { typescriptFundamentals } = await import('@/data/problems/7-typescript-fundamentals');
  const problemsData = [
    ...learnTheBasics,
    ...arrayManipulation,
    ...step3Basics3,
    ...asynchronousJavaScript,
    ...domManipulation,
    ...advancedDomAndEvents,
    ...typescriptFundamentals
  ];
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
