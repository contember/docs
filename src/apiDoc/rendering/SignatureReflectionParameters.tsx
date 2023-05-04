import { JSONOutput } from "typedoc";
import { SchemaContext } from "../schema/SchemaContext";
import * as React from "react";

import { InlineType } from "./InlineType";

export const SignatureReflectionParameters = ({ reflection, context }: {
	reflection: JSONOutput.SignatureReflection,
	context: SchemaContext,
}) => {
	return (
		<span>
			{'('}{reflection.parameters?.map((it, index) => (
			<React.Fragment key={it.name}>
				{index > 0 ? ', ' : ''}
				<span>
					<span>{it.name}{it.flags.isOptional ? '?' : ''}</span>
					{it.type
						? <>{': '}
							<span>
								<InlineType type={it.type} context={context} />
							</span>
						</>
						: ''}
				</span>
			</React.Fragment>
		))}{')'}
		</span>
	)
}
