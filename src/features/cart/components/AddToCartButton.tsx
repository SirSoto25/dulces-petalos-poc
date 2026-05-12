import { useState } from 'react'
import type { Product } from '../../products/model/types'
import { useCart } from '../hooks/useCart'

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleClick = () => {
    addItem({
      productId: product.id,
      name: product.name,
      binomialName: product.binomialName,
      price: product.price,
      imgUrl: product.imgUrl,
      quantity: 1,
      addedAt: Date.now(),
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <button
      onClick={handleClick}
      disabled={added}
      className="w-full sm:w-auto px-6 py-3 bg-cta text-white font-medium rounded-button hover:bg-cta-hover transition-colors focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-2 disabled:opacity-90 disabled:cursor-default"
      aria-label={added ? 'Añadido al carrito' : 'Añadir al carrito'}
    >
      {added ? 'Añadido ✓' : 'Añadir al carrito'}
    </button>
  )
}
