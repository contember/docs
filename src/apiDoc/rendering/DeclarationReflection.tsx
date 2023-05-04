import { JSONOutput } from "typedoc";
import { SchemaContext } from "../schema/SchemaContext";
import * as React from "react";
import { ReactElement } from "react";
import { ReflectionKind } from "../schema/ReflectionKind";
import { Type } from "./Type";
import { throwUnhandled } from "../utils/fail";
import { Property } from "./Property";

export const DeclarationReflection = ({ declaration, context }: {
	declaration: JSONOutput.DeclarationReflection,
	context: SchemaContext,
}): ReactElement => {
	if (context.path.find(it => it.kind === 'declaration' && it.declaration === declaration)) {
		return <>Recursion: {declaration.name}</>
	}
	const reflectionContext = context.in({ kind: 'declaration', declaration })
	switch (declaration.kind) {
		case ReflectionKind.Interface:
			const properties = declaration.children?.map(it => context.transformProperty(it)).filter(it => !!it) ?? []
			if (properties.length === 0) {
				return null
			}
			return (
				<div className={'typeNode typeNode--interface'}>
					<div className={'typeNode__title'}>{declaration.name}</div>
					<div className={'typeNode__content'}>
						{properties.map((it) => (
							<div className={'typeNode__item'} key={it.id}>
								<Property declaration={it} context={context} />
							</div>
						))}
					</div>
				</div>
			)
		case ReflectionKind.TypeLiteral:
			return throwUnhandled('type literal')
		case ReflectionKind.TypeAlias:
			return <>
				<div className={'typeNode typeNode--typeAlias'}>
					<div className={'typeNode__title'}>{declaration.name}</div>
					<div className={'typeNode__content'}>
						<Type type={declaration.type!} context={reflectionContext} />
					</div>
				</div>
			</>
		case ReflectionKind.Class:
			return <>
				<div className={'typeNode typeNode--class'}>
					<div className={'typeNode__content'}>
						new {declaration.name}
					</div>
				</div>
			</>
		default:
			return throwUnhandled('unhandled declaration kind')
	}
}
