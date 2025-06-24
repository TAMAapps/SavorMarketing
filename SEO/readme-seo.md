# SEO System User Guide

## Overview

This is a file-based programmatic SEO system designed to scale from 10 to 1,000+ pages efficiently. The system uses a 3-layer architecture that allows you to make edits at global, category, and individual page levels.

## System Architecture

### The 3-Layer Editing System

1. **Global Level** (`_config.yml`) - Changes affect ALL pages
2. **Category Level** (`_category.yml`) - Changes affect all pages in a city/category  
3. **Individual Level** (`page.md`) - Changes affect only that specific page

**Override Hierarchy:** Individual → Category → Global (individual pages can override category settings, category can override global)

## Quick Start Guide

### Making Your First Edit

1. **Global Change (affects all pages):**
   ```bash
   # Edit the main config file
   nano _config.yml
   
   # Change something like the CTA text
   global_cta_text: "New call-to-action text here!"
   
   # Rebuild the site
   npm run build
   ```

2. **Category Change (affects all pages in a city):**
   ```bash
   # Edit a city's config
   nano content/new-york/_category.yml
   
   # Change the intro paragraph for all NYC pages
   intro_paragraph: "Updated intro for all New York restaurant pages"
   
   # Rebuild
   npm run build
   ```

3. **Individual Page Change:**
   ```bash
   # Edit a specific page
   nano content/new-york/best-pasta-brooklyn.md
   
   # Change the title or add unique content
   # Rebuild
   npm run build
   ```

## File Structure

```
/
├── _config.yml                    # Global settings
├── build.js                       # Build script
├── generate.js                    # Content generation
├── package.json                   # Dependencies
├── templates/
│   ├── list-page.html            # Main page template
│   └── components/               # Reusable components
├── content/
│   ├── new-york/
│   │   ├── _category.yml         # NYC category settings
│   │   ├── best-pasta-brooklyn.md
│   │   └── top-brunch-manhattan.md
│   └── chicago/
│       ├── _category.yml         # Chicago category settings
│       └── best-pizza-loop.md
└── dist/                         # Generated HTML files
```

## Daily Operations

### 1. Creating New Content

#### Option A: Manual Creation (for unique pages)
```bash
# Create a new page file
touch content/new-york/best-sushi-soho.md

# Edit with your content
nano content/new-york/best-sushi-soho.md
```

**Template for new pages:**
```yaml
---
title: "The 5 Best Sushi Restaurants in SoHo"
meta_description: "Discover top-rated sushi in SoHo based on Savor user reviews. Fresh fish, expert chefs, unforgettable meals."
slug: "best-sushi-soho"
restaurants:
  - name: "Blue Ribbon Sushi"
    neighborhood: "SoHo"
    top_dish: "Omakase"
    unique_blurb: "A SoHo institution known for its late-night service and consistently fresh fish."
---

## Unique Content Section

Add any unique, hand-written content here to boost SEO value.
This could be neighborhood history, cooking techniques, or personal insights.
```

#### Option B: Bulk Generation (for scaling)
```bash
# Run the generation script
node generate.js --city="miami" --count=50

# This creates 50 new pages for Miami automatically
# Review and edit any pages that need customization
```

### 2. Making Site-Wide Changes

#### Updating Global Settings
Edit `_config.yml` for changes that affect every page:

```yaml
# Brand & App Info
brand_name: "Savor"
app_store_link: "https://savortheapp.com/download"
app_download_cta: "Download the Savor app to start tracking your meals!"

# SEO Defaults
default_meta_description: "Discover the best restaurants and dishes with Savor's community-driven ratings and reviews."

# Footer & Legal
footer_text: "© 2024 Savor. All rights reserved."
privacy_policy_link: "/privacy"
terms_link: "/terms"

# Analytics & Tracking
google_analytics_id: "GA-XXXXXXXXX"
facebook_pixel_id: "XXXXXXXXX"
```

#### Updating Category Settings
Edit `content/[city]/_category.yml` for city-specific changes:

```yaml
# City Info
city_name: "New York"
city_slug: "new-york"
state: "NY"

# Content
intro_paragraph: "From Michelin stars to hidden gems, New York's food scene is legendary."
faq_section_title: "Frequently Asked Questions about dining in New York"

# SEO
meta_title_suffix: "| Best Restaurants in NYC - Savor"
canonical_base: "https://savortheapp.com/new-york/"

# Local Business Schema
city_coordinates: "40.7128,-74.0060"
timezone: "America/New_York"
```

### 3. Content Quality & SEO Best Practices

#### Adding Unique Content
Always add unique content to important pages:

```markdown
---
# YAML frontmatter here
---

## About [Neighborhood]'s [Cuisine] Scene

Write 2-3 paragraphs of unique content here. This is crucial for SEO.
Discuss the neighborhood's history, what makes the cuisine special,
or provide insider tips that users can't find elsewhere.

### Local Favorites vs Tourist Spots

Compare different restaurant categories and give actionable advice.
This type of unique content helps pages rank better in Google.
```

#### SEO Optimization Checklist
- [ ] Unique title for each page (not templated)
- [ ] Meta description under 160 characters
- [ ] At least 200 words of unique content
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] Internal links to related pages
- [ ] Local business schema markup

### 4. Building & Deploying

#### Local Development
```bash
# Install dependencies (first time only)
npm install

# Generate new content (if needed)
node generate.js --city="boston" --count=25

# Build the site
npm run build

# Preview locally (if you have a local server)
npm run serve
```

#### Deployment
```bash
# Build for production
npm run build:production

# Deploy to server
npm run deploy

# Or manually upload the dist/ folder to your web server
```

### 5. Monitoring & Optimization

#### Google Search Console
- Monitor new page indexing
- Check for crawl errors
- Track keyword rankings
- Identify top-performing pages

#### Content Performance Review
```bash
# Generate a content audit report
node scripts/audit.js

# This will show:
# - Pages with low word counts
# - Missing meta descriptions
# - Duplicate content issues
# - Pages needing unique content
```

## Troubleshooting

### Common Issues

**Build fails:**
```bash
# Check for YAML syntax errors
node scripts/validate-yaml.js

# Check for missing required fields
node scripts/validate-content.js
```

**Pages not updating:**
```bash
# Clear the build cache
rm -rf dist/
npm run build
```

**SEO issues:**
- Ensure each page has unique title and meta description
- Add more unique content to thin pages
- Check internal linking structure
- Verify schema markup is valid

### File Naming Conventions

- **Slugs:** Use lowercase, hyphens only (`best-pasta-brooklyn`)
- **Cities:** Use full city names in folder structure (`new-york`, not `nyc`)
- **Categories:** Keep consistent naming (`_category.yml`, never `category.yml`)

## Advanced Features

### Custom Page Types
Create different templates for different content types:

```bash
# Restaurant lists (default)
templates/list-page.html

# Neighborhood guides
templates/neighborhood-guide.html

# Cuisine-specific pages
templates/cuisine-page.html
```

### Bulk Operations
```bash
# Update all pages in a city
node scripts/bulk-update.js --city="chicago" --field="meta_description" --value="New description"

# Generate variations of existing pages
node scripts/create-variations.js --base="best-pizza-brooklyn" --variations="cheap,expensive,family-friendly"
```

### Analytics Integration
Track content performance:

```yaml
# Add to _config.yml
analytics:
  google_analytics: "GA-XXXXXXXXX"
  facebook_pixel: "XXXXXXXXX"
  hotjar: "XXXXXXXXX"
```

## Content Strategy Tips

1. **Start Small:** Begin with 10-20 high-quality pages before scaling
2. **Focus on Quality:** Better to have 100 great pages than 1000 thin pages
3. **Local Expertise:** Add insider knowledge that only locals would know
4. **Update Regularly:** Refresh content quarterly to maintain freshness
5. **Monitor Performance:** Use GSC to identify which pages need improvement

## Getting Help

- **Technical Issues:** Check the troubleshooting section above
- **Content Strategy:** Review the SEO research document (`seo-research1.md`)
- **System Architecture:** Reference the PRD (`programmatic-seo-prd.md`)

---

*This system is designed to be simple and scalable. Start with manual edits to understand the workflow, then gradually use automation features as you scale up.* 