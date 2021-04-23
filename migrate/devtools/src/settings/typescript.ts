import { execSync } from 'child_process'

import { ServiceTypeConfig } from './types'

export const typescriptConfig: ServiceTypeConfig = ({
  directory,
  name,
  absolutePath
}) => ({
  values: {
    targetPort: 3000,
    imageConfig: { tag: 'latest', pullPolicy: 'IfNotPresent' }
  },
  main: {
    build: {
      image: `${directory}-${name}`,
      context: '..',
      docker: {
        dockerfile: `${directory}/${name}/Dockerfile`
      }
    }
  },
  dev: {
    build: {
      image: `${directory}-${name}`,
      context: '..',
      docker: {
        dockerfile: `${directory}/${name}/Dockerfile-development`
      }
    },
    files: [
      {
        src: `${directory}/${name}/src/**/*.{ts,json}`,
        dest: '.'
      }
    ],
    helm: {
      setValues: {
        ingress: {
          enabled: true,
          'hosts[0].name': `${name}.localhost`
        }
      }
    }
  },
  chartName: 'standard-service',
  postInstall: async () => {
    execSync('yarn', {
      cwd: absolutePath,
      stdio: 'inherit'
    })
  }
})
