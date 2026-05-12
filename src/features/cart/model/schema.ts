import { z } from 'zod'

export const CART_SCHEMA_VERSION = 1

export const cartItemSchema = z.object({
  productId: z.string().min(1),
  name: z.string(),
  binomialName: z.string(),
  price: z.number().nonnegative().finite(),
  imgUrl: z.string().url().or(z.string().startsWith('/')),
  quantity: z.number().int().positive(),
  addedAt: z.number().int().nonnegative(),
})

/**
 * Zustand's persist middleware calls merge(persisted, current) where
 * `persisted` is the deserialized `state` slice (what partialize returned),
 * NOT the full storage entry. So the schema must match { items: [...] },
 * without a `version` field.
 */
export const persistedCartSchema = z.object({
  items: z.array(cartItemSchema).max(500),
})
