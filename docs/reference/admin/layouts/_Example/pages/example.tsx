import { CommonSlots } from '@contember/layout'
import { Title } from '../components/Directives'
import { Slots } from '../components/Slots'

export default () => (
  <>
    <Title>My page title</Title>

    <Slots.Subtitle>This is a subtitle</Slots.Subtitle>

    <CommonSlots.Content>
      <p>My page content</p>
    </CommonSlots.Content>
  </>
)
