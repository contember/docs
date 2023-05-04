import { Schema } from "../schema/Schema";
import * as React from "react";
import { getReactComponent } from "../utils/getReactComponent";
import { SchemaContext } from "../schema/SchemaContext";
import { Type } from "./Type";
import LiveCode from "@site/src/components/liveCode";
import CodeBlock from '@theme/CodeBlock';

export const ReactComponentEntrypoint = ({ schema, name }: { schema: Schema, name: string }) => {
	let refl = schema.getDeclarationByName([name]);
	if (!refl) {
		return <>Declaration {name} not found</>
	}
	const reactComponent = getReactComponent(refl)
	if (!reactComponent) {
		return <>{name} is not a react component</>
	}
	const context = SchemaContext.create(schema)
	const signature = reactComponent.reflection.signatures[0]
	const textSummary = signature?.comment?.summary?.map(it => it.text).join('') ?? ''

	return (
		<>
			<div className={'textSummary'}>{textSummary}</div>
			{signature?.comment?.blockTags?.filter(it => it.tag === '@example').map(it => <>
				{it.content.filter(it => it.kind === 'code').map(it => <CodeBlock language={'tsx'}>{it.text.replace(/^```[a-z0-9]*(.+)```$/s, '$1').trim()}</CodeBlock>)}
			</>)}
			<div className={'propList'}>
				<Type context={context} type={reactComponent.props} />
			</div>
		</>
	)
}


