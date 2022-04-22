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
			],
		},
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
				"guides/self-hosted-contember",
				'guides/writing-components',
			],
		},
		{
			type: "category",
			label: "Reference",
			collapsed: false,
			items: [
				{
					type: "category",
					label: "Admin",
					collapsed: false,
					items: [
						'reference/admin/introduction',
						{
							type: "category",
							label: "Components",
							items: [
								{
									type: "autogenerated",
									dirName: "reference/admin/components",
								},
							],
						},
						{
							type: "category",
							label: "UI components",
							items: [
								{
									type: "autogenerated",
									dirName: "reference/admin/components-ui",
								},
							],
						},
						{
							type: "category",
							label: "Data binding",
							items: [
								{
									type: "autogenerated",
									dirName: "reference/admin/data-binding",
								},
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
					label: "Engine",
					collapsed: false,
					link: {
						type: 'generated-index',
						title: 'Engine',
					},
					items: [
						{
							type: "category",
							label: "Schema",
							collapsed: false,
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
							],
						},
					]
				},
				'reference/cli',
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
