const path = require('path')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Contember',
  tagline: 'Fast and straightforward way to build apps that just work',
  url: 'https://docs.contember.com',
  baseUrl: '/',
  favicon: 'img/contember-logo.png',
  organizationName: 'contember',
  projectName: 'contember',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      prism: {
        theme: require('prism-react-renderer/themes/nightOwl'),
        additionalLanguages: ['typescript'],
      },
      colorMode: {
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      algolia: {
        appId: 'J1HMGG24O1',
        apiKey: 'efb29dbb8730f33e7525ec6375ffc60d',
        indexName: 'docs-contember',
        contextualSearch: true,
      },
      navbar: {
        title: '',
        logo: {
          alt: 'Contember Logo',
          src: 'img/contember-logotype.svg',
          srcDark: 'img/contember-logotype-dark.svg',
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
    }),
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
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
        contextualSearch: true,
      }),
    ],
  ],
  plugins: [
    path.join(__dirname, '/src/plugins/webpack-configuration-plugin'),
  ]
}

module.exports = config
