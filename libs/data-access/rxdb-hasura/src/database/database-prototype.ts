import { Database, DatabasePrototype } from '../types'
import { contents } from './observables'

type Prototype = {
  -readonly [K in keyof DatabasePrototype]: DatabasePrototype[K]
}

export const RxDatabase = (proto: Prototype) => {
  Object.defineProperty(proto, 'contents$', {
    get: function (this: Database) {
      return contents
    }
  })

  Object.defineProperty(proto, 'contents', {
    get: function (this: Database) {
      return contents.getValue()
    }
  })
}
