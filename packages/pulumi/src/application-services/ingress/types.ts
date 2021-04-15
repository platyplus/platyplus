import { DnsDomain, CommonServiceOptions } from '../../types'

export type IngressOptions = CommonServiceOptions & {
    domain: DnsDomain[]
    email?: string
  }
  