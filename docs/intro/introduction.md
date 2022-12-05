---
title: Contember
slug: /
---

Contember is an **open-source platform** that helps you build web applications with GraphQL and React. It provides a server that creates a GraphQL API for your data and an SDK for building custom user interfaces with React. This allows you to quickly and easily create data-driven web applications that are tailored to your specific needs.

You can run Contember yourself or use our managed [Contember Cloud](https://www.contember.com/pricing).

### Contember Engine
Lets you define your own data model with TypeScript and instantly turns it into a GraphQL API. It is a standalone server, which provides an extensive GraphQL API for your data - we call it the Content API. Contember API also provides, what we call a Tenant API which handles authentication and authorization, so you can control who and how can access your data.

### Contember Admin
Is an React framework for building custom management interfaces. It lets you define your own management UI with high-level React components and automatically connects to GraphQL provided by Contember Engine.

### Use Contember to build:
- Custom headless CMS (Grab our [template](https://github.com/contember/templates/tree/main/headless-cms) or [multilingual template](https://github.com/contember/starter-kits/tree/main/headless-multilingual-cms))
- Event ERP
- CRM
- B2B portals
- Membership management
- Reservation management
- Contract management
- Order management
- Asset management
- Compliance
- Information systems
- Marketplace
- User zone
- Domain specific dashboards

and more.

---

### Main principles

- **Everything is code** (TypeScript and React).
- The structure of the data is up to you, Contember doesn't force any arbitrary collections or posts. **Create any entities you want with attributes and relationships**. [Schema overview](/reference/engine/schema/overview.md)
- The administration is not dependent on your data structure. Build any views with few lines of code. [Administration introduction](/reference/admin/introduction.md)

### Highlights

- Generates well-structured PosgreSQL database
- Instantly provides you with [GraphQL API](/reference/engine/content/overview.md)
- Built-in [authentication](/reference/engine/tenant/overview.md)
- Powerful role-based [access control](/reference/engine/schema/acl.md)
- Automatic database [migrations](/reference/engine/schema/migrations.md)
- Multi-language, translatable
- Write your own React.js components

![contember administration screenshot](/assets/contember-screenshot.png)

:::tip Try Contember in 10 minutes

Follow our [quickstart](/intro/quickstart) to understand the basics and build something by yourself.

:::