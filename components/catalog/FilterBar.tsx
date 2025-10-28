// components/catalog/FilterBar.tsx
"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { PRICE_RANGES, SORT_OPTIONS, parsePriceRange, SortKey } from "@/lib/catalog-filters";

export default function FilterBar({ lang, categories }:{
  lang:"en"|"es";
  categories: { id:string; slug:string; name_en:string; name_es:string; }[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const q = (key:string)=> sp.get(key) || "";
  const currentCategory = q("category");
  const currentPrice = q("price");
  const currentSort = (q("sort") as SortKey) || "featured";

  function setParam(key:string, value:string|undefined) {
    const params = new URLSearchParams(sp.toString());
    if (!value) { params.delete(key); }
    else { params.set(key, value); }
    router.push(`${pathname}?${params.toString()}`, { scroll:false });
  }

  function isActiveCategory(slug:string) { return slug === currentCategory; }

  const t = {
    category: lang==="es" ? "Categorías" : "Categories",
    price:    lang==="es" ? "Precio"     : "Price",
    sort:     lang==="es" ? "Ordenar"    : "Sort",
    all:      lang==="es" ? "Todos"      : "All",
  };

  return (
    <div className="sticky top-[64px] z-20 border-b" style={{ background:"var(--surface)", borderColor:"var(--border)" }}>
      <div className="container-narrow py-3 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        {/* Categorías como chips */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            className={`px-3 py-1.5 rounded-full border transition ${!currentCategory ? "bg-[var(--brand)] text-white border-transparent" : "border-[var(--border)]"}`}
            onClick={()=> setParam("category", undefined)}
          >
            {t.all}
          </button>
          {categories.map(c => (
            <button
              key={c.id}
              onClick={()=> setParam("category", c.slug)}
              className={`px-3 py-1.5 rounded-full border transition ${
                isActiveCategory(c.slug)
                  ? "bg-[var(--brand)] text-white border-transparent"
                  : "border-[var(--border)] hover:bg-[rgba(193,184,167,.25)]"
              }`}
              title={lang==="es"?c.name_es:c.name_en}
            >
              {lang==="es"?c.name_es:c.name_en}
            </button>
          ))}
        </div>

        {/* Precio + Sort */}
        <div className="flex items-center gap-2">
          <label className="text-sm" style={{ color:"var(--fg-muted)" }}>{t.price}</label>
          <select
            className="input !py-1.5 !h-9"
            value={currentPrice}
            onChange={(e)=> setParam("price", e.target.value || undefined)}
          >
            <option value="">{t.all}</option>
            {PRICE_RANGES.map(p=>(
              <option key={p.id} value={p.id}>
                {lang==="es"?p.label_es:p.label_en}
              </option>
            ))}
          </select>

          <label className="text-sm ml-2" style={{ color:"var(--fg-muted)" }}>{t.sort}</label>
          <select
            className="input !py-1.5 !h-9"
            value={currentSort}
            onChange={(e)=> setParam("sort", e.target.value as SortKey)}
          >
            {SORT_OPTIONS.map(o=>(
              <option key={o.id} value={o.id}>
                {lang==="es"?o.label_es:o.label_en}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
