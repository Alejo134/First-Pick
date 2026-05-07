import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signIn } from '@/services/supabase/auth'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm]       = useState({ email: '', password: '' })
  const [error, setError]     = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const set = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await signIn(form.email, form.password)
      navigate('/')
    } catch {
      setError('Email o contraseña incorrectos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--color-bg-primary)' }}>

      <div className="w-full max-w-sm flex flex-col gap-8">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            Ingresar
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
            ¿No tenés cuenta?{' '}
            <Link to="/registro" className="underline" style={{ color: 'var(--color-accent)' }}>
              Registrate
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium uppercase tracking-widest"
              style={{ color: 'var(--color-text-muted)' }}>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={set('email')}
              placeholder="tu@email.com"
              required
              className="px-3 py-2.5 text-sm border rounded-sm outline-none transition-colors"
              style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)', color: 'var(--color-text-primary)' }}
              onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
              onBlur={e  => (e.target.style.borderColor = 'var(--color-border)')}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium uppercase tracking-widest"
              style={{ color: 'var(--color-text-muted)' }}>Contraseña</label>
            <input
              type="password"
              value={form.password}
              onChange={set('password')}
              placeholder="········"
              required
              className="px-3 py-2.5 text-sm border rounded-sm outline-none transition-colors"
              style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)', color: 'var(--color-text-primary)' }}
              onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
              onBlur={e  => (e.target.style.borderColor = 'var(--color-border)')}
            />
          </div>

          {error && (
            <p className="text-xs" style={{ color: 'var(--color-error)' }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="py-3 text-sm font-semibold uppercase tracking-widest rounded-sm transition-opacity mt-2"
            style={{
              background: 'var(--color-text-primary)',
              color:      'var(--color-bg-primary)',
              opacity:    loading ? 0.6 : 1,
              cursor:     loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}
