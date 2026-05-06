import { supabase } from './client'
import { type Product, type Variant } from '@/types'

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*, variants(*)')
    .eq('active', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Product[]
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*, variants(*)')
    .eq('id', id)
    .eq('active', true)
    .single()

  if (error) return null
  return data as Product
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*, variants(*)')
    .eq('active', true)
    .eq('category', category)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Product[]
}
