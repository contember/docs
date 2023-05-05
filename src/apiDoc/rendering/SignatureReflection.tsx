import { JSONOutput } from "typedoc";
import { SchemaContext } from "../schema/SchemaContext";
import { SignatureReflectionParameters } from "./SignatureReflectionParameters";
import * as React from "react";

import { InlineType } from "./InlineType";

const anyType: JSONOutput.IntrinsicType = { type: 'intrinsic', name: 'any' }
export const SignatureReflection = ({ reflection, context }: {
	reflection: JSONOutput.SignatureReflection,
	context: SchemaContext,
}) => {
	return (
		<span>
			<SignatureReflectionParameters reflection={reflection} context={context} />
			{' => '}
			<InlineType type={reflection.type ?? anyType} context={context} />
		</span>
	)
}
