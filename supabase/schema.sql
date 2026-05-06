-- ─────────────────────────────────────────────
-- FIRST PICK — Schema inicial
-- Ejecutar en: Supabase → SQL Editor
-- ─────────────────────────────────────────────

-- Productos
create table products (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text,
  price       numeric(10,2) not null,
  category    text not null,
  images      text[] default '{}',
  active      boolean default true,
  created_at  timestamptz default now()
);

-- Variantes (talle / color / stock)
create table variants (
  id          uuid primary key default gen_random_uuid(),
  product_id  uuid references products(id) on delete cascade,
  size        text not null,
  color       text,
  stock       integer not null default 0,
  created_at  timestamptz default now()
);

-- Órdenes
create table orders (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references auth.users(id) on delete set null,
  guest_email  text,
  status       text not null default 'pending'
                check (status in ('pending','paid','shipped','delivered','cancelled')),
  total        numeric(10,2) not null,
  created_at   timestamptz default now()
);

-- Items de cada orden
create table order_items (
  id          uuid primary key default gen_random_uuid(),
  order_id    uuid references orders(id) on delete cascade,
  variant_id  uuid references variants(id) on delete set null,
  quantity    integer not null,
  unit_price  numeric(10,2) not null
);

-- Perfil extendido de usuarios (rol admin/customer)
create table profiles (
  id    uuid primary key references auth.users(id) on delete cascade,
  name  text,
  role  text not null default 'customer'
         check (role in ('customer', 'admin'))
);

-- ── Row Level Security ──────────────────────────────

alter table products   enable row level security;
alter table variants   enable row level security;
alter table orders     enable row level security;
alter table order_items enable row level security;
alter table profiles   enable row level security;

-- Productos: lectura pública, escritura solo admin
create policy "Productos visibles para todos"
  on products for select using (active = true);

create policy "Admin gestiona productos"
  on products for all
  using (exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  ));

-- Variantes: misma lógica que productos
create policy "Variantes visibles para todos"
  on variants for select using (true);

create policy "Admin gestiona variantes"
  on variants for all
  using (exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  ));

-- Órdenes: cada usuario ve solo las suyas
create policy "Usuario ve sus órdenes"
  on orders for select
  using (auth.uid() = user_id);

create policy "Usuario crea órdenes"
  on orders for insert
  with check (auth.uid() = user_id or user_id is null);

create policy "Admin ve todas las órdenes"
  on orders for all
  using (exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  ));

-- Perfil: cada usuario ve y edita el suyo
create policy "Usuario ve su perfil"
  on profiles for select using (auth.uid() = id);

create policy "Usuario edita su perfil"
  on profiles for update using (auth.uid() = id);

-- Trigger: crear perfil automáticamente al registrarse
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id) values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
