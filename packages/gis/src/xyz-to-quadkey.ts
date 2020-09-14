export const xyzToQuadKey = ([x, y, z]: number[]) => {
  // TODO tester
  var quadKey = []
  for (var i = z; i > 0; i--) {
    let digit = 0
    var mask = 1 << (i - 1)
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
