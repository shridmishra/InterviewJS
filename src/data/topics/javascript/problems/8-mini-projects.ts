import { Problem, Difficulty } from '@/types';

export const miniProjects: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'project-todo-app',
    title: 'Todo List Application',
    description: `Build a complete Todo List application with the following features:
- Add new todos with a text input
- Mark todos as complete/incomplete (toggle)
- Delete todos
- Store todos in localStorage (persist across page refresh)
- Display count of remaining todos

Your implementation should:
1. Create a function \`createTodoApp()\` that initializes the app
2. Return an object with methods: \`addTodo(text)\`, \`toggleTodo(id)\`, \`deleteTodo(id)\`, \`getTodos()\`
3. Each todo should have: \`{ id: number, text: string, completed: boolean }\`
4. Todos should persist in localStorage under key 'todos'`,
    difficulty: Difficulty.Hard,
    category: 'Mini Projects',
    group: 'Step 8: Mini Projects',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage',
    videoUrl: 'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    starterCode: `function createTodoApp() {
  // Initialize state
  
  // Load from localStorage
  
  // Save to localStorage helper
  
  // Return public API
  return {
    addTodo(text) {
      // Add new todo
    },
    toggleTodo(id) {
      // Toggle completed status
    },
    deleteTodo(id) {
      // Remove todo
    },
    getTodos() {
      // Return all todos
    },
    getRemainingCount() {
      // Return count of incomplete todos
    }
  };
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const hasLocalStorage = userCode.includes('localStorage');
      const hasAddTodo = userCode.includes('addTodo');
      const hasToggle = userCode.includes('toggleTodo') || userCode.includes('toggle');
      const hasDelete = userCode.includes('deleteTodo') || userCode.includes('delete');
      const hasGetTodos = userCode.includes('getTodos') || userCode.includes('todos');
      
      const passed = hasLocalStorage && hasAddTodo && hasToggle && hasDelete && hasGetTodos;
      return [{
        input: 'Code Check',
        expected: 'Todo App with localStorage, CRUD operations',
        actual: passed ? 'All features implemented' : 'Missing some features',
        passed
      }];
    },
  },
  {
    id: 'project-quiz-app',
    title: 'Quiz Application',
    description: `Build an interactive Quiz Application with these features:
- Display questions one at a time with multiple choice answers
- Track current question index and score
- Show feedback after each answer (correct/incorrect)
- Display final score at the end
- Support timer for each question (optional bonus)

Your implementation should:
1. Create a function \`createQuizApp(questions)\` that accepts an array of question objects
2. Each question: \`{ question: string, options: string[], correctIndex: number }\`
3. Return methods: \`getCurrentQuestion()\`, \`submitAnswer(index)\`, \`getScore()\`, \`isComplete()\`
4. Track score and provide feedback`,
    difficulty: Difficulty.Hard,
    category: 'Mini Projects',
    group: 'Step 8: Mini Projects',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array',
    videoUrl: 'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    starterCode: `function createQuizApp(questions) {
  let currentIndex = 0;
  let score = 0;
  
  return {
    getCurrentQuestion() {
      // Return current question or null if complete
    },
    submitAnswer(answerIndex) {
      // Check answer, update score, move to next
      // Return { correct: boolean, correctAnswer: string }
    },
    getScore() {
      // Return { correct: number, total: number, percentage: number }
    },
    isComplete() {
      // Return true if all questions answered
    },
    reset() {
      // Reset quiz to beginning
    }
  };
}

// Example questions format:
const sampleQuestions = [
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctIndex: 1
  }
];`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const hasQuestionTracking = userCode.includes('currentIndex') || userCode.includes('current');
      const hasScoreTracking = userCode.includes('score');
      const hasSubmitAnswer = userCode.includes('submitAnswer');
      const hasGetScore = userCode.includes('getScore');
      const hasComplete = userCode.includes('isComplete') || userCode.includes('complete');
      
      const passed = hasQuestionTracking && hasScoreTracking && hasSubmitAnswer && hasGetScore;
      return [{
        input: 'Code Check',
        expected: 'Quiz App with question navigation and scoring',
        actual: passed ? 'All features implemented' : 'Missing some features',
        passed
      }];
    },
  },
  {
    id: 'project-weather-app',
    title: 'Weather Application',
    description: `Build a Weather Application that fetches and displays weather data:
- Accept a city name as input
- Fetch weather data from an API (simulated for this exercise)
- Display current temperature, conditions, and humidity
- Handle loading states and errors gracefully
- Cache recent searches

Your implementation should:
1. Create an async function \`createWeatherApp(fetchWeatherFn)\` that accepts a fetch function
2. The fetch function signature: \`async (city) => { temp, conditions, humidity }\`
3. Return methods: \`async getWeather(city)\`, \`getRecentSearches()\`, \`clearCache()\`
4. Handle errors and return appropriate error objects`,
    difficulty: Difficulty.Hard,
    category: 'Mini Projects',
    group: 'Step 8: Mini Projects',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API',
    videoUrl: 'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    starterCode: `function createWeatherApp(fetchWeatherFn) {
  const cache = new Map();
  const recentSearches = [];
  
  return {
    async getWeather(city) {
      // Check cache first
      // If not cached, fetch and cache result
      // Add to recent searches (max 5)
      // Handle errors gracefully
      // Return { success: true, data: {...} } or { success: false, error: '...' }
    },
    getRecentSearches() {
      // Return array of recent city names
    },
    clearCache() {
      // Clear the cache
    },
    getCachedData(city) {
      // Return cached data if exists
    }
  };
}

// Example usage with mock fetch:
const mockFetch = async (city) => {
  if (city === 'Invalid') throw new Error('City not found');
  return { temp: 72, conditions: 'Sunny', humidity: 45 };
};`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const hasAsync = userCode.includes('async');
      const hasAwait = userCode.includes('await');
      const hasCache = userCode.includes('cache') || userCode.includes('Map');
      const hasTryCatch = userCode.includes('try') && userCode.includes('catch');
      const hasRecentSearches = userCode.includes('recentSearches') || userCode.includes('recent');
      
      const passed = hasAsync && hasAwait && hasCache && hasTryCatch;
      return [{
        input: 'Code Check',
        expected: 'Weather App with async/await, caching, and error handling',
        actual: passed ? 'All features implemented' : 'Missing async patterns or caching',
        passed
      }];
    },
  },
  {
    id: 'project-shopping-cart',
    title: 'Shopping Cart',
    description: `Build a Shopping Cart with these features:
- Add items to cart (with quantity)
- Remove items from cart
- Update item quantities
- Calculate subtotal, tax, and total
- Apply discount codes

Your implementation should:
1. Create a function \`createShoppingCart(taxRate)\` with tax rate as decimal (e.g., 0.08 for 8%)
2. Each item: \`{ id: string, name: string, price: number, quantity: number }\`
3. Return methods: \`addItem(item)\`, \`removeItem(id)\`, \`updateQuantity(id, qty)\`, \`getCart()\`, \`getTotal()\`
4. Support discount codes that reduce the subtotal by a percentage`,
    difficulty: Difficulty.Hard,
    category: 'Mini Projects',
    group: 'Step 8: Mini Projects',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce',
    videoUrl: 'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    starterCode: `function createShoppingCart(taxRate = 0.08) {
  const items = [];
  let discountCode = null;
  const discountCodes = {
    'SAVE10': 0.10,
    'SAVE20': 0.20
  };
  
  return {
    addItem(item) {
      // Add item or increase quantity if exists
    },
    removeItem(id) {
      // Remove item from cart
    },
    updateQuantity(id, quantity) {
      // Update item quantity (remove if 0)
    },
    getCart() {
      // Return copy of items array
    },
    applyDiscount(code) {
      // Apply discount code if valid
      // Return true if applied, false if invalid
    },
    getTotal() {
      // Return { subtotal, discount, tax, total }
    },
    clearCart() {
      // Empty the cart
    }
  };
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const hasAddItem = userCode.includes('addItem');
      const hasRemoveItem = userCode.includes('removeItem');
      const hasTotal = userCode.includes('getTotal') || userCode.includes('total');
      const hasTax = userCode.includes('tax');
      const hasDiscount = userCode.includes('discount');
      const hasReduce = userCode.includes('reduce') || userCode.includes('forEach');
      
      const passed = hasAddItem && hasRemoveItem && hasTotal && hasTax && hasReduce;
      return [{
        input: 'Code Check',
        expected: 'Shopping Cart with CRUD, tax, and discount',
        actual: passed ? 'All features implemented' : 'Missing some features',
        passed
      }];
    },
  },
  {
    id: 'project-form-validator',
    title: 'Form Validator',
    description: `Build a Form Validator with these features:
- Validate email format
- Validate password strength (min length, uppercase, lowercase, number)
- Validate phone number format
- Validate required fields
- Return detailed error messages

Your implementation should:
1. Create a function \`createFormValidator()\` that returns a validator object
2. Methods: \`validateEmail(email)\`, \`validatePassword(password)\`, \`validatePhone(phone)\`, \`validateRequired(value)\`
3. Each method returns: \`{ valid: boolean, errors: string[] }\`
4. A method \`validateForm(fields)\` that validates all fields and returns combined results`,
    difficulty: Difficulty.Hard,
    category: 'Mini Projects',
    group: 'Step 8: Mini Projects',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions',
    videoUrl: 'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    starterCode: `function createFormValidator() {
  // Email regex pattern
  const emailRegex = /^[\\w.-]+@[\\w.-]+\\.\\w+$/;
  
  // Phone regex pattern (US format)
  const phoneRegex = /^\\d{3}-\\d{3}-\\d{4}$/;
  
  return {
    validateEmail(email) {
      const errors = [];
      // Check if empty
      // Check format with regex
      return { valid: errors.length === 0, errors };
    },
    validatePassword(password, options = { minLength: 8 }) {
      const errors = [];
      // Check minimum length
      // Check for uppercase letter
      // Check for lowercase letter
      // Check for number
      return { valid: errors.length === 0, errors };
    },
    validatePhone(phone) {
      const errors = [];
      // Check format with regex
      return { valid: errors.length === 0, errors };
    },
    validateRequired(value, fieldName = 'Field') {
      const errors = [];
      // Check if value is empty/null/undefined
      return { valid: errors.length === 0, errors };
    },
    validateForm(fields) {
      // Validate all fields and combine results
      // fields: { email, password, phone, ... }
      // Return { valid: boolean, fieldErrors: { email: [...], password: [...] } }
    }
  };
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const hasEmailRegex = userCode.includes('emailRegex') || userCode.includes('@');
      const hasPasswordChecks = userCode.includes('minLength') || userCode.includes('length');
      const hasUpperLower = userCode.includes('uppercase') || userCode.includes('A-Z');
      const hasValidateForm = userCode.includes('validateForm');
      const hasErrors = userCode.includes('errors');
      
      const passed = hasEmailRegex && hasPasswordChecks && hasErrors && hasValidateForm;
      return [{
        input: 'Code Check',
        expected: 'Form Validator with regex and multiple validation methods',
        actual: passed ? 'All features implemented' : 'Missing validation features',
        passed
      }];
    },
  },
  {
    id: 'project-recipe-book',
    title: 'Recipe Book Application',
    description: `Build a Recipe Book application with CRUD operations:
- Add recipes with name, ingredients, and instructions
- Edit existing recipes
- Delete recipes
- Search recipes by name or ingredient
- Mark recipes as favorites
- Store all data in localStorage

Your implementation should:
1. Create a function \`createRecipeBook()\` that initializes the app
2. Each recipe: \`{ id: number, name: string, ingredients: string[], instructions: string, isFavorite: boolean }\`
3. Return methods: \`addRecipe(recipe)\`, \`updateRecipe(id, updates)\`, \`deleteRecipe(id)\`, \`searchRecipes(query)\`, \`toggleFavorite(id)\`, \`getFavorites()\``,
    difficulty: Difficulty.Hard,
    category: 'Mini Projects',
    group: 'Step 8: Mini Projects',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array',
    videoUrl: 'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    starterCode: `function createRecipeBook() {
  let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
  let nextId = recipes.length ? Math.max(...recipes.map(r => r.id)) + 1 : 1;
  
  function save() {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }
  
  return {
    addRecipe({ name, ingredients, instructions }) {
      // Create new recipe with id, add to recipes, save
    },
    updateRecipe(id, updates) {
      // Find recipe by id, merge updates, save
    },
    deleteRecipe(id) {
      // Filter out recipe, save
    },
    searchRecipes(query) {
      // Search by name or ingredients (case-insensitive)
    },
    toggleFavorite(id) {
      // Toggle isFavorite boolean, save
    },
    getFavorites() {
      // Return all recipes where isFavorite is true
    },
    getAllRecipes() {
      // Return all recipes
    }
  };
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const hasLocalStorage = userCode.includes('localStorage');
      const hasAddRecipe = userCode.includes('addRecipe');
      const hasUpdate = userCode.includes('updateRecipe');
      const hasSearch = userCode.includes('searchRecipes') && userCode.includes('filter');
      const hasFavorite = userCode.includes('toggleFavorite') || userCode.includes('isFavorite');
      
      const passed = hasLocalStorage && hasAddRecipe && hasUpdate && hasSearch && hasFavorite;
      return [{
        input: 'Code Check',
        expected: 'Recipe Book with CRUD, search, and favorites',
        actual: passed ? 'All features implemented' : 'Missing some features',
        passed
      }];
    },
  },
  {
    id: 'project-typing-test',
    title: 'Typing Speed Test',
    description: `Build a Typing Speed Test application:
- Display a random text passage for the user to type
- Track time elapsed and calculate WPM (words per minute)
- Calculate accuracy (correct characters / total typed)
- Show real-time progress and errors
- Store high scores in localStorage

Your implementation should:
1. Create a function \`createTypingTest(passages)\` that accepts an array of text passages
2. Return methods: \`start()\`, \`handleInput(typed)\`, \`getStats()\`, \`reset()\`, \`getHighScores()\`
3. Stats should include: \`{ wpm, accuracy, timeElapsed, isComplete, errors }\``,
    difficulty: Difficulty.Hard,
    category: 'Mini Projects',
    group: 'Step 8: Mini Projects',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Performance/now',
    videoUrl: 'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    starterCode: `function createTypingTest(passages) {
  let currentPassage = '';
  let startTime = null;
  let typed = '';
  let isRunning = false;
  
  function getRandomPassage() {
    return passages[Math.floor(Math.random() * passages.length)];
  }
  
  function calculateWPM(text, timeMs) {
    // Words = characters / 5 (standard), WPM = words / minutes
  }
  
  function calculateAccuracy(original, typed) {
    // Compare character by character
  }
  
  return {
    start() {
      // Set currentPassage, startTime, reset typed
    },
    handleInput(input) {
      // Update typed, check if complete
    },
    getStats() {
      // Return { wpm, accuracy, timeElapsed, isComplete, errors }
    },
    reset() {
      // Reset all state
    },
    getHighScores() {
      // Get from localStorage
    },
    saveScore(name, score) {
      // Save to localStorage
    },
    getCurrentPassage() {
      return currentPassage;
    }
  };
}

// Example passages
const samplePassages = [
  "The quick brown fox jumps over the lazy dog.",
  "JavaScript is a versatile programming language."
];`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const hasWPM = userCode.includes('wpm') || userCode.includes('WPM');
      const hasAccuracy = userCode.includes('accuracy');
      const hasTimer = userCode.includes('startTime') || userCode.includes('Date.now') || userCode.includes('performance.now');
      const hasComparison = userCode.includes('charAt') || userCode.includes('split');
      const hasLocalStorage = userCode.includes('localStorage');
      
      const passed = hasWPM && hasAccuracy && hasTimer && hasLocalStorage;
      return [{
        input: 'Code Check',
        expected: 'Typing Test with WPM, accuracy, and high scores',
        actual: passed ? 'All features implemented' : 'Missing some features',
        passed
      }];
    },
  },
  {
    id: 'project-memory-game',
    title: 'Memory Card Game',
    description: `Build a Memory Card matching game:
- Display a grid of face-down cards (pairs of matching symbols)
- Flip cards on click (max 2 at a time)
- Match pairs - when matched, cards stay face-up
- Track number of moves and time
- Win condition: all pairs matched
- Shuffle cards on new game

Your implementation should:
1. Create a function \`createMemoryGame(symbols)\` that accepts an array of symbols to use as pairs
2. Return methods: \`startGame()\`, \`flipCard(index)\`, \`getBoard()\`, \`getStats()\`, \`isGameWon()\`
3. Handle the matching logic and flip animation states`,
    difficulty: Difficulty.Hard,
    category: 'Mini Projects',
    group: 'Step 8: Mini Projects',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort',
    videoUrl: 'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    starterCode: `function createMemoryGame(symbols) {
  let board = [];
  let flippedIndices = [];
  let matchedPairs = [];
  let moves = 0;
  let startTime = null;
  
  function shuffle(array) {
    // Fisher-Yates shuffle algorithm
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  
  return {
    startGame() {
      // Create pairs, shuffle, reset state
      const pairs = [...symbols, ...symbols];
      board = shuffle(pairs).map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false
      }));
      // Reset other state...
    },
    flipCard(index) {
      // Handle flip logic
      // If 2 cards flipped, check for match
      // If match, mark as matched
      // If not, flip back after delay
    },
    getBoard() {
      return board;
    },
    getStats() {
      // Return { moves, timeElapsed, matchedCount, totalPairs }
    },
    isGameWon() {
      // All pairs matched?
    }
  };
}

// Example usage
const symbols = ['A', 'B', 'C', 'D', 'E', 'F'];`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const hasShuffle = userCode.includes('shuffle') || userCode.includes('random');
      const hasFlip = userCode.includes('flipCard') || userCode.includes('isFlipped');
      const hasMatch = userCode.includes('isMatched') || userCode.includes('matched');
      const hasMoves = userCode.includes('moves');
      const hasBoard = userCode.includes('board');
      
      const passed = hasShuffle && hasFlip && hasMatch && hasMoves && hasBoard;
      return [{
        input: 'Code Check',
        expected: 'Memory Game with shuffle, flip, and match logic',
        actual: passed ? 'All features implemented' : 'Missing game logic',
        passed
      }];
    },
  },
  {
    id: 'project-expense-tracker',
    title: 'Expense Tracker',
    description: `Build an Expense Tracker application:
- Add expenses with amount, category, description, and date
- Edit and delete expenses
- Filter by category and date range
- Calculate totals by category
- Display balance (income - expenses)
- Persist data in localStorage

Your implementation should:
1. Create a function \`createExpenseTracker()\` that initializes the tracker
2. Support both income (positive) and expense (negative) entries
3. Return methods: \`addEntry(entry)\`, \`deleteEntry(id)\`, \`getByCategory(category)\`, \`getByDateRange(start, end)\`, \`getSummary()\``,
    difficulty: Difficulty.Hard,
    category: 'Mini Projects',
    group: 'Step 8: Mini Projects',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date',
    videoUrl: 'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    starterCode: `function createExpenseTracker() {
  let entries = JSON.parse(localStorage.getItem('expenses')) || [];
  let nextId = entries.length ? Math.max(...entries.map(e => e.id)) + 1 : 1;
  
  const categories = ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Income', 'Other'];
  
  function save() {
    localStorage.setItem('expenses', JSON.stringify(entries));
  }
  
  return {
    addEntry({ amount, category, description, date }) {
      // Add entry with id and timestamp
    },
    deleteEntry(id) {
      // Remove entry by id
    },
    updateEntry(id, updates) {
      // Update entry fields
    },
    getByCategory(category) {
      // Filter entries by category
    },
    getByDateRange(startDate, endDate) {
      // Filter entries within date range
    },
    getSummary() {
      // Return { totalIncome, totalExpenses, balance, byCategory: {...} }
    },
    getCategories() {
      return categories;
    },
    getAllEntries() {
      return [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  };
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const hasLocalStorage = userCode.includes('localStorage');
      const hasAdd = userCode.includes('addEntry');
      const hasFilter = userCode.includes('filter');
      const hasDateRange = userCode.includes('getByDateRange') || userCode.includes('Date');
      const hasSummary = userCode.includes('getSummary') || userCode.includes('reduce');
      
      const passed = hasLocalStorage && hasAdd && hasFilter && hasSummary;
      return [{
        input: 'Code Check',
        expected: 'Expense Tracker with filtering and summary',
        actual: passed ? 'All features implemented' : 'Missing some features',
        passed
      }];
    },
  },
  {
    id: 'project-pomodoro-timer',
    title: 'Pomodoro Timer',
    description: `Build a Pomodoro Timer application:
- Work sessions (default 25 min) and break sessions (default 5 min)
- Start, pause, resume, and reset timer
- Auto-switch between work and break
- Track completed pomodoros (work sessions)
- Play notification sound or show alert when session ends
- Store session history in localStorage

Your implementation should:
1. Create a function \`createPomodoroTimer(options)\` with customizable durations
2. Return methods: \`start()\`, \`pause()\`, \`reset()\`, \`getTimeRemaining()\`, \`getSession()\`, \`getStats()\`
3. Include callback support for session end notifications`,
    difficulty: Difficulty.Hard,
    category: 'Mini Projects',
    group: 'Step 8: Mini Projects',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/setInterval',
    videoUrl: 'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    starterCode: `function createPomodoroTimer(options = {}) {
  const settings = {
    workDuration: options.workDuration || 25 * 60, // seconds
    breakDuration: options.breakDuration || 5 * 60,
    longBreakDuration: options.longBreakDuration || 15 * 60,
    longBreakInterval: options.longBreakInterval || 4,
    onSessionEnd: options.onSessionEnd || (() => {})
  };
  
  let timeRemaining = settings.workDuration;
  let isRunning = false;
  let isWorkSession = true;
  let completedPomodoros = 0;
  let intervalId = null;
  
  function tick() {
    // Decrement time, check if session ended
  }
  
  function switchSession() {
    // Toggle between work and break
    // After every longBreakInterval pomodoros, take long break
  }
  
  return {
    start() {
      // Start the timer interval
    },
    pause() {
      // Pause the timer
    },
    reset() {
      // Reset to initial state
    },
    getTimeRemaining() {
      // Return { minutes, seconds, totalSeconds }
    },
    getSession() {
      // Return { isWork, pomodorosCompleted }
    },
    getStats() {
      // Get history from localStorage
    },
    setWorkDuration(minutes) {
      // Update work duration
    },
    setBreakDuration(minutes) {
      // Update break duration
    }
  };
}

// Example usage
const timer = createPomodoroTimer({
  onSessionEnd: (session) => {
    alert(session.isWork ? 'Break time!' : 'Back to work!');
  }
});`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const hasInterval = userCode.includes('setInterval') || userCode.includes('intervalId');
      const hasClearInterval = userCode.includes('clearInterval');
      const hasTimeTracking = userCode.includes('timeRemaining');
      const hasSessionSwitch = userCode.includes('isWorkSession') || userCode.includes('switchSession');
      const hasPomodoros = userCode.includes('completedPomodoros') || userCode.includes('pomodoro');
      
      const passed = hasInterval && hasClearInterval && hasTimeTracking && hasSessionSwitch;
      return [{
        input: 'Code Check',
        expected: 'Pomodoro Timer with sessions and tracking',
        actual: passed ? 'All features implemented' : 'Missing timer features',
        passed
      }];
    },
  }
];

