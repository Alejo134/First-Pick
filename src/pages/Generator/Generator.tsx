import { useState, useRef } from 'react'
import { Stage, Layer, Image as KonvaImage, Circle, Text } from 'react-konva'
import useImage from 'use-image'
import { calculatePythagorean, type PithagoreanResult } from '@/utils/pitagorico'

const CANVAS_SIZE = 600
const CENTER = CANVAS_SIZE / 2
const CORE_SIZE = 160
const SATELLITE_SIZE = 60
const ORBIT_RADIUS = 210

function KonvaImg({ src, x, y, size }: { src: string; x: number; y: number; size: number }) {
  const [img] = useImage(src)
  return <KonvaImage image={img} x={x} y={y} width={size} height={size} offsetX={size / 2} offsetY={size / 2} />
}

function Placeholder({ x, y, size, label }: { x: number; y: number; size: number; label: string }) {
  return (
    <>
      <Circle x={x} y={y} radius={size / 2} fill="#222" stroke="#555" strokeWidth={1} />
      <Text x={x - size / 2} y={y - 10} width={size} text={label} fontSize={size > 80 ? 32 : 14} fontStyle="bold" fill="#c9a84c" align="center" />
    </>
  )
}

function satellitePosition(index: number, total: number) {
  const angle = (2 * Math.PI * index) / total - Math.PI / 2
  return {
    x: CENTER + ORBIT_RADIUS * Math.cos(angle),
    y: CENTER + ORBIT_RADIUS * Math.sin(angle),
  }
}

export default function Generator() {
  const [text, setText] = useState('')
  const [result, setResult] = useState<PithagoreanResult | null>(null)
  const stageRef = useRef<any>(null)

  const handleCalculate = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    setResult(calculatePythagorean(trimmed))
  }

  const handleDownload = () => {
    if (!stageRef.current) return
    const uri = stageRef.current.toDataURL({ pixelRatio: 2 })
    const link = document.createElement('a')
    link.download = `${text.trim() || 'resultado'}_pitagorico.png`
    link.href = uri
    link.click()
  }

  return (
    <div className="min-h-screen bg-[#0d0d1a] flex flex-col items-center justify-center gap-8 py-16 px-4">
      <h1 className="text-3xl font-bold tracking-widest text-[#c9a84c] uppercase">
        Generador Pitagórico
      </h1>

      <div className="flex gap-3 w-full max-w-lg">
        <input
          type="text"
          maxLength={50}
          placeholder="Escribí una palabra o frase..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
          className="flex-1 bg-[#1a1a2e] text-white border-2 border-gray-700 focus:border-[#c9a84c] rounded-lg px-4 py-3 outline-none transition-colors"
        />
        <button
          onClick={handleCalculate}
          className="bg-[#c9a84c] text-[#0d0d1a] font-semibold px-6 py-3 rounded-lg hover:bg-[#e0bf6a] transition-colors"
        >
          Generar
        </button>
      </div>

      {result && (
        <>
          <div className="flex gap-6 text-sm text-gray-400 flex-wrap justify-center">
            <span>Dígitos: <strong className="text-[#c9a84c]">{result.values.join(' + ')}</strong></span>
            <span>Suma: <strong className="text-[#c9a84c]">{result.sum}</strong></span>
            <span>Núcleo: <strong className="text-[#c9a84c]">{result.core}</strong></span>
          </div>

          <div className="rounded-xl overflow-hidden border-2 border-gray-800">
            <Stage width={CANVAS_SIZE} height={CANVAS_SIZE} ref={stageRef} style={{ background: '#0d0d1a' }}>
              <Layer>
                <Placeholder x={CENTER} y={CENTER} size={CORE_SIZE} label={String(result.core)} />
                <KonvaImg src={`/assets/nucleo/${result.core}.svg`} x={CENTER} y={CENTER} size={CORE_SIZE} />

                {result.letters.map((letter, i) => {
                  const pos = satellitePosition(i, result.letters.length)
                  return (
                    <KonvaImg key={`${letter}-${i}`} src={`/assets/satelite/${letter}.svg`} x={pos.x} y={pos.y} size={SATELLITE_SIZE} />
                  )
                })}
              </Layer>
            </Stage>
          </div>

          <button
            onClick={handleDownload}
            className="border-2 border-[#c9a84c] text-[#c9a84c] px-8 py-2 rounded-lg hover:bg-[#c9a84c] hover:text-[#0d0d1a] transition-colors font-medium"
          >
            ⬇ Descargar imagen
          </button>
        </>
      )}
    </div>
  )
}
