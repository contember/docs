import { Directives } from '@contember/layout';

export type DirectivesType = {
  'full-width': boolean
}

export const initialDirectives: DirectivesType = {
  'full-width': false,
}

// Local export with current DirectivesType specific to the project
export const Directive = Directives.Directive as unknown as Directives.DirectiveComponentType<DirectivesType>

// Local export with current DirectivesType specific to the project
export const useDirectives = Directives.useDirectives<DirectivesType>
