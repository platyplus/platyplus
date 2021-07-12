import { createGlobalState, useTitle } from 'react-use'
import { useEffect } from 'react'

export const useTitleState = createGlobalState<string>('')

export const useWindowTitle = (title: string) => {
  useTitle(title)
  const [titleState, setTitleState] = useTitleState()
  useEffect(() => {
    setTitleState(title)
  })
  return [titleState, setTitleState]
}
