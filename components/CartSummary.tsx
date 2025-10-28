// components/CartSummary.tsx
"use client";
import { useCart } from "@/lib/utils";

export function CartSummary({ lang }: { lang: "en" | "es" }) {
  const { items, totals, delivery } = useCart();

  return (
    <div
      className="card ring-1"
      style={{
        ["--tw-ring-color" as any]: "rgba(165,152,134,0.10)",
        backgroundColor: "var(--card)",
        color: "var(--fg)",
      }}
    >
      <ul className="divide-y" style={{ borderColor: "rgba(165,152,134,0.20)" }}>
        {items.map((it) => (
          <li
            key={it.key}
            className="py-3 flex items-center justify-between rounded-xl px-2 transition-colors"
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "rgba(193,184,167,0.20)") /* offwhite 20% */
            }
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <div>
              <div className="font-semibold" style={{ color: "var(--fg)" }}>
                {it.nameSnapshot}
              </div>
              <div style={{ color: "rgba(43,42,40,0.70)" }}>x{it.quantity}</div>
            </div>
            <div className="font-semibold" style={{ color: "var(--fg)" }}>
              ${(it.unitPriceCents * it.quantity / 100).toFixed(2)}
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 space-y-1 text-sm" style={{ color: "var(--fg)" }}>
        <div className="flex justify-between">
          <span>{lang === "es" ? "Subtotal" : "Subtotal"}</span>
          <span>${(totals.subtotalCents / 100).toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>{lang === "es" ? "Entrega" : "Delivery fee"}</span>
          <span>${(delivery.feeCents / 100).toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>{lang === "es" ? "Impuestos (est.)" : "Taxes (est.)"}</span>
          <span>${(totals.taxEstCents / 100).toFixed(2)}</span>
        </div>
      </div>

      <div
        className="mt-2 border-t pt-2 flex justify-between font-bold"
        style={{ borderColor: "rgba(165,152,134,0.20)", color: "var(--fg)" }}
      >
        <span>{lang === "es" ? "Total" : "Total"}</span>
        <span>${(totals.totalCents / 100).toFixed(2)}</span>
      </div>
    </div>
  );
}
