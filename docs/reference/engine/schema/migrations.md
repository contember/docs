---
title: Schema migrations
---

Schema migrations are JSON files gradually describing project schema changes - e.g. new entities or ACL updates. 

## Basic commands


### Creating a diff using `migrations:diff`

After you update your schema, you need to create a migration for your change, otherwise Contember won't see it.

There is a command to rescue you:

```bash
npm run contember migrations:diff <project> <migration name>
```


#### Example: creating a diff

```bash
npm run contember migrations:diff my-blog add-categories
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
npm run contember migrations:describe my-blog
```

### Executing migrations using `migrations:execute`

If you've pulled new migrations from upstream, or you want to execute a migration, you've created, you can apply all pending migrations using `migrations:execute`


#### Example: executing migrations

```bash
npm run contember migrations:execute my-blog
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

Instead of creating a new diff, you can use `migrations:amend my-blog` command, which updates most recent migration both on disk and on local Contember instance.

Reverting a schema changes and running `migrations:amend` results in removing the migration.



#### Example: amending latest migration
```bash
npm run contember migrations:amend my-blog
```

#### Example: amending specific migration

You can specify a migration to amend using additional argument.

```bash
npm run contember migrations:amend my-blog 2022-01-17-101806-test
```

:::note 
If someone else has already run the migration, or it's deployed it won't be possible to execute the amended migration.
:::

### Rebasing a migration using `migrations:rebase`

Before merging a branch with a new migration, you might find that a new migration appeared in an upstream. `migrations:rebase my-blog` command helps you solve this issue. Just pass names of migrations you need to merge and the command renames migrations on disk and in your local Contember instance.

#### Example
```bash
npm run contember migrations:rebase my-blog 2022-01-17-101806-test
```

### Force execution of out-of-order migrations

When you pull a code from the upstream, there might appear a new migration preceding your local migrations. To bypass this, you can run `migrations:execute` command with `--force` flag.

#### Example: force executing
```bash
npm run contember migrations:execute my-blog --force
```

## Writing or fixing migrations manually

Usually you don't write migrations from scratch, but sometimes you may want to fix or tweak generated migration. If you open a generated `.json` migration file you will see a list of "modifications". Here are some modifications you will probably use if you edit migration file manually:

### `updateEntityName`

If you rename an entity, Contember will create a migration which drops an old entity and creates a new one. Using this modification you can say Contember to just rename an existing entity.

Arguments:

- `entityName`
- `newEntityName`

### `updateFieldName`

This is similar to `updateEntityName` modification, but on a field level.

Arguments:

- `entityName`
- `fieldName`
- `newFieldName`

### `createColumn`

For not null column it might be useful to fill the column, so it won't fail in a runtime.

Arguments:

- `entityName`
- `field`
- `fillValue`: a value with which a column is filled on migration run (it is different from default value which is used at runtime, but if the new column with default value is added it will be used also as `fillValue` in generated JSON migration)
- `copyValue`: a name of other column, which value will be copied to a column
