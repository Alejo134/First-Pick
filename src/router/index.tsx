import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home/Home'
import Product from '@/pages/Product/Product'
import Cart from '@/pages/Cart/Cart'
import CheckoutForm from '@/pages/Checkout/CheckoutForm'
import CheckoutProcessing from '@/pages/Checkout/CheckoutProcessing'
import CheckoutConfirmation from '@/pages/Checkout/CheckoutConfirmation'
import CheckoutError from '@/pages/Checkout/CheckoutError'
import Generator from '@/pages/Generator/Generator'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true,                             element: <Home /> },
      { path: 'producto/:id',                    element: <Product /> },
      { path: 'carrito',                         element: <Cart /> },
      { path: 'checkout',                        element: <CheckoutForm /> },
      { path: 'checkout/procesando',             element: <CheckoutProcessing /> },
      { path: 'checkout/confirmacion/:orderId',  element: <CheckoutConfirmation /> },
      { path: 'checkout/error',                  element: <CheckoutError /> },
      { path: 'generador',                       element: <Generator /> },
    ],
  },
])

export default router
