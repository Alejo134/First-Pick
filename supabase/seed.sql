-- ─────────────────────────────────────────────
-- FIRST PICK — Seed de productos placeholder
-- Ejecutar en: Supabase → SQL Editor
-- ─────────────────────────────────────────────

-- Limpia datos previos (en orden por FK)
truncate table order_items, orders, variants, products restart identity cascade;

-- ── Productos ───────────────────────────────
insert into products (id, name, description, price, category, images, active) values

  ('a1000000-0000-0000-0000-000000000001',
   'Remera Oversize Básica',
   'Corte amplio con hombros caídos. Tela jersey 100% algodón peinado 200g. Cuello redondo reforzado.',
   18500, 'remeras', '{}', true),

  ('a1000000-0000-0000-0000-000000000002',
   'Remera Manga Larga',
   'Fit ajustado, puños elastizados. Algodón 180g ideal para capas.',
   21000, 'remeras', '{}', true),

  ('a1000000-0000-0000-0000-000000000003',
   'Buzo Canguro',
   'Interior de frisa suave. Bolsillo central tipo canguro. Cordón plano en capucha.',
   34500, 'buzos', '{}', true),

  ('a1000000-0000-0000-0000-000000000004',
   'Buzo Crewneck',
   'Sin capucha, cuello redondo acanalado. Puños y cintura en canalé. Gramaje 320g.',
   31000, 'buzos', '{}', true),

  ('a1000000-0000-0000-0000-000000000005',
   'Pantalón Cargo Relaxed',
   'Fit holgado con múltiples bolsillos laterales. Tiro alto, tobillero.',
   27000, 'pantalones', '{}', true),

  ('a1000000-0000-0000-0000-000000000006',
   'Pantalón Jogger',
   'Cintura elástica con cordón. Puño elastizado en tobillo. Tela french terry.',
   24000, 'pantalones', '{}', true),

  ('a1000000-0000-0000-0000-000000000007',
   'Campera Técnica',
   'Impermeable liviana, costuras selladas. Capucha desmontable con velcro.',
   54000, 'camperas', '{}', true),

  ('a1000000-0000-0000-0000-000000000008',
   'Campera Bomber',
   'Tela ripstop, forro interior satinado. Cierre central con tapeta. Puños acanalados.',
   48000, 'camperas', '{}', true),

  ('a1000000-0000-0000-0000-000000000009',
   'Short Cargo',
   'Largo hasta la rodilla, dos bolsillos laterales con tapa. Cintura elástica.',
   16500, 'shorts', '{}', true),

  ('a1000000-0000-0000-0000-000000000010',
   'Short Deportivo',
   'Tela microfibra liviana. Cintura elástica con cordón. Bolsillo trasero con cierre.',
   14000, 'shorts', '{}', true);

-- ── Variantes ───────────────────────────────
insert into variants (product_id, size, stock) values

  -- Remera Oversize Básica
  ('a1000000-0000-0000-0000-000000000001', 'S',  4),
  ('a1000000-0000-0000-0000-000000000001', 'M',  6),
  ('a1000000-0000-0000-0000-000000000001', 'L',  5),
  ('a1000000-0000-0000-0000-000000000001', 'XL', 2),

  -- Remera Manga Larga
  ('a1000000-0000-0000-0000-000000000002', 'S',  3),
  ('a1000000-0000-0000-0000-000000000002', 'M',  5),
  ('a1000000-0000-0000-0000-000000000002', 'L',  4),

  -- Buzo Canguro
  ('a1000000-0000-0000-0000-000000000003', 'S',  2),
  ('a1000000-0000-0000-0000-000000000003', 'M',  5),
  ('a1000000-0000-0000-0000-000000000003', 'L',  4),
  ('a1000000-0000-0000-0000-000000000003', 'XL', 3),

  -- Buzo Crewneck
  ('a1000000-0000-0000-0000-000000000004', 'S',  3),
  ('a1000000-0000-0000-0000-000000000004', 'M',  4),
  ('a1000000-0000-0000-0000-000000000004', 'L',  3),
  ('a1000000-0000-0000-0000-000000000004', 'XL', 2),

  -- Pantalón Cargo
  ('a1000000-0000-0000-0000-000000000005', 'S',  2),
  ('a1000000-0000-0000-0000-000000000005', 'M',  4),
  ('a1000000-0000-0000-0000-000000000005', 'L',  3),

  -- Pantalón Jogger
  ('a1000000-0000-0000-0000-000000000006', 'S',  3),
  ('a1000000-0000-0000-0000-000000000006', 'M',  5),
  ('a1000000-0000-0000-0000-000000000006', 'L',  4),
  ('a1000000-0000-0000-0000-000000000006', 'XL', 2),

  -- Campera Técnica
  ('a1000000-0000-0000-0000-000000000007', 'M',  3),
  ('a1000000-0000-0000-0000-000000000007', 'L',  4),
  ('a1000000-0000-0000-0000-000000000007', 'XL', 3),

  -- Campera Bomber
  ('a1000000-0000-0000-0000-000000000008', 'S',  2),
  ('a1000000-0000-0000-0000-000000000008', 'M',  3),
  ('a1000000-0000-0000-0000-000000000008', 'L',  4),
  ('a1000000-0000-0000-0000-000000000008', 'XL', 2),

  -- Short Cargo
  ('a1000000-0000-0000-0000-000000000009', 'S',  4),
  ('a1000000-0000-0000-0000-000000000009', 'M',  6),
  ('a1000000-0000-0000-0000-000000000009', 'L',  3),

  -- Short Deportivo
  ('a1000000-0000-0000-0000-000000000010', 'S',  5),
  ('a1000000-0000-0000-0000-000000000010', 'M',  7),
  ('a1000000-0000-0000-0000-000000000010', 'L',  4);
