"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

type Lang = "en" | "es";

type Props = {
  lang?: Lang;
  brand?: string;
  enableLangSwitch?: boolean;
  logoSrc?: string; // /public/logo-mark.png
};

function NavItem({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "relative block px-2 py-1 text-[15px] font-semibold tracking-tight transition-colors",
        "text-white/95 hover:text-white focus:text-white focus:outline-none",
        active && "text-white"
      )}
    >
      {children}
      <span
        className={clsx(
          "pointer-events-none absolute -bottom-1 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-white/90 transition-all duration-300",
          active ? "w-7" : "group-hover/nav:w-7"
        )}
      />
    </Link>
  );
}

export default function Header({
  lang = "en",
  brand = "Primavera Flowers",
  enableLangSwitch = true,
  logoSrc = "/logo-mark.png",
}: Props) {
  const pathname = usePathname() || "/";
  const base = pathname.replace(/^\/(en|es)/, "") || "/";
  const otherLang: Lang = lang === "en" ? "es" : "en";

  // About → Catalog → Contact
  const nav = [
    { slug: "/about",   label: lang === "es" ? "Acerca"   : "About"   },
    { slug: "/catalog", label: lang === "es" ? "Catálogo" : "Catalog" },
    { slug: "/contact", label: lang === "es" ? "Contacto" : "Contact" },
  ];

  return (
    <header
      className={clsx(
        "sticky top-0 z-50",
        // Fondo SOLID para contraste: olive 900
        "bg-[color:var(--olive-900,#3E4732)]",
        "shadow-[0_8px_24px_rgba(0,0,0,.22)]"
      )}
      role="banner"
    >
      <div className="container-narrow h-18 md:h-20 flex items-center justify-between">
        {/* Brand + Logo más grande */}
        <Link
          href={`/${lang}`}
          className="group inline-flex items-center gap-3 md:gap-4 text-white"
          aria-label={brand}
        >
          <span className="relative inline-flex h-11 w-11 md:h-12 md:w-12 overflow-hidden rounded-full ring-2 ring-white/70">
            <Image
              src={logoSrc}
              alt={`${brand} logo`}
              fill
              sizes="48px"
              className="object-cover"
              priority
            />
          </span>

          <span className="flex flex-col leading-tight">
            <span className="text-lg md:text-2xl font-extrabold tracking-tight text-white">
              {brand}
            </span>
            {/* Si quieres subtítulo, descomenta */}
            {/* <span className="text-[11px] md:text-xs font-medium text-white/80">Flowers · Same-day delivery</span> */}
          </span>
        </Link>

        {/* Desktop nav con mayor tamaño y contraste */}
        <nav className="hidden md:flex items-center gap-7 group/nav">
          {nav.map((item) => {
            const href = `/${lang}${item.slug}`;
            const active = pathname.startsWith(href);
            return (
              <NavItem key={href} href={href} active={active}>
                {item.label}
              </NavItem>
            );
          })}

          {/* Toggle EN/ES más grande y con borde notorio */}
          {enableLangSwitch && (
            <div
              className="ml-2 flex items-center rounded-2xl p-1 bg-white/10 ring-2 ring-white/40"
              aria-label={lang === "es" ? "Selector de idioma" : "Language switch"}
            >
              <Link
                href={`/en${base}`}
                className={clsx(
                  "px-3 py-1.5 text-[13px] font-bold rounded-xl transition-colors",
                  lang === "en"
                    ? "bg-white text-[var(--brand-800,#7F4638)]"
                    : "text-white/90 hover:text-white"
                )}
                aria-current={lang === "en" ? "true" : undefined}
              >
                EN
              </Link>
              <Link
                href={`/es${base}`}
                className={clsx(
                  "px-3 py-1.5 text-[13px] font-bold rounded-xl transition-colors",
                  lang === "es"
                    ? "bg-white text-[var(--brand-800,#7F4638)]"
                    : "text-white/90 hover:text-white"
                )}
                aria-current={lang === "es" ? "true" : undefined}
              >
                ES
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile menu con contraste alto */}
        <details className="md:hidden relative group">
          <summary
            className={clsx(
              "list-none cursor-pointer select-none",
              "inline-flex items-center justify-center w-10 h-10 rounded-xl",
              "text-white bg-white/10 ring-2 ring-white/40 hover:bg-white/15 transition-colors"
            )}
            aria-label={lang === "es" ? "Abrir menú" : "Open menu"}
          >
            ☰
          </summary>

          <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-2xl p-2 bg-white text-[var(--ink-900,#0F172A)] shadow-2xl ring-1 ring-black/10">
            <div className="grid">
              {nav.map((item) => {
                const href = `/${lang}${item.slug}`;
                const active = pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={clsx(
                      "rounded-xl px-3 py-2 text-[15px] font-semibold",
                      active ? "bg-black/5" : "hover:bg-black/5"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {enableLangSwitch && (
              <>
                <div className="my-2 h-px bg-black/10" />
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-1 text-xs font-medium text-black/60">
                    {lang === "es" ? "Idioma" : "Language"}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/en${base}`}
                      className={clsx(
                        "px-3 py-1.5 text-xs font-bold rounded-lg",
                        lang === "en"
                          ? "bg-[var(--brand-800,#7F4638)] text-white"
                          : "bg-black/5 text-black hover:bg-black/10"
                      )}
                    >
                      EN
                    </Link>
                    <Link
                      href={`/es${base}`}
                      className={clsx(
                        "px-3 py-1.5 text-xs font-bold rounded-lg",
                        lang === "es"
                          ? "bg-[var(--brand-800,#7F4638)] text-white"
                          : "bg-black/5 text-black hover:bg-black/10"
                      )}
                    >
                      ES
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </details>
      </div>
    </header>
  );
}
