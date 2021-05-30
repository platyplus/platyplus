import React, { FunctionComponent } from 'react'
import styles from './index.module.less'
import { withTitle } from '@platyplus/layout'
import { privateRoute } from '@platyplus/auth'
import { Avatar, DisplayName, useProfile } from '@platyplus/profile'

const Home: FunctionComponent = () => {
  const profile = useProfile()
  if (profile)
    return (
      <div className={styles.page}>
        <h2>
          <DisplayName profile={profile} />
        </h2>
        <Avatar circle />
      </div>
    )
  else return <div>loading...</div>
}

export default privateRoute(withTitle(Home, 'Profile'))
