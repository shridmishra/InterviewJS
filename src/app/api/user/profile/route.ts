import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import UserProblemData from '@/models/UserProblemData';
import UserAnsweredQuestion from '@/models/UserAnsweredQuestion'; // Import the new model
import { problemsData } from '@/data/assignments';
import { authMiddleware } from '@/lib/auth';

export async function GET(req: NextRequest) {
  await dbConnect();

  const user = await authMiddleware(req);

  if (!user) {
    return NextResponse.json({ message: 'No token, authorization denied' }, { status: 401 });
  }

  try {
    const userFromDb = await User.findOne({ email: user.email }).select('_id username createdAt'); // Removed quizHistory from select
    if (!userFromDb) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const userProgress = await UserProblemData.find({ userId: userFromDb._id });
    const userQuizHistory = await UserAnsweredQuestion.find({ userId: userFromDb._id }).sort({ answeredAt: -1 }); // Fetch from UserAnsweredQuestion

    const solvedCount = userProgress.filter(p => p.status === 'Solved').length;
    const totalCount = problemsData.length;

    let easySolved = 0;
    let mediumSolved = 0;
    let hardSolved = 0;

    userProgress.forEach(userProb => {
        if (userProb.status === 'Solved') {
            const problem = problemsData.find(p => p.id === userProb.problemId);
            if (problem) {
                if (problem.difficulty === 'Easy') {
                    easySolved++;
                } else if (problem.difficulty === 'Medium') {
                    mediumSolved++;
                } else if (problem.difficulty === 'Hard') {
                    hardSolved++;
                }
            }
        }
    });

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
    // eslint-disable-next-line prefer-const
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
        easySolved,
        mediumSolved,
        hardSolved,
        contributions,
        streak,
        joinDate: userFromDb.createdAt,
        quizHistory: userQuizHistory, // Return the fetched quiz history
    });

  } catch (_error) {
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
