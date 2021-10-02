import { useEffect, useState } from 'react'
import { useLocalStorage } from 'react-use'
import { AppConfig, AppSettings, JSONAppConfig } from './types'

// TODO remove this once rsuite 5 is on
export const UI_DATE_FORMAT = 'DD/MM/YYYY'
export const UI_TIME_FORMAT = 'HH:mm:ss'
export const UI_DATE_TIME_FORMAT = `${UI_DATE_FORMAT} ${UI_TIME_FORMAT}`

export const UI_DATE_FORMAT_FNS = 'dd/MM/yyyy'
export const UI_TIME_FORMAT_FNS = 'HH:mm:ss'
export const UI_DATE_TIME_FORMAT_FNS = `${UI_DATE_FORMAT_FNS} ${UI_TIME_FORMAT_FNS}`

const getConfig = async (initialSettings: AppSettings) =>
  fetch(window.location.origin + '/config.json').then((res) =>
    res
      .json()
      .then(({ hasuraUrl, authUrl, ...config }: Partial<JSONAppConfig>) => {
        return {
          hasuraUrl:
            typeof hasuraUrl === 'string'
              ? hasuraUrl
              : `${window.location.protocol}//${hasuraUrl.prefix}.${window.location.host}/v1/graphql`,
          authUrl:
            typeof authUrl === 'string'
              ? authUrl
              : `${window.location.protocol}//${authUrl.prefix}.${window.location.host}`,
          ...config,
          ...initialSettings
        }
      })
  )

export const useConfig = (appSettings: AppSettings) => {
  // TODO ability to reload config - something with the service worker instead of localstorage
  const [persistedConfig, setPersistedConfig] =
    useLocalStorage<AppConfig>('platyplus-config')
  const [config, setConfig] = useState<AppConfig>()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (loading) {
      if (process.env.NODE_ENV !== 'production') {
        getConfig(appSettings).then((config) => {
          setConfig(config)
          setLoading(false)
        })
      } else {
        if (persistedConfig) {
          setConfig(persistedConfig)
          setLoading(false)
        } else {
          getConfig(appSettings).then(setPersistedConfig)
        }
      }
    }
  }, [loading, persistedConfig, setPersistedConfig, appSettings])
  return { loading, config }
}
