// lib/client.ts
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Carga desde tu .env.local
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Cliente “público” (rol anon) para usar en Server Components / rutas.
 * No persiste sesión (no cookies) y es seguro para lectura pública.
 */
export function createPublicServerClient(): SupabaseClient {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error(
      "[supabase] Falta NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
