import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { JSONOutput } from "typedoc";
import { getReactComponent } from "@site/src/apiDoc/utils/getReactComponent";
import { Schema } from "@site/src/apiDoc/schema/Schema";
import { filterSchema } from "@site/src/apiDoc/utils/filterSchema";
import { ReflectionKind } from "@site/src/apiDoc/schema/ReflectionKind";

(async () => {
	const filePath = path.resolve(process.cwd(), process.argv[2])
	const target = process.argv[3] ? path.resolve(process.cwd(), process.argv[3]) : null
	const file: JSONOutput.ProjectReflection = JSON.parse(await fs.readFile(filePath, 'utf8'))
	const schema = new Schema(file)

	const idToGroupMap = new Map<number, string>()
	file.groups.forEach(it => {
		it.children.map(id => {
			idToGroupMap.set(id, it.title)
		})
	})

	const tryWriteComponent = async (reflections: JSONOutput.DeclarationReflection[], groupName: string)  => {
		const child = reflections[reflections.length - 1]
		const component = getReactComponent(child, schema, false)
		const componentName = reflections.map(it => it.name).join('.')
		if (!component || component.isInternal) {
			console.log('Not a component ' + componentName)

			return
		}
		if (groupName === 'Functions' || groupName === 'Variables' || groupName === 'Namespaces') {
			console.log('Skipping ' + componentName)
			return
		}

		if (!target) {
			console.log('Will write ' + componentName + ' (' + groupName + ')')
			return
		} else {
			const filteredSchema = filterSchema(reflections, new Schema(file))

			const jsonFile = path.join(target, groupName, componentName + '.json')
			const mdxFile = path.join(target, groupName, componentName + '.mdx')
			await fs.mkdir(path.dirname(jsonFile), { recursive: true })

			// language=MDX
			const mdxContent = `import {ReactComponentEntrypoint} from "@src/apiDoc/rendering/ReactComponentEntrypoint";
import {Schema} from "@src/apiDoc/schema/Schema";
import declarations from './__name__.json'

<ReactComponentEntrypoint schema={new Schema(declarations)} name="__name__" />`.replaceAll(/__name__/g, componentName)

			await fs.writeFile(jsonFile, JSON.stringify(filteredSchema, null, '\t'))

			try {
				await fs.readFile(mdxFile)
			} catch {
				await fs.writeFile(mdxFile, mdxContent)
			}

			// console.log()
			// renderToString(createElement(ReactComponentEntrypoint, {
			// 	schema: new Schema(filteredSchema),
			// 	name: child.name,
			// }), {})

		}


	}

	for (const child of file.children) {
		const groupName = idToGroupMap.get(child.id)

		await tryWriteComponent([child], groupName)

		const children = child.kind === ReflectionKind.Namespace && 'children' in child
			? child.children
			: (child.kind === ReflectionKind.Variable && 'type' in child && child.type.type === 'reflection')
				? (child.type.declaration.children ?? [])
				: []

		for (const child2 of children) {
			let localGroupName = groupName
			if (localGroupName === 'Namespaces') {
				localGroupName = child.groups?.find(it => it.children.includes(child2.id))?.title
			}
			await tryWriteComponent([child, child2], localGroupName)
		}
	}
})().catch(e => {
	console.error(e)
	process.exit(1)
})
