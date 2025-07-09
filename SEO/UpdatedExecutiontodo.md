# Savor Headless WordPress pSEO Execution Guide (Cursor → GitHub → Vercel)

*Updated for 2025 workflow & best practices. This supersedes the original **ExecutionToDo.md** by aligning every step with a modern static-site generator (Next.js or Astro), ISR, and automated content pipelines.*

---

## 🎯 OVERVIEW

**Goal**  Create a scalable programmatic-SEO (pSEO) engine that publishes thousands of SEO-optimized pages to `savortheapp.com` while authors work entirely inside Cursor. WordPress.com Business acts **only** as a headless CMS and content API.

**Stack**
1. **Content CMS** – WordPress.com Business (`savorcms.wordpress.com`)
2. **Code Workspace** – Cursor IDE
3. **Version Control** – GitHub (`main` branch)
4. **Static + Edge Hosting** – Vercel (ISR & Edge Functions)
5. **Site Generator** – Next.js 14 **or** Astro 4 (choose one in Phase 1)
6. **SEO Plugins** – Rank Math SEO inside WordPress + dynamic meta injection in templates

**Runtime Flow**
```
Author -> Cursor scripts -> WordPress REST   (create/update posts)
Vercel build/ISR -> fetch WP JSON -> generate static + ISR pages
Users -> Vercel CDN edge -> pre-rendered HTML (no WP hit)
```

---

## 📋 PHASE 0 – DECISION POINTS (1-2 hrs)

| ID | Decision | Options | **SAVOR SELECTION** |
|----|----------|---------|---------------------|
| D0-1 | Static-site generator | Next.js 14 / Astro 4 | **✅ ASTRO 4** (Non-technical friendly, HTML-first) |
| D0-2 | Category root path | `/blog/*` / `/guides/*` / custom | **✅ `/blog/*`** (Keeps marketing pages separate) |
| D0-3 | ISR interval | (mins) 5 / 15 / 60 | **✅ 15 mins** (Balanced performance) |

> **✅ DECISIONS LOCKED**: Proceeding with Astro 4 + `/blog/*` routing + 15min revalidation

---

## 🏗️ PHASE 1 – TECHNICAL FOUNDATION (Day 1-2)

### Task 1.1 – Bootstrap Astro in Repo
**Time Required**: 30 minutes  
**Difficulty**: Beginner

1. **Create Astro project in Cursor terminal:**
   ```bash
   npm create astro@latest savor-site
   # When prompted:
   # - Template: "Empty" (we'll add what we need)
   # - TypeScript: "Yes" (recommended)
   # - Install dependencies: "Yes"
   ```

2. **Move existing files to preserve landing page:**
   ```bash
   # Move your current landing page (UNCHANGED)
   mv index.html savor-site/src/pages/index.html
   
   # Move Framework7 assets to public folder
   mv Framework7-iosApps/ savor-site/public/Framework7-iosApps/
   mv assets/ savor-site/public/assets/
   mv LottieAnimations/ savor-site/public/LottieAnimations/
   
   # Keep mockups, onboarding folders at root (not deployed)
   # These stay: mockups/, onboarding/, Context/, etc.
   ```

3. **Update Astro config for your setup:**
   ```js
   // savor-site/astro.config.mjs
   import { defineConfig } from 'astro/config';
   
   export default defineConfig({
     output: 'server', // Enable SSR for WordPress integration
     site: 'https://savortheapp.com',
     integrations: [],
     server: {
       port: 3000
     }
   });
   ```

4. **Test your landing page still works:**
   ```bash
   cd savor-site
   npm run dev
   # Visit http://localhost:3000 → should see your landing page unchanged
   ```

5. **Commit the scaffold:**
   ```bash
   git add .
   git commit -m "feat: bootstrap Astro for headless WordPress blog"
   ```

**✅ Success Check**: Your landing page loads at `http://localhost:3000` exactly as before.

### Task 1.2 – Configure Vercel Project for Astro
**Time Required**: 15 minutes  
**Difficulty**: Beginner

1. **Push to GitHub:**
   ```bash
   git push origin main
   ```

2. **Create new Vercel project:**
   - Go to vercel.com/dashboard
   - Click "New Project"
   - Import your GitHub repo
   - **Important**: Set "Root Directory" to `savor-site/`
   - Framework preset: "Astro" (auto-detected)
   - Build command: `astro build` (auto-detected)
   - Output directory: `dist/` (auto-detected)

3. **Set environment variables:**
   - In Vercel project settings → Environment Variables
   - Add: `WORDPRESS_API=https://savorcms.wordpress.com/wp-json/wp/v2`
   - Environment: All (Production, Preview, Development)

4. **Deploy and test:**
   - Click "Deploy"
   - Once deployed, visit your Vercel URL
   - Verify your landing page loads correctly

**✅ Success Check**: Your landing page is live on Vercel at your assigned URL.

### Task 1.3 – WordPress.com Business Setup (if not done)
1. Sign up Business plan; domain `savorcms.wordpress.com`.
2. Settings → General → Title `Savor CMS`.
3. Settings → Reading → **Site visibility** → *Public* **and** *UNcheck* “Discourage search engines”.
4. Plugins → Add New → **Rank Math SEO**, **Classic Editor** (optional), **WPGraphQL** (if you prefer GraphQL).
5. Rank Math Setup Wizard → Site Type *Blog* → Enable recommended modules.
6. Create 5 core categories: Food Diary, Restaurant Reviews, Cooking Tips, Food Photography, Healthy Eating.

### Task 1.4 – Build WordPress API Client for Astro
**Time Required**: 20 minutes  
**Difficulty**: Beginner

1. **Create API client file:**
   ```bash
   mkdir -p savor-site/src/lib
   touch savor-site/src/lib/wordpress.ts
   ```

2. **Add WordPress API functions:**
   ```ts
   // savor-site/src/lib/wordpress.ts
   const API = import.meta.env.WORDPRESS_API || 'https://savorcms.wordpress.com/wp-json/wp/v2';
   
   export interface WordPressPost {
     id: number;
     title: { rendered: string };
     content: { rendered: string };
     excerpt: { rendered: string };
     slug: string;
     date: string;
     categories: number[];
     _embedded?: {
       'wp:featuredmedia'?: Array<{
         source_url: string;
         alt_text: string;
       }>;
     };
   }
   
   export const getPosts = async (params = ""): Promise<WordPressPost[]> => {
     try {
       const response = await fetch(`${API}/posts?_embed&${params}`);
       if (!response.ok) throw new Error(`HTTP ${response.status}`);
       return await response.json();
     } catch (error) {
       console.error('Error fetching posts:', error);
       return [];
     }
   };
   
   export const getPostBySlug = async (slug: string): Promise<WordPressPost | null> => {
     try {
       const response = await fetch(`${API}/posts?slug=${slug}&_embed`);
       if (!response.ok) throw new Error(`HTTP ${response.status}`);
       const posts = await response.json();
       return posts[0] || null;
     } catch (error) {
       console.error('Error fetching post:', error);
       return null;
     }
   };
   
   export const getCategories = async () => {
     try {
       const response = await fetch(`${API}/categories`);
       if (!response.ok) throw new Error(`HTTP ${response.status}`);
       return await response.json();
     } catch (error) {
       console.error('Error fetching categories:', error);
       return [];
     }
   };
   ```

3. **Test API client:**
   ```bash
   cd savor-site
   npm run dev
   # API functions are ready to use in your Astro pages
   ```

**✅ Success Check**: API client created with error handling and TypeScript support.

### Task 1.5 – Create Blog Pages in Astro
**Time Required**: 45 minutes  
**Difficulty**: Beginner

1. **Create blog listing page:**
   ```bash
   mkdir -p savor-site/src/pages/blog
   touch savor-site/src/pages/blog/index.astro
   ```

2. **Add blog listing page code:**
   ```astro
   ---
   // savor-site/src/pages/blog/index.astro
   import { getPosts } from '../../lib/wordpress';
   
   const posts = await getPosts("per_page=10");
   ---
   
   <html lang="en">
   <head>
     <meta charset="utf-8" />
     <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
     <title>Savor Food Blog - Latest Articles</title>
     <meta name="description" content="Discover the latest food tips, recipes, and restaurant reviews from Savor." />
   </head>
   <body>
     <header>
       <h1>Savor Food Blog</h1>
       <nav>
         <a href="/">← Back to Home</a>
       </nav>
     </header>
     
     <main>
       <section>
         <h2>Latest Articles</h2>
         {posts.length === 0 ? (
           <p>No articles found. Add some content to WordPress!</p>
         ) : (
           <div class="articles">
             {posts.map((post) => (
               <article key={post.id}>
                 <h3><a href={`/blog/${post.slug}`}>{post.title.rendered}</a></h3>
                 <div set:html={post.excerpt.rendered} />
                 <p><small>Published: {new Date(post.date).toLocaleDateString()}</small></p>
               </article>
             ))}
           </div>
         )}
       </section>
     </main>
     
     <style>
       body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
       .articles { display: grid; gap: 2rem; }
       article { border: 1px solid #eee; padding: 1rem; border-radius: 8px; }
       h3 a { text-decoration: none; color: #333; }
       h3 a:hover { color: #007acc; }
     </style>
   </body>
   </html>
   ```

3. **Create individual blog post page:**
   ```bash
   touch savor-site/src/pages/blog/[slug].astro
   ```

4. **Add blog post page code:**
   ```astro
   ---
   // savor-site/src/pages/blog/[slug].astro
   import { getPosts, getPostBySlug } from '../../lib/wordpress';
   import type { WordPressPost } from '../../lib/wordpress';
   
   export async function getStaticPaths() {
     const posts = await getPosts("per_page=100");
     return posts.map((post) => ({
       params: { slug: post.slug },
       props: { post }
     }));
   }
   
   interface Props {
     post: WordPressPost;
   }
   
   const { post } = Astro.props;
   
   if (!post) {
     return Astro.redirect('/blog');
   }
   ---
   
   <html lang="en">
   <head>
     <meta charset="utf-8" />
     <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
     <title>{post.title.rendered} - Savor Food Blog</title>
     <meta name="description" content={post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160)} />
   </head>
   <body>
     <header>
       <nav>
         <a href="/blog">← Back to Blog</a> | <a href="/">Home</a>
       </nav>
     </header>
     
     <main>
       <article>
         <h1>{post.title.rendered}</h1>
         <p><small>Published: {new Date(post.date).toLocaleDateString()}</small></p>
         <div set:html={post.content.rendered} />
       </article>
       
       <footer>
         <p><a href="/blog">← Back to all articles</a></p>
         <p>Download the Savor app to track your favorite dishes!</p>
       </footer>
     </main>
     
     <style>
       body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
       article { line-height: 1.6; }
       h1 { color: #333; border-bottom: 2px solid #007acc; padding-bottom: 10px; }
       nav a { text-decoration: none; color: #007acc; }
       nav a:hover { text-decoration: underline; }
       footer { margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #eee; }
     </style>
   </body>
   </html>
   ```

5. **Test your blog pages:**
   ```bash
   cd savor-site
   npm run dev
   # Visit http://localhost:3000/blog → should show "No articles found" (until you add WordPress content)
   ```

6. **Commit your blog setup:**
   ```bash
   git add .
   git commit -m "feat: create Astro blog pages with WordPress integration"
   ```

**✅ Success Check**: `/blog/` page loads and shows message about no articles (normal until WordPress is set up).

---

## 🗂️ PHASE 2 – CONTENT AUTOMATION PIPELINE (Day 3-7)

### Task 2.1 – Scripted Post Creation from Cursor
**Time Required**: 1 hour  
**Difficulty**: Intermediate

1. **Create WordPress authentication token:**
   - Go to WordPress.com → My Profile → Security → Application Passwords
   - Create new password for "Savor pSEO Script"
   - Save token securely (format: `xxxx xxxx xxxx xxxx`)

2. **Create bulk post creation script:**
   ```bash
   mkdir -p savor-site/scripts
   touch savor-site/scripts/wp-bulk-create.ts
   ```

3. **Add bulk creation script:**
   ```ts
   // savor-site/scripts/wp-bulk-create.ts
   interface PostData {
     title: string;
     slug: string;
     content: string;
     excerpt: string;
     categories: number[];
     status: 'publish' | 'draft';
     meta?: {
       rank_math_title?: string;
       rank_math_description?: string;
     };
   }
   
   const API = 'https://public-api.wordpress.com/wp/v2/sites/savorcms.wordpress.com/posts';
   const TOKEN = process.env.WP_TOKEN; // Your WordPress.com app password
   
   async function createPost(postData: PostData) {
     const response = await fetch(API, {
       method: 'POST',
       headers: {
         'Authorization': `Bearer ${TOKEN}`,
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(postData)
     });
     
     if (!response.ok) {
       throw new Error(`Failed to create post: ${response.statusText}`);
     }
     
     return response.json();
   }
   
   async function bulkCreatePosts(posts: PostData[]) {
     console.log(`Creating ${posts.length} posts...`);
     
     for (const post of posts) {
       try {
         const result = await createPost(post);
         console.log(`✅ Created: ${post.title} (ID: ${result.id})`);
         
         // Rate limiting - wait 1 second between posts
         await new Promise(resolve => setTimeout(resolve, 1000));
       } catch (error) {
         console.error(`❌ Failed to create: ${post.title}`, error);
       }
     }
   }
   
   // Usage: node scripts/wp-bulk-create.js data/posts.json
   const postsFile = process.argv[2];
   if (!postsFile) {
     console.error('Usage: node scripts/wp-bulk-create.js <posts-file.json>');
     process.exit(1);
   }
   
   const posts = JSON.parse(require('fs').readFileSync(postsFile, 'utf8'));
   bulkCreatePosts(posts);
   ```

4. **Create sample posts data file:**
   ```bash
   mkdir -p savor-site/data
   touch savor-site/data/sample-posts.json
   ```

5. **Add sample post data:**
   ```json
   [
     {
       "title": "10 Essential Food Photography Tips for Beginners",
       "slug": "food-photography-tips-beginners",
       "content": "<p>Food photography is an art that can transform your dining experience...</p>",
       "excerpt": "Learn the essential tips to capture stunning food photos that will make your dishes look irresistible.",
       "categories": [4],
       "status": "publish",
       "meta": {
         "rank_math_title": "10 Essential Food Photography Tips for Beginners - Savor",
         "rank_math_description": "Master food photography with these 10 beginner-friendly tips. Create stunning food photos that showcase your culinary creations."
       }
     }
   ]
   ```

6. **Test the script:**
   ```bash
   cd savor-site
   export WP_TOKEN="your-wordpress-app-password"
   node scripts/wp-bulk-create.js data/sample-posts.json
   ```

**✅ Success Check**: Script creates posts in WordPress and they appear on your `/blog/` page.

### Task 2.2 – Programmatic Keyword → Post Generation
1. Use DataForSEO MCP tools to fetch keyword lists (`keyword_ideas`, `related_keywords`).
2. Convert each keyword into `title`, `outline`, `meta` via OpenAI prompt.
3. Save to `data/posts-{yyyymmdd}.json` for the bulk script.

### Task 2.3 – Cron Job / GitHub Action to Regenerate Pages
1. `.github/workflows/revalidate.yml` – schedule hourly POST to Vercel `revalidate` endpoint:
   ```yaml
   on:
     schedule:
       - cron: '0 * * * *'
   jobs:
     ping:
       runs-on: ubuntu-latest
       steps:
         - run: curl -X POST "$REVALIDATE_URL?secret=$SECRET"
   ```

---

## 🛠️ PHASE 3 – SEO & Meta Mapping (Week 2)

### Task 3.1 – Map Rank Math Fields → Astro Page `<head>`
**Time Required**: 30 minutes  
**Difficulty**: Beginner

1. **Update WordPress API to fetch meta fields:**
   ```ts
   // Update savor-site/src/lib/wordpress.ts
   export const getPostBySlug = async (slug: string): Promise<WordPressPost | null> => {
     try {
       const response = await fetch(`${API}/posts?slug=${slug}&_embed&_fields=id,title,content,excerpt,slug,date,categories,meta`);
       if (!response.ok) throw new Error(`HTTP ${response.status}`);
       const posts = await response.json();
       return posts[0] || null;
     } catch (error) {
       console.error('Error fetching post:', error);
       return null;
     }
   };
   ```

2. **Update blog post template to use Rank Math data:**
   ```astro
   ---
   // Update savor-site/src/pages/blog/[slug].astro head section
   const { post } = Astro.props;
   
   const pageTitle = post.meta?.rank_math_title || `${post.title.rendered} - Savor Food Blog`;
   const pageDescription = post.meta?.rank_math_description || 
     post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160);
   ---
   
   <html lang="en">
   <head>
     <meta charset="utf-8" />
     <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
     <title>{pageTitle}</title>
     <meta name="description" content={pageDescription} />
     
     <!-- Open Graph / Facebook -->
     <meta property="og:type" content="article" />
     <meta property="og:title" content={pageTitle} />
     <meta property="og:description" content={pageDescription} />
     <meta property="og:url" content={`https://savortheapp.com/blog/${post.slug}`} />
     
     <!-- Twitter -->
     <meta name="twitter:card" content="summary" />
     <meta name="twitter:title" content={pageTitle} />
     <meta name="twitter:description" content={pageDescription} />
   </head>
   ```

**✅ Success Check**: Blog posts now use Rank Math SEO titles and descriptions in page head.

### Task 3.2 – Structured Data
1. Enable Rank Math schema JSON-LD on posts (Article).
2. Pass through via `<script type="application/ld+json">`.

---

## 📈 PHASE 4 – MEASUREMENT & IMPROVEMENT (Week 3-ongoing)

| Metric | Tool | Frequency | Owner |
|--------|------|-----------|-------|
| Build time | Vercel logs | per deploy | Dev |
| Indexed URLs | GSC | weekly | SEO |
| Organic sessions | GA4 | weekly | Growth |
| Content freshness | WP post updated | daily | Content |

### Task 4.1 – GA4 + GSC for Astro
**Time Required**: 45 minutes  
**Difficulty**: Beginner

1. **Add GA4 tracking to Astro:**
   ```astro
   ---
   // Create savor-site/src/components/Analytics.astro
   const GA_ID = 'G-XXXXXXXXXX'; // Replace with your GA4 ID
   ---
   
   <!-- Google tag (gtag.js) -->
   <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', '${GA_ID}');
   </script>
   ```

2. **Add Analytics to blog pages:**
   ```astro
   ---
   // Update savor-site/src/pages/blog/[slug].astro
   import Analytics from '../../components/Analytics.astro';
   ---
   
   <html lang="en">
   <head>
     <!-- existing head content -->
     <Analytics />
   </head>
   ```

3. **Set up Google Search Console:**
   - Go to search.google.com/search-console
   - Add property: `savortheapp.com`
   - Verify via HTML file upload to `savor-site/public/`
   - Submit sitemaps:
     - `https://savortheapp.com/sitemap-index.xml` (Astro auto-generated)
     - `https://savorcms.wordpress.com/sitemap.xml` (WordPress sitemap)

4. **Enable Astro sitemap generation:**
   ```js
   // Update savor-site/astro.config.mjs
   import { defineConfig } from 'astro/config';
   import sitemap from '@astrojs/sitemap';
   
   export default defineConfig({
     site: 'https://savortheapp.com',
     integrations: [sitemap()],
     output: 'server'
   });
   ```

5. **Install sitemap integration:**
   ```bash
   cd savor-site
   npm install @astrojs/sitemap
   ```

**✅ Success Check**: GA4 tracking active and sitemaps submitted to Search Console.

### Task 4.2 – Performance Dashboard
Create Looker Studio report joining GA4 & Search Console.

---

## 🚀 PHASE 5 – SCALE TO 10K PAGES (Month 2+)

### Task 5.1 – Optimize Astro for Large-Scale Content
**Time Required**: 2 hours  
**Difficulty**: Intermediate

1. **Implement pagination for large post volumes:**
   ```astro
   ---
   // Create savor-site/src/pages/blog/page/[page].astro
   import { getPosts } from '../../../lib/wordpress';
   
   export async function getStaticPaths() {
     const allPosts = await getPosts("per_page=100");
     const postsPerPage = 10;
     const totalPages = Math.ceil(allPosts.length / postsPerPage);
     
     return Array.from({ length: totalPages }, (_, i) => ({
       params: { page: String(i + 1) },
       props: {
         posts: allPosts.slice(i * postsPerPage, (i + 1) * postsPerPage),
         currentPage: i + 1,
         totalPages
       }
     }));
   }
   ```

2. **Create category hub pages:**
   ```astro
   ---
   // Create savor-site/src/pages/blog/category/[category].astro
   import { getPosts, getCategories } from '../../../lib/wordpress';
   
   export async function getStaticPaths() {
     const categories = await getCategories();
     return categories.map(category => ({
       params: { category: category.slug },
       props: { category }
     }));
   }
   ```

3. **Implement incremental builds for performance:**
   ```js
   // Update savor-site/astro.config.mjs
   export default defineConfig({
     output: 'server',
     adapter: vercel({
       webAnalytics: { enabled: true }
     }),
     experimental: {
       contentCollectionCache: true
     }
   });
   ```

4. **Use WordPress categories for topic clustering:**
   - Create category landing pages
   - Link related posts within categories
   - Generate internal linking structure

**✅ Success Check**: Site can handle 1000+ blog posts with good performance.

---

## ⏰ MAINTENANCE CADENCE

| Frequency | Task |
|-----------|------|
| Daily | Script publishes new keyword-based posts |
| Hourly | ISR revalidation triggered |
| Weekly | Check indexing & fix coverage issues |
| Monthly | Update site generator & dependencies |

---

## 🎯 QUICK START CHECKLIST

**For immediate implementation (follow in order):**

- [ ] **Phase 1.1**: Create Astro project in `savor-site/` folder
- [ ] **Phase 1.2**: Deploy to Vercel with correct root directory
- [ ] **Phase 1.3**: Set up WordPress.com Business plan
- [ ] **Phase 1.4**: Create WordPress API client
- [ ] **Phase 1.5**: Build basic blog pages
- [ ] **Phase 2.1**: Create post creation script
- [ ] **Phase 3.1**: Add SEO meta tags
- [ ] **Phase 4.1**: Set up analytics and search console

**Success Metrics:**
- ✅ Landing page unchanged and working
- ✅ `/blog/` page loads (shows "no articles" initially)
- ✅ WordPress posts appear on blog after creation
- ✅ SEO titles and descriptions working
- ✅ Google Analytics tracking active

---

## 🚨 TROUBLESHOOTING

**Common Issues:**

1. **"Landing page not loading"**
   - Check Vercel root directory is set to `savor-site/`
   - Verify `index.html` moved to `src/pages/`

2. **"WordPress posts not showing"**
   - Verify `WORDPRESS_API` environment variable
   - Check WordPress.com site is public
   - Test API endpoint directly in browser

3. **"Build failing on Vercel"**
   - Check `astro.config.mjs` syntax
   - Verify all imports are correct
   - Check Node.js version compatibility

**Emergency Rollback:**
If anything breaks, revert to previous commit:
```bash
git reset --hard HEAD~1
git push --force-with-lease
```

---

**End of Guide – This is now the canonical playbook for Savor's Astro + WordPress pSEO stack. Save this file and follow each phase sequentially.**
