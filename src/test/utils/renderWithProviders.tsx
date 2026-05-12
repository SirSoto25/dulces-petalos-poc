import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router'
import type { ReactNode } from 'react'

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: 0 },
    },
  })
}

export function renderWithProviders(
  ui: ReactNode,
  { route = '/' }: { route?: string } = {}
) {
  const queryClient = createTestQueryClient()
  return {
    ...render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path="/" element={ui} />
            <Route path="/product/:id" element={ui} />
            <Route path="/cart" element={ui} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    ),
    queryClient,
  }
}
