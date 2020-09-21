import { hasuraConfig } from './hasura'
import { quasarConfig } from './quasar'
import { ServiceTypeConfigs } from './types'
import { typescriptConfig } from './typescript'

export * from './types'

export const DEFAULT_ROOT_DIR =
  process.env.INIT_CWD || (process.env.PWD as string)

export const serviceTypesConfig: ServiceTypeConfigs = {
  hasura: hasuraConfig,
  quasar: quasarConfig,
  typescript: typescriptConfig,
}
