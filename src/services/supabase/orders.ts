import { supabase } from './client'
import { type CartItem } from '@/types'

interface PurchasePayload {
  items: CartItem[]
  userId?: string
  guestEmail?: string
}

interface PurchaseResult {
  ok: boolean
  orderId?: string
  message?: string
}

export async function createOrder(payload: PurchasePayload): Promise<PurchaseResult> {
  const { items, userId, guestEmail } = payload

  const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0)

  // 1. Descuenta stock de forma atómica en la DB.
  //    Si hay race condition, la DB rechaza la segunda compra.
  const { data: stockResult, error: stockError } = await supabase.rpc('purchase_items', {
    items: items.map(i => ({ variant_id: i.variantId, quantity: i.quantity })),
  })

  if (stockError || !stockResult?.ok) {
    return {
      ok: false,
      message: stockResult?.message ?? 'No se pudo reservar el stock. Intentá de nuevo.',
    }
  }

  // 2. Crea la orden
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({ user_id: userId ?? null, guest_email: guestEmail ?? null, total, status: 'pending' })
    .select('id')
    .single()

  if (orderError || !order) {
    return { ok: false, message: 'Error al crear la orden.' }
  }

  // 3. Inserta los items de la orden
  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(
      items.map(i => ({
        order_id:   order.id,
        variant_id: i.variantId,
        quantity:   i.quantity,
        unit_price: i.price,
      }))
    )

  if (itemsError) {
    return { ok: false, message: 'Error al registrar los productos de la orden.' }
  }

  return { ok: true, orderId: order.id }
}
