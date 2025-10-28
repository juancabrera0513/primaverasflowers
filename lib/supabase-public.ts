// lib/supabase-public.ts
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

export function createPublicServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient<Database>(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, detectSessionInUrl: false },
  });
}
