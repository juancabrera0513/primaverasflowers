// lib/supabase-client.ts
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Usa el cliente PÚBLICO (anon). Sin sesiones ni cookies.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!url || !anon) {
  // Lanzamos un error claro en tiempo de arranque si faltan envs
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in environment."
  );
}

/**
 * Singleton para usar en server components/route handlers
 * cuando NO necesitas el contexto de auth del usuario.
 */
const supabasePublic: SupabaseClient = createClient(url, anon, {
  auth: { persistSession: false, autoRefreshToken: false },
});

export default supabasePublic;

/**
 * Creador “stateless” por si quieres instancias separadas en server
 * (no usa cookies, sólo anon key).
 */
export function createPublicServerClient(): SupabaseClient {
  return createClient(url, anon, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
