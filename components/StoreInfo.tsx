// components/StoreInfo.tsx
type Hours = { day: string; open: string; close: string; note?: string };

export function StoreInfo() {
  const phone = "(917) 770-1684";
  const phoneHref = "tel:+19177701684";
  const address = "463 Fort Washington Ave, New York, NY 10033";
  const mapsHref =
    "https://maps.google.com/?q=463%20Fort%20Washington%20Ave,%20New%20York,%20NY%2010033";

  const hours: Hours[] = [
    { day: "Sunday",    open: "9:00 AM", close: "6:00 PM" },
    { day: "Monday",    open: "9:00 AM", close: "6:00 PM" },
    { day: "Tuesday",   open: "9:00 AM", close: "6:00 PM" },
    { day: "Wednesday", open: "9:00 AM", close: "6:00 PM" },
    { day: "Thursday",  open: "9:00 AM", close: "6:00 PM" },
    { day: "Friday",    open: "9:00 AM", close: "6:00 PM" },
    { day: "Saturday",  open: "9:00 AM", close: "6:00 PM" },
  ];

  const areasServed = [
    "Bronx","Astoria","Yonkers","Flushing","East Elmhurst",
    "Mount Vernon","College Point","Whitestone"
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card">
        <h3 className="text-xl font-bold mb-2" style={{ color: "var(--fg)" }}>
          Contact Us
        </h3>
        <p className="mb-1"><strong>Phone:</strong> <a href={phoneHref}>{phone}</a></p>
        <p className="mb-3">
          <strong>Address:</strong>{" "}
          <a href={mapsHref} target="_blank" rel="noreferrer">{address}</a>
        </p>

        <h4 className="font-semibold mb-2">Store Hours</h4>
        <ul className="divide-y" style={{ borderColor: "var(--border)" }}>
          {hours.map((h) => (
            <li key={h.day} className="py-2 flex items-center justify-between">
              <span>{h.day}</span>
              <span>{h.open} To {h.close}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold mb-2" style={{ color: "var(--fg)" }}>
          Areas Served
        </h3>
        <p style={{ color: "var(--fg-muted)" }}>
          {areasServed.join(", ")}
        </p>
      </div>
    </div>
  );
}
