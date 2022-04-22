---
title: Deploy to Contember Cloud
description: From local project to production in 15 minutes.
---

This guide will take you through the deployment of Contember from your local machine to the Contember Cloud.

## Before you start

You should have a project on your machine - complete [quickstart tutorial](/intro/quickstart.mdx) or use one of our ready-made [starter-kits](https://github.com/contember/starter-kits).

## 1. Setup project in Contember Cloud

Go to https://contember.cloud and create an account if you don't have one.

_🧱 Some more instructions_

You should receive an email with a link to sign into administration. You don't need it right now - we will come back to it.

## 2. Build it

Run the following command in your project's directory:

```bash
npm run build
```

It packages your administration and creates assets that are ready for deployment.

## 3. Deploy

Open your project in [Contember Cloud Console](https://selfcare.eu.contember.cloud) and click Deploy button to create a deploy command with your deploy secret token. It will look something like this:

```bash
npm run contember deploy contember://YOUR_PROJECT_DSN_WITH_SECRET
```

Copy it and run this command in your project's directory. It will prompt you to confirm details - type `y` (for "yes") to continue. We will apply your project's schema and copy the administration's assets.

```
$ npm run contember deploy contember://
🧱🧱🧱 Truncated output...
```

## 4. Sign in to the administration

When you created the project, you received an email with a link to create an administration account. This account is separate from your Contember Cloud Console account.

## Next steps

You can change your local project however you like, it's completely independent from the deployed version. After you make any changes in the project's code, test it locally and are ready to deploy it, build it and deploy it again as we did in steps two and three.

## Troubleshooting

If you encounter a problem, feel free to open [an issue on GitHub](https://github.com/contember/admin/issues/new) or ask us in [our Discord server](https://discord.gg/EkhsuAK2Fg). Don't forget to attach screenshots and terminal output.
