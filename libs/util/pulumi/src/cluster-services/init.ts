import { ClusterConfigOutput } from '../types'
import { kubed } from './kubed'
import { reflector } from './reflector'

export const initClusterServices = (
  name: string,
  config: ClusterConfigOutput
): void => {
  const { clusterServices, pulumiProvider } = config
  const { namespace } = clusterServices

  if (clusterServices.kubed.enabled) {
    kubed(name, pulumiProvider, { namespace })
  }
  // TODO Install Reflector if cert-manager is enabled
  // TODO replace Reflector by kubed when cert-manager will be able to handle it
  if (clusterServices.reflector.enabled) {
    reflector(name, pulumiProvider, { namespace })
  }

  // !!!! Deactivated for now, too many problems... Following issues
  /*
  if (clusterServices.monitoring.enabled) {
    monitoring(name, pulumiProvider, {
      ...clusterServices.monitoring,
      tls: appServices.certManager.enabled,
      domain,
      namespace
    })
  }
  */
}
