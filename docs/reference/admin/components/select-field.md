---
title: Select field
---

The `SelectField` and `MultiSelectField` components in Contember are powerful tools for creating select fields that can be used to select a single or multiple values from a list of options.

To use these components, you must specify the `field`, `options` and `label` props. The `field` prop specifies the field in the data model that the select field will be bound to, the `label` prop specifies the label that will be displayed for the select field, and the `options` specified either predefined list of values, or an entity name, usually with a field.

The `SelectField` component can be used to create a static single-value select field with predefined options, or a select field where you select an entity.

The `MultiSelectField` component works in a similar way to the `SelectField` component, but allows the user to select multiple values from the dropdown menu. Also, predefined options variant is not possible with `MultiSelectField`.


## Static `SelectField`

The `SelectField` component in Contember Interface can be used to create a select field with predefined options. To create a select field with predefined options, you can specify an array of option objects in the `options` prop.

Each option object should have a `value` and a `label` field. The `value` field specifies the value that will be stored in the data model (usually mapped to an enum column) when the option is selected, while the `label` field specifies the JSX label that will be displayed for the option in the dropdown menu.

#### Example how to use static `SelectField`
```typescript jsx
<SelectField
	field={'align'}
	label={'Align'}
	options={[
		{ value: 'left', label: 'Left' },
		{ value: 'right', label: 'Right' },
		{ value: 'center', label: 'Center' },
	]}
/>
```

## `SelectField` for entities

The `SelectField` component can also be used to create a dynamic select field that allows the user to select an option from a list of entities. To create a dynamic select field, you can use the `options` prop of the `SelectField` component to specify a [qualified field list](../data-binding/query-language.md#qualified-field-list), which is a string that specifies the entity and field name to use for the options.

#### Example how to use dynamic `SelectField`
```typescript jsx
<SelectField
	label={'Category'}
	field={'category'}
	options={'Category.name'}
/>
```

The example considers model similar to this:

```typescript
export class Category {
	name = def.stringColumn()
}
export class Article {
	category = def.manyHasOne(Category)
}
```

In this example, the select field will be bound to the category field in the data model, and will allow the user to select an option from a list of options that is bound to the name field of the Category entity. The selected value will be stored in the category field, and the corresponding label will be displayed in the select field.

You can also use the expanded object syntax to specify additional options for the select field. For example, you can use the `orderBy` field to specify the order in which the options should be displayed.


### Example how to use orderBy in a `SelectField`

```typescript jsx
<SelectField
	label={'Category'}
	field={'category'}
	options={{
	  fields: 'Category.name',
	  orderBy: 'name desc',
  }}
/>
```

## `MultiSelectField`

The `MultiSelectField` component works in a similar way to the `SelectField` component, but allows the user to select multiple values from the dropdown menu.

To use the MultiSelectField component, you must specify the `field`, `options` and `label` props. The `field` prop specifies the field in the data model that the multi-select field will be bound to, while the `label` prop specifies the label that will be displayed for the multi-select field. The `options` prop of the `MultiSelectField` component to specify a qualified field list, which is a string that specifies the entity and field name to use for the options.

#### Example how to use MultiSelectField
```typescript jsx
<MultiSelectField
	label={'Tags'}
	field={'tags'}
	options={'Tag.name'}
/>
```
The example considers model similar to this:
```typescript
export class Tag {
	name = def.stringColumn()
}
export class Article {
	tags = def.manyHasMany(Tag)
}
```



## Clearing a value in `SelectField`

The `allowNull` prop in the `SelectField` component allows you to specify whether or not the select field should allow the user to select a null value. This is useful in cases where you want to allow the user to clear the selected value in the select field.

## Advanced label rendering

In the `SelectField` and `MultiSelectField` components, you can customize the rendering of the options in the select field by specifying the `optionLabel` prop. The `optionLabel` prop takes a React element with a single label content. Also, in `options` prop you only define an entity ([qualified entity list](../data-binding/query-language.md#qualified-entity-list)), without a field name.

#### Example how to render custom label

```typescript jsx
<SelectField
	field={'category'}
	label={'Category'}
	options={'Category'}
	optionLabel={<>
		<Field field={'name'} />
		<HasMany field={'locales'}>
			<Field field={'name'} />
		</HasMany>
	</>}
/>
```
In this example, the select field will render a label for each option that consists of the name field of the Category entity and the name field of the locales relation of the Category entity.

## Lazy options loading

The `SelectField` and `MultiSelectField` components support lazy loading of options. This is useful in cases where you have a large number of options that you do not want to load all at once, or where you want to provide a search-as-you-type functionality for the options.

To enable lazy loading, you can set the `lazy` prop in the `SelectField` or `MultiSelectField` component.
#### Enabling lazy loading of options
```typescript jsx
<SelectField
	field={'category'}
	label={'Category'}
	options={'Category.name'}
	lazy
/>
```

The `lazy` prop can also take an object with the following options:
- `initialLimit`: The number of options to load initially
- `limit`: The number of options to load on debounced input
- `inputDebounceDelay`: Debounce delay in ms
- `createFilter`: callback to construct custom filter

#### Example how to use lazy options in SelectField

```typescript jsx
<SelectField
	field={'category'}
	label={'Category'}
	options={'Category.name'}
	lazy={{
		initialLimit: 0,
		limit: 10,
	}}
/>
```
In this example, the select field will not load any options initially, and will load up to 10 options on each keystroke. This will allow the user to search for options as they type in the select field.

You can specify the field names to search in using `searchByFields`
```typescript jsx
<SelectField
	// ...
	searchByFields={['name', 'description']}
/>
```

:::note
`searchByFields` prop is required if you are using [advanced label rendering](#advanced-label-rendering)
:::

## In memory filtering and sorting

In-memory filtering and sorting is enabled by default in the `SelectField` and `MultiSelectField` components. To customize the in-memory filtering and sorting behavior, you can use the `searchByFields` and `fuseOptions` props.

The `fuseOptions` prop is an object with options for the Fuse.js library, which is used for in-memory filtering and sorting. You can use this prop to customize the behavior, for example by specifying the threshold or minMatchCharLength options. For a full list of options, see the Fuse.js documentation.

#### Example how to configure Fuse.js
```typescript jsx
<SelectField
	field={'category'}
	label={'Category'}
	options={'Category.name'}
	fuseOptions={{
		threshold: 0.3,
		minMatchCharLength: 3,
	}}
/>
```

You can set `fuseOptions` to `false` to disable in-memory filtering and sorting.

```typescript jsx
<SelectField
	field={'category'}
	label={'Category'}
	options={'Category.name'}
	fuseOptions={false}
/>
```

## Creating items in-place

In the `SelectField` and `MultiSelectField` components, you can allow users to add new options in place by specifying the `createNewForm` prop.

The `createNewForm` prop takes a React element with a Contember form, which can be either a custom form component, or inline JSX with fields.

#### Example how to use createNewForm
```typescript jsx

<SelectField
	label={'Category'}
	field={'category'}
	options={'Category.name'}
	createNewForm={<CategoryForm />}
/>
```
In this example, the select field will display a "plus" button next to the options. When the button is clicked, a modal will be displayed with the `CategoryForm` form, which allows users to create a new `Category` entity.

## Sortable `MultiSelectField`

In the `MultiSelectField` component, you can allow users to sort the selected items by specifying the `sortableBy` prop.

The `sortableBy` prop takes a field name which holds the order of selected items. `sortableBy` prop is usually used in combination with the `connectingEntityField` prop, which specifies the field on the connecting entity that holds the selected options.

#### Example how to define sortable multi-select
```typescript jsx
<MultiSelectField
	label={'Tags'}
	field={'tags'}
	options={'Tag.name'}
	connectingEntityField={'tag'}
	sortableBy={'order'}
/>
```

The example considers model similar to this:

```typescript
export class Tag {
	name = def.stringColumn()
}
export class Article {
	tags = def.oneHasMany(ArticleTag, 'article')
}
export class ArticleTag {
	article = def.manyHasOne(Article, 'tags')
	tag = def.manyHasOne(Tag)
	order = def.intColumn()
}
```
:::note
Because we need to store the `order` field, we cannot use standard many-to-many relation, but we create a joining entity, which stores the relation to both entities with an order
:::
