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
			items: [
				"admin/introduction",
				{
					"Components": [
						"admin/components/blocks",
						"admin/components/buttons",
						"admin/components/data-binding",
						"admin/components/data-grid",
						// "admin/components/dimensions",
						// "admin/components/discrimination",
						"admin/components/editor",
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
				}
			],
		},
		{
			type: "category",
			label: "Templates",
			collapsed: true,
			items: [
				"templates/headless-cms",
			]
		}
	]
}
