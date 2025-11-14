import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserProblemData from '@/models/UserProblemData';
import { learnTheBasics } from '@/data/problems/1-basics-1';
import { arrayManipulation } from '@/data/problems/2-basics-2';
import { step3Basics3 } from '@/data/problems/3-basics-3';


import { asynchronousJavaScript } from '@/data/problems/4-asynchronous-javascript';
import { domManipulation } from '@/data/problems/5-dom-manipulation';
import { advancedDomAndEvents } from '@/data/problems/6-advanced-dom-and-events';
import { typescriptFundamentals } from '@/data/problems/7-typescript-fundamentals';

const problemsData = [
    ...learnTheBasics,
    ...arrayManipulation,
    ...step3Basics3,
    ...asynchronousJavaScript,
    ...domManipulation,
    ...advancedDomAndEvents,
    ...typescriptFundamentals
];
import { ProblemStatus } from '@/types';
import { authMiddleware } from '@/lib/auth';

export async function GET(req: NextRequest) {
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
