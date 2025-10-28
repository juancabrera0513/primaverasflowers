// lib/i18n.ts
import "server-only";

export type Lang = "en" | "es";

export function isLang(x: string): x is Lang {
  return x === "en" || x === "es";
}

export type Dict = {
  lang: Lang;
  common: any;
  dashboard: any;
  catalog?: { title: string; subtitle: string };
};

export async function getDictionary(lang: Lang): Promise<Dict> {
  const [common, dashboard, catalog] = await Promise.all([
    import(`@/locales/${lang}/common.json`).then((m) => m.default).catch(() => ({})),
    import(`@/locales/${lang}/dashboard.json`).then((m) => m.default).catch(() => ({})),
    import(`@/locales/${lang}/catalog.json`).then((m) => m.default).catch(() => ({})),
  ]);

  return { lang, common, dashboard, catalog };
}
