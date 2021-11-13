import { useCallback, useMemo } from 'react'

import { Page, PAGES_TABLE } from '@platyplus/rxdb-hasura'

import { useStore } from '../store'
import { useRxCollection, useRxQuery } from 'rxdb-hooks'
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

export const usePage = ({
  id,
  slug
}: {
  id?: string
  slug?: string
}): { page: Page; setPage: (page: Page) => void; isFetching: boolean } => {
  const pagesCollection = useRxCollection(PAGES_TABLE)
  const selector = useMemo(() => {
    if (id) return id
    if (slug)
      return {
        selector: {
          slug
        }
      }
  }, [id, slug])

  const q = useMemo(() => {
    return pagesCollection?.findOne(selector)
  }, [pagesCollection, selector])

  const {
    result: [initialValues],
    isFetching
  } = useRxQuery<Page>(q, { json: true })

  const docId = useMemo(() => id || initialValues?.id, [id, initialValues])

  const page = useStore(
    useCallback(
      (state) => {
        if (isFetching) return null
        const res = {
          id: docId,
          slug: '',
          title: '',
          icon: '',
          ...(initialValues || {}),
          ...(state.forms[PAGES_TABLE][docId] || {})
        }
        return res as Page
      },
      [docId, initialValues, isFetching]
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
          docId
        )
      },
      [docId, state, setState, pages]
    )
  )
  return { page, setPage, isFetching }
}
