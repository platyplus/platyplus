import {
  InsertOneTileSetDocument,
  UpdateOneTileSetDocument
} from '@platyplus/tilehuria-schema'

export const tile_set = {
  insert: InsertOneTileSetDocument,
  update: UpdateOneTileSetDocument,
  defaults: {
    quality: 100,
    format: 'png'
  }
}
