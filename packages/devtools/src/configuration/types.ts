import { Skaffold } from '../skaffold/types'
type Service = {
  package: string
}
export type Config = {
  name?: string
  services: Service[]
  skaffold: Skaffold
}
