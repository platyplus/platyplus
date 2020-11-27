import { getService } from '../service'
import { listProjects } from './list'
import { ProjectConfig } from './types'

export const getProject = async (name: string): Promise<ProjectConfig> => {
  const list = await listProjects()
  const result = list.find((project) => project.name === name)
  if (!result) throw Error(`No '${name}' project found in the monorepo.`)

  result.services = await Promise.all(
    result.services.map(async ({ package: p }) => await getService(p))
  )

  return result
}
