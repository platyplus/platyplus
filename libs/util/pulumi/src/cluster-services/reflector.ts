import * as kubernetes from '@pulumi/kubernetes'
import * as pulumi from '@pulumi/pulumi'

import { childName, getNameSpace } from '../helpers'
import { CommonServiceOptions } from '../types'

type ReflectorOptions = CommonServiceOptions

// * https://github.com/jetstack/cert-manager/issues/2576
// TODO not required by cert-manager anymore now that the above is supposed to be fixed -> do not install by default
export const reflector = (
  parentName: string,
  provider: pulumi.ProviderResource,
  options: ReflectorOptions
): { chart: kubernetes.helm.v3.Chart } => {
  const ns = getNameSpace(provider, options.namespace)

  const chart = new kubernetes.helm.v3.Chart(
    childName(parentName, 'reflector'),
    {
      chart: 'reflector',
      // TODO fixed version
      // version: '0.0.0',
      fetchOpts: {
        repo: 'https://emberstack.github.io/helm-charts'
      },
      namespace: ns.metadata.name
    },
    { provider }
  )

  return { chart }
}
