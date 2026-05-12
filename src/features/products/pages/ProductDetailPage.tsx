import { useParams } from 'react-router'
import { ErrorState } from '../../../shared/ui/ErrorState'
import { Breadcrumb } from '../../../shared/ui/Breadcrumb'
import { formatPrice } from '../../../shared/lib/formatPrice'
import { useProduct } from '../hooks/useProducts'
import { AddToCartButton } from '../../cart/components/AddToCartButton'

export function Component() {
  const { id } = useParams<{ id: string }>()
  const {
    data: product,
    isLoading,
    isError,
    error,
    refetch,
  } = useProduct(id || '')

  if (isLoading) {
    return <ProductDetailSkeleton />
  }

  if (isError || !product) {
    return (
      <ErrorState
        title="Error al cargar el producto"
        message={error?.message || 'No se pudo cargar el producto.'}
        onRetry={() => refetch()}
      />
    )
  }

  const breadcrumbItems = [
    { label: 'Inicio', to: '/' },
    { label: product.name },
  ]

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        <div className="relative">
          <img
            src={product.imgUrl}
            alt={product.name}
            className="w-full h-96 object-cover rounded-card"
            onError={(e) => {
              ;(e.target as HTMLImageElement).src =
                'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23e5e7eb%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%236b7280%22 font-family=%22sans-serif%22 font-size=%2220%22 dy=%22.3em%22 text-anchor=%22middle%22 x=%22200%22 y=%22150%22%3EImagen no disponible%3C/text%3E%3C/svg%3E'
            }}
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-text mb-1">{product.name}</h1>
          <p className="text-text-muted italic mb-4">{product.binomialName}</p>
          <p className="text-2xl font-semibold text-text mb-6">
            {formatPrice(product.price)}
          </p>

          <div className="space-y-2 mb-8">
            {product.wateringsPerWeek !== undefined && (
              <p className="text-text-muted text-sm">
                Regar {product.wateringsPerWeek}{' '}
                {product.wateringsPerWeek === 1 ? 'vez' : 'veces'} por semana
              </p>
            )}
            {product.fertilizerType && (
              <p className="text-text-muted text-sm">
                Fertilizar con {product.fertilizerType}
              </p>
            )}
          </div>

          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  )
}

function ProductDetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-32 mb-4" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        <div className="h-96 bg-gray-200 rounded-card" />
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-6 bg-gray-200 rounded w-24" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-12 bg-gray-200 rounded w-48" />
        </div>
      </div>
    </div>
  )
}
