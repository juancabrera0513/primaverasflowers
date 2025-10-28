// app/layout.tsx
import "../styles/globals.css"; // <-- ruta correcta
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Primavera Flowers",
  description: "Fresh flowers, same-day delivery.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
