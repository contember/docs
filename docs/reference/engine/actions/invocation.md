---
title: Webhook invocation
---

:::caution Alpha Feature
Please note, the Actions feature is only available starting from version 1.3, which is currently in alpha. [Read more](./overview.md#alpha-stage-feature)
:::

# Webhook Invocation in Actions

After a watched event on a monitored entity is registered, it is queued within the actions queue. The Actions worker waits for these events to be dispatched and triggers the corresponding webhooks configured for the events.

## Batching

To optimize efficiency, events targeting the same webhook can be batched together, allowing for processing multiple events in a single invocation. By default, each batch contains a single event, and the event payload is wrapped in an array. However, you can adjust the `batchSize` property in the webhook configuration to specify the maximum number of events per batch.

It's important to note that when processing a batch, all events within the batch are considered either successful or failed based on the HTTP response code. Currently, partial success for individual events within a batch is not supported. If any event in the batch fails, the entire batch is considered failed.

## Fetching events

The worker identifies events ready for processing based on their visibility, selecting events with the lowest visibility first. It then groups together events with the same target to form a batch. The payload for each event is already constructed when it is saved to the queue, simplifying the worker's role to dispatching the batched payloads.

## Payload Construction and Variable Replacement

In the webhook URL and header values, variables can be used using double curly braces (`{{variableName}}`). These variables are replaced with their corresponding values at the time of webhook invocation. It provides flexibility and customization by allowing dynamic content based on the context of the
event.

By default, Contember appends the following headers to the webhook request:

- `User-Agent: Contember Actions`
- `Content-Type: application/json`

These headers identify the source of the webhook request and specify the format of the payload.

## Timeout and Retry Handling

A timeout is enforced for webhook completion to ensure timely processing. By default, the timeout is set to 30 seconds, but it can be adjusted in the webhook configuration (using `timeoutMs` prop). If a webhook fails to respond within the specified timeout, all events in the batch are marked as "retrying." Similarly, if the webhook does not respond with an HTTP status code in the 2xx range, the events are also marked as "retrying." This mechanism helps to handle failures and retries automatically, ensuring robust event processing.

Contember follows a retry strategy for events marked as "retrying." By default, the initial repeat interval between retry attempts is set to 5,000 milliseconds (can be changed using `initialRepeatIntervalMs` webhook prop), and it follows an exponential backoff strategy for subsequent retries. The interval between retries doubles with each attempt until the maximum number of attempts is reached. The maximum number of attempts is set to 10 (`maxAttempts` prop in webhook configuration), meaning 
Contember will attempt to send the webhook request a maximum of 10 times before considering it as a failure.

## Payload

When a batch of events is dispatched and the corresponding webhook is invoked, the payload sent to the webhook contains a field named `events`. This field holds an array of event payloads representing the batched events. Each event payload follows a specific structure based on the type of event triggered. 

#### Example: webhook body
```json5
{
		"events": [ 
				{
						"id": "...",
						"entity": "...",
						"type": "watch",
						// ...
				},
				/// other events
		]
}
```

### Watch Event Payload

A `watch` event payload represents a change in the watched entity and provides detailed information about the change. Here is the structure of a `watch` event payload:

- `id` (string): The unique identifier of the entity event.
- `entity` (string): The entity type of the watched entity.
- `events` (array of objects): An array of event payloads representing the changes in the watched entity. Each event payload has the following properties:
	- `id` (string): The unique identifier for the event.
	- `path` (array of string): The path to this entity relative to the watched entity.
	- `entity` (string): The entity type of the event.
	- `operation` (string): The type of operation performed on the entity, such as `create`, `update`, `delete`, `junction_connect`, or `junction_disconnect`.
  - [other fields based on operation type](#basic-events)
- `trigger` (string): The name of the trigger associated with the event.
- `operation` (string): The operation type of the event, which is set to `watch` for a watch event.
- `selection` (object): Custom payload defined by `selection` on a watch definition

#### Example: payload of a `watch` event payload for a `Book` entity:

```json
{
  "id": "f4f0a97d-7850-4add-8946-a1ce016306ce",
  "entity": "Book",
  "events": [
    {
      "id": "f4f0a97d-7850-4add-8946-a1ce016306ce",
      "entity": "Book",
      "values": {
        "title": "Sample Book Title"
      },
      "operation": "update"
    }
  ],
  "trigger": "book_updated_watch",
  "operation": "watch",
  "selection": {}
}
```

In this example, the `watch` event payload represents an update operation on a `Book` entity. It includes the updated value of the `title` property. The `operation` is set to `update`, and the associated trigger is `book_updated_watch`. Additional information, such as the selection of fields, can be included in the `selection` property if specified in the watch configuration.

### Trigger Event Payload

Trigger event payloads represent payloads for events invoked by `trigger` and contains individual basic events.

- `id` (string): The unique identifier for the entity.
- `entity` (string): The entity type associated with the event.
- `operation` (string): The type of operation performed on the entity. Possible values are `create`, `update`, `delete`, `junction_connect`, or `junction_disconnect`.
- `selection` (object, optional): Additional information about the selected fields in the event, if specified in the event configuration.
- [other fields based on operation type](#basic-events) 

Here's an example of a basic event payload for an `update` operation on a `Book` entity:

```json
{
  "id": "f4f0a97d-7850-4add-8946-a1ce016306ce",
  "entity": "Book",
  "values": {
    "title": "Updated Book Title",
    "author": "John Doe"
  },
  "operation": "update",
  "selection": {},
  "path": ["books", "123"]
}
```

In this example, the basic event payload represents an `update` operation on a `Book` entity. It includes the updated values of the `title` and `author` properties. The `operation` is set to `update`, and the `id` identifies the specific book entity. The `selection` and `path` properties are optional and provide additional context or information about the event within the entity graph.


### Basic events

Basic event payloads represent individual operations performed on entities. They provide information about the specific operation and the changes made to the entity.

```typescript
export type UpdateEvent = {
	operation: 'update'
	entity: string
	id: PrimaryValue
	values: JSONObject
	old?: JSONObject
}

export type CreateEvent = {
	operation: 'create'
	entity: string
	id: PrimaryValue
	values: JSONObject
}

export type DeleteEvent = {
	operation: 'delete'
	entity: string
	id: PrimaryValue
}

export type JunctionConnectEvent = {
	operation: 'junction_connect'
	entity: string
	id: PrimaryValue
	relation: string
	inverseId: PrimaryValue
}

export type JunctionDisconnectEvent = {
	operation: 'junction_disconnect'
	entity: string
	id: PrimaryValue
	relation: string
	inverseId: PrimaryValue
}
```
