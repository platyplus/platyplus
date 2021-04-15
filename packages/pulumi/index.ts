import * as kubernetes from '@pulumi/kubernetes'
import { clusters } from './modules'

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
