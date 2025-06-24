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

  // Custom filter to merge category and global data
  eleventyConfig.addFilter("mergeData", function(pageData, categoryData, globalData) {
    return Object.assign({}, globalData || {}, categoryData || {}, pageData || {});
  });

  // Custom filter for SEO meta tags
  eleventyConfig.addFilter("seoTitle", function(pageTitle, categoryTitle, globalTitle) {
    return pageTitle || categoryTitle || globalTitle || "Savor";
  });

  // Custom filter for canonical URLs
  eleventyConfig.addFilter("canonicalUrl", function(slug, categorySlug, baseUrl) {
    const base = baseUrl || "https://savortheapp.com";
    if (categorySlug && slug) {
      return `${base}/${categorySlug}/${slug}`;
    }
    return base;
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