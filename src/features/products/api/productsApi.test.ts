import { describe, it, expect } from 'vitest'
import { http, HttpResponse } from 'msw'
import { getProducts, getProduct } from './productsApi'
import { server } from '../../../test/msw/server'

const API_URL = 'https://dulces-petalos.jakala.es/api'

describe('productsApi', () => {
  describe('getProducts', () => {
    it('fetches and validates the products array', async () => {
      const products = await getProducts()
      expect(Array.isArray(products)).toBe(true)
      expect(products.length).toBe(6)
      expect(products[0].name).toBe('Orquídea')
      expect(products[0].price).toBe(4.95)
    })

    it('throws ZodError when API returns invalid schema', async () => {
      server.use(
        http.get(`${API_URL}/v1/product`, () =>
          HttpResponse.json([{ invalid: true }])
        )
      )
      await expect(getProducts()).rejects.toThrow()
    })

    it('throws ApiError on HTTP 500', async () => {
      server.use(
        http.get(`${API_URL}/v1/product`, () =>
          HttpResponse.json({ error: 'Internal error' }, { status: 500 })
        )
      )
      await expect(getProducts()).rejects.toThrow()
    })

    it('throws when API returns a non-array (schema mismatch)', async () => {
      server.use(
        http.get(`${API_URL}/v1/product`, () => HttpResponse.json({ data: [] }))
      )
      await expect(getProducts()).rejects.toThrow()
    })
  })

  describe('getProduct', () => {
    it('fetches a single product by id', async () => {
      const product = await getProduct('1')
      expect(product.name).toBe('Orquídea')
      expect(product.price).toBe(4.95)
    })

    it('throws ApiError on 404', async () => {
      await expect(getProduct('nonexistent')).rejects.toThrow()
    })

    it('throws when API returns invalid product schema', async () => {
      server.use(
        http.get(`${API_URL}/v1/product/:id`, () =>
          HttpResponse.json({ id: '1', name: 'Bad' })
        )
      )
      await expect(getProduct('1')).rejects.toThrow()
    })
  })
})
