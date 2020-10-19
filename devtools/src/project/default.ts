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
  services: []
})
