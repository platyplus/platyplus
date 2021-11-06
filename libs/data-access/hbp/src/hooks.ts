import { useCallback, useEffect, useState } from 'react'
import { ADMIN_ROLE, METADATA_ROLE } from '@platyplus/rxdb-hasura'
import { useHbp } from './provider'
import Auth from 'nhost-js-sdk/dist/Auth'

export const isAuthenticated = (auth: Auth) => {
  // TODO won't work for a different kind of storage that could have been defined in nhost SDK
  return auth.isAuthenticated() ?? !!localStorage.getItem('nhostRefreshToken')
}

export const useAuthenticated = () => {
  const hbp = useHbp()

  const [authenticated, setAuthenticated] = useState(isAuthenticated(hbp.auth))

  useEffect(() => {
    const unsubscribe = hbp.auth.onAuthStateChanged((isAuth) => {
      setAuthenticated(isAuth ?? isAuthenticated(hbp.auth))
    })
    return () => unsubscribe()
  })
  return authenticated
}

export const useUserRoles = (all = true) => {
  const hbp = useHbp()
  const getRolesClaim = useCallback(() => {
    const roles = (hbp.auth.getClaim('x-hasura-allowed-roles') ||
      []) as string[]
    return all
      ? roles
      : roles.filter((role) => ![METADATA_ROLE, ADMIN_ROLE].includes(role))
  }, [hbp, all])
  const [roles, setRoles] = useState(getRolesClaim())
  useEffect(() => {
    const unsubscribe = hbp.auth.onTokenChanged(() => {
      setRoles(getRolesClaim())
    })
    return () => unsubscribe()
  }, [hbp, getRolesClaim])
  return roles
}

export const useUserHasRole = (role: string) => {
  const roles = useUserRoles()
  return roles.includes(role)
}

export const useUserIsAdmin = () => useUserHasRole(ADMIN_ROLE)
