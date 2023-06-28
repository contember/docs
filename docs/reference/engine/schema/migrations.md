---
title: Schema migrations
---

Schema migrations are JSON files gradually describing project schema changes - e.g. new entities or ACL updates. 

## Basic commands


### Creating a diff using `migrations:diff`

After you update your schema, you need to create a migration for your change, otherwise Contember won't see it.

There is a command to rescue you:

```bash
npm run contember migrations:diff <migration name>
```


#### Example: creating a diff

```bash
npm run contember migrations:diff add-categories
```

:::note
Name of a migration can only contain alphanumeric letters and a dash
:::

Contember will show you individual migration steps and ask you for confirmation. 

You should check the steps with caution, because Contember cannot detect some changes correctly and it may result in a loss of your data. For example when you rename a field it drops the field and creates a new one.

If you have chosen to execute migration, you are done for now. If you haven't, you can check created `.json` file and modify migration file manually describing the change more precisely.

### Explaining a migration using `migrations:describe`

You can again verify individual migration steps using `migrations:describe`. You can use `--sql-only` and `--no-sql` to alter output of the command.

#### Example: explaining migrations steps
```bash
npm run contember migrations:describe
```

### Executing migrations using `migrations:execute`

If you've pulled new migrations from upstream, or you want to execute a migration, you've created, you can apply all pending migrations using `migrations:execute`


#### Example: executing migrations

```bash
npm run contember migrations:execute
```

All the changes will be applied to both Contember schema and PostgreSQL database.

:::note
To execute migrations, you need [appropriate permissions](acl.md#migrations).
:::

## Migration constraints

Contember includes constraints to prevent database inconsistencies. Namely:

- you can't change content of executed migration
- you can't execute a migration, which precedes already executed migration

Therefore, you should:
- never modify or delete a migration, which has been executed on live environment,
- ensure, that new migration is always last (e.g. when merging a branch).

## Commands for development


During local development, you can bypass some of these checks, even if the migration was locally executed.

Note that all of these commands are available only on local Contember instance and not in production environments. 

### Amending a migration

Imagine you are developing a new feature. You've already created and applied schema migration. Later, you find you need another schema change related to the previous one.

Instead of creating a new diff, you can use `migrations:amend` command, which updates most recent migration both on disk and on local Contember instance.

Reverting a schema changes and running `migrations:amend` results in removing the migration.



#### Example: amending latest migration
```bash
npm run contember migrations:amend
```

#### Example: amending specific migration

You can specify a migration to amend using additional argument.

```bash
npm run contember migrations:amend 2022-01-17-101806-test
```

:::note 
If someone else has already run the migration, or it's deployed it won't be possible to execute the amended migration.
:::

### Rebasing a migration using `migrations:rebase`

Before merging a branch with a new migration, you might find that a new migration appeared in an upstream. `migrations:rebase` command helps you solve this issue. Just pass names of migrations you need to merge and the command renames migrations on disk and in your local Contember instance.

#### Example
```bash
npm run contember migrations:rebase 2022-01-17-101806-test
```

### Force execution of out-of-order migrations

When you pull a code from the upstream, there might appear a new migration preceding your local migrations. To bypass this, you can run `migrations:execute` command with `--force` flag.

#### Example: force executing
```bash
npm run contember migrations:execute --force
```

## Writing or fixing migrations manually

Typically, you won't need to write migrations from scratch, but there may be occasions when you need to fine-tune or rectify a generated migration. When you open a generated `.json` migration file, you'll find a list of "modifications" that describe the changes made to your database schema. In such cases, you can manually adjust these modifications to tailor your migrations to specific requirements. Below are the available manual adjustments you can make to migrations.

### `fillValue` and `copyValue` support

In Contember, migrations can be manually adjusted or fixed when needed. When working with migrations, you may encounter two modifications, `createColumn` and `updateColumnDefinition`, which now support the `fillValue` and `copyValue` features. These options allow you to provide values during the migration process for added columns or modified columns that have been changed to disallow null values.

#### `createColumn` modification and `copyValue`/`fillValue`

The `createColumn` modification enables the addition of a new column to an entity. When creating a column that does not allow null values, you can utilize the following options:

- **fillValue**: Specifies a value that will be used to fill the column during the migration run. This value is distinct from the default value used at runtime. If a new column with a default value is added, the default value will also be used as the fillValue in the generated JSON migration.

- **copyValue**: Indicates the name of another column from which the value will be copied to the newly created column.

**Example:**

```json
{
	"modification": "createColumn",
	"entityName": "Article",
	"field": {
		"name": "isPublished",
		"columnName": "is_published",
		"columnType": "boolean",
		"nullable": false,
		"type": "Bool"
	},
	"fillValue": false
}
```

#### <span className="version">Engine 1.3+</span> `updateColumnDefinition` modification and `copyValue`/`fillValue`

The `updateColumnDefinition` modification allows you to modify the definition of an existing column within an entity. When changing a column to disallow null values, you can make use of the following options:

- **fillValue**: Specifies a value that will be used to fill the column during the migration run. This option proves useful in populating the modified column with meaningful data when the nullability constraint is enforced.

- **copyValue**: Indicates the name of another column from which the value will be copied to the modified column.

**Example:**

```json
{
	"modification": "updateColumnDefinition",
	"entityName": "Article",
	"fieldName": "isPublished",
	"definition": {
		"columnType": "boolean",
		"nullable": false,
		"type": "Bool"
	},
	"copyValue": "existingColumn"
}
```

In this example, the value from an existing column named "existingColumn" will be copied to the modified column "isPublished" during the migration run.

### Renaming Entities

In Contember, renaming an entity involves creating a migration that drops the old entity and creates a new one. However, with the `updateEntityName` modification, you can instruct Contember to simply rename an existing entity without recreating it.

**Arguments:**

- **entityName**: The current name of the entity.
- **newEntityName**: The desired new name for the entity.
- **tableName**: You can optionally also change the name of the database table.

**Example:**

```json
{
	"modification": "updateEntityName",
	"entityName": "OldEntity",
	"newEntityName": "NewEntity",
	"tableName": "new_entity"
}
```

In this example, the entity named "OldEntity" will be renamed to "NewEntity" using the `updateEntityName` modification. Also, the table in database will be renamed to `new_entity`

### Renaming Fields

Similar to the `updateEntityName` modification, the `updateFieldName` modification allows you to rename a field within an entity.

**Arguments:**

- **entityName**: The name of the entity containing the field.
- **fieldName**: The current name of the field.
- **newFieldName**: The desired new name for the field.
- **columnName**: You can optionally change the name of the field in a database.

**Example:**

```json
{
	"modification": "updateFieldName",
	"entityName": "Entity",
	"fieldName": "oldField",
	"newFieldName": "newField",
	"columnName": "new_field"
}
```

In this example, the field named "OldField" within the entity "Entity" will be renamed to "NewField" using the `updateFieldName` modification.

### Skipping validation errors

The `skippedErrors` feature in Contember allows users to specify a list of errors that should be ignored during validation of a migration. This can be useful in cases where a migration became invalid due to improvements and new checks in validator, but cannot be changed, because it is already applied.

To skip errors, open a migration file producing errors and add `skippedErrors` field. It is an array of objects, each of which contains a code and a path field. The code field specifies the error code, and the path field specifies the path to the element in the migration that caused the error. Path field is optional.

It is important to note that only individual migrations can have skipped errors, and the final migrated state must be valid. This means that any errors that are skipped in one migration must be fixed in a later migration in order for the migration process to be successful.

#### Example:

```json5
{
  "skippedErrors": [
    {
      "code": "ACL_INVALID_CONDITION",
      "path": "roles.reader.entities.ContentReference.predicates.test"
    }
  ],
  "formatVersion": 3,
  "modifications": [
    // Modifications here...
  ]
}
```
In this example, the `ACL_INVALID_CONDITION` error will be ignored for the test predicate in the ContentReference entity for the reader role.

