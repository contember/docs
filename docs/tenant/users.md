---
title: User management
---

## Sign in

For sign in, you need a [login token](tenant/overview.md#authorization-tokens). After successful login, you receive a token for subsequent requests.

```graphql
mutation {
  signIn(email: "admin@cms.cz", password: "123456", expiration: 3600) {
    ok
    result {
      token
    }
    error {
      code
    }
  }
}
```

## Sign out

By calling signOut mutation, you can invalidate a token associated with current request

```graphql
mutation {
  signOut {
    ok
  }
}
```

By setting a parameter `all` to `true`, you invalidate all tokens associated with a current identity. 


```graphql
mutation {
  signOut(all: true) {
    ok
  }
}
``` 

> Only persons are allowed to sign out. It cannot be called with a permanent API key.

## Invite

Superadmin or a project admin can invite other person to a project:

```graphql
mutation {
  invite(
    email: "john@doe.com",
    projectSlug: "my-blog",
    memberships: [
      {
        role: "editor",
        variables: [{name: "language", values: ["cs"]}]
      }
    ]
  ) {
    ok
    error {
      code
    }
  }
}
```

When a user with given email already exists in a system, he is just added to a project, otherwise a new user is created and login instructions are sent to given e-mail.
