// lib/mocks/products.ts
export type MockProduct = {
    id: string;
    slug: string;
    name_en: string;
    name_es: string;
    price_cents: number;
    primary_image_url: string | null;
  };
  
  export const mockProducts: MockProduct[] = [
    {
      id: "mock-rose-s",
      slug: "rose-bouquet-s",
      name_en: "Rose Bouquet (S)",
      name_es: "Ramo de Rosas (S)",
      price_cents: 3999,
      primary_image_url: "/seed/rose-s.jpg",
    },
    {
      id: "mock-rose-m",
      slug: "rose-bouquet-m",
      name_en: "Rose Bouquet (M)",
      name_es: "Ramo de Rosas (M)",
      price_cents: 5999,
      primary_image_url: "/seed/rose-m.jpg",
    },
    {
      id: "mock-mixed",
      slug: "mixed-bouquet",
      name_en: "Mixed Seasonal Bouquet",
      name_es: "Ramo Estacional Mixto",
      price_cents: 6999,
      primary_image_url: "/seed/mixed.jpg",
    },
  ];
  