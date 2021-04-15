import { ClusterConfig } from '../types'
import { digitalOceanCluster } from './do'

export const initCluster = (name: string, config: ClusterConfig) => {
  if (config.provider === 'digitalocean') {
    return digitalOceanCluster(name)
  } else
    throw Error(`${name}: cluster provisionner "${config.provider}" is unknown`)
}
