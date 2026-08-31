const SUPABASE_URL = "https://kzfmjzoksrjazzidkfy.supabase.co";

const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_5rUtMZvJwkztb8RFAMa0UQ_23wQBNwz";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);