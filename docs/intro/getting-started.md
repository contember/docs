---
title: Getting started
---

In this chapter, you will install Contember CLI, start Contember API locally and learn how to create your first project.

# Prerequisites

- Installed [NPM](https://www.npmjs.com/)
- Installed [Docker](https://docs.docker.com/install/) with [Docker Compose](https://docs.docker.com/compose/install/)

# Installing Contember CLI
Contember CLI is a command line tool which contains many commands to simplify your workflow.

```text
npm i -g @contember/cli
```

> TIP: there is also a Docker image `contember/cli` if you don't want to install the CLI as a global NPM dependency.

# Creating workspace
Execute following command in a terminal:
```text
npx contember workspace:create my-contember-workspace --single-instance
```
Alternatively, you can create a workspace using `contember/cli` docker image:
```
docker run -ti --rm -v "$(pwd)":"$(pwd)" --workdir="$(pwd)" contember/cli workspace:create my-contember-workspace --single-instance
```

> TIP: run without `--single-instance` option for multi-instance setup.

The command will create a directory named "my-contember-workspace" with a sample project and structure similar to this:

```text
.
├── api
│   ├── config.yaml
│   ├── s3-entrypoint.sh
│   └── s3-policy.json
├── projects
│   └── sandbox
│       └── api
│           ├── acl
│           │   └── index.ts
│           ├── index.ts
│           ├── migrations
│           │   └── 2019-12-13-110355-init.json
│           └── model
│               ├── Image.ts
│               ├── index.ts
│               └── Post.ts
├── contember.workspace.yaml
├── docker-compose.yaml
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
npm run contember instance:up
``` 

In first run, you will be prompted for email and password. E-mail is for authentication purpose only and is stored only in your local database. 

> TIP: you can use non-ambiguous abbreviation for commands, 
> for example you can run previous command using `npm run contember i:u`

Now that your local Contember instance is running, [explore an API overview](content/overview.md) or start [defining schema](schema/model.md) of your spanking new project.
