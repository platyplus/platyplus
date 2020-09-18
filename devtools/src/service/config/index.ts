import { ServiceTypeConfigs } from '../types'
import { hasuraConfig } from './hasura'
import { quasarConfig } from './quasar'
import { tsNodeConfig } from './ts-node'

export const serviceTypesConfig: ServiceTypeConfigs = {
  hasura: hasuraConfig,
  quasar: quasarConfig,
  'ts-node': tsNodeConfig
}
