---
title: Deploying a Contember
---


## Building a Docker image
TODO
## Setting up environment variables
TODO

## First-time Contember setup

You have to execute a system setup first using special one-off token. Use you [favorite GraphQL client](content/overview.md#graphql-client) and execute following graphql mutation against your production server:

```
Authorization: Bearer 12345123451234512345
```

```graphql
mutation {
  setup(superadmin: {email: "admin@my-site.com", password: "my-strong-password"}) {
    ok
    result {
      loginKey {
        token
      }
    }
  }
}
```

This mutation will create a *superadmin* with given credentials and returns a login token. Don't loose it, otherwise you won't be able to login!

## S3 compatible storage
First you have to choose a S3 provider. You can decide between hosted services like AWS S3 or you can self host your own S3 compatible storage. 

### SaaS providers  
- [AWS S3](https://aws.amazon.com/s3/) - the original S3 implementation
- [DigitalOcean Spaces](https://www.digitalocean.com/products/spaces/)

### Self hosted
- [Minio](https://min.io/)
- [CEPH](https://ceph.io/)
- [Zenko CloudServer](https://www.zenko.io/cloudserver/)

After you choose the right provider, you just have to setup relevant S3 environment variables.
