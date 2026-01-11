import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connect';
import UserAnsweredQuestion from '@/models/UserAnsweredQuestion'; // Import the new model
import { authMiddleware } from '@/lib/auth/auth';

export async function GET(req: NextRequest) {
  await dbConnect();

  const user = await authMiddleware(req);

  if (!user) {
    return NextResponse.json({ message: 'No token, authorization denied' }, { status: 401 });
  }

  try {
    // Fetch all answered questions for the user
    const answeredQuestions = await UserAnsweredQuestion.find({ userId: user.id }).sort({ answeredAt: -1 });
    return NextResponse.json({ answeredQuestions }, { status: 200 });
  } catch (error) {
    console.error('Error fetching answered questions:', error);
    return NextResponse.json({ message: 'Server Error', error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  const user = await authMiddleware(req);

  if (!user) {
    return NextResponse.json({ message: 'No token, authorization denied' }, { status: 401 });
  }

  const { question, options, correctAnswer, userAnswer, isCorrect, difficulty } = await req.json();
  
  if (!question || !options || !correctAnswer || userAnswer === undefined || isCorrect === undefined || !difficulty) {
    return NextResponse.json({ message: 'Missing required question data' }, { status: 400 });
  }
  
  try {

    const newAnsweredQuestion = await UserAnsweredQuestion.create({
      userId: user.id,
      question,
      options,
      correctAnswer,
      userAnswer,
      isCorrect,
      difficulty,
      answeredAt: new Date(),
    });

    
    return NextResponse.json({ message: 'Answered question saved.', newAnsweredQuestion }, { status: 201 });
  } catch (_error) {
    const error = _error as Error;
    console.error('Error saving answered question:', error);
    return NextResponse.json({ message: 'Server Error', error: error.message }, { status: 500 });
  }
}
