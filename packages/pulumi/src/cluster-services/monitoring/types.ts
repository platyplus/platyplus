import { DnsDomain, CommonServiceOptions } from '../../types'

type MonitoringIngressOptions = {
  enabled: Boolean
  subdomain: string | null
  path: string
}

export type MonitoringOptions = {
  ingress: {
    enabled: boolean
    subdomain: string | null
    prometheus: MonitoringIngressOptions
    grafana: MonitoringIngressOptions
    alertManager: MonitoringIngressOptions
  }
}

export type MonitoringInitOptions = MonitoringOptions &
  CommonServiceOptions & {
    tls: boolean
    domain: DnsDomain | DnsDomain[]
  }
