// app/(i18n)/[lang]/(public)/contact/page.tsx
import type { Metadata } from "next";
import { StoreInfo } from "@/components/StoreInfo";

export const metadata: Metadata = {
  title: "Contact Us — Primavera Flowers NYC",
  description:
    "Questions about same-day delivery, custom bouquets, or event florals? Contact Primavera Flowers NYC — we’re happy to help.",
};

export default async function ContactPage() {
  return (
    <>
      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(1200px 600px at 10% -10%, rgba(255,107,79,0.22), transparent 60%), radial-gradient(1000px 500px at 95% 10%, rgba(255,172,130,0.18), transparent 60%), linear-gradient(180deg, #fff, #fff)",
        }}
      >
        <div className="container-narrow py-14 md:py-16">
          <div className="max-w-2xl">
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: "rgba(255,107,79,0.10)", color: "var(--terracotta)" }}
            >
              Primavera Flowers NYC
            </span>
            <h1
              className="mt-3 text-3xl md:text-5xl font-extrabold leading-[1.1] tracking-tight"
              style={{ color: "var(--fg)" }}
            >
              Let&rsquo;s make something beautiful.
            </h1>
            <p className="mt-4 text-lg md:text-xl" style={{ color: "var(--fg-muted)" }}>
              Same-day Manhattan delivery before <strong>1:00&nbsp;p.m.</strong> &middot; Custom
              bouquets and event florals &middot; Thoughtful service from our studio to your door.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#contact-form"
                className="btn btn-primary"
                style={{ background: "var(--terracotta)", borderColor: "var(--terracotta)" }}
              >
                Start your message
              </a>
              <a
                href="tel:+1-212-555-0110"
                className="btn"
                style={{ borderColor: "var(--terracotta)", color: "var(--terracotta)" }}
              >
                Call us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="section">
        <div className="container-narrow py-10 grid lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-5 sm:p-6 md:p-7 rounded-3xl shadow-sm">
              <StoreInfo />
            </div>

            <div className="card p-5 sm:p-6 md:p-7 rounded-3xl shadow-sm">
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--fg)" }}>
                Delivery &amp; FAQs
              </h2>
              <Accordion
                items={[
                  {
                    q: "Do you offer same-day delivery?",
                    a: (
                      <>
                        Yes &mdash; orders placed before <strong>1:00&nbsp;p.m.</strong> in the
                        recipient&rsquo;s time zone qualify for same-day delivery. Orders after
                        that time will arrive the next day.
                      </>
                    ),
                  },
                  {
                    q: "Which neighborhoods do you serve?",
                    a: (
                      <>
                        Most of Manhattan and parts of Brooklyn/Queens. Rural routes and cemeteries
                        may not be eligible. If you&rsquo;re unsure, send us the exact address and
                        we&rsquo;ll confirm availability.
                      </>
                    ),
                  },
                  {
                    q: "Can I request a specific delivery time?",
                    a: (
                      <>
                        We always try to accommodate preferred time windows; however, exact times
                        can&rsquo;t be guaranteed during high-volume periods (Mother&rsquo;s Day,
                        Valentine&rsquo;s, holidays).
                      </>
                    ),
                  },
                  {
                    q: "Do you accept international orders?",
                    a: (
                      <>
                        Please call us for international deliveries. We currently don&rsquo;t accept
                        international orders online.
                      </>
                    ),
                  },
                ]}
              />
            </div>

            <div className="card p-5 sm:p-6 md:p-7 rounded-3xl shadow-sm">
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--fg)" }}>
                Find us
              </h2>
              <div className="aspect-[16/9] w-full overflow-hidden rounded-xl border">
                <iframe
                  title="Map to Primavera Flowers NYC"
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://maps.google.com/maps?q=Manhattan%20NYC&t=&z=13&ie=UTF8&iwloc=&output=embed"
                />
              </div>
              <p className="mt-3 text-sm" style={{ color: "var(--fg-muted)" }}>
                Street parking is limited; we recommend rideshare or public transit. Please call if
                you need assistance with pickups.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN — FORM */}
          <div className="lg:col-span-1">
            <div className="card p-5 sm:p-6 md:p-7 rounded-3xl shadow-sm">
              <h2 className="text-2xl font-bold mb-1" style={{ color: "var(--fg)" }}>
                Send us a message
              </h2>
              <p className="mb-4 text-sm" style={{ color: "var(--fg-muted)" }}>
                We&rsquo;ll get back to you within the same business day.
              </p>
              <ContactForm />
            </div>

            <div
              className="mt-6 rounded-2xl p-4 border"
              style={{ borderColor: "rgba(255,107,79,0.35)", background: "rgba(255,107,79,0.06)" }}
            >
              <p className="text-sm" style={{ color: "var(--fg)" }}>
                Prefer to talk? Call{" "}
                <a
                  className="font-semibold underline"
                  style={{ color: "var(--terracotta)" }}
                  href="tel:+1-212-555-0110"
                >
                  (212) 555-0110
                </a>{" "}
                or chat via{" "}
                <a
                  className="font-semibold underline"
                  style={{ color: "var(--terracotta)" }}
                  href="https://wa.me/12125550110"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STRIP / SOCIAL PROOF */}
      <section
        className="py-10"
        style={{ background: "linear-gradient(180deg, rgba(255,107,79,0.06), rgba(255,107,79,0.06))" }}
      >
        <div className="container-narrow">
          <div className="grid gap-4 md:grid-cols-3">
            <Highlight title="Same-day delivery" text="Order before 1:00 p.m. in Manhattan." />
            <Highlight title="Custom florals" text="Bouquets tailored to your occasion & style." />
            <Highlight title="Care & quality" text="Every stem is conditioned and arranged by hand." />
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------- Inline components ---------- */

function Highlight({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl p-5 border bg-white shadow-sm">
      <h3 className="font-semibold" style={{ color: "var(--fg)" }}>
        {title}
      </h3>
      <p className="mt-1 text-sm" style={{ color: "var(--fg-muted)" }}>
        {text}
      </p>
    </div>
  );
}

function Accordion({ items }: { items: { q: string; a: React.ReactNode }[] }) {
  return (
    <div className="divide-y">
      {items.map((item, idx) => (
        <details key={idx} className="group py-3">
          <summary className="flex cursor-pointer list-none items-center justify-between">
            <span className="font-medium" style={{ color: "var(--fg)" }}>
              {item.q}
            </span>
            <span
              aria-hidden
              className="ml-4 inline-flex h-6 w-6 items-center justify-center rounded-full border text-sm"
              style={{ borderColor: "rgba(0,0,0,0.08)", color: "var(--fg-muted)" }}
            >
              +
            </span>
          </summary>
          <div className="pt-2 text-sm leading-7" style={{ color: "var(--fg-muted)" }}>
            {item.a}
          </div>
        </details>
      ))}
    </div>
  );
}

/* ---------- Form with improved MESSAGE textarea ---------- */

function ContactForm() {
  return (
    <form
      id="contact-form"
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      className="space-y-4"
    >
      {/* Netlify hidden fields */}
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Don’t fill this out if you’re human: <input name="bot-field" />
        </label>
      </p>

      <Field label="Name" name="name" autoComplete="name" required />
      <Field label="Email" name="email" type="email" autoComplete="email" required />
      <Field label="Phone (optional)" name="phone" type="tel" autoComplete="tel" />
      <Field label="Subject" name="subject" placeholder="Custom bouquet / Event florals / Other" />

      {/* ✅ Mensaje: tipografía y legibilidad mejoradas */}
      <div>
        <label className="text-sm font-medium">Message</label>
        <textarea
          className="
            mt-1 w-full rounded-2xl border
            bg-white
            px-4 py-3
            text-base leading-relaxed tracking-[0.01em]
            placeholder:text-neutral-400
            focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400
            min-h-[160px] resize-y
            shadow-[inset_0_1px_0_rgba(0,0,0,0.02)]
          "
          name="message"
          placeholder="Tell us about your occasion, delivery date, budget range, and any favorite flowers."
          required
          style={{
            color: "var(--fg)",
            borderColor: "rgba(0,0,0,0.10)",
            caretColor: "var(--terracotta)",
            background: "rgba(255,255,255,0.98)",
          }}
        />
        <p className="mt-1 text-xs" style={{ color: "var(--fg-muted)" }}>
          Tip: Include delivery zip code and preferred delivery window for a faster reply.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="btn btn-primary"
          type="submit"
          style={{ background: "var(--terracotta)", borderColor: "var(--terracotta)" }}
        >
          Send message
        </button>
        <p className="text-xs" style={{ color: "var(--fg-muted)" }} aria-live="polite">
          We usually reply within the same business day.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  required,
}: {
  label: string;
  name: string;
  type?: "text" | "email" | "tel";
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        className="
          mt-1 w-full rounded-2xl border
          bg-white
          px-4 h-11
          text-[15px] leading-6
          placeholder:text-neutral-400
          focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400
          shadow-[inset_0_1px_0_rgba(0,0,0,0.02)]
        "
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        style={{
          color: "var(--fg)",
          borderColor: "rgba(0,0,0,0.10)",
          caretColor: "var(--terracotta)",
          background: "rgba(255,255,255,0.98)",
        }}
      />
    </div>
  );
}
