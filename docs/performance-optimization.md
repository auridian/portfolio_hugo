# Performance Optimization Plan

## Goal
Improve perceived and actual load time for milohooper.com while keeping the visual identity intact.

## Workstream Tracker

| Area | Task | Status | Notes/Next Step |
| --- | --- | --- | --- |
| Fonts | Self-host Ubuntu regular/medium weights, add `font-display: swap`, fall back to system stack. | Planned | Export WOFF2 from Google Fonts (Ubuntu is GPL-compatible) and serve from `/public/fonts`. Update CSS to preload critical fonts. |
| Fonts | Replace mock fetch delay for font variant detection with static `font-display` strategy. | Planned | No runtime detection required once fonts self-hosted. |
| Styling | Simplify global background gradients and remove scan animation. | Planned | Prototype static backdrop in separate branch; measure paint time with Chrome Performance. |
| Styling | Reduce heavy blur/backdrop filters on orb and section containers. | Planned | Audit components with `backdrop-filter`, replace with lightweight shadows or pre-rendered assets. |
| Assets | Gate large downloads (resume PDF) behind explicit click and add file-size hint. | Planned | Update CTA copy and add `download` attribute after confirming UX. |
| Tooling | Run `vite build --report` to inspect bundle and asset sizes. | Planned | Add report output to `/docs/perf-reports/latest.html` (gitignored) for future reference. |
| Tooling | Introduce image optimization pipeline (e.g., `vite-imagetools` or manual WebP generation). | Planned | Inventory existing PNG/JPG assets; convert hero art to responsive WebP/AVIF variants. |

## Font Caching Strategy

1. Download Ubuntu Regular (400) and Medium (500) as `.woff2` from Google Fonts and commit to `public/fonts/`.
2. Add `<link rel="preload" as="font" type="font/woff2" crossorigin>` entries for the self-hosted fonts in the HTML shell.
3. Update `global.css` to reference `/fonts/ubuntu-400.woff2` and `/fonts/ubuntu-500.woff2` with `font-display: swap` and a system stack fallback.
4. Configure production hosting to serve `/fonts/*.woff2` with `Cache-Control: public, max-age=31536000, immutable` so visitors reuse cached copies.
5. Keep the Google Fonts import commented for comparison; remove once visual QA confirms parity.

## Immediate Next Actions

1. Prototype a simplified background treatment (remove scan animation, reduce gradient layers) and capture before/after paint profiles.
2. Audit components using `backdrop-filter` or large blurs; replace or scope to smaller hit areas.
3. Remove the `mockJsonResponse` delay for production builds so Stats/Now pages resolve immediately.
4. Inventory hero/thumbnail media and identify candidates for WebP/AVIF conversion ahead of adding an imagetools pipeline.

## Open Questions

1. Confirm acceptable visual changes when reducing glow/blur effects on the homepage orb.
2. Decide whether to keep any animated background elements after performance testing.
3. Determine hosting approach for generated performance reports (local only vs. committed summaries).

## Next Update
Track progress as tasks move beyond "Planned". Each completed action should include timestamps and any measurement deltas (e.g., Lighthouse scores, bundle size changes).
