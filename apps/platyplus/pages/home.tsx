import React, { FunctionComponent } from 'react'
import styles from './index.module.less'
import Link from 'next/link'
import { usePageTitle } from '@platyplus/layout'
import { PrivateRoute } from '@platyplus/auth'
import { useContentsCollections } from '../lib/collection'
import { useRoleMenu } from '../lib/menu'
import { useProfile } from '../lib/profile'
import dynamic from 'next/dynamic'
const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false })

const Profile: FunctionComponent = () => {
  const profile = useProfile()
  if (profile) {
    return (
      <div>
        Bingo, profile!
        {profile.id}
        <div>
          <DynamicReactJson src={profile.toJSON()} />
        </div>
      </div>
    )
  } else return null
}

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
      <Profile />
    </div>
  )
}

export default PrivateRoute(Home, '/')
