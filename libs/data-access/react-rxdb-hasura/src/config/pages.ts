import { useCallback, useMemo } from 'react'

import { Page, PAGES_TABLE } from '@platyplus/rxdb-hasura'

import { useStore } from '../store'
import { useRxCollection, useRxQuery } from 'rxdb-hooks'
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
        return { ...r.toJSON(), ...modifiedPage }
      } else return r.toJSON()
    })
    modifMap.forEach((page) => {
      modifiedPages.push(page)
    })
    return modifiedPages.sort((a, b) => a.slug.localeCompare(b.slug))
  }, [result, modifMap])
  return pages
}

export const usePage = <T = Page>({
  id,
  slug,
  path,
  fallback
}: {
  id?: string
  slug?: string
  path?: string
  fallback?: T
}): { state: T; setState: (s: T) => void; isFetching: boolean } => {
  const pagesCollection = useRxCollection<Page>(PAGES_TABLE)
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
        if (path) {
          return state.forms?.[PAGES_TABLE]?.[docId] &&
            path in state.forms?.[PAGES_TABLE]?.[docId]
            ? state.forms[PAGES_TABLE][docId][path]
            : initialValues?.[path] ?? fallback
        }
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
      [docId, initialValues, isFetching, path, fallback]
    )
  )

  const { state: appConfig, setState: setAppConfig } = useAppConfig()

  const pages = usePages()
  const setState = useStore(
    useCallback(
      (store) => (value: T) => {
        // * update menu when slug changes
        const oldSlug = pages.find((p) => p.id === docId)?.slug
        if (oldSlug) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const newSlug: string = (value as any).slug || value
          if (typeof value === 'object' || path === 'slug') {
            if (newSlug !== oldSlug) {
              let changes = false
              const menu = [...(appConfig?.menu || [])].map((item) => {
                if (item.type === 'page' && item.id === oldSlug) {
                  changes = true
                  return { ...item, id: newSlug }
                } else return item
              })
              if (changes) setAppConfig({ menu })
            }
          }
          store.setConfigForm(PAGES_TABLE, oldSlug, docId, 'slug')
        }
        store.setConfigForm(PAGES_TABLE, value, docId, path)
      },
      [docId, appConfig, setAppConfig, pages, path]
    )
  )
  return { state: page, setState, isFetching }
}

export const usePageTitle = ({
  id,
  slug
}: {
  id?: string
  slug?: string
  path?: string
}) => {
  return usePage<string>({ id, slug, path: 'title' })
}
