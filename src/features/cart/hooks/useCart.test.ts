import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCart } from './useCart'
import { useCartStore } from '../store/cartStore'
import type { CartItem } from '../model/types'

const item: CartItem = {
  productId: '1',
  name: 'Orquídea',
  binomialName: 'Ophrys',
  price: 4.95,
  imgUrl: 'https://example.com/a.jpg',
  quantity: 1,
  addedAt: 1,
}

describe('useCart', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] })
  })

  it('returns empty state initially', () => {
    const { result } = renderHook(() => useCart())
    expect(result.current.items).toHaveLength(0)
    expect(result.current.totalItems).toBe(0)
    expect(result.current.subtotal).toBe(0)
  })

  it('addItem increments totalItems and subtotal', () => {
    const { result } = renderHook(() => useCart())
    act(() => result.current.addItem(item))
    expect(result.current.items).toHaveLength(1)
    expect(result.current.totalItems).toBe(1)
    expect(result.current.subtotal).toBe(4.95)
  })

  it('addItem with existing product increments quantity', () => {
    const { result } = renderHook(() => useCart())
    act(() => result.current.addItem(item))
    act(() => result.current.addItem({ ...item, quantity: 2 }))
    expect(result.current.items).toHaveLength(1)
    expect(result.current.totalItems).toBe(3)
    expect(result.current.subtotal).toBeCloseTo(14.85)
  })

  it('removeItem updates totals', () => {
    const { result } = renderHook(() => useCart())
    act(() => result.current.addItem(item))
    act(() => result.current.removeItem(item.productId))
    expect(result.current.items).toHaveLength(0)
    expect(result.current.totalItems).toBe(0)
    expect(result.current.subtotal).toBe(0)
  })

  it('updateQuantity recalculates subtotal', () => {
    const { result } = renderHook(() => useCart())
    act(() => result.current.addItem(item))
    act(() => result.current.updateQuantity(item.productId, 3))
    expect(result.current.totalItems).toBe(3)
    expect(result.current.subtotal).toBeCloseTo(14.85)
  })

  it('updateQuantity to 0 removes the item', () => {
    const { result } = renderHook(() => useCart())
    act(() => result.current.addItem(item))
    act(() => result.current.updateQuantity(item.productId, 0))
    expect(result.current.items).toHaveLength(0)
    expect(result.current.totalItems).toBe(0)
  })

  it('clear resets everything', () => {
    const { result } = renderHook(() => useCart())
    act(() => result.current.addItem(item))
    act(() => result.current.clear())
    expect(result.current.items).toHaveLength(0)
    expect(result.current.totalItems).toBe(0)
    expect(result.current.subtotal).toBe(0)
  })

  it('throws for invalid addItem quantities', () => {
    const { result } = renderHook(() => useCart())
    expect(() =>
      act(() => result.current.addItem({ ...item, quantity: -1 }))
    ).toThrow()
    expect(() =>
      act(() => result.current.addItem({ ...item, quantity: NaN }))
    ).toThrow()
    expect(() =>
      act(() => result.current.addItem({ ...item, quantity: 5.5 }))
    ).toThrow()
  })

  it('throws for invalid updateQuantity values', () => {
    const { result } = renderHook(() => useCart())
    act(() => result.current.addItem(item))
    expect(() =>
      act(() => result.current.updateQuantity(item.productId, NaN))
    ).toThrow()
    expect(() =>
      act(() => result.current.updateQuantity(item.productId, 5.5))
    ).toThrow()
  })
})
