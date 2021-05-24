import React, { FunctionComponent } from 'react'
import styles from './index.module.less'
import Link from 'next/link'
import { usePageTitle } from '@platyplus/layout'
import { PrivateRoute } from '@platyplus/auth'
import { useContentsCollections } from '../lib/collection'
import { useRoleMenu } from '../lib/menu'

const Home: FunctionComponent = () => {
  usePageTitle('Platyplus home page')
  const collections = useContentsCollections()
  const menu = useRoleMenu()
  return (
    <div className={styles.page}>
      <h2>Home page</h2>
      {Object.keys(collections).map((key) => (
        <div key={key}>{key}</div>
      ))}
      <h3>Menu</h3>
      <div>
        {menu.map((item, index) => (
          <div key={index}>{JSON.stringify(item)}</div>
        ))}
      </div>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
      <p>Thank you for using and showing some ♥ for Nx.</p>
    </div>
  )
}

export default PrivateRoute(Home, '/')
