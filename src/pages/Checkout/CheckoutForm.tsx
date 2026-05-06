import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import { createOrder } from '@/services/supabase/orders'
import { processPayment } from '@/services/payment'

export interface CheckoutData {
  email:    string
  name:     string
  phone:    string
  address:  string
  city:     string
  province: string
  zip:      string
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency', currency: 'ARS', maximumFractionDigits: 0,
  }).format(price)
}

const PROVINCES = [
  'Buenos Aires', 'CABA', 'Catamarca', 'Chaco', 'Chubut',
  'Córdoba', 'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy',
  'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén',
  'Río Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz',
  'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán',
]

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium uppercase tracking-widest"
        style={{ color: 'var(--color-text-muted)' }}>
        {label}
      </label>
      {children}
      {error && <p className="text-xs" style={{ color: 'var(--color-error)' }}>{error}</p>}
    </div>
  )
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full px-3 py-2.5 text-sm border rounded-sm outline-none transition-colors"
      style={{
        background:   'var(--color-bg-card)',
        borderColor:  'var(--color-border)',
        color:        'var(--color-text-primary)',
      }}
      onFocus={e  => (e.target.style.borderColor = 'var(--color-accent)')}
      onBlur={e   => (e.target.style.borderColor = 'var(--color-border)')}
    />
  )
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="w-full px-3 py-2.5 text-sm border rounded-sm outline-none transition-colors"
      style={{
        background:  'var(--color-bg-card)',
        borderColor: 'var(--color-border)',
        color:       'var(--color-text-primary)',
      }}
      onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
      onBlur={e  => (e.target.style.borderColor = 'var(--color-border)')}
    />
  )
}

export default function CheckoutForm() {
  const navigate  = useNavigate()
  const user      = useAuthStore(s => s.user)
  const items     = useCartStore(s => s.items)
  const total     = useCartStore(s => s.total())
  const clearCart = useCartStore(s => s.clear)

  const [form, setForm] = useState<CheckoutData>({
    email:    user?.email ?? '',
    name:     user?.name  ?? '',
    phone:    '',
    address:  '',
    city:     '',
    province: '',
    zip:      '',
  })
  const [errors, setErrors]   = useState<Partial<CheckoutData>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  const set = (field: keyof CheckoutData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }))

  const validate = (): boolean => {
    const e: Partial<CheckoutData> = {}
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email    = 'Email inválido'
    if (!form.name.trim())    e.name     = 'Requerido'
    if (!form.phone.trim())   e.phone    = 'Requerido'
    if (!form.address.trim()) e.address  = 'Requerido'
    if (!form.city.trim())    e.city     = 'Requerido'
    if (!form.province)       e.province = 'Requerido'
    if (!form.zip.trim())     e.zip      = 'Requerido'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    setError(null)

    // 1. Crea la orden y descuenta stock en DB
    const orderResult = await createOrder({
      items,
      userId:     user?.id,
      guestEmail: !user ? form.email : undefined,
    })

    if (!orderResult.ok) {
      setError(orderResult.message ?? 'Error al procesar la orden.')
      setLoading(false)
      return
    }

    // 2. Procesa el pago (simulado por ahora)
    navigate('/checkout/procesando')
    const payResult = await processPayment({
      orderId: orderResult.orderId!,
      amount:  total,
      email:   form.email,
    })

    if (!payResult.ok) {
      navigate('/checkout/error')
      return
    }

    clearCart()
    navigate(`/checkout/confirmacion/${orderResult.orderId}`)
  }

  if (items.length === 0) {
    navigate('/')
    return null
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg-primary)' }}>
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-14">
        <h1 className="text-2xl font-semibold mb-10" style={{ color: 'var(--color-text-primary)' }}>
          Checkout
        </h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* ── Formulario ── */}
            <div className="flex flex-col gap-8">

              {/* Contacto */}
              <div className="flex flex-col gap-4">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em]"
                  style={{ color: 'var(--color-text-secondary)' }}>
                  Contacto
                </h2>
                <Field label="Email" error={errors.email}>
                  <Input type="email" value={form.email} onChange={set('email')} placeholder="tu@email.com" />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Nombre completo" error={errors.name}>
                    <Input value={form.name} onChange={set('name')} placeholder="Juan García" />
                  </Field>
                  <Field label="Teléfono" error={errors.phone}>
                    <Input type="tel" value={form.phone} onChange={set('phone')} placeholder="11 1234-5678" />
                  </Field>
                </div>
              </div>

              {/* Envío */}
              <div className="flex flex-col gap-4">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em]"
                  style={{ color: 'var(--color-text-secondary)' }}>
                  Dirección de envío
                </h2>
                <Field label="Calle y número" error={errors.address}>
                  <Input value={form.address} onChange={set('address')} placeholder="Av. Corrientes 1234" />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Ciudad" error={errors.city}>
                    <Input value={form.city} onChange={set('city')} placeholder="Buenos Aires" />
                  </Field>
                  <Field label="Código postal" error={errors.zip}>
                    <Input value={form.zip} onChange={set('zip')} placeholder="1043" />
                  </Field>
                </div>
                <Field label="Provincia" error={errors.province}>
                  <Select value={form.province} onChange={set('province')}>
                    <option value="">Seleccioná una provincia</option>
                    {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                  </Select>
                </Field>
              </div>

              {error && (
                <p className="text-sm p-3 rounded-sm border"
                  style={{ color: 'var(--color-error)', borderColor: 'var(--color-error)', background: 'var(--color-accent-muted)' }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 text-sm font-semibold uppercase tracking-widest rounded-sm transition-opacity"
                style={{
                  background: 'var(--color-text-primary)',
                  color:      'var(--color-bg-primary)',
                  opacity:    loading ? 0.6 : 1,
                  cursor:     loading ? 'not-allowed' : 'pointer',
                }}
              >
                Confirmar compra
              </button>
            </div>

            {/* ── Resumen ── */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: 'var(--color-text-secondary)' }}>
                Resumen del pedido
              </h2>

              <div className="rounded-sm border p-5 flex flex-col gap-4"
                style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-card)' }}>
                {items.map(item => (
                  <div key={item.variantId} className="flex justify-between gap-4 text-sm">
                    <div>
                      <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>
                        {item.name}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                        Talle {item.size} · x{item.quantity}
                      </p>
                    </div>
                    <p className="font-medium shrink-0" style={{ color: 'var(--color-text-primary)' }}>
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}

                <div className="border-t pt-4 flex flex-col gap-2"
                  style={{ borderColor: 'var(--color-border)' }}>
                  <div className="flex justify-between text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    <span>Subtotal</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    <span>Envío</span>
                    <span>A coordinar</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t"
                    style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-primary)' }}>
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>
                Pago simulado · Sin datos reales de tarjeta
              </p>
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}
