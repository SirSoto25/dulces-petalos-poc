import { useState } from 'react'
import { ErrorState } from '../../../shared/ui/ErrorState'
import { SkeletonGrid } from '../../../shared/ui/Skeleton'
import { useDebouncedValue } from '../../../shared/hooks/useDebouncedValue'
import { useProducts } from '../hooks/useProducts'
import { ProductGrid } from '../components/ProductGrid'
import { ProductSearch } from '../components/ProductSearch'

export function Component() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebouncedValue(search, 250)
  const { data: products, isLoading, isError, error, refetch } = useProducts()

  const filteredProducts = products
    ? products.filter((p) => {
        const q = debouncedSearch.toLowerCase().trim()
        if (!q) return true
        return (
          p.name.toLowerCase().includes(q) ||
          p.binomialName.toLowerCase().includes(q)
        )
      })
    : []

  return (
    <div>
      <ProductSearch value={search} onChange={setSearch} />
      {isLoading && <SkeletonGrid count={6} />}
      {isError && (
        <ErrorState
          title="Error al cargar productos"
          message={error?.message || 'No se pudieron cargar los productos.'}
          onRetry={() => refetch()}
        />
      )}
      {!isLoading && !isError && products && (
        <ProductGrid products={filteredProducts} />
      )}
    </div>
  )
}
