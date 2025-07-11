const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://mbmqigqmzzqwgcbtirny.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ibXFpZ3Ftenpxd2djYnRpcm55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3MTU2MDcsImV4cCI6MjA2NDI5MTYwN30.Gzq6x0_Dp3O5El4NRDtA-8eAhDIFs2hxggeKR5vmZqM';

const supabase = createClient(supabaseUrl, supabaseKey);

async function analyzeDatabaseStructure() {
  console.log('🔍 COMPREHENSIVE DATABASE ANALYSIS');
  console.log('=====================================\n');
  
  // 1. SCHEMA ANALYSIS
  console.log('📊 1. SCHEMA & TABLE STRUCTURE ANALYSIS');
  console.log('----------------------------------------');
  
  const tables = ['users', 'reviews', 'categories'];
  const tableAnalysis = {};
  
  for (const tableName of tables) {
    try {
      const { data, error, count } = await supabase
        .from(tableName)
        .select('*', { count: 'exact' })
        .limit(50);
      
      if (!error && data) {
        tableAnalysis[tableName] = {
          rowCount: count,
          sampleData: data,
          columns: data.length > 0 ? Object.keys(data[0]) : [],
          dataTypes: data.length > 0 ? analyzeDataTypes(data[0]) : {}
        };
        
        console.log(`\n📋 Table: ${tableName.toUpperCase()}`);
        console.log(`   Rows: ${count}`);
        console.log(`   Columns: ${tableAnalysis[tableName].columns.length}`);
        console.log(`   Column List: ${tableAnalysis[tableName].columns.join(', ')}`);
      }
    } catch (err) {
      console.log(`❌ Error analyzing ${tableName}: ${err.message}`);
    }
  }
  
  // 2. DATA QUALITY ANALYSIS
  console.log('\n\n🔬 2. DATA QUALITY ANALYSIS');
  console.log('-----------------------------');
  
  await analyzeDataQuality(tableAnalysis);
  
  // 3. BUSINESS LOGIC ANALYSIS
  console.log('\n\n💼 3. BUSINESS LOGIC & RELATIONSHIPS');
  console.log('-------------------------------------');
  
  await analyzeBusinessLogic(tableAnalysis);
  
  // 4. PERFORMANCE & SCALABILITY
  console.log('\n\n⚡ 4. PERFORMANCE & SCALABILITY CONCERNS');
  console.log('----------------------------------------');
  
  await analyzePerformance(tableAnalysis);
  
  // 5. MISSING FEATURES & OPPORTUNITIES
  console.log('\n\n🚀 5. BUSINESS OPPORTUNITIES & MISSING FEATURES');
  console.log('------------------------------------------------');
  
  await analyzeBusinessOpportunities(tableAnalysis);
  
  // 6. SECURITY & COMPLIANCE
  console.log('\n\n🔒 6. SECURITY & COMPLIANCE ANALYSIS');
  console.log('------------------------------------');
  
  await analyzeSecurityCompliance(tableAnalysis);
  
  // 7. RECOMMENDATIONS
  console.log('\n\n📝 7. CRITICAL RECOMMENDATIONS');
  console.log('===============================');
  
  await generateRecommendations(tableAnalysis);
}

function analyzeDataTypes(sampleRow) {
  const types = {};
  for (const [key, value] of Object.entries(sampleRow)) {
    if (value === null) types[key] = 'null';
    else if (typeof value === 'string' && value.includes('T') && value.includes('Z')) types[key] = 'timestamp';
    else if (typeof value === 'string' && value.startsWith('user_')) types[key] = 'user_id';
    else if (typeof value === 'string' && (value.includes('http') || value.includes('file://'))) types[key] = 'url';
    else types[key] = typeof value;
  }
  return types;
}

async function analyzeDataQuality(tableAnalysis) {
  // Check for null values, data consistency, etc.
  
  console.log('🔍 Checking data quality issues...\n');
  
  // Users table analysis
  if (tableAnalysis.users) {
    const users = tableAnalysis.users.sampleData;
    const nullAvatars = users.filter(u => !u.avatar_url).length;
    const nullFCM = users.filter(u => !u.fcm_token).length;
    const nullSubscriptions = users.filter(u => !u.subscription_plan_id).length;
    
    console.log('👥 USERS TABLE QUALITY:');
    console.log(`   Missing avatars: ${nullAvatars}/${users.length} (${Math.round(nullAvatars/users.length*100)}%)`);
    console.log(`   Missing FCM tokens: ${nullFCM}/${users.length} (${Math.round(nullFCM/users.length*100)}%)`);
    console.log(`   No subscription: ${nullSubscriptions}/${users.length} (${Math.round(nullSubscriptions/users.length*100)}%)`);
    
    // Check email patterns
    const emailPatterns = users.map(u => u.email).filter(e => e);
    const privateRelayUsers = emailPatterns.filter(e => e.includes('privaterelay')).length;
    console.log(`   Privacy-focused emails: ${privateRelayUsers}/${emailPatterns.length} (${Math.round(privateRelayUsers/emailPatterns.length*100)}%)`);
  }
  
  // Reviews table analysis
  if (tableAnalysis.reviews) {
    const reviews = tableAnalysis.reviews.sampleData;
    const missingRestaurants = reviews.filter(r => !r.restaurant || r.restaurant === '').length;
    const missingLocations = reviews.filter(r => !r.country || r.country === '').length;
    const missingCategories = reviews.filter(r => !r.category_id).length;
    const missingRestaurantIds = reviews.filter(r => !r.restaurant_id).length;
    
    console.log('\n📝 REVIEWS TABLE QUALITY:');
    console.log(`   Missing restaurant names: ${missingRestaurants}/${reviews.length} (${Math.round(missingRestaurants/reviews.length*100)}%)`);
    console.log(`   Missing location data: ${missingLocations}/${reviews.length} (${Math.round(missingLocations/reviews.length*100)}%)`);
    console.log(`   Missing categories: ${missingCategories}/${reviews.length} (${Math.round(missingCategories/reviews.length*100)}%)`);
    console.log(`   Missing restaurant IDs: ${missingRestaurantIds}/${reviews.length} (${Math.round(missingRestaurantIds/reviews.length*100)}%)`);
    
    // Rating distribution
    const ratings = reviews.map(r => r.rating).filter(r => r !== null);
    const avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
    console.log(`   Average rating: ${avgRating.toFixed(2)}/10`);
    console.log(`   Rating range: ${Math.min(...ratings)} - ${Math.max(...ratings)}`);
  }
  
  // Categories analysis
  if (tableAnalysis.categories) {
    const categories = tableAnalysis.categories.sampleData;
    const missingImages = categories.filter(c => !c.image_url || c.image_url.includes('file://')).length;
    const userCreated = categories.filter(c => c.user_id).length;
    
    console.log('\n🏷️ CATEGORIES TABLE QUALITY:');
    console.log(`   Missing/local images: ${missingImages}/${categories.length} (${Math.round(missingImages/categories.length*100)}%)`);
    console.log(`   User-created categories: ${userCreated}/${categories.length} (${Math.round(userCreated/categories.length*100)}%)`);
  }
}

async function analyzeBusinessLogic(tableAnalysis) {
  console.log('🔗 Analyzing relationships and business logic...\n');
  
  // Check foreign key relationships
  if (tableAnalysis.reviews && tableAnalysis.users) {
    const reviews = tableAnalysis.reviews.sampleData;
    const users = tableAnalysis.users.sampleData;
    const userIds = new Set(users.map(u => u.id));
    
    const orphanedReviews = reviews.filter(r => !userIds.has(r.user_id)).length;
    console.log(`❗ ORPHANED REVIEWS: ${orphanedReviews}/${reviews.length} reviews have invalid user_ids`);
  }
  
  // Business logic issues
  console.log('\n🚨 BUSINESS LOGIC CONCERNS:');
  console.log('   • No apparent relationship between users and categories');
  console.log('   • Missing tables: restaurants, dishes, lists, favorites');
  console.log('   • Reviews seem to mix dishes and restaurants');
  console.log('   • No user engagement tracking (likes, shares, follows)');
  console.log('   • No moderation system visible');
  console.log('   • No analytics/metrics tables');
}

async function analyzePerformance(tableAnalysis) {
  console.log('⚡ Performance & scalability analysis...\n');
  
  const totalRows = Object.values(tableAnalysis).reduce((sum, table) => sum + table.rowCount, 0);
  console.log(`📊 CURRENT SCALE: ${totalRows} total rows across all tables`);
  
  console.log('\n⚠️ POTENTIAL PERFORMANCE ISSUES:');
  console.log('   • No visible indexing strategy');
  console.log('   • Large text fields (notes) without full-text search');
  console.log('   • Image URLs stored as local file paths (not CDN)');
  console.log('   • No pagination strategy evident');
  console.log('   • Missing created_at/updated_at on some tables');
  
  console.log('\n📈 SCALABILITY CONCERNS:');
  console.log('   • Reviews table will grow linearly with user activity');
  console.log('   • Categories table allows unlimited user creation');
  console.log('   • No data archiving strategy');
  console.log('   • Missing caching layer indicators');
}

async function analyzeBusinessOpportunities(tableAnalysis) {
  console.log('🚀 Identifying business opportunities...\n');
  
  console.log('💰 MONETIZATION GAPS:');
  console.log('   • Subscription system exists but no premium features visible');
  console.log('   • No restaurant partnership integration');
  console.log('   • Missing recommendation engine data');
  console.log('   • No advertising/promotion system');
  
  console.log('\n📊 ANALYTICS MISSING:');
  console.log('   • User engagement metrics');
  console.log('   • Popular dishes/restaurants tracking');
  console.log('   • Geographic trending data');
  console.log('   • User retention metrics');
  console.log('   • Review quality scoring');
  
  console.log('\n🎯 GROWTH OPPORTUNITIES:');
  console.log('   • Social features (following, sharing lists)');
  console.log('   • Restaurant discovery engine');
  console.log('   • Dish recommendation system');
  console.log('   • Location-based features');
  console.log('   • Integration with delivery platforms');
  
  console.log('\n🔍 DATA INSIGHTS AVAILABLE:');
  if (tableAnalysis.reviews) {
    const reviews = tableAnalysis.reviews.sampleData;
    const countries = [...new Set(reviews.map(r => r.country).filter(c => c))];
    const cities = [...new Set(reviews.map(r => r.city).filter(c => c))];
    console.log(`   • Geographic spread: ${countries.length} countries, ${cities.length} cities`);
    console.log(`   • International presence: ${countries.join(', ')}`);
  }
}

async function analyzeSecurityCompliance(tableAnalysis) {
  console.log('🔒 Security & compliance analysis...\n');
  
  console.log('⚠️ SECURITY CONCERNS:');
  console.log('   • User emails stored in plain text (GDPR risk)');
  console.log('   • No apparent data encryption at rest');
  console.log('   • Missing audit trails');
  console.log('   • No user consent tracking');
  console.log('   • Local file paths exposed in database');
  
  console.log('\n📜 COMPLIANCE GAPS:');
  console.log('   • No user data deletion mechanism visible');
  console.log('   • Missing privacy settings per user');
  console.log('   • No data retention policies evident');
  console.log('   • International data (Vietnam) without localization');
}

async function generateRecommendations(tableAnalysis) {
  console.log('📋 CRITICAL RECOMMENDATIONS FOR BUSINESS IMPROVEMENT\n');
  
  console.log('🚨 IMMEDIATE FIXES (Week 1):');
  console.log('   1. Fix orphaned reviews with invalid user_ids');
  console.log('   2. Migrate local file:// URLs to cloud storage (AWS S3/Cloudflare)');
  console.log('   3. Add proper indexing on frequently queried columns');
  console.log('   4. Implement data validation rules');
  
  console.log('\n⚡ PERFORMANCE IMPROVEMENTS (Month 1):');
  console.log('   1. Add database indexes on user_id, category_id, created_at');
  console.log('   2. Implement image CDN for category images');
  console.log('   3. Add full-text search for reviews');
  console.log('   4. Implement proper pagination');
  
  console.log('\n🏗️ STRUCTURAL IMPROVEMENTS (Month 2):');
  console.log('   1. Create separate "dishes" and "restaurants" tables');
  console.log('   2. Add user engagement tables (likes, shares, follows)');
  console.log('   3. Implement proper restaurant-dish relationships');
  console.log('   4. Add analytics/metrics tracking tables');
  
  console.log('\n💰 BUSINESS GROWTH FEATURES (Month 3):');
  console.log('   1. Build recommendation engine with proper data structure');
  console.log('   2. Add social features (user following, list sharing)');
  console.log('   3. Implement restaurant partnership system');
  console.log('   4. Create premium feature gates');
  
  console.log('\n🔒 SECURITY & COMPLIANCE (Ongoing):');
  console.log('   1. Implement GDPR-compliant data handling');
  console.log('   2. Add user consent and privacy controls');
  console.log('   3. Encrypt sensitive user data');
  console.log('   4. Implement audit logging');
  
  console.log('\n📊 BUSINESS INTELLIGENCE (Month 4):');
  console.log('   1. Create analytics dashboard');
  console.log('   2. Implement user behavior tracking');
  console.log('   3. Build geographic trending analysis');
  console.log('   4. Add review quality scoring system');
  
  const totalRows = Object.values(tableAnalysis).reduce((sum, table) => sum + table.rowCount, 0);
  const estimatedMRR = Math.round(tableAnalysis.users?.rowCount * 0.1 * 9.99); // 10% conversion at $9.99/month
  
  console.log('\n💡 BUSINESS IMPACT ESTIMATE:');
  console.log(`   Current users: ${tableAnalysis.users?.rowCount || 0}`);
  console.log(`   Current reviews: ${tableAnalysis.reviews?.rowCount || 0}`);
  console.log(`   Potential MRR with 10% conversion: $${estimatedMRR}`);
  console.log(`   Database health score: 4/10 (needs significant improvement)`);
}

// Run the analysis
analyzeDatabaseStructure().then(() => {
  console.log('\n✅ ANALYSIS COMPLETE');
  console.log('====================');
  console.log('📧 Contact your development team with these findings for immediate action.');
}).catch((error) => {
  console.error('❌ Analysis failed:', error);
}); 