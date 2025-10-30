import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  authProvider?: string;
  image?: string;
  createdAt: Date;
  quizProgress: Map<string, { index: number; answers: Map<string, number> }>;
  quizHistory: { difficulty: string; score: number; totalQuestions: number; completedAt: Date }[];
}

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: false, // Not required for Google OAuth
  },
  authProvider: {
    type: String,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  quizProgress: {
    type: Map,
    of: {
      index: { type: Number, default: 0 },
      answers: {
        type: Map,
        of: Number,
      },
    },
    default: {},
  },
  quizHistory: [{
    difficulty: String,
    score: Number,
    totalQuestions: Number,
    completedAt: {
      type: Date,
      default: Date.now
    }
  }],
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
