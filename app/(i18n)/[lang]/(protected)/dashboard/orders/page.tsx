import { requireStaffOrOwner } from "@/lib/rbac";
import { createServerClient } from "@/lib/supabase-server";
import { OrderStatusBadge } from "@/components/OrderStatusBadge";
import dayjs from "dayjs";

export default async function OrdersPage() {
  await requireStaffOrOwner();
  const supabase = createServerClient();
  const { data } = await supabase.from("orders").select("id, order_number, status, total_cents, customer_email, created_at").order("created_at", { ascending: false }).limit(50);

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="bg-white rounded-2xl overflow-hidden shadow-soft">
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            <tr><th className="p-3">#</th><th className="p-3">Customer</th><th className="p-3">Status</th><th className="p-3">Total</th><th className="p-3">Date</th></tr>
          </thead>
          <tbody>
            {data?.map((o:any)=>(
              <tr key={o.id} className="border-t">
                <td className="p-3">{o.order_number}</td>
                <td className="p-3">{o.customer_email}</td>
                <td className="p-3"><OrderStatusBadge status={o.status} /></td>
                <td className="p-3">${(o.total_cents/100).toFixed(2)}</td>
                <td className="p-3">{dayjs(o.created_at).format("YYYY-MM-DD HH:mm")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
