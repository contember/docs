module.exports = {
	someSidebar: [
		{
			type: "category",
			label: "Getting Started",
			collapsed: false,
			items: [
				{
					type: "doc",
					id: "intro/introduction",
					label: "Overview",
				},
				{
					type: "doc",
					id: "intro/installation",
					label: "Installation",
				},
				{
					type: "doc",
					id: "intro/quickstart",
					label: "Designing your data model",
				},
				{
					type: "doc",
					id: "intro/graphql",
					label: "Handling data with GraphQL",
				},
				"intro/interface",
				"intro/deployment",
				"intro/how-it-works",
				"intro/glossary",
			],
		},

		{
			type: "category",
			label: "Contember Interface",
			collapsed: true,
			link: {
				type: 'generated-index',
				title: 'Interface',
			},
			items: [
				'reference/admin/introduction',
				'reference/admin/pages/defining-pages',
				'reference/admin/pages/links',
				'reference/admin/data-binding/overview',
				'reference/admin/data-binding/query-language',
				{
					type: "category",
					label: "Components",
					collapsed: true,
					items: [
						'reference/admin/components/value-rendering',
						'reference/admin/components/relationship-components',
						'reference/admin/components/inputs',
						'reference/admin/components/select-field',
						'reference/admin/components/custom-components',
					],
				},
				{
					type: "category",
					label: "Layouts",
					items: [
						'reference/admin/layouts/overview',
						'reference/admin/layouts/providers',
						'reference/admin/layouts/slots',
						'reference/admin/layouts/directives',
						'reference/admin/layouts/custom-layouts',
					],
				},
				{
					type: "category",
					label: "Theming",
					items: [
						"reference/admin/theming/introduction",
						"reference/admin/theming/pallettes",
					],
				},
				{
					type: "category",
					label: "API reference",
					items: [
						{
							type: "autogenerated",
							dirName: "reference/admin/api",
						},
					],
				},
				{
					type: "category",
					label: "Examples",
					items: [
						{
							type: "autogenerated",
							dirName: "reference/admin/examples",
						},
					],
				},
				{
					type: "category",
					label: "Releases",
					items: [
						{
							type: "autogenerated",
							dirName: "reference/admin/releases",
						},
					],
				},
			],
		},
		{
			type: "category",
			label: "Contember Engine",
			collapsed: true,
			link: {
				type: 'generated-index',
				title: 'Engine',
			},
			items: [
				{
					type: "category",
					label: "Schema",
					collapsed: true,
					items: [
						"reference/engine/schema/overview",
						"reference/engine/schema/columns",
						"reference/engine/schema/relationships",
						"reference/engine/schema/migrations",
						"reference/engine/schema/acl",
						"reference/engine/schema/validations",
					],
				},
				{
					type: "category",
					label: "Content API",
					items: [
						"reference/engine/content/overview",
						"reference/engine/content/queries",
						"reference/engine/content/mutations",
						"reference/engine/content/s3",
						"reference/engine/content/event-log",
						"reference/engine/content/transfer",
						{
							type: "category",
							label: "Advanced",
							items: [
								"reference/engine/content/advanced/assume-identity",
								"reference/engine/content/advanced/assume-membership",
								"reference/engine/content/advanced/request-debugging",
								"reference/engine/content/advanced/caching",
							]
						}
					],
				},
				{
					type: "category",
					label: "Tenant API",
					items: [
						"reference/engine/tenant/overview",
						"reference/engine/tenant/users",
						"reference/engine/tenant/memberships",
						"reference/engine/tenant/api-keys",
						"reference/engine/tenant/idp",
					],
				},
				{
					type: "category",
					label: "Actions",
					items: [
						"reference/engine/actions/overview",
						"reference/engine/actions/definition",
						"reference/engine/actions/managing",
						"reference/engine/actions/invocation",
					],
				},
			]
		},
		'reference/cli',
		{
			type: "category",
			label: "Guides",
			collapsed: true,
			link: {
				type: 'generated-index',
				title: 'Guides',
			},
			items: [
				"guides/deploy-contember",
				"guides/deploy-github-actions",
				"guides/self-hosted-contember",
				'guides/seo',
				'guides/acl-definition',
				'guides/outdated-application',
			],
		},
		{
			type: "category",
			label: "Starter kits",
			collapsed: true,
			items: [
				{
					type: "autogenerated",
					dirName: "starter-kits",
				},
			],
		},
	],
}
