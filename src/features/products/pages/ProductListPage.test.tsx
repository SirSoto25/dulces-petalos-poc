import { describe, it, expect } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Component as ProductListPage } from './ProductListPage'
import { renderWithProviders } from '../../../test/utils/renderWithProviders'
import { server } from '../../../test/msw/server'
import { http, HttpResponse } from 'msw'

describe('ProductListPage integration', () => {
  it('loads and displays products', async () => {
    renderWithProviders(<ProductListPage />)

    expect(
      screen.getByPlaceholderText('Busca en nuestra tienda')
    ).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByText('Orquídea')).toBeInTheDocument()
    })
    expect(screen.getByText('Rosa de damasco')).toBeInTheDocument()
  })

  it('filters products by name', async () => {
    renderWithProviders(<ProductListPage />)
    const user = userEvent.setup()

    await waitFor(() => {
      expect(screen.getByText('Orquídea')).toBeInTheDocument()
    })

    const input = screen.getByPlaceholderText('Busca en nuestra tienda')
    await user.type(input, 'rosa')

    await waitFor(() => {
      expect(screen.queryByText('Orquídea')).not.toBeInTheDocument()
    })
    expect(screen.getByText('Rosa de damasco')).toBeInTheDocument()
    expect(screen.getByText('Rosa silvestre')).toBeInTheDocument()
  })

  it('shows empty state when no products match', async () => {
    renderWithProviders(<ProductListPage />)
    const user = userEvent.setup()

    await waitFor(() => {
      expect(screen.getByText('Orquídea')).toBeInTheDocument()
    })

    const input = screen.getByPlaceholderText('Busca en nuestra tienda')
    await user.type(input, 'xyz123')

    await waitFor(() => {
      expect(
        screen.getByText('No se encontraron productos.')
      ).toBeInTheDocument()
    })
  })

  it('shows error state on API failure and allows retry', async () => {
    server.use(
      http.get('https://dulces-petalos.jakala.es/api/v1/product', () => {
        return new HttpResponse(null, { status: 500 })
      })
    )

    renderWithProviders(<ProductListPage />)

    await waitFor(() => {
      expect(screen.getByText('Error al cargar productos')).toBeInTheDocument()
    })

    expect(
      screen.getByRole('button', { name: 'Reintentar' })
    ).toBeInTheDocument()
  })
})
