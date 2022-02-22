---
title: Deploy Contember project
---

This tutorial will guide you through the process of deploying Contember from local machine to Contember Cloud or self hosted Contember (requires admin server which is part of Enterprise license). If you are using open source Contember, you need to build and host Contember Admin on your own (almost any static hostings will do).

#### 1. Production build admin

Add file `.env.production` to your admin folder and add all environment variables to it.

```dotenv title=.env.production
VITE_CONTEMBER_ADMIN_API_BASE_URL=/_api
VITE_CONTEMBER_ADMIN_SESSION_TOKEN=__SESSION_TOKEN__
VITE_CONTEMBER_ADMIN_PROJECT_NAME=your-project-name
```

Now you can run `npm run build-admin` with production node environmental and it will build admin.

```bash
NODE_ENV=production npm run build-admin
```

#### 2. Deploy your project

Now you can deploy your project using Contember CLI.

```bash
npm run contember deploy your-project-name --admin {{your_project_admin_url}} --instance {{your_project_api_url}} --yes
```

This will deploy your admin and apply all new migrations.
