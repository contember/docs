---
title: Columns
---

Almost every entity has some columns storing its data.

You define a column by adding a property to an entity.

```typescript
export class Post {
	title = def.stringColumn().notNull();
	publishedAt = def.dateTimeColumn();
}
```

Except its name, each column has a type definition, optionally you may define some flags, like nullability.

## Supported data types

| Contember Type | PostgreSQL type  | Description
| -------------- | ---------------  | -----------
| String         | text             | Generic text field with arbitrary length.
| Int            | integer          | Stores whole signed numbers (32b default)
| Double         | double precision | Floating point numbers according to IEEE 64-bit float.
| Bool           | boolean          | Binary true/false value.
| DateTime       | timestamptz      | For storing date and time, converted to UTC by default and transferred in ISO 8601 format.
| Date           | date             | Date field without a time part.
| Json           | jsonb            | Stores arbitrary JSON.
| Uuid           | uuid             | Universally unique identifier, used for all primary keys by default.
| Enum           | *custom domain*  | Field with predefined set of possible values. [details](#enums)

:::note
The database type can be changed with `columnType(...)` in schema definition.
#### Example: changing database type of Json field
```typescript
export class Post {
	config = d.jsonColumn().columnType('json')
}
```
:::


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

- If you need to limit a set of allowed values for a column, you can do it using enums. 
- Enum column types are mapped to GraphQL enums.
- In PostgreSQL, enums are represented as custom domain type.

### Use case
Let's say you want to add a state to the Post definition - it can be either a "draft", "for review" or "published".

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

Further, we can use not-null constraint and set default value which will be used when Post is created without state
specified

```typescript
export class Post {
	state = def.enumColumn(PostEnum).notNull().default("draft");
}
```

