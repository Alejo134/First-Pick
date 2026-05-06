// Capa de abstracción de pagos.
// Hoy simula el proceso — cuando llegue MercadoPago se reemplaza solo este archivo.

export interface PaymentPayload {
  orderId: string
  amount:  number
  email:   string
}

export interface PaymentResult {
  ok:      boolean
  message?: string
}

export async function processPayment(_payload: PaymentPayload): Promise<PaymentResult> {
  // Simula latencia de red + procesamiento
  await new Promise(resolve => setTimeout(resolve, 2500))

  // En producción: llamada a la API de MercadoPago
  return { ok: true }
}
