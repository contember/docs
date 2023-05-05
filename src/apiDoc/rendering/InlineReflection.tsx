import { JSONOutput } from "typedoc";
import { SchemaContext } from "../schema/SchemaContext";
import { SignatureReflection } from "./SignatureReflection";
import * as React from "react";

export const InlineReflection = ({ declaration, context }: {
	declaration: JSONOutput.DeclarationReflection,
	context: SchemaContext,
}) => {
	return <>
		{declaration.signatures?.map((it, index) => <SignatureReflection key={index} reflection={it} context={context} />)}
	</>
}
