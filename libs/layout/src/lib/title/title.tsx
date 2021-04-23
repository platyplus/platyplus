import Head from 'next/head'
import { useEffect } from 'react'
import { createGlobalState, useTitle } from 'react-use'
import './title.module.less'

export const useTitleState = createGlobalState<string>('')

/* eslint-disable-next-line */
export interface TitleProps {}

export const usePageTitle = (title: string) => {
  useTitle(title)
  const [titleState, setTitleState] = useTitleState()
  useEffect(() => {
    setTitleState(title)
  })
  return [titleState, setTitleState]
}

export function Title(props: TitleProps) {
  const [title] = useTitleState()
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <span>{title}</span>
    </>
  )
}

export default Title
