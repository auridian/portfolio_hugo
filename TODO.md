# MiloHooper.com Delivery Plan

## Guiding Themes
- Reinforce resilience: async data loading, caching, error boundaries
- Maintain velocity: lightweight tooling, predictable component patterns
- Preserve aesthetic: neon/green theme, orbital interaction stays premium

## Immediate Priorities

### 1. Orb Homepage Polish
- Tighten spoke animations + accessibility states (focus outlines, skip links)
- Implement layout fallback for small screens (<360px)
- Add analytics-friendly instrumentation hooks

### 2. Posts & Content Pipeline
- Replace synchronous `getPosts()` with async loader + suspense-ready hook
- Add markdown lineage metadata (categories, tags)
- Author consistent card partial for reuse elsewhere

### 3. New Sections Activation
- Flesh out `NowPage.tsx` with feed loop + placeholder API hook
- Establish `StatsPage.tsx` scaffolding (cards, charts placeholder)
- `ProjectsPage.tsx` grid layout & content slots

## Infrastructure & Tooling
- Add ESLint + Prettier, integrate via `npm run lint`
- Wire GitHub Actions workflow for build + lint
- Configure `.env` handling for future API keys (document in README)

## Data & API Readiness
- Create `src/config.ts` for endpoint roots and feature flags
- Implement `fetchJSON` helper with retries & typed responses
- Introduce React Query (or custom cache) to handle “now/stats” fetches

## Visual System
- Break `global.css` into scoped modules (home, posts, shared utilities)
- Define design tokens in `:root` (spacing scale, radii, gradient presets)
- Expand dark theme accessibility (contrast audits, prefers-reduced-motion)

## Documentation
- Update README with architecture overview + contributing guide
- Add section documenting content import script & markdown structure
- Capture deployment instructions (hosting target TBD)
- Document API integration workflow and local .env expectations

## Stretch Enhancements
- Animate orb spokes with physics-inspired motion library (GSAP/Spring)
- Add offline-ready service worker for posts
- Explore 3D WebGL background variant toggle

## Tracking & Review
- Maintain this TODO as single source of planning truth
- Revisit weekly to reprioritize based on external data needs

## API Integration Blueprint

### Data flow overview
- **Config**: `src/config.ts` exposes `config.api` with environment, base URL, timeout, retries. Populate via `.env` using `VITE_API_*` keys.
- **HTTP helper**: `src/utils/http.ts` exports `fetchJSON()` (retry + timeout) and `mockJsonResponse()` for local prototyping.
- **Hooks (planned)**: page-level hooks (`useNowFeed`, `useStatsSnapshot`) will call `fetchJSON()` and return typed data models.

### Implementation checklist
- Add `.env.local` with `VITE_API_BASE_URL` pointing at staging service.
- Create `src/hooks/useNowFeed.ts` using `fetchJSON('/now')` with fallback to `mockJsonResponse` when offline.
- Create `src/hooks/useStatsSnapshot.ts` hitting `/stats` endpoint, expose loading/error states.
- Inject hooks into `NowPage.tsx` and `StatsPage.tsx` using Suspense or explicit loading skeletons.
- Introduce React Query provider (optional) to cache results when live API is ready.

### Testing strategy
- Provide MSW (Mock Service Worker) handlers mirroring `/now` and `/stats` responses.
- Add unit tests for `fetchJSON()` covering timeout + retry logic.
- Smoke-test hooks with mocked fetch to ensure components render loading + error UI.
