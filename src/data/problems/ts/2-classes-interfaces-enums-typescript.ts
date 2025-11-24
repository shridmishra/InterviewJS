import { Problem, Difficulty } from "../../../types";
import { runTests } from "./utils";

export const typescriptClassesInterfacesEnums: Omit<
  Problem,
  "status" | "isStarred" | "notes"
>[] = [
  {
    id: "ts-simple-class",
    title: "Simple Class",
    description:
      "Create a class `Person` with properties `name` (string) and `age` (number), and a method `greet` that returns a greeting message.",
    difficulty: Difficulty.Easy,
    category: "Classes",
    group: "Step 2: TypeScript Classes, Interfaces & Enums",
    docsUrl: "https://www.typescriptlang.org/docs/handbook/2/classes.html",
    starterCode: `class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): string {
    // Your code here
  }
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      try {
        const func = new Function(`
          ${userCode}
          const person = new Person("Alice", 30);
          return person.greet();
        `);
        const result = func();
        const passed =
          typeof result === "string" && result.includes("Alice");
        return [
          {
            input: "N/A",
            expected: "Greeting with name",
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
  {
    id: "ts-class-inheritance",
    title: "Class Inheritance",
    description:
      "Create a class `Animal` with a `name` property and a `makeSound` method. Then create a `Dog` class that extends `Animal` and overrides `makeSound`.",
    difficulty: Difficulty.Medium,
    category: "Classes",
    group: "Step 2: TypeScript Classes, Interfaces & Enums",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/2/classes.html#extends",
    starterCode: `class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  makeSound(): string {
    return "Some sound";
  }
}

class Dog extends Animal {
  makeSound(): string {
    // Your code here
  }
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      try {
        const func = new Function(`
          ${userCode}
          const dog = new Dog("Rex");
          return dog.makeSound();
        `);
        const result = func();
        const passed = typeof result === "string" && result.length > 0;
        return [
          {
            input: "N/A",
            expected: "Dog sound",
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
  {
    id: "ts-interface-implementation",
    title: "Interface Implementation",
    description:
      "Create an interface `Shape` with a method `area()` that returns a number. Then create a class `Rectangle` that implements this interface.",
    difficulty: Difficulty.Medium,
    category: "Interfaces",
    group: "Step 2: TypeScript Classes, Interfaces & Enums",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/2/classes.html#implements-clauses",
    starterCode: `interface Shape {
  area(): number;
}

class Rectangle implements Shape {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  area(): number {
    // Your code here
  }
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      try {
        const func = new Function(`
          ${userCode}
          const rect = new Rectangle(5, 10);
          return rect.area();
        `);
        const result = func();
        const passed = result === 50;
        return [
          {
            input: "Rectangle(5, 10)",
            expected: "50",
            actual: String(result),
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
    id: "ts-access-modifiers",
    title: "Access Modifiers",
    description:
      "Create a class `BankAccount` with a private `balance` property, a public `deposit` method, and a public `getBalance` method.",
    difficulty: Difficulty.Medium,
    category: "Classes",
    group: "Step 2: TypeScript Classes, Interfaces & Enums",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/2/classes.html#member-visibility",
    starterCode: `class BankAccount {
  private balance: number;

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  deposit(amount: number): void {
    // Your code here
  }

  getBalance(): number {
    // Your code here
  }
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      try {
        const func = new Function(`
          ${userCode}
          const account = new BankAccount(100);
          account.deposit(50);
          return account.getBalance();
        `);
        const result = func();
        const passed = result === 150;
        return [
          {
            input: "BankAccount(100).deposit(50)",
            expected: "150",
            actual: String(result),
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
    id: "ts-abstract-class",
    title: "Abstract Class",
    description:
      "Create an abstract class `Vehicle` with an abstract method `move()`. Then create a concrete class `Car` that extends it.",
    difficulty: Difficulty.Hard,
    category: "Classes",
    group: "Step 2: TypeScript Classes, Interfaces & Enums",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/2/classes.html#abstract-classes-and-members",
    starterCode: `abstract class Vehicle {
  abstract move(): string;
  
  describe(): string {
    return "This is a vehicle";
  }
}

class Car extends Vehicle {
  move(): string {
    // Your code here
  }
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      try {
        const func = new Function(`
          ${userCode}
          const car = new Car();
          return car.move();
        `);
        const result = func();
        const passed = typeof result === "string" && result.length > 0;
        return [
          {
            input: "N/A",
            expected: "Movement description",
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

  {
    id: "ts-numeric-enum",
    title: "Numeric Enum",
    description:
      "Create a numeric enum `Direction` with values North, South, East, West, and use it in a function.",
    difficulty: Difficulty.Easy,
    category: "Enums",
    group: "Step 2: TypeScript Classes, Interfaces & Enums",
    docsUrl: "https://www.typescriptlang.org/docs/handbook/enums.html",
    starterCode: `enum Direction {
  // Define enum members
}

function getDirectionName(dir: Direction): string {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      try {
        const func = new Function(`
          ${userCode}
          return getDirectionName(0);
        `);
        const result = func();
        const passed = result === "North";
        return [
          {
            input: "Direction.North",
            expected: "North",
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
  {
    id: "ts-string-enum",
    title: "String Enum",
    description:
      "Create a string enum `Status` with values Pending, Approved, Rejected.",
    difficulty: Difficulty.Easy,
    category: "Enums",
    group: "Step 2: TypeScript Classes, Interfaces & Enums",
    docsUrl: "https://www.typescriptlang.org/docs/handbook/enums.html#string-enums",
    starterCode: `enum Status {
  // Define enum members
}

function getStatusMessage(status: Status): string {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      try {
        const func = new Function(`
          ${userCode}
          return getStatusMessage("APPROVED");
        `);
        const result = func();
        const passed = result === "Approved!";
        return [
          {
            input: "Status.Approved",
            expected: "Approved!",
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
  {
    id: "ts-literal-types",
    title: "Literal Types",
    description:
      "Use literal types to create a function that accepts only specific string values.",
    difficulty: Difficulty.Medium,
    category: "Literals",
    group: "Step 2: TypeScript Classes, Interfaces & Enums",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types",
    starterCode: `type Size = "small" | "medium" | "large";

function getPrice(size: Size): number {
  // Your code here
}`,
    testCases: [
      { input: ["small"], expectedOutput: 5 },
      { input: ["medium"], expectedOutput: 10 },
      { input: ["large"], expectedOutput: 15 },
    ],
    solutionCheck: (userCode: string) =>
      runTests(userCode, [
        { input: ["small"], expectedOutput: 5 },
        { input: ["medium"], expectedOutput: 10 },
        { input: ["large"], expectedOutput: 15 },
      ]),
  },
  {
    id: "ts-const-assertions",
    title: "Const Assertions",
    description:
      "Use `as const` to create readonly literal types.",
    difficulty: Difficulty.Medium,
    category: "Literals",
    group: "Step 2: TypeScript Classes, Interfaces & Enums",
    docsUrl:
      "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions",
    starterCode: `const colors = ["red", "green", "blue"] as const;

type Color = typeof colors[number];

function isValidColor(color: string): color is Color {
  // Your code here
}`,
    testCases: [
      { input: ["red"], expectedOutput: true },
      { input: ["yellow"], expectedOutput: false },
    ],
    solutionCheck: (userCode: string) =>
      runTests(userCode, [
        { input: ["red"], expectedOutput: true },
        { input: ["green"], expectedOutput: true },
        { input: ["yellow"], expectedOutput: false },
      ]),
  },
];
