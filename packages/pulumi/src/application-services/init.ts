import { ClusterConfigOutput } from '../types'
import { ingress } from './ingress'
import { certManager } from './cert-manager'
import { helmRegistry } from './helm-registry'

export const initApplicationServices = (
  name: string,
  config: ClusterConfigOutput
) => {
  const { domain, appServices, provider, pulumiProvider } = config
  const { namespace } = appServices

  if (appServices.ingress.enabled) {
    ingress(name, provider, pulumiProvider, { domain, namespace })
  }
  if (appServices.certManager.enabled) {
    certManager(name, pulumiProvider, {
      domain,
      namespace,
      email: appServices.certManager.email
    })
  }
  if (appServices.helmRegistry.enabled) {
    const { enabled, ...options } = appServices.helmRegistry
    helmRegistry(name, provider, pulumiProvider, {
      ...options,
      tls: appServices.certManager.enabled,
      ingress: appServices.ingress.enabled,
      domain,
      namespace
    })
  }
}
