---
title: Content API overview
---

After Contember server starts, there will be more then single API available, but the Content API is the most important right now.

Content API is a GraphQL API available on URL in format `https://your-hostname/content/{project}/{stage}` (e.g. http://localhost:1481/content/my-blog/live). If you want to access the API, you need an access token with sufficient permissions. You can obtain one [in Tenant API](tenant/overview.md). Once you get the token, which will look like `44d7dd8ae4a45c33eaa309716e41e1a8476cda4f`, use it as Bearer token in Authorization header.

```text
Authorization: Bearer 44d7dd8ae4a45c33eaa309716e41e1a8476cda4f
```

:::tip
When you are running Contember locally there is superadmin token `0000000000000000000000000000000000000000` which you can use.
:::

Contember generates restricted GraphQL API, which corresponds [ACL rules](schema/acl.md) you define. For example if you define a read-only role for a mobile application, then no mutations will be visible in GraphQL API for this role.

## GraphQL client

On [http://localhost:1481/playground](http://localhost:1481/playground) there is Apollo GraphQL playground running. But you can also try more advanced clients. Our choice is [Insomnia](https://insomnia.rest/).

Now you can discover how to read your data using [GraphQL queries](content/queries.md) or modify them using [GraphQL mutations](content/mutations.md). Subscriptions for watching data changes are currently not available.
