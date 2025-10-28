import { pgTable, text, integer, timestamp, uuid, primaryKey } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  name_en: text("name_en").notNull(),
  name_es: text("name_es").notNull(),
  description_en: text("description_en"),
  description_es: text("description_es"),
  primary_image_url: text("primary_image_url"),
  price_cents: integer("price_cents").notNull().default(0),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  name_en: text("name_en").notNull(),
  name_es: text("name_es").notNull(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const productsCategories = pgTable(
  "products_categories",
  {
    product_id: uuid("product_id").notNull(),
    category_id: uuid("category_id").notNull(),
  },
  (t) => ({ pk: primaryKey({ columns: [t.product_id, t.category_id] }) })
);
