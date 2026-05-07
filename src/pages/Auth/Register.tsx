import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signUp } from '@/services/supabase/auth'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm]       = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors]   = useState<Partial<typeof form>>({})
  const [error, setError]     = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const set = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }))

  const validate = () => {
    const e: Partial<typeof form> = {}
    if (!form.name.trim())                          e.name     = 'Requerido'
    if (!/\S+@\S+\.\S+/.test(form.email))           e.email    = 'Email inválido'
    if (form.password.length < 6)                   e.password = 'Mínimo 6 caracteres'
    if (form.password !== form.confirm)             e.confirm  = 'Las contraseñas no coinciden'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setError(null)
    setLoading(true)
    try {
      await signUp(form.email, form.password, form.name)
      navigate('/')
    } catch {
      setError('No se pudo crear la cuenta. El email ya puede estar registrado.')
    } finally {
      setLoading(false)
    }
  }

  const fields: { key: keyof typeof form; label: string; type: string; placeholder: string }[] = [
    { key: 'name',     label: 'Nombre completo', type: 'text',     placeholder: 'Juan García'    },
    { key: 'email',    label: 'Email',            type: 'email',    placeholder: 'tu@email.com'   },
    { key: 'password', label: 'Contraseña',       type: 'password', placeholder: '········'       },
    { key: 'confirm',  label: 'Repetir contraseña', type: 'password', placeholder: '········'     },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--color-bg-primary)' }}>

      <div className="w-full max-w-sm flex flex-col gap-8">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            Crear cuenta
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
            ¿Ya tenés cuenta?{' '}
            <Link to="/login" className="underline" style={{ color: 'var(--color-accent)' }}>
              Ingresá
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          {fields.map(({ key, label, type, placeholder }) => (
            <div key={key} className="flex flex-col gap-1.5">
              <label className="text-xs font-medium uppercase tracking-widest"
                style={{ color: 'var(--color-text-muted)' }}>{label}</label>
              <input
                type={type}
                value={form[key]}
                onChange={set(key)}
                placeholder={placeholder}
                className="px-3 py-2.5 text-sm border rounded-sm outline-none transition-colors"
                style={{ background: 'var(--color-bg-card)', borderColor: errors[key] ? 'var(--color-error)' : 'var(--color-border)', color: 'var(--color-text-primary)' }}
                onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
                onBlur={e  => (e.target.style.borderColor = errors[key] ? 'var(--color-error)' : 'var(--color-border)')}
              />
              {errors[key] && <p className="text-xs" style={{ color: 'var(--color-error)' }}>{errors[key]}</p>}
            </div>
          ))}

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
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>
      </div>
    </div>
  )
}
