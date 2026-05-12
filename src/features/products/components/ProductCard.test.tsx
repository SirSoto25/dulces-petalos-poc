import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, it, expect } from 'vitest'
import { ProductCard } from './ProductCard'
import type { Product } from '../model/types'

const mockProduct: Product = {
  id: '1',
  name: 'Orquídea',
  binomialName: 'Ophrys tenthredinifera',
  price: 4.95,
  imgUrl: 'https://example.com/orquidea.jpg',
}

function renderWithRouter(ui: React.ReactNode) {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe('ProductCard', () => {
  it('renders product name and binomial name', () => {
    renderWithRouter(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Orquídea')).toBeInTheDocument()
    expect(screen.getByText('Ophrys tenthredinifera')).toBeInTheDocument()
  })

  it('renders formatted price', () => {
    renderWithRouter(<ProductCard product={mockProduct} />)
    expect(screen.getByText(/4,95/)).toBeInTheDocument()
  })

  it('renders product image with alt text', () => {
    renderWithRouter(<ProductCard product={mockProduct} />)
    const img = screen.getByAltText('Orquídea')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://example.com/orquidea.jpg')
  })

  it('has a link to the product detail page', () => {
    renderWithRouter(<ProductCard product={mockProduct} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/product/1')
    expect(link).toHaveAttribute('aria-label', 'Ver detalle de Orquídea')
  })
})
