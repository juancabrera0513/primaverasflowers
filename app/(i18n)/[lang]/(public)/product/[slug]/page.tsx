// app/(i18n)/[lang]/(public)/product/[slug]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, isLang, type Lang } from "@/lib/i18n";
import { ProductJsonLd } from "@/lib/metadata";
import { getProductBySlug } from "@/lib/data";
import VariantSelector from "@/components/VariantSelector";
import AddonSelector from "@/components/AddonSelector";
import DeliveryPicker from "@/components/DeliveryPicker";

type Params = { lang: string; slug: string };

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lang, slug } = await params;
  const locale: Lang = isLang(lang) ? lang : "en";
  const dict = await getDictionary(locale);

  const product = await getProductBySlug(slug);
  if (!product) return notFound();

  const name = locale === "es" ? product.name_es ?? product.name_en : product.name_en ?? product.name_es;
  const description =
    locale === "es"
      ? product.description_es ?? product.description_en
      : product.description_en ?? product.description_es;
  const price = (product.price_cents ?? 0) / 100;

  return (
    <div>
      <div className="container-narrow py-8 md:py-10">
        {/* JSON-LD */}
        {ProductJsonLd({ product, price }).render(locale)}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Imagen */}
          <div className="rounded-3xl overflow-hidden bg-[rgba(0,0,0,.04)] min-h-[320px] relative">
            {product.primary_image_url ? (
              <Image
                src={product.primary_image_url}
                alt={name}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center text-sm text-neutral-500">
                No image
              </div>
            )}
          </div>

          {/* Panel */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{name}</h1>
              <p className="mt-2 text-neutral-600">{description}</p>
              <div className="mt-3 text-xl font-bold">${price.toFixed(2)}</div>
            </div>

            <VariantSelector variants={product.product_variants ?? []} lang={locale} />
            <AddonSelector addons={product.product_addons ?? []} lang={locale} />
            <DeliveryPicker lang={locale} />
          </div>
        </div>
      </div>
    </div>
  );
}
