---
title: Pages
---

In order to define pages in Contember Interface, you need to export function components from files in the `admin/pages` directory (or its subdirectory).

In the functions exported from page components, you will usually use one of the prepared page components provided by Contember. The most simple is the `GenericPage`:

```typescript jsx
export default () => {
	return (
		<GenericPage>
			Content goes here
		</GenericPage>
	)
}
```

## Routing

Page names (and basically URL path) are constructed automatically. The resulting page name for the page will be determined by the file and function name, with slashes separating them. For example, the `default` export from a file named `post.tsx` will have the page name `post`, while a function exported as `edit` from a same file will be named `post/edit`. If a function is in a subdirectory, its path will also include the subdirectory name. For instance, a function named `edit` exported from
`post/category.tsx` will have the name `post/category/edit`.

See how to [create links](./links.md).


## Pages

Contember provides several prepared page components to help you quickly set up common page types in your admin panel. These page components handle common tasks like loading and saving data, rendering form fields, and displaying entity lists.

### GenericPage

The most basic page component in Contember. It simply renders its children inside a layout. It also has a number of props that can be used to modify the page layout, such as `title`, `side`, `navigation`, or `actions`. These props allow you to customize the page's title, add content to the side panel, add navigation elements, or add actions to the page.

For more details on these props and their usage, see the [API reference](../api/components/pages#generic-page).

#### Example how to use GenericPage
```typescript jsx
import { GenericPage } from '@contember/admin'

export default () => {
	return (
		<GenericPage title="Page title">
			Content here
		</GenericPage>
	)
}
```

### CreatePage

CreatePage is a page component used for creating a new entity. It requires an `entity` prop (of type [unconstrained qualified single entity](../data-binding/query-language#unconstrained0qualified-single-entity)) which specifies the entity type being created. The form fields are defined using its children.

The `redirectOnSuccess` prop allows you to specify the target page after the entity has been successfully created. If no redirect target is defined, you will be able to create another entity.

You can use the `rendererProps` prop to modify the layout of the page, similar to the props available in the `GenericPage` component (such as `title`, `side`, and `navigation`).

If you set the `orderField` prop, the specified field will be automatically filled with the next available value. This is useful for entities that have an order field, as it allows you to easily specify the order in which the entities should be displayed.

For more details on CreatePage props and their usage, see the [API reference](../api/components/pages#create-page).

#### Example how to use CreatePage

```typescript jsx
import { CreatePage, TextField } from '@contember/admin'

export default () => {
	return (
		<CreatePage
			entity="Article"
			redirectOnSuccess="article/list"
			rendererProps={{ title: 'Create new article' }}
			orderField="order"
		>
			<TextField field={'title'} label={'Title'} />
			{/* .... */}
		</CreatePage>
	)
}
```

This page will allow you to create a new article and will redirect to the list of articles after the entity has been successfully created. The page will have the title "Create new article" and will automatically fill the order field with the next available value.

### EditPage

EditPage is a page component used for editing a specific entity. It requires an `entity` prop (of type [qualified single entity](../data-binding/query-language#qualified-single-entity)) which specifies the entity type and its id (or other unique identifier) being edited. The form fields are defined using its children.

The `redirectOnSuccess` prop allows you to specify a target page to navigate to after the entity has been successfully edited, and the `rendererProps` prop allows you to pass props to modify the layout of the page, such as the `title`, `side`, `navigation` props etc.

For more details on EditPage props and their usage, see the [API reference](../api/components/pages#edit-page).

#### Example how to use EditPage
```typescript jsx
import { EditPage } from '@contember/admin'

export default () => {
	return (
		<EditPage
			entity="Article(id: $id)"
			redirectOnSuccess="articles/list"
			rendererProps={{
				title: 'Edit article',
			}}
		>
			<TextField field={'title'} label={'Title'} />
			{/* .... */}
		</EditPage>
	)
}
```

In this example, the `EditPage` component is being used to edit an `Article` entity with an ID that matches the `id` parameter from the URL. When the form is successfully submitted, the user will be redirected to the `articles/list` page. The `title` prop is being passed to the `rendererProps` prop to modify the layout of the page.

### DetailPage

The `DetailPage` component is used to display the details of a single entity. It takes an `entity` prop  (of type [qualified single entity](../data-binding/query-language#qualified-single-entity)) which specifies the entity to display. The displayed fields are defined using its children.

A `rendererProps` prop can be used to modify the layout of the page, such as adding a title or custom actions.

For more details on DetailPage props and their usage, see the [API reference](../api/components/pages#detail-page).

#### Example how to use DetailPage
```typescript jsx
import { DetailPage, Field } from '@contember/admin'

export default () => {
	return (
	  <DetailPage entity="Article(id: $id)" rendererProps={{ title: 'Article Details' }}>
			<Field field={'title'} />
			{/* .... */}
	  </DetailPage>
	)
}
```

In this example, the `DetailPage` component will display the details of the Article entity with an id that matches the `id` parameter from the URL. The `rendererProps` prop is used to set the `title` of the page to "Article Details".

Note that the `DetailPage` component does not include a persist button by default, as it is primarily used for displaying data rather than editing it. If you need to edit the entity, you should use the `EditPage` component instead.

### ListPage

The `ListPage` allows you to display a simple list of specified entities. It requires an `entities` prop (of type [qualified entity list](../data-binding/query-language#qualified-entity-list)) which specifies the entity type being listed. It also allows defining fields using its children. The ListPage does not provide advanced features such as pagination or filtering. If you need this functionality, you can use the DataGridPage component instead.

You can also use `rendererProps` prop to modify the layout of the page, such as adding a title or custom actions.

For more details on ListPage props and their usage, see the [API reference](../api/components/pages#list-page).

```typescript jsx
import { ListPage, Field } from '@contember/admin'

export default () => {
	return (
		<ListPage entities="Article" rendererProps={{title: "Articles"}}>
			<Field field={'title'} />
			{/* ... */}
		</ListPage>
	)
}
```


### DataGridPage

`DataGridPage` is a page component that wraps a `DataGrid` component. It allows you to display a list of specified entities in a more advanced way, with features such as pagination and filtering.

To use `DataGridPage`, you need to pass the `entities` prop (of type [qualified entity list](../data-binding/query-language#qualified-entity-list)) with the name of the entity you want to display in the grid. You can also pass any props that the `DataGrid` component accepts, such as `itemsPerPage` to customize the behavior of the grid. Additionally, you can use the `rendererProps` prop to pass props that modify the layout of the page, such as the `title` or `navigation` props.

To define the cells of the grid, you pass them as children to the DataGridPage component. These will be rendered as columns in the grid.

For more details on DataGridPage props and their usage, see the [API reference](../api/components/pages#datagrid-page).

#### Example how to use DataGridPage

```typescript jsx
import { DataGridPage, HasOneSelectCell, LinkButton, TextCell, GenericCell } from '@contember/admin'

export default () => {
	return (
		<DataGridPage
			entities="Article"
			itemsPerPage={10}
			rendererProps={{
				title: 'Articles',
				actions: <LinkButton to={'articles/create'}>Create</LinkButton>
			}}
		>
			<TextCell field={'title'} />
			<HasOneSelectCell field={'author'} options={'Author.name'} />
			<GenericCell>
					<LinkButton to={'articles/edit(id: $entity.id)'}>Edit</LinkButton>
			</GenericCell>
		</DataGridPage>
	)
}
```


### MultiEditPage

`MultiEditPage` is a page component in Contember that allows you to edit multiple entities on a single page. It is essentially a wrapper around the `Repeater` component, which means that you can use it to add, remove, and sort items within the page.

To use` MultiEditPage`, you must specify the entities you want to edit using the `entities` prop (of type [qualified entity list](../data-binding/query-language#qualified-entity-list)). To control the behavior of the `Repeater`, you can pass props such as `sortableBy` through the `rendererProps` prop of `MultiEditPage`. This will allow you to specify which fields should be used to sort the items in the `Repeater`. You can also pass custom props to modify the layout of the page using the `rendererProps` prop.

`MultiEditPage` should only be used for editing a small number of entities, as it does not support advanced features such as pagination or filtering.

For more details on MultiEditPage props and their usage, see the [API reference](../api/components/pages#multiedit-page).


#### Example how to use MultiEditPage

```typescript jsx
import { MultiEditPage, TextField } from '@contember/admin'

export default () => (
	<MultiEditPage entities="Category" rendererProps={{ title: 'Categories', sortableBy: 'order' }}>
		<TextField field={'title'} label={'Title'} />
		{/*...*/}
	</MultiEditPage>
)
```
