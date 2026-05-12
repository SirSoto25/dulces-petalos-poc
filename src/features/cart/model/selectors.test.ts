import { describe, it, expect } from 'vitest'
import { selectTotalItems, selectSubtotal } from './selectors'
import type { CartItem } from './types'

const items: CartItem[] = [
  {
    productId: '1',
    name: 'A',
    binomialName: 'A.a',
    price: 10,
    imgUrl: 'a.jpg',
    quantity: 2,
    addedAt: 1,
  },
  {
    productId: '2',
    name: 'B',
    binomialName: 'B.b',
    price: 5,
    imgUrl: 'b.jpg',
    quantity: 3,
    addedAt: 2,
  },
]

describe('cart selectors', () => {
  it('selectTotalItems sums quantities', () => {
    expect(selectTotalItems(items)).toBe(5)
  })

  it('selectTotalItems returns 0 for empty array', () => {
    expect(selectTotalItems([])).toBe(0)
  })

  it('selectSubtotal calculates correctly', () => {
    expect(selectSubtotal(items)).toBe(35)
  })

  it('selectSubtotal returns 0 for empty array', () => {
    expect(selectSubtotal([])).toBe(0)
  })
})
