module.exports = {
  title: 'Platyplus',
  tagline: 'Offline-first, realtime headless CMS based on Hasura',
  url: 'https://platy.plus',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'platyplus', // Usually your GitHub org/user name.
  projectName: 'platydev', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Platyplus',
      logo: {
        alt: 'Platyplus Logo',
        src: 'img/logo.png'
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Documentation',
          position: 'left'
        },
        // TODO
        // { to: 'api', label: 'API', position: 'left' },
        // { to: 'blog', label: 'Blog', position: 'left' },
        // { to: 'demo', label: 'Demo', position: 'left' },
        // { to: 'community', label: 'Community', position: 'left' },
        {
          href: 'https://github.com/platyplus/platydev',
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
              label: 'Introduction',
              to: 'docs/guide/'
            },
            {
              label: 'Installation',
              to: 'docs/guide/'
            },
            {
              label: 'Features',
              to: 'docs/features/'
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
              href: 'https://discord.gg/AtQ5bNTQ'
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
              href: 'https://github.com/platyplus/platydev'
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Platyplus, Inc. Built with Docusaurus.`
    },
    colorMode: {
      respectPrefersColorScheme: true
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic', // ? refine ?
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          sidebarCollapsed: false,
          sidebarCollapsible: false,
          include: ['**/*.{md,mdx}'],
          editUrl:
            'https://github.com/platyplus/platydev/edit/master/apps/documentation/'
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   editUrl:
        //     'https://github.com/platyplus/platydev/edit/master/apps/documentation/blog/'
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ]
}
