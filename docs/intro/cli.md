---
title: CLI
---

There is a command line tool, which helps you with developing Contember projects and running them.

Run it without any args to see a help
```text
npm run contember
``` 
Which will print the available commands
```text
Contember CLI version X.Y.Z
Usage: <command> <command args>
	instance:configure [instanceName] [--host <value> [... --host <value>]] [--ports <value>] - Configures Contember instance by creating and/or updating local configs.
	instance:create <instanceName> [--template <value>] - Creates a new Contember instance
	instance:down [instanceName] - Stops local Contember instance
	instance:info [instanceName] - Show status of local Contember instance
	instance:logs [instanceName] [--tail [value]] - Show Contember instance logs
	instance:reload:admin [instanceName] - Reloads Contember admin
	instance:reload:api [instanceName] - Reloads Contember API
	instance:up [instanceName] [--host <value> [... --host <value>]] [--ports <value>] [--detach|-d] [--admin-runtime <value> ("docker" or "node")] - Starts Contember instance
	instance:validate-config [instanceName] - Validates configuration of Contember instance
	migrations:amend <project> [--instance <value> (Local instance name)] [--yes (Do not ask for confirmation.)] - Amends latest migration
	migrations:create <project> <migrationName> - Creates empty schema migration for given project
	migrations:describe <project> [migration] [--sql-only] [--no-sql] - Describes a migration
	migrations:diff <project> <migrationName> [--execute] [--instance <value> (Local instance name)] [--yes (Do not ask for confirmation.)] - Creates schema migration diff for given project
	migrations:execute <project> [migration] [--instance <value> (Local instance name or remote Contember API URL)] [--remote-project <value> (Specify this when remote project name does not match local project name.)] [--yes (Do not ask for confirmation.)] - Executes migrations on an instance
	migrations:status <project> [--instance <value> (Local instance name or remote Contember API URL)] [--remote-project <value> (Specify this when remote project name does not match local project name.)] [--only-errors (Show only migrations with an error.)] [--only-to-execute (Show only migrations to execute.)] [--restore-missing (Restores migrations locally missing)] - Shows status of executed migrations on an instance & sync status
	project:create <project> [--instance <value> [... --instance <value>]] [--all-instances] [--no-instance] [--template <value>] - Creates a new Contember project
	project:print-schema <project> [--format <value> (graphql|introspection)] [--role <value> [... --role <value>]] - Prints project schema
	project:register <project> [--instance <value> [... --instance <value>]] [--all-instances] [--no-instance] - Registers a project to an instance
	project:validate <project> - Validates project schema
	tenant:create-api-key [instance (Local instance name or remote Contember API URL)] - Creates an API key
	tenant:invite [instance (Local instance name or remote Contember API URL)] - Invites a user by an email
	tenant:reset-password [instance (Local instance name or remote Contember API URL)] - Resets user password
	tenant:setup <apiUrl (Contember API URL)> - Creates superadmin and login key
	tenant:sign-in [instance (Local instance name or remote Contember API URL)] - Signs in a user
	version - Prints Contember CLI version
	workspace:create <workspaceName> [--single-instance] [--with-admin] [--template <value>] - Creates a new Contember workspace
	workspace:update:api <version> - Updates contember API version and all related packages
```

## Identifying an instance

Some commands like `instance:up` have a parameter instanceName. This parameter is optional when you have a single instance. In case of multiple instances, you have to specify it. You can also use a environment variable `CONTEMBER_INSTANCE` to preselect an instance.

## Commands

### instance:up

This command is a wrapper around docker-compose in your instance. Before actually running a docker-compose, it resolves some runtime configuration, e.g. it finds free ports, where all required services can be exposed.

> When you are using [Contember Admin](admin/overview.md) on a Windows, you might find useful `--admin-runtime=node` option, which may significantly improve performance. Node >= 12 is required for this option.

### instance:down

You can stop running instance by sending a SIGINT (Ctrl+C) to `instance:up` or by running this command.

### instance:info

Shows status of running instances. Also it prints all exposed services with their URL.

## migrations:diff

See [migrations chapter](schema/migrations.md).
