import { Link } from 'react-router'

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <CartIcon className="w-16 h-16 text-text-muted mb-4" />
      <h2 className="text-xl font-semibold text-text mb-2">
        Tu carrito está vacío
      </h2>
      <p className="text-text-muted mb-6">
        Explora nuestro catálogo y añade tus plantas favoritas.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-cta text-white font-medium rounded-button hover:bg-cta-hover transition-colors focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-2"
      >
        Ver catálogo
      </Link>
    </div>
  )
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  )
}
