import fs from '@platyplus/fs'
import chalk from 'chalk'
import { spawn, spawnSync } from 'child_process'
import path from 'path'

import { waitFor } from '../utils'
import { ServiceTypeConfig } from './types'

export const HASURA_ADMIN_SECRET = 'development-hasura-admin-secret'

export const hasuraConfig: ServiceTypeConfig = ({ name, absolutePath }) => {
  // TODO set env variables, somehow
  // ? create a global .env file, one prod, one dev?
  // ? Add env vars in the init/postInstall() method?
  // ? Then load it when running skaffold?
  return {
    main: {
      build: {
        image: name,
        context: `${name}`
      }
    },
    dev: {
      build: {
        image: name,
        context: `${name}`
      },
      files: [
        {
          src: 'migrations/**/*',
          dest: '/hasura-migrations'
        },
        {
          src: 'metadata/*',
          dest: '/hasura-metadata'
        }
      ],
      helm: {
        setValues: {
          ingress: {
            enabled: true,
            'hosts[0].name': `${name}.localhost`
          },
          postgresql: {
            postgresqlPassword: 'development-postgres-password'
          },
          adminSecret: HASURA_ADMIN_SECRET,
          jwt: {
            key: 'long-hasura-jwt-more-than-thirty-two-characters',
            algorithm: 'HS256'
          }
        }
      }
    },
    chartName: 'hasura',
    run: async ({ address, localPort, resourceName }) => {
      await waitFor(`http://${address}:${localPort}/healthz`)
      if (!fs.pathExistsSync(path.join(absolutePath, 'config.yaml'))) {
        await fs.saveYaml(path.join(absolutePath, 'config.yaml'), {
          version: 2,
          metadata_directory: 'metadata',
          migrations_directory: 'migrations'
        })
      }
      const hasuraMigrate = spawnSync('hasura', [
        'migrate',
        'apply',
        '--admin-secret',
        HASURA_ADMIN_SECRET,
        '--endpoint',
        `http://${address}:${localPort}`,
        '--project',
        absolutePath,
        '--skip-update-check'
      ])

      hasuraMigrate.stdout
        .toString()
        .trim()
        .split('\n')
        .forEach(line =>
          console.log(
            chalk.cyan(`[hasura-cli:${resourceName}]`),
            JSON.parse(line).msg
          )
        )
      if (hasuraMigrate.error) {
        hasuraMigrate.stderr
          .toString()
          .split('\n')
          .forEach(line =>
            console.log(
              chalk.cyan(`[hasura-cli:${resourceName}]`),
              chalk.red('[error]'),
              line
            )
          )
      }

      const hasuraConsole = spawn('hasura', [
        'console',
        '--admin-secret',
        HASURA_ADMIN_SECRET,
        '--endpoint',
        `http://${address}:${localPort}`,
        '--project',
        absolutePath,
        '--skip-update-check'
      ])
      hasuraConsole.stdout.on('data', data => {
        try {
          console.log(
            chalk.cyan(`[hasura-cli:${resourceName}]`),
            JSON.parse(data.toString()).msg
          )
        } catch {
          console.log(
            chalk.cyan(`[hasura-cli:${resourceName}]`),
            data.toString()
          )
        }
      })
      hasuraConsole.stderr.on('data', data => {
        console.log(
          chalk.cyan(`[hasura-cli:${resourceName}]`),
          chalk.red('[error]'),
          data.toString()
        )
      })
    }
  }
}
