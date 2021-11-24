import { useEffect, useState } from 'react'
import { ADMIN_ROLE, METADATA_ROLE } from '@platyplus/rxdb-hasura'
import { useHbp } from './provider'
import Auth from 'nhost-js-sdk/dist/Auth'
import { LOCAL_STORAGE_ROLES_KEY } from './config'
export const isAuthenticated = (auth: Auth) => {
  // TODO won't work for a different kind of storage that could have been defined in nhost SDK
  return auth.isAuthenticated() ?? !!localStorage.getItem('nhostRefreshToken')
}

export const getRoles = (all = true): string[] => {
  const storedRoles = localStorage.getItem(LOCAL_STORAGE_ROLES_KEY)
  const allRoles = storedRoles ? JSON.parse(storedRoles) : []
  return all
    ? allRoles
    : allRoles.filter(
        (role: string) => ![METADATA_ROLE, ADMIN_ROLE].includes(role)
      )
}

export const setRoles = (auth: Auth) => {
  const claimRoles = auth.getClaim('x-hasura-allowed-roles')
  if (claimRoles) {
    localStorage.setItem(LOCAL_STORAGE_ROLES_KEY, JSON.stringify(claimRoles))
  }
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
  const [roles, setRoles] = useState(getRoles(all))
  useEffect(() => {
    const unsubscribe = hbp.auth.onTokenChanged(() => {
      setRoles(getRoles(all))
    })
    return () => unsubscribe()
  }, [hbp, all])
  return roles
}

export const useUserHasRole = (role: string) => {
  const roles = useUserRoles()
  return roles.includes(role)
}

export const useUserIsAdmin = () => useUserHasRole(ADMIN_ROLE)

export const useLogout = () => {
  const hbp = useHbp()
  return async () => {
    await hbp.auth.logout()
    localStorage.removeItem(LOCAL_STORAGE_ROLES_KEY)
  }
}
