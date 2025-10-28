// components/VariantSelector.tsx
"use client";

type Variant = { id: string; name: string; price_delta_cents: number; sort?: number };

export default function VariantSelector({
  variants = [],
  value,
  onChange,
  lang = "en",
}: {
  variants?: Variant[];
  value?: string | null;
  onChange?: (id: string | null) => void;
  lang?: "en" | "es";
}) {
  if (!variants?.length) return null;
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium" style={{ color: "var(--fg)" }}>
        {lang === "es" ? "Tamaño / Variante" : "Size / Variant"}
      </p>
      <div className="flex flex-wrap gap-2">
        {variants
          .slice()
          .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
          .map((v) => {
            const selected = value === v.id;
            const delta = (v.price_delta_cents ?? 0) / 100;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => onChange?.(selected ? null : v.id)}
                className={`px-3 py-1.5 rounded-2xl border text-sm transition
                ${selected ? "bg-[var(--olive)] text-white border-transparent" : "border-[rgba(0,0,0,.12)] hover:bg-[rgba(0,0,0,.04)]"}`}
              >
                {v.name}
                {delta ? ` (+$${delta.toFixed(2)})` : ""}
              </button>
            );
          })}
      </div>
    </div>
  );
}
