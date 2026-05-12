import { useState } from 'react'
import { Link } from 'react-router'
import { formatPrice } from '../../../shared/lib/formatPrice'
import type { CartItem } from '../model/types'
import { useCart } from '../hooks/useCart'

export function CartLineItem({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCart()
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <div className="relative flex gap-4 p-4 bg-surface rounded-card shadow-card">
      <Link to={`/product/${item.productId}`} className="shrink-0">
        <img
          src={item.imgUrl}
          alt={item.name}
          className="w-24 h-24 object-cover rounded-lg"
          onError={(e) => {
            ;(e.target as HTMLImageElement).src =
              'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23e5e7eb%22 width=%22100%22 height=%22100%22/%3E%3Ctext fill=%22%236b7280%22 font-family=%22sans-serif%22 font-size=%2212%22 dy=%22.3em%22 text-anchor=%22middle%22 x=%2250%22 y=%2250%22%3ENo img%3C/text%3E%3C/svg%3E'
          }}
        />
      </Link>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <div>
            <Link
              to={`/product/${item.productId}`}
              className="font-semibold text-text hover:text-cta transition-colors"
            >
              {item.name}
            </Link>
            <p className="text-text-muted text-sm italic truncate">
              {item.binomialName}
            </p>
          </div>
          <button
            onClick={() => setShowConfirm(true)}
            className="text-text-muted hover:text-danger transition-colors shrink-0"
            aria-label={`Eliminar ${item.name}`}
          >
            <TrashIcon />
          </button>
        </div>

        <div className="flex items-center justify-between mt-3">
          <QuantityStepper
            quantity={item.quantity}
            onChange={(q) => updateQuantity(item.productId, q)}
          />
          <span className="font-semibold text-text">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>

      {showConfirm && (
        <div className="absolute inset-0 bg-surface/95 rounded-card flex flex-col items-center justify-center gap-3 p-4 z-10">
          <p className="text-text text-sm text-center">
            ¿Eliminar {item.name}?
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                removeItem(item.productId)
                setShowConfirm(false)
              }}
              className="px-3 py-1.5 bg-danger text-white text-sm rounded-button hover:bg-danger-hover transition-colors"
            >
              Eliminar
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="px-3 py-1.5 bg-gray-200 text-text text-sm rounded-button hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function QuantityStepper({
  quantity,
  onChange,
}: {
  quantity: number
  onChange: (quantity: number) => void
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(quantity - 1)}
        disabled={quantity <= 1}
        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-text hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-cta"
        aria-label="Disminuir cantidad"
      >
        −
      </button>
      <span
        className="w-8 text-center font-medium text-text"
        aria-live="polite"
      >
        {quantity}
      </span>
      <button
        onClick={() => onChange(quantity + 1)}
        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-text hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cta"
        aria-label="Aumentar cantidad"
      >
        +
      </button>
    </div>
  )
}

function TrashIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  )
}
