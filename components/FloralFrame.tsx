// components/FloralFrame.tsx
import React from "react";

type Props = {
  children: React.ReactNode;
  /** Ruta al PNG en /public */
  src?: string;
  /** Grosor del marco en px (ancho del “borde”) */
  borderWidth?: number;
  /** Slice (9-slice) en px: cuánto “cortar” desde cada borde de la imagen */
  slice?: number;
  /** Radio de borde interior (opcional) */
  radius?: number;
  className?: string;
};

export default function FloralFrame({
  children,
  src = "/decor/floral-border.png",
  borderWidth = 16,
  slice = 48,
  radius = 24,
  className = "",
}: Props) {
  const style: React.CSSProperties = {
    borderStyle: "solid",
    borderWidth,
    // Nota: 'round' repite suavemente los bordes si no calzan exacto
    borderImage: `url(${src}) ${slice} round`,
    borderRadius: radius,
    // Evita que el contenido pegue directo al borde
    padding: 16,
    background: "white",
  };

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
