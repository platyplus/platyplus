const { getJestProjects } = require('@nrwl/jest')

module.exports = {
  projects: [
    ...getJestProjects(),
    '<rootDir>/apps/platyplus-nextjs',
    '<rootDir>/apps/platyplus-infrastructure'
  ]
}
