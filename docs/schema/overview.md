---
title: Project schema overview
---


Contember Project Schema defines schema of your model and also ACL and validation rules.

<!--
TODO: PICTURE OF PROJECT SCHEMA, MODEL SCHEMA, ACL SCHEMA AND INPUT VALIDATION SCHEMA
-->

## Model schema

First lets look at the model schema, which is now the most important for us.

:::note 
Make sure you have SchemaDefinition imported in each file
```typescript
import { SchemaDefinition as def } from "@contember/schema-definition"
```
:::

### Entity

Basic unit in model schema is called entity. Each entity can have columns and relationships to other entities.

Each entity is represented as a PostgreSQL table.

You define an entity by exporting a class from the schema definition file

```typescript
export class Post {}
```

You don't have to define a primary key, because every entity has "id" column by default.


### Columns

See [columns chapter](columns.md). 

### Relations

See [relations chapter](relations.md).


## ACL schema

Defines user roles with permissions. For details see [dedicated ACL chapter](acl.md)

## Validation schema

Allows you to set additional validation constraints on GraphQL input. See [input validations](validations.md)


## Migrations

If you make a change in your project schema, you must create and apply [a migration](migrations.md)
