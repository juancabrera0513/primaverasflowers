import Link from "next/link";
import { isLang, getDictionary, type Lang } from "@/lib/i18n";
import { getProducts, getCategories, type ProductLite } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export const revalidate = 60;

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Lang = isLang(lang) ? lang : "en";
  const dict = await getDictionary(locale);

  // --- Carga de productos con fallback ---
  let products: ProductLite[] = [];
  try {
    products = (await getProducts()) ?? [];
  } catch {
    products = [];
  }

  
  const featured = products.slice(0, 8);
  const categories = await getCategories().catch(() => []);

  const t = {
    heroTitle:
      locale === "es" ? "Flores frescas, entrega el mismo día" : "Fresh flowers, same-day delivery",
    heroSub:
      locale === "es"
        ? "Arreglos cuidadosamente diseñados para cumpleaños, agradecimientos y condolencias."
        : "Thoughtfully designed arrangements for birthdays, thank-yous and sympathy.",
    ctaPrimary: locale === "es" ? "Ver Catálogo" : "Shop Catalog",
    ctaSecondary: locale === "es" ? "Conócenos" : "About Us",
    badges: [
      locale === "es" ? "Entrega el mismo día" : "Same-day delivery",
      locale === "es" ? "Hecho a mano" : "Handcrafted",
      locale === "es" ? "Entrega local" : "Local delivery",
    ],
    shopByCat: locale === "es" ? "Compra por categoría" : "Shop by category",
    featuredTitle: locale === "es" ? "Destacados" : "Featured Products",
    featuredSub:
      locale === "es" ? "Los favoritos de nuestros clientes." : "Customer favorites from our shop.",
    empty:
      locale === "es"
        ? "No hay productos disponibles en este momento."
        : "No products available right now.",
    viewAll: locale === "es" ? "Ver todo" : "View all",
  };

  return (
    <div className="pb-16">
      {/* HERO */}
      <section className="relative">
        <div className="container-narrow py-12 md:py-16">
          <div className="max-w-3xl">
          

            <h1 className="mt-4 text-3xl md:text-5xl font-semibold leading-tight tracking-tight">
              {t.heroTitle.split(",")[0]}
              <span className="font-extrabold" style={{ color: "var(--brand-700,#9C5A49)" }}>
                {", " + t.heroTitle.split(",")[1]?.trim()}
              </span>
            </h1>

            <p className="mt-4 text-lg md:text-xl">{t.heroSub}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/catalog`}
                className="btn-primary"
              >
                {t.ctaPrimary}
              </Link>
              <Link
                href={`/${locale}/about`}
                className="btn-ghost"
              >
                {t.ctaSecondary}
              </Link>
            </div>

            <ul className="mt-6 flex flex-wrap gap-2 text-xs">
              {t.badges.map((b) => (
                <li key={b} className="chip">
                  ✿ {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      {categories.length > 0 && (
        <section className="container-narrow pt-8 md:pt-12">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-lg md:text-xl font-semibold tracking-tight">{t.shopByCat}</h2>
            <Link
              href={`/${locale}/catalog`}
              className="hidden md:inline-flex h-9 items-center rounded-xl border px-3 text-sm hover:bg-neutral-50"
            >
              {t.viewAll}
            </Link>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {categories.slice(0, 10).map((c) => {
              const label = locale === "es" ? c.name_es ?? c.name_en : c.name_en ?? c.name_es;
              return (
                <Link
                  key={c.id}
                  href={`/${locale}/catalog?cat=${encodeURIComponent(c.slug)}`}
                  className="chip"
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* FEATURED */}
      <section className="container-narrow pt-10 md:pt-12">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              {t.featuredTitle}
            </h2>
            <p className="mt-2">{t.featuredSub}</p>
          </div>
          <Link
            href={`/${locale}/catalog`}
            className="hidden md:inline-flex h-9 items-center rounded-xl border px-3 text-sm hover:bg-neutral-50"
          >
            {t.viewAll}
          </Link>
        </div>

        {featured.length === 0 ? (
          <div className="mt-6 panel px-4 py-6">{t.empty}</div>
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} lang={locale} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
