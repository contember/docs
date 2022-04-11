module.exports = {
	someSidebar: [
		{
			type: "doc",
			id: "intro/introduction",
			label: "Introduction"
		},
		{
			type: "category",
			label: "Getting Started",
			collapsed: false,
			items: [
				"intro/how-it-works",
				"intro/quickstart",
				"intro/glossary",
				"intro/cli",
			],
		},
		{
			type: "category",
			label: "Schema",
			collapsed: false,
			items: [
				"schema/overview",
				"schema/columns",
				"schema/relationships",
				"schema/migrations",
				"schema/acl",
				"schema/validations",
			],
		},
		{
			type: "category",
			label: "Content API",
			collapsed: false,
			items: [
				"content/overview",
				"content/queries",
				"content/mutations",
				"content/s3",
				"content/event-log",
			],
		},
		{
			type: "category",
			label: "Tenant API",
			collapsed: true,
			items: [
				"tenant/overview",
				"tenant/users",
				"tenant/memberships",
				"tenant/api-keys",
			],
		},
		{
			type: "category",
			label: "Guides",
			collapsed: true,
			items: [
				"guides/deploy-contember",
				"guides/self-hosted-contember",
			],
		},
		{
			type: "category",
			label: "Admin",
			collapsed: false,
			// link: {
			// 	type: 'generated-index',
			// 	title: 'Admin',
			// 	keywords: ['admin'],
				// description: "Let's learn about the most important Docusaurus concepts!",
				// image: '/img/docusaurus.png',
			// },
			items: [
				"admin/introduction",
				{
					"Components": [
						"admin/components/block",
						"admin/components/buttons",
						"admin/components/content",
						"admin/components/data-binding",
						"admin/components/data-grid",
						// "admin/components/dimensions",
						"admin/components/discrimination",
						"admin/components/field-views",
						"admin/components/form-fields",
						"admin/components/pages",
						"admin/components/references",
						"admin/components/repeaters",
						// "admin/components/routing",
						"admin/components/upload",
						// "admin/components/variables",
					],
					"UI Components": [
						"admin/components-ui/buttons",
						// "admin/components-ui/layout",
					],
					"Data Binding": [
						{
							type: 'doc',
							id: 'admin/data-binding/overview',
							label: 'Overview',
						},
						{
							type: 'doc',
							id: 'admin/writing-components',
							label: 'Custom components',
						},
						// "admin/data-binding/entity-accessor",
						"admin/data-binding/field-accessor",
						"admin/data-binding/query-language",
					],

					"Releases": [
						"admin/releases/v1.0.0",
					],
					"Theming": [
						"admin/theming/introduction",
						"admin/theming/pallettes",
					],
				}
			],
		},
		{
			type: "category",
			label: "Starter kits",
			collapsed: true,
			items: [
				"starter-kits/headless-cms",
			]
		}
	]
}
