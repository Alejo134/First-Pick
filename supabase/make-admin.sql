-- ─────────────────────────────────────────────────────────────
-- Promover un usuario a admin
-- 1. Registrate en la app normalmente
-- 2. Buscá tu ID en: Supabase → Authentication → Users
-- 3. Reemplazá el UUID de abajo y ejecutá en SQL Editor
-- ─────────────────────────────────────────────────────────────

update profiles
set role = 'admin'
where id = 'REEMPLAZAR-CON-TU-UUID';

-- Para verificar:
-- select id, role from profiles;
