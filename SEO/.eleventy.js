const yaml = require('yaml');
const fs = require('fs-extra');
const path = require('path');

module.exports = function(eleventyConfig) {
  // Set up data file formats
  eleventyConfig.addDataExtension("yml", contents => yaml.parse(contents));
  eleventyConfig.addDataExtension("yaml", contents => yaml.parse(contents));

  // Copy static assets
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("images");

  // Set up global data from _config.yml
  eleventyConfig.addGlobalData("site", () => {
    try {
      const configPath = path.join(__dirname, '_config.yml');
      if (fs.existsSync(configPath)) {
        const configFile = fs.readFileSync(configPath, 'utf8');
        return yaml.parse(configFile);
      }
    } catch (error) {
      console.warn('Warning: Could not load _config.yml:', error.message);
    }
    return {};
  });

  // Set up category data loading
  eleventyConfig.addGlobalData("eleventyComputed", {
    category: (data) => {
      try {
        // Get the directory path of the current page
        const pagePath = data.page.inputPath;
        const pageDir = path.dirname(pagePath);
        const categoryPath = path.join(pageDir, '_category.yml');
        
        if (fs.existsSync(categoryPath)) {
          const categoryFile = fs.readFileSync(categoryPath, 'utf8');
          return yaml.parse(categoryFile);
        }
      } catch (error) {
        console.warn('Warning: Could not load category data:', error.message);
      }
      return {};
    }
  });

  // Enhanced data cascade system with priority-based merging
  eleventyConfig.addFilter("cascadeData", function(pageData, categoryData, globalData) {
    // Deep merge with proper priority: Page > Category > Global
    const merged = {};
    
    // Start with global data as base
    Object.assign(merged, globalData || {});
    
    // Override with category data
    if (categoryData) {
      Object.keys(categoryData).forEach(key => {
        if (typeof categoryData[key] === 'object' && !Array.isArray(categoryData[key]) && categoryData[key] !== null) {
          merged[key] = Object.assign({}, merged[key] || {}, categoryData[key]);
        } else {
          merged[key] = categoryData[key];
        }
      });
    }
    
    // Override with page data (highest priority)
    if (pageData) {
      Object.keys(pageData).forEach(key => {
        if (typeof pageData[key] === 'object' && !Array.isArray(pageData[key]) && pageData[key] !== null) {
          merged[key] = Object.assign({}, merged[key] || {}, pageData[key]);
        } else {
          merged[key] = pageData[key];
        }
      });
    }
    
    return merged;
  });

  // Legacy support for simple merge
  eleventyConfig.addFilter("mergeData", function(pageData, categoryData, globalData) {
    return Object.assign({}, globalData || {}, categoryData || {}, pageData || {});
  });

  // Enhanced SEO title with fallback chain
  eleventyConfig.addFilter("seoTitle", function(pageTitle, categoryTitle, globalTitle, siteName) {
    const title = pageTitle || categoryTitle || globalTitle;
    const brand = siteName || "Savor";
    
    if (title && title !== brand) {
      return `${title} | ${brand}`;
    }
    return brand;
  });

  // SEO description with fallback chain
  eleventyConfig.addFilter("seoDescription", function(pageDesc, categoryDesc, globalDesc) {
    return pageDesc || categoryDesc || globalDesc || "Discover and remember every meal you've ever loved with Savor.";
  });

  // Enhanced canonical URL generation
  eleventyConfig.addFilter("canonicalUrl", function(slug, categorySlug, baseUrl) {
    const base = (baseUrl || "https://savortheapp.com").replace(/\/$/, '');
    if (categorySlug && slug) {
      return `${base}/${categorySlug}/${slug}/`;
    } else if (slug) {
      return `${base}/${slug}/`;
    }
    return `${base}/`;
  });

  // Get value with data cascade priority
  eleventyConfig.addFilter("getValue", function(key, pageData, categoryData, globalData) {
    if (pageData && pageData[key] !== undefined) return pageData[key];
    if (categoryData && categoryData[key] !== undefined) return categoryData[key];
    if (globalData && globalData[key] !== undefined) return globalData[key];
    return null;
  });

  // Format CTA text with dynamic content
  eleventyConfig.addFilter("formatCTA", function(ctaTemplate, locationName, cuisineType) {
    if (!ctaTemplate) return "Join the Savor Waitlist!";
    
    return ctaTemplate
      .replace(/\{location\}/g, locationName || '')
      .replace(/\{cuisine\}/g, cuisineType || '')
      .trim();
  });

  // Generate structured data for local business
  eleventyConfig.addFilter("structuredData", function(pageData, categoryData, globalData) {
    // Manual cascade merge since we can't call other filters
    const data = {};
    Object.assign(data, globalData || {});
    Object.assign(data, categoryData || {});
    Object.assign(data, pageData || {});
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": data.title || data.page_title,
      "description": data.description || data.meta_description,
      "url": data.canonical_url,
      "isPartOf": {
        "@type": "WebSite",
        "name": globalData?.brand_name || "Savor",
        "url": globalData?.base_url || "https://savortheapp.com"
      }
    };

    return JSON.stringify(structuredData);
  });

  // Watch for changes in content files
  eleventyConfig.addWatchTarget("content/**/*.yml");
  eleventyConfig.addWatchTarget("content/**/*.yaml");
  eleventyConfig.addWatchTarget("_config.yml");

  // Set up template formats
  eleventyConfig.setTemplateFormats([
    "md",
    "njk", 
    "html",
    "liquid"
  ]);

  // Configure directories
  return {
    templateFormats: ["md", "njk", "html", "liquid"],
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
    dataTemplateEngine: "liquid",
    
    dir: {
      input: "content",
      includes: "../templates",
      data: "../_data",
      output: "dist"
    }
  };
}; 