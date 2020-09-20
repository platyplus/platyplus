import { ServiceTypeConfig } from '../service'

export const quasarConfig: ServiceTypeConfig = ({ directory, name }) => ({
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
        src: `${directory}/${name}/src/**/*.{ts,vue,json,sass,html}`,
        dest: '.',
      },
      {
        src: `${directory}/${name}/quasar.conf.js`,
        dest: '.',
      },
      {
        src: `${directory}/${name}/src/assets/**/*`,
        dest: '.',
      },
      {
        src: `${directory}/${name}/public/**/*`,
        dest: '.',
      },
    ],
  },
  chartName: 'simple-http',
})
