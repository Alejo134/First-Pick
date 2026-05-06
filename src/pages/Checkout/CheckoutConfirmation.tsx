import { Link, useParams } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

export default function CheckoutConfirmation() {
  const { orderId } = useParams<{ orderId: string }>()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4"
      style={{ background: 'var(--color-bg-primary)' }}>

      <CheckCircle size={48} style={{ color: 'var(--color-accent-teal)' }} />

      <div className="text-center flex flex-col gap-2">
        <h1 className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          ¡Compra confirmada!
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Te vamos a contactar para coordinar el envío.
        </p>
        {orderId && (
          <p className="text-xs mt-2 font-mono" style={{ color: 'var(--color-text-muted)' }}>
            Orden # {orderId.slice(0, 8).toUpperCase()}
          </p>
        )}
      </div>

      <Link
        to="/"
        className="text-xs font-medium uppercase tracking-widest border-b transition-opacity hover:opacity-60"
        style={{ color: 'var(--color-accent)', borderColor: 'var(--color-accent)' }}
      >
        Seguir comprando
      </Link>
    </div>
  )
}
