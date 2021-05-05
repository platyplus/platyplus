import React, { FunctionComponent } from 'react'
import styles from './index.module.less'
import Link from 'next/link'
import { usePageTitle } from '@platyplus/layout'
import { useAuth } from '@nhost/react-auth'
import { useRouter } from 'next/router'
import { Loading } from '@platyplus/navigation'

export const Index: FunctionComponent = () => {
  usePageTitle('Welcome to Platyplus')
  const { signedIn } = useAuth()
  const router = useRouter()
  if (signedIn) {
    router.replace('/home')
    return <Loading />
  } else
    return (
      <div className={styles.page}>
        <h2>Welcome, stranger?</h2>
      </div>
    )
}

export default Index
