import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import ProtectedRoute from '@/components/guards/ProtectedRoute'
import AdminRoute from '@/components/guards/AdminRoute'
import Home from '@/pages/Home/Home'
import Product from '@/pages/Product/Product'
import Cart from '@/pages/Cart/Cart'
import CheckoutForm from '@/pages/Checkout/CheckoutForm'
import CheckoutProcessing from '@/pages/Checkout/CheckoutProcessing'
import CheckoutConfirmation from '@/pages/Checkout/CheckoutConfirmation'
import CheckoutError from '@/pages/Checkout/CheckoutError'
import Login from '@/pages/Auth/Login'
import Register from '@/pages/Auth/Register'
import Dashboard from '@/pages/Admin/Dashboard'
import Stock from '@/pages/Admin/Stock'
import Generator from '@/pages/Generator/Generator'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true,                            element: <Home /> },
      { path: 'producto/:id',                   element: <Product /> },
      { path: 'carrito',                        element: <Cart /> },
      { path: 'login',                          element: <Login /> },
      { path: 'registro',                       element: <Register /> },
      { path: 'generador',                      element: <Generator /> },

      // Rutas protegidas (sesión)
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'checkout',                       element: <CheckoutForm /> },
          { path: 'checkout/procesando',            element: <CheckoutProcessing /> },
          { path: 'checkout/confirmacion/:orderId', element: <CheckoutConfirmation /> },
          { path: 'checkout/error',                 element: <CheckoutError /> },
        ],
      },

      // Rutas admin
      {
        element: <AdminRoute />,
        children: [
          { path: 'admin',        element: <Dashboard /> },
          { path: 'admin/stock',  element: <Stock /> },
        ],
      },
    ],
  },
])

export default router
