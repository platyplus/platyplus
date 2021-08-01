import React, { useContext } from 'react'
import { ComponentsConfig } from './types'

export const ComponentsContext = React.createContext<ComponentsConfig>({
  collections: {},
  fields: {},
  documents: {}
})

export const useComponentsLibrary = () => useContext(ComponentsContext)
