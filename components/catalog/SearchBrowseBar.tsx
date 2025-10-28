// components/catalog/SearchBrowseBar.tsx
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Cat = { id: string; slug: string; name_en: string; name_es: string };

export default function SearchBrowseBar({
  lang,
  categories,
}: {
  lang: "en" | "es";
  categories: Cat[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const t = {
    searchPh: lang === "es" ? "Buscar en catálogo" : "Search Catalog",
    browseBy: lang === "es" ? "EXPLORAR:" : "BROWSE BY:",
    go: lang === "es" ? "Ir" : "Go",
    all: lang === "es" ? "Todos" : "All",
  };

  const q = sp.get("q") ?? "";
  const currentCat = sp.get("category") ?? "";

  function push(params: URLSearchParams) {
    router.push(`${pathname}?${params.toString()}`, { scroll: true });
  }

  function submitSearch(formData: FormData) {
    const input = (formData.get("q") as string) ?? "";
    const params = new URLSearchParams(sp.toString());
    if (input.trim()) params.set("q", input.trim());
    else params.delete("q");
    push(params);
  }

  function setCategory(slug?: string) {
    const params = new URLSearchParams(sp.toString());
    if (!slug) params.delete("category");
    else params.set("category", slug);
    push(params);
  }

  return (
    <div
      className="border-b"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
    >
      <div className="container-narrow py-3 flex items-center gap-4 flex-wrap">
        {/* Search */}
        <form
          action={submitSearch}
          className="flex items-stretch overflow-hidden rounded-xl border"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="relative">
            <input
              name="q"
              defaultValue={q}
              className="input !rounded-none !border-0 !bg-white pl-10 min-w-[250px]"
              placeholder={t.searchPh}
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
          <button
            className="px-4 font-semibold"
            style={{
              background: "var(--fg)",
              color: "#fff",
            }}
            type="submit"
          >
            {t.go}
          </button>
        </form>

        {/* Browse by */}
        <span
          className="uppercase text-xs tracking-widest"
          style={{ color: "var(--fg-muted)" }}
        >
          {t.browseBy}
        </span>

        {/* Category chips */}
        <button
          onClick={() => setCategory(undefined)}
          className={`px-3 py-1.5 rounded-full border transition ${
            !currentCat
              ? "bg-[var(--brand)] text-white border-transparent"
              : "border-[var(--border)] hover:bg-[rgba(193,184,167,.25)]"
          }`}
        >
          {t.all}
        </button>

        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.slug)}
            className={`px-3 py-1.5 rounded-full border transition ${
              currentCat === c.slug
                ? "bg-[var(--brand)] text-white border-transparent"
                : "border-[var(--border)] hover:bg-[rgba(193,184,167,.25)]"
            }`}
            title={lang === "es" ? c.name_es : c.name_en}
          >
            {lang === "es" ? c.name_es : c.name_en}
          </button>
        ))}
      </div>
    </div>
  );
}
