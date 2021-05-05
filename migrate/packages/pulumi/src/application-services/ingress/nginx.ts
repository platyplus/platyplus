import * as kubernetes from '@pulumi/kubernetes'
import { ProviderResource } from '@pulumi/pulumi'

import { childName, getNameSpace } from '../../helpers'

export const ingressNginx = (
  parentName: string,
  provider: ProviderResource,
  namespace: string
): { name: string; chart: kubernetes.helm.v3.Chart } => {
  const ns = getNameSpace(provider, namespace)
  const name = 'ingress-nginx'
  // TODO https://github.com/pulumi/pulumi-kubernetes/issues/555
  const chart = new kubernetes.helm.v3.Chart(
    childName(parentName, name),
    {
      chart: 'ingress-nginx',
      // TODO set fixed version
      // version: '0.9.0',
      namespace: ns.metadata.name,
      fetchOpts: {
        repo: 'https://kubernetes.github.io/ingress-nginx'
      }
    },
    { provider }
  )
  return { chart, name }
}
