// lib/data.ts
import { createPublicServerClient } from "@/lib/client";

const USE_MOCKS =
  process.env.NEXT_PUBLIC_SHOW_MOCKS === "1" ||
  process.env.NEXT_PUBLIC_SHOW_MOCKS === "true";

// Tipos mínimos que espera tu UI
export type ProductLite = {
  id: string;
  slug: string;
  name_en: string;
  name_es: string;
  description_en?: string | null;
  description_es?: string | null;
  primary_image_url?: string | null;
  price_cents: number;
};

export type CategoryLite = {
  id: string;
  slug: string;
  name_en: string;
  name_es: string;
};

// ------ MOCKS ------
const MOCK_PRODUCTS: ProductLite[] = [
  {
    id: "m1",
    slug: "rose-bouquet",
    name_en: "Rose Bouquet",
    name_es: "Ramo de Rosas",
    description_en: "Classic red roses.",
    description_es: "Rosas rojas clásicas.",
    primary_image_url: "/seed/rose.jpg",
    price_cents: 4999,
  },
  {
    id: "m2",
    slug: "tulip-bouquet",
    name_en: "Tulip Bouquet",
    name_es: "Ramo de Tulipanes",
    description_en: "Seasonal tulips.",
    description_es: "Tulipanes de temporada.",
    primary_image_url: "/seed/tulip.jpg",
    price_cents: 3999,
  },
  {
    id: "m3",
    slug: "mixed-bouquet",
    name_en: "Mixed Bouquet",
    name_es: "Ramo Mixto",
    description_en: "Fresh seasonal mix.",
    description_es: "Mezcla de temporada.",
    primary_image_url: "/seed/mixed.jpg",
    price_cents: 6999,
  },
];

const MOCK_CATEGORIES: CategoryLite[] = [
  { id: "c1", slug: "roses", name_en: "Roses", name_es: "Rosas" },
  { id: "c2", slug: "tulips", name_en: "Tulips", name_es: "Tulipanes" },
  { id: "c3", slug: "mixed", name_en: "Mixed", name_es: "Mixtos" },
];

// mapa producto -> slugs de categorías
const MOCK_PRODUCT_CAT = new Map<string, Set<string>>([
  ["m1", new Set(["roses"])],
  ["m2", new Set(["tulips"])],
  ["m3", new Set(["mixed"])],
]);

// ------ HELPERS SAFE ------
function normalizeProduct(row: any): ProductLite | null {
  if (!row) return null;
  return {
    id: String(row.id),
    slug: String(row.slug),
    name_en: String(row.name_en ?? ""),
    name_es: String(row.name_es ?? row.name_en ?? ""),
    description_en: row.description_en ?? null,
    description_es: row.description_es ?? null,
    primary_image_url:
      typeof row.primary_image_url === "string" || row.primary_image_url == null
        ? row.primary_image_url
        : String(row.primary_image_url),
    price_cents: Number.isFinite(row.price_cents) ? Number(row.price_cents) : 0,
  };
}

// ------ DATA LAYER ------

// lista de categorías (tolerante)
export async function getCategories(): Promise<CategoryLite[]> {
  if (USE_MOCKS) return MOCK_CATEGORIES;
  try {
    const supabase = createPublicServerClient();
    const { data, error } = await supabase
      .from("categories")
      .select("id, slug, name_en, name_es")
      .order("name_en", { ascending: true });
    if (error || !data) return MOCK_CATEGORIES; // fallback
    return data.map((c: any) => ({
      id: String(c.id),
      slug: String(c.slug),
      name_en: String(c.name_en ?? ""),
      name_es: String(c.name_es ?? c.name_en ?? ""),
    }));
  } catch {
    return MOCK_CATEGORIES;
  }
}

// pares product_id, category_slug (sin depender de relaciones)
export async function getProductCategoryMap(): Promise<Map<string, Set<string>>> {
  if (USE_MOCKS) return new Map(MOCK_PRODUCT_CAT);
  try {
    const supabase = createPublicServerClient();
    const { data: cats } = await supabase.from("categories").select("id, slug");
    const { data: pairs, error: pairErr } = await supabase
      .from("products_categories")
      .select("product_id, category_id");

    if (pairErr || !pairs || !cats) return new Map(MOCK_PRODUCT_CAT);

    const catById = new Map<string, string>();
    for (const c of cats) catById.set(String(c.id), String(c.slug));

    const map = new Map<string, Set<string>>();
    for (const row of pairs) {
      const pid = String(row.product_id);
      const slug = catById.get(String(row.category_id));
      if (!slug) continue;
      if (!map.has(pid)) map.set(pid, new Set());
      map.get(pid)!.add(slug);
    }
    return map;
  } catch {
    return new Map(MOCK_PRODUCT_CAT);
  }
}

// lista de productos (mínimos)
export async function getProducts(): Promise<ProductLite[]> {
  if (USE_MOCKS) return MOCK_PRODUCTS;
  try {
    const supabase = createPublicServerClient();
    const { data, error } = await supabase
      .from("products")
      .select(
        `
        id, slug,
        name_en, name_es,
        description_en, description_es,
        primary_image_url,
        price_cents
      `
      );
    if (error || !data) return MOCK_PRODUCTS;
    const out: ProductLite[] = [];
    for (const row of data) {
      const p = normalizeProduct(row);
      if (p) out.push(p);
    }
    return out;
  } catch {
    return MOCK_PRODUCTS;
  }
}

// producto por slug (con variantes/addons si existen; tolerante)
export async function getProductBySlug(slug: string): Promise<any | null> {
  if (!slug) return null;
  if (USE_MOCKS) {
    const p = MOCK_PRODUCTS.find((x) => x.slug === slug);
    return p
      ? {
          ...p,
          product_variants: [],
          product_addons: [],
        }
      : null;
  }
  try {
    const supabase = createPublicServerClient();
    const { data, error } = await supabase
      .from("products")
      .select(
        `
        id, slug,
        name_en, name_es,
        description_en, description_es,
        primary_image_url,
        price_cents,
        product_variants:product_variants(*),
        product_addons:product_addons(addon:addons(*))
      `
      )
      .eq("slug", slug)
      .limit(1)
      .maybeSingle();

    if (error || !data) return null;
    // normaliza básicos
    const base = normalizeProduct(data);
    return {
      ...base!,
      product_variants: data.product_variants ?? [],
      product_addons: (data.product_addons ?? []).map((x: any) => x.addon),
    };
  } catch {
    return null;
  }
}
