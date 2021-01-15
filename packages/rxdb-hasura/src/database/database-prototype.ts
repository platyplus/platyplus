import { Database } from '../types'
import { authStatus, hasura, jwt, ready } from './observables'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
export const RxDatabase = (proto: any) => {
  Object.defineProperty(proto, 'hasura$', {
    get: function (this: Database) {
      return hasura
    }
  })

  Object.defineProperty(proto, 'ready$', {
    get: function (this: Database) {
      return ready
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
    this.jwt$.next(value)
  }

  Object.defineProperty(proto, 'jwt$', {
    get: function (this: Database) {
      return jwt
    }
  })

  Object.defineProperty(proto, 'hasura', {
    get: function (this: Database) {
      return hasura.getValue()
    }
  })
}
