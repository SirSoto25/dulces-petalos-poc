import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, it, expect } from 'vitest'
import { ProductGrid } from './ProductGrid'
import type { Product } from '../model/types'

const mockProducts: Product[] = [
  { id: '1', name: 'A', binomialName: 'A.a', price: 1, imgUrl: 'a.jpg' },
  { id: '2', name: 'B', binomialName: 'B.b', price: 2, imgUrl: 'b.jpg' },
]

function renderWithRouter(ui: React.ReactNode) {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe('ProductGrid', () => {
  it('renders a card for each product', () => {
    renderWithRouter(<ProductGrid products={mockProducts} />)
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
  })

  it('renders empty state when no products', () => {
    renderWithRouter(<ProductGrid products={[]} />)
    expect(screen.getByText('No se encontraron productos.')).toBeInTheDocument()
  })
})
