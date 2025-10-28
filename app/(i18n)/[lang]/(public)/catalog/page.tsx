// app/(i18n)/[lang]/(public)/catalog/page.tsx
import { getDictionary, isLang, type Lang } from "@/lib/i18n";
import ProductCard from "@/components/ProductCard";
import ClearAllButton from "@/components/ClearAllButton";
import {
  PRICE_RANGES,
  SORT_OPTIONS,
  parsePriceRange,
  type SortKey,
} from "@/lib/catalog-filters";
import Link from "next/link";
import {
  getCategories,
  getProducts,
  getProductCategoryMap,
  type ProductLite,
} from "@/lib/data";

export const revalidate = 60;

type Search = { price?: string | null; sort?: SortKey | null; cat?: string | null };
type CategoryLite = { id: string; slug: string; name_en: string; name_es: string };

export default async function CatalogPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams?: Promise<Search> | Search;
}) {
  const { lang } = await params;
  const sp = (await searchParams) ?? {};
  const locale: Lang = isLang(lang) ? lang : "en";
  const dict = await getDictionary(locale);

  const priceId = (sp.price ?? undefined) as string | undefined;
  const sortKey = ((sp.sort as SortKey) || "featured") as SortKey;
  const catSlug = (sp.cat ?? undefined) as string | undefined;
  const priceRange = parsePriceRange(priceId);

  // Data (con fallback a mocks si algo falla)
  const [categories, allProducts, prodCatMap] = await Promise.all([
    getCategories(),
    getProducts(),
    getProductCategoryMap(),
  ]);

  // Filtro por categoría
  let products: ProductLite[] = allProducts;
  if (catSlug) {
    products = products.filter((p) => prodCatMap.get(p.id)?.has(catSlug));
  }

  // Filtro por precio
  if (priceRange) {
    const min = typeof priceRange.min === "number" ? priceRange.min : null;
    const max = typeof priceRange.max === "number" ? priceRange.max : null;
    products = products.filter((p) => {
      const cents = p.price_cents ?? 0;
      if (min != null && cents < min) return false;
      if (max != null && cents > max) return false;
      return true;
    });
  }

  // Orden
  products = [...products];
  switch (sortKey) {
    case "price_asc":
      products.sort((a, b) => (a.price_cents ?? 0) - (b.price_cents ?? 0));
      break;
    case "price_desc":
      products.sort((a, b) => (b.price_cents ?? 0) - (a.price_cents ?? 0));
      break;
    case "newest":
    default:
      break;
  }

  // Helper: construir URL preservando/limpiando params cuando se pasa null
  const buildHref = (qs: Partial<Search>) => {
    const url = new URLSearchParams();

    const nextPrice =
      Object.prototype.hasOwnProperty.call(qs, "price")
        ? (qs.price === null ? undefined : qs.price || undefined)
        : priceId;

    const nextSort =
      Object.prototype.hasOwnProperty.call(qs, "sort")
        ? (qs.sort === null ? undefined : qs.sort || undefined)
        : sortKey;

    const nextCat =
      Object.prototype.hasOwnProperty.call(qs, "cat")
        ? (qs.cat === null ? undefined : qs.cat || undefined)
        : catSlug;

    if (nextCat) url.set("cat", nextCat);
    if (nextPrice) url.set("price", nextPrice);
    if (nextSort && nextSort !== "featured") url.set("sort", nextSort);

    const tail = url.toString();
    return `/${locale}/catalog${tail ? `?${tail}` : ""}`;
  };

  // Clear-all: siempre ruta limpia sin params
  const clearAllHref = `/${locale}/catalog`;

  return (
    <div className="container-narrow pb-16">
      <div className="py-8 md:py-10">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          {dict.catalog?.title ?? "Catalog"}
        </h1>
        <p className="mt-2 text-neutral-600">
          {dict.catalog?.subtitle ?? "Fresh arrangements, ready for same-day delivery."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[280px,minmax(0,1fr)] gap-6 md:gap-8">
        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Header del sidebar con Clear all */}
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-700">
              {locale === "es" ? "Filtros" : "Filters"}
            </h2>
            <ClearAllButton lang={locale} />
          </div>

          {/* Categorías */}
          {categories.length > 0 && (
            <section>
              <h3 className="text-sm font-semibold tracking-wide text-neutral-700 mb-2">
                {locale === "es" ? "Categorías" : "Categories"}
              </h3>
              <div className="flex flex-wrap md:flex-col gap-2">
                {categories.map((c: CategoryLite) => {
                  const cname = locale === "es" ? c.name_es ?? c.name_en : c.name_en ?? c.name_es;
                  const active = catSlug === c.slug;
                  const href = buildHref({ cat: active ? null : c.slug }); // toggle
                  return (
                    <Link
                      key={c.id}
                      href={href}
                      className={`px-3 h-9 rounded-xl border text-sm inline-flex items-center ${
                        active
                          ? "bg-neutral-900 text-white border-neutral-900"
                          : "bg-white hover:bg-neutral-50 border-neutral-300"
                      }`}
                    >
                      {cname}
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Precio */}
          <section>
            <h3 className="text-sm font-semibold tracking-wide text-neutral-700 mb-2">
              {locale === "es" ? "Precio" : "Price"}
            </h3>
            <div className="flex flex-wrap md:flex-col gap-2">
              {PRICE_RANGES.map((r) => {
                const active = priceId === r.id;
                const label = locale === "es" ? r.label_es : r.label_en;
                const href = buildHref({ price: active ? null : r.id }); // toggle
                return (
                  <Link
                    key={r.id}
                    href={href}
                    className={`px-3 h-9 rounded-xl border text-sm inline-flex items-center ${
                      active
                        ? "bg-neutral-900 text-white border-neutral-900"
                        : "bg-white hover:bg-neutral-50 border-neutral-300"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Orden */}
          <section>
            <h3 className="text-sm font-semibold tracking-wide text-neutral-700 mb-2">
              {locale === "es" ? "Ordenar" : "Sort"}
            </h3>
            <div className="flex flex-wrap md:flex-col gap-2">
              {SORT_OPTIONS.map((opt) => {
                const active = sortKey === opt.id;
                const label = locale === "es" ? opt.label_es : opt.label_en;
                const href = buildHref({ sort: active ? "featured" : opt.id }); // toggle hacia featured
                return (
                  <Link
                    key={opt.id}
                    href={href}
                    className={`px-3 h-9 rounded-xl border text-sm inline-flex items-center ${
                      active
                        ? "bg-neutral-900 text-white border-neutral-900"
                        : "bg-white hover:bg-neutral-50 border-neutral-300"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Clear all secundario (opcional) */}
          <div className="pt-1">
            <Link
              href={clearAllHref}
              className="inline-flex h-9 items-center rounded-xl border px-3 text-xs hover:bg-neutral-50"
              prefetch={false}
            >
              {locale === "es" ? "Limpiar todo" : "Clear all"}
            </Link>
          </div>
        </aside>

        {/* Grid */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} lang={locale} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
