import type { CartItem } from '../model/types'
import { CartLineItem } from './CartLineItem'

export function CartList({ items }: { items: CartItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CartLineItem key={item.productId} item={item} />
      ))}
    </div>
  )
}
