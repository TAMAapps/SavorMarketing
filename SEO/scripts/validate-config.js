#!/usr/bin/env node

/**
 * Configuration Validation Script for Savor Programmatic SEO System
 * 
 * This script validates:
 * - Required global configuration fields
 * - Data types and formats
 * - URL validity
 * - File references
 * - Category configurations
 * - Content structure
 */

const yaml = require('yaml');
const fs = require('fs-extra');
const path = require('path');
const { URL } = require('url');

class ConfigValidator {
  constructor() {
    this.projectRoot = path.resolve(__dirname, '..');
    this.configPath = path.join(this.projectRoot, '_config.yml');
    this.errors = [];
    this.warnings = [];
    this.globalConfig = {};
  }

  /**
   * Main validation entry point
   */
  async validate() {
    console.log('🔍 Starting Configuration Validation...');
    console.log('==========================================');

    try {
      // Load and validate global config
      await this.validateGlobalConfig();
      
      // Validate category configurations
      await this.validateCategoryConfigs();
      
      // Validate content structure
      await this.validateContentStructure();
      
      // Validate file references
      await this.validateFileReferences();
      
      // Report results
      this.reportResults();
      
    } catch (error) {
      console.error('💥 Validation failed with error:');
      console.error(`   ${error.message}`);
      process.exit(1);
    }
  }

  /**
   * Validate global configuration file
   */
  async validateGlobalConfig() {
    console.log('📋 Validating global configuration...');

    // Check if config file exists
    if (!fs.existsSync(this.configPath)) {
      this.addError('Global config file not found', `Missing file: ${this.configPath}`);
      return;
    }

    try {
      // Parse YAML
      const configContent = fs.readFileSync(this.configPath, 'utf8');
      this.globalConfig = yaml.parse(configContent);
    } catch (error) {
      this.addError('Invalid YAML syntax', `Config file: ${error.message}`);
      return;
    }

    // Define required fields with validation rules
    const requiredFields = {
      brand_name: { type: 'string', required: true },
      app_store_link: { type: 'string', required: true, format: 'url' },
      global_cta_text: { type: 'string', required: true, minLength: 5 },
      footer_text: { type: 'string', required: true },
      base_url: { type: 'string', required: true, format: 'url' },
      default_meta_description: { type: 'string', required: true, minLength: 50, maxLength: 160 }
    };

    const optionalFields = {
      default_title_suffix: { type: 'string' },
      default_og_image: { type: 'string', format: 'path' },
      privacy_policy_link: { type: 'string', format: 'path' },
      terms_link: { type: 'string', format: 'path' },
      contact_link: { type: 'string', format: 'path' },
      about_link: { type: 'string', format: 'path' },
      twitter_handle: { type: 'string', pattern: /^@[A-Za-z0-9_]{1,15}$/ },
      instagram_handle: { type: 'string', pattern: /^@[A-Za-z0-9_.]{1,30}$/ },
      facebook_page: { type: 'string', format: 'url' },
      google_analytics_id: { type: 'string', pattern: /^(GA-|G-)[A-Z0-9-]+$/ },
      pagination_size: { type: 'number', min: 1, max: 100 },
      excerpt_length: { type: 'number', min: 50, max: 300 },
      related_posts_count: { type: 'number', min: 1, max: 10 }
    };

    // Validate required fields
    for (const [field, rules] of Object.entries(requiredFields)) {
      this.validateField(field, this.globalConfig[field], rules, true);
    }

    // Validate optional fields (if present)
    for (const [field, rules] of Object.entries(optionalFields)) {
      if (this.globalConfig[field] !== undefined) {
        this.validateField(field, this.globalConfig[field], rules, false);
      }
    }

    // Validate organization data for structured data
    this.validateOrganizationData();

    console.log('   ✅ Global configuration validated');
  }

  /**
   * Validate individual field based on rules
   */
  validateField(fieldName, value, rules, isRequired) {
    // Check if required field is missing
    if (isRequired && (value === undefined || value === null || value === '')) {
      this.addError('Missing required field', `Field '${fieldName}' is required`);
      return;
    }

    // Skip validation if field is optional and not present
    if (!isRequired && (value === undefined || value === null)) {
      return;
    }

    // Type validation
    if (rules.type && typeof value !== rules.type) {
      this.addError('Invalid field type', `Field '${fieldName}' should be ${rules.type}, got ${typeof value}`);
      return;
    }

    // String length validation
    if (rules.type === 'string') {
      if (rules.minLength && value.length < rules.minLength) {
        this.addError('String too short', `Field '${fieldName}' should be at least ${rules.minLength} characters`);
      }
      if (rules.maxLength && value.length > rules.maxLength) {
        this.addError('String too long', `Field '${fieldName}' should be at most ${rules.maxLength} characters`);
      }
    }

    // Number range validation
    if (rules.type === 'number') {
      if (rules.min && value < rules.min) {
        this.addError('Number too small', `Field '${fieldName}' should be at least ${rules.min}`);
      }
      if (rules.max && value > rules.max) {
        this.addError('Number too large', `Field '${fieldName}' should be at most ${rules.max}`);
      }
    }

    // Format validation
    if (rules.format === 'url') {
      try {
        new URL(value);
      } catch {
        this.addError('Invalid URL format', `Field '${fieldName}' should be a valid URL`);
      }
    }

    if (rules.format === 'path') {
      if (!value.startsWith('/')) {
        this.addWarning('Path format', `Field '${fieldName}' should start with '/' for absolute paths`);
      }
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(value)) {
      this.addError('Invalid format', `Field '${fieldName}' does not match required pattern`);
    }
  }

  /**
   * Validate organization data for structured data
   */
  validateOrganizationData() {
    const orgFields = ['organization_name', 'organization_logo', 'organization_url'];
    const hasAnyOrgField = orgFields.some(field => this.globalConfig[field]);
    
    if (hasAnyOrgField) {
      orgFields.forEach(field => {
        if (!this.globalConfig[field]) {
          this.addWarning('Incomplete organization data', `Consider adding '${field}' for better structured data`);
        }
      });
    }

    // Validate social profiles array
    if (this.globalConfig.organization_social_profiles) {
      if (!Array.isArray(this.globalConfig.organization_social_profiles)) {
        this.addError('Invalid social profiles', 'organization_social_profiles should be an array');
      } else {
        this.globalConfig.organization_social_profiles.forEach((url, index) => {
          try {
            new URL(url);
          } catch {
            this.addError('Invalid social profile URL', `Social profile at index ${index} is not a valid URL`);
          }
        });
      }
    }
  }

  /**
   * Validate category configuration files
   */
  async validateCategoryConfigs() {
    console.log('📁 Validating category configurations...');

    const contentDir = path.join(this.projectRoot, 'content');
    if (!fs.existsSync(contentDir)) {
      this.addWarning('Content directory', 'Content directory does not exist yet');
      return;
    }

    const categoryConfigs = await this.findCategoryConfigs(contentDir);
    
    for (const configPath of categoryConfigs) {
      await this.validateCategoryConfig(configPath);
    }

    console.log(`   ✅ Validated ${categoryConfigs.length} category configurations`);
  }

  /**
   * Find all category configuration files
   */
  async findCategoryConfigs(dir) {
    const configs = [];
    
    const findConfigs = async (currentDir) => {
      const items = await fs.readdir(currentDir);
      
      for (const item of items) {
        const itemPath = path.join(currentDir, item);
        const stat = await fs.stat(itemPath);
        
        if (stat.isDirectory()) {
          // Check for _category.yml in this directory
          const categoryFile = path.join(itemPath, '_category.yml');
          if (await fs.pathExists(categoryFile)) {
            configs.push(categoryFile);
          }
          // Recursively search subdirectories
          await findConfigs(itemPath);
        }
      }
    };

    await findConfigs(dir);
    return configs;
  }

  /**
   * Validate individual category configuration
   */
  async validateCategoryConfig(configPath) {
    try {
      const content = await fs.readFile(configPath, 'utf8');
      const config = yaml.parse(content);
      
      // Define expected category fields
      const categoryFields = {
        title: { type: 'string', required: true },
        description: { type: 'string', required: true, minLength: 50 },
        slug: { type: 'string', required: true, pattern: /^[a-z0-9-]+$/ },
        location_name: { type: 'string' },
        cuisine_type: { type: 'string' },
        cta_text: { type: 'string' }
      };

      for (const [field, rules] of Object.entries(categoryFields)) {
        this.validateField(`${path.relative(this.projectRoot, configPath)}:${field}`, config[field], rules, rules.required);
      }

    } catch (error) {
      this.addError('Category config error', `${path.relative(this.projectRoot, configPath)}: ${error.message}`);
    }
  }

  /**
   * Validate content structure
   */
  async validateContentStructure() {
    console.log('📄 Validating content structure...');

    const contentDir = path.join(this.projectRoot, 'content');
    if (!fs.existsSync(contentDir)) {
      this.addWarning('Content structure', 'Content directory does not exist yet');
      return;
    }

    // Check for required directories
    const requiredDirs = ['templates', 'scripts'];
    for (const dir of requiredDirs) {
      const dirPath = path.join(this.projectRoot, dir);
      if (!fs.existsSync(dirPath)) {
        this.addError('Missing directory', `Required directory '${dir}' not found`);
      }
    }

    console.log('   ✅ Content structure validated');
  }

  /**
   * Validate file references in configuration
   */
  async validateFileReferences() {
    console.log('🔗 Validating file references...');

    const fileFields = [
      'default_og_image',
      'organization_logo'
    ];

    for (const field of fileFields) {
      const filePath = this.globalConfig[field];
      if (filePath) {
        // Convert relative paths to absolute
        const absolutePath = filePath.startsWith('/') 
          ? path.join(this.projectRoot, 'assets', filePath.substring(1))
          : path.join(this.projectRoot, filePath);

        if (!await fs.pathExists(absolutePath)) {
          this.addWarning('Missing file reference', `File referenced in '${field}' not found: ${filePath}`);
        }
      }
    }

    console.log('   ✅ File references validated');
  }

  /**
   * Add error to the collection
   */
  addError(category, message) {
    this.errors.push({ category, message });
  }

  /**
   * Add warning to the collection
   */
  addWarning(category, message) {
    this.warnings.push({ category, message });
  }

  /**
   * Report validation results
   */
  reportResults() {
    console.log('==========================================');
    console.log('📊 Validation Results');
    console.log('==========================================');

    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('🎉 All validations passed! Configuration is perfect.');
      return;
    }

    // Report errors
    if (this.errors.length > 0) {
      console.log(`❌ Found ${this.errors.length} error(s):`);
      this.errors.forEach((error, index) => {
        console.log(`   ${index + 1}. [${error.category}] ${error.message}`);
      });
      console.log();
    }

    // Report warnings
    if (this.warnings.length > 0) {
      console.log(`⚠️  Found ${this.warnings.length} warning(s):`);
      this.warnings.forEach((warning, index) => {
        console.log(`   ${index + 1}. [${warning.category}] ${warning.message}`);
      });
      console.log();
    }

    // Exit with error code if there are errors
    if (this.errors.length > 0) {
      console.log('💥 Validation failed. Please fix the errors above.');
      process.exit(1);
    } else {
      console.log('✅ Validation completed with warnings only.');
    }
  }
}

// Run validation if this script is executed directly
if (require.main === module) {
  const validator = new ConfigValidator();
  validator.validate().catch(error => {
    console.error('💥 Validation script failed:', error.message);
    process.exit(1);
  });
}

module.exports = ConfigValidator;