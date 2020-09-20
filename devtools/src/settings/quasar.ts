import { ServiceTypeConfig } from './types'

export const quasarConfig: ServiceTypeConfig = ({ directory, name }) => {
  return {
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
    init: async () => {
      // TODO
      const quasarExtCommand =
        process.env.NODE_ENV === 'development'
          ? `yarn add -D @platyplus/quasar-app-extension-ts-lerna\nquasar ext invoke @platyplus/ts-lerna`
          : `quasar ext add @platyplus/ts-lerna`
      const script = `mkdir -p ${directory}
          cd ${directory}
          quasar create ${name}
          cd ${name}
          ${quasarExtCommand}`
      console.log(script)
    },
  }
}
