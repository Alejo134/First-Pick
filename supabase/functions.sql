-- ─────────────────────────────────────────────────────────────
-- FIRST PICK — Funciones de negocio
-- Ejecutar en: Supabase → SQL Editor
-- ─────────────────────────────────────────────────────────────

-- Decrementa el stock de múltiples variantes de forma atómica.
-- Bloquea las filas con FOR UPDATE para evitar race conditions.
-- Si alguna variante no tiene stock suficiente, cancela todo.

create or replace function purchase_items(
  items jsonb  -- [{ "variant_id": "uuid", "quantity": 2 }, ...]
)
returns jsonb
language plpgsql
security definer
as $$
declare
  item        jsonb;
  v_id        uuid;
  qty         integer;
  cur_stock   integer;
begin
  -- Itera cada item del pedido
  for item in select * from jsonb_array_elements(items)
  loop
    v_id := (item->>'variant_id')::uuid;
    qty  := (item->>'quantity')::integer;

    -- Bloquea la fila para esta transacción (otros requests esperan)
    select stock into cur_stock
    from variants
    where id = v_id
    for update;

    -- Valida stock suficiente
    if cur_stock is null then
      return jsonb_build_object(
        'ok', false,
        'message', 'Variante no encontrada: ' || v_id
      );
    end if;

    if cur_stock < qty then
      return jsonb_build_object(
        'ok', false,
        'message', 'Stock insuficiente para la variante ' || v_id ||
                   '. Disponible: ' || cur_stock || ', solicitado: ' || qty
      );
    end if;

    -- Descuenta el stock
    update variants
    set stock = stock - qty
    where id = v_id;

  end loop;

  return jsonb_build_object('ok', true);

-- Si algo falla, PostgreSQL hace rollback automático
exception when others then
  return jsonb_build_object('ok', false, 'message', sqlerrm);
end;
$$;
