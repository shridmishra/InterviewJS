import { TopicQuestion } from '../types';

export const mongoQuestions: TopicQuestion[] = [
  {
    id: 'mongo-1',
    topic: 'MongoDB',
    question: 'What is MongoDB and how does it differ from relational databases?',
    answer: `MongoDB is a **NoSQL document database** that stores data in flexible JSON-like documents.

**MongoDB vs Relational Databases:**

| Feature | MongoDB | Relational (SQL) |
|---------|---------|------------------|
| **Data Model** | Documents (JSON) | Tables (rows) |
| **Schema** | Flexible/dynamic | Fixed/rigid |
| **Relationships** | Embedded docs, refs | Foreign keys, JOINs |
| **Scaling** | Horizontal (sharding) | Vertical (bigger server) |
| **Query Language** | MongoDB Query API | SQL |

**When to use MongoDB:**
- Rapidly changing schemas
- Hierarchical/nested data
- High write throughput
- Horizontal scaling needs`,
    difficulty: 'Easy'
  },
  {
    id: 'mongo-2',
    topic: 'MongoDB',
    question: 'Explain the concept of a collection and a document in MongoDB.',
    answer: `**Document:** A single record (like a row in SQL)
\`\`\`javascript
{
  "_id": ObjectId("..."),
  "name": "John Doe",
  "email": "john@example.com",
  "orders": [
    { "item": "Book", "price": 29.99 }
  ]
}
\`\`\`

**Collection:** A group of documents (like a table in SQL)

| SQL Term | MongoDB Term |
|----------|--------------|
| Database | Database |
| Table | Collection |
| Row | Document |
| Column | Field |
| Index | Index |

**Key difference:** Documents in a collection don't need the same fields.`,
    difficulty: 'Easy'
  },
  {
    id: 'mongo-3',
    topic: 'MongoDB',
    question: 'What is the purpose of the _id field in MongoDB documents?',
    answer: `The \`_id\` field is a **unique identifier** for each document.

**Default behavior:**
\`\`\`javascript
// MongoDB auto-generates ObjectId
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "Product"
}
\`\`\`

**ObjectId structure (12 bytes):**
| Bytes | Content |
|-------|---------|
| 4 | Unix timestamp |
| 5 | Random value |
| 3 | Incrementing counter |

**Custom _id:**
\`\`\`javascript
// You can use any unique value
db.users.insertOne({ _id: "user123", name: "John" });
db.orders.insertOne({ _id: 1001, item: "Book" });
\`\`\`

**Note:** \`_id\` is automatically indexed for fast lookups.`,
    difficulty: 'Easy'
  },
  {
    id: 'mongo-4',
    topic: 'MongoDB',
    question: 'How does indexing improve query performance in MongoDB?',
    answer: `Indexes allow MongoDB to find documents **without scanning every document**.

**Without index:** Full collection scan (slow)
**With index:** B-tree lookup (fast)

\`\`\`javascript
// Create index on email field
db.users.createIndex({ email: 1 });

// Compound index (multiple fields)
db.users.createIndex({ lastName: 1, firstName: 1 });

// Unique index
db.users.createIndex({ email: 1 }, { unique: true });

// Text index for search
db.articles.createIndex({ content: "text" });
\`\`\`

**Index types:**
| Type | Use Case |
|------|----------|
| Single field | Filter by one field |
| Compound | Filter/sort by multiple fields |
| Text | Full-text search |
| Geospatial | Location queries |
| Hashed | Shard key |

 **Trade-off:** Indexes speed up reads but slow down writes.`,
    difficulty: 'Medium'
  },
  {
    id: 'mongo-5',
    topic: 'MongoDB',
    question: 'What is a capped collection and when would you use it?',
    answer: `A capped collection is a **fixed-size** collection that works like a circular buffer.

\`\`\`javascript
// Create a 1MB capped collection
db.createCollection("logs", {
  capped: true,
  size: 1048576,    // bytes
  max: 1000         // max documents
});
\`\`\`

**Behavior:**
- Oldest documents auto-deleted when full
- Preserves insertion order
- Very fast writes (no index updates)
- Cannot delete individual documents

**Use cases:**
| Use Case | Why Capped |
|----------|------------|
| Logging | Auto-purge old logs |
| Cache | Fixed memory footprint |
| Real-time feeds | FIFO queue behavior |
| Metrics | Rolling window of data |`,
    difficulty: 'Medium'
  },
  {
    id: 'mongo-6',
    topic: 'MongoDB',
    question: 'Explain the difference between find() and findOne() methods.',
    answer: `**\`findOne()\`** - Returns a single document
\`\`\`javascript
const user = await db.users.findOne({ email: "john@example.com" });
// Returns: { _id: ..., name: "John", ... } or null
\`\`\`

**\`find()\`** - Returns a cursor (iterator)
\`\`\`javascript
const cursor = db.users.find({ age: { $gt: 18 } });
const users = await cursor.toArray();
// Returns: [{ ... }, { ... }, ...]
\`\`\`

**Comparison:**
| Method | Returns | Use Case |
|--------|---------|----------|
| \`findOne()\` | Document or null | Get single item by ID/unique field |
| \`find()\` | Cursor | Multiple documents, pagination |

**Cursor methods:**
\`\`\`javascript
db.users.find()
  .sort({ createdAt: -1 })
  .skip(10)
  .limit(10)
  .project({ name: 1, email: 1 });
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'mongo-7',
    topic: 'MongoDB',
    question: 'What are aggregation pipelines and why are they useful?',
    answer: `Aggregation pipelines process documents through **stages** that transform data.

\`\`\`javascript
db.orders.aggregate([
  // Stage 1: Filter
  { $match: { status: "completed" } },
  
  // Stage 2: Group and calculate
  { $group: {
      _id: "$customerId",
      totalSpent: { $sum: "$amount" },
      orderCount: { $sum: 1 }
  }},
  
  // Stage 3: Sort
  { $sort: { totalSpent: -1 } },
  
  // Stage 4: Limit
  { $limit: 10 }
]);
\`\`\`

**Common stages:**
| Stage | Purpose |
|-------|---------|
| \`$match\` | Filter documents |
| \`$group\` | Group and aggregate |
| \`$project\` | Reshape documents |
| \`$sort\` | Order results |
| \`$lookup\` | Join collections |
| \`$unwind\` | Deconstruct arrays |

**Why use pipelines:** Complex analytics, reporting, data transformation - all in the database.`,
    difficulty: 'Medium'
  },
  {
    id: 'mongo-8',
    topic: 'MongoDB',
    question: 'How does sharding work in MongoDB?',
    answer: `Sharding distributes data across multiple servers (shards) based on a shard key. Each shard holds a subset of the data, allowing horizontal scaling and high availability. A config server stores metadata, and a mongos router directs queries.`,
    difficulty: 'Hard'
  },
  {
    id: 'mongo-9',
    topic: 'MongoDB',
    question: 'What is the purpose of replica sets in MongoDB?',
    answer: `Replica sets provide redundancy and high availability by maintaining multiple copies of data across different nodes. One node is primary (handles writes), others are secondary (replicate data). Automatic failover occurs if the primary fails.`,
    difficulty: 'Medium'
  },
  {
    id: 'mongo-10',
    topic: 'MongoDB',
    question: 'Explain the difference between updateOne() and updateMany().',
    answer: `updateOne() modifies the first document that matches the filter criteria. updateMany() applies the update to all matching documents. Both can use operators like $set, $inc, etc.`,
    difficulty: 'Easy'
  },
  {
    id: 'mongo-11',
    topic: 'MongoDB',
    question: 'What is a schema validation in MongoDB and how is it defined?',
    answer: `Schema validation enforces rules on document structure using JSON Schema. It can be set at the collection level with collMod or during collection creation, specifying required fields, data types, and value constraints.`,
    difficulty: 'Medium'
  },
  {
    id: 'mongo-12',
    topic: 'MongoDB',
    question: 'How do you perform a text search in MongoDB?',
    answer: `Create a text index on the fields to be searched, then use the $text query operator with $search to find documents containing the specified terms. Supports language-specific stemming and stop words.`,
    difficulty: 'Medium'
  },
  {
    id: 'mongo-13',
    topic: 'MongoDB',
    question: 'What is the difference between $lookup and $graphLookup in aggregation?',
    answer: `$lookup performs a left outer join with another collection based on equality of fields. $graphLookup recursively traverses a collection to retrieve related documents, useful for hierarchical data like graphs or trees.`,
    difficulty: 'Hard'
  },
  {
    id: 'mongo-14',
    topic: 'MongoDB',
    question: 'Explain the purpose of the $project stage in aggregation pipelines.',
    answer: `$project reshapes each document, including, excluding, or computing new fields. It can rename fields, create computed values, and control the output shape of the pipeline.`,
    difficulty: 'Easy'
  },
  {
    id: 'mongo-15',
    topic: 'MongoDB',
    question: 'How does the write concern affect write operations?',
    answer: `Write concern specifies the level of acknowledgment required from MongoDB for a write operation (e.g., w:1, w:majority). Higher concerns ensure data durability across replicas but may increase latency.`,
    difficulty: 'Medium'
  },
  {
    id: 'mongo-16',
    topic: 'MongoDB',
    question: 'What is the difference between a primary and secondary node in a replica set?',
    answer: `The primary node receives all write operations and replicates them to secondaries. Secondaries replicate data from the primary and can serve read operations if configured, but cannot accept writes directly.`,
    difficulty: 'Easy'
  },
  {
    id: 'mongo-17',
    topic: 'MongoDB',
    question: 'Explain the use of the $inc operator.',
    answer: `$inc increments a numeric field by a specified amount. If the field does not exist, it is created with the increment value.`,
    difficulty: 'Easy'
  },
  {
    id: 'mongo-18',
    topic: 'MongoDB',
    question: 'What are the benefits of using MongoDB Atlas?',
    answer: `MongoDB Atlas is a fully managed cloud service offering automated backups, scaling, monitoring, and security. It provides global clusters, serverless instances, and integrates with major cloud providers.`,
    difficulty: 'Medium'
  },
  {
    id: 'mongo-19',
    topic: 'MongoDB',
    question: 'How do you implement transactions in MongoDB?',
    answer: `Starting from version 4.0, MongoDB supports multi-document ACID transactions. Use session.startTransaction(), perform operations, then commitTransaction() or abortTransaction(). Transactions work across replica set members.`,
    difficulty: 'Hard'
  },
  {
    id: 'mongo-20',
    topic: 'MongoDB',
    question: 'What is a TTL index and when would you use it?',
    answer: `TTL (Time To Live) index automatically removes documents after a specified period. Useful for expiring data like sessions, caches, or logs. Defined with expireAfterSeconds on a date field.`,
    difficulty: 'Medium'
  },
  {
    id: 'mongo-21',
    topic: 'MongoDB',
    question: 'What is the difference between embedding and referencing in MongoDB?',
    answer: `**Embedding (denormalization):**
\`\`\`javascript
// Embedded document
{
  _id: 1,
  name: "John",
  address: {
    street: "123 Main St",
    city: "NYC"
  }
}
\`\`\`
- Better read performance
- Atomic updates
- Document size limit (16MB)

**Referencing (normalization):**
\`\`\`javascript
// User document
{ _id: 1, name: "John", addressId: ObjectId("...") }

// Address document
{ _id: ObjectId("..."), street: "123 Main St", city: "NYC" }
\`\`\`
- Avoids duplication
- No size limit
- Requires multiple queries

**When to embed:** One-to-one, one-to-few relationships, data read together
**When to reference:** One-to-many, many-to-many, large/growing data`,
    difficulty: 'Medium'
  },
  {
    id: 'mongo-22',
    topic: 'MongoDB',
    question: 'What are the common aggregation stages and their purposes?',
    answer: `**$match:** Filter documents
\`\`\`javascript
{ $match: { status: "active" } }
\`\`\`

**$group:** Group documents and compute aggregates
\`\`\`javascript
{ $group: { _id: "$category", total: { $sum: "$amount" } } }
\`\`\`

**$project:** Reshape documents
\`\`\`javascript
{ $project: { name: 1, total: { $multiply: ["$price", "$qty"] } } }
\`\`\`

**$sort:** Order documents
\`\`\`javascript
{ $sort: { createdAt: -1 } }
\`\`\`

**$limit / $skip:** Pagination
\`\`\`javascript
{ $skip: 10 }, { $limit: 5 }
\`\`\`

**$lookup:** Join collections
\`\`\`javascript
{ $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "user" } }
\`\`\`

**$unwind:** Flatten arrays`,
    difficulty: 'Medium'
  },
  {
    id: 'mongo-23',
    topic: 'MongoDB',
    question: 'What types of indexes does MongoDB support?',
    answer: `**1. Single Field Index:**
\`\`\`javascript
db.users.createIndex({ email: 1 })
\`\`\`

**2. Compound Index:**
\`\`\`javascript
db.orders.createIndex({ userId: 1, createdAt: -1 })
\`\`\`

**3. Multikey Index:** For array fields
\`\`\`javascript
db.products.createIndex({ tags: 1 })
\`\`\`

**4. Text Index:** Full-text search
\`\`\`javascript
db.articles.createIndex({ content: "text" })
\`\`\`

**5. Geospatial Index:**
\`\`\`javascript
db.places.createIndex({ location: "2dsphere" })
\`\`\`

**6. Hashed Index:** For sharding
\`\`\`javascript
db.users.createIndex({ _id: "hashed" })
\`\`\`

**7. TTL Index:** Auto-expire documents
\`\`\`javascript
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'mongo-24',
    topic: 'MongoDB',
    question: 'How do you use Mongoose with MongoDB?',
    answer: `**Setup:**
\`\`\`javascript
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb');
\`\`\`

**Define Schema:**
\`\`\`javascript
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  age: { type: Number, min: 0 },
  createdAt: { type: Date, default: Date.now }
});
\`\`\`

**Create Model:**
\`\`\`javascript
const User = mongoose.model('User', userSchema);
\`\`\`

**CRUD Operations:**
\`\`\`javascript
// Create
const user = await User.create({ name: 'John', email: 'john@example.com' });

// Read
const users = await User.find({ age: { $gte: 18 } });
const user = await User.findById(id);

// Update
await User.updateOne({ _id: id }, { $set: { name: 'Jane' } });

// Delete
await User.deleteOne({ _id: id });
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'mongo-25',
    topic: 'MongoDB',
    question: 'What is the explain() method used for?',
    answer: `explain() provides information about query execution, useful for query optimization.

\`\`\`javascript
db.users.find({ email: "john@example.com" }).explain("executionStats")
\`\`\`

**Key metrics:**
- **queryPlanner:** Shows the winning plan
- **executionStats:** Actual execution statistics
- **allPlansExecution:** All considered plans

**Important fields:**
\`\`\`javascript
{
  "queryPlanner": {
    "winningPlan": {
      "stage": "IXSCAN",  // Index scan (good)
      // vs "COLLSCAN" (collection scan - bad)
    }
  },
  "executionStats": {
    "totalDocsExamined": 1,    // Documents scanned
    "totalKeysExamined": 1,    // Index keys examined
    "executionTimeMillis": 0   // Time taken
  }
}
\`\`\`

**Goal:** totalDocsExamined ≈ documents returned`,
    difficulty: 'Medium'
  },
  {
    id: 'mongo-26',
    topic: 'MongoDB',
    question: 'What is the difference between $push and $addToSet?',
    answer: `**$push:** Adds element to array (allows duplicates)
\`\`\`javascript
db.users.updateOne(
  { _id: 1 },
  { $push: { tags: "mongodb" } }
)
// tags: ["nodejs", "mongodb", "mongodb"] ← duplicates allowed
\`\`\`

**$addToSet:** Adds element only if not exists (no duplicates)
\`\`\`javascript
db.users.updateOne(
  { _id: 1 },
  { $addToSet: { tags: "mongodb" } }
)
// tags: ["nodejs", "mongodb"] ← no duplicate
\`\`\`

**With modifiers:**
\`\`\`javascript
// $push with $each (multiple elements)
{ $push: { tags: { $each: ["a", "b", "c"] } } }

// $push with $position
{ $push: { tags: { $each: ["first"], $position: 0 } } }

// $addToSet with $each
{ $addToSet: { tags: { $each: ["a", "b"] } } }
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'mongo-27',
    topic: 'MongoDB',
    question: 'How do you implement pagination in MongoDB?',
    answer: `**Skip/Limit (simple but slow for large offsets):**
\`\`\`javascript
const page = 2;
const limit = 10;
const skip = (page - 1) * limit;

db.users.find()
  .sort({ createdAt: -1 })
  .skip(skip)
  .limit(limit)
\`\`\`

**Cursor-based pagination (efficient):**
\`\`\`javascript
// First page
const firstPage = await db.users
  .find()
  .sort({ _id: 1 })
  .limit(10);

// Next pages (using last _id as cursor)
const lastId = firstPage[firstPage.length - 1]._id;
const nextPage = await db.users
  .find({ _id: { $gt: lastId } })
  .sort({ _id: 1 })
  .limit(10);
\`\`\`

**Cursor-based is preferred for:**
- Large datasets
- Real-time data
- Infinite scroll`,
    difficulty: 'Medium'
  },
  {
    id: 'mongo-28',
    topic: 'MongoDB',
    question: 'What is the $facet aggregation stage?',
    answer: `$facet allows multiple aggregation pipelines within a single stage, processing the same input documents.

\`\`\`javascript
db.products.aggregate([
  {
    $facet: {
      // Pipeline 1: Category counts
      "categories": [
        { $group: { _id: "$category", count: { $sum: 1 } } }
      ],
      
      // Pipeline 2: Price ranges
      "priceRanges": [
        { $bucket: {
            groupBy: "$price",
            boundaries: [0, 50, 100, 200],
            default: "Expensive"
          }
        }
      ],
      
      // Pipeline 3: Top products
      "topProducts": [
        { $sort: { sales: -1 } },
        { $limit: 5 }
      ]
    }
  }
])
\`\`\`

**Use cases:**
- Dashboard data (multiple metrics in one query)
- Faceted search (filters + results)
- Reports with multiple sections`,
    difficulty: 'Hard'
  },
  {
    id: 'mongo-29',
    topic: 'MongoDB',
    question: 'What are MongoDB transactions and their limitations?',
    answer: `**Multi-document transactions (MongoDB 4.0+):**
\`\`\`javascript
const session = client.startSession();

try {
  session.startTransaction();
  
  await db.accounts.updateOne(
    { _id: fromAccount },
    { $inc: { balance: -amount } },
    { session }
  );
  
  await db.accounts.updateOne(
    { _id: toAccount },
    { $inc: { balance: amount } },
    { session }
  );
  
  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
  throw error;
} finally {
  session.endSession();
}
\`\`\`

**Limitations:**
- Require replica sets or sharded clusters
- Max 60 seconds (configurable)
- Performance overhead
- 16MB document size limit
- Not recommended for many documents

**Best practice:** Design to minimize need for transactions`,
    difficulty: 'Hard'
  },
  {
    id: 'mongo-30',
    topic: 'MongoDB',
    question: 'How do you perform geospatial queries in MongoDB?',
    answer: `**Store location data:**
\`\`\`javascript
{
  name: "Coffee Shop",
  location: {
    type: "Point",
    coordinates: [-73.9857, 40.7484] // [longitude, latitude]
  }
}
\`\`\`

**Create geospatial index:**
\`\`\`javascript
db.places.createIndex({ location: "2dsphere" })
\`\`\`

**Find nearby:**
\`\`\`javascript
db.places.find({
  location: {
    $near: {
      $geometry: { type: "Point", coordinates: [-73.99, 40.75] },
      $maxDistance: 1000 // meters
    }
  }
})
\`\`\`

**Find within polygon:**
\`\`\`javascript
db.places.find({
  location: {
    $geoWithin: {
      $geometry: {
        type: "Polygon",
        coordinates: [[...points...]]
      }
    }
  }
})
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'mongo-31',
    topic: 'MongoDB',
    question: 'What is the Change Streams feature?',
    answer: `Change Streams allow applications to subscribe to real-time data changes.

\`\`\`javascript
const changeStream = db.collection('orders').watch();

changeStream.on('change', (change) => {
  console.log('Change detected:', change);
  // {
  //   operationType: 'insert' | 'update' | 'delete',
  //   fullDocument: {...},
  //   documentKey: { _id: ... },
  //   updateDescription: {...}  // for updates
  // }
});

// With pipeline filter
const changeStream = db.collection('orders').watch([
  { $match: { 'fullDocument.status': 'completed' } }
]);
\`\`\`

**Use cases:**
- Real-time notifications
- Data synchronization
- Event-driven architectures
- Cache invalidation

**Requirements:**
- Replica set or sharded cluster
- Oplog enabled`,
    difficulty: 'Hard'
  },
  {
    id: 'mongo-32',
    topic: 'MongoDB',
    question: 'What are Mongoose virtuals and how are they used?',
    answer: `Virtuals are document properties that don't persist to MongoDB but are computed from existing fields.

\`\`\`javascript
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
});

// Create virtual
userSchema.virtual('fullName').get(function() {
  return \`\${this.firstName} \${this.lastName}\`;
});

// Setter
userSchema.virtual('fullName').set(function(name) {
  const [first, last] = name.split(' ');
  this.firstName = first;
  this.lastName = last;
});

// Include virtuals in JSON/Object
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

// Usage
const user = new User({ firstName: 'John', lastName: 'Doe' });
console.log(user.fullName); // 'John Doe'
\`\`\`

**Virtual populate:**
\`\`\`javascript
userSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'author'
});
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'mongo-33',
    topic: 'MongoDB',
    question: 'What is the difference between $set and $unset operators?',
    answer: `**$set:** Sets or updates field values
\`\`\`javascript
db.users.updateOne(
  { _id: 1 },
  { 
    $set: { 
      name: "John",
      "address.city": "NYC",  // Nested field
      updatedAt: new Date()
    } 
  }
)
\`\`\`

**$unset:** Removes fields from document
\`\`\`javascript
db.users.updateOne(
  { _id: 1 },
  { 
    $unset: { 
      middleName: "",      // Value doesn't matter
      "address.zip": ""    // Remove nested field
    } 
  }
)
\`\`\`

**$setOnInsert:** Sets field only on insert (with upsert)
\`\`\`javascript
db.users.updateOne(
  { email: "john@example.com" },
  { 
    $set: { lastLogin: new Date() },
    $setOnInsert: { createdAt: new Date() }
  },
  { upsert: true }
)
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'mongo-34',
    topic: 'MongoDB',
    question: 'How do you handle schema migrations in MongoDB?',
    answer: `**1. Application-level migration:**
\`\`\`javascript
// Check version and migrate on read
userSchema.pre('find', function() {
  this.setQuery({ ...this.getQuery() });
});

userSchema.post('find', function(docs) {
  docs.forEach(doc => {
    if (doc.schemaVersion < 2) {
      // Migrate old format
      doc.fullName = \`\${doc.firstName} \${doc.lastName}\`;
    }
  });
});
\`\`\`

**2. Batch migration script:**
\`\`\`javascript
// Migrate all documents
await db.users.updateMany(
  { schemaVersion: { $lt: 2 } },
  [
    {
      $set: {
        fullName: { $concat: ["$firstName", " ", "$lastName"] },
        schemaVersion: 2
      }
    }
  ]
);
\`\`\`

**3. Backward-compatible approach:**
- Keep old fields during transition
- Read from both, write to new
- Remove old fields after full migration

**Tools:** migrate-mongo, mongodb-migrations`,
    difficulty: 'Hard'
  },
  {
    id: 'mongo-35',
    topic: 'MongoDB',
    question: 'What is MongoDB Compass and what can you do with it?',
    answer: `MongoDB Compass is the official GUI for MongoDB.

**Features:**

**1. Visual Query Builder:**
- Build queries without writing code
- Drag-and-drop filters

**2. Document Management:**
- View, insert, update, delete documents
- Edit documents in-place

**3. Schema Analysis:**
- Visualize document structure
- Identify schema patterns

**4. Index Management:**
- View existing indexes
- Create/drop indexes
- See index usage statistics

**5. Aggregation Pipeline Builder:**
- Visual stage builder
- Preview results at each stage

**6. Performance:**
- Explain plans
- Real-time performance metrics

**7. Data Validation:**
- View/edit validation rules

**Alternatives:**
- MongoDB Atlas UI
- Studio 3T
- NoSQLBooster`,
    difficulty: 'Easy'
  },
  {
    id: 'mongo-36',
    topic: 'MongoDB',
    question: 'What are Mongoose hooks (middleware)?',
    answer: `Mongoose middleware are functions executed at specific stages of the document lifecycle.

**Pre hooks (before operation):**
\`\`\`javascript
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.pre('find', function() {
  this.where({ isActive: true }); // Auto-filter deleted
});
\`\`\`

**Post hooks (after operation):**
\`\`\`javascript
userSchema.post('save', function(doc) {
  console.log('User saved:', doc._id);
});

userSchema.post('remove', async function(doc) {
  await Post.deleteMany({ author: doc._id }); // Cleanup
});
\`\`\`

**Types:**
- Document middleware: save, validate, remove
- Query middleware: find, findOne, update
- Aggregate middleware: aggregate
- Model middleware: insertMany`,
    difficulty: 'Medium'
  },
  {
    id: 'mongo-37',
    topic: 'MongoDB',
    question: 'How do you implement full-text search in MongoDB?',
    answer: `**Create text index:**
\`\`\`javascript
db.articles.createIndex({ 
  title: "text", 
  content: "text",
  tags: "text"
});
\`\`\`

**Text search query:**
\`\`\`javascript
db.articles.find({
  $text: { $search: "mongodb database" }
})
\`\`\`

**Search operators:**
\`\`\`javascript
// Exact phrase
{ $text: { $search: '"NoSQL database"' } }

// Exclude term
{ $text: { $search: 'mongodb -mysql' } }

// With score
db.articles.find(
  { $text: { $search: "mongodb" } },
  { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } })
\`\`\`

**Weighted fields:**
\`\`\`javascript
db.articles.createIndex(
  { title: "text", content: "text" },
  { weights: { title: 10, content: 1 } }
)
\`\`\`

**Limitations:** No partial matching, better use Atlas Search for advanced needs`,
    difficulty: 'Medium'
  },
  {
    id: 'mongo-38',
    topic: 'MongoDB',
    question: 'What is the ObjectId and what information does it contain?',
    answer: `ObjectId is a 12-byte unique identifier used as the default _id.

**Structure (12 bytes):**
- 4 bytes: Unix timestamp (seconds since epoch)
- 5 bytes: Random value (machine + process)
- 3 bytes: Incrementing counter

\`\`\`javascript
const id = new ObjectId();

// Extract timestamp
id.getTimestamp(); // Date object

// Create from string
const id = new ObjectId("507f1f77bcf86cd799439011");

// Compare
id1.equals(id2);

// Create for specific time
const id = ObjectId.createFromTime(Date.now() / 1000);
\`\`\`

**Benefits:**
- Roughly sortable by creation time
- Unique across distributed systems
- No central coordinator needed

**Custom _id:**
\`\`\`javascript
{ _id: "user_123", name: "John" }  // String
{ _id: 12345, name: "Product" }    // Number
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'mongo-39',
    topic: 'MongoDB',
    question: 'How do you optimize MongoDB performance?',
    answer: `**1. Indexing:**
\`\`\`javascript
// Create indexes for frequent queries
db.orders.createIndex({ userId: 1, createdAt: -1 });

// Check unused indexes
db.collection.aggregate([{ $indexStats: {} }]);
\`\`\`

**2. Query optimization:**
\`\`\`javascript
// Use projection to limit fields
db.users.find({}, { name: 1, email: 1 });

// Use covered queries (all fields in index)
db.users.find({ email: "test@test.com" }, { email: 1, _id: 0 });
\`\`\`

**3. Schema design:**
- Embed frequently accessed data
- Avoid unbounded array growth
- Use appropriate data types

**4. Hardware/Config:**
- Enough RAM for working set
- SSD storage
- Connection pooling

**5. Aggregation:**
\`\`\`javascript
// $match early to reduce documents
[
  { $match: { status: "active" } },  // Filter first
  { $group: { ... } }
]
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'mongo-40',
    topic: 'MongoDB',
    question: 'What is the $expr operator?',
    answer: `$expr allows using aggregation expressions in query language, including comparing fields in the same document.

**Compare fields:**
\`\`\`javascript
// Find where qty > reorderLevel
db.products.find({
  $expr: { $gt: ["$qty", "$reorderLevel"] }
})
\`\`\`

**With aggregation operators:**
\`\`\`javascript
// Find orders placed on user's birthday
db.orders.find({
  $expr: {
    $eq: [
      { $dayOfYear: "$orderDate" },
      { $dayOfYear: "$user.birthday" }
    ]
  }
})
\`\`\`

**In $match stage:**
\`\`\`javascript
db.orders.aggregate([
  {
    $match: {
      $expr: {
        $gt: [
          { $multiply: ["$qty", "$price"] },
          100
        ]
      }
    }
  }
])
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'mongo-41',
    topic: 'MongoDB',
    question: 'How do you handle array operations in MongoDB?',
    answer: `**Array query operators:**
\`\`\`javascript
// Match any element
{ tags: "mongodb" }

// Match all elements
{ tags: { $all: ["mongodb", "nodejs"] } }

// Match array size
{ tags: { $size: 3 } }

// Match element at position
{ "tags.0": "primary" }

// Match with $elemMatch
{ items: { $elemMatch: { qty: { $gt: 5 }, price: { $lt: 100 } } } }
\`\`\`

**Array update operators:**
\`\`\`javascript
// Add element
{ $push: { tags: "new" } }

// Add unique element
{ $addToSet: { tags: "unique" } }

// Remove element
{ $pull: { tags: "old" } }

// Remove by index
{ $unset: { "tags.1": 1 } }

// Update specific element
{ $set: { "items.$[elem].qty": 10 } },
{ arrayFilters: [{ "elem.productId": 123 }] }
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'mongo-42',
    topic: 'MongoDB',
    question: 'What is MongoDB Atlas and its key features?',
    answer: `MongoDB Atlas is a fully managed cloud database service.

**Key features:**

**1. Global Clusters:**
- Multi-region deployment
- Data sovereignty controls

**2. Serverless Instances:**
- Pay per operation
- Auto-scaling

**3. Atlas Search:**
- Full-text search with Lucene
- Autocomplete, fuzzy matching

**4. Charts:**
- Built-in data visualization
- Dashboards

**5. Data API:**
- REST API for CRUD operations
- No driver needed

**6. Security:**
- Encryption at rest/transit
- VPC peering
- IP whitelisting

**7. Performance:**
- Performance Advisor
- Query Profiler
- Index suggestions

**8. Backup:**
- Continuous backups
- Point-in-time recovery

**Pricing tiers:**
- M0: Free tier (512MB)
- Shared: M2, M5
- Dedicated: M10+`,
    difficulty: 'Easy'
  },
  {
    id: 'mongo-43',
    topic: 'MongoDB',
    question: 'What is the difference between findOneAndUpdate and updateOne?',
    answer: `**updateOne:**
- Updates document
- Returns: { acknowledged, modifiedCount, matchedCount }
- Doesn't return the document

\`\`\`javascript
const result = await db.users.updateOne(
  { _id: id },
  { $set: { name: "John" } }
);
// result: { acknowledged: true, modifiedCount: 1, matchedCount: 1 }
\`\`\`

**findOneAndUpdate:**
- Updates document AND returns it
- Can return before or after update
- Atomic operation

\`\`\`javascript
const doc = await db.users.findOneAndUpdate(
  { _id: id },
  { $set: { name: "John" } },
  { returnDocument: 'after' }  // or 'before'
);
// doc: { _id: ..., name: "John", ... }
\`\`\`

**Use findOneAndUpdate when:**
- You need the document after updating
- Implementing atomic counters
- Need to return updated data to client`,
    difficulty: 'Easy'
  },
  {
    id: 'mongo-44',
    topic: 'MongoDB',
    question: 'What is the Bucket pattern in MongoDB?',
    answer: `The Bucket pattern groups related data into array "buckets" to reduce document count and improve performance.

**Without buckets:**
\`\`\`javascript
// One document per reading (millions of documents)
{ sensorId: 1, timestamp: Date, value: 23.5 }
{ sensorId: 1, timestamp: Date, value: 24.1 }
\`\`\`

**With buckets:**
\`\`\`javascript
{
  sensorId: 1,
  start: ISODate("2024-01-01"),
  end: ISODate("2024-01-01T01:00:00"),
  count: 60,
  readings: [
    { timestamp: Date, value: 23.5 },
    { timestamp: Date, value: 24.1 },
    // ... up to 60 readings per hour
  ],
  stats: {
    min: 22.1,
    max: 25.4,
    avg: 23.8
  }
}
\`\`\`

**Benefits:**
- Fewer documents = faster queries
- Pre-computed aggregates
- Better index efficiency
- Natural partitioning (time-based)

**Use cases:** Time-series data, IoT, analytics`,
    difficulty: 'Hard'
  },
  {
    id: 'mongo-45',
    topic: 'MongoDB',
    question: 'What is the $merge aggregation stage?',
    answer: `$merge writes aggregation output to a collection, useful for ETL and materialized views.

\`\`\`javascript
db.orders.aggregate([
  { $group: {
      _id: "$status",
      count: { $sum: 1 },
      total: { $sum: "$amount" }
    }
  },
  { $merge: {
      into: "orderStats",
      on: "_id",
      whenMatched: "merge",      // merge | replace | keepExisting | fail | pipeline
      whenNotMatched: "insert"   // insert | discard | fail
    }
  }
])
\`\`\`

**Use cases:**
- Materialized views (pre-aggregated data)
- ETL pipelines
- Report generation
- Data archival

**Comparison:**
- $out: Replaces entire collection
- $merge: Can update/insert individual documents`,
    difficulty: 'Hard'
  },
  {
    id: 'mongo-46',
    topic: 'MongoDB',
    question: 'How do you use Mongoose populate?',
    answer: `Populate replaces specified paths with documents from other collections.

**Schema:**
\`\`\`javascript
const postSchema = new Schema({
  title: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' }
});

const userSchema = new Schema({
  name: String
});
\`\`\`

**Basic populate:**
\`\`\`javascript
const post = await Post.findById(id).populate('author');
// post.author is now full User document, not just ObjectId
\`\`\`

**Select specific fields:**
\`\`\`javascript
Post.findById(id).populate('author', 'name email');
\`\`\`

**Multiple populations:**
\`\`\`javascript
Post.findById(id)
  .populate('author')
  .populate('comments');
\`\`\`

**Nested populate:**
\`\`\`javascript
Post.findById(id).populate({
  path: 'comments',
  populate: { path: 'author', select: 'name' }
});
\`\`\`

**Note:** Populate executes additional queries. For performance-critical code, consider embedding or using $lookup.`,
    difficulty: 'Medium'
  },
  {
    id: 'mongo-47',
    topic: 'MongoDB',
    question: 'What is the difference between $or and $in operators?',
    answer: `**$in:** Match any value in an array for a SINGLE field
\`\`\`javascript
// Find users with status 'active' OR 'pending'
db.users.find({ status: { $in: ['active', 'pending'] } })
\`\`\`

**$or:** Match any of MULTIPLE conditions
\`\`\`javascript
// Find users who are admin OR have verified email
db.users.find({
  $or: [
    { role: 'admin' },
    { emailVerified: true }
  ]
})
\`\`\`

**When to use each:**
\`\`\`javascript
// Use $in for same field, multiple values
{ category: { $in: ['A', 'B', 'C'] } }

// Use $or for different fields or complex conditions
{ $or: [
  { age: { $lt: 18 } },
  { hasParentalConsent: true }
]}
\`\`\`

**Performance:**
- $in can use a single index
- $or may require separate index scans
- Prefer $in when possible`,
    difficulty: 'Easy'
  },
  {
    id: 'mongo-48',
    topic: 'MongoDB',
    question: 'How do you implement data validation in MongoDB?',
    answer: `**JSON Schema validation:**
\`\`\`javascript
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email"],
      properties: {
        name: {
          bsonType: "string",
          minLength: 2,
          maxLength: 100
        },
        email: {
          bsonType: "string",
          pattern: "^[\\\\w-\\\\.]+@([\\\\w-]+\\\\.)+[\\\\w-]{2,4}$"
        },
        age: {
          bsonType: "int",
          minimum: 0,
          maximum: 150
        },
        status: {
          enum: ["active", "pending", "inactive"]
        }
      }
    }
  },
  validationLevel: "moderate",   // strict | moderate
  validationAction: "error"      // error | warn
})
\`\`\`

**Mongoose validation:**
\`\`\`javascript
const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator: (v) => /^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/.test(v),
      message: props => \`\${props.value} is not a valid email\`
    }
  }
});
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'mongo-49',
    topic: 'MongoDB',
    question: 'What is read preference in MongoDB?',
    answer: `Read preference determines which replica set member to read from.

**Options:**
\`\`\`javascript
// Primary (default) - read from primary only
db.collection.find().readPref('primary')

// Primary Preferred - primary if available, else secondary
db.collection.find().readPref('primaryPreferred')

// Secondary - read from secondary only
db.collection.find().readPref('secondary')

// Secondary Preferred - secondary if available, else primary
db.collection.find().readPref('secondaryPreferred')

// Nearest - lowest network latency
db.collection.find().readPref('nearest')
\`\`\`

**With tags:**
\`\`\`javascript
db.collection.find().readPref('secondary', [
  { region: 'us-east' },
  { region: 'us-west' }
])
\`\`\`

**Considerations:**
- secondaryPreferred: May read stale data
- Use secondary for analytics/reports
- Use primary for consistency-critical reads`,
    difficulty: 'Medium'
  },
  {
    id: 'mongo-50',
    topic: 'MongoDB',
    question: 'What is the $graphLookup aggregation stage?',
    answer: `$graphLookup recursively traverses collections for hierarchical/graph data.

**Org chart example:**
\`\`\`javascript
// employees collection
{ _id: 1, name: "CEO", managerId: null }
{ _id: 2, name: "CTO", managerId: 1 }
{ _id: 3, name: "Dev", managerId: 2 }
{ _id: 4, name: "Jr Dev", managerId: 3 }

// Find all reports (direct and indirect) under CTO
db.employees.aggregate([
  { $match: { name: "CTO" } },
  {
    $graphLookup: {
      from: "employees",
      startWith: "$_id",           // Start with CTO's _id
      connectFromField: "_id",      // Match this field
      connectToField: "managerId",  // To this field
      as: "reports",                // Output array
      maxDepth: 10,                 // Max recursion depth
      depthField: "level"           // Track recursion level
    }
  }
])
// Returns CTO with all Dev and Jr Dev in "reports" array
\`\`\`

**Use cases:**
- Organization hierarchies
- Social networks (friends of friends)
- Category trees
- Bill of materials`,
    difficulty: 'Hard'
  }
];
