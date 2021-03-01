---
title: Schema migrations
---


After you create or modify your schema, you need to create a migration for your change, otherwise Contember won't see it.


There is a command to rescue you:
```
npm run contember migrations:diff <project> <migration name>
```
for example
```
npm run contember migrations:diff my-blog add-categories
```
> Name of a migration can only contain alphanumeric letters and a dash

This command will create a `.json` file describing changes you made.

> TIP: you can also write `npm run contember migrations:diff . batch-changes`, which generates diff for all projects in the workspace.

Now you should review the generated file, because Contember cannot detect e.g. that you renamed a field. Instead it drops a field and creates a new one. But you can manually place a modification describing the change more precisely.

You can also use a command
```
npm run contember migrations:dry-run my-blog
```
which shows you SQLs which will be executed without actually executing them. This helps you to verify that Contember correctly interprets your changes.

When you are happy how the migration looks, you can restart Contember API using
```
npm run contember instance:reload:api
```
then all the changes will be applied to both Contember schema and PostgreSQL database.

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
- `fillValue`: a value with which a column is filled on migration run (do not confuse with a default value)
- `copyValue`: a name of other column, which value will be copied to a column
