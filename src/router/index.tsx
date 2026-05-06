import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home/Home'
import Product from '@/pages/Product/Product'
import Generator from '@/pages/Generator/Generator'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true,            element: <Home /> },
      { path: 'producto/:id',   element: <Product /> },
      { path: 'generador',      element: <Generator /> },
    ],
  },
])

export default router
