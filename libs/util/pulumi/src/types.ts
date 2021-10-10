import { KubernetesCluster } from '@pulumi/digitalocean'
import * as kubernetes from '@pulumi/kubernetes'

import { HelmRegistryOptions } from './application-services/helm-registry/types'
import { MonitoringOptions } from './cluster-services/monitoring/types'

export type CommonServiceOptions = {
  namespace: string
}

export type ClusterProvider = 'digitalocean'

export type DnsDomain = {
  name: string
  root?: string
  www?: string
}

export type AppServicesConfig = {
  enabled: boolean
  namespace: string
  ingress: {
    enabled: boolean
  }
  certManager: {
    enabled: boolean
    email?: string
  }
  helmRegistry: HelmRegistryOptions & {
    enabled: boolean
  }
}

export type ClusterServicesConfig = {
  enabled: boolean
  namespace: string
  monitoring: MonitoringOptions & {
    enabled: boolean
  }
  reflector: {
    enabled: boolean
  }
  kubed: {
    enabled: boolean
  }
}

export type ClusterConfig = {
  provider: ClusterProvider
  domain?: DnsDomain | DnsDomain[]
  appServices: AppServicesConfig
  clusterServices: ClusterServicesConfig
}
export type ClustersConfig = Record<string, ClusterConfig>
export type ClusterConfigOutput = ClusterConfig & { domain: DnsDomain[] } & {
  cluster: KubernetesCluster
  pulumiProvider: kubernetes.Provider
}
