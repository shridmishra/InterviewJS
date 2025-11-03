import mongoose, { Document, Schema } from 'mongoose';
import { Difficulty } from '../types';

export interface IUserAnsweredQuestion extends Document {
  userId: mongoose.Types.ObjectId;
  question: string;
  options: string[];
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
  difficulty: Difficulty;
  answeredAt: Date;
}

const UserAnsweredQuestionSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  userAnswer: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  answeredAt: {
    type: Date,
    default: Date.now,
  },
});

UserAnsweredQuestionSchema.index({ userId: 1, answeredAt: -1 });

export default mongoose.models.UserAnsweredQuestion || mongoose.model<IUserAnsweredQuestion>('UserAnsweredQuestion', UserAnsweredQuestionSchema);
