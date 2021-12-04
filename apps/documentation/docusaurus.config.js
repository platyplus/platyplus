// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Platyplus',
  tagline: 'Low-code, offline-first apps with Hasura',
  url: 'https://platy.plus',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'platyplus', // Usually your GitHub org/user name.
  projectName: 'platyplus', // Usually your repo name.
  plugins: [],
  themeConfig: {
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    navbar: {
      title: 'Platyplus',
      logo: {
        alt: 'Logo',
        src: 'img/logo.png'
      },
      items: [
        {
          to: 'docs/',
          activeBaseRegex: `docs/(?!artifacts)`,
          label: 'Documentation',
          position: 'left'
        },
        {
          to: 'docs/artifacts/',
          activeBasePath: 'docs/artifacts',
          label: 'Packages & Artifacts',
          position: 'left'
        },
        {
          href: 'https://github.com/platyplus/platyplus',
          label: 'GitHub',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learn',
          items: [
            {
              label: 'Installation',
              to: 'docs/guide/'
            },
            {
              label: 'Comparison',
              to: 'docs/comparison'
            },
            {
              label: 'Roadmap',
              to: 'docs/roadmap'
            }
          ]
        },
        {
          title: 'Community',
          items: [
            // {
            //   label: 'Stack Overflow',
            //   href: 'https://stackoverflow.com/questions/tagged/platyplus'
            // },
            {
              label: 'Discord',
              href: 'https://discord.gg/4N3CRmTK'
            }
            // {
            //   label: 'Twitter',
            //   href: 'https://twitter.com/docusaurus'
            // }
          ]
        },
        {
          title: 'More',
          items: [
            // {
            //   label: 'Blog',
            //   to: 'blog'
            // },
            {
              label: 'GitHub',
              href: 'https://github.com/platyplus/platyplus'
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Platyplus, Inc.`
    },
    colorMode: {
      respectPrefersColorScheme: true
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme
    },
    gtag: {
      trackingID: 'G-T91DF6PF81'
      // Champs facultatifs.
      // anonymizeIP: true // Les IP doivent-elles être anonymisées ?
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          sidebarCollapsed: false,
          sidebarCollapsible: true,
          include: ['**/*.{md,mdx}'],
          editUrl:
            'https://github.com/platyplus/platyplus/edit/master/apps/documentation/'
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   editUrl:
        //     'https://github.com/platyplus/platyplus/edit/master/apps/documentation/blog/'
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ]
}

module.exports = config
