import {
  createLayoutSlotComponent,
  createLayoutSlotTargetComponent,
} from '@contember/layout'

export const slotTargets = Object.freeze({
  // highlight-next-line
  Subtitle: 'subtitle',
})

export type SlotsMapType = Record<keyof typeof slotTargets, ReturnType<typeof createLayoutSlotComponent>>

export const Slots: SlotsMapType = {
  // highlight-next-line
  Subtitle: createLayoutSlotComponent(slotTargets.Subtitle, 'Subtitle'),
}

export type SlotTargetsMapType = Record<keyof typeof slotTargets, ReturnType<typeof createLayoutSlotTargetComponent>>

export const SlotTargets: SlotTargetsMapType = {
  // highlight-next-line
  Subtitle: createLayoutSlotTargetComponent(slotTargets.Subtitle, 'Subtitle'),
}
