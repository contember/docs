---
title: Contember documentation
slug: /
---

Contember is an **open source headless development platform**. It makes it easy to build, maintain and operate systems for managing any type of content.

:::tip Use Contember as Headless CMS

We have a [template](https://github.com/contember/templates/tree/main/headless-cms) ready to go. Including simple frontend in Next.js.

:::

:::tip Try Contember in 10 minutes

Follow our [quickstart](/intro/quickstart) to understand the basics and build something by yourself.

:::

**Contember Engine** lets you define your own data model with TypeScript and instantly turns it into a GraphQL API. It is a standalone server, which provides an extensive GraphQL API for your data - we call it the Content API. Contember API also provides, what we call a Tenant API which handles authentication and authorization, so you can control who and how can access your data.

**Contember Interface** is an React framework for building custom management interfaces. It lets you define your own management UI with high-level React components and automatically connects to GraphQL provided by Contember Engine.

### Main principles

- **Everything is code** (TypeScript and React).
- The structure of the data is up to you, Contember doesn't force any arbitrary collections or posts. **Create any entities you want with attributes and relationships**. [Schema overview](/reference/engine/schema/overview.md)
- The administration is not dependent on your data structure. Build any views with few lines of code. [Interface introduction](/reference/admin/introduction.md)

### Highlighted features

- Generates well-structured PosgreSQL database
- Instantly provides you with [GraphQL API](/reference/engine/content/overview.md)
- Built-in [authentication](/reference/engine/tenant/overview.md)
- Powerful role-based [ACL](/reference/engine/schema/acl.md)
- Automatic database [migrations](/reference/engine/schema/migrations.md)
- Multi-language, translatable
- Extend with your own React.js components

![contember administration screenshot](/assets/content-repeater.webp)