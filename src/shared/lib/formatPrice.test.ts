import { describe, it, expect } from 'vitest'
import { formatPrice } from './formatPrice'

describe('formatPrice', () => {
  it('formats a positive number as EUR currency in Spanish locale', () => {
    expect(formatPrice(4.95)).toBe('4,95\u00a0€')
  })

  it('formats zero', () => {
    expect(formatPrice(0)).toBe('0,00\u00a0€')
  })

  it('formats large numbers', () => {
    expect(formatPrice(1234.5)).toBe('1234,50\u00a0€')
  })
})
