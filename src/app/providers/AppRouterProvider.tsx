import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useLocation,
} from 'react-router-dom'

const getToken = () => localStorage.getItem('auth_token') ?? sessionStorage.getItem('auth_token')

const PrivateRoute = () => {
  const location = useLocation()
  if (!getToken()) return <Navigate to='/login' state={{ from: location }} replace />
  return <Outlet />
}

const PublicRoute = () => {
  if (getToken()) return <Navigate to='/products' replace />
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
        path: '/products',
        lazy: () => import('@/pages/ProductsPage'),
      },
    ],
  },
])

export const AppRouterProvider = () => {
  return <RouterProvider router={router} />
}
