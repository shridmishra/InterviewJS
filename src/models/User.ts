import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  authProvider?: string;
  image?: string;
  createdAt: Date;
  // Gamification fields
  hearts?: number;
  xp?: number;
  level?: number;
  streak?: number;
  streakFreezeActive?: boolean;
  streakFreezesAvailable?: number;
  lastHeartRegenTime?: Date;
  dailyGoalMinutes?: number;
  lastPracticeDate?: Date;
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
  // Gamification fields
  hearts: {
    type: Number,
    default: 5,
  },
  xp: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 1,
  },
  streak: {
    type: Number,
    default: 0,
  },
  streakFreezeActive: {
    type: Boolean,
    default: false,
  },
  streakFreezesAvailable: {
    type: Number,
    default: 0,
  },
  lastHeartRegenTime: {
    type: Date,
  },
  dailyGoalMinutes: {
    type: Number,
    default: 10,
  },
  lastPracticeDate: {
    type: Date,
  },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

