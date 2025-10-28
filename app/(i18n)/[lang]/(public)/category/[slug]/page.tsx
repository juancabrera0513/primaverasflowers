// app/(i18n)/[lang]/(public)/category/[slug]/page.tsx
import { getDictionary, isLang, type Lang } from "@/lib/i18n";
import { createPublicServerClient } from "@/lib/supabase-public";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";

// Opcional: ISR para refrescar cada 60s
export const revalidate = 60;

/** Tipos mínimos locales (no imponemos el esquema real de tu DB) */
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
  // el resto de campos puede variar según tu DB
  [key: string]: unknown;
};

/** El tipo que espera ProductCard (tu contrato actual) */
type ProductCardProduct = {
  id: string;
  slug: string;
  name_en: string;
  name_es: string;
  price_cents: number;
  primary_image_url?: string | null;
};

function toLocale(lang: string): Lang {
  return isLang(lang) ? (lang as Lang) : "en";
}

/** Helpers de “type-safe” para leer valores flexibles sin usar `any` */
function asRecord(obj: unknown): Record<string, unknown> {
  return (obj ?? {}) as Record<string, unknown>;
}
function num(x: unknown): number | undefined {
  return typeof x === "number" ? x : undefined;
}
function str(x: unknown): string | undefined {
  return typeof x === "string" ? x : undefined;
}
function arr(x: unknown): unknown[] | undefined {
  return Array.isArray(x) ? x : undefined;
}

/** Adapter: ProductRow -> ProductCardProduct */
function toCardProduct(p: ProductRow): ProductCardProduct {
  const r = asRecord(p);

  // precio: usa price_cents si existe; si no, convierte price (USD) a cents
  const priceCents =
    num(r.price_cents) ??
    (num(r.price) !== undefined ? Math.round((num(r.price) as number) * 100) : 0);

  // imagen: intenta varios campos comunes
  const primaryImage =
    str(r.primary_image_url) ??
    str(r.image_url) ??
    str(r.image) ??
    str(r.main_image) ??
    str(r.photo) ??
    (arr(r.images)?.length ? str(arr(r.images)![0]) ?? null : null) ??
    null;

  // nombres y slug
  const id = String(r.id ?? "");
  const slug = str(r.slug) ?? id;
  const name_en = str(r.name_en) ?? str(r.name) ?? "";
  const name_es = str(r.name_es) ?? str(r.name) ?? "";

  return {
    id,
    slug,
    name_en,
    name_es,
    price_cents: priceCents ?? 0,
    primary_image_url: primaryImage,
  };
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

  // 1) Categoría por slug (sin genéricos en .from() para evitar conflictos con el cliente tipado)
  const catRes = await supabase
    .from("categories")
    .select("id, slug, name, name_en, name_es")
    .eq("slug", slug)
    .maybeSingle();

  if (catRes.error) notFound();
  const category = (catRes.data ?? null) as CategoryRow | null;
  if (!category) notFound();

  // 2) Productos por categoría: primero por category_slug, fallback a category_id
  const bySlugRes = await supabase
    .from("products")
    .select("*")
    .eq("category_slug", slug)
    .order("created_at", { ascending: false });

  let products = (bySlugRes.data ?? []) as ProductRow[];

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

  // 3) Título localizado
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
          {products.map((p) => {
            const view = toCardProduct(p);
            return <ProductCard key={view.id} product={view} lang={locale} />;
          })}
        </div>
      ) : (
        <p className="text-muted-foreground">{emptyMsg}</p>
      )}
    </section>
  );
}
