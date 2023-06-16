---
title: Installation
---

Welcome to Contember! Contember is an **open-source platform** designed to help you easily build and run custom web applications.

:::tip new

Now we've built **Contember Studio**. It uses AI to instantly turn your description into a functional web app in Contember platform. You get the code so then you can change just about anything. [Request early access](https://rik9zhzhn1g.typeform.com/to/UWv1lamK).

If you've already been invited, generated your project, and are seeking guidance on making your first changes, [here's the guide](/intro/studio-quickstart) you need.

:::

Contember platform is comprised of the following components:

- **Contember Engine** is a server that automatically generates a GraphQL API to read and manage your data. By defining your own data model using TypeScript, the Engine quickly transforms it into a GraphQL API. This standalone server offers an extensive GraphQL API for your data, which we call the [Content API](/reference/engine/content/overview). Additionally, the Contember API provides a [Tenant API](/reference/engine/tenant/overview) for handling authentication and authorization, allowing you to control who can access your data and how they can interact with it.
- **[Contember Interface](/reference/admin/introduction)** is a React SDK that enables you to create custom user interfaces using React. By defining your own management UI with high-level React components, your interface will [automatically connect](/reference/admin/data-binding/overview) to the GraphQL API provided by the Contember Engine. This means you can declaratively build user interfaces without having to write a single GraphQL query.

### Most important features

- **Powerful role-based [access control](/reference/engine/schema/acl.md)**: Define an unlimited number of roles and enforce cell-level security. This feature allows you to maintain strict control over who can access specific data, enhancing the security of your application.
- **Generates well-structured PosgreSQL database**: Ensures that your data is organized and efficient, making it easier to manage and maintain.
- **Instantly provides a [GraphQL API](/reference/engine/content/overview.md) for every operation**: GraphQL APIs are automatically scoped for each role, allowing you to perform operations with ease and keep the API secure for different users.
- **Built-in [authentication](/reference/engine/tenant/overview.md)**: Securely manage user access without the need for additional authentication solutions.
- **Automatic database [migrations](/reference/engine/schema/migrations.md)** Streamline the process of updating your database schema, reducing the risk of errors and making it easier to implement changes.
- **Multi-language, translatable**: Easily create applications that cater to a global audience by supporting multiple languages.
- **Fully extendable with your own React.js components**: Customize and enhance your application's user interface with ease, tailoring it to your specific needs.


### Why Contember

We're on a mission to make building and running custom web apps accessible to everyone. With over 15 years of experience in web development, we understand the challenges involved in creating, maintaining, and evolving web applications over time. We've used this knowledge to build the Contember platform with the following principles in mind:

- **Minimal lines of code**: Create powerful applications using as few lines of code as possible, reducing complexity and making it easier to develop and maintain your app.
- **Everything is code (TypeScript and React)**: Embrace development best practices such as version control with Git and continuous integration/continuous deployment (CI/CD) workflows.
- **Flexible data structure**: Contember doesn't impose any arbitrary collections or posts. Instead, you can create any entities you want with attributes and relationships that suit your needs. Schema overview
- **No vendor lock-in**: Contember is open-source, meaning you have the freedom to modify and adapt the platform to your specific requirements without being restricted by proprietary software.

:::tip What's next

You can [build your own Contember project from scratch](/intro/quickstart) or check out our [starter kits](https://github.com/contember/starter-kits).

:::