import { JSONOutput } from "typedoc";
import { visitType } from "./TypeVisitor";

export const resolveLiterals = (type: JSONOutput.SomeType): (string | number | boolean | null | bigint)[] => {
	return visitType<(string | number | boolean | null | bigint)[]>(type, {
			union: it => {
				return it.types.flatMap(it => resolveLiterals(it))
			},
			literal: it => {
				if (it.value && typeof it.value === 'object') {
					return [BigInt(`${it.value.negative ? "-" : ""}${it.value.value}`)]
				}
				return [it.value as string | number | boolean | null]
			},
		}
	)
}
