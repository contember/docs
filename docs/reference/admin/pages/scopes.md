---
title: Scopes
---

# <span className="version">Interface 1.2+</span> Scopes

Contember provides several prepared scope components to help you quickly set up common pages in your interface. These scope components handle common tasks like loading and saving data, rendering form fields and displaying entity lists.

:::note Pages vs Scopes
Before introduction of Scopes, Contember used to have a different approach that was tied to `LayoutPage` component which caused troubles with reusability and flexibility.

Scopes are now separated from layout, which means more declarative approach to writing pages and more flexibility for your layouts.

**This also means that the persist button or title components are not automatically rendered anymore.** When re-writing pages to support Scopes, e.g. you must add the `PersistButton` component to render it manually and it must be placed within the Scope component.

The [old approach](./pages-components) is still supported, but it is not recommended to use it for new pages.
:::

### Page content

The most basic page content is rendered as children inside a layout content area. With help of [Slots](/reference/admin/layouts/slots) you can render content into layout pre-defined areas such as `Title`, `Sidebar`, `Navigation`, or `Actions` even though they are defined outside of the content area. customize the page's title, add content to the sidebar, add navigation elements or actions to the page for the current route.

#### Example how to use Slots with page content

```tsx
import { GenericPage } from '@contember/admin'
import { SlotSources } from '../components/Slots'

const { Title } = SlotSources

export default () => {
	return (
		<>
			<Title>Page title</Title>
			<p>Content here</p>
		</>
	)
}
```

### CreateScope

CreateScope is a component used for creating a new entity. It requires an `entity` prop (of type [unconstrained qualified single entity](../data-binding/query-language#unconstrained0qualified-single-entity)) which specifies the entity type being created. The form fields are defined using its children.

The `redirectOnSuccess` prop allows you to specify the target page after the entity has been successfully created. If no redirect target is defined, you will be able to create another entity.

Additionally, you can use [Slots](/reference/admin/layouts/slots) to render title, actions or sidebar content of the current route to the other areas of the layout.

If you set the `orderField` prop, the specified field will be automatically filled with the next available value. This is useful for entities that have an order field, as it allows you to easily specify the order in which the entities should be displayed.

For more details on CreateScope props and their usage, see the [API reference](../api/v1.2/Scopes/CreateScope.mdx).

#### Example how to use CreateScope

```tsx
import { CreatePage, PersistButton, TextField } from '@contember/admin'
import { SlotSources } from '../components/Slots'

const { Actions, Title } = SlotSources

export default () => {
	return (
		<>
			<Title>Create new article</Title>
			<CreateScope
				entity="Article"
				redirectOnSuccess="article/list"
				orderField="order"
			>
				<TextField field={'title'} label={'Title'} />
				{/* .... */}
				<Actions>
					<PersistButton />
				</Actions>
			</CreatePage>
		</>
	)
}
```

This page will allow you to create a new article and will redirect to the list of articles after the entity has been successfully created. The `Title` slot is being used to set the title of the document to "Create new article", `Actions` slot to add `PersistButton` to the dedicated layout area and it will automatically fill the order field with the next available value.

### EditScope

EditScope is a component used for editing a specific entity. It requires an `entity` prop (of type [qualified single entity](../data-binding/query-language#qualified-single-entity)) which specifies the entity type and its id (or other unique identifier) being edited. The form fields are defined using its children.

The `redirectOnSuccess` prop allows you to specify a target page to navigate to after the entity has been successfully edited. Additionally, you can use [Slots](/reference/admin/layouts/slots) to render title, actions or sidebar content of the current route to the other areas of the layout.

For more details on `EditScope` props and their usage, see the [API reference](../api/v1.2/Scopes/EditScope.mdx).

#### Example how to use EditScope

```tsx
import { EditScope } from '@contember/admin'
import { SlotSources } from '../components/Slots'

const { Actions, Title } = SlotSources

export default () => {
	return (
		<>
			<Title>Edit article</Title>
			<EditScope
				entity="Article(id=$id)"
				redirectOnSuccess="articles/list"
			>
				<TextField field={'title'} label={'Title'} />
				{/* .... */}
				<Actions>
					<PersistButton />
				</Actions>
			</EditScope>
		</>
	)
}
```

In this example, the `EditScope` component is being used to edit an `Article` entity with an ID that matches the `id` parameter from the URL. When the form is successfully submitted, the user will be redirected to the `articles/list` page. The `Title` slot is being used to set the title of the document to "Edit article", `Actions` slot to add `PersistButton` to the dedicated layout area.

### DetailScope

The `DetailScope` displays the details of a single entity. It takes an `entity` prop  (of type [qualified single entity](../data-binding/query-language#qualified-single-entity)) which specifies the entity to display. The displayed fields are defined using its children.

Additionally, you can use [Slots](/reference/admin/layouts/slots) to render title, actions or sidebar content of the current route to the other areas of the layout.

For more details on DetailScope props and their usage, see the [API reference](../api/v1.2/Scopes/DetailScope.mdx).

#### Example how to use DetailScope

```tsx
import { DetailScope, Field } from '@contember/admin'
import { SlotSources } from '../components/Slots'

const { Title } = SlotSources

export default () => {
	return (
		<>
			<Title>Article details</Title>
			<DetailScope entity="Article(id: $id)">
				<Field field={'title'} />
				{/* .... */}
			</DetailScope>
		</>
	)
}
```

In this example, the `DetailScope` component will display the details of the Article entity with an id that matches the `id` parameter from the URL. The `Title` slot is being used to set the title of the document to "Article details".

Note that the `DetailScope` component should not include a persist button by default, as it is primarily used for displaying data rather than editing it. If you need to edit the entity, you should use the `EditScope` component instead.

### ListScope

The `ListScope` displays a simple list of specified entities. It requires an `entities` prop (of type [qualified entity list](../data-binding/query-language#qualified-entity-list)) which specifies the entity type being listed. It also allows defining fields using its children. The `ListScope` does not provide advanced features such as pagination or filtering. If you need this functionality, you can use the `DataGridScope` component instead.

Additionally, you can use [Slots](/reference/admin/layouts/slots) to render title, actions or sidebar content of the current route to the other areas of the layout.

For more details on ListScope props and their usage, see the [API reference](../api/v1.2/Scopes/ListScope.mdx).

```tsx
import { ListScope, Field } from '@contember/admin'
import { SlotSources } from '../components/Slots'

const { Actions, Title } = SlotSources

export default () => {
	return (
		<>
			<Title>Articles</Title>
			<ListScope entities="Article">
				<Field field={'title'} />
				{/* ... */}
			</ListScope>
		</>
	)
}
```

### DataGridScope

`DataGridScope` wraps a `DataGrid` component. It allows you to display a list of specified entities in a more advanced way, with features such as pagination and filtering.

To use `DataGridScope`, you need to pass the `entities` prop (of type [qualified entity list](../data-binding/query-language#qualified-entity-list)) with the name of the entity you want to display in the grid. You can also pass any props that the `DataGrid` component accepts, such as `itemsPerPage` to customize the behavior of the grid.

To define the cells of the grid, you pass them as children to the `DataGridScope` component. These will be rendered as columns in the grid. Additionally, you can use [Slots](/reference/admin/layouts/slots) to render title, actions or sidebar content of the current route to the other areas of the layout.

For more details on DataGridScope props and their usage, see the [API reference](../api/v1.2/Scopes/DataGridScope.mdx).

#### Example how to use DataGridScope

```tsx
import { DataGridScope, HasOneSelectCell, LinkButton, TextCell, GenericCell } from '@contember/admin'
import { SlotSources } from '../components/Slots'

const { Actions, Title } = SlotSources

export default () => {
	return (
		<>
			<Title>Articles</Title>

			<Actions>
				<LinkButton to={'articles/create'}>Create</LinkButton>
			</Actions>

			<DataGridScope
				entities="Article"
				itemsPerPage={10}
			>
				<TextCell field={'title'} />
				<HasOneSelectCell field={'author'} options={'Author.name'} />
				<GenericCell>
						<LinkButton to={'articles/edit(id: $entity.id)'}>Edit</LinkButton>
				</GenericCell>
			</DataGridScope>
		</>
	)
}
```

### MultiEditScope

`MultiEditScope` is a component in Contember that allows you to edit multiple entities on a single page. It is essentially a wrapper around the `Repeater` component, which means that you can use it to add, remove, and sort items within the page.

To use` MultiEditScope`, you must specify the entities you want to edit using the `entities` prop (of type [qualified entity list](../data-binding/query-language#qualified-entity-list)). To control the behavior of the `Repeater`, you can pass props such as `sortableBy` through the `listProps` prop of `MultiEditScope`. This will allow you to specify which fields should be used to sort the items in the `Repeater`. Additionally, you can use [Slots](/reference/admin/layouts/slots) to render title,
actions or sidebar content of the current route to the other areas of the layout.

`MultiEditScope` should only be used for editing a small number of entities, as it does not support advanced features such as pagination or filtering.

For more details on MultiEditScope props and their usage, see the [API reference](../api/v1.2/Scopes/EditScope.mdx).

#### Example how to use MultiEditScope

```typescript jsx
import { MultiEditScope, TextField } from '@contember/admin'
import { SlotSources } from '../components/Slots'

const { Actions, Title } = SlotSources

export default () => (
	<>
		<Title>Categories</Title>
		<MultiEditScope entities="Category" listProps={{
			beforeContent: <SlotSources.Actions><PersistButton /></SlotSources.Actions>,
			sortableBy: 'order'
		}}>
			<TextField field={'title'} label={'Title'} />
			{/*...*/}
		</MultiEditScope>
	</>
)
```

:::tip Placing the Persist button
The `PersistButton` component is used to persist the changes made to the entities and it must be placed within a component that provides Contember data binding context. The Scope components provide this context so the `PersistButton` component must be placed within the Scope component. Slots can help you place the `PersistButton` component in the specific area of your layout.
:::
