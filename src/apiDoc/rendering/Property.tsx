import { JSONOutput } from "typedoc";
import { SchemaContext } from "../schema/SchemaContext";
import * as React from "react";
import { ReactElement } from "react";

import { InlineType } from "./InlineType";

export const Property = ({ declaration, context }: {
	declaration: JSONOutput.DeclarationReflection,
	context: SchemaContext,
}): ReactElement => {
	return (
		<div className={'property'}>
			<div className={'property__name'}>{declaration.name}{declaration.flags.isOptional ? '' : '*'}</div>
			<div className={'property__type'}>
				{declaration.type && <InlineType type={declaration.type} context={context} />}
			</div>
			<div className={'property__description'}></div>
		</div>
	)
}
