import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import User from '@/app/models/User';
import UserAnsweredQuestion from '@/app/models/UserAnsweredQuestion'; // Import the new model
import { authMiddleware } from '@/app/lib/auth';

export async function GET(req: NextRequest) {
  await dbConnect();

  const user = await authMiddleware(req);

  if (!user) {
    return NextResponse.json({ message: 'No token, authorization denied' }, { status: 401 });
  }

  try {
    // Fetch all answered questions for the user
    const answeredQuestions = await UserAnsweredQuestion.find({ userId: user.id }).sort({ answeredAt: -1 });

    console.log("Backend: Retrieved answered questions for user", user.id, ":", answeredQuestions.length + " items");
    return NextResponse.json(answeredQuestions, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    else {
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

  const { question, options, correctAnswer, userAnswer, isCorrect, difficulty } = await req.json();
  
  if (!question || !options || !correctAnswer || userAnswer === undefined || isCorrect === undefined || !difficulty) {
    return NextResponse.json({ message: 'Missing required question data' }, { status: 400 });
  }
  
  try {
    console.log("Attempting to save answered question for user ID:", user.id);

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

    console.log("New answered question saved:", JSON.stringify(newAnsweredQuestion, null, 2));
    
    return NextResponse.json({ message: 'Answered question saved.', newAnsweredQuestion }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    else {
      console.error(error);
    }
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}

