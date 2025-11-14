import { Problem, Difficulty } from '../../types';

export const advancedDomAndEvents: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
    {
        id: 'dom-query-selector',
        title: 'Query Selector',
        description: 'Write a function `select` that takes a CSS selector string and returns the first matching element.\n\n**Note:** This is conceptual. It mocks `document.querySelector`.',
        difficulty: Difficulty.Easy, category: 'DOM', group: 'Step 6: Advanced DOM & Events',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector',
        starterCode: 'function select(selector) {\n  // Your code here\n}',
        testCases: [],
        solutionCheck: (userCode: string) => {
            try {
                const mockElement = { id: 'test' };
                const document = { querySelector: (s: string) => s === '.test-class' ? mockElement : null };
                const userFn = new Function('document', `return ${userCode}`)(document);
                if (userFn('.test-class').id === 'test') {
                    return [{ input: ".test-class", expected: 'mock element', actual: 'correct element returned', passed: true }];
                }
                return [{ input: ".test-class", expected: 'mock element', actual: 'wrong element returned', passed: false }];
            } catch(e: unknown) { return [{ input: 'N/A', expected: 'Function for querySelector', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }]; }
        }
    },
    {
        id: 'dom-query-selector-all',
        title: 'Query Selector All',
        description: 'Write a function `selectAll` that takes a CSS selector string and returns a list of all matching elements.\n\n**Note:** This is conceptual.',
        difficulty: Difficulty.Medium, category: 'DOM', group: 'Step 6: Advanced DOM & Events',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll',
        starterCode: 'function selectAll(selector) {\n  // Your code here\n}',
        testCases: [],
        solutionCheck: (userCode: string) => {
            try {
                const mockElements = [{id: 1}, {id: 2}];
                const document = { querySelectorAll: (s: string) => s === '.item' ? mockElements : [] };
                const userFn = new Function('document', `return ${userCode}`)(document);
                if (userFn('.item').length === 2) {
                    return [{ input: ".item", expected: 'array of 2 elements', actual: 'correct array returned', passed: true }];
                }
                return [{ input: ".item", expected: 'array of 2 elements', actual: 'wrong array returned', passed: false }];
            } catch(e: unknown) { return [{ input: 'N/A', expected: 'Function for querySelectorAll', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }]; }
        }
    },
    {
        id: 'dom-remove-child',
        title: 'Remove a Child',
        description: 'Write a function `removeChildEl` that takes a parent and a child element, and removes the child from the parent.\n\n**Note:** This is a conceptual challenge.',
        difficulty: Difficulty.Medium, category: 'DOM', group: 'Step 6: Advanced DOM & Events',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild',
        starterCode: 'function removeChildEl(parent, child) {\n  // Your code here\n}',
        testCases: [],
        solutionCheck: (userCode: string) => {
            try {
                const userFn = new Function(`return ${userCode}`)();
                const mockChild = { id: 'child' };
                const mockParent = { children: [mockChild], removeChild(c: unknown) { this.children = this.children.filter(i => i !== c) } };
                userFn(mockParent, mockChild);
                if (mockParent.children.length === 0) {
                    return [{ input: 'parent, child', expected: 'child removed', actual: 'child removed correctly', passed: true }];
                }
                return [{ input: 'parent, child', expected: 'child removed', actual: 'child not removed', passed: false }];
            } catch(e: unknown) { return [{ input: 'N/A', expected: 'Function to remove child', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }]; }
        }
    },
    {
        id: 'dom-create-and-append',
        title: 'Create and Append',
        description: 'Write a function `addListItem` that takes a string of text, creates a new `<li>` element with that text, and appends it to a `<ul>` element provided.\n\n**Note:** Conceptual.',
        difficulty: Difficulty.Medium, category: 'DOM', group: 'Step 6: Advanced DOM & Events',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild',
        starterCode: 'function addListItem(ulElement, text) {\n  // Your code here\n}',
        testCases: [],
        solutionCheck: (userCode: string) => {
            try {
                const document = { createElement: (tag: string) => ({ tagName: tag.toUpperCase(), textContent: '', children: [] as unknown[], appendChild(c: unknown) { this.children.push(c) }}) };
                const userFn = new Function('document', `return ${userCode}`)(document);
                const mockUl = { children: [] as unknown[], appendChild(c: unknown) { this.children.push(c) } };
                userFn(mockUl, 'New Item');
                if (mockUl.children.length > 0 && (mockUl.children[0] as { tagName: string, textContent: string }).tagName === 'LI' && (mockUl.children[0] as { tagName: string, textContent: string }).textContent === 'New Item') {
                    return [{ input: 'ul, "New Item"', expected: '<li> created and appended', actual: 'success', passed: true }];
                }
                return [{ input: 'ul, "New Item"', expected: '<li> created and appended', actual: 'failed', passed: false }];
            } catch(e: unknown) { return [{ input: 'N/A', expected: 'Function to create/append', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }]; }
        }
    },
    {
        id: 'dom-set-inner-html',
        title: 'Set Inner HTML',
        description: 'Write a function `setHtml` that takes an element and a string of HTML, and sets the element\'s inner HTML.\n\n**Note:** Conceptual.',
        difficulty: Difficulty.Medium, category: 'DOM', group: 'Step 6: Advanced DOM & Events',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML',
        starterCode: 'function setHtml(element, htmlString) {\n  // Your code here\n}',
        testCases: [],
        solutionCheck: (userCode: string) => {
             try {
                const userFn = new Function(`return ${userCode}`)();
                const mockElement = { innerHTML: '' };
                userFn(mockElement, '<span>Test</span>');
                if (mockElement.innerHTML === '<span>Test</span>') {
                    return [{ input: 'el, "<span>Test</span>"', expected: 'innerHTML set', actual: 'success', passed: true }];
                }
                return [{ input: 'el, "<span>Test</span>"', expected: 'innerHTML set', actual: 'failed', passed: false }];
            } catch(e: unknown) { return [{ input: 'N/A', expected: 'Function to set innerHTML', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }]; }
        }
    },
    {
        id: 'dom-add-event-listener',
        title: 'Add Event Listener',
        description: 'Write a function `onClick` that takes a button element and a callback function, and attaches a "click" event listener to the button.\n\n**Note:** Conceptual.',
        difficulty: Difficulty.Medium, category: 'DOM', group: 'Step 6: Advanced DOM & Events',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener',
        starterCode: 'function onClick(button, callback) {\n  // Your code here\n}',
        testCases: [],
        solutionCheck: (userCode: string) => {
             try {
                const userFn = new Function(`return ${userCode}`)();
                const mockButton: { event: string; cb: ((...args: unknown[]) => unknown) | null; addEventListener(e: string, cb: (...args: unknown[]) => unknown): void } = { event: '', cb: null, addEventListener(e: string, cb: (...args: unknown[]) => unknown) { this.event = e; this.cb = cb } };
                const myCallback = () => {};
                userFn(mockButton, myCallback);
                if (mockButton.event === 'click' && mockButton.cb === myCallback) {
                    return [{ input: 'button, callback', expected: 'click listener added', actual: 'success', passed: true }];
                }
                return [{ input: 'button, callback', expected: 'click listener added', actual: 'failed', passed: false }];
            } catch(e: unknown) { return [{ input: 'N/A', expected: 'Function to add event', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }]; }
        }
    },
    {
        id: 'dom-remove-event-listener',
        title: 'Remove Event Listener',
        description: 'Write a function `removeOnClick` that takes a button element and the callback function, and removes the "click" event listener.\n\n**Note:** Conceptual.',
        difficulty: Difficulty.Medium, category: 'DOM', group: 'Step 6: Advanced DOM & Events',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener',
        starterCode: 'function removeOnClick(button, callback) {\n  // Your code here\n}',
        testCases: [],
        solutionCheck: (userCode: string) => {
            try {
                const userFn = new Function(`return ${userCode}`)();
                const mockButton: { event: string; cb: ((...args: unknown[]) => unknown) | null; removeEventListener(e: string, cb: (...args: unknown[]) => unknown): void } = { event: '', cb: null, removeEventListener(e: string, cb: (...args: unknown[]) => unknown) { this.event = e; this.cb = cb } };
                const myCallback = () => {};
                userFn(mockButton, myCallback);
                if (mockButton.event === 'click' && mockButton.cb === myCallback) {
                    return [{ input: 'button, callback', expected: 'click listener removed', actual: 'success', passed: true }];
                }
                return [{ input: 'button, callback', expected: 'click listener removed', actual: 'failed', passed: false }];
            } catch(e: unknown) { return [{ input: 'N/A', expected: 'Function to remove event', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }]; }
        }
    },
    {
        id: 'dom-get-computed-style',
        title: 'Get Computed Style',
        description: 'Write a function `getBgColor` that takes an element and returns its computed background color.\n\n**Note:** Conceptual.',
        difficulty: Difficulty.Medium, category: 'DOM', group: 'Step 6: Advanced DOM & Events',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle',
        starterCode: 'function getBgColor(element) {\n  // Your code here\n}',
        testCases: [],
        solutionCheck: (userCode: string) => {
            try {
                const window = { getComputedStyle: () => ({ getPropertyValue: (p: string) => p === 'background-color' ? 'rgb(255, 0, 0)' : null })};
                const userFn = new Function('window', `return ${userCode}`)(window);
                if (userFn({}) === 'rgb(255, 0, 0)') {
                    return [{ input: 'element', expected: 'rgb(255, 0, 0)', actual: 'success', passed: true }];
                }
                return [{ input: 'element', expected: 'rgb(255, 0, 0)', actual: 'failed', passed: false }];
            } catch(e: unknown) { return [{ input: 'N/A', expected: 'Function to get style', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }]; }
        }
    },
    {
        id: 'dom-traverse-up',
        title: 'Traverse DOM Up',
        description: 'Write a function `findParent` that takes an element and finds the closest parent with a specific class name.\n\n**Note:** Conceptual.',
        difficulty: Difficulty.Hard, category: 'DOM', group: 'Step 6: Advanced DOM & Events',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Node/parentElement',
        starterCode: 'function findParent(element, className) {\n  // Your code here\n}',
        testCases: [],
        solutionCheck: (userCode: string) => {
            try {
                const userFn = new Function(`return ${userCode}`)();
                const parent = { className: 'target', parentElement: null };
                const child = { parentElement: parent };
                if (userFn(child, 'target') === parent) {
                    return [{ input: 'child, "target"', expected: 'parent element', actual: 'success', passed: true }];
                }
                return [{ input: 'child, "target"', expected: 'parent element', actual: 'failed', passed: false }];
            } catch(e: unknown) { return [{ input: 'N/A', expected: 'Function to traverse up', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }]; }
        }
    },
    {
        id: 'dom-form-read-value',
        title: 'Read Form Input Value',
        description: 'Write a function `getInputValue` that takes a form input element and returns its current value.\n\n**Note:** Conceptual.',
        difficulty: Difficulty.Hard, category: 'DOM', group: 'Step 6: Advanced DOM & Events',
        docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input',
        starterCode: 'function getInputValue(inputElement) {\n  // Your code here\n}',
        testCases: [],
        solutionCheck: (userCode: string) => {
             try {
                const userFn = new Function(`return ${userCode}`)();
                const mockInput = { value: 'User Text' };
                if (userFn(mockInput) === 'User Text') {
                    return [{ input: 'input', expected: 'User Text', actual: 'success', passed: true }];
                }
                return [{ input: 'input', expected: 'User Text', actual: 'failed', passed: false }];
            } catch(e: unknown) { return [{ input: 'N/A', expected: 'Function to read value', actual: `Error: ${(e instanceof Error) ? e.message : 'Unknown error'}`, passed: false }]; }
        }
    },
];