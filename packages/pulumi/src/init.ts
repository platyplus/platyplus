import * as pulumi from '@pulumi/pulumi'
import merge from 'deepmerge'
import fs from 'fs'
import path from 'path'
import yaml from 'yaml'

import { initApplicationServices } from './application-services'
import { initClusterServices } from './cluster-services'
import { initCluster } from './clusters'
import { DEFAULT_CLUSTER_CONFIG } from './defaults'
import { getDomains } from './helpers'
import { ClusterConfig, ClusterConfigOutput, ClustersConfig } from './types'

export const initClusters = (): Map<string, ClusterConfigOutput> => {
  // * If `clusters.yaml` exists, load its contents
  const configFilePath = path.join(process.cwd(), 'clusters.yaml')
  const fileClustersConfig: ClustersConfig = fs.existsSync(configFilePath)
    ? yaml.parse(fs.readFileSync(configFilePath, 'utf8'))
    : {}

  // * If `clusters` key exists in the Pulumi configuration, load its contents
  const pulumiClustersConfig =
    new pulumi.Config().getObject<ClustersConfig>('clusters') || {}

  // * Merge clusters.yaml and pulumi config - pulumi config overrides the `clusters.yaml` file
  const clustersConfig = merge<ClustersConfig>(
    fileClustersConfig,
    pulumiClustersConfig
  )

  return new Map(
    Object.entries(clustersConfig).map(([name, rawConfig]) => {
      // * Fill missing cluster configuration with defaults
      const config = merge<ClusterConfig>(DEFAULT_CLUSTER_CONFIG, rawConfig)
      const { domain, appServices, clusterServices } = config
      // * Create the Kubernetes cluster
      const { provider: pulumiProvider, cluster } = initCluster(name, config)
      const fullConfig = {
        ...config,
        pulumiProvider,
        cluster,
        domain: getDomains(domain)
      }
      // * Create cluster services, if enabled
      if (clusterServices?.enabled) {
        initClusterServices(name, fullConfig)
      }
      // * Create applications services, if enabled
      if (appServices?.enabled) {
        initApplicationServices(name, fullConfig)
      }
      // * Return general configuration so it can be used later on
      return [name, fullConfig]
    })
  )
}
