import { Problem, Difficulty } from '../../types';

export const domManipulation: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'dom-change-text',
    title: 'Change Text Content',
    description: 'Write a function `changeText` that takes a DOM element and a string, and changes the element\'s text content to the given string.\n\n**Note:** This is a conceptual challenge. The test will use a mock object to verify your logic.',
    difficulty: Difficulty.Easy,
    category: 'DOM',
    group: 'Step 5: DOM Manipulation',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent',
    starterCode: 'function changeText(element, newText) {\n  // Your code here\n}',
    testCases: [],
    solutionCheck: (userCode: string) => {
        try {
            const userFn = new Function(`return ${userCode}`)();
            const mockElement = { textContent: '' };
            userFn(mockElement, 'Test Passed');
            if (mockElement.textContent === 'Test Passed') {
                return [{ input: 'mockElement, "Test Passed"', expected: 'textContent to be "Test Passed"', actual: 'textContent was set correctly', passed: true }];
            }
            return [{ input: 'mockElement, "Test Passed"', expected: 'textContent to be "Test Passed"', actual: `textContent is "${mockElement.textContent}"`, passed: false }];
        } catch(e: unknown) {
            return [{ input: 'N/A', expected: 'Function to modify textContent', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }];
        }
    }
  },
  {
    id: 'dom-add-class',
    title: 'Add a CSS Class',
    description: 'Write a function `addClass` that takes a DOM element and a class name, and adds the class to the element\'s class list.\n\n**Note:** This is a conceptual challenge. The test will use a mock object to verify your logic.',
    difficulty: Difficulty.Easy,
    category: 'DOM',
    group: 'Step 5: DOM Manipulation',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/classList',
    starterCode: 'function addClass(element, className) {\n  // Your code here\n}',
    testCases: [],
    solutionCheck: (userCode: string) => {
        try {
            const userFn = new Function(`return ${userCode}`)();
            const mockElement = { classList: { list: [] as string[], add(c: string) { this.list.push(c) } } };
            userFn(mockElement, 'new-class');
            if (mockElement.classList.list.includes('new-class')) {
                return [{ input: 'mockElement, "new-class"', expected: 'class added', actual: 'class was added correctly', passed: true }];
            }
            return [{ input: 'mockElement, "new-class"', expected: 'class added', actual: `class was not added`, passed: false }];
        } catch(e: unknown) {
            return [{ input: 'N/A', expected: 'Function to add a class', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }];
        }
    }
  },
  {
    id: 'dom-set-attribute',
    title: 'Set an Attribute',
    description: 'Write a function `setAttr` that takes a DOM element, an attribute name, and a value, and sets the attribute on the element.\n\n**Note:** This is a conceptual challenge. The test will use a mock object to verify your logic.',
    difficulty: Difficulty.Medium,
    category: 'DOM',
    group: 'Step 5: DOM Manipulation',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute',
    starterCode: 'function setAttr(element, attrName, attrValue) {\n  // Your code here\n}',
    testCases: [],
    solutionCheck: (userCode: string) => {
        try {
            const userFn = new Function(`return ${userCode}`)();
            const mockElement = { attributes: {} as Record<string, unknown>, setAttribute(k: string, v: unknown) { this.attributes[k] = v; } };
            userFn(mockElement, 'data-test', 'success');
            if (mockElement.attributes['data-test'] === 'success') {
                return [{ input: 'mockElement, "data-test", "success"', expected: 'attribute set', actual: 'attribute was set correctly', passed: true }];
            }
             return [{ input: 'mockElement, "data-test", "success"', expected: 'attribute set', actual: 'attribute was not set', passed: false }];
        } catch(e: unknown) {
            return [{ input: 'N/A', expected: 'Function to set an attribute', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }];
        }
    }
  },
    {
        id: 'dom-get-by-id',
        title: 'Get Element By ID',
        description: 'Write a function `getById` that takes an ID string and returns the corresponding DOM element.\n\n**Note:** This is conceptual. The test will mock `document.getElementById`.',
        difficulty: Difficulty.Easy, category: 'DOM', group: 'Step 5: DOM Manipulation',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById',
        starterCode: 'function getById(id) {\n  // Your code here\n}',
        testCases: [],
        solutionCheck: (userCode: string) => {
            try {
                const mockElement = { id: 'test-id' };
                const document = { getElementById: (id: string) => id === 'test-id' ? mockElement : null };
                const userFn = new Function('document', `return ${userCode}`)(document);
                const result = userFn('test-id');
                if (result && result.id === 'test-id') {
                    return [{ input: '"test-id"', expected: 'mock element', actual: 'correct mock element returned', passed: true }];
                }
                return [{ input: '"test-id"', expected: 'mock element', actual: 'incorrect or no element returned', passed: false }];
            } catch(e: unknown) {
                return [{ input: 'N/A', expected: 'Function to get element by ID', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }];
            }
        }
    },
    {
        id: 'dom-remove-class',
        title: 'Remove a CSS Class',
        description: 'Write a function `removeClass` that takes a DOM element and a class name, and removes the class from the element\'s class list.\n\n**Note:** This is a conceptual challenge.',
        difficulty: Difficulty.Easy, category: 'DOM', group: 'Step 5: DOM Manipulation',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/classList',
        starterCode: 'function removeClass(element, className) {\n  // Your code here\n}',
        testCases: [],
        solutionCheck: (userCode: string) => {
            try {
                const userFn = new Function(`return ${userCode}`)();
                const mockElement = { classList: { list: ['existing', 'to-remove'], remove(c:string) { this.list = this.list.filter(i => i !== c) } } };
                userFn(mockElement, 'to-remove');
                if (!mockElement.classList.list.includes('to-remove')) {
                    return [{ input: 'mockElement, "to-remove"', expected: 'class removed', actual: 'class removed correctly', passed: true }];
                }
                return [{ input: 'mockElement, "to-remove"', expected: 'class removed', actual: 'class not removed', passed: false }];
            } catch(e: unknown) { return [{ input: 'N/A', expected: 'Function to remove a class', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }]; }
        }
    },
    {
        id: 'dom-toggle-class',
        title: 'Toggle a CSS Class',
        description: 'Write a function `toggleClass` that takes a DOM element and a class name, and toggles the class on the element.\n\n**Note:** This is a conceptual challenge.',
        difficulty: Difficulty.Easy, category: 'DOM', group: 'Step 5: DOM Manipulation',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/classList',
        starterCode: 'function toggleClass(element, className) {\n  // Your code here\n}',
        testCases: [],
        solutionCheck: (userCode: string) => {
            try {
                const userFn = new Function(`return ${userCode}`)();
                const mockElement = { classList: { list: ['on'], toggle(c: string) { this.list.includes(c) ? this.list = this.list.filter(i => i !== c) : this.list.push(c) } } };

                userFn(mockElement, 'on');
                const firstToggle = !mockElement.classList.list.includes('on');
                userFn(mockElement, 'on');
                const secondToggle = mockElement.classList.list.includes('on');
                if (firstToggle && secondToggle) {
                    return [{ input: 'mockElement, "on"', expected: 'class toggled twice', actual: 'class toggled correctly', passed: true }];
                }
                return [{ input: 'mockElement, "on"', expected: 'class toggled', actual: 'toggle failed', passed: false }];
            } catch(e: unknown) { return [{ input: 'N/A', expected: 'Function to toggle class', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }]; }
        }
    },
    {
        id: 'dom-get-attribute',
        title: 'Get an Attribute',
        description: 'Write a function `getAttr` that takes a DOM element and an attribute name, and returns the attribute\'s value.\n\n**Note:** This is a conceptual challenge.',
        difficulty: Difficulty.Easy, category: 'DOM', group: 'Step 5: DOM Manipulation',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute',
        starterCode: 'function getAttr(element, attrName) {\n  // Your code here\n}',
        testCases: [],
        solutionCheck: (userCode: string) => {
            try {
                const userFn = new Function(`return ${userCode}`)();
                const mockElement = { attributes: {'data-id': '123'} as Record<string, string>, getAttribute(k: string) { return this.attributes[k] } };
                if (userFn(mockElement, 'data-id') === '123') {
                    return [{ input: 'mockElement, "data-id"', expected: '"123"', actual: 'got correct value', passed: true }];
                }
                return [{ input: 'mockElement, "data-id"', expected: '"123"', actual: 'got incorrect value', passed: false }];
            } catch(e: unknown) { return [{ input: 'N/A', expected: 'Function to get attribute', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }]; }
        }
    },
    {
        id: 'dom-update-style',
        title: 'Update Element Style',
        description: 'Write a function `updateStyle` that takes a DOM element and changes its color to red.\n\n**Note:** This is a conceptual challenge.',
        difficulty: Difficulty.Easy, category: 'DOM', group: 'Step 5: DOM Manipulation',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style',
        starterCode: 'function updateStyle(element) {\n  // Your code here\n}',
        testCases: [],
        solutionCheck: (userCode: string) => {
            try {
                const userFn = new Function(`return ${userCode}`)();
                const mockElement = { style: { color: '' } };
                userFn(mockElement);
                if (mockElement.style.color === 'red') {
                    return [{ input: 'mockElement', expected: 'color set to red', actual: 'style updated correctly', passed: true }];
                }
                return [{ input: 'mockElement', expected: 'color set to red', actual: `color is ${mockElement.style.color}`, passed: false }];
            } catch(e: unknown) { return [{ input: 'N/A', expected: 'Function to update style', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }]; }
        }
    },
    {
        id: 'dom-create-element',
        title: 'Create an Element',
        description: 'Write a function `createDiv` that creates a new `div` element.\n\n**Note:** This is conceptual. The test will mock `document.createElement`.',
        difficulty: Difficulty.Easy, category: 'DOM', group: 'Step 5: DOM Manipulation',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement',
        starterCode: 'function createDiv() {\n  // Your code here\n}',
        testCases: [],
        solutionCheck: (userCode: string) => {
             try {
                const document = { created: '', createElement: function(tag: string) { this.created = tag; return { tagName: tag.toUpperCase() } } };
                const userFn = new Function('document', `return ${userCode}`)(document);
                const result = userFn();
                if (document.created === 'div' && result.tagName === 'DIV') {
                    return [{ input: 'N/A', expected: 'div element created', actual: 'div created', passed: true }];
                }
                return [{ input: 'N/A', expected: 'div element created', actual: `${document.created} created`, passed: false }];
            } catch(e: unknown) { return [{ input: 'N/A', expected: 'Function to create element', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }]; }
        }
    },
    {
        id: 'dom-append-child',
        title: 'Append a Child',
        description: 'Write a function `addChild` that takes a parent and a child DOM element and appends the child to the parent.\n\n**Note:** This is a conceptual challenge.',
        difficulty: Difficulty.Easy, category: 'DOM', group: 'Step 5: DOM Manipulation',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild',
        starterCode: 'function addChild(parent, child) {\n  // Your code here\n}',
        testCases: [],
        solutionCheck: (userCode: string) => {
            try {
                const userFn = new Function(`return ${userCode}`)();
                interface MockElement {
                    id?: string;
                    children: MockElement[];
                    appendChild(c: MockElement): void;
                }
                const mockParent = {
                    children: [] as MockElement[],
                    appendChild(c: MockElement) { this.children.push(c) }
                };
                const mockChild = { id: 'child' } as MockElement;
                userFn(mockParent, mockChild);
                if (mockParent.children.length > 0 && mockParent.children[0].id === 'child') {
                    return [{ input: 'parent, child', expected: 'child appended', actual: 'child appended correctly', passed: true }];
                }
                return [{ input: 'parent, child', expected: 'child appended', actual: 'child not appended', passed: false }];
            } catch(e: unknown) { return [{ input: 'N/A', expected: 'Function to append child', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }]; }
        }
    },
];