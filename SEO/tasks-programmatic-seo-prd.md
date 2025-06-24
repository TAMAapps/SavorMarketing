# Tasks: Simple & Scalable Programmatic SEO CMS

Based on: `programmatic-seo-prd.md`

## Relevant Files

- `_config.yml` - Global configuration file containing site-wide variables (brand name, CTA text, footer, etc.)
- `.eleventy.js` - Eleventy configuration file with custom filters and data processing (✅ Created)
- `build.js` - Main build script that processes all content files and generates static HTML pages
- `generate.js` - Content generation script that creates page.md files from API data and keyword permutations
- `templates/list-page.html` - Master HTML template for restaurant list pages with variable placeholders
- `templates/components/` - Directory containing reusable HTML components (header, footer, CTA sections) (✅ Created)
- `content/[city]/_category.yml` - Category-level configuration files for each city/region
- `content/[city]/[page-slug].md` - Individual page content files with YAML frontmatter  
- `scripts/deploy.js` - Deployment script to upload generated files to web server
- `content/` - Main content directory with README documentation (✅ Created)
- `templates/` - Templates directory with README documentation (✅ Created)
- `scripts/` - Scripts directory with README documentation (✅ Created)
- `dist/` - Output directory for generated HTML files (✅ Created)
- `package.json` - Node.js dependencies and build scripts configuration (✅ Enhanced)
- `scripts-guide.md` - Comprehensive documentation for all npm scripts (✅ Created)
- `.gitignore` - Git ignore file to exclude generated files and dependencies (✅ Created)

### Notes

- This is a file-based static site generator system, not a database-driven CMS
- All content is version-controlled through Git for easy collaboration and rollbacks
- The build process combines data files with templates to generate final HTML
- Individual pages can override category and global settings through the hierarchical config system

## Tasks

- [x] 1.0 Set up Static Site Generator Foundation
  - [x] 1.1 Initialize Node.js project with package.json and dependencies (eleventy, yaml, fs-extra, path)
  - [x] 1.2 Create basic project directory structure (content/, templates/, scripts/, dist/)
  - [x] 1.3 Set up .gitignore to exclude node_modules, dist/, and temporary files
  - [x] 1.4 Configure Eleventy as the static site generator with basic eleventy.js config
  - [x] 1.5 Create npm scripts for build, serve, and deploy commands
  - [x] 1.6 Test basic Eleventy functionality with a simple test page

- [ ] 2.0 Create Global Configuration System
  - [ ] 2.1 Create _config.yml with all global variables (brand_name, app_store_link, global_cta_text, footer_text)
  - [ ] 2.2 Set up YAML parsing in build script to read global config
  - [ ] 2.3 Create data cascade system where global config is available to all templates
  - [ ] 2.4 Add validation script to check required global config fields
  - [ ] 2.5 Document all available global variables and their purposes
  - [ ] 2.6 Test global variable inheritance across different page types

- [ ] 3.0 Build Content Generation Engine
  - [ ] 3.1 Create generate.js script with command-line argument parsing (city, count, cuisine type)
  - [ ] 3.2 Set up keyword permutation system for generating page variations (cuisine + neighborhood combinations)
  - [ ] 3.3 Integrate with Google Places API or similar service for restaurant data
  - [ ] 3.4 Create page.md file generator with proper YAML frontmatter structure
  - [ ] 3.5 Implement data variation logic to ensure unique content per page
  - [ ] 3.6 Add bulk generation capabilities with progress tracking and error handling
  - [ ] 3.7 Create content validation to ensure generated pages meet SEO requirements

- [ ] 4.0 Develop Template System with Variable Hierarchy
  - [ ] 4.1 Create master list-page.html template with placeholder sections
  - [ ] 4.2 Implement variable hierarchy logic (Individual → Category → Global override system)
  - [ ] 4.3 Build reusable component templates (header, footer, CTA sections, restaurant cards)
  - [ ] 4.4 Create category config parser to read _category.yml files
  - [ ] 4.5 Set up individual page frontmatter processing and variable merging
  - [ ] 4.6 Add conditional logic for displaying different content based on available data
  - [ ] 4.7 Implement SEO meta tag generation with proper title/description hierarchy
  - [ ] 4.8 Create schema markup templates for local business structured data

- [ ] 5.0 Implement Build & Deploy Pipeline
  - [ ] 5.1 Create build.js script that processes all content files and generates static HTML
  - [ ] 5.2 Set up file watching for development with automatic rebuilds
  - [ ] 5.3 Implement production build optimization (minification, compression)
  - [ ] 5.4 Create deploy.js script for uploading to web server or CDN
  - [ ] 5.5 Add content validation during build process (missing fields, broken links)
  - [ ] 5.6 Set up build caching to improve performance on large sites
  - [ ] 5.7 Create deployment verification script to check live site functionality
  - [ ] 5.8 Document build and deployment process with troubleshooting guide 