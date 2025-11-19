// Interview questions organized by topic

export interface InterviewQuestion {
  id: string;
  topic: string;
  question: string;
  answer: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const interviewQuestions: InterviewQuestion[] = [
  {
    id: 'basics-1',
    topic: 'JavaScript Basics',
    question: 'What is the difference between var, let, and const in JavaScript?',
    answer: `**var**:
- Function-scoped or globally-scoped
- Can be redeclared and updated
- Hoisted to the top with undefined value
- Does not have block scope

**let**:
- Block-scoped (within {})
- Cannot be redeclared in the same scope
- Can be updated
- Hoisted but not initialized (temporal dead zone)

**const**:
- Block-scoped (within {})
- Cannot be redeclared or reassigned
- Must be initialized at declaration
- For objects/arrays, properties can still be modified (reference is constant)

Example:
\`\`\`javascript
var x = 1; // function/global scope
let y = 2; // block scope
const z = 3; // block scope, immutable binding
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'basics-2',
    topic: 'JavaScript Basics',
    question: 'Explain closures in JavaScript with an example.',
    answer: `A closure is a function that has access to variables in its outer (enclosing) lexical scope, even after the outer function has returned.

**Key Points:**
- Inner function has access to outer function's variables
- Creates private variables
- Maintains state between function calls

**Example:**
\`\`\`javascript
function createCounter() {
  let count = 0; // private variable
  
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2
// count is not directly accessible
\`\`\`

**Use Cases:**
- Data privacy/encapsulation
- Factory functions
- Event handlers
- Callbacks`,
    difficulty: 'Medium'
  },
  {
    id: 'async-1',
    topic: 'Asynchronous JavaScript',
    question: 'What is the difference between Promise.all() and Promise.race()?',
    answer: `**Promise.all()**:
- Waits for ALL promises to resolve
- Returns array of results in same order
- Rejects immediately if ANY promise rejects
- Use when you need all results

**Example:**
\`\`\`javascript
Promise.all([fetch('/api/users'), fetch('/api/posts')])
  .then([users, posts] => {
    // Both completed successfully
  })
  .catch(error => {
    // Any promise failed
  });
\`\`\`

**Promise.race()**:
- Returns when FIRST promise settles (resolves or rejects)
- Returns/rejects with value of first settled promise
- Other promises continue but are ignored
- Use for timeouts or fastest response

**Example:**
\`\`\`javascript
Promise.race([
  fetch('/api/data'),
  new Promise((_, reject) => 
    setTimeout(() => reject('Timeout'), 5000)
  )
])
  .then(data => {
    // First to complete
  })
  .catch(error => {
    // First to reject or timeout
  });
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'dom-1',
    topic: 'DOM & Events',
    question: 'Explain event bubbling and event capturing in JavaScript.',
    answer: `These describe the order in which event handlers are triggered in nested elements.

**Event Capturing (Capture Phase):**
- Event travels DOWN from root to target
- Rarely used
- Set with addEventListener(event, handler, true)

**Event Bubbling (Bubble Phase):**
- Event travels UP from target to root
- Default behavior
- Set with addEventListener(event, handler, false) or omit third parameter

**Event Flow:**
1. Capture phase: window → document → html → body → ... → target parent
2. Target phase: event reaches target element
3. Bubble phase: target parent → ... → body → html → document → window

**Example:**
\`\`\`javascript
<div id="outer">
  <div id="inner">
    <button id="btn">Click</button>
  </div>
</div>

// Bubbling (default)
outer.addEventListener('click', () => console.log('Outer'));
inner.addEventListener('click', () => console.log('Inner'));
btn.addEventListener('click', () => console.log('Button'));

// Click button → Output: Button, Inner, Outer

// Stop propagation
btn.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevents bubbling
  console.log('Button');
});
\`\`\`

**stopPropagation()** vs **stopImmediatePropagation()**:
- stopPropagation(): stops event from bubbling up
- stopImmediatePropagation(): stops bubbling AND other handlers on same element`,
    difficulty: 'Medium'
  },
  {
    id: 'typescript-1',
    topic: 'TypeScript',
    question: 'What are TypeScript Generics and why are they useful?',
    answer: `Generics allow you to write reusable, type-safe code that works with multiple types while maintaining type information.

**Why Use Generics:**
- Type safety without losing flexibility
- Code reusability
- Better IDE autocomplete
- Avoid type assertions and 'any'

**Basic Example:**
\`\`\`typescript
// Without generics (not type-safe)
function identity(arg: any): any {
  return arg;
}

// With generics (type-safe)
function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(42);     // num is number
const str = identity<string>("hello"); // str is string
const bool = identity(true);           // Type inference works
\`\`\`

**Generic Constraints:**
\`\`\`typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): void {
  console.log(arg.length); // Safe: T must have length
}

logLength("hello");    // ✓ string has length
logLength([1, 2, 3]);  // ✓ array has length
logLength(123);        // ✗ Error: number has no length
\`\`\`

**Real-World Example:**
\`\`\`typescript
// API response wrapper
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: number;
  name: string;
}

const response: ApiResponse<User> = {
  data: { id: 1, name: "John" },
  status: 200,
  message: "Success"
};
// response.data is typed as User
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'basics-3',
    topic: 'JavaScript Basics',
    question: 'What is "this" keyword in JavaScript? How does it work?',
    answer: `The "this" keyword refers to the object that is executing the current function. Its value depends on HOW the function is called.

**Rules for "this":**

**1. Global Context:**
\`\`\`javascript
console.log(this); // window (browser) or global (Node.js)
\`\`\`

**2. Object Method:**
\`\`\`javascript
const person = {
  name: 'John',
  greet: function() {
    console.log(this.name); // 'John' - this = person
  }
};
person.greet();
\`\`\`

**3. Regular Function Call:**
\`\`\`javascript
function show() {
  console.log(this); // window (non-strict) or undefined (strict mode)
}
show();
\`\`\`

**4. Arrow Functions:**
\`\`\`javascript
const obj = {
  name: 'Alice',
  regularFunc: function() {
    console.log(this.name); // 'Alice'
  },
  arrowFunc: () => {
    console.log(this.name); // undefined - inherits from parent scope
  }
};
\`\`\`

**5. Constructor Function:**
\`\`\`javascript
function Person(name) {
  this.name = name; // this = new object
}
const p = new Person('Bob');
\`\`\`

**6. Explicit Binding (call, apply, bind):**
\`\`\`javascript
function greet() {
  console.log(this.name);
}
const user = { name: 'Charlie' };
greet.call(user);  // 'Charlie'
greet.apply(user); // 'Charlie'
const boundGreet = greet.bind(user);
boundGreet();      // 'Charlie'
\`\`\`

**Common Pitfall:**
\`\`\`javascript
const obj = {
  name: 'Test',
  method: function() {
    setTimeout(function() {
      console.log(this.name); // undefined - this lost
    }, 100);
  }
};

// Fix with arrow function:
method: function() {
  setTimeout(() => {
    console.log(this.name); // 'Test' - inherits this
  }, 100);
}
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'async-2',
    topic: 'Asynchronous JavaScript',
    question: 'Explain async/await vs Promises. When should you use each?',
    answer: `Async/await is syntactic sugar over Promises, making asynchronous code look synchronous and easier to read.

**Promises:**
\`\`\`javascript
function fetchUser() {
  return fetch('/api/user')
    .then(response => response.json())
    .then(user => {
      console.log(user);
      return fetch(\`/api/posts/\${user.id}\`);
    })
    .then(response => response.json())
    .then(posts => {
      console.log(posts);
    })
    .catch(error => {
      console.error(error);
    });
}
\`\`\`

**Async/Await:**
\`\`\`javascript
async function fetchUser() {
  try {
    const response = await fetch('/api/user');
    const user = await response.json();
    console.log(user);
    
    const postsResponse = await fetch(\`/api/posts/\${user.id}\`);
    const posts = await postsResponse.json();
    console.log(posts);
  } catch (error) {
    console.error(error);
  }
}
\`\`\`

**Key Differences:**

**1. Readability:**
- Async/await: reads like synchronous code
- Promises: chain-based, can get messy with many steps

**2. Error Handling:**
- Async/await: use try/catch (familiar)
- Promises: use .catch()

**3. Debugging:**
- Async/await: easier to debug, clearer stack traces
- Promises: harder to track through chains

**When to Use Promises:**
\`\`\`javascript
// Parallel execution
Promise.all([
  fetch('/api/users'),
  fetch('/api/posts'),
  fetch('/api/comments')
]).then(([users, posts, comments]) => {
  // All completed
});

// Race condition
Promise.race([
  fetch('/api/fast'),
  fetch('/api/slow')
]).then(result => {
  // First to complete
});
\`\`\`

**When to Use Async/Await:**
\`\`\`javascript
// Sequential operations
async function processData() {
  const data = await fetchData();
  const processed = await processData(data);
  const result = await saveData(processed);
  return result;
}

// Conditional logic
async function getUserData(userId) {
  const user = await fetchUser(userId);
  
  if (user.isPremium) {
    return await fetchPremiumData(userId);
  } else {
    return await fetchBasicData(userId);
  }
}
\`\`\`

**Best Practice - Combine Both:**
\`\`\`javascript
async function fetchAllData() {
  try {
    // Parallel execution with async/await
    const [users, posts] = await Promise.all([
      fetch('/api/users').then(r => r.json()),
      fetch('/api/posts').then(r => r.json())
    ]);
    return { users, posts };
  } catch (error) {
    console.error(error);
  }
}
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'basics-4',
    topic: 'JavaScript Basics',
    question: 'What is the difference between == and === in JavaScript?',
    answer: `These are equality operators with different comparison rules.

**== (Loose/Abstract Equality):**
- Compares values after type coercion
- Converts operands to same type before comparison
- Can lead to unexpected results

**=== (Strict Equality):**
- Compares both value AND type
- No type coercion
- Recommended for most cases

**Examples:**
\`\`\`javascript
// == performs type coercion
5 == '5'       // true (string '5' converted to number)
0 == false     // true (false converted to 0)
null == undefined // true (special case)
'' == false    // true (both falsy)
[1] == 1       // true (array converted to primitive)

// === requires same type and value
5 === '5'      // false (different types)
0 === false    // false (number vs boolean)
null === undefined // false (different types)
'' === false   // false (different types)
[1] === 1      // false (object vs number)

// Same results when types match
5 === 5        // true
'hello' === 'hello' // true
true === true  // true
\`\`\`

**Type Coercion Rules for ==:**
\`\`\`javascript
// Weird cases to avoid
[] == ![]      // true (don't ask why)
'' == '0'      // false
0 == ''        // true
0 == '0'       // true

// null and undefined
null == undefined  // true
null == 0         // false
undefined == 0    // false
\`\`\`

**Best Practice:**
\`\`\`javascript
// Always use === unless you have specific reason
if (value === null || value === undefined) {
  // Explicit null/undefined check
}

// Or use nullish coalescing
const result = value ?? 'default';

// Avoid ==
if (value == null) {
  // Only use if you want both null AND undefined
}
\`\`\`

**Exception - Checking for null/undefined:**
\`\`\`javascript
// This is acceptable:
if (value == null) {
  // Catches both null and undefined
}

// Instead of:
if (value === null || value === undefined) {
  // More verbose but clearer
}
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'async-3',
    topic: 'Asynchronous JavaScript',
    question: 'What is the Event Loop in JavaScript? How does it work?',
    answer: `The Event Loop is the mechanism that handles asynchronous operations in JavaScript's single-threaded environment.

**Key Components:**

**1. Call Stack:**
- Executes synchronous code
- LIFO (Last In First Out)
- One thing at a time

**2. Web APIs:**
- Browser-provided APIs (setTimeout, fetch, DOM events)
- Handle async operations outside main thread

**3. Callback Queue (Task Queue):**
- Holds callbacks from async operations
- FIFO (First In First Out)

**4. Microtask Queue:**
- Higher priority than callback queue
- Holds Promise callbacks and MutationObserver

**How It Works:**
\`\`\`javascript
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve().then(() => {
  console.log('3');
});

console.log('4');

// Output: 1, 4, 3, 2
// Explanation:
// 1. '1' - synchronous
// 4. '4' - synchronous
// 3. '3' - microtask (Promise) runs before macrotask
// 2. '2' - macrotask (setTimeout)
\`\`\`

**Execution Order:**
1. Execute all synchronous code (call stack)
2. Process ALL microtasks (Promises, queueMicrotask)
3. Process ONE macrotask (setTimeout, setInterval, I/O)
4. Render if needed
5. Repeat from step 2

**Visual Example:**
\`\`\`javascript
console.log('Start');

setTimeout(() => {
  console.log('Timeout 1');
}, 0);

Promise.resolve()
  .then(() => {
    console.log('Promise 1');
  })
  .then(() => {
    console.log('Promise 2');
  });

setTimeout(() => {
  console.log('Timeout 2');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise 3');
});

console.log('End');

// Output:
// Start
// End
// Promise 1
// Promise 3
// Promise 2
// Timeout 1
// Timeout 2
\`\`\`

**Common Patterns:**

**Blocking the Event Loop:**
\`\`\`javascript
// BAD - blocks everything
function blockingOperation() {
  const start = Date.now();
  while (Date.now() - start < 3000) {
    // Blocks for 3 seconds
  }
}

// GOOD - allows other operations
async function nonBlockingOperation() {
  await new Promise(resolve => setTimeout(resolve, 3000));
}
\`\`\`

**Microtask vs Macrotask:**
\`\`\`javascript
// Macrotasks (lower priority)
setTimeout(() => {}, 0);
setInterval(() => {}, 100);
setImmediate(() => {}); // Node.js
requestAnimationFrame(() => {}); // Browser

// Microtasks (higher priority)
Promise.resolve().then(() => {});
queueMicrotask(() => {});
process.nextTick(() => {}); // Node.js (highest priority)
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'dom-2',
    topic: 'DOM & Events',
    question: 'What is Event Delegation and why is it useful?',
    answer: `Event Delegation is a pattern where you attach a single event listener to a parent element instead of multiple listeners on child elements. It uses event bubbling to handle events.

**Without Event Delegation:**
\`\`\`javascript
// Bad - multiple listeners
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
  button.addEventListener('click', handleClick);
});

// Problem: 
// - Memory intensive for many elements
// - Doesn't work for dynamically added elements
// - Need to remove listeners manually
\`\`\`

**With Event Delegation:**
\`\`\`javascript
// Good - single listener on parent
document.querySelector('#container').addEventListener('click', (e) => {
  if (e.target.matches('button')) {
    handleClick(e);
  }
});

// Benefits:
// - One listener instead of many
// - Works with dynamically added elements
// - Automatic cleanup
\`\`\`

**Real-World Example:**
\`\`\`javascript
// Todo list with event delegation
<ul id="todo-list">
  <li><button class="delete">Delete</button> Task 1</li>
  <li><button class="delete">Delete</button> Task 2</li>
  <li><button class="delete">Delete</button> Task 3</li>
</ul>

// Event delegation approach
document.getElementById('todo-list').addEventListener('click', (e) => {
  // Check if delete button was clicked
  if (e.target.classList.contains('delete')) {
    const li = e.target.closest('li');
    li.remove();
  }
  
  // Check if edit button was clicked
  if (e.target.classList.contains('edit')) {
    const li = e.target.closest('li');
    editTask(li);
  }
});

// Add new item - event delegation still works!
function addTask(text) {
  const li = document.createElement('li');
  li.innerHTML = \`<button class="delete">Delete</button> \${text}\`;
  document.getElementById('todo-list').appendChild(li);
  // No need to add event listener!
}
\`\`\`

**Advanced Pattern:**
\`\`\`javascript
// Generic delegation helper
function delegate(parent, eventType, selector, handler) {
  parent.addEventListener(eventType, (e) => {
    const target = e.target.closest(selector);
    if (target && parent.contains(target)) {
      handler.call(target, e);
    }
  });
}

// Usage
delegate(document, 'click', '.btn-delete', function(e) {
  console.log('Delete clicked', this);
});

delegate(document, 'submit', '.ajax-form', function(e) {
  e.preventDefault();
  submitFormViaAjax(this);
});
\`\`\`

**When to Use:**
✅ Lists with many items
✅ Dynamically generated content
✅ Tables with clickable rows
✅ Toolbar buttons
✅ Navigation menus

**When NOT to Use:**
❌ Focus/blur events (don't bubble)
❌ Mouse enter/leave (use mouseover/mouseout instead)
❌ Events on document/window (already at top)`,
    difficulty: 'Medium'
  },
  {
    id: 'basics-5',
    topic: 'JavaScript Basics',
    question: 'Explain prototypal inheritance in JavaScript.',
    answer: `JavaScript uses prototypal inheritance where objects inherit properties and methods from other objects through a prototype chain.

**Prototype Chain:**
\`\`\`javascript
// Every object has a [[Prototype]] (accessible via __proto__)
const person = {
  greet: function() {
    console.log('Hello');
  }
};

const john = Object.create(person);
john.name = 'John';

john.greet(); // 'Hello' - inherited from person
console.log(john.name); // 'John' - own property

// Prototype chain: john -> person -> Object.prototype -> null
\`\`\`

**Constructor Functions:**
\`\`\`javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Add method to prototype
Person.prototype.greet = function() {
  console.log(\`Hi, I'm \${this.name}\`);
};

Person.prototype.getAge = function() {
  return this.age;
};

const alice = new Person('Alice', 25);
alice.greet(); // 'Hi, I'm Alice'

// alice doesn't have greet() directly
console.log(alice.hasOwnProperty('greet')); // false
console.log(alice.hasOwnProperty('name'));  // true
\`\`\`

**ES6 Classes (Syntactic Sugar):**
\`\`\`javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(\`\${this.name} makes a sound\`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Call parent constructor
    this.breed = breed;
  }
  
  speak() {
    console.log(\`\${this.name} barks\`);
  }
  
  wagTail() {
    console.log('Wagging tail');
  }
}

const dog = new Dog('Rex', 'Labrador');
dog.speak();   // 'Rex barks'
dog.wagTail(); // 'Wagging tail'

// Prototype chain: dog -> Dog.prototype -> Animal.prototype -> Object.prototype -> null
\`\`\`

**Prototype Methods:**
\`\`\`javascript
// Check prototype
Object.getPrototypeOf(dog) === Dog.prototype // true
dog instanceof Dog    // true
dog instanceof Animal // true

// Set prototype
const obj = {};
Object.setPrototypeOf(obj, person);

// Create with specific prototype
const obj2 = Object.create(person);
\`\`\`

**Property Lookup:**
\`\`\`javascript
const obj = {
  a: 1
};

Object.prototype.b = 2;

console.log(obj.a); // 1 (own property)
console.log(obj.b); // 2 (inherited from Object.prototype)
console.log(obj.c); // undefined (not found in chain)

// Lookup order:
// 1. Own properties
// 2. Prototype
// 3. Prototype's prototype
// 4. ... until null
\`\`\`

**Common Patterns:**
\`\`\`javascript
// Mixin pattern
function mixin(target, ...sources) {
  Object.assign(target.prototype, ...sources);
}

const canEat = {
  eat(food) {
    console.log(\`Eating \${food}\`);
  }
};

const canWalk = {
  walk() {
    console.log('Walking');
  }
};

class Person {
  constructor(name) {
    this.name = name;
  }
}

mixin(Person, canEat, canWalk);

const p = new Person('Bob');
p.eat('pizza'); // 'Eating pizza'
p.walk();       // 'Walking'
\`\`\`

**Key Differences from Classical Inheritance:**
- Objects inherit from objects (not classes from classes)
- Dynamic and flexible
- Prototype can be modified at runtime
- Multiple objects can share same prototype`,
    difficulty: 'Hard'
  },
  {
    id: 'typescript-2',
    topic: 'TypeScript',
    question: 'Explain TypeScript Utility Types (Partial, Pick, Omit, etc.)',
    answer: `TypeScript provides built-in utility types for common type transformations.

**1. Partial<T>** - Makes all properties optional:
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; }

function updateUser(id: number, updates: Partial<User>) {
  // Can update any subset of properties
}

updateUser(1, { name: 'John' }); // ✓
updateUser(1, { email: 'john@example.com' }); // ✓
\`\`\`

**2. Required<T>** - Makes all properties required:
\`\`\`typescript
interface Config {
  host?: string;
  port?: number;
}

type RequiredConfig = Required<Config>;
// { host: string; port: number; }
\`\`\`

**3. Pick<T, K>** - Select specific properties:
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

type UserPreview = Pick<User, 'id' | 'name'>;
// { id: number; name: string; }

type Credentials = Pick<User, 'email' | 'password'>;
// { email: string; password: string; }
\`\`\`

**4. Omit<T, K>** - Remove specific properties:
\`\`\`typescript
type UserWithoutPassword = Omit<User, 'password'>;
// { id: number; name: string; email: string; }

type PublicUser = Omit<User, 'password' | 'email'>;
// { id: number; name: string; }
\`\`\`

**5. Record<K, T>** - Create object type with specific keys:
\`\`\`typescript
type Role = 'admin' | 'user' | 'guest';

type Permissions = Record<Role, string[]>;
// {
//   admin: string[];
//   user: string[];
//   guest: string[];
// }

const permissions: Permissions = {
  admin: ['read', 'write', 'delete'],
  user: ['read', 'write'],
  guest: ['read']
};
\`\`\`

**6. Readonly<T>** - Make all properties readonly:
\`\`\`typescript
interface Config {
  apiUrl: string;
  timeout: number;
}

const config: Readonly<Config> = {
  apiUrl: 'https://api.example.com',
  timeout: 5000
};

config.apiUrl = 'other'; // ✗ Error: cannot assign to readonly property
\`\`\`

**7. ReturnType<T>** - Extract return type of function:
\`\`\`typescript
function getUser() {
  return { id: 1, name: 'John', email: 'john@example.com' };
}

type User = ReturnType<typeof getUser>;
// { id: number; name: string; email: string; }
\`\`\`

**8. Parameters<T>** - Extract parameter types:
\`\`\`typescript
function createUser(name: string, age: number, email: string) {
  // ...
}

type CreateUserParams = Parameters<typeof createUser>;
// [string, number, string]
\`\`\`

**9. Exclude<T, U>** - Remove types from union:
\`\`\`typescript
type Status = 'pending' | 'approved' | 'rejected' | 'cancelled';
type ActiveStatus = Exclude<Status, 'cancelled'>;
// 'pending' | 'approved' | 'rejected'
\`\`\`

**10. Extract<T, U>** - Extract types from union:
\`\`\`typescript
type Status = 'pending' | 'approved' | 'rejected' | 'cancelled';
type FinalStatus = Extract<Status, 'approved' | 'rejected'>;
// 'approved' | 'rejected'
\`\`\`

**Real-World Example:**
\`\`\`typescript
// API response transformation
interface ApiUser {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

// Public response (remove sensitive fields)
type PublicUser = Omit<ApiUser, 'password'>;

// Create user request (no id, timestamps)
type CreateUserRequest = Omit<ApiUser, 'id' | 'createdAt' | 'updatedAt'>;

// Update user request (partial, no id)
type UpdateUserRequest = Partial<Omit<ApiUser, 'id' | 'createdAt' | 'updatedAt'>>;

// User preview (just id and name)
type UserPreview = Pick<ApiUser, 'id' | 'name'>;
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'dom-3',
    topic: 'DOM & Events',
    question: 'What is the difference between innerHTML, textContent, and innerText?',
    answer: `These properties are used to get/set content in DOM elements, but they behave differently.

**innerHTML:**
- Gets/sets HTML markup
- Parses HTML tags
- Slower (needs HTML parsing)
- Security risk (XSS vulnerability)

\`\`\`javascript
const div = document.querySelector('div');

div.innerHTML = '<strong>Hello</strong> World';
// Result: <div><strong>Hello</strong> World</div>
// "Hello" appears bold

console.log(div.innerHTML);
// '<strong>Hello</strong> World'
\`\`\`

**textContent:**
- Gets/sets text only
- Ignores HTML tags
- Faster (no HTML parsing)
- Returns ALL text (including hidden)
- Includes text from script/style tags

\`\`\`javascript
div.textContent = '<strong>Hello</strong> World';
// Result: <div>&lt;strong&gt;Hello&lt;/strong&gt; World</div>
// Literal text, no bold

console.log(div.textContent);
// '<strong>Hello</strong> World' (as text)

// Gets hidden text too
<div>
  Visible
  <span style="display: none">Hidden</span>
</div>

console.log(div.textContent); // 'Visible Hidden'
\`\`\`

**innerText:**
- Gets/sets text only
- Ignores HTML tags
- Slower (triggers reflow)
- Returns VISIBLE text only
- Respects CSS styling

\`\`\`javascript
div.innerText = '<strong>Hello</strong> World';
// Same as textContent, shows as text

// Different from textContent with hidden elements
<div>
  Visible
  <span style="display: none">Hidden</span>
</div>

console.log(div.innerText); // 'Visible' (no 'Hidden')
console.log(div.textContent); // 'Visible Hidden'
\`\`\`

**Performance Comparison:**
\`\`\`javascript
// Fastest to slowest:
element.textContent = 'text'; // Fastest
element.innerText = 'text';   // Slow (reflow)
element.innerHTML = 'text';   // Slower (HTML parsing)
\`\`\`

**Security Considerations:**
\`\`\`javascript
// DANGEROUS - XSS vulnerability
const userInput = '<img src=x onerror="alert(XSS)">';
div.innerHTML = userInput; // Script executes! ❌

// SAFE - treats as text
div.textContent = userInput; // Shows as text ✓
div.innerText = userInput;   // Shows as text ✓

// If you need HTML, sanitize first
import DOMPurify from 'dompurify';
div.innerHTML = DOMPurify.sanitize(userInput);
\`\`\`

**When to Use Each:**

**Use textContent when:**
- Setting/getting plain text
- Performance matters
- Need all text (including hidden)
- Most common choice

**Use innerText when:**
- Need only visible text
- Want CSS-aware behavior
- Screen reader considerations

**Use innerHTML when:**
- Need to set HTML markup
- Building dynamic HTML
- Content is trusted/sanitized

**Complete Example:**
\`\`\`javascript
<div id="demo">
  Hello <strong>World</strong>
  <span style="display: none">Hidden</span>
  <script>console.log('script')</script>
</div>

const div = document.getElementById('demo');

console.log(div.innerHTML);
// 'Hello <strong>World</strong> <span style="display: none">Hidden</span><script>console.log('script')</script>'

console.log(div.textContent);
// 'Hello World Hidden console.log('script')'

console.log(div.innerText);
// 'Hello World'
\`\`\`

**Best Practice:**
\`\`\`javascript
// ✓ Good - safe and fast
element.textContent = userInput;

// ✓ Good - when you need HTML
element.innerHTML = sanitizedHTML;

// ❌ Bad - security risk
element.innerHTML = userInput;

// ❌ Bad - slower than textContent
element.innerText = simpleText;
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'basics-6',
    topic: 'JavaScript Basics',
    question: 'What is function currying in JavaScript? Provide an example.',
    answer: `Currying transforms a function with multiple arguments into a sequence of functions that each take a single argument.

**Why use currying?**
- Reusability via partial application
- Improves function composition
- Avoids repeating common params

**Example:**
\`\`\`javascript
// Uncurried
function add(a, b, c) {
  return a + b + c;
}

// Curried
const addC = (a) => (b) => (c) => a + b + c;

console.log(addC(1)(2)(3)); // 6

// Partial application
const add10 = addC(10);
console.log(add10(5)(2)); // 17

// Generic curry helper
const curry = (fn) => (...args) =>
  args.length >= fn.length
    ? fn(...args)
    : (...rest) => curry(fn)(...args, ...rest);

const sum3 = (a, b, c) => a + b + c;
const curriedSum3 = curry(sum3);
console.log(curriedSum3(1)(2)(3)); // 6
\`\`\`

**When to use**
- Configurable utilities (e.g., loggers)
- Building pipelines with shared params
- Event handlers with preset options`,
    difficulty: 'Medium'
  },
  {
    id: 'async-4',
    topic: 'Asynchronous JavaScript',
    question: 'Debounce vs Throttle: What are they and when to use each?',
    answer: `Both limit how often a function runs in response to frequent events (scroll, resize, keypress), but they behave differently.

**Debounce**
- Waits for a pause in calls; runs after N ms of inactivity
- Resets timer on each call
- Use when you want the final result after user stops typing/scrolling

**Throttle**
- Guarantees execution at most once every N ms
- Ignores calls during the cooldown window
- Use when you want regular updates at a steady rate

**Implementations:**
\`\`\`javascript
// Debounce
function debounce(fn, wait) {
  let t;
  return function(...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

// Throttle (timestamp-based)
function throttle(fn, wait) {
  let last = 0;
  return function(...args) {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn.apply(this, args);
    }
  };
}

// Throttle (timeout-based trailing)
function throttleTrailing(fn, wait) {
  let throttling = false;
  let savedArgs, savedThis;
  return function wrapper(...args) {
    if (throttling) {
      savedArgs = args;
      savedThis = this;
      return;
    }
    fn.apply(this, args);
    throttling = true;
    setTimeout(() => {
      throttling = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, wait);
  };
}
\`\`\`

**When to use**
- Debounce: search input, auto-save, window resize end
- Throttle: scroll position updates, drag handlers, rate-limited APIs`,
    difficulty: 'Easy'
  },
  {
    id: 'react-1',
    topic: 'React',
    question: 'What is the Virtual DOM and how does it work?',
    answer: `The Virtual DOM (VDOM) is a lightweight copy of the actual DOM in memory. React uses it to improve performance by minimizing direct DOM manipulation.

**How it works:**
1. **Render Phase**: When state/props change, React creates a new Virtual DOM tree.
2. **Diffing**: React compares the new VDOM with the previous VDOM (Diffing Algorithm).
3. **Reconciliation**: It calculates the minimum number of changes needed.
4. **Commit Phase**: React updates the real DOM with only those specific changes.

**Benefits:**
- Faster updates (batching)
- Cross-platform (React Native)
- Declarative API (you don't manually touch DOM)

**Real DOM vs Virtual DOM:**
| Real DOM | Virtual DOM |
|----------|-------------|
| Slow to update | Fast to update |
| Can directly update HTML | Can't directly update HTML |
| Creates a new DOM if element updates | Updates the JSX if element updates |
| DOM manipulation is expensive | DOM manipulation is easy |`,
    difficulty: 'Medium'
  },
  {
    id: 'react-2',
    topic: 'React',
    question: 'Explain the useEffect hook and its dependency array.',
    answer: `useEffect handles side effects in functional components (fetching data, subscriptions, manual DOM changes).

**Syntax:**
\`\`\`javascript
useEffect(() => {
  // Effect code
  return () => {
    // Cleanup code (optional)
  };
}, [dependencies]);
\`\`\`

**Dependency Array Rules:**
1. **No Array (omitted)**: Runs after EVERY render.
   \`\`\`javascript
   useEffect(() => { console.log('Runs always'); });
   \`\`\`

2. **Empty Array ([])**: Runs ONLY on mount (once).
   \`\`\`javascript
   useEffect(() => { console.log('Runs once'); }, []);
   \`\`\`

3. **With Dependencies ([prop, state])**: Runs on mount AND when any dependency changes.
   \`\`\`javascript
   useEffect(() => { console.log('Runs when count changes'); }, [count]);
   \`\`\`

**Cleanup Function:**
- Runs before the component unmounts
- Runs before re-running the effect (if dependencies changed)
- Used for clearing timers, removing event listeners, cancelling requests.

**Common Mistake:**
Missing dependencies in the array can lead to stale closures or infinite loops.`,
    difficulty: 'Medium'
  },
  {
    id: 'css-1',
    topic: 'CSS',
    question: 'What is the difference between Flexbox and Grid?',
    answer: `Both are powerful layout systems in CSS, but they serve different purposes.

**Flexbox (Flexible Box Layout):**
- **1-Dimensional**: Layouts in a row OR a column.
- **Content-First**: Layout is based on the content size.
- **Use Cases**: Navbars, centering items, aligning items in a single line, distributing space.

**CSS Grid:**
- **2-Dimensional**: Layouts in rows AND columns simultaneously.
- **Layout-First**: You define the grid structure, then place content in it.
- **Use Cases**: distinct page layouts, complex dashboards, image galleries, aligning items in both directions.

**Comparison:**
| Feature | Flexbox | Grid |
|---------|---------|------|
| Axis | Single (X or Y) | Dual (X and Y) |
| Control | Content drives layout | Container drives layout |
| Overlap | Hard to overlap items | Easy to overlap items |
| Alignment | Good for alignment | Good for layout structure |

**Example:**
\`\`\`css
/* Flexbox */
.container {
  display: flex;
  justify-content: center; /* Main axis */
  align-items: center;     /* Cross axis */
}

/* Grid */
.container {
  display: grid;
  grid-template-columns: 1fr 2fr; /* 2 columns */
  grid-template-rows: auto 100px; /* 2 rows */
}
\`\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'js-currying',
    topic: 'JavaScript Basics',
    question: 'What is Currying in JavaScript?',
    answer: `Currying is a functional programming technique where a function with multiple arguments is transformed into a sequence of functions, each taking a single argument.

**Concept:**
\`f(a, b, c)\` becomes \`f(a)(b)(c)\`

**Why use it?**
- **Reusability**: Create specialized functions from generic ones.
- **Composition**: Easier to compose small functions.
- **Avoid repetitive arguments**.

**Example:**
\`\`\`javascript
// Normal function
function add(a, b) {
  return a + b;
}
add(2, 3); // 5

// Curried function
function curriedAdd(a) {
  return function(b) {
    return a + b;
  };
}
// Or with arrow functions
const arrowAdd = a => b => a + b;

curriedAdd(2)(3); // 5
arrowAdd(2)(3);   // 5
\`\`\`

**Practical Use Case:**
\`\`\`javascript
const log = (date) => (importance) => (message) => {
  console.log(\`[\${date.getHours()}:\${date.getMinutes()}] [\${importance}] \${message}\`);
};

// Create a specialized logger
const logNow = log(new Date());
const logError = logNow('ERROR');

logError('Something went wrong'); 
// Output: [14:30] [ERROR] Something went wrong
\`\`\`\``,
    difficulty: 'Hard'
  },
  // MongoDB Questions
  {
    id: 'mongo-1',
    topic: 'MongoDB',
    question: 'What is MongoDB and how does it differ from relational databases?',
    answer: `MongoDB is a NoSQL document-oriented database. It stores data in flexible JSON-like BSON documents, allowing for dynamic schemas. Unlike relational databases, it does not require predefined tables or joins, offering horizontal scaling and high performance for unstructured data.`,
    difficulty: 'Easy'
  },
  {
    id: 'mongo-2',
    topic: 'MongoDB',
    question: 'Explain the concept of a collection and a document in MongoDB.',
    answer: `A collection is analogous to a table in relational databases; it groups BSON documents. A document is a single record stored as a JSON-like structure with fields and values, supporting nested objects and arrays.`,
    difficulty: 'Easy'
  },
  {
    id: 'mongo-3',
    topic: 'MongoDB',
    question: 'What is the purpose of the _id field in MongoDB documents?',
    answer: `The _id field is a unique identifier for each document in a collection. By default, MongoDB generates an ObjectId, but you can provide a custom value. It ensures each document can be uniquely retrieved.`,
    difficulty: 'Easy'
  },
  {
    id: 'mongo-4',
    topic: 'MongoDB',
    question: 'How does indexing improve query performance in MongoDB?',
    answer: `Indexes create a data structure that allows MongoDB to quickly locate documents without scanning the entire collection. They can be created on single fields, compound fields, or even hashed values, reducing query latency.`,
    difficulty: 'Medium'
  },
  {
    id: 'mongo-5',
    topic: 'MongoDB',
    question: 'What is a capped collection and when would you use it?',
    answer: `A capped collection is a fixed-size circular collection that maintains insertion order. It overwrites the oldest entries when the size limit is reached. Useful for logging, real-time data streams, or FIFO queues.`,
    difficulty: 'Medium'
  },
  {
    id: 'mongo-6',
    topic: 'MongoDB',
    question: 'Explain the difference between find() and findOne() methods.',
    answer: `find() returns a cursor to all matching documents, which can be iterated or converted to an array. findOne() returns the first matching document directly, or null if none found.`,
    difficulty: 'Easy'
  },
  {
    id: 'mongo-7',
    topic: 'MongoDB',
    question: 'What are aggregation pipelines and why are they useful?',
    answer: `Aggregation pipelines process data through a sequence of stages (e.g., $match, $group, $project) to transform and compute results. They enable complex data analysis, grouping, and reshaping directly within the database.`,
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
  // React Questions
  {
    id: 'react-1',
    topic: 'React',
    question: 'What is the virtual DOM and how does React use it?',
    answer: `The virtual DOM is an in‑memory representation of the real DOM. React updates this lightweight copy on state changes, then diffs it against the previous version and applies only the minimal necessary changes to the real DOM, improving performance.`,
    difficulty: 'Medium'
  },
  {
    id: 'react-2',
    topic: 'React',
    question: 'Explain the purpose of keys in a list rendered by React.',
    answer: `Keys help React identify which items have changed, been added, or removed. They should be stable, unique identifiers so that React can efficiently reorder elements without re‑creating DOM nodes.`,
    difficulty: 'Easy'
  },
  {
    id: 'react-3',
    topic: 'React',
    question: 'What are React hooks and why were they introduced?',
    answer: `Hooks are functions that let you use state and other React features in functional components. They were introduced to avoid class components, promote code reuse, and simplify component logic.`,
    difficulty: 'Easy'
  },
  {
    id: 'react-4',
    topic: 'React',
    question: 'How does useEffect differ from componentDidMount/componentDidUpdate?',
    answer: `useEffect runs after render and can be configured with a dependency array. With an empty array it mimics componentDidMount, and with specific dependencies it runs when those values change, covering componentDidUpdate behavior.`,
    difficulty: 'Medium'
  },
  {
    id: 'react-5',
    topic: 'React',
    question: 'What is the purpose of useMemo and when should you use it?',
    answer: `useMemo memoizes a computed value between renders. Use it for expensive calculations that should only re‑run when their dependencies change, preventing unnecessary work.`,
    difficulty: 'Medium'
  },
  {
    id: 'react-6',
    topic: 'React',
    question: 'Explain the difference between controlled and uncontrolled components.',
    answer: `Controlled components have their value managed by React state via onChange handlers. Uncontrolled components store their own internal state, accessed via refs. Controlled gives full React control, while uncontrolled is simpler for simple forms.`,
    difficulty: 'Easy'
  },
  {
    id: 'react-7',
    topic: 'React',
    question: 'What is React Context and when would you use it?',
    answer: `Context provides a way to pass data through the component tree without prop‑drilling. Use it for global values like theme, locale, or authenticated user that many components need.`,
    difficulty: 'Medium'
  },
  {
    id: 'react-8',
    topic: 'React',
    question: 'How does React.memo improve performance?',
    answer: `React.memo is a higher‑order component that memoizes a functional component’s rendered output. It prevents re‑rendering when props haven’t changed, similar to shouldComponentUpdate for class components.`,
    difficulty: 'Medium'
  },
  {
    id: 'react-9',
    topic: 'React',
    question: 'What are custom hooks and how do you create one?',
    answer: `Custom hooks are reusable functions that encapsulate hook logic. Create one by defining a function that calls built‑in hooks and returns whatever you need (state, handlers, etc.). Prefix the name with “use”.`,
    difficulty: 'Easy'
  },
  {
    id: 'react-10',
    topic: 'React',
    question: 'Explain the concept of lifting state up.',
    answer: `Lifting state up means moving shared state to the nearest common ancestor so multiple child components can read and modify it via props, ensuring a single source of truth.`,
    difficulty: 'Easy'
  },
  {
    id: 'react-11',
    topic: 'React',
    question: 'What is the purpose of the useRef hook?',
    answer: `useRef returns a mutable ref object whose .current property persists across renders. It’s used to access DOM nodes or store mutable values that don’t trigger re‑renders when changed.`,
    difficulty: 'Easy'
  },
  {
    id: 'react-12',
    topic: 'React',
    question: 'How does React handle events differently from plain HTML?',
    answer: `React uses a synthetic event system that normalizes events across browsers and pools them for performance. Handlers are passed as camelCase props (e.g., onClick) instead of HTML attributes.`,
    difficulty: 'Medium'
  },
  {
    id: 'react-13',
    topic: 'React',
    question: 'What is the difference between React.lazy and code‑splitting with dynamic import?',
    answer: `React.lazy is a helper that lets you render a dynamically imported component as a lazy‑loaded component, automatically handling the loading state. Dynamic import alone just returns a promise; you need to manage the component rendering yourself.`,
    difficulty: 'Medium'
  },
  {
    id: 'react-14',
    topic: 'React',
    question: 'Explain the role of the key prop in React.Fragment.',
    answer: `When rendering multiple fragments, a key prop lets React differentiate each fragment in the list, enabling proper reconciliation and avoiding warnings.`,
    difficulty: 'Easy'
  },
  {
    id: 'react-15',
    topic: 'React',
    question: 'What are error boundaries and how do you implement one?',
    answer: `Error boundaries are React components that catch JavaScript errors in their child tree during rendering, lifecycle methods, or constructors. Implement by defining a class component with static getDerivedStateFromError and componentDidCatch, then render a fallback UI.`,
    difficulty: 'Medium'
  },
  {
    id: 'react-16',
    topic: 'React',
    question: 'How does the useCallback hook help with performance?',
    answer: `useCallback returns a memoized version of a callback function that only changes when its dependencies change. It prevents unnecessary re‑creation of functions, useful when passing callbacks to memoized child components.`,
    difficulty: 'Medium'
  },
  {
    id: 'react-17',
    topic: 'React',
    question: 'What is the purpose of the React.StrictMode component?',
    answer: `StrictMode activates additional checks and warnings for its descendants in development mode, such as detecting unsafe lifecycles, legacy API usage, and unexpected side effects.`,
    difficulty: 'Easy'
  },
  {
    id: 'react-18',
    topic: 'React',
    question: 'Explain the difference between client‑side rendering and server‑side rendering in React.',
    answer: `Client‑side rendering renders components in the browser after JavaScript loads, while server‑side rendering (SSR) generates HTML on the server for the initial request, improving SEO and perceived load time.`,
    difficulty: 'Medium'
  },
  {
    id: 'react-19',
    topic: 'React',
    question: 'What is the purpose of the React Profiler API?',
    answer: `The Profiler measures rendering performance of React components, providing timing information for each commit. It helps identify performance bottlenecks in the UI.`,
    difficulty: 'Medium'
  },
  {
    id: 'react-20',
    topic: 'React',
    question: 'How do you prevent memory leaks with useEffect?',
    answer: `Return a cleanup function from useEffect to unsubscribe from subscriptions, clear timers, or cancel async operations when the component unmounts or before the effect re‑runs.`,
    difficulty: 'Medium'
  },

  // Express / Backend Questions
  {
    id: 'express-1',
    topic: 'Express',
    question: 'What is Express.js and why would you use it?',
    answer: `Express is a minimal, unopinionated web framework for Node.js that simplifies building web servers and APIs by providing routing, middleware, and request/response handling.`,
    difficulty: 'Easy'
  },
  {
    id: 'express-2',
    topic: 'Express',
    question: 'How do you define a route that handles GET requests in Express?',
    answer: `app.get('/path', (req, res) => { res.send('response'); });`,
    difficulty: 'Easy'
  },
  {
    id: 'express-3',
    topic: 'Express',
    question: 'Explain middleware in Express and the order of execution.',
    answer: `Middleware are functions that have access to req, res, and next. They run sequentially in the order they are added via app.use or route definitions, allowing you to modify request/response or terminate the chain.`,
    difficulty: 'Medium'
  },
  {
    id: 'express-4',
    topic: 'Express',
    question: 'How do you serve static files in an Express app?',
    answer: `app.use(express.static('public')); // Serves files from the public directory`,
    difficulty: 'Easy'
  },
  {
    id: 'express-5',
    topic: 'Express',
    question: 'What is the purpose of body‑parser middleware?',
    answer: `It parses incoming request bodies (JSON, URL‑encoded, etc.) and makes the parsed data available on req.body, enabling easy access to client‑sent data.`,
    difficulty: 'Easy'
  },
  {
    id: 'express-6',
    topic: 'Express',
    question: 'How can you handle errors globally in Express?',
    answer: `Define an error‑handling middleware with four arguments: (err, req, res, next). Place it after all routes; Express will pass errors to it.`,
    difficulty: 'Medium'
  },
  {
    id: 'express-7',
    topic: 'Express',
    question: 'Explain the difference between app.use and app.all.',
    answer: `app.use registers middleware for all HTTP methods and paths (optionally filtered). app.all registers a handler for all HTTP methods for a specific path.`,
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
    id: 'ts-3',
    topic: 'TypeScript',
    question: 'What are the differences between Interface and Type in TypeScript?',
    answer: `**Interface**:
- Can be merged (declaration merging)
- Better error messages in some cases
- Can only describe shapes of objects

**Type**:
- Can describe any type (primitives, unions, intersections)
- Cannot be merged
- More flexible for complex type manipulations

**Example:**
\`\`\`typescript
interface User {
  name: string;
}
interface User {
  age: number;
}
// User has both name and age

type ID = string | number; // Union type (only possible with type)
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'ts-4',
    topic: 'TypeScript',
    question: 'What are Generics in TypeScript?',
    answer: `Generics allow you to create reusable components that work with a variety of types rather than a single one. They provide a way to capture the type of the argument so that we can use it to denote what is being returned.

**Example:**
\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString");
// Type of output will be 'string'
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'ts-5',
    topic: 'TypeScript',
    question: 'Explain the "any", "unknown", and "never" types.',
    answer: `**any**:
- Disables type checking
- Allows any operation
- Unsafe

**unknown**:
- Safer alternative to any
- Must perform type checking before performing operations
- "I don't know what this is yet"

**never**:
- Represents values that never occur
- Return type of functions that throw errors or infinite loops
- Used in exhaustive type checking`,
    difficulty: 'Medium'
  },
  {
    id: 'ts-6',
    topic: 'TypeScript',
    question: 'What is a Union Type?',
    answer: `A Union Type describes a value that can be one of several types. We use the vertical bar (|) to separate each type.

**Example:**
\`\`\`typescript
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'ts-7',
    topic: 'TypeScript',
    question: 'What is an Intersection Type?',
    answer: `An Intersection Type combines multiple types into one. This allows you to add together existing types to get a single type that has all the features you need.

**Example:**
\`\`\`typescript
interface ErrorHandling {
  success: boolean;
  error?: { message: string };
}

interface ArtworksData {
  artworks: { title: string }[];
}

type ArtworksResponse = ArtworksData & ErrorHandling;
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'ts-8',
    topic: 'TypeScript',
    question: 'What are Enums?',
    answer: `Enums allow a developer to define a set of named constants. Using enums can make it easier to document intent, or create a set of distinct cases. TypeScript provides both numeric and string-based enums.

**Example:**
\`\`\`typescript
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'ts-9',
    topic: 'TypeScript',
    question: 'What is Type Inference?',
    answer: `Type inference is used to provide type information when there is no explicit type annotation. For example, in this code, TypeScript infers that x is a number:

\`\`\`typescript
let x = 3;
// x is inferred as number
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'ts-10',
    topic: 'TypeScript',
    question: 'What are Decorators?',
    answer: `Decorators provide a way to add both annotations and a meta-programming syntax for class declarations and members. They are a stage 2 proposal for JavaScript and are available as an experimental feature in TypeScript.

**Example:**
\`\`\`typescript
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class BugReport {
  type = "report";
  title: string;
  constructor(t: string) {
    this.title = t;
  }
}
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'ts-11',
    topic: 'TypeScript',
    question: 'What is the "readonly" modifier?',
    answer: `The \`readonly\` modifier makes a property immutable. It can only be assigned to in the constructor or at the point of declaration.

**Example:**
\`\`\`typescript
interface Point {
  readonly x: number;
  readonly y: number;
}
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'ts-12',
    topic: 'TypeScript',
    question: 'What are Mapped Types?',
    answer: `Mapped types allow you to create new types based on old ones by transforming properties.

**Example:**
\`\`\`typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'ts-13',
    topic: 'TypeScript',
    question: 'What is "keyof" operator?',
    answer: `The \`keyof\` operator takes an object type and produces a string or numeric literal union of its keys.

**Example:**
\`\`\`typescript
type Point = { x: number; y: number };
type P = keyof Point; // "x" | "y"
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'ts-14',
    topic: 'TypeScript',
    question: 'What are Type Guards?',
    answer: `Type guards are expressions that perform a runtime check that guarantees the type in some scope.

**Example:**
\`\`\`typescript
function isString(test: any): test is string {
  return typeof test === "string";
}
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'ts-15',
    topic: 'TypeScript',
    question: 'What is the difference between "null" and "undefined" in TypeScript?',
    answer: `In TypeScript (and JS), \`undefined\` means a variable has been declared but not defined. \`null\` is an assignment value. It can be assigned to a variable as a representation of no value.

By default \`null\` and \`undefined\` are subtypes of all other types.`,
    difficulty: 'Easy'
  },
  {
    id: 'ts-16',
    topic: 'TypeScript',
    question: 'What is a Tuple?',
    answer: `Tuple types allow you to express an array with a fixed number of elements whose types are known, but need not be the same.

**Example:**
\`\`\`typescript
let x: [string, number];
x = ["hello", 10]; // OK
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'ts-17',
    topic: 'TypeScript',
    question: 'What is "this" in TypeScript?',
    answer: `TypeScript infers 'this' in functions, but you can also explicitly type it as the first parameter of a function (which is erased during compilation).

**Example:**
\`\`\`typescript
function f(this: void) {
  // make sure \`this\` is unusable in this standalone function
}
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'ts-18',
    topic: 'TypeScript',
    question: 'What are Ambient Declarations?',
    answer: `Ambient declarations tell the compiler about the shape of code that exists elsewhere (e.g., in a library included via script tag). They are usually in \`.d.ts\` files and use the \`declare\` keyword.`,
    difficulty: 'Hard'
  },
  {
    id: 'ts-19',
    topic: 'TypeScript',
    question: 'What is Conditional Type?',
    answer: `Conditional types take a form that looks a little like conditional expressions (\`condition ? trueExpression : falseExpression\`) in JavaScript.

**Example:**
\`\`\`typescript
type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'ts-20',
    topic: 'TypeScript',
    question: 'What is Utility Type "Partial<T>"?',
    answer: `Constructs a type with all properties of Type set to optional. This utility will return a type that represents all subsets of a given type.

**Example:**
\`\`\`typescript
interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}
\`\`\``,
    difficulty: 'Medium'
  },

  // HTML & CSS Questions
  {
    id: 'html-css-1',
    topic: 'HTML & CSS',
    question: 'What is the Box Model?',
    answer: `The CSS Box Model is a box that wraps around every HTML element. It consists of:
1.  **Content**: The actual content of the box, where text and images appear.
2.  **Padding**: Clears an area around the content. The padding is transparent.
3.  **Border**: A border that goes around the padding and content.
4.  **Margin**: Clears an area outside the border. The margin is transparent.`,
    difficulty: 'Easy'
  },
  {
    id: 'html-css-2',
    topic: 'HTML & CSS',
    question: 'What is the difference between "display: none" and "visibility: hidden"?',
    answer: `**display: none**:
- The element is removed from the document flow.
- It takes up no space.
- It is ignored by screen readers.

**visibility: hidden**:
- The element is hidden but still takes up space in the layout.
- It affects the layout of other elements.`,
    difficulty: 'Easy'
  },
  {
    id: 'html-css-3',
    topic: 'HTML & CSS',
    question: 'What are Semantic Elements in HTML?',
    answer: `Semantic elements clearly describe their meaning to both the browser and the developer.

**Examples:**
- \`<header>\`, \`<footer>\`, \`<article>\`, \`<section>\`
- \`<form>\`, \`<table>\`

**Non-semantic:**
- \`<div>\`, \`<span>\` (tell nothing about their content)`,
    difficulty: 'Easy'
  },
  {
    id: 'html-css-4',
    topic: 'HTML & CSS',
    question: 'What is Flexbox?',
    answer: `Flexbox (Flexible Box Layout) is a one-dimensional layout method for laying out items in rows or columns. Items flex to fill additional space and shrink to fit into smaller spaces.

**Key Properties:**
- \`flex-direction\`
- \`justify-content\`
- \`align-items\`
- \`flex-wrap\``,
    difficulty: 'Medium'
  },
  {
    id: 'html-css-5',
    topic: 'HTML & CSS',
    question: 'What is CSS Grid?',
    answer: `CSS Grid Layout is a two-dimensional layout system for the web. It lets you lay out items in rows and columns.

**Key Properties:**
- \`grid-template-columns\`
- \`grid-template-rows\`
- \`grid-gap\`
- \`grid-area\``,
    difficulty: 'Medium'
  },
  {
    id: 'html-css-6',
    topic: 'HTML & CSS',
    question: 'What is the "z-index" property?',
    answer: `The \`z-index\` property specifies the stack order of an element. An element with greater stack order is always in front of an element with a lower stack order. It only works on positioned elements (\`position: absolute\`, \`position: relative\`, \`position: fixed\`, or \`position: sticky\`).`,
    difficulty: 'Easy'
  },
  {
    id: 'html-css-7',
    topic: 'HTML & CSS',
    question: 'What are Pseudo-classes?',
    answer: `A pseudo-class is used to define a special state of an element.

**Examples:**
- \`:hover\`
- \`:active\`
- \`:focus\`
- \`:first-child\`
- \`:nth-child(n)\``,
    difficulty: 'Medium'
  },
  {
    id: 'html-css-8',
    topic: 'HTML & CSS',
    question: 'What is Specificity in CSS?',
    answer: `Specificity is the means by which browsers decide which CSS property values are the most relevant to an element and, therefore, will be applied.

**Hierarchy (Low to High):**
1.  Element selectors (h1, p)
2.  Class selectors (.example), attribute selectors, pseudo-classes
3.  ID selectors (#example)
4.  Inline styles
5.  !important`,
    difficulty: 'Hard'
  },
  {
    id: 'html-css-9',
    topic: 'HTML & CSS',
    question: 'What is the difference between "relative", "absolute", "fixed", and "sticky" positioning?',
    answer: `**relative**: Positioned relative to its normal position.
**absolute**: Positioned relative to the nearest positioned ancestor.
**fixed**: Positioned relative to the viewport (stays in place on scroll).
**sticky**: Toggles between relative and fixed depending on scroll position.`,
    difficulty: 'Medium'
  },
  {
    id: 'html-css-10',
    topic: 'HTML & CSS',
    question: 'What are Media Queries?',
    answer: `Media queries allow you to apply CSS styles depending on a device's general type (such as print vs. screen) or specific characteristics (such as the width of the viewport).

**Example:**
\`\`\`css
@media (max-width: 600px) {
  body {
    background-color: lightblue;
  }
}
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'html-css-11',
    topic: 'HTML & CSS',
    question: 'What is the difference between "px", "em", and "rem"?',
    answer: `**px**: Absolute unit (pixels).
**em**: Relative to the font-size of the element (2em means 2 times the size of the current font).
**rem**: Relative to the font-size of the root element (html).`,
    difficulty: 'Medium'
  },
  {
    id: 'html-css-12',
    topic: 'HTML & CSS',
    question: 'What is the DOCTYPE?',
    answer: `The \`<!DOCTYPE html>\` declaration is not an HTML tag; it is an instruction to the web browser about what version of HTML the page is written in. It ensures the browser renders the page in "Standard Mode" rather than "Quirks Mode".`,
    difficulty: 'Easy'
  },
  {
    id: 'html-css-13',
    topic: 'HTML & CSS',
    question: 'What are data- attributes?',
    answer: `\`data-*\` attributes allow us to store extra information on standard, semantic HTML elements without other hacks such as non-standard attributes or extra properties on DOM.`,
    difficulty: 'Easy'
  },
  {
    id: 'html-css-14',
    topic: 'HTML & CSS',
    question: 'What is the difference between localStorage, sessionStorage, and cookies?',
    answer: `**localStorage**: Stores data with no expiration date.
**sessionStorage**: Stores data for one session (data is lost when the browser tab is closed).
**Cookies**: Stores data that has to be sent back to the server with subsequent requests. Has expiration.`,
    difficulty: 'Medium'
  },
  {
    id: 'html-css-15',
    topic: 'HTML & CSS',
    question: 'What is the purpose of the "alt" attribute on images?',
    answer: `The \`alt\` attribute provides alternative text for an image if the user for some reason cannot view it (slow connection, error in src, or if the user uses a screen reader).`,
    difficulty: 'Easy'
  },
  {
    id: 'html-css-16',
    topic: 'HTML & CSS',
    question: 'What is the CSS "calc()" function?',
    answer: `The \`calc()\` function allows you to perform calculations to determine CSS property values.

**Example:**
\`\`\`css
width: calc(100% - 100px);
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'html-css-17',
    topic: 'HTML & CSS',
    question: 'What are CSS Variables (Custom Properties)?',
    answer: `CSS variables are entities defined by CSS authors that contain specific values to be reused throughout a document.

**Example:**
\`\`\`css
:root {
  --main-bg-color: coral;
}
body {
  background-color: var(--main-bg-color);
}
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'html-css-18',
    topic: 'HTML & CSS',
    question: 'What is BEM methodology?',
    answer: `BEM stands for Block Element Modifier. It is a naming convention for classes in HTML and CSS.

**Structure:**
- **Block**: Standalone entity that is meaningful on its own (\`.header\`, \`.container\`).
- **Element**: A part of a block that has no standalone meaning and is semantically tied to its block (\`.header__menu\`).
- **Modifier**: A flag on a block or element. Use them to change appearance or behavior (\`.header__menu--active\`).`,
    difficulty: 'Hard'
  },
  {
    id: 'html-css-19',
    topic: 'HTML & CSS',
    question: 'What is the difference between "inline", "inline-block", and "block"?',
    answer: `**block**: Starts on a new line and takes up the full width available.
**inline**: Does not start on a new line and only takes up as much width as necessary. Cannot set width/height.
**inline-block**: Like inline, but allows setting width and height.`,
    difficulty: 'Easy'
  },
  {
    id: 'html-css-20',
    topic: 'HTML & CSS',
    question: 'What is the Shadow DOM?',
    answer: `The Shadow DOM is a browser technology designed primarily for scoping variables and CSS in web components. It allows you to attach a hidden DOM tree to an element in the regular DOM tree.`,
    difficulty: 'Hard'
  },

  // Node.js Questions
  {
    id: 'node-1',
    topic: 'Node.js',
    question: 'What is Node.js?',
    answer: `Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a web browser. It is built on Chrome's V8 JavaScript engine.`,
    difficulty: 'Easy'
  },
  {
    id: 'node-2',
    topic: 'Node.js',
    question: 'What is the Event Loop in Node.js?',
    answer: `The Event Loop is what allows Node.js to perform non-blocking I/O operations despite the fact that JavaScript is single-threaded. It offloads operations to the system kernel whenever possible.`,
    difficulty: 'Hard'
  },
  {
    id: 'node-3',
    topic: 'Node.js',
    question: 'What is the difference between "require()" and "import"?',
    answer: `**require()**:
- CommonJS module system
- Synchronous loading
- Dynamic (can be called anywhere)

**import**:
- ES6 module system
- Asynchronous loading
- Static (must be at top of file)`,
    difficulty: 'Medium'
  },
  {
    id: 'node-4',
    topic: 'Node.js',
    question: 'What is Middleware in Express?',
    answer: `Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. They can execute code, modify req/res, end the cycle, or call the next middleware.`,
    difficulty: 'Medium'
  },
  {
    id: 'node-5',
    topic: 'Node.js',
    question: 'What is "package.json"?',
    answer: `The \`package.json\` file is the heart of any Node.js project. It records important metadata about a project which is required before publishing to NPM, and also defines functional attributes of a project that npm uses to install dependencies, run scripts, and identify the entry point to our package.`,
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
  }
];

// Get interview questions for a specific topic
export const getInterviewQuestionsByTopic = (topic: string): InterviewQuestion[] => {
  return interviewQuestions.filter(q => q.topic === topic);
};

// Get all unique topics
export const getAllTopics = (): string[] => {
  return Array.from(new Set(interviewQuestions.map(q => q.topic)));
};

// Get random interview questions (limit to 5)
export const getRandomInterviewQuestions = (count: number = 5): InterviewQuestion[] => {
  const shuffled = [...interviewQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
};
