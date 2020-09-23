const { description } = require('../../package')
const glob = require('glob')
const path = require('path')

const chartReadmes = glob.sync(path.resolve('../../charts/**/README.md'))
const chartPages = chartReadmes.map((filePath) => {
  const dirs = path.dirname(filePath).split('/')
  const name = dirs[dirs.length - 1]
  return {
    name,
    path: `/charts/${name}.html`,
    filePath
  }
})

module.exports = {
  dest: './dist',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Platy DevTools',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  additionalPages: chartPages,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }
    ]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: 'platyplus/platyplus',
    editLinks: false,
    docsDir: 'devtools/web',
    editLinks: true,
    editLinkText: 'Edit this page',
    lastUpdated: false,
    smoothScroll: true,
    nav: [
      {
        text: 'Guide',
        link: '/guide/'
      },
      {
        text: 'CLI',
        link: '/cli/'
      },
      {
        text: 'Helm Charts',
        link: '/charts/'
      }
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          children: ['', 'using-vue']
        }
      ],
      '/charts/': [
        {
          title: 'Charts',
          collapsable: false,
          children: [
            ['', 'Installation'],
            ...chartPages.map((page) => [page.path, page.name])
          ]
        }
      ]
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: ['@vuepress/plugin-back-to-top', '@vuepress/plugin-medium-zoom']
}
