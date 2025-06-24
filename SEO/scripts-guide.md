# NPM Scripts Guide

This document explains all available npm scripts for the Savor Programmatic SEO system.

## Development Scripts

### `npm run dev`
**Purpose**: Start development workflow with clean build and live server  
**Command**: `npm run clean && npm run serve`  
**Use**: Primary command for local development

### `npm run serve`
**Purpose**: Start development server with live reload  
**Command**: `eleventy --serve --port=8080`  
**Access**: http://localhost:8080  
**Features**: Auto-rebuilds on file changes

### `npm run serve:debug`
**Purpose**: Development server with debug output  
**Command**: `DEBUG=Eleventy* eleventy --serve --port=8080`  
**Use**: Troubleshooting Eleventy issues

### `npm run watch`
**Purpose**: Watch files and rebuild without server  
**Command**: `eleventy --watch`  
**Use**: When you want rebuilds but no server

## Build Scripts

### `npm run build`
**Purpose**: Standard build for development  
**Command**: `eleventy`  
**Output**: `dist/` directory with HTML files

### `npm run build:clean`
**Purpose**: Clean build (removes dist/ first)  
**Command**: `rm -rf dist && eleventy`  
**Use**: When you need a fresh build

### `npm run build:production`
**Purpose**: Optimized build for production  
**Command**: `NODE_ENV=production eleventy --quiet`  
**Features**: Quiet output, production optimizations

### `npm run clean`
**Purpose**: Remove generated files  
**Command**: `rm -rf dist`  
**Use**: Clean up before fresh builds

## Content Generation Scripts

### `npm run generate`
**Purpose**: Run content generation script  
**Command**: `node generate.js`  
**Use**: Generate new pages programmatically

### `npm run generate:city`
**Purpose**: Generate content for specific city  
**Command**: `node generate.js --city`  
**Use**: `npm run generate:city -- --city="miami" --count=50`

## Deployment Scripts

### `npm run deploy`
**Purpose**: Full production deployment  
**Command**: `npm run build:production && node scripts/deploy.js`  
**Process**: Builds for production, then deploys

### `npm run deploy:staging`
**Purpose**: Deploy to staging environment  
**Command**: `NODE_ENV=staging npm run build && node scripts/deploy.js --staging`  
**Use**: Testing before production

## Quality & Validation Scripts

### `npm run validate`
**Purpose**: Validate content quality and structure  
**Command**: `node scripts/validate-content.js`  
**Checks**: Missing fields, SEO requirements, content quality

### `npm run validate:yaml`
**Purpose**: Check YAML syntax in all files  
**Command**: `node scripts/validate-yaml.js`  
**Use**: Find YAML syntax errors

### `npm run audit`
**Purpose**: Generate content audit report  
**Command**: `node scripts/audit.js`  
**Output**: Performance metrics, SEO analysis

## Common Workflows

### Starting Development
```bash
npm run dev
# Opens localhost:8080 with live reload
```

### Adding New Content
```bash
# Generate content for a new city
npm run generate:city -- --city="boston" --count=25

# Validate the new content
npm run validate

# Build and test
npm run build
```

### Deploying to Production
```bash
# Validate everything first
npm run validate
npm run audit

# Deploy (includes production build)
npm run deploy
```

### Troubleshooting
```bash
# Clean build if something seems wrong
npm run build:clean

# Debug mode for detailed output
npm run serve:debug

# Check for YAML errors
npm run validate:yaml
```

## Script Dependencies

Some scripts require additional files to be created:
- `generate.js` - Content generation logic
- `scripts/deploy.js` - Deployment configuration
- `scripts/validate-content.js` - Content validation rules
- `scripts/validate-yaml.js` - YAML syntax checker
- `scripts/audit.js` - Content audit reporting

## Environment Variables

- `NODE_ENV=production` - Enables production optimizations
- `NODE_ENV=staging` - Configures staging deployment
- `DEBUG=Eleventy*` - Enables Eleventy debug output

## Port Configuration

Default development server runs on port 8080. To change:
```bash
# Edit package.json serve scripts or use:
npx eleventy --serve --port=3000
``` 