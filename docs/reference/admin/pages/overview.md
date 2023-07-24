---
title: Routing and pages overview
---


In order to define pages in Contember Interface, you need to export function components from files in the `admin/pages` directory (or its subdirectory).

In the functions exported from page components, you will usually use one of the prepared [scope](./scopes.md) or [page](./pages-components) components provided by Contember.

```typescript jsx
export default () => {
	return (
		<>
			<p>Page content here</p>
		</>
	)
}
```

## [Routing](./routing)

Contember's routing system allows flexible structuring of your interface based on exported components from your files. You can create pages, subpages or nested pages based on your project's needs. This approach offers an intuitive way to design the navigation flow in your application. For more details, refer to the [routing section](./routing) in our documentation.

## [Links and redirects](./links.md)

In Contember, navigating through your application is made easy and intuitive through a range of dedicated components and hooks. These tools simplify the creation of hyperlinks, support static and dynamic parameters, and allow for programmable route changes based on your application's logic. This enables you to build a highly interactive and user-friendly interface, enhancing the overall user experience. For more specific information, please refer to the [links chapter](./links.md).

## <span className="version">Interface 1.2+</span> [Scopes](./scopes)

Contember provides several prepared scope components to help you quickly set up common pages in your admin panel. These scope components handle common tasks like loading and saving data, rendering form fields and displaying entity lists.

## [Pages](./pages-components)

While page components were once the standard for defining individual pages in Contember, they now represent a legacy approach. In new applications, we highly recommend utilizing [scopes](./scopes) for enhanced flexibility and efficiency.
