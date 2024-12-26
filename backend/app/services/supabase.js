const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
console.log(supabaseUrl)
console.log("supabse.js")
console.log(supabaseKey)
if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL and KEY must be provided in the .env file');
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
