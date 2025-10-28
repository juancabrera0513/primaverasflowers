// mocks/index.ts
export type ProductLite = {
    id: string;
    slug: string;
    name: string;
    primary_image_url: string;
    price_cents: number;
  };
  
  export const MOCK_PRODUCTS: ProductLite[] = [
    {
      id: "p-rose-l",
      slug: "rose-bouquet-l",
      name: "Rose Bouquet (L)",
      primary_image_url:
        "https://images.unsplash.com/photo-1457089328109-e5d9bd499191",
      price_cents: 7999,
    },
    {
      id: "p-rose-m",
      slug: "rose-bouquet-m",
      name: "Rose Bouquet (M)",
      primary_image_url:
        "https://images.unsplash.com/photo-1520256862855-398228c41684",
      price_cents: 5999,
    },
    {
      id: "p-hydrangea",
      slug: "blue-hydrangea",
      name: "Blue Hydrangea Bouquet",
      primary_image_url:
        "https://cdn.globalrose.com/assets/img/prod/send-hydrangeas-globalrose.png",
      price_cents: 8499,
    },
    {
      id: "p-tulip",
      slug: "spring-tulip-mix",
      name: "Spring Tulip Mix",
      primary_image_url: "https://picsum.photos/seed/spring-tulip-mix/900/700",
      price_cents: 6999,
    },
  ];
  