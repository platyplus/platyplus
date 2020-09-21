import { execSync } from 'child_process'

import { ServiceTypeConfig } from './types'

export const typescriptConfig: ServiceTypeConfig = ({
  directory,
  name,
  location,
}) => ({
  main: {
    build: {
      image: `${directory}-${name}`,
      context: '..',
      docker: {
        dockerfile: `${directory}/${name}/Dockerfile`,
      },
    },
  },
  dev: {
    build: {
      image: `${directory}-${name}`,
      context: '..',
      docker: {
        dockerfile: `${directory}/${name}/Dockerfile-development`,
      },
    },
    files: [
      {
        src: `${directory}/${name}/src/**/*.{ts,json}`,
        dest: '.',
      },
    ],
  },
  chartName: 'simple-http',
  postInstall: async () => {
    execSync('yarn', {
      cwd: location,
      stdio: 'inherit',
    })
  },
})
