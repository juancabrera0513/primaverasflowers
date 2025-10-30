// components/Hero.tsx
import Link from "next/link";
import { clsx } from "clsx";

type Lang = "en" | "es";

type Props = {
  lang?: Lang;
  eyebrow?: string;
  titlePrimary?: string;   // parte normal
  titleAccent?: string;    // parte acentuada
  subtitle?: string;
  primaryHref?: string;
  secondaryHref?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  features?: string[];     // chips
};

export default function Hero({
  lang = "en",
  eyebrow = "Primavera Flowers NYC",
  titlePrimary = lang === "es" ? "Flores frescas" : "Fresh flowers",
  titleAccent = lang === "es" ? "entrega el mismo día" : "same-day delivery",
  subtitle = lang === "es"
    ? "Arreglos diseñados con cariño para cumpleaños, agradecimientos y condolencias."
    : "Thoughtfully designed arrangements for birthdays, thank-yous and sympathy.",
  primaryHref = `/${lang}/catalog`,
  secondaryHref = `/${lang}/about`,
  primaryLabel = lang === "es" ? "Ver catálogo" : "Shop Catalog",
  secondaryLabel = lang === "es" ? "Sobre nosotros" : "About Us",
  features = [
    lang === "es" ? "Entrega el mismo día" : "Same-day delivery",
    lang === "es" ? "Hecho a mano" : "Handcrafted",
    lang === "es" ? "Entrega local" : "Local delivery",
  ],
}: Props) {
  return (
    <section
    className="relative overflow-hidden"
    aria-label={lang === "es" ? "Sección principal" : "Hero section"}
    style={{ background: "var(--hero-bg)" }}   // ← usa la variable
  >
  
      <div className="container mx-auto px-4">
        <div className="relative mx-auto max-w-4xl py-16 md:py-24 text-center">
          {/* Eyebrow */}
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              background: "rgba(165,90,72,0.10)", // usa el terracotta como base suave
              color: "var(--terracotta, #A55A48)",
            }}
          >
            {eyebrow}
          </span>

          {/* Title */}
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.08] tracking-tight text-[color:var(--ink-950,#111827)]">
            {titlePrimary}
            <span className="mx-1">,</span>
            <span
              className="text-[color:var(--terracotta,#A55A48)]"
              style={{ textShadow: "0 1px 0 rgba(0,0,0,0.06)" }}
            >
              {titleAccent}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-4 max-w-3xl text-lg md:text-xl text-[color:var(--ink-700,#374151)]">
            {subtitle}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={primaryHref}
              className={clsx(
                "inline-flex h-12 items-center justify-center rounded-full px-6 text-[15px] font-semibold text-white shadow-lg",
              )}
              style={{
                background: "var(--terracotta,#A55A48)",
                boxShadow:
                  "0 10px 30px rgba(165,90,72,0.35), inset 0 -2px 0 rgba(0,0,0,0.12)",
              }}
            >
              {primaryLabel}
            </Link>

            <Link
              href={secondaryHref}
              className={clsx(
                "inline-flex h-12 items-center justify-center rounded-full border px-6 text-[15px] font-semibold",
                "bg-white/70 backdrop-blur hover:bg-white"
              )}
              style={{
                borderColor: "rgba(17,24,39,0.10)",
                color: "var(--ink-900,#0F172A)",
              }}
            >
              {secondaryLabel}
            </Link>
          </div>

          {/* Feature chips */}
          {features?.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {features.map((f, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 rounded-full border bg-white/85 px-4 py-2 text-sm backdrop-blur"
                  style={{ borderColor: "rgba(17,24,39,0.10)", color: "var(--ink-800,#1F2937)" }}
                >
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: "var(--terracotta,#A55A48)" }}
                  />
                  {f}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Suave fade al contenido siguiente */}
      <div
        aria-hidden
        className="pointer-events-none h-10 w-full"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.06), transparent 70%)",
          opacity: 0.10,
        }}
      />
    </section>
  );
}
