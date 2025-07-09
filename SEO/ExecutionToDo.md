# Savor SEO Initiative: Complete Beginner's Step-by-Step Execution Guide

*This guide breaks down the high-level SEO ExecutionPlan.md into granular, actionable tasks that anyone can follow, even with no prior SEO experience.*

---

## 🎯 **OVERVIEW: What We're Building**

**Goal**: Create 125 SEO-optimized articles for savortheapp.com to drive organic traffic and app downloads
**Timeline**: 12 weeks total
**Tech Stack**: WordPress CMS + Rank Math SEO + DataForSEO research + AI content generation
**Expected Outcome**: 10,000+ monthly organic visitors within 12 weeks

---

## 📋 **PHASE 1: TECHNICAL FOUNDATION (Week 1-2)**

### **Task 1.1: Set Up WordPress.com Business Plan (Headless CMS)**

**Time Required**: 1-2 hours
**Difficulty**: Beginner
**Cost**: $25/month (WordPress.com Business Plan)

#### Why This Approach:
Since your workflow is Cursor → GitHub → Vercel, using WordPress.com as a headless CMS integrates perfectly without disrupting your development process. Your main site stays on Vercel while WordPress provides content via API.

#### Step-by-Step Instructions:

1. **Sign Up for WordPress.com Business Plan**
   - Go to wordpress.com/pricing
   - Click "Get Business" ($25/month)
   - Choose domain option: `savor-cms.wordpress.com` (or custom domain)
   - Complete account setup with your email

2. **Complete WordPress.com Setup**
   - Site Name: `Savor CMS`
   - Site Description: `Headless WordPress CMS for Savor blog content`
   - Choose a simple theme (won't be visible to users)
   - Skip design customization (this is headless)

3. **Configure for Headless Use**
   - Go to "My Sites" → "Settings" → "General"
   - Set Site Title: `Savor Blog CMS`
   - Set Tagline: `Content management for savortheapp.com`
   - Save changes

4. **Enable API Access**
   - WordPress.com Business automatically includes REST API
   - Note your site URL: `https://savor-cms.wordpress.com`
   - API endpoint will be: `https://savor-cms.wordpress.com/wp-json/wp/v2/`

5. **Test API Access**
   - Visit: `https://savor-cms.wordpress.com/wp-json/wp/v2/posts`
   - You should see JSON response (empty array initially)
   - Save this URL - you'll use it in your Cursor project

**✅ Completion Checklist:**
- [ x] WordPress.com Business plan activated
- [x ] Admin credentials saved securely
- [x ] Site accessible at your chosen URL
- [x ] API endpoint tested and working
- [x ] Site URL documented for Cursor integration savorcms.wordpress.com is the correct address

---

### **Task 1.1b: Alternative - Self-Hosted WordPress Setup (Optional)**

**Time Required**: 3-4 hours
**Difficulty**: Intermediate
**Cost**: $5-15/month

#### If you prefer self-hosted WordPress:

1. **Choose Hosting Provider**
   - **Railway.app**: $5/month, easy deployment
   - **DigitalOcean App Platform**: $12/month, more control
   - **Heroku**: $7/month, simple setup

2. **Deploy WordPress**
   - Use one-click WordPress deployment
   - Choose subdomain: `savor-cms.railway.app` or similar
   - Complete WordPress installation

3. **Configure for Headless**
   - Install WPGraphQL plugin manually
   - Set up API authentication if needed
   - Test API endpoints

**Note**: WordPress.com Business is recommended for beginners as it handles all technical setup automatically.

---

### **Task 1.2: Install and Configure Essential Plugins**

**Time Required**: 1-2 hours
**Difficulty**: Beginner

#### Step-by-Step Instructions:

1. **Access WordPress Admin**
   - Go to your WordPress.com admin: `https://savor-cms.wordpress.com/wp-admin`
   - Or click "WP Admin" from your WordPress.com dashboard
   - Log in with your WordPress.com credentials

2. **Install Rank Math SEO Plugin**
   - Go to "Plugins" → "Add New"
   - Search for "Rank Math SEO"
   - Install and activate "Rank Math SEO"
   - Complete setup wizard:
     - Connect Google Search Console (skip for now)
     - Choose "Blog" as site type
     - Enable all recommended features
     - Skip social media setup

3. **Install WPGraphQL Plugin (Optional - for Advanced API)**
   - **Note**: WordPress.com Business includes REST API by default
   - If you want GraphQL instead of REST API:
     - Go to "Plugins" → "Add New"
     - Search for "WPGraphQL"
     - Install and activate "WPGraphQL" by WPGraphQL
     - No configuration needed

4. **Install Additional Helpful Plugins**
   - **Classic Editor**: Search and install "Classic Editor" (easier content creation)
   - **Yoast Duplicate Post**: For cloning post templates
   - **Note**: WordPress.com Business includes caching automatically

5. **Configure API Permissions (Important for Headless)**
   - Go to "Settings" → "General"
   - Ensure "Anyone can register" is unchecked (security)
   - Go to "Settings" → "Reading"
   - Ensure "Search engine visibility" is unchecked (allow API access)

**✅ Completion Checklist:**
- [ ] WordPress.com admin accessible
- [ ] Rank Math SEO installed and activated
- [ ] Classic Editor installed and activated
- [ ] API permissions configured correctly
- [ ] All plugins showing as active in Plugins page

---

### **Task 1.3: Configure Rank Math SEO Settings**

**Time Required**: 2-3 hours
**Difficulty**: Intermediate

#### Step-by-Step Instructions:

1. **General Settings**
   - Go to "Rank Math" → "General Settings"
   - Under "Links" tab:
     - Check "Strip Category Base"
     - Check "Redirect Attachments"
   - Under "Images" tab:
     - Check "Add Missing Alt Attributes"
     - Check "Add Missing Title Attributes"

2. **Configure Sitemap**
   - Go to "Rank Math" → "Sitemap Settings"
   - Enable "Sitemap" toggle
   - Under "General" tab:
     - Check "Include Images"
     - Check "Include Featured Images"
   - Under "Posts" tab:
     - Enable "Posts" and "Pages"
     - Set "Posts per sitemap page" to 100
   - Click "Save Changes"

3. **Set Up Schema Templates (Headless-Optimized)**
   - Go to "Rank Math" → "Titles & Meta"
   - Under "Global Meta" tab:
     - Website Name: `Savor CMS`
     - Website URL: `https://savortheapp.com` (your main site, not WordPress.com URL)
     - Website Logo: Upload Savor logo
   - Under "Homepage" tab:
     - Title: `Savor CMS - Content Management`
     - Description: `Headless WordPress CMS for Savor blog content`
     - Schema Type: `Website`

4. **Configure Post Schema for API Output**
   - Under "Posts" tab:
     - Title: `%title% | Savor Food Blog`
     - Description: `%excerpt%`
     - Schema Type: `Article`
     - Article Type: `BlogPosting`

5. **Important: Configure for Headless Use**
   - Go to "Rank Math" → "General Settings" → "Meta Tags"
   - **Disable** "Add meta robots noindex" (important for API access)
   - **Enable** "OpenGraph meta tags" (good for social sharing when content appears on main site)

**✅ Completion Checklist:**
- [ ] Sitemap enabled and configured
- [ ] Schema templates set up for headless use
- [ ] Meta tags configured for API access
- [ ] Post templates configured
- [ ] OpenGraph tags enabled

---

### **Task 1.4: Create Category Structure**

**Time Required**: 1 hour
**Difficulty**: Beginner

#### Step-by-Step Instructions:

1. **Create Main Categories**
   - Go to "Posts" → "Categories"
   - Create these categories (click "Add New Category"):

   **Category 1: Food Diary**
   - Name: `Food Diary`
   - Slug: `food-diary`
   - Description: `Tips, tricks, and inspiration for maintaining your personal food diary`

   **Category 2: Restaurant Reviews**
   - Name: `Restaurant Reviews`
   - Slug: `restaurant-reviews`
   - Description: `Honest reviews and recommendations from food lovers like you`

   **Category 3: Cooking Tips**
   - Name: `Cooking Tips`
   - Slug: `cooking-tips`
   - Description: `Expert cooking advice to elevate your culinary skills`

   **Category 4: Food Photography**
   - Name: `Food Photography`
   - Slug: `food-photography`
   - Description: `Capture your dishes like a pro with these photography tips`

   **Category 5: Healthy Eating**
   - Name: `Healthy Eating`
   - Slug: `healthy-eating`
   - Description: `Nutritious recipes and wellness tips for a balanced lifestyle`

**✅ Completion Checklist:**
- [ ] All 5 categories created
- [ ] Category slugs are URL-friendly
- [ ] Descriptions added to each category

---

### **Task 1.5: Set Up Cursor Project Integration with WordPress API**

**Time Required**: 2-3 hours
**Difficulty**: Intermediate

#### Step-by-Step Instructions:

1. **Create API Integration Files in Cursor**
   - Open your Savor project in Cursor
   - Create new folder: `lib/wordpress/`
   - Create file: `lib/wordpress/api.js`

2. **Set Up WordPress API Client**
   ```javascript
   // lib/wordpress/api.js
   const WORDPRESS_API_URL = 'https://savor-cms.wordpress.com/wp-json/wp/v2';

   export async function getPosts(category = null, limit = 10) {
     let url = `${WORDPRESS_API_URL}/posts?_embed&per_page=${limit}`;
     if (category) {
       url += `&categories=${category}`;
     }
     
     const response = await fetch(url);
     return response.json();
   }

   export async function getPost(slug) {
     const response = await fetch(`${WORDPRESS_API_URL}/posts?slug=${slug}&_embed`);
     const posts = await response.json();
     return posts[0] || null;
   }

   export async function getCategories() {
     const response = await fetch(`${WORDPRESS_API_URL}/categories`);
     return response.json();
   }
   ```

3. **Create Blog Pages in Your Cursor Project**
   - Create folder: `pages/food-diary/` (or `app/food-diary/` for App Router)
   - Create file: `pages/food-diary/index.js`
   - Create file: `pages/food-diary/[slug].js`

4. **Set Up Category Pages**
   ```javascript
   // pages/food-diary/index.js
   import { getPosts } from '../../lib/wordpress/api';

   export default function FoodDiary({ posts }) {
     return (
       <div>
         <h1>Food Diary Articles</h1>
         {posts.map(post => (
           <article key={post.id}>
             <h2>{post.title.rendered}</h2>
             <p>{post.excerpt.rendered}</p>
             <a href={`/food-diary/${post.slug}`}>Read More</a>
           </article>
         ))}
       </div>
     );
   }

   export async function getStaticProps() {
     const posts = await getPosts(1); // Food Diary category ID
     return { props: { posts }, revalidate: 3600 }; // Revalidate every hour
   }
   ```

5. **Set Up Individual Article Pages**
   ```javascript
   // pages/food-diary/[slug].js
   import { getPost, getPosts } from '../../lib/wordpress/api';

   export default function Article({ post }) {
     if (!post) return <div>Article not found</div>;
     
     return (
       <article>
         <h1>{post.title.rendered}</h1>
         <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
       </article>
     );
   }

   export async function getStaticPaths() {
     const posts = await getPosts();
     const paths = posts.map(post => ({
       params: { slug: post.slug }
     }));
     return { paths, fallback: 'blocking' };
   }

   export async function getStaticProps({ params }) {
     const post = await getPost(params.slug);
     return { props: { post }, revalidate: 3600 };
   }
   ```

6. **Test API Integration**
   - Run your development server: `npm run dev`
   - Visit: `http://localhost:3000/food-diary`
   - Verify WordPress content appears
   - Test individual article pages

7. **Add Environment Variables**
   - Create `.env.local` file in your project root
   - Add: `WORDPRESS_API_URL=https://savor-cms.wordpress.com/wp-json/wp/v2`
   - Update your API client to use environment variable

8. **Commit and Deploy**
   - Commit changes to GitHub from Cursor
   - Verify Vercel deployment includes new blog routes
   - Test live site: `https://savortheapp.com/food-diary`

**✅ Completion Checklist:**
- [ ] WordPress API client created
- [ ] Blog category pages set up
- [ ] Individual article pages working
- [ ] API integration tested locally
- [ ] Environment variables configured
- [ ] Changes committed to GitHub
- [ ] Vercel deployment successful
- [ ] Live blog pages accessible

---

## 📊 **PHASE 2: KEYWORD RESEARCH & CONTENT PLANNING (Week 2-3)**

### **Task 2.1: Set Up DataForSEO Research Workflow with MCP Tools**

**Time Required**: 3-4 hours
**Difficulty**: Intermediate

#### Step-by-Step Instructions:

1. **Verify MCP Tools Setup in Cursor**
   - Open Cursor and check MCP tools are enabled
   - Verify DataForSEO tools are available (should show ~34 tools)
   - Test connection with a simple query

2. **Prepare Seed Keywords List**
   Create a file: `SEO/seed-keywords.txt` with these primary seed keywords:
   ```
   food diary app
   restaurant review app
   food photography tips
   healthy eating habits
   cooking tips beginner
   meal planning app
   food tracking app
   restaurant finder
   recipe organization
   food journal benefits
   meal prep ideas
   food blogging tips
   restaurant discovery
   culinary experiences
   food memory keeping
   ```

3. **Create Keyword Research Workflow in Cursor**
   - Create file: `SEO/keyword-research-workflow.md`
   - Document the exact MCP commands for each research phase
   - Save successful queries for reuse

4. **Execute Keyword Research Using MCP Tools**
   
   **Phase 1: Keyword Ideas Generation**
   ```
   For each seed keyword, use:
   - mcp_dataforseo_dataforseo_labs_google_keyword_ideas
   - Parameters: keyword, location_name="United States", language_code="en", limit=50
   - Save results to spreadsheet
   ```

   **Phase 2: Related Keywords Discovery**
   ```
   For top-performing seeds, use:
   - mcp_dataforseo_dataforseo_labs_google_related_keywords
   - Parameters: keyword, depth=2, limit=100
   - Focus on long-tail variations
   ```

   **Phase 3: Keyword Suggestions**
   ```
   For content expansion, use:
   - mcp_dataforseo_dataforseo_labs_google_keyword_suggestions
   - Parameters: keyword, limit=75
   - Target question-based keywords
   ```

   **Phase 4: Search Volume Analysis**
   ```
   For final keyword list, use:
   - mcp_dataforseo_keywords_data_google_ads_search_volume
   - Batch process up to 1000 keywords
   - Filter by search volume > 500/month
   ```

5. **Create Master Keyword Database**
   - Use MCP results to create comprehensive spreadsheet
   - Columns: Keyword, Search Volume, Competition, CPC, Category, Priority
   - Filter and prioritize based on search volume and competition
   - Export 125 target keywords for content creation

6. **Validate Keywords with Competitor Analysis**
   ```
   Use MCP tools for competitor research:
   - mcp_dataforseo_dataforseo_labs_google_competitors_domain
   - Target competitors: allrecipes.com, foodnetwork.com, tasty.co
   - Identify keyword gaps and opportunities
   ```

**✅ Completion Checklist:**
- [ ] MCP DataForSEO tools verified and working
- [ ] Seed keywords list created (15+ keywords)
- [ ] Keyword research workflow documented
- [ ] Keyword ideas generated (500+ keywords)
- [ ] Related keywords discovered (300+ keywords)
- [ ] Keyword suggestions collected (200+ keywords)
- [ ] Search volume data obtained
- [ ] Master keyword database created
- [ ] 125 target keywords selected and prioritized
- [ ] Competitor analysis completed

---

### **Task 2.2: Generate 125 Article Topics Using AI**

**Time Required**: 4-5 hours
**Difficulty**: Intermediate

#### Step-by-Step Instructions:

1. **Create Article Topic Generation Prompt**
   Save this prompt template:
   ```
   You are an expert food blogger and SEO specialist. Based on the keyword research data provided, generate 25 engaging article topics for the Savor food app blog.

   Requirements:
   - Each topic should target a specific keyword with good search volume (500+ monthly searches)
   - Topics should appeal to food lovers, home cooks, and restaurant enthusiasts
   - Include a mix of: how-to guides, listicles, reviews, and inspirational content
   - Each topic should naturally connect to Savor app features
   - Provide primary keyword, secondary keywords, and estimated word count

   Format:
   Article #: [Title]
   Primary Keyword: [keyword]
   Secondary Keywords: [keyword1, keyword2, keyword3]
   Word Count: [800-1500]
   Savor App Connection: [how this relates to app features]
   ```

2. **Generate Topics in Batches**
   - Batch 1: Food Diary topics (25 articles)
   - Batch 2: Restaurant Reviews topics (25 articles)
   - Batch 3: Cooking Tips topics (25 articles)
   - Batch 4: Food Photography topics (25 articles)
   - Batch 5: Healthy Eating topics (25 articles)

3. **Create Master Content Calendar**
   Create a spreadsheet with columns:
   - Article ID
   - Title
   - Category
   - Primary Keyword
   - Secondary Keywords
   - Word Count Target
   - Publication Date
   - Status (Not Started/In Progress/Complete)
   - WordPress URL

**✅ Completion Checklist:**
- [ ] 125 article topics generated
- [ ] Topics organized by category
- [ ] Master content calendar created
- [ ] Keywords assigned to each topic

---

## ✍️ **PHASE 3: CONTENT CREATION AT SCALE (Week 3-8)**

### **Task 3.1: Create Content Generation System**

**Time Required**: 2-3 hours setup
**Difficulty**: Intermediate

#### Step-by-Step Instructions:

1. **Create Master Article Template**
   Save this template as `article-template.md`:

   ```markdown
   # [ARTICLE TITLE]

   ## Introduction (150-200 words)
   - Hook the reader with a relatable food experience
   - Introduce the main problem/topic
   - Preview what they'll learn
   - Mention Savor app connection naturally

   ## Main Content Sections (500-1000 words)
   ### Section 1: [Subheading with keyword]
   - Detailed explanation
   - Practical tips
   - Real examples

   ### Section 2: [Subheading with keyword]
   - Step-by-step instructions
   - Common mistakes to avoid
   - Pro tips

   ### Section 3: [Subheading with keyword]
   - Advanced techniques
   - Tools and resources
   - Success stories

   ## Conclusion & Call-to-Action (100-150 words)
   - Summarize key points
   - Encourage action
   - Direct CTA to Savor app download
   - Social sharing encouragement

   ## SEO Optimization Checklist:
   - [ ] Primary keyword in title
   - [ ] Primary keyword in first paragraph
   - [ ] Secondary keywords naturally distributed
   - [ ] Internal links to other articles
   - [ ] External links to authoritative sources
   - [ ] Meta description written
   - [ ] Alt text for images
   ```

2. **Create AI Content Generation Prompt**
   Save this prompt as `content-generation-prompt.md`:

   ```
   You are an expert food writer for the Savor app blog. Write a comprehensive, engaging article based on the following specifications:

   ARTICLE TOPIC: [INSERT TOPIC]
   PRIMARY KEYWORD: [INSERT PRIMARY KEYWORD]
   SECONDARY KEYWORDS: [INSERT SECONDARY KEYWORDS]
   WORD COUNT: [INSERT TARGET WORD COUNT]
   CATEGORY: [INSERT CATEGORY]

   WRITING GUIDELINES:
   - Write in a conversational, passionate tone that appeals to food lovers
   - Include personal anecdotes and relatable experiences
   - Provide actionable, practical advice
   - Use the primary keyword naturally 3-5 times throughout
   - Include secondary keywords naturally 1-2 times each
   - Structure with clear H2 and H3 headings
   - End with a compelling CTA for Savor app download
   - Include 2-3 internal link opportunities to other food-related topics

   SAVOR APP INTEGRATION:
   - Naturally mention how Savor helps solve the problem discussed
   - Reference specific app features (AI food recognition, personal food diary, restaurant discovery)
   - Include a clear download CTA in the conclusion

   Please write the complete article now.
   ```

3. **Set Up Batch Processing Workflow**
   Create folders:
   - `content-drafts/` (for AI-generated content)
   - `content-edited/` (for human-reviewed content)
   - `content-published/` (for final published articles)

**✅ Completion Checklist:**
- [ ] Article template created
- [ ] AI generation prompt finalized
- [ ] Folder structure set up
- [ ] Content workflow documented

---

### **Task 3.2: Execute Content Creation (5 weeks)**

**Time Required**: 25 articles per week (5 per day)
**Difficulty**: Beginner-Intermediate

#### Daily Content Creation Workflow:

**Monday-Friday Schedule (5 articles per day):**

1. **Morning (9-11 AM): Generate 5 AI Drafts**
   - Take 5 topics from content calendar
   - Use AI generation prompt for each
   - Save drafts in `content-drafts/` folder
   - Name files: `YYYY-MM-DD-article-title.md`

2. **Afternoon (2-4 PM): Human Review & Edit**
   - Review each AI draft for:
     - Accuracy of information
     - Brand voice consistency
     - Keyword optimization
     - Readability and flow
   - Make necessary edits
   - Move to `content-edited/` folder

3. **Evening (6-7 PM): WordPress Upload & Deployment**
   - Log into WordPress.com admin: `https://savor-cms.wordpress.com/wp-admin`
   - Create new post for each article
   - Copy content from edited file
   - Optimize with Rank Math:
     - Set focus keyword
     - Write meta description
     - Check SEO score (aim for 80+)
   - Assign to correct category
   - **Publish** (not schedule - content appears immediately via API)
   - Update content calendar status
   - **Verify on main site**: Check `https://savortheapp.com/food-diary` for new content

#### Weekly Quality Control:

**Friday Evening: Week Review**
- Review all 25 articles published this week
- Check for any SEO issues
- Verify all links work
- Update content calendar
- Plan next week's topics

**✅ Weekly Completion Checklist:**
- [ ] 25 articles generated
- [ ] 25 articles edited and reviewed
- [ ] 25 articles published to WordPress
- [ ] All articles have 80+ SEO score
- [ ] Content calendar updated

---

### **Task 3.3: WordPress Publishing Optimization**

**Time Required**: 1 hour setup + 10 minutes per article
**Difficulty**: Beginner

#### Step-by-Step WordPress Publishing Process:

1. **Create New Post in WordPress.com**
   - Go to `https://savor-cms.wordpress.com/wp-admin`
   - Click "Posts" → "Add New"
   - Use Classic Editor for simplicity

2. **Content Entry**
   - Paste article content from your edited file
   - Format headings (H2, H3) using editor toolbar
   - Add paragraph breaks for readability
   - Add featured image if available

3. **Rank Math Optimization**
   - Scroll to Rank Math meta box
   - Enter focus keyword
   - Write compelling meta description (150-160 characters)
   - Check SEO analysis - aim for 80+ score
   - Fix any issues highlighted

4. **Category and Tags**
   - Select appropriate category (Food Diary, Restaurant Reviews, etc.)
   - Add 3-5 relevant tags
   - Set featured image (important for API response)

5. **Internal Linking Strategy**
   - Add 2-3 internal links to other WordPress articles
   - Use descriptive anchor text
   - Link to relevant categories within WordPress

6. **API-Optimized Settings**
   - Ensure "Allow comments" is set based on your preference
   - Set publication status to "Published" (not scheduled)
   - Verify excerpt is compelling (shows in API responses)

7. **Publish and Verify**
   - Click "Publish" (content immediately available via API)
   - **Test API endpoint**: Visit `https://savor-cms.wordpress.com/wp-json/wp/v2/posts`
   - **Verify on main site**: Check `https://savortheapp.com/food-diary` within 5-10 minutes
   - Update content calendar with WordPress post ID

8. **Troubleshoot if Content Doesn't Appear**
   - Check Vercel deployment logs
   - Verify API endpoint returns new post
   - Check category assignment in WordPress
   - Force revalidation if using ISR (Incremental Static Regeneration)

**✅ Publishing Checklist (per article):**
- [ ] Content formatted properly in WordPress.com
- [ ] Rank Math SEO score 80+
- [ ] Meta description written
- [ ] Category assigned correctly
- [ ] 3-5 tags added
- [ ] Featured image set
- [ ] 2-3 internal links added
- [ ] Article published (not scheduled)
- [ ] API endpoint returns new post
- [ ] Content appears on main site
- [ ] Content calendar updated with post ID

---

## 📈 **PHASE 4: PERFORMANCE MONITORING (Week 9-12)**

### **Task 4.1: Set Up Google Analytics & Search Console for Headless Setup**

**Time Required**: 2-3 hours
**Difficulty**: Intermediate

#### Step-by-Step Instructions:

1. **Google Analytics Setup for Main Site (savortheapp.com)**
   - Go to analytics.google.com
   - Create new property for savortheapp.com
   - Get GA4 tracking code (gtag)
   - **Install in your Cursor project** (not WordPress.com)
   - Add to `pages/_app.js` or equivalent
   - Verify tracking is working on live site

2. **Google Search Console Setup for Main Domain**
   - Go to search.google.com/search-console
   - Add property for savortheapp.com
   - Verify ownership via HTML file upload to your Vercel deployment
   - **Submit multiple sitemaps**:
     - Main site sitemap: `https://savortheapp.com/sitemap.xml`
     - WordPress sitemap: `https://savor-cms.wordpress.com/sitemap.xml`
   - Wait for data to populate (7-14 days)

3. **WordPress.com Analytics Configuration**
   - In WordPress.com admin, go to "Settings" → "Traffic"
   - Connect Google Analytics (same property as main site)
   - Enable "Enhanced measurement" for API content
   - **Note**: WordPress.com content will show under main domain analytics

4. **Set Up Custom Events for Blog Content**
   - In your Cursor project, add event tracking for blog interactions
   - Track: article views, time on page, scroll depth
   - Use Google Analytics 4 event parameters
   ```javascript
   // Example: Track article views
   gtag('event', 'page_view', {
     page_title: post.title.rendered,
     page_location: `https://savortheapp.com/food-diary/${post.slug}`,
     content_group1: 'Blog Content',
     content_group2: post.categories[0]
   });
   ```

5. **Configure Search Console for Blog URLs**
   - Verify WordPress content appears in Search Console
   - Monitor indexing status of `/food-diary/*` URLs
   - Set up URL inspection for new articles
   - Create performance reports filtered by blog content

6. **Connect Rank Math to GSC (WordPress.com)**
   - In WordPress.com admin, go to Rank Math → General Settings
   - Connect Google Search Console (same account as main site)
   - Allow data sharing
   - **Important**: This will show WordPress.com URL data, not main site data

**✅ Completion Checklist:**
- [ ] Google Analytics installed on main site (Vercel)
- [ ] Google Search Console verified for savortheapp.com
- [ ] Both sitemaps submitted to GSC
- [ ] WordPress.com connected to same GA property
- [ ] Custom events set up for blog content
- [ ] Blog URL indexing verified in GSC
- [ ] Rank Math connected to GSC in WordPress.com
- [ ] Analytics tracking verified for both main site and blog content

---

### **Task 4.2: Create Performance Monitoring Dashboard**

**Time Required**: 3-4 hours
**Difficulty**: Advanced

#### Step-by-Step Instructions:

1. **Key Metrics to Track**
   - Organic traffic (sessions)
   - Keyword rankings (top 10, top 20)
   - Click-through rates
   - Average session duration
   - Pages per session
   - Conversion rate (app downloads)

2. **Weekly Monitoring Schedule**
   - Monday: Check keyword rankings
   - Wednesday: Review traffic metrics
   - Friday: Analyze top-performing content
   - Monthly: Comprehensive performance report

3. **Create Performance Spreadsheet**
   Columns:
   - Date
   - Total Organic Sessions
   - New Keywords Ranking
   - Top 10 Keywords Count
   - Average Session Duration
   - Conversion Rate
   - Notes/Observations

**✅ Completion Checklist:**
- [ ] Monitoring dashboard created
- [ ] Key metrics defined
- [ ] Weekly review schedule established
- [ ] Performance spreadsheet ready

---

## 🎯 **PHASE 5: OPTIMIZATION & SCALING (Week 13+)**

### **Task 5.1: Content Performance Analysis**

**Time Required**: 2-3 hours weekly
**Difficulty**: Intermediate

#### Step-by-Step Instructions:

1. **Identify Top Performers**
   - Sort articles by organic traffic
   - Note common characteristics
   - Identify successful keyword patterns
   - Document content formats that work

2. **Optimize Underperforming Content**
   - Find articles with low traffic
   - Update with additional keywords
   - Improve internal linking
   - Refresh with new information

3. **Scale Successful Strategies**
   - Create more content around winning topics
   - Develop content series
   - Build topic clusters
   - Expand successful keyword themes

**✅ Completion Checklist:**
- [ ] Performance analysis completed
- [ ] Top 20 articles identified
- [ ] Optimization plan created
- [ ] Scaling strategy documented

---

## 📚 **TEMPLATES & RESOURCES**

### **Content Brief Template**
```
ARTICLE TITLE: [Title with Primary Keyword]
CATEGORY: [WordPress Category]
PRIMARY KEYWORD: [Main target keyword]
SECONDARY KEYWORDS: [Supporting keywords]
WORD COUNT: [Target length]
PUBLICATION DATE: [Scheduled date]

OUTLINE:
1. Introduction (Hook + Problem + Solution Preview)
2. Main Content (3-4 sections with subheadings)
3. Conclusion (Summary + CTA)

SAVOR APP INTEGRATION:
- Feature to highlight: [specific app feature]
- CTA placement: [where to mention app]
- Download link: [app store links]

SEO REQUIREMENTS:
- Primary keyword density: 1-2%
- Internal links: 2-3 per article
- External links: 1-2 authoritative sources
- Meta description: [150-160 characters]
```

### **Quality Control Checklist**
```
CONTENT QUALITY:
- [ ] Information is accurate and up-to-date
- [ ] Writing is engaging and conversational
- [ ] Article provides real value to readers
- [ ] Brand voice is consistent
- [ ] No grammatical errors

SEO OPTIMIZATION:
- [ ] Primary keyword in title
- [ ] Primary keyword in first paragraph
- [ ] Secondary keywords naturally distributed
- [ ] Headings use keywords appropriately
- [ ] Meta description is compelling
- [ ] Internal links are relevant
- [ ] External links are authoritative

TECHNICAL:
- [ ] Article is properly formatted
- [ ] Images have alt text
- [ ] Links open correctly
- [ ] Mobile-friendly formatting
- [ ] Page loads quickly
```

### **Weekly Progress Report Template**
```
WEEK OF: [Date Range]

CONTENT PRODUCTION:
- Articles Published: [Number]
- Total Word Count: [Number]
- Categories Covered: [List]

SEO METRICS:
- New Keywords Ranking: [Number]
- Average Rank Math Score: [Number]
- Top Performing Article: [Title + Traffic]

CHALLENGES:
- [List any issues encountered]

NEXT WEEK GOALS:
- [Specific targets for following week]
```

---

## 🚀 **SUCCESS METRICS & GOALS**

### **Week 4 Targets:**
- [ ] 50 articles published
- [ ] Google Search Console showing impressions
- [ ] 5+ keywords ranking in top 100

### **Week 8 Targets:**
- [ ] 100 articles published
- [ ] 1,000+ monthly organic sessions
- [ ] 20+ keywords ranking in top 50

### **Week 12 Targets:**
- [ ] 125 articles published
- [ ] 5,000+ monthly organic sessions
- [ ] 50+ keywords ranking in top 20
- [ ] 10+ app downloads from organic traffic

### **Long-term Goals (6 months):**
- [ ] 10,000+ monthly organic sessions
- [ ] 100+ keywords ranking in top 10
- [ ] 50+ app downloads monthly from SEO
- [ ] 20+ high-quality backlinks earned

---

## ⚠️ **COMMON MISTAKES TO AVOID**

1. **Content Quality Issues:**
   - Don't publish AI content without human review
   - Avoid keyword stuffing
   - Don't neglect fact-checking

2. **Technical SEO Mistakes:**
   - Don't forget to optimize images
   - Avoid broken internal links
   - Don't ignore page loading speed

3. **Strategy Errors:**
   - Don't target only high-competition keywords
   - Avoid publishing inconsistently
   - Don't ignore performance data

4. **WordPress Management:**
   - Don't skip plugin updates
   - Avoid installing too many plugins
   - Don't forget regular backups

---

## 📞 **SUPPORT & TROUBLESHOOTING**

### **Common Issues & Solutions:**

**Issue: Low Rank Math SEO Score**
- Solution: Add more internal links, optimize keyword density, improve meta description

**Issue: Articles Not Ranking**
- Solution: Check keyword competition, improve content quality, build more internal links

**Issue: WordPress Performance Issues**
- Solution: Install caching plugin, optimize images, remove unused plugins

**Issue: Content Ideas Running Out**
- Solution: Use DataForSEO tools for new keyword research, analyze competitor content

### **Emergency Contacts:**
- WordPress Support: [hosting provider support]
- SEO Consultant: [Luis Garcia contact info]
- Technical Issues: [developer contact]

---

## 🎉 **CONCLUSION**

This comprehensive guide provides everything needed to execute the Savor SEO initiative successfully. The key to success is consistency, quality control, and continuous optimization based on performance data.

Remember: SEO is a marathon, not a sprint. Focus on creating valuable content that serves your audience, and the rankings will follow.

**Next Steps:**
1. Start with Phase 1 technical setup
2. Complete one phase before moving to the next
3. Track progress weekly
4. Adjust strategy based on results
5. Scale successful tactics

Good luck with your SEO journey! 🚀

For reference, API documentation from wordpress in case needed:
https://developer.wordpress.com/docs/api/getting-started/

https://developer.wordpress.com/docs/api/