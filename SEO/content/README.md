# Content Directory

This directory contains all the content files for the programmatic SEO system.

## Structure

```
content/
├── [city-name]/
│   ├── _category.yml          # City-specific configuration
│   └── [page-slug].md         # Individual restaurant list pages
└── README.md                  # This file
```

## Examples

- `content/new-york/_category.yml` - Configuration for all NYC pages
- `content/new-york/best-pasta-brooklyn.md` - Individual page content
- `content/chicago/top-pizza-loop.md` - Individual page content

## File Formats

- **Category configs**: YAML files named `_category.yml`
- **Page content**: Markdown files with YAML frontmatter
- **Naming**: Use lowercase with hyphens (kebab-case) 