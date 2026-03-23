# GB Career Pilot - Frontend

React frontend application for GB Career Pilot, an AI-powered university guidance platform.

## 🚀 Features

- **AI Career Counselor**: Chat interface with streaming AI responses
- **University Search**: Browse and search Pakistani universities with advanced filters
- **Program Search**: Find programs matching your academic profile with eligibility tiers
- **Eligibility Matching**: Safety, Target, and Reach classifications based on FSC percentage
- **Favorites System**: Save and manage favorite universities
- **User Profiles**: Manage academic info and preferences
- **Dark Mode Support**: Toggle between light and dark themes

## 📋 Prerequisites

- Node.js 18+ and npm
- Backend API running at `http://localhost:8000`

## 🛠️ Installation

1. **Clone and navigate to the project**:
   ```bash
   cd ~/AI_Tutor_project/gb-career-pilot-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env and set your API URL
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── api/              # API integration (axios, auth, users, universities, chat, stats)
├── components/       # React components
│   ├── auth/         # Authentication components
│   ├── chat/         # Chat interface components
│   ├── universities/ # University-related components
│   ├── common/       # Reusable UI components (Button, Input, Card, etc.)
│   └── layout/       # Layout components (Navbar, Sidebar, Footer)
├── contexts/         # React Context (Auth, Theme)
├── hooks/            # Custom React hooks
├── pages/            # Page components (Home, Dashboard, Chat, etc.)
├── utils/            # Utility functions (tokenStorage, formatters, constants)
├── App.jsx           # Main app component with routing
└── main.jsx          # Entry point
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Authentication Flow

1. User registers → verification email sent
2. User clicks email link → account activated
3. User logs in → receives access_token (3 hours) + refresh_token (30 days)
4. Tokens stored in localStorage
5. axios interceptor auto-attaches token to requests
6. On 401 error, automatically refreshes token
7. On logout, tokens cleared and user redirected to login

## 🎨 UI Components

All components are styled with Tailwind CSS and support dark mode:

- **Button**: 4 variants (primary, secondary, danger, outline), 3 sizes
- **Input**: With label, error states, and validation
- **Card**: Reusable container component
- **Loader**: Loading spinner (3 sizes)
- **ProtectedRoute**: Auth check with redirect

## 📡 API Integration

Complete API layer for backend endpoints:

### Auth
- `POST /api/v1/auth/Registeration` - Register user
- `POST /api/v1/auth/verify` - Verify email
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/refresh` - Refresh token
- `POST /api/v1/auth/logout` - Logout
- `POST /api/v1/auth/forgot-password` - Reset password

### Users
- `GET /api/v1/users/me` - Get current user
- `PUT /api/v1/users/update_user_info` - Update profile

### Universities
- `GET /api/v1/universities/get_university` - List universities
- `GET /api/v1/universities/get_university_by_name` - Get by name
- `GET /api/v1/universities/programs/search` - Search programs
- `POST /api/v1/universities/favorites/{id}` - Add favorite
- `DELETE /api/v1/universities/favorites/{id}` - Remove favorite
- `GET /api/v1/universities/favorites` - Get favorites

### Chat
- `POST /api/v1/groq/chat` - Send chat message (SSE streaming)

### Stats
- `GET /api/v1/stats/stats` - Get all universities and programs

## 🎯 Eligibility Tiers

Programs are classified based on student's FSC percentage:

- **Safety** 🟢: Student's % is 10+ points above cutoff
- **Target** 🟡: Student's % is within ±10 points of cutoff
- **Reach** 🟠: Student's % is below cutoff but above minimum
- **Not Eligible** 🔴: Below minimum FSC requirement

## 🌐 Environment Variables

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_FRONTEND_URL=http://localhost:5173
```

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Set environment variables in Vercel dashboard:
- `VITE_API_BASE_URL`: Your backend API URL
- `VITE_FRONTEND_URL`: Your Vercel app URL

Don't forget to update CORS settings in your backend to include your Vercel URL!

## 📦 Dependencies

### Core
- **react** 18.3 - UI library
- **react-dom** 18.3 - React DOM renderer
- **react-router-dom** - Client-side routing
- **vite** - Build tool

### State Management & Data Fetching
- **@tanstack/react-query** - Server state management
- **axios** - HTTP client

### Forms & Validation
- **react-hook-form** - Form state management
- **zod** - Schema validation
- **@hookform/resolvers** - Form validation resolvers

### UI & Styling
- **tailwindcss** - Utility-first CSS
- **@headlessui/react** - Unstyled accessible components
- **lucide-react** - Icon library
- **react-hot-toast** - Toast notifications

## 🛣️ Routing

- `/` - Home/Landing page
- `/login` - Login page
- `/register` - Registration page
- `/verify` - Email verification page
- `/dashboard` - User dashboard (protected)
- `/chat` - AI chat interface (protected)
- `/universities` - Browse universities (protected)
- `/programs` - Search programs (protected)
- `/profile` - User profile (protected)

## �� Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is part of the GB Career Pilot platform.

## 🐛 Known Issues & TODOs

See `IMPLEMENTATION_STATUS.md` for detailed implementation progress and remaining tasks.

## 📞 Support

For issues or questions, please contact the development team.

---

**Built with** ❤️ **using React, Vite, and Tailwind CSS**
