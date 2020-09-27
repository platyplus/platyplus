import { MutationRoot } from '@platyplus/tilehuria-schema'
import gql from 'graphql-tag'

import { MAX_ZOOM, MIN_ZOOM } from '../config'
import { geojsonToTiles, hasuraClient } from '../utils'
import { loadTileSet } from './load-tile-set'

export const updateAoiTiles = async ({
  id,
  source,
  minZoom = MIN_ZOOM,
  maxZoom = MAX_ZOOM
}: {
  id: string
  source: GeoJSON.GeoJSON
  minZoom: number
  maxZoom: number
}): Promise<void> => {
  console.log(` [*] Generating tiles of the area of interest ${id}...`)
  if (!source) return
  const xyzCoordinates = geojsonToTiles(source, minZoom, maxZoom)

  const mutation = gql`
    mutation update_aoi_coordinates($id: uuid!, $xyzCoordinates: jsonb!) {
      updateAreaOfInterest(
        pk_columns: { id: $id }
        _set: { xyzCoordinates: $xyzCoordinates }
      ) {
        name
        userId
        tileSets {
          id
          format
          quality
          tileProvider {
            url
            slug
          }
        }
      }
    }
  `
  console.log(' [*] Saving the tiles in the database...')
  const { updateAreaOfInterest: result } = await hasuraClient.request<
    MutationRoot
  >(mutation, {
    id,
    xyzCoordinates
  })

  // * Update the tileset of the area of interest, if they exist
  if (result?.tileSets?.length) {
    console.log(` [*] ${result.tileSets.length} tileset(s) will now be updated`)
    const { name, userId } = result
    for (const tileSet of result.tileSets) {
      const {
        id,
        format,
        quality,
        tileProvider: { url, slug }
      } = tileSet
      const message = {
        id,
        name,
        userId: userId as string,
        format: (format === 'jpg' ? 'jpg' : 'png') as 'png' | 'jpg',
        quality: (quality || 100) as number,
        url,
        slug,
        xyzCoordinates
      }
      await loadTileSet(message)
    }
    console.log(' [*] Tileset(s) or the area of interest updated')
  }
  console.log(" [*] Done updating the Area of Interest's tiles")
}
