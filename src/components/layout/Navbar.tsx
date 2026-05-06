import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShoppingBag, ShoppingCart, Sparkles, LogIn, type LucideIcon } from 'lucide-react'

interface NavItem {
  to: string
  label: string
  icon: LucideIcon
  end?: boolean
}

const links: NavItem[] = [
  { to: '/',          label: 'Tienda',    icon: ShoppingBag,  end: true  },
  { to: '/carrito',   label: 'Carrito',   icon: ShoppingCart, end: false },
  { to: '/generador', label: 'Generador', icon: Sparkles,     end: false },
  { to: '/login',     label: 'Ingresar',  icon: LogIn,        end: false },
]

export default function Navbar() {
  const [expanded, setExpanded] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* ── Sidebar desktop ── */}
      <aside
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        className="hidden md:flex flex-col justify-between fixed right-0 top-0 h-full z-50 py-10 overflow-hidden border-l transition-[width] duration-300 ease-in-out"
        style={{
          width: expanded ? 'var(--navbar-expanded)' : 'var(--navbar-collapsed)',
          background: 'var(--color-bg-dark)',
          borderColor: 'var(--color-bg-dark)',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center justify-center px-4 overflow-hidden whitespace-nowrap h-10"
          style={{ fontFamily: 'var(--font-brand)', color: 'var(--color-text-inverse)' }}
        >
          <span
            className="transition-all duration-300 text-center leading-tight"
            style={{ fontSize: expanded ? '1rem' : '0.75rem' }}
          >
            {expanded ? 'First Pick' : 'FP'}
          </span>
        </Link>

        {/* Links */}
        <nav className="flex flex-col gap-1">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-4 px-[22px] py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap
                ${isActive
                  ? 'text-[var(--color-accent-amber)] border-r-2 border-[var(--color-accent-amber)]'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-inverse)]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={18}
                    className="shrink-0 transition-colors duration-200"
                    style={{ color: isActive ? 'var(--color-accent-amber)' : undefined }}
                  />
                  <span
                    className="overflow-hidden transition-all duration-300"
                    style={{ opacity: expanded ? 1 : 0, maxWidth: expanded ? '120px' : '0px' }}
                  >
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Copyright */}
        <span
          className="px-4 text-[11px] whitespace-nowrap overflow-hidden transition-opacity duration-300"
          style={{
            color: 'var(--color-text-muted)',
            opacity: expanded ? 1 : 0,
          }}
        >
          © {new Date().getFullYear()} First Pick
        </span>
      </aside>

      {/* ── Header mobile ── */}
      <header
        className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-14 border-b"
        style={{
          background: 'var(--color-bg-dark)',
          borderColor: 'var(--color-bg-dark)',
        }}
      >
        <Link
          to="/"
          style={{ fontFamily: 'var(--font-brand)', color: 'var(--color-text-inverse)', fontSize: '1rem' }}
        >
          First Pick
        </Link>

        <button
          onClick={() => setMenuOpen(prev => !prev)}
          className="flex flex-col gap-1.5 p-1"
          aria-label="Menú"
        >
          <span className={`block h-0.5 w-6 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}  style={{ background: 'var(--color-text-inverse)' }} />
          <span className={`block h-0.5 w-6 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}                style={{ background: 'var(--color-text-inverse)' }} />
          <span className={`block h-0.5 w-6 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ background: 'var(--color-text-inverse)' }} />
        </button>
      </header>

      {/* ── Menú mobile fullscreen ── */}
      <div
        className={`md:hidden fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 transition-opacity duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ background: 'var(--color-bg-dark)' }}
        onClick={() => setMenuOpen(false)}
      >
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 text-lg font-medium transition-colors
              ${isActive ? 'text-[var(--color-accent-amber)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-inverse)]'}`
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </div>
    </>
  )
}
