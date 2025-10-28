// app/(i18n)/[lang]/(public)/category/[slug]/page.tsx
import { getDictionary, isLang, type Lang } from "@/lib/i18n";
import { createPublicServerClient } from "@/lib/supabase-public";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";

// Ajusta si quieres otra cadencia de ISR
export const revalidate = 60;

// Tipos locales (no forzamos genéricos en .from())
type CategoryRow = {
  id: string | number;
  slug: string;
  name?: string | null;
  name_en?: string | null;
  name_es?: string | null;
};

type ProductRow = {
  id: string | number;
  slug?: string | null;
  price?: number | null;
  currency?: string | null;
  category_slug?: string | null;
  category_id?: string | number | null;
  // Campos varios que espera <ProductCard>
  name?: string | null;
  name_en?: string | null;
  name_es?: string | null;
  short_description?: string | null;
  description_en?: string | null;
  description_es?: string | null;
  image?: string | null;
  image_url?: string | null;
  thumbnail_url?: string | null;
  images?: string[] | null;
  [key: string]: unknown;
};

function toLocale(lang: string): Lang {
  return isLang(lang) ? (lang as Lang) : "en";
}

export default async function CategoryPage({
  params,
}: {
  params: { lang: string; slug: string };
}) {
  const { lang, slug } = params;
  const locale = toLocale(lang);

  const dict = await getDictionary(locale);
  const supabase = createPublicServerClient();

  // 1) Categoría por slug (SIN genéricos en .from(); tipamos al final)
  const catRes = await supabase
    .from("categories")
    .select("id, slug, name, name_en, name_es")
    .eq("slug", slug)
    .maybeSingle();

  if (catRes.error) {
    // Evita filtrar detalles de DB
    notFound();
  }

  const category = (catRes.data ?? null) as CategoryRow | null;
  if (!category) {
    notFound();
  }

  // 2) Productos por categoría (primero por category_slug)
  const bySlugRes = await supabase
    .from("products")
    .select("*")
    .eq("category_slug", slug)
    .order("created_at", { ascending: false });

  let products = (bySlugRes.data ?? []) as ProductRow[];

  // Si nada por slug, intentar por category_id
  if (products.length === 0 && category.id != null) {
    const byIdRes = await supabase
      .from("products")
      .select("*")
      .eq("category_id", category.id)
      .order("created_at", { ascending: false });

    if (!byIdRes.error && Array.isArray(byIdRes.data)) {
      products = byIdRes.data as ProductRow[];
    }
  }

  // 3) Título localizado con fallbacks seguros
  const rawTitle =
    (locale === "es"
      ? category.name_es ?? category.name
      : category.name_en ?? category.name) || category.slug;

  const pageTitle = typeof rawTitle === "string" ? rawTitle : String(rawTitle);

  const emptyMsg =
    (dict?.common?.catalog?.empty as string | undefined) ??
    (locale === "es" ? "No hay productos en esta categoría." : "No products in this category.");

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl md:text-4xl font-bold tracking-tight">{pageTitle}</h1>

      {products.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={String(p.id)} product={p} lang={locale} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">{emptyMsg}</p>
      )}
    </section>
  );
}
