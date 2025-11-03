import mongoose, { Document, Schema } from 'mongoose';
import { ProblemStatus } from '../types';

export interface IUserProblemData extends Document {
  userId: mongoose.Types.ObjectId;
  problemId: string;
  status: ProblemStatus;
  isStarred: boolean;
  notes: string;
  lastSubmittedAt?: Date;
  submissionHistory: { timestamp: Date; status: string }[];
}

const UserProblemDataSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  problemId: { 
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(ProblemStatus),
    default: ProblemStatus.Unsolved,
  },
  isStarred: {
    type: Boolean,
    default: false,
  },
  notes: {
    type: String,
    default: '',
  },
  lastSubmittedAt: {
    type: Date,
  },
  submissionHistory: [{
    timestamp: { type: Date, default: Date.now },
    status: String,
  }]
});

UserProblemDataSchema.index({ userId: 1, problemId: 1 }, { unique: true });

export default mongoose.models.UserProblemData || mongoose.model<IUserProblemData>('UserProblemData', UserProblemDataSchema);
