import { Sync } from '../skaffold'
import { Service, ServiceType } from './types'

/**
 * Determines how files should be synced depending on the service type
 */
// TODO update skaffold config so the entire list is not replaced, so we can keep the custom src-dest pairs
export const syncFiles: Record<ServiceType, (service: Service) => Sync> = {
  'ts-node': ({ directory, name }) => ({
    manual: [
      {
        src: `${directory}/${name}/src/**/*.{ts,json}`,
        dest: '.'
      }
    ]
  }),
  quasar: ({ directory, name }) => ({
    manual: [
      {
        src: `${directory}/${name}/src/**/*.{ts,vue,json,sass,html}`,
        dest: '.'
      },
      {
        src: `${directory}/${name}/quasar.conf.js`,
        dest: '.'
      },
      {
        src: `${directory}/${name}/src/assets/**/*`,
        dest: '.'
      },
      {
        src: `${directory}/${name}/public/**/*`,
        dest: '.'
      }
    ]
  })
}

export const helmChartName: Record<ServiceType, string> = {
  'ts-node': 'simple-http',
  quasar: 'simple-http'
}
