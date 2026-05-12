import { describe, it, expect } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useDebouncedValue } from './useDebouncedValue'

describe('useDebouncedValue', () => {
  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebouncedValue('initial', 300))
    expect(result.current).toBe('initial')
  })

  it('delays updating the debounced value', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebouncedValue(value, delay),
      { initialProps: { value: 'first', delay: 50 } }
    )

    rerender({ value: 'second', delay: 50 })
    expect(result.current).toBe('first')

    await waitFor(() => expect(result.current).toBe('second'), {
      timeout: 200,
    })
  })

  it('resets the timer on rapid changes', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, 80),
      { initialProps: { value: 'a' } }
    )

    rerender({ value: 'b' })
    await new Promise((r) => setTimeout(r, 30))
    expect(result.current).toBe('a')

    rerender({ value: 'c' })
    await new Promise((r) => setTimeout(r, 30))
    expect(result.current).toBe('a')

    await waitFor(() => expect(result.current).toBe('c'), {
      timeout: 150,
    })
  })
})
