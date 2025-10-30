import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import User from '@/app/models/User';
import { authMiddleware } from '@/app/lib/auth';

export async function POST(req: NextRequest) {
  await dbConnect();

  const user = await authMiddleware(req);

  if (!user) {
    return NextResponse.json({ message: 'No token, authorization denied' }, { status: 401 });
  }

  const { difficulty, score, totalQuestions } = await req.json();

  if (!difficulty || score === undefined || totalQuestions === undefined) {
    return NextResponse.json({ message: 'Missing required history data' }, { status: 400 });
  }

  try {
    const userFromDb = await User.findByIdAndUpdate(user.id, {
        $push: { 
            quizHistory: { 
                difficulty, 
                score, 
                totalQuestions,
                completedAt: new Date()
            } 
        }
    });

    if (!userFromDb) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Quiz history saved.' }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
