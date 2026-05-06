export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  images: string[]
  variants: Variant[]
}

export interface Variant {
  id: string
  productId: string
  size: string
  color?: string
  stock: number
}

export interface CartItem {
  variantId: string
  productId: string
  name: string
  price: number
  size: string
  color?: string
  image: string
  quantity: number
  stock: number   // stock máximo disponible en DB
}

export interface Order {
  id: string
  userId?: string
  guestEmail?: string
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  items: OrderItem[]
  createdAt: string
}

export interface OrderItem {
  id: string
  orderId: string
  variantId: string
  quantity: number
  unitPrice: number
}

export interface User {
  id: string
  email: string
  name?: string
  role: 'customer' | 'admin'
}
