"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";
import { safeImageUrl } from "@/lib/images";

type ProductCardProduct = {
  id: string;
  slug: string;
  name_en: string;
  name_es: string;
  price_cents: number;              // 👈 precio en cents
  primary_image_url?: string | null; // 👈 campo real de tu DB
};

export default function ProductCard({
  product,
  lang = "en",
}: {
  product: ProductCardProduct;
  lang?: "en" | "es";
}) {
  const router = useRouter();
  const [pendingBuy, startTransition] = useTransition();
  const [adding, setAdding] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const name =
    lang === "es"
      ? product.name_es ?? product.name_en
      : product.name_en ?? product.name_es;

  // 💵 de cents → dollars
  const price = (product.price_cents ?? 0) / 100;

  // 🖼️ respeta tu util existente (placeholder incluido)
  const src = safeImageUrl(product.primary_image_url);

  const href = `/${lang}/product/${product.slug}`;

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      const key = "cart";
      const current: any[] = JSON.parse(localStorage.getItem(key) || "[]");
      const idx = current.findIndex((x) => String(x.id) === String(product.id));
      if (idx === -1) {
        current.push({ ...product, qty: 1 });
      } else {
        current[idx].qty = (current[idx].qty || 1) + 1;
      }
      localStorage.setItem(key, JSON.stringify(current));
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="rounded-3xl overflow-hidden border border-neutral-200 bg-white shadow-sm">
      <Link href={href} className="block aspect-[4/3] relative">
        <Image
          src={src}
          alt={name}
          fill
          unoptimized   // ✅ evita whitelist de dominios por ahora
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          priority={false}
        />
      </Link>

      <div className="p-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-medium leading-tight line-clamp-2">
            <Link href={href}>{name}</Link>
          </h3>
          <div className="text-right font-semibold">
            ${price.toFixed(2)}
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <Link
            href={href}
            className="inline-flex h-9 items-center rounded-xl border px-3 text-sm hover:bg-neutral-50"
          >
            {lang === "es" ? "Ver más" : "View"}
          </Link>

          <button
            onClick={handleAddToCart}
            disabled={adding}
            className={`inline-flex h-9 items-center rounded-xl px-3 text-sm text-white transition ${
              adding ? "bg-gray-400" : ""
            }`}
            style={{ background: "var(--terracotta)" }}
          >
            {adding
              ? lang === "es"
                ? "Agregando..."
                : "Adding..."
              : lang === "es"
              ? "Agregar al carrito"
              : "Add to cart"}
          </button>

          <button
            className="inline-flex h-9 items-center rounded-xl px-3 text-sm text-white"
            style={{ background: "var(--terracotta)" }}
            onClick={() =>
              startTransition(() => {
                setErr(null);
                try {
                  router.push(`${href}#buy`);
                } catch (e: any) {
                  setErr(e?.message || "Error");
                }
              })
            }
            disabled={pendingBuy}
          >
            {pendingBuy
              ? lang === "es"
                ? "Redirigiendo..."
                : "Redirecting..."
              : lang === "es"
              ? "Comprar"
              : "Buy now"}
          </button>
        </div>

        {err && (
          <p className="mt-2 text-sm" style={{ color: "var(--terracotta)" }}>
            {err}
          </p>
        )}
      </div>
    </div>
  );
}
