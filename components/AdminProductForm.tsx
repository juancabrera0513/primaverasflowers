// components/AdminProductForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name_en: z.string().min(2),
  name_es: z.string().min(2),
  slug: z.string().min(2),
  description_en: z.string().optional(),
  description_es: z.string().optional(),
  price_cents: z.coerce.number().int().nonnegative(),
  is_active: z.boolean().default(false),
  image: z.any().optional(),
});

export function AdminProductForm({ lang }: { lang: "en" | "es" }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: any) {
    let image_url: string | undefined = undefined;
    if (values.image?.[0]) {
      const file = values.image[0];
      const form = new FormData();
      form.append("file", file);
      const up = await fetch("/api/upload-product-image", {
        method: "POST",
        body: form,
      });
      const data = await up.json();
      image_url = data.publicUrl;
    }

    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, primary_image_url: image_url }),
    });

    if (!res.ok)
      alert(lang === "es" ? "Error al crear el producto" : "Failed to create product");
    else alert(lang === "es" ? "Producto creado" : "Product created");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl card space-y-3">
      <label className="block">
        <span className="text-sm">Name (EN)</span>
        <input className="mt-1 input" {...register("name_en")} />
        {errors.name_en && <p className="text-terracotta text-sm">Required</p>}
      </label>
      <label className="block">
        <span className="text-sm">Nombre (ES)</span>
        <input className="mt-1 input" {...register("name_es")} />
        {errors.name_es && <p className="text-terracotta text-sm">Requerido</p>}
      </label>
      <label className="block">
        <span className="text-sm">Slug</span>
        <input className="mt-1 input" {...register("slug")} />
      </label>
      <label className="block">
        <span className="text-sm">Price (cents)</span>
        <input type="number" className="mt-1 input" {...register("price_cents")} />
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" className="checkbox" {...register("is_active")} />
        <span className="text-sm">Active</span>
      </label>
      <label className="block">
        <span className="text-sm">Image</span>
        <input type="file" accept="image/*" className="mt-1 file:mr-3 file:btn file:btn-outline" {...register("image")} />
      </label>
      <button disabled={isSubmitting} className="btn-primary shadow-soft hover:shadow-md">
        {isSubmitting ? (lang === "es" ? "Guardando..." : "Saving...") : (lang === "es" ? "Guardar" : "Save")}
      </button>
    </form>
  );
}
