---
title: Deploy Contember project to Contember Cloud
---

This tutorial will guide you through the process of deploying the Contember from local machine to the Contember Cloud. (Tutorial won't work for self-hosted Contember without an admin server. The admin server is under an Enterprise license, [contact us](mailto:team@contember.com) for more information).

#### 1. Make sure you have correctly set project name

Your project needs to have the same name locally and in the Contember Cloud. In particular, there are 2 places where you need to set it up:
1. In `docker-compose.yml` set the `CONTEMBER_PROJECT_NAME` to your project slug
2. In `.env.production` set the `VITE_CONTEMBER_ADMIN_PROJECT_NAME` to your project slug

#### 2. Production build admin

Run build script inside your project folder:

```bash
npm run build-admin
```

#### 3. Deploy your project

Now you can deploy your project using the Contember CLI. You'll need deploy token (you get one when creating a project in the Contember Cloud administration).

```bash
docker-compose run -e CONTEMBER_API_TOKEN={{deploy_token}} contember-cli deploy {{your_project_name}} --admin {{your_project_admin_url}} --instance {{your_project_api_url}}
```

CLI will deploy your admin and apply all your new migrations. That's it.
