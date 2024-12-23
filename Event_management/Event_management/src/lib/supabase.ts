import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || supabaseUrl === 'your_supabase_url_here') {
  throw new Error(
    'Missing VITE_SUPABASE_URL. Please set it in your .env file with your Supabase project URL.'
  );
}

if (!supabaseKey || supabaseKey === 'your_supabase_anon_key_here') {
  throw new Error(
    'Missing VITE_SUPABASE_ANON_KEY. Please set it in your .env file with your Supabase anon/public key.'
  );
}

// Validate URL format
try {
  new URL(supabaseUrl);
} catch (error) {
  throw new Error(
    'Invalid VITE_SUPABASE_URL. Please ensure it is a valid URL starting with https://'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);