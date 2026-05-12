import { createBrowserRouter } from 'react-router'
import { RootLayout } from '../layouts/RootLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        lazy: () => import('../features/products/pages/ProductListPage'),
      },
      {
        path: 'product/:id',
        lazy: () => import('../features/products/pages/ProductDetailPage'),
      },
      { path: 'cart', lazy: () => import('../features/cart/pages/CartPage') },
      { path: '*', element: <div>404</div> },
    ],
  },
])
