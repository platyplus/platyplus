import './pulumi-shims'
import { clusters } from '@platyplus/pulumi'
import * as kubernetes from '@pulumi/kubernetes'

// TODO remove this test
const clusterName = 'platy-plus'
const config = clusters.get(clusterName)
if (config) {
  new kubernetes.yaml.ConfigFile(
    'kuard',
    {
      file: 'test.yaml',
      resourcePrefix: clusterName
    },
    { provider: config.pulumiProvider }
  )
}
