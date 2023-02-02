---
title: Contember workshop
---

## Setup

- Installed [NPM](https://www.npmjs.com/) version 7+
    - Check it using `npm --version` command
- Installed [Docker](https://docs.docker.com/install/) with [Docker Compose](https://docs.docker.com/compose/install/) version 1.27+
    - Check it using `docker-compose --version` command

In this workshop we will create a database with breweries and beers and user-friendly interface for it. To create blank project run following command:

```bash
npm exec "@contember/create@next" breweries
```

:::info

We are using `@next` version which is 1.1 in the moment.

:::

Then step into the newly created directory and install dependencies using following commands:

```bash
cd breweries
npm install
```

Then start it!

```bash
npm start
```

You should see something like this in your console:
```
  vite v2.9.9 dev server running at:

  > Local:    http://localhost:1480/
  > Network:  http://172.20.200.2:1480/

  ready in 119ms.
```

If you open [http://localhost:1480/](http://localhost:1480) in your browser you should see a message "Welcome to Contember Interface!". We will create an administration there, but first let's create a schema for our data.

Open the directory in a code editor (such as VS Code).

## 01: Model

We will define entities which we will work with in file `api/model/index.ts`. First, we will import schema definition tools and add our entities with fields.


```ts title="api/model/index.ts"
import { SchemaDefinition as def } from '@contember/schema-definition'

export class Brewery {
	name = def.stringColumn().notNull()
	locationLat = def.doubleColumn()
	locationLng = def.doubleColumn()
	beers = def.oneHasMany(Beer, 'brewery')
}

export class Beer {
	name = def.stringColumn().notNull()
	alcohol = def.doubleColumn()
	brewery = def.manyHasOne(Brewery, 'beers').notNull().cascadeOnDelete()
}
```

And then in new terminal in our project folder we will run command to generate and run migrations.

```
npm run contember migrations:diff . init
```

And select `Yes and execute immediately`.

```
Project breweries:
  Add entity Beer [createEntity]
  Add entity Brewery [createEntity]
  Add field Beer.name [createColumn]
  Add field Beer.alcohol [createColumn]
  Add field Brewery.name [createColumn]
  Add field Brewery.locationLat [createColumn]
  Add field Brewery.locationLng [createColumn]
  Add relation Beer.brewery [createRelation]
? Do you want to continue? › - Use arrow-keys. Return to submit.
    Yes
❯   Yes and execute immediately
    Abort
```

```
✔ Do you want to continue? › Yes and execute immediately
  /src/api/migrations/2022-06-03-084406-init.json created
  Will execute following migrations:
  2022-06-03-084406-init
  Migration executed
```

## 02: Basic administration

We will create a simple page where we can edit all breweries at once. We will change page in administration in file `admin/pages/index.tsx`.

```tsx title="admin/pages/index.tsx"
import * as React from 'react'
import { MultiEditPage, TextField } from '@contember/admin'

export default () => (
	<MultiEditPage entities="Brewery" rendererProps={{ title: "Breweries" }}>
		<TextField label="Name" field="name" />
	</MultiEditPage>
)
```

Now we can edit the breweries in Contember Interface. Go to http://localhost:1480 and create a few of them.


:::info Optional: Query using GraphQL API

You can now query them using an GraphQL API:

```bash
curl --request POST \
  --url http://localhost:1481/content/breweries/live \
  --header 'Authorization: Bearer 0000000000000000000000000000000000000000' \
  --header 'Content-Type: application/json' \
  --data '{"query":"{\n\tlistBrewery {\n\t\tname\n\t}\n}"}'
```

:::


## 03: Edit brewery location

Now, let's edit location:

```tsx title="admin/pages/index.tsx"
import * as React from 'react'
import { FloatField, MultiEditPage, TextField } from '@contember/admin'

export default () => (
	<MultiEditPage entities="Brewery" rendererProps={{ title: "Breweries" }}>
		<TextField label="Name" field="name" />
		// highlight-start
		<FloatField label="Latitude" field="locationLat" />
		<FloatField label="Longitude" field="locationLng" />
		// highlight-end
	</MultiEditPage>
)
```

But wouldn't be map more user-friendly?

```tsx title="admin/pages/index.tsx"
import * as React from 'react'
import { FloatField, MultiEditPage, TextField, LocationField } from '@contember/admin'

export default () => (
	<MultiEditPage entities="Brewery" rendererProps={{ title: "Breweries" }}>
		<TextField label="Name" field="name" />
		<FloatField label="Latitude" field="locationLat" />
		<FloatField label="Longitude" field="locationLng" />
		// highlight-next-line
		<LocationField label="Location" latitudeField="locationLat" longitudeField="locationLng" />
	</MultiEditPage>
)
```

## 04: Add beers repeater

```tsx title="admin/pages/index.tsx"
import * as React from 'react'
import { FloatField, LocationField, MultiEditPage, Repeater, TextField } from '@contember/admin'

export default () => (
	<MultiEditPage entities="Brewery" rendererProps={{ title: "Breweries" }}>
		<TextField label="Name" field="name" />
		<FloatField label="Latitude" field="locationLat" />
		<FloatField label="Longitude" field="locationLng" />

		<LocationField label="Location" latitudeField="locationLat" longitudeField="locationLng" />

		<Repeater field="beers" label="Beer" orderBy={undefined}>
			<TextField label="Name" field="name" />
		</Repeater>
	</MultiEditPage>
)
```

## 05: Add beers data grid

Create a new page:

```tsx title="admin/pages/listBeers.tsx"
import * as React from 'react'
import { DataGridPage, NumberCell, TextCell } from '@contember/admin'

export default () => (
	<DataGridPage entities="Beer" rendererProps={{ title: "Beers List" }}>
		<TextCell header="Name" field="name" />
		<NumberCell header="Alcohol" field="alcohol" />
		// highlight-next-line
		<TextCell header="brewery" field="brewery.name" />
	</DataGridPage>
)
```

Add to navigation:

```tsx title="admin/components/Navigation.tsx"
import * as React from 'react'
import { Menu } from '@contember/admin'

export const Navigation = () => (
	<Menu>
		<Menu.Item>
			<Menu.Item title="Breweries" to="index" />
			<Menu.Item title="Beers" to="listBeers" />
		</Menu.Item>
	</Menu>
)
```


## 06: Beer create page

Create a new page:

```tsx title="admin/pages/createBeer.tsx"
import * as React from 'react'
import { CreatePage, FloatField, SelectField, TextField } from '@contember/admin'

export default () => (
	<CreatePage entity="Beer" redirectOnSuccess="listBeers" rendererProps={{ title: "New Beer" }}>
		<SelectField label="Brewery" field="brewery" options="Brewery.name" />
		<TextField label="Name" field="name" />
		<FloatField label="Alcohol" field="alcohol" />
	</CreatePage>
)
```

Add button:

```tsx title="admin/pages/listBeers.tsx"
import * as React from 'react'
import { DataGridPage, LinkButton, NumberCell, TextCell } from '@contember/admin'

export default () => (
	// highlight-next-line
	<DataGridPage entities="Beer" rendererProps={{ title: "Beers List", actions: <LinkButton to="createBeer">Create beer</LinkButton> }}>
		<TextCell header="Name" field="name" />
		<NumberCell header="Alcohol" field="alcohol" />
		<TextCell header="brewery" field="brewery.name" />
	</DataGridPage>
)
```

## 07: Beer edit page

```tsx title="admin/pages/editBeer.tsx"
import * as React from 'react'
import { EditPage, FloatField, SelectField, TextField } from '@contember/admin'

export default () => (
	<EditPage entity="Beer(id=$id)" redirectOnSuccess="listBeers" rendererProps={{ title: "Edit Beer" }}>
		<SelectField label="Brewery" field="brewery" options="Brewery.name" />
		<TextField label="Name" field="name" />
		<FloatField label="Alcohol" field="alcohol" />
	</EditPage>
)
```

```tsx title="admin/pages/listBeers.tsx"
import * as React from 'react'
import { DataGridPage, GenericCell, LinkButton, NumberCell, TextCell } from '@contember/admin'

export default () => (
	<DataGridPage entities="Beer" rendererProps={{ title: "Beers List", actions: <LinkButton to="createBeer">Create beer</LinkButton> }}>
		<TextCell header="Name" field="name" />
		<NumberCell header="Alcohol" field="alcohol" />
		<TextCell header="brewery" field="brewery.name" />
		<GenericCell shrunk canBeHidden={false}>
			<LinkButton to="editBeer(id: $entity.id)">Edit</LinkButton>
		</GenericCell>
	</DataGridPage>
)
```


## 07: Extract beer form component

```tsx title="admin/components/BeerForm.tsx"
import * as React from 'react'
import { Component, FloatField, SelectField, TextField } from '@contember/admin'

export const BeerForm = Component(
	() => (
		<>
			<SelectField label="Brewery" field="brewery" options="Brewery.name" />
			<TextField label="Name" field="name" />
			<FloatField label="Alcohol" field="alcohol" />
		</>
	)
)
```

```tsx title="admin/pages/editBeer.tsx"
import * as React from 'react'
// highlight-next-line
import { EditPage } from '@contember/admin'
// highlight-next-line
import { BeerForm } from '../components/BeerForm'

export default () => (
	<EditPage entity="Beer(id=$id)" redirectOnSuccess="listBeers" rendererProps={{ title: "Edit Beer" }}>
		// highlight-next-line
		<BeerForm />
	</EditPage>
)
```

```tsx title="admin/pages/createBeer.tsx"
import * as React from 'react'
// highlight-next-line
import { CreatePage } from '@contember/admin'
// highlight-next-line
import { BeerForm } from '../components/BeerForm'

export default () => (
	<CreatePage entity="Beer" redirectOnSuccess="listBeers" rendererProps={{ title: "New Beer" }}>
		// highlight-next-line
		<BeerForm />
	</CreatePage>
)

```
