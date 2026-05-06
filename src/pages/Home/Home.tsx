import ProductCard from '@/components/product/ProductCard'
import { mockProducts } from '@/data/mockProducts'

const categories = ['Todos', 'Remeras', 'Buzos', 'Pantalones', 'Camperas', 'Shorts']

export default function Home() {
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

      {/* ── Divisor ── */}
      <div className="w-full h-px" style={{ background: 'var(--color-border)' }} />

      {/* ── Filtros ── */}
      <section className="px-4 md:px-8 py-5 flex gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {categories.map((cat, i) => (
          <button
            key={cat}
            className="text-xs font-medium uppercase tracking-widest whitespace-nowrap pb-1 transition-colors duration-200"
            style={{
              color: i === 0 ? 'var(--color-accent)' : 'var(--color-text-muted)',
              borderBottom: i === 0 ? '1px solid var(--color-accent)' : '1px solid transparent',
            }}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* ── Grid de productos ── */}
      <section className="px-4 md:px-8 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 md:gap-x-6 gap-y-10 md:gap-y-12">
          {mockProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

    </div>
  )
}
