import { JSONOutput } from "typedoc";

export type TypeVisitor<T = void> = {
	[K in keyof JSONOutput.TypeKindMap]?: (type: JSONOutput.TypeKindMap[K]) => T;
}

export function visitType<T>(type: JSONOutput.SomeType, visitor: TypeVisitor<T>): T
export function visitType<T>(type: JSONOutput.SomeType, visitor: Partial<TypeVisitor<T>>): T | undefined
export function visitType<T>(type: JSONOutput.SomeType, visitor: Partial<TypeVisitor<T>>): T | undefined {
	const handler = visitor[type.type]
	if (!handler) {
		return undefined
	}
	return handler(type as any)
}

