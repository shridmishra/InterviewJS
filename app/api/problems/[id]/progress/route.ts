import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import UserProblemData from '@/app/models/UserProblemData';
import { authMiddleware } from '@/app/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();

  const user = authMiddleware(req);

  if (!user) {
    return NextResponse.json({ message: 'No token, authorization denied' }, { status: 401 });
  }

  const { status, isStarred, notes } = await req.json();
  const { id: problemId } = await params;
  const userId = user.id;

  try {
    const updateData: any = {};
    if (status) updateData.status = status;
    if (isStarred !== undefined) updateData.isStarred = isStarred;
    if (notes !== undefined) updateData.notes = notes;

    const submission = { timestamp: new Date(), status };

    const updatedProgress = await UserProblemData.findOneAndUpdate(
        { userId, problemId },
        { 
            $set: updateData,
            $push: { submissionHistory: submission },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json(updatedProgress);

  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}