<div align="center">

# InterviewJS

### *Master JavaScript & TypeScript Through Interactive Challenges*

<p align="center">
  <a href="#-features"><strong>Features</strong></a> •
  <a href="#-demo"><strong>Demo</strong></a> •
  <a href="#-getting-started"><strong>Get Started</strong></a> •
  <a href="#-tech-stack"><strong>Tech Stack</strong></a> •
  <a href="#-contributing"><strong>Contributing</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/shridmishra/interviewjs?style=social" alt="Stars" />
  <img src="https://img.shields.io/github/forks/shridmishra/interviewjs?style=social" alt="Forks" />
  <img src="https://img.shields.io/github/issues/shridmishra/interviewjs" alt="Issues" />
  <img src="https://img.shields.io/github/license/shridmishra/interviewjs" alt="License" />
</p>

</div>

<br/>

<div align="center">
  <img src="https://img.shields.io/badge/🚀_Launch-Live_Demo-5B21B6?style=for-the-badge" alt="Live Demo" />
</div>

<br/>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 💻 Interactive Coding Challenges

🎯 **70+ Curated Problems**
- Basics • Async JS • DOM Manipulation
- Event Handling • TypeScript Fundamentals

⚡ **Instant Feedback**
- Real-time code execution
- Comprehensive test suites
- Detailed error messages

📊 **Smart Progress Tracking**
- Solved / Attempted / Todo status
- Star your favorites
- Personal notes on each problem

</td>
<td width="50%">

### 🎓 Interactive Quizzes

📝 **Multiple Choice Questions**
- Instant validation
- Detailed explanations
- Score tracking

🏆 **Achievement System**
- Track your improvement
- Challenge yourself daily
- Build your streak

📈 **Performance Analytics**
- Quiz history
- Score trends
- Areas to improve

</td>
</tr>
<tr>
<td width="50%">

### 👤 Personalized Experience

🔐 **Secure Authentication**
- Google OAuth integration
- Email/Password option
- Protected user data

📊 **Rich Dashboard**
- Activity contribution graph
- Difficulty-based progress
- Complete submission history
- Personal statistics

</td>
<td width="50%">

### 🎨 Modern Interface

🌓 **Dark/Light Theme**
- Seamless theme switching
- Eye-friendly color schemes
- Persistent preferences

✨ **Smooth Animations**
- Framer Motion effects
- Lottie illustrations
- Polished interactions

📱 **Fully Responsive**
- Mobile-first design
- Tablet optimized
- Desktop enhanced

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

### Frontend

![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Backend & Database

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=next.js&logoColor=white)

### UI & Design

![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radix-ui&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

### Developer Tools

![Monaco Editor](https://img.shields.io/badge/Monaco_Editor-2C2C32?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)

</div>

---

## 🚀 Getting Started

> **Quick Start Guide** - Get InterviewJS running locally in under 5 minutes!

### 📋 Prerequisites

```bash
Node.js 18.x or higher
MongoDB (local or Atlas)
Google OAuth credentials (optional)
```

### 🔧 Installation

**1️⃣ Clone the repository**

```bash
git clone https://github.com/shridmishra/interviewjs.git
cd interviewjs
```

**2️⃣ Install dependencies**

```bash
npm install
```

**3️⃣ Configure environment variables**

Create a `.env.local` file in the root directory:

```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/interviewjs
# or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/interviewjs

# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key-here-generate-with-openssl
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (optional - for Google login)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**Generate a secure secret:**

```bash
openssl rand -base64 32
```

**4️⃣ Start the development server**

```bash
npm run dev
```

**5️⃣ Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) 🎉

<div align="center">

### 🎊 You're all set! Happy coding! 🚀

</div>

---

## 📁 Project Structure

```text
src/
├── 📱 app/                   # Next.js 15 App Router
│   ├── 🔌 api/              # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── problems/       # Problem data + user progress
│   │   ├── quiz/           # Quiz submission
│   │   └── user/           # User profile & problem data
│   ├── 💪 challenges/       # Coding challenge pages
│   ├── 👤 profile/          # User profile page
│   └── 📝 quiz/             # Quiz page
├── 🎨 components/           # React components
│   ├── common/             # Shared components
│   ├── modals/             # Modal components
│   ├── problems/           # Problem list & detail views
│   └── ui/                 # shadcn/ui components
├── 🔐 context/              # React Context (Auth)
├── 📊 data/                 # Static data (70+ problems)
├── 🪝 hooks/                # Custom React hooks
├── ⚙️ lib/                  # Utilities & configurations
├── 🗄️ models/               # Mongoose models
└── 🎯 types/                # TypeScript types
```

---

## 🏗️ Architecture Highlights

<table>
<tr>
<td width="33%">

### 📊 Data Flow

**Static Definitions**
- Problems in `src/data/problems/*.ts`
- Immutable source of truth

**User Metadata**
- MongoDB storage
- Status, stars, notes

**Smart Hydration**
- `useChallenges` hook
- Merges static + user data

</td>
<td width="33%">

### 🔐 Authentication

**Multi-Provider**
- Google OAuth
- Email/Password
- JWT sessions

**Middleware Pattern**
- `authMiddleware()` helper
- Protected API routes
- `useAuth()` hook

</td>
<td width="33%">

### 🧪 Problem System

**Test Execution**
- Isolated code evaluation
- Real-time feedback
- Comprehensive test suites

**User Progress**
- Overlay data pattern
- Never modifies source
- MongoDB persistence

</td>
</tr>
</table>

---

## ⚡ Available Scripts

```bash
npm run dev      # 🚀 Start development server on :3000
npm run build    # 📦 Build for production (standalone output)
npm run start    # ▶️  Start production server
npm run lint     # 🔍 Run ESLint
```

---

## 📝 Adding New Problems

Want to contribute new challenges? Follow this guide:

> **Note**: Also see the detailed workflow guide at `.agent/workflows/add-problem-step.md`

<details>
<summary><b>📖 Step-by-Step Tutorial</b></summary>

<br/>

When adding a new problem set (step), you need to update **3 files**:

| File | Purpose |
|------|---------|
| `src/data/topics/{topic}/problems/{N}-{name}.ts` | Problem definitions |
| `src/lib/problemUtils.ts` | Used by sitemap and API |
| `src/hooks/useChallenges.ts` | **Critical** - Used by practice page UI |

**1️⃣ Create a new problem file**

```typescript
// src/data/topics/javascript/problems/8-mini-projects.ts
import { Problem, Difficulty } from '@/types';

export const miniProjects: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'unique-problem-id',
    title: 'Problem Title',
    difficulty: Difficulty.Easy,   // Easy, Medium, or Hard
    category: 'Mini Projects',
    group: 'Step 8: Mini Projects', // Section header in UI
    description: 'Problem description...',
    starterCode: `function solution() {\n  // Your code here\n}`,
    testCases: [],
    solutionCheck: (userCode: string) => [{
      input: 'Code Check',
      expected: 'Expected behavior',
      actual: userCode.includes('solution') ? 'Correct' : 'Missing',
      passed: userCode.includes('solution'),
    }],
  },
];
```

**2️⃣ Register in useChallenges.ts** ⚠️ **Critical**

```typescript
// src/hooks/useChallenges.ts

// Add import at top
import { miniProjects } from '../data/topics/javascript/problems/8-mini-projects';

// Add to staticProblems array (JavaScript section)
...[
    ...learnTheBasics,
    ...arrayManipulation,
    // ... other modules,
    ...miniProjects  // Add here
].map(p => ({ ...p, slug: 'js' })),
```

**3️⃣ Register in problemUtils.ts**

```typescript
// src/lib/problemUtils.ts

// Add import
import { miniProjects } from '@/data/topics/javascript/problems/8-mini-projects';

// Add to topicMapping
{ modules: [...existingModules, miniProjects], topic: 'JavaScript', slug: 'js' },
```

**4️⃣ Test your changes** 🧪

```bash
npm run build
```

- Verify test cases work correctly
- Check starter code compiles
- Ensure solution validation logic is accurate

</details>

---

## 🤝 Contributing

<div align="center">

### We love contributions! ❤️

</div>

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**!

### How to Contribute

1. 🍴 **Fork** the project
2. 🌿 **Create** your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. 💾 **Commit** your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. 📤 **Push** to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. 🎉 **Open** a Pull Request

### Contribution Ideas

- 🐛 Report bugs
- 💡 Suggest new features
- 📝 Add new problems
- 🎨 Improve UI/UX
- 📖 Enhance documentation
- ⚡ Optimize performance

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

<div align="center">

### Shrid Mishra

[![GitHub](https://img.shields.io/badge/GitHub-shridmishra-181717?style=for-the-badge&logo=github)](https://github.com/shridmishra)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/shridmishra)

</div>

---

## 🙏 Acknowledgments

Special thanks to these amazing projects and communities:

- 🎨 [**shadcn/ui**](https://ui.shadcn.com/) - Beautiful component library
- ⚡ [**Next.js**](https://nextjs.org/) - The React framework for production
- 🔷 [**Vercel**](https://vercel.com/) - Deployment and hosting platform
- 💚 [**MongoDB**](https://www.mongodb.com/) - Database solution
- 🎭 [**Framer Motion**](https://www.framer.com/motion/) - Animation library
- 🌈 [**Tailwind CSS**](https://tailwindcss.com/) - Utility-first CSS framework

And all the **contributors** who help make InterviewJS better! 🎉

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

<br/>

![Star History](https://img.shields.io/github/stars/shridmishra/interviewjs?style=social)

<br/>
<br/>

**Made with ❤️ and ☕ by [Shrid Mishra](https://github.com/shridmishra)**

<br/>

<sub>© 2025 InterviewJS. All rights reserved.</sub>

</div>
