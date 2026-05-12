import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { CartIconButton } from './CartIconButton'
import { useCartStore } from '../store/cartStore'

describe('CartIconButton', () => {
  it('renders cart icon', () => {
    render(
      <MemoryRouter>
        <CartIconButton />
      </MemoryRouter>
    )
    expect(screen.getByRole('link', { name: /Carrito/ })).toBeInTheDocument()
  })

  it('shows badge when items exist', () => {
    useCartStore.setState({
      items: [
        {
          productId: '1',
          name: 'A',
          binomialName: 'A.a',
          price: 10,
          imgUrl: 'a.jpg',
          quantity: 2,
          addedAt: 1,
        },
      ],
    })
    render(
      <MemoryRouter>
        <CartIconButton />
      </MemoryRouter>
    )
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('hides badge when cart is empty', () => {
    useCartStore.setState({ items: [] })
    render(
      <MemoryRouter>
        <CartIconButton />
      </MemoryRouter>
    )
    expect(screen.queryByText('0')).not.toBeInTheDocument()
  })
})
