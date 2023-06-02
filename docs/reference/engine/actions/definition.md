---
title: Actions definition
---

This section of the documentation will guide you through the syntax and definition of Actions, allowing you to harness their full potential in your Contember applications.


:::note
When defining Actions in Contember, it is important to remember that adding or modifying Actions requires generating and applying [schema migrations](../schema/migrations.md).
:::

## Defining a Watch Action

To define an Action, you utilize Contember's decorator syntax. The `@watch` decorator is applied to the entity class you want to monitor for changes. 


#### Example: basic structure of an Action definition:

```javascript
import { SchemaDefinition as def, ActionsDefinition as action } from '@contember/schema-definition'

@actions.watch({
  name: 'action_name',
  watch: `fields_to_watch`,
  webhook: 'webhook_url',
  selection: 'optional_selection_for_payload',	
})
export class YourEntity {
  // Entity properties and relationships
}
```

- `name`: Specifies a unique name for the Action, which can be used for reference or identification purposes.
- `watch`: Defines the fields and relations to monitor for changes. You can use GraphQL-like syntax to specify the fields and relations to watch. This includes both direct fields of the entity and fields within related entities.
- `webhook`: Specifies the URL where the webhook notification should be sent when changes occur. [see advanced configuration](#webhook-configuration)
- `selection` (optional): Specifies the selection which will be send in a payload.

### Watching Fields and Relations

In the `watch` property, you define the fields and relations to monitor for changes. You can watch individual fields of the entity and also specify nested fields within related entities. This allows you to track changes in fields like strings, numbers, booleans, or timestamps, as well as changes in relationships between entities.


### Payload and Selection
By default, the payload sent to the webhook includes the changes that triggered the Action. However, you can further customize the payload by specifying a `selection` property within the `@watch` decorator. The `selection` property allows you to include specific fields in the payload, providing granular control over the data sent to the webhook.

Example: defining selection in a watch
```typescript
import { SchemaDefinition as def, ActionsDefinition as action } from '@contember/schema-definition'

@actions.watch({
	name: 'order_watch',
	watch: `
    status
    customer {
      name
      email
    }
  `,
	webhook: 'https://example.com/order/updated',
	selection: `
    status
    customer {
      name
    }
  `,
})
export class Order {
	// Entity properties and relationships
}
```

## Defining a Trigger Action

Trigger Actions in Contember offer a low-level alternative to watch-based Actions, allowing you to selectively monitor specific operations on an entity, such as creation, deletion, or updates to specific fields. With Trigger Actions, you have granular control over which operations trigger your webhook, enabling you to focus on the precise changes you need to track.

To define a Trigger Action, use the `@trigger` decorator on the entity class you want to monitor. 

Here's a structure of the Trigger Action syntax:

```typescript
import { SchemaDefinition as def, ActionsDefinition as action } from '@contember/schema-definition'

@actions.trigger({
  name: 'action_name',
  create?: boolean,
  delete?: boolean,
  update?: boolean | readonly string[],
  selection?: Actions.SelectionNode | string,
  webhook: 'webhook_target'
})
export class YourEntity {
  // Entity properties and relationships
}
```

- `name`: Specifies a unique name for the Trigger Action, which can be used for reference or identification.
- `create` (optional): Indicates whether to trigger the webhook when a new entity is created.
- `delete` (optional): Indicates whether to trigger the webhook when the entity is deleted.
- `update` (optional): Specifies whether to trigger the webhook when the entity is updated. It can be set to `true` to trigger on any update or an array of field names to trigger only when specific fields are modified.
- `selection` (optional): Allows you to include specific fields in the payload sent to the webhook, providing granular control over the data included in the notification.
- `webhook`: Specifies the URL or target configuration for the webhook notification.

#### Example: how to define a trigger action
```javascript
import { SchemaDefinition as def, ActionsDefinition as action } from '@contember/schema-definition'

@actions.trigger({
  name: 'book_created',
  create: true,
  selection: `
    title
    author {
      name
    }
  `,
  webhook: 'https://example.com/book/created',
})
export class Book {
  title = def.stringColumn();
  author = def.manyHasOne(Author);
}
```

With this Trigger Action configuration, the webhook will be triggered whenever a new `Book` entity is created. The payload sent to the webhook will contain the specified fields (`title` and `author.name`), allowing you to perform custom actions or notify external systems about the creation event.

## Webhook Configuration

The `webhook` property specifies the URL where the webhook notification will be sent. This can be an external service or an endpoint within your application that processes the webhook payload. You can customize the webhook URL to suit your specific integration requirements.

### Advanced Webhook Options

Instead of providing a simple string for the `webhook` property, you can pass an object that allows for more fine-grained control over the webhook configuration. This enables you to set additional headers, specify timeouts, control retry attempts, and customize the batching of webhook requests. Here's an example of how to use these advanced options:

```javascript
import {SchemaDefinition as def, ActionsDefinition as action} from "@contember/schema-definition"

@action.watch({
  name: 'book_watch',
  watch: `
    title
    tags {
      name
    }
  `,
  webhook: {
    url: 'https://example.com/book/updated',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json',
    },
    timeoutMs: 5000,
    maxAttempts: 5,
    initialRepeatIntervalMs: 2000,
    batchSize: 10,
  },
})
export class Book {
  // Entity properties and relationships
}
```

In this example, we define the `webhook` property as an object with the following advanced options:

- `url`: Specifies the URL where the webhook notification should be sent.
- `headers` (optional): Allows you to include custom headers in the webhook request. You can provide an object containing key-value pairs representing header names and their corresponding values.
- `timeoutMs` (optional): Defines the timeout duration in milliseconds for the webhook request. If the request takes longer than the specified timeout, it will be considered unsuccessful.
- `maxAttempts` (optional): Specifies the maximum number of attempts to send the webhook request in case of failures or errors.
- `initialRepeatIntervalMs` (optional): Sets the initial interval duration in milliseconds between repeated attempts to send the webhook request. This interval follows an exponential backoff strategy, doubling with each attempt until the maximum attempts are reached.
- `batchSize` (optional): Allows you to control the maximum number of events that will be included in a single payload when sending batched requests.

By utilizing these advanced webhook options, you can customize the behavior, reliability, and performance of your webhook integration in Contember. Feel free to adjust these options based on your specific requirements and the characteristics of your target webhook endpoint.

### Using Variables in Webhook URLs and Headers

You can utilize variables in the webhook URLs and header values of your Actions. This allows for dynamic and flexible configuration based on different environments or specific needs. Variables are enclosed in double curly braces, such as `{{variableName}}`, and can be used in both the webhook URL and header values.

For example:

```javascript
import {SchemaDefinition as def, ActionsDefinition as action} from "@contember/schema-definition"

@action.watch({
  name: 'book_watch',
  watch: `
    title
    tags {
      name
    }
  `,
  webhook: {
    url: `{{baseWebhookUrl}}/book/updated`,
    headers: {
      'Authorization': 'Bearer {{apiKey}}',
      'Content-Type': 'application/json',
    },
  },
})
export class Book {
  // Entity properties and relationships
}
```

In this example, we use the `baseWebhookUrl` variable to define the base URL for the webhook endpoint. By utilizing the variable in the `url` property of the `webhook` object, we can easily change the base URL when needed, providing flexibility and maintainability.

Additionally, the example demonstrates the usage of the `{{apiKey}}` variable within the `headers` object. This enables you to dynamically set the authorization token for the webhook request, making it adaptable to different scenarios.

The control and management of these variables will be further explained in the next section, [Managing Actions](./managing.ts), where you will learn how to handle variables and set their values.

### Using separate targets for shared configuration

Contember provides an alternative syntax that allows you to separate webhook target for shared webhook configurations. This approach enables you to reuse the same webhook configuration across multiple Actions and provides flexibility for enabling or disabling the watch while keeping the target definition intact. Here's an example of how to use this syntax:

```javascript
import {SchemaDefinition as def, ActionsDefinition as action} from "@contember/schema-definition"

export const myOrderUpdateTarget = actions.createTarget({
  name: 'my_order_update_target',
  type: 'webhook',
  url: 'http://localhost',
});

@actions.watch({
  target: myOrderUpdateTarget,
  name: '...',
  watch: '...',
})
export class Foo {
  // Entity properties and relationships
}
```

In this example, we define a separate webhook target named `myOrderUpdateTarget` using the `createTarget()` function. The target configuration includes properties such as `name`, `type`, and `url`. The `type` is set to `'webhook'`, indicating that this target represents a webhook endpoint.

To associate the webhook target with an Action, we use the `target` property within the `@watch` decorator instead of the traditional `webhook` property. This allows us to reference the shared webhook target for the specific Action. The rest of the configuration, such as the `name` and `watch` properties, remains the same.

This approach also allows you to disable the watch while keeping the target definition intact, allowing any pending events to be dispatched even if the watch is not active.
