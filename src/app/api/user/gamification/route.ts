import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { authMiddleware } from '@/lib/auth';

// Get gamification data (hearts, XP, level, streak)
export async function GET(req: NextRequest) {
  await dbConnect();

  const user = await authMiddleware(req);

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const userFromDb = await User.findOne({ email: user.email });
    
    if (!userFromDb) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Return gamification data, with defaults if fields don't exist
    return NextResponse.json({
      hearts: userFromDb.hearts ?? 5,
      maxHearts: 5,
      xp: userFromDb.xp ?? 0,
      level: userFromDb.level ?? 1,
      xpToNextLevel: 100,
      streak: userFromDb.streak ?? 0,
      streakFreezeActive: userFromDb.streakFreezeActive ?? false,
      streakFreezesAvailable: userFromDb.streakFreezesAvailable ?? 0,
      lastHeartRegenTime: userFromDb.lastHeartRegenTime ?? null,
    });
  } catch (error) {
    console.error('Gamification GET error:', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}

// Update gamification data
export async function POST(req: NextRequest) {
  await dbConnect();

  const user = await authMiddleware(req);

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { action, amount } = body;

    const userFromDb = await User.findOne({ email: user.email });
    
    if (!userFromDb) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Initialize gamification fields if they don't exist
    if (userFromDb.hearts === undefined) userFromDb.hearts = 5;
    if (userFromDb.xp === undefined) userFromDb.xp = 0;
    if (userFromDb.level === undefined) userFromDb.level = 1;

    let result = {};

    switch (action) {
      case 'loseHeart':
        userFromDb.hearts = Math.max(0, (userFromDb.hearts || 5) - 1);
        result = { hearts: userFromDb.hearts };
        break;
        
      case 'gainHeart':
        userFromDb.hearts = Math.min(5, (userFromDb.hearts || 0) + 1);
        result = { hearts: userFromDb.hearts };
        break;
        
      case 'refillHearts':
        userFromDb.hearts = 5;
        result = { hearts: 5 };
        break;
        
      case 'addXp':
        const xpAmount = amount || 10;
        userFromDb.xp = (userFromDb.xp || 0) + xpAmount;
        
        // Check for level up (100 XP per level)
        const xpPerLevel = 100;
        while (userFromDb.xp >= xpPerLevel) {
          userFromDb.xp -= xpPerLevel;
          userFromDb.level = (userFromDb.level || 1) + 1;
        }
        
        result = { 
          xp: userFromDb.xp, 
          level: userFromDb.level,
          xpAdded: xpAmount,
        };
        break;
        
      case 'useStreakFreeze':
        if ((userFromDb.streakFreezesAvailable || 0) > 0) {
          userFromDb.streakFreezesAvailable -= 1;
          userFromDb.streakFreezeActive = true;
          result = { 
            streakFreezeActive: true,
            streakFreezesAvailable: userFromDb.streakFreezesAvailable,
          };
        } else {
          return NextResponse.json({ message: 'No streak freezes available' }, { status: 400 });
        }
        break;
        
      default:
        return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
    }

    await userFromDb.save();

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error('Gamification POST error:', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
