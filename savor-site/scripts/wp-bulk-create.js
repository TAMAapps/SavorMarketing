#!/usr/bin/env node

/**
 * WordPress Bulk Post Creation Script
 * Creates posts in WordPress.com via REST API
 * 
 * Usage:
 *   node scripts/wp-bulk-create.js data/sample-posts.json
 * 
 * Environment Variables:
 *   WP_USERNAME - WordPress.com username
 *   WP_APP_PASSWORD - WordPress.com Application Password
 */

import fs from 'fs';
import path from 'path';

// Configuration
const API_BASE = 'https://savorcms.wpcomstaging.com/wp-json/wp/v2';
const RATE_LIMIT_DELAY = 2000; // 2 seconds between requests (WordPress.com rate limiting)

// Get credentials from environment
const WP_USERNAME = process.env.WP_USERNAME;
const WP_APP_PASSWORD = process.env.WP_APP_PASSWORD;

if (!WP_USERNAME || !WP_APP_PASSWORD) {
  console.error('❌ Missing WordPress credentials!');
  console.error('Please set environment variables:');
  console.error('  export WP_USERNAME="your-username"');
  console.error('  export WP_APP_PASSWORD="your-app-password"');
  process.exit(1);
}

// Create authentication header
const auth = Buffer.from(`${WP_USERNAME}:${WP_APP_PASSWORD}`).toString('base64');

/**
 * Create a single post in WordPress
 */
async function createPost(postData) {
  try {
    console.log(`📝 Creating post: "${postData.title}"`);
    
    const response = await fetch(`${API_BASE}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP ${response.status}: ${errorData.message || 'Unknown error'}`);
    }

    const result = await response.json();
    console.log(`✅ Created: "${result.title.rendered}" (ID: ${result.id})`);
    console.log(`   URL: ${result.link}`);
    console.log(`   Slug: ${result.slug}`);
    
    return result;
  } catch (error) {
    console.error(`❌ Failed to create post "${postData.title}":`, error.message);
    throw error;
  }
}

/**
 * Add delay between requests to respect rate limits
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Bulk create posts with rate limiting
 */
async function bulkCreatePosts(posts) {
  console.log(`🚀 Starting bulk creation of ${posts.length} posts...\n`);
  
  const results = [];
  const errors = [];
  
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    
    try {
      console.log(`[${i + 1}/${posts.length}]`);
      const result = await createPost(post);
      results.push(result);
      
      // Add delay between requests (except for the last one)
      if (i < posts.length - 1) {
        console.log(`⏳ Waiting ${RATE_LIMIT_DELAY / 1000}s before next request...\n`);
        await delay(RATE_LIMIT_DELAY);
      }
    } catch (error) {
      errors.push({
        post: post.title,
        error: error.message
      });
    }
  }
  
  // Summary
  console.log('\n📊 BULK CREATION SUMMARY');
  console.log('========================');
  console.log(`✅ Successfully created: ${results.length} posts`);
  console.log(`❌ Failed: ${errors.length} posts`);
  
  if (errors.length > 0) {
    console.log('\n❌ ERRORS:');
    errors.forEach((err, index) => {
      console.log(`${index + 1}. ${err.post}: ${err.error}`);
    });
  }
  
  if (results.length > 0) {
    console.log('\n✅ CREATED POSTS:');
    results.forEach((result, index) => {
      console.log(`${index + 1}. ${result.title.rendered} → /blog/${result.slug}`);
    });
  }
  
  return { results, errors };
}

/**
 * Load and validate JSON file
 */
function loadPostsFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const posts = JSON.parse(fileContent);
    
    if (!Array.isArray(posts)) {
      throw new Error('JSON file must contain an array of posts');
    }
    
    // Validate each post has required fields
    posts.forEach((post, index) => {
      if (!post.title) {
        throw new Error(`Post ${index + 1} missing required field: title`);
      }
      if (!post.content) {
        throw new Error(`Post ${index + 1} missing required field: content`);
      }
    });
    
    console.log(`📂 Loaded ${posts.length} posts from ${filePath}`);
    return posts;
  } catch (error) {
    console.error(`❌ Error loading posts file:`, error.message);
    process.exit(1);
  }
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('❌ Usage: node wp-bulk-create.js <posts-file.json>');
    console.error('Example: node wp-bulk-create.js data/sample-posts.json');
    process.exit(1);
  }
  
  const filePath = args[0];
  const posts = loadPostsFile(filePath);
  
  try {
    await bulkCreatePosts(posts);
    console.log('\n🎉 Bulk creation completed!');
    console.log('💡 Tip: Your new posts will appear on https://savortheapp.com/blog/ after the next deployment');
  } catch (error) {
    console.error('\n💥 Bulk creation failed:', error.message);
    process.exit(1);
  }
}

// Run the script
main().catch(error => {
  console.error('💥 Unexpected error:', error);
  process.exit(1);
});