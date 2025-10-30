import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import User from '@/app/models/User';
import { authMiddleware } from '@/app/lib/auth';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ difficulty: string }> }) {
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
    
    const { difficulty } = await params;
    userFromDb.quizProgress.delete(difficulty);
    await userFromDb.save();
    
    return NextResponse.json({ message: 'Progress reset' });

  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
