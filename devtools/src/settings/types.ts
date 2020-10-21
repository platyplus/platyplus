import { PackageInformation } from '../package'
import { ProjectConfig } from '../project'
import { SkaffoldPortEvent } from '../skaffold'

export enum ServiceTypes {
  Quasar = 'quasar',
  Hasura = 'hasura',
  HasuraBackendPlus = 'hasura-backend-plus'
}

export enum PackageTypes {
  TypeScript = 'typescript'
}

export type PackageType = PackageTypes | ServiceTypes

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
export type PackageTypeConfigResult = {
  main?: ServicePipelineConfigResult
  dev?: ServicePipelineConfigResult & {
    files?: Array<{ src: string; dest: string }>
  }
  chartName: string
  values?: Record<string, unknown>
  init?: () => Promise<void>
  postInstall?: () => Promise<void>
  run?: (event: SkaffoldPortEvent) => Promise<void>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  postServiceCreate?: (project: ProjectConfig, options?: any) => Promise<void>
}

export type ServiceTypeConfig = (
  service: PackageInformation
) => PackageTypeConfigResult

export type ServiceTypeConfigs = Record<PackageType, ServiceTypeConfig>
