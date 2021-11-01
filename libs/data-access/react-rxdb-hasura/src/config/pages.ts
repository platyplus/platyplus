import { useCallback, useMemo } from 'react'

import { Page, PAGES_TABLE } from '@platyplus/rxdb-hasura'

import { useStore } from '../store'
import { useRxCollection, useRxDocument, useRxQuery } from 'rxdb-hooks'
import { useAppConfig } from './app'

export const usePages = () => {
  const collection = useRxCollection(PAGES_TABLE)
  const q = useMemo(() => collection?.find().sort('slug'), [collection])
  const { result } = useRxQuery<Page>(q)
  const modifications = useStore(
    useCallback(
      (state) => state.forms[PAGES_TABLE] || ({} as Record<string, Page>),
      []
    )
  )
  const modifMap = useMemo(
    () => new Map(Object.entries(modifications)),
    [modifications]
  )
  const pages = useMemo(() => {
    const modifiedPages: Page[] = result.map((r) => {
      const modifiedPage = modifMap.get(r.id)
      if (modifiedPage) {
        modifMap.delete(r.id)
        return { ...r, ...modifiedPage }
      } else return r
    })
    modifMap.forEach((page) => {
      modifiedPages.push(page)
    })
    return modifiedPages.sort((a, b) => a.slug.localeCompare(b.slug))
  }, [result, modifMap])
  return pages
}

export const usePage = (slug: string): Page => {
  const pagesCollection = useRxCollection(PAGES_TABLE)
  const q = useMemo(
    () =>
      pagesCollection?.findOne({
        selector: {
          slug
        }
      }),
    [pagesCollection, slug]
  )
  const {
    result: [document]
  } = useRxQuery<Page>(q, { json: true })

  const modifiedPage = useStore(
    useCallback(
      (state) => {
        if (document) {
          return document && state.forms[PAGES_TABLE]?.[document.id]
        } else {
          return Object.values(state.forms[PAGES_TABLE] || {}).find(
            (p) => p.slug === slug
          )
        }
      },
      [document, slug]
    )
  )
  const page = useMemo(
    () => (modifiedPage ? { ...document, ...modifiedPage } : document),
    [document, modifiedPage]
  )
  return page
}

export const usePageConfig = (id: string): [Page, (page: Page) => void] => {
  const { result: initialValues } = useRxDocument<Page>(PAGES_TABLE, id, {
    json: true
  })

  const modifiedValues = useStore(
    useCallback((state) => (id && state.forms[PAGES_TABLE][id]) || {}, [id])
  )

  const state = useMemo<Page>(() => {
    const result = { ...(initialValues || {}), ...modifiedValues }
    if (!result.title) result.title = ''
    if (!result.icon) result.icon = ''
    if (!result.contents) result.contents = ''
    if (!result.slug) result.slug = ''
    if (!result.id) result.id = id
    return result as Page
  }, [modifiedValues, initialValues, id])
  const [appConfig, setAppConfig] = useAppConfig()
  const pages = usePages()
  const setState = useStore(
    useCallback(
      (state) => (value: Page) => {
        // * update menu when slug changes
        const old = pages.find((p) => p.id === value.id)
        let changes = false
        if (old) {
          const menu = [...(appConfig?.menu || [])].map((item) => {
            if (item.type === 'page' && item.id === old.slug) {
              changes = true
              return { ...item, id: value.slug }
            } else return item
          })
          if (changes) setAppConfig({ menu })
        }
        state.setConfigForm(PAGES_TABLE, value, id)
      },
      [id, appConfig?.menu, setAppConfig, pages]
    )
  )
  return [state, setState]
}
