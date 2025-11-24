import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserProblemData from '@/models/UserProblemData';
import { authMiddleware } from '@/lib/auth';
import { ProblemStatus } from '@/types';

export async function GET(req: NextRequest) {
  // JavaScript problems
  const { learnTheBasics } = await import('@/data/problems/js/1-basics-1');
  const { arrayManipulation } = await import('@/data/problems/js/2-basics-2');
  const { step3Basics3 } = await import('@/data/problems/js/3-basics-3');
  const { asynchronousJavaScript } = await import('@/data/problems/js/4-asynchronous-javascript');
  const { domManipulation } = await import('@/data/problems/js/5-dom-manipulation');
  const { advancedDomAndEvents } = await import('@/data/problems/js/6-advanced-dom-and-events');
  
  // TypeScript problems
  const { typescriptBasics } = await import('@/data/problems/ts/1-basics-typescript');
  const { typescriptClassesInterfacesEnums } = await import('@/data/problems/ts/2-classes-interfaces-enums-typescript');
  const { typescriptGenericsUtilityTypes } = await import('@/data/problems/ts/3-generics-utility-types-typescript');
  const { typescriptAdvancedTypesPatterns } = await import('@/data/problems/ts/4-advanced-types-patterns-typescript');
  const { typescriptModulesAsync } = await import('@/data/problems/ts/5-modules-async-typescript');
  const { typescriptRealWorld } = await import('@/data/problems/ts/6-real-world-typescript');
  
  const problemsData = [
    ...learnTheBasics,
    ...arrayManipulation,
    ...step3Basics3,
    ...asynchronousJavaScript,
    ...domManipulation,
    ...advancedDomAndEvents,
    ...typescriptBasics,
    ...typescriptClassesInterfacesEnums,
    ...typescriptGenericsUtilityTypes,
    ...typescriptAdvancedTypesPatterns,
    ...typescriptModulesAsync,
    ...typescriptRealWorld
  ];
  await dbConnect();

  const user = await authMiddleware(req);

  if (!user) {
    const staticProblems = problemsData.map(({ solutionCheck: _solutionCheck, ...p }) => ({
        ...p,
        status: ProblemStatus.Unsolved,
        isStarred: false,
        notes: ''
    }));
    return NextResponse.json(staticProblems);
  }

  try {
    const userData = await UserProblemData.find({ userId: user.id });
    const userDataMap = new Map(userData.map(item => [item.problemId, item]));

    const mergedProblems = problemsData.map(({ solutionCheck: _solutionCheck, ...p }) => {
        const userProgress = userDataMap.get(p.id);
        return {
            ...p,
            status: userProgress ? userProgress.status : ProblemStatus.Unsolved,
            isStarred: userProgress ? userProgress.isStarred : false,
            notes: userProgress ? userProgress.notes : ''
        };
    });
    return NextResponse.json(mergedProblems);
  } catch (_error) {
    console.error(_error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
