import { supabase } from './client'

export interface DashboardMetrics {
  totalOrders:    number
  totalRevenue:   number
  totalProducts:  number
  lowStockCount:  number
}

export interface StockVariant {
  variantId:   string
  productId:   string
  productName: string
  size:        string
  color:       string | null
  stock:       number
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const [orders, products, lowStock] = await Promise.all([
    supabase.from('orders').select('total', { count: 'exact' }),
    supabase.from('products').select('id', { count: 'exact' }).eq('active', true),
    supabase.from('variants').select('id', { count: 'exact' }).lte('stock', 3).gt('stock', 0),
  ])

  const totalRevenue = (orders.data ?? []).reduce((acc, o) => acc + Number(o.total), 0)

  return {
    totalOrders:   orders.count   ?? 0,
    totalRevenue,
    totalProducts: products.count ?? 0,
    lowStockCount: lowStock.count ?? 0,
  }
}

export async function getAllStock(): Promise<StockVariant[]> {
  const { data, error } = await supabase
    .from('variants')
    .select('id, size, color, stock, product_id, products(name)')
    .order('stock', { ascending: true })

  if (error || !data) return []

  return data.map((v: any) => ({
    variantId:   v.id,
    productId:   v.product_id,
    productName: v.products?.name ?? '—',
    size:        v.size,
    color:       v.color ?? null,
    stock:       v.stock,
  }))
}

export async function updateStock(variantId: string, newStock: number): Promise<boolean> {
  const { error } = await supabase
    .from('variants')
    .update({ stock: newStock })
    .eq('id', variantId)

  return !error
}
