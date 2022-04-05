---
title: How Contember works
---

**Contember Engine** lets you define your own data model with TypeScript and instantly turns it into a GraphQL API. It is a standalone server, which provides an extensive GraphQL API for your data - we call it the Content API. Contember API also provides, what we call a Tenant API which handles authentication and authorization, so you can control who and how can access your data.

**Contember Admin** is an SDK for building custom management interfaces. It lets you define your own management UI with high-level React components and automatically connects to GraphQL provided by Contember Engine.

We believe the code is the best way to express your needs. You can also easily version your project with Git, collaborate with team members and share or reuse.

<br />

![contember diagram](/assets/contember-diagram.svg)

<!--
TODO:
MISSING PROJECTS
PICTURE OF CONTEMBER API SERVER, POSTGRES DB AND MULTIPLE CLIENTS
THE CONTEMBER API SERVER SQUARE CONTAINS SUB-SQUARES = PROJECTS & TENANT API
PROJECTS SUB SQUARE CONTAINS BLOG SUBSQUARE
BLOG SUB SQUARE CONTAINS CONTENT API AND SYSTEM API
POSSIBLE INCLUDE WALL AS AUTHORIZATION LAYER``
-->

## How the project looks like

First you have to tell Contember Engine, how your data model looks like. So you start defining your project schema. For the most simple blog, it could look something like this:

```typescript
// Post.ts

import { SchemaDefinition as def } from '@contember/schema-definition'

export class Post {
  title = def.stringColumn().notNull()
  publishedAt = def.dateTimeColumn()
  content = def.stringColumn().notNull()
}
```
:::note
We use TypeScript for schema definition.
:::

Contember Engine then creates a table in a PostgreSQL database, where it stores your data and instantly provides you with GraphQL API.

To save a post using GraphQL API, just fire this mutation:
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
    errorMessage
    node {
      id
    }  
  }
}
```

To list all published posts, you can use this query:

```graphql
query {
  listPost(filter: {publishedAt: {isNull: false}}) {
    title
    publishedAt
  }
}
```
Of course, Contember Engine also works with complex structures, and you can define any kind of relationships between entities. Find out more in a chapter [defining schema](schema/overview.md).

With Contember Admin you can create any management interface you want. For example the post edit page will be as simple as this:

```typescript jsx
export const postEdit = (
    <EditPage entity="Post(id = $id)">
        <TextField field="title" label="Title" />
        <TextAreaField field="content" label="Content" />
        <DateTimeField field="publishedAt" label="Published at" />
    </EditPage>
)
```

Check the [quickstart](intro/quickstart.mdx) and try it by yourself in a few minutes.
