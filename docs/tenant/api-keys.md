---
title: API keys management
---

For applications, where you don't identify and authenticate individual users, you can use an API key. These API keys are in fact an identity (without a person) with permanent access token. So you can later manage memberships of users and API keys using the same API.

## Create API key

### Using GraphQL API
```graphql
mutation {
  createApiKey(
    projectSlug: "my-blog",
    description: "Some user friendly description of the key"
    memberships: [{role: "editor", variables: [{name: "language", values: ["cs"]}]}]
  ) {
    ok
    error {
      code
    }
    result  {
      apiKey {
        id
        token
        identity {
          id
        }
      }
    }
  }
}
```

This mutations returns 3 identifiers, which might be relevant for you:
- API key ID: using this ID you can later call a `disableApiKey` and invalidate this API key
- identity ID: which you use to modify API key [memberships and permissions](tenant/memberships.md)
- token: which is a bearer token, which you use to authenticate all GraphQL requests

### Using CLI

There is also an interactive CLI command for creating an API key. Run
```
npm run contember tenant:create-api-key
``` 
and follow the instructions

## Disable API key

You need an API key ID to disable it. Do not confuse this id with identity id!

```graphql
mutation {
  disableApiKey(id: "fb6658f3-a000-4448-ac9e-0688f1afa3d7") {
    ok
  }
}
```
