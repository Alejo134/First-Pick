import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Minus, ArrowLeft, RotateCcw } from 'lucide-react'
import { getAllStock, updateStock, type StockVariant } from '@/services/supabase/admin'

function stockColor(stock: number) {
  if (stock === 0)  return 'var(--color-error)'
  if (stock <= 3)   return 'var(--color-warning)'
  return 'var(--color-accent-teal)'
}

export default function Stock() {
  const [variants, setVariants]   = useState<StockVariant[]>([])
  const [loading, setLoading]     = useState(true)
  const [saving, setSaving]       = useState<string | null>(null)
  const [search, setSearch]       = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    const data = await getAllStock()
    setVariants(data)
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const handleUpdate = async (variantId: string, currentStock: number, delta: number) => {
    const newStock = Math.max(0, currentStock + delta)
    setSaving(variantId)

    const ok = await updateStock(variantId, newStock)
    if (ok) {
      setVariants(prev =>
        prev.map(v => v.variantId === variantId ? { ...v, stock: newStock } : v)
      )
    }
    setSaving(null)
  }

  const handleInputChange = async (variantId: string, raw: string) => {
    const val = parseInt(raw)
    if (isNaN(val) || val < 0) return

    setSaving(variantId)
    const ok = await updateStock(variantId, val)
    if (ok) {
      setVariants(prev =>
        prev.map(v => v.variantId === variantId ? { ...v, stock: val } : v)
      )
    }
    setSaving(null)
  }

  const filtered = variants.filter(v =>
    v.productName.toLowerCase().includes(search.toLowerCase()) ||
    v.size.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg-primary)' }}>
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-14">

        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <Link to="/admin"
              className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest mb-4 transition-opacity hover:opacity-60"
              style={{ color: 'var(--color-text-muted)' }}>
              <ArrowLeft size={14} /> Dashboard
            </Link>
            <h1 className="text-2xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              Gestión de stock
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
              Los cambios se aplican directamente en la base de datos.
            </p>
          </div>
          <button onClick={load}
            className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest transition-opacity hover:opacity-60 mt-8"
            style={{ color: 'var(--color-text-muted)' }}>
            <RotateCcw size={13} /> Actualizar
          </button>
        </div>

        {/* Buscador */}
        <input
          type="text"
          placeholder="Buscar producto o talle..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-3 py-2.5 text-sm border rounded-sm outline-none mb-6"
          style={{
            background:  'var(--color-bg-card)',
            borderColor: 'var(--color-border)',
            color:       'var(--color-text-primary)',
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
          onBlur={e  => (e.target.style.borderColor = 'var(--color-border)')}
        />

        {/* Tabla */}
        {loading ? (
          <div className="flex flex-col gap-2 animate-pulse">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-14 rounded-sm" style={{ background: 'var(--color-bg-secondary)' }} />
            ))}
          </div>
        ) : (
          <div className="rounded-sm border overflow-hidden" style={{ borderColor: 'var(--color-border)' }}>

            {/* Cabecera */}
            <div className="grid grid-cols-12 px-4 py-3 text-xs font-semibold uppercase tracking-widest border-b"
              style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
              <span className="col-span-5">Producto</span>
              <span className="col-span-2 text-center">Talle</span>
              <span className="col-span-2 text-center">Stock</span>
              <span className="col-span-3 text-center">Ajustar</span>
            </div>

            {filtered.length === 0 && (
              <p className="text-sm text-center py-10" style={{ color: 'var(--color-text-muted)' }}>
                Sin resultados
              </p>
            )}

            {filtered.map((v, i) => {
              const isSaving = saving === v.variantId
              const isLast   = i === filtered.length - 1
              return (
                <div
                  key={v.variantId}
                  className={`grid grid-cols-12 items-center px-4 py-3 ${!isLast ? 'border-b' : ''}`}
                  style={{ borderColor: 'var(--color-border)', background: i % 2 === 0 ? 'var(--color-bg-primary)' : 'var(--color-bg-card)' }}
                >
                  <span className="col-span-5 text-sm font-medium truncate"
                    style={{ color: 'var(--color-text-primary)' }}>
                    {v.productName}
                  </span>

                  <span className="col-span-2 text-center text-xs font-medium"
                    style={{ color: 'var(--color-text-secondary)' }}>
                    {v.size}{v.color ? ` · ${v.color}` : ''}
                  </span>

                  {/* Stock editable */}
                  <div className="col-span-2 flex justify-center">
                    <input
                      type="number"
                      min={0}
                      value={v.stock}
                      disabled={isSaving}
                      onChange={e => handleInputChange(v.variantId, e.target.value)}
                      className="w-14 text-center text-sm font-semibold border rounded-sm py-1 outline-none"
                      style={{
                        color:       stockColor(v.stock),
                        borderColor: 'var(--color-border)',
                        background:  'transparent',
                        opacity:     isSaving ? 0.5 : 1,
                      }}
                    />
                  </div>

                  {/* Botones +/- */}
                  <div className="col-span-3 flex justify-center items-center gap-2">
                    <button
                      disabled={isSaving || v.stock === 0}
                      onClick={() => handleUpdate(v.variantId, v.stock, -1)}
                      className="w-7 h-7 flex items-center justify-center border rounded-sm transition-colors hover:bg-[var(--color-bg-secondary)]"
                      style={{ borderColor: 'var(--color-border)', opacity: (isSaving || v.stock === 0) ? 0.3 : 1 }}
                    >
                      <Minus size={12} />
                    </button>
                    <button
                      disabled={isSaving}
                      onClick={() => handleUpdate(v.variantId, v.stock, 1)}
                      className="w-7 h-7 flex items-center justify-center border rounded-sm transition-colors hover:bg-[var(--color-bg-secondary)]"
                      style={{ borderColor: 'var(--color-border)', opacity: isSaving ? 0.3 : 1 }}
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Leyenda */}
        <div className="flex gap-6 mt-6">
          {[
            { color: 'var(--color-accent-teal)', label: 'Stock OK' },
            { color: 'var(--color-warning)',     label: '3 o menos' },
            { color: 'var(--color-error)',       label: 'Sin stock' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: color }} />
              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{label}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
