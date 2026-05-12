import { z } from 'zod'

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  binomialName: z.string(),
  price: z.number().nonnegative(),
  imgUrl: z.string().url().or(z.string().startsWith('/')),
  wateringsPerWeek: z.number().optional(),
  fertilizerType: z.string().optional(),
})

export type Product = z.infer<typeof productSchema>
