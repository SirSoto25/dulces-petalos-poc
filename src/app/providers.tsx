import { useEffect } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { ReactNode } from 'react'
import { queryClient } from './queryClient'
import { useCartStore } from '../features/cart/store/cartStore'

function CartSyncProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'dulces-petalos.cart') {
        useCartStore.persist.rehydrate()
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  return children
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <CartSyncProvider>{children}</CartSyncProvider>
      {/* Vite tree-shakes this in production builds (import.meta.env.DEV === false) */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}
