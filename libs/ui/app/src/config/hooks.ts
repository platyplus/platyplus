import { isConsoleEnabled } from '@platyplus/rxdb-hasura'
import { useEffect, useState } from 'react'
import { AppConfig, JSONAppConfig } from '../types'

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
          hasuraUrl: isLocal
            ? `${window.location.protocol}//${window.location.hostname}:8080/v1/graphql`
            : typeof hasuraUrl === 'string'
            ? hasuraUrl
            : `${window.location.protocol}//hasura.${window.location.host}/v1/graphql`,
          authUrl: isLocal
            ? `${window.location.protocol}//${window.location.hostname}:9000`
            : typeof authUrl === 'string'
            ? authUrl
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
