import { useCartStore } from '../store/cartStore'
import { selectTotalItems, selectSubtotal } from '../model/selectors'

export function useCart() {
  const items = useCartStore((state) => state.items)
  const addItem = useCartStore((state) => state.addItem)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const clear = useCartStore((state) => state.clear)

  const totalItems = selectTotalItems(items)
  const subtotal = selectSubtotal(items)

  return {
    items,
    totalItems,
    subtotal,
    addItem,
    removeItem,
    updateQuantity,
    clear,
  }
}
