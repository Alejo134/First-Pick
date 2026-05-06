import { useState, useEffect } from 'react'
import { getProductById } from '@/services/supabase/products'
import { type Product } from '@/types'

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    getProductById(id)
      .then((data) => {
        if (!data) setError('Producto no encontrado.')
        else setProduct(data)
      })
      .catch(() => setError('No se pudo cargar el producto.'))
      .finally(() => setLoading(false))
  }, [id])

  return { product, loading, error }
}
