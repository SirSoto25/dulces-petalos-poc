import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { CartState, CartItem } from '../model/types'
import { CART_SCHEMA_VERSION, persistedCartSchema } from '../model/schema'

function validateQuantity(q: number): void {
  if (!Number.isFinite(q) || !Number.isInteger(q) || q < 1) {
    throw new Error(`Cantidad inválida: ${q}`)
  }
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item: CartItem) => {
        validateQuantity(item.quantity)
        return set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId
          )
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            }
          }
          return { items: [...state.items, item] }
        })
      },

      removeItem: (productId: string) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          return set((state) => ({
            items: state.items.filter((i) => i.productId !== productId),
          }))
        }
        validateQuantity(quantity)
        return set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        }))
      },

      clear: () => set({ items: [] }),
    }),
    {
      name: 'dulces-petalos.cart',
      version: CART_SCHEMA_VERSION,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      merge: (persisted, current) => {
        // Zustand passes the deserialized state slice (output of partialize),
        // which is { items: [...] } — no version field here.
        const parsed = persistedCartSchema.safeParse(persisted)
        if (!parsed.success) {
          return current
        }
        return { ...current, items: parsed.data.items }
      },
    }
  )
)
