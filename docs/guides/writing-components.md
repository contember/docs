---
title: Writing custom components
---

:::caution This is an advanced guide

You can achieve a lot just by using built-in components. There is [a list of them](/reference/admin/components/form-fields.mdx).

:::

React components must be wrapped into `Component` higher order component to support [data binding](/reference/admin/data-binding/overview.md). If you use hooks in data binding aware component, you must use second argument of this function with a "static render" implementation.

#### Example: simple component

Simple components, which only wraps other components, can be written as follows:

```tsx
import { Component, TextField, Box } from '@contember/admin'
interface SeoFormProps {
  // ...
}
const SeoForm = Component<SeoFormProps>(
  (props) => {
    return (
      <Box>
        <TextField field={'title'} label={'Title'} />
        <TextField field={'description'} label={'Description'} />
      </Box>
    )
  }
)
```

#### Example: component with hooks

During static render, hooks are not available. This is why we need a separate static render function in this case.

```tsx
import { useState } from 'react'
import { Component, TextField, Box, Field, useEntity } from '@contember/admin'

interface SeoFormProps {
  // ...
}

const SeoForm = Component<SeoFormProps>(
  (props) => {
    const entity = useEntity()
    const [state, setState] = useState()
    // ...  
    return (
      <Box>
        <TextField field={'title'} label={'Title'} />
        <TextField field={'description'} label={'Description'} />
      </Box>
    )
  },
  (props) => {
    return (
      <>
        <Field field={'title'} />
        <Field field={'description'} />
      </>
    )
  }
)
```


#### Example: ordinary components

If a component does not directly directly use data-binding, you don't have to worry about static render as Contember will always analyze its children.

```tsx
const FormWrapper = ({ children }) => {
    const [state, setState] = useState() 
    // ...
    return (
        <div /* .... */>
            {children}
        </div>
    )
}

// children will be analyzed:
const form = (
    <FormWrapper>
        <SeoForm />
    </FormWrapper>
)
```
