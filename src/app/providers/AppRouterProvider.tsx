import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useLocation,
} from 'react-router-dom'

import { hasAuthFlag } from '@/shared/api/auth'
import { RouteErrorFallback } from '@/shared/ui/RouteErrorFallback'

const RootLayout = () => <Outlet />

const PrivateRoute = () => {
  const location = useLocation()
  if (!hasAuthFlag()) return <Navigate to='/login' state={{ from: location }} replace />
  return <Outlet />
}

const PublicRoute = () => {
  if (hasAuthFlag()) return <Navigate to='/products' replace />
  return <Outlet />
}

const router = createBrowserRouter([
  {
    id: 'root',
    Component: RootLayout,
    errorElement: <RouteErrorFallback title='Ошибка приложения' />,
    children: [
      {
        path: '/',
        element: <Navigate to='/products' replace />,
      },
      {
        Component: PublicRoute,
        children: [
          {
            path: '/login',
            lazy: () => import('@/pages/LoginPage'),
            errorElement: <RouteErrorFallback title='Ошибка входа' />,
          },
        ],
      },
      {
        Component: PrivateRoute,
        children: [
          {
            lazy: () => import('@/app/layouts/appLayoutRoute'),
            errorElement: <RouteErrorFallback title='Ошибка раздела' />,
            children: [
              {
                path: '/products',
                lazy: () => import('@/pages/ProductsPage'),
                errorElement: <RouteErrorFallback title='Ошибка каталога товаров' />,
              },
            ],
          },
        ],
      },
      {
        path: '*',
        lazy: () => import('@/pages/NotFoundPage'),
        errorElement: <RouteErrorFallback title='Ошибка страницы' />,
      },
    ],
  },
])

export const AppRouterProvider = () => {
  return <RouterProvider router={router} />
}
