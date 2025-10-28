import { requireStaffOrOwner } from "@/lib/rbac";
import { AdminProductForm } from "@/components/AdminProductForm";
import { getDictionary } from "@/lib/i18n";

export default async function NewProductPage({ params }:{ params:{ lang:string } }) {
  await requireStaffOrOwner();
  const dict = await getDictionary(params.lang);
  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">{dict.dashboard.products.new}</h1>
      <AdminProductForm lang={params.lang as "en"|"es"} />
    </section>
  );
}
