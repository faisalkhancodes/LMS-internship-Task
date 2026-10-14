# CyberSNova LMS — Advanced Engineering & Security Learning Platform

A modern, high-performance Learning Management System (LMS) built with **React 18**, **Vite**, and **Vanilla CSS**. Designed for engineering practitioners and cybersecurity specialists with hands-on virtual sandbox labs, interactive knowledge checks, cryptographically verifiable certificates, and gamified XP progression.

---

## 🚀 Key Features & Highlights

- **Modular React Architecture**: Fully componentized with clean separation of concerns (`components/`, `pages/`, `context/`, `data/`, `styles/`).
- **Interactive Cyber Sandbox Terminal (`InteractiveTerminal.jsx`)**: Simulated real-time command execution (Nmap scans, OpenSSL cipher inspection, Kubernetes pod diagnostics) with automated command-filling.
- **Interactive Knowledge Checks (`InteractiveQuiz.jsx`)**: In-lesson multi-choice architectural quizzes with instant feedback, explanations, and XP rewards (+25 XP).
- **Personal Lesson Study Notes**: Built-in in-lesson markdown scratchpad auto-saved to browser `localStorage`.
- **Gamification & XP Engine**:
  - Earn XP from lessons (+50 XP), quizzes (+25 XP), and course mastery (+250 XP).
  - 5-Tier Engineering Rank Progression (*Cadet* → *Security Operator* → *Senior Specialist* → *Principal Architect* → *CyberSNova Elite*).
  - Unlockable Cyber Badges (*First Blood*, *Streak Ignition*, *Cyber Sentinel*, *System Architect*, *Certified Vanguard*).
  - Celebratory confetti animations on completion (`canvas-confetti`).
- **Cryptographically Verifiable Certificates (`CertificateModal.jsx`)**:
  - Gold-crested official credentials with unique IDs (e.g. `CS-2026-055804`).
  - One-click **Print / Save as PDF** and **Standalone HTML Certificate Download**.
  - Copyable verification links.
- **Spotlight Command Palette (`Ctrl + K` / `⌘ + K`)**: Keyboard-driven quick-launcher across courses, study guides, and system actions.
- **Multi-Level Catalog Filtering**: Real-time filtering by Category (*Security*, *Software*, *AI & Data*, *Cloud*, *Design*), Level (*Beginner*, *Intermediate*, *Advanced*), Saved Bookmarks, and dynamic sorting (*Popular*, *Rating*, *Duration*).
- **Comprehensive Study Resource Library**: Field guides, OWASP Top 10 attack matrices, and architecture blueprints with direct `.md` download.
- **Dark & Light Mode**: Curated cyberpunk/glassmorphic dark theme and crisp light theme with persistent state.

---

## 🛠️ Technology Stack

- **Framework**: [React 18](https://react.dev/)
- **Bundler & Dev Server**: [Vite 6](https://vitejs.dev/) with `@vitejs/plugin-react`
- **Icons**: [Lucide React](https://lucide.dev/)
- **Visual FX**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Styling**: Modern Vanilla CSS with CSS Custom Properties, OKLCH/HSL palettes, and responsive glassmorphic cards
- **Persistence**: Browser `localStorage` for courses, notes, quiz scores, profile settings, and theme

---

## 📂 Project Structure

```
CyberSNova-lms/
├── dist/                             # Compiled production build
├── index.html                        # Application HTML shell
├── vite.config.js                    # Vite configuration
├── package.json                      # Project dependencies & scripts
├── style.css                         # Baseline design tokens & responsive grid
├── README.md                         # Documentation
└── src/
    ├── main.jsx                      # React application entry point
    ├── App.jsx                       # Root app orchestrator & layout
    ├── context/
    │   └── LearningContext.jsx       # Global state management & persistence
    ├── data/
    │   ├── coursesData.js            # Course catalog, lessons, labs & quizzes
    │   ├── resourcesData.js          # Study library documents & templates
    │   └── badgesData.js             # Achievement badges & condition rules
    ├── components/
    │   ├── Sidebar.jsx               # Navigation, rank pill, XP bar & streak
    │   ├── Topbar.jsx                # Header, global search & theme toggle
    │   ├── CommandPalette.jsx        # Ctrl+K spotlight modal
    │   ├── CourseCard.jsx            # Course card with skill pills & progress
    │   ├── CourseModal.jsx           # Multi-tab course & lab player
    │   ├── InteractiveTerminal.jsx   # Virtual CLI sandbox
    │   ├── InteractiveQuiz.jsx       # Lesson knowledge check
    │   ├── CertificateModal.jsx      # Certificate viewer & PDF/HTML exporter
    │   ├── ResourceModal.jsx         # Reference guide reader & downloader
    │   ├── ProfileModal.jsx          # Profile editor & badge showcase
    │   ├── NotificationToast.jsx     # Global toast notification queue
    │   └── EmptyState.jsx            # Dynamic empty state view
    ├── pages/
    │   ├── DashboardPage.jsx         # Overview dashboard & weekly goal
    │   ├── CatalogPage.jsx           # Filterable course catalog
    │   ├── MyLearningPage.jsx        # In-progress, saved, and completed paths
    │   ├── ResourcesPage.jsx         # Downloadable reference library
    │   ├── CertificatesPage.jsx      # Verified credential cards
    │   └── AchievementsPage.jsx      # XP & Badge progression page
    └── styles/
        └── advanced.css              # Cyber-aesthetic, terminal & modal styling
```

---

## ⚡ Quick Start & Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
The app will run at `http://localhost:5173/`.

### 3. Build for Production
```bash
npm run build
```
Generates optimized static assets in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

develped by Engr Faisal Khan

## 📜 License
MIT License. Developed for the CyberSNova Learning Management System Internship Task.
