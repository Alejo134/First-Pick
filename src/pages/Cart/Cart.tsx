import { Link, useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { type CartItem } from '@/types'

function formatPrice(price: number) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency', currency: 'ARS', maximumFractionDigits: 0,
  }).format(price)
}

function CartRow({ item }: { item: CartItem }) {
  const remove    = useCartStore(s => s.remove)
  const updateQty = useCartStore(s => s.updateQty)

  const atMax = item.quantity >= item.stock

  return (
    <div className="flex gap-4 py-6 border-b" style={{ borderColor: 'var(--color-border)' }}>

      {/* Imagen */}
      <Link to={`/producto/${item.productId}`}>
        <div className="w-20 h-24 rounded-sm shrink-0 flex items-center justify-center"
          style={{ background: 'var(--color-bg-secondary)' }}>
          {item.image
            ? <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-sm" />
            : <ShoppingBag size={20} style={{ color: 'var(--color-text-muted)' }} />
          }
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col justify-between gap-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link to={`/producto/${item.productId}`}>
              <p className="text-sm font-medium leading-snug hover:underline"
                style={{ color: 'var(--color-text-primary)' }}>
                {item.name}
              </p>
            </Link>
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
              Talle {item.size}{item.color ? ` · ${item.color}` : ''}
            </p>
            {atMax && (
              <p className="text-xs mt-1 font-medium" style={{ color: 'var(--color-warning)' }}>
                Máximo disponible
              </p>
            )}
          </div>
          <button onClick={() => remove(item.variantId)} className="shrink-0 transition-opacity hover:opacity-60">
            <Trash2 size={14} style={{ color: 'var(--color-text-muted)' }} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          {/* Cantidad */}
          <div className="flex items-center border rounded-sm" style={{ borderColor: 'var(--color-border)' }}>
            <button
              onClick={() => updateQty(item.variantId, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center transition-colors hover:bg-[var(--color-bg-secondary)]"
            >
              <Minus size={12} />
            </button>
            <span className="w-8 text-center text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
              {item.quantity}
            </span>
            <button
              onClick={() => updateQty(item.variantId, item.quantity + 1)}
              disabled={atMax}
              className="w-8 h-8 flex items-center justify-center transition-colors"
              style={{
                opacity: atMax ? 0.3 : 1,
                cursor:  atMax ? 'not-allowed' : 'pointer',
              }}
            >
              <Plus size={12} />
            </button>
          </div>

          <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>
      </div>

    </div>
  )
}

export default function Cart() {
  const items = useCartStore(s => s.items)
  const total = useCartStore(s => s.total())
  const clear = useCartStore(s => s.clear)
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6"
        style={{ background: 'var(--color-bg-primary)' }}>
        <ShoppingBag size={40} style={{ color: 'var(--color-border)' }} />
        <div className="text-center">
          <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
            Tu carrito está vacío
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
            Explorá la tienda y encontrá algo que te guste
          </p>
        </div>
        <Link to="/"
          className="text-xs font-medium uppercase tracking-widest border-b transition-opacity hover:opacity-60"
          style={{ color: 'var(--color-accent)', borderColor: 'var(--color-accent)' }}>
          Ir a la tienda
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg-primary)' }}>
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 md:py-14">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            Carrito
          </h1>
          <button onClick={clear}
            className="text-xs font-medium uppercase tracking-widest transition-opacity hover:opacity-60"
            style={{ color: 'var(--color-text-muted)' }}>
            Vaciar
          </button>
        </div>

        {/* Items */}
        <div className="mb-10">
          {items.map(item => <CartRow key={item.variantId} item={item} />)}
        </div>

        {/* Resumen */}
        <div className="flex flex-col gap-4 pt-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <div className="flex justify-between text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            <span>Subtotal</span>
            <span>{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between text-sm" style={{ color: 'var(--color-text-muted)' }}>
            <span>Envío</span>
            <span>Se calcula en el checkout</span>
          </div>
          <div className="flex justify-between font-semibold pt-2 border-t" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-primary)' }}>
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-4 text-sm font-semibold uppercase tracking-widest rounded-sm mt-2 transition-opacity hover:opacity-80"
            style={{ background: 'var(--color-text-primary)', color: 'var(--color-bg-primary)' }}
          >
            Finalizar compra
          </button>

          <Link to="/" className="text-center text-xs font-medium uppercase tracking-widest transition-opacity hover:opacity-60"
            style={{ color: 'var(--color-text-muted)' }}>
            Seguir comprando
          </Link>
        </div>

      </div>
    </div>
  )
}
