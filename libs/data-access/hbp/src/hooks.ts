import Auth from 'nhost-js-sdk/dist/Auth'
import { useState } from 'react'

export const useAuthenticated = (auth: Auth) => {
  const [authenticated, setAuthenticated] = useState(auth.isAuthenticated())
  auth.onAuthStateChanged((isAuth) => {
    setAuthenticated(isAuth)
  })
  return authenticated
}
