# Copilot Instructions for `gb-career-pilot-frontend`

## Build, test, lint, and format

Use npm scripts from `package.json`:

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build production bundle: `npm run build`
- Preview production bundle: `npm run preview`
- Lint: `npm run lint`
- Type-check: `npm run type-check`
- Run tests (Vitest): `npm run test`
- Run tests with coverage (CI-aligned): `npm run test:coverage`
- Run a single test file: `npm run test -- src/path/to/file.test.jsx`
- Run tests matching a name: `npm run test -- -t "test name"`
- Format: `npm run format`
- Check formatting: `npm run format:check`

CI workflow (`.github/workflows/frontend-ci.yml`) uses Node 20 and runs lint, format check, type-check, coverage tests, and build.

Useful local CI-parity sequence:

```bash
npm ci
npm run lint
npm run format:check
npm run type-check
npm run test:coverage
npm run build
```

Vitest detail for this repo:

- `npm run test` starts Vitest in interactive mode.
- Use `npm run test -- --run` for one-off non-watch execution.
- Use `npm run test -- --run src/path/to/file.test.jsx` for a single test file in CI-style mode.
- There are currently no committed `*.test.*` / `*.spec.*` files under `src/`; add tests first, then use the single-file commands above.

## High-level architecture

- **Application shell and providers:** `src/main.jsx` boots the app, loads global CSS (`index.css` + `styles/design-system.css`), and conditionally initializes Sentry when `VITE_SENTRY_DSN` is set. `src/App.jsx` wraps routes with `QueryClientProvider`, `AuthProvider`, `BrowserRouter`, and `Toaster`.
- **Routing model:** `src/App.jsx` defines public routes (landing/auth) and protected routes through `components/common/ProtectedRoute.jsx`. There is a deliberate **modern + legacy** route split (e.g., `/dashboard` and `/dashboard-old`, `/chat` and `/chat-old`).
- **Data access layer:** Backend calls are centralized in `src/api/*.js` modules (`auth`, `users`, `universities`, `tests`, `stats`, `chat`) and share `src/api/axios.js` for base URL, auth header injection, and token refresh flow.
- **Auth/session flow:** `contexts/AuthContext.jsx` is the source of truth for auth state and user profile updates, with persistence in `utils/tokenStorage.js`. The provider restores session on startup and fetches fresh user data.
- **Feature data flow:** Most feature pages use TanStack Query directly in page components (for example `pages/universities/UniversitiesPageModern.jsx`, `pages/programs/ProgramSearchPageModern.jsx`, and `pages/prep/TestTaking.jsx`) with API modules as query/mutation functions.
- **Streaming chat special case:** `components/chat/ChatInterface.jsx` performs streaming via native `fetch` + SSE-style chunk parsing, instead of using the `chatAPI.sendMessage` helper.
- **UI system:** Styling combines Tailwind utilities, reusable common components (e.g., `components/common/Button.jsx`), and custom design-system classes from `src/styles/design-system.css` that modern pages import explicitly.

## Key repository conventions

- **Use API modules, not inline endpoints:** Add/extend API calls in `src/api/*.js` and return `response.data` consistently.
- **Guard authenticated pages with `ProtectedRoute`:** Routes requiring auth should be wrapped in `ProtectedRoute`, and auth logic should stay inside `AuthContext`/`useAuth`.
- **Follow the modern/legacy page pattern when touching routed screens:** New UI updates often land in `*Modern` pages while older pages remain accessible via `*-old` routes.
- **Prefer React Query for server state:** Existing pages use `useQuery`/`useMutation` directly with API functions instead of ad hoc effect-based fetching.
- **Styling pattern is mixed by design:** Prefer Tailwind for layout/utility styling; reuse shared component variants (like `Button`) and existing design-system utility classes before adding new CSS.
- **Environment assumptions:** API base URL comes from `VITE_API_BASE_URL` (fallback `http://localhost:8000` in code). Sentry is optional via `VITE_SENTRY_DSN`.
- **Code style/quality hooks:** ESLint is configured for JS/JSX (flat config, React hooks + react-refresh rules), and Prettier is used for formatting.

## Related docs worth checking before large changes

- `README.md` for setup, env vars, and deployment context
- `CONTRIBUTING.md` for branch naming and Conventional Commit format
- `DESIGN_SYSTEM_GUIDE.md` and `src/styles/design-system.css` for UI patterns used by modern pages
