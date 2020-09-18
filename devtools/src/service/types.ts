import { Package, PackageJson } from '../package/types'

export enum ServiceType {
  TsNode = 'ts-node',
  Quasar = 'quasar',
  hasura = 'hasura'
}

export type Service = Package & {
  type: ServiceType
  dependencies: Package[]
}

export type PlatyplusPackageJson = PackageJson & {
  platyplus: {
    type: ServiceType
  }
}

export type ArtifactConfig = Record<
  ServiceType,
  (service: Service) => Record<string, unknown>
>

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
type ServiceTypeConfigResult = {
  main: ServicePipelineConfigResult
  dev?: ServicePipelineConfigResult & {
    files?: Array<{ src: string; dest: string }>
  }
  chartName: string
}

export type ServiceTypeConfig = (service: Service) => ServiceTypeConfigResult

export type ServiceTypeConfigs = Record<ServiceType, ServiceTypeConfig>
