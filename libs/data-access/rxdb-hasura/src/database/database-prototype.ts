import { Database, DatabasePrototype } from '../types'
import { authStatus, contents, jwt } from './observables'

type Prototype = {
  -readonly [K in keyof DatabasePrototype]: DatabasePrototype[K]
}

export const RxDatabase = (proto: Prototype) => {
  Object.defineProperty(proto, 'contents$', {
    get: function (this: Database) {
      return contents
    }
  })

  Object.defineProperty(proto, 'authStatus$', {
    get: function (this: Database) {
      return authStatus
    }
  })

  proto.setAuthStatus = function (
    this: Database,
    value: boolean,
    jwt?: string
  ) {
    this.authStatus$.next(value)
    this.jwt$.next(jwt)
  }

  proto.setJwt = function (this: Database, value: string) {
    if (value !== this.jwt$.getValue()) this.jwt$.next(value)
  }

  Object.defineProperty(proto, 'jwt$', {
    get: function (this: Database) {
      return jwt
    }
  })

  Object.defineProperty(proto, 'contents', {
    get: function (this: Database) {
      return contents.getValue()
    }
  })
}
