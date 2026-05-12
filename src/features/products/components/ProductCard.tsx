import { Link } from 'react-router'
import { formatPrice } from '../../../shared/lib/formatPrice'
import type { Product } from '../model/types'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      aria-label={`Ver detalle de ${product.name}`}
      className="group bg-surface rounded-card shadow-card overflow-hidden transition-shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-2"
    >
      <div className="p-4 pb-0">
        <h3 className="text-text font-semibold text-base mb-0.5">
          {product.name}
        </h3>
        <p className="text-text-muted text-xs italic">{product.binomialName}</p>
      </div>
      <div className="relative p-4 pt-2">
        <img
          src={product.imgUrl}
          alt={product.name}
          loading="lazy"
          className="w-full h-48 object-cover rounded-card"
          onError={(e) => {
            ;(e.target as HTMLImageElement).src =
              'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23e5e7eb%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%236b7280%22 font-family=%22sans-serif%22 font-size=%2220%22 dy=%22.3em%22 text-anchor=%22middle%22 x=%22200%22 y=%22150%22%3EImagen no disponible%3C/text%3E%3C/svg%3E'
          }}
        />
        <span className="absolute bottom-6 left-6 bg-price-bg text-price-fg text-sm font-medium px-3 py-1 rounded-full">
          {formatPrice(product.price)}
        </span>
        <span
          className="absolute bottom-6 right-6 bg-surface text-text p-1.5 rounded-full shadow-sm"
          aria-hidden="true"
        >
          <ArrowIcon />
        </span>
      </div>
    </Link>
  )
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17l9.2-9.2M17 17V7H7" />
    </svg>
  )
}
