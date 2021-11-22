/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
	someSidebar: [
		"intro/introduction",
		{
			"Getting Started": [
				"intro/how-it-works",
				"intro/quickstart",
				"intro/glossary",
				"intro/cli"
			],
			"Schema": [
				"schema/model",
				"schema/migrations",
				"schema/acl",
				"schema/validations"
			],
			"Content API": [
				"content/overview",
				"content/queries",
				"content/mutations",
				"content/s3"
			],
			"Tenant API": [
				"tenant/overview",
				"tenant/users",
				"tenant/memberships",
				"tenant/api-keys"
			],
			// "Guides": [
			// 	"guides/deployment"
			// ],
			"Admin": [
				"admin/introduction",
				{
					"Components": [
						"admin/components/basic",
						"admin/components/button",
						"admin/components/data-binding",
						"admin/components/data-grid",
						"admin/components/editor",
						"admin/components/layout",
						"admin/components/list",
						"admin/components/page",
						"admin/components/reference",
						"admin/components/upload"
					]
				}

			]
		}

	]
}
