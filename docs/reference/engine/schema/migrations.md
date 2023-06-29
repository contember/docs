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

During local development, there may be a need to bypass certain checks, even if the migration has already been executed locally. This section details several commands that provide flexibility and control over your local migration process.

Please be aware that these commands are available exclusively on your local Contember instance and are not meant for production environments.

### Amending a Migration

While developing a new feature, you might find yourself needing to adjust an already created and applied schema migration. Instead of creating an entirely new diff, you can utilize the `migrations:amend` command. This command allows you to update the most recent migration both on disk and in your local Contember instance. If you revert the schema changes and run `migrations:amend`, the command effectively removes the migration.

#### Example: Amending Latest Migration

```bash
npm run contember migrations:amend
```

#### Example: Amending Specific Migration

You can target a specific migration to amend by providing an additional argument, as shown below:

```bash
npm run contember migrations:amend 2022-01-17-101806-test
```

:::note
If the migration has already been run by someone else or it's been deployed, it won't be possible to execute the amended migration.
:::

### Rebasing a Migration with `migrations:rebase`

Before merging a branch with a new migration, you might find that a new migration has been added upstream. The `migrations:rebase` command assists in resolving this by renaming the migrations both on disk and in your local Contember instance. Simply pass the names of the migrations you need to merge.

#### Example

```bash
npm run contember migrations:rebase 2022-01-17-101806-test
```

### Force Execution of Out-of-Order Migrations

When you pull code from upstream, there may be a new migration that precedes your local migrations. To bypass this, you can run the `migrations:execute` command with the `--force` flag.

#### Example: Force Executing

```bash
npm run contember migrations:execute --force
```

### <span className="version">Engine 1.3+</span> Executing Migrations Until a Specific Point with `--until`

In your development process, you might need to run a series of migrations up to a certain point. The `migrations:execute` command now allows you to use the `--until` flag for this purpose. This option executes all migrations up to and including the specified migration.

#### Example: Executing Until a Specific Migration

```bash
npm run contember migrations:execute --until 2022-01-17-101806-test
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

```json5
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
  /* highlight-start */
  "fillValue": false
  /* highlight-end */
}
```

#### <span className="version">Engine 1.3+</span> `updateColumnDefinition` modification and `copyValue`/`fillValue`

The `updateColumnDefinition` modification allows you to modify the definition of an existing column within an entity. When changing a column to disallow null values, you can make use of the following options:

- **fillValue**: Specifies a value that will be used to fill the column during the migration run. This option proves useful in populating the modified column with meaningful data when the nullability constraint is enforced.

- **copyValue**: Indicates the name of another column from which the value will be copied to the modified column.

**Example:**

```json5
{
  "modification": "updateColumnDefinition",
  "entityName": "Article",
  "fieldName": "isPublished",
  "definition": {
    "columnType": "boolean",
    "nullable": false,
    "type": "Bool"
  },
  /* highlight-start */
  "copyValue": "existingColumn"
  /* highlight-end */
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

```json5
{
  "modification": "updateFieldName",
  "entityName": "Entity",
  "fieldName": "oldField",
  "newFieldName": "newField",
  "columnName": "new_field"
}
```

In this example, the field named "OldField" within the entity "Entity" will be renamed to "NewField" using the `updateFieldName` modification.

## <span className="version">Engine 1.2+</span> Skipping validation errors

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

### <span className="version">Engine 1.3+</span> `skipUntil`

In each error object, you can specify a `skipUntil` allowing to skip given validation until a specificed migration. This feature is useful when more migrations becomes invalid due to changes in the validator or data structure.

Example:

```json5
{
  "skippedErrors": [
    {
      "code": "ACL_INVALID_CONDITION",
      "path": "roles.reader.entities.ContentReference.predicates.test",
      /* highlight-start */
      "skipUntil": "2023-07-01-101530-abcd"
      /* highlight-end */
    }
  ],
  "formatVersion": 3,
  "modifications": [
    // Modifications here...
  ]
}
```

In the above example, the "ACL_INVALID_CONDITION" error is ignored for a specific predicate in the ContentReference entity for the reader role. Additionally, subsequent validations will be skipped until the migration `2023-07-01-101530-abcd`.
