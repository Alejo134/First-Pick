import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import router from '@/router'
import './index.css'

function App() {
  const init = useAuthStore(s => s.init)
  useEffect(() => init(), [init])
  return <RouterProvider router={router} />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
