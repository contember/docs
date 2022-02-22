---
title: Deploy Contember project
---

This tutorial will guide you through the process of deploying Contember from local machine to Contember Cloud or self hosted Contember (requires admin server which is part of Enterprise license). If you are using open source Contember, you need to build and host Contember Admin on your own (almost any static hostings will do).

#### 1. Production build admin

Now you can run `npm run build-admin` with production node environmental and it will build admin.

```bash
npm run build-admin
```

#### 2. Deploy your project

Now you can deploy your project using Contember CLI.

```bash
npx @contember/cli@next deploy your-project-name --admin {{your_project_admin_url}} --instance {{your_project_api_url}}
```

You'll be prompted to authenticate. You can choose to between **e-mail and password** or **API token.** You'll need login token, in order to autheticate with e-mail and password. If you choose authe You can generate tokens in Contember Panel.

After authentication, CLI will deploy your admin and apply all new migrations.
