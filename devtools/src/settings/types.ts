import { Package } from '../service'

export enum PackageType {
  TsNode = 'ts-node',
  Quasar = 'quasar',
  Hasura = 'hasura',
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
  init?: () => Promise<void> // Installation script
}

export type ServiceTypeConfig = (service: Package) => PackageTypeConfigResult

export type ServiceTypeConfigs = Record<PackageType, ServiceTypeConfig>
