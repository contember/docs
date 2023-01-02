---
title: Form inputs
---

Form components are used for editing data within Contember Admin. They are designed to work seamlessly with the data binding system, allowing you to focus on building your interface rather than worrying about data fetching, updating, and saving.

## Text input fields

Contember provides a variety of input-based form fields to allow you to capture and edit user input. These fields are essential for building user-friendly and intuitive forms in your application.

The most important of these fields is the `TextField`, which is used for capturing single-line plain text input. This field is easy to use and is especially useful for capturing small amounts of text, such as a name or a short description.

To use a `TextField`, you need to specify the `field` and `label` props. The `field` prop tells Contember which data field to bind the input to, while the `label` prop is used to provide a human-readable label for the input.

:::note
`label` prop must be specified, however, if you want your label to be empty, you can provide an `undefined` value.
:::

#### Example of how to use a TextField in a form:

```typescript jsx
import { TextField } from '@contember/admin'

const form = (
	<TextField field={'title'} label={'Title'} />
)
```

In addition to the `TextField`, Contember also provides several other text-based form fields:

- `TextareaField` - multi-line plain text input
- `EmailField` - email input with a client side validation
- `UrlField` - URL input with a client side validation

## Number input fields

There are two types of number fields available - `NumberField` and `FloatField`. Both of these fields are designed to allow users to input and edit numerical values.

The `NumberField` component is used to input and edit integer values. Props are similar to a `TextFiel` - including required `field` and `label`.

#### Example of how to use NumberField in your form:

```typescript jsx
import { NumberField } from '@contember/admin'
const form = (
	<NumberField field="age" label="Age" />
)
```

The `FloatField` component is used to input and edit float values. It has the same required props as NumberField.


```typescript jsx
import { FloatField } from '@contember/admin'

const form = (
	<FloatField field="price" label="Price" />
)
```
Both NumberField and FloatField support additional props such as description, readOnly, and width. Refer to the API documentation for a complete list of available props.

## Date and Time Fields in Contember
Contember provides a set of form fields for handling dates and times in your admin interface. These fields are built on top of the native HTML input elements and provide a convenient way to handle and manipulate dates and times in your application.

### DateField
The `DateField` component is used to input and display dates in your form. It is built on top of the native `input type="date"` element and provides a native browser picker for selecting a date.

```typescript jsx
import { DateField } from '@contember/admin'
const form = (
	<DateField field="publishedAt" label="Publish date" />
)
```

### TimeField
The `TimeField` component is used to input and display times in your form. It is built on top of the native `input type="time"` and the value is also selected from a native picker.

```typescript jsx
import { TimeField } from '@contember/admin'
const form = (
	<TimeField field="startTime" label="Start time" />
)
```
### DateTimeField
The `DateTimeField` component is used to input and display both dates and times in your form. It is built on top of the native `input type="datetime-local"` element and provides a convenient interface for selecting both a date and a time from a calendar and clock.

```typescript jsx
import { DateTimeField } from '@contember/admin'
const form = (
	<DateTimeField field="deadline" label="Deadline" />
)
```

All of these fields require the `field` prop, which specifies the field in your entity that the value should be saved to. The `label` prop is also required and is used to display a label for the field in your form.
