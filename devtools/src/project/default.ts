import { DevToolsConfig } from './types'

/**
 * Default
 */
export const defaultPdtConfig = (
  directory: string,
  name = '',
  description = ''
): DevToolsConfig => ({
  directory,
  name,
  description,
  // TODO What happens if two services are using the same package? problem with their names
  services: [],
})
