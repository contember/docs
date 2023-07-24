import type { JSONOutput } from "typedoc";
import { ReflectionKind } from "./ReflectionKind";

type DeclarationMapEntry = { declaration: JSONOutput.DeclarationReflection, path: string[] };

export class Schema {
	private declarationsById: Map<number, DeclarationMapEntry> = new Map()
	private declarationsByName: Map<string, JSONOutput.DeclarationReflection> = new Map()

	constructor(
		public readonly project: JSONOutput.ProjectReflection,
	) {
		this.initializeIndexes()
	}

	private initializeIndexes(): void {
		const traverseReflection = (reflection: JSONOutput.ContainerReflection, path: string[]) => {
			reflection.children?.forEach(it => {
				let newPath = [...path, it.name]
				this.declarationsById.set(it.id, { declaration: it, path })
				this.declarationsByName.set(newPath.join('/'), it)
				if (it.kind === ReflectionKind.Module || it.kind === ReflectionKind.Namespace) {
					traverseReflection(it, newPath)
				}
				if (it.kind === ReflectionKind.Variable && it.type.declaration) {
					traverseReflection(it.type.declaration, newPath)
				}
			})
		}
		traverseReflection(this.project, [])
	}

	public getDeclarationById(id: number) {
		return this.declarationsById.get(id)?.declaration
	}

	public getDeclarationByIdWithMeta(id: number) {
		return this.declarationsById.get(id)
	}

	getDeclarationByName(path: string[]) {
		return this.declarationsByName.get(path.join('/'))
	}
}
