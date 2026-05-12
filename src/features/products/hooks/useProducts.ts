import { useQuery } from '@tanstack/react-query'
import { getProducts, getProduct } from '../api/productsApi'

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: ({ signal }) => getProducts({ signal }),
  })
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: ({ signal }) => getProduct(id, { signal }),
    enabled: !!id,
  })
}
