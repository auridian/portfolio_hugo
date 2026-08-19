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
- `ProjectsPage.tsx` grid layout & content slots

## Infrastructure & Tooling
- Add ESLint + Prettier, integrate via `npm run lint`
- Wire GitHub Actions workflow for build + lint
- Configure `.env` handling for future API keys (document in README)

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
