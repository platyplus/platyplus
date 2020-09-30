import { hasuraConfig } from './hasura'
import { hasuraBackendPlusConfig } from './hasura-backend-plus'
import { quasarConfig } from './quasar'
import { ServiceTypeConfigs } from './types'
import { typescriptConfig } from './typescript'

export * from './types'

export const DEFAULT_WORKING_DIR =
  process.env.INIT_CWD || (process.env.PWD as string)

export const serviceTypesConfig: ServiceTypeConfigs = {
  hasura: hasuraConfig,
  'hasura-backend-plus': hasuraBackendPlusConfig,
  quasar: quasarConfig,
  typescript: typescriptConfig
}
