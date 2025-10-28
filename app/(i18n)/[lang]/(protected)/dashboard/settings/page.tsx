import { requireStaffOrOwner } from "@/lib/rbac";
import { createServerClient } from "@/lib/supabase-server";

export default async function SettingsPage() {
  await requireStaffOrOwner();
  const supabase = createServerClient();
  const { data: settings } = await supabase.from("store_settings").select("*").single();

  return (
    <section className="max-w-2xl space-y-3">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="card">
        <div className="font-semibold mb-2">Same-day cutoff</div>
        <div>{settings?.same_day_cutoff_local ?? "14:00"}</div>
      </div>
      <div className="card">
        <div className="font-semibold mb-2">Delivery</div>
        <div>Rate per mile: ${((settings?.delivery_rate_cents_per_mile ?? 300)/100).toFixed(2)}</div>
        <div>Max radius (miles): {settings?.delivery_max_radius_miles ?? 10}</div>
        <div>Business timezone: {settings?.business_timezone ?? "America/Chicago"}</div>
      </div>
    </section>
  );
}
