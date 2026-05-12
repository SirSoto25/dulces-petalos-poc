export interface CartItem {
  productId: string
  name: string
  binomialName: string
  price: number
  imgUrl: string
  quantity: number
  addedAt: number
}

export interface CartActions {
  addItem: (item: CartItem) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clear: () => void
}

export interface CartState extends CartActions {
  items: CartItem[]
}
