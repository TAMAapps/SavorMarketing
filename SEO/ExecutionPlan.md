# Savor SEO Initiative: Execution Plan & Checklist


---

## Phase 1: Foundational Technical Setup

*This phase must be completed before content creation begins. All tasks are to be executed by the client.*

- [ ] **1. Deploy Headless WordPress CMS**
    - [ ] 1.1. **Hosting:** Set up a new WordPress hosting environment on **Namecheap**.
    - [ ] 1.2. **Installation:** Install a clean, up-to-date version of WordPress.
    - [ ] 1.3. **Headless Configuration:** Install and configure the **WPGraphQL** plugin to enable headless CMS functionality.
    - [ ] 1.4. **SEO Plugin:** Install and activate the **Rank Math SEO** plugin.
    - [ ] 1.5. **Validation:** Confirm the CMS is fully operational and the GraphQL endpoint is accessible for the frontend application.

- [ ] **2. Configure Site-wide SEO & Schema in Rank Math**
    - [ ] 2.1. **XML Sitemap:** Configure and enable the XML Sitemap feature in Rank Math. Ensure it is set to include all public pages and post types.
    - [ ] 2.2. **Schema Implementation:** Apply the default, site-wide schema templates as specified in the proposal:
        - [ ] **Homepage (`/`):** `WebSite` schema.
        - [ ] **Category Pages (`/food-diary`, etc.):** `CollectionPage` schema.
        - [ ] **Static App Pages (`/rate`, `/my-dishes`):** `WebApplication` / `WebPage` schema.
        - [ ] **Community Page (`/community`):** `WebPage` schema with `InteractionCounter`.
    - [ ] 2.3. **Google Search Console Integration:** Connect Rank Math to Google Search Console and submit the primary XML sitemap URL.

---

## Phase 2: Internal Content Generation & Deployment

*This phase details the internal process for creating and publishing all 125 articles using our AI-powered workflow, based on the outlines provided by Luis Garcia.*

- [ ] **1. Establish Content Generation Workflow in Cursor**
    - [ ] 1.1. **Create Prompt Template:** Develop a standardized prompt template for generating articles. The prompt will instruct the AI to:
        - *Act as an expert food writer for the Savor blog.*
        - *Write an 800-1,500 word article based on the provided outline.*
        - *Naturally incorporate the primary and secondary keywords.*
        - *Maintain a tone that is passionate, insightful, and aimed at food lovers.*
        - *Conclude with a clear Call-to-Action (CTA) pointing to a relevant Savor app feature.*
    - [ ] 1.2. **Batch Processing:** Organize the 125 outlines into five cluster-based batches for streamlined production.

- [ ] **2. Execute Content Creation & Optimization**
    - [ ] 2.1. **Generate Drafts:** For each of the 125 outlines, run the prompt template in Cursor to generate the initial article draft.
    - [ ] 2.2. **Human Review & Edit:** Critically review and edit each AI-generated draft for accuracy, flow, and brand voice. **This step is mandatory and cannot be skipped.**
    - [ ] 2.3. **SEO Optimization & Upload:**
        - [ ] In the WordPress editor, paste the final article.
        - [ ] Use the Rank Math panel to populate the **Title**, **Meta Description**, and **Focus Keywords** from the Content Sheet.
        - [ ] Ensure the Rank Math score is "Good" and that the `Article` schema is correctly applied.
        - [ ] Assign the post to the correct category and publish.
    - [ ] 2.4. **QA:** After each batch, spot-check 5-10 live articles to ensure they render correctly and all metadata is accurate.

---

## Phase 3: Performance Monitoring & Iteration

*This phase begins once the first article is deployed. The KPI Dashboard will be built within 4 weeks of this date, and monitoring will continue for 8-12 weeks total.*

- [ ] **1. Build and Monitor KPI Dashboard in Cursor**
    - [ ] 1.1. **API Integration:** Connect Cursor to the **Google Search Console API** and **Google Analytics API**.
    - [ ] 1.2. **Dashboard Creation:** Build a custom dashboard within Cursor to track the key KPIs from the proposal:
        - **Rankings:** Top 10/20 positions for primary target keywords.
        - **Organic Traffic:** Clicks and Impressions from the new content.
        - **User Engagement:** Dwell Time and Pages per Session for blog content.
        - **Conversions:** Sign-ups or dish ratings attributed to organic traffic.
    - [ ] 1.3. **Weekly Review:** Monitor the dashboard weekly to track progress against the 8-12 week goals.

- [ ] **2. Compile Final Report & Plan Next Steps**
    - [ ] 2.1. After 12 weeks, generate a comprehensive performance report from the Cursor dashboard.
    - [ ] 2.2. Identify the highest-performing content clusters to determine future strategy.
    - [ ] 2.3. Develop a data-driven plan to scale the successful elements of the campaign.

---

## Phase 4 (Optional): Post-Launch Strategic Review & Refinement

*This phase leverages the consultant for a data-informed review after the initial content has been live and performance data is available.*

- [ ] **1. Final Content Adjustments (with Luis)**
    - [ ] 1.1. After all content is published and initial data is gathered, conduct a final strategic review.
    - [ ] 1.2. Utilize the two (2) included rounds of post-delivery adjustments with Luis for any strategic copy tweaks needed on the live articles, informed by performance metrics.

- [ ] **2. Decide on Expired Domain Strategy**
    - [ ] 2.1. **Review & Decide:** With performance data from the initial content launch, make a final, data-informed decision on the "Expired Domain Strategy."
    - [ ] 2.2. **If Proceeding:**
        - [ ] Use **Ahrefs** to identify relevant expired domains (DA > 20) with strong foodie backlinks that align with high-performing content clusters.
        - [ ] Purchase the selected domains and implement 301 redirects to the appropriate Savor category pages.
    - [ ] 2.3. **If Not Proceeding:** Formally document the decision to table this strategy.
