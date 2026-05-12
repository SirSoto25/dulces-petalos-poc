import { describe, it, expect } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Component as CartPage } from './CartPage'
import { renderWithProviders } from '../../../test/utils/renderWithProviders'
import { useCartStore } from '../store/cartStore'

describe('CartPage integration', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] })
  })

  it('shows empty cart state', () => {
    renderWithProviders(<CartPage />, { route: '/cart' })
    expect(screen.getByText('Tu carrito está vacío')).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Ver catálogo' })
    ).toBeInTheDocument()
  })

  it('shows cart items and summary', () => {
    useCartStore.setState({
      items: [
        {
          productId: '1',
          name: 'Orquídea',
          binomialName: 'Ophrys',
          price: 4.95,
          imgUrl: 'https://example.com/a.jpg',
          quantity: 2,
          addedAt: 1,
        },
      ],
    })

    renderWithProviders(<CartPage />, { route: '/cart' })
    expect(screen.getByText('Orquídea')).toBeInTheDocument()
    expect(screen.getAllByText(/9,90/)).toHaveLength(2) // line item + summary
  })

  it('updates quantity with stepper', async () => {
    useCartStore.setState({
      items: [
        {
          productId: '1',
          name: 'Orquídea',
          binomialName: 'Ophrys',
          price: 4.95,
          imgUrl: 'https://example.com/a.jpg',
          quantity: 1,
          addedAt: 1,
        },
      ],
    })

    const user = userEvent.setup()
    renderWithProviders(<CartPage />, { route: '/cart' })

    const increaseBtn = screen.getByRole('button', {
      name: 'Aumentar cantidad',
    })
    await user.click(increaseBtn)

    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument()
    })
  })

  it('clears cart after confirmation', async () => {
    useCartStore.setState({
      items: [
        {
          productId: '1',
          name: 'Orquídea',
          binomialName: 'Ophrys',
          price: 4.95,
          imgUrl: 'https://example.com/a.jpg',
          quantity: 1,
          addedAt: 1,
        },
      ],
    })

    const user = userEvent.setup()
    renderWithProviders(<CartPage />, { route: '/cart' })

    // First click shows confirmation dialog
    const clearBtn = screen.getByRole('button', { name: 'Vaciar carrito' })
    await user.click(clearBtn)

    // Confirm by clicking "Sí, vaciar"
    const confirmBtn = screen.getByRole('button', { name: 'Sí, vaciar' })
    await user.click(confirmBtn)

    await waitFor(() => {
      expect(screen.getByText('Tu carrito está vacío')).toBeInTheDocument()
    })
  })

  it('cancels clear cart when clicking Cancelar', async () => {
    useCartStore.setState({
      items: [
        {
          productId: '1',
          name: 'Orquídea',
          binomialName: 'Ophrys',
          price: 4.95,
          imgUrl: 'https://example.com/a.jpg',
          quantity: 1,
          addedAt: 1,
        },
      ],
    })

    const user = userEvent.setup()
    renderWithProviders(<CartPage />, { route: '/cart' })

    await user.click(screen.getByRole('button', { name: 'Vaciar carrito' }))
    await user.click(screen.getByRole('button', { name: 'Cancelar' }))

    // Items still present
    expect(screen.getByText('Orquídea')).toBeInTheDocument()
  })
})
