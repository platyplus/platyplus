/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export = mapbox__mbtiles

declare class mapbox__mbtiles {
  constructor(uri: string, callback?: (err: Error, mbtiles: any) => void)

  close(callback: any): void

  createZXYStream(options: any): any

  geocoderCentroid(id: any, zxy: number, callback: any): any

  geocoderDataIterator(type: any): any

  geocoderMigrateDocs(rows: any, callback: any): any

  getGeocoderData(type: any, shard: any, callback: any): any

  getGrid(z: number, x: number, y: number, callback: any): any

  getIndexableDocs(pointer: any, callback: any): any

  getInfo(callback: any): any

  getTile(z: number, x: number, y: number, callback: any): any

  putGeocoderData(type: any, shard: any, data: any, callback: any): any

  putGrid(z: number, x: number, y: number, data: any, callback: any): any

  putInfo(data: any, callback: any): any

  putTile(z: number, x: number, y: number, data: any, callback: any): any

  startWriting(callback: any): any

  stopWriting(callback: any): any

  write(table: any, id: any, row: any, callback: any): any

  static findID(filepath: any, id: any, callback: any): any

  static list(filepath: any, callback: any): any

  static registerProtocols(tilelive: any): void

  static schema: string
}
