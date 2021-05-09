import { ClusterConfig } from './types'

export const DEFAULT_CLUSTER_CONFIG: ClusterConfig = {
  provider: 'digitalocean',
  appServices: {
    enabled: true,
    namespace: 'apps-services',
    ingress: {
      enabled: true
    },
    certManager: {
      enabled: true
    },
    helmRegistry: {
      enabled: false
    }
  },
  clusterServices: {
    enabled: true,
    namespace: 'cluster-services',
    monitoring: {
      enabled: true,
      ingress: {
        enabled: true,
        subdomain: 'monitoring',
        prometheus: {
          enabled: true,
          subdomain: null,
          path: '/prometheus'
        },
        grafana: {
          enabled: true,
          subdomain: null,
          path: '/grafana'
        },
        alertManager: {
          enabled: true,
          subdomain: null,
          path: '/alerts'
        }
      }
    },
    reflector: {
      enabled: true
    },
    kubed: {
      enabled: false
    }
  }
}
