import turfArea from '@turf/area'
import bbox from '@turf/bbox'
import { Feature, FeatureCollection, Geometry } from '@turf/helpers'

// * See: https://wiki.openstreetmap.org/wiki/Zoom_levels
const metersPerPixelOnEquator = [
  156412,
  78206,
  39103,
  19551,
  9776,
  4888,
  2444,
  1222,
  610.984,
  305.492,
  152.746,
  76.373,
  38.187,
  19.093,
  9.547,
  4.773,
  2.387,
  1.193,
  0.596,
  0.298,
  0.149,
]

/**
 * Returns an estimation of the number of tiles for the given geojson
 * @param geojson
 * @param minZoom
 * @param maxZoom
 */
export const nbTilesEstimation = (
  geojson: GeoJSON.GeoJSON,
  minZoom?: number,
  maxZoom?: number
): number => {
  if (!minZoom || !maxZoom) return 0
  try {
    const [, , , maxY] = bbox(geojson)
    const metersSquare = turfArea(
      geojson as Feature<unknown> | FeatureCollection<unknown> | Geometry
    )
    let nbTiles = 0
    for (let zoom = minZoom; zoom <= maxZoom; zoom++) {
      nbTiles += metersSquare / Math.pow(256 * metersPerPixelOnEquator[zoom], 2)
    }
    // ? Not sure Math.abs(Math.cos(maxY)) reflects the ratio of tile area depending on the latitude
    return Math.floor(nbTiles / Math.abs(Math.cos(maxY)))
  } catch {
    return 0
  }
}
