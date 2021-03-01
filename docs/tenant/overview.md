---
title: Tenant API overview
---

Contember has built-in user and permissions management. This part we call Tenant API. 

There is always a single Tenant API running on an instance and you can find it on http://localhost:1025/tenant . And of course, it is a GraphQL API.

## Terms

- Identity - Holds information about roles and project memberships.
- Person - Has assigned some identity and has credentials (email and password), using which he is authenticated to claim his identity.
- Authorization key/token - Represents permanent (for applications) or session (for users) authorization of particular identity. It is verified using a Bearer token.

## Authorization tokens

Like a Content API, Tenant API also needs an authorization token for each request - even for a login. 

On local development, you will receive a login token when you start a Contember instance for a first time using `npm run contember instance:up`. You can find it in `docker-compose.override.yaml` or `instance.local.yaml`.

On production, you have to execute [initial system setup](guides/deployment.md#contember-initial-setup).

With a login token, you are allowed just for a single operation - login.

Besides special tokens like the login token, there are two basic kinds of authorization tokens:
- permanent API token for e.g. applications, where you don't authenticate users. You can [generate it using Tenant API mutations](tenant/api-keys.md) 
- session token, which user obtain after he signs in. You use it e.g. in administration for each action that given user makes.

## Which token should I use?

It is sometimes a bit confusing which token should be used for an action. So lets show it on an example - you as a project administrator want to create a API token for application, so application can read a data from Content API.

1) Find the login token you have received on Contember instance setup.
2) Use this token as a Bearer token and run `signIn` mutation against Tenant API.
3) You will receive another token, this is your session token with limited validity.
4) Run `createApiKey` mutation against Tenant API but now with your personal session token.
5) The mutation returns a new permanent token with permissions you have set.
6) Now you can use this permanent API token and run some queries against Content API.

![tenant API diagram](/assets/tenant-api.svg)
