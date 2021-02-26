---
title: How Contember API works?
slug: /
---

Contember API is a standalone server, which provides an extensive GraphQL API for your data - we call it the Content API. Contember API also provides, what we call a Tenant API which handles authentication and authorization so you can control who and how can access your data.

![contember diagram](/assets/contember-diagram.svg)

<!--
TODO:
MISSING SYSTEM API 
- imho irrelevant here
MISSING PROJECTS
PICTURE OF CONTEMBER API SERVER, POSTGRES DB AND MULTIPLE CLIENTS
THE CONTEMBER API SERVER SQUARE CONTAINS SUB-SQUARES = PROJECTS & TENANT API
PROJECTS SUB SQUARE CONTAINS BLOG SUBSQUARE
BLOG SUB SQUARE CONTAINS CONTENT API AND SYSTEM API
POSSIBLE INCLUDE WALL AS AUTHORIZATION LAYER``
-->

First you have to tell Contember API, how your data model looks like. So you start defining your project schema. For the most simple blog, imagine it could look something like this ...

```typescript
// Post.ts

import { SchemaDefinition as def } from '@contember/schema-definition'

export class Post {
  title = def.stringColumn().notNull()
  publishedAt = def.dateTimeColumn()
  content = def.stringColumn().notNull()
}
```  

> We use TypeScript for schema definition.

Contember API then creates a table in a PostgreSQL database, where it stores all the data. To save a post using GraphQL API mutation do ...
```graphql
mutation {
  createPost(
    data: {
      title: "Hello world", 
      content: "first article stored in Contember!", 
      publishedAt: "2019-12-11T16:35:06"
    }
  ) {
    ok
  }
}
``` 

<!--
MAYBE PICTURE OF CLIENT SENDING GRAPHQL QUERY TO CONTEMBER API AND CONTEMBER API SENDING SQL QUERY TO POSTGRES DB
SEE https://hasura.io/rstatic/dist/f7a4cfcf2813970ee1350efc9d748c79.gif
-->

To fetch it later:

```graphql
query {
  listPost(filter: {publishedAt: {isNull: false}}) {
    title
    publishedAt  
  }
}
```

Of course, Contember API also works with complex structures and you can define any kind of relations between entities. Please find out more in a chapter [defining schema](schema/model.md) or [get started with Contember](intro/getting-started.md) to install a local instance. 
