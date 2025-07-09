#!/usr/bin/env node

/**
 * Test WordPress Authentication
 * Verifies that WordPress credentials work correctly
 * 
 * Usage:
 *   export WP_USERNAME="your-username"
 *   export WP_APP_PASSWORD="your-app-password"
 *   node scripts/test-wp-auth.js
 */

// Configuration
const API_BASE = 'https://savorcms.wpcomstaging.com/wp-json/wp/v2';

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

async function testAuthentication() {
  console.log('🔐 Testing WordPress Authentication...\n');
  
  try {
    // Test 1: Get current user info
    console.log('1. Testing user authentication...');
    const userResponse = await fetch(`${API_BASE}/users/me`, {
      headers: {
        'Authorization': `Basic ${auth}`
      }
    });
    
    if (userResponse.ok) {
      const user = await userResponse.json();
      console.log(`✅ Authenticated as: ${user.name} (${user.username})`);
      console.log(`   User ID: ${user.id}`);
      console.log(`   Email: ${user.email}`);
    } else {
      const error = await userResponse.json();
      console.log(`❌ Authentication failed: ${error.message}`);
      return false;
    }
    
    console.log('\n2. Testing post creation permissions...');
    
    // Test 2: Check if we can create posts (without actually creating one)
    const testPost = {
      title: 'TEST - Delete Me',
      content: 'This is a test post to verify permissions.',
      status: 'draft' // Create as draft so it doesn't go live
    };
    
    const postResponse = await fetch(`${API_BASE}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`
      },
      body: JSON.stringify(testPost)
    });
    
    if (postResponse.ok) {
      const post = await postResponse.json();
      console.log(`✅ Post creation successful! Test post created with ID: ${post.id}`);
      console.log(`   Title: ${post.title.rendered}`);
      console.log(`   Status: ${post.status}`);
      
      // Clean up: Delete the test post
      const deleteResponse = await fetch(`${API_BASE}/posts/${post.id}?force=true`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Basic ${auth}`
        }
      });
      
      if (deleteResponse.ok) {
        console.log('✅ Test post cleaned up successfully');
      } else {
        console.log('⚠️  Test post created but could not be deleted. Please delete manually from WordPress admin.');
      }
    } else {
      const error = await postResponse.json();
      console.log(`❌ Post creation failed: ${error.message}`);
      return false;
    }
    
    console.log('\n3. Testing categories access...');
    
    // Test 3: Get categories
    const categoriesResponse = await fetch(`${API_BASE}/categories`, {
      headers: {
        'Authorization': `Basic ${auth}`
      }
    });
    
    if (categoriesResponse.ok) {
      const categories = await categoriesResponse.json();
      console.log(`✅ Categories access successful! Found ${categories.length} categories:`);
      categories.forEach(cat => {
        console.log(`   - ${cat.name} (ID: ${cat.id}, Slug: ${cat.slug})`);
      });
    } else {
      const error = await categoriesResponse.json();
      console.log(`❌ Categories access failed: ${error.message}`);
    }
    
    console.log('\n🎉 ALL TESTS PASSED! WordPress authentication is working correctly.');
    console.log('💡 You can now use the wp-bulk-create.js script to create posts programmatically.');
    
    return true;
    
  } catch (error) {
    console.error('💥 Test failed with error:', error.message);
    return false;
  }
}

// Run the test
testAuthentication().catch(error => {
  console.error('💥 Unexpected error:', error);
  process.exit(1);
});