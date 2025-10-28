// app/(i18n)/[lang]/layout.tsx
import type { Metadata } from "next";
import { isLang } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Primavera Flowers",
  description: "Fresh flowers, same-day delivery.",
};

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: "en" | "es" = isLang(lang) ? (lang as "en" | "es") : "en";

  return (
    <>
      <Header lang={locale} />
      <main className="page-shell">{children}</main>
      <Footer lang={locale} />
    </>
  );
}
