// ضع بيانات مشروع Supabase هنا
const SUPABASE_URL = "https://maexfqpoxcbxzsmutzbv.supabase.co";
const SUPABASE_ANON_KEY = "ضع_مفتاح_النشر_anon_key_هنا";

// لا تضع service_role key في ملفات الموقع.

if (window.supabase && SUPABASE_ANON_KEY && !SUPABASE_ANON_KEY.startsWith("ضع_")) { window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY); }
