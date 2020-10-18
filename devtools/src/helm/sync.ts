import fs from '@platyplus/fs'
import chalk from 'chalk'
import { set } from 'object-path'
import path from 'path'

import { DevToolsConfig } from '../project'
import { DEFAULT_WORKING_DIR } from '../settings'
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
  const helmValuesFile = path.join(helmDirectory, 'values.yaml')
  const helmValues = await fs.loadYaml<Record<string, unknown>>(
    helmValuesFile,
    { traefik: { enabled: false } }
  )

  yamlChart.description = config.description
  yamlChart.name = config.name

  // TODO required to rebuild dependencies when skipBuildDependencies = false
  // * See https://skaffold.dev/docs/pipeline-stages/deployers/helm/
  await fs.remove(path.join(helmDirectory, 'Chart.lock'))
  await fs.remove(path.join(helmDirectory, 'requirements.lock'))

  // * Add Traefik Helm Chart. Disable by default
  let traefikIndex = yamlChart.dependencies.findIndex(
    (cursor) => cursor.name === 'traefik'
  )
  if (traefikIndex < 0) traefikIndex = yamlChart.dependencies.length
  set(yamlChart, `dependencies.${traefikIndex}`, {
    name: 'traefik',
    version: 'v8.9.1',
    repository: 'https://containous.github.io/traefik-helm-chart',
    condition: 'traefik.enabled'
  })

  for (const service of config.services) {
    if (!service.type) throw Error(`${service.name}: no service type`)
    if (!service.config) throw Error(`${service.name}: no config`)
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
    }

    if (service.config.values) {
      set(helmValues, service.name, service.config.values)
    }
    set(helmValues, `${service.name}.enabled`, true)
    if (service.route) {
      set(helmValues, `${service.name}.ingress.enabled`, true)
    }
    const chartName = service.config.chartName
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
        set(yamlChart, `dependencies.${index}.name`, service.name)
        set(
          yamlChart,
          `dependencies.${index}.repository`,
          `file://${service.pathToRoot}/${service.directory}/${service.name}/helm`
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
  await fs.saveYaml(helmValuesFile, helmValues)
}
