---
title: Actions
---

Actions in Contember provide developers with a powerful way to monitor entity changes and invoke webhooks in response. With Actions, you can automate processes, integrate with external systems, and enhance your application's efficiency.

To define an Action, you utilize Contember's decorator syntax. Here's a sample definition to illustrate the structure:

```javascript
import { SchemaDefinition as def, ActionsDefinition as action } from "@contember/schema-definition"

@action.watch({
  name: 'book_watch',
  watch: `
    title
    tags {
      name
    }
  `,
  webhook: 'https://example.com/book/updated',
})
export class Book {
  title = def.stringColumn();
  tags = def.manyHasMany(Tag);
  category = def.manyHasOne(Category);
}
```

In the provided sample, an Action is defined for the `Book` entity in Contember. This Action is configured to watch for creation, deletion and all changes in the `title` field of the `Book` entity, as well as any modifications `tags` relation, detecting when tags are added or removed from the book, or the tag name is changed. Whenever any of these watched fields or relations are modified, Contember triggers the specified webhook, allowing you to automate processes, integrate with external systems, or perform custom actions.

In the following sections of this documentation, we'll delve deeper into configuring Actions, customizing payloads, exploring best practices, and more. Let's explore the full potential of Actions in Contember and optimize your development workflow.

- [Defining Actions](./definition.md)
- [Managing Actions](./managing.md)
- [Webhook invocation](./invocation.md)

## Alpha feature

Please note that Actions are currently in the alpha stage in Contember 1.3 and everything is subject of change.

## EE only feature

Please note that feature is not included in the Contember open-source edition but is available as part of the Contember Enterprise Edition (EE).

If you are using Contember Cloud, please reach out to us to enable the Contember 1.3 alpha release for your project. Additionally, note that access to the Actions requires a "team" or higher plan.

## Local development

To utilize Actions in your Contember projects locally, you will need to use the `contember/engine-ee` Docker image to enable support for Actions. It is important to mention that the Contember EE is free to use for development and testing purposes. In order to fire webhooks and trigger the Actions, you must ensure that the Actions worker is enabled. To enable the Actions worker, you can set the `CONTEMBER_APPLICATION_WORKER` environment variable to 'all' in your Docker Compose configuration for the Contember Engine service.

#### Updated Docker Compose configuration:

```yaml
services:
  contember-engine:
    image: contember/engine-ee:1.3.0-alpha
    environment:
      CONTEMBER_APPLICATION_WORKER: 'all'
      # other envs
```

In the updated configuration, we have changed the `image` field to `contember/engine-ee:1.3.0-alpha` to use the Contember Enterprise Edition (EE) version with Actions support. Additionally, we have added the `CONTEMBER_APPLICATION_WORKER` environment variable and set it to `'all'`.


You can also manually control and fire webhooks using [Actions management API](./managing.ts)
