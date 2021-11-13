import { useCallback, useMemo } from 'react'

import { Page, PAGES_TABLE } from '@platyplus/rxdb-hasura'

import { useStore } from '../store'
import { useRxCollection, useRxDocument, useRxQuery } from 'rxdb-hooks'
import { useAppConfig } from './app'
import { pick } from '@platyplus/data'

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
  const q = useMemo(() => {
    return pagesCollection?.findOne({
      selector: {
        slug
      }
    })
  }, [pagesCollection, slug])
  const {
    result: [document]
  } = useRxQuery<Page>(q, { json: true })

  const modifiedPage = useStore(
    useCallback(
      (state) => {
        if (document?.slug === slug) {
          return state.forms[PAGES_TABLE]?.[document.id]
        } else {
          return Object.values(state.forms[PAGES_TABLE] || {}).find(
            (p) => p.slug === slug
          )
        }
      },
      [document, slug]
    )
  )
  const page = useMemo(() => {
    if (document || modifiedPage) {
      return { ...document, ...(modifiedPage || {}) }
    } else return null
  }, [document, modifiedPage])
  return page
}

export const usePageConfig = (
  id: string
): { page: Page; setPage: (page: Page) => void; isFetching: boolean } => {
  const { result: initialValues, isFetching } = useRxDocument<Page>(
    PAGES_TABLE,
    id,
    {
      json: true
    }
  )

  const page = useStore(
    useCallback(
      (state) => {
        if (isFetching) return null
        const res = {
          id,
          slug: '',
          title: '',
          icon: '',
          ...(initialValues || {}),
          ...(state.forms[PAGES_TABLE][id] || {})
        }
        return res as Page
      },
      [id, initialValues, isFetching]
    )
  )

  const { state, setState } = useAppConfig()

  const pages = usePages()
  const setPage = useStore(
    useCallback(
      (store) => (value: Page) => {
        // * update menu when slug changes
        const old = pages.find((p) => p.id === value.id)
        let changes = false
        if (old) {
          const menu = [...(state?.menu || [])].map((item) => {
            if (item.type === 'page' && item.id === old.slug) {
              changes = true
              return { ...item, id: value.slug }
            } else return item
          })
          if (changes) setState({ menu })
        }
        store.setConfigForm(
          PAGES_TABLE,
          pick(value, ['id', 'slug', 'contents', 'title', 'icon']),
          id
        )
      },
      [id, state, setState, pages]
    )
  )
  return { page, setPage, isFetching }
}
