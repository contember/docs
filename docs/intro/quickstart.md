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

## Install and run Contember locally

```bash
npm init @contember quickstart
```

It will create a new folder with basic Contember setup. After it is done:

```bash
cd quickstart
```

And then install dependencies:

<Tabs
defaultValue="mac"
values={[
{label: 'Mac', value: 'mac'},
{label: 'Windows', value: 'windows'},
{label: 'Linux or WSL', value: 'linux'},
]}>
<TabItem value="mac" label="Mac">

```bash
docker-compose run admin npm install
```

:::note

On Mac we recommend to install dependencies directly in Docker - not by running `npm install` directly but as shown above.

:::

  </TabItem>
  <TabItem value="windows" label="Windows">

:::caution Use Windows Subsystem for Linux (WSL)

If you are using Windows we recommend using [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) if possible. Some features might not work correctly without it (such as rebuilding automatically after a file change).

:::

```bash
docker-compose run admin npm install
```

> On Windows we recommend to install dependencies directly in Docker.

  </TabItem>
  <TabItem value="linux" label="Linux">

```bash
npm install
```

  </TabItem>
</Tabs>

And you're ready to go. Just start Docker containers and Contember will be running.

```bash
docker-compose up
```

Now, administration UI should be running on address [http://localhost:1480](http://localhost:1480).

![administration is running](/assets/contember-admin-running.png)

:::note Started services

- Admin UI at [http://localhost:1480](http://localhost:1480)
- API endpoints at [http://localhost:1481](http://localhost:1481) (you can authorize with token `0000000000000000000000000000000000000000`)
  - To connect to the GraphQL you can use pre-packed client (Apollo Playground) available at [http://localhost:1481/playground](http://localhost:1481/playground)

For advanced use-cases there is also:

- Adminer database management tool at [http://localhost:1485](http://localhost:1485).
- Minio local S3 provider at [http://localhost:1483](http://localhost:1483) (you can sign in with contembeer / contember credentials).
- Mailhog testing SMTP at [http://localhost:1484](http://localhost:1484).
- PostgreSQL database at [localhost:1482](localhost:1482) (you can sign in with contember / contember credentials).

:::

## Create first project

From the first step you should have a folder structure that looks like this:

```
quickstart/
  ├── admin/
  │   ├── SideMenu.tsx
  │   ├── index.html
  │   ├── index.tsx
  │   ├── pages/
  │   ├── vite-env.d.ts
  │   └── vite.config.ts
  ├── api/
  │   ├── acl.ts
  │   ├── index.ts
  │   ├── migrations/
  │   └── model/
  ├── node_modules/
  ├── scripts/
  ├── contember.yaml
  ├── docker-compose.override.dist.yaml
  ├── docker-compose.override.yaml
  ├── docker-compose.yaml
  ├── package-lock.json
  ├── package.json
  └── tsconfig.json
```

## Create your first data model

First you have to tell Contember Engine, how your data model looks like. The `init` command automatically created `api/model/index.ts` file, so go there.

Here you start defining your project schema. Really simple example looks like this:

```ts title="api/model/index.ts"
import { SchemaDefinition as d } from "@contember/schema-definition";

export class Article {
  title = d.stringColumn();
  content = d.stringColumn();
}
```

1. Import `SchemaDefinition` so you'll get TypeScript autocompletion.
2. Define your fist entity - `Article`. For this example let's just add two columns named `title` and `content`, both are `string`.

Then you need to generate a database migration for Contember Engine:

```bash
npm run contember migrations:diff quickstart add-article
```

:::note Contember CLI

`npm run contember` is a Contember CLI, if you call this command you'll see all the available commands.
We'll use `migrations:diff` command. It goes through your schema and generates migration - instructions for Contember how to get from previous state to your new one.
This command needs two parameters: first is name of your project (`quickstart` in our example) and then name your migration. It can be anything you want.

:::

Run this command and choose an option `Yes and execute immediately`. It will create your migration and after confirmation execute it. Now if you would look into your database, you would see there a table `article` with three columns: `id`, `title`, `content`. Nice.

## Create your administration UI

Now we have something we want to edit in UI. Let's start by adding a listing page for our articles.

### Add listing page

Go to `admin/pages` and create new file `Articles.tsx`.

```tsx title="admin/pages/Articles.tsx"
import { TablePage, TableCell, Field } from "@contember/admin";

export const ArticleList = (
  <TablePage entities="Article" pageName="articles">
    <TableCell>
      <Field field="title" />
    </TableCell>
  </TablePage>
);
```

1. Import `@contember/admin` package for TypeScript autocompletion.
2. Export new `ArticleList` (you can name it anyway you like)
3. Use `TablePage` component to show the data in a simple table.
4. Tell it which entities you'd like to edit. In our case it's `Article` (it has to be the same name we used in the model).
5. Name your list (`pageName="article"`). Name is used for url in administration.
6. Tell it what data you want to see. We'll want to see `title` in our example. (And added it into `TableCell` which we'll make use of later.)

If you go to [localhost:1480/articles](http://localhost:1480/articles) you'll see list of your articles. Which is empty as we didn't add any data there yet.

Let's add some data.

### Add create page

```tsx title="admin/pages/Articles.tsx"
import {
  TablePage,
  TableCell,
  Field,
  CreatePage,
  TextField,
  TextAreaField
} from "@contember/admin";

export const ArticleList = (
  ...
)

export const ArticleCreate = (
    <CreatePage
        entity="Article"
        pageName="articleNew"
    >
        <TextField field="title" label="Title" />
        <TextAreaField field="content" label="content" />
    </CreatePage>
)
```

1. For simplicity we'll add it to the same file.
2. This time we'll use `CreatePage` component.
3. We'll tell it what we want to add (`Article`), how is this component named (`articleNew`).
4. We'll use two new components - `TextField` and `TextAreaField` and tell them what fields to edit.

Now at [localhost:1480/article-new](http://localhost:1480/article-new) you can create new article. And if you go to the [list of articles](http://localhost:1480/articles) you'll see the data are there.

But it doesn't work very well. One of the things missing is to go to edit mode after you created a new article. So let's start by adding an edit page:

### Add edit page

For simplicity we'll add it to the same file as well. It looks almost the same as the create page - but we have to tell it which article to edit:

```tsx title="admin/pages/Articles.tsx"
import {
  ...
} from "@contember/admin";

export const ArticleList = (
  ...
)

export const ArticleCreate = (
  ...
)

export const ArticleEdit = (
    <EditPage
      /* highlight-start */
      entity="Article(id = $id)"
      /* highlight-end */
      pageName="article"
    >
        <TextField field="title" label="Title" />
        <TextAreaField field="content" label="content" />
    </EditPage>
)
```

Let's use it. We'll redirect users from our create page to the edit page after the article is successfully created:

```tsx title="admin/pages/Pages.tsx"
export const ArticleCreate = (
  <CreatePage
    entity="Article"
    pageName="articleNew"
    /* highlight-start */
    rendererProps={{ title: "Add a article" }}
    redirectOnSuccess={(request, id) => ({
      ...request,
      pageName: "article",
      parameters: {
        id,
      },
    })}
    /* highlight-end */
  >
    <TextField field="title" label="Title" />
    <TextAreaField field="content" label="content" />
  </CreatePage>
);
```

We added two new things: `rendererProps` and `redirectOnSuccess`:

- `rendererProps` are pretty simple in this case: just added title so we know that we're on this page,
- `redirectOnSuccess` is more complicated: we take user to `page` with id of the newly created page.

Now if you create a new article you're automatically redirected to the edit page.

What's missing is an edit button in the list of pages.

```tsx title="admin/pages/Pages.tsx"
export const ArticleList = (
  <TablePage entities="Article" pageName="articles">
    <TableCell>
      <Field field="title" />
    </TableCell>
    {/* highlight-start */}
    <TableCell shrunk>
      <PageLinkById to="article">edit</PageLinkById>
    </TableCell>
    {/* highlight-end */}
  </TablePage>
);
```

1. We've added new `TableCell` and into it a `PageLinkById` component.
2. This component is pretty simple - it will create a link to a component called `article` and sends id as parameter. Which is actually our edit page.
3. Minor touch is use of `shrunk` with tells the cell to be as small as possible.

### Add pages to side menu

One last thing is to add our pages to the left sidebar:

```tsx title="admin/SideMenu.tsx"
import { Menu } from "@contember/admin";

export const SideMenu = () => {
  return (
    <Menu>
      <Menu.Item>
        <Menu.Item title="Dashboard" to="dashboard" />
        <Menu.Item title="Articles" to="articles" />
        <Menu.Item title="Create new article" to="articleNew" />
      </Menu.Item>
    </Menu>
  );
};
```

And that's it! You have just created a simple data model and created custom interface, so you can edit the data. If you want you can fetch the data via GraphQL API that was created in the background you can read more in [Content API topic](/content/overview).