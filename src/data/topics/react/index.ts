import { TopicQuestion } from '../types';

export const reactQuestions: TopicQuestion[] = [
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
  {
    id: 'react-21',
    topic: 'React',
    question: 'What are Error Boundaries and how do you implement them?',
    answer: `Error Boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the whole app.

**Implementation (Class Component only):**
\`\`\`javascript
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
\`\`\`

**Key Points:**
- Must be a class component (hooks version not available yet)
- Does NOT catch errors in event handlers, async code, SSR, or itself
- Use multiple boundaries to isolate different parts of your app`,
    difficulty: 'Medium'
  },
  {
    id: 'react-22',
    topic: 'React',
    question: 'Explain React.lazy and Suspense for code splitting.',
    answer: `React.lazy and Suspense enable code splitting by loading components dynamically only when they're needed.

**React.lazy:**
\`\`\`javascript
const LazyComponent = React.lazy(() => import('./HeavyComponent'));
\`\`\`

**Suspense:**
\`\`\`javascript
<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>
\`\`\`

**Benefits:**
- Reduces initial bundle size
- Faster initial page load
- Components load on demand

**Use Cases:**
- Route-based code splitting
- Heavy components (charts, editors)
- Modals and dialogs`,
    difficulty: 'Medium'
  },
  {
    id: 'react-23',
    topic: 'React',
    question: 'What is forwardRef and when would you use it?',
    answer: `forwardRef is a technique that lets you pass a ref through a component to a child element.

**Problem:** Regular function components can't receive refs directly.

**Solution:**
\`\`\`javascript
const FancyInput = React.forwardRef((props, ref) => (
  <input ref={ref} className="fancy" {...props} />
));

// Usage
const inputRef = useRef();
<FancyInput ref={inputRef} />
inputRef.current.focus();
\`\`\`

**Use Cases:**
- Reusable input/button components
- Focus management
- Integrating with third-party libraries
- Exposing child DOM nodes to parent components`,
    difficulty: 'Medium'
  },
  {
    id: 'react-24',
    topic: 'React',
    question: 'Explain useImperativeHandle and its purpose.',
    answer: `useImperativeHandle customizes the instance value exposed to parent components when using ref with forwardRef.

**Syntax:**
\`\`\`javascript
const FancyInput = React.forwardRef((props, ref) => {
  const inputRef = useRef();
  
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => { inputRef.current.value = ''; }
  }));
  
  return <input ref={inputRef} />;
});

// Parent can now call:
ref.current.focus();
ref.current.clear();
\`\`\`

**Use Cases:**
- Exposing only specific methods (encapsulation)
- Creating custom "handles" with specific API
- Complex imperative logic in reusable components`,
    difficulty: 'Hard'
  },
  {
    id: 'react-25',
    topic: 'React',
    question: 'What are Higher-Order Components (HOCs)?',
    answer: `A Higher-Order Component is a function that takes a component and returns a new enhanced component.

**Pattern:**
\`\`\`javascript
function withLoading(WrappedComponent) {
  return function WithLoading({ isLoading, ...props }) {
    if (isLoading) return <Spinner />;
    return <WrappedComponent {...props} />;
  };
}

// Usage
const EnhancedList = withLoading(UserList);
<EnhancedList isLoading={loading} users={users} />
\`\`\`

**Common HOCs:**
- withRouter (React Router)
- connect (Redux)
- withAuth (authentication)

**Note:** Hooks have largely replaced HOCs, but they're still used and asked about in interviews.`,
    difficulty: 'Medium'
  },
  {
    id: 'react-26',
    topic: 'React',
    question: 'What is the Render Props pattern?',
    answer: `Render Props is a pattern where a component receives a function as a prop that returns React elements, allowing code sharing.

**Example:**
\`\`\`javascript
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMove = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);
  
  return render(position);
}

// Usage
<MouseTracker render={({ x, y }) => (
  <p>Mouse at: {x}, {y}</p>
)} />
\`\`\`

**Alternative using children:**
\`\`\`javascript
<MouseTracker>
  {({ x, y }) => <p>Mouse at: {x}, {y}</p>}
</MouseTracker>
\`\`\`

**Note:** Custom hooks have largely replaced this pattern but it's still interview-relevant.`,
    difficulty: 'Medium'
  },
  {
    id: 'react-27',
    topic: 'React',
    question: 'What is the useId hook and when should you use it?',
    answer: `useId generates unique IDs that are stable across server and client, useful for accessibility attributes.

**Syntax:**
\`\`\`javascript
function PasswordField() {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>Password</label>
      <input id={id} type="password" />
    </>
  );
}
\`\`\`

**Benefits:**
- Avoids ID collisions when component is rendered multiple times
- Stable across SSR and hydration
- Better than generating IDs with Math.random()

**Use Cases:**
- Accessibility (label + input)
- ARIA attributes (aria-describedby)
- Multiple instances of same component`,
    difficulty: 'Easy'
  },
  {
    id: 'react-28',
    topic: 'React',
    question: 'Explain useTransition and its use case.',
    answer: `useTransition marks state updates as non-urgent, allowing React to keep the UI responsive during heavy updates.

**Syntax:**
\`\`\`javascript
function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();
  
  function handleChange(e) {
    setQuery(e.target.value); // Urgent: update input immediately
    
    startTransition(() => {
      setResults(filterLargeList(e.target.value)); // Non-urgent
    });
  }
  
  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending ? <Spinner /> : <Results data={results} />}
    </>
  );
}
\`\`\`

**Key Points:**
- isPending indicates transition is in progress
- Urgent updates (typing) interrupt non-urgent ones
- Part of React 18's concurrent features`,
    difficulty: 'Hard'
  },
  {
    id: 'react-29',
    topic: 'React',
    question: 'What is useDeferredValue and how does it differ from useTransition?',
    answer: `useDeferredValue defers updating a value, similar to useTransition but for values you don't control.

**Syntax:**
\`\`\`javascript
function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);
  const results = useMemo(() => 
    filterLargeList(deferredQuery), [deferredQuery]
  );
  
  return <Results data={results} />;
}
\`\`\`

**Difference from useTransition:**
| useTransition | useDeferredValue |
|---------------|------------------|
| Wraps state update function | Wraps a value |
| You control the state | Value comes from props/parent |
| Returns isPending flag | No pending indicator built-in |

**Use Case:** When you can't access the state setter (e.g., value from props).`,
    difficulty: 'Hard'
  },
  {
    id: 'react-30',
    topic: 'React',
    question: 'How do you handle events in React and what are synthetic events?',
    answer: `React uses Synthetic Events - a cross-browser wrapper around native events that normalizes behavior.

**Event Handling:**
\`\`\`javascript
function Form() {
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
    e.stopPropagation(); // Stop event bubbling
    console.log('Form submitted');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}
\`\`\`

**Key Differences from DOM:**
- camelCase naming (onClick, not onclick)
- Pass functions, not strings
- Events are pooled (reused) for performance
- Access native event via e.nativeEvent

**Common Patterns:**
\`\`\`javascript
// Passing arguments
<button onClick={() => handleClick(id)}>Click</button>

// Access event + custom data
<button onClick={(e) => handleClick(e, id)}>Click</button>
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'react-31',
    topic: 'React',
    question: 'What are React Server Components?',
    answer: `React Server Components (RSC) render on the server and send zero JavaScript to the client.

**Key Characteristics:**
- Run on the server only
- Can directly access backend resources (databases, file system)
- Don't add to bundle size
- Cannot use hooks or browser APIs

**Client vs Server Components:**
\`\`\`javascript
// Server Component (default in Next.js App Router)
async function ProductPage({ id }) {
  const product = await db.query(\`SELECT * FROM products WHERE id = \${id}\`);
  return <Product data={product} />;
}

// Client Component (add 'use client' directive)
'use client'
function AddToCart({ productId }) {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>Add ({count})</button>;
}
\`\`\`

**Benefits:**
- Smaller bundle sizes
- Better performance
- Direct data access
- SEO friendly`,
    difficulty: 'Hard'
  },
  {
    id: 'react-32',
    topic: 'React',
    question: 'What is the difference between useState and useReducer?',
    answer: `**useState:** For simple, independent state values.
\`\`\`javascript
const [count, setCount] = useState(0);
setCount(count + 1);
\`\`\`

**useReducer:** For complex state logic or related values.
\`\`\`javascript
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    case 'reset': return { count: 0 };
    default: return state;
  }
};

const [state, dispatch] = useReducer(reducer, { count: 0 });
dispatch({ type: 'increment' });
\`\`\`

**When to use useReducer:**
- State logic is complex
- Next state depends on previous
- Multiple related values
- Testing is important (reducers are pure functions)`,
    difficulty: 'Medium'
  },
  {
    id: 'react-33',
    topic: 'React',
    question: 'How do you optimize React performance?',
    answer: `**1. Memoization:**
\`\`\`javascript
// Memoize components
const MemoizedComponent = React.memo(MyComponent);

// Memoize values
const expensiveValue = useMemo(() => computeExpensive(a, b), [a, b]);

// Memoize callbacks
const handleClick = useCallback(() => doSomething(id), [id]);
\`\`\`

**2. Code Splitting:**
\`\`\`javascript
const LazyComponent = React.lazy(() => import('./HeavyComponent'));
\`\`\`

**3. Virtualization (for long lists):**
\`\`\`javascript
import { FixedSizeList } from 'react-window';
\`\`\`

**4. Key Optimization:**
- Use stable, unique keys (not array index)

**5. Avoid unnecessary renders:**
- Lift state only when needed
- Use Context wisely (split contexts)

**6. Debounce/throttle expensive operations**

**7. Use production builds**`,
    difficulty: 'Medium'
  },
  {
    id: 'react-34',
    topic: 'React',
    question: 'What is the React component lifecycle?',
    answer: `**Class Component Lifecycle:**

**Mounting:**
1. constructor()
2. static getDerivedStateFromProps()
3. render()
4. componentDidMount()

**Updating:**
1. static getDerivedStateFromProps()
2. shouldComponentUpdate()
3. render()
4. getSnapshotBeforeUpdate()
5. componentDidUpdate()

**Unmounting:**
1. componentWillUnmount()

**Hooks Equivalent:**
\`\`\`javascript
// componentDidMount
useEffect(() => {
  // mount logic
}, []);

// componentDidUpdate
useEffect(() => {
  // update logic
}, [dependency]);

// componentWillUnmount
useEffect(() => {
  return () => {
    // cleanup
  };
}, []);
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'react-35',
    topic: 'React',
    question: 'What is the difference between props and state?',
    answer: `**Props:**
- Passed from parent to child
- Read-only (immutable)
- Used to configure component
- Changes trigger re-render
- Component has no control over its props

**State:**
- Managed within the component
- Mutable (via setState/useState)
- Used for internal component data
- Changes trigger re-render
- Component has full control

\`\`\`javascript
// Props: passed from parent
function Child({ title, onClick }) {
  return <button onClick={onClick}>{title}</button>;
}

// State: managed internally
function Parent() {
  const [count, setCount] = useState(0);
  return <Child title={count} onClick={() => setCount(c => c + 1)} />;
}
\`\`\`

**Key Difference:** Props are how components communicate; state is how they remember things.`,
    difficulty: 'Easy'
  },
  {
    id: 'react-36',
    topic: 'React',
    question: 'What is prop drilling and how do you avoid it?',
    answer: `**Prop Drilling:** Passing props through many component levels to reach a deeply nested child.

**Problem:**
\`\`\`javascript
<App>              // has user
  <Layout user={user}>
    <Sidebar user={user}>
      <UserProfile user={user} />  // needs user
    </Sidebar>
  </Layout>
</App>
\`\`\`

**Solutions:**

**1. Context API:**
\`\`\`javascript
const UserContext = createContext();

function App() {
  return (
    <UserContext.Provider value={user}>
      <Layout />
    </UserContext.Provider>
  );
}

function UserProfile() {
  const user = useContext(UserContext);
  return <p>{user.name}</p>;
}
\`\`\`

**2. Component Composition:**
\`\`\`javascript
<Layout>
  <UserProfile user={user} />
</Layout>
\`\`\`

**3. State Management (Redux, Zustand)**`,
    difficulty: 'Easy'
  },
  {
    id: 'react-37',
    topic: 'React',
    question: 'How do you test React components?',
    answer: `**Testing Library Setup:**
\`\`\`javascript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
\`\`\`

**Unit Test:**
\`\`\`javascript
test('renders button with text', () => {
  render(<Button label="Click me" />);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
\`\`\`

**User Interaction:**
\`\`\`javascript
test('increments counter on click', async () => {
  render(<Counter />);
  const button = screen.getByRole('button');
  await userEvent.click(button);
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
\`\`\`

**Async Testing:**
\`\`\`javascript
test('loads user data', async () => {
  render(<UserProfile id="1" />);
  await waitFor(() => {
    expect(screen.getByText('John')).toBeInTheDocument();
  });
});
\`\`\`

**Best Practices:**
- Query by role, label, or test-id (accessibility)
- Test behavior, not implementation
- Use userEvent over fireEvent`,
    difficulty: 'Medium'
  },
  {
    id: 'react-38',
    topic: 'React',
    question: 'What is the useLayoutEffect hook?',
    answer: `useLayoutEffect runs synchronously after DOM mutations but before the browser paints.

**Difference from useEffect:**
| useEffect | useLayoutEffect |
|-----------|-----------------|
| Runs after paint | Runs before paint |
| Asynchronous | Synchronous |
| Won't block visual updates | May block visual updates |

**When to use useLayoutEffect:**
\`\`\`javascript
function Tooltip({ targetRef, children }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    // Measure BEFORE browser paints to avoid flicker
    const rect = targetRef.current.getBoundingClientRect();
    setPosition({ top: rect.bottom, left: rect.left });
  }, [targetRef]);

  return <div style={position}>{children}</div>;
}
\`\`\`

**Use Cases:**
- Measuring DOM elements
- Synchronously updating DOM
- Preventing visual flicker
- Animations that need precise timing`,
    difficulty: 'Hard'
  },
  {
    id: 'react-39',
    topic: 'React',
    question: 'What is Concurrent Mode in React 18?',
    answer: `Concurrent Mode (now just "Concurrent React") allows React to interrupt, pause, and resume rendering work.

**Key Features:**

**1. Automatic Batching:**
\`\`\`javascript
// React 18 batches ALL state updates
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // Only ONE re-render (batched)
}, 1000);
\`\`\`

**2. Transitions:**
\`\`\`javascript
const [isPending, startTransition] = useTransition();
startTransition(() => {
  setSearchResults(/* heavy computation */);
});
\`\`\`

**3. Suspense for Data Fetching:**
\`\`\`javascript
<Suspense fallback={<Loading />}>
  <DataComponent />
</Suspense>
\`\`\`

**Benefits:**
- Better perceived performance
- UI stays responsive during updates
- Interruptible rendering`,
    difficulty: 'Hard'
  },
  {
    id: 'react-40',
    topic: 'React',
    question: 'How do you use Context API effectively?',
    answer: `**Creating Context:**
\`\`\`javascript
const ThemeContext = createContext('light');

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be within ThemeProvider');
  return context;
}
\`\`\`

**Best Practices:**
1. **Split contexts** by update frequency
2. **Memoize provider value** to prevent unnecessary renders
3. **Create custom hooks** for consuming context
4. **Keep context close** to where it's needed
5. **Don't overuse** - not a replacement for all state

**When to use:**
- Theme, locale, user settings
- Authentication state
- Feature flags`,
    difficulty: 'Medium'
  },
  {
    id: 'react-41',
    topic: 'React',
    question: 'What is hydration in React?',
    answer: `Hydration is the process of attaching React to HTML that was server-rendered.

**How it works:**
1. Server renders HTML and sends to client
2. Client receives HTML (fast initial paint)
3. React loads and "hydrates" - attaches event handlers
4. Page becomes interactive

\`\`\`javascript
// Client-side hydration
import { hydrateRoot } from 'react-dom/client';

const root = hydrateRoot(
  document.getElementById('root'),
  <App />
);
\`\`\`

**Hydration Errors:**
\`\`\`javascript
// Server and client mismatch causes errors
function Clock() {
  return <p>{new Date().toString()}</p>; // Different on server vs client!
}

// Fix: useEffect for client-only content
function Clock() {
  const [time, setTime] = useState('');
  useEffect(() => setTime(new Date().toString()), []);
  return <p>{time}</p>;
}
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'react-42',
    topic: 'React',
    question: 'What are React Server Actions?',
    answer: `Server Actions are async functions that run on the server, enabling mutations without API routes.

\`\`\`javascript
// app/actions.js
'use server'

async function createPost(formData) {
  const title = formData.get('title');
  await db.insert({ title });
  revalidatePath('/posts');
}

// Component using the action
'use client'
function Form() {
  return (
    <form action={createPost}>
      <input name="title" />
      <button type="submit">Create</button>
    </form>
  );
}

// With useFormState for loading/error states
const [state, formAction] = useFormState(createPost, initialState);
\`\`\`

**Benefits:**
- No API routes needed for mutations
- Progressive enhancement (works without JS)
- Built-in form handling
- Automatic revalidation`,
    difficulty: 'Hard'
  },
  {
    id: 'react-43',
    topic: 'React',
    question: 'What is the difference between controlled and uncontrolled forms?',
    answer: `**Controlled Forms:**
\`\`\`javascript
function ControlledForm() {
  const [value, setValue] = useState('');
  
  return (
    <input 
      value={value} 
      onChange={e => setValue(e.target.value)} 
    />
  );
}
\`\`\`
- React controls the value
- Can validate on every keystroke
- More code but more control

**Uncontrolled Forms:**
\`\`\`javascript
function UncontrolledForm() {
  const inputRef = useRef();
  
  const handleSubmit = () => {
    console.log(inputRef.current.value);
  };
  
  return <input ref={inputRef} />;
}
\`\`\`
- DOM controls the value
- Access value via ref
- Simpler for simple forms

**When to use each:**
- Controlled: Validation, conditional disabling, dynamic inputs
- Uncontrolled: Simple forms, integrating non-React code`,
    difficulty: 'Easy'
  },
  {
    id: 'react-44',
    topic: 'React',
    question: 'What is useOptimistic and how do you use it?',
    answer: `useOptimistic (React 19) updates UI optimistically while an action is in progress.

\`\`\`javascript
import { useOptimistic } from 'react';

function TodoList({ todos }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, { ...newTodo, pending: true }]
  );

  async function addTodo(formData) {
    const newTodo = { title: formData.get('title') };
    addOptimisticTodo(newTodo); // Immediately shows
    await saveTodo(newTodo);    // Then persists
  }

  return (
    <>
      <form action={addTodo}>
        <input name="title" />
        <button>Add</button>
      </form>
      {optimisticTodos.map(todo => (
        <div style={{ opacity: todo.pending ? 0.5 : 1 }}>
          {todo.title}
        </div>
      ))}
    </>
  );
}
\`\`\`

**Benefits:**
- Instant UI feedback
- Automatic rollback on error`,
    difficulty: 'Hard'
  },
  {
    id: 'react-45',
    topic: 'React',
    question: 'What is React Portals and when would you use them?',
    answer: `Portals render children into a DOM node outside the parent component's hierarchy.

\`\`\`javascript
import { createPortal } from 'react-dom';

function Modal({ children, isOpen }) {
  if (!isOpen) return null;
  
  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

// Usage
function App() {
  return (
    <div>
      <Modal isOpen={showModal}>
        <h1>Modal Title</h1>
      </Modal>
    </div>
  );
}
\`\`\`

**Use Cases:**
- Modals/dialogs
- Tooltips
- Dropdown menus
- Full-screen overlays

**Key Point:** Event bubbling still works through React's component tree, not the DOM tree.`,
    difficulty: 'Medium'
  },
  {
    id: 'react-46',
    topic: 'React',
    question: 'How do you handle forms in React?',
    answer: `**Basic Form Handling:**
\`\`\`javascript
function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} />
      <input name="email" value={formData.email} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}
\`\`\`

**With Form Libraries (React Hook Form):**
\`\`\`javascript
import { useForm } from 'react-hook-form';

function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <input {...register('email', { required: true })} />
      {errors.email && <span>Required</span>}
      <button type="submit">Submit</button>
    </form>
  );
}
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'react-47',
    topic: 'React',
    question: 'What is the useSyncExternalStore hook?',
    answer: `useSyncExternalStore subscribes to external stores (like Redux) in a concurrent-safe way.

\`\`\`javascript
import { useSyncExternalStore } from 'react';

// External store (non-React)
const store = {
  state: { count: 0 },
  listeners: new Set(),
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  },
  getSnapshot() {
    return this.state.count;
  },
  increment() {
    this.state.count++;
    this.listeners.forEach(l => l());
  }
};

// Component
function Counter() {
  const count = useSyncExternalStore(
    store.subscribe.bind(store),
    store.getSnapshot.bind(store),
    store.getSnapshot.bind(store) // Server snapshot (SSR)
  );

  return <button onClick={() => store.increment()}>{count}</button>;
}
\`\`\`

**Use Cases:**
- Third-party state libraries
- Browser APIs (window dimensions, online status)
- Legacy code integration`,
    difficulty: 'Hard'
  },
  {
    id: 'react-48',
    topic: 'React',
    question: 'What is React reconciliation?',
    answer: `Reconciliation is React's algorithm for comparing two trees and determining which parts need to change.

**Key Concepts:**

**1. Diffing Algorithm:**
- Compares trees level by level
- Different element types = rebuild subtree
- Same type = update props, keep instance

**2. Keys:**
\`\`\`javascript
// Without keys - all items re-render
{items.map(item => <Item data={item} />)}

// With keys - React tracks identity
{items.map(item => <Item key={item.id} data={item} />)}
\`\`\`

**3. Rules:**
- Different root elements = unmount old, mount new
- Same DOM element = keep node, update attributes
- Same component = keep instance, update props

**Why Keys Matter:**
\`\`\`javascript
// BAD: Using index as key
{items.map((item, i) => <Item key={i} />)}
// If items reorder, wrong components get updated

// GOOD: Stable unique keys
{items.map(item => <Item key={item.id} />)}
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'react-49',
    topic: 'React',
    question: 'How do you implement infinite scroll in React?',
    answer: `**Using Intersection Observer:**
\`\`\`javascript
function InfiniteList() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !loading) {
        setPage(p => p + 1);
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  useEffect(() => {
    setLoading(true);
    fetchItems(page)
      .then(newItems => {
        setItems(prev => [...prev, ...newItems]);
        setLoading(false);
      });
  }, [page]);

  return (
    <>
      {items.map(item => <Item key={item.id} {...item} />)}
      <div ref={loaderRef}>
        {loading && <Spinner />}
      </div>
    </>
  );
}
\`\`\`

**Libraries:** react-infinite-scroll-component, react-window (for virtualization)`,
    difficulty: 'Medium'
  },
  {
    id: 'react-50',
    topic: 'React',
    question: 'What is state colocation and why is it important?',
    answer: `State colocation means keeping state as close as possible to where it's used.

**Anti-pattern (over-lifting):**
\`\`\`javascript
// State in App, but only Form uses it
function App() {
  const [formData, setFormData] = useState({});
  return <Form data={formData} onChange={setFormData} />;
}
\`\`\`

**Colocated state:**
\`\`\`javascript
function App() {
  return <Form />;
}

function Form() {
  const [formData, setFormData] = useState({});
  // State lives where it's used
  return <input value={formData.name} onChange={...} />;
}
\`\`\`

**Benefits:**
- Less prop drilling
- Better performance (fewer components re-render)
- Easier to understand
- Components are more self-contained

**Rule of thumb:**
1. Start with state in the component that needs it
2. Lift only when siblings need to share it
3. Use Context for truly global state`,
    difficulty: 'Easy'
  },
  {
    id: 'react-51',
    topic: 'React',
    question: 'What are compound components in React?',
    answer: `Compound components work together to share implicit state, providing flexible APIs.

\`\`\`javascript
const TabContext = createContext();

function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabContext.Provider>
  );
}

function TabList({ children }) {
  return <div className="tab-list">{children}</div>;
}

function Tab({ id, children }) {
  const { activeTab, setActiveTab } = useContext(TabContext);
  return (
    <button 
      className={activeTab === id ? 'active' : ''}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
}

function TabPanel({ id, children }) {
  const { activeTab } = useContext(TabContext);
  return activeTab === id ? <div>{children}</div> : null;
}

// Usage - flexible composition
<Tabs defaultTab="tab1">
  <TabList>
    <Tab id="tab1">Tab 1</Tab>
    <Tab id="tab2">Tab 2</Tab>
  </TabList>
  <TabPanel id="tab1">Content 1</TabPanel>
  <TabPanel id="tab2">Content 2</TabPanel>
</Tabs>
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'react-52',
    topic: 'React',
    question: 'What is the useDebugValue hook?',
    answer: `useDebugValue displays a label in React DevTools for custom hooks.

\`\`\`javascript
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useDebugValue(isOnline ? 'Online' : 'Offline');

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

// With deferred formatting (for expensive operations)
useDebugValue(date, date => date.toDateString());
\`\`\`

**In DevTools:**
Shows "OnlineStatus: Online" when inspecting components using this hook.`,
    difficulty: 'Easy'
  },
  {
    id: 'react-53',
    topic: 'React',
    question: 'How do you handle authentication in React?',
    answer: `**Context-based Authentication:**
\`\`\`javascript
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth().then(user => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  const login = async (credentials) => {
    const user = await loginAPI(credentials);
    setUser(user);
  };

  const logout = async () => {
    await logoutAPI();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Protected Route
function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) return <Loading />;
  if (!user) return <Navigate to="/login" />;
  return children;
}
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'react-54',
    topic: 'React',
    question: 'What is the difference between useEffect and event handlers?',
    answer: `**Event Handlers:**
- Run in response to user interactions
- Synchronous with the event
- Can access current state/props without dependencies

**useEffect:**
- Runs after render
- For synchronizing with external systems
- Requires dependency array

\`\`\`javascript
function Chat({ roomId }) {
  const [message, setMessage] = useState('');

  // Event handler - response to user action
  const handleSend = () => {
    sendMessage(message);
    setMessage('');
  };

  // useEffect - synchronize with external system
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  return (
    <>
      <input value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </>
  );
}
\`\`\`

**Rule:** If something can be done in an event handler, don't use useEffect.`,
    difficulty: 'Medium'
  },
  {
    id: 'react-55',
    topic: 'React',
    question: 'What is the use hook in React 19?',
    answer: `The \`use\` hook reads values from resources like Promises or Context.

**Reading Promises:**
\`\`\`javascript
async function fetchUser(id) {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json();
}

function User({ id }) {
  const user = use(fetchUser(id)); // Suspends until resolved
  return <h1>{user.name}</h1>;
}

// Wrap with Suspense
<Suspense fallback={<Loading />}>
  <User id="1" />
</Suspense>
\`\`\`

**Reading Context (conditionally):**
\`\`\`javascript
function Button({ showTheme }) {
  if (showTheme) {
    const theme = use(ThemeContext); // Can be conditional!
    return <button className={theme}>Click</button>;
  }
  return <button>Click</button>;
}
\`\`\`

**Key Difference from useContext:**
- \`use\` can be called conditionally
- \`use\` works with Promises
- Must still follow Rules of Hooks for other hooks`,
    difficulty: 'Hard'
  }
];

