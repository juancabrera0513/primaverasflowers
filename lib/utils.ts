"use client";
import { useEffect, useMemo, useState } from "react";

export type CartItem = {
  key: string;
  productId: string;
  variantId: string | null;
  quantity: number;
  unitPriceCents: number;
  addons: { id: string; priceCents: number }[];
  nameSnapshot: string;
};

type DeliveryState = {
  method: "PICKUP" | "LOCAL_DELIVERY";
  feeCents: number;
  date?: string;
  timeWindow?: string;
  zip?: string;
  distanceMiles?: number;
  messageCard?: string;
  acceptSubstitutions?: boolean;
};

type Totals = {
  subtotalCents: number;
  taxEstCents: number;
  totalCents: number;
};

const KEY = "primavera_cart_v1";

function load() {
  if (typeof window === "undefined") return { items: [], delivery: { method: "PICKUP", feeCents: 0 } as DeliveryState };
  const raw = localStorage.getItem(KEY);
  if (!raw) return { items: [], delivery: { method: "PICKUP", feeCents: 0 } as DeliveryState };
  try { return JSON.parse(raw); } catch { return { items: [], delivery: { method: "PICKUP", feeCents: 0 } }; }
}

function save(state: any) {
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(state));
}

export function useCart() {
  const [state, setState] = useState<{ items: CartItem[]; delivery: DeliveryState }>(() => load());

  useEffect(() => save(state), [state]);

  const totals: Totals = useMemo(() => {
    const subtotal = state.items.reduce((s, it) => {
      const addons = it.addons.reduce((a, ad) => a + ad.priceCents, 0) * it.quantity;
      return s + it.unitPriceCents * it.quantity + addons;
    }, 0);
    const taxEst = Math.round(subtotal * 0.08);
    const total = subtotal + state.delivery.feeCents + taxEst;
    return { subtotalCents: subtotal, taxEstCents: taxEst, totalCents: total };
  }, [state]);

  function addItem(input: Omit<CartItem, "key">) {
    const key = `${input.productId}:${input.variantId ?? "base"}:${input.addons.map((a) => a.id).sort().join(",")}`;
    setState((s) => {
      const exist = s.items.find((i) => i.key === key);
      if (exist) { exist.quantity += input.quantity; return { ...s, items: [...s.items] }; }
      return { ...s, items: [...s.items, { ...input, key }] };
    });
  }

  function setDelivery(d: Partial<DeliveryState>) { setState((s) => ({ ...s, delivery: { ...s.delivery, ...d } })); }
  function removeItem(key: string) { setState((s) => ({ ...s, items: s.items.filter((i) => i.key !== key) })); }
  function clear() { setState({ items: [], delivery: { method: "PICKUP", feeCents: 0 } }); }

  return { items: state.items, delivery: state.delivery, totals, addItem, setDelivery, removeItem, clear };
}
