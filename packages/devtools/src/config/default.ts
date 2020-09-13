import { Config } from './types'

export const DEFAULT_CONFIG: Config = {
  services: [],
  skaffold: {
    apiVersion: 'skaffold/v2beta7',
    kind: 'Config',
    build: {
      artifacts: [],
    },
    deploy: {
      helm: {
        releases: [],
      },
    },
    profiles: [],
  },
}
