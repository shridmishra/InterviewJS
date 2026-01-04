import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import User from '@/models/User';
import dbConnect from '@/lib/dbConnect';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();


    // Fetch top 50 users sorted by XP descending
    const users = await User.find({})
      .select('username image xp streak level')
      .sort({ xp: -1 })
      .limit(50)
      .lean();

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
