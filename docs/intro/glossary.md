---
title: Glossary
---

### Workspace

Your (git) repository with one or more Contember projects.

### Project

Every project contains Contember Schema definition for your simple website, blog or any other content-based platform or database. Optionally any project can have its [Contember Admin](admin/introduction.md).

### Instance

A running Contember Engine server hosting as many Contember projects as you like (and providing their Content API). Each instance has a single Tenant API, so you can store and manage access from a single point.

![APIs on a single instance](/assets/single-instance.svg)

### [Content API](/reference/engine/content/overview.md)

The main GraphQL API for your project. It is automatically generated from your schema definition

### System API

Is a complementary API for your project. Used to manage schema migrations.

### [Tenant API](/reference/engine/tenant/overview.md)

Using this API you can manage users, API keys and project memberships on an instance

### [Project Schema](/reference/engine/schema/overview.md)

Definition of your model, ACL rules and input validation rules.

### [Project Schema Migrations](/reference/engine/schema/migrations.md)

Chronologically sorted immutable JSON files containing all schema changes. These files are "source of true" of a schema.

### Event

Each operation you make in your data is stored in an event log. This log can be used for history.

### Superadmin

Is a special user role. This user is the most powerful user of a system.

<!--
ADD MODEL SCHEMA, ACL RULES, INPUT VALIDATION RULES
ADD ENTITY
UNIFY TERMINOLOGY "DATA MODEL" vs. "CONTENT SCHEMA" vs. "MODEL SCHEMA"
-->
