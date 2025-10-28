-- (same as provided in the answer; trimmed minimal for starter) 
create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  role text not null default 'customer' check (role in ('owner','staff','customer')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email);
  return new;
end; $$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

create table if not exists public.categories (
  id uuid primary key default uuid_generate_v4(),
  name_en text not null, name_es text not null, slug text unique not null,
  sort int not null default 0, created_at timestamptz default now(), updated_at timestamptz default now()
);

create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  category_id uuid references public.categories(id) on delete set null,
  name_en text not null, name_es text not null, slug text unique not null,
  description_en text, description_es text,
  price_cents int not null check (price_cents >= 0),
  primary_image_url text, is_active boolean not null default false,
  sort int not null default 0, created_at timestamptz default now(), updated_at timestamptz default now()
);

create table if not exists public.product_images (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references public.products(id) on delete cascade,
  image_url text not null, sort int not null default 0
);

create table if not exists public.product_variants (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references public.products(id) on delete cascade,
  name text not null, price_delta_cents int not null default 0, sort int not null default 0
);

create table if not exists public.addons (
  id uuid primary key default uuid_generate_v4(),
  name_en text not null, name_es text not null,
  price_cents int not null check (price_cents >= 0),
  is_active boolean not null default true, sort int not null default 0
);

create table if not exists public.product_addons (
  product_id uuid references public.products(id) on delete cascade,
  addon_id uuid references public.addons(id) on delete cascade,
  primary key (product_id, addon_id)
);

create table if not exists public.product_inventory_by_date (
  product_id uuid references public.products(id) on delete cascade,
  date date not null, available int not null default 99999, primary key (product_id, date)
);

create table if not exists public.carts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete set null,
  anonymous_id text, status text not null default 'active' check (status in ('active','converted','abandoned')),
  delivery_method text check (delivery_method in ('PICKUP','LOCAL_DELIVERY')),
  delivery_date date, delivery_time_window text, delivery_zip text,
  delivery_distance_miles numeric, delivery_fee_cents int default 0,
  message_card text, accept_substitutions boolean default true,
  created_at timestamptz default now(), updated_at timestamptz default now()
);

create table if not exists public.cart_items (
  id uuid primary key default uuid_generate_v4(),
  cart_id uuid not null references public.carts(id) on delete cascade,
  product_id uuid not null references public.products(id),
  variant_id uuid references public.product_variants(id),
  quantity int not null default 1 check (quantity > 0),
  unit_price_cents int not null check (unit_price_cents >= 0)
);

create table if not exists public.cart_item_addons (
  cart_item_id uuid references public.cart_items(id) on delete cascade,
  addon_id uuid references public.addons(id),
  addon_price_cents int not null,
  primary key (cart_item_id, addon_id)
);

create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  order_number bigserial unique,
  user_id uuid references auth.users(id) on delete set null,
  customer_email text, stripe_session_id text unique,
  status text not null default 'paid' check (status in ('paid','processing','delivered','canceled')),
  subtotal_cents int not null default 0, delivery_fee_cents int not null default 0,
  tax_cents int not null default 0, total_cents int not null default 0, currency text not null default 'USD',
  delivery_method text check (delivery_method in ('PICKUP','LOCAL_DELIVERY')),
  delivery_date date, delivery_time_window text, delivery_zip text,
  message_card text, accept_substitutions boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  variant_id uuid references public.product_variants(id),
  name_snapshot text not null, variant_name_snapshot text,
  unit_price_cents int not null, quantity int not null default 1
);

create table if not exists public.order_item_addons (
  order_item_id uuid references public.order_items(id) on delete cascade,
  addon_id uuid references public.addons(id),
  name_snapshot text not null, addon_price_cents int not null,
  primary key (order_item_id, addon_id)
);

create table if not exists public.store_settings (
  id int primary key default 1,
  business_name text default 'Primavera Flowers',
  business_timezone text default 'America/Chicago',
  same_day_cutoff_local time default '14:00',
  delivery_rate_cents_per_mile int default 300,
  delivery_max_radius_miles numeric default 10,
  default_zip text default '63123'
);
insert into public.store_settings (id) values (1) on conflict (id) do nothing;

-- indexes
create index if not exists products_is_active_idx on public.products(is_active);
create index if not exists products_category_idx on public.products(category_id);
create index if not exists carts_user_idx on public.carts(user_id);
create index if not exists carts_anon_idx on public.carts(anonymous_id);
create index if not exists orders_user_idx on public.orders(user_id);

-- functions
create or replace function public.orders_today_count() returns int language sql stable as $$ select count(*)::int from public.orders where created_at::date = now()::date; $$;
create or replace function public.orders_today_revenue_cents() returns int language sql stable as $$ select coalesce(sum(total_cents),0)::int from public.orders where created_at::date = now()::date; $$;

-- RLS
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.product_variants enable row level security;
alter table public.addons enable row level security;
alter table public.product_addons enable row level security;
alter table public.product_inventory_by_date enable row level security;
alter table public.carts enable row level security;
alter table public.cart_items enable row level security;
alter table public.cart_item_addons enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.order_item_addons enable row level security;

create or replace function public.is_staff_or_owner(uid uuid) returns boolean language sql stable as $$
  select exists (select 1 from public.profiles where id = uid and role in ('owner','staff'));
$$;

create policy "read own profile" on public.profiles for select using (auth.uid() = id);
create policy "update own profile" on public.profiles for update using (auth.uid() = id);

create policy "categories public read" on public.categories for select using (true);
create policy "categories write staff/owner" on public.categories for all using (public.is_staff_or_owner(auth.uid()));

create policy "products public read active" on public.products for select using (is_active = true);
create policy "products staff/owner read" on public.products for select using (public.is_staff_or_owner(auth.uid()));
create policy "products staff/owner write" on public.products for all using (public.is_staff_or_owner(auth.uid()));

create policy "product_images read public" on public.product_images for select using (true);
create policy "product_images write staff/owner" on public.product_images for all using (public.is_staff_or_owner(auth.uid()));

create policy "product_variants read public if product active" on public.product_variants
for select using (exists (select 1 from public.products p where p.id = product_id and (p.is_active = true or public.is_staff_or_owner(auth.uid()))));
create policy "product_variants write staff/owner" on public.product_variants for all using (public.is_staff_or_owner(auth.uid()));

create policy "addons public read active" on public.addons for select using (is_active = true);
create policy "addons staff/owner write" on public.addons for all using (public.is_staff_or_owner(auth.uid()));

create policy "product_addons read public" on public.product_addons for select using (true);
create policy "product_addons write staff/owner" on public.product_addons for all using (public.is_staff_or_owner(auth.uid()));

create policy "inv read public" on public.product_inventory_by_date for select using (true);
create policy "inv write staff/owner" on public.product_inventory_by_date for all using (public.is_staff_or_owner(auth.uid()));

create policy "carts select by owner or anon" on public.carts for select using (user_id = auth.uid());
create policy "carts insert" on public.carts for insert with check (user_id is null or user_id = auth.uid());
create policy "carts update by owner or anon" on public.carts for update using (user_id = auth.uid());

create policy "cart_items read by cart" on public.cart_items for select using (exists (select 1 from public.carts c where c.id = cart_id and (c.user_id = auth.uid())));
create policy "cart_items write by cart" on public.cart_items for all using (exists (select 1 from public.carts c where c.id = cart_id and (c.user_id = auth.uid())));

create policy "order read own or staff" on public.orders for select using (user_id = auth.uid() or public.is_staff_or_owner(auth.uid()));
create policy "order insert staff/owner or own" on public.orders for insert with check (user_id = auth.uid() or public.is_staff_or_owner(auth.uid()));

create policy "order_items read via order" on public.order_items for select using (exists (select 1 from public.orders o where o.id = order_id and (o.user_id = auth.uid() or public.is_staff_or_owner(auth.uid()))));
create policy "order_items insert via order" on public.order_items for insert with check (exists (select 1 from public.orders o where o.id = order_id and (o.user_id = auth.uid() or public.is_staff_or_owner(auth.uid()))));

create policy "order_item_addons read/insert via order" on public.order_item_addons
for all using (exists (select 1 from public.order_items oi join public.orders o on o.id = oi.order_id where oi.id = order_item_id and (o.user_id = auth.uid() or public.is_staff_or_owner(auth.uid()))));
