import { describe, it, expect } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { Component as ProductDetailPage } from './ProductDetailPage'
import { renderWithProviders } from '../../../test/utils/renderWithProviders'

describe('ProductDetailPage integration', () => {
  it('loads and displays product details', async () => {
    renderWithProviders(<ProductDetailPage />, { route: '/product/1' })

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'Orquídea' })
      ).toBeInTheDocument()
    })

    expect(screen.getByText('Ophrys tenthredinifera')).toBeInTheDocument()
    expect(screen.getByText(/4,95/)).toBeInTheDocument()
    expect(screen.getByText('Regar 1 vez por semana')).toBeInTheDocument()
    expect(screen.getByText('Fertilizar con Nitrato')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Añadir al carrito' })
    ).toBeInTheDocument()
  })

  it('shows breadcrumb with product name', async () => {
    renderWithProviders(<ProductDetailPage />, { route: '/product/1' })

    await waitFor(() => {
      expect(screen.getByRole('link', { name: 'Inicio' })).toBeInTheDocument()
    })
    expect(
      screen.getByRole('heading', { name: 'Orquídea' })
    ).toBeInTheDocument()
  })

  it('shows error state when product not found', async () => {
    renderWithProviders(<ProductDetailPage />, { route: '/product/999' })

    await waitFor(() => {
      expect(
        screen.getByText('Error al cargar el producto')
      ).toBeInTheDocument()
    })
  })

  it('shows loading skeleton initially', () => {
    renderWithProviders(<ProductDetailPage />, { route: '/product/1' })
    expect(document.querySelector('.animate-pulse')).toBeInTheDocument()
  })
})
