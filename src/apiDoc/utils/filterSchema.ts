import { JSONOutput } from "typedoc";
import { Schema } from "../schema/Schema";
import { TypeVisitor, visitType } from "./TypeVisitor";



export const filterSchema = (reflection: JSONOutput.DeclarationReflection, schema: Schema): JSONOutput.ProjectReflection => {
	const usedDeclarations = new Set<number>()
	usedDeclarations.add(reflection.id)
	const visitor: TypeVisitor<JSONOutput.SomeType | undefined | (JSONOutput.SomeType | undefined)[]> = {
		array: it => it.elementType,
		conditional: it => [
			it.trueType,
			it.falseType,
			it.extendsType,
			it.checkType,
		],
		indexedAccess: it => [
			it.indexType,
			it.objectType,
		],
		inferred: it => it.constraint,
		intersection: it => it.types,
		union: it => it.types,
		mapped: it => [
			it.nameType,
			it.templateType,
			it.parameterType,
		],
		namedTupleMember: it => it.element,
		optional: it => it.elementType,
		predicate: it => it.targetType,
		query: it => it.queryType,
		rest: it => it.elementType,
		templateLiteral: it => it.tail.map(it => it[0]),
		tuple: it => it.elements,
		typeOperator: it => it.target,
		reflection: it => {
			return getTypesFromDeclarationReflection(it.declaration)
		},
		reference: it => {
			if (it.refersToTypeParameter) {
				return
			}
			if (typeof it.target === 'number') {
				if (usedDeclarations.has(it.target)) {
					return
				}
				const target = schema.getDeclarationById(it.target)
				if (!target) {
					return
				}
				usedDeclarations.add(it.target)
				return getTypesFromDeclarationReflection(target)
			}
			return it.typeArguments
		},

		intrinsic: it => undefined,
		literal: it => undefined,
		unknown: it => undefined,
	}
	const types = getTypesFromDeclarationReflection(reflection)
	while (types.length) {
		const type = types.pop()
		if (!type) {
			continue
		}
		let visitorResult = visitType(type, visitor)
		visitorResult = Array.isArray(visitorResult) ? visitorResult : [visitorResult]
		types.push(...visitorResult)
	}

	const filteredProjectReflection = filterReflection(schema.project, usedDeclarations)
	return {
		id: schema.project.id,
		name: schema.project.name,
		kind: schema.project.kind,
		flags: schema.project.flags,
		variant: schema.project.variant,
		children: filteredProjectReflection?.children ?? [],
		symbolIdMap: {}, // todo?
	}
}


export const filterReflection = <T extends JSONOutput.ContainerReflection>(reflection: T, usedReflections: Set<number>): T | undefined => {
	if (usedReflections.has(reflection.id)) {
		return reflection
	}
	const filteredChildren = reflection.children
			?.map(it => filterReflection(it, usedReflections))
			.filter(<T>(it: T | undefined): it is T => it !== undefined)
		?? []
	if (filteredChildren.length === 0) {
		return undefined
	}
	return {
		...reflection,
		children: filteredChildren,
	}
}
const getTypesFromSignatureReflection = (reflection: JSONOutput.SignatureReflection): (JSONOutput.SomeType | undefined)[] => {
	return [
		reflection.type,
		...reflection.parameters?.map(it => it.type) ?? [],
		...reflection.typeParameter?.flatMap(it => [it.type, it.default]) ?? [],
		reflection?.overwrites,
		reflection?.inheritedFrom,
		reflection?.implementationOf,
	]
}

const getTypesFromDeclarationReflection = (reflection: JSONOutput.DeclarationReflection): (JSONOutput.SomeType | undefined)[] => {
	return [
		reflection.type,
		...reflection.typeParameters?.flatMap(it => [it.type, it.default]) ?? [],
		...reflection.signatures?.flatMap(it => getTypesFromSignatureReflection(it)) ?? [],
		...(reflection.indexSignature ? getTypesFromSignatureReflection(reflection.indexSignature) : []),
		...(reflection.getSignature ? getTypesFromSignatureReflection(reflection.getSignature) : []),
		...(reflection.setSignature ? getTypesFromSignatureReflection(reflection.setSignature) : []),
		reflection.inheritedFrom,
		reflection.overwrites,
		reflection.implementationOf,
		...reflection.extendedTypes ?? [],
		...reflection.implementedTypes ?? [],
		// intentionally ignoring extendedBy
		// intentionally ignoring implementedBy
	]
}
