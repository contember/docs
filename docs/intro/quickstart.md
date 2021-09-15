---
title: Quickstart
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

In this tutorial we will show you how to setup both Contember Engine and Contember Admin to create your first project.

:::note Prerequisites

- Installed [NPM](https://www.npmjs.com/) version 6+
- Installed [Docker](https://docs.docker.com/install/) with [Docker Compose](https://docs.docker.com/compose/install/)

:::

## Step 1: Install and run Contember

```bash
npm init @contember quickstart
```

It will create a new folder with basic Contember setup. After it is done:
```bash
cd quickstart
```
And then install dependencies:

<Tabs
defaultValue="windows"
values={[
    {label: 'Windows', value: 'windows'},
    {label: 'Mac', value: 'mac'},
    {label: 'Linux', value: 'linux'},
  ]}>
  <TabItem value="windows" label="Windows" default>

```bash
npm i
```
<br/>

  </TabItem>
  <TabItem value="mac" label="Mac">

```bash
docker-compose run admin npm i
```
We recommend to install dependencies directly in Docker

  </TabItem>
  <TabItem value="linux" label="Linux">

```bash
npm i
```
<br/>

  </TabItem>
</Tabs>

Then just
```bash
docker-compose up
```

:::note And Contember is running

- **Admin at [http://localhost:1480](http://localhost:1480)**
![administration is running](/assets/contember-admin-running.png)
- API endpoints at [http://localhost:1481](http://localhost:1481) (you can authorize with token 0000000000000000000000000000000000000000)
	- To connect to the GraphQL you can use pre-packed client (Apollo Playground) available at [http://localhost:1481/playground](http://localhost:1481/playground)
- Adminer database management tool (Adminer) at [http://localhost:1485](http://localhost:1485)
- Minio local S3 provider at [http://localhost:1483](http://localhost:1483) (you can sign in with contembeer / contember credentials)
- Mailhog testing SMTP at [http://localhost:1484](http://localhost:1484)
- PostgreSQL database at [localhost:1482](localhost:1482) (you can sign in with contember / contember credentials)

:::

## Step 2: Create first project

### Add new entity

```ts title="api/model/index.ts"
import { SchemaDefinition as d } from '@contember/schema-definition';

export class Page {
    title = d.stringColumn()
    content = d.stringColumn()
}
```

```bash
npm run contember migrations:diff quickstart add-page
```

Select `Yes and execute immediately`.

### Edit admin

#### Add list page

```tsx title="admin/pages/Pages.tsx"
import { ListPage, PageLinkButton, Field } from "@contember/admin";

export const PageList = (
    <ListPage entities="Page" pageName="pages" rendererProps={{
        title: 'Pages',
        actions: <PageLinkButton to="pageNew">Add Page</PageLinkButton>,
    }} >
        <Field field="title" />
    </ListPage>
)
```
![administration is running](/assets/contember-admin-list-page.png)

#### Add create page

```tsx title="admin/pages/Pages.tsx"
import {
  ListPage,
  PageLinkButton,
  Field,
  CreatePage,
  TextField,
  TextAreaField
} from "@contember/admin";

export const PageList = (
...
)

export const PageCreate = (
    <CreatePage
        entity="Page"
        pageName="pageNew"
        rendererProps={{ title: 'Add page' }}
        redirectOnSuccess={(request, id) => ({
            ...request,
            pageName: 'page',
            parameters: {
                id,
            },
        })}
    >
        <TextField field="title" label="Title" />
        <TextAreaField field="content" label="content" />
    </CreatePage >
)
```

![administration is running](/assets/contember-admin-create-page.png)

#### Add edit page

```tsx title="admin/pages/Pages.tsx"
import {
  ListPage,
  PageLinkButton,
  Field,
  CreatePage,
  TextField,
  TextAreaField,
  EditPage
} from "@contember/admin";

export const PageList = (
...
)

export const PageCreate = (
...
)

export const PageEdit = (
    <EditPage
      entity="Page(id = $id)"
      pageName="page"
      rendererProps={{ title: 'Edit page' }}
    >
        <TextField field="title" label="Title" />
        <TextAreaField field="content" label="content" />
    </EditPage>
)
```
![administration is running](/assets/contember-admin-edit-page.png)


### Add pages to side menu

```tsx title="admin/SideMenu.tsx"
import { Menu } from '@contember/admin'

export const SideMenu = () => {
	return (
		<Menu>
			<Menu.Item>
				<Menu.Item title="Dashboard" to="dashboard" />
				<Menu.Item title="Pages" to="pages" />
			</Menu.Item>
		</Menu>
	)
}

```
![administration is running](/assets/contember-admin-menu-pages.png)
