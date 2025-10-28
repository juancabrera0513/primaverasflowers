// components/AddonSelector.tsx
"use client";

type Addon = { id: string; name_en: string; name_es: string; price_cents: number };

export default function AddonSelector({
  addons = [],
  selected = [],
  onChange,
  lang = "en",
}: {
  addons?: Addon[];
  selected?: string[];
  onChange?: (ids: string[]) => void;
  lang?: "en" | "es";
}) {
  if (!addons?.length) return null;

  const toggle = (id: string) => {
    const has = selected.includes(id);
    const next = has ? selected.filter((x) => x !== id) : [...selected, id];
    onChange?.(next);
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium" style={{ color: "var(--fg)" }}>
        {lang === "es" ? "Adicionales" : "Add-ons"}
      </p>
      <div className="flex flex-wrap gap-2">
        {addons.map((a) => {
          const picked = selected.includes(a.id);
          const price = (a.price_cents ?? 0) / 100;
          const label = lang === "es" ? a.name_es : a.name_en;
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => toggle(a.id)}
              className={`px-3 py-1.5 rounded-2xl border text-sm transition
              ${picked ? "bg-[var(--terracotta)] text-white border-transparent" : "border-[rgba(0,0,0,.12)] hover:bg-[rgba(0,0,0,.04)]"}`}
            >
              {label} (+${price.toFixed(2)})
            </button>
          );
        })}
      </div>
    </div>
  );
}
