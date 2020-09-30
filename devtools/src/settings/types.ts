import { PackageInformation } from '../package'

export enum PackageType {
  TypeScript = 'typescript',
  Quasar = 'quasar',
  Hasura = 'hasura',
  HasuraBackendPlus = 'hasura-backend-plus'
}

type ServicePipelineConfigResult = {
  build:
    | false
    | {
        image: string
        context: string
        docker?: {
          dockerfile: string
        }
      }
  helm?: {
    setValues?: Record<string, unknown>
  }
}
type PackageTypeConfigResult = {
  main?: ServicePipelineConfigResult
  dev?: ServicePipelineConfigResult & {
    files?: Array<{ src: string; dest: string }>
  }
  chartName: string
  init?: () => Promise<void>
  postInstall?: () => Promise<void>
}

export type ServiceTypeConfig = (
  service: PackageInformation
) => PackageTypeConfigResult

export type ServiceTypeConfigs = Record<PackageType, ServiceTypeConfig>
