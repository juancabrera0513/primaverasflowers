import { redirect } from "next/navigation";
import { createServerClient } from "./supabase-server";

export async function requireAuth() {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/en");
  return user;
}

export async function requireStaffOrOwner() {
  const user = await requireAuth();
  const supabase = createServerClient();
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (!profile || !["owner","staff"].includes(profile.role)) redirect("/en");
}
