import fs from '@platyplus/fs'
import chalk from 'chalk'
import { set } from 'object-path'
import path from 'path'

import { DevToolsConfig } from '../project'
import { DEFAULT_WORKING_DIR, serviceTypesConfig } from '../settings'
import { HelmChart } from './types'

const defaults = (config: DevToolsConfig): HelmChart => ({
  apiVersion: 'v2',
  description: config.description,
  name: config.name,
  version: '0.0.1', //TODO
  appVersion: '1.0', //TODO
  dependencies: []
})

// TODO required to rebuild dependencies when skipBuildDependencies = false
// * See https://skaffold.dev/docs/pipeline-stages/deployers/helm/
const cleanDependencies = async (helmDirectory: string, chartName: string) => {
  const glob = fs.glob.sync(
    path.join(helmDirectory, `charts/${chartName}*.tgz`)
  )
  glob.forEach((f) => fs.removeSync(f))
}

export const syncHelmChart = async (config: DevToolsConfig): Promise<void> => {
  console.log(chalk.green(`Syncing ${config.directory}/helm/Chart.yaml...`))
  const helmDirectory = path.join(DEFAULT_WORKING_DIR, config.directory, 'helm')
  const helmChartFile = path.join(helmDirectory, 'Chart.yaml')
  const yamlChart = await fs.loadYaml<HelmChart>(
    helmChartFile,
    defaults(config)
  )
  yamlChart.description = config.description
  yamlChart.name = config.name

  // TODO required to rebuild dependencies when skipBuildDependencies = false
  // * See https://skaffold.dev/docs/pipeline-stages/deployers/helm/
  await fs.remove(path.join(helmDirectory, 'Chart.lock'))
  for (const service of config.services) {
    if (!service.type) throw Error(`${service.name}: no service type`)
    let index = yamlChart.dependencies.findIndex((cursor) =>
      cursor.alias
        ? cursor.alias === service.name
        : cursor.name === service.name
    )
    if (index < 0) index = yamlChart.dependencies.length
    set(yamlChart, `dependencies.${index}.name`, service.name)
    set(yamlChart, `dependencies.${index}.version`, '*') // ? not ideal
    if (!yamlChart.dependencies[index].condition) {
      yamlChart.dependencies[index].condition = `${service.name}.enabled`
      // TODO write `${service.name}.enabled` = true in values.yaml ? Or in the dev section of skaffold.yaml?
    }

    const chartName = serviceTypesConfig[service.type](service).chartName
    await cleanDependencies(helmDirectory, chartName)
    const chartPath = path.join(helmDirectory, 'charts', service.name)
    if (!(await fs.pathExists(chartPath))) {
      const embeddedChartToServicePath = path.join(
        DEFAULT_WORKING_DIR,
        service.directory,
        service.name,
        'helm'
      )
      if (await fs.pathExists(embeddedChartToServicePath)) {
        set(yamlChart, `dependencies.${index}.name`, 'helm')
        set(
          yamlChart,
          `dependencies.${index}.repository`,
          `file://../${service.directory}/${service.name}`
        )
      } else {
        set(yamlChart, `dependencies.${index}.alias`, service.name)
        set(yamlChart, `dependencies.${index}.name`, chartName)
        if (process.env.NODE_ENV === 'development') {
          set(
            yamlChart,
            `dependencies.${index}.repository`,
            `file://${service.pathToRoot}/charts/${chartName}`
          )
        } else {
          set(
            yamlChart,
            `dependencies.${index}.repository`,
            'https://charts.platy.dev'
          )
        }
      }
    }
  }
  await fs.saveYaml(helmChartFile, yamlChart)
}
