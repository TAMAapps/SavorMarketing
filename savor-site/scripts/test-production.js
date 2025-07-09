#!/usr/bin/env node

/**
 * Test Production Environment Variables
 * This script tests if Vercel environment variables are working
 */

console.log('🧪 Testing Production Environment Variables...\n');

// Check if environment variables are available
console.log('Environment check:');
console.log('- WP_USERNAME:', process.env.WP_USERNAME ? '✅ Set' : '❌ Missing');
console.log('- WP_APP_PASSWORD:', process.env.WP_APP_PASSWORD ? '✅ Set' : '❌ Missing');
console.log('- NODE_ENV:', process.env.NODE_ENV || 'development');

if (process.env.WP_USERNAME && process.env.WP_APP_PASSWORD) {
  console.log('\n✅ Environment variables are properly configured!');
  console.log('🚀 Ready to create posts in production!');
} else {
  console.log('\n❌ Environment variables missing.');
  console.log('Make sure they are set in Vercel dashboard.');
}

console.log('\n📝 To create the test post:');
console.log('node scripts/wp-bulk-create.js data/test-production.json');