import { TopicQuestion } from '../types';

export const backendQuestions: TopicQuestion[] = [
  {
    id: 'node-1',
    topic: 'Node.js',
    question: 'What is Node.js?',
    answer: `Node.js is a **JavaScript runtime** built on Chrome's V8 engine that lets you run JavaScript on the server.

**Key characteristics:**
- **Non-blocking I/O** - handles multiple requests efficiently
- **Event-driven** - uses event loop architecture
- **npm** - largest package ecosystem
- **Cross-platform** - runs on Windows, macOS, Linux

**Common use cases:**
| Use Case | Why Node.js |
|----------|-------------|
| REST APIs | Fast, JSON-native |
| Real-time apps | WebSocket support |
| Microservices | Lightweight |
| CLI tools | JavaScript ecosystem |

\`\`\`javascript
// Simple HTTP server
const http = require('http');
http.createServer((req, res) => {
  res.end('Hello World!');
}).listen(3000);
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'node-2',
    topic: 'Node.js',
    question: 'What is the Event Loop in Node.js?',
    answer: `The Event Loop is Node's mechanism for handling **async operations** despite being single-threaded.

**Phases of the Event Loop:**
\`\`\`
   ┌───────────────────────────┐
┌─>│         timers            │ ← setTimeout, setInterval
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │ ← I/O callbacks
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           poll            │ ← Incoming I/O
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │          check            │ ← setImmediate
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │ ← socket.on('close')
   └───────────────────────────┘
\`\`\`

**Key point:** Non-blocking operations are offloaded to the system kernel or thread pool, freeing the main thread.`,
    difficulty: 'Hard'
  },
  {
    id: 'node-3',
    topic: 'Node.js',
    question: 'What is the difference between "require()" and "import"?',
    answer: `| Feature | \`require()\` | \`import\` |
|---------|-------------|----------|
| **Module system** | CommonJS | ES Modules |
| **Loading** | Synchronous | Asynchronous |
| **When runs** | Runtime | Compile-time |
| **Placement** | Anywhere | Top of file only |
| **Tree shaking** | No | Yes |

\`\`\`javascript
// CommonJS
const express = require('express');
const { Router } = require('express');

// ES Modules
import express from 'express';
import { Router } from 'express';
\`\`\`

**To use ES Modules in Node:**
- Add \`"type": "module"\` in package.json, OR
- Use \`.mjs\` file extension`,
    difficulty: 'Medium'
  },
  {
    id: 'node-4',
    topic: 'Node.js',
    question: 'What is Middleware in Express?',
    answer: `Middleware are functions that run **between request and response** in the Express pipeline.

\`\`\`javascript
// Middleware signature
function middleware(req, res, next) {
  // Do something
  next(); // Pass to next middleware
}
\`\`\`

**Middleware flow:**
\`\`\`
Request → [Auth] → [Logger] → [Parser] → Route Handler → Response
\`\`\`

**Common types:**
\`\`\`javascript
// Application-level
app.use(express.json());

// Router-level
router.use(authMiddleware);

// Error-handling (4 params)
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

// Built-in
app.use(express.static('public'));
\`\`\`

**Use cases:** Authentication, logging, parsing, CORS, rate limiting`,
    difficulty: 'Medium'
  },
  {
    id: 'node-5',
    topic: 'Node.js',
    question: 'What is "package.json"?',
    answer: `\`package.json\` is the **manifest file** for Node.js projects.

\`\`\`json
{
  "name": "my-app",
  "version": "1.0.0",
  "description": "My awesome app",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.0"
  }
}
\`\`\`

**Key sections:**
| Field | Purpose |
|-------|---------|
| \`name\` | Package name |
| \`version\` | SemVer version |
| \`scripts\` | CLI commands (\`npm run\`) |
| \`dependencies\` | Production packages |
| \`devDependencies\` | Development packages |
| \`main\` | Entry point |`,
    difficulty: 'Easy'
  },
  {
    id: 'node-6',
    topic: 'Node.js',
    question: 'What is "process.nextTick()"?',
    answer: `\`process.nextTick()\` defers the execution of a callback function until the next iteration of the Event Loop. It runs before any other I/O events or timers fire.`,
    difficulty: 'Hard'
  },
  {
    id: 'node-7',
    topic: 'Node.js',
    question: 'What are Streams in Node.js?',
    answer: `Streams are objects that let you read data from a source or write data to a destination in continuous chunks. There are four types: Readable, Writable, Duplex, and Transform.`,
    difficulty: 'Medium'
  },
  {
    id: 'node-8',
    topic: 'Node.js',
    question: 'What is the purpose of "module.exports"?',
    answer: `\`module.exports\` is the object that is actually returned as the result of a \`require\` call. It is used to expose functions, objects, or values from a module so they can be used in other modules.`,
    difficulty: 'Easy'
  },
  {
    id: 'node-9',
    topic: 'Node.js',
    question: 'What is the difference between "readFile" and "readFileSync"?',
    answer: `**readFile**: Asynchronous, non-blocking. Takes a callback function.
**readFileSync**: Synchronous, blocking. Returns the file content directly. Stops execution until file is read.`,
    difficulty: 'Easy'
  },
  {
    id: 'node-10',
    topic: 'Node.js',
    question: 'What is "npm"?',
    answer: `npm stands for Node Package Manager. It is the default package manager for Node.js and consists of a command line client and an online database of public and paid-for private packages.`,
    difficulty: 'Easy'
  },
  {
    id: 'node-11',
    topic: 'Node.js',
    question: 'Explain the phases of the Node.js Event Loop.',
    answer: `The Event Loop processes callbacks in these phases:

**1. Timers:** Executes setTimeout/setInterval callbacks
**2. Pending Callbacks:** I/O callbacks deferred to next loop
**3. Idle/Prepare:** Internal use only
**4. Poll:** Retrieve new I/O events, execute I/O callbacks
**5. Check:** setImmediate callbacks
**6. Close Callbacks:** Close event callbacks (e.g., socket.on('close'))

**Priority order:**
\`\`\`javascript
process.nextTick() // Highest priority (before any phase)
Promise.then()     // Microtask queue
setTimeout(fn, 0)  // Timers phase
setImmediate()     // Check phase
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'node-12',
    topic: 'Node.js',
    question: 'What is the difference between process.nextTick() and setImmediate()?',
    answer: `**process.nextTick():**
- Executes BEFORE the next event loop iteration
- Fires after current operation, before ANY I/O
- Can starve I/O if called recursively

**setImmediate():**
- Executes in the "check" phase of event loop
- After I/O callbacks
- Safer for recursion

\`\`\`javascript
setImmediate(() => console.log('setImmediate'));
process.nextTick(() => console.log('nextTick'));
// Output: nextTick, setImmediate
\`\`\`

**Rule:** Use setImmediate for breaking up long-running operations.`,
    difficulty: 'Hard'
  },
  {
    id: 'node-13',
    topic: 'Node.js',
    question: 'What is clustering in Node.js?',
    answer: `Clustering allows you to create child processes (workers) that share the same server port to utilize multi-core CPUs.

\`\`\`javascript
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker) => {
    console.log(\`Worker \${worker.id} died\`);
    cluster.fork(); // Restart worker
  });
} else {
  // Workers share TCP port
  require('./server');
}
\`\`\`

**Benefits:**
- Utilize all CPU cores
- Load balancing
- Zero-downtime restarts`,
    difficulty: 'Hard'
  },
  {
    id: 'node-14',
    topic: 'Node.js',
    question: 'What are Worker Threads in Node.js?',
    answer: `Worker Threads allow running JavaScript in parallel threads for CPU-intensive tasks.

\`\`\`javascript
// main.js
const { Worker } = require('worker_threads');

const worker = new Worker('./worker.js', {
  workerData: { num: 42 }
});

worker.on('message', (result) => {
  console.log('Result:', result);
});

worker.on('error', (err) => console.error(err));

// worker.js
const { parentPort, workerData } = require('worker_threads');

const result = heavyComputation(workerData.num);
parentPort.postMessage(result);
\`\`\`

**Use cases:**
- CPU-intensive computations
- Image/video processing
- Data parsing`,
    difficulty: 'Hard'
  },
  {
    id: 'node-15',
    topic: 'Node.js',
    question: 'What is the Buffer class in Node.js?',
    answer: `Buffer handles binary data directly in memory, useful for files, network protocols, and streams.

\`\`\`javascript
// Creating buffers
const buf1 = Buffer.alloc(10);           // 10 zero-filled bytes
const buf2 = Buffer.from('Hello');       // From string
const buf3 = Buffer.from([1, 2, 3]);     // From array

// Reading/Writing
buf1.write('Hi');
console.log(buf2.toString());            // 'Hello'
console.log(buf2.toString('base64'));    // 'SGVsbG8='

// Concatenation
const combined = Buffer.concat([buf2, Buffer.from(' World')]);

// Comparison
buf2.equals(Buffer.from('Hello'));       // true
\`\`\`

**Key points:**
- Fixed size, cannot be resized
- Raw memory outside V8 heap
- UTF-8 encoding by default`,
    difficulty: 'Medium'
  },
  {
    id: 'node-16',
    topic: 'Node.js',
    question: 'Explain the different types of Streams in Node.js.',
    answer: `**1. Readable Streams:**
\`\`\`javascript
const fs = require('fs');
const readable = fs.createReadStream('file.txt');
readable.on('data', (chunk) => console.log(chunk));
\`\`\`

**2. Writable Streams:**
\`\`\`javascript
const writable = fs.createWriteStream('output.txt');
writable.write('Hello');
writable.end();
\`\`\`

**3. Duplex Streams:** (Read + Write)
\`\`\`javascript
const net = require('net');
const socket = net.connect(80, 'example.com');
// socket is duplex - can read and write
\`\`\`

**4. Transform Streams:** (Modify data as it passes through)
\`\`\`javascript
const { Transform } = require('stream');
const upperCase = new Transform({
  transform(chunk, enc, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'node-17',
    topic: 'Node.js',
    question: 'How do you handle uncaught exceptions in Node.js?',
    answer: `\`\`\`javascript
// Catch uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Cleanup and exit
  process.exit(1);
});

// Catch unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  server.close(() => {
    process.exit(0);
  });
});
\`\`\`

**Best practices:**
- Log the error
- Attempt graceful shutdown
- Exit with non-zero code
- Use process managers (PM2) for auto-restart`,
    difficulty: 'Medium'
  },
  {
    id: 'node-18',
    topic: 'Node.js',
    question: 'What is the "path" module used for?',
    answer: `The path module handles and transforms file paths cross-platform.

\`\`\`javascript
const path = require('path');

// Join path segments
path.join('/users', 'john', 'data.txt'); // '/users/john/data.txt'

// Resolve absolute path
path.resolve('data', 'file.txt'); // '/current/dir/data/file.txt'

// Get file extension
path.extname('index.html'); // '.html'

// Get basename
path.basename('/users/john/data.txt'); // 'data.txt'
path.basename('/users/john/data.txt', '.txt'); // 'data'

// Get directory
path.dirname('/users/john/data.txt'); // '/users/john'

// Parse path
path.parse('/users/john/data.txt');
// { root: '/', dir: '/users/john', base: 'data.txt', ext: '.txt', name: 'data' }
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'node-19',
    topic: 'Node.js',
    question: 'What is the "fs" module and its common methods?',
    answer: `The fs module handles file system operations.

**Async methods (recommended):**
\`\`\`javascript
const fs = require('fs/promises');

// Read file
const data = await fs.readFile('file.txt', 'utf8');

// Write file
await fs.writeFile('file.txt', 'content');

// Append to file
await fs.appendFile('file.txt', 'more content');

// Delete file
await fs.unlink('file.txt');

// Create directory
await fs.mkdir('newDir', { recursive: true });

// List directory
const files = await fs.readdir('./');

// Check file exists
await fs.access('file.txt'); // Throws if not exists
\`\`\`

**Callback style:**
\`\`\`javascript
fs.readFile('file.txt', (err, data) => {
  if (err) throw err;
  console.log(data);
});
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'node-20',
    topic: 'Node.js',
    question: 'What is the EventEmitter class?',
    answer: `EventEmitter enables the observer pattern for event-driven programming.

\`\`\`javascript
const { EventEmitter } = require('events');

class MyEmitter extends EventEmitter {}
const emitter = new MyEmitter();

// Register listener
emitter.on('event', (data) => {
  console.log('Event received:', data);
});

// Register one-time listener
emitter.once('event', () => {
  console.log('Only fires once');
});

// Emit event
emitter.emit('event', { message: 'Hello' });

// Remove listener
const handler = () => {};
emitter.on('event', handler);
emitter.off('event', handler);

// Get listener count
emitter.listenerCount('event');
\`\`\`

**Use cases:** HTTP servers, streams, custom events.`,
    difficulty: 'Medium'
  },
  {
    id: 'node-21',
    topic: 'Node.js',
    question: 'What is the "crypto" module used for?',
    answer: `The crypto module provides cryptographic functionality.

\`\`\`javascript
const crypto = require('crypto');

// Hashing
const hash = crypto.createHash('sha256')
  .update('password')
  .digest('hex');

// HMAC (keyed hash)
const hmac = crypto.createHmac('sha256', 'secret-key')
  .update('data')
  .digest('hex');

// Random bytes
const token = crypto.randomBytes(32).toString('hex');

// UUID
const uuid = crypto.randomUUID();

// Password hashing with salt
const salt = crypto.randomBytes(16).toString('hex');
crypto.scrypt('password', salt, 64, (err, derivedKey) => {
  console.log(derivedKey.toString('hex'));
});

// Encryption (AES)
const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'node-22',
    topic: 'Node.js',
    question: 'How do you debug a Node.js application?',
    answer: `**1. Built-in debugger:**
\`\`\`bash
node inspect app.js
node --inspect app.js  # Chrome DevTools
\`\`\`

**2. Chrome DevTools:**
- Run with --inspect or --inspect-brk
- Open chrome://inspect

**3. VS Code:**
\`\`\`json
// launch.json
{
  "type": "node",
  "request": "launch",
  "name": "Debug",
  "program": "\${workspaceFolder}/app.js"
}
\`\`\`

**4. Console methods:**
\`\`\`javascript
console.log('value:', value);
console.table(array);
console.time('label');
// ... code
console.timeEnd('label');
console.trace();
\`\`\`

**5. Debug module:**
\`\`\`bash
DEBUG=app:* node app.js
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'node-23',
    topic: 'Node.js',
    question: 'What is the difference between spawn() and exec()?',
    answer: `Both create child processes but differ in how they handle data.

**exec() - Buffered output:**
\`\`\`javascript
const { exec } = require('child_process');

exec('ls -la', (error, stdout, stderr) => {
  console.log(stdout);
});
// Buffers entire output, limited by maxBuffer
\`\`\`

**spawn() - Streaming output:**
\`\`\`javascript
const { spawn } = require('child_process');

const child = spawn('ls', ['-la']);
child.stdout.on('data', (data) => {
  console.log(\`stdout: \${data}\`);
});
child.on('close', (code) => {
  console.log(\`exited with code \${code}\`);
});
// Streams data, better for large outputs
\`\`\`

**Use exec for:** Small outputs, shell commands
**Use spawn for:** Long-running processes, large outputs`,
    difficulty: 'Medium'
  },
  {
    id: 'node-24',
    topic: 'Node.js',
    question: 'What is libuv in Node.js?',
    answer: `libuv is a C library that provides Node.js with its event loop and async I/O capabilities.

**Features:**
- Event loop implementation
- Async TCP/UDP sockets
- Async DNS resolution
- Async file system operations
- Child processes
- Thread pool for blocking operations
- Signal handling
- High-resolution clock

**Thread Pool:**
Default 4 threads for:
- File system operations
- DNS (dns.lookup)
- Crypto (some operations)
- Compression

\`\`\`bash
# Increase thread pool size
UV_THREADPOOL_SIZE=8 node app.js
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'node-25',
    topic: 'Node.js',
    question: 'What are environment variables and how do you use them?',
    answer: `Environment variables configure application behavior without code changes.

**Setting variables:**
\`\`\`bash
# Unix/Linux
export NODE_ENV=production
DB_URL=postgres://localhost node app.js

# Windows
set NODE_ENV=production
\`\`\`

**Accessing in Node.js:**
\`\`\`javascript
const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';
\`\`\`

**Using .env files (dotenv):**
\`\`\`javascript
require('dotenv').config();
// Loads variables from .env file
\`\`\`

**.env file:**
\`\`\`
PORT=3000
DATABASE_URL=postgres://localhost
API_KEY=secret123
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'node-26',
    topic: 'Node.js',
    question: 'How do you test Node.js applications?',
    answer: `**Jest setup:**
\`\`\`javascript
// sum.test.js
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

// Async testing
test('fetches user', async () => {
  const user = await fetchUser(1);
  expect(user.name).toBe('John');
});

// Mocking
jest.mock('./database');
\`\`\`

**Supertest for HTTP:**
\`\`\`javascript
const request = require('supertest');
const app = require('./app');

test('GET /users returns 200', async () => {
  const response = await request(app)
    .get('/users')
    .expect(200);
  expect(response.body).toHaveLength(10);
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
    id: 'node-27',
    topic: 'Node.js',
    question: 'What is the global object in Node.js?',
    answer: `The global object provides global variables and functions (like window in browsers).

\`\`\`javascript
// Global object
console.log(global);

// Commonly used globals
__dirname  // Current directory path
__filename // Current file path
module     // Current module
exports    // Shortcut to module.exports
require    // Import modules
process    // Process info and control
console    // Logging
Buffer     // Binary data handling
setTimeout, setInterval, setImmediate
\`\`\`

**Avoid polluting global scope:**
\`\`\`javascript
// Bad
global.myVar = 'value';

// Good - use modules
module.exports = { myVar: 'value' };
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'node-28',
    topic: 'Node.js',
    question: 'What is the "os" module?',
    answer: `The os module provides operating system-related utility methods.

\`\`\`javascript
const os = require('os');

// CPU info
os.cpus();           // CPU cores info
os.cpus().length;    // Number of cores

// Memory
os.totalmem();       // Total memory in bytes
os.freemem();        // Free memory in bytes

// Platform
os.platform();       // 'linux', 'darwin', 'win32'
os.type();           // 'Linux', 'Darwin', 'Windows_NT'
os.arch();           // 'x64', 'arm64'
os.release();        // OS release version

// User info
os.userInfo();       // { username, uid, gid, shell, homedir }
os.homedir();        // User home directory
os.tmpdir();         // Temp directory

// Network
os.networkInterfaces();  // Network interface info
os.hostname();           // Machine hostname
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'node-29',
    topic: 'Node.js',
    question: 'What is memory leak and how to detect it in Node.js?',
    answer: `Memory leak occurs when memory is allocated but never released.

**Common causes:**
\`\`\`javascript
// 1. Global variables
global.data = [];
function addData() {
  global.data.push(largeObject); // Never cleaned
}

// 2. Closures holding references
function createClosure() {
  const largeData = new Array(1000000);
  return () => largeData.length; // Holds reference
}

// 3. Event listeners not removed
element.addEventListener('click', handler);
// Must: element.removeEventListener('click', handler);
\`\`\`

**Detection:**
\`\`\`bash
# Heap snapshot
node --inspect app.js
# Use Chrome DevTools Memory tab

# Process memory
node --expose-gc app.js
\`\`\`

\`\`\`javascript
// Monitor memory
setInterval(() => {
  console.log(process.memoryUsage());
}, 5000);
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'node-30',
    topic: 'Node.js',
    question: 'How do you secure a Node.js application?',
    answer: `**1. Validate all input:**
\`\`\`javascript
const Joi = require('joi');
const schema = Joi.object({ email: Joi.string().email() });
\`\`\`

**2. Use Helmet for HTTP headers:**
\`\`\`javascript
app.use(helmet());
\`\`\`

**3. Rate limiting:**
\`\`\`javascript
app.use(rateLimit({ windowMs: 15*60*1000, max: 100 }));
\`\`\`

**4. Parameterized queries (prevent SQL injection):**
\`\`\`javascript
db.query('SELECT * FROM users WHERE id = $1', [userId]);
\`\`\`

**5. Store secrets in env variables**

**6. Keep dependencies updated:**
\`\`\`bash
npm audit
npm audit fix
\`\`\`

**7. Use HTTPS**

**8. Don't run as root**`,
    difficulty: 'Medium'
  },
  {
    id: 'node-31',
    topic: 'Node.js',
    question: 'What is REPL in Node.js?',
    answer: `REPL (Read-Eval-Print-Loop) is an interactive shell for executing JavaScript.

\`\`\`bash
# Start REPL
node

# In REPL:
> 1 + 1
2
> const x = 10
undefined
> x * 2
20
> .help      # Show commands
> .exit      # Exit REPL
> .editor    # Multi-line mode
\`\`\`

**REPL Commands:**
- .break - Exit multi-line input
- .clear - Clear context
- .editor - Enter editor mode
- .exit - Exit REPL
- .help - Show help
- .load - Load JS file
- .save - Save session to file

**Custom REPL:**
\`\`\`javascript
const repl = require('repl');
repl.start('myapp> ');
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'node-32',
    topic: 'Node.js',
    question: 'What is the purpose of package-lock.json?',
    answer: `package-lock.json ensures consistent installs across machines.

**Purpose:**
- Locks exact versions of all dependencies
- Records full dependency tree
- Faster installs (skips resolution)
- Reproducible builds

**package.json vs package-lock.json:**
\`\`\`json
// package.json - semver ranges
"lodash": "^4.17.0"  // Any 4.17.x

// package-lock.json - exact versions
"lodash": {
  "version": "4.17.21",
  "resolved": "https://registry.npmjs.org/...",
  "integrity": "sha512-..."
}
\`\`\`

**Best practices:**
- Commit package-lock.json
- Use npm ci in CI/CD (uses lock file exactly)
- Don't manually edit lock file`,
    difficulty: 'Easy'
  },
  {
    id: 'node-33',
    topic: 'Node.js',
    question: 'What is the difference between npm and yarn?',
    answer: `Both are package managers with similar features but different implementations.

**npm (Node Package Manager):**
- Comes with Node.js
- Uses package-lock.json
- \`npm install\`, \`npm run\`, \`npm ci\`

**Yarn (by Facebook):**
- Faster (parallel downloads)
- Uses yarn.lock
- Offline mode
- \`yarn add\`, \`yarn run\`, \`yarn install\`

**Common commands:**
| npm | yarn |
|-----|------|
| npm install | yarn |
| npm install pkg | yarn add pkg |
| npm install -D pkg | yarn add -D pkg |
| npm uninstall pkg | yarn remove pkg |
| npm run script | yarn script |
| npm ci | yarn install --frozen-lockfile |

**pnpm:** Alternative with better disk usage (symlinks)`,
    difficulty: 'Easy'
  },
  {
    id: 'node-34',
    topic: 'Node.js',
    question: 'How do you implement logging in Node.js?',
    answer: `**Using Winston:**
\`\`\`javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

logger.info('Server started', { port: 3000 });
logger.error('Database error', { error: err });
\`\`\`

**Log levels:** error, warn, info, http, verbose, debug, silly`,
    difficulty: 'Medium'
  },
  {
    id: 'node-35',
    topic: 'Node.js',
    question: 'What is the "http" module?',
    answer: `The http module creates HTTP servers and makes HTTP requests.

**Create server:**
\`\`\`javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
\`\`\`

**Make request (deprecated, use fetch):**
\`\`\`javascript
http.get('http://api.example.com', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => console.log(data));
});
\`\`\`

**Using fetch (Node 18+):**
\`\`\`javascript
const response = await fetch('http://api.example.com');
const data = await response.json();
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'node-36',
    topic: 'Node.js',
    question: 'What is the "net" module?',
    answer: `The net module provides TCP/IPC networking capabilities.

**TCP Server:**
\`\`\`javascript
const net = require('net');

const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    console.log('Received:', data.toString());
    socket.write('Echo: ' + data);
  });
  
  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

server.listen(8080, () => {
  console.log('TCP server listening');
});
\`\`\`

**TCP Client:**
\`\`\`javascript
const client = net.createConnection({ port: 8080 }, () => {
  client.write('Hello server');
});

client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});
\`\`\`

**Use cases:** Real-time applications, game servers, custom protocols.`,
    difficulty: 'Medium'
  },
  {
    id: 'node-37',
    topic: 'Node.js',
    question: 'What are microservices and how does Node.js support them?',
    answer: `Microservices architecture splits apps into small, independent services.

**Node.js advantages for microservices:**
- Lightweight and fast startup
- Non-blocking I/O
- Easy REST API creation
- Good Docker support
- Large ecosystem

**Example service:**
\`\`\`javascript
// user-service/index.js
const express = require('express');
const app = express();

app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

app.listen(3001);
\`\`\`

**Communication patterns:**
- REST/HTTP
- Message queues (RabbitMQ, Kafka)
- gRPC

**Docker:**
\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["node", "index.js"]
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'node-38',
    topic: 'Node.js',
    question: 'What is PM2 and why use it?',
    answer: `PM2 is a production process manager for Node.js applications.

**Features:**
- Process management
- Auto-restart on crash
- Load balancing (cluster mode)
- Zero-downtime reloads
- Log management
- Monitoring

**Common commands:**
\`\`\`bash
# Start app
pm2 start app.js

# Cluster mode (use all CPUs)
pm2 start app.js -i max

# List processes
pm2 list

# Monitor
pm2 monit

# Logs
pm2 logs

# Restart/Reload
pm2 restart app
pm2 reload app  # Zero-downtime

# Stop/Delete
pm2 stop app
pm2 delete app

# Startup script
pm2 startup
pm2 save
\`\`\`

**Ecosystem file:**
\`\`\`javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'app',
    script: 'index.js',
    instances: 'max',
    exec_mode: 'cluster'
  }]
};
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'node-39',
    topic: 'Node.js',
    question: 'What is the "url" module?',
    answer: `The url module parses and formats URLs.

\`\`\`javascript
const { URL, URLSearchParams } = require('url');

// Parse URL
const myUrl = new URL('https://example.com:8080/path?name=john&age=30#section');

myUrl.href;         // Full URL
myUrl.protocol;     // 'https:'
myUrl.host;         // 'example.com:8080'
myUrl.hostname;     // 'example.com'
myUrl.port;         // '8080'
myUrl.pathname;     // '/path'
myUrl.search;       // '?name=john&age=30'
myUrl.hash;         // '#section'

// Search params
myUrl.searchParams.get('name');    // 'john'
myUrl.searchParams.set('city', 'NYC');
myUrl.searchParams.append('hobby', 'coding');
myUrl.searchParams.delete('age');

// Create URL
const newUrl = new URL('/api/users', 'https://example.com');
// https://example.com/api/users
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'node-40',
    topic: 'Node.js',
    question: 'What are async hooks in Node.js?',
    answer: `Async hooks track async resources throughout their lifecycle.

\`\`\`javascript
const async_hooks = require('async_hooks');

const hook = async_hooks.createHook({
  init(asyncId, type, triggerAsyncId) {
    console.log(\`Init: \${asyncId} (\${type})\`);
  },
  before(asyncId) {
    console.log(\`Before: \${asyncId}\`);
  },
  after(asyncId) {
    console.log(\`After: \${asyncId}\`);
  },
  destroy(asyncId) {
    console.log(\`Destroy: \${asyncId}\`);
  }
});

hook.enable();

// Get current execution context
const executionAsyncId = async_hooks.executionAsyncId();
\`\`\`

**Use cases:**
- Request tracing/logging
- Context propagation
- APM tools
- Debugging async issues`,
    difficulty: 'Hard'
  },
  {
    id: 'node-41',
    topic: 'Node.js',
    question: 'What is the difference between callbacks, promises, and async/await?',
    answer: `**Callbacks:**
\`\`\`javascript
fs.readFile('file.txt', (err, data) => {
  if (err) throw err;
  console.log(data);
});
// Callback hell problem with nesting
\`\`\`

**Promises:**
\`\`\`javascript
fs.promises.readFile('file.txt')
  .then(data => console.log(data))
  .catch(err => console.error(err));

// Chaining
fetchUser()
  .then(user => fetchPosts(user.id))
  .then(posts => console.log(posts));
\`\`\`

**Async/Await:**
\`\`\`javascript
async function getData() {
  try {
    const data = await fs.promises.readFile('file.txt');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
// Cleaner, looks synchronous
\`\`\`

**Recommendation:** Use async/await for new code.`,
    difficulty: 'Medium'
  },
  {
    id: 'node-42',
    topic: 'Node.js',
    question: 'What is the "assert" module?',
    answer: `The assert module provides assertion functions for testing.

\`\`\`javascript
const assert = require('assert');

// Equality
assert.equal(1, 1);          // == comparison
assert.strictEqual(1, 1);    // === comparison
assert.deepEqual({a: 1}, {a: 1});  // Deep equality
assert.deepStrictEqual({a: 1}, {a: 1});

// Truthiness
assert.ok(true);             // Truthy check
assert.ok(1);

// Errors
assert.throws(() => {
  throw new Error('fail');
}, Error);

// Async assertion
await assert.rejects(async () => {
  await asyncFnThatRejects();
}, Error);

// Fail
assert.fail('This should not be reached');
\`\`\`

**Note:** For full testing, use Jest or Mocha.`,
    difficulty: 'Easy'
  },
  {
    id: 'node-43',
    topic: 'Node.js',
    question: 'What is the "util" module?',
    answer: `The util module provides utility functions.

\`\`\`javascript
const util = require('util');

// Promisify callback-based functions
const fs = require('fs');
const readFile = util.promisify(fs.readFile);
const data = await readFile('file.txt', 'utf8');

// Format strings
util.format('%s: %d', 'count', 42);  // 'count: 42'

// Inspect objects
util.inspect({ a: 1, b: { c: 2 } }, { depth: null, colors: true });

// Deprecate functions
const deprecatedFn = util.deprecate(
  () => {},
  'This function is deprecated'
);

// Type checking
util.types.isDate(new Date());         // true
util.types.isPromise(Promise.resolve()); // true
util.types.isAsyncFunction(async () => {}); // true
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'node-44',
    topic: 'Node.js',
    question: 'What is the "zlib" module?',
    answer: `The zlib module provides compression and decompression using Gzip, Deflate.

\`\`\`javascript
const zlib = require('zlib');
const fs = require('fs');

// Compress file
const gzip = zlib.createGzip();
const input = fs.createReadStream('input.txt');
const output = fs.createWriteStream('input.txt.gz');
input.pipe(gzip).pipe(output);

// Decompress
const gunzip = zlib.createGunzip();
fs.createReadStream('input.txt.gz')
  .pipe(gunzip)
  .pipe(fs.createWriteStream('output.txt'));

// Async API
const compressed = await zlib.gzipSync('Hello World');
const decompressed = await zlib.gunzipSync(compressed);

// Express middleware
app.use(compression());
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'node-45',
    topic: 'Node.js',
    question: 'How do you handle timeouts in Node.js?',
    answer: `**HTTP request timeout:**
\`\`\`javascript
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 5000);

try {
  const response = await fetch(url, { signal: controller.signal });
} catch (err) {
  if (err.name === 'AbortError') {
    console.log('Request timed out');
  }
} finally {
  clearTimeout(timeout);
}
\`\`\`

**Promise timeout wrapper:**
\`\`\`javascript
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), ms)
  );
  return Promise.race([promise, timeout]);
}

await withTimeout(fetchData(), 5000);
\`\`\`

**Server timeout:**
\`\`\`javascript
server.timeout = 30000; //30 seconds
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'node-46',
    topic: 'Node.js',
    question: 'What is process.argv?',
    answer: `process.argv is an array containing command-line arguments.

\`\`\`javascript
// node app.js --name John --age 30

process.argv;
// [
//   '/usr/local/bin/node',    // [0] Node executable
//   '/path/to/app.js',        // [1] Script path
//   '--name',                 // [2] First argument
//   'John',                   // [3]
//   '--age',                  // [4]
//   '30'                      // [5]
// ]

// Skip first two elements
const args = process.argv.slice(2);

// Better: use a library like commander or yargs
const { program } = require('commander');

program
  .option('-n, --name <name>', 'User name')
  .option('-a, --age <age>', 'User age')
  .parse();

const options = program.opts();
console.log(options.name, options.age);
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'node-47',
    topic: 'Node.js',
    question: 'What is ESM vs CommonJS in Node.js?',
    answer: `**CommonJS (CJS) - Traditional:**
\`\`\`javascript
// module.js
module.exports = { add, subtract };
module.exports.multiply = multiply;

// usage.js
const { add } = require('./module');
const math = require('./module');
\`\`\`

**ES Modules (ESM) - Modern:**
\`\`\`javascript
// module.js
export const add = (a, b) => a + b;
export default subtract;

// usage.js
import { add } from './module.js';
import subtract from './module.js';
\`\`\`

**Enable ESM:**
\`\`\`json
// package.json
{ "type": "module" }
\`\`\`

**Key differences:**
| CJS | ESM |
|-----|-----|
| require() | import |
| module.exports | export |
| Sync loading | Async loading |
| Dynamic imports | Static (mostly) |
| No top-level await | Top-level await |`,
    difficulty: 'Medium'
  },
  {
    id: 'node-48',
    topic: 'Node.js',
    question: 'What is the N-API?',
    answer: `N-API (Node-API) is a stable ABI for building native addons in C/C++.

**Purpose:**
- Binary compatibility across Node versions
- No recompilation needed for new Node versions
- Stable interface for native modules

**When to use:**
- CPU-intensive operations
- Wrapping existing C/C++ libraries
- Access to system APIs

**Building native addons:**
\`\`\`bash
npm install -g node-gyp
\`\`\`

**Alternative - FFI (Foreign Function Interface):**
\`\`\`javascript
const ffi = require('ffi-napi');
const libm = ffi.Library('libm', {
  'ceil': ['double', ['double']]
});
console.log(libm.ceil(1.5)); // 2
\`\`\`

**Recommendation:** Use pure JS when possible for portability.`,
    difficulty: 'Hard'
  },
  {
    id: 'node-49',
    topic: 'Node.js',
    question: 'What are semantic versioning rules (semver)?',
    answer: `Semantic versioning uses MAJOR.MINOR.PATCH format.

**Version meaning:**
- MAJOR: Breaking/incompatible changes
- MINOR: New features (backward-compatible)
- PATCH: Bug fixes (backward-compatible)

**Range specifiers in package.json:**
\`\`\`json
{
  "dependencies": {
    "exact": "1.2.3",         // Exactly 1.2.3
    "patch": "~1.2.3",        // 1.2.x (>=1.2.3 <1.3.0)
    "minor": "^1.2.3",        // 1.x.x (>=1.2.3 <2.0.0)
    "any": "*",               // Any version
    "range": ">=1.0.0 <2.0.0", // Range
    "or": "1.2.x || 2.x"      // Or
  }
}
\`\`\`

**Pre-release versions:**
- 1.0.0-alpha.1
- 1.0.0-beta.2
- 1.0.0-rc.1 (release candidate)`,
    difficulty: 'Easy'
  },
  {
    id: 'node-50',
    topic: 'Node.js',
    question: 'What is top-level await in Node.js?',
    answer: `Top-level await allows using await outside of async functions in ES modules.

\`\`\`javascript
// config.mjs (ES Module)
const response = await fetch('https://api.example.com/config');
export const config = await response.json();

// main.mjs
import { config } from './config.mjs';
console.log(config); // Already resolved!
\`\`\`

**Requirements:**
- Node.js 14.8+ 
- ES Modules (type: "module" or .mjs)

**Use cases:**
\`\`\`javascript
// Dynamic imports
const locale = await import(\`./locales/\${lang}.mjs\`);

// Database connection
export const db = await connectToDatabase();

// Environment setup
const secrets = await loadSecrets();
\`\`\`

**Caution:** Blocks module loading, use sparingly.`,
    difficulty: 'Medium'
  }
];
