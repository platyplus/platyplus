import React from 'react'

import { useIsTableInfoReady } from '@platyplus/react-rxdb-hasura'

import { RouteConfig } from '../types'
import { PrivateMenu } from './private'
import { PublicMenu } from './public'

export const Menu: React.FC<{
  config: boolean
  authenticated: boolean
  home: RouteConfig
  register: RouteConfig
  login: RouteConfig
}> = ({ config, authenticated, home, register, login }) => {
  const ready = useIsTableInfoReady()
  return authenticated && ready ? (
    <PrivateMenu config={config} />
  ) : (
    <PublicMenu home={home} register={register} login={login} />
  )
}
