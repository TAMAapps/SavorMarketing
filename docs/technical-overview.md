# Savor SEO Technical Architecture Overview

*Complete technical documentation for developers and SEO specialists*

---

## 🏗️ SYSTEM ARCHITECTURE

### High-Level Overview
Savor implements a **headless WordPress + static site generator** approach for programmatic SEO (pSEO), designed to generate thousands of SEO-optimized pages while maintaining performance and developer experience.

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Content CMS   │    │   Static Site    │    │   CDN/Hosting   │
│  WordPress.com  │───▶│  Generator       │───▶│    Vercel       │
│   (Headless)    │    │   (Astro 4)      │    │   (Edge/ISR)    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
    ┌────▼────┐             ┌────▼────┐             ┌────▼────┐
    │ REST API│             │ Build   │             │ Users   │
    │ Content │             │ Process │             │ Traffic │
    │ Delivery│             │ & ISR   │             │ & SEO   │
    └─────────┘             └─────────┘             └─────────┘
```

### Core Technology Stack

| Component | Technology | Purpose | Configuration |
|-----------|------------|---------|---------------|
| **Content Management** | WordPress.com Business | Headless CMS for content creation | `savorcms.wordpress.com` |
| **Site Generator** | Astro 4 | Static site generation with SSR | `/savor-site/` directory |
| **Hosting** | Vercel | Edge hosting with ISR | Auto-deploy from GitHub |
| **Development** | Cursor IDE | Primary development environment | Local + GitHub workflow |
| **SEO Plugin** | Rank Math SEO | Meta optimization in WordPress | API-accessible fields |
| **Analytics** | GA4 + GSC | Traffic and search performance | Integrated tracking |

---

## 🔧 FRONTEND ARCHITECTURE

### Astro 4 Configuration
```javascript
// astro.config.mjs
export default defineConfig({
  output: 'server',              // Enable SSR for WordPress integration
  site: 'https://savortheapp.com',
  integrations: [sitemap()],     // Auto-generate sitemaps
  experimental: {
    contentCollectionCache: true  // Performance optimization
  }
});
```

### Directory Structure
```
savor-site/
├── src/
│   ├── pages/
│   │   ├── index.html          # Landing page (preserved)
│   │   └── blog/
│   │       ├── index.astro     # Blog listing (/blog/)
│   │       ├── [slug].astro    # Individual posts (/blog/post-slug)
│   │       ├── page/
│   │       │   └── [page].astro # Pagination (/blog/page/2)
│   │       └── category/
│   │           └── [category].astro # Category pages
│   ├── lib/
│   │   └── wordpress.ts        # API client for WordPress
│   └── components/
│       └── Analytics.astro     # GA4 tracking component
├── scripts/
│   └── wp-bulk-create.ts       # Automated post creation
├── data/
│   └── posts-{date}.json       # Generated post data
└── public/
    ├── assets/                 # Existing Savor assets
    ├── Framework7-iosApps/     # Preserved app files
    └── LottieAnimations/       # Animation files
```

### Page Generation Strategy

#### Static Pages (Build Time)
- Landing page (`/`)
- Blog index (`/blog/`)
- Category hubs (`/blog/category/{slug}`)

#### Dynamic Pages (ISR - Incremental Static Regeneration)
- Individual blog posts (`/blog/{slug}`)
- Pagination pages (`/blog/page/{number}`)
- **Revalidation**: Every 15 minutes
- **Fallback**: Server-side rendering for new posts

### WordPress API Integration
```typescript
// Core API functions
export const getPosts = async (params = ""): Promise<WordPressPost[]>
export const getPostBySlug = async (slug: string): Promise<WordPressPost | null>
export const getCategories = async ()

// API Endpoint
const API = 'https://savorcms.wordpress.com/wp-json/wp/v2'

// Authentication
// Uses WordPress.com Application Passwords for write operations
```

---

## 🗄️ BACKEND ARCHITECTURE

### WordPress.com as Headless CMS

#### Configuration
- **Plan**: WordPress.com Business
- **Domain**: `savorcms.wordpress.com`
- **Visibility**: Public (required for REST API access)
- **Plugins**: Rank Math SEO, Classic Editor, WPGraphQL (optional)

#### Content Structure
```
Categories (Taxonomy):
├── Food Diary (ID: 1)
├── Restaurant Reviews (ID: 2)
├── Cooking Tips (ID: 3)
├── Food Photography (ID: 4)
└── Healthy Eating (ID: 5)

Posts (Custom Fields via Rank Math):
├── rank_math_title (SEO title)
├── rank_math_description (Meta description)
├── rank_math_focus_keyword (Primary keyword)
└── rank_math_schema (Structured data)
```

#### REST API Endpoints
```
GET /wp-json/wp/v2/posts                    # List posts
GET /wp-json/wp/v2/posts?slug={slug}        # Get by slug
GET /wp-json/wp/v2/posts?categories={id}    # Filter by category
GET /wp-json/wp/v2/categories               # List categories
POST /wp-json/wp/v2/posts                   # Create post (authenticated)
```

### Content Creation Pipeline

#### 1. Keyword Research (DataForSEO Integration)
```typescript
// MCP tools for keyword research
mcp_dataforseo_dataforseo_labs_google_keyword_ideas
mcp_dataforseo_dataforseo_labs_google_related_keywords
mcp_dataforseo_dataforseo_labs_google_keyword_suggestions
```

#### 2. Content Generation
```
Keyword → AI Prompt → Structured Content:
{
  "title": "SEO-optimized title",
  "slug": "url-friendly-slug",
  "content": "Full article HTML",
  "excerpt": "Meta description",
  "categories": [category_ids],
  "meta": {
    "rank_math_title": "Custom SEO title",
    "rank_math_description": "Custom meta desc"
  }
}
```

#### 3. Bulk Publishing
```bash
# Automated script execution
node scripts/wp-bulk-create.js data/posts-{date}.json

# Rate limiting: 1 post per second
# Error handling: Logs failures, continues processing
# Authentication: WordPress.com Application Password
```

### Build & Deployment Pipeline

#### GitHub Actions Workflow
```yaml
# .github/workflows/revalidate.yml
on:
  schedule:
    - cron: '0 * * * *'  # Hourly revalidation
jobs:
  revalidate:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Vercel ISR
        run: curl -X POST "$REVALIDATE_URL?secret=$SECRET"
```

#### Vercel Configuration
```json
{
  "buildCommand": "astro build",
  "outputDirectory": "dist",
  "framework": "astro",
  "environmentVariables": {
    "WORDPRESS_API": "https://savorcms.wordpress.com/wp-json/wp/v2",
    "WP_TOKEN": "[WordPress Application Password]"
  }
}
```

---

## 🔍 SEO ARCHITECTURE

### Meta Data Flow
```
WordPress (Rank Math) → REST API → Astro Templates → HTML <head>

rank_math_title     → <title>
rank_math_description → <meta name="description">
                     → <meta property="og:description">
                     → <meta name="twitter:description">
```

### URL Structure & Internal Linking
```
Primary Pages:
├── / (Landing page - unchanged)
├── /blog/ (Blog hub)
├── /blog/category/{slug}/ (Category hubs)
└── /blog/{post-slug}/ (Individual posts)

Pagination:
├── /blog/page/2/
├── /blog/page/3/
└── ...

Category Examples:
├── /blog/category/food-diary/
├── /blog/category/restaurant-reviews/
└── /blog/category/cooking-tips/
```

### Structured Data Implementation
```html
<!-- Automatic via Rank Math + Astro passthrough -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Post Title",
  "description": "Post Description",
  "author": {
    "@type": "Organization",
    "name": "Savor"
  }
}
</script>
```

### Sitemap Strategy
```
Auto-Generated Sitemaps:
├── https://savortheapp.com/sitemap-index.xml (Astro)
├── https://savortheapp.com/sitemap-0.xml (Static pages)
├── https://savortheapp.com/sitemap-1.xml (Blog posts)
└── https://savorcms.wordpress.com/sitemap.xml (WordPress backup)
```

---

## 📊 PERFORMANCE & MONITORING

### Core Web Vitals Optimization
- **LCP**: ISR pre-rendered pages, optimized images
- **FID**: Minimal JavaScript, Astro's partial hydration
- **CLS**: Consistent layouts, no dynamic content shifts

### Caching Strategy
```
Vercel Edge Cache:
├── Static assets: 1 year
├── HTML pages: 15 minutes (ISR)
├── API responses: 5 minutes
└── Images: 30 days
```

### Analytics Implementation
```typescript
// Google Analytics 4
gtag('config', 'G-MEASUREMENT_ID', {
  page_title: post.title.rendered,
  page_location: `https://savortheapp.com/blog/${post.slug}`,
  content_group1: 'Blog Post'
});

// Search Console
// Automatic sitemap submission
// Performance monitoring via GSC API
```

### Monitoring Dashboard Metrics
| Metric | Source | Frequency | Alert Threshold |
|--------|--------|-----------|-----------------|
| Build Time | Vercel | Per deploy | >5 minutes |
| Page Load Speed | GA4 | Daily | >3 seconds |
| Indexed Pages | GSC | Weekly | <80% of published |
| Organic Traffic | GA4 | Daily | -20% week-over-week |
| API Response Time | Custom | Hourly | >2 seconds |

---

## 🔐 SECURITY & AUTHENTICATION

### WordPress.com Integration
```
Authentication Methods:
├── Application Passwords (recommended)
│   └── Used for: Automated post creation
├── OAuth 2.0 (future consideration)
│   └── Used for: User-facing features
└── REST API (read-only, public)
    └── Used for: Content fetching
```

### Environment Variables
```bash
# Required for production
WORDPRESS_API=https://savorcms.wordpress.com/wp-json/wp/v2
WP_TOKEN=xxxx-xxxx-xxxx-xxxx  # WordPress Application Password
GA_MEASUREMENT_ID=G-XXXXXXXXXX
REVALIDATE_SECRET=your-secret-key

# Development only
NODE_ENV=development
```

### API Rate Limiting
```typescript
// Built-in rate limiting for WordPress.com
const RATE_LIMIT = {
  posts_creation: '1 per second',
  api_requests: '100 per minute',
  bulk_operations: '50 posts per batch'
};
```

---

## 🚀 SCALING CONSIDERATIONS

### Performance at Scale (10K+ Pages)
```
Optimization Strategies:
├── ISR with smart revalidation
├── Category-based content clustering
├── Pagination for large post volumes
├── Image optimization via Vercel
├── CDN edge caching
└── Lazy loading for non-critical content
```

### Content Management at Scale
```
Automation Pipeline:
├── Daily keyword research
├── AI content generation
├── Bulk WordPress publishing
├── Automatic internal linking
├── Performance monitoring
└── SEO health checks
```

### Infrastructure Scaling
```
Vercel Limits & Solutions:
├── Function execution: 10s (sufficient for API calls)
├── Build time: 45min (pagination helps)
├── Bandwidth: Unlimited on Pro plan
├── Edge requests: Unlimited
└── ISR: Perfect for large content volumes
```

---

## 🔧 DEVELOPMENT WORKFLOW

### Local Development Setup
```bash
# 1. Clone repository
git clone [repo-url]
cd SavorCursor

# 2. Navigate to Astro project
cd savor-site

# 3. Install dependencies
npm install

# 4. Set environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# 5. Start development server
npm run dev
# Site available at http://localhost:3000
```

### Content Creation Workflow
```bash
# 1. Research keywords (using MCP tools)
# 2. Generate content data
node scripts/generate-posts.js "target keyword"

# 3. Review generated content
# Edit data/posts-{date}.json as needed

# 4. Bulk publish to WordPress
export WP_TOKEN="your-token"
node scripts/wp-bulk-create.js data/posts-{date}.json

# 5. Trigger site rebuild
git commit -am "feat: add new blog posts"
git push origin main
# Vercel auto-deploys and revalidates
```

### Testing & Quality Assurance
```bash
# Build testing
npm run build
npm run preview

# SEO testing
# Check meta tags in browser dev tools
# Validate structured data with Google's tool
# Test page speed with Lighthouse

# Content testing
# Verify WordPress posts appear on /blog/
# Check category filtering
# Test pagination
```

---

## 📚 TROUBLESHOOTING GUIDE

### Common Issues & Solutions

#### 1. WordPress Posts Not Appearing
```bash
# Check API connectivity
curl "https://savorcms.wordpress.com/wp-json/wp/v2/posts"

# Verify environment variables
echo $WORDPRESS_API

# Check WordPress site visibility
# WordPress Admin → Settings → Reading → "Public" selected
```

#### 2. Build Failures
```bash
# Check Astro configuration
npm run build 2>&1 | grep -i error

# Verify all imports
# Check for TypeScript errors
# Ensure all dependencies installed
```

#### 3. SEO Meta Tags Missing
```bash
# Verify Rank Math plugin active
# Check API response includes meta fields
curl "https://savorcms.wordpress.com/wp-json/wp/v2/posts?slug=test-post&_fields=meta"

# Update Astro template to use meta fields
```

#### 4. Performance Issues
```bash
# Check Vercel function logs
# Monitor build times
# Analyze bundle size
npm run build && ls -la dist/

# Optimize images
# Review ISR revalidation frequency
```

### Emergency Procedures

#### Rollback Deployment
```bash
# Revert to previous commit
git reset --hard HEAD~1
git push --force-with-lease origin main

# Or use Vercel dashboard
# Go to Deployments → Previous deployment → Promote
```

#### WordPress API Issues
```bash
# Switch to cached content
# Implement fallback in wordpress.ts
# Monitor WordPress.com status page
```

---

## 📈 SUCCESS METRICS & KPIs

### Technical Metrics
- **Build Time**: <5 minutes for 1000+ pages
- **Page Load Speed**: <3 seconds (LCP)
- **API Response Time**: <2 seconds
- **Uptime**: >99.9%

### SEO Metrics
- **Indexed Pages**: >80% of published content
- **Organic Traffic Growth**: +20% month-over-month
- **Average Position**: Top 10 for target keywords
- **Click-Through Rate**: >3% average

### Content Metrics
- **Publishing Velocity**: 50+ posts per week
- **Content Quality Score**: >80 (via content analysis tools)
- **Internal Link Density**: 3-5 links per post
- **Category Distribution**: Balanced across all 5 categories

---

This technical overview provides the complete foundation for understanding and working with Savor's SEO architecture. For specific implementation tasks, refer to the accompanying task tracker document. 