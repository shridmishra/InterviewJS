import { Problem, Difficulty } from '@/types';

export const nodeEventsStreams: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'node-event-emitter',
    title: 'Event Emitter',
    description: 'Create an instance of `EventEmitter`. Register a listener for the event "greet" that logs "Hello!" and then emit the "greet" event.',
    difficulty: Difficulty.Medium,
    category: 'Events',
    group: 'Step 3: Events & Streams',
    docsUrl: 'https://nodejs.org/api/events.html',
    starterCode: `const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// Your code here
`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('.on(\'greet\'') && userCode.includes('.emit(\'greet\'');
      return [{
        input: 'Code Check',
        expected: 'Event listener registered and emitted',
        actual: passed ? 'Correctly implemented' : 'Missing listener or emit',
        passed
      }];
    },
  },
  {
    id: 'node-stream-pipe',
    title: 'Pipe Streams',
    description: 'Create a readable stream from "source.txt" and pipe it to a writable stream for "destination.txt".',
    difficulty: Difficulty.Medium,
    category: 'Streams',
    group: 'Step 3: Events & Streams',
    docsUrl: 'https://nodejs.org/api/stream.html#readablepipedestination-options',
    starterCode: `const fs = require('fs');
const readStream = fs.createReadStream('source.txt');
const writeStream = fs.createWriteStream('destination.txt');

// Your code here
`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('readStream.pipe(writeStream)');
      return [{
        input: 'Code Check',
        expected: 'Stream piped correctly',
        actual: passed ? 'Correctly implemented' : 'Missing pipe call',
        passed
      }];
    },
  },
  {
    id: 'node-event-once',
    title: 'Handle Event Once',
    description: 'Use `emitter.once` to handle the "start" event only the first time it is emitted.',
    difficulty: Difficulty.Easy,
    category: 'Events & Streams',
    group: 'Step 3: Events & Streams',
    docsUrl: 'https://nodejs.org/docs/latest/api/events.html#emitteronceeventname-listener',
    starterCode: `const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// Your code here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('.once(') && userCode.includes('"start"');
      return [{
        input: 'Code Check',
        expected: 'emitter.once used',
        actual: passed ? 'Correctly implemented' : 'Missing .once',
        passed
      }];
    },
  },
  {
    id: 'node-stream-read',
    title: 'Read Stream',
    description: 'Create a readable stream from "data.txt" using `fs.createReadStream` and log chunks of data as they are received.',
    difficulty: Difficulty.Medium,
    category: 'Events & Streams',
    group: 'Step 3: Events & Streams',
    docsUrl: 'https://nodejs.org/docs/latest/api/fs.html#fscreatereadstreampath-options',
    starterCode: `const fs = require('fs');

// Your code here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('createReadStream') && userCode.includes('.on("data"');
      return [{
        input: 'Code Check',
        expected: 'Read stream and data listener',
        actual: passed ? 'Correctly implemented' : 'Missing stream or listener',
        passed
      }];
    },
  },
  {
    id: 'node-stream-write',
    title: 'Write Stream',
    description: 'Create a writable stream to "output.txt" using `fs.createWriteStream` and write "Hello World" to it.',
    difficulty: Difficulty.Medium,
    category: 'Events & Streams',
    group: 'Step 3: Events & Streams',
    docsUrl: 'https://nodejs.org/docs/latest/api/fs.html#fscreatewritestreampath-options',
    starterCode: `const fs = require('fs');

// Your code here`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('createWriteStream') && userCode.includes('.write(');
      return [{
        input: 'Code Check',
        expected: 'Write stream and write call',
        actual: passed ? 'Correctly implemented' : 'Missing stream or write',
        passed
      }];
    },
  }
];
