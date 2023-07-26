import { Slots } from "@contember/layout"
import { PropsWithChildren } from "react"
import { useDirectives } from "./components/Directives"
import { SlotTargets } from "./components/Slots"

const { Actions, Back, Logo, Navigation, Sidebar, Title, Profile, Subtitle, Switchers, ...rest } = SlotTargets

// Make sure we implement all the slots:
if (import.meta.env.DEV) {
  const __EMPTY_REST_GUARD: { [key: string]: never } = rest
}

export function MyCustomLayout({ children }: PropsWithChildren) {
  const slotTargetsIfActive = Slots.useTargetsIfActiveFactory(SlotTargets)

  const directives = useDirectives()

  return (
    <div className="layout" data-full-width={directives ? true : undefined}>
      {slotTargetsIfActive(['Logo', 'Actions'], (
        <header className="layout__header">
          <Logo />
          <Actions />
          <Profile />
        </header>
      ))}
      {slotTargetsIfActive(['Navigation'], (
        <aside className="layout__aside">
          <Navigation />
        </aside>
      ))}
      <main className="layout__main">
        <section className="layout__main__content">
          {slotTargetsIfActive(['Back', 'Title'], (
            <>
              <Back />
              <Title as="h1" />
            </>
          ))}
          {slotTargetsIfActive(['Subtitle'])}
          {children}
        </section>

        {slotTargetsIfActive(['Sidebar'], (
          <section className="layout__main__sidebar">
            <Sidebar />
          </section>
        ))}
      </main>


      {slotTargetsIfActive(['Profile', 'Switchers'], (
        <footer className="layout__footer">
          <Switchers />
          <Profile />
        </footer>
      ))}
    </div>
  )
}
