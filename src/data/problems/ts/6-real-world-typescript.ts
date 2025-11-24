import { Problem, Difficulty } from "../../../types";

export const typescriptRealWorld: Omit<
  Problem,
  "status" | "isStarred" | "notes"
>[] = [
  {
    id: "ts-api-response-type",
    title: "API Response Type",
    description:
      "Create a generic API response type that wraps data with success/error states.",
    difficulty: Difficulty.Medium,
    category: "Real World",
    group: "Step 6: Real-World TypeScript",
    docsUrl: "https://www.typescriptlang.org/docs/handbook/2/generics.html",
    starterCode: `type ApiResponse<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

function handleResponse<T>(response: ApiResponse<T>): T | null {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      try {
        const func = new Function(`
          ${userCode}
          const successRes = handleResponse({ success: true, data: "hello" });
          const errorRes = handleResponse({ success: false, error: "failed" });
          return { successRes, errorRes };
        `);
        const result = func();
        const passed = result.successRes === "hello" && result.errorRes === null;
        return [
          {
            input: "N/A",
            expected: "{ successRes: 'hello', errorRes: null }",
            actual: JSON.stringify(result),
            passed: passed,
          },
        ];
      } catch (e: unknown) {
        return [
          {
            input: "N/A",
            expected: "No errors",
            actual: `Error: ${e instanceof Error ? e.message : String(e)}`,
            passed: false,
          },
        ];
      }
    },
  },
  {
    id: "ts-form-validation",
    title: "Form Validation Types",
    description:
      "Create types for a form with validation rules and error messages.",
    difficulty: Difficulty.Hard,
    category: "Real World",
    group: "Step 6: Real-World TypeScript",
    docsUrl: "https://www.typescriptlang.org/docs/handbook/2/mapped-types.html",
    starterCode: `interface LoginForm {
  email: string;
  password: string;
}

type ValidationErrors<T> = Partial<Record<keyof T, string>>;

function validateForm(form: LoginForm): ValidationErrors<LoginForm> {
  const errors: ValidationErrors<LoginForm> = {};
  
  // Your code here
  
  return errors;
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      try {
        const func = new Function(`
          ${userCode}
          const errors = validateForm({ email: "invalid", password: "123" });
          return errors;
        `);
        const result = func();
        const passed = result.email && result.password;
        return [
          {
            input: "{ email: 'invalid', password: '123' }",
            expected: "Validation errors",
            actual: JSON.stringify(result),
            passed: passed,
          },
        ];
      } catch (e: unknown) {
        return [
          {
            input: "N/A",
            expected: "No errors",
            actual: `Error: ${e instanceof Error ? e.message : String(e)}`,
            passed: false,
          },
        ];
      }
    },
  },
  {
    id: "ts-builder-pattern",
    title: "Builder Pattern with Types",
    description:
      "Implement a type-safe builder pattern for creating objects.",
    difficulty: Difficulty.Hard,
    category: "Real World",
    group: "Step 6: Real-World TypeScript",
    docsUrl: "https://www.typescriptlang.org/docs/handbook/2/classes.html",
    starterCode: `interface User {
  name: string;
  email: string;
  age?: number;
}

class UserBuilder {
  private user: Partial<User> = {};

  setName(name: string): this {
    this.user.name = name;
    return this;
  }

  setEmail(email: string): this {
    this.user.email = email;
    return this;
  }

  setAge(age: number): this {
    this.user.age = age;
    return this;
  }

  build(): User {
    // Your code here
  }
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      try {
        const func = new Function(`
          ${userCode}
          const user = new UserBuilder()
            .setName("Alice")
            .setEmail("alice@example.com")
            .setAge(30)
            .build();
          return user;
        `);
        const result = func();
        const passed =
          result.name === "Alice" &&
          result.email === "alice@example.com" &&
          result.age === 30;
        return [
          {
            input: "N/A",
            expected: "User with all fields",
            actual: JSON.stringify(result),
            passed: passed,
          },
        ];
      } catch (e: unknown) {
        return [
          {
            input: "N/A",
            expected: "No errors",
            actual: `Error: ${e instanceof Error ? e.message : String(e)}`,
            passed: false,
          },
        ];
      }
    },
  },
  {
    id: "ts-event-emitter",
    title: "Type-Safe Event Emitter",
    description:
      "Create a type-safe event emitter using generics and string literal types.",
    difficulty: Difficulty.Hard,
    category: "Real World",
    group: "Step 6: Real-World TypeScript",
    docsUrl: "https://www.typescriptlang.org/docs/handbook/2/generics.html",
    starterCode: `type EventMap = {
  userLoggedIn: { userId: string; timestamp: number };
  dataFetched: { data: string[] };
};

class EventEmitter<T extends Record<string, any>> {
  private listeners: Partial<{ [K in keyof T]: ((data: T[K]) => void)[] }> = {};

  on<K extends keyof T>(event: K, callback: (data: T[K]) => void): void {
    // Your code here
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(callback);
  }

  emit<K extends keyof T>(event: K, data: T[K]): void {
    // Your code here
    const callbacks = this.listeners[event];
    if (callbacks) {
      callbacks.forEach(cb => cb(data));
    }
  }
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      try {
        const func = new Function(`
          ${userCode}
          const emitter = new EventEmitter();
          let result = null;
          emitter.on("userLoggedIn", (data) => {
            result = data.userId;
          });
          emitter.emit("userLoggedIn", { userId: "123", timestamp: Date.now() });
          return result;
        `);
        const result = func();
        const passed = result === "123";
        return [
          {
            input: "N/A",
            expected: "123",
            actual: result,
            passed: passed,
          },
        ];
      } catch (e: unknown) {
        return [
          {
            input: "N/A",
            expected: "No errors",
            actual: `Error: ${e instanceof Error ? e.message : String(e)}`,
            passed: false,
          },
        ];
      }
    },
  },
];
