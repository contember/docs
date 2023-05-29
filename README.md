# Contember Documentation

This website is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator.

### Installation

```
npm ci
```

### Environment variables

Create a `.env` file with the following variables:

```
CONTEMBER_SESSION_TOKEN=0000000000000000000000000000000000000000
CONTEMBER_API_URL=http://localhost:1481
CONTEMBER_PROJECT_NAME=docs
```

### Local Development

```
test -f docker-compose.override.yaml || cp docker-compose.override.dist.yaml docker-compose.override.yaml
npm start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.
