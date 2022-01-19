module.exports = {
	someSidebar: [
		"intro/introduction",
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
			label: "Admin",
			collapsed: false,
			items: [
				"admin/introduction",
				{
					"Components": [
						"admin/components/basic",
						"admin/components/buttons",
						"admin/components/collection",
						"admin/components/data-binding",
						"admin/components/data-grid",
						// "admin/components/editor",
						// "admin/components/layout",
						"admin/components/page",
						"admin/components/reference",
						"admin/components/select",
						"admin/components/upload",
					],
					"Data Binding": [
						// "admin/data-binding/entity-accessor",
						"admin/data-binding/field-accessor",
						"admin/data-binding/query-language",
					],
					"Releases": [
						"admin/releases/v0.8.0-alpha.7",
					]
				}
			],
		},
	]
}
