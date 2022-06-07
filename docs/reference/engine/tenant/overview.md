---
title: Tenant API overview
---

Contember Tenant API is a GraphQL API allowing you to manage **projects**, **tokens**, **users** and their **roles**. Unlike [Content API](../content/overview.md), this API is shared for all projects. It is available on URL `https://engine-hostname/tenant` and to access it you need to provide `Bearer` token in `Authorization` header.


## Terms

- Identity - Holds information about roles and project memberships.
- Person - Has assigned some identity and has credentials (email and password), using which he is authenticated to claim his identity.
- Authorization key/token - Represents permanent (for applications) or session (for users) authorization of particular identity. It is verified using a Bearer token.


## Authorization tokens

Like a Content API, Tenant API also needs an authorization token for each request - even for a login. 

The key is defined using `CONTEMBER_LOGIN_TOKEN` env variable. For local development, you can find this key in `docker-compose.yaml`

You use this token for sign in (using both email/password or IdP) and password reset mutations.

Besides special tokens like the login token, there are two basic kinds of authorization tokens:
- permanent API token for e.g. applications, where you don't authenticate users. You can [generate it using Tenant API mutations](api-keys.md) 
- session token, which user obtain after he signs in. You use it e.g. in administration for each action that given user makes.


## Which token should I use?

It is sometimes a bit confusing which token should be used for an action. So lets show it on an example - you as a project administrator want to create a API token for application, so application can read a data from Content API.

1. Find the login token.
2. Use this token as a Bearer token and run `signIn` mutation against Tenant API.
3. You will receive another token, this is your session token with limited validity.
4. Run `createApiKey` mutation against Tenant API but now with your personal session token.
5. The mutation returns a new permanent token with permissions you have set.
6. Now you can use this permanent API token and run some queries against Content API.

![tenant API diagram](/assets/tenant-api.svg)
