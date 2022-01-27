---
title: Permissions and ACL
---

Contember provides easy way to define access rules for your data by saying which role can access which field. Using this you can create complex rules across entity relationships on a cell level.

## Operations

Contember distinguish four types of operations:

- read
- create
- update
- delete

You can define rules for each operation independently, so you can e.g. say that user can create something but he cannot edit it later (or even you can say he can edit it only under certain circumstances).

## Variable

Variable is a value associated with a _role_ injected to a _predicate_ when the predicate is evaluated.

### Entity variable

Entity variables are stored in Tenant API within a [membership](tenant/memberships.md). Usually some kind of dimension by which you split your data - e.g. a site or a language, or even a category.

```typescript
const variables = {
	language_id: {
		type: Acl.VariableType.entity,
		entityName: "Language",
	},
};
```

### Predefined variables

Currently, there are two predefined variables - `identityID` with an ID of identity associated with current request and `personID` with ID of person. `personID` will be empty if the request is executed with token which is not associated with a person.

```typescript
const variables = {
	identity_id: {
		type: Acl.VariableType.predefined,
		value: 'identityID',
	}
}
```

## Predicates

Before you set a rule to a field, you have to define a predicate on an entity - or you can use the most simple predicate `true`, which always allows given operation.

Predicates definition is similar to a syntax you use for [filtering a data](content/queries.md#filters). Lets say you have entities _Language_ and _Post_. And of course a relationship between them. And you only want to allow editors to edit a post in their language. A predicate definition, which references the variable `language_id`, may look like this:

```typescript
const postEntityPredicates = {
	languagePredicate: {
		language: {
			id: "language_id",
		},
	},
};
```

## Rules

Now you have the predicate defined, so you can set rules on each field of the entity.

```typescript
const postEntityOperations = {
	read: {
		title: true,
	},
	update: {
		title: "languagePredicate",
	},
	create: {
		title: "languagePredicate",
	},
	delete: false,
};
```

> Note that for a "delete" operation you can't set rules on each field, because you are deleting a row as a whole.

This definition says that user can read a title of any post, can create or edit a post in his language and cannot delete any post.

You don't have to define a rule for `id` field, because it is automatically computed from other fields.

## Roles

Role contains set of rules for individual entities and their fields. Putting it all together, a role definition may look like this:

```typescript
const editorRole = {
	variables: variables,
	entities: {
		Post: {
			predicates: postEntityPredicates,
			operations: postEntityOperations,
		},
	},
};
```

<!--
Beside already described fields there is also a field called stage, which references to a [content stage](content/staging.md). You can define a role to be applicable in any stage by putting a `'*'` or you can set a array of particular stages (e.g. `['live', 'draft']`)
-->

## Role inheritance

A role can inherit rules of other role (or multiple roles) and extend it. It is not possible to deny a permission, which a role, you inherit from, grants. Resulting rules are merged using "or" operator.

If you assign multiple roles to an identity, it is merged in the exactly same way.

#### Example: extending a role

```typescript
const editorRole = {
	// ...
  inherits: ['user'],  
}
```

## Tenant permissions

Here, you can also setup [Tenant API] permissions for a role. It is done under the `tenant` field of the role.

### Invite permissions

By setting `invite` to `true` you can allow a user to invite other users. Keep in mind, you also need to set appropriate [manage permissions](#manage-permissions) for the role.

There is also `unmanagedInvite` flag, which allows you to invite users using `unmanagedInvite` mutation.

#### Example: enabling invite

```typescript
const editorRole = {
	// ...
	tenant: {
		invite: true,
	},
}
```

### Manage permissions

Defines which other roles and their variables a user can manage. First you define a role, which you want to manage as a object key:

```typescript
const editorRole = {
	// ...
	tenant: {
		manage: {
			editor: {
				// ...
			},
		},
	},
}
```

With this, you would be able to manage users with the role `editor`, but not their variables.

To allow managing all variable, just pass `variables: true`,

```typescript
const editorRole = {
	// ...
	tenant: {
		manage: {
			editor: {
				variables: true,
			},
		},
	},
}
```

To granularly define which variables a user can manage, you can pass an object with variable names as keys and either `true` or source variable name as a value.

```typescript
const editorRole = {
	// ...
	tenant: {
		manage: {
			editor: {
				variables: {
					language: true,
					site: 'assignable_site',
				},
			},
		},
	},
}
```

This would allow a user manage `editor` role and assign any value to `language` variable. For `site` variable, user can only assign values from his own `assignable_site` source variable.


## System API permissions

You can also set some flags affecting system API.

### [History API](/content/event-log.md)

By setting `history` flag under `system` section to `true` you can allow a user to access the history API.

```typescript
const editorRole = {
	// ...
	system: {
		history: true,
	}
}
```
:::caution
Allowing history API access will allow user to access all the data in history API, ignoring entity rules.
:::

### Migrations

Allow a role to run [migrations](migrations.md). Project admin (and superadmin) can always run migrations. Also, there is a default `deployer` role with this and only permission.

```typescript
const editorRole = {
  // ...
  system: {
    migrations: true,
  }
}
```

### Assume identity

By setting `assumeIdentity` flag to `true` you can allow a user to use `x-contember-assume-identity`. Identity ID passed in this header will be written in event log instead of the current user identity.

```typescript
const editorRole = {
  // ...
  system: {
    assumeIdentity: true,
  }
}
```

```http request
X-Contember-Assume-Identity: 78e1c76f-2c09-4340-8d59-04a14ff86dac
```


<!--
## ACL builder

TODO

## ACL evaluation

TODO

-->

## S3 ACL

Contember S3 integration has a dedicated ACL definition - for mode details see [S3 chapter](content/s3.md).
