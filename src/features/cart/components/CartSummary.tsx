import { useState } from 'react'
import { formatPrice } from '../../../shared/lib/formatPrice'

interface CartSummaryProps {
  subtotal: number
  onClear: () => void
}

export function CartSummary({ subtotal, onClear }: CartSummaryProps) {
  const [confirmClear, setConfirmClear] = useState(false)

  return (
    <div className="bg-surface rounded-card shadow-card p-6 space-y-4 sticky top-24">
      <h2 className="text-lg font-semibold text-text">Resumen</h2>
      <div className="flex justify-between text-text">
        <span>Subtotal</span>
        <span className="font-semibold">{formatPrice(subtotal)}</span>
      </div>

      {confirmClear ? (
        <div className="space-y-2">
          <p className="text-sm text-text text-center">
            ¿Vaciar todo el carrito?
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                onClear()
                setConfirmClear(false)
              }}
              className="flex-1 py-1.5 bg-danger text-white text-sm rounded-button hover:bg-danger-hover transition-colors focus:outline-none focus:ring-2 focus:ring-danger"
            >
              Sí, vaciar
            </button>
            <button
              onClick={() => setConfirmClear(false)}
              className="flex-1 py-1.5 bg-gray-200 text-text text-sm rounded-button hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-cta"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setConfirmClear(true)}
          className="w-full py-2 text-danger border border-danger rounded-button hover:bg-danger hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-danger"
        >
          Vaciar carrito
        </button>
      )}

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
