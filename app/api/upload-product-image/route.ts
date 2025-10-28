import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

export async function POST(req: Request) {
  const supabase = createServerClient();
  const form = await req.formData();
  const file = form.get("file") as File;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const ext = file.name.split(".").pop();
  const path = `prod_${Date.now()}.${ext}`;
  const arrayBuf = await file.arrayBuffer();

  // @ts-ignore
  const { data, error } = await supabase.storage.from("products").upload(path, Buffer.from(arrayBuf), { contentType: file.type, upsert: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: pub } = supabase.storage.from("products").getPublicUrl(data.path);
  return NextResponse.json({ path: data.path, publicUrl: pub.publicUrl });
}
