import './pulumi-shims'
import { initClusters } from '@platyplus/pulumi'
import * as kubernetes from '@pulumi/kubernetes'
const clusters = initClusters()
const clusterName = 'platy-plus'
const config = clusters.get(clusterName)
if (config) {
  new kubernetes.yaml.ConfigFile(
    'kuard',
    {
      file: 'test.yaml',
      resourcePrefix: clusterName
    },
    { provider: config.pulumiProvider, dependsOn: [config.cluster] }
  )
}
