import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ProductSearch } from './ProductSearch'

describe('ProductSearch', () => {
  it('renders input with placeholder', () => {
    render(<ProductSearch value="" onChange={() => {}} />)
    expect(
      screen.getByPlaceholderText('Busca en nuestra tienda')
    ).toBeInTheDocument()
  })

  it('calls onChange when typing', () => {
    const onChange = vi.fn()
    render(<ProductSearch value="" onChange={onChange} />)
    const input = screen.getByPlaceholderText('Busca en nuestra tienda')
    fireEvent.change(input, { target: { value: 'rosa' } })
    expect(onChange).toHaveBeenCalledWith('rosa')
  })

  it('shows clear button when value is not empty', () => {
    render(<ProductSearch value="rosa" onChange={() => {}} />)
    expect(
      screen.getByRole('button', { name: 'Limpiar búsqueda' })
    ).toBeInTheDocument()
  })

  it('calls onChange with empty string when clear is clicked', () => {
    const onChange = vi.fn()
    render(<ProductSearch value="rosa" onChange={onChange} />)
    const clearBtn = screen.getByRole('button', { name: 'Limpiar búsqueda' })
    fireEvent.click(clearBtn)
    expect(onChange).toHaveBeenCalledWith('')
  })
})
