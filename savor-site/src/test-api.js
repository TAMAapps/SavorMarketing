// Test script for WordPress API client
// Run with: node src/test-api.js

const API_BASE = 'https://savorcms.wpcomstaging.com/wp-json/wp/v2';

async function testWordPressApi() {
  console.log('🧪 Testing WordPress API connectivity...\n');
  
  try {
    // Test 1: Fetch categories
    console.log('📂 Testing categories endpoint...');
    const categoriesResponse = await fetch(`${API_BASE}/categories`);
    const categories = await categoriesResponse.json();
    
    if (categoriesResponse.ok) {
      console.log('✅ Categories fetched successfully!');
      console.log(`Found ${categories.length} categories:`);
      categories.forEach(cat => {
        console.log(`  - ${cat.name} (ID: ${cat.id}, Slug: ${cat.slug})`);
      });
    } else {
      console.log('❌ Categories fetch failed:', categories);
    }
    
    console.log('\n');
    
    // Test 2: Fetch posts
    console.log('📝 Testing posts endpoint...');
    const postsResponse = await fetch(`${API_BASE}/posts?per_page=5`);
    const posts = await postsResponse.json();
    
    if (postsResponse.ok) {
      console.log('✅ Posts fetched successfully!');
      console.log(`Found ${posts.length} posts:`);
      posts.forEach(post => {
        console.log(`  - ${post.title.rendered} (Slug: ${post.slug})`);
      });
    } else {
      console.log('❌ Posts fetch failed:', posts);
    }
    
    console.log('\n');
    
    // Test 3: Test Restaurant Reviews category specifically
    const restaurantCategory = categories.find(cat => cat.slug === 'restaurant-reviews');
    if (restaurantCategory) {
      console.log('🍽️ Testing Restaurant Reviews category posts...');
      const restaurantPostsResponse = await fetch(`${API_BASE}/posts?categories=${restaurantCategory.id}`);
      const restaurantPosts = await restaurantPostsResponse.json();
      
      if (restaurantPostsResponse.ok) {
        console.log(`✅ Found ${restaurantPosts.length} Restaurant Reviews posts`);
        restaurantPosts.forEach(post => {
          console.log(`  - ${post.title.rendered}`);
        });
      } else {
        console.log('❌ Restaurant Reviews posts fetch failed:', restaurantPosts);
      }
    }
    
    console.log('\n🎉 API testing complete!');
    
  } catch (error) {
    console.error('❌ API test failed:', error);
  }
}

testWordPressApi();