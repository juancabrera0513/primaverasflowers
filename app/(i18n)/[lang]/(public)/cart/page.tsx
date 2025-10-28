// app/(i18n)/[lang]/(public)/cart/page.tsx
"use client";
import { useCart } from "@/lib/utils";
import { CartSummary } from "@/components/CartSummary";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const [lang, setLang] = useState<"en" | "es">("en");
  const { items } = useCart();
  const [dict, setDict] = useState<any>();

  useEffect(() => {
    (async () => {
      const { lang } = await params;
      setLang((lang as "en" | "es") ?? "en");
      const m = await import(`@/locales/${lang}/common.json`);
      setDict(m.default);
    })();
  }, [params]);

  if (!dict) return null;

  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">{dict.cart.title}</h1>
      <CartSummary lang={lang} />
      <div className="mt-6">
        <Link
          href={`/${lang}/checkout`}
          className="px-4 py-2 rounded-xl bg-brand text-white"
        >
          {dict.cart.checkout}
        </Link>
      </div>
    </section>
  );
}
