import { ClusterConfigOutput } from '../types'
import { certManager } from './cert-manager'
import { helmRegistry } from './helm-registry'
import { ingress } from './ingress'

export const initApplicationServices = (
  name: string,
  config: ClusterConfigOutput
): void => {
  const { domain, appServices, provider, pulumiProvider } = config
  const { namespace } = appServices

  if (appServices.ingress.enabled) {
    ingress(name, provider, pulumiProvider, { domain, namespace })
  }
  if (appServices.certManager.enabled) {
    certManager(name, provider, pulumiProvider, {
      domain,
      namespace,
      email: appServices.certManager.email
    })
  }
  if (appServices.helmRegistry.enabled) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
