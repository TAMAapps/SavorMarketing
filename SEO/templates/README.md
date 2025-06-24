# Templates Directory

This directory contains all HTML templates for the programmatic SEO system.

## Structure

```
templates/
├── list-page.html             # Master template for restaurant list pages
├── components/                # Reusable template components
│   ├── header.html           # Site header component
│   ├── footer.html           # Site footer component
│   ├── cta.html              # Call-to-action sections
│   └── restaurant-card.html  # Individual restaurant display
└── README.md                 # This file
```

## Template System

- Uses Eleventy's Liquid templating engine
- Supports variable hierarchy: Individual → Category → Global
- Components are reusable across multiple page types

## Variable Access

Templates can access variables from:
- Individual page frontmatter
- Category `_category.yml` files  
- Global `_config.yml` file 