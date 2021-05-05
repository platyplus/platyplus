/** Converts numeric degrees to radians */
// const toRad = (n: number) => (n * Math.PI) / 180
function lng2tile(lon: number, z: number) {
  return Math.floor(((lon + 180) / 360) * Math.pow(2, z))
}
function lat2tile(lat: number, z: number) {
  return Math.floor(
    ((1 -
      Math.log(
        Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)
      ) /
        Math.PI) /
      2) *
      Math.pow(2, z)
  )
}

export const LngLatToXYZ = (
  [lon, lat]: number[],
  zoom: number
): [number, number, number] => {
  //   const sinLat = Math.sin((lat * Math.PI) / 180.0)
  //   const x = Math.floor(((lng + 180) / 360) * 256 * Math.pow(2, zoom))
  //   const y = Math.floor(
  //     (0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) *
  //       256 *
  //       Math.pow(2, zoom)
  //   )
  //   return [x, y]

  //   var x = Math.floor(((lon + 180) / 360) * (1 << zoom))
  //   var y = Math.floor(
  //     ((1 - Math.log(Math.tan(toRad(lat)) + 1 / Math.cos(toRad(lat))) / Math.PI) /
  //       2) *
  //       (1 << zoom)
  //   )
  const x = lng2tile(lon, zoom)
  const y = lat2tile(lat, zoom)
  return [x, y, zoom]
}
