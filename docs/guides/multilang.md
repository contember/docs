---
title: Multilingual content
---

This guide will walk you through adding support for multiple languages to your project.


# 1. Schema

For the schema we will assume you have articles you want to translate. For this we will create an entity `Article` containing the fields that are the same for all translations of the article. This may include things such as cover image. Second, we will create a `ArticleTranslation` representing translation of the article to specific language (specified using has-one `language` relation). 


```tsx
import { SchemaDefinition as def } from '@contember/schema-definition'

export class Article {
  // 
  translations = def.oneHasMany(ArticleTranslation, 'article')
}

@def.Unique('article', 'language')
export class ArticleTranslation {
  article = def.manyHasOne(Article, 'translations').notNull()
  language = def.manyHasOne(Language).notNull()

  title = def.stringColumn().notNull()
}

export class Language {
  name = def.stringColumn().notNull()
}
```

We will generate migrations using `npm run contember migrations:diff . add-article-translations` command.


# 2. Dimensions configuration in administration

Contember Administration includes support for ``

