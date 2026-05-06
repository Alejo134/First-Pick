import { useState, useEffect } from 'react'
import { getProducts, getProductsByCategory } from '@/services/supabase/products'
import { type Product } from '@/types'

export function useProducts(category?: string) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    const fetch = category ? getProductsByCategory(category) : getProducts()

    fetch
      .then(setProducts)
      .catch(() => setError('No se pudieron cargar los productos.'))
      .finally(() => setLoading(false))
  }, [category])

  return { products, loading, error }
}
