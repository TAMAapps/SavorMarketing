---
title: "PRD: Simple & Scalable Programmatic SEO CMS"
author: "AI Assistant & John Taba"
date: "June 25, 2024"
version: "2.0"
status: "Draft"
---

## 1. Introduction

### Problem Statement
To become an authority in the food discovery space, Savor needs to capture significant organic traffic from long-tail search queries. Manually creating content for thousands of specific queries (e.g., "best pasta in Brooklyn," "romantic dinner spots in Chicago") is impossible.

We need a **simple, non-overengineered internal system** to programmatically generate, manage, and scale high-quality, unique content pages. The initial goal is 10 pages, with the architecture built to scale to 1,000+ pages efficiently.

### Guiding Principles
This system is guided by two core principles from `@seo-research1.md`:
1.  **Quality over Junk:** Combine automation with features that ensure uniqueness and user value to satisfy Google's Helpful Content System.
2.  **Efficiency & Scalability:** The system must be simple to manage and allow for edits at a global, category, and individual level without complexity.

## 2. Core Philosophy: A File-Based Approach

To avoid overengineering, this system will operate as a **Static Site Generator (SSG)**. It will be a file-based CMS, not a complex database-driven one.

-   **Data in Files:** All page data will live in simple text files (Markdown with YAML frontmatter), not a database. This is fast, version-controllable with Git, and easy to edit.
-   **Separation of Concerns:** Content (data) is stored separately from presentation (templates).
-   **The "Build" Step:** A script will "build" the website by combining the data files with HTML templates to generate the final, static HTML pages that get deployed.

This approach is extremely fast, secure, and infinitely scalable with very low maintenance overhead.

## 3. The 3-Layer Editing & Content Architecture

This architecture is designed specifically to allow for global, category, and individual page edits with maximum efficiency.

### Layer 1: The Global Config (`_config.yml`)
This is a single YAML file at the root of the project. It holds all variables that apply site-wide. **Editing this one file updates all 1,000+ pages simultaneously upon the next build.**

**Example `_config.yml`:**
```yaml
brand_name: "Savor"
app_store_link: "https://savortheapp.com/download"
global_cta_text: "Remember every meal with the Savor app!"
footer_text: "© 2024 Savor. All rights reserved."
```

### Layer 2: Category Config (`_category.yml`)
Inside each content category folder (e.g., `/content/new-york/`), there will be a `_category.yml` file. This file contains variables and content snippets that apply *only* to pages within that category.

**Example `/content/new-york/_category.yml`:**
```yaml
city_name: "New York"
intro_paragraph: "From Michelin stars to hidden gems, New York's food scene is legendary. We've analyzed thousands of Savor user ratings to bring you the best of the best in NYC."
faq_section_title: "Frequently Asked Questions about dining in New York"
```

### Layer 3: Individual Page Data (`page.md`)
Each individual page is a simple Markdown file with a YAML "frontmatter" block at the top. This frontmatter contains the unique data for that specific page. The content manager can edit this file directly to override anything or add unique content.

**Example `/content/new-york/best-pasta-brooklyn.md`:**
```yaml
---
title: "The 7 Best Pasta Restaurants in Brooklyn"
meta_description: "Discover the top-rated pasta spots in Brooklyn for 2024, based on thousands of reviews from Savor users. Find your next great Italian meal."
slug: "best-pasta-brooklyn"
restaurants:
  - name: "Lilia"
    neighborhood: "Williamsburg"
    top_dish: "Mafaldini"
    unique_blurb: "A modern classic, Lilia's wood-fired cooking and perfectly executed pastas make it a must-visit."
  - name: "Frankies 457 Spuntino"
    neighborhood: "Carroll Gardens"
    top_dish: "Cavatelli with Faiccos Hot Sausage"
    unique_blurb: "Known for its cozy back garden and rustic Italian-American fare, this is a beloved neighborhood staple."
---

## More About Brooklyn's Pasta Scene

This is a section of unique, manually-written content that can be added to this specific page to give it extra SEO value. We can discuss the history of Italian food in the area or compare different pasta shapes.
```

## 4. System Workflow & Features

### 4.1. The Generation Script
-   A script (e.g., Python, Node.js) that runs locally.
-   It pulls data from source APIs (Google Places, etc.) or CSV files.
-   It uses a list of keyword permutations (e.g., `{{CUISINE}}` in `{{NEIGHBORHOOD}}`).
-   **Output:** It generates the folder structure and the individual `page.md` files with their frontmatter populated. It does **not** create category or global configs; those are managed manually.

### 4.2. The Build & Deploy Script
-   This script triggers the Static Site Generator (e.g., Hugo, Next.js, Eleventy).
-   The SSG reads all config files and `.md` files.
-   It uses HTML templates (e.g., `list-page.html`) to merge the data into the final design.
    -   The template will be coded to look for variables in this order:
        1.  Individual Page (`page.md` frontmatter)
        2.  Category Config (`_category.yml`)
        3.  Global Config (`_config.yml`)
    -   This allows individual page data to override category data, and category data to override global data, providing perfect hierarchical control.
-   The script outputs the final static HTML, CSS, and JS to a `/dist` folder, which is then deployed to the web server.

### 4.3. Uniqueness & Quality Strategy
-   **Data Variation:** The generation script will pull in dynamic data points (ratings, review counts, top dishes) to ensure page data is fresh.
-   **Manual Enrichment:** The architecture allows a content manager to easily open any `.md` file and add a paragraph of unique text, as shown in the example above.
-   **Component Logic:** Templates can have logic to slightly vary layouts or component order to reduce visual duplication.

## 5. Phased Rollout Plan

1.  **Phase 1 (Sprint 1-2):**
    -   Set up the SSG (e.g., Eleventy).
    -   Create the initial `_config.yml` and the master HTML template.
    -   **Manually create the first 10 `page.md` files** for a single category to prove the concept.

2.  **Phase 2 (Sprint 3-4):**
    -   Develop the initial `Generation_Script_v1`.
    -   Configure it to generate 100 pages for one city based on API data.
    -   Refine the HTML template and component styles.

3.  **Phase 3 (Sprint 5):**
    -   Generate and deploy the first 100 pages.
    -   Begin monitoring GSC for indexing and initial traffic.
    -   Scale generation to 1,000 pages and prepare for batched deployment.

## 6. Out of Scope for V1

-   A web-based UI (CMS). Management is done directly in the files.
-   Real-time page updates. Changes are live only after a "build" is run.
-   Complex user permission systems.

---
This PRD outlines a simple, powerful, and scalable system for programmatic SEO that directly addresses the need for efficient global, category, and individual page management. It avoids overengineering by design and prioritizes the quality signals Google rewards.
---
