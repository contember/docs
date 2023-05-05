import { JSONOutput } from "typedoc";
import { SchemaContext } from "../schema/SchemaContext";
import * as React from "react";
import { ReactElement } from "react";
import { TypeVisitor, visitType } from "../utils/TypeVisitor";
import { throwUnhandled } from "../utils/fail";
import { InlineReflection } from "./InlineReflection";

export const InlineType = ({ type, context }: {
	type: JSONOutput.SomeType,
	context: SchemaContext,
}): ReactElement => {
	const typeContext = context.in({ kind: 'type', type })
	const visitor: Partial<TypeVisitor<ReactElement>> = {
		intersection: type => {
			return (<>
					{type.types.map((it, index) => (
						<span key={index}>
							& <InlineType type={it} context={typeContext} />
						</span>
					))}
				</>
			)
		},
		union: type => {
			return (<>
					{type.types.map((it, index) => (
						<span key={index}>
							| <InlineType type={it} context={typeContext} />
						</span>
					))}
				</>
			)
		},
		intrinsic: type => {
			return (
				<span>{type.name}</span>
			)
		},
		array: type => {
			return (
				<span>
					<InlineType type={type.elementType} context={typeContext} />[]
				</span>
			)
		},
		typeOperator: type => {
			if (type.operator === 'readonly') {
				// todo
				return <InlineType type={type.target} context={typeContext} />
			}
			if (type.operator === 'keyof') {
				return <>keyof <InlineType type={type.target} context={typeContext} /></>
			}
			return throwUnhandled('unhandled type operator')
		},
		indexedAccess: type => {
			return <span><InlineType type={type.objectType} context={typeContext} />[<InlineType type={type.indexType}
																								 context={typeContext} />]</span>
		},
		literal: type => {
			return (
				<span>{JSON.stringify(type.value)}</span>
			)
		},
		reference: type => {
			if (type.refersToTypeParameter) {
				let typeArg = context.getTypeArgument(type.name);
				return <span>
					{typeArg ?
						<InlineType type={typeArg} context={typeContext} /> : type.name}
				</span>
			}
			return <span>
				{type.qualifiedName ?? type.name}
				{type.typeArguments ? <span>
					{'<'}
					{type.typeArguments.map((it, index) => <React.Fragment key={index}>
						{index > 0 ? ', ' : ''}
						<InlineType key={index} type={it} context={typeContext} />
					</React.Fragment>)}
					{'>'}
				</span> : null}
			</span>

		},
		reflection: type => {
			return <InlineReflection declaration={type.declaration} context={typeContext} />
		},
		tuple: type => {
			return <>
				{'['}
				{type.elements.map((it, index) => <React.Fragment key={index}>
					{index > 0 ? ', ' : ''}
					<InlineType key={index} type={it} context={typeContext} />
				</React.Fragment>)}
				{']'}
			</>
		}
	}
	return visitType(type, visitor) ?? throwUnhandled(type.type)
}
