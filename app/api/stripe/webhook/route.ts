import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServerClient } from "@/lib/supabase-server";
import { Resend } from "resend";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const supabase = createServerClient();
    const { data: existing } = await supabase.from("orders").select("id").eq("stripe_session_id", session.id).maybeSingle();
    if (existing) return NextResponse.json({ ok: true });

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });
    const email = session.customer_details?.email || session.customer_email;

    const { data: order, error: orderErr } = await supabase
      .from("orders").insert({
        stripe_session_id: session.id,
        user_id: null,
        customer_email: email,
        status: "paid",
        subtotal_cents: 0,
        delivery_fee_cents: 0,
        tax_cents: 0,
        total_cents: Math.round(session.amount_total || 0),
        currency: (session.currency || "usd").toUpperCase(),
        delivery_method: session.metadata?.delivery_method || "PICKUP",
        delivery_date: session.metadata?.delivery_date || null,
        delivery_time_window: session.metadata?.delivery_time_window || null,
        delivery_zip: session.metadata?.delivery_zip || null,
        message_card: session.metadata?.message_card || null,
        accept_substitutions: session.metadata?.accept_substitutions === "true",
      }).select("*").single();
    if (orderErr) { console.error(orderErr); return NextResponse.json({ ok:false }, { status: 500 }); }

    let subtotal = 0;
    for (const li of lineItems.data) {
      const unit = (li.amount_subtotal! / li.quantity!);
      subtotal += li.amount_subtotal!;
      await supabase.from("order_items").insert({
        order_id: order.id,
        product_id: null, variant_id: null,
        name_snapshot: li.description!, variant_name_snapshot: null,
        unit_price_cents: unit, quantity: li.quantity!
      });
    }
    await supabase.from("orders").update({
      subtotal_cents: subtotal,
      tax_cents: Math.max(0, Math.round((session.amount_total || 0) - subtotal)),
    }).eq("id", order.id);

    try {
      const resend = new Resend(process.env.RESEND_API_KEY!);
      await resend.emails.send({
        from: "Primavera Flowers <orders@primavera.example>",
        to: email,
        subject: `Your Primavera Flowers order #${order.order_number ?? ""}`,
        html: `<p>Thanks for your order!</p>`,
      });
    } catch (e) { console.error("Resend error", e); }
  }
  return NextResponse.json({ received: true }, { status: 200 });
}
