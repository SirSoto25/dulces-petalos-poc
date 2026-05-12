import { z } from 'zod'

export const CART_SCHEMA_VERSION = 1

export const cartItemSchema = z.object({
  productId: z.string().min(1),
  name: z.string(),
  binomialName: z.string(),
  price: z.number().nonnegative(),
  imgUrl: z.string().url().or(z.string().startsWith('/')),
  quantity: z.number().int().positive(),
  addedAt: z.number().int().nonnegative(),
})

export const persistedCartSchema = z.object({
  version: z.literal(CART_SCHEMA_VERSION),
  items: z.array(cartItemSchema).max(500),
})
