import { CommonSlotSources, CommonSlotTargets, Slots, commonSlots } from '@contember/layout'
import { useDocumentTitle } from '@contember/react-utils'
import { memo } from 'react'

// 1. Defining your own slots:
// highlight-start
const [
  mySlots,       // 👈 same array as the argument (for convenience)
  MySlotSources, // 👈 components that "portal" their children to other DOM nodes
  MySlotTargets, // 👈 components that "receive" children from slot sources
] = Slots.createSlotComponents([
  'Subtitle',
])
// highlight-end

// 2. Exporting your slots together with the common ones:
export const slots = [
  ...commonSlots,
  // highlight-next-line
  ...mySlots,
]

export const SlotSources = {
  ...CommonSlotSources,
  // highlight-next-line
  ...MySlotSources,
}

export const SlotTargets = {
  ...CommonSlotTargets,
  // highlight-next-line
  ...MySlotTargets,
}

export const Title = memo<{ children: string | null | undefined }>(({ children }) => {
  // Hook that will update the document title in browser tab:
  useDocumentTitle(children)

  return (
    // Title is already defined in CommonSlotSources, so we can use it:
    <SlotSources.Title>{children}</SlotSources.Title>
  )
})
