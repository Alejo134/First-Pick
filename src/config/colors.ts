// Espejo en TS de las CSS vars — útil para pasarle colores a Konva y canvas
export const colors = {
  bg: {
    primary:   '#F0EBE0',
    secondary: '#E5DDD0',
    card:      '#FDFAF5',
    dark:      '#1C1C2A',
  },
  text: {
    primary:   '#1C1C2A',
    secondary: '#5C5248',
    muted:     '#8A7F72',
    inverse:   '#F0EBE0',
  },
  accent: {
    rust:    '#C4622D',
    hover:   '#A84E22',
    teal:    '#2D7A6B',
    amber:   '#E8922A',
    muted:   '#C4622D22',
  },
  border: {
    default: '#D4C9B8',
    subtle:  '#EAE4D8',
  },
} as const
