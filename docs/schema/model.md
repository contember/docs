---
title: Model Schema
---

Contember Project Schema defines schema of your model and also ACL and validation rules. But first lets look at the model schema, which is now the most important for us.

<!--
TODO: PICTURE OF PROJECT SCHEMA, MODEL SCHEMA, ACL SCHEMA AND INPUT VALIDATION SCHEMA
-->

## Entity

Basic unit in model schema is called entity. Each entity can have columns and relationships to other entities.

You define an entity by exporting a class from the schema definition file
```typescript
// projects/<name>/api/model/Post.ts
export class Post {
}
```
 
You don't have to define a primary key, because every entity has "id" column by default.

> How can i change primary key definition?


## Columns

Except its name, each column has a type definition and optionally you may define some flags, like nullability.

Currently we support following column types
- Uuid
- String
- Int
- Double (IEEE 64-bit float)
- Bool
- Enum 
- DateTime
- Date  

You define a column by adding a property to an entity.
```typescript
import { SchemaDefinition as def } from '@contember/schema-definition'

export class Post {
  title = def.stringColumn().notNull()
  publishedAt = def.dateTimeColumn()
}
```
(note that we added SchemaDefinition import)



## Relationships

Contember knows and correctly handles all kinds of relationships - one has one, one has many and many has many.

> ADD EXAMPLE OF ALL POSSIBLE RELATIONSHIP
> IDEALLY WITH PICTURES
> SEE DOCTRINE FOR EXAMPLE

Lets define another entity - a category:
```typescript
import { SchemaDefinition as def } from '@contember/schema-definition'

export class Category {
  title = def.stringColumn()
}
```

Now add a relationship field to the Post entity definition:
 ```typescript
import { SchemaDefinition as def } from '@contember/schema-definition'
 
export class Post {
  title = def.stringColumn().notNull()
  category = def.manyHasOne(Category)
 }
 ```

You can also define inverse side of the relationship:
```typescript
import { SchemaDefinition as def } from '@contember/schema-definition'

export class Category {
  title = def.stringColumn()
  posts: def.OneHasMany = def.oneHasMany(Post, 'category')
}

export class Post {
  title = def.stringColumn().notNull()
  category = def.manyHasOne(Category, 'posts')
}
```
> Note that there is explicit type for `posts` field. That is due to TypeScript limitations. 

### Relationships nullability

You can also define `.notNull()` constraint for "one has one" relationships and owning side of "many has one" relationship.

### On delete behaviour

Using `.onDelete()` you can set what happens when referenced entity is deleted. E.g. you have a post, which is assigned to a category. When a category is deleted, three things can happen:
- restrict: this is default behaviour. When you try to delete an entity, which is referenced from other entities, the delete operation will fail.
- set null: field, which references removed entity, is set to null. Obviously, this is possible only for nullable relationships. You can use shortcut `.setNullOnDelete()` to select this behaviour.
- cascade: all entities, which references an entity which is being removed, are also removed. You can use a shortcut `.cascadeOnDelete()`.


Pay attention when you are choosing the strategy, because choosing a wrong strategy may lead to runtime errors.

> In database, all relationships are marked as "NO ACTION" and actual strategy is executed by Contember. This is because Contember can evaluate ACL rules.

### Default order

You can use a method `.orderBy()` on "has many" relationships to set default order of this relationship. Of course, you can later override this order in a query.

By calling this method multiple times, you can set subsequent order rules.

## Unique fields
You can mark a column unique by calling method `.unique()` on it.
```typescript
slug = def.stringColumn().unique()
```
If you need composite unique key, use a class decorator:
```typescript
@def.Unique('locale', 'slug')
export class Post {
  slug = def.stringColumn().notNull()
  locale = def.stringColumn().notNull()
}
```
"one has one" relationships are marked as unique by default.

## Enums

If you need to limit a set of allowed values for a column, you can do it using enums. Lets say you want to add a state to the Post definition - it can be either a "draft", "for review" or "published".

First define an enum
```typescript
export const PostEnum = def.createEnum('draft', 'published', 'for_review')
```
And now we can reference it from Post entity
```typescript
export class Post {
  state = def.enumColumn(PostEnum)
}
```

Continue to next chapter to learn how to create and run [database migrations](schema/migrations.md).
