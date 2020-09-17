import { get, set } from 'object-path'

import { Release, Skaffold } from '../types'

// TODO move to ../../helm directory
export const syncHelmSkaffold = (
  skaffold: Skaffold,
  projectName: string,
  helmReleasesKey: string
): number => {
  const releases = get<Release[]>(skaffold, helmReleasesKey, [])
  let index = releases.findIndex(release => release.name === projectName)
  if (index < 0) index = releases.length
  set(skaffold, `${helmReleasesKey}.${index}.name`, projectName)
  set(skaffold, `${helmReleasesKey}.${index}.chartPath`, 'helm')
  // TODO skipBuildDependencies should be true when the helm chart is embedded to a service
  // TODO it implies to use one helm release per service - probably not ideal
  // * See https://skaffold.dev/docs/pipeline-stages/deployers/helm/
  set(skaffold, `${helmReleasesKey}.${index}.skipBuildDependencies`, false)
  return index
}
