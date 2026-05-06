import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

const PUBLIC = join(process.cwd(), 'public', 'assets')

mkdirSync(join(PUBLIC, 'nucleo'), { recursive: true })
mkdirSync(join(PUBLIC, 'satelite'), { recursive: true })

// Colores por número (1-9)
const COLORES_NUCLEO = {
  1: { fondo: '#8B0000', texto: '#FFD700' },
  2: { fondo: '#00008B', texto: '#FFD700' },
  3: { fondo: '#006400', texto: '#FFD700' },
  4: { fondo: '#4B0082', texto: '#FFD700' },
  5: { fondo: '#8B4513', texto: '#FFD700' },
  6: { fondo: '#2F4F4F', texto: '#FFD700' },
  7: { fondo: '#800080', texto: '#FFD700' },
  8: { fondo: '#B8860B', texto: '#FFD700' },
  9: { fondo: '#1C1C1C', texto: '#FFD700' },
}

// Colores satelite por valor pitagórico
const COLORES_SATELITE = {
  1: '#C0392B',
  2: '#2980B9',
  3: '#27AE60',
  4: '#8E44AD',
  5: '#E67E22',
  6: '#16A085',
  7: '#9B59B6',
  8: '#F39C12',
  9: '#2C3E50',
}

// Diccionario pitagórico para saber el color de cada letra
const DICCIONARIO = {
  A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,I:9,
  J:1,K:2,L:3,M:4,N:5,O:6,P:7,Q:8,R:9,
  S:1,T:2,U:3,V:4,W:5,X:6,Y:7,Z:8,
}

// --- Generar SVGs de NÚCLEO (1-9) ---
for (let n = 1; n <= 9; n++) {
  const { fondo, texto } = COLORES_NUCLEO[n]
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
  <defs>
    <radialGradient id="grad" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="${lighten(fondo)}" />
      <stop offset="100%" stop-color="${fondo}" />
    </radialGradient>
  </defs>
  <circle cx="80" cy="80" r="78" fill="url(#grad)" stroke="${texto}" stroke-width="3" />
  <text x="80" y="88" font-family="Georgia, serif" font-size="72" font-weight="bold"
        fill="${texto}" text-anchor="middle" dominant-baseline="middle"
        filter="url(#sombra)">${n}</text>
  <text x="80" y="140" font-family="Arial" font-size="12"
        fill="${texto}99" text-anchor="middle">NÚCLEO</text>
</svg>`
  writeFileSync(join(PUBLIC, 'nucleo', `${n}.svg`), svg, 'utf8')
  console.log(`✓ nucleo/${n}.svg`)
}

// --- Generar SVGs de SATÉLITE (A-Z) ---
const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
for (const letra of letras) {
  const valor = DICCIONARIO[letra]
  const fondo = COLORES_SATELITE[valor]
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
  <defs>
    <radialGradient id="grad" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="${lighten(fondo)}" />
      <stop offset="100%" stop-color="${fondo}" />
    </radialGradient>
  </defs>
  <circle cx="30" cy="30" r="28" fill="url(#grad)" stroke="#ffffff44" stroke-width="1.5" />
  <text x="30" y="34" font-family="Georgia, serif" font-size="26" font-weight="bold"
        fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${letra}</text>
  <text x="30" y="54" font-family="Arial" font-size="8"
        fill="#ffffff88" text-anchor="middle">${valor}</text>
</svg>`
  writeFileSync(join(PUBLIC, 'satelite', `${letra}.svg`), svg, 'utf8')
  console.log(`✓ satelite/${letra}.svg`)
}

// Helper: aclara un color hex
function lighten(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const factor = 1.6
  const rr = Math.min(255, Math.round(r * factor)).toString(16).padStart(2, '0')
  const gg = Math.min(255, Math.round(g * factor)).toString(16).padStart(2, '0')
  const bb = Math.min(255, Math.round(b * factor)).toString(16).padStart(2, '0')
  return `#${rr}${gg}${bb}`
}

console.log('\n✅ 35 placeholders generados en public/assets/')
