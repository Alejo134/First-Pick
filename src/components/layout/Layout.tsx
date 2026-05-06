import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div className="min-h-screen flex">
      <Navbar />
      {/* En mobile no hay sidebar → sin margen. En desktop → 64px (--navbar-collapsed) */}
      <main className="flex-1 min-h-screen pt-14 md:pt-0 md:mr-16">
        <Outlet />
      </main>
    </div>
  )
}
