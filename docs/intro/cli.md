---
title: CLI
---

There is a command line tool, which helps you with developing Contember projects and running them.

Run it without any args to see a help
```text
npx contember
``` 
Which will print the available commands
```text
Usage: <command> <command args>
        instance:create <instanceName> [--template <value>] - Creates a new Contember instance
        instance:down [instanceName] - Stops local Contember instance
        instance:info [instanceName] - Show status of local Contember instance
        instance:logs [instanceName] - Show Contember instance logs
        instance:reload:admin [instanceName] - Reloads Contember admin
        instance:reload:api [instanceName] - Reloads Contember API
        instance:up [instanceName] [--host <value>] [--ports <value>] [--admin-runtime <value> ("docker" or "node")] - Starts Contember instance
        instance:validate-config [instanceName] - Validates configuration of Contember instance
        migrations:diff <projectName> <migrationName> [--migrations-dir <value>] [--project-dir <value>] - Creates .json schema migration for given project
        migrations:dry-run <project> [migration] - Show SQL executed by a migration
        project:create <projectName> [--instance <value> [... --instance <value>]] [--all-instances] [--no-instance] [--template <value>] - Creates a new Contember project
        project:register <projectName> [--instance <value> [... --instance <value>]] [--all-instances] [--no-instance] - Registers a project to an instance
        tenant:create-api-key [instance (Local instance name or remote Contember API URL)] - Creates an API key
        tenant:setup <apiUrl (Contember API URL)> - Creates superadmin and login key
        tenant:sign-in [instance (Local instance name or remote Contember API URL)] - Signs in a user
        workspace:create <workspaceName> [--with-admin] [--template <value>] - Creates a new Contember workspace
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
