import { z } from 'zod'
import { httpClient } from '../../../shared/lib/httpClient'
import { productSchema } from '../model/types'

const productsResponseSchema = z.array(productSchema)

export async function getProducts() {
  const data = await httpClient<unknown[]>('/v1/product')
  return productsResponseSchema.parse(data)
}

export async function getProduct(id: string) {
  const data = await httpClient<unknown>(`/v1/product/${id}`)
  return productSchema.parse(data)
}
