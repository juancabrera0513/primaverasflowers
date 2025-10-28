// app/(i18n)/[lang]/(public)/about/page.tsx
import Link from "next/link";
import { isLang } from "@/lib/i18n";

export const metadata = {
  title: "About Us — Primavera Flowers NYC",
  description:
    "Primavera Flowers NYC: modern, handcrafted arrangements with same-day delivery across New York. Weddings, sympathy, events, plants, and custom gift baskets.",
};

type OpeningSpec = {
  dayOfWeek: string;
  opens: string;
  closes: string;
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: "en" | "es" = isLang(lang) ? (lang as "en" | "es") : "en";

  const t = {
    badge:
      locale === "es" ? "Primavera Flowers · Desde 2025" : "Primavera Flowers · Est. 2025",
    heroTitle:
      locale === "es"
        ? "Acercando la belleza de la naturaleza a cada ocasión."
        : "Bringing nature’s beauty to every occasion.",
    heroSub:
      locale === "es"
        ? "En Primavera Flowers NYC diseñamos arreglos cuidadosamente pensados para cumpleaños, bodas y momentos con significado — siempre con cariño y entrega el mismo día en Nueva York."
        : "Primavera Flowers NYC creates thoughtfully designed arrangements for birthdays, weddings, and heartfelt moments — always crafted with care and same-day delivery across New York.",
    heroP1:
      locale === "es"
        ? "Nacimos en Washington Heights con una idea: que las flores vuelvan a sentirse personales. Cada arreglo se diseña a mano, con simplicidad, calidad y el valor natural de cada tallo."
        : "Founded with love in Washington Heights, Primavera Flowers NYC began with one goal: to make flowers feel personal again. Each arrangement is hand-designed with simplicity, quality, and the natural beauty of every stem.",
    heroP2:
      locale === "es"
        ? "Servimos con orgullo a nuestra comunidad — desde celebraciones de barrio hasta elegantes eventos en Manhattan — con flores que transmiten cercanía, gratitud y conexión."
        : "We’re proud to serve our community — from neighborhood celebrations to elegant Manhattan events — with flowers that express warmth, gratitude, and connection.",
    ctaCatalog: locale === "es" ? "Ver catálogo" : "Shop the Collection",

    storyTitle: locale === "es" ? "Nuestra historia" : "Our Story",
    storyP1:
      locale === "es"
        ? "Primavera Flowers NYC es una floristería familiar en 463 Fort Washington Ave, New York. Nos apasiona convertir los momentos cotidianos en recuerdos hermosos."
        : "Primavera Flowers NYC is a family-owned boutique florist at 463 Fort Washington Ave, New York. We’re passionate about turning everyday moments into beautiful memories.",
    storyP2:
      locale === "es"
        ? "Nuestro estudio combina diseño moderno con oficio clásico — inspirado en la estética Japandi: natural, equilibrada y atemporal."
        : "Our studio blends modern design with classic craftsmanship — inspired by a Japandi aesthetic: natural, balanced, and timeless.",
    storyP3:
      locale === "es"
        ? "Ya sea para expresar amor, agradecimiento o condolencias, preparamos cada ramo a mano con flores de temporada y, cuando es posible, proveedores locales de confianza."
        : "Whether you’re sending love, gratitude, or sympathy, we hand-craft every bouquet with seasonal blooms and, whenever possible, trusted local growers.",

    servicesTitle: locale === "es" ? "Qué ofrecemos" : "What We Offer",
    services: locale === "es"
      ? [
          "Entrega el mismo día en Manhattan, Bronx y zonas cercanas",
          "Diseño floral para bodas y eventos",
          "Arreglos de condolencias y funerales",
          "Ramos para cumpleaños y aniversarios",
          "Plantas de interior y dish gardens",
          "Canastas de regalo personalizadas",
          "Estilos modernos y tradicionales",
          "Programas florales para empresas y hoteles",
        ]
      : [
          "Same-day delivery across Manhattan, Bronx & nearby areas",
          "Wedding & event floral design",
          "Sympathy and memorial arrangements",
          "Birthday & anniversary bouquets",
          "Indoor plants and dish gardens",
          "Custom gift baskets",
          "Modern & traditional floral styles",
          "Corporate & hotel flower programs",
        ],

    contactTitle: locale === "es" ? "Visítanos o contáctanos" : "Visit or Contact Us",
    hoursTitle: locale === "es" ? "Horario de atención" : "Store Hours",
    areasTitle: locale === "es" ? "Zonas de cobertura" : "Areas Served",
  };

  const opening: OpeningSpec[] = [
    { dayOfWeek: "Sunday", opens: "09:00", closes: "18:00" },
    { dayOfWeek: "Monday", opens: "09:00", closes: "18:00" },
    { dayOfWeek: "Tuesday", opens: "09:00", closes: "18:00" },
    { dayOfWeek: "Wednesday", opens: "09:00", closes: "18:00" },
    { dayOfWeek: "Thursday", opens: "09:00", closes: "18:00" },
    { dayOfWeek: "Friday", opens: "09:00", closes: "18:00" },
    { dayOfWeek: "Saturday", opens: "09:00", closes: "18:00" },
  ];

  const areas = [
    "Bronx",
    "Astoria",
    "Yonkers",
    "Flushing",
    "East Elmhurst",
    "Mount Vernon",
    "College Point",
    "Whitestone",
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative">
        <div className="container-narrow py-10 md:py-14">
          <p className="inline-flex h-8 items-center rounded-full border px-3 text-xs tracking-wide bg-white/80 backdrop-blur">
            {t.badge}
          </p>

          <h1
            className="mt-3 text-3xl md:text-5xl font-semibold leading-tight tracking-tight"
            style={{ color: "var(--ink-900)" }}
          >
            {t.heroTitle}
          </h1>

          <p className="mt-4 text-lg md:text-xl" style={{ color: "var(--ink-600)" }}>
            {t.heroSub}
          </p>
          <p className="mt-3 text-base md:text-lg" style={{ color: "var(--ink-600)" }}>
            {t.heroP1}
          </p>
          <p className="mt-3 text-base md:text-lg" style={{ color: "var(--ink-600)" }}>
            {t.heroP2}
          </p>

          <div className="mt-6">
            <Link href={`/${locale}/catalog`} className="btn-primary">
              {t.ctaCatalog}
            </Link>
          </div>
        </div>
      </section>

      {/* CONTENT GRID */}
      <section className="section">
        <div className="container-narrow pb-12">
          {/* min-w-0 evita recortes en hijos; grid estable y responsive */}
          <div className="grid min-w-0 gap-6 lg:grid-cols-3">
            {/* LEFT: Story + Services */}
            <div className="lg:col-span-2 min-w-0 space-y-6">
              <div className="card p-6 md:p-7 overflow-visible">
                <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--ink-900)" }}>
                  {t.storyTitle}
                </h2>
                <p className="leading-7" style={{ color: "var(--ink-600)" }}>
                  {t.storyP1}
                </p>
                <p className="mt-3 leading-7" style={{ color: "var(--ink-600)" }}>
                  {t.storyP2}
                </p>
                <p className="mt-3 leading-7" style={{ color: "var(--ink-600)" }}>
                  {t.storyP3}
                </p>
              </div>

              <div className="card p-6 md:p-7 overflow-visible">
                <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--ink-900)" }}>
                  {t.servicesTitle}
                </h3>

                {/* Chips responsivas; sin cortes */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {t.services.map((s) => (
                    <li
                      key={s}
                      className="chip break-words"
                      style={{
                        background:
                          "color-mix(in oklab, #fff 85%, var(--j-offwhite, #F6F2EA) 15%)",
                      }}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RIGHT: Contact + Hours + Areas (sin recortes) */}
            <aside className="min-w-0 space-y-6">
              <div className="card p-6 md:p-7 overflow-visible">
                <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--ink-900)" }}>
                  {t.contactTitle}
                </h2>
                <div className="text-[15px] leading-7" style={{ color: "var(--ink-600)" }}>
                  <p className="font-medium" style={{ color: "var(--ink-800)" }}>
                    Primavera Flowers NYC
                  </p>
                  <p>463 Fort Washington Ave</p>
                  <p>New York, NY 10033</p>
                  <p className="mt-2">
                    <span className="font-medium">Phone:</span> (917) 770-1684
                  </p>
                </div>
              </div>

              <div className="card p-6 md:p-7 overflow-visible">
                <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--ink-900)" }}>
                  {t.hoursTitle}
                </h3>

                {/* Lista sin altura fija, sin overflow oculto y con números tabulares */}
                <ul className="space-y-2 text-[15px]">
                  {opening.map((h) => (
                    <li
                      key={h.dayOfWeek}
                      className="flex items-center justify-between gap-3 rounded-xl border px-3 py-2"
                      style={{ borderColor: "var(--border)", color: "var(--ink-800)" }}
                    >
                      <span className="min-w-0 truncate">{h.dayOfWeek}</span>
                      <span className="shrink-0 whitespace-nowrap tabular-nums">
                        {h.opens} – {h.closes}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card p-6 md:p-7 overflow-visible">
                <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--ink-900)" }}>
                  {t.areasTitle}
                </h3>

                {/* Grid flexible; sin recortes */}
                <ul
                  className="grid grid-cols-2 gap-2 text-[15px]"
                  style={{ color: "var(--ink-800)" }}
                >
                  {areas.map((a) => (
                    <li
                      key={a}
                      className="rounded-xl border px-3 py-2"
                      style={{ borderColor: "var(--border)" }}
                    >
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
