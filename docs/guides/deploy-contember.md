---
title: Deploy Contember project to Contember Cloud
---

This tutorial will guide you through the process of deploying Contember from local machine to Contember Cloud. (If you selfhost Contember, this tutorial won't work without admin server for which you need Enterprise license).

#### 1. Make sure you have correctly set project name

Your project needs to have the same name locally and in Contember Cloud. Mostly (for example in our templates) there are 2 places where you need to set it:
1. In `docker-compose.yml` set the `CONTEMBER_PROJECT_NAME` to your project slug
2. In `.env.production` set the `VITE_CONTEMBER_ADMIN_PROJECT_NAME` to your project slug

#### 2. Production build admin

Run build script inside your project folder:

```bash
npm run build-admin
```

#### 3. Deploy your project

Now you can deploy your project using Contember CLI. You'll need deploy token (you'll get one when creating project in Contember Cloud administration).

```bash
docker compose run -e CONTEMBER_API_TOKEN={{deploy_token}} contember-cli deploy {{your_project_name}} --admin {{your_project_admin_url}} --instance {{your_project_api_url}}
```

CLI will deploy your admin and apply all your new migrations. That's it.
