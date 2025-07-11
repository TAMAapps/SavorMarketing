const { createClient } = require('@supabase/supabase-js');

// Supabase configuration from .env - NEW PROJECT
const supabaseUrl = 'https://mbmqigqmzzqwgcbtirny.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ibXFpZ3Ftenpxd2djYnRpcm55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3MTU2MDcsImV4cCI6MjA2NDI5MTYwN30.Gzq6x0_Dp3O5El4NRDtA-8eAhDIFs2hxggeKR5vmZqM';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSupabaseData() {
  console.log('🔗 Connecting to Supabase project...');
  console.log(`URL: ${supabaseUrl}`);
  
  try {
    // Test basic connection
    console.log('\n🧪 Testing connection...');
    
    // Try to access a table that definitely doesn't exist to see the error
    const { data: testData, error: testError } = await supabase
      .from('definitely_does_not_exist_table_123')
      .select('*')
      .limit(1);
    
    if (testError) {
      console.log('✅ Connection successful!');
      console.log(`📋 Error for non-existent table: "${testError.message}"`);
    }
    
    // Try to get tables using a different approach - check for auth tables first
    console.log('\n🔍 Checking for existing tables...');
    
    // Check auth tables (these usually exist in Supabase projects)
    const authTables = ['auth.users'];
    
    try {
      const { data: authData, error: authError } = await supabase
        .from('auth.users')
        .select('count')
        .limit(1);
      
      if (!authError) {
        console.log('✅ Auth system is set up');
      }
    } catch (err) {
      console.log('📋 Auth tables not accessible with anon key (normal)');
    }
    
    // Check for common app tables
    const commonTables = [
      'users', 'profiles', 'dishes', 'restaurants', 'reviews', 'lists', 
      'favorites', 'ratings', 'categories', 'locations', 'user_preferences',
      'dish_ratings', 'restaurant_ratings', 'user_lists', 'shared_lists'
    ];
    
    let tablesFound = [];
    let tablesWithData = [];
    
    for (const tableName of commonTables) {
      try {
        const { data, error, count } = await supabase
          .from(tableName)
          .select('*', { count: 'exact' })
          .limit(5);
        
        if (error) {
          if (error.message.includes('does not exist') || error.code === '42P01') {
            // Table doesn't exist - skip silently
          } else {
            console.log(`❓ Table '${tableName}' - Error: ${error.message}`);
          }
        } else {
          console.log(`✅ Table '${tableName}' EXISTS - ${count || 0} rows`);
          tablesFound.push(tableName);
          
          if (data && data.length > 0) {
            tablesWithData.push({ name: tableName, data, count });
          }
        }
      } catch (err) {
        // Skip silently
      }
    }
    
    // Summary
    console.log(`\n📊 Database Summary:`);
    if (tablesFound.length === 0) {
      console.log('🗃️ No application tables found - this appears to be an empty project.');
    } else {
      console.log(`📋 Found ${tablesFound.length} table(s): ${tablesFound.join(', ')}`);
      
      if (tablesWithData.length > 0) {
        console.log(`\n📄 Tables with data:`);
        for (const table of tablesWithData) {
          console.log(`\n🔸 ${table.name} (${table.count} rows):`);
          console.log(`   Columns: ${Object.keys(table.data[0]).join(', ')}`);
          console.log(`   Sample data:`);
          table.data.slice(0, 2).forEach((row, index) => {
            console.log(`     Row ${index + 1}:`, JSON.stringify(row, null, 2));
          });
        }
      } else {
        console.log('📭 All tables are empty.');
      }
    }
    
  } catch (error) {
    console.error('❌ Connection error:', error.message);
  }
}

// Run the check
checkSupabaseData().then(() => {
  console.log('\n✅ Supabase check completed!');
}).catch((error) => {
  console.error('❌ Script failed:', error);
}); 