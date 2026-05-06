import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home/Home'
import Generator from '@/pages/Generator/Generator'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'generador', element: <Generator /> },
    ],
  },
])

export default router
