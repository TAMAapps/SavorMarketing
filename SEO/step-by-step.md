# Savor pSEO Execution Playbook (v3.0)

> **Scope of This Doc**  
> • Synthesises the approved Strategy v3.0 (see Consultant Review) with the *Task Tracker* current status.  
> • Provides **two views**: a concise *30-second overview* and an *implementation checklist* you can open in Cursor and tick off.  
> • **Detailed tasks begin *after* the Authority Guides are published and the _first pSEO test cluster_ (≈50 pages) is live.**  

---

## ✈️ High-Level Flight Plan

| # | Phase | Outcome | ETA |
|---|-------|---------|-----|
| 0 | **Visual & Template QA** | Blog styling, base templates, CWV pass on test post | **TODAY → D+2** |
| 1 | **Publish Authority Content** | 5 expert guides live, indexed, internally linked | D+3 |
| 2 | **Manual Infrastructure Validation** | Confirm sitemap, indexing, CWV & basic GA4 tracking | D+5 |
| 3 | **Launch pSEO Test Cluster** | 50 location/cuisine pages live & indexed | D+10 |
| 4 | **Automate Keyword → Content Pipeline** | DataForSEO + AI loop producing JSON drafts | D+15 |
| 5 | **Continuous Deployment & Revalidation** | GitHub Action + Vercel auto-rebuild verified | D+17 |
| 6 | **Meta & Schema Mapping** | Rank Math → `<head>` + Article JSON-LD | D+20 |
| 7 | **Analytics & Monitoring** | GA4 + GSC + Looker Studio dashboard | D+23 |
| 8 | **Scale to 300 Pages** | Cuisine bucket + 50 cities pages | D+30 |
| 9 | **Performance & Quality Guardrails** | Automated CWV & content QA loops | Ongoing |

*D = day we hit “Visual & Template QA complete”*

---

### **Phase 0 – Visual & Template QA (TODAY → D+2)**

> URL references:  
> • Live blog hub: <https://www.savortheapp.com/blog/>  
> • Sample post: <https://www.savortheapp.com/blog/production-test-authentic-sushi-experience-in-tokyo>

| Task | Notes | Status |
|------|-------|--------|
| Inspect blog hub & sample post for UI/UX, spacing, fonts | Align with landing-page brand style | ⏳ |
| Ensure `index.astro`, `[slug].astro`, category & pagination pages use **single shared layout** for maintainability | `src/layouts/BlogLayout.astro` | ⏳ |
| Verify Core Web Vitals on both URLs | Target 90+ PSI mobile | ⏳ |
| Implement basic `BlogCard` component for `/blog/` list | Improves CTR | ⏳ |
| Add 404 fallback styling in Astro | Avoid blank look | ⏳ |
| Smoke-test build → Vercel preview | `npm run build && vercel --prebuilt` | ⏳ |

Once Phase 0 passes QA mark all ✅ and proceed.

---

### **Phase 1 – Publish Authority Content (D → D+3)**

1. **Generate** 5 guide outlines in Cursor using `Taskmaster AI` prompt → save to `data/authority-guides-{date}.json`.  
2. **Create** markdown/HTML files via script `scripts/build-authority-guides.js` which converts JSON to WordPress REST payloads.  
3. **Run** `node scripts/wp-bulk-create.js data/authority-guides-{date}.json --status=draft` (leverages existing bulk creator) – *no manual WordPress editing required*.  
4. Review drafts in WordPress Preview for formatting; make minor edits if needed.  
5. **Publish** drafts via Cursor command: `node scripts/wp-transition-status.js --file data/authority-guides-{date}.json --status=publish`.  
6. Trigger manual rebuild: `git commit --allow-empty -m "rebuild for authority guides" && git push`.  
7. Verify guides appear on `/blog/` (hub) and in sitemap.  
8. Internal link each guide to at least one other guide + a test pSEO page through quick content update in Cursor.  
9. Request indexing in GSC via `mcp_apify/rag-web-browser` automation or manual UI.

> **Why this change?**  
> Keeps the workflow **fully inside Cursor**, aligns with project preference for script-driven publishing, and avoids manual WordPress UI steps except optional visual QA.

---

### **Phase 2 – Manual Infrastructure Validation (D+3 → D+5)**

| Check | Tool | Owner | Status |
|-------|------|-------|--------|
| XML sitemap lists 5 guides | browser /robots.txt | Dev | ⏳ |
| Pages indexed (site:savortheapp.com "why-dish-ratings") | Google | SEO | ⏳ |
| GA4 real-time shows hits | GA4 dashboard | Marketing | ⏳ |
| CWV scores acceptable for guides | PSI | Dev | ⏳ |

*If any metric fails, fix before proceeding to Phase 3.*

---

### **Phase 3 – Pipeline Automation (D → D+5)**

#### **3.1 Integrate DataForSEO MCP** *(Task 2.2 – Pending)*

| Sub-task | Cmd / File | Owner |
|----------|------------|-------|
| ⏳ Add DataForSEO credentials to `.env.local` (local) and Vercel | — | DevOps |
| ⏳ Create `scripts/keyword-research.js` calling **keyword_ideas**, **related_keywords**, **keyword_suggestions** endpoints | `savor-site/scripts/` | Developer |
| ⏳ Output JSON ➞ `savor-site/data/keywords-{yyyyMMdd}.json` with fields: `keyword`, `sv`, `kd`, `intent` | — | Developer |
| ⏳ Commit script + sample run, push to repo | — | Developer |

#### **3.2 Prompt Templates for Content Gen**

1. Create `/prompts/pseo-outline.md` and `/prompts/pseo-draft.md` with placeholders.  
2. Use **Taskmaster AI MCP** to call Claude/Perplexity → generate outline/draft.  
3. Append drafts to `data/posts-{date}.json`.

#### **3.3 Bulk Post Creator Enhancement**

• Extend existing `wp-bulk-create.js` to read new `posts-{date}.json` and post as **draft** status.  
• Rate-limit 1 req / sec (WordPress REST limit).

---

### **Phase 4 – Continuous Deployment (D+5 → D+7)**

1. ⏳ **Create GitHub Action `revalidate.yml`** *(Task 2.3 – Pending)*  
   ```yaml
   on:
     schedule:
       - cron: "0 * * * *" # every hour
     workflow_dispatch:
   jobs:
     build-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - run: npm ci
         - run: npm run build --workspaces savor-site
         - run: npx vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }}
   ```
2. ⏳ **Add Vercel revalidate endpoint** to secrets.  
3. ⏳ **Test hourly cron** by pushing a dummy post → confirm it appears after build.

---

### **Phase 5 – Meta & Schema Mapping (D+7 → D+10)**

| Step | Description | File | Status |
|------|-------------|------|--------|
| 5.1 | Update WordPress client: `getPostBySlug()` add `_fields=meta` | `savor-site/src/lib/wordpress.ts` | ⏳ |
| 5.2 | In `[slug].astro`, map `rank_math_title`, `rank_math_description` to `<title>` / `<meta>` | `savor-site/src/pages/blog/[slug].astro` | ⏳ |
| 5.3 | Add `SchemaOrgArticle` JSON-LD component | `savor-site/src/components/` | ⏳ |
| 5.4 | Test with Google Rich Results tool | — | ⏳ |

---

### **Phase 6 – Analytics & Monitoring (D+10 → D+13)**

1. ⏳ **GA4 Setup**  
   • Create property, get `G-XXXXXXX`, add to `.env`.  
   • Add `Analytics.astro` with `gtag` snippet.
2. ⏳ **Google Search Console**  
   • Verify domain (HTML file).  
   • Submit **both** sitemaps (Astro + WordPress).
3. ⏳ **Looker Studio Dashboard**  
   • Connect GA4 & GSC, template shared with team.

---

### **Phase 7 – Scale to 300 Pages (D+13 → D+20)**

1. Generate **town-level cuisine pages** via pipeline.  
2. Bulk upload via enhanced `wp-bulk-create.js`.  
3. Trigger GitHub Action manually to verify large build.
4. Monitor Vercel build time <5 min; slice into batches if slower.
5. Create **internal linking script** to update older pages with links to new pages.

---

### **Phase 8 – Performance & Quality Guardrails (Continuous)**

| Guardrail | Tool | Frequency |
|-----------|------|-----------|
| Core Web Vitals budget (<2.5s LCP) | `@calibre/web-vitals` CLI | Weekly |
| Duplicate content detection | `server-perplexity-ask` diff check | Post-deploy |
| Alt-text generation | `task-master-ai` on `img` lacking `alt` | Post-deploy |
| Broken link checker | `npx broken-link-checker` | Weekly |

---

## 🏁 How to Use This Doc

1. Open **`SEO/step-by-step.md`** in Cursor.  
2. Mark tasks ✅ / 🔄 / ⏳ as you progress.  
3. Sync status updates into `docs/task-tracker.md` weekly.  
4. When phases complete, archive this version and bump doc version.

---

*Last updated: {{TODAY}}*

---

## 📜 Change Log

| Date | Change | Reason |
|------|--------|--------|
| {{TODAY}} | Added Phase 0 (Visual & Template QA) and Phase 2 (Manual Infra Validation); reordered subsequent phases; updated High-Level Flight Plan | Ensures we perfect visual brand + publishing pipeline *before* automation & scale |
| {{TODAY}} | Expanded tasks for authority content publishing (Phase 1) | Reflects real sequence: publish 5 authority articles first |
