import * as pulumi from '@pulumi/pulumi'
import { ClusterProvider } from '../../types'
import { digitalOceanIngress } from './do'
import {  IngressOptions } from './types'

export const ingress = (
  parentName: string,
  providerName: ClusterProvider,
  provider: pulumi.ProviderResource,
  options: IngressOptions
) => {
  if (providerName === 'digitalocean')
    return digitalOceanIngress(parentName, provider, options)
  else throw Error(`Helm registry not set for provider ${providerName}`)
}
