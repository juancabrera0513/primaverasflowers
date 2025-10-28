import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const { items, delivery } = await req.json();
    const line_items = items.map((it: any) => ({
      price_data: {
        currency: "usd",
        product_data: { name: it.nameSnapshot },
        unit_amount: it.unitPriceCents,
      },
      quantity: it.quantity,
    }));
    if (delivery?.feeCents && delivery.feeCents > 0) {
      line_items.push({
        price_data: {
          currency: "usd",
          product_data: { name: "Local Delivery" },
          unit_amount: delivery.feeCents,
        },
        quantity: 1,
      });
    }
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/en/checkout?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/en/cart`,
      billing_address_collection: "required",
      shipping_address_collection: { allowed_countries: ["US"] },
      automatic_tax: { enabled: true },
      metadata: {
        delivery_method: delivery?.method ?? "PICKUP",
        delivery_date: delivery?.date ?? "",
        delivery_time_window: delivery?.timeWindow ?? "",
        delivery_zip: delivery?.zip ?? "",
        message_card: delivery?.messageCard ?? "",
        accept_substitutions: String(delivery?.acceptSubstitutions ?? true),
      },
    });
    return NextResponse.json({ id: session.id, url: session.url });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
