import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const fallbackSupabaseUrl = "https://placeholder.supabase.co";
const fallbackSupabaseAnonKey = "placeholder-anon-key";

export const supabase = createClient(
  supabaseUrl || fallbackSupabaseUrl,
  supabaseAnonKey || fallbackSupabaseAnonKey
);
