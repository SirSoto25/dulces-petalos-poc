import { z } from 'zod'
import { httpClient } from '../../../shared/lib/httpClient'
import { productSchema } from '../model/types'

const productsResponseSchema = z.array(productSchema)

export async function getProducts({ signal }: { signal?: AbortSignal } = {}) {
  const data = await httpClient<unknown[]>('/v1/product', { signal })
  return productsResponseSchema.parse(data)
}

export async function getProduct(
  id: string,
  { signal }: { signal?: AbortSignal } = {}
) {
  const data = await httpClient<unknown>(`/v1/product/${id}`, { signal })
  return productSchema.parse(data)
}
