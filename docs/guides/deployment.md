---
title: Deploying a Contember
---

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

## Database
Then you need to setup PostgreSQL database. You can choose from many providers.

### SaaS providers
- [AWS RDS for PostgreSQL](https://aws.amazon.com/rds/postgresql/)
- [DigitalOcean Managed Database](https://www.digitalocean.com/products/managed-databases/)

### Self hosted
- [PostgreSQL](https://www.postgresql.org)

## Contember API engine
Last step is to setup server. You can choose any provider which provides following requirements.

Requirements: `Docker`, `Docker Compose`, `SSH access` and Proxy server.

### SaaS providers
- [Digital Ocean Droplet](https://www.digitalocean.com/products/droplets/)

### Server setup
1. Connect to your server with ssh.
```bash
ssh root@your_server_ip
```
2. Create an empty folder and move into it.
```bash
mkdir contember && cd contember
```
3. In your empty folder, create `.env` file. 
```bash
nano .env
```

Add all environment variables to `.env` file:

- __`LOGIN_TOKEN`__ - Login token used by Contember api (e.g. `LOGIN_TOKEN=YOUR_LOGIN_TOKEN`)
- __`ROOT_TOKEN`__ Root token used by Contember api (e.g. `ROOT_TOKEN=YOUR_ROOT_TOKEN`)
- __`ROOT_PASSWORD`__ Root password for Contember (e.g. `ROOT_PASSWORD=password`)
- __`ROOT_EMAIL`__ Root e-mail for Contember (e.g. `ROOT_EMAIL=admin@localhost`)

- __`S3_KEY`__ Key from your S3 storage (e.g. `S3_KEY=yours3key`)
- __`S3_SECRET`__ Secret from your S3 storage (e.g. `S3_SECRET=yours3secret`)
- __`S3_ENDPOINT`__ Endpoint of your bucket (e.g. `S3_ENDPOINT=https://rgn1.yours3provider.com`)
- __`S3_REGION`__ Region if your bucket (e.g. `S3_REGION=rgn1`)
- __`S3_BUCKET`__ Your bucket name (e.g. `S3=your-bucket`)

- __`DB_PASSWORD`__ Database password (e.g. `DB_PASSWORD=databasePassword`)
- __`DB_USER`__ Database user name (e.g. `DB_USER=dbuser`)
- __`DB_PORT`__ Database port (e.g. `DB_PORT=5432`)
- __`DB_HOST`__ Database host (e.g. `DB_HOST=your-db-server.com`)

- __`MAILER_FROM`__ Sender e-mail used for Contember notifications, password resets, etc... (e.g. `MAILER_FROM=contember@localhost`)
- __`MAILER_PORT`__ Your SMTP port (e.g. `MAILER_PORT=2525`)
- __`MAILER_HOST`__=Your SMTP host (e.g. `send.smtp.com`)

4. In same folder, create `docker-compose.yaml` file.
```bash
nano docker-compose.yaml
```

```yaml title="docker-compose.yaml"
version: "2.4"
services:
  engine:
    image: contember/engine:0.12.0-beta.0
    restart: on-failure
    environment:
      NODE_ENV: "production"
      NODE_TLS_REJECT_UNAUTHORIZED: 0

      CONTEMBER_ROOT_EMAIL: ${ROOT_EMAIL}
      CONTEMBER_ROOT_PASSWORD: ${ROOT_PASSWORD}
      CONTEMBER_ROOT_TOKEN: ${ROOT_TOKEN}
      CONTEMBER_LOGIN_TOKEN: ${LOGIN_TOKEN}
      CONTEMBER_CONFIG_YAML: |
        projectDefaults:
          s3:
            prefix: "%project.slug%"
      DEFAULT_DB_HOST: ${DB_HOST}
      DEFAULT_DB_PORT: ${DB_PORT}
      DEFAULT_DB_USER: ${DB_USER}
      DEFAULT_DB_PASSWORD: ${DB_PASSWORD}
      DEFAULT_DB_SSL: "true"

      DEFAULT_S3_REGION: ${S3_REGION}
      DEFAULT_S3_KEY: ${S3_KEY}
      DEFAULT_S3_SECRET: ${S3_SECRET}
      DEFAULT_S3_ENDPOINT: ${S3_ENDPOINT}
      DEFAULT_S3_BUCKET: ${S3_BUCKET}

      TENANT_DB_NAME: "tenant"
      TENANT_MAILER_HOST: ${MAILER_HOST}
      TENANT_MAILER_PORT: ${MAILER_PORT}
      TENANT_MAILER_FROM: ${MAILER_FROM}
    ports:
      - "1481:4000"
```

5. To run Contember API, use the following command:
```bash
# Execute Docker image detaching the terminal
docker-compose up -d
```

6. Setup proxy server to serve API from port `1481`.
