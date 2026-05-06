import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type CartItem } from '@/types'

interface CartState {
  items: CartItem[]
  add: (item: CartItem) => { ok: boolean; message?: string }
  remove: (variantId: string) => void
  updateQty: (variantId: string, quantity: number) => { ok: boolean; message?: string }
  clear: () => void
  total: () => number
  count: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      add: (item) => {
        const existing = get().items.find(i => i.variantId === item.variantId)
        const currentQty = existing?.quantity ?? 0
        const newQty = currentQty + item.quantity

        if (newQty > item.stock) {
          return {
            ok: false,
            message: `Stock insuficiente. Máximo disponible: ${item.stock} unidad${item.stock !== 1 ? 'es' : ''}.`,
          }
        }

        if (existing) {
          set(state => ({
            items: state.items.map(i =>
              i.variantId === item.variantId ? { ...i, quantity: newQty } : i
            ),
          }))
        } else {
          set(state => ({ items: [...state.items, item] }))
        }

        return { ok: true }
      },

      remove: (variantId) =>
        set(state => ({ items: state.items.filter(i => i.variantId !== variantId) })),

      updateQty: (variantId, quantity) => {
        const item = get().items.find(i => i.variantId === variantId)
        if (!item) return { ok: false }

        if (quantity > item.stock) {
          return {
            ok: false,
            message: `Stock insuficiente. Máximo disponible: ${item.stock} unidad${item.stock !== 1 ? 'es' : ''}.`,
          }
        }

        if (quantity < 1) {
          set(state => ({ items: state.items.filter(i => i.variantId !== variantId) }))
          return { ok: true }
        }

        set(state => ({
          items: state.items.map(i =>
            i.variantId === variantId ? { ...i, quantity } : i
          ),
        }))
        return { ok: true }
      },

      clear: () => set({ items: [] }),
      total: () => get().items.reduce((acc, i) => acc + i.price * i.quantity, 0),
      count: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
    }),
    { name: 'first-pick-cart' }
  )
)
