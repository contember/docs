---
title: Deploying a Contember
---

## Setting up environment variables
TODO

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
