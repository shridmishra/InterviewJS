import { TopicQuestion } from '../types';

export const cssQuestions: TopicQuestion[] = [
  {
    id: 'css-1',
    topic: 'CSS Basics',
    question: 'What is the Box Model in CSS?',
    answer: `Every element is a rectangular box with four layers:

\`\`\`
┌──────────────── Margin ────────────────┐
│  ┌─────────── Border ───────────────┐  │
│  │  ┌──────── Padding ───────────┐  │  │
│  │  │     ┌─ Content ─┐          │  │  │
│  │  │     │           │          │  │  │
│  │  └─────┴───────────┴──────────┘  │  │
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘
\`\`\`

| Layer | Description |
|-------|-------------|
| **Content** | The actual text/images |
| **Padding** | Space inside border (affected by background) |
| **Border** | Visible edge around padding |
| **Margin** | Space outside border (always transparent) |`,
    difficulty: 'Easy'
  },
  {
    id: 'css-2',
    topic: 'CSS Basics',
    question: 'What is the difference between "visibility: hidden" and "display: none"?',
    answer: `| Property | \`visibility: hidden\` | \`display: none\` |
|----------|----------------------|-----------------|
| **Takes space** | Yes | No |
| **In DOM** | Yes | Yes |
| **Clickable** | No | No |
| **Screen readers** | Hidden | Hidden |
| **Animatable** | Yes | No |

\`\`\`css
/* Still takes space */
.hidden { visibility: hidden; }

/* Completely removed from layout */
.gone { display: none; }
\`\`\`

**Use \`visibility\`** when you want to hide but preserve layout.
**Use \`display: none\`** when you want to remove completely.`,
    difficulty: 'Easy'
  },
  {
    id: 'css-3',
    topic: 'CSS Basics',
    question: 'Explain CSS specificity.',
    answer: `Specificity determines which CSS rule wins when multiple rules target the same element.

**Specificity hierarchy** (highest → lowest):
| Level | Example | Value |
|-------|---------|-------|
| 1. Inline styles | \`style="..."\` | (1,0,0,0) |
| 2. IDs | \`#header\` | (0,1,0,0) |
| 3. Classes | \`.nav\`, \`[type]\`, \`:hover\` | (0,0,1,0) |
| 4. Elements | \`div\`, \`::before\` | (0,0,0,1) |

**Calculation examples:**
\`\`\`css
div                    /* 0,0,0,1 */
.nav .item             /* 0,0,2,0 */
#header .nav a         /* 0,1,1,1 */
#header #nav           /* 0,2,0,0 */
\`\`\`

 \`!important\` overrides all specificity (avoid using it!).`,
    difficulty: 'Medium'
  },
  {
    id: 'css-4',
    topic: 'Flexbox',
    question: 'What is Flexbox and when should you use it?',
    answer: `Flexbox is a **one-dimensional** layout system for arranging items in rows or columns.

**When to use Flexbox:**
- Navigation bars
- Card layouts in a row
- Centering content
- Equal-height columns
- Distributing space between items

\`\`\`css
.container {
  display: flex;
  justify-content: space-between; /* Main axis */
  align-items: center;            /* Cross axis */
  gap: 20px;
}
\`\`\`

**Flexbox vs Grid:**
| Flexbox | Grid |
|---------|------|
| 1D (row OR column) | 2D (row AND column) |
| Content-driven sizing | Layout-driven sizing |
| Best for components | Best for page layouts |`,
    difficulty: 'Medium'
  },
  {
    id: 'css-5',
    topic: 'CSS Grid',
    question: 'What is CSS Grid and how does it differ from Flexbox?',
    answer: `CSS Grid is a **two-dimensional** layout system for complex layouts.

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 20px;
}
\`\`\`

**Key differences:**

| Feature | Flexbox | Grid |
|---------|---------|------|
| **Dimensions** | 1D (row **or** column) | 2D (row **and** column) |
| **Sizing** | Content-first | Layout-first |
| **Use case** | Components, navbars | Page layouts, complex grids |
| **Alignment** | One axis at a time | Both axes together |

**When to use Grid:**
- Page layouts with header/sidebar/content/footer
- Image galleries
- Complex dashboard layouts
- When you need explicit row AND column control`,
    difficulty: 'Medium'
  },
  {
    id: 'css-6',
    topic: 'CSS Basics',
    question: 'What is the difference between relative, absolute, fixed, and sticky positioning?',
    answer: `**relative**: Positioned relative to its normal position. Creates a positioning context for children.

**absolute**: Positioned relative to nearest positioned ancestor (or document). Removed from normal flow.

**fixed**: Positioned relative to the viewport. Stays in place during scroll.

**sticky**: Hybrid of relative and fixed. Acts relative until a threshold is met, then becomes fixed.

\`\`\`css
.relative { position: relative; top: 10px; }
.absolute { position: absolute; top: 0; right: 0; }
.fixed { position: fixed; bottom: 20px; }
.sticky { position: sticky; top: 0; }
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'css-7',
    topic: 'CSS Basics',
    question: 'What is the difference between margin and padding?',
    answer: `**Padding**: Space inside the element, between content and border.
- Padding area is affected by background color
- Clicking padding triggers element's click events

**Margin**: Space outside the element, between border and other elements.
- Margin area is always transparent
- Margins can collapse (vertical margins)
- Can have negative values

\`\`\`css
.box {
  padding: 20px; /* Inside */
  margin: 20px;  /* Outside */
}
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'css-8',
    topic: 'CSS Basics',
    question: 'What is margin collapsing?',
    answer: `Margin collapsing occurs when vertical margins of adjacent elements combine into a single margin.

**Rules:**
1. Only vertical margins collapse (not horizontal)
2. The larger margin wins
3. Occurs between adjacent siblings
4. Occurs between parent and first/last child (if no padding/border)

\`\`\`css
/* Both have 20px margin, but gap is 20px not 40px */
.box1 { margin-bottom: 20px; }
.box2 { margin-top: 20px; }
\`\`\`

**How to prevent:**
- Add padding or border to parent
- Use \`display: flex\` or \`display: grid\`
- Use \`overflow: hidden\` on parent`,
    difficulty: 'Medium'
  },
  {
    id: 'css-9',
    topic: 'CSS Basics',
    question: 'What is the difference between "box-sizing: content-box" and "box-sizing: border-box"?',
    answer: `**content-box (default):**
- Width/height apply only to content
- Padding and border are added to the size
- \`width: 200px\` + \`padding: 20px\` = 240px total

**border-box:**
- Width/height include content, padding, and border
- More intuitive sizing
- \`width: 200px\` with any padding = 200px total

\`\`\`css
/* Recommended reset */
*, *::before, *::after {
  box-sizing: border-box;
}
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'css-10',
    topic: 'Flexbox',
    question: 'Explain the main Flexbox properties for the container.',
    answer: `**Container properties (parent):**

\`\`\`css
.container {
  display: flex;
  
  /* Direction */
  flex-direction: row | row-reverse | column | column-reverse;
  
  /* Wrapping */
  flex-wrap: nowrap | wrap | wrap-reverse;
  
  /* Main axis alignment */
  justify-content: flex-start | center | flex-end | 
                   space-between | space-around | space-evenly;
  
  /* Cross axis alignment */
  align-items: stretch | flex-start | center | flex-end | baseline;
  
  /* Multi-line cross axis */
  align-content: flex-start | center | flex-end | 
                 space-between | space-around | stretch;
  
  /* Gap between items */
  gap: 10px;
}
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'css-11',
    topic: 'Flexbox',
    question: 'Explain flex-grow, flex-shrink, and flex-basis.',
    answer: `**flex-grow**: How much an item should grow relative to others.
- Default: 0 (don't grow)
- Value of 1 means take equal share of extra space

**flex-shrink**: How much an item should shrink relative to others.
- Default: 1 (shrink equally)
- Value of 0 means don't shrink

**flex-basis**: Initial size before growing/shrinking.
- Default: auto (use width/height)
- Can be length (200px) or percentage

\`\`\`css
/* Shorthand: flex: grow shrink basis */
.item {
  flex: 1;        /* flex: 1 1 0% */
  flex: auto;     /* flex: 1 1 auto */
  flex: none;     /* flex: 0 0 auto */
  flex: 0 0 200px; /* Fixed 200px, no grow/shrink */
}
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'css-12',
    topic: 'Flexbox',
    question: 'How do you center an element using Flexbox?',
    answer: `\`\`\`css
/* Method 1: Container properties */
.parent {
  display: flex;
  justify-content: center; /* Horizontal */
  align-items: center;     /* Vertical */
}

/* Method 2: margin auto on child */
.parent {
  display: flex;
}
.child {
  margin: auto; /* Centers both ways */
}

/* Method 3: place-items shorthand */
.parent {
  display: flex;
  place-items: center; /* align-items + justify-items */
}
\`\`\`

Note: Parent needs a defined height for vertical centering.`,
    difficulty: 'Easy'
  },
  {
    id: 'css-13',
    topic: 'CSS Grid',
    question: 'Explain the main CSS Grid container properties.',
    answer: `\`\`\`css
.container {
  display: grid;
  
  /* Define columns */
  grid-template-columns: 200px 1fr 2fr;
  grid-template-columns: repeat(3, 1fr);
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  
  /* Define rows */
  grid-template-rows: 100px auto 100px;
  
  /* Gap between cells */
  gap: 20px;
  row-gap: 10px;
  column-gap: 20px;
  
  /* Alignment */
  justify-items: start | center | end | stretch;
  align-items: start | center | end | stretch;
  
  /* Content alignment (when grid is smaller than container) */
  justify-content: start | center | end | space-between;
  align-content: start | center | end | space-between;
}
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'css-14',
    topic: 'CSS Grid',
    question: 'What is the difference between grid-template and grid-auto?',
    answer: `**grid-template-***: Defines explicit grid tracks (you specify the size).

**grid-auto-***: Defines implicit grid tracks (created automatically when content overflows).

\`\`\`css
.container {
  /* Explicit: 3 defined columns */
  grid-template-columns: 1fr 1fr 1fr;
  
  /* Explicit: 2 defined rows */
  grid-template-rows: 100px 100px;
  
  /* Implicit: Any additional rows get 50px height */
  grid-auto-rows: 50px;
  
  /* Implicit: Direction for auto-placed items */
  grid-auto-flow: row | column | dense;
}
\`\`\`

Items beyond the explicit grid are placed in implicit tracks.`,
    difficulty: 'Medium'
  },
  {
    id: 'css-15',
    topic: 'CSS Grid',
    question: 'Explain grid-column and grid-row properties.',
    answer: `These properties control where grid items are placed.

\`\`\`css
.item {
  /* Column placement */
  grid-column-start: 1;
  grid-column-end: 3;
  /* Shorthand */
  grid-column: 1 / 3;        /* Start / End */
  grid-column: 1 / span 2;   /* Start / Span */
  
  /* Row placement */
  grid-row: 1 / 2;
  grid-row: 2 / span 3;
  
  /* Combined shorthand */
  grid-area: 1 / 1 / 3 / 4; /* row-start / col-start / row-end / col-end */
}
\`\`\`

**Negative values:**
\`\`\`css
.item {
  grid-column: 1 / -1; /* Span entire row */
}
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'css-16',
    topic: 'CSS Grid',
    question: 'What is the minmax() function in CSS Grid?',
    answer: `\`minmax(min, max)\` defines a size range for grid tracks.

\`\`\`css
.container {
  /* Columns: minimum 200px, maximum 1fr */
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  
  /* Rows: minimum content size, maximum 300px */
  grid-template-rows: minmax(min-content, 300px);
  
  /* Combined with auto-fill for responsive grid */
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}
\`\`\`

**Common patterns:**
- \`minmax(0, 1fr)\`: Prevent blowout from long content
- \`minmax(100px, auto)\`: At least 100px, grow as needed
- \`minmax(min-content, max-content)\`: Flexible based on content`,
    difficulty: 'Medium'
  },
  {
    id: 'css-17',
    topic: 'CSS Grid',
    question: 'What is the difference between auto-fill and auto-fit?',
    answer: `Both create responsive grids, but handle empty space differently.

**auto-fill**: Creates as many tracks as possible, keeping empty tracks.

**auto-fit**: Creates as many tracks as possible, collapsing empty tracks.

\`\`\`css
/* auto-fill: Creates empty columns if space allows */
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

/* auto-fit: Stretches items to fill available space */
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
\`\`\`

**With 2 items in a 1000px container:**
- auto-fill: Creates 4 columns (2 filled, 2 empty)
- auto-fit: Creates 4 columns, collapses empty ones, items stretch`,
    difficulty: 'Hard'
  },
  {
    id: 'css-18',
    topic: 'Responsive Design',
    question: 'What are media queries and how do you use them?',
    answer: `Media queries apply CSS rules based on device characteristics.

\`\`\`css
/* Screen width */
@media (min-width: 768px) {
  .container { max-width: 750px; }
}

@media (max-width: 767px) {
  .sidebar { display: none; }
}

/* Range syntax (modern) */
@media (768px <= width <= 1024px) {
  .container { padding: 20px; }
}

/* Orientation */
@media (orientation: landscape) {
  .gallery { flex-direction: row; }
}

/* Hover capability */
@media (hover: hover) {
  .button:hover { background: blue; }
}

/* Prefers reduced motion */
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; }
}
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'css-19',
    topic: 'Responsive Design',
    question: 'What is the difference between mobile-first and desktop-first CSS?',
    answer: `**Mobile-first**: Start with mobile styles, add complexity for larger screens.
\`\`\`css
/* Base styles (mobile) */
.container { 
  padding: 10px; 
}

/* Tablet and up */
@media (min-width: 768px) {
  .container { padding: 20px; }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container { padding: 40px; }
}
\`\`\`

**Desktop-first**: Start with desktop styles, simplify for smaller screens.
\`\`\`css
/* Base styles (desktop) */
.container { padding: 40px; }

/* Tablet and down */
@media (max-width: 1023px) {
  .container { padding: 20px; }
}
\`\`\`

**Mobile-first is preferred** for performance and progressive enhancement.`,
    difficulty: 'Medium'
  },
  {
    id: 'css-20',
    topic: 'Responsive Design',
    question: 'What are CSS container queries?',
    answer: `Container queries allow styling based on a container's size (not viewport).

\`\`\`css
/* Define a container */
.card-container {
  container-type: inline-size;
  container-name: card;
}

/* Query the container */
@container card (min-width: 400px) {
  .card {
    display: flex;
    flex-direction: row;
  }
}

@container (min-width: 600px) {
  .card-title {
    font-size: 1.5rem;
  }
}
\`\`\`

**container-type values:**
- \`inline-size\`: Query inline dimension (width in horizontal writing)
- \`size\`: Query both dimensions
- \`normal\`: No containment (default)`,
    difficulty: 'Hard'
  },
  {
    id: 'css-21',
    topic: 'CSS Basics',
    question: 'What are pseudo-classes and pseudo-elements? Give examples.',
    answer: `**Pseudo-classes** (single colon): Select elements based on state.
\`\`\`css
a:hover { color: blue; }
input:focus { border-color: green; }
li:first-child { font-weight: bold; }
li:nth-child(odd) { background: #f0f0f0; }
input:valid { border-color: green; }
button:disabled { opacity: 0.5; }
\`\`\`

**Pseudo-elements** (double colon): Style specific parts of elements.
\`\`\`css
p::first-line { font-weight: bold; }
p::first-letter { font-size: 2em; }
.quote::before { content: '"'; }
.quote::after { content: '"'; }
input::placeholder { color: gray; }
::selection { background: yellow; }
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'css-22',
    topic: 'CSS Basics',
    question: 'How does the CSS cascade work?',
    answer: `The cascade determines which CSS rules apply when multiple rules target the same element.

**Order of precedence (highest to lowest):**

1. **Importance**: \`!important\` declarations
2. **Origin**: Author > User > Browser defaults
3. **Specificity**: Inline > IDs > Classes > Elements
4. **Source order**: Later rules override earlier ones

**Specificity calculation:**
\`\`\`
(inline, IDs, classes, elements)

style=""           = (1, 0, 0, 0)
#id                = (0, 1, 0, 0)
.class             = (0, 0, 1, 0)
div                = (0, 0, 0, 1)
#id .class div     = (0, 1, 1, 1)
\`\`\`

**Best practice**: Avoid \`!important\` and high specificity selectors.`,
    difficulty: 'Medium'
  },
  {
    id: 'css-23',
    topic: 'CSS Basics',
    question: 'What is the difference between em and rem units?',
    answer: `**em**: Relative to the font-size of the parent element.
\`\`\`css
.parent { font-size: 16px; }
.child { font-size: 1.5em; } /* 24px */
.grandchild { font-size: 1.5em; } /* 36px - compounds! */
\`\`\`

**rem**: Relative to the root (\`<html>\`) font-size.
\`\`\`css
html { font-size: 16px; }
.child { font-size: 1.5rem; } /* 24px */
.grandchild { font-size: 1.5rem; } /* 24px - doesn't compound */
\`\`\`

**When to use:**
- \`rem\`: Most sizing (predictable, consistent)
- \`em\`: When you want size relative to current font (padding, margins in components)`,
    difficulty: 'Easy'
  },
  {
    id: 'css-24',
    topic: 'CSS Basics',
    question: 'What are CSS custom properties (variables)?',
    answer: `CSS custom properties are variables that can be reused throughout a stylesheet.

\`\`\`css
/* Define variables */
:root {
  --primary-color: #007bff;
  --spacing-unit: 8px;
  --font-main: 'Inter', sans-serif;
}

/* Use variables */
.button {
  background-color: var(--primary-color);
  padding: var(--spacing-unit);
  font-family: var(--font-main);
}

/* Fallback values */
.card {
  color: var(--text-color, #333);
}

/* Scoped variables */
.dark-theme {
  --primary-color: #0056b3;
}

/* JavaScript access */
/* getComputedStyle(element).getPropertyValue('--primary-color') */
/* element.style.setProperty('--primary-color', '#ff0000') */
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'css-25',
    topic: 'Animations',
    question: 'What is the difference between CSS transitions and animations?',
    answer: `**Transitions**: Animate between two states on trigger (hover, focus, class change).
\`\`\`css
.button {
  background: blue;
  transition: background 0.3s ease, transform 0.3s ease;
}
.button:hover {
  background: darkblue;
  transform: scale(1.1);
}
\`\`\`

**Animations**: Define multi-step keyframe animations, can run automatically.
\`\`\`css
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.icon {
  animation: pulse 2s infinite ease-in-out;
}
\`\`\`

**Use transitions for**: Simple state changes (hover, active)
**Use animations for**: Complex multi-step animations, looping, auto-play`,
    difficulty: 'Medium'
  },
  {
    id: 'css-26',
    topic: 'Animations',
    question: 'Explain the CSS animation properties.',
    answer: `\`\`\`css
.element {
  /* Individual properties */
  animation-name: slidein;
  animation-duration: 2s;
  animation-timing-function: ease-in-out;
  animation-delay: 0.5s;
  animation-iteration-count: infinite; /* or number */
  animation-direction: alternate; /* normal, reverse, alternate-reverse */
  animation-fill-mode: forwards; /* none, backwards, both */
  animation-play-state: running; /* or paused */
  
  /* Shorthand */
  animation: slidein 2s ease-in-out 0.5s infinite alternate forwards;
}

@keyframes slidein {
  from { transform: translateX(-100%); opacity: 0; }
  50% { opacity: 0.5; }
  to { transform: translateX(0); opacity: 1; }
}
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'css-27',
    topic: 'Animations',
    question: 'What is the transform property in CSS?',
    answer: `Transform applies 2D or 3D transformations to elements without affecting layout.

\`\`\`css
.element {
  /* 2D Transforms */
  transform: translate(50px, 100px);
  transform: translateX(50px);
  transform: translateY(100px);
  transform: scale(1.5);
  transform: rotate(45deg);
  transform: skew(10deg, 5deg);
  
  /* 3D Transforms */
  transform: rotateX(45deg);
  transform: rotateY(45deg);
  transform: perspective(500px) rotateY(45deg);
  
  /* Multiple transforms */
  transform: translate(50px, 0) rotate(45deg) scale(1.2);
  
  /* Transform origin */
  transform-origin: top left; /* Default: center */
}
\`\`\`

**Performance**: Transforms are GPU-accelerated, great for animations.`,
    difficulty: 'Easy'
  },
  {
    id: 'css-28',
    topic: 'CSS Basics',
    question: 'What is the z-index and how does stacking context work?',
    answer: `**z-index** controls the stacking order of positioned elements.

\`\`\`css
.element {
  position: relative; /* Required for z-index to work */
  z-index: 10;
}
\`\`\`

**Stacking context**: A 3D conceptualization of HTML elements.

**Creates new stacking context:**
- \`position: fixed/sticky\` or \`position: relative/absolute\` + z-index
- \`opacity\` less than 1
- \`transform\`, \`filter\`, \`perspective\`
- \`isolation: isolate\`

**Important rule:** z-index only compares elements within the same stacking context.

\`\`\`css
/* Parent z-index: 1, child z-index: 9999 */
/* Child still appears behind sibling with z-index: 2 */
.parent { position: relative; z-index: 1; }
.child { position: relative; z-index: 9999; }
.sibling { position: relative; z-index: 2; }
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'css-29',
    topic: 'CSS Basics',
    question: 'What are the different ways to hide an element in CSS?',
    answer: `\`\`\`css
/* 1. display: none */
/* - Removes from layout, not accessible */
.hidden-1 { display: none; }

/* 2. visibility: hidden */
/* - Hidden but takes space, not accessible */
.hidden-2 { visibility: hidden; }

/* 3. opacity: 0 */
/* - Invisible but interactive, focusable */
.hidden-3 { opacity: 0; }

/* 4. Clip/position off-screen */
/* - Accessible to screen readers */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

/* 5. height: 0 + overflow: hidden */
.hidden-5 { height: 0; overflow: hidden; }

/* 6. transform */
.hidden-6 { transform: scale(0); }
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'css-30',
    topic: 'CSS Basics',
    question: 'What is the difference between inline, inline-block, and block display?',
    answer: `**inline:**
- Flows with text
- Cannot set width/height
- Vertical padding/margin doesn't affect layout
- Examples: \`<span>\`, \`<a>\`

**block:**
- Starts on new line
- Takes full width by default
- Can set width/height
- Examples: \`<div>\`, \`<p>\`

**inline-block:**
- Flows with text like inline
- Can set width/height like block
- Respects all padding/margin
- Useful for buttons, nav items

\`\`\`css
.tag {
  display: inline-block;
  padding: 5px 10px;
  margin: 5px;
}
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'css-31',
    topic: 'Selectors',
    question: 'Explain the different CSS combinators.',
    answer: `**Descendant (space):** Any nested element
\`\`\`css
.parent .child { } /* Any child at any depth */
\`\`\`

**Child (>):** Direct children only
\`\`\`css
.parent > .child { } /* Only immediate children */
\`\`\`

**Adjacent sibling (+):** Immediately following sibling
\`\`\`css
h1 + p { } /* First p after h1 */
\`\`\`

**General sibling (~):** Any following sibling
\`\`\`css
h1 ~ p { } /* All p's after h1 at same level */
\`\`\`

**Example:**
\`\`\`html
<div class="parent">
  <p>Direct child</p> <!-- .parent > p  -->
  <div>
    <p>Grandchild</p> <!-- .parent > p , .parent p  -->
  </div>
</div>
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'css-32',
    topic: 'Selectors',
    question: 'What are attribute selectors in CSS?',
    answer: `Attribute selectors target elements based on their attributes.

\`\`\`css
/* Has attribute */
[disabled] { opacity: 0.5; }

/* Exact value */
[type="text"] { border: 1px solid gray; }

/* Contains word (space-separated) */
[class~="card"] { padding: 20px; }

/* Starts with */
[href^="https"] { color: green; }

/* Ends with */
[href$=".pdf"] { background: url(pdf-icon.svg); }

/* Contains substring */
[href*="example"] { font-weight: bold; }

/* Case-insensitive (i flag) */
[type="submit" i] { cursor: pointer; }
\`\`\`

**Use cases:** Styling external links, file types, form validation states.`,
    difficulty: 'Medium'
  },
  {
    id: 'css-33',
    topic: 'Selectors',
    question: 'Explain the :nth-child() and :nth-of-type() selectors.',
    answer: `**:nth-child(n)**: Selects based on position among ALL siblings.
**:nth-of-type(n)**: Selects based on position among siblings of SAME type.

\`\`\`css
/* Every odd row */
tr:nth-child(odd) { background: #f0f0f0; }

/* Every 3rd element */
li:nth-child(3n) { color: red; }

/* First 3 elements */
li:nth-child(-n+3) { font-weight: bold; }

/* After first 2 */
li:nth-child(n+3) { opacity: 0.7; }

/* Last 3 elements */
li:nth-last-child(-n+3) { color: blue; }
\`\`\`

**Difference example:**
\`\`\`html
<div>
  <p>1</p>
  <span>2</span>
  <p>3</p> <!-- p:nth-of-type(2), but :nth-child(3) -->
</div>
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'css-34',
    topic: 'Selectors',
    question: 'What is the :has() selector and why is it called the "parent selector"?',
    answer: `The \`:has()\` relational pseudo-class selects elements that contain certain children/descendants.

\`\`\`css
/* Card that contains an image */
.card:has(img) {
  padding: 0;
}

/* Form with invalid inputs */
form:has(:invalid) {
  border: 2px solid red;
}

/* Parent of focused input */
.input-group:has(input:focus) {
  border-color: blue;
}

/* Sibling selector alternative */
h1:has(+ p) { margin-bottom: 0; }

/* Not containing something */
.container:not(:has(.error)) { border: green; }
\`\`\`

**Called "parent selector"** because it can select a parent based on its children—something not possible before.`,
    difficulty: 'Hard'
  },
  {
    id: 'css-35',
    topic: 'Layout',
    question: 'What is the clear property used for?',
    answer: `The \`clear\` property specifies which sides of an element floating elements are not allowed.

\`\`\`css
.element {
  clear: left;    /* No floats on left */
  clear: right;   /* No floats on right */
  clear: both;    /* No floats on either side */
  clear: none;    /* Default, allow floats */
}
\`\`\`

**Clearfix technique** (for containing floats in parent):
\`\`\`css
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
\`\`\`

**Note:** Floats are largely replaced by Flexbox and Grid, but \`clear\` is still used for text wrapping around images.`,
    difficulty: 'Easy'
  },
  {
    id: 'css-36',
    topic: 'Layout',
    question: 'What is the overflow property?',
    answer: `The \`overflow\` property controls what happens to content that overflows its container.

\`\`\`css
.container {
  overflow: visible; /* Default - content renders outside */
  overflow: hidden;  /* Clips content, no scrollbars */
  overflow: scroll;  /* Always shows scrollbars */
  overflow: auto;    /* Scrollbars only when needed */
  overflow: clip;    /* Like hidden, but no programmatic scroll */
  
  /* Individual axes */
  overflow-x: auto;
  overflow-y: hidden;
}
\`\`\`

**Use cases:**
- \`hidden\`: Prevent content bleed, create BFC
- \`auto\`: Scrollable containers
- \`scroll\`: Consistent scrollbar space`,
    difficulty: 'Easy'
  },
  {
    id: 'css-37',
    topic: 'Typography',
    question: 'How do you load and use custom fonts in CSS?',
    answer: `**@font-face rule:**
\`\`\`css
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/CustomFont.woff2') format('woff2'),
       url('/fonts/CustomFont.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap; /* Prevents invisible text */
}

.text {
  font-family: 'CustomFont', sans-serif;
}
\`\`\`

**Google Fonts:**
\`\`\`html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
\`\`\`

**font-display values:**
- \`swap\`: Use fallback, swap when loaded
- \`block\`: Brief invisible, then font
- \`fallback\`: Short invisible, fallback if slow
- \`optional\`: Use font only if cached`,
    difficulty: 'Medium'
  },
  {
    id: 'css-38',
    topic: 'Typography',
    question: 'What is the line-height property and its values?',
    answer: `\`line-height\` sets the height of a line box (space between lines of text).

\`\`\`css
.text {
  /* Unitless (recommended) - multiplied by font-size */
  line-height: 1.5; /* 1.5x font-size */
  
  /* Length */
  line-height: 24px;
  line-height: 1.5rem;
  
  /* Percentage */
  line-height: 150%; /* Of current font-size */
  
  /* Keywords */
  line-height: normal; /* Browser default ~1.2 */
}
\`\`\`

**Why unitless is recommended:**
\`\`\`css
.parent { font-size: 16px; line-height: 24px; }
.child { font-size: 24px; } /* line-height still 24px - cramped! */

.parent { font-size: 16px; line-height: 1.5; }
.child { font-size: 24px; } /* line-height now 36px (24*1.5)  */
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'css-39',
    topic: 'Typography',
    question: 'How do you handle text overflow in CSS?',
    answer: `**Single line ellipsis:**
\`\`\`css
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
\`\`\`

**Multi-line clamping:**
\`\`\`css
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
\`\`\`

**Word breaking:**
\`\`\`css
.break-word {
  word-wrap: break-word;      /* Legacy */
  overflow-wrap: break-word;  /* Modern */
}

.break-all {
  word-break: break-all; /* Break anywhere in words */
}
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'css-40',
    topic: 'Performance',
    question: 'What CSS properties trigger layout, paint, and composite?',
    answer: `**Layout (reflow) - Most expensive:**
Changes that affect element geometry.
- width, height, padding, margin
- top, left, right, bottom
- display, position, float
- font-size, line-height

**Paint (repaint) - Medium cost:**
Changes to appearance without affecting layout.
- color, background-color
- visibility
- box-shadow, border-radius
- outline

**Composite - Least expensive:**
Only affects compositing, GPU-accelerated.
- transform
- opacity
- will-change

**Best practice for animations:**
\`\`\`css
/* Bad - triggers layout */
.animate { left: 0; transition: left 0.3s; }

/* Good - only composite */
.animate { transform: translateX(0); transition: transform 0.3s; }
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'css-41',
    topic: 'Performance',
    question: 'What is the will-change property?',
    answer: `\`will-change\` hints to the browser that an element will change, allowing optimization.

\`\`\`css
.animated-element {
  will-change: transform, opacity;
}

/* Or add before animation */
.card:hover {
  will-change: transform;
}
.card:hover .content {
  transform: translateY(-10px);
}
\`\`\`

**Best practices:**
1. Don't apply to too many elements
2. Remove after animation completes
3. Don't use as a fix for performance issues
4. Use as a last resort

\`\`\`javascript
// Remove after animation
element.addEventListener('animationend', () => {
  element.style.willChange = 'auto';
});
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'css-42',
    topic: 'Performance',
    question: 'What is CSS containment and how does it improve performance?',
    answer: `CSS containment isolates a subtree from the rest of the page for rendering optimization.

\`\`\`css
.widget {
  contain: layout;  /* Layout changes don't affect outside */
  contain: paint;   /* Children don't paint outside bounds */
  contain: size;    /* Size can be determined without checking children */
  contain: style;   /* Counters/quotes don't escape */
  contain: content; /* = layout + paint + style */
  contain: strict;  /* = layout + paint + style + size */
}

/* Also sets containment */
.widget {
  container-type: inline-size;
}
\`\`\`

**Benefits:**
- Limits scope of style recalculation
- Enables browser optimizations
- Useful for widgets, cards, list items`,
    difficulty: 'Hard'
  },
  {
    id: 'css-43',
    topic: 'Responsive Design',
    question: 'What are the common CSS breakpoints for responsive design?',
    answer: `**Common breakpoints (mobile-first):**
\`\`\`css
/* Mobile (default) */
/* Styles for 0-575px */

/* Small devices (landscape phones) */
@media (min-width: 576px) { }

/* Medium devices (tablets) */
@media (min-width: 768px) { }

/* Large devices (desktops) */
@media (min-width: 992px) { }

/* Extra large devices (large desktops) */
@media (min-width: 1200px) { }

/* XXL (extra extra large) */
@media (min-width: 1400px) { }
\`\`\`

**Best practice:** Design based on content breakpoints, not devices.
\`\`\`css
/* Break when design breaks, not at device boundaries */
@media (min-width: 45em) { /* Where content needs more space */ }
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'css-44',
    topic: 'Responsive Design',
    question: 'What are clamp(), min(), and max() CSS functions?',
    answer: `**clamp(min, preferred, max):** Value between a range.
\`\`\`css
.title {
  /* Between 1rem and 3rem, preferring 5vw */
  font-size: clamp(1rem, 5vw, 3rem);
}
\`\`\`

**min():** Returns the smallest value.
\`\`\`css
.container {
  /* Whichever is smaller: 100% or 1200px */
  width: min(100%, 1200px);
}
\`\`\`

**max():** Returns the largest value.
\`\`\`css
.sidebar {
  /* At least 200px, or 20% of parent */
  width: max(200px, 20%);
}
\`\`\`

**Combining:**
\`\`\`css
.fluid-padding {
  padding: min(5vw, 50px);
}
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'css-45',
    topic: 'Layout',
    question: 'What is a Block Formatting Context (BFC)?',
    answer: `A BFC is an isolated rendering area where elements don't affect outside layout.

**Creates new BFC:**
- \`float\`: left or right
- \`position\`: absolute or fixed
- \`display\`: inline-block, flow-root, flex, grid, table-cell
- \`overflow\`: hidden, auto, scroll (not visible)
- \`contain\`: layout, paint, content, strict

**BFC characteristics:**
1. Contains floated children
2. Prevents margin collapse
3. Excludes external floats

\`\`\`css
/* Modern way to create BFC */
.container {
  display: flow-root;
}

/* Classic clearfix alternative */
.clearfix {
  overflow: hidden;
}
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'css-46',
    topic: 'CSS Basics',
    question: 'What is the difference between inherit, initial, unset, and revert?',
    answer: `**inherit:** Takes the computed value from parent element.
\`\`\`css
.child { color: inherit; } /* Parent's color */
\`\`\`

**initial:** Resets to CSS specification's initial value.
\`\`\`css
.element { display: initial; } /* inline */
\`\`\`

**unset:** Acts like \`inherit\` for inherited properties, \`initial\` for others.
\`\`\`css
/* color inherits, display uses initial */
.element { color: unset; display: unset; }
\`\`\`

**revert:** Rolls back to user-agent stylesheet.
\`\`\`css
.link { color: revert; } /* Browser default link color */
\`\`\`

**revert-layer:** Rolls back to previous cascade layer.`,
    difficulty: 'Medium'
  },
  {
    id: 'css-47',
    topic: 'Animations',
    question: 'What is the @scroll-timeline and scroll-driven animations in CSS?',
    answer: `Scroll-driven animations tie animation progress to scroll position.

\`\`\`css
/* Animate based on scroll position */
@keyframes reveal {
  from { opacity: 0; transform: translateY(100px); }
  to { opacity: 1; transform: translateY(0); }
}

.element {
  animation: reveal linear both;
  animation-timeline: scroll(); /* Ties to closest scroll container */
}

/* With named timeline */
.scroller {
  scroll-timeline-name: --my-timeline;
}

.element {
  animation-timeline: --my-timeline;
}

/* View timeline (element enters viewport) */
.element {
  animation: reveal linear both;
  animation-timeline: view();
  animation-range: entry 25% cover 50%;
}
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'css-48',
    topic: 'Modern CSS',
    question: 'What are CSS cascade layers (@layer)?',
    answer: `Cascade layers provide explicit control over the cascade order.

\`\`\`css
/* Define layer order (first = lowest priority) */
@layer reset, base, components, utilities;

/* Add styles to layers */
@layer reset {
  * { margin: 0; padding: 0; box-sizing: border-box; }
}

@layer base {
  body { font-family: system-ui; }
}

@layer components {
  .button { padding: 10px 20px; }
}

@layer utilities {
  .hidden { display: none !important; }
}

/* Unlayered styles beat all layers */
.button { background: red; }
\`\`\`

**Benefits:**
- Manage specificity without using !important
- Integrate third-party CSS safely
- Clear style precedence`,
    difficulty: 'Hard'
  },
  {
    id: 'css-49',
    topic: 'Modern CSS',
    question: 'What is the :is() and :where() pseudo-class?',
    answer: `Both select elements matching any selector in the list, reducing repetition.

**:is()** - Takes highest specificity of its arguments.
\`\`\`css
/* Instead of: */
article h1, article h2, article h3 { }

/* Use: */
article :is(h1, h2, h3) { color: blue; }

:is(header, main, footer) p { margin: 1em; }
\`\`\`

**:where()** - Zero specificity, easily overridable.
\`\`\`css
/* Base styles easily overridden */
:where(button, .btn) {
  padding: 10px 20px;
}

button { padding: 5px; } /* Wins with equal specificity */
\`\`\`

**Use :where()** for default/reset styles, **:is()** for grouping.`,
    difficulty: 'Medium'
  },
  {
    id: 'css-50',
    topic: 'Modern CSS',
    question: 'What is the new CSS nesting syntax?',
    answer: `Native CSS nesting allows writing nested selectors like SASS.

\`\`\`css
/* Native CSS Nesting */
.card {
  padding: 20px;
  
  & h2 {
    font-size: 1.5rem;
  }
  
  & p {
    color: gray;
  }
  
  &:hover {
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  
  &.featured {
    border: 2px solid gold;
  }
  
  .icon {
    width: 24px;
  }
  
  @media (min-width: 768px) {
    padding: 40px;
  }
}
\`\`\`

**Rules:**
- \`&\` refers to parent selector
- \`&\` required before pseudo-classes/elements
- \`&\` optional for descendant selectors (modern browsers)`,
    difficulty: 'Medium'
  },
  {
    id: 'css-51',
    topic: 'Accessibility',
    question: 'How do you create accessible focus styles?',
    answer: `\`\`\`css
/* Remove only if you provide alternative */
button:focus { outline: none; }

/* Better: Custom focus styles */
button:focus {
  outline: 2px solid #005fcc;
  outline-offset: 2px;
}

/* Focus-visible: Only show for keyboard users */
button:focus {
  outline: none;
}
button:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 2px;
}

/* High contrast mode support */
@media (forced-colors: active) {
  button:focus-visible {
    outline: 3px solid CanvasText;
  }
}
\`\`\`

**Never completely remove focus indicators** - always provide alternatives.`,
    difficulty: 'Medium'
  },
  {
    id: 'css-52',
    topic: 'Accessibility',
    question: 'What is the prefers-reduced-motion media query?',
    answer: `Detects if user has requested minimal motion (accessibility setting).

\`\`\`css
/* Default: animations enabled */
.element {
  animation: slide-in 0.5s ease-out;
  transition: transform 0.3s;
}

/* For users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  .element {
    animation: none;
    transition: none;
  }
  
  /* Or provide safer alternative */
  .element {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
\`\`\`

**Who uses this:**
- People with vestibular disorders
- People with motion sensitivity
- Users with cognitive disabilities`,
    difficulty: 'Easy'
  },
  {
    id: 'css-53',
    topic: 'Filters & Effects',
    question: 'What is the filter property in CSS?',
    answer: `The \`filter\` property applies graphical effects to elements.

\`\`\`css
.image {
  /* Individual filters */
  filter: blur(5px);
  filter: brightness(1.2);    /* 0-1+ */
  filter: contrast(1.5);      /* 0-1+ */
  filter: grayscale(100%);    /* 0-100% */
  filter: sepia(50%);         /* 0-100% */
  filter: saturate(2);        /* 0-1+ */
  filter: hue-rotate(90deg);  /* 0-360deg */
  filter: invert(100%);       /* 0-100% */
  filter: opacity(50%);       /* 0-100% */
  filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5));
  
  /* Multiple filters */
  filter: contrast(1.2) brightness(1.1) saturate(1.3);
}

/* backdrop-filter for behind element */
.glass {
  backdrop-filter: blur(10px);
  background: rgba(255,255,255,0.1);
}
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'css-54',
    topic: 'Modern CSS',
    question: 'What is the aspect-ratio property?',
    answer: `The \`aspect-ratio\` property sets a preferred aspect ratio for an element.

\`\`\`css
.video-container {
  width: 100%;
  aspect-ratio: 16 / 9;
}

.square {
  aspect-ratio: 1 / 1; /* or just 1 */
}

/* With min/max height fallback */
.image-container {
  width: 100%;
  aspect-ratio: 4 / 3;
  min-height: 200px;
  max-height: 600px;
}

/* Works with grid items */
.grid-item {
  aspect-ratio: 1;
}
\`\`\`

**Old method (padding hack):**
\`\`\`css
.container {
  padding-top: 56.25%; /* 16:9 = 9/16 = 0.5625 */
  position: relative;
}
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'css-55',
    topic: 'Modern CSS',
    question: 'What are logical properties in CSS?',
    answer: `Logical properties adapt to writing direction (LTR, RTL, vertical text).

**Physical vs Logical:**
\`\`\`css
/* Physical (text direction dependent) */
margin-left: 20px;
padding-right: 10px;
border-top: 1px solid;

/* Logical (adapts to writing mode) */
margin-inline-start: 20px;
padding-inline-end: 10px;
border-block-start: 1px solid;
\`\`\`

**Mapping:**
- \`inline-start\` = left (LTR), right (RTL)
- \`inline-end\` = right (LTR), left (RTL)
- \`block-start\` = top
- \`block-end\` = bottom

**Shorthand:**
\`\`\`css
.element {
  margin-inline: 20px 10px;  /* start end */
  padding-block: 15px;        /* top and bottom */
  inset-inline: 0;            /* left and right */
}
\`\`\``,
    difficulty: 'Medium'
  }
];
