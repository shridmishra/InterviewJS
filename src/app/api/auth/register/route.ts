import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function POST(req: Request) {
  await dbConnect();

  const { username, email, password } = await req.json();

  try {
    let user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ message: 'User already exists with that email' }, { status: 400 });
    }
    user = await User.findOne({ username });
    if (user) {
      return NextResponse.json({ message: 'Username is already taken' }, { status: 400 });
    }

    user = new User({ username, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = { user: { id: user.id } };
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in the environment variables.');
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    return NextResponse.json({ 
      token, 
      user: { id: user.id, username: user.username, email: user.email } 
    }, { status: 201 });

  } catch (_error) {
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
