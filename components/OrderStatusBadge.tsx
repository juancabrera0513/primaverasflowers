// components/OrderStatusBadge.tsx
export function OrderStatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; ring: string; color: string }> = {
    paid:       { bg: "rgba(104,98,72,0.15)",  ring: "rgba(104,98,72,0.20)",  color: "#686248" },
    processing: { bg: "rgba(184,135,104,0.15)",ring: "rgba(184,135,104,0.20)",color: "#B88768" },
    delivered:  { bg: "rgba(22,163,74,0.15)",  ring: "rgba(22,163,74,0.20)",  color: "#166534" },
    canceled:   { bg: "rgba(144,135,121,0.20)",ring: "rgba(144,135,121,0.30)",color: "#908779" },
  };
  const s = styles[status] ?? { bg: "rgba(193,184,167,0.40)", ring: "rgba(165,152,134,0.20)", color: "#2B2A28" };
  return (
    <span className="px-2 py-1 rounded-full text-xs ring-1" style={{ backgroundColor: s.bg, color: s.color, ["--tw-ring-color" as any]: s.ring }}>
      {status}
    </span>
  );
}
