import { Link, useNavigate } from 'react-router-dom'
import { XCircle } from 'lucide-react'

export default function CheckoutError() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4"
      style={{ background: 'var(--color-bg-primary)' }}>

      <XCircle size={48} style={{ color: 'var(--color-error)' }} />

      <div className="text-center flex flex-col gap-2">
        <h1 className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          Hubo un problema
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          No se pudo procesar el pago. Tu carrito sigue intacto.
        </p>
      </div>

      <div className="flex gap-6">
        <button
          onClick={() => navigate('/checkout')}
          className="text-xs font-medium uppercase tracking-widest py-2 px-5 rounded-sm transition-opacity hover:opacity-80"
          style={{ background: 'var(--color-text-primary)', color: 'var(--color-bg-primary)' }}
        >
          Reintentar
        </button>
        <Link
          to="/carrito"
          className="text-xs font-medium uppercase tracking-widest transition-opacity hover:opacity-60"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Ver carrito
        </Link>
      </div>
    </div>
  )
}
