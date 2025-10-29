import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import UserProblemData from '@/app/models/UserProblemData';
import { problemsData } from '@/app/data/assignments';
import { ProblemStatus } from '@/app/types';
import { authMiddleware } from '@/app/lib/auth';

export async function GET(req: NextRequest) {
  await dbConnect();

  const user = authMiddleware(req);

  if (!user) {
    const staticProblems = problemsData.map(p => ({
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

    const mergedProblems = problemsData.map(p => {
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
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
