// lib/supabase-server.ts
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "./types";

export function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
    );
  }

  // 👇 Pasa la función cookies SIN llamarla (sin paréntesis)
  return createServerComponentClient<Database>(
    { cookies },               // <— aquí está la clave
    { supabaseUrl, supabaseKey }
  );
}
