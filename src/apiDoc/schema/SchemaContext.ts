import { JSONOutput } from "typedoc";
import { Schema } from "./Schema";

export type TypeArgumentsMap = Record<string, JSONOutput.SomeType>;

export type PathItem =
	| { kind: 'type', type: JSONOutput.SomeType }
	| { kind: 'declaration', declaration: JSONOutput.DeclarationReflection }


export type PropertyTransformer = (property: JSONOutput.DeclarationReflection, context: SchemaContext) => JSONOutput.DeclarationReflection | null

export class SchemaContext {
	private constructor(
		private readonly options: {
			readonly schema: Schema,
			readonly path: PathItem[],
			readonly typeArguments: TypeArgumentsMap,
			readonly propertyTransformer: PropertyTransformer
		}
	) {
	}

	public static create(schema: Schema): SchemaContext {
		return new SchemaContext({ schema, path: [], typeArguments: {}, propertyTransformer: it => it })
	}

	get schema() {
		return this.options.schema
	}

	get path() {
		return this.options.path
	}

	transformProperty(property: JSONOutput.DeclarationReflection): JSONOutput.DeclarationReflection | null {
		return this.options.propertyTransformer(property, this)
	}

	public in(source: PathItem): SchemaContext {
		return new SchemaContext({
			...this.options,
			path: [...this.options.path, source]
		})
	}

	public getTypeArgument(name: string) {
		return this.options.typeArguments[name]
	}

	public withTypeArguments(typeArguments: TypeArgumentsMap) {
		return new SchemaContext({
			...this.options,
			typeArguments,
		})
	}

	public withPropertyTransformer(propertyTransformer: PropertyTransformer): SchemaContext {
		return new SchemaContext({
			...this.options,
			propertyTransformer: (prop, context) => {
				const result = propertyTransformer(prop, context)
				if (result === null) {
					return null
				}
				return this.options.propertyTransformer(result, context)
			}
		})
	}
}
