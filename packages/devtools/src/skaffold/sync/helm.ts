import { get, set } from 'object-path'

import { Release, Skaffold } from '../types'

export const syncHelm = (
  skaffold: Skaffold,
  releaseName: string,
  releasesPath: string
): number => {
  const releases = get<Release[]>(skaffold, releasesPath, [])
  let index = releases.findIndex((release) => release.name === releaseName)
  if (index < 0) index = releases.length
  // const artifact = index >= 0 ? list[index] : ({} as Artifact)
  set(skaffold, `${releasesPath}.${index}.name`, releaseName)
  set(skaffold, `${releasesPath}.${index}.chartPath`, 'helm')
  return index
}
