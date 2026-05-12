import { describe, it, expect, beforeEach } from 'vitest'
import { useCartStore } from '../store/cartStore'
import type { CartItem } from '../model/types'

const itemA: CartItem = {
  productId: '1',
  name: 'Orquídea',
  binomialName: 'Ophrys',
  price: 4.95,
  imgUrl: 'https://example.com/a.jpg',
  quantity: 1,
  addedAt: 1,
}

const itemB: CartItem = {
  productId: '2',
  name: 'Rosa',
  binomialName: 'Rosa',
  price: 10,
  imgUrl: 'https://example.com/b.jpg',
  quantity: 2,
  addedAt: 2,
}

describe('cartStore', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] })
  })

  it('adds a new item', () => {
    useCartStore.getState().addItem(itemA)
    expect(useCartStore.getState().items).toHaveLength(1)
    expect(useCartStore.getState().items[0].productId).toBe('1')
  })

  it('increments quantity when adding existing item', () => {
    useCartStore.getState().addItem(itemA)
    useCartStore.getState().addItem({ ...itemA, quantity: 1 })
    expect(useCartStore.getState().items[0].quantity).toBe(2)
  })

  it('removes an item', () => {
    useCartStore.getState().addItem(itemA)
    useCartStore.getState().removeItem('1')
    expect(useCartStore.getState().items).toHaveLength(0)
  })

  it('updates quantity', () => {
    useCartStore.getState().addItem(itemA)
    useCartStore.getState().updateQuantity('1', 5)
    expect(useCartStore.getState().items[0].quantity).toBe(5)
  })

  it('removes item when updating quantity to 0', () => {
    useCartStore.getState().addItem(itemA)
    useCartStore.getState().updateQuantity('1', 0)
    expect(useCartStore.getState().items).toHaveLength(0)
  })

  it('clears all items', () => {
    useCartStore.getState().addItem(itemA)
    useCartStore.getState().addItem(itemB)
    useCartStore.getState().clear()
    expect(useCartStore.getState().items).toHaveLength(0)
  })

  it('persists to localStorage', () => {
    useCartStore.getState().addItem(itemA)
    const raw = localStorage.getItem('dulces-petalos.cart')
    expect(raw).toBeTruthy()
    const parsed = JSON.parse(raw!)
    expect(parsed.state.items).toHaveLength(1)
  })

  it('rehydrates from localStorage', () => {
    useCartStore.setState({ items: [] })
    const state = { state: { items: [itemB], version: 1 }, version: 1 }
    localStorage.setItem('dulces-petalos.cart', JSON.stringify(state))
    useCartStore.persist.rehydrate()
    expect(useCartStore.getState().items).toHaveLength(1)
    expect(useCartStore.getState().items[0].productId).toBe('2')
  })

  it('discards corrupted localStorage and starts fresh', () => {
    useCartStore.setState({ items: [] })
    localStorage.setItem('dulces-petalos.cart', 'not-json')
    useCartStore.persist.rehydrate()
    expect(useCartStore.getState().items).toHaveLength(0)
  })
})
