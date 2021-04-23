/* eslint-disable react-hooks/rules-of-hooks */
import { ElementType } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@nhost/react-auth'
import { AppProps } from 'next/app'
import Redirection from '../redirection/redirection'

export const PrivateRoute = (Component: ElementType, redirect = '/login') => (
  props: AppProps
) => {
  const router = useRouter()
  const { signedIn } = useAuth()

  // wait to see if the user is logged in or not.
  if (signedIn === null) {
    console.log('Checking auth')
    return <div>Checking auth...</div>
  }

  if (!signedIn) {
    router.push(redirect)
    return <Redirection />
  }

  return <Component {...props} />
}
