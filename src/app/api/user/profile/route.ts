import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import UserProblemData from '@/models/UserProblemData';
import { authMiddleware } from '@/lib/auth';
import { getAllProblems } from '@/lib/problemUtils';

export async function GET(req: NextRequest) {
  await dbConnect();

  const user = await authMiddleware(req);

  if (!user) {
    return NextResponse.json({ message: 'No token, authorization denied' }, { status: 401 });
  }

  try {
    const userFromDb = await User.findOne({ email: user.email }).select('_id username createdAt');
    if (!userFromDb) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Get all problems from all topics
    const allProblems = await getAllProblems();
    
    // Get user progress
    const userProgress = await UserProblemData.find({ userId: userFromDb._id }).sort({ lastSubmittedAt: -1 });

    const solvedCount = userProgress.filter(p => p.status === 'Solved').length;
    const totalCount = allProblems.length;

    let easySolved = 0;
    let mediumSolved = 0;
    let hardSolved = 0;

    const solvedProblemIds = new Set(userProgress.filter(p => p.status === 'Solved').map(p => p.problemId));

    // Count difficulty levels
    userProgress.forEach(userProb => {
        if (userProb.status === 'Solved') {
            const problem = allProblems.find(p => p.id === userProb.problemId);
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

    // Group problems by topic dynamically
    const topicMap = new Map<string, { name: string; total: number; solved: number; slug: string }>();
    
    allProblems.forEach(problem => {
        const topicSlug = problem.topic?.toLowerCase() || 'other';
        const topicName = problem.topic || 'Other';
        
        if (!topicMap.has(topicSlug)) {
            topicMap.set(topicSlug, {
                name: topicName,
                total: 0,
                solved: 0,
                slug: topicSlug
            });
        }
        
        const topic = topicMap.get(topicSlug)!;
        topic.total++;
        if (solvedProblemIds.has(problem.id)) {
            topic.solved++;
        }
    });

    const topicStats = Array.from(topicMap.values()).sort((a, b) => a.name.localeCompare(b.name));

    // Calculate contributions (activity map)
    const contributions: { [key: string]: number } = {};
    userProgress.forEach(problem => {
        problem.submissionHistory.forEach((submission: { timestamp: Date; status: string }) => {
            const date = new Date(submission.timestamp);
            const dateString = date.toISOString().split('T')[0];
            contributions[dateString] = (contributions[dateString] || 0) + 1;
        });
    });

    // Calculate streaks
    const submissionDates = Object.keys(contributions).map(date => new Date(date)).sort((a, b) => a.getTime() - b.getTime());
    let streak = 0;
    let highestStreak = 0;
    
    if (submissionDates.length > 0) {
        let currentStreak = 1;
        let tempHighest = 1;
        
        for (let i = 1; i < submissionDates.length; i++) {
            const diff = Math.floor((submissionDates[i].getTime() - submissionDates[i - 1].getTime()) / (1000 * 3600 * 24));
            if (diff === 1) {
                currentStreak++;
                tempHighest = Math.max(tempHighest, currentStreak);
            } else if (diff > 1) {
                currentStreak = 1;
            }
        }
        
        highestStreak = tempHighest;

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const lastSubmissionDate = new Date(submissionDates[submissionDates.length - 1]);
        lastSubmissionDate.setHours(0, 0, 0, 0);
        const diffToday = Math.floor((today.getTime() - lastSubmissionDate.getTime()) / (1000 * 3600 * 24));

        if (diffToday <= 1) {
            streak = currentStreak;
        }
    }

    // Get practice history (recent solved problems)
    const practiceHistory = userProgress
      .filter(p => p.status === 'Solved' && p.lastSubmittedAt)
      .sort((a, b) => {
        const dateA = a.lastSubmittedAt ? new Date(a.lastSubmittedAt).getTime() : 0;
        const dateB = b.lastSubmittedAt ? new Date(b.lastSubmittedAt).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, 20)
      .map(p => {
        const problem = allProblems.find(prob => prob.id === p.problemId);
        return {
          problemId: p.problemId,
          title: problem?.title || 'Unknown Problem',
          difficulty: problem?.difficulty || 'Medium',
          topic: problem?.topic || 'Unknown',
          solvedAt: p.lastSubmittedAt,
          isCorrect: p.status === 'Solved'
        };
      });

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
        practiceHistory,
        topicStats
    });

  } catch (_error) {
    console.error(_error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
