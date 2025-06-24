# Global Variables Documentation

## Overview

The Savor Programmatic SEO system uses a hierarchical configuration system where global variables serve as the foundation for all generated pages. These variables are defined in `_config.yml` and are available throughout the entire system via the `site` object in templates.

## Data Cascade Priority

Variables follow this priority order:
1. **Page-level data** (frontmatter) - Highest priority
2. **Category-level data** (`_category.yml`) - Medium priority  
3. **Global data** (`_config.yml`) - Lowest priority (fallback)

## Required Global Variables

### Brand & App Information

#### `brand_name`
- **Type:** String (required)
- **Purpose:** The main brand name used throughout the site
- **Usage:** Page titles, structured data, footer text
- **Example:** `"Savor"`
- **Template Usage:** `{{ site.brand_name }}`

#### `app_store_link`
- **Type:** String (required, URL format)
- **Purpose:** Primary download link for the mobile app
- **Usage:** CTA buttons, app download sections
- **Example:** `"https://savortheapp.com/download"`
- **Template Usage:** `<a href="{{ site.app_store_link }}">Download App</a>`

#### `global_cta_text`
- **Type:** String (required, min 5 characters)
- **Purpose:** Default call-to-action text used across the site
- **Usage:** Buttons, promotional sections, email capture
- **Example:** `"Download the Savor app to start tracking your meals!"`
- **Template Usage:** `{{ site.global_cta_text }}`

#### `footer_text`
- **Type:** String (required)
- **Purpose:** Copyright and legal text for site footer
- **Usage:** Footer sections, legal disclaimers
- **Example:** `"© 2024 Savor. All rights reserved."`
- **Template Usage:** `{{ site.footer_text }}`

### SEO & Technical Configuration

#### `base_url`
- **Type:** String (required, URL format)
- **Purpose:** Canonical base URL for the website
- **Usage:** Canonical URLs, Open Graph tags, structured data
- **Example:** `"https://savortheapp.com"`
- **Template Usage:** `{{ slug | canonicalUrl: category.slug, site.base_url }}`

#### `default_meta_description`
- **Type:** String (required, 50-160 characters)
- **Purpose:** Fallback meta description for SEO
- **Usage:** Meta description tags when page/category descriptions aren't available
- **Example:** `"Discover the best restaurants and dishes with Savor's community-driven ratings and reviews."`
- **Template Usage:** `{{ description | seoDescription: category.description, site.default_meta_description }}`

## Optional Global Variables

### SEO Enhancement

#### `default_title_suffix`
- **Type:** String (optional)
- **Purpose:** Standard suffix appended to page titles
- **Usage:** SEO title generation
- **Example:** `" | Savor"`
- **Template Usage:** Automatically applied by `seoTitle` filter

#### `default_og_image`
- **Type:** String (optional, path format)
- **Purpose:** Default Open Graph image for social sharing
- **Usage:** Social media meta tags when page-specific images aren't available
- **Example:** `"/images/savor-og-default.jpg"`
- **Template Usage:** `<meta property="og:image" content="{{ site.default_og_image }}">`

### Navigation & Links

#### `privacy_policy_link`
- **Type:** String (optional, path format)
- **Purpose:** Link to privacy policy page
- **Usage:** Footer links, legal compliance
- **Example:** `"/privacy"`
- **Template Usage:** `<a href="{{ site.privacy_policy_link }}">Privacy Policy</a>`

#### `terms_link`
- **Type:** String (optional, path format)
- **Purpose:** Link to terms of service page
- **Usage:** Footer links, legal compliance
- **Example:** `"/terms"`
- **Template Usage:** `<a href="{{ site.terms_link }}">Terms of Service</a>`

#### `contact_link`
- **Type:** String (optional, path format)
- **Purpose:** Link to contact page
- **Usage:** Header/footer navigation, support links
- **Example:** `"/contact"`
- **Template Usage:** `<a href="{{ site.contact_link }}">Contact Us</a>`

#### `about_link`
- **Type:** String (optional, path format)
- **Purpose:** Link to about page
- **Usage:** Header/footer navigation
- **Example:** `"/about"`
- **Template Usage:** `<a href="{{ site.about_link }}">About</a>`

### Social Media Integration

#### `twitter_handle`
- **Type:** String (optional, pattern: `@[A-Za-z0-9_]{1,15}`)
- **Purpose:** Official Twitter/X handle
- **Usage:** Social media links, Twitter Card meta tags
- **Example:** `"@SavorTheApp"`
- **Template Usage:** `<a href="https://twitter.com/{{ site.twitter_handle | remove: '@' }}">Follow Us</a>`

#### `instagram_handle`
- **Type:** String (optional, pattern: `@[A-Za-z0-9_.]{1,30}`)
- **Purpose:** Official Instagram handle
- **Usage:** Social media links, Instagram integration
- **Example:** `"@savortheapp"`
- **Template Usage:** `<a href="https://instagram.com/{{ site.instagram_handle | remove: '@' }}">Instagram</a>`

#### `facebook_page`
- **Type:** String (optional, URL format)
- **Purpose:** Official Facebook page URL
- **Usage:** Social media links, Facebook integration
- **Example:** `"https://facebook.com/savortheapp"`
- **Template Usage:** `<a href="{{ site.facebook_page }}">Facebook</a>`

### Analytics & Tracking

#### `google_analytics_id`
- **Type:** String (optional, pattern: `(GA-|G-)[A-Z0-9-]+`)
- **Purpose:** Google Analytics tracking ID
- **Usage:** Analytics script integration
- **Example:** `"GA-XXXXXXXXX"` or `"G-XXXXXXXXX"`
- **Template Usage:** Used in analytics script templates

#### `facebook_pixel_id`
- **Type:** String (optional)
- **Purpose:** Facebook Pixel tracking ID
- **Usage:** Facebook advertising and conversion tracking
- **Example:** `"XXXXXXXXX"`
- **Template Usage:** Used in Facebook Pixel script templates

#### `hotjar_site_id`
- **Type:** String (optional)
- **Purpose:** Hotjar heatmap and user behavior tracking ID
- **Usage:** User experience analytics
- **Example:** `"XXXXXXXXX"`
- **Template Usage:** Used in Hotjar script templates

### Content Configuration

#### `pagination_size`
- **Type:** Number (optional, range: 1-100)
- **Purpose:** Number of items per page for paginated content
- **Usage:** Restaurant listings, search results
- **Example:** `20`
- **Template Usage:** Used in pagination logic

#### `excerpt_length`
- **Type:** Number (optional, range: 50-300)
- **Purpose:** Character limit for content excerpts
- **Usage:** Preview text, search result snippets
- **Example:** `150`
- **Template Usage:** `{{ content | truncate: site.excerpt_length }}`

#### `related_posts_count`
- **Type:** Number (optional, range: 1-10)
- **Purpose:** Number of related items to show
- **Usage:** "You might also like" sections
- **Example:** `3`
- **Template Usage:** Used in related content queries

### API & External Services

#### `google_maps_api_key`
- **Type:** String (optional)
- **Purpose:** Google Maps API key for location features
- **Usage:** Restaurant maps, location search
- **Example:** `"YOUR_GOOGLE_MAPS_API_KEY"`
- **Template Usage:** Used in map integration scripts

#### `places_api_endpoint`
- **Type:** String (optional, URL format)
- **Purpose:** Custom API endpoint for restaurant data
- **Usage:** Dynamic content generation
- **Example:** `"https://api.savortheapp.com/places"`
- **Template Usage:** Used in data fetching scripts

### Email & Marketing

#### `mailchimp_list_id`
- **Type:** String (optional)
- **Purpose:** Mailchimp mailing list ID for newsletter signups
- **Usage:** Email capture forms
- **Example:** `"XXXXXXXXX"`
- **Template Usage:** Used in newsletter signup forms

#### `newsletter_signup_text`
- **Type:** String (optional)
- **Purpose:** Call-to-action text for newsletter signups
- **Usage:** Email capture sections
- **Example:** `"Get the latest restaurant discoveries in your inbox"`
- **Template Usage:** `{{ site.newsletter_signup_text }}`

### Feature Flags

#### `enable_user_reviews`
- **Type:** Boolean (optional)
- **Purpose:** Toggle user review functionality
- **Usage:** Conditional feature display
- **Example:** `true`
- **Template Usage:** `{% if site.enable_user_reviews %}`

#### `enable_photo_uploads`
- **Type:** Boolean (optional)
- **Purpose:** Toggle photo upload functionality
- **Usage:** Conditional feature display
- **Example:** `true`
- **Template Usage:** `{% if site.enable_photo_uploads %}`

#### `enable_social_sharing`
- **Type:** Boolean (optional)
- **Purpose:** Toggle social sharing buttons
- **Usage:** Conditional feature display
- **Example:** `true`
- **Template Usage:** `{% if site.enable_social_sharing %}`

#### `enable_email_capture`
- **Type:** Boolean (optional)
- **Purpose:** Toggle email signup forms
- **Usage:** Conditional feature display
- **Example:** `true`
- **Template Usage:** `{% if site.enable_email_capture %}`

### Structured Data & Organization

#### `organization_name`
- **Type:** String (optional)
- **Purpose:** Legal organization name for structured data
- **Usage:** Schema.org Organization markup
- **Example:** `"Savor Technologies Inc."`
- **Template Usage:** Used in structured data generation

#### `organization_logo`
- **Type:** String (optional, path format)
- **Purpose:** Organization logo for structured data
- **Usage:** Schema.org Organization logo
- **Example:** `"/images/savor-logo-structured-data.png"`
- **Template Usage:** Used in structured data generation

#### `organization_url`
- **Type:** String (optional, URL format)
- **Purpose:** Official organization website
- **Usage:** Schema.org Organization URL
- **Example:** `"https://savortheapp.com"`
- **Template Usage:** Used in structured data generation

#### `organization_social_profiles`
- **Type:** Array of URLs (optional)
- **Purpose:** Official social media profiles for structured data
- **Usage:** Schema.org Organization social profiles
- **Example:** 
  ```yaml
  - "https://twitter.com/SavorTheApp"
  - "https://instagram.com/savortheapp"
  - "https://facebook.com/savortheapp"
  ```
- **Template Usage:** Used in structured data generation

### Performance & Optimization

#### `image_optimization`
- **Type:** Boolean (optional)
- **Purpose:** Enable image optimization features
- **Usage:** Build process optimizations
- **Example:** `true`
- **Template Usage:** Used in build scripts

#### `lazy_loading`
- **Type:** Boolean (optional)
- **Purpose:** Enable lazy loading for images
- **Usage:** Performance optimization
- **Example:** `true`
- **Template Usage:** `{% if site.lazy_loading %}loading="lazy"{% endif %}`

#### `critical_css_inline`
- **Type:** Boolean (optional)
- **Purpose:** Inline critical CSS for performance
- **Usage:** Build process optimizations
- **Example:** `true`
- **Template Usage:** Used in build scripts

## Template Usage Examples

### Basic Variable Access
```liquid
<!-- Simple variable output -->
<h1>{{ site.brand_name }}</h1>

<!-- With fallback -->
<p>{{ site.newsletter_signup_text | default: "Join our newsletter!" }}</p>
```

### Using Custom Filters
```liquid
<!-- SEO title with cascade -->
<title>{{ title | seoTitle: category.title, site.global_title, site.brand_name }}</title>

<!-- Canonical URL generation -->
<link rel="canonical" href="{{ slug | canonicalUrl: category.slug, site.base_url }}">

<!-- CTA with dynamic content -->
<button>{{ site.global_cta_text | formatCTA: category.location_name, category.cuisine_type }}</button>
```

### Conditional Features
```liquid
<!-- Feature flags -->
{% if site.enable_social_sharing %}
  <div class="social-share">
    <a href="https://twitter.com/{{ site.twitter_handle | remove: '@' }}">Twitter</a>
    <a href="{{ site.facebook_page }}">Facebook</a>
  </div>
{% endif %}

<!-- Email capture -->
{% if site.enable_email_capture %}
  <form action="newsletter-signup">
    <p>{{ site.newsletter_signup_text }}</p>
    <input type="email" placeholder="Your email">
    <button>{{ site.global_cta_text }}</button>
  </form>
{% endif %}
```

### Structured Data
```liquid
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "{{ site.organization_name }}",
  "url": "{{ site.organization_url }}",
  "logo": "{{ site.organization_logo }}",
  "sameAs": {{ site.organization_social_profiles | jsonify }}
}
</script>
```

## Validation Rules

All global variables are automatically validated by the configuration validation system:

- **Required fields** must be present and non-empty
- **URLs** must be valid URL format
- **Paths** should start with `/` for absolute paths
- **Patterns** must match specified regex (social handles, analytics IDs)
- **Numbers** must be within specified ranges
- **Strings** must meet minimum/maximum length requirements

## Adding New Variables

To add a new global variable:

1. **Add to `_config.yml`** with appropriate value
2. **Update validation rules** in `scripts/validate-config.js`
3. **Document here** with type, purpose, and usage examples
4. **Add template filters** if needed in `.eleventy.js`
5. **Test thoroughly** with the validation script

## Best Practices

1. **Use descriptive names** that clearly indicate purpose
2. **Provide sensible defaults** for optional variables
3. **Keep URLs absolute** for external links
4. **Use feature flags** for conditional functionality
5. **Validate early** with `npm run validate` before building
6. **Document changes** when adding new variables
7. **Test cascade behavior** across page/category/global levels 