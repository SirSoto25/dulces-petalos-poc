import { useCart } from '../hooks/useCart'
import { CartList } from '../components/CartList'
import { CartSummary } from '../components/CartSummary'
import { EmptyCart } from '../components/EmptyCart'
import { Breadcrumb } from '../../../shared/ui/Breadcrumb'

export function Component() {
  const { items, subtotal, clear } = useCart()

  if (items.length === 0) {
    return (
      <div>
        <Breadcrumb
          items={[{ label: 'Inicio', to: '/' }, { label: 'Carrito' }]}
        />
        <EmptyCart />
      </div>
    )
  }

  return (
    <div>
      <Breadcrumb
        items={[{ label: 'Inicio', to: '/' }, { label: 'Carrito' }]}
      />
      <h1 className="text-2xl font-bold text-text mt-4 mb-6">Tu carrito</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CartList items={items} />
        </div>
        <div>
          <CartSummary subtotal={subtotal} onClear={clear} />
        </div>
      </div>
    </div>
  )
}
