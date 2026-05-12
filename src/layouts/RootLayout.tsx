import { Outlet } from 'react-router'
import { CartIconButton } from '../features/cart/components/CartIconButton'

function Logo() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" fill="#FFB7C5" />
      <circle cx="12" cy="12" r="4" fill="#7A1F3D" />
      <path
        d="M12 2C12 2 8 6 8 12C8 18 12 22 12 22C12 22 16 18 16 12C16 6 12 2 12 2Z"
        fill="#FF69B4"
        opacity="0.6"
      />
      <path
        d="M2 12C2 12 6 8 12 8C18 8 22 12 22 12C22 12 18 16 12 16C6 16 2 12 2 12Z"
        fill="#FF69B4"
        opacity="0.6"
      />
    </svg>
  )
}

export function RootLayout() {
  return (
    <div className="min-h-screen bg-bg">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-cta focus:text-white focus:px-4 focus:py-2 focus:rounded-button"
      >
        Saltar al contenido principal
      </a>
      <header className="bg-surface border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-4 py-4 flex items-center justify-between">
          <div className="w-10" aria-hidden="true" />
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-lg font-semibold text-text">
              Dulces Pétalos
            </span>
          </div>
          <CartIconButton />
        </div>
      </header>
      <main
        id="main-content"
        className="max-w-[1200px] mx-auto px-4 py-6"
        tabIndex={-1}
      >
        <Outlet />
      </main>
    </div>
  )
}
