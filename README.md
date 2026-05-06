# First Pick

E-Commerce de ropa con generador pitagórico integrado.

## Stack

| Tecnología | Rol |
|---|---|
| React 19 + TypeScript | Frontend |
| Vite | Build tool |
| Tailwind CSS | Estilos |
| React Router DOM | Navegación |
| Zustand | Estado global |
| Konva / react-konva | Generador pitagórico (canvas) |
| Lucide React | Iconos |
| Supabase *(próximamente)* | Base de datos + Auth + Storage |
| MercadoPago *(próximamente)* | Pagos |

## Estructura

```
src/
├── components/
│   ├── layout/       # Navbar, Layout
│   ├── product/      # ProductCard
│   └── ui/           # Componentes base reutilizables
├── config/           # Colores, constantes, theme.css
├── data/             # Mock data (hasta conectar Supabase)
├── hooks/            # Custom hooks
├── pages/            # Una carpeta por página
│   ├── Home/
│   ├── Generator/
│   ├── Product/
│   ├── Cart/
│   ├── Checkout/
│   ├── Auth/
│   ├── Account/
│   └── Admin/
├── router/           # Definición de rutas
├── services/         # Supabase, MercadoPago
├── store/            # Zustand stores
├── types/            # Interfaces TypeScript
└── utils/            # Funciones puras
```

## Instalación

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Preview del build
```

## Personalización

Todos los colores y fuentes se gestionan desde un único archivo:

```
src/config/theme.css
```

## Roadmap

- [x] Setup React + Vite + TypeScript + Tailwind
- [x] Navbar sidebar vertical colapsable (desktop) + hamburguesa (mobile)
- [x] Home con grid de productos
- [x] Generador pitagórico (`/generador`)
- [ ] Detalle de producto
- [ ] Carrito (Zustand)
- [ ] Checkout
- [ ] Auth (login / registro)
- [ ] Panel de administración
- [ ] Integración Supabase
- [ ] Integración MercadoPago
