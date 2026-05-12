import { Link } from 'react-router'
import { useCart } from '../hooks/useCart'

export function CartIconButton() {
  const { totalItems } = useCart()

  return (
    <Link
      to="/cart"
      className="relative p-2 text-text hover:text-cta transition-colors focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-2 rounded-lg"
      aria-label={`Carrito, ${totalItems} ${totalItems === 1 ? 'artículo' : 'artículos'}`}
    >
      <CartIcon />
      {totalItems > 0 && (
        // aria-hidden: the count is already announced via the Link's aria-label above
        <span
          className="absolute -top-1 -right-1 bg-cta text-white text-xs font-medium w-5 h-5 flex items-center justify-center rounded-full"
          aria-hidden="true"
        >
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </Link>
  )
}

function CartIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  )
}
