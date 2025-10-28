// app/(i18n)/[lang]/(public)/category/[slug]/page.tsx
import { getDictionary } from "@/lib/i18n";
import { createPublicServerClient } from "@/lib/supabase-public";
import { ProductCard } from "@/components/ProductCard";
import { notFound } from "next/navigation";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);
  const supabase = createPublicServerClient();

  const { data: cat } = await supabase
    .from("categories")
    .select("id,name_en,name_es,slug")
    .eq("slug", slug)
    .single();
  if (!cat) notFound();

  const { data: products } = await supabase
    .from("products")
    .select("id,slug,name_en,name_es,price_cents,primary_image_url,is_active")
    .eq("is_active", true)
    .eq("category_id", cat.id)
    .order("sort", { ascending: true });

  const title = lang === "es" ? cat.name_es : cat.name_en;

  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.length ? (
          products.map((p: any) => (
            <ProductCard key={p.id} product={p} lang={lang as "en" | "es"} />
          ))
        ) : (
          <p className="text-gray-600">{dict.common.catalog.empty}</p>
        )}
      </div>
    </section>
  );
}
