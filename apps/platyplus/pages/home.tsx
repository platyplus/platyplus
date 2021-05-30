import React, { FunctionComponent } from 'react'
import styles from './index.module.less'
import { withTitle } from '@platyplus/layout'
import { privateRoute } from '@platyplus/auth'
import { useContentsCollections } from '@platyplus/react-rxdb-hasura'
import { useRoleMenu } from '../lib/menu'
import { Avatar, DisplayName, useProfile } from '@platyplus/profile'

const Home: FunctionComponent = () => {
  const collections = useContentsCollections()
  const menu = useRoleMenu()
  const profile = useProfile()
  if (profile)
    return (
      <div className={styles.page}>
        <h2>
          Welcome, <DisplayName profile={profile} />
        </h2>
        {Object.keys(collections).map((key) => (
          <div key={key}>{key}</div>
        ))}
        <h3>Menu</h3>
        <div>
          {menu.map((item, index) => (
            <div key={index}>{JSON.stringify(item)}</div>
          ))}
        </div>
        <Avatar circle />
      </div>
    )
  else return <div>loading...</div>
}

export default privateRoute(withTitle(Home, 'Platyplus home page'), '/')
