export default function CheckoutProcessing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6"
      style={{ background: 'var(--color-bg-primary)' }}>

      {/* Spinner */}
      <div
        className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: 'var(--color-border)', borderTopColor: 'var(--color-accent)' }}
      />

      <div className="text-center">
        <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
          Procesando tu compra
        </p>
        <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
          No cerrés esta ventana
        </p>
      </div>
    </div>
  )
}
