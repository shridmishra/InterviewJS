import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connect';
import UserProblemData from '@/models/UserProblemData';
import { authMiddleware } from '@/lib/auth/auth';
import { ProblemStatus } from '@/types';
import { getAllProblems } from '@/lib/utils/problem-utils';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const problemsData = await getAllProblems();

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
  } catch (error) {
    console.error('Error in GET /api/problems:', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
