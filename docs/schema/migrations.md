---
title: Schema migrations
---

After you update your schema, you need to create a migration for your change, otherwise Contember won't see it.

There is a command to rescue you:

```bash
npm run contember migrations:diff <project> <migration name>
```

for example

```bash
npm run contember migrations:diff my-blog add-categories
```

:::note
Name of a migration can only contain alphanumeric letters and a dash
:::

Contember will show you individual migration steps and ask you for confirmation. 

You should check the steps with caution, because Contember cannot detect e.g. that you renamed a field. Instead, it drops a field and creates a new one.

If you have chosen to execute migration, you are done for now. If you haven't, you can check created `.json` file and modify migration file manually describing the change more precisely.

Now you can again verify individual migration steps using following command:
```
npm run contember migrations:describe my-blog
```

When you are happy how the migration looks, you can apply the migration using this command:

```
npm run contember migrations:execute my-blog
```

All the changes will be applied to both Contember schema and PostgreSQL database.

## Common development issues

Contember includes constraints to prevent database inconsistencies. Namely:

- you can't change content of executed migration
- you can't execute a migration, which precedes already executed migration

Therefore, you should:
- never modify or delete a migration, which has been executed on live environment
- ensure, that new migration is always last (e.g. when merging a branch)

During local development, you can bypass some of these checks, even if the migration was locally executed.

Note that all of these commands are available only on local Contember instance. 

### Amending a migration

Imagine you are developing a new feature. You've already created and applied schema migration. Later, you find you need another schema change related to the previous one.

Instead of creating a new diff, you can use `migrations:amend my-blog` command, which updates most recent migration both on disk and on local Contember instance.

Reverting a schema changes and running `migrations:amend` results in removing the migration.

You can specify a migration using `migrations:amend my-blog 2022-01-17-101806-test` to amend specific migration instead of latest.

### Rebasing a migration

Before merging a branch with a new migration, you might find, new migration appeared in an upstream. `migrations:rebase my-blog` command helps you solve this issue. Just pass names of migrations you need to merge and the command renames migrations on disk and in your local Contember instance.

### Force execution of out-of-order migrations

When you pull a code from the upstream, there might appear a new migration preceding your local migrations. To bypass this, run `migration:execute my-blog --force`

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

For not null column it might be useful to fill the column so it won't fail in a runtime.

Arguments:

- `entityName`
- `field`
- `fillValue`: a value with which a column is filled on migration run (it is different from default value which is used at runtime, but if the new column with default value is added it will be used also as `fillValue` in generated JSON migration)
- `copyValue`: a name of other column, which value will be copied to a column
