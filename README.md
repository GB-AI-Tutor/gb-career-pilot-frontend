# 🎓 GB Career Pilot - Frontend

<div align="center">

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

[![License: Dual](https://img.shields.io/badge/License-Dual%20(MIT%2FCommercial)-blue.svg)](./LICENSE.md)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://raqeebs.app)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

**Modern React frontend for AI-powered university counseling**

[Live Demo](https://raqeebs.app) · [Backend Repo](https://github.com/GB-AI-Tutor/gb-career-pilot-backend) · [Report Bug](https://github.com/GB-AI-Tutor/gb-career-pilot-frontend/issues) · [Request Feature](https://github.com/GB-AI-Tutor/gb-career-pilot-frontend/issues)

</div>

---

## 🎯 About

GB Career Pilot Frontend is a modern, responsive web application built with React 19 and Vite. It provides an intuitive interface for Pakistani students to explore universities, discover programs, and receive AI-powered career guidance.

**Live App:** https://raqeebs.app  
**Backend API:** https://github.com/GB-AI-Tutor/gb-career-pilot-backend

---

## ✨ Features

- 🎨 **Modern UI** - Clean, energetic design with TailwindCSS
- 💬 **AI Chat Interface** - Real-time streaming AI counseling
- 🎓 **University Explorer** - Browse 200+ institutions
- 📚 **Program Search** - Discover academic programs
- 👤 **User Dashboard** - Personalized profile management
- 📱 **Responsive** - Mobile-first design
- ⚡ **Fast** - Vite for instant HMR
- 🔐 **Secure Auth** - JWT-based authentication
- 🌐 **API Integration** - TanStack Query for data management
- ♿ **Accessible** - ARIA labels and keyboard navigation

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | React 19 |
| **Build Tool** | Vite 5.0+ |
| **Styling** | TailwindCSS 3.4 |
| **State Management** | React Context + TanStack Query |
| **Routing** | React Router v6 |
| **HTTP Client** | Axios |
| **Forms** | React Hook Form |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or pnpm
- Backend API running (see [backend repo](https://github.com/GB-AI-Tutor/gb-career-pilot-backend))

### Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/GB-AI-Tutor/gb-career-pilot-frontend.git
   cd gb-career-pilot-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your backend API URL
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open browser**
   - Local: http://localhost:5173
   - Network: Check terminal for network URL

### Environment Variables

Create `.env` file:

```env
# Backend API URL
VITE_API_BASE_URL=http://localhost:8000

# For production:
# VITE_API_BASE_URL=https://gb-career-pilot-api.onrender.com
```

---

## 📁 Project Structure

```
gb-career-pilot-frontend/
├── src/
│   ├── api/
│   │   └── axios.js           # Axios configuration
│   ├── components/
│   │   ├── auth/              # Auth components
│   │   ├── chat/              # AI chat interface
│   │   ├── dashboard/         # Dashboard components
│   │   ├── common/            # Reusable components
│   │   └── ...
│   ├── contexts/
│   │   └── AuthContext.jsx    # Authentication context
│   ├── hooks/
│   │   └── useAuth.js         # Auth hooks
│   ├── pages/
│   │   ├── Home.jsx           # Landing page
│   │   ├── Login.jsx          # Login page
│   │   ├── Dashboard.jsx      # User dashboard
│   │   ├── Universities.jsx   # University listing
│   │   ├── Programs.jsx       # Program listing
│   │   ├── AIChat.jsx         # AI counseling
│   │   └── ...
│   ├── services/              # API service layer
│   ├── utils/                 # Utility functions
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── public/                    # Static assets
├── .github/workflows/         # CI/CD
├── package.json               # Dependencies
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind configuration
└── vercel.json                # Vercel deployment config
```

---

## 🎨 Key Pages

### 🏠 Home Page
- Hero section with CTA
- Features overview
- University highlights
- How it works section

### 💬 AI Chat
- Real-time streaming responses
- Conversation history
- Context-aware recommendations
- Message formatting with markdown

### 🎓 Universities
- Grid/list view toggle
- Search and filters
- University cards with details
- Pagination

### 📚 Programs
- Program search
- Filter by field/degree
- Program details modal
- Related universities

### 👤 Dashboard
- User profile
- Conversation history
- Saved universities
- Settings

---

## 🧪 Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Format code
npm run format
```

### Code Style

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Conventional Commits** - Commit message format

---

## 🚢 Deployment

### Vercel (Production)

Automatic deployment from `main` branch.

**Live URL:** https://raqeebs.app

1. Push to `main`
2. Vercel auto-detects changes
3. Builds and deploys

### Manual Deployment

```bash
# Build
npm run build

# Deploy dist/ folder to any static host
```

### Environment Variables on Vercel

Set in Vercel dashboard:
- `VITE_API_BASE_URL` - Backend API URL

---

## 🤝 Contributing

We welcome contributions from frontend developers and designers!

### How to Contribute

1. Fork repository
2. Create branch: `git checkout -b feature/ui-improvement`
3. Make changes
4. Test locally: `npm run dev`
5. Commit: `git commit -m 'feat: improve dashboard UI'`
6. Push: `git push origin feature/ui-improvement`
7. Open Pull Request

### Contribution Areas

- 🎨 **UI/UX** - Improve design and user experience
- 📱 **Responsive Design** - Mobile optimization
- ♿ **Accessibility** - ARIA labels, keyboard navigation
- ✨ **Features** - New pages or components
- 🐛 **Bug Fixes** - Fix issues
- 📚 **Documentation** - Improve docs
- 🧪 **Testing** - Add tests

### Good First Issues

Look for [`good first issue`](https://github.com/GB-AI-Tutor/gb-career-pilot-frontend/labels/good%20first%20issue) label!

**Read [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.**

---

## 📜 License

**Dual-license model:**
- ✅ Free for non-profit (students, NGOs, education)
- 💼 Commercial license required for businesses

See [LICENSE.md](./LICENSE.md)

---

## 🔒 Security

Found a security issue?

📧 Email: security@feelandsupport.org  
**Do NOT open public issues for security vulnerabilities!**

See [SECURITY.md](./SECURITY.md)

---

## 📞 Contact & Community

- 🌐 **Live App:** [raqeebs.app](https://raqeebs.app)
- 💬 **Discord:** *Coming soon*
- 📧 **Email:** contact@feelandsupport.org
- 🐛 **Issues:** [GitHub Issues](https://github.com/GB-AI-Tutor/gb-career-pilot-frontend/issues)
- 💡 **Discussions:** [GitHub Discussions](https://github.com/GB-AI-Tutor/gb-career-pilot-frontend/discussions)

---

## 🙏 Acknowledgments

- **React Team** - For React 19
- **Vite Team** - For blazing-fast builds
- **Tailwind Labs** - For TailwindCSS
- **Vercel** - For free hosting
- **Feel and Support** - Our parent organization

---

## 📊 Project Status

- ✅ **Production Ready** - Live at raqeebs.app
- ✅ **Actively Maintained** - Regular updates
- ✅ **Open Source** - Community contributions welcome
- 🚀 **Growing** - Expanding features

---

<div align="center">

**Built with ❤️ by Feel and Support**

[⭐ Star](https://github.com/GB-AI-Tutor/gb-career-pilot-frontend) · [🍴 Fork](https://github.com/GB-AI-Tutor/gb-career-pilot-frontend/fork) · [🐛 Report](https://github.com/GB-AI-Tutor/gb-career-pilot-frontend/issues)

</div>
