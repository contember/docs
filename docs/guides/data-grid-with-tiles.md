---
title: Data Grid with Tiles (WIP)
---

![Data Grid with tile layout](/assets/articles-tiles-grid-example.png)

Making data grid more visually appealing is possible with **tile layout** along side with the table one. In this guide we'll cover how to:

1. Create a custom component with [static render](/reference/admin/data-binding/overview);
2. Use your custom component on data grid page;
3. Add click to detail to the tiles of cover images.

## 1. Create a tile component for data grid

`DataGridPage` component accepts any `ReactNode` as `tile` prop. For data grid to work property the element we pass needs:

1. Accept title and thumbnail field names to render in grid;
2. Use `useEntity()` hook to access rendered entity;
3. Provide static render for data binding to work.

```tsx title="admin/components/DataGridTile.tsx"
import {
	Component,
	Field,
	Stack,
	useEntity,
} from '@contember/admin'

interface DataGridTileProps {
	thumbnailField?: string
	titleField?: string
}

export const DataGridTile = Component((props: DataGridTileProps) => {
	const entityAccessor = useEntity()

	const src = props.thumbnailField ? entityAccessor.getField<string>(props.thumbnailField).value : null
	const title = props.titleField ? entityAccessor.getField<string>(props.titleField).value : null

	// You can write any UI according to your need to render grid tile here:
	// highlight-next-line
	return <Stack direction="vertical">
		{src && <img src={src} style={{ width: '100%' }} />}
		<strong>{title}</strong>
	</Stack>
}, ({
	thumbnailField,
	titleField,
}) => <>
	{/* Static render needs to render every field required by normal render */}
	// highlight-next-line
	{thumbnailField && <Field field={thumbnailField} />}
	{titleField && <Field field={titleField} />}
</>,
)
DataGridTile.displayName = 'DataGridTile'
```

:::note Heads up

It is your responsibility to provide thumbnail url cropped to a reasonable size for the data grid.

:::

## 2. Pass the `DataGridTile` onto Articles page

Provided you have the data grid page created, import your new `DataGridTile` component and use it:

```tsx tsx title="admin/pages/articles.tsx"
import { DataGridTile } from '../components/DataGridTile'

export const List = () => <DataGridPage
	entities="Article"
	itemsPerPage={20}
	// Pass the element of newly created tile component
	// highlight-next-line
	tile={<DataGridTile
		thumbnailField="image.url"
		titleField="title"
	/>}
	// You can change the expected size of the tiles, default is set to 160
	// highlight-next-line
	tileSize={100}
	rendererProps={{
		actions: <LinkButton to="article/create">Add article</LinkButton>,
		// Set for table to use all available space
		layout: 'full-width',
		title: 'Articles',
	}}
>
	<TextCell field="title" header="Title" />
	<TextCell field="content" header="Content" />
	<LinkButton to={`article/edit(id: $entity.id)`} Component={AnchorButton}>Edit</LinkButton>
</DataGridPage>
```

Contember admin will also render **buttons to switch between grid and table layout**. At this point you should be able to get the result as this one:

![Data Grid with tile layout with minimal UI](/assets/articles-tiles-grid-no-ui.png)

## 3. Use clickable Card from the Contember UI (optional)

With Contember you are free to use any UI component you want. However, there is a bare `Card` component ready for you to use, or you can also use the `LinkCard` component similar to `Card` component you can pass to `Link` ready to be used with `to` prop that adds navigation on click on the `Card`.

```typescript
import {
	Component,
	Field,
	Link,
	LinkCard,
	LinkCardProps,
	LinkProps,
	useEntity,
} from '@contember/admin'

type DataGridTileProps =
	& Omit<LinkCardProps, 'src' | 'title' | 'href' | 'active' | 'onClick'>
	& Pick<LinkProps, 'to'>
	& {
		thumbnailField?: string
		titleField?: string
	}

export const DataGridTile = Component((props: DataGridTileProps) => {
	const entityAccessor = useEntity()

	const src = props.thumbnailField ? entityAccessor.getField<string>(props.thumbnailField).value : null
	const title = props.titleField ? entityAccessor.getField<string>(props.titleField).value : null

	const {
		thumbnailField,
		titleField,
		to,
		...rest
	} = props

	return <Link
		{...rest}
		// highlight-next-line
		Component={LinkCard}
		componentProps={{ src }}
		to={to}
		children={title}
	/>
}, ({
	thumbnailField,
	titleField,
}) => <>
	{thumbnailField && <Field field={thumbnailField} />}
	{titleField && <Field field={titleField} />}
</>,
)
DataGridTile.displayName = 'DataGridTile'

```
