import { useCallback, useEffect, useState } from 'react'
import { METADATA_ROLE } from '@platyplus/rxdb-hasura'
import { useHbp } from './provider'

export const useAuthenticated = () => {
  const hbp = useHbp()
  const [authenticated, setAuthenticated] = useState(hbp.auth.isAuthenticated())

  hbp.auth.onAuthStateChanged((isAuth) => {
    setAuthenticated(isAuth)
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
      : roles.filter((role) => ![METADATA_ROLE, 'admin'].includes(role))
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

export const useUserIsAdmin = () => useUserHasRole('admin')
