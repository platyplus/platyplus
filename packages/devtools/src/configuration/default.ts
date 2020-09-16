import { DevToolsConfig } from './types'

/**
 * Default
 */
export const defaultPdtConfig = (name = ''): DevToolsConfig => ({
  // TODO name is not used yet.
  name,
  // TODO What happens if two services are using the same package? problem with their names
  services: [],
})
