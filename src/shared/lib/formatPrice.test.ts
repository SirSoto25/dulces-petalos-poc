import { describe, it, expect } from 'vitest'
import { formatPrice } from './formatPrice'

describe('formatPrice', () => {
  it('formats a positive number as EUR currency in Spanish locale', () => {
    const result = formatPrice(4.95)
    expect(result).toMatch(/4,95/)
    expect(result).toMatch(/€/)
  })

  it('formats zero', () => {
    const result = formatPrice(0)
    expect(result).toMatch(/0,00/)
    expect(result).toMatch(/€/)
  })

  it('formats large numbers with 2 decimal places', () => {
    // ICU full vs lite differ on thousands separator, so we match loosely
    const result = formatPrice(1234.5)
    expect(result).toMatch(/1[\s.,]?234,50/)
    expect(result).toMatch(/€/)
  })
})
