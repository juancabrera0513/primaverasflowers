// lib/types.ts
export type ProductCardProduct = {
    id: string;
    slug: string;
    name_en: string;
    name_es: string;
    price_cents: number;
    primary_image_url?: string | null;
  };
  