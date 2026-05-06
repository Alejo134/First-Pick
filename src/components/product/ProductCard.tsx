import { Link } from 'react-router-dom'
import { type Product } from '@/types'

// Colores de placeholder por categoría
const categoryColors: Record<string, string> = {
  remeras:    '#D4B8A8',
  buzos:      '#B8A898',
  pantalones: '#A89880',
  camperas:   '#C4A882',
  shorts:     '#D4C4A8',
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(price)
}

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const sizes = product.variants.map(v => v.size)
  const placeholder = categoryColors[product.category] ?? '#D4C9B8'

  return (
    <Link to={`/producto/${product.id}`} className="group flex flex-col gap-3">
      {/* Imagen */}
      <div
        className="w-full aspect-[3/4] rounded-sm overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]"
        style={{ background: placeholder }}
      >
        {product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-end p-4">
            <span className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--color-text-secondary)' }}>
              {product.category}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-medium leading-snug" style={{ color: 'var(--color-text-primary)' }}>
            {product.name}
          </h3>
          <span className="text-sm font-semibold shrink-0" style={{ color: 'var(--color-accent)' }}>
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Talles disponibles */}
        <div className="flex gap-1.5 flex-wrap">
          {sizes.map(size => (
            <span
              key={size}
              className="text-[10px] font-medium uppercase px-1.5 py-0.5 border rounded-sm"
              style={{
                color: 'var(--color-text-muted)',
                borderColor: 'var(--color-border)',
              }}
            >
              {size}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
