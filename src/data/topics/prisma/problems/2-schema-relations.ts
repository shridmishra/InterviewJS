import { Problem, Difficulty } from '@/types';

export const prismaSchemaRelations: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'prisma-one-to-many',
    title: 'One-to-Many Relation',
    description: 'Define a one-to-many relation between `User` and `Post`. A User can have many Posts. `User` should have `posts Post[]` and `Post` should have `author User` and `authorId Int`.',
    difficulty: Difficulty.Medium,
    category: 'Schema',
    group: 'Step 2: Schema & Relations',
    docsUrl: 'https://www.prisma.io/docs/concepts/components/prisma-schema/relations/one-to-many-relations',
    starterCode: `model User {
  id    Int    @id @default(autoincrement())
  posts Post[]
}

model Post {
  id       Int  @id @default(autoincrement())
  // Add relation fields here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('author User @relation(fields: [authorId], references: [id])') && userCode.includes('authorId Int');
      return [{
        input: 'Code Check',
        expected: 'One-to-many relation defined',
        actual: passed ? 'Correctly implemented' : 'Missing relation fields',
        passed
      }];
    },
  },
  {
    id: 'prisma-enum',
    title: 'Define Enum',
    description: 'Define an enum `Role` with values `USER` and `ADMIN`, and add a `role` field to the `User` model with a default value of `USER`.',
    difficulty: Difficulty.Easy,
    category: 'Schema',
    group: 'Step 2: Schema & Relations',
    docsUrl: 'https://www.prisma.io/docs/concepts/components/prisma-schema/enums',
    starterCode: `// Define enum here

model User {
  id   Int  @id @default(autoincrement())
  // Add role field here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('enum Role {') && userCode.includes('USER') && userCode.includes('ADMIN') && userCode.includes('role Role @default(USER)');
      return [{
        input: 'Code Check',
        expected: 'Enum defined and used',
        actual: passed ? 'Correctly implemented' : 'Missing enum or field',
        passed
      }];
    },
  },
  {
    id: 'prisma-one-to-one',
    title: 'One-to-One Relation',
    description: 'Define a one-to-one relation between `User` and `Profile`. A User has one Profile.',
    difficulty: Difficulty.Medium,
    category: 'Schema Relations',
    group: 'Step 2: Schema Relations',
    docsUrl: 'https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/one-to-one-relations',
    starterCode: `model User {
  id      Int      @id @default(autoincrement())
  // Add relation here
}

model Profile {
  id     Int  @id @default(autoincrement())
  // Add relation here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('profile Profile?') && userCode.includes('user User') && userCode.includes('@relation');
      return [{
        input: 'Code Check',
        expected: 'One-to-one relation definition',
        actual: passed ? 'Correctly implemented' : 'Missing relation fields',
        passed
      }];
    },
  },
  {
    id: 'prisma-many-to-many',
    title: 'Many-to-Many Relation',
    description: 'Define an implicit many-to-many relation between `Post` and `Category`.',
    difficulty: Difficulty.Medium,
    category: 'Schema Relations',
    group: 'Step 2: Schema Relations',
    docsUrl: 'https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/many-to-many-relations',
    starterCode: `model Post {
  id         Int        @id @default(autoincrement())
  // Add relation here
}

model Category {
  id    Int    @id @default(autoincrement())
  // Add relation here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('categories Category[]') && userCode.includes('posts Post[]');
      return [{
        input: 'Code Check',
        expected: 'Many-to-many relation definition',
        actual: passed ? 'Correctly implemented' : 'Missing array fields',
        passed
      }];
    },
  },
  {
    id: 'prisma-self-relation',
    title: 'Self Relation',
    description: 'Define a self-relation on `User` to model a "manager" (one-to-many). A user has one manager and can manage many users.',
    difficulty: Difficulty.Medium,
    category: 'Schema Relations',
    group: 'Step 2: Schema Relations',
    docsUrl: 'https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/self-relations',
    starterCode: `model User {
  id        Int    @id @default(autoincrement())
  name      String
  // Add self-relation here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('manager   User?') && userCode.includes('managees  User[]');
      return [{
        input: 'Code Check',
        expected: 'Self-relation definition',
        actual: passed ? 'Correctly implemented' : 'Missing self-relation fields',
        passed
      }];
    },
  }
];
