---
title: GraphQL Queries
---

For each entity you define there will be two query fields - one for fetching a single record by a unique field and one for fetching a list of records.

For following entity:

```typescript
import { SchemaDefinition as def } from "@contember/schema-definition";

export class Post {
  title = def.stringColumn().notNull();
  publishedAt = def.dateTimeColumn();
}
```

GraphQL schema will be similar to this (some types are omitted in the example for clarity):

```graphql
query {
  getPost(by: PostUniqueWhere!): Post
  listPost(filter: PostWhere, orderBy: [PostOrderBy!], offset: Int, limit: Int): [Post]
}
input PostUniqueWhere {
  id: UUID
}
input PostOrderBy {
  id: OrderDirection
  publishedAt: OrderDirection
}
input PostWhere {
  id: UUIDCondition
  publishedAt: DateTimeCondition
  and: [PostWhere!]
  or: [PostWhere!]
  not: PostWhere
}
enum OrderDirection {
  asc
  desc
}
```

## Fetching a single record

If you know a field, which uniquely identifies a record, you can fetch a single record using a "get" query. If you define an entity called `Post`, there will be a field `getPost` with a parameter `by`.

```graphql
query {
  getPost(by: { id: "c4ae3a0f-d91b-42a8-ad3c-5ca6b9f407c2" }) {
    title
    publishedAt
  }
}
```

The `by` parameter allows to filter by any unique column (or columns in case of compound unique key). By default it is only `id`, but you can specify them in model by `.unique()` on the column or using `@def.Unique(...)` class annotation.

## Fetching a list of records

This kind of query offers more possibilities like filtering using complex conditions, ordering the result or paging using limit and offset.

```graphql
query {
  listPost(
    filter: {
      publishedAt: { lte: "2019-12-20" }
      category: { name: { eq: "Graphql" } }
    }
    orderBy: [{ publishedAt: asc }]
    limit: 10
  ) {
    title
    publishedAt
  }
}
```

### Filters

`filter` argument allows you to apply a filter on the result. On each ordinary column (which is not a relation) you can set following conditions:

```graphql
input StringCondition {
  and: [StringCondition!]
  or: [StringCondition!]
  not: StringCondition
  eq: String
  isNull: Boolean
  notEq: String
  in: [String!]
  notIn: [String!]
  lt: String
  lte: String
  gt: String
  gte: String
}
```

It is not possible to combine multiple fields in a single object. You have to wrap using `and` or `or` fields. For example, you want to select posts published in a range, then you create following condition:

```graphql
query {
  listPost(
    filter: {
      publishedAt: { and: [{ gte: "2019-12-20" }, { lte: "2019-12-30" }] }
    }
  ) {
    id
    title
  }
}
```

You can also filter over relations (both "has one" and "has many"), for example you want to only select posts written by "John Doe" and published with a "graphql" tag

```graphql
query {
  listPost(
    filter: {
      author: { name: { eq: "John Doe" } }
      tag: { caption: { eq: "graphql" } }
    }
  ) {
    id
    title
  }
}
```

### Sorting result

Result set can be sorted by setting an `orderBy` argument. This argument can contain multiple sort fields and can also contain relations.

```graphql
query {
  listPost(orderBy: [{ author: { name: asc } }, { publishedAt: desc }]) {
    id
    title
  }
}
```

## Records pagination

There is an alternative to a list queries with a similar structure - a "paginate" queries. This query aims to be Relay compatible in the future.

In addition to fields for fetching a list of records, there is a `pageInfo` object with `totalCount` field. Using this value you can calculate total number of pages etc.

```graphql
query {
  paginatePost(
    skip: 1
    first: 2
    filter: { author: { name: { eq: "John Doe" } } }
    orderBy: [{ publishedAt: asc }]
  ) {
    pageInfo {
      totalCount
    }
    edges {
      node {
        id
        title
        author {
          name
        }
      }
    }
  }
}
```

Syntax for filtering and sorting is the same you know from "list" query. Parameters for pagination (skip, first) follows [Relay specification](https://facebook.github.io/relay/graphql/connections.htm).

Cursor based pagination is not supported.

## Nested objects

In a single query you can traverse across all the relations of given record.

```graphql
query {
  listPost {
    id
    title
    category {
      name
    }
    author {
      name
    }
  }
}
```

On "has many" relations, you can also set a filter, orderBy and limit with an offset.

```graphql
query {
  listCategory {
    id
    title
    posts(limit: 3, orderBy: [{ publishedAt: desc }]) {
      title
    }
  }
}
```

## Transactions

A transaction is NOT automatically started for queries. This results in a better performance, but it may cause an inconsistency in the result.

To enable transactions, wrap queries into a `transaction` field.

```
query {
  transaction {
    listPost {
      title
    }
    listAuthor {
      name
    }
  }
}
```
