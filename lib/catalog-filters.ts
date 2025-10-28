// lib/catalog-filters.ts
export type SortKey = "featured" | "price_asc" | "price_desc" | "newest";

export const PRICE_RANGES = [
  { id: "0-50",    label_en: "$0 – $50",       label_es: "$0 – $50",       min: 0,   max: 5000 },
  { id: "50-80",   label_en: "$50 – $80",      label_es: "$50 – $80",      min: 5000, max: 8000 },
  { id: "80-120",  label_en: "$80 – $120",     label_es: "$80 – $120",     min: 8000, max: 12000 },
  { id: "120-200", label_en: "$120 – $200",    label_es: "$120 – $200",    min: 12000, max: 20000 },
  { id: "200p",    label_en: "$200+",          label_es: "$200+",          min: 20000, max: null },
];

export const SORT_OPTIONS: { id: SortKey; label_en: string; label_es: string }[] = [
  { id: "featured",  label_en: "Featured",    label_es: "Destacados" },
  { id: "price_asc", label_en: "Price: Low→High", label_es: "Precio: Bajo→Alto" },
  { id: "price_desc",label_en: "Price: High→Low", label_es: "Precio: Alto→Bajo" },
  { id: "newest",    label_en: "Newest",      label_es: "Más nuevo" },
];

export function parsePriceRange(id?: string) {
  if (!id) return null;
  const item = PRICE_RANGES.find((p) => p.id === id);
  if (!item) return null;
  return { min: item.min, max: item.max };
}
