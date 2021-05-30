import React, { FunctionComponent } from 'react'
import styles from './index.module.less'
import { withTitle } from '@platyplus/layout'
import { useAuth } from '@nhost/react-auth'
import { useRouter } from 'next/router'
import { Loading } from '@platyplus/navigation'
import Link from 'next/link'

export const Index: FunctionComponent = () => {
  const { signedIn } = useAuth()
  const router = useRouter()
  if (signedIn) {
    router.replace('/home')
    return <Loading />
  } else
    return (
      <div className={styles.page}>
        <h2>Welcome, stranger</h2>
        <Link href="/login">Login</Link>
        <br />
        <Link href="/register">Register</Link>
      </div>
    )
}

export default withTitle(Index, 'Welcome to Platyplus')
