# Quick Start Guide

## 1. Install Dependencies
```bash
npm install
```

## 2. Start Development Server
```bash
npm run dev
```
Open http://localhost:5173

## 3. Ensure Backend is Running
The frontend connects to `http://localhost:8000` by default.
Make sure your FastAPI backend is running.

## 4. Try It Out

### Register a new account:
1. Click "Get Started" 
2. Fill in the registration form
3. Check your email for verification link
4. Click the link to verify
5. Login with your credentials

### Use the features:
- **Dashboard** - See your stats and quick actions
- **AI Chat** - Ask career guidance questions
- **Universities** - Browse and favorite universities
- **Programs** - Search programs with eligibility tiers
- **Profile** - Update your FSC% and field of interest

## Environment Variables

Default `.env`:
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_FRONTEND_URL=http://localhost:5173
```

Change these if your backend runs on a different URL.

## Build for Production

```bash
npm run build
```

Output in `dist/` folder ready to deploy.

## Troubleshooting

**Build fails?**
- Make sure Node.js 18+ is installed
- Delete `node_modules` and `package-lock.json`, then `npm install` again

**API not connecting?**
- Check backend is running at http://localhost:8000
- Check `.env` has correct `VITE_API_BASE_URL`
- Check browser console for CORS errors

**Auth not working?**
- Clear localStorage: Open DevTools → Application → Local Storage → Clear All
- Try logging out and back in
- Check backend database has verified user

---

**That's it! You're ready to go. 🚀**
