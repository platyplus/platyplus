import { ProjectConfig } from './types'

/**
 * Default
 */
export const defaultPdtConfig = (
  directory: string,
  name = '',
  description = ''
): ProjectConfig => ({
  directory,
  name,
  description,
  services: []
})
