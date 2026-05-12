import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useCart } from './useCart'

describe('useCart', () => {
  it('returns empty state initially', () => {
    const { result } = renderHook(() => useCart())
    expect(result.current.items).toHaveLength(0)
    expect(result.current.totalItems).toBe(0)
    expect(result.current.subtotal).toBe(0)
  })
})
