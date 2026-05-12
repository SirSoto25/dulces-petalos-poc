import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { AddToCartButton } from './AddToCartButton'
import type { Product } from '../../products/model/types'

const mockProduct: Product = {
  id: '1',
  name: 'Orquídea',
  binomialName: 'Ophrys tenthredinifera',
  price: 4.95,
  imgUrl: 'https://example.com/orquidea.jpg',
}

describe('AddToCartButton', () => {
  it('renders add to cart button', () => {
    render(
      <MemoryRouter>
        <AddToCartButton product={mockProduct} />
      </MemoryRouter>
    )
    expect(
      screen.getByRole('button', { name: 'Añadir al carrito' })
    ).toBeInTheDocument()
  })

  it('shows feedback after click', async () => {
    render(
      <MemoryRouter>
        <AddToCartButton product={mockProduct} />
      </MemoryRouter>
    )
    const button = screen.getByRole('button', { name: 'Añadir al carrito' })
    fireEvent.click(button)
    await waitFor(() => {
      expect(screen.getByText('Añadido ✓')).toBeInTheDocument()
    })
  })
})
