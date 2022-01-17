---
title: ACL rules
---

Contember provides easy way to define access rules for your data by saying which role can access which field. Using this you can create complex rules across entity relations on a cell level.

## Operations

Contember distinguish four types of operations:

- read
- create
- update
- delete

You can define rules for each operation independently, so you can e.g. say that user can create something but he cannot edit it later (or even you can say he can edit it only under certain circumstances).

## Variable

Variable is a value stored in Tenant API and is injected to a _predicate_ when the predicate is evaluated. Usually it is some kind of dimension by which you split your data - e.g. a site or a language, or even a category.

```typescript
const variables = {
  language_id: {
    type: Acl.VariableType.entity,
    entityName: "Language",
  },
};
```

## Predicates

Before you set a rule to a field, you have to define a predicate on an entity - or you can use the most simple predicate `true`, which always allows given operation.

Predicates definition is similar to a syntax you use for [filtering a data](content/queries.md#filters). Lets say you have entities _Language_ and _Post_. And of course a relation between them. And you only want to allow editors to edit a post in their language. A predicate definition, which references the variable `language_id`, may look like this:

```typescript
const postEntityPredicates = {
  languagePredicate: {
    language: {
      id: "language_id",
    },
  },
};
```

## Rules

Now you have the predicate defined, so you can set rules on each field of the entity.

```typescript
const postEntityOperations = {
  read: {
    title: true,
  },
  update: {
    title: "languagePredicate",
  },
  create: {
    title: "languagePredicate",
  },
  delete: false,
};
```

> Note that for a "delete" operation you can't set rules on each field, because you are deleting a row as a whole.

This definition says that user can read a title of any post, can create or edit a post in his language and cannot delete any post.

You don't have to define a rule for `id` field, because it is automatically computed from other fields.

## Roles

Role contains set of rules for individual entities and their fields. Putting it all together, a role definition may look like this:

```typescript
const editorRole = {
  variables: variables,
  entities: {
    Post: {
      predicates: postEntityPredicates,
      operations: postEntityOperations,
    },
  },
};
```

<!--
Beside already described fields there is also a field called stage, which references to a [content stage](content/staging.md). You can define a role to be applicable in any stage by putting a `'*'` or you can set a array of particular stages (e.g. `['live', 'draft']`)
-->

## Role inheritance

A role can inherit rules of other role (or multiple roles) and extend it. It is not possible to deny a permission, which a role, you inherit from, grants. Resulting rules are merged using "or" operator.

If you assign multiple roles to an identity, it is merged in the exactly same way.

<!--
## ACL builder

TODO

## ACL evaluation

TODO

-->

## S3 ACL

Contember S3 integration has special ACL definition - for mode details see [S3 chapter](content/s3.md).
