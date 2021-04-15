import * as digitalocean from '@pulumi/digitalocean'
import { KubernetesCluster, KubernetesClusterArgs } from '@pulumi/digitalocean'
import { KubernetesClusterNodePool } from '@pulumi/digitalocean/types/input'
import { Provider } from '@pulumi/kubernetes'

export const DO_DEFAULT_REGION: digitalocean.Region = digitalocean.Regions.AMS3
export const DO_DEFAULT_KUBERNETES_VERSION = digitalocean
  .getKubernetesVersions()
  .then(v => v.latestVersion)

export const DO_DEFAULT_NODE_POOL: KubernetesClusterNodePool = {
  name: 'pool',
  size: digitalocean.DropletSlugs.DropletS1VCPU2GB,
  autoScale: true,
  minNodes: 1,
  maxNodes: 1
}

export const digitalOceanCluster = (
  name: string,
  args?: Partial<KubernetesClusterArgs>
) => {
  const { region, nodePool, version, ...otherArgs } = args || {}

  const cluster = new KubernetesCluster(name, {
    version: version || DO_DEFAULT_KUBERNETES_VERSION,
    name,
    region: region || DO_DEFAULT_REGION,
    nodePool: { ...DO_DEFAULT_NODE_POOL, ...nodePool },
    ...otherArgs
  })

  const kubeconfig = cluster.kubeConfigs[0].rawConfig

  const provider = new Provider(`do-k8s-${name}`, { kubeconfig })
  return { cluster, provider }
}
