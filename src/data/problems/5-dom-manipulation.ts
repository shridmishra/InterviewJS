import { Problem, Difficulty } from '../../types';

interface MockHTMLElement {
  id?: string;
  textContent?: string;
  tagName?: string;
  parentNode?: MockHTMLElement | null;
  children?: MockHTMLElement[];
  appendChild?: (child: MockHTMLElement) => void;
  removeChild?: (child: MockHTMLElement) => void;
  classList?: {
    _classes: string[];
    add: (c: string) => void;
    remove: (c: string) => void;
    contains: (c: string) => boolean;
  };
  _attributes?: Record<string, string>;
  setAttribute?: (k: string, v: string) => void;
  getAttribute?: (k: string) => string | undefined;
  style?: Record<string, string>;
}

export const domManipulation: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'get-element-by-id',
    title: 'Get Element By ID',
    description: 'Write a function `getById` that takes an ID string and returns the corresponding DOM element. Assume the element with the given ID exists.',
    difficulty: Difficulty.Easy,
    category: 'DOM',
    group: 'Step 5: DOM Manipulation',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById',
    starterCode: `function getById(id) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      // Mock document for testing purposes
      const mockDocument = {
        _elements: {
          'test-div': { id: 'test-div', textContent: 'Hello' },
          'another-element': { id: 'another-element', textContent: 'World' }
        } as Record<string, MockHTMLElement>,
        getElementById: function(id: string): MockHTMLElement | null {
          return this._elements[id] || null;
        }
      };

      try {
        const userFn = new Function('document', `return ${userCode}`)(mockDocument);
        const result1 = userFn('test-div');
        const result2 = userFn('another-element');

        const test1Passed = result1 && result1.id === 'test-div';
        const test2Passed = result2 && result2.id === 'another-element';

        return [
          { input: '"test-div"', expected: 'Element with id "test-div"', actual: result1 ? `Element with id "${result1.id}"` : 'null', passed: test1Passed },
          { input: '"another-element"', expected: 'Element with id "another-element"', actual: result2 ? `Element with id "${result2.id}"` : 'null', passed: test2Passed },
        ];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'Function to get element by ID', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    }
  },
  {
    id: 'change-text-content',
    title: 'Change Text Content',
    description: 'Write a function `changeText` that takes a DOM element and a string, and changes the element\'s text content to the given string.',
    difficulty: Difficulty.Easy,
    category: 'DOM',
    group: 'Step 5: DOM Manipulation',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent',
    starterCode: `function changeText(element, newText) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const mockElement: MockHTMLElement = { textContent: 'initial' };
      try {
        const userFn = new Function(`return ${userCode}`)();
        userFn(mockElement, 'New Text');
        return [{ input: 'element, "New Text"', expected: 'textContent to be "New Text"', actual: `textContent is "${mockElement.textContent}"`, passed: mockElement.textContent === 'New Text' }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'Function to modify textContent', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    }
  },
  {
    id: 'add-class',
    title: 'Add a CSS Class',
    description: 'Write a function `addClass` that takes a DOM element and a class name, and adds the class to the element\'s class list.',
    difficulty: Difficulty.Easy,
    category: 'DOM',
    group: 'Step 5: DOM Manipulation',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/classList',
    starterCode: `function addClass(element, className) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const mockElement: MockHTMLElement = { classList: { _classes: [] as string[], add: function(c: string) { if (!this._classes.includes(c)) this._classes.push(c); }, remove: function(c: string) { this._classes = this._classes.filter(item => item !== c); }, contains: function(c: string) { return this._classes.includes(c); } } };
      try {
        const userFn = new Function(`return ${userCode}`)();
        userFn(mockElement, 'new-class');
        return [{ input: 'element, "new-class"', expected: 'class "new-class" to be added', actual: `classList contains "new-class": ${mockElement.classList?.contains('new-class')}`, passed: mockElement.classList?.contains('new-class') }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'Function to add a class', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    }
  },
  {
    id: 'remove-class',
    title: 'Remove a CSS Class',
    description: 'Write a function `removeClass` that takes a DOM element and a class name, and removes the class from the element\'s class list.',
    difficulty: Difficulty.Easy,
    category: 'DOM',
    group: 'Step 5: DOM Manipulation',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/classList',
    starterCode: `function removeClass(element, className) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const mockElement: MockHTMLElement = { classList: { _classes: ['existing-class', 'to-remove'], add: function(c: string) { if (!this._classes.includes(c)) this._classes.push(c); }, remove: function(c: string) { this._classes = this._classes.filter(item => item !== c); }, contains: function(c: string) { return this._classes.includes(c); } } };
      try {
        const userFn = new Function(`return ${userCode}`)();
        userFn(mockElement, 'to-remove');
        return [{ input: 'element, "to-remove"', expected: 'class "to-remove" to be removed', actual: `classList contains "to-remove": ${mockElement.classList?.contains('to-remove')}`, passed: !mockElement.classList?.contains('to-remove') }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'Function to remove a class', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    }
  },
  {
    id: 'set-attribute',
    title: 'Set an Attribute',
    description: 'Write a function `setAttr` that takes a DOM element, an attribute name, and a value, and sets the attribute on the element.',
    difficulty: Difficulty.Medium,
    category: 'DOM',
    group: 'Step 5: DOM Manipulation',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute',
    starterCode: `function setAttr(element, attrName, attrValue) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const mockElement: MockHTMLElement = { _attributes: {} as Record<string, string>, setAttribute: function(k: string, v: string) { if (this._attributes) this._attributes[k] = v; }, getAttribute: function(k: string) { return this._attributes ? this._attributes[k] : undefined; } };
      try {
        const userFn = new Function(`return ${userCode}`)();
        userFn(mockElement, 'data-test', 'success');
        return [{ input: 'element, "data-test", "success"', expected: 'attribute "data-test" to be "success"', actual: `attribute "data-test" is "${mockElement.getAttribute?.('data-test')}"`, passed: mockElement.getAttribute?.('data-test') === 'success' }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'Function to set an attribute', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    }
  },
  {
    id: 'create-and-append-element',
    title: 'Create and Append Element',
    description: 'Write a function `createAndAppendDiv` that creates a new `div` element, sets its text content to "New Div", and appends it as a child to a given parent DOM element. The function should return the newly created div.',
    difficulty: Difficulty.Medium,
    category: 'DOM',
    group: 'Step 5: DOM Manipulation',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement',
    starterCode: `function createAndAppendDiv(parentElement) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const mockParent: MockHTMLElement = {
        children: [] as MockHTMLElement[],
        appendChild: function(child: MockHTMLElement) { if (this.children) this.children.push(child); }
      };
      const mockDocument = {
        createElement: function(tagName: string): MockHTMLElement {
          return { tagName: tagName.toUpperCase(), textContent: '', parentNode: null };
        }
      };

      try {
        const userFn = new Function('document', `return ${userCode}`)(mockDocument);
        const newDiv = userFn(mockParent);

        const test1Passed = newDiv && newDiv.tagName === 'DIV' && newDiv.textContent === 'New Div';
        const test2Passed = mockParent.children?.includes(newDiv);

        return [
          { input: 'parentElement', expected: 'New div with text "New Div" created', actual: newDiv ? `Div created: ${newDiv.tagName}, text: "${newDiv.textContent}"` : 'No div created', passed: test1Passed },
          { input: 'parentElement', expected: 'New div appended to parent', actual: `Div appended: ${test2Passed}`, passed: test2Passed },
        ];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'Function to create and append div', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    }
  },
  {
    id: 'remove-element',
    title: 'Remove an Element',
    description: 'Write a function `removeElement` that takes a DOM element and removes it from its parent. Assume the element has a parent.',
    difficulty: Difficulty.Medium,
    category: 'DOM',
    group: 'Step 5: DOM Manipulation',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild',
    starterCode: `function removeElement(element) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const mockChild: MockHTMLElement = { id: 'child-to-remove', parentNode: null };
      const mockParent: MockHTMLElement = {
        children: [mockChild],
        removeChild: function(child: MockHTMLElement) {
          if (this.children) {
            this.children = this.children.filter(c => c !== child);
            child.parentNode = null;
          }
        }
      };
      mockChild.parentNode = mockParent;

      try {
        const userFn = new Function(`return ${userCode}`)();
        userFn(mockChild);

        const test1Passed = !mockParent.children?.includes(mockChild);
        const test2Passed = mockChild.parentNode === null;

        return [
          { input: 'element', expected: 'Element removed from parent children', actual: `Removed from parent: ${test1Passed}`, passed: test1Passed },
          { input: 'element', expected: 'Element parentNode set to null', actual: `ParentNode null: ${test2Passed}`, passed: test2Passed },
        ];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'Function to remove element', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    }
  },
  {
    id: 'toggle-class',
    title: 'Toggle a CSS Class',
    description: 'Write a function `toggleClass` that takes a DOM element and a class name, and toggles the class on the element. If the class is present, remove it; otherwise, add it.',
    difficulty: Difficulty.Easy,
    category: 'DOM',
    group: 'Step 5: DOM Manipulation',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/classList',
    starterCode: `function toggleClass(element, className) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const mockElement: MockHTMLElement = {
        classList: {
          _classes: ['initial-class'] as string[],
          add: function(c: string) { if (!this._classes.includes(c)) this._classes.push(c); },
          remove: function(c: string) { this._classes = this._classes.filter(item => item !== c); },
          contains: function(c: string) { return this._classes.includes(c); }
        }
      };
      try {
        const userFn = new Function(`return ${userCode}`)();

        userFn(mockElement, 'toggle-me');
        const firstToggleAdded = mockElement.classList?.contains('toggle-me');

        userFn(mockElement, 'toggle-me');
        const secondToggleRemoved = !mockElement.classList?.contains('toggle-me');

        return [
          { input: 'element, "toggle-me" (first call)', expected: 'class "toggle-me" added', actual: `Added: ${firstToggleAdded}`, passed: firstToggleAdded },
          { input: 'element, "toggle-me" (second call)', expected: 'class "toggle-me" removed', actual: `Removed: ${secondToggleRemoved}`, passed: secondToggleRemoved },
        ];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'Function to toggle class', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    }
  },
  {
    id: 'get-attribute',
    title: 'Get an Attribute',
    description: 'Write a function `getAttr` that takes a DOM element and an attribute name, and returns the attribute\'s value.',
    difficulty: Difficulty.Medium,
    category: 'DOM',
    group: 'Step 5: DOM Manipulation',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute',
    starterCode: `function getAttr(element, attrName) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const mockElement: MockHTMLElement = { _attributes: { 'data-id': '123', 'aria-label': 'test' } as Record<string, string>, getAttribute: function(k: string) { return this._attributes ? this._attributes[k] : undefined; } };
      try {
        const userFn = new Function(`return ${userCode}`)();
        const result1 = userFn(mockElement, 'data-id');
        const result2 = userFn(mockElement, 'aria-label');

        const test1Passed = result1 === '123';
        const test2Passed = result2 === 'test';

        return [
          { input: 'element, "data-id"', expected: '"123"', actual: `"${result1}"`, passed: test1Passed },
          { input: 'element, "aria-label"', expected: '"test"', actual: `"${result2}"`, passed: test2Passed },
        ];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'Function to get attribute', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    }
  },
  {
    id: 'update-style',
    title: 'Update Element Style',
    description: 'Write a function `updateStyle` that takes a DOM element and an object of CSS properties to apply. For example, `{ color: "red", fontSize: "16px" }`.',
    difficulty: Difficulty.Medium,
    category: 'DOM',
    group: 'Step 5: DOM Manipulation',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style',
    starterCode: `function updateStyle(element, styles) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const mockElement: MockHTMLElement = { style: { color: '', fontSize: '' } };
      try {
        const userFn = new Function(`return ${userCode}`)();
        userFn(mockElement, { color: 'blue', fontSize: '20px' });

        const test1Passed = mockElement.style?.color === 'blue';
        const test2Passed = mockElement.style?.fontSize === '20px';

        return [
          { input: 'element, { color: "blue" }', expected: 'color set to blue', actual: `color is ${mockElement.style?.color}`, passed: test1Passed },
          { input: 'element, { fontSize: "20px" }', expected: 'fontSize set to 20px', actual: `fontSize is ${mockElement.style?.fontSize}`, passed: test2Passed },
        ];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'Function to update style', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    }
  },
];