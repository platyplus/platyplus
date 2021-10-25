import { isConsoleEnabled } from '@platyplus/rxdb-hasura'
import { useEffect, useState } from 'react'
import { AppConfig, JSONAppConfig } from './types'

// TODO remove this once rsuite 5 is on
export const UI_DATE_FORMAT = 'DD/MM/YYYY'
export const UI_TIME_FORMAT = 'HH:mm:ss'
export const UI_DATE_TIME_FORMAT = `${UI_DATE_FORMAT} ${UI_TIME_FORMAT}`

export const UI_DATE_FORMAT_FNS = 'dd/MM/yyyy'
export const UI_TIME_FORMAT_FNS = 'HH:mm:ss'
export const UI_DATE_TIME_FORMAT_FNS = `${UI_DATE_FORMAT_FNS} ${UI_TIME_FORMAT_FNS}`

const getConfig = async () =>
  fetch(`${window.location.origin}/config.json`).then((res) =>
    res
      .json()
      .then(({ hasuraUrl, authUrl, ...config }: Partial<JSONAppConfig>) => {
        const isLocal = isConsoleEnabled()
        return {
          hasuraUrl:
            typeof hasuraUrl === 'string'
              ? process.env.NODE_ENV === 'development' && !isLocal
                ? `${window.location.protocol}//hasura.${window.location.host}/v1/graphql`
                : hasuraUrl
              : `${window.location.protocol}//${hasuraUrl.prefix}.${window.location.host}/v1/graphql`,
          authUrl:
            typeof authUrl === 'string'
              ? process.env.NODE_ENV === 'development' && !isLocal
                ? `${window.location.protocol}//auth.${window.location.host}/v1/graphql`
                : authUrl
              : `${window.location.protocol}//${authUrl.prefix}.${window.location.host}`,
          ...config
        }
      })
  )

export const useConfig = () => {
  const [config, setConfig] = useState<AppConfig>()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (loading) {
      getConfig().then((config) => {
        setConfig(config)
        setLoading(false)
      })
    }
  }, [loading])
  return { loading, config }
}
