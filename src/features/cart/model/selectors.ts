import type { CartItem } from './types'

export function selectTotalItems(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}

export function selectSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity * item.price, 0)
}
