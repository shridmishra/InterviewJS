import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import User from '@/app/models/User';
import UserProblemData from '@/app/models/UserProblemData';
import { problemsData } from '@/app/data/assignments';
import { authMiddleware } from '@/app/lib/auth';

export async function GET(req: NextRequest) {
  await dbConnect();

  const user = authMiddleware(req);

  if (!user) {
    return NextResponse.json({ message: 'No token, authorization denied' }, { status: 401 });
  }

  try {
    const userId = user.id;
    const userFromDb = await User.findById(userId).select('username createdAt quizHistory');
    if (!userFromDb) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const userProgress = await UserProblemData.find({ userId });

    const solvedCount = userProgress.filter(p => p.status === 'Solved').length;
    const totalCount = problemsData.length;

    const contributions: { [key: string]: number } = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    userProgress.forEach(problem => {
        problem.submissionHistory.forEach((submission: { timestamp: Date; status: string }) => {
            const date = new Date(submission.timestamp);
            const dateString = date.toISOString().split('T')[0];
            contributions[dateString] = (contributions[dateString] || 0) + 1;
        });
    });

    let streak = 0;
    const submissionDates = new Set(Object.keys(contributions));
    if (submissionDates.has(today.toISOString().split('T')[0])) {
        streak = 1;
        let currentDate = new Date(today);
        while (true) {
            currentDate.setDate(currentDate.getDate() - 1);
            const prevDateString = currentDate.toISOString().split('T')[0];
            if (submissionDates.has(prevDateString)) {
                streak++;
            } else {
                break;
            }
        }
    }

    return NextResponse.json({
        solvedCount,
        totalCount,
        contributions,
        streak,
        joinDate: userFromDb.createdAt,
        quizHistory: userFromDb.quizHistory || [],
    });

  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
