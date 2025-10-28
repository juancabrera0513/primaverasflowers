// app/(i18n)/[lang]/(public)/contact/page.tsx
import { StoreInfo } from "@/components/StoreInfo";

export const metadata = {
  title: "Contact Us — Primavera Flowers NYC",
  description:
    "Get in touch with Primavera Flowers NYC: phone, address, store hours and delivery information.",
};

export default async function ContactPage() {
  return (
    <>
      <section className="section-alt">
        <div className="container-narrow py-10">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3" style={{ color: "var(--fg)" }}>
            Contact Us
          </h1>
          <p className="text-lg" style={{ color: "var(--fg-muted)" }}>
            We’re here to help with orders, delivery questions, and custom floral designs.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-narrow py-10 grid lg:grid-cols-3 gap-6">
          {/* Info de tienda */}
          <div className="lg:col-span-2">
            <div className="card mb-6">
              <StoreInfo />
            </div>

            {/* Políticas y entregas */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--fg)" }}>
                Delivery & Holidays
              </h2>

              <details className="mb-4" open>
                <summary className="font-semibold cursor-pointer">Delivery Policy</summary>
                <div className="mt-2 text-sm leading-7" style={{ color: "var(--fg-muted)" }}>
                  <p>
                    A local delivery fee of $10.00 will be added to each order, for each address.
                    (For deliveries outside our local delivery area, this fee may vary.)
                  </p>
                  <p className="mt-2">
                    U.S. orders must be received before <strong>1:00 p.m.</strong> in the recipient's time zone to assure same-day delivery.
                    Orders received after that time will be delivered the following day.
                  </p>
                  <p className="mt-2">
                    We will do our best to accommodate deliveries at specific times of day, but we cannot guarantee it.
                  </p>
                  <p className="mt-2">
                    We are unable to make deliveries on Sundays. Deliveries requested on this day will be delivered the following business day.
                  </p>
                  <p className="mt-2">
                    Delivery of orders to rural route addresses or cemeteries cannot be guaranteed.
                  </p>
                  <p className="mt-2">
                    We will be happy to accept your international orders if you call our shop directly. We are unable to accept international orders over the Internet.
                  </p>
                </div>
              </details>

              <details>
                <summary className="font-semibold cursor-pointer">Holiday Deliveries</summary>
                <div className="mt-2 text-sm leading-7" style={{ color: "var(--fg-muted)" }}>
                  <p>
                    To help assure on-time delivery during the busy holiday season, place your order at least 1 day prior to the following major holidays:
                    Thanksgiving Day, Christmas Day, New Year's Day, Valentine's Day, Easter, Administrative Professionals Week, Mother's Day, Memorial Day, Father's Day, Independence Day and Labor Day.
                  </p>
                  <p className="mt-2">
                    Our shop will always be closed on the following holidays:
                    Thanksgiving Day, Christmas Day, New Year's Day, Easter, Mother's Day, Memorial Day, Father's Day, Independence Day and Labor Day.
                  </p>
                </div>
              </details>
            </div>
          </div>

          {/* Formulario de contacto (dummy, listo para wirear a Resend o mailto) */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--fg)" }}>
              Send us a message
            </h2>
            <form
              className="space-y-3"
              action="mailto:info@example.com"
              method="post"
              encType="text/plain"
            >
              <label className="block">
                <span className="text-sm font-medium">Name</span>
                <input className="input mt-1" name="name" placeholder="Your name" />
              </label>
              <label className="block">
                <span className="text-sm font-medium">Email</span>
                <input className="input mt-1" name="email" type="email" placeholder="you@example.com" />
              </label>
              <label className="block">
                <span className="text-sm font-medium">Message</span>
                <textarea className="input mt-1" name="message" rows={5} placeholder="How can we help?" />
              </label>
              <button className="btn btn-primary" type="submit">Send</button>
            </form>
            <p className="text-xs mt-3" style={{ color: "var(--fg-muted)" }}>
              *Pronto conectaremos este formulario a Resend para enviar correos transaccionales.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
