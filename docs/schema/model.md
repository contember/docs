---
title: Model Schema
---

Contember Project Schema defines schema of your model and also ACL and validation rules. But first lets look at the model schema, which is now the most important for us.

<!--
TODO: PICTURE OF PROJECT SCHEMA, MODEL SCHEMA, ACL SCHEMA AND INPUT VALIDATION SCHEMA
-->

## Entity

Basic unit in model schema is called entity. Each entity can have columns and relationships to other entities.

Each entity is represented as a PostgreSQL table.

You define an entity by exporting a class from the schema definition file

```typescript
export class Post {}
```

You don't have to define a primary key, because every entity has "id" column by default.

## Columns

Almost every entity has some columns storing its data. 

You define a column by adding a property to an entity (note that we added SchemaDefinition import).

```typescript
import { SchemaDefinition as def } from "@contember/schema-definition";

export class Post {
  title = def.stringColumn().notNull();
  publishedAt = def.dateTimeColumn();
}
```

Except its name, each column has a type definition, optionally you may define some flags, like nullability.

### Supported column types

#### String
Generic text field with arbitrary length.

#### Int
Stores whole signed numbers (32b default) 

#### Double
Floating point numbers according to IEEE 64-bit float.

#### Bool
Binary true/false value.

#### Enum
Field with predefined set of possible values.

#### DateTime
Ideal for storing date and time, converted to UTC by default and transferred in ISO 8601 format.

#### Date
Simple date field without a time part.

#### Json
Stores arbitrary JSON.

#### Uuid
Universally unique identifier, used for all primary keys by default.

### PostgreSQL type mapping

Table shows default mapping of Contember schema types to corresponding PostgreSQL type. This can be changed with `columnType(...)` in schema definition.

| Contember Type | PostgreSQL type  |
| -------------- | ---------------  |
| String         | text             |
| Int            | integer          |
| Double         | double precision |
| Uuid           | uuid             |
| Bool           | boolean          |
| DateTime       | timestamptz      |
| Date           | date             |
| Json           | jsonb            |



## Relationships

Contember knows and correctly handles all kinds of relationships - one has one, one has many and many has many.

<!--
> ADD EXAMPLE OF ALL POSSIBLE RELATIONSHIP
> IDEALLY WITH PICTURES
> SEE DOCTRINE FOR EXAMPLE
-->

Let's define another entity - a category:

```typescript
import { SchemaDefinition as def } from "@contember/schema-definition";

export class Category {
  title = def.stringColumn();
}
```

Now add a relationship field to the Post entity definition:

```typescript
import { SchemaDefinition as def } from "@contember/schema-definition";

export class Post {
  title = def.stringColumn().notNull();
  // highlight-next-line
  category = def.manyHasOne(Category);
}
```

You can also define inverse side of the relationship:

```typescript
import { SchemaDefinition as def } from "@contember/schema-definition";

export class Category {
  title = def.stringColumn();
  // highlight-next-line
  posts = def.oneHasMany(Post, "category");
}

export class Post {
  title = def.stringColumn().notNull();
  // highlight-next-line
  category = def.manyHasOne(Category, "posts");
}
```

### Relationships nullability

You can also define `.notNull()` constraint for "one has one" relationships and owning side of "many has one" relationship.

```typescript
export class Post {
  title = def.stringColumn().notNull();
  // highlight-next-line
  category = def.manyHasOne(Category, "posts").notNull();
}
```

### On delete behavior

Using `.onDelete()` you can set what happens when referenced entity is deleted. E.g. you have a post, which is assigned to a category. When a category is deleted, three things can happen:

- restrict: this is default behavior. When you try to delete an entity, which is referenced from other entities, the delete operation will fail.
- set null: field, which references removed entity, is set to null. Obviously, this is possible only for nullable relationships. You can use shortcut `.setNullOnDelete()` to select this behavior.
- cascade: all entities, which references an entity which is being removed, are also removed. You can use a shortcut `.cascadeOnDelete()`.

Pay attention when you are choosing the strategy, because choosing a wrong strategy may lead to runtime errors.

:::note
In database, all relationships are marked as "NO ACTION" and actual strategy is executed by Contember. This is because Contember can evaluate ACL rules.
:::

### Default order

You can use a method `.orderBy()` on "has many" relationships to set default order of this relationship. Of course, you can later override this order in a query.

By calling this method multiple times, you can set subsequent order rules.

```typescript
import { SchemaDefinition as def } from "@contember/schema-definition";

export class Category {
  title = def.stringColumn();
  // highlight-next-line
  posts = def.oneHasMany(Post, "category").orderBy("title");
}

export class Post {
  title = def.stringColumn().notNull();
  category = def.manyHasOne(Category, "posts");
}
```

## Unique fields

You can mark a column unique by calling method `.unique()` on it.

```typescript
slug = def.stringColumn().unique();
```

If you need composite unique key, use a class decorator:

```typescript
@def.Unique("locale", "slug")
export class Post {
  slug = def.stringColumn().notNull();
  locale = def.stringColumn().notNull();
}
```

"One has one" relationships are marked as unique by default.

## Enums

If you need to limit a set of allowed values for a column, you can do it using enums. Let's say you want to add a state to the Post definition - it can be either a "draft", "for review" or "published".

First define an enum

```typescript
export const PostEnum = def.createEnum("draft", "published", "for_review");
```

And now we can reference it from Post entity

```typescript
export class Post {
  state = def.enumColumn(PostEnum);
}
```

Further, we can use not-null constraint and set default value which will be used when Post is created without state specified

```typescript
export class Post {
  state = def.enumColumn(PostEnum).notNull().default("draft");
}
```
