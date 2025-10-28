import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

export async function POST(req: Request) {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (!profile || !["owner","staff"].includes(profile.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const payload = await req.json();
  const { error } = await supabase.from("products").insert({
    name_en: payload.name_en,
    name_es: payload.name_es,
    slug: payload.slug,
    description_en: payload.description_en ?? "",
    description_es: payload.description_es ?? "",
    price_cents: payload.price_cents,
    primary_image_url: payload.primary_image_url ?? null,
    is_active: !!payload.is_active
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
