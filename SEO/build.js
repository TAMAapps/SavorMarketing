#!/usr/bin/env node

/**
 * Build Script for Savor Programmatic SEO System
 * 
 * This script handles the build process including:
 * - YAML parsing for global configuration
 * - Build validation and error handling
 * - Environment-specific configurations
 * - Pre and post-build tasks
 */

const yaml = require('yaml');
const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const ConfigValidator = require('./scripts/validate-config.js');

class SavorBuildSystem {
  constructor() {
    this.projectRoot = __dirname;
    this.configPath = path.join(this.projectRoot, '_config.yml');
    this.globalConfig = {};
    this.buildStartTime = Date.now();
  }

  /**
   * Load and parse global configuration from _config.yml
   */
  loadGlobalConfig() {
    console.log('🔧 Loading global configuration...');
    
    try {
      if (!fs.existsSync(this.configPath)) {
        throw new Error(`Global config file not found: ${this.configPath}`);
      }

      const configContent = fs.readFileSync(this.configPath, 'utf8');
      this.globalConfig = yaml.parse(configContent);
      
      // Validate required fields
      const requiredFields = ['brand_name', 'app_store_link', 'global_cta_text', 'footer_text'];
      const missingFields = requiredFields.filter(field => !this.globalConfig[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required global config fields: ${missingFields.join(', ')}`);
      }

      console.log(`✅ Global config loaded successfully`);
      console.log(`   Brand: ${this.globalConfig.brand_name}`);
      console.log(`   Base URL: ${this.globalConfig.base_url}`);
      
      return this.globalConfig;
    } catch (error) {
      console.error('❌ Failed to load global configuration:');
      console.error(`   ${error.message}`);
      process.exit(1);
    }
  }

  /**
   * Validate YAML syntax in all configuration files
   */
  validateYamlFiles() {
    console.log('🔍 Validating YAML files...');
    
    const yamlFiles = [
      this.configPath,
      ...this.findCategoryConfigs()
    ];

    let hasErrors = false;

    yamlFiles.forEach(filePath => {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        yaml.parse(content);
        console.log(`   ✅ ${path.relative(this.projectRoot, filePath)}`);
      } catch (error) {
        console.error(`   ❌ ${path.relative(this.projectRoot, filePath)}: ${error.message}`);
        hasErrors = true;
      }
    });

    if (hasErrors) {
      console.error('❌ YAML validation failed. Fix errors before building.');
      process.exit(1);
    }

    console.log('✅ All YAML files are valid');
  }

  /**
   * Find all category configuration files
   */
  findCategoryConfigs() {
    const contentDir = path.join(this.projectRoot, 'content');
    const categoryConfigs = [];

    if (!fs.existsSync(contentDir)) {
      return categoryConfigs;
    }

    const findConfigs = (dir) => {
      const items = fs.readdirSync(dir);
      
      items.forEach(item => {
        const itemPath = path.join(dir, item);
        const stat = fs.statSync(itemPath);
        
        if (stat.isDirectory()) {
          // Check for _category.yml in this directory
          const categoryFile = path.join(itemPath, '_category.yml');
          if (fs.existsSync(categoryFile)) {
            categoryConfigs.push(categoryFile);
          }
          // Recursively search subdirectories
          findConfigs(itemPath);
        }
      });
    };

    findConfigs(contentDir);
    return categoryConfigs;
  }

  /**
   * Run pre-build tasks
   */
  async preBuild() {
    console.log('🚀 Starting pre-build tasks...');
    
    // Run comprehensive configuration validation
    await this.runConfigValidation();
    
    // Load and validate global config
    this.loadGlobalConfig();
    
    // Validate all YAML files
    this.validateYamlFiles();
    
    // Ensure output directory exists
    const distDir = path.join(this.projectRoot, 'dist');
    fs.ensureDirSync(distDir);
    
    console.log('✅ Pre-build tasks completed');
  }

  /**
   * Run comprehensive configuration validation
   */
  async runConfigValidation() {
    console.log('🔧 Running configuration validation...');
    
    try {
      const validator = new ConfigValidator();
      await validator.validate();
      console.log('✅ Configuration validation passed');
    } catch (error) {
      // ConfigValidator handles its own error reporting and exit
      // This catch is just in case of unexpected errors
      console.error('❌ Configuration validation failed unexpectedly:', error.message);
      process.exit(1);
    }
  }

  /**
   * Run the main build process
   */
  build() {
    console.log('🏗️  Running Eleventy build...');
    
    try {
      const buildCommand = process.env.NODE_ENV === 'production' 
        ? 'npx eleventy --quiet'
        : 'npx eleventy';
      
      execSync(buildCommand, { 
        stdio: 'inherit',
        cwd: this.projectRoot 
      });
      
      console.log('✅ Build completed successfully');
    } catch (error) {
      console.error('❌ Build failed:');
      console.error(`   ${error.message}`);
      process.exit(1);
    }
  }

  /**
   * Run post-build tasks
   */
  postBuild() {
    console.log('🔧 Running post-build tasks...');
    
    // Get build statistics
    const distDir = path.join(this.projectRoot, 'dist');
    const stats = this.getBuildStats(distDir);
    
    console.log('📊 Build Statistics:');
    console.log(`   Files generated: ${stats.fileCount}`);
    console.log(`   Total size: ${stats.totalSize}`);
    console.log(`   Build time: ${Date.now() - this.buildStartTime}ms`);
    
    console.log('✅ Post-build tasks completed');
  }

  /**
   * Get build statistics
   */
  getBuildStats(distDir) {
    let fileCount = 0;
    let totalSize = 0;

    const countFiles = (dir) => {
      if (!fs.existsSync(dir)) return;
      
      const items = fs.readdirSync(dir);
      
      items.forEach(item => {
        const itemPath = path.join(dir, item);
        const stat = fs.statSync(itemPath);
        
        if (stat.isDirectory()) {
          countFiles(itemPath);
        } else {
          fileCount++;
          totalSize += stat.size;
        }
      });
    };

    countFiles(distDir);
    
    return {
      fileCount,
      totalSize: this.formatBytes(totalSize)
    };
  }

  /**
   * Format bytes to human readable string
   */
  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Run the complete build process
   */
  async run() {
    console.log('🚀 Starting Savor SEO Build System...');
    console.log('=====================================');
    
    try {
      await this.preBuild();
      this.build();
      this.postBuild();
      
      console.log('=====================================');
      console.log('🎉 Build completed successfully!');
    } catch (error) {
      console.error('=====================================');
      console.error('💥 Build failed!');
      console.error(`   ${error.message}`);
      process.exit(1);
    }
  }
}

// Run the build if this script is executed directly
if (require.main === module) {
  const buildSystem = new SavorBuildSystem();
  buildSystem.run().catch(error => {
    console.error('💥 Build system failed:', error.message);
    process.exit(1);
  });
}

module.exports = SavorBuildSystem; 