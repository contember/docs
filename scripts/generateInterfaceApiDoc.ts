import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { JSONOutput } from "typedoc";
import { getReactComponent } from "@site/src/apiDoc/utils/getReactComponent";
import { Schema } from "@site/src/apiDoc/schema/Schema";
import { filterSchema } from "@site/src/apiDoc/utils/filterSchema";

(async () => {
	const filePath = path.resolve(process.cwd(), process.argv[2])
	const target = path.resolve(process.cwd(), process.argv[3])
	const file: JSONOutput.ProjectReflection = JSON.parse(await fs.readFile(filePath, 'utf8'))
	const schema = new Schema(file)


	const idToGroupMap = new Map<number, string>()
	file.groups.forEach(it => {
		it.children.map(id => {
			idToGroupMap.set(id, it.title)
		})
	})
	for (const child of file.children) {
		const component = getReactComponent(child)
		const groupName = idToGroupMap.get(child.id)

		if (component && !component.isInternal) {
			if (groupName === 'Functions' || groupName === 'Variables') {
				console.log('Skipping ' + child.name)
			} else {
				const filteredSchema = filterSchema(child, new Schema(file))

				const jsonFile = path.join(target, groupName, child.name + '.json')
				const mdxFile = path.join(target, groupName, child.name + '.mdx')
				await fs.mkdir(path.dirname(jsonFile), { recursive: true })

				// language=MDX
				const mdxContent = `import {ReactComponentEntrypoint} from "@src/apiDoc/rendering/ReactComponentEntrypoint";
import {Schema} from "@src/apiDoc/schema/Schema";
import declarations from './__name__.json'

<ReactComponentEntrypoint schema={new Schema(declarations)} name="__name__" />`.replaceAll(/__name__/g, child.name)

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
	}
})().catch(e => {
	console.error(e)
	process.exit(1)
})
