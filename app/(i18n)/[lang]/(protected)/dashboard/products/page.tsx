import Link from "next/link";
import { requireStaffOrOwner } from "@/lib/rbac";
import { createServerClient } from "@/lib/supabase-server";
import { getDictionary } from "@/lib/i18n";

export default async function ProductsPage({ params }:{ params:{ lang:string } }) {
  await requireStaffOrOwner();
  const dict = await getDictionary(params.lang);
  const supabase = createServerClient();
  const { data } = await supabase.from("products").select("id, name_en, name_es, price_cents, is_active").order("updated_at", { ascending: false });

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{dict.dashboard.products.title}</h1>
        <Link className="px-3 py-2 bg-brand text-white rounded-xl" href={`/${params.lang}/dashboard/products/new`}>{dict.dashboard.products.new}</Link>
      </div>
      <ul className="divide-y bg-white rounded-2xl shadow-soft">
        {data?.map((p:any)=>(
          <li key={p.id} className="p-4 flex items-center justify-between">
            <div><div className="font-semibold">{p.name_en}</div>
              <div className="text-sm text-gray-500">${(p.price_cents/100).toFixed(2)}</div></div>
            <span className={`px-2 py-1 rounded-full text-xs ${p.is_active ? "bg-green-100 text-green-700":"bg-gray-100 text-gray-700"}`}>
              {p.is_active ? "Active" : "Draft"}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
