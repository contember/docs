import { createDirectiveContext } from '@contember/layout';
import * as React from 'react';

type DirectivesType = {
  'title': string | null | undefined;
}

const directivesDefaultValues: DirectivesType = Object.freeze({
  'title': undefined,
})

export const directivesList = Object.keys(directivesDefaultValues) as (keyof DirectivesType)[]
export const [DirectivesProvider, Directive, DirectivesConsumer, useDirectives] = createDirectiveContext<DirectivesType>('Directives', directivesDefaultValues)

// Short-hand for <Directive name="title" content={children} />
export const Title = React.memo<{ children: string | null | undefined }>(({ children }) => (
  <Directive name="title" content={children} />
))
