import { JSONOutput } from "typedoc";
import { SchemaContext } from "../schema/SchemaContext";
import * as React from "react";
import { ReactElement } from "react";
import { TypeVisitor, visitType } from "../utils/TypeVisitor";
import { throwUnhandled } from "../utils/fail";
import { DeclarationReflection } from "./DeclarationReflection";
import { Property } from "./Property";
import { resolveLiterals } from "@site/src/apiDoc/utils/resolveLiterals";

export const Type = ({ type, context }: {
	type: JSONOutput.SomeType,
	context: SchemaContext,
}): ReactElement => {
	const typeContext = context.in({ kind: 'type', type })
	const visitor: Partial<TypeVisitor<ReactElement>> = {
		intersection: type => {
			return (
				<div className={'typeNode typeNode--intersection'}>
					<div className={'typeNode__title'}>Intersection of</div>
					<div className={'typeNode__content'}>
						{type.types.flatMap((it, index) => (
							<div className={'typeNode__item'} key={index}>
								<Type type={it} context={typeContext} />
							</div>
						))}
					</div>
				</div>
			)
		},
		union: type => {
			return (
				<div className={'typeNode typeNode--union'}>
					<div className={'typeNode__title'}>Union of</div>
					<div className={'typeNode__content'}>
						{type.types.flatMap((it, index) => (
							<div className={'typeNode__item'} key={index}>
								<Type type={it} context={typeContext} />
							</div>
						))}
					</div>
				</div>
			)
		},
		intrinsic: type => {
			return (
				<div className={'typeNode typeNode--intrinsic'}>
					<div className={'typeNode__content'}>
						{type.name}
					</div>
				</div>
			)
		},
		reference: type => {
			if (
				(type.package === 'typescript' && (type.name === 'Omit' || type.name === 'Partial' || type.name === 'Pick'))
				|| (type.package === '@contember/admin' && type.name === 'ForbidKeys') //todo: extension
			) {
				const target = type.typeArguments?.[0]
				let contextWithTransformer = typeContext
				switch (type.name) {
					case 'Omit':
						contextWithTransformer = contextWithTransformer.withPropertyTransformer(it => {
							const literals = resolveLiterals(type.typeArguments?.[1]);

							return literals.includes(it.name) ? null : it
						})
						break
					case 'Pick':
						contextWithTransformer = contextWithTransformer.withPropertyTransformer(it => {
							const literals = resolveLiterals(type.typeArguments?.[1]);
							return literals.includes(it.name) ? it : null
						})
						break
					case 'Partial':
						contextWithTransformer = contextWithTransformer.withPropertyTransformer(it => {
							return { ...it, flags: { ...it.flags, isOptional: true } }
						})
						break
				}
				return (
					<div className={'typeNode typeNode--utility'}>
						<div className={'typeNode__title'}>{type.name}</div>
						<div className={'typeNode__content'}>
							{target ? <Type type={target} context={contextWithTransformer} /> : 'Undefined argument'}
						</div>
					</div>
				)
			}
			if (type.refersToTypeParameter) {
				let typeArgument = context.getTypeArgument(type.name);
				return <>
					{typeArgument ?
						<Type type={typeArgument} context={typeContext} /> : ''}
				</>
			}

			if (typeof type.target === 'number') {
				const declaration = context.schema.getDeclarationById(type.target)
				if (!declaration) {
					return throwUnhandled('declaration not found')
				}


				const outTypeArguments = Object.fromEntries(
					declaration.typeParameters
						?.map((it, index): [string, undefined | JSONOutput.SomeType] => {
							const typeArg = type.typeArguments?.[index] ?? it.default;
							if (typeArg?.type === 'reference' && typeArg.refersToTypeParameter) {
								return [it.name, context.getTypeArgument(typeArg?.name)]
							}
							return [it.name, typeArg];
						})
						.filter((it): it is [string, JSONOutput.SomeType] => it[1] !== undefined) ?? []
				)

				return (
					<div className={'typeNode typeNode--reference'}>
						<div className={'typeNode__title'}>{declaration.name}</div>
						<div className={'typeNode__content'}>
							<DeclarationReflection
								declaration={declaration}
								context={typeContext.withTypeArguments(outTypeArguments)}
							/>
						</div>
					</div>
				)
			} else {
				return <>
					{type.qualifiedName}
				</>
			}

		},
		reflection: type => {
			let name = type.declaration.name

			if (name === '__type') {
				for (let i = context.path.length - 1; i >= 0; i--) {
					const el = context.path[i]
					if (el.kind === 'declaration') {
						name = el.declaration.name
						break
					}
				}
			}
			const properties = type.declaration.children?.map(it => context.transformProperty(it)).filter(it => !!it) ?? []
			if (properties.length === 0) {
				return <></>
			}
			return (
				<div className={'typeNode typeNode--reflection'}>
					<div className={'typeNode__title'}>{name}</div>
					<div className={'typeNode__content'}>
						{properties.map((it) => (
							<div className={'typeNode__item'} key={it.id}>
								<Property declaration={it} context={context} />
							</div>
						))}
					</div>
				</div>
			)
		}
	}
	return visitType(type, visitor) ?? throwUnhandled(type.type)
}
