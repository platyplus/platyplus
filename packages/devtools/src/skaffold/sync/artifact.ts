import { get, set } from 'object-path'

import { Service } from '../../service'

import { Artifact, Skaffold } from '../types'

export const syncArtifact = (
  skaffold: Skaffold,
  service: Service,
  listPath: string
): number => {
  const list = get<Artifact[]>(skaffold, listPath, [])
  const { directory, name } = service
  const image = `${directory}-${name}`
  let index = list.findIndex((artifact) => artifact.image === image)
  if (index < 0) index = list.length
  set(skaffold, `${listPath}.${index}.image`, image)
  set(skaffold, `${listPath}.${index}.context`, '..')
  return index
}
