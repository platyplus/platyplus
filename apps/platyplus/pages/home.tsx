import React, { FunctionComponent } from 'react'
import styles from './index.module.less'
import Link from 'next/link'
import { usePageTitle } from '@platyplus/layout'
import { PrivateRoute } from '@platyplus/auth'
import { useContentsCollections } from '@platyplus/react-rxdb-hasura'
import { useRoleMenu } from '../lib/menu'
import { Avatar } from '@platyplus/profile'

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
      <Avatar circle />
    </div>
  )
}

export default PrivateRoute(Home, '/')
