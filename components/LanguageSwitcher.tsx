// components/LanguageSwitcher.tsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export function LanguageSwitcher({
  lang,
  variant = "default",
}: {
  lang: "en" | "es";
  /** default = botones para fondos claros, inverted = para header oscuro */
  variant?: "default" | "inverted";
}) {
  const pathname = usePathname() || "/";
  const other = lang === "en" ? "es" : "en";
  const segments = pathname.split("/");
  segments[1] = other;
  const target = segments.join("/") || `/${other}`;

  if (variant === "inverted") {
    // Botón con alto contraste sobre header oscuro
    return (
      <Link
        href={target}
        className="inline-flex h-9 items-center justify-center rounded-xl px-3 font-semibold transition-colors"
        style={{
          color: "rgba(255,255,255,0.92)",
          border: "1px solid rgba(255,255,255,0.55)",
          backgroundColor: "transparent",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.10)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        {other.toUpperCase()}
      </Link>
    );
  }

  // Variante por defecto (fondos claros)
  return (
    <Link
      href={target}
      className="btn-outline h-9 px-3 rounded-xl hover:text-terracotta"
      style={{ borderColor: "rgba(165,152,134,0.60)" }} /* sand 60% */
    >
      {other.toUpperCase()}
    </Link>
  );
}
