import Link from "next/link";

type Lang = "en" | "es";

export default function Footer({ lang = "en" }: { lang?: Lang }) {
  const year = new Date().getFullYear();
  const t = {
    rights:
      lang === "es"
        ? "Todos los derechos reservados."
        : "All rights reserved.",
    links: [
      { href: `/${lang}/catalog`, label: lang === "es" ? "Catálogo" : "Catalog" },
      { href: `/${lang}/about`, label: lang === "es" ? "Acerca" : "About" },
      { href: `/${lang}/contact`, label: lang === "es" ? "Contacto" : "Contact" },
    ],
  };

  return (
    <footer className="border-t" style={{ background: "var(--j-offwhite, #F6F2EA)" }}>
      <div className="container-narrow py-8 text-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-neutral-700">
            © {year} Primavera Flowers — {t.rights}
          </div>

          <nav className="flex flex-wrap gap-4">
            {t.links.map((l) => (
              <Link key={l.href} href={l.href} className="hover:underline underline-offset-4">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
