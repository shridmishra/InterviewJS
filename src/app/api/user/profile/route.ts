import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import UserProblemData from '@/models/UserProblemData';
import UserAnsweredQuestion from '@/models/UserAnsweredQuestion'; // Import the new model
import { authMiddleware } from '@/lib/auth';

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

    const submissionDates = Object.keys(contributions).map(date => new Date(date)).sort((a, b) => a.getTime() - b.getTime());
    let streak = 0;
    let highestStreak = 0;
    if (submissionDates.length > 0) {
        let currentStreak = 1;
        for (let i = 1; i < submissionDates.length; i++) {
            const diff = (submissionDates[i].getTime() - submissionDates[i - 1].getTime()) / (1000 * 3600 * 24);
            if (diff === 1) {
                currentStreak++;
            } else if (diff > 1) {
                currentStreak = 1;
            }
        }
        highestStreak = Math.max(highestStreak, currentStreak);

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const lastSubmissionDate = submissionDates[submissionDates.length - 1];
        const diffToday = (today.getTime() - lastSubmissionDate.getTime()) / (1000 * 3600 * 24);

        if (diffToday <= 1) {
            streak = currentStreak;
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
        highestStreak,
        joinDate: userFromDb.createdAt,
        quizHistory: userQuizHistory,
    });

  } catch (_error) {
    console.error(_error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
