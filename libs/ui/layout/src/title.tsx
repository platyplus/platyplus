import { AppProps } from 'next/app'
import { ElementType } from 'react'
import { Header as GenericHeader, Icon, IconButton } from 'rsuite'
import { createGlobalState, useTitle } from 'react-use'
import { useEffect } from 'react'

export const useTitleState = createGlobalState<string>('')

export const usePageTitle = (title: string) => {
  useTitle(title)
  const [titleState, setTitleState] = useTitleState()
  useEffect(() => {
    setTitleState(title)
  })
  return [titleState, setTitleState]
}

export const withTitle = (Component: ElementType, title: string) => (
  props: AppProps
) => {
  usePageTitle(title)
  return <Component {...props} />
}
