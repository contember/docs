import { JSONOutput } from "typedoc";
import { ReflectionKind } from "../schema/ReflectionKind";
import { Schema } from "../schema/Schema";


export interface ReactComponentLike {
	reflection: JSONOutput.DeclarationReflection
	props: JSONOutput.SomeType
	isInternal: boolean
}

export const getReactComponent = (reflection: JSONOutput.DeclarationReflection, schema: Schema): ReactComponentLike | null => {
	if (reflection.kind === ReflectionKind.Function || reflection.kind === ReflectionKind.TypeLiteral) {
		const signature = reflection.signatures?.[0]
		if (!signature || !signature.type) {
			return null
		}
		if (!isReactNodeType(signature.type)) {
			return null
		}
		let props = signature.parameters?.[0]
		if (!props || !props.type) {
			return null
		}
		return {
			reflection,
			props: props.type,
			isInternal: props.comment?.modifierTags?.includes('@internal'),
		}
	} else if (reflection.kind === ReflectionKind.Variable || reflection.kind === ReflectionKind.Property) {
		if (!reflection.type) {
			return null
		}
		if (reflection.type.type !== 'reference') {
			return null
		}
		if (reflection.type.package === '@types/react' && reflection.type.name === 'ComponentType') {
			const props = reflection.type.typeArguments?.[0]
			if (props) {
				return { props, reflection, isInternal: false }
			}
		}
		if (typeof reflection.type.target === 'number') {
			const resolvedType = schema.getDeclarationById(reflection.type.target)
			if (resolvedType && ('type' in resolvedType) && resolvedType.type.type === 'intersection') {
				for (const type of resolvedType.type.types) {
					if (type.type === 'reflection') {
						const reactComponent = getReactComponent(type.declaration, schema)
						if (reactComponent) {
							return reactComponent
						}
					}
				}
			}
		}
	}
	return null
}


const isReactNodeType = (type: JSONOutput.SomeType): boolean => {
	if (type.type === 'union') {
		return type.types.every(it => isReactNodeType(it))
	}
	if (type.type === 'literal') {
		const valueType = typeof type.value
		return type.value === null
			|| type.value === undefined
			|| valueType === 'number'
			|| valueType === 'string'
			|| valueType === 'boolean'
	}
	if (type.type === 'reference') {
		return (type.package === '@types/react' && type.name === 'ReactElement')
			|| (type.package === '@types/react' && type.name === 'React.ReactElement')
			|| (type.package === '@types/react' && type.name === 'Element')
	}
	return false
}
