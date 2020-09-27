import gql from 'graphql-tag'

import { hasuraClient } from '../utils'

const TILE_SET_PROGRESS = gql`
  mutation updateTileSetProgres($id: uuid!, $progress: Float!) {
    updateTileSet(pk_columns: { id: $id }, _set: { progress: $progress }) {
      id
    }
  }
`
const TILE_SET_COMPLETE = gql`
  mutation completeTileSetProgres($id: uuid!, $size: Int!) {
    updateTileSet(
      pk_columns: { id: $id }
      _set: { progress: 1.0, size: $size }
    ) {
      id
    }
  }
`

export const updateTileProgress = async (
  id: string,
  progress: number
): Promise<void> => {
  await hasuraClient.request(TILE_SET_PROGRESS, { id, progress })
}

export const completeTileProgress = async (
  id: string,
  size: number
): Promise<void> => {
  await hasuraClient.request(TILE_SET_COMPLETE, { id, size })
}
