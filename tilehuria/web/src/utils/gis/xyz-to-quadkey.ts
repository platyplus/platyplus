// TODO duplicated from workers
export const xyzToQuadKey = ([x, y, z]: number[]): string => {
  // TODO tester
  const quadKey = []
  for (let i = z; i > 0; i--) {
    let digit = 0
    const mask = 1 << (i - 1)
    if ((x & mask) != 0) {
      digit++
    }
    if ((y & mask) != 0) {
      digit += 2
    }
    quadKey.push(digit)
  }
  return quadKey.join('')
}
