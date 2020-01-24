---
title: Getting started
---

In this chapter, you will install Contember CLI, start Contember API locally and learn how to create your first project.

# Prerequisites

- Installed [NPM](https://www.npmjs.com/)
- Installed [Docker](https://docs.docker.com/install/) with [Docker Compose](https://docs.docker.com/compose/install/)

# Installing CLI
Contember CLI is a command line tool which contains many commands to simplify your workflow.

```text
npm i -g @contember/cli
```

# Creating workspace
Execute following command in a terminal:
```text
npx contember workspace:create my-contember-workspace
```

It will create a directory named "my-contember-workspace" with a sample project and structure similar to this:

<!--
TODO: RENAME api/config.yaml to api/contember.api.yaml ?? 
-->

```text
.
├── instances
│   └── default
│       ├── api
│       │   └── config.yaml
│       └── docker-compose.yaml
├── projects
│   └── sandbox
│       └── api
│           ├── acl
│           │   └── index.ts
│           ├── migrations
│           │   └── 2019-12-06-150625-init.json
│           ├── model
│           │   ├── Image.ts
│           │   ├── index.ts
│           │   └── Post.ts
│           └── index.ts
├── contember.workspace.yaml
├── package.json
└── tsconfig.json
``` 

Go to created workspace:
```text
cd my-contember-workspace
```

And install NPM dependencies:
```text
npm install
```

After this, you can start a Contember instance:
```text
npx contember instance:up
``` 

In first run, you will be prompted for email and password. E-mail is for authentication purpose only and is stored only in your local database. 

> TIP: you can use non-ambiguous abbreviation for commands, 
> for example you can run previous command using `npx contember i:u`

Now that your local Contember instance is running, [explore an API overview](content/overview.md) or start [defining schema](schema/model.md) of your spanking new project.
