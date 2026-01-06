import { TopicQuestion } from '../types';

export const prismaQuestions: TopicQuestion[] = [
  {
    id: 'prisma-1',
    topic: 'Prisma',
    question: 'What is Prisma and what problem does it solve?',
    answer: `Prisma is a next-generation ORM (Object-Relational Mapping) for Node.js and TypeScript. It provides a type-safe database client, automated migrations, and a visual database browser. It solves problems like writing raw SQL, managing database schemas, and ensuring type safety between your database and application.`,
    difficulty: 'Easy'
  },
  {
    id: 'prisma-2',
    topic: 'Prisma',
    question: 'What are the main components of Prisma?',
    answer: `**Prisma Schema**: Defines your data model and database connection.
**Prisma Client**: Auto-generated type-safe query builder.
**Prisma Migrate**: Migration system for managing schema changes.
**Prisma Studio**: Visual database browser and editor.`,
    difficulty: 'Easy'
  },
  {
    id: 'prisma-3',
    topic: 'Prisma',
    question: 'What is the Prisma Schema file?',
    answer: `The Prisma schema file (usually \`schema.prisma\`) is where you define your data models, database connection, and generator configuration. It uses a declarative syntax to describe your database structure.`,
    difficulty: 'Easy'
  },
  {
    id: 'prisma-4',
    topic: 'Prisma',
    question: 'How do you define a one-to-many relationship in Prisma?',
    answer: `\`\`\`prisma
model User {
  id    Int    @id @default(autoincrement())
  posts Post[]
}

model Post {
  id       Int  @id @default(autoincrement())
  userId   Int
  user     User @relation(fields: [userId], references: [id])
}
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'prisma-5',
    topic: 'Prisma',
    question: 'What is Prisma Client and how is it generated?',
    answer: `Prisma Client is an auto-generated database client based on your Prisma schema. You generate it by running \`npx prisma generate\`. It provides type-safe methods for CRUD operations that match your data models.`,
    difficulty: 'Easy'
  },
  {
    id: 'prisma-6',
    topic: 'Prisma',
    question: 'How do you perform migrations with Prisma?',
    answer: `Use \`npx prisma migrate dev\` in development to create and apply migrations. For production, use \`npx prisma migrate deploy\`. Prisma compares your schema to the database and generates SQL migration files.`,
    difficulty: 'Medium'
  },
  {
    id: 'prisma-7',
    topic: 'Prisma',
    question: 'What is the difference between @id and @unique in Prisma?',
    answer: `**@id**: Marks a field as the primary key. Each model must have exactly one.
**@unique**: Creates a unique constraint but doesn't make it the primary key. You can have multiple unique fields.`,
    difficulty: 'Easy'
  },
  {
    id: 'prisma-8',
    topic: 'Prisma',
    question: 'How do you handle transactions in Prisma?',
    answer: `Use \`prisma.$transaction()\` to wrap multiple operations:
\`\`\`typescript
await prisma.$transaction([
  prisma.user.create({ data: { name: 'Alice' } }),
  prisma.post.create({ data: { title: 'Hello' } })
]);
\`\`\`
Or use interactive transactions for more complex logic.`,
    difficulty: 'Medium'
  },
  {
    id: 'prisma-9',
    topic: 'Prisma',
    question: 'What are Prisma middlewares?',
    answer: `Middlewares allow you to intercept and modify Prisma Client queries. Common use cases include logging, soft deletes, and data transformation. They run before/after each query.`,
    difficulty: 'Hard'
  },
  {
    id: 'prisma-10',
    topic: 'Prisma',
    question: 'How do you seed a database with Prisma?',
    answer: `Create a \`prisma/seed.ts\` file with your seed data and add a "seed" script to package.json. Run \`npx prisma db seed\` to populate your database with initial data.`,
    difficulty: 'Medium'
  },
  {
    id: 'prisma-11',
    topic: 'Prisma',
    question: 'How do you handle enum types in Prisma?',
    answer: `Define enums in the Prisma schema:
\`\`\`prisma
enum Role {
  USER
  ADMIN
}

model User {
  role Role @default(USER)
}
\`\`\`
Prisma generates TypeScript enums you can use in your code.`,
    difficulty: 'Easy'
  },
  {
    id: 'prisma-12',
    topic: 'Prisma',
    question: 'What is the difference between findUnique and findFirst?',
    answer: `**findUnique**: Searches by unique identifier (@id or @unique field). Returns one record or null.
**findFirst**: Returns the first record matching the criteria. Can use any field for filtering.`,
    difficulty: 'Medium'
  },
  {
    id: 'prisma-13',
    topic: 'Prisma',
    question: 'How do you implement soft deletes in Prisma?',
    answer: `Add a \`deletedAt\` DateTime field and use middleware to filter out deleted records:
\`\`\`typescript
prisma.$use(async (params, next) => {
  if (params.action === 'delete') {
    params.action = 'update';
    params.args.data = { deletedAt: new Date() };
  }
  return next(params);
});
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'prisma-14',
    topic: 'Prisma',
    question: 'What is the purpose of @@index in Prisma?',
    answer: `@@index creates a database index on one or more fields to improve query performance. Example:
\`\`\`prisma
model Post {
  @@index([userId, createdAt])
}
\`\`\`
This speeds up queries filtering by userId and createdAt.`,
    difficulty: 'Medium'
  },
  {
    id: 'prisma-15',
    topic: 'Prisma',
    question: 'How do you perform bulk operations in Prisma?',
    answer: `Use methods like \`createMany\`, \`updateMany\`, or \`deleteMany\`:
\`\`\`typescript
await prisma.user.createMany({
  data: [
    { name: 'Alice' },
    { name: 'Bob' }
  ]
});
\`\`\`
These operations are optimized for performance.`,
    difficulty: 'Medium'
  },
  {
    id: 'prisma-16',
    topic: 'Prisma',
    question: 'What are the different types of relations in Prisma?',
    answer: `**One-to-One:**
\`\`\`prisma
model User {
  id      Int      @id @default(autoincrement())
  profile Profile?
}
model Profile {
  id     Int  @id @default(autoincrement())
  userId Int  @unique
  user   User @relation(fields: [userId], references: [id])
}
\`\`\`

**One-to-Many:**
\`\`\`prisma
model User {
  id    Int    @id @default(autoincrement())
  posts Post[]
}
model Post {
  id       Int  @id @default(autoincrement())
  authorId Int
  author   User @relation(fields: [authorId], references: [id])
}
\`\`\`

**Many-to-Many (implicit):**
Uses a join table automatically created by Prisma.`,
    difficulty: 'Medium'
  },
  {
    id: 'prisma-17',
    topic: 'Prisma',
    question: 'How do you handle database migrations with Prisma?',
    answer: `**Development:**
\`\`\`bash
npx prisma migrate dev --name add_users
\`\`\`

**Production:**
\`\`\`bash
npx prisma migrate deploy
\`\`\`

**Other commands:**
- \`prisma migrate reset\`: Reset database
- \`prisma migrate status\`: Check status
- \`prisma db push\`: Sync schema without migrations`,
    difficulty: 'Medium'
  },
  {
    id: 'prisma-18',
    topic: 'Prisma',
    question: 'What is the difference between findUnique, findFirst, and findMany?',
    answer: `**findUnique:** Find by unique field (id, @unique)
\`\`\`typescript
await prisma.user.findUnique({ where: { id: 1 } });
\`\`\`

**findFirst:** Find first matching record
\`\`\`typescript
await prisma.user.findFirst({ where: { status: 'active' } });
\`\`\`

**findMany:** Find all matching records
\`\`\`typescript
await prisma.user.findMany({ where: { status: 'active' } });
\`\`\`

Use \`findUniqueOrThrow\` or \`findFirstOrThrow\` to throw if not found.`,
    difficulty: 'Easy'
  },
  {
    id: 'prisma-19',
    topic: 'Prisma',
    question: 'How do you implement soft deletes in Prisma?',
    answer: `**Schema:**
\`\`\`prisma
model User {
  id        Int       @id
  deletedAt DateTime?
}
\`\`\`

**Soft delete:**
\`\`\`typescript
await prisma.user.update({
  where: { id: 1 },
  data: { deletedAt: new Date() }
});
\`\`\`

**Query active records:**
\`\`\`typescript
await prisma.user.findMany({
  where: { deletedAt: null }
});
\`\`\`

Use middleware to automatically filter soft-deleted records.`,
    difficulty: 'Medium'
  },
  {
    id: 'prisma-20',
    topic: 'Prisma',
    question: 'What are Prisma Client extensions?',
    answer: `Extensions add custom functionality to Prisma Client.

**Model extension:**
\`\`\`typescript
const prisma = new PrismaClient().$extends({
  model: {
    user: {
      async findByEmail(email: string) {
        return prisma.user.findUnique({ where: { email } });
      }
    }
  }
});
\`\`\`

**Result extension:**
\`\`\`typescript
const prisma = new PrismaClient().$extends({
  result: {
    user: {
      fullName: {
        needs: { firstName: true, lastName: true },
        compute(user) {
          return \`\${user.firstName} \${user.lastName}\`;
        }
      }
    }
  }
});
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'prisma-21',
    topic: 'Prisma',
    question: 'How do you handle transactions in Prisma?',
    answer: `**Sequential operations:**
\`\`\`typescript
await prisma.$transaction([
  prisma.user.create({ data: { name: 'John' } }),
  prisma.post.create({ data: { title: 'Hello' } })
]);
\`\`\`

**Interactive transactions:**
\`\`\`typescript
await prisma.$transaction(async (tx) => {
  const user = await tx.user.findUnique({ where: { id: 1 } });
  if (!user) throw new Error('Not found');
  await tx.account.update({
    where: { id: user.accountId },
    data: { balance: { decrement: 100 } }
  });
});
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'prisma-22',
    topic: 'Prisma',
    question: 'What is the difference between select and include?',
    answer: `**select:** Choose specific fields only
\`\`\`typescript
await prisma.user.findUnique({
  where: { id: 1 },
  select: { id: true, name: true }
});
\`\`\`

**include:** Add relations to default fields
\`\`\`typescript
await prisma.user.findUnique({
  where: { id: 1 },
  include: { posts: true }
});
\`\`\`

Cannot use both at top level. Nest include within select if needed.`,
    difficulty: 'Easy'
  },
  {
    id: 'prisma-23',
    topic: 'Prisma',
    question: 'How do you implement pagination in Prisma?',
    answer: `**Offset pagination:**
\`\`\`typescript
await prisma.user.findMany({
  skip: (page - 1) * pageSize,
  take: pageSize,
  orderBy: { createdAt: 'desc' }
});
\`\`\`

**Cursor-based pagination:**
\`\`\`typescript
await prisma.user.findMany({
  take: 10,
  cursor: { id: lastId },
  skip: 1
});
\`\`\`

Cursor pagination is better for large datasets.`,
    difficulty: 'Medium'
  },
  {
    id: 'prisma-24',
    topic: 'Prisma',
    question: 'How do you use raw SQL queries in Prisma?',
    answer: `**$queryRaw:** For SELECT queries
\`\`\`typescript
const users = await prisma.$queryRaw\`
  SELECT * FROM "User" WHERE age > \${minAge}
\`;
\`\`\`

**$executeRaw:** For INSERT/UPDATE/DELETE
\`\`\`typescript
const count = await prisma.$executeRaw\`
  UPDATE "User" SET status = 'active' WHERE id = \${userId}
\`;
\`\`\`

Always use template literals to prevent SQL injection.`,
    difficulty: 'Medium'
  },
  {
    id: 'prisma-25',
    topic: 'Prisma',
    question: 'What is @map and @@map in Prisma?',
    answer: `**@map:** Map field name to column name
\`\`\`prisma
model User {
  firstName String @map("first_name")
}
\`\`\`

**@@map:** Map model name to table name
\`\`\`prisma
model User {
  id Int @id
  @@map("users")
}
\`\`\`

Use for matching existing database naming conventions.`,
    difficulty: 'Easy'
  },
  {
    id: 'prisma-26',
    topic: 'Prisma',
    question: 'How do you handle JSON fields in Prisma?',
    answer: `**Schema:**
\`\`\`prisma
model User {
  id       Int  @id
  settings Json
}
\`\`\`

**Create:**
\`\`\`typescript
await prisma.user.create({
  data: {
    settings: { theme: 'dark', notifications: true }
  }
});
\`\`\`

**Filter (PostgreSQL):**
\`\`\`typescript
await prisma.user.findMany({
  where: {
    settings: { path: ['theme'], equals: 'dark' }
  }
});
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'prisma-27',
    topic: 'Prisma',
    question: 'What is the difference between @id and @unique?',
    answer: `**@id:** Primary key (one per model)
\`\`\`prisma
model User {
  id Int @id @default(autoincrement())
}
\`\`\`

**@unique:** Unique constraint (multiple allowed)
\`\`\`prisma
model User {
  id    Int    @id
  email String @unique
}
\`\`\`

Both can be used with \`findUnique\`. @id is required, @unique can be nullable.`,
    difficulty: 'Easy'
  },
  {
    id: 'prisma-28',
    topic: 'Prisma',
    question: 'How do you implement cascading deletes in Prisma?',
    answer: `**Schema with referential actions:**
\`\`\`prisma
model Post {
  id       Int  @id
  authorId Int
  author   User @relation(fields: [authorId], references: [id], onDelete: Cascade)
}
\`\`\`

**Options:**
- \`Cascade\`: Delete related records
- \`SetNull\`: Set foreign key to null
- \`Restrict\`: Prevent deletion
- \`NoAction\`: Similar to Restrict
- \`SetDefault\`: Set to default value`,
    difficulty: 'Medium'
  },
  {
    id: 'prisma-29',
    topic: 'Prisma',
    question: 'What is db push vs migrate?',
    answer: `**prisma db push:**
- Syncs schema directly to database
- No migration files created
- Can cause data loss
- Good for prototyping

**prisma migrate:**
- Creates migration SQL files
- Version controlled
- Safe for production
- Supports team workflows

Use \`db push\` during development, \`migrate\` for production.`,
    difficulty: 'Medium'
  },
  {
    id: 'prisma-30',
    topic: 'Prisma',
    question: 'How do you seed a database with Prisma?',
    answer: `**Create prisma/seed.ts:**
\`\`\`typescript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: { email: 'admin@example.com', name: 'Admin' }
  });
}
main().finally(() => prisma.$disconnect());
\`\`\`

**Configure package.json:**
\`\`\`json
{ "prisma": { "seed": "ts-node prisma/seed.ts" } }
\`\`\`

**Run:** \`npx prisma db seed\``,
    difficulty: 'Easy'
  },
  {
    id: 'prisma-31',
    topic: 'Prisma',
    question: 'How do you handle enums in Prisma?',
    answer: `**Define enum:**
\`\`\`prisma
enum Role {
  USER
  ADMIN
  MODERATOR
}

model User {
  id   Int  @id
  role Role @default(USER)
}
\`\`\`

**Use in queries:**
\`\`\`typescript
await prisma.user.create({
  data: { role: 'ADMIN' }
});
\`\`\`

TypeScript provides full type safety for enum values.`,
    difficulty: 'Easy'
  },
  {
    id: 'prisma-32',
    topic: 'Prisma',
    question: 'What is Prisma Studio?',
    answer: `Prisma Studio is a visual database browser.

**Launch:**
\`\`\`bash
npx prisma studio
\`\`\`

**Features:**
- Browse and view data
- Create, edit, delete records
- Filter and search
- Navigate relations
- Edit JSON fields

Opens at http://localhost:5555. Development tool only, not for production.`,
    difficulty: 'Easy'
  },
  {
    id: 'prisma-33',
    topic: 'Prisma',
    question: 'What is the difference between update and updateMany?',
    answer: `**update:** Update single record by unique field
\`\`\`typescript
await prisma.user.update({
  where: { id: 1 },
  data: { name: 'Updated' }
});
// Returns: User, throws if not found
\`\`\`

**updateMany:** Update multiple records
\`\`\`typescript
await prisma.user.updateMany({
  where: { status: 'inactive' },
  data: { status: 'archived' }
});
// Returns: { count: 5 }
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'prisma-34',
    topic: 'Prisma',
    question: 'How do you use Prisma with Next.js?',
    answer: `**Create singleton (lib/prisma.ts):**
\`\`\`typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as { prisma?: PrismaClient };
export const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
\`\`\`

**Use in Server Components:**
\`\`\`typescript
import { prisma } from '@/lib/prisma';
const users = await prisma.user.findMany();
\`\`\`

Singleton prevents connection exhaustion in development.`,
    difficulty: 'Medium'
  },
  {
    id: 'prisma-35',
    topic: 'Prisma',
    question: 'What are relation filters in Prisma?',
    answer: `**some/every/none for to-many:**
\`\`\`typescript
// Users with at least one published post
await prisma.user.findMany({
  where: { posts: { some: { published: true } } }
});

// Users where ALL posts published
where: { posts: { every: { published: true } } }

// Users with NO published posts
where: { posts: { none: { published: true } } }
\`\`\`

**is/isNot for to-one:**
\`\`\`typescript
await prisma.post.findMany({
  where: { author: { is: { verified: true } } }
});
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'prisma-36',
    topic: 'Prisma',
    question: 'How do you perform aggregations in Prisma?',
    answer: `**count:**
\`\`\`typescript
const count = await prisma.user.count();
const activeCount = await prisma.user.count({ where: { status: 'active' } });
\`\`\`

**aggregate:**
\`\`\`typescript
const result = await prisma.product.aggregate({
  _avg: { price: true },
  _sum: { price: true },
  _min: { price: true },
  _max: { price: true }
});
\`\`\`

**groupBy:**
\`\`\`typescript
const grouped = await prisma.order.groupBy({
  by: ['status'],
  _count: { id: true },
  _sum: { amount: true }
});
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'prisma-37',
    topic: 'Prisma',
    question: 'What is Prisma Accelerate?',
    answer: `Prisma Accelerate is a managed connection pooler and global cache.

**Benefits:**
- Connection pooling for serverless
- Edge runtime compatibility
- Global caching
- Query optimization

**Usage:**
\`\`\`typescript
import { withAccelerate } from '@prisma/extension-accelerate';

const prisma = new PrismaClient().$extends(withAccelerate());

const users = await prisma.user.findMany({
  cacheStrategy: { ttl: 60, swr: 120 }
});
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'prisma-38',
    topic: 'Prisma',
    question: 'How do you filter with AND, OR, NOT operators?',
    answer: `**AND (implicit):**
\`\`\`typescript
await prisma.user.findMany({
  where: { status: 'active', role: 'ADMIN' }
});
\`\`\`

**OR:**
\`\`\`typescript
await prisma.user.findMany({
  where: {
    OR: [
      { email: { contains: 'gmail' } },
      { email: { contains: 'yahoo' } }
    ]
  }
});
\`\`\`

**NOT:**
\`\`\`typescript
await prisma.user.findMany({
  where: { NOT: { status: 'deleted' } }
});
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'prisma-39',
    topic: 'Prisma',
    question: 'What is Prisma introspection?',
    answer: `Introspection generates Prisma schema from existing database.

**Run:**
\`\`\`bash
npx prisma db pull
\`\`\`

**Use cases:**
- Existing database without Prisma
- Database-first development
- Syncing after manual DB changes
- Migrating from other ORMs

**After introspection:**
\`\`\`bash
npx prisma generate
\`\`\`

Review and improve the generated schema with @map, relations, etc.`,
    difficulty: 'Medium'
  },
  {
    id: 'prisma-40',
    topic: 'Prisma',
    question: 'What are scalar list fields in Prisma?',
    answer: `Scalar lists are arrays of primitive types (PostgreSQL, CockroachDB, MongoDB).

**Schema:**
\`\`\`prisma
model Post {
  id     Int      @id
  tags   String[]
  scores Int[]
}
\`\`\`

**Create:**
\`\`\`typescript
await prisma.post.create({
  data: { tags: ['tech', 'prisma'] }
});
\`\`\`

**Filter:**
\`\`\`typescript
where: { tags: { has: 'prisma' } }
where: { tags: { hasEvery: ['tech', 'prisma'] } }
where: { tags: { hasSome: ['tech', 'react'] } }
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'prisma-41',
    topic: 'Prisma',
    question: 'How do you handle connection pooling in Prisma?',
    answer: `**Connection pool configuration:**
\`\`\`
DATABASE_URL="postgresql://...?connection_limit=10&pool_timeout=30"
\`\`\`

**Parameters:**
- \`connection_limit\`: Max connections
- \`pool_timeout\`: Wait time for connection
- \`connect_timeout\`: Connection establishment timeout

**For serverless:**
\`\`\`
DATABASE_URL="...?connection_limit=1"
\`\`\`

Use Prisma Accelerate or external poolers (PgBouncer) for high concurrency.`,
    difficulty: 'Medium'
  },
  {
    id: 'prisma-42',
    topic: 'Prisma',
    question: 'What is the difference between create, createMany, and upsert?',
    answer: `**create:** Insert single record
\`\`\`typescript
await prisma.user.create({ data: { email: 'john@test.com' } });
// Returns: User
\`\`\`

**createMany:** Insert multiple records
\`\`\`typescript
await prisma.user.createMany({
  data: [{ email: 'a@test.com' }, { email: 'b@test.com' }],
  skipDuplicates: true
});
// Returns: { count: 2 }
\`\`\`

**upsert:** Insert or update
\`\`\`typescript
await prisma.user.upsert({
  where: { email: 'john@test.com' },
  update: { name: 'Updated' },
  create: { email: 'john@test.com', name: 'John' }
});
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'prisma-43',
    topic: 'Prisma',
    question: 'How do you implement N+1 query prevention?',
    answer: `**N+1 problem:**
\`\`\`typescript
//  N+1 queries
const users = await prisma.user.findMany();
for (const user of users) {
  const posts = await prisma.post.findMany({ where: { authorId: user.id } });
}
\`\`\`

**Solution: Use include**
\`\`\`typescript
//  1 query with JOIN
const users = await prisma.user.findMany({
  include: { posts: true }
});
\`\`\`

Prisma also auto-batches multiple \`findUnique\` calls with same model.`,
    difficulty: 'Medium'
  },
  {
    id: 'prisma-44',
    topic: 'Prisma',
    question: 'What are native database types in Prisma?',
    answer: `Native types map Prisma types to specific database column types.

**PostgreSQL:**
\`\`\`prisma
model Product {
  name  String   @db.VarChar(255)
  price Decimal  @db.Money
  data  Json     @db.JsonB
}
\`\`\`

**MySQL:**
\`\`\`prisma
model Product {
  name     String   @db.VarChar(255)
  quantity Int      @db.TinyInt
  created  DateTime @db.Timestamp(6)
}
\`\`\`

Use for precise database type control.`,
    difficulty: 'Medium'
  },
  {
    id: 'prisma-45',
    topic: 'Prisma',
    question: 'How do you handle datetime and timezone in Prisma?',
    answer: `**Schema:**
\`\`\`prisma
model Event {
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
\`\`\`

**Create with date:**
\`\`\`typescript
await prisma.event.create({
  data: { startAt: new Date('2024-01-15T10:00:00Z') }
});
\`\`\`

**Filter:**
\`\`\`typescript
await prisma.event.findMany({
  where: {
    startAt: { gte: new Date('2024-01-01'), lt: new Date('2024-02-01') }
  }
});
\`\`\`

Prisma stores as UTC. Convert on read for display.`,
    difficulty: 'Easy'
  },
  {
    id: 'prisma-46',
    topic: 'Prisma',
    question: 'How do you test code that uses Prisma?',
    answer: `**Unit testing with mocks:**
\`\`\`typescript
import { mockDeep } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';

const prisma = mockDeep<PrismaClient>();

test('creates user', async () => {
  prisma.user.create.mockResolvedValue({ id: 1, name: 'John' });
  const user = await createUser(prisma, { name: 'John' });
  expect(user.name).toBe('John');
});
\`\`\`

**Integration testing:**
Use a test database and clean up between tests.`,
    difficulty: 'Medium'
  },
  {
    id: 'prisma-47',
    topic: 'Prisma',
    question: 'What is the shadow database in Prisma?',
    answer: `The shadow database is a temporary database used during migration development.

**Purpose:**
- Detects schema drift
- Generates migration SQL
- Validates migrations

**Configuration:**
\`\`\`
SHADOW_DATABASE_URL="postgresql://...shadow_db"
\`\`\`

**Required for:**
- \`prisma migrate dev\`
Not required for:
- \`prisma migrate deploy\` (production)
- \`prisma db push\``,
    difficulty: 'Hard'
  },
  {
    id: 'prisma-48',
    topic: 'Prisma',
    question: 'How do you implement optimistic locking in Prisma?',
    answer: `**Schema:**
\`\`\`prisma
model Product {
  id      Int @id
  price   Float
  version Int @default(0)
}
\`\`\`

**Update with version check:**
\`\`\`typescript
const result = await prisma.product.updateMany({
  where: { id: 1, version: currentVersion },
  data: { price: 99.99, version: { increment: 1 } }
});

if (result.count === 0) {
  throw new Error('Concurrent modification detected');
}
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'prisma-49',
    topic: 'Prisma',
    question: 'What are database views in Prisma?',
    answer: `**Create view in migration:**
\`\`\`sql
CREATE VIEW "UserStats" AS
SELECT u.id, COUNT(p.id) as "postCount"
FROM "User" u LEFT JOIN "Post" p ON u.id = p."authorId"
GROUP BY u.id;
\`\`\`

**Map in schema:**
\`\`\`prisma
generator client {
  previewFeatures = ["views"]
}

view UserStats {
  userId    Int @unique
  postCount Int
}
\`\`\`

Views are read-only. Must create manually in migrations.`,
    difficulty: 'Hard'
  },
  {
    id: 'prisma-50',
    topic: 'Prisma',
    question: 'What are best practices for Prisma in production?',
    answer: `**1. Use migrations (not db push):**
\`\`\`bash
npx prisma migrate deploy
\`\`\`

**2. Connection pooling:**
\`\`\`
DATABASE_URL="...?connection_limit=10"
\`\`\`

**3. Singleton pattern for serverless**

**4. Error handling:**
\`\`\`typescript
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
if (e.code === 'P2002') { /* unique constraint */ }
\`\`\`

**5. Enable logging:**
\`\`\`typescript
new PrismaClient({ log: ['error', 'warn'] });
\`\`\`

**6. Run migrations in CI/CD pipeline**`,
    difficulty: 'Medium'
  }
];
