export const APP_NAME = 'First Pick'

export const ROUTES = {
  HOME: '/',
  PRODUCT: '/producto/:id',
  CART: '/carrito',
  CHECKOUT: '/checkout',
  LOGIN: '/login',
  REGISTER: '/registro',
  ACCOUNT: '/mi-cuenta',
  GENERATOR: '/generador',
  ADMIN: {
    ROOT: '/admin',
    PRODUCTS: '/admin/productos',
    ORDERS: '/admin/ordenes',
    STOCK: '/admin/stock',
  },
} as const
