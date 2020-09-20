import { ServiceTypeConfig } from './types'

export const tsNodeConfig: ServiceTypeConfig = ({ directory, name }) => ({
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
})
