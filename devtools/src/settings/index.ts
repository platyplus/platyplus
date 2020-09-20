import { hasuraConfig } from './hasura'
import { quasarConfig } from './quasar'
import { tsNodeConfig } from './ts-node'
import { ServiceTypeConfigs } from './types'

export * from './types'

export const DEFAULT_ROOT_DIR =
  process.env.INIT_CWD || (process.env.PWD as string)

export const serviceTypesConfig: ServiceTypeConfigs = {
  hasura: hasuraConfig,
  quasar: quasarConfig,
  'ts-node': tsNodeConfig,
}
