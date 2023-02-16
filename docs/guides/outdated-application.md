---
title: Outdated application dialog
---

In Contember Interface, the problem of an outdated application arises when a new version of the application becomes available but the user is still using an older version. This can result in the user experiencing bugs or issues that have already been fixed in the newer version.

To solve this problem, Contember Interface has a built-in feature that displays a dialog to the user when a new version of the application is available. The dialog prompts the user to refresh the webpage to get the latest version, which ensures that they are using the most up-to-date and bug-free version of the application.

To detect when a new version is available, the application periodically fetches the `index.html` file and checks the version metadata stored in the `contember-build-version` meta tag. If the version has changed since the last time the application was loaded, the new version is considered to be available and the dialog is displayed.

:::caution
Ensure that the meta tag is included in the user-land code, typically using a build tool of your choice.
:::

#### Meta tag example:
```html
<meta name="contember-build-version" content="some-version-or-build-hash"/>
```


## Vite

To integrate the dialog with Vite, we provide a dedicated Vite plugin that simplifies the setup process. To get started, follow these steps:

- Install the `@contember/vite-plugin` package using your preferred package manager.
- Open your Vite configuration file (`vite.config.ts`) and enable the Contember plugin. You can do this by adding the following code snippet:

#### vite.config.ts
```typescript
import { contember } from '@contember/vite-plugin'

export default defineConfig(() => ({
	// ... other options
	plugins: [contember()]
}))

```
