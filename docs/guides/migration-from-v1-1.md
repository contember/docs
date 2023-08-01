---
title: Migration from v1.1
---

:::warning
This guide is a work in progress to enable you to migrate your application from Contember v1.1 to v1.2.0 before the final release.
:::

1.2.0 is a major release of the framework. It contains some pretty exciting features, but also a few breaking changes to make way for the future. This guide will help you upgrade your application to 1.2.0 and take advantage of the new features.

## Bump versions of `@contember/*` packages and run `npm install`.

```diff title="package.json"
 {
   "scripts": {
-     "contember": "docker-compose run contember-cli",
+     "contember": "docker-compose run --rm contember-cli",
      ...
   },
   "devDependencies": {
-    "@contember/schema": "1.2.1",
+    "@contember/schema": "1.3.0-rc.1",
-    "@contember/schema-definition": "1.2.1",
+    "@contember/schema-definition": "1.3.0-rc.1",
-    "@contember/admin": "^1.0.0",
+    "@contember/admin": "^1.2.0-rc.16",
     ...
-    "@types/react": "^17",
+    "@types/react": "^18",
+    "@types/react-dom": "^18",
-    "react": "^17",
+    "react": "^18",
-    "react-dom": "^17",
+    "react-dom": "^18",
-    "typescript": "^4.5",
+    "typescript": "^5.0",
-    "vite": "^2.7"
+    "vite": "^4"
   }
 }
```

## Add support for React 17 JSX transform

Use React 17+ `react-jsx` transform instead of `react` in `tsconfig.json`:

```diff title="tsconfig.json"
 {
   "compilerOptions": {
     ...
-    "jsx": "react",
+    "jsx": "react-jsx",
     ...
```

Now you can remove all unnecessary `React` namespace imports from your codebase:

```diff
-import * as React from 'react'
```

## Add support for React 18

```diff title="admin/index.tsx"
@@ -1,6 +1,6 @@
-import * as React from 'react'
-import { ApplicationEntrypoint, Pages, runReactApp } from '@contember/admin'
+import { ApplicationEntrypoint, PageModule, Pages, runReactApp } from '@contember/admin'
-import '@contember/admin/style.css'
+import '@contember/admin/index.css'
+import { createRoot } from 'react-dom/client'
 import { Layout } from './components/Layout'

 runReactApp(
 	<ApplicationEntrypoint
 		basePath={import.meta.env.BASE_URL}
 		apiBaseUrl={import.meta.env.VITE_CONTEMBER_ADMIN_API_BASE_URL}
 		sessionToken={import.meta.env.VITE_CONTEMBER_ADMIN_SESSION_TOKEN}
 		project={import.meta.env.VITE_CONTEMBER_ADMIN_PROJECT_NAME}
 		stage="live"
+		envVariables={{ WEB_URL: import.meta.env.VITE_CONTEMBER_ADMIN_WEB_URL }}
-		children={<Pages layout={Layout} children={import.meta.globEager('./pages/**/*.tsx')} />}
+		children={
+			<Pages
+				layout={Layout}
+				children={import.meta.glob<PageModule>(
+					'./pages/**/*.tsx',
+					{ eager: true },
+				)}
+			/>
+		}
 	/>,
+	null,
+	(dom, react, onRecoverableError) => createRoot(dom, { onRecoverableError }).render(react),
 )
```

## Admin Interface

Remove extra nesting of `Menu.Item` components:

```diff title="admin/components/Navigation.tsx"
-import * as React from 'react'
 import { Menu } from '@contember/admin'
+import * as React from 'react'

 export const Navigation = () => (
   <Menu>
-		<Menu.Item>
-			<Menu.Item title="Dashboard" to="index" />
-		</Menu.Item>
+		<Menu.Item title="Dashboard" to="index" />
   </Menu>
 )
```

## Add favicon, Apple touch icon and theme color (optional but recommended):

```diff title="admin/index.html"
 	<head>
 		<meta charset="utf-8">
 		<meta name="viewport" content="width=device-width, viewport-fit=cover, initial-scale=1">
+		<link rel="icon" type="image/png" href="./favicon.png">
+		<link rel="apple-touch-icon" href="./apple-touch-icon.png">
 		<title>Admin quickstart</title>
+		<meta name="theme-color" content="#F2F5F1" media="(prefers-color-scheme: light)">
+		<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)">
 		<script type="module" src="./index.tsx"></script>
 	</head>
 </html>
```
