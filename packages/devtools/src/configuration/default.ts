import { Config } from './types'

/**
 * Default
 */
export const DEFAULT_CONFIG: Config = {
  // TODO name is not used yet.
  name: '',
  // TODO What happens if two services are using the same package? problem with their names
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
