const DICTIONARY: Record<string, number> = {
  A:1, B:2, C:3, D:4, E:5, F:6, G:7, H:8, I:9,
  J:1, K:2, L:3, M:4, N:5, O:6, P:7, Q:8, R:9,
  S:1, T:2, U:3, V:4, W:5, X:6, Y:7, Z:8,
}

function reduceToDigit(num: number): number {
  while (num > 9) {
    num = String(num).split('').reduce((acc, d) => acc + parseInt(d), 0)
  }
  return num
}

export interface PithagoreanResult {
  letters: string[]
  values: number[]
  sum: number
  core: number
}

export function calculatePythagorean(text: string): PithagoreanResult {
  const letters: string[] = []
  const values: number[] = []

  for (const char of text.toUpperCase()) {
    const val = DICTIONARY[char]
    if (val !== undefined) {
      letters.push(char)
      values.push(val)
    }
  }

  const sum = values.reduce((acc, v) => acc + v, 0)
  const core = reduceToDigit(sum)

  return { letters, values, sum, core }
}
