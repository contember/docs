---
title: Glossary
---

## **Workspace**
Your main repository, where you have all your projects, instances, build scripts etc.

## **Project**
Every project contains Contember Schema definition for your simple website, blog or any other content-based platform or database. Optionally any project can have its [Contember Admin](admin/overview.md).

## **Instance**
Set of configured projects running together as a single Contember API - it contains Content APIs for each project running on this instance and one Tenant API. Usually, you have just a one instance.

![APIs on a single instance]('/assets/single-instance.svg')

## **Content API**
A GraphQL API for your project, which is automatically generated from your schema definition

## **System API**
Is a complementary API for your project. Currently it is mainly used for stage-related operations like diffs or merging

## **Tenant API**
Database backed GraphQL API running on the Contember instance. Using this API you can manage users, API keys and project memberships.

## **Project Schema**
Definition of your model, ACL rules and input validation rules. Contember uses schema migrations to update this schema.

## **Project Schema Migrations**
Chronologically sorted immutable JSON files containing all schema changes. These files are "source of true" of a schema.


## **Stage**
You can imagine it as branches for your data. You can diff them or merge them. Two stages are sufficient for most project - "live" stage, from which all user facing application reads data, and "draft" stage, where you edit and manage all your data. And after you are happy, you simply merge them into "live". Currently it is not recommended to use more then 2 stages.

## **Event**
Each operation you make in your data is stored in an event log. This log can be used for history or for working with stages.

## **Superadmin**
Is a special user role. This user is the most powerful user of a system.


<!--
ADD MODEL SCHEMA, ACL RULES, INPUT VALIDATION RULES
ADD ENTITY
UNIFY TERMINOLOGY "DATA MODEL" vs. "CONTENT SCHEMA" vs. "MODEL SCHEMA"
-->

