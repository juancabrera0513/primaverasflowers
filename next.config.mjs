// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.globalrose.com" },
      { protocol: "https", hostname: "i.etsystatic.com" },
      { protocol: "https", hostname: "asset.bloomnation.com" },
      { protocol: "https", hostname: "cdn3.1800flowers.com" },
      { protocol: "https", hostname: "cdn2.stylecraze.com" },
      { protocol: "https", hostname: "5starflower.com" },
      { protocol: "https", hostname: "growurban.uk" },
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "www.surprose.com" }
    ],
  },
};

export default nextConfig;
