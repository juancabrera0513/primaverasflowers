// lib/metadata.tsx
// Debe ser .tsx porque devolvemos JSX (script JSON-LD)
import React from "react";
import type { Metadata } from "next";

export type Lang = "en" | "es";

/** Alternates simples por idioma raíz. Si necesitas por-path, ajusta en generateMetadata. */
export function getLangAlternates(_current: Lang = "en") {
  return {
    en: "/en",
    es: "/es",
  };
}

function toJson(obj: unknown) {
  // Previene cierre de <script> y evita inyectar tags
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

/** Metadatos base del sitio para app/layout.tsx */
export function getDefaultMetadata(): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const title = "Primavera Flowers";
  const description =
    "Fresh flowers, same-day delivery. Primavera Flowers NYC — bouquets, arrangements and plants.";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    openGraph: {
      type: "website",
      url: siteUrl,
      siteName: title,
      title,
      description,
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: title }],
      locale: "en_US",
    },
    alternates: {
      canonical: siteUrl,
      languages: getLangAlternates("en"),
    },
    robots: { index: true, follow: true },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
}

/** Metadatos por página (útil para páginas de catálogo, producto, etc.) */
export function getPageMetadata({
  title,
  description,
  pathname = "",
  image = "/og.jpg",
  lang = "en",
}: {
  title: string;
  description?: string;
  pathname?: string;
  image?: string;
  lang?: Lang;
}): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const url = new URL(pathname || "/", siteUrl).toString();
  const siteTitle = "Primavera Flowers";

  return {
    title: { default: title, template: `%s | ${siteTitle}` },
    description,
    openGraph: {
      type: "website",
      url,
      siteName: siteTitle,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: lang === "es" ? "es_ES" : "en_US",
    },
    alternates: {
      canonical: url,
      languages: getLangAlternates(lang),
    },
  };
}

/** JSON-LD de producto con API tolerante (acepta producto o { product, price, currency }) */
export function ProductJsonLd(input: any) {
  const product = input?.product ?? input;
  const price: number | undefined =
    typeof input?.price === "number"
      ? input.price
      : typeof product?.base_price_cents === "number"
      ? product.base_price_cents / 100
      : undefined;
  const currency: string = input?.currency ?? "USD";

  return {
    render(lang: Lang = "en") {
      const name =
        lang === "es"
          ? product?.name_es ?? product?.name_en
          : product?.name_en ?? product?.name_es;
      const description =
        lang === "es"
          ? product?.description_es ?? product?.description_en
          : product?.description_en ?? product?.description_es;

      const json: any = {
        "@context": "https://schema.org",
        "@type": "Product",
        name,
        description,
        image: product?.primary_image_url || undefined,
        offers: {
          "@type": "Offer",
          price: price != null ? price.toFixed(2) : undefined,
          priceCurrency: currency,
          availability: "https://schema.org/InStock",
        },
        sku: product?.id ?? undefined,
      };

      // Limpia claves undefined
      if (!json.offers.price) delete json.offers.price;
      if (!json.image) delete json.image;

      return (
        <script
          key="product-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJson(json) }}
        />
      );
    },
  };
}

// Export default como objeto (para uso tipo `import Meta from "@/lib/metadata"`)
export default {
  getDefaultMetadata,
  getPageMetadata,
  ProductJsonLd,
  getLangAlternates,
};
