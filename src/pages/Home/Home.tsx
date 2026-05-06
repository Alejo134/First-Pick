import { useState } from 'react'
import ProductCard from '@/components/product/ProductCard'
import { useProducts } from '@/hooks/useProducts'

const categories = ['Todos', 'Remeras', 'Buzos', 'Pantalones', 'Camperas', 'Shorts']

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined)
  const { products, loading, error } = useProducts(activeCategory)

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg-primary)' }}>

      {/* ── Hero ── */}
      <section className="px-4 md:px-8 pt-8 md:pt-20 pb-12 md:pb-16 max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.3em] mb-4" style={{ color: 'var(--color-accent)' }}>
          Nueva colección
        </p>
        <h1
          className="text-5xl md:text-7xl leading-none mb-4 md:mb-6"
          style={{ fontFamily: 'var(--font-brand)', color: 'var(--color-text-primary)' }}
        >
          First<br />Pick
        </h1>
        <p className="text-sm md:text-base max-w-xs" style={{ color: 'var(--color-text-muted)' }}>
          Prendas de edición limitada. Stock reducido, calidad sin compromisos.
        </p>
      </section>

      <div className="w-full h-px" style={{ background: 'var(--color-border)' }} />

      {/* ── Filtros ── */}
      <section className="px-4 md:px-8 py-5 flex gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {categories.map((cat) => {
          const value = cat === 'Todos' ? undefined : cat.toLowerCase()
          const isActive = activeCategory === value
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(value)}
              className="text-xs font-medium uppercase tracking-widest whitespace-nowrap pb-1 transition-colors duration-200"
              style={{
                color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
                borderBottom: isActive ? '1px solid var(--color-accent)' : '1px solid transparent',
              }}
            >
              {cat}
            </button>
          )
        })}
      </section>

      {/* ── Contenido ── */}
      <section className="px-4 md:px-8 pb-20">

        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 md:gap-x-6 gap-y-10 md:gap-y-12">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-3 animate-pulse">
                <div className="w-full aspect-[3/4] rounded-sm" style={{ background: 'var(--color-bg-secondary)' }} />
                <div className="h-3 w-2/3 rounded" style={{ background: 'var(--color-bg-secondary)' }} />
                <div className="h-3 w-1/3 rounded" style={{ background: 'var(--color-bg-secondary)' }} />
              </div>
            ))}
          </div>
        )}

        {error && (
          <p className="text-sm" style={{ color: 'var(--color-error)' }}>{error}</p>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            No hay productos disponibles en esta categoría.
          </p>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 md:gap-x-6 gap-y-10 md:gap-y-12">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </section>
    </div>
  )
}
