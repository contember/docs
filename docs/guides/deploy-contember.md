---
title: Deploy Contember project
---

This tutorial will guide you through the process of deploying Contember from local machine to Contember Cloud or self hosted Contember (requires admin server which is part of Enterprise license). If you are using open source Contember, you need to build and host Contember Admin on your own (almost any static hostings will do).

#### 1. Production build admin

Run build script inside your project folder.

```bash
npm run build-admin
```

#### 2. Deploy your project

Now you can deploy your project using Contember CLI. You'll need deploy token (you can generate one from Contember Panel).

```bash
docker compose run -e CONTEMBER_API_TOKEN={{deploy_token}} contember-cli deploy {{your_project_name}} --admin {{your_project_admin_url}} --instance {{your_project_api_url}}
```

After authentication, CLI will deploy your admin and apply all your new migrations.
