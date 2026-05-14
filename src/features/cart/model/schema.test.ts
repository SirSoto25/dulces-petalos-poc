import { describe, it, expect } from 'vitest'
import { cartItemSchema, persistedCartSchema } from './schema'
import { productSchema } from '../../products/model/types'

describe('cartItemSchema', () => {
  const validItem = {
    productId: '1',
    name: 'Orquídea',
    binomialName: 'Ophrys',
    price: 4.95,
    imgUrl: 'https://example.com/a.jpg',
    quantity: 1,
    addedAt: 1,
  }

  it('accepts a valid item', () => {
    expect(() => cartItemSchema.parse(validItem)).not.toThrow()
  })

  it('accepts local imgUrl starting with /', () => {
    const parsed = cartItemSchema.parse({
      ...validItem,
      imgUrl: '/images/orquidea.jpg',
    })
    expect(parsed.imgUrl).toBe('/images/orquidea.jpg')
  })

  it('rejects quantity 0', () => {
    expect(() => cartItemSchema.parse({ ...validItem, quantity: 0 })).toThrow()
  })

  it('rejects negative quantity', () => {
    expect(() => cartItemSchema.parse({ ...validItem, quantity: -1 })).toThrow()
  })

  it('rejects non-integer quantity', () => {
    expect(() =>
      cartItemSchema.parse({ ...validItem, quantity: 1.5 })
    ).toThrow()
  })

  it('rejects negative price', () => {
    expect(() => cartItemSchema.parse({ ...validItem, price: -1 })).toThrow()
  })

  it('rejects empty productId', () => {
    expect(() =>
      cartItemSchema.parse({ ...validItem, productId: '' })
    ).toThrow()
  })

  it('rejects imgUrl without http or / prefix', () => {
    expect(() =>
      cartItemSchema.parse({ ...validItem, imgUrl: 'invalid-url' })
    ).toThrow()
  })
})

describe('persistedCartSchema', () => {
  it('accepts empty items array', () => {
    expect(() => persistedCartSchema.parse({ items: [] })).not.toThrow()
  })

  it('accepts valid items array', () => {
    const data = {
      items: [
        {
          productId: '1',
          name: 'A',
          binomialName: 'A.a',
          price: 10,
          imgUrl: '/a.jpg',
          quantity: 1,
          addedAt: 1,
        },
      ],
    }
    expect(() => persistedCartSchema.parse(data)).not.toThrow()
  })

  it('rejects when version field is present (Zustand merge contract)', () => {
    const data = {
      version: 1,
      items: [
        {
          productId: '1',
          name: 'A',
          binomialName: 'A.a',
          price: 10,
          imgUrl: '/a.jpg',
          quantity: 1,
          addedAt: 1,
        },
      ],
    }
    // Strict mode: extra keys like 'version' should cause failure
    expect(() => persistedCartSchema.strict().parse(data)).toThrow()
  })

  it('rejects items array exceeding max 500', () => {
    const item = {
      productId: '1',
      name: 'A',
      binomialName: 'A.a',
      price: 1,
      imgUrl: '/a.jpg',
      quantity: 1,
      addedAt: 1,
    }
    const data = { items: Array(501).fill(item) }
    expect(() => persistedCartSchema.parse(data)).toThrow()
  })
})

describe('productSchema', () => {
  it('accepts a valid product', () => {
    const product = {
      id: '1',
      name: 'Orquídea',
      binomialName: 'Ophrys',
      price: 4.95,
      imgUrl: 'https://example.com/a.jpg',
    }
    expect(() => productSchema.parse(product)).not.toThrow()
  })

  it('rejects negative price', () => {
    expect(() =>
      productSchema.parse({
        id: '1',
        name: 'Test',
        binomialName: 'T',
        price: -5,
        imgUrl: '/t.jpg',
      })
    ).toThrow()
  })

  it('accepts optional watering and fertilizer fields', () => {
    const product = {
      id: '2',
      name: 'Rosa',
      binomialName: 'Rosa',
      price: 10.5,
      imgUrl: '/r.jpg',
      wateringsPerWeek: 2,
      fertilizerType: 'Fosfato',
    }
    expect(() => productSchema.parse(product)).not.toThrow()
  })
})
