import { useCallback, useEffect, useState } from 'react'
import { useHbp } from './provider'

export const useAuthenticated = () => {
  const hbp = useHbp()
  const [authenticated, setAuthenticated] = useState(hbp.auth.isAuthenticated())

  hbp.auth.onAuthStateChanged((isAuth) => {
    setAuthenticated(isAuth)
  })
  return authenticated
}

export const useUserRoles = () => {
  const hbp = useHbp()
  const getRolesClaim = useCallback(
    () => (hbp.auth.getClaim('x-hasura-allowed-roles') || []) as string[],
    [hbp]
  )
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
