import * as React from "react";
import { Schema } from "./schema/Schema";
import { ReactComponentEntrypoint } from "./rendering/ReactComponentEntrypoint";

export const App = ({ schema }: { schema: Schema }) => {
	return <ReactComponentEntrypoint schema={schema} name={'SelectField'}/>
}


