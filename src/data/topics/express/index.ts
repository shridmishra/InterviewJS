import { TopicQuestion } from '../types';

export const expressQuestions: TopicQuestion[] = [
  {
    id: 'express-1',
    topic: 'Express',
    question: 'What is Express.js and why would you use it?',
    answer: `Express is a **minimal, flexible web framework** for Node.js.

**Why use Express:**
- Fast and lightweight
- Huge middleware ecosystem
- Simple routing
- Unopinionated (your structure)

\`\`\`javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello!'));

app.listen(3000);
\`\`\`

**Express is best for:**
| Use Case | Alternative |
|----------|-------------|
| REST APIs | Fastify, Koa |
| Web apps | Next.js, Nest.js |
| Microservices | Fastify |`,
    difficulty: 'Easy'
  },
  {
    id: 'express-2',
    topic: 'Express',
    question: 'How do you define a route that handles GET requests in Express?',
    answer: `\`\`\`javascript
// Basic GET route
app.get('/users', (req, res) => {
  res.json([{ id: 1, name: 'John' }]);
});

// Route parameters
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ id });
});

// Query parameters
// GET /search?q=hello
app.get('/search', (req, res) => {
  const { q } = req.query;
  res.json({ query: q });
});
\`\`\`

**HTTP methods:**
| Method | Express | Purpose |
|--------|---------|---------|
| GET | \`app.get()\` | Retrieve data |
| POST | \`app.post()\` | Create data |
| PUT | \`app.put()\` | Update data |
| DELETE | \`app.delete()\` | Remove data |`,
    difficulty: 'Easy'
  },
  {
    id: 'express-3',
    topic: 'Express',
    question: 'Explain middleware in Express and the order of execution.',
    answer: `Middleware are functions that run **in sequence** between request and response.

\`\`\`
Request → MW1 → MW2 → MW3 → Route Handler → Response
\`\`\`

\`\`\`javascript
// Middleware 1 - Logging
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next(); // Pass to next middleware
});

// Middleware 2 - Auth
app.use((req, res, next) => {
  if (!req.headers.token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});

// Route handler (final)
app.get('/api/data', (req, res) => {
  res.json({ data: 'secret' });
});
\`\`\`

**Key rules:**
- Middleware runs in **order defined**
- Must call \`next()\` or send response
- Forgetting \`next()\` = request hangs`,
    difficulty: 'Medium'
  },
  {
    id: 'express-4',
    topic: 'Express',
    question: 'How do you serve static files in an Express app?',
    answer: `Use \`express.static()\` built-in middleware:

\`\`\`javascript
// Serve files from 'public' folder
app.use(express.static('public'));

// Files accessible at:
// public/style.css  → /style.css
// public/app.js     → /app.js
\`\`\`

**With path prefix:**
\`\`\`javascript
app.use('/static', express.static('public'));
// public/style.css → /static/style.css
\`\`\`

**Multiple directories:**
\`\`\`javascript
app.use(express.static('public'));
app.use(express.static('uploads'));
\`\`\`

**Best practice for production:**
\`\`\`javascript
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'express-5',
    topic: 'Express',
    question: 'What is the purpose of body‑parser middleware?',
    answer: `Body-parser parses incoming request bodies and exposes them on \`req.body\`.

**Built into Express 4.16+:**
\`\`\`javascript
// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies (forms)
app.use(express.urlencoded({ extended: true }));
\`\`\`

**Using parsed data:**
\`\`\`javascript
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  // Create user...
  res.json({ name, email });
});
\`\`\`

**Content types:**
| Middleware | Content-Type |
|------------|--------------|
| \`express.json()\` | application/json |
| \`express.urlencoded()\` | application/x-www-form-urlencoded |
| \`express.raw()\` | application/octet-stream |
| \`express.text()\` | text/plain |`,
    difficulty: 'Easy'
  },
  {
    id: 'express-6',
    topic: 'Express',
    question: 'How can you handle errors globally in Express?',
    answer: `Define an **error-handling middleware** with 4 parameters:

\`\`\`javascript
// Must be defined AFTER all routes
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Something went wrong'
  });
});
\`\`\`

**Throwing errors:**
\`\`\`javascript
app.get('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }
    res.json(user);
  } catch (err) {
    next(err); // Pass to error handler
  }
});
\`\`\`

**Key points:**
- Error middleware has 4 params: \`(err, req, res, next)\`
- Place after all routes
- Call \`next(err)\` to pass errors`,
    difficulty: 'Medium'
  },
  {
    id: 'express-7',
    topic: 'Express',
    question: 'Explain the difference between app.use and app.all.',
    answer: `Both can match multiple HTTP methods, but have key differences:

| Feature | \`app.use()\` | \`app.all()\` |
|---------|------------|------------|
| **Path matching** | Prefix match | Exact match |
| **Purpose** | Middleware | Route handler |
| **Typical use** | Setup, plugins | Catch-all routes |

\`\`\`javascript
// app.use - matches /api AND /api/users AND /api/users/123
app.use('/api', (req, res, next) => {
  console.log('API request');
  next();
});

// app.all - matches ONLY /api (all HTTP methods)
app.all('/api', (req, res) => {
  res.json({ method: req.method });
});
\`\`\`

**When to use:**
- \`app.use()\`: Middleware, auth, logging
- \`app.all()\`: Handle all methods for specific path`,
    difficulty: 'Medium'
  },
  {
    id: 'express-8',
    topic: 'Express',
    question: 'How do you enable CORS in an Express application?',
    answer: `Install the cors package and use app.use(cors()) or manually set Access-Control-Allow-Origin headers in middleware.`,
    difficulty: 'Easy'
  },
  {
    id: 'express-9',
    topic: 'Express',
    question: 'What is the purpose of the next() function in middleware?',
    answer: `Calling next() passes control to the next middleware in the stack. Omitting it stops the request‑response cycle, which can be intentional for terminating responses.`,
    difficulty: 'Easy'
  },
  {
    id: 'express-10',
    topic: 'Express',
    question: 'How can you set up route parameters in Express?',
    answer: `Define a route with a colon prefix, e.g., app.get('/users/:id', (req, res) => { const id = req.params.id; });`,
    difficulty: 'Easy'
  },
  {
    id: 'express-11',
    topic: 'Express',
    question: 'Explain how to use async/await with Express route handlers.',
    answer: `Make the handler async: app.get('/data', async (req, res, next) => { try { const result = await dbCall(); res.json(result); } catch (err) { next(err); } });`,
    difficulty: 'Medium'
  },
  {
    id: 'express-12',
    topic: 'Express',
    question: 'What is the purpose of the express.Router class?',
    answer: `Router creates modular, mountable route handlers. You can define routes on a router instance and then attach it to the main app with app.use('/prefix', router).`,
    difficulty: 'Medium'
  },
  {
    id: 'express-13',
    topic: 'Express',
    question: 'How do you protect routes with authentication middleware?',
    answer: `Create middleware that verifies a token or session, then call next() if valid or respond with 401/403. Apply it to protected routes via app.use or per‑route.`,
    difficulty: 'Medium'
  },
  {
    id: 'express-14',
    topic: 'Express',
    question: 'Explain the difference between res.send, res.json, and res.end.',
    answer: `res.send can send strings, buffers, or objects (auto‑converts to JSON). res.json explicitly sends JSON with correct headers. res.end ends the response without data, used for low‑level control.`,
    difficulty: 'Easy'
  },
  {
    id: 'express-15',
    topic: 'Express',
    question: 'How can you limit request payload size in Express?',
    answer: `Configure body‑parser limits: app.use(express.json({ limit: '1mb' })); or use the limit option in urlencoded parser.`,
    difficulty: 'Easy'
  },
  {
    id: 'express-16',
    topic: 'Express',
    question: 'What is the role of the helmet middleware?',
    answer: `Helmet sets various HTTP headers to secure Express apps (e.g., Content‑Security‑Policy, X‑Frame‑Options), helping protect against common web vulnerabilities.`,
    difficulty: 'Medium'
  },
  {
    id: 'express-17',
    topic: 'Express',
    question: 'How do you handle file uploads in Express?',
    answer: `Use middleware like multer to parse multipart/form‑data, configure storage destination, and access uploaded files via req.file or req.files.`,
    difficulty: 'Medium'
  },
  {
    id: 'express-18',
    topic: 'Express',
    question: 'Explain how to set up a simple rate limiter.',
    answer: `Use a package like express-rate-limit: app.use(rateLimit({ windowMs: 15*60*1000, max: 100 })); which limits each IP to 100 requests per 15 minutes.`,
    difficulty: 'Medium'
  },
  {
    id: 'express-19',
    topic: 'Express',
    question: 'What is the purpose of the trust proxy setting?',
    answer: `app.set('trust proxy', true) tells Express that it is behind a reverse proxy, allowing it to correctly read X‑Forwarded‑For headers for client IPs and secure cookies.`,
    difficulty: 'Easy'
  },
  {
    id: 'express-20',
    topic: 'Express',
    question: 'How do you gracefully shut down an Express server?',
    answer: `Listen for termination signals, then call server.close(callback) to stop accepting new connections and wait for existing ones to finish before exiting.`,
    difficulty: 'Medium'
  },
  {
    id: 'express-21',
    topic: 'Express',
    question: 'What is the difference between app.get() and router.get()?',
    answer: `**app.get():** Registers a route directly on the main Express application.
\`\`\`javascript
const app = express();
app.get('/users', handler);
\`\`\`

**router.get():** Registers a route on a modular Router instance.
\`\`\`javascript
const router = express.Router();
router.get('/', handler); // '/users' when mounted

// Mount router
app.use('/users', router);
\`\`\`

**Benefits of Router:**
- Modular route organization
- Group related routes
- Apply middleware to route groups
- Reusable across applications`,
    difficulty: 'Easy'
  },
  {
    id: 'express-22',
    topic: 'Express',
    question: 'How do you implement request validation in Express?',
    answer: `**Using Joi:**
\`\`\`javascript
const Joi = require('joi');

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  age: Joi.number().min(18).max(120)
});

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

app.post('/users', validate(schema), createUser);
\`\`\`

**Using express-validator:**
\`\`\`javascript
const { body, validationResult } = require('express-validator');

app.post('/users', 
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  }
);
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'express-23',
    topic: 'Express',
    question: 'How do you implement JWT authentication in Express?',
    answer: `\`\`\`javascript
const jwt = require('jsonwebtoken');

// Generate token
app.post('/login', async (req, res) => {
  const user = await verifyCredentials(req.body);
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  res.json({ token });
});

// Auth middleware
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  const token = authHeader.substring(7);
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Protected route
app.get('/profile', authMiddleware, (req, res) => {
  res.json({ userId: req.user.userId });
});
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'express-24',
    topic: 'Express',
    question: 'How do you implement role-based access control (RBAC)?',
    answer: `\`\`\`javascript
// Role middleware
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    next();
  };
};

// Usage
app.get('/admin/users', 
  authMiddleware, 
  requireRole('admin'), 
  getUsers
);

app.delete('/posts/:id',
  authMiddleware,
  requireRole('admin', 'moderator'),
  deletePost
);

// Permission-based approach
const hasPermission = (permission) => (req, res, next) => {
  if (!req.user.permissions.includes(permission)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'express-25',
    topic: 'Express',
    question: 'What is the difference between res.send() and res.json()?',
    answer: `**res.send():**
- Sends the response body
- Auto-sets Content-Type based on argument type
- Converts objects/arrays to JSON

\`\`\`javascript
res.send('Hello');           // 'text/html'
res.send({ data: 'value' }); // 'application/json'
res.send(Buffer.from('hi')); // 'application/octet-stream'
\`\`\`

**res.json():**
- Explicitly sends JSON response
- Always sets Content-Type to 'application/json'
- Converts using JSON.stringify()

\`\`\`javascript
res.json({ data: 'value' });
res.json(null);  // Valid JSON
res.json([1, 2, 3]);
\`\`\`

**Recommendation:** Use res.json() for APIs to be explicit about response type.`,
    difficulty: 'Easy'
  },
  {
    id: 'express-26',
    topic: 'Express',
    question: 'How do you implement logging in Express?',
    answer: `**Using Morgan (HTTP request logger):**
\`\`\`javascript
const morgan = require('morgan');

// Predefined formats
app.use(morgan('dev'));      // Dev format with colors
app.use(morgan('combined')); // Apache combined format

// Custom format
app.use(morgan(':method :url :status :response-time ms'));

// Log to file
const fs = require('fs');
const accessLog = fs.createWriteStream('./access.log', { flags: 'a' });
app.use(morgan('combined', { stream: accessLog }));
\`\`\`

**Custom logging middleware:**
\`\`\`javascript
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    console.log(\`\${req.method} \${req.url} \${res.statusCode} \${Date.now() - start}ms\`);
  });
  next();
});
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'express-27',
    topic: 'Express',
    question: 'How do you handle async errors in Express?',
    answer: `**Problem:** Async errors don't automatically reach error middleware.

**Solution 1 - Try/catch wrapper:**
\`\`\`javascript
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/users', asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
}));
\`\`\`

**Solution 2 - express-async-errors:**
\`\`\`javascript
require('express-async-errors');

app.get('/users', async (req, res) => {
  const users = await User.find(); // Errors auto-forwarded
  res.json(users);
});
\`\`\`

**Error middleware:**
\`\`\`javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'express-28',
    topic: 'Express',
    question: 'What are the best practices for Express project structure?',
    answer: `**Recommended structure:**
\`\`\`
src/
├── app.js          # Express app setup
├── server.js       # Server startup
├── config/         # Configuration
│   └── index.js
├── routes/         # Route definitions
│   ├── index.js
│   └── users.js
├── controllers/    # Request handlers
│   └── userController.js
├── services/       # Business logic
│   └── userService.js
├── models/         # Database models
│   └── User.js
├── middleware/     # Custom middleware
│   ├── auth.js
│   └── validate.js
├── utils/          # Utility functions
└── tests/          # Test files
\`\`\`

**Key practices:**
- Separate app and server
- Use environment variables
- Group by feature or layer
- Keep controllers thin
- Services contain business logic`,
    difficulty: 'Medium'
  },
  {
    id: 'express-29',
    topic: 'Express',
    question: 'How do you implement pagination in Express?',
    answer: `\`\`\`javascript
app.get('/users', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find().skip(skip).limit(limit),
    User.countDocuments()
  ]);

  res.json({
    data: users,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1
    }
  });
});
\`\`\`

**Cursor-based pagination (better for large datasets):**
\`\`\`javascript
app.get('/users', async (req, res) => {
  const { cursor, limit = 10 } = req.query;
  
  const query = cursor ? { _id: { $gt: cursor } } : {};
  const users = await User.find(query).limit(limit + 1);
  
  const hasNext = users.length > limit;
  const data = hasNext ? users.slice(0, -1) : users;

  res.json({
    data,
    nextCursor: hasNext ? data[data.length - 1]._id : null
  });
});
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'express-30',
    topic: 'Express',
    question: 'How do you implement session management in Express?',
    answer: `\`\`\`javascript
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const { createClient } = require('redis');

// Create Redis client
const redisClient = createClient({ url: process.env.REDIS_URL });
redisClient.connect();

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Usage
app.post('/login', (req, res) => {
  req.session.userId = user.id;
  res.json({ success: true });
});

app.get('/profile', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  res.json({ userId: req.session.userId });
});

app.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'express-31',
    topic: 'Express',
    question: 'How do you test Express applications?',
    answer: `**Using Supertest with Jest:**
\`\`\`javascript
const request = require('supertest');
const app = require('../app');

describe('User API', () => {
  test('GET /users returns 200', async () => {
    const response = await request(app)
      .get('/users')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
  });

  test('POST /users creates user', async () => {
    const response = await request(app)
      .post('/users')
      .send({ name: 'John', email: 'john@example.com' })
      .expect(201);

    expect(response.body.name).toBe('John');
  });

  test('GET /users/:id with invalid id returns 404', async () => {
    await request(app)
      .get('/users/invalid-id')
      .expect(404);
  });
});
\`\`\`

**Run tests:**
\`\`\`bash
npm test
npm test -- --coverage
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'express-32',
    topic: 'Express',
    question: 'What is app.locals and res.locals?',
    answer: `**app.locals:** Application-level variables, available for the entire app lifecycle.
\`\`\`javascript
app.locals.title = 'My App';
app.locals.email = 'contact@myapp.com';
app.locals.formatDate = (date) => date.toLocaleDateString();

// Accessible in any route
app.get('/', (req, res) => {
  console.log(app.locals.title);
});
\`\`\`

**res.locals:** Request-level variables, available only for that request/response cycle.
\`\`\`javascript
// Middleware sets user data
app.use((req, res, next) => {
  res.locals.user = req.session?.user;
  res.locals.isAuthenticated = !!req.session?.user;
  next();
});

// Available in templates
app.get('/', (req, res) => {
  res.render('home'); // res.locals.user available in template
});
\`\`\`

**Use cases:**
- app.locals: App config, helper functions
- res.locals: User-specific data, request context`,
    difficulty: 'Easy'
  },
  {
    id: 'express-33',
    topic: 'Express',
    question: 'How do you implement WebSocket with Express?',
    answer: `**Using Socket.IO:**
\`\`\`javascript
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('message', (data) => {
    io.emit('message', data); // Broadcast to all
  });

  socket.on('join-room', (room) => {
    socket.join(room);
    socket.to(room).emit('user-joined', socket.id);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Express routes still work
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

httpServer.listen(3000);
\`\`\`

**Client:**
\`\`\`javascript
const socket = io('http://localhost:3000');
socket.emit('message', { text: 'Hello' });
socket.on('message', (data) => console.log(data));
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'express-34',
    topic: 'Express',
    question: 'How do you implement caching in Express?',
    answer: `**In-memory caching with node-cache:**
\`\`\`javascript
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60 });

const cacheMiddleware = (duration) => (req, res, next) => {
  const key = req.originalUrl;
  const cached = cache.get(key);
  
  if (cached) {
    return res.json(cached);
  }
  
  res.originalJson = res.json;
  res.json = (data) => {
    cache.set(key, data, duration);
    res.originalJson(data);
  };
  next();
};

app.get('/users', cacheMiddleware(60), async (req, res) => {
  const users = await User.find();
  res.json(users);
});
\`\`\`

**HTTP caching headers:**
\`\`\`javascript
app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=3600');
  next();
});
\`\`\`

**Redis caching:** Better for distributed systems.`,
    difficulty: 'Medium'
  },
  {
    id: 'express-35',
    topic: 'Express',
    question: 'What are query params, route params, and body params?',
    answer: `**Route params (req.params):**
\`\`\`javascript
// URL: /users/123
app.get('/users/:id', (req, res) => {
  console.log(req.params.id); // '123'
});

// Multiple params
app.get('/users/:userId/posts/:postId', (req, res) => {
  console.log(req.params.userId, req.params.postId);
});
\`\`\`

**Query params (req.query):**
\`\`\`javascript
// URL: /users?page=1&limit=10&sort=name
app.get('/users', (req, res) => {
  console.log(req.query.page);  // '1'
  console.log(req.query.limit); // '10'
  console.log(req.query.sort);  // 'name'
});
\`\`\`

**Body params (req.body):**
\`\`\`javascript
app.use(express.json());

app.post('/users', (req, res) => {
  console.log(req.body.name);
  console.log(req.body.email);
});
\`\`\`

**Use cases:**
- Route params: Resource identification (/users/:id)
- Query params: Filtering, pagination, sorting
- Body params: Create/update data`,
    difficulty: 'Easy'
  },
  {
    id: 'express-36',
    topic: 'Express',
    question: 'How do you implement API versioning in Express?',
    answer: `**1. URL Path versioning:**
\`\`\`javascript
const v1Router = require('./routes/v1');
const v2Router = require('./routes/v2');

app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);
\`\`\`

**2. Header versioning:**
\`\`\`javascript
app.use('/api', (req, res, next) => {
  const version = req.headers['api-version'] || '1';
  req.apiVersion = version;
  next();
});

app.get('/api/users', (req, res) => {
  if (req.apiVersion === '1') {
    return res.json(formatV1(users));
  }
  res.json(formatV2(users));
});
\`\`\`

**3. Query parameter versioning:**
\`\`\`javascript
app.get('/api/users', (req, res) => {
  const version = req.query.v || '1';
  // Handle version
});
\`\`\`

**Recommendation:** URL path versioning is most common and clear.`,
    difficulty: 'Medium'
  },
  {
    id: 'express-37',
    topic: 'Express',
    question: 'How do you implement content negotiation?',
    answer: `Content negotiation returns different response formats based on Accept header.

\`\`\`javascript
app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);

  res.format({
    'application/json': () => {
      res.json(user);
    },
    'text/html': () => {
      res.render('user', { user });
    },
    'text/plain': () => {
      res.send(\`Name: \${user.name}, Email: \${user.email}\`);
    },
    default: () => {
      res.status(406).send('Not Acceptable');
    }
  });
});
\`\`\`

**Using req.accepts():**
\`\`\`javascript
app.get('/users', (req, res) => {
  if (req.accepts('json')) {
    return res.json(users);
  }
  if (req.accepts('xml')) {
    return res.type('xml').send(toXML(users));
  }
  res.status(406).send('Not Acceptable');
});
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'express-38',
    topic: 'Express',
    question: 'What is the difference between app.use() and app.all()?',
    answer: `**app.use():**
- Matches ALL HTTP methods
- Path matching is "begins with" (prefix match)
- Mainly for middleware

\`\`\`javascript
app.use('/api', middleware);
// Matches: /api, /api/users, /api/users/123

app.use(corsMiddleware);  // All routes
\`\`\`

**app.all():**
- Matches ALL HTTP methods
- Path matching is exact (like get/post)
- Used for route handlers

\`\`\`javascript
app.all('/api/users', (req, res, next) => {
  console.log('Accessing /api/users');
  next();
});
// Only matches exactly /api/users, NOT /api/users/123
\`\`\`

**Summary:**
| Feature | app.use() | app.all() |
|---------|-----------|-----------|
| Path match | Prefix | Exact |
| Primary use | Middleware | Pre-route handlers |
| Methods | All | All |`,
    difficulty: 'Medium'
  },
  {
    id: 'express-39',
    topic: 'Express',
    question: 'How do you compress responses in Express?',
    answer: `**Using compression middleware:**
\`\`\`javascript
const compression = require('compression');

// Basic usage - compress all responses
app.use(compression());

// With options
app.use(compression({
  level: 6,              // Compression level (1-9)
  threshold: 1024,        // Only compress if > 1KB
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));
\`\`\`

**Manual compression:**
\`\`\`javascript
const zlib = require('zlib');

app.get('/data', (req, res) => {
  const data = JSON.stringify(largeData);
  
  if (req.acceptsEncodings('gzip')) {
    res.setHeader('Content-Encoding', 'gzip');
    res.send(zlib.gzipSync(data));
  } else {
    res.json(data);
  }
});
\`\`\`

**Note:** Don't compress already compressed formats (images, videos).`,
    difficulty: 'Easy'
  },
  {
    id: 'express-40',
    topic: 'Express',
    question: 'How do you implement graceful shutdown in Express?',
    answer: `\`\`\`javascript
const express = require('express');
const app = express();

const server = app.listen(3000, () => {
  console.log('Server started');
});

// Active connections tracking
let connections = [];
server.on('connection', (conn) => {
  connections.push(conn);
  conn.on('close', () => {
    connections = connections.filter(c => c !== conn);
  });
});

// Graceful shutdown
const shutdown = () => {
  console.log('Shutdown signal received');
  
  // Stop accepting new connections
  server.close((err) => {
    if (err) {
      console.error('Error during shutdown:', err);
      process.exit(1);
    }
    
    console.log('Server closed');
    
    // Close database connections
    mongoose.connection.close(false, () => {
      console.log('MongoDB disconnected');
      process.exit(0);
    });
  });

  // Force close after timeout
  setTimeout(() => {
    console.log('Forcing shutdown');
    connections.forEach(conn => conn.destroy());
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'express-41',
    topic: 'Express',
    question: 'What is express.urlencoded() middleware?',
    answer: `express.urlencoded() parses incoming requests with URL-encoded payloads (form submissions).

\`\`\`javascript
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// HTML form
// <form method="POST" action="/submit">
//   <input name="username" value="john">
//   <input name="password" value="secret">
// </form>

app.post('/submit', (req, res) => {
  console.log(req.body.username); // 'john'
  console.log(req.body.password); // 'secret'
});
\`\`\`

**Options:**
\`\`\`javascript
app.use(express.urlencoded({
  extended: true,     // Use qs library (supports nested objects)
  limit: '10kb',      // Max body size
  parameterLimit: 1000 // Max number of params
}));
\`\`\`

**extended option:**
- true: Parse with qs (nested objects, arrays)
- false: Parse with querystring (simple key-value)`,
    difficulty: 'Easy'
  },
  {
    id: 'express-42',
    topic: 'Express',
    question: 'How do you handle timeouts in Express?',
    answer: `**Using connect-timeout:**
\`\`\`javascript
const timeout = require('connect-timeout');

app.use(timeout('5s'));

app.use(haltOnTimedout);

function haltOnTimedout(req, res, next) {
  if (!req.timedout) next();
}

app.get('/slow', async (req, res) => {
  if (req.timedout) return;
  await slowOperation();
  if (req.timedout) return;
  res.json({ result: 'done' });
});
\`\`\`

**Manual timeout:**
\`\`\`javascript
const requestTimeout = (ms) => (req, res, next) => {
  res.setTimeout(ms, () => {
    res.status(408).json({ error: 'Request Timeout' });
  });
  next();
};

app.use(requestTimeout(5000));
\`\`\`

**Per-route timeout:**
\`\`\`javascript
app.get('/slow', timeout('30s'), async (req, res) => {
  const result = await longRunningTask();
  res.json(result);
});
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'express-43',
    topic: 'Express',
    question: 'What are route handlers and how can you chain them?',
    answer: `Route handlers are callback functions that handle requests. Multiple handlers can be chained.

**Multiple handlers:**
\`\`\`javascript
const validate = (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).json({ error: 'Email required' });
  }
  next();
};

const authenticate = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

const createUser = (req, res) => {
  res.json({ user: 'created' });
};

// Chain handlers
app.post('/users', validate, authenticate, createUser);

// Array syntax
app.post('/users', [validate, authenticate], createUser);
\`\`\`

**next('route'):**
\`\`\`javascript
app.get('/user/:id',
  (req, res, next) => {
    if (req.params.id === '0') next('route'); // Skip to next route
    else next();
  },
  (req, res) => {
    res.send('Regular user');
  }
);

app.get('/user/:id', (req, res) => {
  res.send('Special user 0');
});
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'express-44',
    topic: 'Express',
    question: 'How do you implement HTTPS in Express?',
    answer: `\`\`\`javascript
const https = require('https');
const fs = require('fs');
const express = require('express');

const app = express();

// SSL certificate options
const options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('certificate.pem'),
  // For self-signed:
  // ca: fs.readFileSync('ca-certificate.pem')
};

// HTTPS server
https.createServer(options, app).listen(443, () => {
  console.log('HTTPS server running on port 443');
});

// Redirect HTTP to HTTPS
const http = require('http');
http.createServer((req, res) => {
  res.writeHead(301, { Location: 'https://' + req.headers.host + req.url });
  res.end();
}).listen(80);
\`\`\`

**Using reverse proxy (recommended for production):**
\`\`\`nginx
# nginx handles SSL termination
server {
  listen 443 ssl;
  ssl_certificate /path/to/cert.pem;
  ssl_certificate_key /path/to/key.pem;
  
  location / {
    proxy_pass http://localhost:3000;
  }
}
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'express-45',
    topic: 'Express',
    question: 'What is req.ip and how does it work with proxies?',
    answer: `**req.ip** returns the remote IP address, but needs proper configuration behind proxies.

**Without proxy:**
\`\`\`javascript
app.get('/', (req, res) => {
  console.log(req.ip); // Client's direct IP
});
\`\`\`

**With proxy (trust proxy):**
\`\`\`javascript
// Enable trust proxy
app.set('trust proxy', true);

// Now req.ip reads X-Forwarded-For header
app.get('/', (req, res) => {
  console.log(req.ip);           // Client's actual IP
  console.log(req.ips);          // Array of IPs in chain
  console.log(req.protocol);     // 'https' (from X-Forwarded-Proto)
});
\`\`\`

**trust proxy options:**
\`\`\`javascript
app.set('trust proxy', true);     // Trust all proxies
app.set('trust proxy', 1);        // Trust first hop
app.set('trust proxy', 'loopback'); // Trust localhost proxies
app.set('trust proxy', '10.0.0.0/8'); // Trust specific subnet
\`\`\`

**Security:** Only trust proxies you control.`,
    difficulty: 'Medium'
  },
  {
    id: 'express-46',
    topic: 'Express',
    question: 'How do you implement API documentation with Swagger/OpenAPI?',
    answer: `**Using swagger-jsdoc and swagger-ui-express:**
\`\`\`javascript
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation'
    },
    servers: [{ url: 'http://localhost:3000' }]
  },
  apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
\`\`\`

**Document routes with JSDoc:**
\`\`\`javascript
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 */
app.get('/users', getUsers);
\`\`\`

Access documentation at: http://localhost:3000/api-docs`,
    difficulty: 'Medium'
  },
  {
    id: 'express-47',
    topic: 'Express',
    question: 'What is the express.raw() and express.text() middleware?',
    answer: `**express.raw():** Parses the body as a Buffer.
\`\`\`javascript
app.use(express.raw({ type: 'application/octet-stream' }));

app.post('/webhook', (req, res) => {
  console.log(req.body); // Buffer <...>
  console.log(req.body.toString()); // String content
});

// Options
app.use(express.raw({
  type: ['application/octet-stream', 'application/pdf'],
  limit: '5mb'
}));
\`\`\`

**express.text():** Parses the body as a string.
\`\`\`javascript
app.use(express.text({ type: 'text/plain' }));

app.post('/plain', (req, res) => {
  console.log(req.body); // 'Hello World'
  console.log(typeof req.body); // 'string'
});

// Options
app.use(express.text({
  type: 'text/*',
  limit: '1mb',
  defaultCharset: 'utf-8'
}));
\`\`\`

**Use cases:**
- raw: Webhooks, binary data, custom protocols
- text: Plain text APIs, raw data processing`,
    difficulty: 'Easy'
  },
  {
    id: 'express-48',
    topic: 'Express',
    question: 'How do you set up health check endpoints?',
    answer: `**Basic health check:**
\`\`\`javascript
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});
\`\`\`

**Comprehensive health check:**
\`\`\`javascript
app.get('/health', async (req, res) => {
  const healthcheck = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    checks: {}
  };

  try {
    // Check database
    await mongoose.connection.db.admin().ping();
    healthcheck.checks.database = 'ok';
  } catch (error) {
    healthcheck.checks.database = 'error';
    healthcheck.status = 'degraded';
  }

  try {
    // Check Redis
    await redis.ping();
    healthcheck.checks.redis = 'ok';
  } catch (error) {
    healthcheck.checks.redis = 'error';
    healthcheck.status = 'degraded';
  }

  const statusCode = healthcheck.status === 'ok' ? 200 : 503;
  res.status(statusCode).json(healthcheck);
});

// Kubernetes probes
app.get('/ready', (req, res) => res.send('OK'));
app.get('/live', (req, res) => res.send('OK'));
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'express-49',
    topic: 'Express',
    question: 'How do you implement request context/tracing?',
    answer: `**Using AsyncLocalStorage (Node 12+):**
\`\`\`javascript
const { AsyncLocalStorage } = require('async_hooks');
const { v4: uuid } = require('uuid');

const context = new AsyncLocalStorage();

// Middleware to set request context
app.use((req, res, next) => {
  const store = {
    requestId: req.headers['x-request-id'] || uuid(),
    userId: null
  };
  
  context.run(store, () => {
    res.setHeader('X-Request-ID', store.requestId);
    next();
  });
});

// Access context anywhere
const getContext = () => context.getStore();

// In any service/function
async function createUser(data) {
  const ctx = getContext();
  logger.info('Creating user', { requestId: ctx.requestId });
  // ...
}

// Logger integration
const logger = {
  info: (msg, data = {}) => {
    const ctx = getContext();
    console.log(JSON.stringify({
      level: 'info',
      message: msg,
      requestId: ctx?.requestId,
      ...data
    }));
  }
};
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'express-50',
    topic: 'Express',
    question: 'What are the common security headers to set in Express?',
    answer: `**Using Helmet (recommended):**
\`\`\`javascript
const helmet = require('helmet');
app.use(helmet());
\`\`\`

**Individual headers:**
\`\`\`javascript
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
    }
  },
  hsts: { maxAge: 31536000 },
  frameguard: { action: 'deny' },
  xssFilter: true,
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}));
\`\`\`

**Headers set by Helmet:**
- Content-Security-Policy: Controls resource loading
- X-Frame-Options: Prevents clickjacking
- X-XSS-Protection: XSS filter
- X-Content-Type-Options: Prevents MIME sniffing
- Strict-Transport-Security: Forces HTTPS
- Referrer-Policy: Controls Referer header
- X-Permitted-Cross-Domain-Policies: Flash/PDF policies

**Manual headers:**
\`\`\`javascript
app.use((req, res, next) => {
  res.setHeader('X-Custom-Header', 'value');
  next();
});
\`\`\``,
    difficulty: 'Medium'
  }
];
