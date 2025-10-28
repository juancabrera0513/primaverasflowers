// app/(i18n)/[lang]/(protected)/dashboard/page.tsx
import { requireStaffOrOwner } from "@/lib/rbac";
import { getDictionary } from "@/lib/i18n";
import { createServerClient } from "@/lib/supabase-server";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  await requireStaffOrOwner();
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const supabase = createServerClient();
  const { data: todayOrders } = await supabase.rpc("orders_today_count");
  const { data: revenueToday } = await supabase.rpc("orders_today_revenue_cents");

  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="card">
        <h3 className="font-semibold">{dict.dashboard.kpis.ordersToday}</h3>
        <div className="text-3xl font-bold">{todayOrders ?? 0}</div>
      </div>
      <div className="card">
        <h3 className="font-semibold">{dict.dashboard.kpis.revenue}</h3>
        <div className="text-3xl font-bold">${((revenueToday ?? 0) / 100).toFixed(2)}</div>
      </div>
    </section>
  );
}
