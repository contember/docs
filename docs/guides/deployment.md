---
title: Deploying a Contember project
---

## Hosting options

The best way to run Contember is our [Contember Cloud](https://www.contember.com/cloud). If you want to host Contember elsewhere, here's a quick tutorial.

Otherwise Contember can be selfhosted almost anywhere.

### What you'll need
1. S3-compatible storage ([AWS S3](https://aws.amazon.com/s3/), [DigitalOcean Spaces](https://www.digitalocean.com/products/spaces/), [MinIO](https://min.io/), [CEPH](https://ceph.io/), [Zenko CloudServer](https://www.zenko.io/cloudserver/))
2. PostgreSQL database ([AWS RDS for PostgreSQL](https://aws.amazon.com/rds/postgresql/), [DigitalOcean Managed Database](https://www.digitalocean.com/products/managed-databases/))
3. Some way to run Docker image. You'll need a provider that supports: `Docker`, `Docker Compose`, `SSH access` and Proxy server.

It's good idea to run these at one provider but it's not required.
## Digital Ocean Droplet

1. Set up [DigitalOcean Spaces](https://www.digitalocean.com/products/spaces/)
2. Set up [DigitalOcean Managed Database](https://www.digitalocean.com/products/managed-databases/)
3. Deploy Contember Engine
### Deploy Contember Engine

#### 1. Create droplet
Use 1-Click Application marketplace from Digital Ocean to create [droplet with Docker](https://marketplace.digitalocean.com/apps/docker).
#### 2. Connect to your server with ssh.

```bash
ssh root@your_server_ip
```

#### 3. Create an empty folder and move into it.

```bash
mkdir contember && cd contember
```

#### 4. In your empty folder, create `.env` file.

```bash
nano .env
```

Add all environment variables to `.env` file:

- **`LOGIN_TOKEN`** - Login token used by Contember api (e.g. `LOGIN_TOKEN=YOUR_LOGIN_TOKEN`)\*
- **`ROOT_TOKEN`** Root token used by Contember api (e.g. `ROOT_TOKEN=YOUR_ROOT_TOKEN`)\*
- **`ROOT_PASSWORD`** Root password for Contember (e.g. `ROOT_PASSWORD=password`)
- **`ROOT_EMAIL`** Root e-mail for Contember (e.g. `ROOT_EMAIL=contember@localhost`)

- **`S3_KEY`** Key from your S3 storage (e.g. `S3_KEY=yours3key`)
- **`S3_SECRET`** Secret from your S3 storage (e.g. `S3_SECRET=yours3secret`)
- **`S3_ENDPOINT`** Endpoint of your bucket (e.g. `S3_ENDPOINT=https://rgn1.yours3provider.com`)
- **`S3_REGION`** Region if your bucket (e.g. `S3_REGION=rgn1`)
- **`S3_BUCKET`** Your bucket name (e.g. `S3=your-bucket`)

- **`DB_PASSWORD`** Database password (e.g. `DB_PASSWORD=databasePassword`)
- **`DB_USER`** Database user name (e.g. `DB_USER=dbuser`)
- **`DB_PORT`** Database port (e.g. `DB_PORT=5432`)
- **`DB_HOST`** Database host (e.g. `DB_HOST=your-db-server.com`)

- **`MAILER_FROM`** Sender e-mail used for Contember notifications, password resets, etc... (e.g. `MAILER_FROM=contember@localhost`)
- **`MAILER_PORT`** Your SMTP port (e.g. `MAILER_PORT=2525`)
- **`MAILER_HOST`** Your SMTP host (e.g. `send.your-smtp.com`)

\*For generating secure tokens you can run `openssl rand -hex 20` in your terminal.

#### 5. In same folder, create `docker-compose.yaml` file.

```bash
nano docker-compose.yaml
```

```yaml title="docker-compose.yaml"
version: '2.4'

services:
  contember-engine:
    image: contember/engine:1.0.0-rc.7

    environment:
      NODE_ENV: "production"
      CONTEMBER_PORT: '4000'
      CONTEMBER_ROOT_EMAIL: ${ROOT_EMAIL}
      CONTEMBER_ROOT_PASSWORD: ${ROOT_PASSWORD}
      CONTEMBER_ROOT_TOKEN: ${ROOT_TOKEN}
      CONTEMBER_LOGIN_TOKEN: ${LOGIN_TOKEN}

      DEFAULT_DB_HOST: ${DB_HOST}
      DEFAULT_DB_PORT: ${DB_PORT}
      DEFAULT_DB_USER: ${DB_USER}
      DEFAULT_DB_PASSWORD: ${DB_PASSWORD}
      DEFAULT_DB_SSL: 'true'

      DEFAULT_S3_REGION: ${S3_REGION}
      DEFAULT_S3_KEY: ${S3_KEY}
      DEFAULT_S3_SECRET: ${S3_SECRET}
      DEFAULT_S3_ENDPOINT: ${S3_ENDPOINT}
      DEFAULT_S3_BUCKET: ${S3_BUCKET}

      TENANT_DB_NAME: 'tenant'
      TENANT_MAILER_HOST: ${MAILER_HOST}
      TENANT_MAILER_PORT: ${MAILER_PORT}
      TENANT_MAILER_FROM: ${MAILER_FROM}

    ports:
      - '1481:4000'
```

#### 6. To run Contember API, use the following command:

```bash
# Execute Docker image detaching the terminal
docker-compose up -d
```

#### 7. Setup proxy server to serve API from port `1481`.
