// components/DeliveryPicker.tsx
"use client";

import * as React from "react";
import dayjs from "dayjs";

type Lang = "en" | "es";

export default function DeliveryPicker({
  date,
  timeWindow,
  onChange,
  lang = "en",
}: {
  date?: string | null;          // YYYY-MM-DD
  timeWindow?: string | null;    // p.ej. "12-15"
  onChange?: (v: { date: string | null; timeWindow: string | null }) => void;
  lang?: Lang;
}) {
  const t = (en: string, es: string) => (lang === "es" ? es : en);

  // Normaliza para los controles (value siempre string)
  const dateValue = date ?? "";
  const windowValue = timeWindow ?? "";

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextDate = e.currentTarget.value || null;
    // 👇 normaliza timeWindow (puede venir undefined)
    onChange?.({ date: nextDate, timeWindow: timeWindow ?? null });
  };

  const handleWindowChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextWindow = e.currentTarget.value || null;
    onChange?.({ date: date ?? null, timeWindow: nextWindow });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <label className="text-sm">
        <span className="block mb-1" style={{ color: "var(--fg)" }}>
          {t("Date", "Fecha")}
        </span>
        <input
          type="date"
          className="input"
          value={dateValue}
          min={dayjs().format("YYYY-MM-DD")}
          onChange={handleDateChange}
        />
      </label>

      <label className="text-sm">
        <span className="block mb-1" style={{ color: "var(--fg)" }}>
          {t("Time window", "Ventana horaria")}
        </span>
        <select
          className="input"
          value={windowValue}
          onChange={handleWindowChange}
        >
          <option value="">{t("Select…", "Seleccionar…")}</option>
          <option value="9-12">9–12</option>
          <option value="12-15">12–15</option>
          <option value="15-18">15–18</option>
        </select>
      </label>
    </div>
  );
}
