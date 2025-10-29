import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function authMiddleware(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.split(' ')[1];

  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not defined');
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { user: any };
    return decoded.user;
  } catch (e) {
    return null;
  }
}
