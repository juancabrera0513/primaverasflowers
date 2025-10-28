// components/AddToCartButton.tsx
"use client";
import { useCart } from "@/lib/utils";

export function AddToCartButton({
  lang,
  productId,
  basePriceCents,
  slug,
}: {
  lang: "en" | "es";
  productId: string;
  basePriceCents: number;
  slug: string;
}) {
  const { addItem } = useCart();

  function add() {
    addItem({
      productId,
      variantId: null,
      quantity: 1,
      unitPriceCents: basePriceCents,
      addons: [],
      nameSnapshot: slug,
    });
    alert(lang === "es" ? "Añadido al carrito" : "Added to cart");
  }

  return (
    <button onClick={add} className="btn-primary shadow-soft hover:shadow-md">
      {lang === "es" ? "Añadir al carrito" : "Add to cart"}
    </button>
  );
}
