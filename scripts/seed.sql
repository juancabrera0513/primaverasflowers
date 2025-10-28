insert into public.categories (name_en, name_es, slug, sort)
values ('Bouquets','Ramos','bouquets',1), ('Occasions','Ocasiones','occasions',2)
on conflict (slug) do nothing;

insert into public.addons (name_en, name_es, price_cents, sort) values
('Chocolates','Chocolates',1299,1),
('Balloons','Globos',899,2),
('Glass Vase','Jarrón de vidrio',1499,3)
on conflict do nothing;

insert into public.products (category_id, name_en, name_es, slug, description_en, description_es, price_cents, primary_image_url, is_active, sort)
select c.id, 'Rose Bouquet (S)','Ramo de Rosas (S)','rose-bouquet-s','A petite bouquet of fresh roses.','Un ramo pequeño de rosas frescas.',3999,'https://images.unsplash.com/photo-1509043759401-136742328bb3',true,1
from public.categories c where c.slug='bouquets' on conflict (slug) do nothing;

insert into public.products (category_id, name_en, name_es, slug, description_en, description_es, price_cents, primary_image_url, is_active, sort)
select c.id, 'Rose Bouquet (M)','Ramo de Rosas (M)','rose-bouquet-m','A medium bouquet of roses.','Un ramo mediano de rosas.',5999,'https://images.unsplash.com/photo-1520256862855-398228c41684',true,2
from public.categories c where c.slug='bouquets' on conflict (slug) do nothing;

insert into public.products (category_id, name_en, name_es, slug, description_en, description_es, price_cents, primary_image_url, is_active, sort)
select c.id, 'Rose Bouquet (L)','Ramo de Rosas (L)','rose-bouquet-l','A large bouquet with premium roses.','Un ramo grande con rosas premium.',7999,'https://images.unsplash.com/photo-1457089328109-e5d9bd499191',true,3
from public.categories c where c.slug='bouquets' on conflict (slug) do nothing;

insert into public.products (category_id, name_en, name_es, slug, description_en, description_es, price_cents, primary_image_url, is_active, sort)
select c.id, 'Sunshine Mix','Mezcla de Sol','sunshine-mix','Bright seasonal flowers.','Flores de temporada brillantes.',5499,'https://images.unsplash.com/photo-1490750967868-88aa4486c946',true,4
from public.categories c where c.slug='bouquets' on conflict (slug) do nothing;

insert into public.products (category_id, name_en, name_es, slug, description_en, description_es, price_cents, primary_image_url, is_active, sort)
select c.id, 'Get Well Soon','Que te mejores','get-well-soon','Cheerful bouquet for a speedy recovery.','Ramo alegre para pronta recuperación.',4999,'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d',true,5
from public.categories c where c.slug='occasions' on conflict (slug) do nothing;

insert into public.product_variants (product_id, name, price_delta_cents, sort)
select p.id, 'Small', 0, 1 from public.products p where p.slug = 'rose-bouquet-s'
union all select p.id, 'Medium', 2000, 2 from public.products p where p.slug = 'rose-bouquet-m'
union all select p.id, 'Large', 4000, 3 from public.products p where p.slug = 'rose-bouquet-l';

insert into public.product_addons (product_id, addon_id)
select p.id, a.id from public.products p join public.addons a on a.is_active=true
where p.slug in ('rose-bouquet-s','rose-bouquet-m','rose-bouquet-l','sunshine-mix','get-well-soon')
on conflict do nothing;
