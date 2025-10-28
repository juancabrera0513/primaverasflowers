// lib/images.ts
const ALLOWED_HOSTS = new Set<string>([
    "cdn.globalrose.com",
    "i.etsystatic.com",
    "asset.bloomnation.com",
    "cdn3.1800flowers.com",
    "cdn2.stylecraze.com",
    "5starflower.com",
    "growurban.uk",
    "cdn.shopify.com",
    "images.unsplash.com",
    "picsum.photos",
    "www.surprose.com",
    // agrega aquí cualquier otro host que ya tengas en next.config.(js|mjs)
  ]);
  
  export function safeImageUrl(input?: string | null): string {
    const PLACEHOLDER = "/images/placeholder-product.jpg";
    if (!input) return PLACEHOLDER;
  
    try {
      const u = new URL(input);
  
      // Bloquea redirecciones de Google y similares
      if (u.hostname === "www.google.com" && u.pathname === "/url") {
        return PLACEHOLDER;
      }
  
      // Si es http(s) y el host no está en la allowlist → placeholder
      if ((u.protocol === "http:" || u.protocol === "https:") && !ALLOWED_HOSTS.has(u.hostname)) {
        return PLACEHOLDER;
      }
  
      // Si pasa validación, úsala tal cual
      return u.toString();
    } catch {
      // Si no parsea como URL absoluta, puede ser ruta local (/images/...)
      if (input.startsWith("/")) return input;
      return PLACEHOLDER;
    }
  }
  