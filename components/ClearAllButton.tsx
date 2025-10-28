// components/ClearAllButton.tsx
"use client";

import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  /** Idioma actual del sitio: "en" | "es" */
  lang?: "en" | "es";
  /** Clases extras para ajustar estilos si lo necesitas */
  className?: string;
  /** Texto opcional; si no lo pasas, se usa según el idioma */
  label?: string;
};

export default function ClearAllButton({
  lang = "en",
  className = "",
  label,
}: Props) {
  const router = useRouter();
  const text =
    label ?? (lang === "es" ? "Limpiar todo" : "Clear all");

  const handleClick = () => {
    // Navega SIEMPRE a /{lang}/catalog SIN query params.
    router.push(`/${lang}/catalog`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`text-xs underline hover:no-underline ${className}`}
      aria-label={text}
    >
      {text}
    </button>
  );
}
