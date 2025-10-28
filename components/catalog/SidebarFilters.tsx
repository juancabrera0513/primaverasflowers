// components/catalog/SidebarFilters.tsx
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PRICE_RANGES, SORT_OPTIONS, SortKey } from "@/lib/catalog-filters";
import { useState } from "react";

type Cat = { id: string; slug: string; name_en: string; name_es: string };

export default function SidebarFilters({
  lang,
  categories,
}: {
  lang: "en" | "es";
  categories: Cat[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [openMobile, setOpenMobile] = useState(false);

  const t = {
    filters: lang === "es" ? "Filtros" : "Filters",
    searchPh: lang === "es" ? "Buscar en catálogo" : "Search catalog",
    categories: lang === "es" ? "Categorías" : "Categories",
    price: lang === "es" ? "Precio" : "Price",
    sort: lang === "es" ? "Ordenar" : "Sort",
    all: lang === "es" ? "Todas" : "All",
    clear: lang === "es" ? "Limpiar" : "Clear",
    apply: lang === "es" ? "Aplicar" : "Apply",
  };

  const q = sp.get("q") ?? "";
  const currentCat = sp.get("category") ?? "";
  const currentPrice = sp.get("price") ?? "";
  const currentSort = (sp.get("sort") as SortKey) ?? "featured";

  function push(params: URLSearchParams) {
    router.push(`${pathname}?${params.toString()}`, { scroll: true });
  }

  function setParam(key: string, value?: string) {
    const params = new URLSearchParams(sp.toString());
    if (!value) params.delete(key);
    else params.set(key, value);
    push(params);
  }

  function submitSearch(formData: FormData) {
    const input = (formData.get("q") as string) ?? "";
    setParam("q", input.trim() || undefined);
    setOpenMobile(false);
  }

  function resetAll() {
    router.push(pathname, { scroll: true });
    setOpenMobile(false);
  }

  const Panel = (
    <div className="card p-4 lg:sticky lg:top-[96px] w-[min(92vw,280px)]">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold" style={{ color: "var(--fg)" }}>
          {t.filters}
        </h3>
        <button onClick={resetAll} className="text-sm underline">
          {t.clear}
        </button>
      </div>

      {/* Search */}
      <form action={submitSearch} className="mb-4">
        <div className="relative">
          <input
            name="q"
            defaultValue={q}
            placeholder={t.searchPh}
            className="input pl-10"
          />
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 opacity-70"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <button type="submit" className="btn btn-primary mt-2 w-full">
          {t.apply}
        </button>
      </form>

      {/* Categories */}
      <div className="mb-4">
        <h4 className="font-semibold mb-2">{t.categories}</h4>
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => setParam("category", undefined)}
              className={`w-full text-left px-2 py-1 rounded hover:bg-[rgba(193,184,167,.25)] ${
                !currentCat ? "bg-[rgba(193,184,167,.35)]" : ""
              }`}
            >
              {t.all}
            </button>
          </li>
          {categories.map((c) => (
            <li key={c.id}>
              <button
                onClick={() => setParam("category", c.slug)}
                className={`w-full text-left px-2 py-1 rounded hover:bg-[rgba(193,184,167,.25)] ${
                  currentCat === c.slug ? "bg-[rgba(193,184,167,.35)]" : ""
                }`}
                title={lang === "es" ? c.name_es : c.name_en}
              >
                {lang === "es" ? c.name_es : c.name_en}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price */}
      <div className="mb-4">
        <h4 className="font-semibold mb-2">{t.price}</h4>
        <select
          className="input"
          value={currentPrice}
          onChange={(e) => setParam("price", e.target.value || undefined)}
        >
          <option value="">{t.all}</option>
          {PRICE_RANGES.map((p) => (
            <option key={p.id} value={p.id}>
              {lang === "es" ? p.label_es : p.label_en}
            </option>
          ))}
        </select>
      </div>

      {/* Sort */}
      <div>
        <h4 className="font-semibold mb-2">{t.sort}</h4>
        <select
          className="input"
          value={currentSort}
          onChange={(e) => setParam("sort", e.target.value as SortKey)}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.id} value={o.id}>
              {lang === "es" ? o.label_es : o.label_en}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile trigger */}
      <div className="lg:hidden mb-4">
        <button
          className="btn btn-outline"
          onClick={() => setOpenMobile((v) => !v)}
        >
          {t.filters}
        </button>
      </div>

      {/* Mobile panel */}
      {openMobile && (
        <div className="lg:hidden mb-4">{Panel}</div>
      )}

      {/* Desktop panel */}
      <div className="hidden lg:block">{Panel}</div>
    </>
  );
}
