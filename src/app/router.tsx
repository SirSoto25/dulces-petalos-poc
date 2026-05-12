import { createBrowserRouter } from 'react-router'
import { RootLayout } from '../layouts/RootLayout'
import { NotFoundPage, RouteError } from './NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RouteError />,
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
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
