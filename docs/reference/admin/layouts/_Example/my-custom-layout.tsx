import { DropdownContentContainerProvider } from "@contember/admin"
import {
  commonSlotTargets,
  CommonSlotTargets,
  useDocumentTitle,
  useLayoutSlotRegistryContext,
} from "@contember/layout"
import { useDirectives } from "./components/Directives"
import { SlotTargets, slotTargets } from "./components/Slots"

export function MyCustomLayout() {
  const { activeSlots } = useLayoutSlotRegistryContext()
  const directives = useDirectives()

  useDocumentTitle(directives.title)

  return (
    <div className="layout">
      <header className="layout__header">
        {activeSlots.has(commonSlotTargets.Back) ? <CommonSlotTargets.Back /> : null}
        {activeSlots.has(commonSlotTargets.Logo) ? <CommonSlotTargets.Logo /> : null}
        {activeSlots.has(commonSlotTargets.Actions) ? <CommonSlotTargets.Actions /> : null}
      </header>
      <main className="layout__main">
        <h1>{directives.title}</h1>
        {activeSlots.has(slotTargets.Subtitle) ? <SlotTargets.Subtitle /> : null}
        {activeSlots.has(commonSlotTargets.Content) ? <CommonSlotTargets.Content /> : null}
      </main>
      <aside className="layout__aside">
        {activeSlots.has(commonSlotTargets.Navigation) ? <CommonSlotTargets.Navigation /> : null}
        {activeSlots.has(commonSlotTargets.Sidebar) ? <CommonSlotTargets.Sidebar /> : null}
      </aside>
      <footer className="layout__footer">
      </footer>
      <DropdownContentContainerProvider />
      <div id="portal-root" />
    </div>
  )
}
