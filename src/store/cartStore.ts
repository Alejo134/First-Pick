import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type CartItem } from '@/types'

interface CartState {
  items: CartItem[]
  add: (item: CartItem) => void
  remove: (variantId: string) => void
  updateQty: (variantId: string, quantity: number) => void
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
        if (existing) {
          set(state => ({
            items: state.items.map(i =>
              i.variantId === item.variantId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          }))
        } else {
          set(state => ({ items: [...state.items, item] }))
        }
      },

      remove: (variantId) =>
        set(state => ({ items: state.items.filter(i => i.variantId !== variantId) })),

      updateQty: (variantId, quantity) =>
        set(state => ({
          items: state.items.map(i =>
            i.variantId === variantId ? { ...i, quantity } : i
          ),
        })),

      clear: () => set({ items: [] }),

      total: () => get().items.reduce((acc, i) => acc + i.price * i.quantity, 0),

      count: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
    }),
    { name: 'first-pick-cart' }
  )
)
