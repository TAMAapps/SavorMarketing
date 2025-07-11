# PRD – Side-Quest: 60-Minute Blog Template

## 1. Objective
Design & implement a visually polished blog/article template (layout + core components) within **1 hour** so we can:
1. Validate end-to-end publishing pipeline (Cursor → WordPress → Astro → Vercel).
2. Ensure guides & future pSEO pages inherit brand styling and pass CWV.

## 2. Deliverables
| ID | Deliverable | Owner | Time-box |
|----|-------------|-------|----------|
| T-1 | **BlogLayout.astro** – global layout with Tailwind & typography | Dev | 20 min |
| T-2 | **BlogCard.astro** – listing card component (image, title, excerpt) | Dev | 10 min |
| T-3 | **PostHeader.astro** – hero section (h1, meta, banner img) | Dev | 10 min |
| T-4 | Tailwind config update (colors, fonts, `@tailwindcss/typography`) | Dev | 10 min |
| T-5 | Smoke test build & Lighthouse mobile ≥ 90 | Dev | 10 min |

## 3. Success Criteria
* Visual look matches landing-page brand palette & typography.
* `/blog/` index renders cards with consistent spacing & hover state.
* Individual post pages render Markdown/HTML wrapped in `prose` classes; CLS < 0.1.
* Build passes and preview deploy reachable on Vercel.

## 4. High-Level Tasks & Sequence
1. **Bootstrap Tailwind in Astro** (if not already):
   ```bash
   cd savor-site && npx astro add tailwind
   ```
2. **Move Tailwind asset kit** (`tailwindcss-savor/Templates/radiant-js`) → `src/styles/vendor/` (optional: copy utility classes only).
3. **Edit `tailwind.config.js`**
   ```js
   plugins: [require('@tailwindcss/typography')],
   theme: {
     extend: {
       colors: { brand: '#ef6c00' },
       fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] }
     }
   }
   ```
4. **Create `src/layouts/BlogLayout.astro`**
   * Contains header (logo link), main `<slot/>` wrapped in `prose`, footer.
   * Dark-mode classes included.
5. **Create `src/components/BlogCard.astro`**
   * Props: `title`, `image`, `excerpt`, `href`.
   * Tailwind: `group hover:opacity-80 transition`.
6. **Create `src/components/PostHeader.astro`**
   * Large banner image, h1, meta (date, category pills).
7. **Wire up listing & slug pages** to use new components & layout.
8. **Run build + preview**
   ```bash
   npm run build && npm run preview
   ```
9. **Lighthouse check** (PSI or `npm i -g lighthouse`): mobile ≥ 90; fix obvious issues.
10. **Commit & push** – triggers Vercel deploy.

## 5. Risks & Mitigations
| Risk | Impact | Mitigation |
|------|--------|-----------|
| Time overrun > 1 h | Delays subsequent phases | Hard cap on feature scope; skip non-critical tweaks |
| CLS issues from images | Low CWV score | Set explicit `width/height`, use Astro `<Image>` |
| Styling conflicts with legacy CSS | Visual glitches | Purge old inline styles; namespace new classes |

## 6. Next Steps After Template
1. Write & publish **5 authority guides** using new template.
2. Execute Phase 2 Manual Infra Validation.
3. Resume main roadmap in `SEO/step-by-step.md`.

---
**ETA to complete side-quest:** *60 minutes sprint.*
