// app/(i18n)/[lang]/(public)/checkout/page.tsx
"use client";
import { useCart } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function CheckoutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { items, totals, delivery } = useCart();
  const [dict, setDict] = useState<any>();
  const [lang, setLang] = useState<"en" | "es">("en");

  useEffect(() => {
    (async () => {
      const { lang } = await params;
      setLang((lang as "en" | "es") ?? "en");
      const m = await import(`@/locales/${lang}/common.json`);
      setDict(m.default);
    })();
  }, [params]);

  async function onCheckout() {
    const res = await fetch("/api/stripe/create-checkout-session", {
      method: "POST",
      body: JSON.stringify({ items, delivery }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else alert("Error creating checkout session");
  }

  if (!dict) return null;

  return (
    <section className="max-w-xl mx-auto card">
      <h1 className="text-2xl font-bold mb-4">{dict.nav.checkout}</h1>
      <div className="text-sm text-gray-600 mb-4">
        Items: {items.length} — Total ${(totals.totalCents / 100).toFixed(2)}
      </div>
      <button onClick={onCheckout} className="px-4 py-2 rounded-xl bg-brand text-white">
        Pay with Stripe
      </button>
    </section>
  );
}
