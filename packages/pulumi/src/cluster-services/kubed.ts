import * as kubernetes from '@pulumi/kubernetes'
import * as pulumi from '@pulumi/pulumi'
import { childName, getNameSpace } from '../helpers'
import { CommonServiceOptions } from '../types'


type KubedOptions = CommonServiceOptions

// * https://appscode.com/products/kubed/v0.12.0/setup/install/
// * (See GKE notes)
export const kubed = (
  parentName: string,
  provider: pulumi.ProviderResource,
  options: KubedOptions
) => {
  const ns = getNameSpace(provider, options.namespace)

  const chart = new kubernetes.helm.v3.Chart(
    childName(parentName, 'kubed'),
    {
      chart: 'kubed',
      version: '0.12.0',
      fetchOpts: {
        repo: 'https://charts.appscode.com/stable'
      },
      namespace: ns.metadata.name,
    },
    { provider }
  )

  return { chart }
}
