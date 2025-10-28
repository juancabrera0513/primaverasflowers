// app/sitemap.ts
import { MetadataRoute } from "next";
import { createPublicServerClient } from "@/lib/supabase-public";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL!;
  const supabase = createPublicServerClient();
  const { data: products } = await supabase
    .from("products")
    .select("slug")
    .eq("is_active", true);

  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    { url: `${base}/en`, lastModified: now },
    { url: `${base}/es`, lastModified: now },
    { url: `${base}/en/catalog`, lastModified: now },
    { url: `${base}/es/catalog`, lastModified: now },
  ];

  const prodEntries: MetadataRoute.Sitemap =
    (products || []).flatMap((p: any) => [
      { url: `${base}/en/product/${p.slug}`, lastModified: now },
      { url: `${base}/es/product/${p.slug}`, lastModified: now },
    ]);

  return [...entries, ...prodEntries];
}
