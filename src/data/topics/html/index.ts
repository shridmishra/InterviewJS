import { TopicQuestion } from '../types';

export const htmlQuestions: TopicQuestion[] = [
  {
    id: 'html-1',
    topic: 'HTML',
    question: 'What is the DOCTYPE declaration and why is it important?',
    answer: `The \`<!DOCTYPE>\` declaration tells the browser which version of HTML the page uses.

**Why it matters:**
- Ensures the browser renders in **standards mode** (not quirks mode)
- Prevents layout inconsistencies across browsers
- Required as the very first line of every HTML document

\`\`\`html
<!DOCTYPE html>
<html>
  <head>...</head>
  <body>...</body>
</html>
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'html-2',
    topic: 'HTML',
    question: 'What is the difference between block-level and inline elements?',
    answer: `**Block-level elements:**
- Start on a **new line**
- Take up the **full width** available
- Examples: \`<div>\`, \`<p>\`, \`<h1>\`, \`<section>\`

**Inline elements:**
- Do **not** start on a new line
- Only take up as much width as needed
- Examples: \`<span>\`, \`<a>\`, \`<img>\`, \`<strong>\`

\`\`\`html
<!-- Block: takes full width -->
<div>I'm a block element</div>

<!-- Inline: flows with text -->
<p>This is <span>inline</span> content</p>
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'html-3',
    topic: 'HTML',
    question: 'What are semantic HTML tags? Give examples.',
    answer: `Semantic tags clearly describe their **meaning** to both browsers and developers.

**Common semantic tags:**
| Tag | Purpose |
|-----|---------|
| \`<header>\` | Introductory content |
| \`<nav>\` | Navigation links |
| \`<main>\` | Main content |
| \`<article>\` | Self-contained content |
| \`<section>\` | Thematic grouping |
| \`<footer>\` | Footer content |

**Benefits:**
- Better **accessibility** (screen readers)
- Improved **SEO** ranking
- Easier to read and maintain`,
    difficulty: 'Medium'
  },
  {
    id: 'html-4',
    topic: 'HTML',
    question: 'What is the purpose of the "alt" attribute on images?',
    answer: `The \`alt\` attribute provides **alternative text** for images.

**Why it's essential:**
- **Screen readers** read it aloud for visually impaired users
- Improves **SEO** (search engines can't "see" images)
- Displays when image **fails to load**

\`\`\`html
<!-- Descriptive alt -->
<img src="chart.png" alt="Sales increased 25% in Q4 2024">

<!-- Decorative image (empty alt) -->
<img src="border.png" alt="">
\`\`\`

**Tip:** Describe what the image conveys, not just what it shows.`,
    difficulty: 'Easy'
  },
  {
    id: 'html-5',
    topic: 'HTML',
    question: 'Explain the difference between localStorage, sessionStorage, and cookies.',
    answer: `**Comparison table:**

| Feature | localStorage | sessionStorage | Cookies |
|---------|--------------|----------------|---------|
| **Persistence** | Forever | Until tab closes | Expiration date |
| **Capacity** | ~5MB | ~5MB | ~4KB |
| **Sent to server** | No | No | Every request |
| **Scope** | All tabs | Single tab | All tabs |

**When to use:**
- \`localStorage\`: User preferences, cached data
- \`sessionStorage\`: Temporary form data, wizard steps
- \`cookies\`: Authentication tokens, server-side sessions`,
    difficulty: 'Medium'
  },
  {
    id: 'html-6',
    topic: 'HTML5 Features',
    question: 'What are the new features introduced in HTML5?',
    answer: `**Key HTML5 Features:**
- **Semantic elements**: \`<header>\`, \`<nav>\`, \`<main>\`, \`<article>\`, \`<section>\`, \`<aside>\`, \`<footer>\`
- **Multimedia**: \`<audio>\`, \`<video>\` elements without plugins
- **Graphics**: \`<canvas>\` for 2D drawing, \`<svg>\` for vector graphics
- **Form controls**: new input types (email, date, range, color, etc.)
- **APIs**: Geolocation, Web Storage, Web Workers, History API
- **Offline support**: Application Cache, Service Workers`,
    difficulty: 'Easy'
  },
  {
    id: 'html-7',
    topic: 'HTML5 Features',
    question: 'What is the difference between <section> and <div>?',
    answer: `**\`<section>\`**: A semantic element representing a standalone section of content that should have a heading. Used for thematically related content.

**\`<div>\`**: A generic container with no semantic meaning. Used purely for styling or scripting purposes.

**Rule of thumb**: Use \`<section>\` when the content would make sense as an entry in an outline of the document.`,
    difficulty: 'Easy'
  },
  {
    id: 'html-8',
    topic: 'HTML5 Features',
    question: 'What is the difference between <article> and <section>?',
    answer: `**\`<article>\`**: Represents self-contained content that could be distributed independently (blog posts, news articles, comments).

**\`<section>\`**: Represents a thematic grouping of content, typically with a heading.

**Key difference**: An \`<article>\` can stand alone and makes sense out of context, while a \`<section>\` is part of something larger.`,
    difficulty: 'Medium'
  },
  {
    id: 'html-9',
    topic: 'HTML5 Features',
    question: 'What is the <figure> and <figcaption> element used for?',
    answer: `**\`<figure>\`**: Represents self-contained content like images, diagrams, code snippets, or illustrations.

**\`<figcaption>\`**: Provides a caption or legend for the \`<figure>\`.

\`\`\`html
<figure>
  <img src="chart.png" alt="Sales Chart">
  <figcaption>Figure 1: Quarterly sales data</figcaption>
</figure>
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'html-10',
    topic: 'HTML5 Features',
    question: 'What is the purpose of the <main> element?',
    answer: `The \`<main>\` element represents the dominant content of the \`<body>\`. It should:
- Contain content unique to the page (not repeated across pages like headers, nav, footers)
- Only appear **once** per page
- Not be a descendant of \`<article>\`, \`<aside>\`, \`<footer>\`, \`<header>\`, or \`<nav>\`

It helps screen readers identify the main content area.`,
    difficulty: 'Easy'
  },
  {
    id: 'html-11',
    topic: 'Forms',
    question: 'What are the new input types in HTML5?',
    answer: `**New HTML5 input types:**
- \`email\` - validates email format
- \`url\` - validates URL format
- \`tel\` - telephone number input
- \`number\` - numeric input with spinners
- \`range\` - slider control
- \`date\`, \`time\`, \`datetime-local\`, \`month\`, \`week\` - date/time pickers
- \`color\` - color picker
- \`search\` - search field with clear button

Benefits: Built-in validation, appropriate mobile keyboards, native UI controls.`,
    difficulty: 'Medium'
  },
  {
    id: 'html-12',
    topic: 'Forms',
    question: 'What is the difference between the "required" and "pattern" attributes?',
    answer: `**\`required\`**: Specifies that a field must be filled out before submitting. Simple boolean attribute.

**\`pattern\`**: Specifies a regular expression that the input value must match.

\`\`\`html
<input type="text" required pattern="[A-Za-z]{3,}" 
       title="Minimum 3 letters">
\`\`\`

\`required\` checks for any input, while \`pattern\` validates the format.`,
    difficulty: 'Medium'
  },
  {
    id: 'html-13',
    topic: 'Forms',
    question: 'What is the purpose of the <datalist> element?',
    answer: `The \`<datalist>\` element provides autocomplete suggestions for an input field.

\`\`\`html
<input list="browsers" name="browser">
<datalist id="browsers">
  <option value="Chrome">
  <option value="Firefox">
  <option value="Safari">
  <option value="Edge">
</datalist>
\`\`\`

Users can either select from suggestions or type their own value.`,
    difficulty: 'Medium'
  },
  {
    id: 'html-14',
    topic: 'Forms',
    question: 'What is the difference between <input type="submit"> and <button type="submit">?',
    answer: `**\`<input type="submit">\`**:
- Self-closing tag
- Can only contain text (via \`value\` attribute)
- Limited styling options

**\`<button type="submit">\`**:
- Can contain HTML content (images, icons, spans)
- More flexible styling
- Default type is "submit" if not specified

\`\`\`html
<button type="submit">
  <img src="icon.svg"> Submit Form
</button>
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'html-15',
    topic: 'Forms',
    question: 'What are the "novalidate" and "formnovalidate" attributes?',
    answer: `**\`novalidate\`**: Added to a \`<form>\` to disable HTML5 validation for all fields.

**\`formnovalidate\`**: Added to a submit button to disable validation for that specific submission.

\`\`\`html
<form novalidate>
  <!-- All validation disabled -->
</form>

<form>
  <input type="email" required>
  <button type="submit">Submit</button>
  <button type="submit" formnovalidate>Save Draft</button>
</form>
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'html-16',
    topic: 'Forms',
    question: 'What is the difference between GET and POST methods in forms?',
    answer: `**GET Method:**
- Data appended to URL as query string
- Limited data size (~2048 characters)
- Data visible in URL (not secure)
- Can be bookmarked
- Used for retrieving data (search, filters)

**POST Method:**
- Data sent in HTTP body
- No size limitation
- Data not visible in URL
- Cannot be bookmarked
- Used for submitting data (login, uploads)`,
    difficulty: 'Easy'
  },
  {
    id: 'html-17',
    topic: 'Forms',
    question: 'What is the "enctype" attribute in forms?',
    answer: `The \`enctype\` attribute specifies how form data should be encoded when submitting.

**Values:**
- \`application/x-www-form-urlencoded\` (default): Key-value pairs
- \`multipart/form-data\`: For file uploads
- \`text/plain\`: Plain text (rarely used)

\`\`\`html
<form method="post" enctype="multipart/form-data">
  <input type="file" name="avatar">
  <button type="submit">Upload</button>
</form>
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'html-18',
    topic: 'Accessibility',
    question: 'What is ARIA and when should you use it?',
    answer: `**ARIA (Accessible Rich Internet Applications)** is a set of attributes that define ways to make web content more accessible.

**When to use:**
- When HTML semantics are insufficient
- For dynamic content updates
- For custom widgets (tabs, modals, sliders)

**Key ARIA attributes:**
- \`role\`: Defines what an element is
- \`aria-label\`: Provides accessible name
- \`aria-hidden\`: Hides from screen readers
- \`aria-live\`: Announces dynamic changes

**First rule of ARIA**: Don't use ARIA if you can use native HTML.`,
    difficulty: 'Medium'
  },
  {
    id: 'html-19',
    topic: 'Accessibility',
    question: 'What is the difference between aria-label and aria-labelledby?',
    answer: `**\`aria-label\`**: Defines a string value directly as the accessible name.

**\`aria-labelledby\`**: References the ID of another element whose text content becomes the accessible name.

\`\`\`html
<!-- aria-label: direct text -->
<button aria-label="Close dialog">X</button>

<!-- aria-labelledby: references another element -->
<h2 id="dialogTitle">Settings</h2>
<div role="dialog" aria-labelledby="dialogTitle">...</div>
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'html-20',
    topic: 'Accessibility',
    question: 'How do you make images accessible?',
    answer: `**Best practices for accessible images:**

1. **Always include \`alt\` attribute**
   - Descriptive for informational images
   - Empty (\`alt=""\`) for decorative images

2. **For complex images**: Use \`aria-describedby\` for longer descriptions

3. **For linked images**: Describe the destination

4. **SVG accessibility**: Add \`role="img"\` and \`aria-label\`

\`\`\`html
<!-- Informational -->
<img src="chart.png" alt="Sales increased 25% in Q4">

<!-- Decorative -->
<img src="decorative.png" alt="">

<!-- Complex -->
<figure>
  <img src="infographic.png" alt="2023 Annual Report" 
       aria-describedby="desc">
  <p id="desc">Detailed description...</p>
</figure>
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'html-21',
    topic: 'Accessibility',
    question: 'What is the "tabindex" attribute and how does it work?',
    answer: `The \`tabindex\` attribute controls keyboard focus order.

**Values:**
- \`tabindex="0"\`: Element is focusable in natural tab order
- \`tabindex="-1"\`: Element is focusable via JavaScript but not keyboard
- \`tabindex="1+"\`: Element has explicit tab order (avoid using)

\`\`\`html
<!-- Naturally focusable -->
<button>Click me</button>

<!-- Made focusable -->
<div tabindex="0" role="button">Click me</div>

<!-- Programmatically focusable only -->
<div tabindex="-1" id="modal">...</div>
\`\`\`

**Best practice**: Avoid positive tabindex values as they break natural flow.`,
    difficulty: 'Medium'
  },
  {
    id: 'html-22',
    topic: 'Accessibility',
    question: 'What are skip links and why are they important?',
    answer: `Skip links are hidden links that become visible on focus, allowing keyboard users to skip repetitive content (like navigation).

\`\`\`html
<a href="#main-content" class="skip-link">
  Skip to main content
</a>

<nav><!-- Long navigation --></nav>

<main id="main-content">
  <!-- Main content here -->
</main>
\`\`\`

CSS:
\`\`\`css
.skip-link {
  position: absolute;
  top: -40px;
}
.skip-link:focus {
  top: 0;
}
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'html-23',
    topic: 'Accessibility',
    question: 'How do you make a custom checkbox accessible?',
    answer: `**Steps for accessible custom checkbox:**

\`\`\`html
<label class="custom-checkbox">
  <input type="checkbox" id="agree">
  <span class="checkmark"></span>
  I agree to terms
</label>
\`\`\`

**Key requirements:**
1. Use actual \`<input type="checkbox">\` (hidden visually)
2. Associate with \`<label>\` for click handling
3. Keep keyboard accessibility
4. Maintain focus indicators

**CSS approach:**
\`\`\`css
.custom-checkbox input {
  position: absolute;
  opacity: 0;
}
.custom-checkbox input:focus + .checkmark {
  outline: 2px solid blue;
}
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'html-24',
    topic: 'SEO',
    question: 'What are meta tags and which ones are important for SEO?',
    answer: `Meta tags provide metadata about the HTML document.

**Important SEO meta tags:**
\`\`\`html
<!-- Page title (most important) -->
<title>Page Title | Site Name</title>

<!-- Description (appears in search results) -->
<meta name="description" content="150-160 char description">

<!-- Viewport for mobile -->
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- Canonical URL (avoid duplicate content) -->
<link rel="canonical" href="https://example.com/page">

<!-- Robots directives -->
<meta name="robots" content="index, follow">

<!-- Open Graph for social -->
<meta property="og:title" content="Title">
<meta property="og:description" content="Description">
<meta property="og:image" content="https://example.com/image.jpg">
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'html-25',
    topic: 'SEO',
    question: 'What is the purpose of the canonical tag?',
    answer: `The canonical tag tells search engines which URL is the "master" version of a page, preventing duplicate content issues.

\`\`\`html
<link rel="canonical" href="https://example.com/products/shoes">
\`\`\`

**Use cases:**
- Multiple URLs with same content (with/without www, http/https)
- Product pages accessible via multiple categories
- Pagination handling
- URL parameters for tracking

**Example:** If the same product is accessible at:
- /products/shoes
- /category/footwear/shoes
- /products/shoes?ref=homepage

All should point to one canonical URL.`,
    difficulty: 'Medium'
  },
  {
    id: 'html-26',
    topic: 'SEO',
    question: 'What is structured data and how do you implement it?',
    answer: `Structured data helps search engines understand page content and enables rich results (snippets, carousels).

**Implementation using JSON-LD (recommended):**
\`\`\`html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Running Shoes",
  "image": "https://example.com/shoes.jpg",
  "description": "Comfortable running shoes",
  "brand": {
    "@type": "Brand",
    "name": "Nike"
  },
  "offers": {
    "@type": "Offer",
    "price": "99.99",
    "priceCurrency": "USD"
  }
}
</script>
\`\`\`

**Common types**: Article, Product, Recipe, FAQ, Event, Organization`,
    difficulty: 'Hard'
  },
  {
    id: 'html-27',
    topic: 'SEO',
    question: 'What is the difference between nofollow, noindex, and noopener?',
    answer: `**\`nofollow\`**: Tells search engines not to follow links or pass link equity.
\`\`\`html
<a href="..." rel="nofollow">Sponsored</a>
\`\`\`

**\`noindex\`**: Tells search engines not to index the page.
\`\`\`html
<meta name="robots" content="noindex">
\`\`\`

**\`noopener\`**: Security attribute preventing new tab from accessing \`window.opener\`.
\`\`\`html
<a href="..." target="_blank" rel="noopener">Link</a>
\`\`\`

Note: \`nofollow\` and \`noindex\` are for SEO, \`noopener\` is for security.`,
    difficulty: 'Medium'
  },
  {
    id: 'html-28',
    topic: 'Media',
    question: 'How do you embed video in HTML5?',
    answer: `\`\`\`html
<video width="720" height="480" controls>
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.webm" type="video/webm">
  <track src="subtitles.vtt" kind="subtitles" 
         srclang="en" label="English">
  Your browser does not support video.
</video>
\`\`\`

**Key attributes:**
- \`controls\`: Shows play/pause, volume, fullscreen
- \`autoplay\`: Starts automatically (muted required)
- \`muted\`: Mutes audio
- \`loop\`: Loops the video
- \`poster\`: Image shown before playing
- \`preload\`: auto | metadata | none`,
    difficulty: 'Easy'
  },
  {
    id: 'html-29',
    topic: 'Media',
    question: 'What is the <picture> element and when should you use it?',
    answer: `The \`<picture>\` element provides multiple image sources for responsive images.

\`\`\`html
<picture>
  <source media="(min-width: 1200px)" srcset="large.jpg">
  <source media="(min-width: 768px)" srcset="medium.jpg">
  <source srcset="small.jpg">
  <img src="fallback.jpg" alt="Description">
</picture>
\`\`\`

**Use cases:**
- Art direction (different crops for different screens)
- Format selection (WebP with JPEG fallback)
- Resolution switching

**Difference from srcset:**
\`<picture>\` gives full control over which image loads, while \`srcset\` lets the browser choose.`,
    difficulty: 'Medium'
  },
  {
    id: 'html-30',
    topic: 'Media',
    question: 'What is the srcset attribute and how does it work?',
    answer: `The \`srcset\` attribute provides multiple image sources for responsive images.

\`\`\`html
<!-- Width descriptors -->
<img src="small.jpg"
     srcset="small.jpg 480w,
             medium.jpg 800w,
             large.jpg 1200w"
     sizes="(max-width: 600px) 480px,
            (max-width: 1000px) 800px,
            1200px"
     alt="Responsive image">

<!-- Pixel density descriptors -->
<img src="image.jpg"
     srcset="image.jpg 1x,
             image@2x.jpg 2x,
             image@3x.jpg 3x"
     alt="Retina image">
\`\`\`

Browser automatically selects the best image based on viewport and device pixel ratio.`,
    difficulty: 'Medium'
  },
  {
    id: 'html-31',
    topic: 'Media',
    question: 'What is the Canvas element and how is it different from SVG?',
    answer: `**Canvas (\`<canvas>\`):**
- Bitmap/raster graphics
- Drawn via JavaScript
- Better for animations, games, image manipulation
- Resolution dependent (can look blurry when scaled)
- No DOM nodes for individual shapes

**SVG (\`<svg>\`):**
- Vector graphics
- XML-based, can be styled with CSS
- Better for icons, logos, charts
- Resolution independent (scales perfectly)
- Each element is a DOM node

**Use Canvas for**: Games, image editors, data visualization with many data points
**Use SVG for**: Icons, logos, simple animations, accessibility`,
    difficulty: 'Medium'
  },
  {
    id: 'html-32',
    topic: 'Iframes',
    question: 'What is an iframe and what are its security concerns?',
    answer: `An \`<iframe>\` embeds another HTML document within the current page.

**Security concerns:**
1. **Clickjacking**: Malicious site overlays invisible iframe
2. **XSS**: Embedded content could run malicious scripts
3. **Data leakage**: Embedded page might access parent data

**Security measures:**
\`\`\`html
<iframe 
  src="https://example.com" 
  sandbox="allow-scripts allow-same-origin"
  referrerpolicy="no-referrer"
  loading="lazy">
</iframe>
\`\`\`

**Server-side protection:**
\`\`\`
X-Frame-Options: DENY
Content-Security-Policy: frame-ancestors 'none'
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'html-33',
    topic: 'Iframes',
    question: 'What is the sandbox attribute on iframes?',
    answer: `The \`sandbox\` attribute applies restrictions to iframe content for security.

**Default (empty sandbox):** Blocks everything

**Permissions you can allow:**
- \`allow-scripts\`: Allow JavaScript execution
- \`allow-same-origin\`: Treat as same origin
- \`allow-forms\`: Allow form submission
- \`allow-popups\`: Allow popups
- \`allow-modals\`: Allow modals (alert, confirm)
- \`allow-downloads\`: Allow downloads

\`\`\`html
<!-- Very restrictive -->
<iframe src="..." sandbox></iframe>

<!-- Allow scripts and forms -->
<iframe src="..." sandbox="allow-scripts allow-forms"></iframe>
\`\`\`

**Warning:** Never combine \`allow-scripts\` and \`allow-same-origin\` for untrusted content.`,
    difficulty: 'Hard'
  },
  {
    id: 'html-34',
    topic: 'Head Elements',
    question: 'What is the difference between async and defer in script loading?',
    answer: `Both attributes allow non-blocking script loading, but differ in execution timing.

**\`async\`:**
- Downloads in parallel with HTML parsing
- Executes immediately when downloaded (pauses HTML parsing)
- No guaranteed execution order
- Best for independent scripts (analytics, ads)

**\`defer\`:**
- Downloads in parallel with HTML parsing
- Executes after HTML is fully parsed
- Maintains script order
- Best for scripts that need DOM or other scripts

\`\`\`html
<script src="analytics.js" async></script>
<script src="app.js" defer></script>
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'html-35',
    topic: 'Head Elements',
    question: 'What is the purpose of the "preload" and "prefetch" link hints?',
    answer: `**\`preload\`**: Fetches resources needed for the current page with high priority.
\`\`\`html
<link rel="preload" href="font.woff2" as="font" crossorigin>
<link rel="preload" href="hero.jpg" as="image">
<link rel="preload" href="critical.css" as="style">
\`\`\`

**\`prefetch\`**: Fetches resources that might be needed for future navigation (low priority).
\`\`\`html
<link rel="prefetch" href="next-page.html">
<link rel="prefetch" href="next-page.js">
\`\`\`

**\`preconnect\`**: Establishes early connections to third-party origins.
\`\`\`html
<link rel="preconnect" href="https://api.example.com">
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'html-36',
    topic: 'Head Elements',
    question: 'What is the viewport meta tag and why is it important?',
    answer: `The viewport meta tag controls how a page is displayed on mobile devices.

\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1">
\`\`\`

**Properties:**
- \`width\`: Width of viewport (device-width or pixels)
- \`initial-scale\`: Initial zoom level
- \`maximum-scale\`: Maximum zoom level
- \`minimum-scale\`: Minimum zoom level
- \`user-scalable\`: Allow zoom (yes/no)

**Without viewport meta:** Desktop layout shrunk to fit mobile screen
**With viewport meta:** Responsive layout at proper scale

**Note:** Avoid \`user-scalable=no\` for accessibility.`,
    difficulty: 'Easy'
  },
  {
    id: 'html-37',
    topic: 'Head Elements',
    question: 'What are Open Graph meta tags?',
    answer: `Open Graph tags control how your page appears when shared on social media.

\`\`\`html
<!-- Basic Open Graph tags -->
<meta property="og:title" content="Article Title">
<meta property="og:description" content="Brief description">
<meta property="og:image" content="https://example.com/image.jpg">
<meta property="og:url" content="https://example.com/article">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Site Name">

<!-- Twitter-specific -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@username">
\`\`\`

**Types:** website, article, product, video.movie, music.song, etc.`,
    difficulty: 'Medium'
  },
  {
    id: 'html-38',
    topic: 'Performance',
    question: 'What is lazy loading in HTML and how do you implement it?',
    answer: `Lazy loading defers loading of off-screen resources until they're needed.

**Native lazy loading (images and iframes):**
\`\`\`html
<img src="image.jpg" loading="lazy" alt="Description">
<iframe src="video.html" loading="lazy"></iframe>
\`\`\`

**Values:**
- \`lazy\`: Defer loading until near viewport
- \`eager\`: Load immediately (default)

**Benefits:**
- Faster initial page load
- Reduced bandwidth usage
- Better Core Web Vitals

**Note:** Don't lazy load above-the-fold images (LCP images).`,
    difficulty: 'Easy'
  },
  {
    id: 'html-39',
    topic: 'Performance',
    question: 'What is the difference between "display: none" in CSS and the "hidden" attribute in HTML?',
    answer: `**\`hidden\` attribute (HTML):**
\`\`\`html
<div hidden>This is hidden</div>
\`\`\`
- Semantic HTML attribute
- Element is not rendered
- Can be toggled with JavaScript
- Has lower specificity, easily overridden by CSS

**\`display: none\` (CSS):**
\`\`\`css
.hidden { display: none; }
\`\`\`
- CSS property
- Element is not rendered
- More specific styling control

**Key difference:** \`hidden\` is semantic and indicates content shouldn't be visible, while \`display: none\` is purely presentational.`,
    difficulty: 'Easy'
  },
  {
    id: 'html-40',
    topic: 'Forms',
    question: 'What is the "autocomplete" attribute?',
    answer: `The \`autocomplete\` attribute controls browser autofill behavior.

\`\`\`html
<!-- Enable autocomplete for entire form -->
<form autocomplete="on">

<!-- Specific field hints -->
<input type="email" autocomplete="email">
<input type="tel" autocomplete="tel">
<input type="text" autocomplete="name">
<input type="text" autocomplete="street-address">
<input type="text" autocomplete="cc-number"> <!-- Credit card -->

<!-- Disable autocomplete -->
<input type="password" autocomplete="new-password">
</form>
\`\`\`

**Common values:** name, email, tel, street-address, postal-code, country, cc-number, cc-exp, username, current-password, new-password`,
    difficulty: 'Easy'
  },
  {
    id: 'html-41',
    topic: 'Tables',
    question: 'How do you make HTML tables accessible?',
    answer: `**Accessible table structure:**
\`\`\`html
<table>
  <caption>Monthly Sales Report</caption>
  <thead>
    <tr>
      <th scope="col">Month</th>
      <th scope="col">Revenue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">January</th>
      <td>$10,000</td>
    </tr>
  </tbody>
</table>
\`\`\`

**Key elements:**
- \`<caption>\`: Describes table purpose
- \`<th scope="col">\`: Column header
- \`<th scope="row">\`: Row header
- \`<thead>\`, \`<tbody>\`, \`<tfoot>\`: Structure groups
- For complex tables: Use \`id\` and \`headers\` attributes`,
    difficulty: 'Medium'
  },
  {
    id: 'html-42',
    topic: 'HTML5 APIs',
    question: 'What is the Geolocation API?',
    answer: `The Geolocation API allows websites to access user's location (with permission).

\`\`\`javascript
// Get current position
navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    console.log(position.coords.accuracy);
  },
  (error) => {
    console.error(error.message);
  },
  {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }
);

// Watch position changes
const watchId = navigator.geolocation.watchPosition(callback);
navigator.geolocation.clearWatch(watchId);
\`\`\`

**Note:** Requires HTTPS and user permission.`,
    difficulty: 'Medium'
  },
  {
    id: 'html-43',
    topic: 'HTML5 APIs',
    question: 'What is the History API?',
    answer: `The History API allows manipulation of browser session history.

\`\`\`javascript
// Add new entry
history.pushState({ page: 2 }, "Page 2", "/page2");

// Replace current entry
history.replaceState({ page: 1 }, "Page 1", "/page1");

// Navigate
history.back();
history.forward();
history.go(-2); // Go back 2 pages

// Handle popstate (back/forward button)
window.addEventListener('popstate', (event) => {
  console.log(event.state); // { page: 2 }
});
\`\`\`

**Use cases:** Single-page applications (SPAs), infinite scroll, tabs without page reload`,
    difficulty: 'Medium'
  },
  {
    id: 'html-44',
    topic: 'HTML5 APIs',
    question: 'What is the Web Storage API?',
    answer: `Web Storage provides mechanisms for storing key-value pairs in the browser.

**localStorage:**
\`\`\`javascript
localStorage.setItem('key', 'value');
localStorage.getItem('key'); // 'value'
localStorage.removeItem('key');
localStorage.clear(); // Remove all

// Store objects (must stringify)
localStorage.setItem('user', JSON.stringify({ name: 'John' }));
JSON.parse(localStorage.getItem('user'));
\`\`\`

**sessionStorage:** Same API, but data cleared when tab closes.

**Limits:**
- ~5MB per origin
- Synchronous (blocks main thread)
- Strings only (use JSON for objects)`,
    difficulty: 'Easy'
  },
  {
    id: 'html-45',
    topic: 'Accessibility',
    question: 'What is a "live region" in accessibility?',
    answer: `Live regions announce dynamic content changes to screen readers.

\`\`\`html
<!-- Polite: Waits for pause in speech -->
<div aria-live="polite">
  Status: Items added to cart
</div>

<!-- Assertive: Interrupts immediately -->
<div aria-live="assertive" role="alert">
  Error: Form submission failed
</div>
\`\`\`

**Values:**
- \`off\`: No announcements (default)
- \`polite\`: Announce when convenient
- \`assertive\`: Announce immediately

**Helper attributes:**
- \`aria-atomic\`: Announce entire region vs just changes
- \`aria-relevant\`: What changes to announce (additions, removals, text, all)`,
    difficulty: 'Hard'
  },
  {
    id: 'html-46',
    topic: 'HTML5 Features',
    question: 'What is the <template> element?',
    answer: `The \`<template>\` element holds HTML that is not rendered but can be cloned via JavaScript.

\`\`\`html
<template id="card-template">
  <div class="card">
    <h2 class="title"></h2>
    <p class="content"></p>
  </div>
</template>

<script>
const template = document.getElementById('card-template');
const clone = template.content.cloneNode(true);
clone.querySelector('.title').textContent = 'Title';
clone.querySelector('.content').textContent = 'Content';
document.body.appendChild(clone);
</script>
\`\`\`

**Benefits:**
- Content not parsed until cloned
- Images don't load, scripts don't run
- Perfect for dynamic content generation`,
    difficulty: 'Medium'
  },
  {
    id: 'html-47',
    topic: 'HTML5 Features',
    question: 'What is the <dialog> element?',
    answer: `The \`<dialog>\` element represents a dialog box or modal.

\`\`\`html
<dialog id="myDialog">
  <h2>Dialog Title</h2>
  <p>Dialog content here</p>
  <button onclick="myDialog.close()">Close</button>
</dialog>

<button onclick="myDialog.showModal()">Open Modal</button>

<script>
const dialog = document.getElementById('myDialog');

// Open as modal (with backdrop)
dialog.showModal();

// Open as non-modal
dialog.show();

// Close
dialog.close('result'); // Optional return value

// Handle close
dialog.addEventListener('close', () => {
  console.log(dialog.returnValue);
});
</script>
\`\`\`

**Benefits:** Native modal with backdrop, focus trapping, Escape to close.`,
    difficulty: 'Medium'
  },
  {
    id: 'html-48',
    topic: 'Forms',
    question: 'What is the "contenteditable" attribute?',
    answer: `The \`contenteditable\` attribute makes any element editable by the user.

\`\`\`html
<div contenteditable="true">
  Click to edit this text...
</div>

<p contenteditable="true">
  This paragraph is also editable.
</p>
\`\`\`

**Values:**
- \`true\`: Element is editable
- \`false\`: Element is not editable
- \`inherit\`: Inherits from parent

**Get content:**
\`\`\`javascript
const content = element.innerHTML; // or innerText
\`\`\`

**Use cases:** Rich text editors, inline editing, CMS interfaces.

**Note:** Requires sanitization before saving (XSS risk).`,
    difficulty: 'Easy'
  },
  {
    id: 'html-49',
    topic: 'HTML5 Features',
    question: 'What are Web Components?',
    answer: `Web Components are a set of web platform APIs for creating custom, reusable HTML elements.

**Three main technologies:**

**1. Custom Elements:**
\`\`\`javascript
class MyButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = '<button>Click me</button>';
  }
}
customElements.define('my-button', MyButton);
\`\`\`

**2. Shadow DOM:**
\`\`\`javascript
const shadow = this.attachShadow({ mode: 'open' });
shadow.innerHTML = '<style>...</style><slot></slot>';
\`\`\`

**3. HTML Templates:**
\`\`\`html
<template id="my-template">...</template>
\`\`\`

**Usage:**
\`\`\`html
<my-button></my-button>
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'html-50',
    topic: 'HTML5 Features',
    question: 'What is the Shadow DOM?',
    answer: `Shadow DOM provides encapsulation for DOM and CSS, isolating component internals.

\`\`\`javascript
class MyCard extends HTMLElement {
  constructor() {
    super();
    // Create shadow root
    const shadow = this.attachShadow({ mode: 'open' });
    
    // Styles are scoped to shadow DOM
    shadow.innerHTML = \`
      <style>
        .card { padding: 20px; border: 1px solid #ccc; }
        ::slotted(*) { color: blue; }
      </style>
      <div class="card">
        <slot></slot>
      </div>
    \`;
  }
}
\`\`\`

**Benefits:**
- Style encapsulation (CSS doesn't leak in/out)
- DOM encapsulation (hidden from parent document)
- No naming conflicts`,
    difficulty: 'Hard'
  },
  {
    id: 'html-51',
    topic: 'Media',
    question: 'What are the differences between mp4, webm, and ogg video formats?',
    answer: `**MP4 (H.264):**
- Best browser support (all modern browsers)
- Good compression and quality
- Widely used for streaming
- Patent-encumbered

**WebM (VP8/VP9):**
- Open format (royalty-free)
- Good compression
- Supported by most browsers (not Safari pre-2020)
- Used heavily by YouTube

**Ogg (Theora):**
- Open format (royalty-free)
- Older format, less efficient
- Limited browser support
- Rarely used today

**Best practice:**
\`\`\`html
<video>
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
</video>
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'html-52',
    topic: 'Performance',
    question: 'What is the difference between src and srcset for images?',
    answer: `**\`src\`**: Single image source (fallback)
\`\`\`html
<img src="image.jpg" alt="Photo">
\`\`\`

**\`srcset\`**: Multiple image sources for browser selection
\`\`\`html
<!-- Pixel density -->
<img src="image.jpg"
     srcset="image-1x.jpg 1x, image-2x.jpg 2x"
     alt="Photo">

<!-- Width-based -->
<img src="image.jpg"
     srcset="small.jpg 480w, medium.jpg 800w, large.jpg 1200w"
     sizes="(max-width: 600px) 480px, 800px"
     alt="Photo">
\`\`\`

**\`src\`** = one image for all screens
**\`srcset\`** = let browser choose best image based on device/viewport`,
    difficulty: 'Medium'
  },
  {
    id: 'html-53',
    topic: 'Forms',
    question: 'What is the difference between <label> with "for" and wrapping the input?',
    answer: `**Using "for" attribute:**
\`\`\`html
<label for="email">Email:</label>
<input type="email" id="email">
\`\`\`

**Wrapping the input:**
\`\`\`html
<label>
  Email:
  <input type="email">
</label>
\`\`\`

**Both are valid**, but:

**"for" attribute advantages:**
- Input can be placed anywhere on page
- Cleaner separation of label and input
- Required for some styling approaches

**Wrapping advantages:**
- No need for matching id/for
- Fewer attributes to maintain
- Simpler HTML structure

**Both:** Clicking label focuses input, improved accessibility.`,
    difficulty: 'Easy'
  },
  {
    id: 'html-54',
    topic: 'Accessibility',
    question: 'What are landmark roles in ARIA?',
    answer: `Landmark roles identify regions of a page for screen reader navigation.

**HTML5 semantic elements with implicit roles:**
- \`<header>\` → banner (if not nested)
- \`<nav>\` → navigation
- \`<main>\` → main
- \`<aside>\` → complementary
- \`<footer>\` → contentinfo (if not nested)
- \`<section>\` → region (if labeled)
- \`<form>\` → form (if labeled)

**Explicit ARIA roles:**
\`\`\`html
<div role="banner">Header content</div>
<div role="navigation">Nav content</div>
<div role="main">Main content</div>
<div role="search">Search form</div>
\`\`\`

**Best practice:** Use semantic HTML elements; only use ARIA when necessary.`,
    difficulty: 'Medium'
  },
  {
    id: 'html-55',
    topic: 'HTML5 Features',
    question: 'What is the <details> and <summary> element?',
    answer: `These elements create a native disclosure widget (expandable/collapsible).

\`\`\`html
<details>
  <summary>Click to expand</summary>
  <p>Hidden content that appears when expanded.</p>
</details>

<!-- Open by default -->
<details open>
  <summary>FAQ Question</summary>
  <p>Answer to the question...</p>
</details>
\`\`\`

**JavaScript interaction:**
\`\`\`javascript
const details = document.querySelector('details');

details.addEventListener('toggle', () => {
  console.log(details.open); // true or false
});

// Programmatic control
details.open = true;
\`\`\`

**Styling:**
\`\`\`css
details summary { cursor: pointer; }
details[open] summary { font-weight: bold; }
\`\`\``,
    difficulty: 'Easy'
  }
];
