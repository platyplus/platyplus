export = mapbox__mbtiles

declare class mapbox__mbtiles {
  constructor(
    uri: string,
    callback?: (err: Error, mbtiles: mapbox__mbtiles) => void
  )

  close(callback: unknown): void

  createZXYStream(options: unknown): unknown

  geocoderCentroid(id: unknown, zxy: number, callback: unknown): unknown

  geocoderDataIterator(type: unknown): unknown

  geocoderMigrateDocs(rows: unknown, callback: unknown): unknown

  getGeocoderData(type: unknown, shard: unknown, callback: unknown): unknown

  getGrid(z: number, x: number, y: number, callback: unknown): unknown

  getIndexableDocs(pointer: unknown, callback: unknown): unknown

  getInfo(callback: unknown): unknown

  getTile(
    z: number,
    x: number,
    y: number,
    callback: (err: Error, data: Buffer) => void
  ): unknown

  putGeocoderData(
    type: unknown,
    shard: unknown,
    data: unknown,
    callback: unknown
  ): unknown

  putGrid(
    z: number,
    x: number,
    y: number,
    data: unknown,
    callback: unknown
  ): unknown

  putInfo(data: unknown, callback: unknown): unknown

  putTile(
    z: number,
    x: number,
    y: number,
    data: unknown,
    callback: unknown
  ): unknown

  startWriting(callback: unknown): unknown

  stopWriting(callback: unknown): unknown

  write(table: unknown, id: unknown, row: unknown, callback: unknown): unknown

  static findID(filepath: unknown, id: unknown, callback: unknown): unknown

  static list(filepath: unknown, callback: unknown): unknown

  static registerProtocols(tilelive: unknown): void

  static schema: string
}
