import * as digitalocean from '@pulumi/digitalocean'
import { Provider } from '@pulumi/kubernetes'

import { ClusterConfig } from '../types'
import { digitalOceanCluster } from './do'

export const initCluster = (
  name: string,
  config: ClusterConfig
): { cluster: digitalocean.KubernetesCluster; provider: Provider } => {
  if (config.provider === 'digitalocean') {
    return digitalOceanCluster(name)
  } else
    throw Error(`${name}: cluster provisionner "${config.provider}" is unknown`)
}
