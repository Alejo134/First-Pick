import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ShoppingCart, ArrowLeft } from 'lucide-react'
import { useProduct } from '@/hooks/useProduct'
import { useCartStore } from '@/store/cartStore'
import { type Variant } from '@/types'

const categoryColors: Record<string, string> = {
  remeras:    '#D4B8A8',
  buzos:      '#B8A898',
  pantalones: '#A89880',
  camperas:   '#C4A882',
  shorts:     '#D4C4A8',
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency', currency: 'ARS', maximumFractionDigits: 0,
  }).format(price)
}

export default function Product() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { product, loading, error } = useProduct(id ?? '')
  const addToCart = useCartStore(s => s.add)

  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null)
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return
    addToCart({
      variantId:  selectedVariant.id,
      productId:  product.id,
      name:       product.name,
      price:      product.price,
      size:       selectedVariant.size,
      color:      selectedVariant.color,
      image:      product.images[0] ?? '',
      quantity:   1,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) return <ProductSkeleton />

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ background: 'var(--color-bg-primary)' }}>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          {error ?? 'Producto no encontrado.'}
        </p>
        <button onClick={() => navigate('/')}
          className="text-xs uppercase tracking-widest font-medium"
          style={{ color: 'var(--color-accent)' }}>
          Volver a la tienda
        </button>
      </div>
    )
  }

  const placeholder = categoryColors[product.category] ?? '#D4C9B8'
  const outOfStock = selectedVariant ? selectedVariant.stock === 0 : false

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg-primary)' }}>
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-14">

        {/* Volver */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest mb-10 transition-colors"
          style={{ color: 'var(--color-text-muted)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text-primary)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
        >
          <ArrowLeft size={14} />
          Volver
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">

          {/* ── Imagen ── */}
          <div
            className="w-full aspect-[3/4] rounded-sm flex items-end p-6"
            style={{ background: placeholder }}
          >
            {product.images[0]
              ? <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover absolute inset-0" />
              : <span className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--color-text-secondary)' }}>
                  {product.category}
                </span>
            }
          </div>

          {/* ── Info ── */}
          <div className="flex flex-col justify-center gap-8">

            {/* Categoría + nombre */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-[0.25em]"
                style={{ color: 'var(--color-accent)' }}>
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-semibold leading-tight"
                style={{ color: 'var(--color-text-primary)' }}>
                {product.name}
              </h1>
              <p className="text-2xl font-medium" style={{ color: 'var(--color-accent)' }}>
                {formatPrice(product.price)}
              </p>
            </div>

            {/* Descripción */}
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              {product.description}
            </p>

            {/* Selector de talle */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-medium uppercase tracking-widest"
                style={{ color: 'var(--color-text-muted)' }}>
                Talle {selectedVariant ? `— ${selectedVariant.size}` : ''}
              </span>
              <div className="flex gap-2 flex-wrap">
                {product.variants.map(variant => {
                  const isSelected = selectedVariant?.id === variant.id
                  const noStock = variant.stock === 0
                  return (
                    <button
                      key={variant.id}
                      disabled={noStock}
                      onClick={() => setSelectedVariant(variant)}
                      className="w-11 h-11 text-sm font-medium border rounded-sm transition-all duration-150"
                      style={{
                        background:   isSelected ? 'var(--color-text-primary)' : 'transparent',
                        color:        isSelected ? 'var(--color-bg-primary)' : noStock ? 'var(--color-border)' : 'var(--color-text-primary)',
                        borderColor:  isSelected ? 'var(--color-text-primary)' : noStock ? 'var(--color-border)' : 'var(--color-border)',
                        textDecoration: noStock ? 'line-through' : 'none',
                        cursor:       noStock ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {variant.size}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Stock bajo */}
            {selectedVariant && selectedVariant.stock > 0 && selectedVariant.stock <= 3 && (
              <p className="text-xs font-medium" style={{ color: 'var(--color-warning)' }}>
                ¡Solo quedan {selectedVariant.stock} unidades!
              </p>
            )}

            {/* Botón agregar */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedVariant || outOfStock}
              className="flex items-center justify-center gap-3 w-full py-4 text-sm font-semibold uppercase tracking-widest rounded-sm transition-all duration-200"
              style={{
                background:  added ? 'var(--color-accent-teal)' : (!selectedVariant || outOfStock) ? 'var(--color-border)' : 'var(--color-text-primary)',
                color:       (!selectedVariant || outOfStock) ? 'var(--color-text-muted)' : 'var(--color-bg-primary)',
                cursor:      (!selectedVariant || outOfStock) ? 'not-allowed' : 'pointer',
              }}
            >
              <ShoppingCart size={16} />
              {added ? '¡Agregado!' : outOfStock ? 'Sin stock' : !selectedVariant ? 'Seleccioná un talle' : 'Agregar al carrito'}
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}

function ProductSkeleton() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg-primary)' }}>
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 animate-pulse">
          <div className="w-full aspect-[3/4] rounded-sm" style={{ background: 'var(--color-bg-secondary)' }} />
          <div className="flex flex-col gap-6 justify-center">
            <div className="h-3 w-1/4 rounded" style={{ background: 'var(--color-bg-secondary)' }} />
            <div className="h-8 w-3/4 rounded" style={{ background: 'var(--color-bg-secondary)' }} />
            <div className="h-6 w-1/3 rounded" style={{ background: 'var(--color-bg-secondary)' }} />
            <div className="h-16 w-full rounded" style={{ background: 'var(--color-bg-secondary)' }} />
            <div className="flex gap-2">
              {[1,2,3,4].map(i => <div key={i} className="w-11 h-11 rounded-sm" style={{ background: 'var(--color-bg-secondary)' }} />)}
            </div>
            <div className="h-14 w-full rounded-sm" style={{ background: 'var(--color-bg-secondary)' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
