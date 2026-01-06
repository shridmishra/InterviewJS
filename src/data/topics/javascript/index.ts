import { TopicQuestion } from '../types';

export const jsQuestions: TopicQuestion[] = [
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
 Lists with many items
 Dynamically generated content
 Tables with clickable rows
 Toolbar buttons
 Navigation menus

**When NOT to Use:**
 Focus/blur events (don't bubble)
 Mouse enter/leave (use mouseover/mouseout instead)
 Events on document/window (already at top)`,
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
div.innerHTML = userInput; // Script executes! 

// SAFE - treats as text
div.textContent = userInput; // Shows as text 
div.innerText = userInput;   // Shows as text 

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
//  Good - safe and fast
element.textContent = userInput;

//  Good - when you need HTML
element.innerHTML = sanitizedHTML;

//  Bad - security risk
element.innerHTML = userInput;

//  Bad - slower than textContent
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
  // Error Handling
  {
    id: 'error-handling-1',
    topic: 'Error Handling',
    question: 'How does try/catch/finally work in JavaScript? When should you use each block?',
    answer: `\`try/catch/finally\` is JavaScript's mechanism for handling runtime errors gracefully.

**Structure:**
\`\`\`javascript
try {
  // Code that might throw an error
  riskyOperation();
} catch (error) {
  // Handle the error
  console.error(error.message);
} finally {
  // Always runs, regardless of error
  cleanup();
}
\`\`\`

**Key Points:**
- **try**: Contains code that might throw an error
- **catch**: Executes only if an error is thrown
- **finally**: Always executes (even if there's a return in try/catch)

**Error Object Properties:**
\`\`\`javascript
try {
  throw new Error('Something went wrong');
} catch (error) {
  console.log(error.name);    // 'Error'
  console.log(error.message); // 'Something went wrong'
  console.log(error.stack);   // Stack trace
}
\`\`\`

**Async Error Handling:**
\`\`\`javascript
// With async/await
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    return await response.json();
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error; // Re-throw if needed
  }
}

// With Promises
fetch('/api/data')
  .then(res => res.json())
  .catch(error => console.error(error));
\`\`\`

**When to Use:**
- **try**: Wrap any code that could fail (API calls, parsing, file operations)
- **catch**: Log errors, show user-friendly messages, provide fallbacks
- **finally**: Close connections, release resources, reset state`,
    difficulty: 'Medium'
  },
  {
    id: 'error-handling-2',
    topic: 'Error Handling',
    question: 'How do you create custom error classes in JavaScript?',
    answer: `Custom error classes extend the built-in Error class to create domain-specific error types.

**Basic Custom Error:**
\`\`\`javascript
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

throw new ValidationError('Email is invalid');
\`\`\`

**Custom Error with Additional Properties:**
\`\`\`javascript
class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = statusCode;
    this.timestamp = new Date();
  }
  
  toJSON() {
    return {
      error: this.name,
      message: this.message,
      statusCode: this.statusCode,
      timestamp: this.timestamp
    };
  }
}

// Usage
try {
  throw new HttpError('Not Found', 404);
} catch (error) {
  if (error instanceof HttpError) {
    console.log(error.statusCode); // 404
  }
}
\`\`\`

**Error Hierarchy:**
\`\`\`javascript
class AppError extends Error {
  constructor(message, code) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
  }
}

class AuthError extends AppError {
  constructor(message) {
    super(message, 'AUTH_ERROR');
  }
}

class DatabaseError extends AppError {
  constructor(message) {
    super(message, 'DB_ERROR');
  }
}
\`\`\`

**Use Cases:**
- Distinguish between different error types
- Add metadata to errors (status codes, timestamps)
- Create API-specific error responses
- Enable better error handling in catch blocks`,
    difficulty: 'Medium'
  },
  // ES6+ Features
  {
    id: 'es6-destructuring',
    topic: 'ES6+ Features',
    question: 'Explain destructuring in JavaScript with examples for arrays and objects.',
    answer: `Destructuring allows you to extract values from arrays or properties from objects into distinct variables.

**Array Destructuring:**
\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];

// Basic destructuring
const [first, second] = numbers;
console.log(first, second); // 1, 2

// Skip elements
const [a, , c] = numbers;
console.log(a, c); // 1, 3

// Rest pattern
const [head, ...tail] = numbers;
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]

// Default values
const [x = 10, y = 20] = [5];
console.log(x, y); // 5, 20

// Swap variables
let m = 1, n = 2;
[m, n] = [n, m];
console.log(m, n); // 2, 1
\`\`\`

**Object Destructuring:**
\`\`\`javascript
const user = { name: 'Alice', age: 25, city: 'NYC' };

// Basic destructuring
const { name, age } = user;
console.log(name, age); // 'Alice', 25

// Rename variables
const { name: userName, age: userAge } = user;
console.log(userName); // 'Alice'

// Default values
const { name, country = 'USA' } = user;
console.log(country); // 'USA'

// Nested destructuring
const data = { user: { profile: { avatar: 'pic.jpg' } } };
const { user: { profile: { avatar } } } = data;
console.log(avatar); // 'pic.jpg'
\`\`\`

**Function Parameters:**
\`\`\`javascript
// Object parameter destructuring
function greet({ name, age = 18 }) {
  console.log(\`\${name} is \${age}\`);
}
greet({ name: 'Bob' }); // 'Bob is 18'

// Array parameter destructuring
function sum([a, b]) {
  return a + b;
}
sum([1, 2]); // 3
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'es6-spread-rest',
    topic: 'ES6+ Features',
    question: 'What is the difference between spread and rest operators in JavaScript?',
    answer: `Both use the \`...\` syntax but serve opposite purposes: spread "expands" and rest "collects".

**Spread Operator (Expands):**
\`\`\`javascript
// Arrays
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

// Objects
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }

// Function calls
Math.max(...arr1); // 3

// Copying (shallow)
const arrCopy = [...arr1];
const objCopy = { ...obj1 };
\`\`\`

**Rest Operator (Collects):**
\`\`\`javascript
// Function parameters
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4); // 10

// Destructuring (arrays)
const [first, ...rest] = [1, 2, 3, 4];
console.log(first); // 1
console.log(rest);  // [2, 3, 4]

// Destructuring (objects)
const { a, ...others } = { a: 1, b: 2, c: 3 };
console.log(a);      // 1
console.log(others); // { b: 2, c: 3 }
\`\`\`

**Key Differences:**
| Spread | Rest |
|--------|------|
| Expands elements | Collects elements |
| Used in function calls, array/object literals | Used in function parameters, destructuring |
| Can be anywhere | Must be last in pattern |

**Common Use Cases:**
\`\`\`javascript
// Merge arrays
const merged = [...arr1, ...arr2];

// Clone and modify
const updated = { ...user, name: 'New Name' };

// Convert NodeList to array
const elements = [...document.querySelectorAll('div')];
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'es6-optional-chaining',
    topic: 'ES6+ Features',
    question: 'Explain optional chaining (?.) and nullish coalescing (??) operators.',
    answer: `These operators provide safer ways to access nested properties and set default values.

**Optional Chaining (\`?.\`):**
Safely access nested properties without checking each level.

\`\`\`javascript
const user = {
  profile: {
    address: {
      city: 'NYC'
    }
  }
};

// Without optional chaining
const city = user && user.profile && user.profile.address && user.profile.address.city;

// With optional chaining
const city = user?.profile?.address?.city; // 'NYC'

// If property doesn't exist
const zip = user?.profile?.address?.zip; // undefined (no error)

// With methods
const result = user?.getProfile?.(); // undefined if method doesn't exist

// With arrays
const first = arr?.[0];

// With function calls
callback?.();
\`\`\`

**Nullish Coalescing (\`??\`):**
Provides a default value only for \`null\` or \`undefined\`.

\`\`\`javascript
// ?? vs ||
const value1 = 0 || 'default';   // 'default' (0 is falsy)
const value2 = 0 ?? 'default';   // 0 (only null/undefined trigger default)

const value3 = '' || 'default';  // 'default' ('' is falsy)
const value4 = '' ?? 'default';  // '' (empty string is kept)

const value5 = null ?? 'default'; // 'default'
const value6 = undefined ?? 'default'; // 'default'

// Practical example
function getPort(config) {
  return config.port ?? 3000;
}
getPort({ port: 0 }); // 0 (not 3000!)
\`\`\`

**Combined Usage:**
\`\`\`javascript
const displayName = user?.profile?.name ?? 'Anonymous';
const theme = settings?.theme ?? 'light';
const timeout = config?.api?.timeout ?? 5000;
\`\`\`

**Key Difference from ||:**
- \`||\` returns right side for ANY falsy value (0, '', false, null, undefined)
- \`??\` returns right side ONLY for null or undefined`,
    difficulty: 'Medium'
  },
  {
    id: 'es6-template-literals',
    topic: 'ES6+ Features',
    question: 'What are template literals and tagged templates in JavaScript?',
    answer: `Template literals provide enhanced string functionality with backticks (\\\`).

**Basic Template Literals:**
\`\`\`javascript
const name = 'Alice';
const age = 25;

// String interpolation
const greeting = \`Hello, \${name}! You are \${age} years old.\`;

// Multi-line strings
const html = \`
  <div class="card">
    <h2>\${name}</h2>
    <p>Age: \${age}</p>
  </div>
\`;

// Expressions in interpolation
const message = \`Total: \${price * quantity}\`;
const status = \`User is \${age >= 18 ? 'adult' : 'minor'}\`;
\`\`\`

**Tagged Templates:**
A function that processes template literal parts.

\`\`\`javascript
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i] ? \`<mark>\${values[i]}</mark>\` : '';
    return result + str + value;
  }, '');
}

const name = 'Alice';
const role = 'admin';
const output = highlight\`User \${name} has role \${role}\`;
// 'User <mark>Alice</mark> has role <mark>admin</mark>'
\`\`\`

**Practical Tagged Template Examples:**

\`\`\`javascript
// SQL query builder (prevents injection)
function sql(strings, ...values) {
  return {
    text: strings.join('?'),
    values: values
  };
}

const userId = 123;
const query = sql\`SELECT * FROM users WHERE id = \${userId}\`;
// { text: 'SELECT * FROM users WHERE id = ?', values: [123] }

// CSS-in-JS
function css(strings, ...values) {
  return strings.reduce((acc, str, i) => 
    acc + str + (values[i] || ''), ''
  );
}

const color = 'blue';
const styles = css\`
  color: \${color};
  font-size: 16px;
\`;

// i18n/localization
function t(strings, ...values) {
  // Translate and format
  return translateAndFormat(strings, values);
}
\`\`\``,
    difficulty: 'Medium'
  },
  // Classes & OOP
  {
    id: 'oop-classes',
    topic: 'Classes & OOP',
    question: 'Explain JavaScript classes including constructors, methods, and inheritance.',
    answer: `ES6 classes provide a cleaner syntax for object-oriented programming (still prototype-based under the hood).

**Basic Class:**
\`\`\`javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return \`Hi, I'm \${this.name}\`;
  }
  
  haveBirthday() {
    this.age++;
  }
}

const alice = new Person('Alice', 25);
alice.greet(); // "Hi, I'm Alice"
\`\`\`

**Inheritance (extends/super):**
\`\`\`javascript
class Employee extends Person {
  constructor(name, age, jobTitle) {
    super(name, age); // Call parent constructor
    this.jobTitle = jobTitle;
  }
  
  greet() {
    return \`\${super.greet()}, I work as \${this.jobTitle}\`;
  }
}

const bob = new Employee('Bob', 30, 'Developer');
bob.greet(); // "Hi, I'm Bob, I work as Developer"
\`\`\`

**Static Methods & Properties:**
\`\`\`javascript
class MathUtils {
  static PI = 3.14159;
  
  static add(a, b) {
    return a + b;
  }
  
  static isEven(n) {
    return n % 2 === 0;
  }
}

MathUtils.add(2, 3); // 5
MathUtils.PI; // 3.14159
\`\`\`

**Getters and Setters:**
\`\`\`javascript
class Circle {
  constructor(radius) {
    this._radius = radius;
  }
  
  get radius() {
    return this._radius;
  }
  
  set radius(value) {
    if (value < 0) throw new Error('Radius must be positive');
    this._radius = value;
  }
  
  get area() {
    return Math.PI * this._radius ** 2;
  }
}

const circle = new Circle(5);
console.log(circle.area); // 78.54...
\`\`\`

**Private Fields (ES2022):**
\`\`\`javascript
class BankAccount {
  #balance = 0; // Private field
  
  deposit(amount) {
    this.#balance += amount;
  }
  
  getBalance() {
    return this.#balance;
  }
}
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'oop-static',
    topic: 'Classes & OOP',
    question: 'What are static methods and properties? When should you use them?',
    answer: `Static members belong to the class itself, not instances. They're accessed without creating an object.

**Static Methods:**
\`\`\`javascript
class Calculator {
  static add(a, b) {
    return a + b;
  }
  
  static multiply(a, b) {
    return a * b;
  }
}

// Call directly on class
Calculator.add(2, 3); // 5
Calculator.multiply(4, 5); // 20

// Cannot call on instance
const calc = new Calculator();
calc.add(2, 3); // TypeError: calc.add is not a function
\`\`\`

**Static Properties:**
\`\`\`javascript
class Config {
  static API_URL = 'https://api.example.com';
  static VERSION = '1.0.0';
  static #secretKey = 'hidden'; // Private static
  
  static getSecretKey() {
    return this.#secretKey;
  }
}

console.log(Config.API_URL); // 'https://api.example.com'
\`\`\`

**Common Use Cases:**

**1. Utility/Helper Functions:**
\`\`\`javascript
class StringUtils {
  static capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  static isEmpty(str) {
    return !str || str.trim().length === 0;
  }
}
\`\`\`

**2. Factory Pattern:**
\`\`\`javascript
class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
  
  static createAdmin(name) {
    return new User(name, 'admin');
  }
  
  static createGuest() {
    return new User('Guest', 'guest');
  }
}

const admin = User.createAdmin('Alice');
const guest = User.createGuest();
\`\`\`

**3. Singleton Pattern:**
\`\`\`javascript
class Database {
  static instance = null;
  
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}
\`\`\`

**When to Use:**
 Utility functions that don't need instance data
 Factory methods to create instances
 Constants and configuration
 Tracking class-level state (counters, caches)

**When NOT to Use:**
 When method needs access to instance properties
 When behavior should be polymorphic (overridden in subclasses)`,
    difficulty: 'Medium'
  },
  // Modules
  {
    id: 'modules-export-import',
    topic: 'Modules',
    question: 'Explain the difference between named exports and default exports in ES modules.',
    answer: `ES modules use \`export\` and \`import\` to share code between files.

**Named Exports:**
\`\`\`javascript
// math.js
export const PI = 3.14159;
export function add(a, b) {
  return a + b;
}
export function multiply(a, b) {
  return a * b;
}

// Alternative: export at end
const subtract = (a, b) => a - b;
export { subtract };
\`\`\`

**Importing Named Exports:**
\`\`\`javascript
// Import specific items
import { add, PI } from './math.js';

// Rename on import
import { add as sum } from './math.js';

// Import all as namespace
import * as math from './math.js';
math.add(2, 3);
math.PI;
\`\`\`

**Default Export:**
\`\`\`javascript
// user.js
export default class User {
  constructor(name) {
    this.name = name;
  }
}

// Or
function createUser(name) { return { name }; }
export default createUser;
\`\`\`

**Importing Default Export:**
\`\`\`javascript
// Can use any name
import User from './user.js';
import MyUser from './user.js';
import Whatever from './user.js';
\`\`\`

**Combined Exports:**
\`\`\`javascript
// api.js
export default function fetchData() { /*...*/ }
export const BASE_URL = 'https://api.example.com';
export function formatResponse(data) { /*...*/ }

// Import both
import fetchData, { BASE_URL, formatResponse } from './api.js';
\`\`\`

**Key Differences:**
| Named Export | Default Export |
|--------------|----------------|
| Multiple per file | One per file |
| Must use exact name (or alias) | Any name on import |
| Uses curly braces {} | No curly braces |
| \`export { name }\` | \`export default\` |

**Re-exporting:**
\`\`\`javascript
// index.js (barrel file)
export { add, subtract } from './math.js';
export { default as User } from './user.js';
export * from './utils.js';
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'modules-dynamic',
    topic: 'Modules',
    question: 'What are dynamic imports and when should you use them?',
    answer: `Dynamic imports load modules at runtime using \`import()\` which returns a Promise.

**Syntax:**
\`\`\`javascript
// Static import (top of file, always loaded)
import { add } from './math.js';

// Dynamic import (loaded when needed)
const { add } = await import('./math.js');

// Or with .then()
import('./math.js').then(module => {
  module.add(2, 3);
});
\`\`\`

**Use Cases:**

**1. Code Splitting / Lazy Loading:**
\`\`\`javascript
// Only load heavy library when needed
async function processImage(file) {
  const { processImage } = await import('./heavy-image-lib.js');
  return processImage(file);
}

// React lazy loading
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));
\`\`\`

**2. Conditional Imports:**
\`\`\`javascript
async function getParser(fileType) {
  if (fileType === 'json') {
    return await import('./parsers/json.js');
  } else if (fileType === 'csv') {
    return await import('./parsers/csv.js');
  }
}
\`\`\`

**3. Feature Detection:**
\`\`\`javascript
async function initAnalytics() {
  if (userConsented) {
    const analytics = await import('./analytics.js');
    analytics.init();
  }
}
\`\`\`

**4. Route-based Loading:**
\`\`\`javascript
const routes = {
  '/home': () => import('./pages/Home.js'),
  '/about': () => import('./pages/About.js'),
  '/dashboard': () => import('./pages/Dashboard.js')
};

async function loadPage(path) {
  const module = await routes[path]();
  return module.default;
}
\`\`\`

**Accessing Exports:**
\`\`\`javascript
// Named exports
const { add, subtract } = await import('./math.js');

// Default export
const module = await import('./user.js');
const User = module.default;

// Or combined
const { default: User, helper } = await import('./user.js');
\`\`\`

**Benefits:**
 Smaller initial bundle size
 Faster page load
 Load code only when needed
 Better performance for large apps`,
    difficulty: 'Medium'
  },
  // Regular Expressions
  {
    id: 'regex-basics',
    topic: 'Regular Expressions',
    question: 'What are the common RegEx patterns and methods in JavaScript?',
    answer: `Regular expressions (RegEx) are patterns used to match character combinations in strings.

**Creating RegEx:**
\`\`\`javascript
// Literal notation
const regex1 = /pattern/flags;

// Constructor
const regex2 = new RegExp('pattern', 'flags');
\`\`\`

**Common Flags:**
- \`g\` - Global (find all matches)
- \`i\` - Case insensitive
- \`m\` - Multiline

**Common Patterns:**
\`\`\`javascript
// Digits
/\\d/       // Any digit (0-9)
/\\d+/      // One or more digits
/\\d{3}/    // Exactly 3 digits

// Characters
/\\w/       // Word character (a-z, A-Z, 0-9, _)
/\\s/       // Whitespace
/./        // Any character except newline

// Negation
/\\D/       // Non-digit
/\\W/       // Non-word character
/\\S/       // Non-whitespace

// Anchors
/^start/   // Starts with "start"
/end$/     // Ends with "end"

// Groups
/(ab)+/    // Group "ab" one or more times
/a|b/      // a OR b
\`\`\`

**RegEx Methods:**

**test() - Returns boolean:**
\`\`\`javascript
/\\d/.test('abc123'); // true
/^\\d+$/.test('123'); // true (only digits)
\`\`\`

**match() - Returns array of matches:**
\`\`\`javascript
'hello world'.match(/o/g); // ['o', 'o']
'abc123'.match(/\\d+/);     // ['123']
\`\`\`

**replace() - Replace matches:**
\`\`\`javascript
'hello world'.replace(/o/g, '0'); // 'hell0 w0rld'
'John Smith'.replace(/(\\w+) (\\w+)/, '$2, $1'); // 'Smith, John'
\`\`\`

**split() - Split by pattern:**
\`\`\`javascript
'a,b;c:d'.split(/[,;:]/); // ['a', 'b', 'c', 'd']
\`\`\`

**Common Validation Patterns:**
\`\`\`javascript
// Email (simple)
const email = /^[\\w.-]+@[\\w.-]+\\.\\w+$/;

// Phone (US)
const phone = /^\\d{3}-\\d{3}-\\d{4}$/;

// URL
const url = /^https?:\\/\\/[\\w.-]+\\.[a-z]{2,}/i;

// Password (min 8 chars, letter + number)
const password = /^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$/;
\`\`\``,
    difficulty: 'Medium'
  },
  // Web APIs & Storage
  {
    id: 'storage-local-session',
    topic: 'Web APIs',
    question: 'What is the difference between localStorage and sessionStorage?',
    answer: `Both are part of the Web Storage API but differ in persistence and scope.

**localStorage:**
- Persists until explicitly cleared
- Shared across all tabs/windows of same origin
- ~5-10MB storage limit

\`\`\`javascript
// Set item
localStorage.setItem('username', 'Alice');

// Get item
const name = localStorage.getItem('username'); // 'Alice'

// Remove item
localStorage.removeItem('username');

// Clear all
localStorage.clear();

// Store objects (must stringify)
const user = { name: 'Alice', age: 25 };
localStorage.setItem('user', JSON.stringify(user));
const retrieved = JSON.parse(localStorage.getItem('user'));
\`\`\`

**sessionStorage:**
- Cleared when tab/window is closed
- Separate for each tab (not shared)
- Same API as localStorage

\`\`\`javascript
sessionStorage.setItem('tempData', 'value');
sessionStorage.getItem('tempData');
sessionStorage.removeItem('tempData');
\`\`\`

**Key Differences:**
| Feature | localStorage | sessionStorage |
|---------|-------------|----------------|
| Persistence | Until cleared | Until tab closes |
| Tab sharing | Shared across tabs | Tab-specific |
| Use case | User preferences | Temp form data |

**Storage Wrapper:**
\`\`\`javascript
const storage = {
  get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key) {
    localStorage.removeItem(key);
  }
};

// Usage
storage.set('settings', { theme: 'dark', lang: 'en' });
const settings = storage.get('settings');
\`\`\`

**Listening for Changes:**
\`\`\`javascript
window.addEventListener('storage', (event) => {
  console.log('Key:', event.key);
  console.log('Old value:', event.oldValue);
  console.log('New value:', event.newValue);
});
\`\`\`

**When to Use:**
- **localStorage**: User preferences, themes, saved data
- **sessionStorage**: Form drafts, temporary state, wizard steps`,
    difficulty: 'Easy'
  },
  {
    id: 'json-handling',
    topic: 'Web APIs',
    question: 'How do you properly handle JSON parsing and stringifying in JavaScript?',
    answer: `JSON (JavaScript Object Notation) methods convert between objects and strings.

**JSON.stringify():**
\`\`\`javascript
const user = { name: 'Alice', age: 25 };

// Basic
JSON.stringify(user); // '{"name":"Alice","age":25}'

// Pretty print (2 spaces indent)
JSON.stringify(user, null, 2);
// {
//   "name": "Alice",
//   "age": 25
// }

// With replacer function
JSON.stringify(user, (key, value) => {
  if (key === 'age') return undefined; // Exclude age
  return value;
}); // '{"name":"Alice"}'

// With replacer array
JSON.stringify(user, ['name']); // '{"name":"Alice"}'
\`\`\`

**JSON.parse():**
\`\`\`javascript
const jsonString = '{"name":"Alice","age":25}';

// Basic
const obj = JSON.parse(jsonString);

// With reviver function
JSON.parse(jsonString, (key, value) => {
  if (key === 'age') return value * 2;
  return value;
}); // { name: 'Alice', age: 50 }

// Parse dates
const data = '{"date":"2024-01-01T00:00:00.000Z"}';
JSON.parse(data, (key, value) => {
  if (key === 'date') return new Date(value);
  return value;
});
\`\`\`

**Error Handling:**
\`\`\`javascript
function safeParse(jsonString, fallback = null) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('JSON parse error:', error.message);
    return fallback;
  }
}

safeParse('invalid json'); // null
safeParse('{"valid": true}'); // { valid: true }
\`\`\`

**Limitations:**
\`\`\`javascript
// These are NOT preserved:
const obj = {
  func: () => {},      // Functions - lost
  date: new Date(),    // Dates - become strings
  undef: undefined,    // Undefined - lost
  symbol: Symbol(),    // Symbols - lost
  infinity: Infinity,  // Infinity - becomes null
  nan: NaN            // NaN - becomes null
};

JSON.parse(JSON.stringify(obj));
// { date: "2024-01-01T...", infinity: null, nan: null }
\`\`\`

**Deep Clone Trick:**
\`\`\`javascript
// Quick deep clone (with limitations above)
const clone = JSON.parse(JSON.stringify(original));

// Better alternative (modern)
const clone = structuredClone(original);
\`\`\``,
    difficulty: 'Easy'
  },
  // Date/Time
  {
    id: 'date-manipulation',
    topic: 'Date & Time',
    question: 'How do you create, format, and manipulate dates in JavaScript?',
    answer: `JavaScript's Date object handles date/time operations.

**Creating Dates:**
\`\`\`javascript
// Current date/time
const now = new Date();

// Specific date
const date1 = new Date('2024-12-25');
const date2 = new Date(2024, 11, 25); // Month is 0-indexed!
const date3 = new Date(2024, 11, 25, 10, 30, 0); // With time

// From timestamp (ms since Jan 1, 1970)
const date4 = new Date(1703462400000);
\`\`\`

**Getting Date Parts:**
\`\`\`javascript
const date = new Date('2024-12-25T10:30:00');

date.getFullYear();   // 2024
date.getMonth();      // 11 (December, 0-indexed)
date.getDate();       // 25
date.getDay();        // 3 (Wednesday, 0=Sunday)
date.getHours();      // 10
date.getMinutes();    // 30
date.getSeconds();    // 0
date.getTime();       // Timestamp in ms
\`\`\`

**Setting Date Parts:**
\`\`\`javascript
const date = new Date();
date.setFullYear(2025);
date.setMonth(0); // January
date.setDate(15);
date.setHours(14, 30, 0); // 2:30:00 PM
\`\`\`

**Formatting:**
\`\`\`javascript
const date = new Date('2024-12-25T10:30:00');

// Built-in methods
date.toLocaleDateString();      // '12/25/2024'
date.toLocaleTimeString();      // '10:30:00 AM'
date.toISOString();             // '2024-12-25T10:30:00.000Z'

// With options
date.toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}); // 'Wednesday, December 25, 2024'

// Custom format function
function formatDate(date) {
  const pad = n => n.toString().padStart(2, '0');
  return \`\${date.getFullYear()}-\${pad(date.getMonth() + 1)}-\${pad(date.getDate())}\`;
}
\`\`\`

**Date Arithmetic:**
\`\`\`javascript
const now = new Date();

// Add 7 days
const nextWeek = new Date(now);
nextWeek.setDate(now.getDate() + 7);

// Difference in days
const date1 = new Date('2024-01-01');
const date2 = new Date('2024-01-15');
const diffMs = date2 - date1;
const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // 14
\`\`\`

**Comparison:**
\`\`\`javascript
const date1 = new Date('2024-01-01');
const date2 = new Date('2024-01-15');

date1 < date2;  // true
date1 > date2;  // false
date1.getTime() === date2.getTime(); // Compare equality
\`\`\``,
    difficulty: 'Medium'
  },
  // ES6+ Features
  {
    id: 'spread-rest-operators',
    topic: 'ES6+ Features',
    question: 'Explain the spread operator and rest parameters in JavaScript.',
    answer: `**Spread operator (...)** expands iterables into individual elements.

**Rest parameters (...)** collects multiple elements into an array.

**Spread Examples:**
\`\`\`javascript
// Array spreading
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

// Object spreading
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }

// Function arguments
Math.max(...[1, 5, 3]); // 5

// Clone array/object (shallow)
const clone = [...arr1];
const cloneObj = { ...obj1 };
\`\`\`

**Rest Parameters:**
\`\`\`javascript
// Function parameters
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4); // 10

// Destructuring rest
const [first, ...rest] = [1, 2, 3, 4];
// first = 1, rest = [2, 3, 4]

const { a, ...others } = { a: 1, b: 2, c: 3 };
// a = 1, others = { b: 2, c: 3 }
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'destructuring',
    topic: 'ES6+ Features',
    question: 'Explain destructuring in JavaScript with examples.',
    answer: `Destructuring extracts values from arrays or objects into variables.

**Array Destructuring:**
\`\`\`javascript
const [a, b, c] = [1, 2, 3];
// a = 1, b = 2, c = 3

// Skip elements
const [first, , third] = [1, 2, 3];

// Default values
const [x = 10, y = 20] = [5];
// x = 5, y = 20

// Swap variables
let m = 1, n = 2;
[m, n] = [n, m];
\`\`\`

**Object Destructuring:**
\`\`\`javascript
const { name, age } = { name: 'John', age: 30, city: 'NYC' };

// Rename variables
const { name: userName } = { name: 'John' };

// Default values
const { name, country = 'Unknown' } = { name: 'John' };

// Nested destructuring
const { address: { city } } = { address: { city: 'NYC' } };

// Function parameters
function greet({ name, age = 18 }) {
  console.log(\`Hello \${name}, age \${age}\`);
}
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'es-modules',
    topic: 'ES6+ Features',
    question: 'What are ES Modules? How do import/export work?',
    answer: `ES Modules are JavaScript's native module system for code organization.

**Named Exports/Imports:**
\`\`\`javascript
// utils.js
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export class Calculator { }

// main.js
import { PI, add, Calculator } from './utils.js';
import { add as sum } from './utils.js'; // Rename
import * as utils from './utils.js'; // Import all
\`\`\`

**Default Export/Import:**
\`\`\`javascript
// Component.js
export default function Component() { }

// main.js
import Component from './Component.js';
import MyComponent from './Component.js'; // Any name
\`\`\`

**Mixed:**
\`\`\`javascript
// module.js
export default class Main { }
export const helper = () => {};

// main.js
import Main, { helper } from './module.js';
\`\`\`

**Dynamic Import:**
\`\`\`javascript
const module = await import('./heavy-module.js');
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'template-literals',
    topic: 'ES6+ Features',
    question: 'What are template literals and tagged templates?',
    answer: `**Template Literals:**
\`\`\`javascript
const name = 'World';
const greeting = \`Hello, \${name}!\`; // "Hello, World!"

// Multi-line strings
const html = \`
  <div>
    <h1>Title</h1>
    <p>Content</p>
  </div>
\`;

// Expressions
\`Total: \${price * quantity}\`;
\`Status: \${isActive ? 'Active' : 'Inactive'}\`;
\`\`\`

**Tagged Templates:**
\`\`\`javascript
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i] || '';
    return result + str + \`<mark>\${value}</mark>\`;
  }, '');
}

const name = 'John';
const age = 30;
highlight\`Name: \${name}, Age: \${age}\`;
// "Name: <mark>John</mark>, Age: <mark>30</mark>"

// Common use cases
// - HTML escaping
// - Internationalization
// - CSS-in-JS (styled-components)
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'optional-chaining-nullish',
    topic: 'ES6+ Features',
    question: 'Explain optional chaining (?.) and nullish coalescing (??)',
    answer: `**Optional Chaining (?.):**
Safely access nested properties that might not exist.

\`\`\`javascript
const user = { profile: { name: 'John' } };

// Without optional chaining
const city = user && user.address && user.address.city;

// With optional chaining
const city = user?.address?.city; // undefined (no error)

// With method calls
user.greet?.(); // Calls if exists

// With arrays
const first = arr?.[0];

// With nullish coalescing
const displayName = user?.name ?? 'Anonymous';
\`\`\`

**Nullish Coalescing (??):**
Returns right side only for null/undefined (not falsy values).

\`\`\`javascript
// || returns right side for any falsy value
0 || 'default';     // 'default'
'' || 'default';    // 'default'
false || 'default'; // 'default'

// ?? returns right side only for null/undefined
0 ?? 'default';     // 0
'' ?? 'default';    // ''
null ?? 'default';  // 'default'
undefined ?? 'default'; // 'default'
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'symbol-type',
    topic: 'JavaScript Basics',
    question: 'What is the Symbol type in JavaScript?',
    answer: `Symbol is a primitive type for creating unique identifiers.

\`\`\`javascript
// Creating symbols
const sym1 = Symbol('description');
const sym2 = Symbol('description');
sym1 === sym2; // false (always unique)

// As object keys (hidden from iteration)
const id = Symbol('id');
const user = {
  name: 'John',
  [id]: 123
};

Object.keys(user); // ['name']
user[id]; // 123

// Well-known symbols
Symbol.iterator;   // Make objects iterable
Symbol.toStringTag; // Custom [object X] names
Symbol.hasInstance; // Custom instanceof behavior

// Global symbol registry
const globalSym = Symbol.for('shared');
Symbol.for('shared') === globalSym; // true
Symbol.keyFor(globalSym); // 'shared'
\`\`\`

**Use cases:** Private properties, defining protocols, avoiding name collisions.`,
    difficulty: 'Medium'
  },
  {
    id: 'iterators-generators',
    topic: 'ES6+ Features',
    question: 'What are Iterators and Generators in JavaScript?',
    answer: `**Iterators:** Objects with a next() method returning {value, done}.

\`\`\`javascript
// Custom iterator
const range = {
  from: 1,
  to: 3,
  [Symbol.iterator]() {
    return {
      current: this.from,
      last: this.to,
      next() {
        if (this.current <= this.last) {
          return { value: this.current++, done: false };
        }
        return { done: true };
      }
    };
  }
};

for (const n of range) console.log(n); // 1, 2, 3
\`\`\`

**Generators:** Functions that can pause and resume.

\`\`\`javascript
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGenerator();
gen.next(); // { value: 1, done: false }
gen.next(); // { value: 2, done: false }
gen.next(); // { value: 3, done: false }
gen.next(); // { value: undefined, done: true }

// Infinite sequence
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'proxy-reflect',
    topic: 'Advanced JavaScript',
    question: 'What are Proxy and Reflect in JavaScript?',
    answer: `**Proxy:** Creates a wrapper that intercepts operations on an object.

\`\`\`javascript
const target = { name: 'John', age: 30 };

const proxy = new Proxy(target, {
  get(obj, prop) {
    console.log(\`Getting \${prop}\`);
    return obj[prop];
  },
  set(obj, prop, value) {
    console.log(\`Setting \${prop} to \${value}\`);
    if (prop === 'age' && typeof value !== 'number') {
      throw new TypeError('Age must be a number');
    }
    obj[prop] = value;
    return true;
  }
});

proxy.name; // Logs: "Getting name", returns "John"
proxy.age = 31; // Logs: "Setting age to 31"
\`\`\`

**Reflect:** Provides methods for interceptable operations.

\`\`\`javascript
const obj = { x: 1 };

Reflect.get(obj, 'x'); // 1
Reflect.set(obj, 'y', 2); // true
Reflect.has(obj, 'x'); // true
Reflect.deleteProperty(obj, 'x'); // true
Reflect.ownKeys(obj); // ['y']
\`\`\`

**Use cases:** Validation, logging, reactive systems, access control.`,
    difficulty: 'Hard'
  },
  {
    id: 'garbage-collection',
    topic: 'Memory Management',
    question: 'How does garbage collection work in JavaScript?',
    answer: `JavaScript uses automatic memory management with garbage collection.

**Mark-and-Sweep Algorithm:**
1. Start from "roots" (global variables, call stack)
2. Mark all reachable objects
3. Sweep (delete) unmarked objects

**Memory Leaks:**
\`\`\`javascript
// 1. Forgotten event listeners
element.addEventListener('click', handler);
// Must remove: element.removeEventListener('click', handler);

// 2. Closures holding references
function outer() {
  const largeData = new Array(1000000);
  return function inner() {
    console.log(largeData.length);
  };
}

// 3. Detached DOM nodes
const elements = [];
elements.push(document.createElement('div'));
// element removed from DOM but still in array

// 4. Global variables
window.largeData = new Array(1000000);
\`\`\`

**WeakMap/WeakSet for weak references:**
\`\`\`javascript
const cache = new WeakMap();
let obj = { data: 'large' };
cache.set(obj, 'value');
obj = null; // Object can be garbage collected
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'design-patterns-module',
    topic: 'Design Patterns',
    question: 'Explain the Module Pattern in JavaScript.',
    answer: `The Module Pattern encapsulates private state and exposes a public API.

**IIFE Module Pattern:**
\`\`\`javascript
const Counter = (function() {
  // Private
  let count = 0;
  
  function log() {
    console.log(\`Count: \${count}\`);
  }
  
  // Public API
  return {
    increment() {
      count++;
      log();
    },
    decrement() {
      count--;
      log();
    },
    getCount() {
      return count;
    }
  };
})();

Counter.increment(); // Count: 1
Counter.getCount();  // 1
Counter.count;       // undefined (private)
\`\`\`

**Revealing Module Pattern:**
\`\`\`javascript
const Calculator = (function() {
  function add(a, b) { return a + b; }
  function subtract(a, b) { return a - b; }
  
  return { add, subtract };
})();
\`\`\`

Modern alternative: ES Modules with export/import.`,
    difficulty: 'Medium'
  },
  {
    id: 'design-patterns-observer',
    topic: 'Design Patterns',
    question: 'Explain the Observer Pattern (Pub/Sub) in JavaScript.',
    answer: `The Observer Pattern defines a subscription mechanism for events.

\`\`\`javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
    
    // Return unsubscribe function
    return () => {
      this.events[event] = this.events[event]
        .filter(cb => cb !== callback);
    };
  }
  
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(cb => cb(data));
    }
  }
}

// Usage
const emitter = new EventEmitter();

const unsubscribe = emitter.subscribe('message', (data) => {
  console.log('Received:', data);
});

emitter.emit('message', 'Hello!'); // Received: Hello!
unsubscribe();
emitter.emit('message', 'World'); // Nothing (unsubscribed)
\`\`\`

**Use cases:** Event systems, state management, real-time updates.`,
    difficulty: 'Medium'
  },
  {
    id: 'design-patterns-singleton',
    topic: 'Design Patterns',
    question: 'Explain the Singleton Pattern in JavaScript.',
    answer: `The Singleton Pattern ensures only one instance of a class exists.

\`\`\`javascript
// Class-based Singleton
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    Database.instance = this;
    this.connection = 'Connected';
  }
  
  query(sql) {
    console.log(\`Executing: \${sql}\`);
  }
}

const db1 = new Database();
const db2 = new Database();
db1 === db2; // true

// Module Singleton (simpler)
// database.js
let instance = null;

export function getDatabase() {
  if (!instance) {
    instance = {
      connection: 'Connected',
      query(sql) { console.log(sql); }
    };
  }
  return instance;
}

// Or just export an object (ES modules are singletons)
export const database = {
  connection: 'Connected',
  query(sql) { console.log(sql); }
};
\`\`\`

**Use cases:** Database connections, configuration, logging.`,
    difficulty: 'Medium'
  },
  {
    id: 'design-patterns-factory',
    topic: 'Design Patterns',
    question: 'Explain the Factory Pattern in JavaScript.',
    answer: `The Factory Pattern creates objects without specifying exact classes.

\`\`\`javascript
// Simple Factory
function createUser(type) {
  if (type === 'admin') {
    return { role: 'admin', permissions: ['read', 'write', 'delete'] };
  }
  if (type === 'guest') {
    return { role: 'guest', permissions: ['read'] };
  }
  return { role: 'user', permissions: ['read', 'write'] };
}

// Factory with classes
class Car {
  constructor(model) { this.model = model; }
}

class Truck {
  constructor(model) { this.model = model; }
}

class VehicleFactory {
  create(type, model) {
    switch (type) {
      case 'car': return new Car(model);
      case 'truck': return new Truck(model);
      default: throw new Error(\`Unknown type: \${type}\`);
    }
  }
}

const factory = new VehicleFactory();
const car = factory.create('car', 'Tesla');
const truck = factory.create('truck', 'Ford');
\`\`\`

**Use cases:** Object creation abstraction, dependency injection.`,
    difficulty: 'Medium'
  },
  {
    id: 'security-xss',
    topic: 'Security',
    question: 'What is XSS and how do you prevent it in JavaScript?',
    answer: `**XSS (Cross-Site Scripting):** Injecting malicious scripts into web pages.

**Types:**
1. **Stored XSS:** Script stored in database
2. **Reflected XSS:** Script in URL parameters
3. **DOM XSS:** Script manipulates DOM directly

**Prevention:**

**1. Escape HTML output:**
\`\`\`javascript
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Or use DOMPurify library
const clean = DOMPurify.sanitize(userInput);
\`\`\`

**2. Use textContent instead of innerHTML:**
\`\`\`javascript
// Vulnerable
element.innerHTML = userInput;

// Safe
element.textContent = userInput;
\`\`\`

**3. Set Content-Security-Policy headers:**
\`\`\`
Content-Security-Policy: default-src 'self'; script-src 'self'
\`\`\`

**4. Use HttpOnly cookies for sensitive data**

**5. Validate and sanitize all inputs**`,
    difficulty: 'Hard'
  },
  {
    id: 'security-csrf',
    topic: 'Security',
    question: 'What is CSRF and how do you prevent it?',
    answer: `**CSRF (Cross-Site Request Forgery):** Attacker tricks user into performing unwanted actions on an authenticated site.

**Example Attack:**
\`\`\`html
<!-- On malicious site -->
<img src="https://bank.com/transfer?to=attacker&amount=10000">
\`\`\`

**Prevention:**

**1. CSRF Tokens:**
\`\`\`javascript
// Server generates token
const csrfToken = generateSecureToken();

// Include in forms
<input type="hidden" name="_csrf" value="{{csrfToken}}">

// Include in AJAX
fetch('/api/data', {
  headers: {
    'X-CSRF-Token': csrfToken
  }
});
\`\`\`

**2. SameSite Cookies:**
\`\`\`javascript
Set-Cookie: session=abc; SameSite=Strict; Secure; HttpOnly
\`\`\`

**3. Check Origin/Referer headers:**
\`\`\`javascript
if (request.headers.origin !== 'https://mysite.com') {
  throw new Error('Invalid origin');
}
\`\`\`

**4. Require re-authentication for sensitive actions**`,
    difficulty: 'Hard'
  },
  {
    id: 'web-workers',
    topic: 'Web APIs',
    question: 'What are Web Workers and how do you use them?',
    answer: `Web Workers run JavaScript in background threads, without blocking the UI.

**Main Thread (main.js):**
\`\`\`javascript
// Create worker
const worker = new Worker('worker.js');

// Send data to worker
worker.postMessage({ data: [1, 2, 3, 4, 5] });

// Receive result from worker
worker.onmessage = (event) => {
  console.log('Result:', event.data);
};

// Handle errors
worker.onerror = (error) => {
  console.error('Worker error:', error);
};

// Terminate worker
worker.terminate();
\`\`\`

**Worker (worker.js):**
\`\`\`javascript
// Receive message
self.onmessage = (event) => {
  const { data } = event.data;
  
  // Heavy computation
  const result = data.map(n => n * n);
  
  // Send result back
  self.postMessage(result);
};
\`\`\`

**Limitations:**
- No DOM access
- No window object
- Different global scope (self)
- Can use importScripts() for libraries

**Use cases:** Image processing, data parsing, complex calculations.`,
    difficulty: 'Medium'
  },
  {
    id: 'intersection-observer',
    topic: 'Web APIs',
    question: 'What is the Intersection Observer API?',
    answer: `Intersection Observer detects when elements enter/exit the viewport.

\`\`\`javascript
// Create observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('Element visible:', entry.target);
      entry.target.classList.add('visible');
    }
  });
}, {
  root: null,           // viewport
  rootMargin: '0px',    // margin around root
  threshold: 0.5        // 50% visible triggers callback
});

// Observe elements
document.querySelectorAll('.lazy-section').forEach(el => {
  observer.observe(el);
});

// Stop observing
observer.unobserve(element);
observer.disconnect(); // Stop all
\`\`\`

**Common Use Cases:**
\`\`\`javascript
// Lazy loading images
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      imageObserver.unobserve(img);
    }
  });
});

// Infinite scroll
// Animate on scroll
// Ad viewability tracking
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'mutation-observer',
    topic: 'Web APIs',
    question: 'What is the MutationObserver API?',
    answer: `MutationObserver watches for changes to the DOM tree.

\`\`\`javascript
// Create observer
const observer = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    console.log('Mutation type:', mutation.type);
    
    if (mutation.type === 'childList') {
      console.log('Added nodes:', mutation.addedNodes);
      console.log('Removed nodes:', mutation.removedNodes);
    }
    
    if (mutation.type === 'attributes') {
      console.log('Changed attribute:', mutation.attributeName);
    }
  });
});

// Start observing
observer.observe(targetElement, {
  childList: true,     // Watch children add/remove
  attributes: true,    // Watch attribute changes
  characterData: true, // Watch text content changes
  subtree: true,       // Watch all descendants
  attributeOldValue: true,    // Record old attribute value
  characterDataOldValue: true // Record old text value
});

// Stop observing
observer.disconnect();

// Take pending records
const records = observer.takeRecords();
\`\`\`

**Use cases:** Framework reactivity, DOM change tracking, dynamic content.`,
    difficulty: 'Medium'
  },
  {
    id: 'fetch-api',
    topic: 'Web APIs',
    question: 'Explain the Fetch API and how to handle errors.',
    answer: `Fetch is a modern API for making HTTP requests.

\`\`\`javascript
// Basic GET
const response = await fetch('/api/users');
const data = await response.json();

// POST with options
const response = await fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token'
  },
  body: JSON.stringify({ name: 'John' })
});

// Error handling (fetch only rejects on network errors)
async function fetchData(url) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(\`HTTP error: \${response.status}\`);
    }
    
    return await response.json();
  } catch (error) {
    if (error.name === 'TypeError') {
      console.error('Network error:', error);
    } else {
      console.error('Request failed:', error);
    }
    throw error;
  }
}

// AbortController for cancellation
const controller = new AbortController();
setTimeout(() => controller.abort(), 5000);

fetch(url, { signal: controller.signal })
  .catch(err => {
    if (err.name === 'AbortError') {
      console.log('Request cancelled');
    }
  });
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'structuredclone',
    topic: 'JavaScript Basics',
    question: 'What is structuredClone() and how is it different from JSON methods?',
    answer: `\`structuredClone()\` creates a deep clone of objects, handling more types than JSON.

\`\`\`javascript
const original = {
  date: new Date(),
  regex: /test/gi,
  map: new Map([['a', 1]]),
  set: new Set([1, 2, 3]),
  arrayBuffer: new ArrayBuffer(8),
  nested: { deep: { value: 42 } }
};

// structuredClone handles all these types
const clone = structuredClone(original);
clone.nested.deep.value = 100;
original.nested.deep.value; // Still 42

// JSON loses type information
const jsonClone = JSON.parse(JSON.stringify(original));
// date becomes string, regex becomes {}, map/set become {}
\`\`\`

**structuredClone advantages:**
- Handles circular references
- Preserves Date, RegExp, Map, Set, ArrayBuffer, etc.
- Native and fast

**Limitations:**
\`\`\`javascript
// Cannot clone:
// - Functions
// - DOM nodes
// - Symbol properties
// - Property descriptors (getters/setters)
// - Prototype chain

const obj = {
  fn: () => {},  // Will throw error
};
structuredClone(obj); // DataCloneError
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'bigint',
    topic: 'JavaScript Basics',
    question: 'What is BigInt and when would you use it?',
    answer: `BigInt handles integers larger than Number.MAX_SAFE_INTEGER (2^53 - 1).

\`\`\`javascript
// Creating BigInt
const big1 = 9007199254740991n; // n suffix
const big2 = BigInt('9007199254740991');
const big3 = BigInt(123);

// Problem with regular numbers
Number.MAX_SAFE_INTEGER; // 9007199254740991
9007199254740992 === 9007199254740993; // true! 

// BigInt handles it correctly
9007199254740992n === 9007199254740993n; // false

// Operations
const a = 10n;
const b = 3n;
a + b;  // 13n
a - b;  // 7n
a * b;  // 30n
a / b;  // 3n (truncates, no decimals)
a % b;  // 1n

// Cannot mix with Number
10n + 5;  // TypeError
10n + BigInt(5); // 15n
Number(10n) + 5; // 15

// Comparison works with mixed types
10n > 5;  // true
10n === 10;  // false (different types)
10n == 10;   // true (loose equality)
\`\`\`

**Use cases:** Cryptography, high-precision timestamps, large IDs.`,
    difficulty: 'Medium'
  },
  {
    id: 'polyfill-transpile',
    topic: 'JavaScript Basics',
    question: 'What is the difference between a polyfill and transpiling?',
    answer: `**Polyfill:** Adds missing functionality at runtime.

\`\`\`javascript
// Polyfill for Array.includes
if (!Array.prototype.includes) {
  Array.prototype.includes = function(element) {
    return this.indexOf(element) !== -1;
  };
}

// Polyfill for Promise.allSettled
if (!Promise.allSettled) {
  Promise.allSettled = function(promises) {
    return Promise.all(promises.map(p =>
      p.then(value => ({ status: 'fulfilled', value }))
       .catch(reason => ({ status: 'rejected', reason }))
    ));
  };
}

// Common: core-js, polyfill.io
\`\`\`

**Transpiling:** Converts modern syntax to older syntax at build time.

\`\`\`javascript
// ES6 Input (Babel processes this)
const add = (a, b) => a + b;
class Person { }
const { name } = obj;

// ES5 Output
var add = function(a, b) { return a + b; };
function Person() { }
var name = obj.name;
\`\`\`

**Key difference:**
- **Polyfills** add new APIs (methods, objects)
- **Transpilers** convert new syntax to old syntax

Both are often used together (Babel + core-js).`,
    difficulty: 'Medium'
  },
  {
    id: 'error-handling-patterns',
    topic: 'Error Handling',
    question: 'What are best practices for error handling in JavaScript?',
    answer: `**1. Use try/catch for expected errors:**
\`\`\`javascript
async function fetchUser(id) {
  try {
    const response = await fetch(\`/api/users/\${id}\`);
    if (!response.ok) throw new Error('User not found');
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
}
\`\`\`

**2. Create custom error classes:**
\`\`\`javascript
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

throw new ValidationError('email', 'Invalid email format');
\`\`\`

**3. Global error handlers:**
\`\`\`javascript
// Browser
window.onerror = (message, source, line, col, error) => {
  logError({ message, source, line, col, error });
};

window.onunhandledrejection = (event) => {
  logError({ reason: event.reason });
};
\`\`\`

**4. Fail fast, recover gracefully:**
\`\`\`javascript
function processData(data) {
  if (!data) throw new Error('Data is required');
  // Process...
}
\`\`\`

**5. Don't swallow errors silently:**
\`\`\`javascript
// Bad
try { riskyOperation(); } catch (e) { }

// Good
try { riskyOperation(); } catch (e) { 
  logger.error(e);
}
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'call-apply-bind',
    topic: 'JavaScript Basics',
    question: 'Explain call(), apply(), and bind() methods.',
    answer: `These methods explicitly set the \`this\` value for functions.

**call():** Invokes function with given this + individual arguments.
\`\`\`javascript
function greet(greeting, punctuation) {
  console.log(\`\${greeting}, \${this.name}\${punctuation}\`);
}

const person = { name: 'John' };
greet.call(person, 'Hello', '!'); // "Hello, John!"
\`\`\`

**apply():** Same as call, but arguments as array.
\`\`\`javascript
greet.apply(person, ['Hi', '?']); // "Hi, John?"

// Useful for spreading array as arguments
Math.max.apply(null, [1, 5, 3]); // 5
// Modern: Math.max(...[1, 5, 3])
\`\`\`

**bind():** Returns new function with bound this (doesn't invoke).
\`\`\`javascript
const boundGreet = greet.bind(person);
boundGreet('Hey', '.'); // "Hey, John."

// Partial application
const sayHello = greet.bind(person, 'Hello');
sayHello('!!!'); // "Hello, John!!!"

// Common use: event handlers
class Button {
  constructor() {
    this.clicked = 0;
    // Without bind, 'this' would be the DOM element
    this.handleClick = this.handleClick.bind(this);
  }
}
\`\`\`

**Summary:**
- call/apply: invoke immediately
- bind: returns bound function`,
    difficulty: 'Medium'
  },
  {
    id: 'settimeout-setinterval',
    topic: 'Asynchronous JavaScript',
    question: 'Explain setTimeout and setInterval with their gotchas.',
    answer: `**setTimeout:** Executes function once after delay.
\`\`\`javascript
const timerId = setTimeout(() => {
  console.log('Delayed');
}, 1000);

clearTimeout(timerId); // Cancel
\`\`\`

**setInterval:** Executes repeatedly at interval.
\`\`\`javascript
const intervalId = setInterval(() => {
  console.log('Repeating');
}, 1000);

clearInterval(intervalId); // Cancel
\`\`\`

**Gotcha 1: Minimum delay is ~4ms**
\`\`\`javascript
setTimeout(() => {}, 0); // Not instant, goes to queue
\`\`\`

**Gotcha 2: setInterval can stack**
\`\`\`javascript
// If callback takes longer than interval:
setInterval(() => {
  heavyOperation(); // Takes 1500ms
}, 1000);
// Calls will stack up!

// Better: recursive setTimeout
function repeat() {
  heavyOperation();
  setTimeout(repeat, 1000); // Waits AFTER completion
}
\`\`\`

**Gotcha 3: 'this' in callbacks**
\`\`\`javascript
class Timer {
  start() {
    setTimeout(function() {
      console.log(this); // window, not Timer!
    }, 100);
    
    setTimeout(() => {
      console.log(this); // Timer (arrow function)
    }, 100);
  }
}
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'debounce-throttle',
    topic: 'Performance',
    question: 'Explain debouncing and throttling with implementations.',
    answer: `**Debounce:** Delays execution until activity stops.
\`\`\`javascript
function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Usage: Search input
const debouncedSearch = debounce((query) => {
  fetchResults(query);
}, 300);

input.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});
\`\`\`

**Throttle:** Limits execution to once per time period.
\`\`\`javascript
function throttle(fn, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Usage: Scroll handler
const throttledScroll = throttle(() => {
  updateScrollPosition();
}, 100);

window.addEventListener('scroll', throttledScroll);
\`\`\`

**When to use:**
- **Debounce:** Search inputs, form validation, resize handlers
- **Throttle:** Scroll events, mouse move, API rate limiting`,
    difficulty: 'Medium'
  },
  {
    id: 'promise-methods',
    topic: 'Asynchronous JavaScript',
    question: 'Explain Promise.all, Promise.allSettled, Promise.race, and Promise.any.',
    answer: `**Promise.all:** Waits for ALL to fulfill, rejects on first rejection.
\`\`\`javascript
const results = await Promise.all([
  fetch('/api/users'),
  fetch('/api/posts'),
  fetch('/api/comments')
]);
// If any rejects, entire Promise.all rejects
\`\`\`

**Promise.allSettled:** Waits for ALL to settle (fulfill or reject).
\`\`\`javascript
const results = await Promise.allSettled([
  Promise.resolve(1),
  Promise.reject('error'),
  Promise.resolve(3)
]);
// [
//   { status: 'fulfilled', value: 1 },
//   { status: 'rejected', reason: 'error' },
//   { status: 'fulfilled', value: 3 }
// ]
\`\`\`

**Promise.race:** Returns first to settle (fulfill or reject).
\`\`\`javascript
const result = await Promise.race([
  fetch('/api/data'),
  new Promise((_, reject) => 
    setTimeout(() => reject('Timeout'), 5000)
  )
]);
\`\`\`

**Promise.any:** Returns first to fulfill, rejects only if ALL reject.
\`\`\`javascript
const result = await Promise.any([
  fetch('/server1/data'),
  fetch('/server2/data'),
  fetch('/server3/data')
]);
// First successful response wins
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'currying',
    topic: 'Functional Programming',
    question: 'What is currying in JavaScript?',
    answer: `Currying transforms a function with multiple arguments into a sequence of functions with single arguments.

\`\`\`javascript
// Regular function
function add(a, b, c) {
  return a + b + c;
}
add(1, 2, 3); // 6

// Curried version
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}
curriedAdd(1)(2)(3); // 6

// Arrow function syntax
const curriedAdd = a => b => c => a + b + c;

// Generic curry function
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...nextArgs) {
      return curried.apply(this, args.concat(nextArgs));
    };
  };
}

const curriedSum = curry((a, b, c) => a + b + c);
curriedSum(1)(2)(3); // 6
curriedSum(1, 2)(3); // 6
curriedSum(1)(2, 3); // 6
\`\`\`

**Use cases:** Partial application, event handlers, configuration.`,
    difficulty: 'Hard'
  },
  {
    id: 'memoization',
    topic: 'Performance',
    question: 'What is memoization and how do you implement it?',
    answer: `Memoization caches function results to avoid repeated calculations.

\`\`\`javascript
// Simple memoize
function memoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Usage
const expensiveCalc = memoize((n) => {
  console.log('Calculating...');
  return n * n;
});

expensiveCalc(5); // "Calculating...", 25
expensiveCalc(5); // 25 (cached, no log)

// Fibonacci with memoization
const fibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

fibonacci(50); // Instant (without memo would be extremely slow)
\`\`\`

**With cache limit:**
\`\`\`javascript
function memoizeWithLimit(fn, limit = 100) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn.apply(this, args);
    
    if (cache.size >= limit) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    
    cache.set(key, result);
    return result;
  };
}
\`\`\``,
    difficulty: 'Medium'
  }
];
