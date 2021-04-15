import * as pulumi from '@pulumi/pulumi'
import { ClusterProvider } from '../../types'
import { digitalOceanHelmRegistry } from './do'
import { HelmRegistryInitOptions } from './types'

export const helmRegistry = (
  parentName: string,
  providerName: ClusterProvider,
  provider: pulumi.ProviderResource,
  options: HelmRegistryInitOptions
) => {
  if (providerName === 'digitalocean')
    return digitalOceanHelmRegistry(parentName, provider, options)
  else throw Error(`Helm registry not set for provider ${providerName}`)
}
