const path = require('path')

module.exports = {
  title: 'Contember',
  tagline: 'Fast and straightforward way to build apps that just work',
  url: 'https://docs.contember.com',
  baseUrl: '/',
  favicon: 'img/contember-logo.png',
  organizationName: 'contember', // Usually your GitHub org/user name.
  projectName: 'contember', // Usually your repo name.
  themeConfig: {
    prism: {
      theme: require('prism-react-renderer/themes/nightOwl'),
      additionalLanguages: ['typescript'],
    },
    colorMode: {
      disableSwitch: false,
    },
    navbar: {
      title: '',
      logo: {
        alt: 'Contember Logo',
        src: 'img/contember-logotype.svg',
        href: 'http://www.contember.com/',
        target: '_self'
      },
      items: [
        {
          href: 'https://github.com/contember',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} Contember.com. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          editUrl:
            'https://github.com/contember/doc/edit/main/',
        },
        theme: {
          customCss: [require.resolve('./src/index.css')],
        },
        blog: false,
        pages: false,
      },
    ],
  ],
  plugins: [
    path.join(__dirname, '/src/plugins/webpack-configuration-plugin')
  ]
}
