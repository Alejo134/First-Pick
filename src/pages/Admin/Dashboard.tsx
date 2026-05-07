import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, ShoppingCart, TrendingUp, AlertTriangle, Package } from 'lucide-react'
import { getDashboardMetrics, type DashboardMetrics } from '@/services/supabase/admin'

function formatPrice(price: number) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency', currency: 'ARS', maximumFractionDigits: 0,
  }).format(price)
}

function MetricCard({ icon: Icon, label, value, accent = false, warn = false }: {
  icon: React.ElementType
  label: string
  value: string
  accent?: boolean
  warn?: boolean
}) {
  const color = warn ? 'var(--color-warning)' : accent ? 'var(--color-accent)' : 'var(--color-accent-teal)'
  return (
    <div className="flex flex-col gap-4 p-6 rounded-sm border"
      style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-card)' }}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-widest"
          style={{ color: 'var(--color-text-muted)' }}>{label}</span>
        <Icon size={16} style={{ color }} />
      </div>
      <p className="text-3xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
        {value}
      </p>
    </div>
  )
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDashboardMetrics()
      .then(setMetrics)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg-primary)' }}>
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-14">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] mb-1"
              style={{ color: 'var(--color-accent)' }}>Panel de administración</p>
            <h1 className="text-2xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              Dashboard
            </h1>
          </div>
          <Link to="/admin/stock"
            className="text-xs font-medium uppercase tracking-widest px-4 py-2 rounded-sm transition-opacity hover:opacity-80"
            style={{ background: 'var(--color-text-primary)', color: 'var(--color-bg-primary)' }}>
            Gestionar stock
          </Link>
        </div>

        {/* Métricas */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 rounded-sm" style={{ background: 'var(--color-bg-secondary)' }} />
            ))}
          </div>
        ) : metrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricCard icon={ShoppingCart}  label="Órdenes totales"  value={String(metrics.totalOrders)}          />
            <MetricCard icon={TrendingUp}    label="Ingresos totales" value={formatPrice(metrics.totalRevenue)} accent />
            <MetricCard icon={ShoppingBag}   label="Productos activos" value={String(metrics.totalProducts)}        />
            <MetricCard icon={AlertTriangle} label="Stock bajo"        value={String(metrics.lowStockCount)}  warn   />
          </div>
        )}

        {/* Accesos rápidos */}
        <div className="mt-12">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] mb-6"
            style={{ color: 'var(--color-text-secondary)' }}>Accesos rápidos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Link to="/admin/stock"
              className="flex items-center gap-4 p-5 rounded-sm border transition-colors hover:border-[var(--color-accent)]"
              style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-card)' }}>
              <Package size={20} style={{ color: 'var(--color-accent)' }} />
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                  Gestión de stock
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                  Subir o bajar stock por variante
                </p>
              </div>
            </Link>

            <Link to="/"
              className="flex items-center gap-4 p-5 rounded-sm border transition-colors hover:border-[var(--color-accent)]"
              style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-card)' }}>
              <ShoppingBag size={20} style={{ color: 'var(--color-accent-teal)' }} />
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                  Ver tienda
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                  Ir al frontend como cliente
                </p>
              </div>
            </Link>

          </div>
        </div>

      </div>
    </div>
  )
}
