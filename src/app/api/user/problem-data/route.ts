import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connect';
import UserProblemData from '@/models/UserProblemData';
import { authMiddleware } from '@/lib/auth/auth';
import { ProblemStatus } from '@/types';

export async function POST(req: NextRequest) {
  await dbConnect();

  const user = await authMiddleware(req);

  if (!user) {
    return NextResponse.json({ message: 'No token, authorization denied' }, { status: 401 });
  }

  try {
    const { problemId, status, isStarred, notes } = await req.json();

    if (!problemId) {
      return NextResponse.json({ message: 'Problem ID is required' }, { status: 400 });
    }

    interface UpdateFields {
      status?: ProblemStatus;
      isStarred?: boolean;
      notes?: string;
      lastSubmittedAt?: Date;
    }

    const updateFields: UpdateFields = {};
    const pushFields: { submissionHistory?: { timestamp: Date; status: ProblemStatus } } = {};
    
    if (status !== undefined) {
      updateFields.status = status;
    }
    if (isStarred !== undefined) {
      updateFields.isStarred = isStarred;
    }
    if (notes !== undefined) {
      updateFields.notes = notes;
    }

    // If status is being updated to Solved or Attempted, also update lastSubmittedAt and submissionHistory
    if (status === ProblemStatus.Solved) {
      updateFields.lastSubmittedAt = new Date();
      pushFields.submissionHistory = { timestamp: new Date(), status: ProblemStatus.Solved };
    } else if (status === ProblemStatus.Attempted) {
      pushFields.submissionHistory = { timestamp: new Date(), status: ProblemStatus.Attempted };
    }

    const updateOperation: {
      $set: UpdateFields;
      $push?: { submissionHistory: { timestamp: Date; status: ProblemStatus } };
    } = { $set: updateFields };
    if (pushFields.submissionHistory) {
      updateOperation.$push = { submissionHistory: pushFields.submissionHistory };
    }

    const updatedUserProblemData = await UserProblemData.findOneAndUpdate(
      { userId: user.id, problemId: problemId },
      updateOperation,
      { upsert: true, new: true, runValidators: true }
    );

    return NextResponse.json(updatedUserProblemData);
  } catch (_error) {
    console.error(_error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
