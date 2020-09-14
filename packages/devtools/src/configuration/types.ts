import { Skaffold } from '../skaffold/types'
type Service = {
  package: string
}
export type Config = {
  services: Service[]
  skaffold: Skaffold
}
