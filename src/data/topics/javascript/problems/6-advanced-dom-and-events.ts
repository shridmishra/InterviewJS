import { Problem, Difficulty } from '@/types';
import { fireEvent } from '@testing-library/dom';

export const advancedDomAndEvents: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'dom-query-selector',
    title: 'Query Selector',
    description: 'Write a function `select` that takes a CSS selector string and returns the first matching DOM element. Assume `document.querySelector` is available.',
    difficulty: Difficulty.Easy,
    category: 'Selectors',
    group: 'Step 6: Advanced DOM & Events',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector',
    videoUrl: 'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    starterCode: `function select(selector) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const mockElement = { id: 'found-element' };
      const mockDocument = {
        querySelector: function(selector: string) {
          return selector === '.test-class' ? mockElement : null;
        }
      };
      try {
        const userFn = new Function('document', `return ${userCode}`)(mockDocument);
        const result = userFn('.test-class');
        return [{ input: ".test-class", expected: 'Element with id "found-element"', actual: result ? `Element with id "${result.id}"` : 'null', passed: result && result.id === 'found-element' }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'Function for querySelector', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    }
  },
  {
    id: 'dom-query-selector-all',
    title: 'Query Selector All',
    description: 'Write a function `selectAll` that takes a CSS selector string and returns a NodeList of all matching DOM elements. Assume `document.querySelectorAll` is available.',
    difficulty: Difficulty.Easy,
    category: 'Selectors',
    group: 'Step 6: Advanced DOM & Events',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll',
    videoUrl: 'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    starterCode: `function selectAll(selector) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const mockElements = [{ id: 1 }, { id: 2 }];
      const mockDocument = {
        querySelectorAll: function(selector: string) {
          return selector === '.item' ? mockElements : [];
        }
      };
      try {
        const userFn = new Function('document', `return ${userCode}`)(mockDocument);
        const result = userFn('.item');
        return [{ input: ".item", expected: 'NodeList of 2 elements', actual: `Length: ${result.length}`, passed: result.length === 2 }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'Function for querySelectorAll', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    }
  },
  {
    id: 'dom-add-event-listener',
    title: 'Add Event Listener',
    description: 'Write a function `addClickListener` that takes an element and a callback function, and attaches a "click" event listener to the element.',
    difficulty: Difficulty.Easy,
    category: 'Events',
    group: 'Step 6: Advanced DOM & Events',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener',
    videoUrl: 'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    starterCode: `function addClickListener(element, callback) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      let eventType = '';
      let eventCallback: ((event: Event) => void) | null = null;
      const mockElement = {
        addEventListener: function(type: string, callback: (event: Event) => void) {
          eventType = type;
          eventCallback = callback;
        }
      };
      const testCallback = () => {};
      try {
        const userFn = new Function(`return ${userCode}`)();
        userFn(mockElement, testCallback);
        const test1Passed = eventType === 'click';
        const test2Passed = eventCallback === testCallback;
        return [
          { input: 'element, callback', expected: 'Event type "click"', actual: `Event type: "${eventType}"`, passed: test1Passed },
          { input: 'element, callback', expected: 'Callback attached', actual: `Callback attached: ${eventCallback === testCallback}`, passed: test2Passed },
        ];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'Function to add event listener', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    }
  },
  {
    id: 'dom-remove-event-listener',
    title: 'Remove Event Listener',
    description: 'Write a function `removeClickListener` that takes an element and a callback function, and removes the "click" event listener.',
    difficulty: Difficulty.Medium,
    category: 'Events',
    group: 'Step 6: Advanced DOM & Events',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener',
    videoUrl: 'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    starterCode: `function removeClickListener(element, callback) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      let eventType = '';
      let eventCallback: ((event: Event) => void) | null = null;
      const mockElement = {
        removeEventListener: function(type: string, callback: (event: Event) => void) {
          eventType = type;
          eventCallback = callback;
        }
      };
      const testCallback = () => {};
      try {
        const userFn = new Function(`return ${userCode}`)();
        userFn(mockElement, testCallback);
        const test1Passed = eventType === 'click';
        const test2Passed = eventCallback === testCallback;
        return [
          { input: 'element, callback', expected: 'Event type "click"', actual: `Event type: "${eventType}"`, passed: test1Passed },
          { input: 'element, callback', expected: 'Callback removed', actual: `Callback removed: ${eventCallback === testCallback}`, passed: test2Passed },
        ];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'Function to remove event listener', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    }
  },
  {
    id: 'dom-create-and-append-with-class',
    title: 'Create and Append Element with Class',
    description: 'Write a function `createAndAppendDivWithClass` that creates a new `div` element, adds a specified class to it, sets its text content, and appends it to a given parent DOM element. The function should return the newly created div.',
    difficulty: Difficulty.Easy,
    category: 'Events',
    group: 'Step 6: Advanced DOM & Events',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement',
    videoUrl: 'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    starterCode: `function createAndAppendDivWithClass(parentElement, className, textContent) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const mockParent = {
        children: [] as HTMLElement[],
        appendChild: function(child: HTMLElement) { this.children.push(child); }
      };
      const mockDocument = {
        createElement: function(tagName: string): HTMLElement {
          return {
            tagName: tagName.toUpperCase(),
            textContent: '',
            classList: { _classes: [] as string[],
            add: function(_c: string) { if (!this._classes.includes(_c)) this._classes.push(_c); }, contains: function(_c: string) { return this._classes.includes(_c); } },
            parentNode: null
          } as unknown as HTMLElement; // Type assertion for mock HTMLElement
        }
      };

      try {
        const userFn = new Function('document', `return ${userCode}`)(mockDocument);
        const newDiv = userFn(mockParent, 'my-class', 'Hello World');

        const test1Passed = newDiv && newDiv.tagName === 'DIV' && newDiv.textContent === 'Hello World';
        const test2Passed = newDiv && newDiv.classList.contains('my-class');
        const test3Passed = mockParent.children.includes(newDiv);

        return [
          { input: 'parent, "my-class", "Hello World"', expected: 'Div created with text and class', actual: newDiv ? `Div: ${newDiv.tagName}, text: "${newDiv.textContent}", class: ${newDiv.classList._classes[0]}` : 'No div created', passed: test1Passed && test2Passed },
          { input: 'parent, "my-class", "Hello World"', expected: 'Div appended to parent', actual: `Appended: ${test3Passed}`, passed: test3Passed },
        ];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'Function to create and append div with class', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    }
  },
  {
    id: 'dom-set-inner-html',
    title: 'Set Inner HTML',
    description: 'Write a function `setHtml` that takes an element and a string of HTML, and sets the element\'s inner HTML.',
    difficulty: Difficulty.Medium,
    category: 'Events',
    group: 'Step 6: Advanced DOM & Events',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML',
    videoUrl: 'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    starterCode: `function setHtml(element, htmlString) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const mockElement = { innerHTML: '' };
      try {
        const userFn = new Function(`return ${userCode}`)();
        userFn(mockElement, '<span>Test Content</span>');
        return [{ input: 'element, "<span>Test Content</span>"', expected: 'innerHTML to be "<span>Test Content</span>"', actual: `innerHTML is "${mockElement.innerHTML}"`, passed: mockElement.innerHTML === '<span>Test Content</span>' }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'Function to set innerHTML', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    }
  },
  {
    id: 'dom-get-computed-style',
    title: 'Get Computed Style',
    description: 'Write a function `getBgColor` that takes an element and returns its computed background color. Assume `window.getComputedStyle` is available.',
    difficulty: Difficulty.Medium,
    category: 'Creation',
    group: 'Step 6: Advanced DOM & Events',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle',
    videoUrl: 'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    starterCode: `function getBgColor(element) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const mockWindow = {
        getComputedStyle: function(el: { id?: string }) {
          return {
            getPropertyValue: function(prop: string) {
              if (el.id === 'styled-element' && prop === 'background-color') {
                return 'rgb(255, 0, 0)';
              }
              return '';
            }
          };
        }
      };
      const mockElement = { id: 'styled-element' };
      try {
        const userFn = new Function('window', `return ${userCode}`)(mockWindow);
        const result = userFn(mockElement);
        return [{ input: 'element', expected: 'rgb(255, 0, 0)', actual: result, passed: result === 'rgb(255, 0, 0)' }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'Function to get computed style', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    }
  },
  {
    id: 'dom-traverse-up',
    title: 'Traverse DOM Up',
    description: 'Write a function `findParentWithClass` that takes an element and a class name, and returns the closest parent element that has that class. If no such parent is found, return `null`.',
    difficulty: Difficulty.Medium,
    category: 'Content',
    group: 'Step 6: Advanced DOM & Events',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Node/parentElement',
    videoUrl: 'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    starterCode: `function findParentWithClass(element, className) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const grandParent = { classList: { contains: (_c: string) => _c === 'container' }, parentElement: null, id: 'grandparent' };
      const parent = { classList: { contains: (_c: string) => _c === 'wrapper' }, parentElement: grandParent, id: 'parent' };
      const child = { classList: { contains: (_c: string) => false }, parentElement: parent, id: 'child' };

      try {
        const userFn = new Function(`return ${userCode}`)();
        const result1 = userFn(child, 'wrapper');
        const result2 = userFn(child, 'container');
        const result3 = userFn(child, 'non-existent');

        const test1Passed = result1 && result1.id === 'parent';
        const test2Passed = result2 && result2.id === 'grandparent';
        const test3Passed = result3 === null;

        return [
          { input: 'child, "wrapper"', expected: 'Parent with id "parent"', actual: result1 ? `Parent with id "${result1.id}"` : 'null', passed: test1Passed },
          { input: 'child, "container"', expected: 'Parent with id "grandparent"', actual: result2 ? `Parent with id "${result2.id}"` : 'null', passed: test2Passed },
          { input: 'child, "non-existent"', expected: 'null', actual: result3, passed: test3Passed },
        ];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'Function to traverse DOM up', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    }
  },
  {
    id: 'dom-form-read-value',
    title: 'Read Form Input Value',
    description: 'Write a function `getInputValue` that takes a form input element and returns its current value.',
    difficulty: Difficulty.Medium,
    category: 'Forms',
    group: 'Step 6: Advanced DOM & Events',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input',
    videoUrl: 'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    starterCode: `function getInputValue(inputElement) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const mockInput = { value: 'User Input Text' };
      try {
        const userFn = new Function(`return ${userCode}`)();
        const result = userFn(mockInput);
        return [{ input: 'inputElement', expected: 'User Input Text', actual: result, passed: result === 'User Input Text' }];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'Function to read input value', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    }
  },
  {
    id: 'event-delegation',
    title: 'Event Delegation',
    description: 'Write a function `setupListClickListener` that takes a parent `ul` element and a callback. It should attach a single click listener to the `ul` that, when an `li` child is clicked, calls the callback with the text content of the clicked `li`.',
    difficulty: Difficulty.Hard,
    category: 'DOM Events',
    group: 'Step 6: Advanced DOM & Events',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Building_blocks/Events#event_delegation',
    videoUrl: 'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    starterCode: `function setupListClickListener(ulElement, callback) {
  // Your code here
}`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      let clickedText = '';
      const mockCallback = (text: string) => { clickedText = text; };
      let attachedEventType = '';
      let attachedCallback: ((event: Event) => void) | null = null;

      const mockLi1 = document.createElement('li');
      mockLi1.textContent = 'Item 1';
      const mockLi2 = document.createElement('li');
      mockLi2.textContent = 'Item 2';
      const mockUl = document.createElement('ul');
      mockUl.appendChild(mockLi1);
      mockUl.appendChild(mockLi2);

      mockUl.addEventListener = (type: string, callback: (event: Event) => void) => {
        attachedEventType = type;
        attachedCallback = callback;
      };

      try {
        const userFn = new Function(`return ${userCode}`)();
        userFn(mockUl, mockCallback);

        // Simulate a click on mockLi1
        if (attachedCallback) {
          fireEvent.click(mockLi1);
        }
        const test1Passed = clickedText === 'Item 1';

        // Reset and simulate a click on mockLi2
        clickedText = '';
        if (attachedCallback) {
          fireEvent.click(mockLi2);
        }
        const test2Passed = clickedText === 'Item 2';

        return [
          { input: 'ul, callback (click Item 1)', expected: 'Callback called with "Item 1"', actual: `Called with: "${clickedText}"`, passed: test1Passed },
          { input: 'ul, callback (click Item 2)', expected: 'Callback called with "Item 2"', actual: `Called with: "${clickedText}"`, passed: test2Passed },
          { input: 'ul, callback', expected: 'Listener attached to ul', actual: `Attached to: ${attachedEventType}`, passed: attachedEventType === 'click' },
        ];
      } catch (e: unknown) {
        return [{ input: 'N/A', expected: 'Function for event delegation', actual: `Error: ${e instanceof Error ? e.message : String(e)}`, passed: false }];
      }
    }
  },
];
