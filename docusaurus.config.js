require('dotenv').config()
const path = require('path')

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'Contember',
	tagline: 'Contember is an open-source platform for frontend developers to build and run bespoke backends with ease.',
	url: 'https://docs.contember.com',
	baseUrl: '/',
	favicon: 'img/favicon.png',
	organizationName: 'contember',
	projectName: 'contember',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
	customFields: {
		contemberSessionToken: process.env.CONTEMBER_SESSION_TOKEN,
		contemberApiBaseUrl: process.env.CONTEMBER_API_URL,
		contemberProjectName: process.env.CONTEMBER_PROJECT_NAME,
	},
	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			prism: {
				theme: require('prism-react-renderer/themes/nightOwl'),
				additionalLanguages: ['typescript', 'json5'],
			},
			docs: {
				sidebar: {
					hideable: false,
				},
			},
			colorMode: {
				disableSwitch: true,
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
					src: 'img/contember-horizontal-blue.svg',
					srcDark: 'img/contember-horizontal-white.svg',
					href: 'http://www.contember.com/',
					target: '_self',
					style: { padding: '4px' }
				},
				items: [
					{
						to: 'https://docs.contember.com',
						label: 'Docs',
						position: 'left',
					},
					{
						to: 'https://blog.contember.com',
						label: 'Blog',
						position: 'left',
					},
					{
						to: 'https://github.com/orgs/contember/discussions',
						label: 'Support',
						position: 'left',
					},
					{
						href: 'https://github.com/contember',
						label: 'GitHub',
						position: 'right',
					},
					{
						href: 'https://www.youtube.com/@cntmbr',
						label: 'YouTube',
						position: 'right',
					},
				],
			},
			metadata: [
				{
					name: 'twitter:card',
					content: 'summary',
				},
				{
					name: 'twitter:site',
					content: '@contember',
				},
				{
					name: 'twitter:title',
					content: 'Contember',
				},
				{
					name: 'twitter:description',
					content: 'Contember is an open-source platform for frontend developers to build and run bespoke backends with ease.',
				},
				{
					name: 'twitter:image',
					content: 'https://docs.contember.com/img/contember-for-twitter.png',
				},
			],
			footer: {
				copyright: `Copyright © ${new Date().getFullYear()} Contember.com`,
			},
		}),
	presets: [
		[
			'@docusaurus/preset-classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					path: 'docs',
					routeBasePath: '/',
					editUrl: 'https://github.com/contember/doc/edit/main/',
					sidebarPath: require.resolve('./sidebars.js'),
					docLayoutComponent: '@theme/DocPage',
					docItemComponent: '@theme/DocItem',
				},
				theme: {
					customCss: [
						require.resolve('./src/index.css'),
					],
				},
				blog: false,
				pages: false,
			}),
		],
	],
	plugins: [
		path.join(__dirname, '/src/plugins/webpack-configuration-plugin'),
	]
}

module.exports = config
