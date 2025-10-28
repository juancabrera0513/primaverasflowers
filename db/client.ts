import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

// Importante: este client es SERVER-ONLY (no lo importes en Client Components)
const sql = postgres(process.env.DATABASE_URL, {
  max: 1,
  prepare: true,
  idle_timeout: 10,
});

export const db = drizzle(sql);
