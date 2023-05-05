import { JSONOutput } from "typedoc";
import { ReflectionKind } from "../schema/ReflectionKind";
import { PathItem, SchemaContext } from "../schema/SchemaContext";
import { TypeVisitor, visitType } from "./TypeVisitor";
import { throwUnhandled } from "./fail";

type Property = {
	name: string
	type?: JSONOutput.SomeType
	path: PathItem[]
}

export const getEnumerablePropertiesFromType = (
	type: JSONOutput.SomeType,
	context: SchemaContext,
): Property[] => {
	const typeContext = context.in({ kind: 'type', type })
	const visitor: Partial<TypeVisitor<Property[]>> = {
		intersection: type => {
			return type.types.flatMap(it => getEnumerablePropertiesFromType(it, typeContext));
		},
		union: type =>
			type.types.flatMap(it => getEnumerablePropertiesFromType(it, typeContext)),
		reference: type => {
			if (type.package === 'typescript' && type.name === 'Omit') {
				const target = type.typeArguments?.[0]
				if (!target) {
					return []
				}
				return getEnumerablePropertiesFromType(target, typeContext).filter(it => {
					// todo filter by type.typeArguments?.[1]
					return true
				})
			}
			if (typeof type.target === 'number') {
				const declaration = context.schema.getDeclarationById(type.target)
				if (!declaration) {
					return throwUnhandled('declaration not found')
				}
				return getEnumerablePropertiesFromDeclaration(declaration, typeContext)
			}

			return throwUnhandled('unhandled reference')
		},
		reflection: type => {
			return type.declaration.children?.map((it): Property => ({
				name: it.name,
				type: it.type,
				path: context.path,
			})) ?? []
		}
	}
	return visitType(type, visitor) ?? throwUnhandled(type.type)
}

export const getEnumerablePropertiesFromDeclaration = (
	declaration: JSONOutput.DeclarationReflection,
	context: SchemaContext,
): Property[] => {
	const reflectionContext = context.in({ kind: 'declaration', declaration })
	switch (declaration.kind) {
		case ReflectionKind.Interface:
			return declaration.children?.map((it): Property => ({
				name: it.name,
				type: it.type,
				path: reflectionContext.in({ kind: 'declaration', declaration: it }).path,
			})) ?? []
		case ReflectionKind.TypeLiteral:
			return throwUnhandled('type literal')
		case ReflectionKind.TypeAlias:
			return getEnumerablePropertiesFromType(declaration.type!, reflectionContext)
		default:
			return throwUnhandled('unhandled declaration kind')
	}

}
