// backend/config/supabaseConfig.js
const { createClient } = require('@supabase/supabase-js');

// Load environment variables from the .env file
require('dotenv').config();

// Get Supabase URL and API key from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
console.log(process.env.SUPABASE_URL);
console.log(process.env.SUPABASE_KEY);


// Create a Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
