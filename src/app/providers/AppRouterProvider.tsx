import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useLocation,
} from 'react-router-dom'

import AppLayout from '@/app/layouts/AppLayout'
import { hasAuthFlag } from '@/shared/api/auth'

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
    path: '/',
    element: <Navigate to='/products' replace />,
  },
  {
    Component: PublicRoute,
    children: [
      {
        path: '/login',
        lazy: () => import('@/pages/LoginPage'),
      },
    ],
  },
  {
    Component: PrivateRoute,
    children: [
      {
        Component: AppLayout,
        children: [
          {
            path: '/products',
            lazy: () => import('@/pages/ProductsPage'),
          },
        ],
      },
    ],
  },
])

export const AppRouterProvider = () => {
  return <RouterProvider router={router} />
}
