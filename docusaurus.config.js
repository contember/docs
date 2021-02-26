const path = require('path')

module.exports = {
  title: 'Contember',
  tagline: 'The tagline of my site',
  url: 'http://localhost:2080',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'contember', // Usually your GitHub org/user name.
  projectName: 'contember', // Usually your repo name.
  themeConfig: {
    colorMode: {
      disableSwitch: true,
    },
    navbar: {
      title: '',
      logo: {
        alt: 'Contember Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          href: 'https://github.com/contember/contember',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      // style: 'dark',
      links: [
        // {
        //   title: 'Docs',
        //   items: [
        //     {
        //       label: 'Style Guide',
        //       to: 'docs/doc1',
        //     },
        //     {
        //       label: 'Second Doc',
        //       to: 'docs/doc2',
        //     },
        //   ],
        // },
        // {
        //   title: 'Community',
        //   items: [
        //     {
        //       label: 'Stack Overflow',
        //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
        //     },
        //     {
        //       label: 'Discord',
        //       href: 'https://discordapp.com/invite/docusaurus',
        //     },
        //   ],
        // },
        // {
        //   title: 'Social',
        //   items: [
        //     // {
        //     //   label: 'Blog',
        //     //   to: 'blog',
        //     // },
        //     {
        //       label: 'GitHub',
        //       href: 'https://github.com/contember',
        //     },
        //     {
        //       label: 'Twitter',
        //       href: 'https://twitter.com/contember',
        //     },
        //   ],
        // },
      ],
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
            'https://github.com/contember/doc/edit/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [path.join(__dirname, '/src/plugins/webpack-configuration-plugin')]
};
