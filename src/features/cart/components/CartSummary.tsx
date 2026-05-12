import { formatPrice } from '../../../shared/lib/formatPrice'
import { useCart } from '../hooks/useCart'

export function CartSummary({ subtotal }: { subtotal: number }) {
  const { clear } = useCart()

  return (
    <div className="bg-surface rounded-card shadow-card p-6 space-y-4 sticky top-24">
      <h2 className="text-lg font-semibold text-text">Resumen</h2>
      <div className="flex justify-between text-text">
        <span>Subtotal</span>
        <span className="font-semibold">{formatPrice(subtotal)}</span>
      </div>
      <button
        onClick={clear}
        className="w-full py-2 text-danger border border-danger rounded-button hover:bg-danger hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-danger"
      >
        Vaciar carrito
      </button>
      <button
        disabled
        className="w-full py-3 bg-cta text-white font-medium rounded-button opacity-50 cursor-not-allowed"
        title="Próximamente"
      >
        Finalizar compra
      </button>
    </div>
  )
}
