import bbox from '@turf/bbox'
import squareGrid from '@turf/square-grid'
import { GeoJSON } from 'geojson'

import { LngLatToXYZ } from './lng-lat-zoom-to-xyz'
import { tileWidth } from './tile-width'

export const geojsonToTiles = (geojson: GeoJSON, minZoom = 1, maxZoom = 20) => {
  const doneTiles: string[] = []
  const walkTiles = (geojson: GeoJSON, tiles: number[][] = []) => {
    if (geojson.type === 'FeatureCollection') {
      for (const feature of geojson.features) {
        walkTiles(feature, tiles)
      }
    } else if (geojson.type === 'Feature') {
      walkTiles(geojson.geometry, tiles)
    } else if (geojson.type === 'GeometryCollection') {
      for (const geometry of geojson.geometries) {
        walkTiles(geometry, tiles)
      }
    } else {
      let nbTilesForZoom: number
      let zoom = maxZoom
      do {
        nbTilesForZoom = 0
        const mask =
          geojson.type === 'MultiPolygon' || geojson.type === 'Polygon'
            ? geojson
            : undefined

        const cellSize = tileWidth(zoom)
        const extent = bbox(geojson)
        const grid = squareGrid(extent, cellSize, {
          mask,
          units: 'degrees',
        })
        grid.features.forEach((feature) => {
          feature?.geometry?.coordinates?.[0]?.forEach((corner) => {
            const done = `${zoom}/${corner[0]}/${corner[1]}`
            if (!doneTiles.includes(done)) {
              const [x, y, z] = LngLatToXYZ([corner[0], corner[1]], zoom)
              tiles.push([x, y, z])
              nbTilesForZoom++
              doneTiles.push(done)
            }
          })
        })
        console.log(` [*] Found ${nbTilesForZoom} tiles for zoom ${zoom}`)
        zoom--
      } while (nbTilesForZoom > 0 && zoom > minZoom)
    }
  }
  // * Generate the tiles list
  console.log(' [*] Calculating tiles coordinates...')
  const tiles: number[][] = []
  if (geojson) walkTiles(geojson, tiles)
  console.log(` [*] Found ${tiles.length} tiles.`)
  return tiles
}
