import * as React from 'react'
import { MyCustomLayout } from '../my-custom-layout'

export const Layout = ({
  children: pages,
}: React.PropsWithChildren) => (
  <>
    <MyCustomLayout />
    {pages}
  </>
)
