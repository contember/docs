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
    disableDarkMode: true,
    navbar: {
      title: 'Contember',
      logo: {
        alt: 'Contember Logo',
        src: 'img/logo.png',
      },
      links: [
        // {to: 'docs/intro/how-it-works', label: 'Docs', position: 'left'},
        // {to: 'blog', label: 'Blog', position: 'left'},
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
        {
          title: 'Social',
          items: [
            // {
            //   label: 'Blog',
            //   to: 'blog',
            // },
            {
              label: 'GitHub',
              href: 'https://github.com/contember',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/contember',
            },
          ],
        },
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
          // editUrl:
          //   'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [path.join(__dirname, '/src/plugins/webpack-configuration-plugin')]
};
