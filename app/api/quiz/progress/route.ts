import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import User from '@/app/models/User';
import { authMiddleware } from '@/app/lib/auth';

export async function GET(req: NextRequest) {
  await dbConnect();

  const user = await authMiddleware(req);

  if (!user) {
    return NextResponse.json({ message: 'No token, authorization denied' }, { status: 401 });
  }

  try {
    const userFromDb = await User.findById(user.id);
    if (!userFromDb) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    
    const plainProgress = userFromDb.quizProgress ? Object.fromEntries(userFromDb.quizProgress) : {};
    
    for (const key in plainProgress) {
        if (plainProgress[key].answers instanceof Map) {
            plainProgress[key].answers = Object.fromEntries(plainProgress[key].answers);
        }
    }
    return NextResponse.json(plainProgress);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  const user = await authMiddleware(req);

  if (!user) {
    return NextResponse.json({ message: 'No token, authorization denied' }, { status: 401 });
  }

  const { difficulty, index, answers } = await req.json();

  if (!difficulty || index === undefined || !answers) {
    return NextResponse.json({ message: 'Missing required progress data' }, { status: 400 });
  }

  try {
    const userFromDb = await User.findById(user.id);
    if (!userFromDb) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    
    userFromDb.quizProgress.set(difficulty, { index, answers });
    await userFromDb.save();
    
    return NextResponse.json({ message: 'Progress saved' });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
