import { Output } from '@pulumi/pulumi'
import { ClusterConfigOutput } from '../types'
import { certManager } from './cert-manager'
import { helmRegistry } from './helm-registry'
import { ingress } from './ingress'

export const initApplicationServices = (
  name: string,
  config: ClusterConfigOutput
): { ingressIp?: Output<string> } => {
  const { domain, appServices, provider, pulumiProvider } = config
  const { namespace } = appServices
  let ingressIp: Output<string>
  if (appServices.ingress.enabled) {
    ingressIp = ingress(name, provider, pulumiProvider, {
      domain,
      namespace
    }).ingressIp
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
  return { ingressIp }
}
